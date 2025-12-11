/**
 * Basic Auth Middleware para proteger o site durante revisão
 * Funciona apenas quando BASIC_AUTH_ENABLED=true nas variáveis de ambiente da Vercel
 * 
 * Para sites estáticos (Vite), a Vercel usa este middleware automaticamente
 */

export default async function middleware(req: Request) {
  // Verificar se Basic Auth está ativado
  const BASIC_AUTH_ENABLED = process.env.BASIC_AUTH_ENABLED === 'true';
  
  if (!BASIC_AUTH_ENABLED) {
    // Se desativado, não faz nada - deixa o site funcionar normalmente
    return new Response(null, { status: 200 });
  }

  const BASIC_AUTH_USER = process.env.BASIC_AUTH_USER || 'admin';
  const BASIC_AUTH_PASS = process.env.BASIC_AUTH_PASS || 'azimut2025';

  // Verificar Basic Auth
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return new Response('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Azimut Preview"',
      },
    });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = atob(base64Credentials);
  const [username, password] = credentials.split(':');

  if (username !== BASIC_AUTH_USER || password !== BASIC_AUTH_PASS) {
    return new Response('Invalid credentials', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Azimut Preview"',
      },
    });
  }

  // Autenticado - permite acesso (retorna null para continuar)
  return new Response(null, { status: 200 });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

