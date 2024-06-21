import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { z } from 'zod';

const RequestSchema = z.object({
  name: z.string(),
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
  const clientId = request.headers.get('client-id')!;
  let validatedBody;
  try {
    const body = await request.json();
    validatedBody = RequestSchema.parse(body);
  } catch (error) {
    console.error(error);
    return new NextResponse('Bad Request', { status: 400 });
  }

  const group = await prisma.group.findUnique({ where: { id: params.groupId } });
  if (!group) return new NextResponse('Group does not exist', { status: 404 });
  // TODO: Should we first check whether payerId and sharerIds are valid?

  try {
    const expense = await prisma.expense.create({
      data: {
        name: validatedBody.name,
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
        payer: {
          select: {
            id: true,
            name: true,
          },
        },
        sharers: {
          select: {
            amount: true,
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        historys: {
          select: {
            editedAt: true,
            editor: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    // TODO: return sharers and historys fields too
    return NextResponse.json(expense);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
