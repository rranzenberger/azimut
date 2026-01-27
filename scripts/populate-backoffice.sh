#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# SCRIPT: Popular Backoffice com História da Azimut
# ═══════════════════════════════════════════════════════════════
# Aplica a migration e popula o banco com 30+ eventos históricos
# ═══════════════════════════════════════════════════════════════

echo "🚀 Iniciando população do backoffice com histórico da Azimut..."
echo ""

# Verificar se estamos no diretório correto
if [ ! -d "azimut-cms" ]; then
  echo "❌ Erro: Execute este script na raiz do projeto (onde está a pasta azimut-cms)"
  exit 1
fi

# Entrar na pasta do CMS
cd azimut-cms

echo "📦 1. Verificando dependências do Prisma..."
if ! command -v npx &> /dev/null; then
  echo "❌ npx não encontrado. Instale Node.js primeiro."
  exit 1
fi

echo "✅ Prisma disponível"
echo ""

# Gerar cliente Prisma (caso não exista)
echo "🔧 2. Gerando cliente Prisma..."
npx prisma generate
echo "✅ Cliente Prisma gerado"
echo ""

# Aplicar migrations pendentes
echo "🗄️  3. Aplicando migrations no banco..."
npx prisma migrate deploy
echo "✅ Migrations aplicadas"
echo ""

# Voltar para raiz
cd ..

# Popular com dados
echo "📝 4. Populando banco com história da Azimut..."
echo "   (30+ eventos históricos, 1980-2026)"
echo ""

# Executar SQL de população
if command -v psql &> /dev/null; then
  # Se tiver psql instalado, usar ele
  echo "   Usando psql..."
  
  # Pegar URL do banco do .env
  if [ -f "azimut-cms/.env" ]; then
    DATABASE_URL=$(grep DATABASE_URL azimut-cms/.env | cut -d '=' -f2-)
    psql "$DATABASE_URL" -f sql/populate_company_history_complete.sql
  else
    echo "⚠️  Arquivo .env não encontrado"
    echo "   Cole o SQL manualmente no Neon SQL Editor:"
    echo "   📄 sql/populate_company_history_complete.sql"
  fi
else
  # Se não tiver psql, instruir para fazer manual
  echo "⚠️  psql não encontrado no sistema"
  echo ""
  echo "   👉 OPÇÃO 1: Cole o SQL manualmente no Neon:"
  echo "      1. Acesse: https://console.neon.tech"
  echo "      2. Clique em 'SQL Editor'"
  echo "      3. Cole o conteúdo de: sql/populate_company_history_complete.sql"
  echo "      4. Execute"
  echo ""
  echo "   👉 OPÇÃO 2: Use o script Node.js:"
  echo "      node scripts/populate-history.js"
  echo ""
fi

echo ""
echo "✅ Processo concluído!"
echo ""
echo "📊 Verificar se funcionou:"
echo "   1. Acesse o backoffice: https://cms.azimut.com.br/admin"
echo "   2. Ou teste a API: https://cms.azimut.com.br/api/public/history?lang=pt"
echo ""
echo "🎉 Pronto! A história da Azimut está no backoffice."
