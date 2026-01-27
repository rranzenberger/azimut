# Deploy Sistema Web3 - Azimut
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Deploy Sistema Web3 - Azimut" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar status
Write-Host "[1/5] Verificando status do Git..." -ForegroundColor Yellow
git status --short
Write-Host ""

# Adicionar arquivos
Write-Host "[2/5] Adicionando arquivos modificados..." -ForegroundColor Yellow
git add .
Write-Host ""

# Commit
Write-Host "[3/5] Criando commit..." -ForegroundColor Yellow
$commitMessage = "feat: Sistema Web3 completo - Carteira, Recompensas, NFTs, Smart Contracts"
git commit -m $commitMessage
Write-Host ""

# Push
Write-Host "[4/5] Fazendo push para GitHub..." -ForegroundColor Yellow
git push origin main
Write-Host ""

# Verificar se tem Vercel CLI
Write-Host "[5/5] Verificando Vercel CLI..." -ForegroundColor Yellow
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if ($vercelInstalled) {
    Write-Host "Vercel CLI encontrado!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Deseja fazer deploy manual também? (S/N)" -ForegroundColor Yellow
    $deployManual = Read-Host
    
    if ($deployManual -eq "S" -or $deployManual -eq "s") {
        Write-Host ""
        Write-Host "Deploy do Frontend..." -ForegroundColor Cyan
        vercel --prod --cwd .
        
        Write-Host ""
        Write-Host "Deploy do Backoffice..." -ForegroundColor Cyan
        vercel --prod --cwd azimut-cms
    }
} else {
    Write-Host "Vercel CLI não encontrado. Instale com: npm i -g vercel" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Deploy iniciado!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "O Vercel vai fazer deploy automaticamente em alguns minutos." -ForegroundColor Cyan
Write-Host ""
Write-Host "Verifique o status em:" -ForegroundColor Yellow
Write-Host "- Dashboard: https://vercel.com/dashboard" -ForegroundColor White
Write-Host "- Site: https://azmt.com.br" -ForegroundColor White
Write-Host "- Backoffice: https://backoffice.azmt.com.br" -ForegroundColor White
Write-Host ""
