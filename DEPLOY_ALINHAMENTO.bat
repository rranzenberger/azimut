@echo off
echo ========================================
echo DEPLOY CORRECOES ALINHAMENTO ACADEMY
echo ========================================
echo.

echo [1/3] Removendo lock do Git (tentativas multiplas)...
timeout /t 1 /nobreak >nul
del /F /Q .git\index.lock 2>nul
timeout /t 1 /nobreak >nul
del /F /Q .git\index.lock 2>nul
timeout /t 1 /nobreak >nul
del /F /Q .git\index.lock 2>nul
echo OK
echo.

echo [2/3] Adicionando mudancas e criando commit...
git add src/components/AcademySubNav.tsx src/pages/AcademyNew.tsx
git commit -m "fix: Alinhamento menus secundarios Academy - mesma estrutura grid do header"
if %errorlevel% neq 0 (
    echo.
    echo AVISO: Commit falhou - provavelmente lock do Git
    echo SOLUCAO: Feche o Cursor completamente e execute este script novamente
    echo.
    pause
    exit /b 1
)
echo OK: Commit criado
echo.

echo [3/3] Enviando para GitHub...
git push origin main
if %errorlevel% neq 0 (
    echo ERRO: Push falhou
    pause
    exit /b 1
)
echo OK: Push realizado
echo.

echo ========================================
echo CONCLUIDO!
echo ========================================
echo.
echo O Vercel vai detectar o novo commit e fazer deploy automaticamente.
echo Aguarde 1-2 minutos e verifique: https://azmt.com.br
echo.
pause
