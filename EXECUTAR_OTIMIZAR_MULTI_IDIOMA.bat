@echo off
echo ===========================================
echo OTIMIZAR PROJETOS - MULTI IDIOMA
echo ===========================================
echo.
echo Este script otimiza projetos em PT, EN, ES, FR.
echo Processa 10 projetos por vez.
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
echo Executando otimizacao multi-idioma...
echo.

npx tsx scripts/otimizar-projetos-seo.ts --multi-lang

echo.
echo ===========================================
pause
