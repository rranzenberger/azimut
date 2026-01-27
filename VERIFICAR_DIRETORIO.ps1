# Script de Verificacao e Correcao de Diretorio
# Sempre verifica se estamos no diretorio correto do projeto

$DIRETORIO_CORRETO = "C:\Users\ranz\Documents\azimut-site-vite-tailwind"
$DIRETORIO_ATUAL = (Get-Location).Path

Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "VERIFICACAO DE DIRETORIO" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""

if ($DIRETORIO_ATUAL -eq $DIRETORIO_CORRETO) {
    Write-Host "[OK] DIRETORIO CORRETO!" -ForegroundColor Green
    Write-Host "   Local: $DIRETORIO_ATUAL" -ForegroundColor Gray
}
else {
    Write-Host "[AVISO] DIRETORIO INCORRETO!" -ForegroundColor Yellow
    Write-Host "   Atual: $DIRETORIO_ATUAL" -ForegroundColor Gray
    Write-Host "   Correto: $DIRETORIO_CORRETO" -ForegroundColor Gray
    Write-Host ""
    Write-Host "[INFO] NAVEGANDO PARA O DIRETORIO CORRETO..." -ForegroundColor Cyan
    
    Set-Location $DIRETORIO_CORRETO
    $novoLocal = (Get-Location).Path
    Write-Host "[OK] NAVEGACAO REALIZADA COM SUCESSO!" -ForegroundColor Green
    Write-Host "   Novo local: $novoLocal" -ForegroundColor Gray
}

Write-Host ""

# Verificar arquivos essenciais
Write-Host "VERIFICANDO ARQUIVOS ESSENCIAIS..." -ForegroundColor Cyan

$ARQUIVOS_ESPERADOS = @("package.json", "src", "azimut-cms", "public", ".cursorrules")
$TODOS_OK = $true

foreach ($arquivo in $ARQUIVOS_ESPERADOS) {
    $caminho = Join-Path $DIRETORIO_CORRETO $arquivo
    if (Test-Path $caminho) {
        Write-Host "   [OK] $arquivo" -ForegroundColor Green
    }
    else {
        Write-Host "   [ERRO] $arquivo (NAO ENCONTRADO)" -ForegroundColor Red
        $TODOS_OK = $false
    }
}

Write-Host ""

if ($TODOS_OK) {
    Write-Host "================================================================" -ForegroundColor Green
    Write-Host "[OK] TUDO OK! PRONTO PARA TRABALHAR!" -ForegroundColor Green
    Write-Host "================================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Diretorio: $DIRETORIO_CORRETO" -ForegroundColor Gray
    Write-Host ""
}
else {
    Write-Host "================================================================" -ForegroundColor Red
    Write-Host "[ERRO] ALGUNS ARQUIVOS ESTAO FALTANDO!" -ForegroundColor Red
    Write-Host "================================================================" -ForegroundColor Red
    Write-Host ""
    exit 1
}
