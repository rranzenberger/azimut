# Script Interativo para Configurar o Site Principal
# Guia passo a passo para criar .env

Write-Host ""
Write-Host "===========================================================" -ForegroundColor Cyan
Write-Host "  CONFIGURACAO DO SITE AZIMUT - ASSISTENTE INTERATIVO" -ForegroundColor Cyan
Write-Host "===========================================================" -ForegroundColor Cyan
Write-Host ""

$envPath = ".env"

# Verificar se já existe
if (Test-Path $envPath) {
    Write-Host "AVISO: Arquivo .env ja existe!" -ForegroundColor Yellow
    $resposta = Read-Host "   Deseja sobrescrever? (s/N)"
    if ($resposta -ne "s" -and $resposta -ne "S") {
        Write-Host "   Operação cancelada." -ForegroundColor Yellow
        exit 0
    }
}

Write-Host "Vamos configurar o arquivo .env passo a passo:" -ForegroundColor Green
Write-Host ""

# 1. VITE_CMS_API_URL
Write-Host "1. VITE_CMS_API_URL" -ForegroundColor Cyan
Write-Host "   URL da API do CMS (Backoffice)" -ForegroundColor Gray
Write-Host ""
Write-Host "   Escolha o ambiente:" -ForegroundColor Yellow
Write-Host "   1) Desenvolvimento local (http://localhost:3001/api)" -ForegroundColor White
Write-Host "   2) Produção (https://azimut-backoffice.vercel.app/api)" -ForegroundColor White
Write-Host "   3) Personalizado" -ForegroundColor White
Write-Host ""
$opcao = Read-Host "   Digite o número (1-3)"

$cmsApiUrl = ""
switch ($opcao) {
    "1" {
        $cmsApiUrl = "http://localhost:3001/api"
        Write-Host "   OK: Usando: $cmsApiUrl" -ForegroundColor Green
    }
    "2" {
        $cmsApiUrl = "https://azimut-backoffice.vercel.app/api"
        Write-Host "   OK: Usando: $cmsApiUrl" -ForegroundColor Green
    }
    "3" {
        $cmsApiUrl = Read-Host "   Cole a URL completa"
    }
    default {
        $cmsApiUrl = "http://localhost:3001/api"
        Write-Host "   OK: Usando padrao: $cmsApiUrl" -ForegroundColor Green
    }
}

# Criar arquivo .env
Write-Host ""
Write-Host "===========================================================" -ForegroundColor Cyan
Write-Host "Criando arquivo .env..." -ForegroundColor Green
Write-Host ""

$envContent = @"
# ═══════════════════════════════════════════════════════════════
# CONFIGURAÇÃO DO SITE AZIMUT
# Gerado automaticamente em $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
# ═══════════════════════════════════════════════════════════════

# URL da API do CMS (Backoffice)
VITE_CMS_API_URL="$cmsApiUrl"

# ═══════════════════════════════════════════════════════════════
# OPCIONAL: Outras variáveis de ambiente
# ═══════════════════════════════════════════════════════════════

# Analytics (Plausible)
# VITE_PLAUSIBLE_DOMAIN=azmt.com.br

# ═══════════════════════════════════════════════════════════════
"@

# Salvar arquivo
try {
    $envContent | Out-File -FilePath $envPath -Encoding UTF8 -NoNewline
    Write-Host "OK: Arquivo criado com sucesso: $envPath" -ForegroundColor Green
} catch {
    Write-Host "ERRO: Erro ao criar arquivo: $_" -ForegroundColor Red
    exit 1
}

# Resumo
Write-Host ""
Write-Host "===========================================================" -ForegroundColor Cyan
Write-Host "OK: CONFIGURACAO CONCLUIDA!" -ForegroundColor Green
Write-Host ""
Write-Host "Proximos passos:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Verificar configuração:" -ForegroundColor White
Write-Host "   .\scripts\verificar-integracao-site.ps1" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Iniciar site:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Testar integração:" -ForegroundColor White
Write-Host "   - Abra DevTools > Network" -ForegroundColor Gray
Write-Host "   - Navegue pelo site" -ForegroundColor Gray
Write-Host "   - Verifique chamadas para $cmsApiUrl" -ForegroundColor Gray
Write-Host ""
Write-Host "===========================================================" -ForegroundColor Cyan
Write-Host ""

