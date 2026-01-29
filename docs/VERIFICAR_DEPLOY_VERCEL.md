# Verificar deploy Vercel (azmt.com.br)

Use este guia quando o **view-source** do site não refletir os últimos commits (ex.: meta GSC, mudanças no `index.html`).

---

## 1. Confirme qual projeto serve azmt.com.br

1. [Vercel Dashboard](https://vercel.com) → **Projects**
2. Descubra qual projeto tem o domínio **azmt.com.br**:  
   **Project → Settings → Domains** (ou **Deployments** e veja o domínio do preview).
3. Abra **esse** projeto (não o do backoffice).

---

## 2. Repo, branch e root

No projeto que serve **azmt.com.br**:

- **Settings → Git**
  - **Repository:** `rranzenberger/azimut` (repositório do **site**).
  - **Production Branch:** `main`.
- **Settings → General**
  - **Root Directory:** vazio (ou `./`). **Não** pode ser `azimut-cms` (isso builda o backoffice).

Se **Root Directory** estiver preenchido (ex. `azimut-cms`), apague, salve e faça **Redeploy**.

---

## 3. Último deploy

- **Deployments** → deploy mais recente:
  - **Status:** Ready (verde).
  - **Commit:** deve ser o último do `main` (ex. `70804ef` – meta GSC fixa).

Se o commit for antigo ou o deploy tiver falhado, algo está errado (branch, root ou build).

---

## 4. Redeploy manual

1. **Deployments** → … no último deploy → **Redeploy**
2. Opcional: desmarque **Use existing Build Cache** (build limpo).
3. Confirme **Redeploy** e espere terminar.

---

## 5. Conferir no site

1. Abra **https://azmt.com.br** ou **https://azmt.com.br/en**
2. **Ctrl+U** (view-source)
3. **Ctrl+F** e busque:
   - `AZIMUT-DEPLOY-ID` → deve aparecer `<!-- AZIMUT-DEPLOY-ID: main-70804ef-gsc -->`
   - `google-site-verification` → deve aparecer a meta do GSC

Se **não** aparecer:

- O domínio **azmt.com.br** está em outro projeto Vercel, ou
- **Root Directory** está errado, ou
- **Production Branch** não é `main`, ou
- Cache (tente aba anônima ou outro dispositivo).

---

## Repo do site

- **GitHub:** `rranzenberger/azimut`
- **Branch:** `main`
- **Pasta do site:** raiz do repositório (`index.html`, `src/`, `public/`, `vite.config.ts`).
- **Backoffice:** `azimut-cms/` (projeto Vercel separado, outro repositório).
