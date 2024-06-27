import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

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
