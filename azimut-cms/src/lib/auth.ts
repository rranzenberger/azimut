import crypto from 'crypto';

type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'VIEWER';

export interface AuthPayload {
  userId: string;
  email: string;
  role: UserRole;
  exp: number; // unix timestamp (seconds)
}

const getSecret = () =>
  process.env.JWT_SECRET ||
  process.env.ADMIN_JWT_SECRET ||
  process.env.NEXTAUTH_SECRET ||
  'dev-azimut-secret';

const base64url = (input: string | Buffer) =>
  Buffer.from(input).toString('base64url');

function sign(data: string) {
  return crypto
    .createHmac('sha256', getSecret())
    .update(data)
    .digest('base64url');
}

export function createAuthToken(payload: Omit<AuthPayload, 'exp'>): string {
  const header = { alg: 'HS256', typ: 'JWT' };
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; // 7 dias
  const fullPayload: AuthPayload = { ...payload, exp };
  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(JSON.stringify(fullPayload));
  const data = `${encodedHeader}.${encodedPayload}`;
  const signature = sign(data);
  return `${data}.${signature}`;
}

export function verifyAuthToken(token: string): AuthPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [encodedHeader, encodedPayload, signature] = parts;
    const data = `${encodedHeader}.${encodedPayload}`;
    const expected = sign(data);
    
    // Proteção contra buffers de tamanhos diferentes que causariam erro em timingSafeEqual
    const sigBuffer = Buffer.from(signature);
    const expBuffer = Buffer.from(expected);
    if (sigBuffer.length !== expBuffer.length) {
      return null;
    }
    
    if (!crypto.timingSafeEqual(sigBuffer, expBuffer)) {
      return null;
    }
    const payload = JSON.parse(
      Buffer.from(encodedPayload, 'base64url').toString('utf-8')
    ) as AuthPayload;
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return payload;
  } catch (err) {
    console.error('[Auth] verifyAuthToken error:', err);
    return null;
  }
}

export function getAuthFromCookies(
  getCookie: (name: string) => string | undefined
): AuthPayload | null {
  const token = getCookie('azimut_admin_token');
  if (!token) return null;
  return verifyAuthToken(token);
}






































