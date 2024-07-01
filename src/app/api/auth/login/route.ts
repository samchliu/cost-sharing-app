import { cookies } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/db';
import { z } from 'zod';
import { encrypt } from '@/lib/jwt';

const clientId = process.env.LINE_CHANNEL_ID!;

const LoginSchema = z.object({
  accessToken: z.string(),
});

const UserProfileSchema = z.object({
  userId: z.string(),
  displayName: z.string(),
  pictureUrl: z.string().url(),
});

export async function POST(request: NextRequest) {
  let validatedBody;
  try {
    const body = await request.json();
    validatedBody = LoginSchema.parse(body);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
  }

  const { accessToken } = validatedBody;
  try {
    const accessTokenVerifyResponse = await fetch(
      `https://api.line.me/oauth2/v2.1/verify?access_token=${accessToken}`
    );
    const { client_id, expires_in } = await accessTokenVerifyResponse.json();
    if (clientId === undefined) {
      console.log(
        'Please make sure that you provided `LINE_CHANNEL_ID` as an environmental variable.'
      );
      return NextResponse.error();
    }
    if (client_id !== clientId || expires_in < 0) throw new Error();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const getUserProfileResponse = await fetch(`https://api.line.me/v2/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const getUserProfileResponseBody = await getUserProfileResponse.json();
    const userProfile = UserProfileSchema.parse(getUserProfileResponseBody);

    const user = await prisma.user.upsert({
      where: { lineId: userProfile.userId },
      update: {},
      create: {
        lineId: userProfile.userId,
        name: userProfile.displayName,
        picture: userProfile.pictureUrl,
      },
    });

    const token = await encrypt({ clientId: user.id });
    cookies().set({
      name: 'token',
      value: token,
      expires: new Date(Date.now() + 900 * 1000),
      // httpOnly: true,
      path: '/',
    });
    return NextResponse.json({ message: 'Login Success' });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
