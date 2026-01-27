@echo off
echo Removendo lock do Git...
del /F /Q .git\index.lock 2>nul

echo.
echo Adicionando arquivos...
git add src/pages/AcademyNew.tsx
git add src/components/AcademySubNav.tsx
git add src/pages/Studio.tsx
git add src/pages/WhatWeDo.tsx
git add src/pages/Work.tsx

echo.
echo Fazendo commit...
git commit -m "fix: Remove tarja vermelha submenu + centraliza menus secundarios"

echo.
echo Enviando para GitHub...
git push origin main

echo.
echo CONCLUIDO!
pause
