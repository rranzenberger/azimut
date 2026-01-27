# Script de Verificação de Localização
# Garante que estamos sempre no diretório correto do projeto

$expectedPath = "C:\Users\ranz\Documents\azimut-site-vite-tailwind"
$currentPath = Get-Location

Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "VERIFICAÇÃO DE LOCALIZAÇÃO DO PROJETO" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

if ($currentPath.Path -eq $expectedPath) {
    Write-Host "✅ DIRETÓRIO CORRETO!" -ForegroundColor Green
    Write-Host "   Localização: $currentPath" -ForegroundColor Green
} else {
    Write-Host "❌ DIRETÓRIO INCORRETO!" -ForegroundColor Red
    Write-Host "   Esperado: $expectedPath" -ForegroundColor Yellow
    Write-Host "   Atual:    $currentPath" -ForegroundColor Red
    Write-Host ""
    Write-Host "🔄 Navegando para o diretório correto..." -ForegroundColor Yellow
    Set-Location $expectedPath
    Write-Host "✅ Agora estamos em: $(Get-Location)" -ForegroundColor Green
}

Write-Host ""
Write-Host "Verificando arquivos essenciais..." -ForegroundColor Cyan

$files = @("package.json", "src", "public", ".cursorrules")
$allOk = $true

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "   ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "   ❌ $file (NÃO ENCONTRADO!)" -ForegroundColor Red
        $allOk = $false
    }
}

Write-Host ""
if ($allOk) {
    Write-Host "✅ TUDO OK! Pronto para trabalhar." -ForegroundColor Green
} else {
    Write-Host "⚠️  ALGUNS ARQUIVOS FALTANDO!" -ForegroundColor Yellow
}

Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
