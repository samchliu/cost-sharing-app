import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(request: NextRequest, { params }: { params: { groupId: string } }) {
  try {
    const group = await prisma.group.findUnique({
      where: { id: params.groupId },
      include: {
        groupUsers: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                picture: true,
              },
            },
          },
        },
        expenses: {
          select: {
            id: true,
            name: true,
            category: true,
            amount: true,
            date: true,
            note: true,
            payerId: true,
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
          },
        },
      },
    });
    if (!group) return NextResponse.json({ error: 'Group Not Found' }, { status: 404 });

    const responseBody: any = { ...group };
    responseBody.users = group.groupUsers.map((item) => item.user);
    delete responseBody.groupUsers;
    responseBody.expenses = group.expenses.map((expense) => ({
      ...expense,
      sharers: expense.sharers.map((sharer) => ({ id: sharer.user.id, amount: sharer.amount })),
    }));
    return NextResponse.json(responseBody);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { groupId: string } }) {
  try {
    const group = await prisma.group.findUnique({ where: { id: params.groupId } });
    if (!group) return NextResponse.json({ error: 'Group Not Found' }, { status: 404 });

    await prisma.group.delete({ where: { id: params.groupId } });
    return NextResponse.json(undefined, { status: 204 });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
