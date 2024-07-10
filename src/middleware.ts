import { NextRequest, NextResponse } from 'next/server';
import { encrypt, decrypt } from './lib/jwt';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const parsed = await decrypt(token);
    parsed.expires = new Date(Date.now() + 900 * 1000);
    const response = NextResponse.next();
    response.headers.set('client-id', parsed.clientId);
    response.cookies.set({
      name: 'token',
      value: await encrypt(parsed),
      httpOnly: true,
      expires: parsed.expires,
    });
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export const config = {
  matcher: '/api/((?!auth|pages).*)',
};
