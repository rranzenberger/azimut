@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   Seed Admin - Backoffice Azimut
echo ========================================
echo.
echo Este script cria/atualiza o usuario admin no banco.
echo Use a DATABASE_URL do projeto azimut-backoffice na Vercel.
echo.
if not defined DATABASE_URL (
  echo AVISO: DATABASE_URL nao esta definida.
  echo Defina no .env desta pasta ou no PowerShell:
  echo   $env:DATABASE_URL = "postgresql://..."
  echo.
  echo Tentando usar .env...
  echo.
)
cd /d "%~dp0"
call npx tsx scripts/seed-admin-user.ts
echo.
pause
