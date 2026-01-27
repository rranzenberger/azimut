@echo off
echo ========================================
echo   LISTAR PROJETOS DISPONÍVEIS
echo ========================================
echo.
echo Buscando projetos publicados...
echo.
cd azimut-cms
npx tsx scripts/listar-projetos.ts
cd ..
echo.
pause
