# Script PowerShell para Deploy Manual Azimut
# Uso: .\deploy.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   DEPLOY AZIMUT - MENU INTERATIVO" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1) Site Principal (azimut-site-vite-tailwind)" -ForegroundColor Yellow
Write-Host "2) Backoffice/CMS (azimut-cms)" -ForegroundColor Yellow
Write-Host "3) Ambos (Site + Backoffice)" -ForegroundColor Yellow
Write-Host "4) Cancelar" -ForegroundColor Red
Write-Host ""

$choice = Read-Host "Escolha uma opcao (1-4)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "Fazendo deploy do Site Principal..." -ForegroundColor Green
        Write-Host ""
        vercel --prod
    }
    "2" {
        Write-Host ""
        Write-Host "Fazendo deploy do Backoffice..." -ForegroundColor Green
        Write-Host ""
        Set-Location "azimut-cms"
        vercel --prod
        Set-Location ".."
    }
    "3" {
        Write-Host ""
        Write-Host "Fazendo deploy do Site Principal..." -ForegroundColor Green
        Write-Host ""
        vercel --prod
        
        Write-Host ""
        Write-Host "Fazendo deploy do Backoffice..." -ForegroundColor Green
        Write-Host ""
        Set-Location "azimut-cms"
        vercel --prod
        Set-Location ".."
        
        Write-Host ""
        Write-Host "Deploy completo realizado!" -ForegroundColor Green
    }
    "4" {
        Write-Host ""
        Write-Host "Deploy cancelado" -ForegroundColor Red
    }
    default {
        Write-Host ""
        Write-Host "Opcao invalida!" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Processo finalizado" -ForegroundColor Cyan
