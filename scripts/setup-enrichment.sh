#!/bin/bash
# ============================================================
# Script de Setup: Sistema de Enriquecimento de Leads
# Azimut - Executa SQL e valida estrutura
# ============================================================

set -e

DATABASE_URL="${1:-$DATABASE_URL}"

echo "🚀 Setup do Sistema de Enriquecimento de Leads"
echo "================================================"
echo ""

# Verificar se DATABASE_URL está definida
if [ -z "$DATABASE_URL" ]; then
    echo "❌ Erro: DATABASE_URL não definida"
    echo ""
    echo "Uso:"
    echo "  bash scripts/setup-enrichment.sh 'postgresql://user:pass@host/dbname'"
    echo ""
    echo "Ou defina a variável:"
    echo "  export DATABASE_URL='postgresql://user:pass@host/dbname'"
    exit 1
fi

echo "✅ DATABASE_URL encontrada"

# Verificar se psql está disponível
if ! command -v psql &> /dev/null; then
    echo "⚠️  psql não encontrado"
    echo ""
    echo "Opções:"
    echo "1. Instalar PostgreSQL client"
    echo "2. Usar pgAdmin para executar sql/enrichment_schema.sql manualmente"
    echo "3. Usar Neon Console (https://console.neon.tech)"
    echo ""
    echo "SQL está em: sql/enrichment_schema.sql"
    exit 0
fi

# Executar SQL
echo ""
echo "📊 Executando schema SQL..."

SQL_FILE="$(dirname "$0")/../sql/enrichment_schema.sql"

if [ ! -f "$SQL_FILE" ]; then
    echo "❌ Arquivo SQL não encontrado: $SQL_FILE"
    exit 1
fi

psql "$DATABASE_URL" -f "$SQL_FILE" -q

if [ $? -eq 0 ]; then
    echo "✅ Schema criado com sucesso!"
else
    echo "❌ Erro ao executar SQL"
    echo "Verifique as credenciais e tente novamente"
    exit 1
fi

# Validar tabelas criadas
echo ""
echo "🔍 Validando tabelas criadas..."
psql "$DATABASE_URL" -c "\dt" | grep -E "(lead_interactions|enrichment_sources|conversation_triggers|email_templates|sent_emails)" && echo "✅ Tabelas encontradas" || echo "⚠️  Algumas tabelas podem não ter sido criadas"

echo ""
echo "✨ Setup concluído!"
echo ""
echo "Próximos passos:"
echo "1. Configurar n8n (ver n8n/docker-compose.yml)"
echo "2. Adicionar API keys no .env"
echo "3. Criar workflows no n8n (ver docs/n8n-workflows.md)"
