# Script Rápido para Executar Verificações de SEO
# Duplo clique neste arquivo ou execute no PowerShell

Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "EXECUTAR SCRIPTS SEO - AZIMUT" -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host ""

# Mudar para o diretório do projeto
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

Write-Host "Diretorio atual: $scriptPath" -ForegroundColor Yellow
Write-Host ""

# Executar script principal
Write-Host "Executando verificacao completa de SEO..." -ForegroundColor Green
Write-Host ""

& ".\scripts\automatizar-seo.ps1" -All

Write-Host ""
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "Pressione qualquer tecla para sair..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
