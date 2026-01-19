@echo off
REM ═══════════════════════════════════════════════════════════════
REM SCRIPT DE VERIFICAÇÃO E CORREÇÃO DE DIRETÓRIO (BATCH)
REM ═══════════════════════════════════════════════════════════════

set "DIRETORIO_CORRETO=C:\Users\ranz\Documents\azimut-site-vite-tailwind"
cd /d "%DIRETORIO_CORRETO%"

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ ERRO: Nao foi possivel navegar para o diretorio correto!
    echo    Diretorio esperado: %DIRETORIO_CORRETO%
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ DIRETORIO CORRETO!
echo    Local: %CD%
echo.

REM Verificar arquivos essenciais
echo VERIFICANDO ARQUIVOS ESSENCIAIS...
echo.

if exist "package.json" (
    echo    ✅ package.json
) else (
    echo    ❌ package.json (NAO ENCONTRADO)
)

if exist "src" (
    echo    ✅ src
) else (
    echo    ❌ src (NAO ENCONTRADO)
)

if exist "azimut-cms" (
    echo    ✅ azimut-cms
) else (
    echo    ❌ azimut-cms (NAO ENCONTRADO)
)

if exist "public" (
    echo    ✅ public
) else (
    echo    ❌ public (NAO ENCONTRADO)
)

echo.
echo ✅ PRONTO PARA TRABALHAR!
echo.
