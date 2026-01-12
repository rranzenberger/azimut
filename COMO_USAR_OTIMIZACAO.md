# 🚀 GUIA RÁPIDO - COMO USAR AS OTIMIZAÇÕES

## ✅ JÁ ESTÁ CONFIGURADO!

Todos os arquivos foram criados e configurados automaticamente:
- ✅ `vercel.json` - Configuração otimizada do Vercel
- ✅ `package.json` - Script vercel-build adicionado
- ✅ `vercel-build-filter.sh` - Filtro inteligente de builds
- ✅ `deploy.ps1` - Script de deploy manual (PowerShell)
- ✅ `VERCEL_OPTIMIZATION_GUIDE.md` - Documentação completa

---

## 📝 PASSO A PASSO INICIAL

### 1️⃣ TORNAR SCRIPT EXECUTÁVEL (Obrigatório)

Abra o **Git Bash** (não PowerShell) e execute:

```bash
chmod +x vercel-build-filter.sh
```

### 2️⃣ FAZER COMMIT DAS MUDANÇAS

```bash
git add .
git commit -m "feat: otimização Vercel - economia de $168/ano"
git push
```

✅ **Pronto!** A partir de agora o Vercel está otimizado.

---

## 🎯 COMO USAR NO DIA A DIA

### OPÇÃO 1: GIT COM [skip ci] (Mais Fácil)

**Durante o desenvolvimento** (SEM fazer deploy):
```bash
git add .
git commit -m "docs: atualizando documentação [skip ci]"
git push
```
👉 Adicione `[skip ci]` no final da mensagem = **NÃO FAZ DEPLOY**

**Quando quiser fazer deploy**:
```bash
git add .
git commit -m "feat: nova funcionalidade do quiz"
git push
```
👉 Sem `[skip ci]` = **FAZ DEPLOY AUTOMATICAMENTE**

### OPÇÃO 2: DEPLOY MANUAL (Máximo Controle)

**No PowerShell:**
```powershell
.\deploy.ps1
```

Vai aparecer um menu:
```
🚀 DEPLOY AZIMUT - MENU INTERATIVO

1) 🌐 Site Principal
2) 📊 Backoffice/CMS
3) 🔥 Ambos
4) ❌ Cancelar

Escolha uma opção (1-4):
```

Escolha a opção e pressione Enter!

---

## 💡 EXEMPLOS PRÁTICOS

### EXEMPLO 1: Atualizando documentação (sem deploy)
```bash
# Editou TODO.md, STATUS.md, README.md
git add .
git commit -m "docs: atualizando tarefas [skip ci]"
git push
```
✅ **Resultado:** Push feito, deploy pulado, $0 gasto

### EXEMPLO 2: Ajustando código (com deploy)
```bash
# Editou QuizVancouver.tsx
git add .
git commit -m "fix: corrigindo validação do quiz"
git push
```
✅ **Resultado:** Push + deploy automático

### EXEMPLO 3: Deploy urgente sem commit
```powershell
# Você já fez mudanças mas não quer commitar ainda
.\deploy.ps1
# Escolha opção 1 para Site ou 2 para Backoffice
```
✅ **Resultado:** Deploy imediato do código atual

---

## 🔍 TESTAR SE ESTÁ FUNCIONANDO

### Teste 1: Commit com [skip ci]
```bash
echo "teste" >> test.txt
git add test.txt
git commit -m "test: verificando skip ci [skip ci]"
git push
```
👉 Vá no Vercel Dashboard → Deve mostrar "Skipped" ou nenhum deploy

### Teste 2: Commit sem [skip ci]
```bash
git commit -m "test: forçando deploy" --allow-empty
git push
```
👉 Vá no Vercel Dashboard → Deve iniciar um deploy

### Teste 3: Script de deploy
```powershell
.\deploy.ps1
```
👉 Deve aparecer o menu interativo

---

## 📊 ECONOMIA ESPERADA

**ANTES:**
- Todo push = deploy (mesmo mudando apenas README.md)
- ~20 deploys/mês × $1 = **$20/mês**

**DEPOIS:**
- Só deploys necessários (mudanças em src/, public/)
- [skip ci] para docs/config
- ~6 deploys/mês × $1 = **$6/mês**

**💰 ECONOMIA: $14/mês = $168/ano**

---

## 🚨 PROBLEMAS COMUNS

### Script PowerShell não abre
```powershell
# Execute com bypass:
powershell -ExecutionPolicy Bypass -File .\deploy.ps1
```

### Filtro de build não funciona
```bash
# Verificar se script está executável:
ls -la vercel-build-filter.sh

# Se aparecer sem 'x', rodar novamente:
chmod +x vercel-build-filter.sh
git add vercel-build-filter.sh
git commit -m "fix: permissões do script"
git push
```

### Vercel CLI não encontrado
```bash
# Instalar:
npm install -g vercel

# Login:
vercel login
```

---

## ✨ RESUMO

**Para 99% dos casos, use:**
```bash
# Commit que NÃO faz deploy:
git commit -m "sua mensagem [skip ci]"

# Commit que FAZ deploy:
git commit -m "sua mensagem"
```

**Para deploy manual:**
```powershell
.\deploy.ps1
```

---

## 📞 PRECISA DE AJUDA?

Leia a documentação completa em:
📄 `VERCEL_OPTIMIZATION_GUIDE.md`

---

**Status:** ✅ Configurado e pronto para usar!  
**Data:** 12/01/2026  
**Economia:** $168/ano 💰
