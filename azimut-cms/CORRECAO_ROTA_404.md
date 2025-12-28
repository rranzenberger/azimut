# 🔧 CORREÇÃO: Erro 404 em Páginas com Slugs Múltiplos

## ⚠️ PROBLEMA IDENTIFICADO

Algumas páginas no backoffice estavam dando erro 404 ao clicar para editar:
- ❌ **Sobre** (`/studio/about`)
- ❌ **Equipe** (`/studio/team`)
- ❌ **Corporate** (`/academy/corporate`)
- ❌ **Cursos** (`/academy/courses`)
- ❌ **Pesquisa** (`/academy/research`)

**Páginas que funcionavam:**
- ✅ Contato (`/contact`)
- ✅ Academia (`/academy`)
- ✅ Estúdio (`/studio`)
- ✅ Projetos (`/work`)
- ✅ Soluções (`/what`)
- ✅ Home (`/home`)

---

## 🔍 CAUSA RAIZ

A pasta `azimut-cms/app/admin/pages/[slug]` ainda existia (mesmo vazia), causando conflito com a rota catch-all `[...slug]`.

O Next.js estava tentando usar a rota `[slug]` primeiro, que só funciona para slugs simples (um segmento), mas falhava para slugs com múltiplos segmentos (como `studio/about`).

---

## ✅ SOLUÇÃO APLICADA

1. **Removida a pasta conflitante:**
   - ❌ `azimut-cms/app/admin/pages/[slug]/` (removida)
   - ✅ `azimut-cms/app/admin/pages/[...slug]/` (mantida - rota catch-all)

2. **Rota catch-all configurada corretamente:**
   - Suporta slugs simples: `home` → `/admin/pages/home/edit`
   - Suporta slugs múltiplos: `studio/about` → `/admin/pages/studio/about/edit`

---

## 🧪 COMO TESTAR

1. Acesse: https://backoffice.azmt.com.br/admin/site-pages
2. Clique em qualquer página (incluindo as que davam 404)
3. Deve abrir a tela de edição sem erro 404

**Páginas para testar:**
- ✅ Sobre (`/studio/about`)
- ✅ Equipe (`/studio/team`)
- ✅ Corporate (`/academy/corporate`)
- ✅ Cursos (`/academy/courses`)
- ✅ Pesquisa (`/academy/research`)
- ✅ Contato (`/contact`)
- ✅ Academia (`/academy`)
- ✅ Estúdio (`/studio`)
- ✅ Projetos (`/work`)
- ✅ Soluções (`/what`)
- ✅ Home (`/home`)

---

## 📝 PRÓXIMOS PASSOS

1. **Fazer commit das mudanças:**
   ```bash
   git add -A
   git commit -m "fix: remover rota [slug] conflitante, usar apenas catch-all [...slug]"
   git push
   ```

2. **Aguardar deploy no Vercel:**
   - O Vercel vai fazer deploy automaticamente
   - Aguarde 1-3 minutos

3. **Testar novamente:**
   - Após o deploy, teste todas as páginas
   - Todas devem funcionar sem erro 404

---

## 🔍 VERIFICAÇÃO TÉCNICA

### Estrutura de Rotas Correta:

```
azimut-cms/app/admin/pages/
├── [...slug]/          ✅ Catch-all (suporta slugs simples e múltiplos)
│   └── edit/
│       └── page.tsx
└── page-client.tsx
```

### Código da Rota Catch-all:

```typescript
// azimut-cms/app/admin/pages/[...slug]/edit/page.tsx
const params = useParams();
const slugArray = params?.slug as string | string[];
const slug = Array.isArray(slugArray) ? slugArray.join('/') : slugArray;
```

Isso permite:
- Slug simples: `home` → `params.slug = 'home'` → `slug = 'home'`
- Slug múltiplo: `studio/about` → `params.slug = ['studio', 'about']` → `slug = 'studio/about'`

---

## ✅ RESULTADO ESPERADO

Após o deploy, **todas as páginas** devem abrir corretamente para edição, sem erro 404.

