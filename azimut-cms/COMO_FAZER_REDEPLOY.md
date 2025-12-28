# 🚀 Como Fazer Redeploy Manual no Vercel

**Data:** Janeiro 2025  
**Quando usar:** Quando o deploy automático não aconteceu ou você quer forçar um novo deploy

---

## 📋 MÉTODO 1: Via Vercel Dashboard (MAIS FÁCIL)

### **Passo 1: Acessar Vercel**
1. Acesse: https://vercel.com/dashboard
2. Faça login se necessário
3. Encontre o projeto `azimut-cms` (ou nome do seu projeto)

### **Passo 2: Fazer Redeploy**
1. Clique no projeto
2. Vá na aba **"Deployments"**
3. Encontre o último deploy (ou qualquer deploy anterior)
4. Clique nos **3 pontos (⋯)** ao lado do deploy
5. Selecione **"Redeploy"**
6. Confirme: **"Redeploy"**

✅ **Resultado:** Vercel vai fazer build e deploy novamente (2-5 minutos)

---

## 📋 MÉTODO 2: Via Git Push (RECOMENDADO)

### **Passo 1: Verificar Mudanças**
```bash
cd azimut-cms
git status
```

### **Passo 2: Adicionar e Commitar**
```bash
git add .
git commit -m "Fix: Remove old [slug] routes, use catch-all [...slug]"
```

### **Passo 3: Push para Triggerar Deploy Automático**
```bash
git push origin main
```

✅ **Resultado:** Vercel detecta o push e faz deploy automático (se configurado)

---

## 📋 MÉTODO 3: Via Vercel CLI (AVANÇADO)

### **Instalar Vercel CLI:**
```bash
npm install -g vercel
```

### **Fazer Login:**
```bash
vercel login
```

### **Fazer Deploy:**
```bash
cd azimut-cms
vercel --prod
```

✅ **Resultado:** Deploy direto via CLI

---

## ⚠️ IMPORTANTE: Antes de Fazer Redeploy

### **1. Verificar se Pastas Antigas Foram Removidas:**

✅ **Deve ter apenas:**
- `app/admin/pages/[...slug]/` ✅
- `app/api/admin/pages/[...slug]/` ✅

❌ **Não deve ter:**
- `app/admin/pages/[slug]/` ❌
- `app/api/admin/pages/[slug]/` ❌

### **2. Se Pastas Antigas Ainda Existirem:**

**Windows PowerShell:**
```powershell
cd azimut-cms
Remove-Item -Recurse -Force "app/admin/pages/[slug]"
Remove-Item -Recurse -Force "app/api/admin/pages/[slug]"
```

**Git Bash / Linux / Mac:**
```bash
cd azimut-cms
rm -rf "app/admin/pages/[slug]"
rm -rf "app/api/admin/pages/[slug]"
```

---

## 🔍 VERIFICAR STATUS DO DEPLOY

### **Via Dashboard:**
1. Acesse: https://vercel.com/dashboard
2. Clique no projeto
3. Veja a aba **"Deployments"**
4. Último deploy mostra:
   - ✅ Verde: Deploy bem-sucedido
   - ⚠️ Amarelo: Deploy em progresso
   - ❌ Vermelho: Deploy falhou (ver logs)

### **Via CLI:**
```bash
vercel ls
```

---

## 🎯 RECOMENDAÇÃO

**Use o MÉTODO 1 (Dashboard)** se:
- Você só quer redeployar rapidamente
- Não tem mudanças no código
- Quer testar se funciona

**Use o MÉTODO 2 (Git Push)** se:
- Você fez mudanças no código
- Quer manter histórico no Git
- Deploy automático está configurado

---

**Status:** ✅ Pronto para redeploy


