import { NextResponse } from 'next/server';

function clearAuthCookie(res: NextResponse) {
  res.cookies.set('azimut_admin_token', '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });
  return res;
}

export async function POST() {
  const res = NextResponse.json({ success: true });
  return clearAuthCookie(res);
}

// GET redireciona para /login após limpar cookie (para form nativo e link direto)
export async function GET() {
  const res = NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_BASE_URL || 'https://backoffice.azmt.com.br'));
  return clearAuthCookie(res);
}






































