@echo off
REM Forcar deploy: commit vazio + push = Vercel detecta e faz deploy automatico (site e backoffice)
REM Duplo-clique ou: FORCAR_DEPLOY.bat

cd /d "%~dp0"

echo.
echo ========================================
echo   FORCAR DEPLOY - Vercel (commit + push)
echo ========================================
echo.
echo Faz um commit vazio e push para main.
echo O Vercel dispara o deploy automaticamente.
echo.

echo [1/4] Removendo lock do Git...
timeout /t 2 /nobreak >nul
del /F /Q .git\index.lock 2>nul
timeout /t 1 /nobreak >nul
del /F /Q .git\index.lock 2>nul
echo OK
echo.

echo [2/4] Criando commit vazio para forcar deploy...
git commit --allow-empty -m "chore: Forcar redeploy Vercel"
if %errorlevel% neq 0 (
    echo AVISO: Commit pode ter falhado por lock
    echo Tente fechar o Cursor e executar novamente
    pause
    exit /b 1
)
echo OK: Commit vazio criado
echo.

echo [3/4] Enviando para GitHub...
git push origin main
if %errorlevel% neq 0 (
    echo ERRO: Push falhou
    pause
    exit /b 1
)
echo OK: Push realizado
echo.

echo [4/4] CONCLUIDO!
echo.
echo O Vercel vai detectar o novo commit e fazer deploy automaticamente.
echo Aguarde 1-2 minutos e verifique: https://azmt.com.br
echo.
pause
