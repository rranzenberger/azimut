# Script para adicionar DATABASE_URL no .env.local
# Use quando copiar o valor da Vercel

Write-Host ""
Write-Host "===========================================================" -ForegroundColor Cyan
Write-Host "  ADICIONAR DATABASE_URL NO .ENV.LOCAL" -ForegroundColor Cyan
Write-Host "===========================================================" -ForegroundColor Cyan
Write-Host ""

$envPath = "azimut-cms\.env.local"

if (-not (Test-Path $envPath)) {
    Write-Host "AVISO: Arquivo .env.local nao encontrado!" -ForegroundColor Yellow
    Write-Host "Criando arquivo..." -ForegroundColor Gray
    "" | Out-File -FilePath $envPath -Encoding UTF8
}

Write-Host "Cole aqui o valor de DATABASE_URL da Vercel:" -ForegroundColor Yellow
Write-Host "(Cole a URL completa que comeca com postgresql://...)" -ForegroundColor Gray
Write-Host ""

$databaseUrl = Read-Host "DATABASE_URL"

if ([string]::IsNullOrWhiteSpace($databaseUrl)) {
    Write-Host "ERRO: DATABASE_URL vazia!" -ForegroundColor Red
    exit 1
}

# Ler arquivo atual
$content = Get-Content $envPath -Raw

# Verificar se ja existe
if ($content -match 'DATABASE_URL\s*=\s*["\']?[^"\'\r\n]+["\']?') {
    Write-Host ""
    Write-Host "AVISO: DATABASE_URL ja existe no arquivo!" -ForegroundColor Yellow
    $resposta = Read-Host "Deseja substituir? (s/N)"
    if ($resposta -eq "s" -or $resposta -eq "S") {
        $content = $content -replace 'DATABASE_URL\s*=\s*["\']?[^"\'\r\n]+["\']?', "DATABASE_URL=`"$databaseUrl`""
        Write-Host "DATABASE_URL atualizada!" -ForegroundColor Green
    } else {
        Write-Host "Operacao cancelada." -ForegroundColor Yellow
        exit 0
    }
} else {
    # Adicionar nova
    if ([string]::IsNullOrWhiteSpace($content)) {
        $content = "DATABASE_URL=`"$databaseUrl`""
    } else {
        $content = "DATABASE_URL=`"$databaseUrl`"`n`n" + $content
    }
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


