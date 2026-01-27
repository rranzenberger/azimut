# ═══════════════════════════════════════════════════════════════
# DEPLOY OPÇÕES PREMIUM - Script PowerShell
# ═══════════════════════════════════════════════════════════════
# Execute este script DEPOIS de fechar o Cursor/VS Code

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "DEPLOY - OPÇÕES PREMIUM" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Mudar para o diretório do projeto
Set-Location "C:\Users\ranz\Documents\azimut-site-vite-tailwind"

# [1/5] Remover lock do Git (se existir)
Write-Host "[1/5] Removendo lock do Git (se existir)..." -ForegroundColor Yellow
Start-Sleep -Seconds 1
if (Test-Path ".git\index.lock") {
    Write-Host "Tentando remover lock..." -ForegroundColor Yellow
    Remove-Item -Force ".git\index.lock" -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 2
    if (Test-Path ".git\index.lock") {
        Write-Host "AVISO: Lock ainda existe. Feche o Cursor/VS Code e tente novamente." -ForegroundColor Red
        Read-Host "Pressione Enter para sair"
        exit 1
    }
}

# [2/5] Adicionar arquivos premium
Write-Host "[2/5] Adicionando arquivos premium..." -ForegroundColor Yellow
git add package.json
git add src/components/Layout.tsx
git add src/index.css
git add src/pages/Home.tsx
git add vite.config.ts
git add src/components/AnalyticsDashboard.tsx
git add src/components/LeadsDashboard.tsx
git add .gitignore

# Remover arquivo deletado
if (Test-Path "public/MALU_SUB_Laura.png") {
    git rm public/MALU_SUB_Laura.png
}

# [3/5] Mostrar status
Write-Host "[3/5] Status dos arquivos..." -ForegroundColor Yellow
git status --short

# [4/5] Fazer commit
Write-Host "[4/5] Fazendo commit..." -ForegroundColor Yellow
git commit -m "feat: Deploy opcoes premium - Analytics Dashboard, Leads Dashboard e melhorias visuais

- Analytics Dashboard premium implementado
- Leads Dashboard com filtros e exportacao
- Melhorias visuais premium
- Componentes premium adicionados"

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "ERRO: Falha ao fazer commit. Verifique se há mudanças para commitar." -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}

# [5/5] Push para GitHub
Write-Host "[5/5] Enviando para GitHub (push)..." -ForegroundColor Yellow
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "SUCESSO! Deploy iniciado no Vercel." -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Opcoes Premium deployadas:" -ForegroundColor Cyan
    Write-Host "- Analytics Dashboard premium" -ForegroundColor White
    Write-Host "- Leads Dashboard com filtros" -ForegroundColor White
    Write-Host "- Melhorias visuais premium" -ForegroundColor White
    Write-Host "- Componentes premium adicionados" -ForegroundColor White
    Write-Host ""
    Write-Host "PROXIMO PASSO:" -ForegroundColor Yellow
    Write-Host "Aguarde 1-2 minutos e verifique:" -ForegroundColor White
    Write-Host "- Site: https://azmt.com.br/pt" -ForegroundColor Cyan
    Write-Host "- Backoffice: https://backoffice.azmt.com.br/admin/analytics" -ForegroundColor Cyan
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "ERRO: Falha ao fazer push. Verifique sua conexão." -ForegroundColor Red
}

Read-Host "Pressione Enter para sair"
