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
  const userId = request.headers.get('user-id')!;
  let validatedBody;
  try {
    const body = await request.json();
    validatedBody = RequestSchema.parse(body);
  } catch (error) {
    console.error(error);
    return new NextResponse('Bad Request', { status: 400 });
  }

  try {
    const group = await prisma.group.create({
      data: {
        name: validatedBody.name,
        picture: validatedBody.picture,
        creator: { connect: { id: userId } },
      },
    });
    const users = await prisma.user.createManyAndReturn({
      data: validatedBody.users.map((user) => ({ name: user.name, picture: user.picture })),
    });
    await prisma.groupUser.createMany({
      data: users.map((user) => ({
        userId: user.id,
        groupId: group.id,
      })),
    });

    return NextResponse.json(group);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
