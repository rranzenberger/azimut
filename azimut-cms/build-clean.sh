# Vercel Build Script
# Força rebuild limpo do Prisma e Next.js

echo "🧹 Limpando cache..."
rm -rf .next
rm -rf node_modules/.cache

echo "📦 Gerando Prisma Client..."
npx prisma generate

echo "🏗️ Building Next.js..."
next build
























