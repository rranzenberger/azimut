# 🔧 Script para Testar Redirects Automaticamente
# Testa se os redirects HTTP→HTTPS e www→sem www estão funcionando

Write-Host "🔍 Testando Redirects do Site Azimut..." -ForegroundColor Cyan
Write-Host ""

$baseUrl = "azmt.com.br"
$testPaths = @("/pt", "/pt/work", "/pt/academy", "/pt/contact")

# URLs para testar
$testUrls = @(
    "http://www.$baseUrl",
    "http://$baseUrl",
    "https://www.$baseUrl"
)

$results = @()

foreach ($url in $testUrls) {
    foreach ($path in $testPaths) {
        $fullUrl = "$url$path"
        $expectedUrl = "https://$baseUrl$path"
        
        Write-Host "Testando: $fullUrl" -ForegroundColor Yellow
        Write-Host "  Esperado: $expectedUrl" -ForegroundColor Gray
        
        try {
            # Fazer requisição e seguir redirects
            $response = Invoke-WebRequest -Uri $fullUrl -MaximumRedirection 0 -ErrorAction SilentlyContinue -UseBasicParsing
            
            # Se não redirecionou (código 200), verificar se é HTTPS
            if ($response.StatusCode -eq 200) {
                $actualUrl = $response.BaseResponse.ResponseUri.AbsoluteUri
                if ($actualUrl -eq $expectedUrl) {
                    Write-Host "  ✅ OK - URL correta: $actualUrl" -ForegroundColor Green
                    $results += [PSCustomObject]@{
                        TestUrl = $fullUrl
                        Expected = $expectedUrl
                        Actual = $actualUrl
                        Status = "✅ OK"
                    }
                } else {
                    Write-Host "  ⚠️  ATENÇÃO - URL diferente: $actualUrl" -ForegroundColor Yellow
                    $results += [PSCustomObject]@{
                        TestUrl = $fullUrl
                        Expected = $expectedUrl
                        Actual = $actualUrl
                        Status = "⚠️  DIFERENTE"
                    }
                }
            }
        }
        catch {
            # Verificar se é redirect (301/302)
            if ($_.Exception.Response.StatusCode.value__ -in @(301, 302, 307, 308)) {
                $location = $_.Exception.Response.Headers.Location
                if ($location) {
                    $redirectUrl = if ($location.IsAbsoluteUri) { $location.AbsoluteUri } else { "$url$location" }
                    Write-Host "  ✅ REDIRECT para: $redirectUrl" -ForegroundColor Green
                    $results += [PSCustomObject]@{
                        TestUrl = $fullUrl
                        Expected = $expectedUrl
                        Actual = $redirectUrl
                        Status = "✅ REDIRECT"
                    }
                } else {
                    Write-Host "  ❌ ERRO - Redirect sem Location header" -ForegroundColor Red
                    $results += [PSCustomObject]@{
                        TestUrl = $fullUrl
                        Expected = $expectedUrl
                        Actual = "ERRO"
                        Status = "❌ ERRO"
                    }
                }
            } else {
                Write-Host "  ❌ ERRO: $($_.Exception.Message)" -ForegroundColor Red
                $results += [PSCustomObject]@{
                    TestUrl = $fullUrl
                    Expected = $expectedUrl
                    Actual = "ERRO"
                    Status = "❌ ERRO"
                }
            }
        }
        
        Write-Host ""
        Start-Sleep -Milliseconds 500
    }
}

# Resumo
Write-Host "═══════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "📊 RESUMO DOS TESTES" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

$okCount = ($results | Where-Object { $_.Status -like "✅*" }).Count
$errorCount = ($results | Where-Object { $_.Status -like "❌*" }).Count
$warningCount = ($results | Where-Object { $_.Status -like "⚠️*" }).Count
$totalCount = $results.Count

Write-Host "Total de testes: $totalCount" -ForegroundColor White
Write-Host "✅ Sucesso: $okCount" -ForegroundColor Green
Write-Host "⚠️  Avisos: $warningCount" -ForegroundColor Yellow
Write-Host "❌ Erros: $errorCount" -ForegroundColor Red
Write-Host ""

if ($errorCount -eq 0 -and $warningCount -eq 0) {
    Write-Host "🎉 TODOS OS REDIRECTS ESTÃO FUNCIONANDO!" -ForegroundColor Green
    Write-Host ""
    Write-Host "✅ Próximos passos:" -ForegroundColor Cyan
    Write-Host "   1. Aguarde 24-48h para o Google re-rastrear"
    Write-Host "   2. Volte ao Google Search Console"
    Write-Host "   3. Use: https://$baseUrl/pt (com HTTPS e sem www)"
    Write-Host "   4. Solicite indexação novamente"
} else {
    Write-Host "⚠️  ALGUNS REDIRECTS PRECISAM DE ATENÇÃO" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Verifique os erros acima e:" -ForegroundColor Yellow
    Write-Host "   1. Confirme que o deploy foi concluído"
    Write-Host "   2. Aguarde alguns minutos e teste novamente"
    Write-Host "   3. Verifique as configurações no Vercel"
}

Write-Host ""
