@echo off
REM Deploy completo: Site + Game + Backoffice
REM Duplo-clique ou: RODAR_DEPLOY_TUDO.bat
REM Opcoes: RODAR_DEPLOY_TUDO.bat -Force   = commit/push e deploy sem perguntar
REM         RODAR_DEPLOY_TUDO.bat -SkipGit  = so deploy (sem git)

cd /d "%~dp0"

echo.
echo  ========================================
echo    DEPLOY COMPLETO - Site + Game + Backoffice
echo  ========================================
echo.

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0DEPLOY_TUDO.ps1" %*

echo.
pause
