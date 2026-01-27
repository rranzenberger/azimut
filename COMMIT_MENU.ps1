# Commit correcoes menu
Write-Host "Removendo lock..." -ForegroundColor Yellow
Remove-Item .git/index.lock -Force -ErrorAction SilentlyContinue

Write-Host "Adicionando arquivos..." -ForegroundColor Yellow
git add src/pages/AcademyNew.tsx
git add src/components/AcademySubNav.tsx
git add src/pages/Studio.tsx
git add src/pages/WhatWeDo.tsx
git add src/pages/Work.tsx

Write-Host "Fazendo commit..." -ForegroundColor Yellow
git commit -m "fix: Remove tarja vermelha submenu + centraliza menus secundarios"

Write-Host "Enviando para GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host "CONCLUIDO!" -ForegroundColor Green
