# Script para Otimizar Projetos com IA
# Duplo clique para executar

Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "OTIMIZAR PROJETOS COM IA" -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host ""

# Ir para pasta do projeto
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

Write-Host "Diretorio: $scriptPath" -ForegroundColor Yellow
Write-Host ""

# Ir para pasta azimut-cms
Set-Location "azimut-cms"

Write-Host "Executando script de otimizacao..." -ForegroundColor Green
Write-Host ""

# Executar script
npx tsx scripts/otimizar-projetos-seo.ts

Write-Host ""
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "Pressione Enter para sair..." -ForegroundColor Gray
Read-Host
