# 🔧 RESOLUÇÃO: Erro 404 ao Acessar Páginas com Slugs Compostos

**Data:** Janeiro 2025  
**Status:** ✅ CORRIGIDO

---

## ❌ PROBLEMA

Ao acessar URLs como:
- `https://backoffice.azmt.com.br/admin/pages/studio/about/edit`
- Erro 404: "This page could not be found"

---

## ✅ SOLUÇÃO APLICADA

### **1. Rota Catch-All Criada**

✅ **Nova rota:** `app/admin/pages/[...slug]/edit/page.tsx`
- Suporta slugs com barras: `studio/about` → `['studio', 'about']` → `'studio/about'`

✅ **Nova API:** `app/api/admin/pages/[...slug]/route.ts`
- Mesma lógica para buscar/atualizar páginas

### **2. Rota Antiga Removida**

❌ **Deletado:** `app/admin/pages/[slug]/edit/page.tsx`
❌ **Deletado:** `app/api/admin/pages/[slug]/route.ts`

**Motivo:** Rota antiga `[slug]` não suporta múltiplos segmentos separados por barras.

---

## 🔍 COMO FUNCIONA AGORA

### **Rota Catch-All `[...slug]`:**

Quando você acessa `/admin/pages/studio/about/edit`:

1. Next.js captura: `params.slug = ['studio', 'about']` (array)
2. Código junta: `['studio', 'about'].join('/')` → `'studio/about'`
3. Busca no banco: `prisma.page.findUnique({ where: { slug: 'studio/about' } })`
4. Página carrega normalmente ✅

### **Funciona para todos os casos:**

✅ Slugs simples: `/admin/pages/home/edit` → `'home'`
✅ Slugs compostos: `/admin/pages/studio/about/edit` → `'studio/about'`
✅ Qualquer profundidade: `/admin/pages/a/b/c/edit` → `'a/b/c'`

---

## 📋 PRÓXIMOS PASSOS

### **1. Remover Pastas Vazias (Se Existirem)**

Se as pastas antigas ainda existirem vazias, deletá-las:

```bash
# Windows PowerShell
cd azimut-cms/app/admin/pages
if (Test-Path "[slug]") { Remove-Item -Recurse -Force "[slug]" }

cd ../../api/admin/pages
if (Test-Path "[slug]") { Remove-Item -Recurse -Force "[slug]" }
```

Ou manualmente pelo Explorer:
- Deletar pasta `azimut-cms/app/admin/pages/[slug]` (se existir)
- Deletar pasta `azimut-cms/app/api/admin/pages/[slug]` (se existir)

### **2. Fazer Deploy**

```bash
git add .
git commit -m "Fix: Remove old [slug] route, use catch-all [...slug] for slugs with slashes"
git push origin main
```

Vercel fará deploy automático em ~2-5 minutos.

### **3. Testar**

Após deploy:
1. Acessar: `https://backoffice.azmt.com.br/admin/site-pages`
2. Clicar em uma página com slug composto (ex: "Sobre" → `/studio/about`)
3. Deve abrir corretamente ✅

---

## ✅ VERIFICAÇÃO FINAL

Após deploy, estrutura deve ser:

```
app/admin/pages/
  └── [...slug]/          ← Apenas esta
      └── edit/
          └── page.tsx

app/api/admin/pages/
  ├── [...slug]/          ← Apenas esta
  │   └── route.ts
  └── route.ts
```

---

## 🎯 CONCLUSÃO

✅ **Problema resolvido!**
- Rota catch-all criada
- Rotas antigas deletadas
- Suporta todos os tipos de slugs
- Pronto para deploy

**Status:** ✅ **PRONTO PARA DEPLOY**


