# Script para verificar variáveis de ambiente necessárias para deploy na Vercel

Write-Host "=== VERIFICACAO DE VARIAVEIS PARA VERCEL ===" -ForegroundColor Cyan
Write-Host ""

$variaveis = @(
    @{Nome="DATABASE_URL"; Obrigatoria=$true; Descricao="URL do banco PostgreSQL (Neon/Supabase)"},
    @{Nome="JWT_SECRET"; Obrigatoria=$true; Descricao="Secret para JWT (gere com: openssl rand -base64 32)"},
    @{Nome="NODE_ENV"; Obrigatoria=$true; Descricao="production"},
    @{Nome="NEXT_PUBLIC_SUPABASE_URL"; Obrigatoria=$true; Descricao="URL do Supabase (Storage)"},
    @{Nome="SUPABASE_SERVICE_ROLE_KEY"; Obrigatoria=$true; Descricao="Service Role Key do Supabase"},
    @{Nome="SITE_URL"; Obrigatoria=$true; Descricao="URL do site principal (ex: https://azmt.com.br)"},
    @{Nome="AI_PROVIDER"; Obrigatoria=$false; Descricao="deepseek (opcional)"},
    @{Nome="DEEPSEEK_API_KEY"; Obrigatoria=$false; Descricao="API Key do DeepSeek (opcional)"}
)

Write-Host "VARIAVEIS OBRIGATORIAS:" -ForegroundColor Yellow
Write-Host ""

foreach ($var in $variaveis) {
    if ($var.Obrigatoria) {
        Write-Host "  [OBRIGATORIA] $($var.Nome)" -ForegroundColor Red
        Write-Host "    Descricao: $($var.Descricao)" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "VARIAVEIS OPCIONAIS:" -ForegroundColor Yellow
Write-Host ""

foreach ($var in $variaveis) {
    if (-not $var.Obrigatoria) {
        Write-Host "  [OPCIONAL] $($var.Nome)" -ForegroundColor Gray
        Write-Host "    Descricao: $($var.Descricao)" -ForegroundColor DarkGray
    }
}

Write-Host ""
Write-Host "=== INSTRUCOES ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Acesse: https://vercel.com/dashboard" -ForegroundColor White
Write-Host "2. Vá em Settings > Environment Variables" -ForegroundColor White
Write-Host "3. Adicione cada variavel acima" -ForegroundColor White
Write-Host "4. Marque para: Production, Preview e Development" -ForegroundColor White
Write-Host ""
Write-Host "Para gerar JWT_SECRET:" -ForegroundColor Yellow
Write-Host "  openssl rand -base64 32" -ForegroundColor Gray
Write-Host ""

