@echo off
REM Roda o deploy do site (build + Vercel)
REM Duplo-clique ou execute este .bat

cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File ".\DEPLOY_SITE.ps1"
pause
