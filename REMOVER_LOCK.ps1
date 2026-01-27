# Remover lock do Git
$lockPath = ".git/index.lock"

if (Test-Path $lockPath) {
    Write-Host "Removendo lock..." -ForegroundColor Yellow
    Remove-Item $lockPath -Force -ErrorAction SilentlyContinue
    if (-not (Test-Path $lockPath)) {
        Write-Host "OK: Lock removido!" -ForegroundColor Green
    } else {
        Write-Host "ERRO: Nao foi possivel remover. Feche o Cursor primeiro." -ForegroundColor Red
    }
} else {
    Write-Host "OK: Lock nao existe" -ForegroundColor Green
}
