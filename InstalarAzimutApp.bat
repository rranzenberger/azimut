@echo off
REM Script para criar icone do Azimut Deploy

echo Criando icone personalizado para Azimut Deploy...

REM Usar icone do PowerShell por padrao
set ICON_PATH=%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe

REM Criar atalho com icone
powershell -Command "$WshShell = New-Object -ComObject WScript.Shell; $Desktop = [System.Environment]::GetFolderPath('Desktop'); $Shortcut = $WshShell.CreateShortcut('%USERPROFILE%\Desktop\Azimut Deploy.lnk'); $Shortcut.TargetPath = '%~dp0AzimutDeployApp.vbs'; $Shortcut.WorkingDirectory = '%~dp0'; $Shortcut.IconLocation = '%ICON_PATH%,0'; $Shortcut.Description = 'Azimut Deploy Manager - Deploy com 1 clique'; $Shortcut.Save()"

echo.
echo ===================================
echo  INSTALACAO CONCLUIDA!
echo ===================================
echo.
echo Atalho criado na Area de Trabalho: "Azimut Deploy"
echo.
echo PARA FIXAR NA BARRA DE TAREFAS:
echo 1. Clique direito no atalho
echo 2. Escolha "Fixar na barra de tarefas"
echo.
echo Pressione qualquer tecla para fechar...
pause >nul
