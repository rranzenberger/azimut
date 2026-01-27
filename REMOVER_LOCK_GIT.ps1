# ═══════════════════════════════════════════════════════════════
# REMOVER LOCK DO GIT - Script PowerShell
# ═══════════════════════════════════════════════════════════════

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "REMOVER LOCK DO GIT" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Mudar para o diretório do projeto
Set-Location "C:\Users\ranz\Documents\azimut-site-vite-tailwind"

# Caminho do lock
$lockPath = ".git\index.lock"

# Verificar se lock existe
if (Test-Path $lockPath) {
    Write-Host "Lock encontrado! Tentando remover..." -ForegroundColor Yellow
    Write-Host ""
    
    # Tentar remover
    try {
        Remove-Item -Force $lockPath -ErrorAction Stop
        Start-Sleep -Seconds 1
        
        # Verificar se foi removido
        if (Test-Path $lockPath) {
            Write-Host "ERRO: Não foi possível remover o lock." -ForegroundColor Red
            Write-Host ""
            Write-Host "SOLUÇÃO:" -ForegroundColor Yellow
            Write-Host "1. Feche o Cursor completamente" -ForegroundColor White
            Write-Host "2. Verifique no Gerenciador de Tarefas (Ctrl+Shift+Esc)" -ForegroundColor White
            Write-Host "   - Procure por processos 'Cursor' ou 'Code'" -ForegroundColor White
            Write-Host "   - Finalize todos os processos relacionados" -ForegroundColor White
            Write-Host "3. Execute este script novamente" -ForegroundColor White
            Write-Host ""
            Read-Host "Pressione Enter para sair"
            exit 1
        } else {
            Write-Host "SUCESSO: Lock removido!" -ForegroundColor Green
            Write-Host ""
        }
    } catch {
        Write-Host "ERRO ao remover lock: $_" -ForegroundColor Red
        Write-Host ""
        Write-Host "SOLUÇÃO:" -ForegroundColor Yellow
        Write-Host "1. Feche o Cursor completamente" -ForegroundColor White
        Write-Host "2. Verifique processos no Gerenciador de Tarefas" -ForegroundColor White
        Write-Host "3. Execute este script novamente" -ForegroundColor White
        Write-Host ""
        Read-Host "Pressione Enter para sair"
        exit 1
    }
} else {
    Write-Host "Nenhum lock encontrado. Git está livre!" -ForegroundColor Green
    Write-Host ""
}

# Testar Git
Write-Host "Testando Git..." -ForegroundColor Yellow
try {
    $gitStatus = git status 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Git funcionando corretamente!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Agora você pode:" -ForegroundColor Cyan
        Write-Host "- Executar: .\DEPLOY_OPCOES_PREMIUM.ps1" -ForegroundColor White
        Write-Host "- Ou usar git normalmente" -ForegroundColor White
    } else {
        Write-Host "AVISO: Git retornou erro, mas lock foi removido." -ForegroundColor Yellow
        Write-Host "Tente novamente ou verifique outros problemas." -ForegroundColor Yellow
    }
} catch {
    Write-Host "AVISO: Não foi possível testar Git." -ForegroundColor Yellow
}

Write-Host ""
Read-Host "Pressione Enter para sair"
