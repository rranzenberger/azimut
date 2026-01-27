# Diagnostico do problema Git
Write-Host "=== DIAGNOSTICO GIT ===" -ForegroundColor Cyan
Write-Host ""

# 1. Verificar lock
Write-Host "[1] Verificando lock..." -ForegroundColor Yellow
if (Test-Path ".git/index.lock") {
    Write-Host "  ERRO: Lock existe!" -ForegroundColor Red
    $lockInfo = Get-Item ".git/index.lock"
    Write-Host "  Criado em: $($lockInfo.CreationTime)" -ForegroundColor Gray
    Write-Host "  Modificado em: $($lockInfo.LastWriteTime)" -ForegroundColor Gray
} else {
    Write-Host "  OK: Lock nao existe" -ForegroundColor Green
}

# 2. Verificar processos Git/Cursor
Write-Host ""
Write-Host "[2] Verificando processos..." -ForegroundColor Yellow
$gitProcesses = Get-Process | Where-Object {$_.ProcessName -match "git"}
$cursorProcesses = Get-Process | Where-Object {$_.ProcessName -match "cursor"}
Write-Host "  Processos Git: $($gitProcesses.Count)" -ForegroundColor Gray
Write-Host "  Processos Cursor: $($cursorProcesses.Count)" -ForegroundColor Gray
if ($cursorProcesses.Count -gt 0) {
    Write-Host "  AVISO: Cursor esta aberto! Isso pode causar lock." -ForegroundColor Yellow
}

# 3. Verificar politica de execucao
Write-Host ""
Write-Host "[3] Verificando politica de execucao..." -ForegroundColor Yellow
$policy = Get-ExecutionPolicy
Write-Host "  Politica atual: $policy" -ForegroundColor Gray
if ($policy -eq "Restricted") {
    Write-Host "  ERRO: Politica Restricted bloqueia scripts!" -ForegroundColor Red
    Write-Host "  Execute: Set-ExecutionPolicy RemoteSigned -Scope CurrentUser" -ForegroundColor Yellow
}

# 4. Verificar status Git
Write-Host ""
Write-Host "[4] Verificando status Git..." -ForegroundColor Yellow
try {
    $status = git status --short 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  OK: Git esta funcionando" -ForegroundColor Green
        if ($status) {
            Write-Host "  Arquivos modificados encontrados" -ForegroundColor Gray
        }
    } else {
        Write-Host "  ERRO: Git nao esta funcionando corretamente" -ForegroundColor Red
    }
} catch {
    Write-Host "  ERRO: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== FIM DO DIAGNOSTICO ===" -ForegroundColor Cyan
