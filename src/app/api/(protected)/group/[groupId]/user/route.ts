import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { z } from 'zod';

const RequestSchema = z.object({
  name: z.string(),
  picture: z.string(),
});

export async function POST(request: NextRequest, { params }: { params: { groupId: string } }) {
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

    const groupUser = await prisma.groupUser.create({
      data: {
        user: {
          create: {
            name: validatedBody.name,
            picture: validatedBody.picture,
          },
        },
        group: { connect: { id: group.id } },
      },
      select: {
        user: true,
      },
    });
    const responseBody: any = { ...groupUser.user, adoptable: true };
    delete responseBody.lineId;
    return NextResponse.json(responseBody);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
