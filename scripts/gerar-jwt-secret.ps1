# Script para gerar JWT_SECRET seguro

Write-Host "=== GERANDO JWT_SECRET ===" -ForegroundColor Cyan
Write-Host ""

try {
    # Usar .NET para gerar bytes aleatórios seguros
    Add-Type -AssemblyName System.Security
    $bytes = New-Object byte[] 32
    $rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
    $rng.GetBytes($bytes)
    $jwtSecret = [Convert]::ToBase64String($bytes)
    
    Write-Host "[OK] JWT_SECRET gerado com sucesso!" -ForegroundColor Green
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host $jwtSecret -ForegroundColor White -BackgroundColor DarkBlue
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Copie este valor e adicione na Vercel:" -ForegroundColor Yellow
    Write-Host "  Settings > Environment Variables > JWT_SECRET" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Marque para: Production, Preview e Development" -ForegroundColor Yellow
    Write-Host ""
} catch {
    Write-Host "[ERRO] Nao foi possivel gerar JWT_SECRET" -ForegroundColor Red
    Write-Host ""
    Write-Host "Gere manualmente:" -ForegroundColor Yellow
    Write-Host "  Acesse: https://generate-secret.vercel.app/32" -ForegroundColor Gray
    Write-Host ""
}

Write-Host ""

