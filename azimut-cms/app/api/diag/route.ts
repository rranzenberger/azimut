/**
 * Rota de diagnóstico – testa cada dependência do login isoladamente
 * REMOVER após resolver o problema!
 */
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  const results: Record<string, any> = { runtime: 'nodejs', ok: true };

  // 1. Testar crypto nativo
  try {
    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha256', 'test').update('data').digest('hex');
    results.crypto = { ok: true, hmac: hmac.substring(0, 8) };
  } catch (e: any) {
    results.crypto = { ok: false, error: e.message };
  }

  // 2. Testar bcryptjs
  try {
    const bcrypt = require('bcryptjs');
    const hash = await bcrypt.hash('test', 4);
    const valid = await bcrypt.compare('test', hash);
    results.bcrypt = { ok: true, valid };
  } catch (e: any) {
    results.bcrypt = { ok: false, error: e.message };
  }

  // 3. Testar prisma
  try {
    const { prisma } = require('@/src/lib/prisma');
    const count = await prisma.user.count();
    results.prisma = { ok: true, userCount: count };
  } catch (e: any) {
    results.prisma = { ok: false, error: e.message };
  }

  // 4. Testar auth (createAuthToken)
  try {
    const { createAuthToken } = require('@/src/lib/auth');
    const token = createAuthToken({ userId: 'test', email: 'test@test.com', role: 'ADMIN' });
    results.auth = { ok: true, tokenLength: token.length };
  } catch (e: any) {
    results.auth = { ok: false, error: e.message };
  }

  return NextResponse.json(results);
}

export async function POST() {
  // Teste POST simples com runtime nodejs
  return NextResponse.json({ post: 'ok-nodejs', timestamp: new Date().toISOString() });
}
