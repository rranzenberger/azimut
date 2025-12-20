# Script para preparar tudo para deploy na Vercel

Write-Host ""
Write-Host "=== PREPARANDO TUDO PARA DEPLOY ===" -ForegroundColor Cyan
Write-Host ""

$erros = @()
$avisos = @()

# 1. Verificar se está na pasta correta
Write-Host "1. Verificando estrutura..." -ForegroundColor Yellow
if (-not (Test-Path "azimut-cms")) {
    $erros += "Pasta azimut-cms nao encontrada. Execute na raiz do projeto."
} else {
    Write-Host "   [OK] Pasta azimut-cms encontrada" -ForegroundColor Green
}

# 2. Verificar package.json
Write-Host ""
Write-Host "2. Verificando package.json..." -ForegroundColor Yellow
if (Test-Path "azimut-cms\package.json") {
    $package = Get-Content "azimut-cms\package.json" | ConvertFrom-Json
    if ($package.scripts.build) {
        Write-Host "   [OK] Script de build configurado" -ForegroundColor Green
    } else {
        $erros += "Script de build nao encontrado no package.json"
    }
} else {
    $erros += "package.json nao encontrado"
}

# 3. Verificar next.config.js
Write-Host ""
Write-Host "3. Verificando next.config.js..." -ForegroundColor Yellow
if (Test-Path "azimut-cms\next.config.js") {
    Write-Host "   [OK] next.config.js encontrado" -ForegroundColor Green
} else {
    $avisos += "next.config.js nao encontrado (pode ser opcional)"
}

# 4. Verificar .gitignore
Write-Host ""
Write-Host "4. Verificando .gitignore..." -ForegroundColor Yellow
if (Test-Path "azimut-cms\.gitignore") {
    $gitignore = Get-Content "azimut-cms\.gitignore" -Raw
    if ($gitignore -match "\.env") {
        Write-Host "   [OK] .env esta no .gitignore" -ForegroundColor Green
    } else {
        $avisos += ".env pode nao estar ignorado"
    }
    if ($gitignore -match "node_modules") {
        Write-Host "   [OK] node_modules esta no .gitignore" -ForegroundColor Green
    }
} else {
    $avisos += ".gitignore nao encontrado no CMS"
}

# 5. Verificar se há mudanças não commitadas
Write-Host ""
Write-Host "5. Verificando git status..." -ForegroundColor Yellow
try {
    $gitStatus = git status --porcelain 2>$null
    if ($gitStatus) {
        Write-Host "   [AVISO] Ha mudancas nao commitadas:" -ForegroundColor Yellow
        $gitStatus | ForEach-Object { Write-Host "      $_" -ForegroundColor Gray }
        $avisos += "Ha mudancas nao commitadas. Faca commit antes do deploy."
    } else {
        Write-Host "   [OK] Nenhuma mudanca pendente" -ForegroundColor Green
    }
} catch {
    $avisos += "Nao foi possivel verificar git status"
}

# 6. Verificar se .env.local existe (mas não commitar)
Write-Host ""
Write-Host "6. Verificando .env.local..." -ForegroundColor Yellow
if (Test-Path "azimut-cms\.env.local") {
    Write-Host "   [OK] .env.local encontrado (nao sera commitado)" -ForegroundColor Green
    
    # Verificar variáveis importantes
    $envContent = Get-Content "azimut-cms\.env.local"
    $vars = @{
        "DATABASE_URL" = $false
        "NEXT_PUBLIC_SUPABASE_URL" = $false
        "SUPABASE_SERVICE_ROLE_KEY" = $false
    }
    
    foreach ($line in $envContent) {
        foreach ($var in $vars.Keys) {
            if ($line -match "^$var=") {
                $vars[$var] = $true
            }
        }
    }
    
    Write-Host ""
    Write-Host "   Variaveis encontradas:" -ForegroundColor Cyan
    foreach ($var in $vars.Keys) {
        if ($vars[$var]) {
            Write-Host "      [OK] $var" -ForegroundColor Green
        } else {
            Write-Host "      [FALTANDO] $var" -ForegroundColor Red
            $avisos += "$var nao encontrado no .env.local"
        }
    }
} else {
    $avisos += ".env.local nao encontrado (voce precisara configurar na Vercel)"
}

# 7. Verificar estrutura de pastas importante
Write-Host ""
Write-Host "7. Verificando estrutura de pastas..." -ForegroundColor Yellow
$pastasImportantes = @(
    "azimut-cms\app",
    "azimut-cms\prisma",
    "azimut-cms\public"
)

foreach ($pasta in $pastasImportantes) {
    if (Test-Path $pasta) {
        Write-Host "   [OK] $pasta" -ForegroundColor Green
    } else {
        $avisos += "Pasta $pasta nao encontrada"
    }
}

# 8. Gerar JWT_SECRET se não existir
Write-Host ""
Write-Host "8. Gerando JWT_SECRET para producao..." -ForegroundColor Yellow
Add-Type -AssemblyName System.Security
$bytes = New-Object byte[] 32
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($bytes)
$jwtSecret = [Convert]::ToBase64String($bytes)
Write-Host "   [OK] JWT_SECRET gerado:" -ForegroundColor Green
Write-Host "   $jwtSecret" -ForegroundColor White
Write-Host "   (Anote este valor para adicionar na Vercel)" -ForegroundColor Yellow

# Resumo
Write-Host ""
Write-Host "=== RESUMO ===" -ForegroundColor Cyan
Write-Host ""

if ($erros.Count -eq 0) {
    Write-Host "[OK] Nenhum erro critico encontrado!" -ForegroundColor Green
} else {
    Write-Host "[ERRO] Erros encontrados:" -ForegroundColor Red
    foreach ($erro in $erros) {
        Write-Host "  - $erro" -ForegroundColor Red
    }
}

if ($avisos.Count -gt 0) {
    Write-Host ""
    Write-Host "[AVISOS]:" -ForegroundColor Yellow
    foreach ($aviso in $avisos) {
        Write-Host "  - $aviso" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "=== PROXIMOS PASSOS ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Se ha mudancas nao commitadas:" -ForegroundColor White
Write-Host "   cd azimut-cms" -ForegroundColor Gray
Write-Host "   git add ." -ForegroundColor Gray
Write-Host "   git commit -m 'Preparar deploy para Vercel'" -ForegroundColor Gray
Write-Host "   git push origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Na Vercel:" -ForegroundColor White
Write-Host "   - Configure Root Directory: azimut-cms" -ForegroundColor Gray
Write-Host "   - Adicione as variaveis de ambiente" -ForegroundColor Gray
Write-Host "   - Use o JWT_SECRET gerado acima" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Apos deploy:" -ForegroundColor White
Write-Host "   cd azimut-cms" -ForegroundColor Gray
Write-Host "   npm run prisma:seed" -ForegroundColor Gray
Write-Host ""
Write-Host "JWT_SECRET para Vercel:" -ForegroundColor Yellow
Write-Host $jwtSecret -ForegroundColor White -BackgroundColor DarkBlue
Write-Host ""

