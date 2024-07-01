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
            amount: true,
            date: true,
            note: true,
            payerId: true,
          },
        },
      },
    });
    if (!group) return new NextResponse('Group does not exist', { status: 404 });

    const responseBody: any = { ...group, users: group.groupUsers.map((item) => item.user) };
    delete responseBody.groupUsers;
    return NextResponse.json(responseBody);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { groupId: string } }) {
  try {
    const group = await prisma.group.findUnique({ where: { id: params.groupId } });
    if (!group) return new NextResponse('Group does not exist', { status: 404 });

    await prisma.group.delete({ where: { id: params.groupId } });
    return new NextResponse(undefined, { status: 204 });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
