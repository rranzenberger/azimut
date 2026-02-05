# Backoffice: sempre entrar na tela de login

## Problema

Ao acessar **https://azimut-backoffice.vercel.app/en/login** (ou **https://backoffice.azmt.com.br/en/login**), em vez do formulário de login do CMS aparece:

- Header do site Azimut (HOME, SOLUTIONS, etc.)
- Breadcrumb "Home / Login"
- Área de conteúdo em branco

Isso acontece quando o **projeto Vercel azimut-backoffice** está fazendo deploy do **site (Vite)** em vez do **backoffice (Next.js em `azimut-cms`)**.

---

## Solução de vez (configuração Vercel)

O projeto **azimut-backoffice** na Vercel **precisa** buildar e servir o app que está na pasta **azimut-cms** (Next.js), não a raiz do repositório (Vite).

### Opção A – Root Directory = `azimut-cms` (recomendado)

1. Abra: **https://vercel.com/azimuts-projects-6435f869/azimut-backoffice/settings**
2. Em **General** → **Build & Development**:
   - **Root Directory:** clique em **Edit** e defina **`azimut-cms`** (só o texto `azimut-cms`, sem barras).
   - **Install Command:** deixe em branco (padrão: `npm install`).
   - **Build Command:** deixe em branco (padrão: `npm run build`) ou use `npm run vercel-build`.
3. **Save**.
4. **Deployments** → último deploy → **⋯** → **Redeploy** (opcional: desmarque "Use existing Build Cache").

Assim o Vercel usa **apenas** a pasta `azimut-cms` como raiz do projeto: o Next.js encontra `app/`, `login/`, `admin/`, e a rota `/login` (e `/en/login` → redirect para `/login`) passa a mostrar a **tela de login do backoffice**.

### Opção B – Root vazio + comandos com `cd azimut-cms`

Se por algum motivo a Opção A não for usada:

- **Root Directory:** vazio  
- **Install Command:** `cd azimut-cms && npm install`  
- **Build Command:** `cd azimut-cms && npm run vercel-build`  

Confirme no **Build Logs** que o build está rodando dentro de `azimut-cms` e que o deploy sobe o output do Next.js (e não do Vite). Se ainda aparecer o site em vez do login, use a **Opção A**.

---

## Comportamento correto após o ajuste

| URL | O que deve acontecer |
|-----|----------------------|
| `https://azimut-backoffice.vercel.app/login` | Tela de login do CMS (formulário email/senha). |
| `https://azimut-backoffice.vercel.app/en/login` | Redirect para `/login` e depois a mesma tela de login. |
| `https://azimut-backoffice.vercel.app/admin` (sem estar logado) | Redirect para `/login?next=/admin`. |

Nunca deve aparecer o header do site público (HOME, SOLUTIONS, etc.) nem conteúdo em branco no lugar do formulário de login.

---

## No código (já garantido)

- O **middleware** em `azimut-cms/middleware.ts`:
  - Redireciona `/en/login`, `/pt/login`, etc. para `/login`.
  - **Não** redireciona `/login` para `/admin` (evita tela em branco quando o cookie é inválido).
- A página **`azimut-cms/app/login/page.tsx`** é a tela de login; ela só é servida quando o projeto deployado é o Next.js (pasta `azimut-cms`).

Se a tela de login ainda não aparecer após o redeploy, o problema é **sempre** a configuração do projeto na Vercel (build/raiz errada). Confira de novo **Root Directory** e os comandos de build conforme acima.
