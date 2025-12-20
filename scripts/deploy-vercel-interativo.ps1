# Script interativo para ajudar no deploy na Vercel

Write-Host ""
Write-Host "=== DEPLOY NA VERCEL - ASSISTENTE INTERATIVO ===" -ForegroundColor Cyan
Write-Host ""

# Verificar se .env.local existe
$envPath = "azimut-cms\.env.local"
if (Test-Path $envPath) {
    Write-Host "[OK] Arquivo .env.local encontrado" -ForegroundColor Green
    Write-Host ""
    
    # Ler variáveis importantes (sem mostrar valores)
    $envContent = Get-Content $envPath
    $hasDatabase = $false
    $hasSupabase = $false
    $hasJWT = $false
    
    foreach ($line in $envContent) {
        if ($line -match '^DATABASE_URL=') { $hasDatabase = $true }
        if ($line -match '^NEXT_PUBLIC_SUPABASE_URL=') { $hasSupabase = $true }
        if ($line -match '^JWT_SECRET=' -or $line -match '^NEXTAUTH_SECRET=') { $hasJWT = $true }
    }
    
    Write-Host "Variaveis encontradas:" -ForegroundColor Yellow
    Write-Host "  DATABASE_URL: $(if ($hasDatabase) { '[OK]' } else { '[FALTANDO]' })" -ForegroundColor $(if ($hasDatabase) { 'Green' } else { 'Red' })
    Write-Host "  SUPABASE_URL: $(if ($hasSupabase) { '[OK]' } else { '[FALTANDO]' })" -ForegroundColor $(if ($hasSupabase) { 'Green' } else { 'Red' })
    Write-Host "  JWT_SECRET: $(if ($hasJWT) { '[OK]' } else { '[FALTANDO]' })" -ForegroundColor $(if ($hasJWT) { 'Green' } else { 'Red' })
    Write-Host ""
} else {
    Write-Host "[AVISO] Arquivo .env.local nao encontrado" -ForegroundColor Yellow
    Write-Host "  Configure antes de fazer deploy" -ForegroundColor Gray
    Write-Host ""
}

Write-Host "=== PASSO 1: VERCEL ===" -ForegroundColor Green
Write-Host ""
Write-Host "1. Acesse: https://vercel.com/dashboard" -ForegroundColor White
Write-Host ""
$temProjeto = Read-Host "Voce ja tem um projeto na Vercel? (S/N)"

if ($temProjeto -eq "S" -or $temProjeto -eq "s") {
    Write-Host ""
    Write-Host "[OK] Projeto ja existe" -ForegroundColor Green
    Write-Host ""
    Write-Host "2. Abra o projeto na Vercel" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "=== CRIAR PROJETO ===" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Clique em 'Add New' > 'Project'" -ForegroundColor White
    Write-Host "2. Conecte seu repositorio GitHub" -ForegroundColor White
    Write-Host "3. Selecione o repositorio do projeto" -ForegroundColor White
    Write-Host "4. Clique em 'Import'" -ForegroundColor White
    Write-Host ""
    Write-Host "Aguarde criar o projeto..." -ForegroundColor Cyan
    Write-Host ""
    $continuar = Read-Host "Projeto criado? (S para continuar)"
}

Write-Host ""
Write-Host "=== PASSO 2: ROOT DIRECTORY ===" -ForegroundColor Green
Write-Host ""
Write-Host "No projeto na Vercel:" -ForegroundColor White
Write-Host "1. Vá em Settings > General" -ForegroundColor Gray
Write-Host "2. Role até 'Root Directory'" -ForegroundColor Gray
Write-Host "3. Clique em 'Edit'" -ForegroundColor Gray
Write-Host "4. Digite: azimut-cms" -ForegroundColor Gray
Write-Host "5. Clique em 'Save'" -ForegroundColor Gray
Write-Host ""
$rootConfigurado = Read-Host "Root Directory configurado? (S para continuar)"

if ($rootConfigurado -ne "S" -and $rootConfigurado -ne "s") {
    Write-Host ""
    Write-Host "[AVISO] Configure o Root Directory antes de continuar" -ForegroundColor Yellow
    exit
}

Write-Host ""
Write-Host "=== PASSO 3: VARIAVEIS DE AMBIENTE ===" -ForegroundColor Green
Write-Host ""
Write-Host "No projeto na Vercel:" -ForegroundColor White
Write-Host "1. Vá em Settings > Environment Variables" -ForegroundColor Gray
Write-Host "2. Adicione cada variavel abaixo:" -ForegroundColor Gray
Write-Host ""

# Gerar JWT_SECRET se não existir
if (-not $hasJWT) {
    Write-Host "Gerando JWT_SECRET..." -ForegroundColor Yellow
    Add-Type -AssemblyName System.Security
    $bytes = New-Object byte[] 32
    $rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
    $rng.GetBytes($bytes)
    $jwtSecret = [Convert]::ToBase64String($bytes)
    Write-Host ""
    Write-Host "JWT_SECRET gerado:" -ForegroundColor Green
    Write-Host $jwtSecret -ForegroundColor White
    Write-Host ""
}

Write-Host "VARIAVEIS OBRIGATORIAS:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. DATABASE_URL" -ForegroundColor White
Write-Host "   Valor: (copie do seu .env.local)" -ForegroundColor Gray
Write-Host ""

if (Test-Path $envPath) {
    $dbLine = Get-Content $envPath | Where-Object { $_ -match '^DATABASE_URL=' }
    if ($dbLine) {
        Write-Host "   Valor encontrado no .env.local (copie este):" -ForegroundColor Cyan
        Write-Host "   $dbLine" -ForegroundColor White
        Write-Host ""
    }
}

Write-Host "2. JWT_SECRET" -ForegroundColor White
if ($jwtSecret) {
    Write-Host "   Valor: $jwtSecret" -ForegroundColor Gray
} else {
    Write-Host "   Valor: (gere com: .\scripts\gerar-jwt-secret.ps1)" -ForegroundColor Gray
}
Write-Host ""

Write-Host "3. NODE_ENV" -ForegroundColor White
Write-Host "   Valor: production" -ForegroundColor Gray
Write-Host ""

Write-Host "4. NEXT_PUBLIC_SUPABASE_URL" -ForegroundColor White
Write-Host "   Valor: (copie do seu .env.local)" -ForegroundColor Gray
Write-Host ""

if (Test-Path $envPath) {
    $supabaseLine = Get-Content $envPath | Where-Object { $_ -match '^NEXT_PUBLIC_SUPABASE_URL=' }
    if ($supabaseLine) {
        Write-Host "   Valor encontrado no .env.local:" -ForegroundColor Cyan
        Write-Host "   $supabaseLine" -ForegroundColor White
        Write-Host ""
    }
}

Write-Host "5. SUPABASE_SERVICE_ROLE_KEY" -ForegroundColor White
Write-Host "   Valor: (copie do seu .env.local)" -ForegroundColor Gray
Write-Host ""

Write-Host "6. SITE_URL" -ForegroundColor White
Write-Host "   Valor: https://azmt.com.br" -ForegroundColor Gray
Write-Host ""

Write-Host "IMPORTANTE:" -ForegroundColor Red
Write-Host "  - Marque TODAS para: Production, Preview e Development" -ForegroundColor Yellow
Write-Host "  - Clique em 'Save' para cada variavel" -ForegroundColor Yellow
Write-Host ""

$variaveisConfiguradas = Read-Host "Todas as variaveis foram adicionadas? (S para continuar)"

if ($variaveisConfiguradas -ne "S" -and $variaveisConfiguradas -ne "s") {
    Write-Host ""
    Write-Host "[AVISO] Configure todas as variaveis antes de continuar" -ForegroundColor Yellow
    exit
}

Write-Host ""
Write-Host "=== PASSO 4: DEPLOY ===" -ForegroundColor Green
Write-Host ""
Write-Host "Opcao A - Via GitHub (Recomendado):" -ForegroundColor Yellow
Write-Host "  1. cd azimut-cms" -ForegroundColor Gray
Write-Host "  2. git add ." -ForegroundColor Gray
Write-Host "  3. git commit -m 'Preparar deploy'" -ForegroundColor Gray
Write-Host "  4. git push origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "Opcao B - Manual na Vercel:" -ForegroundColor Yellow
Write-Host "  1. Vá em Deployments" -ForegroundColor Gray
Write-Host "  2. Clique em 'Redeploy' ou 'Deploy'" -ForegroundColor Gray
Write-Host ""

$deployFeito = Read-Host "Deploy iniciado? (S para continuar)"

Write-Host ""
Write-Host "=== PASSO 5: AGUARDAR BUILD ===" -ForegroundColor Green
Write-Host ""
Write-Host "Aguarde 2-5 minutos para o build completar" -ForegroundColor Yellow
Write-Host "Monitore em: Deployments > (ultimo deploy) > Logs" -ForegroundColor Gray
Write-Host ""

$buildCompleto = Read-Host "Build completou com sucesso? (S para continuar)"

if ($buildCompleto -ne "S" -and $buildCompleto -ne "s") {
    Write-Host ""
    Write-Host "[ERRO] Verifique os logs na Vercel para ver o erro" -ForegroundColor Red
    Write-Host "  Erros comuns:" -ForegroundColor Yellow
    Write-Host "    - DATABASE_URL incorreta" -ForegroundColor Gray
    Write-Host "    - Variaveis faltando" -ForegroundColor Gray
    Write-Host "    - Erro de build" -ForegroundColor Gray
    exit
}

Write-Host ""
Write-Host "=== PASSO 6: EXECUTAR SEED ===" -ForegroundColor Green
Write-Host ""
Write-Host "Para criar o usuario admin, execute localmente:" -ForegroundColor White
Write-Host ""
Write-Host "  cd azimut-cms" -ForegroundColor Gray
Write-Host "  npm run prisma:push" -ForegroundColor Gray
Write-Host "  npm run prisma:seed" -ForegroundColor Gray
Write-Host ""
Write-Host "Isso cria:" -ForegroundColor Yellow
Write-Host "  Email: admin@azimut.com.br" -ForegroundColor Gray
Write-Host "  Senha: Azimut2025!" -ForegroundColor Gray
Write-Host ""

$seedFeito = Read-Host "Seed executado? (S para continuar)"

Write-Host ""
Write-Host "=== PASSO 7: TESTAR ===" -ForegroundColor Green
Write-Host ""
Write-Host "1. Acesse a URL do seu projeto na Vercel" -ForegroundColor White
Write-Host "2. Teste login: /login" -ForegroundColor White
Write-Host "3. Teste API: /api/geo" -ForegroundColor White
Write-Host ""

Write-Host "=== DEPLOY CONCLUIDO! ===" -ForegroundColor Green
Write-Host ""
Write-Host "Proximo passo: Conectar o site principal" -ForegroundColor Cyan
Write-Host "  Leia: DEPLOY_E_INTEGRACAO_COMPLETA.md (PRIORIDADE 2)" -ForegroundColor Yellow
Write-Host ""

