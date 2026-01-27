# Script de instalacao do Azimut Deploy App
# Cria atalho na area de trabalho com icone

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   INSTALACAO AZIMUT DEPLOY APP" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se os arquivos existem
if (-not (Test-Path "AzimutDeployApp.vbs")) {
    Write-Host "ERRO: AzimutDeployApp.vbs nao encontrado!" -ForegroundColor Red
    Write-Host "Execute este script na pasta do projeto." -ForegroundColor Yellow
    pause
    exit
}

Write-Host "Criando atalho na Area de Trabalho..." -ForegroundColor Yellow

# Criar atalho
$WshShell = New-Object -ComObject WScript.Shell
$Desktop = [System.Environment]::GetFolderPath('Desktop')
$ShortcutPath = "$Desktop\Azimut Deploy.lnk"
$Shortcut = $WshShell.CreateShortcut($ShortcutPath)
$Shortcut.TargetPath = "$PSScriptRoot\AzimutDeployApp.vbs"
$Shortcut.WorkingDirectory = "$PSScriptRoot"
$Shortcut.Description = "Azimut Deploy Manager - Deploy com 1 clique"
$Shortcut.IconLocation = "$env:SystemRoot\System32\shell32.dll,13"  # Icone de foguete/estrela
$Shortcut.Save()

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   INSTALACAO CONCLUIDA COM SUCESSO!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Atalho criado em:" -ForegroundColor White
Write-Host "  $ShortcutPath" -ForegroundColor Cyan
Write-Host ""
Write-Host "PARA USAR:" -ForegroundColor Yellow
Write-Host "  1. Clique duplo no atalho 'Azimut Deploy'" -ForegroundColor White
Write-Host "  2. Escolha o botao desejado" -ForegroundColor White
Write-Host "  3. Confirme e pronto!" -ForegroundColor White
Write-Host ""
Write-Host "PARA FIXAR NA BARRA DE TAREFAS:" -ForegroundColor Yellow
Write-Host "  1. Clique direito no atalho" -ForegroundColor White
Write-Host "  2. Escolha 'Fixar na barra de tarefas'" -ForegroundColor White
Write-Host ""
Write-Host "TESTAR AGORA:" -ForegroundColor Yellow
Write-Host "  Deseja abrir o app agora? (S/N): " -ForegroundColor White -NoNewline

$response = Read-Host

if ($response -eq 'S' -or $response -eq 's') {
    Write-Host ""
    Write-Host "Abrindo Azimut Deploy App..." -ForegroundColor Green
    Start-Process "$PSScriptRoot\AzimutDeployApp.vbs"
    Write-Host "App aberto! Verifique a janela." -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "Instalacao concluida!" -ForegroundColor Green
}

Write-Host ""
Write-Host "Pressione qualquer tecla para fechar..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
