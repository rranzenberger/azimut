# Repositório e pastas corretos — Vercel

**Objetivo:** Garantir que todo o trabalho está no repositório e nas pastas certos para os projetos Vercel **azimut** e **azimut-backoffice**.

---

## 1. Repositório correto

| O quê | Valor |
|-------|--------|
| **Repositório principal (site + game + backoffice)** | `https://github.com/rranzenberger/azimut` |
| **Remote Git** | `origin` → `rranzenberger/azimut` |
| **Pasta local** | `C:\Users\ranz\Documents\azimut-site-vite-tailwind` (clone do repo acima) |

Todo commit e push para **origin** (branch `main`) dispara deploy nos dois projetos Vercel ligados a esse repo.

---

## 2. Estrutura de pastas no repo

| Pasta no repo | Conteúdo | Projeto Vercel | Domínio |
|---------------|----------|----------------|---------|
| **Raiz** (`/`) | Site principal (Vite, React), `src/`, `public/`, `index.html`, `vite.config.ts` | **azimut** | architecad.com / azmt.com.br |
| **azimut-cms/** | Backoffice (Next.js), `app/`, `prisma/`, APIs, admin | **azimut-backoffice** | backoffice.azmt.com.br |
| **azimut-empathy-engine/** | Código-fonte do jogo (Vite); na hora do build do site é compilado e copiado para o site | *(incluído no build do **azimut**)* | — |

- **Site (azimut):** build na **raiz** com `npm run vercel-build` (que faz `build:game` → `copy:game` → `vite build`).
- **Backoffice (azimut-backoffice):** build **não** usa Root Directory; usa **Install Command** e **Build Command** apontando para `azimut-cms` (ver seção 4).

---

## 3. Onde fica cada tipo de alteração

| Se você alterou… | Pasta correta | Deploy em |
|------------------|---------------|-----------|
| Site (Home, What we do, Vancouver, Game page, i18n, Layout) | **Raiz:** `src/`, `public/`, `index.html` | **azimut** |
| Backoffice (admin, leads, API, Prisma) | **azimut-cms/** | **azimut-backoffice** |
| Jogo Empathy Engine (telas, briefs, sons, leads do jogo) | **azimut-empathy-engine/** | **azimut** (via build do site) |

Garantir que as mudanças estão nessas pastas antes de commitar.

---

## 4. Configuração Vercel (referência)

### Projeto **azimut** (site + game)

- **Repositório:** `rranzenberger/azimut`
- **Branch:** `main`
- **Root Directory:** *(vazio)*
- **Build Command:** `npm run vercel-build` (já no `vercel.json` / package.json da raiz)
- **Output:** build da raiz (Vite) já inclui o game copiado de `azimut-empathy-engine`

### Projeto **azimut-backoffice**

- **Repositório:** `rranzenberger/azimut`
- **Branch:** `main`
- **Root Directory:** *(vazio)*
- **Install Command:** `cd azimut-cms && npm install`
- **Build Command:** `cd azimut-cms && npm run vercel-build`

Detalhes: [DEPLOY_BACKOFFICE_VERCEL.md](DEPLOY_BACKOFFICE_VERCEL.md).

---

## 5. Checklist antes de commit / deploy

- [ ] Estou na pasta do repo: `azimut-site-vite-tailwind` (clone de `rranzenberger/azimut`).
- [ ] Alterações do **site** estão em `src/`, `public/` ou raiz (não dentro de `azimut-cms` nem só em `azimut-empathy-engine` se for texto do site).
- [ ] Alterações do **backoffice** estão em `azimut-cms/`.
- [ ] Alterações do **jogo** estão em `azimut-empathy-engine/`.
- [ ] Remote `origin` é `https://github.com/rranzenberger/azimut.git`.
- [ ] Push em `main` para `origin` vai disparar deploy em **azimut** e **azimut-backoffice** conforme a config acima.

---

## 6. Verificação rápida (PowerShell)

```powershell
cd C:\Users\ranz\Documents\azimut-site-vite-tailwind
git remote -v
# Deve mostrar origin → rranzenberger/azimut

# Pastas obrigatórias
Test-Path package.json
Test-Path src
Test-Path azimut-cms
Test-Path azimut-empathy-engine
```

Se todos retornarem `True` e o remote for `rranzenberger/azimut`, você está no repositório e na pasta corretos.
