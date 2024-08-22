import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function PUT(
  request: NextRequest,
  { params }: { params: { groupId: string; userId: string } }
) {
  try {
    const groupUser = await prisma.groupUser.findUnique({ where: { groupId_userId: params } });
    if (!groupUser) return NextResponse.json({ error: 'User Not Found' }, { status: 404 });

    const clientId = request.headers.get('client-id')!;
    await prisma.groupUser.updateMany({
      where: { ...params },
      data: {
        userId: clientId,
      },
    });
    await prisma.expense.updateMany({
      where: {
        payerId: params.userId,
      },
      data: {
        payerId: clientId,
      },
    });
    await prisma.sharer.updateMany({
      where: {
        userId: params.userId,
      },
      data: {
        userId: clientId,
      },
    });
    await prisma.user.delete({ where: { id: params.userId } });

    const user = await prisma.user.findUnique({
      where: { id: clientId },
      include: {
        groupUsers: {
          select: {
            group: {
              select: {
                id: true,
                name: true,
                picture: true,
              },
            },
          },
        },
      },
    });
    if (!user) return NextResponse.json({ error: 'User Not Found' }, { status: 404 });
    const responseBody: any = { ...user, groups: user.groupUsers.map((item) => item.group) };
    delete responseBody.groupUsers;
    return NextResponse.json(responseBody);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { groupId: string; userId: string } }
) {
  try {
    const { count } = await prisma.groupUser.deleteMany({
      where: { groupId: params.groupId, userId: params.userId },
    });
    if (count === 0) return NextResponse.json({ error: 'User Not Found' }, { status: 404 });
    return new NextResponse(undefined, { status: 204 });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
