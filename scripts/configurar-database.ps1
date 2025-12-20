# Script para configurar DATABASE_URL
# Para PostgreSQL hospedado (nao Supabase)

Write-Host ""
Write-Host "===========================================================" -ForegroundColor Cyan
Write-Host "  CONFIGURAR DATABASE_URL" -ForegroundColor Cyan
Write-Host "===========================================================" -ForegroundColor Cyan
Write-Host ""

$envPath = "azimut-cms\.env.local"

if (-not (Test-Path $envPath)) {
    Write-Host "ERRO: Arquivo .env.local nao encontrado!" -ForegroundColor Red
    Write-Host "Execute primeiro: .\scripts\configurar-cms-interativo.ps1" -ForegroundColor Yellow
    exit 1
}

Write-Host "Vamos configurar a DATABASE_URL para seu PostgreSQL:" -ForegroundColor Green
Write-Host ""

# Perguntar informacoes
$host = Read-Host "Host do banco (ex: azimt_20255.postgresql.dbaas.com.br)"
$port = Read-Host "Porta (Enter para usar 5432)"
if ([string]::IsNullOrWhiteSpace($port)) {
    $port = "5432"
}

$database = Read-Host "Nome do banco (ex: azimt_20255)"
$user = Read-Host "Usuario (ex: azimt_20255)"
$password = Read-Host "Senha" -AsSecureString
$passwordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($password))

# Montar DATABASE_URL
$databaseUrl = "postgresql://${user}:${passwordPlain}@${host}:${port}/${database}?sslmode=require"

Write-Host ""
Write-Host "DATABASE_URL que sera configurada:" -ForegroundColor Yellow
Write-Host $databaseUrl -ForegroundColor Gray
Write-Host ""

$confirm = Read-Host "Confirmar e atualizar .env.local? (s/N)"
if ($confirm -ne "s" -and $confirm -ne "S") {
    Write-Host "Operacao cancelada." -ForegroundColor Yellow
    exit 0
}

# Ler arquivo atual
$content = Get-Content $envPath -Raw

# Substituir ou adicionar DATABASE_URL
if ($content -match 'DATABASE_URL\s*=\s*["\']?[^"\'\r\n]+["\']?') {
    # Substituir existente
    $content = $content -replace 'DATABASE_URL\s*=\s*["\']?[^"\'\r\n]+["\']?', "DATABASE_URL=`"$databaseUrl`""
    Write-Host "DATABASE_URL atualizada!" -ForegroundColor Green
} else {
    # Adicionar nova
    $content = "DATABASE_URL=`"$databaseUrl`"`n`n" + $content
    Write-Host "DATABASE_URL adicionada!" -ForegroundColor Green
}

# Salvar arquivo
try {
    $content | Out-File -FilePath $envPath -Encoding UTF8 -NoNewline
    Write-Host ""
    Write-Host "OK: Arquivo .env.local atualizado com sucesso!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Agora voce pode executar:" -ForegroundColor Yellow
    Write-Host "  cd azimut-cms" -ForegroundColor White
    Write-Host "  npm run prisma:push" -ForegroundColor White
    Write-Host "  npm run prisma:seed" -ForegroundColor White
} catch {
    Write-Host "ERRO: Nao foi possivel atualizar o arquivo: $_" -ForegroundColor Red
    exit 1
}

