# Checklist de deploy — Site e Backoffice

## Resultado da verificação (builds)

| Parte        | Build | Observação |
|-------------|-------|------------|
| **Site (Vite)** | OK    | `npm run build` — concluído. Avisos de CSS (selector, backfaceVisibility) não impedem deploy. |
| **Backoffice (Next)** | OK | Com `PRISMA_CLIENT_ENGINE_TYPE=library`. Mensagens "Dynamic server usage/cookies" são esperadas (rotas de API com auth). |

---

## Deploy correto

### 1. Site (frontend público)

- **Onde:** Projeto Vercel do repositório (ex.: `rranzenberger/azimut`), se o root for o site.
- **Build:** `npm run vercel-build` (game + copy + vite build).
- **Variáveis:** As que o site precisar (ex.: API URL do backoffice, analytics). Não precisa de `PRISMA_CLIENT_ENGINE_TYPE`.

### 2. Backoffice (azimut-cms)

- **Onde:** Outro projeto Vercel (ou subprojeto) apontando para a pasta `azimut-cms` (ou monorepo configurado).
- **Build:** `prisma generate && next build`.
- **Variáveis obrigatórias:**
  - `DATABASE_URL` — connection string do Postgres (ex.: Neon).
  - **`PRISMA_CLIENT_ENGINE_TYPE`** = **`library`** — sem isso o build falha com "Invalid client engine type".
- Demais envs: conforme o backoffice (auth, blob, etc.).

### 3. Banco de dados

- Rodar migrations após o deploy do backoffice:
  ```bash
  cd azimut-cms
  npx prisma migrate deploy
  ```
- Ou executar manualmente o SQL de `prisma/migrations/`, por exemplo:
  - `20260208000000_add_project_media_display_options` (displayFit, displayPosition, displayScale em ProjectMedia).

---

## Inconsistências conhecidas (não bloqueiam)

1. **Site — CSS:** Avisos de selector `.text-[#9a9590]` e `backfaceVisibility` (minificador sugere `backface-visibility`). Opcional corrigir depois.
2. **Site — /grain.png:** "didn't resolve at build time" — recurso resolvido em runtime; ok se o arquivo existir em `public/`.
3. **Backoffice:** Rotas que usam `cookies()` são corretamente dinâmicas (ƒ); as mensagens no build são informativas.

---

## Resumo

- **Site:** Build OK; fazer deploy com `vercel-build` e variáveis do front.
- **Backoffice:** Build OK **somente** com `PRISMA_CLIENT_ENGINE_TYPE=library` no ambiente; depois rodar `prisma migrate deploy` (ou SQL da migration da galeria).
