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
    const responseBody: any = { ...user, groups: user.groupUsers.map((item) => item.group) };
    delete responseBody.groupUsers;
    return NextResponse.json(responseBody);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
