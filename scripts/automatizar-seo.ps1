# 🚀 Script Automatizado Completo para SEO
# Testa redirects + Verifica URLs + Gera relatório

param(
    [switch]$TestRedirects,
    [switch]$CheckUrls,
    [switch]$All
)

if ($All -or (-not $TestRedirects -and -not $CheckUrls)) {
    $TestRedirects = $true
    $CheckUrls = $true
}

Write-Host "═══════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "🚀 AUTOMAÇÃO SEO - AZIMUT" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

$baseUrl = "azmt.com.br"
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

# 1. TESTAR REDIRECTS
if ($TestRedirects) {
    Write-Host "1️⃣  TESTANDO REDIRECTS..." -ForegroundColor Yellow
    Write-Host ""
    
    $testPaths = @("/pt", "/pt/work", "/pt/academy", "/pt/contact")
    $testUrls = @(
        "http://www.$baseUrl",
        "http://$baseUrl",
        "https://www.$baseUrl"
    )
    
    $redirectResults = @()
    
    foreach ($url in $testUrls) {
        foreach ($path in $testPaths) {
            $fullUrl = "$url$path"
            $expectedUrl = "https://$baseUrl$path"
            
            try {
                $response = Invoke-WebRequest -Uri $fullUrl -MaximumRedirection 0 -ErrorAction SilentlyContinue -UseBasicParsing
                
                if ($response.StatusCode -eq 200) {
                    $actualUrl = $response.BaseResponse.ResponseUri.AbsoluteUri
                    $status = if ($actualUrl -eq $expectedUrl) { "✅ OK" } else { "⚠️  DIFERENTE" }
                    $redirectResults += [PSCustomObject]@{
                        TestUrl = $fullUrl
                        Expected = $expectedUrl
                        Actual = $actualUrl
                        Status = $status
                    }
                }
            }
            catch {
                if ($_.Exception.Response.StatusCode.value__ -in @(301, 302, 307, 308)) {
                    $location = $_.Exception.Response.Headers.Location
                    $redirectUrl = if ($location.IsAbsoluteUri) { $location.AbsoluteUri } else { "$url$location" }
                    $redirectResults += [PSCustomObject]@{
                        TestUrl = $fullUrl
                        Expected = $expectedUrl
                        Actual = $redirectUrl
                        Status = "✅ REDIRECT"
                    }
                } else {
                    $redirectResults += [PSCustomObject]@{
                        TestUrl = $fullUrl
                        Expected = $expectedUrl
                        Actual = "ERRO"
                        Status = "❌ ERRO"
                    }
                }
            }
        }
    }
    
    $okRedirects = ($redirectResults | Where-Object { $_.Status -like "✅*" }).Count
    $totalRedirects = $redirectResults.Count
    
    Write-Host "  ✅ Redirects OK: $okRedirects/$totalRedirects" -ForegroundColor $(if ($okRedirects -eq $totalRedirects) { "Green" } else { "Yellow" })
    Write-Host ""
}

# 2. VERIFICAR URLs
if ($CheckUrls) {
    Write-Host "2️⃣  VERIFICANDO URLs..." -ForegroundColor Yellow
    Write-Host ""
    
    $urls = @(
        "https://$baseUrl/pt",
        "https://$baseUrl/pt/work",
        "https://$baseUrl/pt/academy",
        "https://$baseUrl/pt/contact"
    )
    
    $urlResults = @()
    
    foreach ($url in $urls) {
        try {
            $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 10
            $status = if ($response.StatusCode -eq 200) { "✅ OK" } else { "⚠️  Status: $($response.StatusCode)" }
            $urlResults += [PSCustomObject]@{
                Url = $url
                Status = $status
                StatusCode = $response.StatusCode
            }
            Write-Host "  $status - $url" -ForegroundColor $(if ($response.StatusCode -eq 200) { "Green" } else { "Yellow" })
        }
        catch {
            $urlResults += [PSCustomObject]@{
                Url = $url
                Status = "❌ ERRO"
                StatusCode = "N/A"
            }
            Write-Host "  ❌ ERRO - $url" -ForegroundColor Red
        }
    }
    
    $okUrls = ($urlResults | Where-Object { $_.Status -like "✅*" }).Count
    $totalUrls = $urlResults.Count
    
    Write-Host ""
    Write-Host "  ✅ URLs OK: $okUrls/$totalUrls" -ForegroundColor $(if ($okUrls -eq $totalUrls) { "Green" } else { "Yellow" })
    Write-Host ""
}

# 3. RELATÓRIO FINAL
Write-Host "═══════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "📊 RELATÓRIO FINAL" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "Data/Hora: $timestamp" -ForegroundColor White
Write-Host ""

if ($TestRedirects) {
    Write-Host "Redirects:" -ForegroundColor White
    Write-Host "  ✅ OK: $okRedirects/$totalRedirects" -ForegroundColor $(if ($okRedirects -eq $totalRedirects) { "Green" } else { "Yellow" })
    Write-Host ""
}

if ($CheckUrls) {
    Write-Host "URLs:" -ForegroundColor White
    Write-Host "  ✅ OK: $okUrls/$totalUrls" -ForegroundColor $(if ($okUrls -eq $totalUrls) { "Green" } else { "Yellow" })
    Write-Host ""
}

# 4. PRÓXIMOS PASSOS
Write-Host "═══════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "🎯 PRÓXIMOS PASSOS" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

if ($okRedirects -eq $totalRedirects -and $okUrls -eq $totalUrls) {
    Write-Host "✅ TUDO FUNCIONANDO!" -ForegroundColor Green
    Write-Host ""
    Write-Host "1. Aguarde 24-48h para o Google re-rastrear" -ForegroundColor White
    Write-Host "2. Acesse: https://search.google.com/search-console" -ForegroundColor White
    Write-Host "3. Vá em 'Inspeção de URL'" -ForegroundColor White
    Write-Host "4. Teste: https://$baseUrl/pt" -ForegroundColor White
    Write-Host "5. Se não houver erro, clique em 'Solicitar indexação'" -ForegroundColor White
} else {
    Write-Host "⚠️  ALGUNS PROBLEMAS ENCONTRADOS" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Verifique se o deploy foi concluído" -ForegroundColor White
    Write-Host "2. Aguarde alguns minutos e execute novamente" -ForegroundColor White
    Write-Host "3. Verifique as configurações no Vercel" -ForegroundColor White
}

Write-Host ""
Write-Host "═══════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
