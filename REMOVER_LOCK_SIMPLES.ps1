# Script simples para remover lock do Git
# Execute: .\REMOVER_LOCK_SIMPLES.ps1

$lockPath = ".git/index.lock"

if (Test-Path $lockPath) {
    Write-Host "Removendo lock..." -ForegroundColor Yellow
    try {
        Remove-Item $lockPath -Force
        Write-Host "✓ Lock removido com sucesso!" -ForegroundColor Green
    } catch {
        Write-Host "✗ Erro: $_" -ForegroundColor Red
        Write-Host ""
        Write-Host "Tente:" -ForegroundColor Yellow
        Write-Host "1. Fechar o Cursor completamente" -ForegroundColor White
        Write-Host "2. Executar: Remove-Item .git/index.lock -Force" -ForegroundColor White
    }
} else {
    Write-Host "✓ Lock não existe (tudo OK!)" -ForegroundColor Green
}

Write-Host ""
Write-Host "Agora você pode executar:" -ForegroundColor Cyan
Write-Host "  .\COMMIT_CORRECOES_MENU.ps1" -ForegroundColor White
