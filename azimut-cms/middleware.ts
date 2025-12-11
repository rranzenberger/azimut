import { NextResponse, type NextRequest } from 'next/server';

// Basic Auth - ativar apenas quando necessário (variável de ambiente)
const BASIC_AUTH_ENABLED = process.env.BASIC_AUTH_ENABLED === 'true';
const BASIC_AUTH_USER = process.env.BASIC_AUTH_USER || 'admin';
const BASIC_AUTH_PASS = process.env.BASIC_AUTH_PASS || 'azimut2025';

function checkBasicAuth(req: NextRequest): NextResponse | null {
  if (!BASIC_AUTH_ENABLED) return null;

  const authHeader = req.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Azimut Preview"',
      },
    });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
  const [username, password] = credentials.split(':');

  if (username !== BASIC_AUTH_USER || password !== BASIC_AUTH_PASS) {
    return new NextResponse('Invalid credentials', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Azimut Preview"',
      },
    });
  }

  return null; // Autenticado, continua
}

export function middleware(req: NextRequest) {
  // Verificar Basic Auth primeiro (se ativado)
  const basicAuthResponse = checkBasicAuth(req);
  if (basicAuthResponse) return basicAuthResponse;

  const { pathname } = req.nextUrl;
  const token = req.cookies.get('azimut_admin_token')?.value;
  // No middleware, não usamos crypto (Edge). Apenas checamos se o cookie existe.
  const isAuthenticated = Boolean(token);

  // Bloquear acesso a /admin se não autenticado
  if (pathname.startsWith('/admin')) {
    if (!isAuthenticated) {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      url.search = `?next=${encodeURIComponent(pathname)}`;
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Se já autenticado, redirecionar /login para /admin
  if (pathname === '/login' && isAuthenticated) {
    const url = req.nextUrl.clone();
    url.pathname = '/admin';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};




