import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { z } from 'zod';

const RequestSchema = z.object({
  name: z.string(),
  picture: z.string().url(),
  users: z
    .object({
      name: z.string(),
      picture: z.string().url(),
    })
    .array(),
});

export async function POST(request: NextRequest) {
  let validatedBody;
  try {
    const body = await request.json();
    validatedBody = RequestSchema.parse(body);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
  }

  try {
    const clientId = request.headers.get('client-id')!;
    const users = await prisma.user.createManyAndReturn({
      data: validatedBody.users.map((user) => ({
        name: user.name,
        picture: user.picture,
      })),
    });
    const userIds = [clientId, ...users.map((user) => user.id)];

    const group = await prisma.group.create({
      data: {
        name: validatedBody.name,
        picture: validatedBody.picture,
        creator: { connect: { id: clientId } },
        groupUsers: {
          create: userIds.map((userId) => ({
            user: {
              connect: { id: userId },
            },
          })),
        },
      },
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
        expenses: true,
      },
    });
    const responseBody: any = { ...group, users: group.groupUsers.map((item) => item.user) };
    delete responseBody.groupUsers;
    return NextResponse.json(responseBody);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
