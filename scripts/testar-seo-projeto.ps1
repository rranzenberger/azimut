# Script para testar se o SEO está funcionando em um projeto
# Uso: .\scripts\testar-seo-projeto.ps1 -Slug "nome-do-projeto" -Lang "pt"

param(
    [Parameter(Mandatory=$true)]
    [string]$Slug,
    
    [Parameter(Mandatory=$false)]
    [string]$Lang = "pt"
)

$API_URL = $env:VITE_BACKOFFICE_URL
if (-not $API_URL) {
    $API_URL = "https://backoffice.azmt.com.br"
}

Write-Host "🧪 Testando SEO do projeto: $Slug" -ForegroundColor Cyan
Write-Host ""

# 1. Testar API
Write-Host "1️⃣ Testando API..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$API_URL/api/public/project/$Slug?lang=$Lang" -Method Get
    Write-Host "   ✅ API respondeu com sucesso" -ForegroundColor Green
    
    if ($response.seo) {
        Write-Host "   ✅ Campos SEO encontrados:" -ForegroundColor Green
        Write-Host "      - Title: $($response.seo.title)" -ForegroundColor Gray
        Write-Host "      - Description: $($response.seo.description)" -ForegroundColor Gray
        Write-Host "      - Keywords: $($response.seo.keywords -join ', ')" -ForegroundColor Gray
    } else {
        Write-Host "   ⚠️  Campos SEO não encontrados (projeto pode não ter sido otimizado)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "   ❌ Erro ao acessar API: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "2️⃣ Verificando frontend..." -ForegroundColor Yellow
Write-Host "   Acesse: https://azmt.com.br/$Lang/work/$Slug" -ForegroundColor Cyan
Write-Host "   Pressione Ctrl+U para ver o código-fonte" -ForegroundColor Cyan
Write-Host "   Procure por <title> e <meta name='description'>" -ForegroundColor Cyan

Write-Host ""
Write-Host "✅ Teste concluído!" -ForegroundColor Green
Write-Host ""
Write-Host "💡 Dica: Se os campos SEO não aparecerem, execute:" -ForegroundColor Yellow
Write-Host "   .\EXECUTAR_OTIMIZAR_SEO.bat" -ForegroundColor Cyan
