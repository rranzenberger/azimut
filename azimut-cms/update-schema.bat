@echo off
echo ====================================
echo ATUALIZANDO SCHEMA DO BANCO DE DADOS
echo ====================================
echo.

cd /d "%~dp0"

echo [1/3] Aplicando schema ao banco...
call npx prisma db push

echo.
echo [2/3] Gerando Prisma Client...
call npx prisma generate

echo.
echo ====================================
echo SCHEMA ATUALIZADO COM SUCESSO!
echo ====================================
echo.
echo Novos campos adicionados:
echo - seoTitleEs, seoTitleFr
echo - seoDescEs, seoDescFr
echo.
pause

