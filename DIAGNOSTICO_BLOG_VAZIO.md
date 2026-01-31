# 🔍 DIAGNÓSTICO: Blog Vazio no Site

**Data:** 26 de Janeiro de 2026  
**Problema:** Blog aparece vazio no site mesmo tendo posts no backoffice

---

## ✅ **VERIFICAÇÕES REALIZADAS:**

### **1. Estrutura do Blog no Site**
- ✅ Página `Blog.tsx` existe em `src/pages/Blog.tsx`
- ✅ Rota configurada em `App.tsx`: `/:lang/blog`
- ✅ Componente busca posts de: `${BACKOFFICE_URL}/api/public/blog`
- ✅ Componente busca categorias de: `${BACKOFFICE_URL}/api/public/blog/categories`

### **2. API Pública do Blog**
- ✅ API existe em `azimut-cms/app/api/public/blog/route.ts`
- ✅ Filtra apenas posts com `status: 'PUBLISHED'`
- ✅ Suporta paginação (limit, offset)
- ✅ Suporta filtros (category, tag, featured, lang)

### **3. Possíveis Problemas:**

#### **A. Posts não estão PUBLICADOS**
- Posts podem estar como `DRAFT` ou `SCHEDULED`
- **Solução:** Verificar no backoffice e publicar posts

#### **B. URL do Backoffice Incorreta**
- Variável `VITE_BACKOFFICE_URL` pode estar errada
- **Solução:** Verificar `.env` e variáveis de ambiente

#### **C. API de Categorias Não Existe**
- Blog busca categorias de `/api/public/blog/categories`
- **Solução:** Criar API se não existir

#### **D. Erro de CORS**
- Backoffice pode estar bloqueando requisições do site
- **Solução:** Configurar CORS no backoffice

---

## 🔧 **AÇÕES NECESSÁRIAS:**

### **1. Verificar Posts no Backoffice**
```sql
-- Verificar posts e status
SELECT 
  slug, 
  "titlePt", 
  status, 
  "publishedAt",
  "createdAt"
FROM "BlogPost"
ORDER BY "createdAt" DESC;
```

### **2. Verificar API de Categorias**
- Verificar se existe: `azimut-cms/app/api/public/blog/categories/route.ts`
- Se não existir, criar

### **3. Testar API Manualmente**
```bash
# Testar busca de posts
curl https://backoffice.azmt.com.br/api/public/blog?lang=pt&limit=10

# Testar busca de categorias
curl https://backoffice.azmt.com.br/api/public/blog/categories?lang=pt
```

### **4. Verificar Console do Navegador**
- Abrir DevTools → Network
- Verificar se requisições estão sendo feitas
- Verificar se há erros 404, 500, ou CORS

---

## 📋 **PRÓXIMOS PASSOS:**

1. ✅ Verificar se API de categorias existe
2. ✅ Criar API de categorias se necessário
3. ✅ Verificar variáveis de ambiente
4. ✅ Testar requisições manualmente
5. ✅ Corrigir problemas encontrados

---

**Status:** 🔄 Em diagnóstico
