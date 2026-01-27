@echo off
echo ===========================================
echo OTIMIZAR TODOS OS PROJETOS COM IA
echo ===========================================
echo.
echo Este script processa TODOS os projetos publicados.
echo Pula automaticamente os que ja estao otimizados.
echo.
echo Deseja continuar? (S/N)
set /p CONFIRMA="> "

if /i not "%CONFIRMA%"=="S" (
    echo Cancelado.
    pause
    exit /b 0
)

cd /d "%~dp0azimut-cms"

echo.
echo Executando otimizacao de TODOS os projetos...
echo.

npx tsx scripts/otimizar-projetos-seo.ts --all --skip-optimized

echo.
echo ===========================================
pause
