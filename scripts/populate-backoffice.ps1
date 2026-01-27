# ═══════════════════════════════════════════════════════════════
# SCRIPT: Popular Backoffice com História da Azimut (Windows)
# ═══════════════════════════════════════════════════════════════
# Aplica a migration e popula o banco com 30+ eventos históricos
# ═══════════════════════════════════════════════════════════════

Write-Host "🚀 Iniciando população do backoffice com histórico da Azimut..." -ForegroundColor Green
Write-Host ""

# Verificar se estamos no diretório correto
if (-not (Test-Path "azimut-cms")) {
    Write-Host "❌ Erro: Execute este script na raiz do projeto (onde está a pasta azimut-cms)" -ForegroundColor Red
    exit 1
}

# Entrar na pasta do CMS
Set-Location azimut-cms

Write-Host "📦 1. Verificando dependências do Prisma..." -ForegroundColor Cyan
$npxPath = Get-Command npx -ErrorAction SilentlyContinue
if (-not $npxPath) {
    Write-Host "❌ npx não encontrado. Instale Node.js primeiro." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Prisma disponível" -ForegroundColor Green
Write-Host ""

# Gerar cliente Prisma (caso não exista)
Write-Host "🔧 2. Gerando cliente Prisma..." -ForegroundColor Cyan
npx prisma generate
Write-Host "✅ Cliente Prisma gerado" -ForegroundColor Green
Write-Host ""

# Aplicar migrations pendentes
Write-Host "🗄️  3. Aplicando migrations no banco..." -ForegroundColor Cyan
npx prisma migrate deploy
Write-Host "✅ Migrations aplicadas" -ForegroundColor Green
Write-Host ""

# Voltar para raiz
Set-Location ..

# Popular com dados
Write-Host "📝 4. Populando banco com história da Azimut..." -ForegroundColor Cyan
Write-Host "   (30+ eventos históricos, 1980-2026)" -ForegroundColor Gray
Write-Host ""

# Verificar se existe .env
if (Test-Path "azimut-cms\.env") {
    Write-Host "   ✅ Arquivo .env encontrado" -ForegroundColor Green
    Write-Host ""
    Write-Host "   👉 PRÓXIMO PASSO:" -ForegroundColor Yellow
    Write-Host "      1. Acesse: https://console.neon.tech" -ForegroundColor White
    Write-Host "      2. Clique em 'SQL Editor'" -ForegroundColor White
    Write-Host "      3. Cole o conteúdo de: sql\populate_company_history_complete.sql" -ForegroundColor White
    Write-Host "      4. Execute" -ForegroundColor White
    Write-Host ""
    Write-Host "   OU use o script Node.js:" -ForegroundColor Yellow
    Write-Host "      cd azimut-cms" -ForegroundColor White
    Write-Host "      npx tsx ..\scripts\populate-history.ts" -ForegroundColor White
} else {
    Write-Host "⚠️  Arquivo .env não encontrado" -ForegroundColor Yellow
    Write-Host "   Configure o DATABASE_URL primeiro" -ForegroundColor Gray
}

Write-Host ""
Write-Host "✅ Preparação concluída!" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Após popular, verificar se funcionou:" -ForegroundColor Cyan
Write-Host "   1. API: https://cms.azimut.com.br/api/public/history?lang=pt" -ForegroundColor White
Write-Host "   2. Frontend: http://localhost:5173/pt/studio/credibilidade" -ForegroundColor White
Write-Host ""
Write-Host "🎉 Siga as instruções acima para completar!" -ForegroundColor Green
