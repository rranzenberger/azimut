# Variáveis, APIs e IA — checklist para site e backoffice

Referência única para garantir que **variáveis de ambiente**, **APIs** e **IA** estejam configuradas e tudo funcione no site e no backoffice.

---

## 1. Site (Vite) — variáveis no build (Vercel ou outro host)

Configure no projeto do **site** (azimut-site-vite-tailwind):

| Variável | Obrigatória | Uso | Fallback no código |
|----------|-------------|-----|---------------------|
| **VITE_BACKOFFICE_URL** | Recomendada (produção) | URL do backoffice para todas as APIs públicas (content, page, academy, project, blog, etc.) | `https://backoffice.azmt.com.br` |
| **VITE_CMS_API_URL** | Opcional | Alternativa ao backoffice (newsletter, media, notify-form, alguns forms) | `https://backoffice.azmt.com.br` ou localhost em dev |
| **VITE_API_URL** | Opcional | API de leads/sugestões (api.ts) | `https://backoffice.azmt.com.br` |
| **VITE_API_KEY** | Opcional | Chave para API de leads (se exigir) | — |
| **VITE_CLAUDE_API_KEY** ou **VITE_ANTHROPIC_API_KEY** | Opcional (IA no site) | Assistente Claude / sugestões no site | — |
| **VITE_DEEPSEEK_API_KEY** | Opcional (IA no site) | Chat/sugestões DeepSeek no site | — |
| **VITE_ENABLE_AI_SUGGESTIONS** | Opcional | `false` desliga sugestões de IA em formulários | ativado se não for `false` |
| **VITE_ENABLE_TRACKING** | Opcional | `false` desliga tracking | ativado se não for `false` |
| **VITE_GA_MEASUREMENT_ID** | Opcional | Google Analytics (G-XXXX) | — |
| **VITE_GOOGLE_SEARCH_CONSOLE_VERIFICATION** | Opcional | Código de verificação do Search Console | — |

**Resumo site:** Em produção, defina **VITE_BACKOFFICE_URL** = `https://backoffice.azmt.com.br` (ou seu domínio do backoffice). O restante tem fallback ou é opcional.

---

## 2. Backoffice (Next.js / azimut-cms) — variáveis no Vercel

Configure no projeto do **backoffice** (azimut-cms):

### Conexão e URLs

| Variável | Obrigatória | Uso |
|----------|-------------|-----|
| **DATABASE_URL** | Sim | Conexão Prisma/Neon (PostgreSQL) |
| **NEXT_PUBLIC_BACKOFFICE_URL** | Recomendada | URL pública do backoffice; usada nas APIs para devolver URLs absolutas de imagens (ex.: `https://backoffice.azmt.com.br`) |
| **NEXT_PUBLIC_BASE_URL** | Opcional | Base para redirect após logout | `https://backoffice.azmt.com.br` |
| **NEXT_PUBLIC_SITE_URL** | Opcional | URL do site (azmt.com.br) para links "Ver site" e alguns webhooks | `https://azmt.com.br` |

### Autenticação

| Variável | Obrigatória | Uso |
|----------|-------------|-----|
| **JWT_SECRET** ou **ADMIN_JWT_SECRET** ou **NEXTAUTH_SECRET** | Sim | Assinatura do token de admin |

### IA (Claude e DeepSeek)

| Variável | Obrigatória | Uso |
|----------|-------------|-----|
| **ANTHROPIC_API_KEY** | Opcional* | Claude: análise de leads, SEO, editais, relatórios, otimização de projetos |
| **DEEPSEEK_API_KEY** | Opcional* | DeepSeek: alternativa ao Claude (análise de leads, cron editais, game neurolinguístico) |

\* Pelo menos uma das duas (ANTHROPIC ou DEEPSEEK) é necessária para recursos de IA no backoffice (análise de leads, editais automáticos, SEO com IA, etc.). Se ambas estiverem configuradas, o código pode usar as duas em fluxos diferentes.

### Outros (opcionais)

| Variável | Uso |
|----------|-----|
| **NOTIFICATION_EMAIL** | E-mail para notificações (formulários, etc.) |
| **CRON_SECRET** | Segredo para rotas de cron (ex.: refresh editais) |
| **EDITAIS_AUTO_APPROVE** | `true` para aprovar editais automaticamente após IA |
| **UPLOAD_BASE** | Pasta de uploads (default: `uploads`) |
| **BLOB_READ_WRITE_TOKEN** | Vercel Blob (se usar upload em blob) |
| **BASIC_AUTH_***, **BACKOFFICE_OPEN** | Proteção extra ou liberar backoffice sem basic auth |
| **N8N_URL**, **N8N_WEBHOOK_URL**, **N8N_WORKFLOW_ID** | Integração n8n (leads, automações) |
| **COMPANY_WALLET_***, **RPC_URL**, **NFT_CONTRACT_***, **WEB3_ENCRYPTION_KEY** | Web3/NFT (recompensas, carteira, contratos) |

---

## 3. APIs — site → backoffice

Todas as chamadas do site ao backoffice usam a **mesma base** (VITE_BACKOFFICE_URL ou VITE_CMS_API_URL). Endpoints usados:

- `GET /api/public/content?lang=pt&page=work` (ou home) — projetos, serviços, hero
- `GET /api/public/page/[...slug]` — página por slug (ex.: academy/courses)
- `GET /api/public/academy/landing-sections` — 4 cards Academy
- `GET /api/public/academy/courses` — cursos
- `GET /api/public/academy/past-events` — Past Events
- `GET /api/public/project/[slug]` — detalhe de projeto
- `GET /api/public/services`, `GET /api/public/service/[slug]` — serviços (What)
- `GET /api/public/blog`, `GET /api/public/blog/[slug]`, `GET /api/public/blog/categories` — blog
- `GET /api/public/team`, `GET /api/public/credentials`, `GET /api/public/history` — Studio
- `GET /api/public/press`, `GET /api/public/editais`, `GET /api/public/publications` — imprensa, editais, research
- `GET /api/public/media`, `GET /api/public/footer-settings` — mídias, rodapé
- `POST /api/public/newsletter` — inscrição newsletter

Se **VITE_BACKOFFICE_URL** (ou VITE_CMS_API_URL) estiver correta e o backoffice no ar, essas APIs funcionam. CORS nas rotas públicas está liberado (`Access-Control-Allow-Origin: *`).

---

## 4. IA — onde é usada

| Onde | O que | Variável (site) | Variável (backoffice) |
|------|--------|------------------|------------------------|
| Site: assistente/sugestões Claude | Chat ou sugestões em formulários | VITE_CLAUDE_API_KEY ou VITE_ANTHROPIC_API_KEY | — |
| Site: DeepSeek | Chat/sugestões | VITE_DEEPSEEK_API_KEY | — |
| Backoffice: análise de leads | IA para classificar/analisar lead | — | ANTHROPIC_API_KEY ou DEEPSEEK_API_KEY |
| Backoffice: cron editais | Busca/processamento de editais com IA | — | ANTHROPIC_API_KEY e/ou DEEPSEEK_API_KEY |
| Backoffice: SEO (otimizar projetos) | Geração de textos SEO | — | ANTHROPIC_API_KEY |
| Backoffice: relatório diário de leads | Resumo com IA | — | ANTHROPIC_API_KEY |
| Backoffice: game neurolinguístico | Análise de respostas | — | ANTHROPIC_API_KEY, DEEPSEEK_API_KEY |

Sem chaves de IA, o site e o backoffice continuam funcionando; apenas os recursos que dependem de Claude/DeepSeek ficam desativados ou retornam erro controlado.

---

## 5. Checklist rápido “tudo funcionando”

**Site (build Vercel):**
- [ ] **VITE_BACKOFFICE_URL** = URL do backoffice (ex.: `https://backoffice.azmt.com.br`)
- [ ] Redeploy após alterar variáveis (build do Vite embute as `VITE_*`)

**Backoffice (Vercel):**
- [ ] **DATABASE_URL** configurada (Neon/PostgreSQL)
- [ ] **JWT_SECRET** (ou equivalente) para login admin
- [ ] **NEXT_PUBLIC_BACKOFFICE_URL** = URL do backoffice (para APIs devolverem URLs absolutas de imagens)
- [ ] (Opcional) **ANTHROPIC_API_KEY** ou **DEEPSEEK_API_KEY** para recursos de IA

**Banco:**
- [ ] Migrations aplicadas (`npx prisma migrate deploy` no backoffice)
- [ ] Se não usar migrate: rodar `sql/ensure_academy_landing_pages.sql` e `sql/EXECUTAR_ACADEMY_SE_PRECISAR.sql` se necessário

**Teste rápido:**
- Site: abrir página Academy e Projetos; conteúdo deve vir do backoffice (imagens dos 4 cards se estiverem preenchidas).
- Backoffice: login, editar uma página, salvar; em alguns minutos o cache da API pode atualizar e o site refletir.

---

*Doc criado a partir da varredura de variáveis e APIs (fev 2026). Ver também `AUDITORIA_SITE_VS_BACKOFFICE.md` e `VARREDURA_SITE_BACKOFFICE_2026.md`.*
