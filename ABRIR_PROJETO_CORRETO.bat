@echo off
REM ═══════════════════════════════════════════════════════════════
REM SCRIPT PARA ABRIR O PROJETO AZIMUT NO DIRETÓRIO CORRETO
REM ═══════════════════════════════════════════════════════════════
echo.
echo ========================================
echo   ABRINDO PROJETO AZIMUT NO CURSOR
echo ========================================
echo.
echo Diretorio correto: C:\Users\ranz\Documents\azimut-site-vite-tailwind
echo.

REM Navegar para o diretório correto
cd /d "C:\Users\ranz\Documents\azimut-site-vite-tailwind"

REM Abrir no Cursor
echo Abrindo no Cursor...
start "" "C:\Users\ranz\AppData\Local\Programs\cursor\Cursor.exe" .

echo.
echo Cursor aberto no diretorio correto!
echo Verifique se o caminho no terminal eh:
echo C:\Users\ranz\Documents\azimut-site-vite-tailwind
echo.
pause
