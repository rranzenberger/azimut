@echo off
echo ===========================================
echo VERIFICAR E CORRIGIR AUTOMATICAMENTE
echo ===========================================
echo.

cd /d "%~dp0azimut-cms"

echo [1/3] Verificando arquivo .env...
if not exist ".env" (
    echo [CRIANDO] Arquivo .env...
    echo # Arquivo de configuracoes > .env
    echo # Adicione suas variaveis aqui >> .env
    echo. >> .env
    echo ANTHROPIC_API_KEY= >> .env
    echo DATABASE_URL= >> .env
    echo JWT_SECRET= >> .env
    echo [OK] Arquivo .env criado!
) else (
    echo [OK] Arquivo .env existe
)
echo.

echo [2/3] Verificando variaveis necessarias...
echo.

set FALTAM=0

findstr /C:"ANTHROPIC_API_KEY=" .env | findstr /V "^#" | findstr /C:"=" | findstr /V "^$" >nul
if errorlevel 1 (
    echo [ERRO] ANTHROPIC_API_KEY nao configurada ou vazia
    set FALTAM=1
) else (
    echo [OK] ANTHROPIC_API_KEY configurada
)

findstr /C:"DATABASE_URL=" .env | findstr /V "^#" | findstr /C:"=" | findstr /V "^$" >nul
if errorlevel 1 (
    echo [ERRO] DATABASE_URL nao configurada ou vazia
    set FALTAM=1
) else (
    echo [OK] DATABASE_URL configurada
)

echo.

if %FALTAM%==1 (
    echo ===========================================
    echo [ATENCAO] Faltam variaveis!
    echo.
    echo Abrindo arquivo .env para edicao...
    echo.
    echo Adicione as variaveis faltantes:
    echo - ANTHROPIC_API_KEY=sua-chave-aqui
    echo - DATABASE_URL=postgresql://...
    echo.
    notepad .env
    echo.
    echo Apos salvar, execute novamente este script.
    echo ===========================================
) else (
    echo ===========================================
    echo [SUCESSO] Todas as variaveis estao configuradas!
    echo.
    echo [3/3] Testando script de otimizacao...
    echo.
    cd ..
    call EXECUTAR_OTIMIZAR_SEO.bat
)

pause
