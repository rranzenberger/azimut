# ⚠️ IMPORTANTE: Remover Rota Antiga [slug]

**Problema:** Duas rotas existem e podem causar conflito:
- ❌ `app/admin/pages/[slug]/edit/page.tsx` (rota antiga)
- ✅ `app/admin/pages/[...slug]/edit/page.tsx` (rota nova - catch-all)

**Solução:** DELETAR a pasta `[slug]` antiga, manter apenas `[...slug]`

---

## 🗑️ AÇÃO NECESSÁRIA

**DELETAR a pasta:**
```
azimut-cms/app/admin/pages/[slug]/
```

**MANTER apenas:**
```
azimut-cms/app/admin/pages/[...slug]/
```

---

## 🔍 POR QUE?

No Next.js App Router:
- `[slug]` só captura UM segmento: `home`, `studio`, `contact`
- `[...slug]` captura MÚLTIPLOS segmentos: `studio/about`, `academy/research`

Como temos slugs com barras (`studio/about`), precisamos APENAS da rota catch-all `[...slug]`.

A rota `[slug]` também funciona para slugs simples (`home`), mas causa confusão e pode interferir.

---

## ✅ APÓS DELETAR

A rota `[...slug]` vai funcionar para:
- ✅ Slugs simples: `/admin/pages/home/edit`
- ✅ Slugs compostos: `/admin/pages/studio/about/edit`

**Status:** ⚠️ **AÇÃO MANUAL NECESSÁRIA - DELETAR PASTA `[slug]`**


