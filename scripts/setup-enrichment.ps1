# ============================================================
# Script de Setup: Sistema de Enriquecimento de Leads
# Azimut - PowerShell (Windows)
# ============================================================

param(
    [string]$DatabaseUrl = $env:DATABASE_URL
)

Write-Host "🚀 Setup do Sistema de Enriquecimento de Leads" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se DATABASE_URL está definida
if (-not $DatabaseUrl) {
    Write-Host "❌ Erro: DATABASE_URL não definida" -ForegroundColor Red
    Write-Host ""
    Write-Host "Uso:" -ForegroundColor Yellow
    Write-Host "  .\scripts\setup-enrichment.ps1 -DatabaseUrl 'postgresql://user:pass@host/dbname'" -ForegroundColor White
    Write-Host ""
    Write-Host "Ou defina a variável:" -ForegroundColor Yellow
    Write-Host "  `$env:DATABASE_URL='postgresql://user:pass@host/dbname'" -ForegroundColor White
    exit 1
}

Write-Host "✅ DATABASE_URL encontrada" -ForegroundColor Green

# Verificar se psql está disponível
$psqlPath = Get-Command psql -ErrorAction SilentlyContinue
if (-not $psqlPath) {
    Write-Host "⚠️  psql não encontrado no PATH" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Opções:" -ForegroundColor Yellow
    Write-Host "1. Instalar PostgreSQL client" -ForegroundColor White
    Write-Host "2. Usar pgAdmin para executar sql/enrichment_schema.sql manualmente" -ForegroundColor White
    Write-Host "3. Usar Neon Console (https://console.neon.tech)" -ForegroundColor White
    Write-Host ""
    Write-Host "SQL está em: sql/enrichment_schema.sql" -ForegroundColor Cyan
    exit 0
}

# Executar SQL
Write-Host ""
Write-Host "📊 Executando schema SQL..." -ForegroundColor Yellow

$sqlFile = Join-Path $PSScriptRoot "..\sql\enrichment_schema.sql"
if (-not (Test-Path $sqlFile)) {
    Write-Host "❌ Arquivo SQL não encontrado: $sqlFile" -ForegroundColor Red
    exit 1
}

# Extrair componentes da URL
if ($DatabaseUrl -match 'postgresql://([^:]+):([^@]+)@([^/]+)/(.+)') {
    $dbUser = $matches[1]
    $dbPass = $matches[2]
    $dbHost = $matches[3]
    $dbName = $matches[4]
    
    $env:PGPASSWORD = $dbPass
    
    Write-Host "Conectando em: $dbHost/$dbName" -ForegroundColor Gray
    
    # Executar SQL
    Get-Content $sqlFile | & psql -h $dbHost -U $dbUser -d $dbName -q
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Schema criado com sucesso!" -ForegroundColor Green
    } else {
        Write-Host "❌ Erro ao executar SQL" -ForegroundColor Red
        Write-Host "Verifique as credenciais e tente novamente" -ForegroundColor Yellow
        exit 1
    }
} else {
    Write-Host "❌ DATABASE_URL inválida" -ForegroundColor Red
    Write-Host "Formato esperado: postgresql://user:pass@host/dbname" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "✨ Setup concluído!" -ForegroundColor Green
Write-Host ""
Write-Host "Próximos passos:" -ForegroundColor Cyan
Write-Host "1. Configurar n8n (ver n8n/docker-compose.yml)" -ForegroundColor White
Write-Host "2. Adicionar API keys no .env" -ForegroundColor White
Write-Host "3. Criar workflows no n8n (ver docs/n8n-workflows.md)" -ForegroundColor White
