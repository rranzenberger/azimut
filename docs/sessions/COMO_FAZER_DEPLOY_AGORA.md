# 🚀 Como Fazer Deploy das Correções de Alinhamento

## ⚠️ Problema
O Cursor está mantendo um lock do Git, impedindo o commit automático.

## ✅ Solução (2 opções)

### Opção 1: Fechar Cursor e Executar Script (Recomendado)

1. **Feche o Cursor completamente** (não apenas a janela, feche o processo)
2. **Execute o script** `DEPLOY_ALINHAMENTO.bat` (clique duplo)
3. Aguarde o deploy no Vercel (1-2 minutos)

### Opção 2: Comandos Manuais (se preferir)

1. **Feche o Cursor completamente**
2. **Abra PowerShell** na pasta do projeto
3. **Execute os comandos:**

```powershell
cd "C:\Users\ranz\Documents\azimut-site-vite-tailwind"
Remove-Item .git/index.lock -Force -ErrorAction SilentlyContinue
git add src/components/AcademySubNav.tsx src/pages/AcademyNew.tsx
git commit -m "fix: Alinhamento menus secundarios Academy - mesma estrutura grid do header"
git push origin main
```

## 📋 O que foi corrigido

- ✅ Menu secundário da Academy alinhado com o menu principal
- ✅ Mesma posição na home da Academy e nas subpáginas
- ✅ Estrutura de grid idêntica ao header principal

## 🔍 Verificar Deploy

Após o push, aguarde 1-2 minutos e verifique:
- https://azmt.com.br/academy
- https://azmt.com.br/academy/courses
- https://azmt.com.br/academy/workshops

Os menus secundários devem estar alinhados com o menu principal!
