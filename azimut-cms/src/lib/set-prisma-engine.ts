/**
 * Deve ser importado ANTES de @prisma/client.
 * Garante PRISMA_CLIENT_ENGINE_TYPE=library no build (Vercel) e em runtime.
 */
if (typeof process !== 'undefined') {
  process.env.PRISMA_CLIENT_ENGINE_TYPE = process.env.PRISMA_CLIENT_ENGINE_TYPE || 'library';
}
