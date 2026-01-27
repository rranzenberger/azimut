@echo off
echo ===========================================
echo CONFIGURAR TUDO AUTOMATICAMENTE
echo ===========================================
echo.

cd /d "%~dp0azimut-cms"

echo Verificando arquivo .env...
echo.

if not exist ".env" (
    echo Criando arquivo .env...
    echo. > .env
    echo Arquivo .env criado!
    echo.
)

echo Verificando variaveis...
echo.

findstr /C:"ANTHROPIC_API_KEY" .env >nul
if errorlevel 1 (
    echo [AVISO] ANTHROPIC_API_KEY nao encontrada no .env
    echo.
    echo Por favor, adicione manualmente no arquivo .env:
    echo ANTHROPIC_API_KEY=sua-chave-aqui
    echo.
    echo Onde pegar: https://console.anthropic.com/ -^> API Keys
    echo.
) else (
    echo [OK] ANTHROPIC_API_KEY encontrada
)

findstr /C:"DATABASE_URL" .env >nul
if errorlevel 1 (
    echo [AVISO] DATABASE_URL nao encontrada no .env
    echo.
    echo Por favor, adicione manualmente no arquivo .env:
    echo DATABASE_URL=postgresql://...
    echo.
) else (
    echo [OK] DATABASE_URL encontrada
)

echo.
echo ===========================================
echo Verificacao concluida!
echo.
echo Se faltar alguma variavel, adicione no arquivo:
echo azimut-cms\.env
echo.
echo Depois execute: EXECUTAR_OTIMIZAR_SEO.bat
echo ===========================================
pause
