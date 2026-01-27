# ════════════════════════════════════════════════════════════
# SCRIPT: Commit Correções Menu Secundário
# ════════════════════════════════════════════════════════════
# Remove tarja vermelha e centraliza menus secundários
# Execute após fechar o Cursor
# ════════════════════════════════════════════════════════════

Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  COMMIT: Correções Menu Secundário" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# 1. Remover lock do Git
Write-Host "[1/4] Removendo lock do Git..." -ForegroundColor Yellow
$lockPath = ".git/index.lock"
if (Test-Path $lockPath) {
    try {
        Remove-Item $lockPath -Force -ErrorAction Stop
        Write-Host "  ✓ Lock removido" -ForegroundColor Green
    } catch {
        Write-Host "  ✗ Erro ao remover lock: $_" -ForegroundColor Red
        Write-Host "  Tente fechar o Cursor e executar novamente" -ForegroundColor Yellow
        exit 1
    }
} else {
    Write-Host "  ✓ Lock não existe" -ForegroundColor Green
}

# 2. Adicionar arquivos modificados
Write-Host ""
Write-Host "[2/4] Adicionando arquivos ao staging..." -ForegroundColor Yellow
$files = @(
    "src/pages/AcademyNew.tsx",
    "src/components/AcademySubNav.tsx",
    "src/pages/Studio.tsx",
    "src/pages/WhatWeDo.tsx",
    "src/pages/Work.tsx"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        git add $file
        Write-Host "  ✓ $file" -ForegroundColor Green
    } else {
        Write-Host "  ✗ Arquivo não encontrado: $file" -ForegroundColor Red
    }
}

# 3. Commit
Write-Host ""
Write-Host "[3/4] Fazendo commit..." -ForegroundColor Yellow
$commitMessage = "fix: Remove tarja vermelha submenu + centraliza menus secundarios"
try {
    git commit -m $commitMessage
    Write-Host "  ✓ Commit realizado com sucesso" -ForegroundColor Green
} catch {
    Write-Host "  ✗ Erro no commit: $_" -ForegroundColor Red
    exit 1
}

# 4. Push
Write-Host ""
Write-Host "[4/4] Enviando para GitHub..." -ForegroundColor Yellow
try {
    git push origin main
    Write-Host "  ✓ Push realizado com sucesso" -ForegroundColor Green
} catch {
    Write-Host "  ✗ Erro no push: $_" -ForegroundColor Red
    Write-Host "  Verifique sua conexão e credenciais do GitHub" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  ✓ CONCLUÍDO COM SUCESSO!" -ForegroundColor Green
Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "Correções aplicadas:" -ForegroundColor White
Write-Host "  • Tarja vermelha removida dos submenus" -ForegroundColor Gray
Write-Host "  • Menus secundários centralizados" -ForegroundColor Gray
Write-Host "  • Hero junto do menu (sem espaçador)" -ForegroundColor Gray
Write-Host ""
Write-Host "Deploy automático iniciado no Vercel!" -ForegroundColor Cyan
Write-Host ""
