# 🚨 PROBLEMA: Timeline Não Aparece - Erro 404

**Data:** 2026-01-20  
**Erro:** `Failed to fetch company history` / `404 Not Found`  
**Local:** `https://azmt.com.br/pt/studio/credibilidade`

---

## 🔍 **DIAGNÓSTICO:**

### **Erro no Console:**
```
Failed to load resource: the server responded with a status of 404
backoffice.azmt.com.br/api/public/history?lang=pt
```

### **Causa Raiz:**
A API `/api/public/history` não está acessível no backoffice, retornando 404.

---

## ✅ **SOLUÇÕES (EM ORDEM DE PRIORIDADE):**

### **1. Verificar se Backoffice está Deployado** ⭐ CRÍTICO

**Teste direto no navegador:**
```
https://backoffice.azmt.com.br/api/public/history?lang=pt
```

**Resultados:**
- ✅ **200 OK + JSON** → API funciona, problema no frontend
- ❌ **404 Not Found** → API não existe ou não está deployada ← **ESTE É O PROBLEMA**

**Se retornar 404:**
1. Verifique se o projeto `azimut-cms` ou `azimut-backoffice` está deployado no Vercel
2. Verifique se o arquivo `azimut-cms/app/api/public/history/route.ts` existe
3. Faça deploy do backoffice se necessário

---

### **2. Verificar Variáveis de Ambiente no Vercel**

**No Vercel Dashboard:**
1. Projeto: **`azimut`** (site principal, não o backoffice)
2. Settings → Environment Variables
3. Verifique se existe:
   - `VITE_BACKOFFICE_URL` = `https://backoffice.azmt.com.br`
   - OU `VITE_CMS_API_URL` = `https://backoffice.azmt.com.br/api`

**Se não existir:**
- Adicione `VITE_BACKOFFICE_URL = https://backoffice.azmt.com.br`
- Marque: Production, Preview, Development
- **FAÇA REDEPLOY** (obrigatório!)

---

### **3. Verificar URL Construída no Componente**

O componente `CompanyTimeline.tsx` (linha 71-72) constrói a URL assim:

```typescript
const apiUrl = import.meta.env.VITE_BACKOFFICE_URL || 
               import.meta.env.VITE_CMS_API_URL || 
               'https://backoffice.azmt.com.br'
const url = `${apiUrl}/api/public/history?${params.toString()}`
```

**Se `VITE_BACKOFFICE_URL = https://backoffice.azmt.com.br`:**
- URL final: `https://backoffice.azmt.com.br/api/public/history?lang=pt` ✅

**Se `VITE_CMS_API_URL = https://backoffice.azmt.com.br/api`:**
- URL final: `https://backoffice.azmt.com.br/api/api/public/history?lang=pt` ❌ (duplo `/api`)

**Correção:** Use `VITE_BACKOFFICE_URL` (sem `/api` no final)

---

### **4. Deploy do Backoffice (Se Necessário)**

Se o backoffice não estiver deployado:

```bash
cd azimut-cms
git add .
git commit -m "feat: adiciona API /api/public/history"
git push
# Vercel fará deploy automático
```

**Verificar após deploy:**
- Teste: `https://backoffice.azmt.com.br/api/public/history?lang=pt`
- Deve retornar JSON com `success: true`

---

## 🛠️ **CORREÇÃO RÁPIDA (TEMPORÁRIA):**

Se precisar de uma solução imediata, edite `src/components/CompanyTimeline.tsx`:

**Linha 71 - ANTES:**
```typescript
const apiUrl = import.meta.env.VITE_BACKOFFICE_URL || import.meta.env.VITE_CMS_API_URL || 'https://backoffice.azmt.com.br'
```

**DEPOIS (hardcoded temporário):**
```typescript
const apiUrl = 'https://backoffice.azmt.com.br' // Temporário - corrigir variável de ambiente
```

**Depois faça commit e deploy:**
```bash
git add src/components/CompanyTimeline.tsx
git commit -m "fix: corrige URL da API timeline temporariamente"
git push
```

---

## 📋 **CHECKLIST DE VERIFICAÇÃO:**

- [ ] ✅ Testar API diretamente: `https://backoffice.azmt.com.br/api/public/history?lang=pt`
- [ ] ✅ Verificar se backoffice está deployado no Vercel
- [ ] ✅ Verificar se arquivo `azimut-cms/app/api/public/history/route.ts` existe
- [ ] ✅ Verificar variável `VITE_BACKOFFICE_URL` no Vercel (projeto `azimut`)
- [ ] ✅ Fazer redeploy após adicionar/corrigir variável
- [ ] ✅ Verificar console do navegador (F12) para erros
- [ ] ✅ Verificar Network tab (F12) para requisições falhando

---

## 🎯 **RESUMO:**

| Item | Status | Ação |
|------|--------|------|
| **API Backend** | ❌ 404 | Verificar se está deployada |
| **Variável Env** | ❓ | Verificar no Vercel |
| **Deploy Backoffice** | ❓ | Fazer deploy se necessário |
| **Redeploy Frontend** | ⏳ | Após corrigir variável |

---

## 🔗 **ARQUIVOS RELACIONADOS:**

- `src/components/CompanyTimeline.tsx` (linha 71-72) - URL da API
- `src/pages/StudioCredentials.tsx` (linha 780+) - Onde timeline é renderizada
- `azimut-cms/app/api/public/history/route.ts` - API endpoint

---

**Status:** ⚠️ **Erro 404 - API não acessível**  
**Prioridade:** 🔴 **ALTA**  
**Ação:** Verificar backoffice e variáveis de ambiente
