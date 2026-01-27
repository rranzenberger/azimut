@echo off
echo ========================================
echo Deploy Sistema Web3 - Azimut
echo ========================================
echo.

echo [1/4] Verificando status do Git...
git status --short
echo.

echo [2/4] Adicionando arquivos modificados...
git add .
echo.

echo [3/4] Criando commit...
git commit -m "feat: Sistema Web3 completo - Carteira, Recompensas, NFTs, Smart Contracts"
echo.

echo [4/4] Fazendo push para GitHub...
git push origin main
echo.

echo ========================================
echo Deploy iniciado!
echo ========================================
echo.
echo O Vercel vai fazer deploy automaticamente em alguns minutos.
echo.
echo Verifique o status em:
echo - Site: https://vercel.com/dashboard
echo - Backoffice: https://vercel.com/dashboard
echo.
pause
