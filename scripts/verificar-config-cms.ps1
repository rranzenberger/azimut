# Script para verificar configuração do CMS antes do deploy
# Verifica variáveis de ambiente necessárias

Write-Host "🔍 Verificando configuração do CMS..." -ForegroundColor Cyan
Write-Host ""

$errors = @()
$warnings = @()

# Verificar se está no diretório correto
if (-not (Test-Path "azimut-cms")) {
    $errors += "❌ Diretório 'azimut-cms' não encontrado. Execute este script na raiz do projeto."
}

# Verificar arquivo .env.local
if (Test-Path "azimut-cms\.env.local") {
    Write-Host "✅ Arquivo .env.local encontrado" -ForegroundColor Green
    
    # Ler e verificar variáveis
    $envContent = Get-Content "azimut-cms\.env.local" -Raw
    
    $requiredVars = @(
        "DATABASE_URL",
        "JWT_SECRET",
        "NEXTAUTH_SECRET"
    )
    
    $optionalVars = @(
        "NEXT_PUBLIC_SUPABASE_URL",
        "SUPABASE_SERVICE_ROLE_KEY",
        "DEEPSEEK_API_KEY",
        "AI_PROVIDER"
    )
    
    Write-Host ""
    Write-Host "📋 Variáveis obrigatórias:" -ForegroundColor Yellow
    foreach ($var in $requiredVars) {
        if ($envContent -match "$var=") {
            $value = ($envContent | Select-String "$var=(.+)" | ForEach-Object { $_.Matches.Groups[1].Value })
            if ($value -and $value -ne "" -and $value -notmatch "^\s*$") {
                Write-Host "  ✅ $var" -ForegroundColor Green
            } else {
                $errors += "❌ $var está vazia ou não definida"
            }
        } else {
            $errors += "❌ $var não encontrada no .env.local"
        }
    }
    
    Write-Host ""
    Write-Host "📋 Variáveis opcionais:" -ForegroundColor Yellow
    foreach ($var in $optionalVars) {
        if ($envContent -match "$var=") {
            $value = ($envContent | Select-String "$var=(.+)" | ForEach-Object { $_.Matches.Groups[1].Value })
            if ($value -and $value -ne "" -and $value -notmatch "^\s*$") {
                Write-Host "  ✅ $var" -ForegroundColor Green
            } else {
                $warnings += "⚠️  $var está vazia (opcional, mas recomendado)"
            }
        } else {
            $warnings += "⚠️  $var não encontrada (opcional)"
        }
    }
} else {
    $errors += "❌ Arquivo .env.local não encontrado em azimut-cms/"
    Write-Host "💡 Dica: Copie .env.example para .env.local e configure" -ForegroundColor Yellow
}

# Verificar se node_modules existe
if (Test-Path "azimut-cms\node_modules") {
    Write-Host ""
    Write-Host "✅ node_modules encontrado" -ForegroundColor Green
} else {
    $warnings += "⚠️  node_modules não encontrado. Execute: cd azimut-cms && npm install"
}

# Verificar se Prisma está configurado
if (Test-Path "azimut-cms\prisma\schema.prisma") {
    Write-Host "✅ Schema Prisma encontrado" -ForegroundColor Green
} else {
    $errors += "❌ Schema Prisma não encontrado"
}

# Resultado final
Write-Host ""
Write-Host "════════════════════════════════════════" -ForegroundColor Cyan
if ($errors.Count -eq 0) {
    Write-Host "✅ Configuração OK! Pronto para deploy." -ForegroundColor Green
} else {
    Write-Host "❌ Encontrados $($errors.Count) erro(s):" -ForegroundColor Red
    foreach ($error in $errors) {
        Write-Host "  $error" -ForegroundColor Red
    }
}

if ($warnings.Count -gt 0) {
    Write-Host ""
    Write-Host "⚠️  Avisos ($($warnings.Count)):" -ForegroundColor Yellow
    foreach ($warning in $warnings) {
        Write-Host "  $warning" -ForegroundColor Yellow
    }
}

Write-Host "════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

if ($errors.Count -gt 0) {
    exit 1
} else {
    exit 0
}


