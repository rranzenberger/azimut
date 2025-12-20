# Script Interativo para Configurar o CMS
# Guia passo a passo para criar .env.local

Write-Host ""
Write-Host "===========================================================" -ForegroundColor Cyan
Write-Host "  CONFIGURACAO DO CMS AZIMUT - ASSISTENTE INTERATIVO" -ForegroundColor Cyan
Write-Host "===========================================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se está no diretório correto
if (-not (Test-Path "azimut-cms")) {
    Write-Host "ERRO: Diretorio 'azimut-cms' nao encontrado!" -ForegroundColor Red
    Write-Host "   Execute este script na raiz do projeto." -ForegroundColor Yellow
    exit 1
}

$envPath = "azimut-cms\.env.local"

# Verificar se já existe
if (Test-Path $envPath) {
    Write-Host "AVISO: Arquivo .env.local ja existe!" -ForegroundColor Yellow
    $resposta = Read-Host "   Deseja sobrescrever? (s/N)"
    if ($resposta -ne "s" -and $resposta -ne "S") {
        Write-Host "   Operação cancelada." -ForegroundColor Yellow
        exit 0
    }
}

Write-Host "Vamos configurar o arquivo .env.local passo a passo:" -ForegroundColor Green
Write-Host ""

# Função para gerar JWT Secret
function Generate-JWTSecret {
    $bytes = 1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }
    return [Convert]::ToBase64String($bytes)
}

# 1. DATABASE_URL
Write-Host "1. DATABASE_URL (PostgreSQL/Supabase)" -ForegroundColor Cyan
Write-Host "   Exemplo: postgresql://postgres:senha@host:5432/database" -ForegroundColor Gray
Write-Host "   Ou do Supabase: postgresql://postgres.xxxxx:SENHA@aws-0-sa-east-1.pooler.supabase.com:6543/postgres" -ForegroundColor Gray
$databaseUrl = Read-Host "   Cole a DATABASE_URL"
if ([string]::IsNullOrWhiteSpace($databaseUrl)) {
    Write-Host "   AVISO: DATABASE_URL vazia, mas continuando..." -ForegroundColor Yellow
}

# 2. JWT_SECRET
Write-Host ""
Write-Host "2. JWT_SECRET" -ForegroundColor Cyan
Write-Host "   Gerando secret automático..." -ForegroundColor Gray
$jwtSecret = Generate-JWTSecret
    Write-Host "   OK: Secret gerado: $($jwtSecret.Substring(0, 20))..." -ForegroundColor Green

# 3. NEXTAUTH_SECRET
Write-Host ""
Write-Host "3. NEXTAUTH_SECRET" -ForegroundColor Cyan
Write-Host "   Gerando secret automático..." -ForegroundColor Gray
$nextAuthSecret = Generate-JWTSecret
    Write-Host "   OK: Secret gerado: $($nextAuthSecret.Substring(0, 20))..." -ForegroundColor Green

# 4. NEXTAUTH_URL
Write-Host ""
Write-Host "4. NEXTAUTH_URL" -ForegroundColor Cyan
Write-Host "   Desenvolvimento: http://localhost:3001" -ForegroundColor Gray
$nextAuthUrl = Read-Host "   NEXTAUTH_URL (Enter para usar padrão)"
if ([string]::IsNullOrWhiteSpace($nextAuthUrl)) {
    $nextAuthUrl = "http://localhost:3001"
}

# 5. Supabase
Write-Host ""
Write-Host "5. Supabase (Storage de Imagens)" -ForegroundColor Cyan
Write-Host "   Você tem conta no Supabase? (s/N)" -ForegroundColor Yellow
$temSupabase = Read-Host "   "
$supabaseUrl = ""
$supabaseAnonKey = ""
$supabaseServiceKey = ""

if ($temSupabase -eq "s" -or $temSupabase -eq "S") {
    Write-Host "   Obtenha em: https://supabase.com/dashboard" -ForegroundColor Gray
    Write-Host "   Vá em: Settings -> API" -ForegroundColor Gray
    $supabaseUrl = Read-Host "   NEXT_PUBLIC_SUPABASE_URL (ex: https://xxxxx.supabase.co)"
    $supabaseAnonKey = Read-Host "   NEXT_PUBLIC_SUPABASE_ANON_KEY"
    $supabaseServiceKey = Read-Host "   SUPABASE_SERVICE_ROLE_KEY"
} else {
    Write-Host "   AVISO: Pulando Supabase (opcional)" -ForegroundColor Yellow
    Write-Host "   DICA: Voce pode adicionar depois editando .env.local" -ForegroundColor Gray
}

# 6. IA (DeepSeek)
Write-Host ""
Write-Host "6. IA - DeepSeek (Opcional)" -ForegroundColor Cyan
Write-Host "   Você tem API Key do DeepSeek? (s/N)" -ForegroundColor Yellow
$temDeepSeek = Read-Host "   "
$deepSeekKey = ""

if ($temDeepSeek -eq "s" -or $temDeepSeek -eq "S") {
    Write-Host "   Obtenha em: https://platform.deepseek.com/" -ForegroundColor Gray
    $deepSeekKey = Read-Host "   DEEPSEEK_API_KEY"
} else {
    Write-Host "   AVISO: Pulando DeepSeek (opcional)" -ForegroundColor Yellow
    Write-Host "   DICA: Voce pode adicionar depois editando .env.local" -ForegroundColor Gray
}

# 7. SITE_URL
Write-Host ""
Write-Host "7. SITE_URL" -ForegroundColor Cyan
Write-Host "   Desenvolvimento: http://localhost:5173" -ForegroundColor Gray
$siteUrl = Read-Host "   SITE_URL (Enter para usar padrão)"
if ([string]::IsNullOrWhiteSpace($siteUrl)) {
    $siteUrl = "http://localhost:5173"
}

# Criar arquivo .env.local
Write-Host ""
Write-Host "===========================================================" -ForegroundColor Cyan
Write-Host "Criando arquivo .env.local..." -ForegroundColor Green
Write-Host ""

$envContent = @"
# ═══════════════════════════════════════════════════════════════
# CONFIGURAÇÃO DO CMS AZIMUT
# Gerado automaticamente em $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
# ═══════════════════════════════════════════════════════════════

# Database (PostgreSQL/Supabase)
DATABASE_URL="$databaseUrl"

# NextAuth
NEXTAUTH_URL="$nextAuthUrl"
NEXTAUTH_SECRET="$nextAuthSecret"

# JWT
JWT_SECRET="$jwtSecret"

# Supabase (Storage de Imagens)
"@

if (-not [string]::IsNullOrWhiteSpace($supabaseUrl)) {
    $envContent += @"

NEXT_PUBLIC_SUPABASE_URL="$supabaseUrl"
NEXT_PUBLIC_SUPABASE_ANON_KEY="$supabaseAnonKey"
SUPABASE_SERVICE_ROLE_KEY="$supabaseServiceKey"
"@
} else {
    $envContent += @"
# NEXT_PUBLIC_SUPABASE_URL=
# NEXT_PUBLIC_SUPABASE_ANON_KEY=
# SUPABASE_SERVICE_ROLE_KEY=
"@
}

$envContent += @"

# IA (DeepSeek)
"@

if (-not [string]::IsNullOrWhiteSpace($deepSeekKey)) {
    $envContent += @"
AI_PROVIDER="deepseek"
DEEPSEEK_API_KEY="$deepSeekKey"
"@
} else {
    $envContent += @"
# AI_PROVIDER="deepseek"
# DEEPSEEK_API_KEY=
"@
}

$envContent += @"

# Site URL
SITE_URL="$siteUrl"

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
Write-Host "   .\scripts\verificar-config-cms.ps1" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Instalar dependências:" -ForegroundColor White
Write-Host "   cd azimut-cms" -ForegroundColor Gray
Write-Host "   npm install" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Configurar banco de dados:" -ForegroundColor White
Write-Host "   npm run prisma:generate" -ForegroundColor Gray
Write-Host "   npm run prisma:push" -ForegroundColor Gray
Write-Host "   npm run prisma:seed" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Iniciar CMS:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "===========================================================" -ForegroundColor Cyan
Write-Host ""

