# Script para verificar se o site está integrado com o CMS
# Verifica se as páginas estão usando tracking e hooks do CMS

Write-Host "🔍 Verificando integração do site com CMS..." -ForegroundColor Cyan
Write-Host ""

$errors = @()
$warnings = @()
$success = @()

# Verificar arquivo .env
if (Test-Path ".env") {
    $envContent = Get-Content ".env" -Raw
    if ($envContent -match "VITE_CMS_API_URL") {
        $success += "✅ VITE_CMS_API_URL encontrada no .env"
    } else {
        $warnings += "⚠️  VITE_CMS_API_URL não encontrada no .env"
    }
} else {
    $warnings += "⚠️  Arquivo .env não encontrado na raiz"
}

# Verificar se analytics.ts existe
if (Test-Path "src\utils\analytics.ts") {
    $success += "✅ src/utils/analytics.ts existe"
    
    $analyticsContent = Get-Content "src\utils\analytics.ts" -Raw
    
    # Verificar funções principais
    $functions = @("trackPageView", "trackProjectInteraction", "submitLead", "getSessionId")
    foreach ($func in $functions) {
        if ($analyticsContent -match "export.*$func") {
            $success += "  ✅ Função $func exportada"
        } else {
            $warnings += "  ⚠️  Função $func não encontrada"
        }
    }
} else {
    $errors += "❌ src/utils/analytics.ts não encontrado"
}

# Verificar se useAzimutContent existe
if (Test-Path "src\hooks\useAzimutContent.ts") {
    $success += "✅ src/hooks/useAzimutContent.ts existe"
} else {
    $warnings += "⚠️  src/hooks/useAzimutContent.ts não encontrado"
}

# Verificar páginas principais
$pages = @(
    @{ Path = "src\pages\Home.tsx"; ShouldHave = @("trackPageView", "useAzimutContent") },
    @{ Path = "src\pages\Contact.tsx"; ShouldHave = @("submitLead") },
    @{ Path = "src\pages\Work.tsx"; ShouldHave = @("trackProjectInteraction") }
)

Write-Host ""
Write-Host "📄 Verificando páginas:" -ForegroundColor Yellow

foreach ($page in $pages) {
    $pageName = Split-Path $page.Path -Leaf
    if (Test-Path $page.Path) {
        $content = Get-Content $page.Path -Raw
        
        Write-Host "  📄 $pageName" -ForegroundColor Cyan
        
        foreach ($check in $page.ShouldHave) {
            if ($content -match $check) {
                Write-Host "    ✅ Usa $check" -ForegroundColor Green
            } else {
                $warnings += "    ⚠️  $pageName não usa $check"
                Write-Host "    ⚠️  Não usa $check" -ForegroundColor Yellow
            }
        }
    } else {
        $warnings += "⚠️  $pageName não encontrada"
    }
}

# Resultado final
Write-Host ""
Write-Host "════════════════════════════════════════" -ForegroundColor Cyan

if ($success.Count -gt 0) {
    Write-Host "✅ Sucessos ($($success.Count)):" -ForegroundColor Green
    foreach ($s in $success) {
        Write-Host "  $s" -ForegroundColor Green
    }
}

if ($warnings.Count -gt 0) {
    Write-Host ""
    Write-Host "⚠️  Avisos ($($warnings.Count)):" -ForegroundColor Yellow
    foreach ($warning in $warnings) {
        Write-Host "  $warning" -ForegroundColor Yellow
    }
}

if ($errors.Count -gt 0) {
    Write-Host ""
    Write-Host "❌ Erros ($($errors.Count)):" -ForegroundColor Red
    foreach ($error in $errors) {
        Write-Host "  $error" -ForegroundColor Red
    }
}

Write-Host "════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

if ($errors.Count -gt 0) {
    exit 1
} else {
    exit 0
}


