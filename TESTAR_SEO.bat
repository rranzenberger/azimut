@echo off
echo ========================================
echo   TESTAR SEO DE UM PROJETO
echo ========================================
echo.
echo PRIMEIRO: Liste os projetos disponiveis!
echo Execute LISTAR_PROJETOS.bat para ver os slugs reais.
echo.
echo Ou digite o slug do projeto (ex: museu-olimpico-rio):
echo IMPORTANTE: Use um slug REAL, nao [slug-do-projeto]!
echo.
set /p SLUG="Slug: "
if "%SLUG%"=="" (
    echo.
    echo Erro: Slug nao pode estar vazio!
    echo Execute LISTAR_PROJETOS.bat primeiro para ver os slugs disponiveis.
    pause
    exit /b 1
)
echo.
echo Digite o idioma (pt, en, es, fr) [padrao: pt]:
set /p LANG="Idioma: "
if "%LANG%"=="" set LANG=pt
echo.
echo Testando projeto: %SLUG% (idioma: %LANG%)
echo.
powershell -ExecutionPolicy Bypass -File "scripts\testar-seo-projeto.ps1" -Slug "%SLUG%" -Lang "%LANG%"
echo.
pause
