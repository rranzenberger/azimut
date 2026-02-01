@echo off
REM ============================================================
REM  DEPLOY COMPLETO: Site + Game + Backoffice
REM  - Git: add, commit, push
REM  - Vercel: site+game (raiz), depois backoffice (azimut-cms)
REM  Duplo-clique ou execute: RODAR_DEPLOY_TUDO.bat
REM ============================================================

cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File ".\DEPLOY_TUDO.ps1" -Force
pause
