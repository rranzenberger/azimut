# Debug Backoffice – backoffice.azmt.com.br não abre login

## Problema

- Ao acessar **https://backoffice.azmt.com.br/en/login** aparece a **página principal do site Azimut** (logo, breadcrumb "Home / Login"), e não a tela de login do backoffice.
- **405** em `backoffice.azmt.com.br/api/track`: o endpoint de tracking responde Method Not Allowed.

## Causa provável

O projeto **azimut-backoffice** no Vercel está fazendo build da **raiz do repositório** (site principal – Vite/React), e não da pasta do backoffice (Next.js em `azimut-cms`).

Assim:

1. **backoffice.azmt.com.br** serve o **site principal** (SPA).
2. Qualquer URL (inclusive `/en/login`) cai no React Router do site → mostra Home ou 404 com layout do site (daí o breadcrumb "Home / Login").
3. O backoffice (Next.js) com rota `/login` e API `/api/track` **não está sendo deployado** nesse domínio.
4. As chamadas do site para `backoffice.azmt.com.br/api/track` (POST) vão para o deploy do **site**; como não existe `/api/track` nesse deploy, o Vercel pode responder **405**.

## Estrutura do repositório

- **Raiz**: site principal (Vite + React, `npm run build` → `dist/`).
- **azimut-cms/**: backoffice (Next.js 14, `npm run vercel-build` ou `prisma generate && next build`).
- Backoffice tem:
  - `app/login/page.tsx` → rota **/login** (sem prefixo `/en`).
  - `app/api/track/route.ts` → **POST** (e OPTIONS); não há GET.

## Correção no Vercel (obrigatório)

No projeto **azimut-backoffice** no Vercel:

1. **Settings → General**
2. **Root Directory**: definir como **`azimut-cms`** (e salvar).
3. **Build & Development**
   - **Build Command**: `npm run vercel-build` ou `prisma generate && next build`
   - **Output Directory**: deixar em branco (Next.js usa `.next` + server)
   - **Install Command**: `npm install`
4. **Environment Variables**: conferir variáveis do backoffice (DATABASE_URL, etc.) no projeto **azimut-backoffice** (não no projeto do site).
5. Fazer **Redeploy** (Deployments → … → Redeploy) após salvar.

Depois disso:

- **backoffice.azmt.com.br** passará a servir o Next.js do backoffice.
- **https://backoffice.azmt.com.br/login** mostrará a tela de login (o backoffice não usa `/en/login`; a rota é `/login`).
- **https://backoffice.azmt.com.br/api/track** passará a aceitar POST (e OPTIONS) e o 405 deve desaparecer para as chamadas corretas.

## 405 no /api/track

- A API em `azimut-cms/app/api/track/route.ts` aceita apenas **POST** e **OPTIONS**.
- Se o site principal envia **POST** para `https://backoffice.azmt.com.br/api/track`, o 405 hoje ocorre porque esse domínio ainda está servindo o **site** (sem essa API).
- Após apontar o projeto **azimut-backoffice** para `azimut-cms` (e redeploy), o mesmo domínio passará a servir o Next.js e o 405 deve cessar para as requisições POST.

Se no futuro aparecer 405 mesmo com o deploy correto, verificar:

- Se a requisição é realmente **POST** (e não GET).
- CORS: a API já envia `Access-Control-Allow-Origin: *` e `Access-Control-Allow-Methods: POST, OPTIONS`.

## Resumo

| O quê | Onde |
|-------|------|
| Root Directory do projeto **azimut-backoffice** | Vercel → azimut-backoffice → Settings → Root Directory = **`azimut-cms`** |
| URL do login do backoffice | **https://backoffice.azmt.com.br/login** (não usar `/en/login`) |
| 405 em /api/track | Deve sumir quando o domínio passar a servir o app em `azimut-cms` |

---

*Documento gerado a partir da investigação do repositório e da API de track.*
