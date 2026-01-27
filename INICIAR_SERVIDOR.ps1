# Script para Iniciar o Servidor - Execute este arquivo
# Clique com botão direito e selecione "Executar com PowerShell"

# Mudar para o diretório do projeto
cd c:\Users\ranz\Documents\azimut-site-vite-tailwind

# Verificar se está no diretório correto
Write-Host "Diretório atual: $(Get-Location)" -ForegroundColor Cyan

# Verificar se package.json existe
if (Test-Path "package.json") {
    Write-Host "package.json encontrado! ✓" -ForegroundColor Green
    Write-Host "`nIniciando servidor...`n" -ForegroundColor Yellow
    npm run dev
} else {
    Write-Host "ERRO: package.json não encontrado!" -ForegroundColor Red
    Write-Host "Certifique-se de estar na pasta correta do projeto." -ForegroundColor Yellow
    pause
}
