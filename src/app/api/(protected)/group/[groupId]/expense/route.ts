import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { z } from 'zod';

const RequestSchema = z.object({
  name: z.string(),
  category: z.string(),
  amount: z.number(),
  date: z.string().datetime(),
  note: z.string(),
  payerId: z.string(),
  sharers: z
    .object({
      id: z.string(),
      amount: z.number(),
    })
    .array(),
});

export async function POST(request: NextRequest, { params }: { params: { groupId: string } }) {
  let validatedBody;
  try {
    const body = await request.json();
    validatedBody = RequestSchema.parse(body);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
  }

  const group = await prisma.group.findUnique({ where: { id: params.groupId } });
  if (!group) return NextResponse.json({ error: 'Group Not Found' }, { status: 404 });

  const userIds = [
    ...new Set([validatedBody.payerId, ...validatedBody.sharers.map((sharer) => sharer.id)]),
  ];
  const users = await prisma.groupUser.findMany({
    where: { userId: { in: userIds } },
  });
  if (users.length !== userIds.length)
    return NextResponse.json({ error: 'User Not Found' }, { status: 404 });

  try {
    const clientId = request.headers.get('client-id')!;
    const expense = await prisma.expense.create({
      data: {
        name: validatedBody.name,
        category: validatedBody.category,
        amount: validatedBody.amount,
        date: validatedBody.date,
        note: validatedBody.note,
        group: { connect: { id: params.groupId } },
        payer: { connect: { id: validatedBody.payerId } },
        creator: { connect: { id: clientId } },
        sharers: {
          createMany: {
            data: validatedBody.sharers.map((sharer) => ({
              userId: sharer.id,
              amount: sharer.amount,
            })),
          },
        },
        historys: {
          create: {
            editor: { connect: { id: clientId } },
          },
        },
      },
      include: {
        sharers: {
          select: {
            amount: true,
            user: {
              select: {
                id: true,
              },
            },
          },
        },
        historys: {
          select: {
            editedAt: true,
            editorId: true,
          },
        },
      },
    });

    const responseBody: any = {
      ...expense,
      sharers: expense.sharers.map((sharer) => ({ id: sharer.user.id, amount: sharer.amount })),
    };
    return NextResponse.json(responseBody);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
