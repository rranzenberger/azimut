# Script para listar todos os projetos disponíveis com seus slugs
# Uso: .\scripts\listar-projetos-disponiveis.ps1

$API_URL = $env:VITE_BACKOFFICE_URL
if (-not $API_URL) {
    $API_URL = "https://backoffice.azmt.com.br"
}

Write-Host "📋 Listando projetos disponíveis..." -ForegroundColor Cyan
Write-Host ""

try {
    # Buscar projetos via API pública de conteúdo
    $response = Invoke-RestMethod -Uri "$API_URL/api/public/content?page=work&lang=pt" -Method Get
    
    if ($response.highlightProjects -and $response.highlightProjects.Count -gt 0) {
        Write-Host "✅ Encontrados $($response.highlightProjects.Count) projetos:" -ForegroundColor Green
        Write-Host ""
        
        $response.highlightProjects | ForEach-Object {
            $slug = $_.slug
            $title = $_.title
            Write-Host "   📌 $title" -ForegroundColor Yellow
            Write-Host "      Slug: $slug" -ForegroundColor Gray
            Write-Host "      URL: https://azmt.com.br/pt/work/$slug" -ForegroundColor Cyan
            Write-Host ""
        }
        
        Write-Host "💡 Para testar o SEO, use um dos slugs acima!" -ForegroundColor Green
        Write-Host "   Exemplo: https://azmt.com.br/pt/work/$($response.highlightProjects[0].slug)" -ForegroundColor Cyan
    } else {
        Write-Host "⚠️  Nenhum projeto encontrado" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Erro ao buscar projetos: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Tentando método alternativo..." -ForegroundColor Yellow
    
    # Método alternativo: buscar direto do banco via script
    Write-Host "   Execute: cd azimut-cms && npx tsx scripts/listar-projetos.ts" -ForegroundColor Cyan
}
