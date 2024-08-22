import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { z } from 'zod';

export async function GET(request: NextRequest, { params }: { params: { groupId: string } }) {
  try {
    const group = await prisma.group.findUnique({
      where: { id: params.groupId },
      include: {
        groupUsers: {
          select: {
            user: true,
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
    responseBody.users = group.groupUsers.map((item) => {
      const user: any = { ...item.user, adoptable: !Boolean(item.user.lineId) };
      delete user.lineId;
      return user;
    });
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
    return new NextResponse(undefined, { status: 204 });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

const RequestSchema = z.object({
  name: z.string(),
  picture: z.string(),
});

export async function PUT(request: NextRequest, { params }: { params: { groupId: string } }) {
  try {
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

    const responseBody = await prisma.group.update({
      where: { id: params.groupId },
      data: { ...validatedBody },
    });

    return NextResponse.json(responseBody);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
