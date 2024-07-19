import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/db';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const user = await prisma.user.findUnique({
      where: { id },
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
    const responseBody: any = {
      user: { ...user, groups: user.groupUsers.map((item) => item.group) },
    };
    delete responseBody.user.groupUsers;

    const groupId = request.nextUrl.searchParams.get('join_to');
    if (groupId) {
      const group = await prisma.group.findUnique({
        where: { id: groupId },
        include: {
          groupUsers: {
            select: {
              user: true,
            },
          },
        },
      });
      if (!group)
        return NextResponse.json({ ...responseBody, error: 'Group Not Found' });

      const joinTo: any = {
        ...group,
        users: group.groupUsers.map((item) => {
          const user: any = { ...item.user, adoptable: !Boolean(item.user.lineId) };
          delete user.lineId;
          return user;
        }),
      };
      delete joinTo.groupUsers;
      responseBody.joinTo = joinTo;
    }
    return NextResponse.json(responseBody);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
