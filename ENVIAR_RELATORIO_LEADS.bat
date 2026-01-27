@echo off
echo ===========================================
echo   ENVIAR RELATORIO DIARIO DE LEADS
echo ===========================================
echo.
echo Este script gera e envia relatorio diario de leads.
echo.

cd /d "%~dp0azimut-cms"

echo Gerando relatorio...
echo.

npx tsx scripts/enviar-relatorio-leads-email.ts

echo.
echo ===========================================
pause
