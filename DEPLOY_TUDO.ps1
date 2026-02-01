# Deploy completo: Site + Game + Backoffice
# Uso: .\DEPLOY_TUDO.ps1
# Ou via Git: push para main faz deploy automático do site; backoffice precisa de projeto Vercel com Root = azimut-cms

param(
    [switch]$SkipGit,   # Pular commit/push (só deploy CLI)
    [switch]$Force      # Não perguntar, executar direto
)

$ErrorActionPreference = "Stop"
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  DEPLOY COMPLETO - Site + Game + Backoffice" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1) Git (opcional)
if (-not $SkipGit) {
    Write-Host "[1/4] Git: status e push..." -ForegroundColor Yellow
    Remove-Item .git/index.lock -Force -ErrorAction SilentlyContinue
    git status --short
    if (-not $Force) {
        $r = Read-Host "Fazer commit e push? (S/N)"
        if ($r -ne "S" -and $r -ne "s") { Write-Host "Pulando Git." -ForegroundColor Gray }
        else {
            git add .
            git commit -m "chore: deploy site + game + backoffice" -ErrorAction SilentlyContinue
            git push origin main
            Write-Host "Push OK. Vercel (site) pode disparar deploy automatico." -ForegroundColor Green
        }
    } else {
        git add .
        git commit -m "chore: deploy site + game + backoffice" -ErrorAction SilentlyContinue
        git push origin main
    }
    Write-Host ""
}

# 2) Vercel CLI
$vercel = Get-Command vercel -ErrorAction SilentlyContinue
if (-not $vercel) {
    Write-Host "Vercel CLI nao encontrado. Instale: npm i -g vercel" -ForegroundColor Yellow
    Write-Host "Ou use apenas Git push (deploy automatico se projetos estao ligados)." -ForegroundColor Gray
    exit 0
}

# 3) Deploy SITE + GAME (raiz)
Write-Host "[2/4] Deploy SITE + GAME (raiz)..." -ForegroundColor Yellow
Set-Location $PSScriptRoot
vercel --prod --yes
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO no deploy do site. Verifique e tente de novo." -ForegroundColor Red
    exit 1
}
Write-Host "Site + Game: deploy enviado." -ForegroundColor Green
Write-Host ""

# 4) Deploy BACKOFFICE (azimut-cms)
# Se der erro "path azimut-cms\azimut-cms does not exist": no projeto Vercel do backoffice,
# Settings > Root Directory deixe VAZIO (nao use "azimut-cms"). Ver CORRIGIR_VERCEL_BACKOFFICE.md
Write-Host "[3/4] Deploy BACKOFFICE (azimut-cms)..." -ForegroundColor Yellow
Push-Location (Join-Path $PSScriptRoot "azimut-cms")
try {
    vercel --prod --yes
    if ($LASTEXITCODE -ne 0) { throw "Vercel falhou" }
} finally {
    Pop-Location
}
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO no deploy do backoffice. Se o erro for 'path azimut-cms\azimut-cms':" -ForegroundColor Red
    Write-Host "  Vercel > azimut-backoffice > Settings > Root Directory = VAZIO. Ver CORRIGIR_VERCEL_BACKOFFICE.md" -ForegroundColor Yellow
    exit 1
}
Write-Host "Backoffice: deploy enviado." -ForegroundColor Green
Write-Host ""

Write-Host "[4/4] Concluido." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Site:     https://azmt.com.br" -ForegroundColor White
Write-Host "  Backoffice: seu dominio .vercel.app ou configurado" -ForegroundColor White
Write-Host "  Dashboard: https://vercel.com/dashboard" -ForegroundColor White
Write-Host "========================================" -ForegroundColor Cyan
