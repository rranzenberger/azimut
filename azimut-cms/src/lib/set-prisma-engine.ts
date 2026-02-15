/**
 * Deve ser importado ANTES de @prisma/client.
 * Garante PRISMA_CLIENT_ENGINE_TYPE=library no build (Vercel) e em runtime.
 * Usa bracket notation para evitar o Terser transformar a atribuição em sintaxe inválida.
 */
if (typeof process !== 'undefined') {
  const key = 'PRISMA_CLIENT_ENGINE_TYPE';
  process.env[key] = process.env[key] || 'library';
}
