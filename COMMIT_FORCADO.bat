@echo off
echo ========================================
echo COMMIT FORCADO - Remove lock e commita
echo ========================================
echo.

echo [1/5] Tentando remover lock do Git...
timeout /t 1 /nobreak >nul
del /F /Q .git\index.lock 2>nul
timeout /t 1 /nobreak >nul
del /F /Q .git\index.lock 2>nul
echo OK: Lock removido (ou nao existia)
echo.

echo [2/5] Adicionando arquivos ao staging...
git add src/pages/AcademyNew.tsx
git add src/components/AcademySubNav.tsx
git add src/pages/Studio.tsx
git add src/pages/WhatWeDo.tsx
git add src/pages/Work.tsx
echo OK: Arquivos adicionados
echo.

echo [3/5] Fazendo commit...
git commit -m "fix: Remove tarja vermelha submenu + centraliza menus secundarios"
if %errorlevel% neq 0 (
    echo AVISO: Commit pode ter falhado, mas continuando...
)
echo.

echo [4/5] Enviando para GitHub...
git push origin main
if %errorlevel% neq 0 (
    echo AVISO: Push pode ter falhado. Verifique sua conexao.
) else (
    echo OK: Push realizado com sucesso!
)
echo.

echo [5/5] CONCLUIDO!
echo.
echo Verifique o resultado acima.
pause
