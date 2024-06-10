import { NextRequest, NextResponse } from 'next/server';
import { encrypt, decrypt } from './lib/jwt';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  if (!token) {
    return new NextResponse('Unauthorized', { status: 401 });
    // return NextResponse.redirect(new URL('/api/pages/login', request.url));
  }
  try {
    const parsed = await decrypt(token);
    parsed.expires = new Date(Date.now() + 900 * 1000);
    // request.nextUrl.searchParams.set('userId', parsed.user);
    const response = NextResponse.next();
    response.headers.set('user-id', parsed.user);
    response.cookies.set({
      name: 'token',
      value: await encrypt(parsed),
      // httpOnly: true,
      expires: parsed.expires,
    });
    return response;
  } catch (error) {
    console.log(error);
    return new NextResponse('Unauthorized', { status: 401 });
  }
}

export const config = {
  matcher: ['/api/user/(.*)', '/api/group', '/api/groupUser'],
};
