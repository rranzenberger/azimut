# ✅ CORREÇÃO: Erro 404 em Páginas do Backoffice

## 🔍 PROBLEMA

Algumas páginas no backoffice estavam dando erro 404 ao clicar para editar:
- ❌ **Sobre** (`/studio/about`)
- ❌ **Equipe** (`/studio/team`)
- ❌ **Corporate** (`/academy/corporate`)
- ❌ **Cursos** (`/academy/courses`)
- ❌ **Pesquisa** (`/academy/research`)

**Páginas que funcionavam:**
- ✅ Contato, Academia, Estúdio, Projetos, Soluções, Home

---

## ✅ SOLUÇÃO

**Causa:** A pasta `[slug]` ainda existia (mesmo vazia), causando conflito com a rota catch-all `[...slug]`.

**Ação:** Removida a pasta `[slug]` completamente. Agora apenas `[...slug]` existe, que suporta:
- ✅ Slugs simples: `home` → `/admin/pages/home/edit`
- ✅ Slugs múltiplos: `studio/about` → `/admin/pages/studio/about/edit`

---

## 🚀 PRÓXIMO PASSO

**Fazer deploy:**
```bash
git add -A
git commit -m "fix: remover rota [slug] conflitante, corrigir 404 em páginas com slugs múltiplos"
git push
```

Após o deploy, **todas as páginas** devem funcionar corretamente!

---

## 🧪 TESTE APÓS DEPLOY

1. Acesse: https://backoffice.azmt.com.br/admin/site-pages
2. Clique em qualquer página (incluindo as que davam 404)
3. Deve abrir a tela de edição sem erro 404

**Todas as páginas devem funcionar agora!** ✅

