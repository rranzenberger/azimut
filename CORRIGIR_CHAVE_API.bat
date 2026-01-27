@echo off
echo ===========================================
echo CORRIGIR CHAVE API AUTOMATICAMENTE
echo ===========================================
echo.

cd /d "%~dp0azimut-cms"

echo Verificando arquivo .env...
echo.

if not exist ".env" (
    echo [ERRO] Arquivo .env nao existe!
    echo Criando arquivo...
    echo ANTHROPIC_API_KEY= > .env
    echo DATABASE_URL= >> .env
    echo.
)

findstr /C:"ANTHROPIC_API_KEY=sk-ant-api03-COLE_SUA_KEY_AQUI" .env >nul
if errorlevel 1 (
    findstr /C:"ANTHROPIC_API_KEY=COLE_SUA_KEY_AQUI" .env >nul
    if errorlevel 1 (
        echo [OK] Chave parece estar configurada
        echo.
        echo Testando se funciona...
        echo.
        cd ..
        call EXECUTAR_OTIMIZAR_SEO.bat
        goto :fim
    )
)

echo [PROBLEMA] Chave ainda nao foi configurada!
echo.
echo A chave atual e: ANTHROPIC_API_KEY=sk-ant-api03-COLE_SUA_KEY_AQUI
echo.
echo ===========================================
echo O QUE FAZER:
echo ===========================================
echo.
echo 1. Pegue sua chave em: https://console.anthropic.com/
echo    - Login
echo    - API Keys -^> Create Key
echo    - Copie a chave (comeca com sk-ant-api03-)
echo.
echo 2. Abra o arquivo .env que vou abrir agora
echo.
echo 3. Substitua: COLE_SUA_KEY_AQUI
echo    Por: sua chave real
echo.
echo 4. Salve o arquivo
echo.
echo 5. Execute novamente: EXECUTAR_OTIMIZAR_SEO.bat
echo.
echo ===========================================
echo Abrindo arquivo .env...
echo ===========================================
echo.

notepad .env

echo.
echo Apos salvar a chave no arquivo .env, execute:
echo EXECUTAR_OTIMIZAR_SEO.bat
echo.

:fim
pause
