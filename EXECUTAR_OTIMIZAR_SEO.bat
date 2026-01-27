@echo off
echo ===========================================
echo OTIMIZAR PROJETOS COM IA
echo ===========================================
echo.

cd /d "%~dp0azimut-cms"

echo Executando script de otimizacao...
echo.

npx tsx scripts/otimizar-projetos-seo.ts

echo.
echo ===========================================
pause
