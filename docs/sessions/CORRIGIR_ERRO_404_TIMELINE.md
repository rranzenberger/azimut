# 🔧 CORRIGIR ERRO 404 - TIMELINE NÃO APARECE

**Data:** 2026-01-20  
**Problema:** API retorna 404, timeline não carrega  
**Erro:** `Failed to fetch company history` / `404 Not Found`

---

## 🚨 **PROBLEMA IDENTIFICADO:**

O console mostra múltiplos erros **404** para:
```
backoffice.azmt.com.br/api/public/history?lang=pt
backoffice.azmt.com.br/api/public/history?lang=pt&type=milestone
backoffice.azmt.com.br/api/public/history?lang=pt&type=partnership
```

**Causa:** A API do backoffice não está acessível ou não está deployada.

---

## ✅ **SOLUÇÕES:**

### **Solução 1: Verificar se Backoffice está Deployado** ⭐

A API está em `azimut-cms/app/api/public/history/route.ts`, mas precisa estar deployada.

**Verificar:**
1. Acesse: https://vercel.com/dashboard
2. Procure pelo projeto **`azimut-backoffice`** ou **`azimut-cms`**
3. Verifique se está deployado e funcionando
4. Teste a API diretamente:
   ```
   https://backoffice.azmt.com.br/api/public/history?lang=pt
   ```

**Se retornar 404:**
- O backoffice não está deployado
- Ou a rota não está configurada corretamente

---

### **Solução 2: Verificar Variáveis de Ambiente**

O componente usa:
```typescript
const apiUrl = import.meta.env.VITE_BACKOFFICE_URL || 
               import.meta.env.VITE_CMS_API_URL || 
               'https://backoffice.azmt.com.br'
```

**Verificar no Vercel:**
1. Acesse: https://vercel.com/dashboard
2. Selecione o projeto **`azimut`** (site principal)
3. Vá em **Settings** → **Environment Variables**
4. Verifique se existe:
   - `VITE_BACKOFFICE_URL` = `https://backoffice.azmt.com.br`
   - OU `VITE_CMS_API_URL` = `https://backoffice.azmt.com.br/api`

**Se não existir:**
- Adicione uma das variáveis acima
- Faça **redeploy** (obrigatório para variáveis VITE_*)

---

### **Solução 3: Verificar URL da API**

O componente constrói a URL assim:
```typescript
const url = `${apiUrl}/api/public/history?${params.toString()}`
```

**Se `VITE_BACKOFFICE_URL = https://backoffice.azmt.com.br`:**
- URL final: `https://backoffice.azmt.com.br/api/public/history?lang=pt` ✅

**Se `VITE_CMS_API_URL = https://backoffice.azmt.com.br/api`:**
- URL final: `https://backoffice.azmt.com.br/api/api/public/history?lang=pt` ❌ (duplo `/api`)

**Correção:**
- Use `VITE_BACKOFFICE_URL` (sem `/api` no final)
- OU ajuste o componente para não adicionar `/api` se já tiver

---

### **Solução 4: Testar API Diretamente**

Abra no navegador:
```
https://backoffice.azmt.com.br/api/public/history?lang=pt
```

**Resultados possíveis:**
- ✅ **200 OK + JSON** → API funcionando, problema no frontend
- ❌ **404 Not Found** → API não existe ou não está deployada
- ❌ **500 Internal Server Error** → Erro no backend
- ❌ **CORS Error** → Problema de CORS (improvável)

---

### **Solução 5: Verificar se Backoffice está Rodando**

**Se o backoffice não estiver deployado:**

1. **Deploy do Backoffice:**
   ```bash
   cd azimut-cms
   git add .
   git commit -m "feat: adiciona API /api/public/history"
   git push
   # Vercel fará deploy automático
   ```

2. **Verificar se a rota existe:**
   - Arquivo: `azimut-cms/app/api/public/history/route.ts`
   - Deve estar commitado e deployado

---

## 🔍 **DIAGNÓSTICO RÁPIDO:**

### **Passo 1: Verificar Console do Navegador**

Abra DevTools (F12) → Console:
- Procure por erros 404
- Veja qual URL está sendo chamada

### **Passo 2: Verificar Network Tab**

Abra DevTools (F12) → Network:
- Filtre por "history"
- Veja a requisição que está falhando
- Verifique:
  - URL completa
  - Status code (404?)
  - Response (se houver)

### **Passo 3: Testar API Manualmente**

Abra no navegador:
```
https://backoffice.azmt.com.br/api/public/history?lang=pt
```

---

## 🛠️ **CORREÇÃO RÁPIDA:**

### **Opção A: Usar URL Hardcoded (Temporário)**

Edite `src/components/CompanyTimeline.tsx`:

```typescript
// Linha 71 - ANTES:
const apiUrl = import.meta.env.VITE_BACKOFFICE_URL || import.meta.env.VITE_CMS_API_URL || 'https://backoffice.azmt.com.br'

// DEPOIS (temporário):
const apiUrl = 'https://backoffice.azmt.com.br'
```

**Depois faça deploy novamente.**

---

### **Opção B: Verificar e Corrigir Variável de Ambiente**

1. **No Vercel Dashboard:**
   - Projeto: `azimut` (site principal)
   - Settings → Environment Variables
   - Adicione: `VITE_BACKOFFICE_URL = https://backoffice.azmt.com.br`
   - Marque: Production, Preview, Development
   - Salve

2. **Redeploy:**
   - Deployments → Último deploy → 3 pontos → Redeploy

---

## 📋 **CHECKLIST:**

- [ ] ✅ Backoffice está deployado?
- [ ] ✅ API `/api/public/history` existe no backoffice?
- [ ] ✅ Variável `VITE_BACKOFFICE_URL` configurada no Vercel?
- [ ] ✅ Redeploy feito após adicionar variável?
- [ ] ✅ API testada diretamente no navegador?
- [ ] ✅ Console do navegador verificado?

---

## 🎯 **RESUMO:**

| Item | Status | Ação |
|------|--------|------|
| **API Backend** | ❓ Verificar | Testar URL diretamente |
| **Variável Env** | ❓ Verificar | Adicionar no Vercel |
| **Deploy Backoffice** | ❓ Verificar | Fazer deploy se necessário |
| **Redeploy Frontend** | ⏳ Necessário | Após corrigir variável |

---

**Status:** ⚠️ **Erro 404 identificado**  
**Ação:** Verificar backoffice e variáveis de ambiente  
**Arquivo:** `src/components/CompanyTimeline.tsx` (linha 71)
