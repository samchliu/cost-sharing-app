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

    if (!expense) return new NextResponse('Expense does not exist', { status: 404 });
    return NextResponse.json(expense);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

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
    return new NextResponse('Bad Request', { status: 400 });
  }

  const expense = await prisma.expense.findUnique({
    where: { id: Number(params.expenseId), group: { id: params.groupId } },
  });
  if (!expense) return new NextResponse('Expense does not exist', { status: 404 });
  // TODO: Should we first check whether payerId and sharerIds are valid?

  try {
    const clientId = request.headers.get('client-id')!;

    // TODO: Whether checking and updating can be put together?
    await prisma.sharer.deleteMany({
      where: { expense: { id: Number(params.expenseId) } },
    });

    const e = await prisma.expense.findFirst({
      where: { id: 1 },
    });
    const expense = await prisma.expense.update({
      where: { id: Number(params.expenseId), group: { id: params.groupId } },
      data: {
        name: validatedBody.name,
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

    return NextResponse.json(expense);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
