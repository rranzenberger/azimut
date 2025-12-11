/**
 * Basic Auth Edge Function para proteger o site durante revisão
 * Desative removendo BASIC_AUTH_ENABLED ou setando para 'false' na Vercel
 */

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  // Verificar se Basic Auth está ativado
  const BASIC_AUTH_ENABLED = process.env.BASIC_AUTH_ENABLED === 'true';
  
  if (!BASIC_AUTH_ENABLED) {
    // Se desativado, apenas retorna 404 para não interferir no site
    return new Response(null, { status: 404 });
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

  // Autenticado - retorna 404 para não interferir no site
  // O Basic Auth será verificado pelo middleware do Vercel
  return new Response(null, { status: 404 });
}

