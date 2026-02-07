# Erro 405 no login/setup do backoffice – como corrigir

## O que está acontecendo

- Em **backoffice.azmt.com.br** você vê **405 Method Not Allowed** ao clicar em Entrar ou em "Redefinir admin (setup)".
- Isso acontece quando o domínio **backoffice** está usando o **deploy do site (Vite)**, e não o deploy do **Next.js (backoffice)**.
- No deploy do site, não existem rotas `/api/admin/login` nem `/api/admin/setup`; o servidor responde 405 para POST nesses caminhos.

## Solução: projeto backoffice com Root Directory correto

O backoffice é um app **Next.js** que está na pasta **`azimut-cms`** do repositório. Na Vercel, o **projeto do backoffice** precisa buildar essa pasta, não a raiz do repo.

### Passos na Vercel

1. Abra o projeto do backoffice na Vercel:  
   [https://vercel.com/azimuts-projects-6435f869/azimut-backoffice/settings](https://vercel.com/azimuts-projects-6435f869/azimut-backoffice/settings)

2. Em **Settings**, vá em **General** e procure **Root Directory**.

3. Defina **Root Directory** = **`azimut-cms`** (e não vazio).
   - **Vazio** = Vercel usa a raiz do repositório = build do **site Vite** = sem rotas `/api` = 405.
   - **`azimut-cms`** = Vercel entra na pasta do backoffice = build **Next.js** = rotas `/api` funcionam.

4. Salve e faça um **novo deploy** (Deployments → último deploy → ⋮ → Redeploy, ou push de um commit).

5. Depois do deploy, o domínio **backoffice.azmt.com.br** deve estar ligado a **este** projeto (azimut-backoffice). Em **Settings → Domains** confira se **backoffice.azmt.com.br** está listado para o projeto **azimut-backoffice**.

### Resumo

| Configuração        | Valor        |
|---------------------|-------------|
| Root Directory      | `azimut-cms` |
| Framework           | Next.js (detectado pelo `azimut-cms`) |
| Build Command       | (padrão: `next build` dentro de `azimut-cms`) |

Depois disso, **Entrar** e **Redefinir admin (setup)** devem deixar de retornar 405 e o login poderá funcionar (e, se precisar, use o botão de setup para criar/redefinir o admin).
