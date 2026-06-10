# 🧪 TESTE COMPLETO DO BLOG - PASSO A PASSO

**Data:** 26 de Janeiro de 2026  
**Objetivo:** Verificar e corrigir blog antes de criar conteúdo

---

## ✅ **PASSO 1: Verificar Posts no Banco de Dados**

### **1.1. Acessar Console do Neon**
1. Acesse: https://console.neon.tech
2. Selecione o projeto Azimut
3. Vá em **SQL Editor**

### **1.2. Executar SQL de Verificação**
Copie e cole o conteúdo de `sql/VERIFICAR_POSTS_BLOG.sql`:

```sql
-- 1. Listar todos os posts com status
SELECT 
  slug, 
  "titlePt", 
  status, 
  "publishedAt",
  "createdAt",
  featured,
  "viewCount"
FROM "BlogPost"
ORDER BY "createdAt" DESC;

-- 2. Contar posts por status
SELECT 
  status,
  COUNT(*) as total
FROM "BlogPost"
GROUP BY status;

-- 3. Listar posts PUBLICADOS (que devem aparecer no site)
SELECT 
  slug, 
  "titlePt", 
  "publishedAt",
  "createdAt",
  featured,
  "viewCount",
  "categoryId"
FROM "BlogPost"
WHERE status = 'PUBLISHED'
  AND ("publishedAt" IS NULL OR "publishedAt" <= NOW())
ORDER BY featured DESC, "publishedAt" DESC, "createdAt" DESC;
```

### **1.3. Interpretar Resultados**

**Se houver posts PUBLICADOS:**
- ✅ Blog deve aparecer no site
- ⚠️ Se não aparecer, problema é na API ou frontend

**Se NÃO houver posts PUBLICADOS:**
- ⚠️ Precisa criar posts ou publicar drafts existentes
- ✅ Execute `sql/CRIAR_POSTS_BLOG_ESTRATEGICOS.sql` para criar 5 posts

---

## ✅ **PASSO 2: Testar API do Blog**

### **2.1. Testar API de Posts**
Abra no navegador ou use curl:

```bash
# Testar API de posts
curl "https://backoffice.azmt.com.br/api/public/blog?lang=pt&limit=10"
```

**Ou abra no navegador:**
```
https://backoffice.azmt.com.br/api/public/blog?lang=pt&limit=10
```

**Resultados esperados:**
- ✅ **200 OK + JSON** com array `posts` → API funcionando
- ❌ **404 Not Found** → API não existe ou não está deployada
- ❌ **500 Internal Server Error** → Erro no backend
- ❌ **CORS Error** → Problema de CORS (improvável, já corrigimos)

### **2.2. Testar API de Categorias**
```bash
curl "https://backoffice.azmt.com.br/api/public/blog/categories?lang=pt"
```

**Ou abra no navegador:**
```
https://backoffice.azmt.com.br/api/public/blog/categories?lang=pt
```

**Resultados esperados:**
- ✅ **200 OK + JSON** com array `categories` → API funcionando
- ❌ **404 Not Found** → API não existe (criamos, mas pode não estar deployada)

---

## ✅ **PASSO 3: Verificar Frontend**

### **3.1. Verificar Variável de Ambiente**
No código, o Blog.tsx usa:
```typescript
const BACKOFFICE_URL = import.meta.env.VITE_BACKOFFICE_URL || 'https://backoffice.azmt.com.br';
```

**Verificar se está configurado:**
1. Acesse: https://vercel.com/dashboard
2. Projeto: **azimut** (site principal)
3. Settings → Environment Variables
4. Verificar se existe: `VITE_BACKOFFICE_URL`
5. Valor deve ser: `https://backoffice.azmt.com.br`

### **3.2. Testar Blog no Site**
1. Acesse: https://azmt.com.br/pt/blog
2. Abra DevTools (F12) → Console
3. Verifique erros:
   - ❌ **404** → API não encontrada
   - ❌ **CORS** → Problema de CORS
   - ❌ **Network Error** → Backoffice offline

### **3.3. Verificar Network Tab**
1. DevTools → Network
2. Filtre por "blog"
3. Verifique requisições:
   - `/api/public/blog`
   - `/api/public/blog/categories`
4. Status deve ser **200 OK**

---

## ✅ **PASSO 4: Criar Posts Estratégicos**

### **4.1. Executar SQL de Criação**
1. Acesse: https://console.neon.tech
2. SQL Editor
3. Copie e cole: `sql/CRIAR_POSTS_BLOG_ESTRATEGICOS.sql`
4. Execute

### **4.2. Verificar Posts Criados**
Execute novamente o SQL de verificação (Passo 1.2) para confirmar que os 5 posts foram criados.

---

## ✅ **PASSO 5: Verificar Blog no Site (Após Criar Posts)**

1. Aguarde 1-2 minutos (cache pode demorar)
2. Acesse: https://azmt.com.br/pt/blog
3. Deve aparecer:
   - ✅ Lista de posts
   - ✅ Categorias (se houver)
   - ✅ Posts com título, excerpt, data

---

## 🔧 **PROBLEMAS COMUNS E SOLUÇÕES:**

### **Problema 1: Blog Vazio (Sem Posts)**
**Solução:**
- Execute `sql/CRIAR_POSTS_BLOG_ESTRATEGICOS.sql`
- Aguarde 1-2 minutos
- Recarregue a página

### **Problema 2: Erro 404 na API**
**Solução:**
- Verificar se backoffice está deployado
- Verificar se arquivo `azimut-cms/app/api/public/blog/route.ts` existe
- Fazer redeploy do backoffice

### **Problema 3: Erro CORS**
**Solução:**
- Já corrigimos CORS nas APIs
- Se persistir, verificar se backoffice está deployado com as correções

### **Problema 4: Posts Existem mas Não Aparecem**
**Solução:**
- Verificar se `status = 'PUBLISHED'`
- Verificar se `publishedAt <= NOW()` ou é NULL
- Verificar se há categoria associada

---

## 📋 **CHECKLIST FINAL:**

- [ ] Posts verificados no banco (Passo 1)
- [ ] API de posts testada (Passo 2.1)
- [ ] API de categorias testada (Passo 2.2)
- [ ] Variável `VITE_BACKOFFICE_URL` configurada (Passo 3.1)
- [ ] Blog testado no site (Passo 3.2)
- [ ] Posts criados (Passo 4)
- [ ] Blog funcionando após criar posts (Passo 5)

---

**Status:** 🎯 Pronto para executar
