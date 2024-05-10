import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const body = await request.json();

  const url = 'https://api.line.me/oauth2/v2.1/verify';
  const form = new URLSearchParams({
    id_token: body.idToken,
    client_id: process.env.LINE_CHANNEL_ID!,
  });
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: form,
  });
  const data = await res.json();
  const user = await getUser({ id: data.sub, name: data.name })
    .catch((e) => console.error(e.message))
    .finally(async () => prisma.$disconnect());
  console.log(user);

  return new NextResponse(null, { status: 204 });
}

async function getUser({ id, name }: { id: string; name: string }) {
  let user = await prisma.user.findUnique({ where: { id } });
  if (!user) user = await prisma.user.create({ data: { id, name } });
  return user;
}
