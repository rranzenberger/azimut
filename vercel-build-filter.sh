#!/bin/bash

# Script para filtrar builds do Vercel
# Só faz deploy se houver mudanças em src/, public/ ou arquivos de config

echo "🔍 Verificando mudanças relevantes..."

# Verifica se há mudanças nos arquivos importantes
if git diff --name-only HEAD~1 HEAD | grep -qE "^(src/|public/|index.html|vite.config|package.json|tailwind)"; then
  echo "✅ Mudanças detectadas em arquivos do site - Fazendo deploy"
  exit 1  # Fazer deploy
else
  echo "⏭️  Apenas mudanças em docs/config - Pulando deploy"
  exit 0  # Pular deploy
fi
