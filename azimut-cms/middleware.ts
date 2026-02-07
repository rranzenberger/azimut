import { NextResponse, type NextRequest } from 'next/server';

// Basic Auth - ativar apenas quando necessário (variável de ambiente)
const BASIC_AUTH_ENABLED = process.env.BASIC_AUTH_ENABLED === 'true';
const BASIC_AUTH_USER = process.env.BASIC_AUTH_USER || 'admin';
const BASIC_AUTH_PASS = process.env.BASIC_AUTH_PASS || 'azimut2025';

// Backoffice aberto: NÃO exige cookie para /admin (só para debug; desative em produção)
const BACKOFFICE_OPEN = process.env.BACKOFFICE_OPEN === 'true';

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

  // Redirecionar /en/login, /pt/login, etc. para /login (backoffice não usa prefixo de idioma no login)
  const langLoginMatch = pathname.match(/^\/(pt|en|es|fr)\/login\/?$/);
  if (langLoginMatch) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Bloquear acesso a /admin se não autenticado (exceto quando BACKOFFICE_OPEN=true)
  if (pathname.startsWith('/admin')) {
    if (!BACKOFFICE_OPEN && !isAuthenticated) {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      url.search = `?next=${encodeURIComponent(pathname)}`;
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // NUNCA redirecionar /login para /admin aqui. Sempre deixar /login ser exibido.
  // A página /login faz redirecionamento após login bem-sucedido (client-side).
  // Redirecionar aqui causava tela em branco quando cookie era inválido ou expirado.
  if (pathname === '/login' || pathname === '/login/') {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  // Incluir todas as variantes de login para /login sempre mostrar a tela de login
  matcher: ['/admin/:path*', '/login', '/login/', '/en/login', '/pt/login', '/es/login', '/fr/login'],
};




