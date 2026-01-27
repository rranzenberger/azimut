@echo off
echo ===========================================
echo   ANALISAR TODOS OS LEADS COM IA
echo ===========================================
echo.
echo Este script analisa todos os leads sem analise usando IA.
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
echo Analisando leads...
echo.

npx tsx -e "import('./app/api/admin/leads/analyze-all/route.ts').then(m => m.POST({} as any, {} as any).then(r => r.json().then(d => console.log(JSON.stringify(d, null, 2)))))"

echo.
echo ===========================================
pause
