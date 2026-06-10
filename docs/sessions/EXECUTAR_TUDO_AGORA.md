# 🚀 EXECUTAR TUDO AGORA - GUIA RÁPIDO

**Data:** 26 de Janeiro de 2026  
**Objetivo:** Executar todas as ações em paralelo para completar FASE 3

---

## ⚡ **AÇÕES IMEDIATAS (15 minutos):**

### **1. Verificar e Criar Posts do Blog** (5 min)

#### **1.1. Acessar Neon Console**
1. Acesse: https://console.neon.tech
2. SQL Editor

#### **1.2. Executar SQL de Verificação**
Copie e cole:
```sql
-- Verificar posts existentes
SELECT 
  slug, 
  "titlePt", 
  status, 
  "publishedAt"
FROM "BlogPost"
ORDER BY "createdAt" DESC
LIMIT 10;
```

#### **1.3. Executar SQL de Criação**
Copie e cole o conteúdo completo de: `sql/CRIAR_POSTS_BLOG_ESTRATEGICOS.sql`

**Isso vai:**
- ✅ Criar categoria "Tecnologia" (se não existir)
- ✅ Criar 5 posts estratégicos
- ✅ Todos com `status: 'PUBLISHED'`
- ✅ Todos com conteúdo completo

---

### **2. Testar API do Blog** (2 min)

#### **2.1. Testar no Navegador**
Abra estas URLs:

```
https://backoffice.azmt.com.br/api/public/blog?lang=pt&limit=10
https://backoffice.azmt.com.br/api/public/blog/categories?lang=pt
```

**Esperado:**
- ✅ JSON com posts/categorias
- ❌ Se der erro, verificar se backoffice está deployado

---

### **3. Verificar Variável de Ambiente** (3 min)

#### **3.1. Acessar Vercel**
1. Acesse: https://vercel.com/dashboard
2. Projeto: **azimut** (site principal)
3. Settings → Environment Variables

#### **3.2. Verificar/Criar Variável**
- **Nome:** `VITE_BACKOFFICE_URL`
- **Valor:** `https://backoffice.azmt.com.br`
- **Ambientes:** Production, Preview, Development

#### **3.3. Redeploy (se necessário)**
- Deployments → "..." → Redeploy

---

### **4. Expandir Páginas de Serviços** (30 min - pode fazer depois)

#### **4.1. Acessar Backoffice**
1. Acesse: https://backoffice.azmt.com.br/admin/site-pages
2. Login se necessário

#### **4.2. Seguir Guia**
- Abra: `GUIA_EXPANDIR_SERVICOS_BACKOFFICE.md`
- Adicione seções manualmente para:
  - `/what/cinema-audiovisual`
  - `/what/museus-exposicoes`

---

## ✅ **VERIFICAÇÃO FINAL (5 min):**

### **1. Verificar Blog no Site**
1. Acesse: https://azmt.com.br/pt/blog
2. Deve aparecer 5+ posts
3. Se não aparecer, aguarde 2-3 minutos (cache)

### **2. Verificar Vancouver Expandido**
1. Acesse: https://azmt.com.br/pt/academy/vancouver
2. Role até o final
3. Deve aparecer seção expandida com 2000+ palavras

### **3. Verificar Credibilidade**
1. Acesse: https://azmt.com.br/pt/studio/credibilidade
2. Deve aparecer página completa

---

## 📊 **RESUMO DO QUE FOI FEITO:**

| Ação | Status | Tempo |
|------|--------|-------|
| ✅ API de categorias criada | Completo | - |
| ✅ CORS adicionado | Completo | - |
| ✅ Vancouver expandido | Completo | - |
| ✅ SQL de posts criado | Completo | - |
| ⏳ Executar SQL | **VOCÊ FAZ** | 5 min |
| ⏳ Testar API | **VOCÊ FAZ** | 2 min |
| ⏳ Verificar variável | **VOCÊ FAZ** | 3 min |
| ⏳ Expandir serviços | **VOCÊ FAZ** | 30 min |

---

## 🎯 **PRÓXIMOS PASSOS (DEPOIS):**

1. **Expandir serviços no backoffice** (30 min)
2. **Contatar parceiros para backlinks** (1h)
3. **Monitorar SEO** (contínuo)

---

**Status:** 🚀 Pronto para executar agora!
