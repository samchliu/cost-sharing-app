import { cookies } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/db';
import { z } from 'zod';
import { encrypt } from '@/lib/jwt';

const clientId = process.env.LINE_CHANNEL_ID!;

const LoginSchema = z.object({
  idToken: z.string(),
});

const UserProfileSchema = z.object({
  sub: z.string(),
  name: z.string(),
  picture: z.string().url(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const loginData = LoginSchema.parse(body);

    if (process.env.LINE_CHANNEL_ID === undefined)
      throw new Error(
        'Please make sure that you provided `LINE_CHANNEL_ID` as an environmental variable.'
      );

    const lineResponse = await fetch('https://api.line.me/oauth2/v2.1/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        id_token: loginData.idToken,
        client_id: clientId,
      }),
    });
    const lineResponseBody = await lineResponse.json();
    // TODO: fix id token expire issue
    // https://zenn.dev/arahabica/articles/274bb147a91d8a
    //console.log(lineResponseBody) // { error: 'invalid_request', error_description: 'IdToken expired.' }
    const userProfile = UserProfileSchema.parse(lineResponseBody);
    const user = await prisma.user.upsert({
      where: { id: userProfile.sub },
      update: {},
      create: { id: userProfile.sub, name: userProfile.name, picture: userProfile.picture },
    });
    const groupUsers = await prisma.groupUser.findMany({
      where: { userId: user.id },
    });
    const groups = await prisma.group.findMany({
      where: { id: { in: groupUsers.map((groupUser) => groupUser.groupId) } },
    });
    const responseBody = { ...user, groups };

    const token = await encrypt({ user: user.id });
    cookies().set({
      name: 'token',
      value: token,
      expires: new Date(Date.now() + 900 * 1000),
      // httpOnly: true,
      path: '/',
    });
    return NextResponse.json(responseBody);
  } catch (error) {
    console.error(error);
    return new NextResponse(null, { status: 500 });
  }
}
