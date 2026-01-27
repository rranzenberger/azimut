@echo off
echo ===========================================
echo   PLANO DE ACAO - SEO COM IA
echo ===========================================
echo.
echo Este script ajuda a executar o plano de acao passo a passo.
echo.
echo Escolha uma opcao:
echo.
echo 1. Otimizar projetos (10 por vez)
echo 2. Listar projetos disponiveis
echo 3. Testar chave API
echo 4. Verificar SEO de um projeto
echo 5. Sair
echo.
set /p OPCAO="Opcao: "

if "%OPCAO%"=="1" (
    echo.
    echo Executando otimizacao...
    call EXECUTAR_OTIMIZAR_SEO.bat
) else if "%OPCAO%"=="2" (
    echo.
    echo Listando projetos...
    call LISTAR_PROJETOS.bat
) else if "%OPCAO%"=="3" (
    echo.
    echo Testando chave API...
    call TESTAR_CHAVE_API.bat
) else if "%OPCAO%"=="4" (
    echo.
    echo Testando SEO de um projeto...
    call TESTAR_SEO.bat
) else if "%OPCAO%"=="5" (
    exit /b 0
) else (
    echo.
    echo Opcao invalida!
    pause
    goto :eof
)

echo.
pause
