# 🔍 Script para Verificar Status no Google Search Console
# Ajuda a verificar se as URLs estão indexadas corretamente

Write-Host "🔍 Verificador de Status Google Search Console" -ForegroundColor Cyan
Write-Host ""

$baseUrl = "azmt.com.br"
$urls = @(
    "https://$baseUrl/pt",
    "https://$baseUrl/pt/work",
    "https://$baseUrl/pt/academy",
    "https://$baseUrl/pt/contact"
)

Write-Host "📋 URLs para verificar no Google Search Console:" -ForegroundColor Yellow
Write-Host ""

foreach ($url in $urls) {
    Write-Host "  • $url" -ForegroundColor White
}

Write-Host ""
Write-Host "═══════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "📝 INSTRUÇÕES MANUAIS" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Acesse: https://search.google.com/search-console" -ForegroundColor White
Write-Host ""
Write-Host "2. Selecione a propriedade: https://$baseUrl" -ForegroundColor White
Write-Host ""
Write-Host "3. Vá em 'Inspeção de URL' (menu lateral)" -ForegroundColor White
Write-Host ""
Write-Host "4. Para cada URL acima:" -ForegroundColor Yellow
Write-Host "   a) Cole a URL na barra de pesquisa" -ForegroundColor Gray
Write-Host "   b) Pressione Enter" -ForegroundColor Gray
Write-Host "   c) Aguarde análise (alguns segundos)" -ForegroundColor Gray
Write-Host "   d) Verifique o status:" -ForegroundColor Gray
Write-Host "      ✅ 'URL está no Google' = Indexada" -ForegroundColor Green
Write-Host "      ⚠️  'URL não está no Google' = Não indexada" -ForegroundColor Yellow
Write-Host "      ❌ 'Erro de redirecionamento' = Problema (deve estar resolvido)" -ForegroundColor Red
Write-Host "   e) Se não houver erro, clique em 'Solicitar indexação'" -ForegroundColor Gray
Write-Host ""
Write-Host "5. Aguarde 24-48h para indexação" -ForegroundColor White
Write-Host ""
Write-Host "═══════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "💡 DICA" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "Use SEMPRE HTTPS e SEM www:" -ForegroundColor Yellow
Write-Host "  ✅ https://$baseUrl/pt" -ForegroundColor Green
Write-Host "  ❌ http://www.$baseUrl/pt" -ForegroundColor Red
Write-Host "  ❌ http://$baseUrl/pt" -ForegroundColor Red
Write-Host "  ❌ https://www.$baseUrl/pt" -ForegroundColor Red
Write-Host ""

# Testar se as URLs estão acessíveis
Write-Host "🔍 Testando se as URLs estão acessíveis..." -ForegroundColor Cyan
Write-Host ""

foreach ($url in $urls) {
    try {
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 10
        if ($response.StatusCode -eq 200) {
            Write-Host "  ✅ $url - OK (Status: $($response.StatusCode))" -ForegroundColor Green
        } else {
            Write-Host "  ⚠️  $url - Status: $($response.StatusCode)" -ForegroundColor Yellow
        }
    }
    catch {
        Write-Host "  ❌ $url - ERRO: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "✅ Teste concluído!" -ForegroundColor Green
Write-Host ""
