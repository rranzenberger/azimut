# Deploy apenas do SITE (azimut-site-vite-tailwind) na Vercel
# Uso: .\DEPLOY_SITE.ps1
# Requer: Node, npm e Vercel CLI (npm i -g vercel)

$ErrorActionPreference = "Stop"
$projectRoot = $PSScriptRoot

Write-Host ""
Write-Host "  DEPLOY SITE - azmt.com.br" -ForegroundColor Cyan
Write-Host ""

Set-Location $projectRoot

# Build
Write-Host "[1/2] Build (game + site)..." -ForegroundColor Yellow
npm run vercel-build
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO no build. Corrija e tente de novo." -ForegroundColor Red
    exit 1
}
Write-Host "Build OK." -ForegroundColor Green
Write-Host ""

# Vercel
$vercel = Get-Command vercel -ErrorAction SilentlyContinue
if (-not $vercel) {
    Write-Host "Vercel CLI nao encontrado. Instale: npm install -g vercel" -ForegroundColor Yellow
    exit 1
}

Write-Host "[2/2] Deploy Vercel (producao)..." -ForegroundColor Yellow
vercel --prod --yes
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO no deploy. Verifique e tente de novo." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "  Deploy concluido." -ForegroundColor Green
Write-Host "  Site: https://www.azmt.com.br" -ForegroundColor White
Write-Host ""
