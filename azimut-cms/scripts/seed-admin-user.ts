/**
 * Garante que o usuário admin existe com a senha padrão.
 * Use quando o login falhar em produção (ex.: seed nunca foi rodado).
 *
 * Uso (com DATABASE_URL do backoffice em produção):
 *   npx tsx scripts/seed-admin-user.ts
 * ou
 *   DATABASE_URL="postgresql://..." npx tsx scripts/seed-admin-user.ts
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const ADMIN_EMAIL = 'admin@azimut.com.br';
const ADMIN_PASSWORD = 'Azimut2025!';

async function main() {
  console.log('🔐 Garantindo usuário admin...');
  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

  const admin = await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: {
      password: hashedPassword,
      name: 'Admin Azimut',
      role: 'SUPER_ADMIN',
    },
    create: {
      email: ADMIN_EMAIL,
      name: 'Admin Azimut',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
  });

  console.log('✅ Admin OK:', admin.email);
  console.log('   Senha redefinida para o padrão. Faça login com:', ADMIN_EMAIL, '/', ADMIN_PASSWORD);
}

main()
  .catch((e) => {
    console.error('Erro:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
