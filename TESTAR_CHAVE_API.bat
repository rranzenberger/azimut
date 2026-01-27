@echo off
echo ===========================================
echo TESTAR CHAVE API ANTHROPIC
echo ===========================================
echo.
echo Este script testa se sua chave API esta funcionando.
echo.

cd /d "%~dp0azimut-cms"

echo Executando teste...
echo.

npx tsx scripts/testar-chave-api.ts

echo.
echo ===========================================
pause
