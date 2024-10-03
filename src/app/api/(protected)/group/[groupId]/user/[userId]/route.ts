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
    const group = await prisma.group.findUnique({ where: { id: params.groupId } });
    if (!group) return NextResponse.json({ error: 'Group Not Found' }, { status: 404 });

    if (group.creatorId === params.userId) {
      await prisma.group.update({
        where: { id: params.groupId },
        data: {
          creatorId: clientId,
        },
      });
    }
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
    const user = await prisma.user.findUnique({ where: { id: params.userId } });
    if (!user) return NextResponse.json({ error: 'User Not Found' }, { status: 404 });

    const groupUser = await prisma.groupUser.findUnique({ where: { groupId_userId: params } });
    if (!groupUser) return NextResponse.json({ error: 'User Not Found' }, { status: 404 });

    const group = await prisma.group.findUnique({ where: { id: params.groupId } });
    if (!group) return NextResponse.json({ error: 'Group Not Found' }, { status: 404 });

    const groupUsers = await prisma.groupUser.findMany({ where: { groupId: params.groupId } });
    const users = await prisma.user.findMany({
      where: { id: { in: groupUsers.map((item) => item.userId) } },
    });
    if (users.filter((item) => item.id !== params.userId).every((item) => !item.lineId)) {
      await prisma.group.delete({ where: { id: params.groupId } });
      await prisma.user.deleteMany({
        where: { id: { in: users.filter((item) => !item.lineId).map((item) => item.id) } },
      });
      return new NextResponse(undefined, { status: 204 });
    }

    const groupCreator = await prisma.group.findMany({
      where: { id: params.groupId, creatorId: params.userId },
    });
    const expenses = await prisma.expense.findMany({ where: { creatorId: params.userId } });
    const payers = await prisma.expense.findMany({ where: { payerId: params.userId } });
    const sharers = await prisma.sharer.findMany({ where: { userId: params.userId } });
    const historys = await prisma.history.findMany({ where: { editorId: params.userId } });

    if (
      groupCreator.length + expenses.length + payers.length + sharers.length + historys.length >
      0
    ) {
      const successor = await prisma.user.create({
        data: {
          name: user.name,
          picture: '',
        },
      });

      await Promise.all([
        prisma.group.update({
          where: { id: params.groupId, creatorId: params.userId },
          data: {
            creatorId: successor.id,
          },
        }),
        prisma.groupUser.update({
          where: { groupId_userId: params },
          data: { userId: successor.id },
        }),
        prisma.expense.updateMany({
          where: { groupId: params.groupId, creatorId: params.userId },
          data: { creatorId: successor.id },
        }),
        prisma.expense.updateMany({
          where: { groupId: params.groupId, payerId: params.userId },
          data: { payerId: successor.id },
        }),
        prisma.sharer.updateMany({
          where: { expense: { groupId: params.groupId }, userId: params.userId },
          data: { userId: successor.id },
        }),
        prisma.history.updateMany({
          where: { expense: { groupId: params.groupId }, editorId: params.userId },
          data: { editorId: successor.id },
        }),
      ]);
    } else {
      await prisma.groupUser.delete({ where: { groupId_userId: params } });
      if (!user.lineId) await prisma.user.delete({ where: { id: params.userId } });
    }
    return new NextResponse(undefined, { status: 204 });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
