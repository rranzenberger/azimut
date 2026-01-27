# Script de Diagnóstico do Servidor Vite
Write-Host "=== DIAGNÓSTICO DO SERVIDOR ===" -ForegroundColor Cyan

# 1. Verificar processos Node
Write-Host "`n1. Processos Node:" -ForegroundColor Yellow
$nodeProcesses = Get-Process | Where-Object {$_.ProcessName -eq "node"} -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    $nodeProcesses | Format-Table Id, ProcessName, StartTime
} else {
    Write-Host "   Nenhum processo Node encontrado" -ForegroundColor Green
}

# 2. Verificar porta 5173
Write-Host "`n2. Porta 5173:" -ForegroundColor Yellow
$port5173 = netstat -ano | findstr :5173
if ($port5173) {
    Write-Host "   Porta 5173 está em uso:" -ForegroundColor Red
    $port5173
} else {
    Write-Host "   Porta 5173 está livre" -ForegroundColor Green
}

# 3. Verificar se node_modules existe
Write-Host "`n3. Dependências:" -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "   node_modules existe" -ForegroundColor Green
} else {
    Write-Host "   node_modules NÃO existe - execute: npm install" -ForegroundColor Red
}

# 4. Verificar cache
Write-Host "`n4. Cache:" -ForegroundColor Yellow
if (Test-Path "node_modules\.vite") {
    Write-Host "   Cache Vite encontrado" -ForegroundColor Yellow
} else {
    Write-Host "   Cache Vite limpo" -ForegroundColor Green
}

# 5. Verificar permissões
Write-Host "`n5. Permissões:" -ForegroundColor Yellow
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if ($isAdmin) {
    Write-Host "   Executando como Administrador" -ForegroundColor Green
} else {
    Write-Host "   NÃO está executando como Administrador" -ForegroundColor Yellow
    Write-Host "   Tente executar o PowerShell como Administrador" -ForegroundColor Yellow
}

Write-Host "`n=== FIM DO DIAGNÓSTICO ===" -ForegroundColor Cyan
