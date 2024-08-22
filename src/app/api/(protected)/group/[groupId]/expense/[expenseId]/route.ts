import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { z } from 'zod';

export async function GET(
  request: NextRequest,
  { params }: { params: { groupId: string; expenseId: string } }
) {
  try {
    const expense = await prisma.expense.findUnique({
      where: { id: Number(params.expenseId), group: { id: params.groupId } },
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
    if (!expense) return NextResponse.json({ error: 'Expense Not Found' }, { status: 404 });

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

export async function PUT(
  request: NextRequest,
  { params }: { params: { groupId: string; expenseId: string } }
) {
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

  const expense = await prisma.expense.findUnique({
    where: { id: Number(params.expenseId), group: { id: params.groupId } },
  });
  if (!expense) return NextResponse.json({ error: 'Expense Not Found' }, { status: 404 });

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
    await prisma.sharer.deleteMany({
      where: { expense: { id: Number(params.expenseId) } },
    });

    const expense = await prisma.expense.update({
      where: { id: Number(params.expenseId), group: { id: params.groupId } },
      data: {
        name: validatedBody.name,
        category: validatedBody.category,
        amount: validatedBody.amount,
        date: validatedBody.date,
        note: validatedBody.note,
        payer: { connect: { id: validatedBody.payerId } },
        sharers: {
          create: validatedBody.sharers.map((sharer) => ({
            user: { connect: { id: sharer.id } },
            amount: sharer.amount,
          })),
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { groupId: string; expenseId: string } }
) {
  try {
    const { count } = await prisma.expense.deleteMany({
      where: { id: Number(params.expenseId), group: { id: params.groupId } },
    });
    if (count === 0) return NextResponse.json({ error: 'Expense Not Found' }, { status: 404 });
    return new NextResponse(undefined, { status: 204 });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
