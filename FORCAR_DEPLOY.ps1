# Forcar deploy novo no Vercel
Write-Host "Forcando novo deploy..." -ForegroundColor Cyan
Write-Host ""

# Remover lock
Write-Host "[1/3] Removendo lock..." -ForegroundColor Yellow
Remove-Item .git/index.lock -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 1
Remove-Item .git/index.lock -Force -ErrorAction SilentlyContinue
Write-Host "OK" -ForegroundColor Green
Write-Host ""

# Commit vazio
Write-Host "[2/3] Criando commit vazio..." -ForegroundColor Yellow
try {
    git commit --allow-empty -m "chore: Forcar redeploy Vercel"
    Write-Host "OK: Commit criado" -ForegroundColor Green
} catch {
    Write-Host "ERRO: Falhou - feche o Cursor e tente novamente" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Push
Write-Host "[3/3] Enviando para GitHub..." -ForegroundColor Yellow
try {
    git push origin main
    Write-Host "OK: Push realizado" -ForegroundColor Green
} catch {
    Write-Host "ERRO: Push falhou" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "CONCLUIDO! Deploy iniciado no Vercel." -ForegroundColor Green
Write-Host "Aguarde 1-2 minutos e verifique: https://azmt.com.br" -ForegroundColor Cyan
