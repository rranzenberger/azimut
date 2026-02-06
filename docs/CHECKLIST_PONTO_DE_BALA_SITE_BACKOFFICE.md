# Checklist — Site e Backoffice em Ponto de Bala

Visão geral do que está pronto e do que conferir antes de usar em produção.

---

## Avaliação final

**Conclusão:** Site e backoffice estão **aprovados para uso em produção**. Não há bloqueios críticos.

- **Site:** Funcional, multi-idioma, tema claro/escuro, consumo da API do backoffice. Build e rotas ok.
- **Backoffice:** Login, CRUD de conteúdo, leads, configurações, mídia e Carteira Web3 operando. Build corrigido (tipo `Settings` com campos Web3).
- **Web3:** Contrato StudentNFT na Polygon; API de status da carteira estável (não retorna 500); configuração salva no backoffice ou via env.

**Riscos / dependências**
- Deploy do backoffice na Vercel com **Root Directory = `azimut-cms`** (senão sobe o site Vite no domínio do backoffice).
- Banco: `DATABASE_URL` e, se usar Web3 pelo backoffice, script `populate_web3_settings.sql` já rodado no Neon.

---

## Resumo executivo

| Área        | Status   | Ação mínima para produção |
|------------|----------|----------------------------|
| Site       | Pronto   | `VITE_API_URL` na Vercel = URL do backoffice |
| Backoffice | Pronto   | Root Directory `azimut-cms`, `DATABASE_URL`, `JWT_SECRET` |
| Banco      | Pronto   | Migrations aplicadas; rodar `populate_web3_settings.sql` se usar Web3 |
| Web3       | Pronto   | Endereço do contrato NFT no backoffice (ou env); opcional: chave privada na Vercel |

Nenhum ajuste obrigatório pendente. Ajustes opcionais abaixo.

---

## Ajustes opcionais (não bloqueantes)

- **Site:** Trocar `SITE_ABERTO` para `false` em `App.tsx` se quiser site protegido por senha em produção.
- **Backoffice:** Configurar `COMPANY_WALLET_PRIVATE_KEY` na Vercel só se for enviar NFTs/recompensas automaticamente.
- **Qualidade:** Resolver TODOs espalhados (formulários, analytics) de forma iterativa; não impedem o uso.
- **Prisma (local):** Se o build local falhar em "Collecting page data" com erro de engine do Prisma, isso costuma não ocorrer na Vercel; se ocorrer na Vercel, considerar `engineType = "library"` no `schema.prisma`.

---

## Site público (Vite + React)

| Item | Status | Nota |
|------|--------|------|
| Rotas principais | ✅ | Home, Studio, Academy, Work, Contact, Blog, Services, etc. |
| i18n (pt/en/es/fr) | ✅ | LangRouteWrapper, prefixos /pt, /en, etc. |
| Tema claro/escuro | ✅ | ThemeContext |
| Proteção por senha | ✅ | Controlada por `SITE_ABERTO` em App.tsx (hoje `true`) |
| API do backoffice | ✅ | `VITE_API_URL` aponta para o backoffice |
| Build produção | ✅ | `npm run build` ou `vercel-build` (com game) |
| Lazy loading | ✅ | Páginas pesadas em lazy para performance |

**Conferir em produção**
- `VITE_API_URL` na Vercel = `https://backoffice.azmt.com.br` (ou seu domínio do backoffice).
- Se quiser site fechado com senha: em `App.tsx` alterar `SITE_ABERTO` para `false` (e usar DevTools/localStorage para bypass em dev se precisar).

---

## Backoffice (Next.js — azimut-cms)

| Item | Status | Nota |
|------|--------|------|
| Login | ✅ | `/login` → cookie `azimut_admin_token`, middleware protege `/admin` |
| Dashboard | ✅ | `/admin` |
| Conteúdo | ✅ | Serviços, Projetos, Blog, Páginas, Equipe, Credenciais, Mercados, Imprensa, Publicações |
| Leads | ✅ | Lista, Kanban, Dashboard, Jogo, IA |
| Configurações | ✅ | Site, usuários, e-mail |
| Mídia | ✅ | Upload (Vercel Blob ou local) |
| Web3 / Carteira | ✅ | Carteira Web3, contrato NFT, recompensas estudantes |
| APIs | ✅ | REST sob `/api/*` (admin, web3, cron, etc.) |
| Build Vercel | ✅ | Tipo `Settings` corrigido; deploy deve passar |

**Variáveis de ambiente mínimas (Vercel)**
- `DATABASE_URL` — conexão Neon/Postgres.
- `JWT_SECRET` ou `ADMIN_JWT_SECRET` — para login admin.
- Opcional: `COMPANY_WALLET_ADDRESS`, `NFT_CONTRACT_ADDRESS`, `RPC_URL` (Web3); `WEB3_ENCRYPTION_KEY` se salvar chave pelo backoffice; `COMPANY_WALLET_PRIVATE_KEY` só na Vercel se for enviar transações.

**Conferir em produção**
- Projeto backoffice na Vercel com **Root Directory** = `azimut-cms`.
- Domínio (ex.: backoffice.azmt.com.br) apontando para esse projeto.
- Tabela `Settings` com colunas Web3 (rodar `azimut-cms/sql/populate_web3_settings.sql` no Neon se ainda não rodou).

---

## Banco de dados (Neon/Postgres)

| Item | Status | Nota |
|------|--------|------|
| Prisma schema | ✅ | Models alinhados com migrations |
| Migrations | ✅ | Incluindo Web3 em Settings |
| Script Web3 | ✅ | `azimut-cms/sql/populate_web3_settings.sql` (colunas + valores iniciais) |

**Antes de usar**
- Rodar migrations (ou aplicar SQL manualmente) no banco de produção.
- Rodar `populate_web3_settings.sql` se usar Carteira Web3 pelo backoffice.

---

## Web3 (Polygon, NFT, Carteira)

| Item | Status | Nota |
|------|--------|------|
| Contrato StudentNFT | ✅ | Deploy na Polygon; endereço no backoffice |
| Carteira no backoffice | ✅ | Endereço público + contrato NFT configuráveis |
| API wallet status | ✅ | Não retorna 500; mostra formulário se não configurado |
| Salvar configuração | ✅ | POST `/api/web3/settings`; depende das colunas Web3 no Settings |

**Opcional**
- Chave privada na Vercel (`COMPANY_WALLET_PRIVATE_KEY`) para o sistema enviar NFTs/recompensas.
- Contrato StudentReward e endereço no backoffice, se for usar recompensas automáticas.

---

## Resumo: pronto para usar?

- **Site:** Sim, desde que `VITE_API_URL` aponte para o backoffice em produção e o build (ex.: Vercel) esteja ok.
- **Backoffice:** Sim, após deploy com Root Directory `azimut-cms`, `DATABASE_URL` e `JWT_SECRET` (e opcionalmente variáveis Web3).
- **Uso diário:** Login no backoffice → editar conteúdo, leads, configurações e Carteira Web3. Site consome as APIs do backoffice.

Pequenos TODOs espalhados no código (formulários, analytics, etc.) não bloqueiam o uso; podem ser tratados de forma iterativa.

---

*Documento de avaliação final e checklist. Última revisão: fev/2026.*
