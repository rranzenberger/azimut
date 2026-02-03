# 📊 Resumo final: fase 0–10, o que falta e quem faz o quê

**Objetivo:** Uma única visão do estado do site + backoffice, fase 0–10, lista do que realmente falta fazer, divisão de responsabilidades (IA vs você vs n8n), APIs a implementar, estado do backoffice, SQL pendente, partes fixas vs dinâmicas e o que transferir para o backoffice para um estagiário editar sem depender de código.

**Fontes lidas:** STATUS_IMPLEMENTACAO_COMPLETO, MAPEAMENTO_COMPLETO_PLANOS_E_PENDENCIAS, PONTO_ATUAL_E_PLANO_CURTO_MEDIO_LONGO_2026, ORDEM_DE_EXECUCAO_2026, PROXIMOS_PASSOS_FINAL, docs/AUTOMACOES_O_QUE_FICAMOS_DE_FAZER_E_O_QUE_FALTA, docs/ACOES_GAME_NEUROLINGUISTICO_E_PLANO_IMPLEMENTACAO, Prisma schema, APIs public do backoffice, uso de API no site.

---

## 1. Fase 0–10 (onde estamos)

Escala: **0** = nada feito, **10** = pronto para produção e evolução contínua sem dependência de desenvolvimento para conteúdo/leads.

### Site (frontend público)

| Área | Nota | Comentário |
|------|------|------------|
| Deploy / infra | **9** | Vercel, projeto azimut, domínio. |
| SEO base | **7** | hreflang, Schema (serviços, LocalBusiness, Review, VideoObject). Falta: Search Console ativo, Business Profile, eventos GA. |
| Performance | **6** | WebP, preload LCP, lazy rotas. Lighthouse ~77 desktop, ~60 mobile. Falta: PWA cache, Core Web Vitals estáveis. |
| Acessibilidade | **6** | Contraste, vídeo aria, touch targets. Falta: revisão ARIA completa, skip links. |
| Formulários | **8** | Validação, honeypot, rate limit (Contact, Academy, Vancouver). Envio para backoffice. |
| Busca | **8** | Lupa, Ctrl+K, SearchModal (projetos, serviços, páginas, blog). |
| Conteúdo estático (4 idiomas) | **8** | PT, EN, ES, FR nas páginas principais. Muito texto ainda em código (fixo). |
| Conteúdo dinâmico (API) | **6** | Projetos, serviços, blog, history, page por slug, media. Falta: press, publicações, projetos relacionados por serviço. (Depoimentos: fora do escopo por enquanto.) |
| Comportamento / IA | **6** | useBehaviorTracking, useIntentionDetection, banner sugestão, CTAs dinâmicos, Claude com contexto. useIntelligentNavigation na UI já conectado. |
| Gamificação | **7** | Widget XP/níveis/badges, “Ver meu progresso na página Studio”. Empathy Engine 4 fases no site. |
| Error handling | **5** | ErrorBoundary existe; fallbacks por rota não uniformes. |

**Média ponderada site: ~6,8** → arredondando **fase 7** no site.

---

### Backoffice (azimut-cms)

| Área | Nota | Comentário |
|------|------|------------|
| Deploy / projeto Vercel | **8** | Projeto azimut-backoffice; Root/Build com `cd azimut-cms`. Conferir domínio. |
| CRUD conteúdo | **8** | Projects, Services, Markets, Blog, Media, Pages, Sections, Team, Credentials, Company History. |
| Leads | **8** | API de leads (contact, Vancouver, game), leadIntelligence (JSONB), scoring. Webhook n8n chamado no código. |
| Analytics / dashboard | **6** | KPIs, gráficos, hot leads. Falta: funil visual, session recording, heatmap, exportação robusta. |
| Notificações | **4** | notify-form (email). Falta: tempo real no painel, WhatsApp, alertas hot lead. |
| n8n integração | **5** | Código envia POST para N8N_LEAD_INTELLIGENCE_WEBHOOK. Falta: workflow ativo no n8n, variável no Vercel. |
| APIs públicas | **8** | /api/public/project, service, services, blog, page, history, media, newsletter, content. Coerente com o site. |

**Média ponderada backoffice: ~6,7** → arredondando **fase 7** no backoffice.

---

### No todo (site + backoffice + automações)

| Área | Nota | Comentário |
|------|------|------------|
| Fluxo lead completo | **5** | Formulário → backoffice → BD ok. Lead → n8n não estável (config n8n pendente). |
| Conteúdo editável sem dev | **6** | Projetos, serviços, blog, páginas, equipe, timeline editáveis. Muito texto de páginas ainda no código. |
| Automações (n8n) | **3** | Workflow 1 documentado e parcialmente configurado; 2–7 planejados, não implementados. |
| Visibilidade (SEO/GA) | **5** | GA no projeto; Search Console e Business Profile manuais e pendentes. |
| Game / gamificação | **6** | Empathy Engine no ar; Game Neurolinguístico planejado, não implementado no site. |

**No todo: fase ~5,5** → arredondando **fase 6** (funcional, mas automações e “conteúdo 100% editável” ainda incompletos).

---

## 1.1 Leads passivos e ativos (está no relatório)

Sim. Os dois fluxos estão nos planos e no doc de automações:

| Tipo | O que é | Workflow n8n | Status |
|------|---------|--------------|--------|
| **Leads passivos** | Quem preenche formulário no site (Contact, Vancouver, Game) → backoffice recebe → n8n investiga (IP, email, enriquecimento) → classifica → email personalizado ou bloqueia. | **Workflow 1** (captação passiva) | Código pronto (backoffice chama webhook); falta **você** configurar o workflow no n8n e a variável no Vercel. |
| **Leads ativos** | Vocês buscam prospects (LinkedIn, Instagram, Google, listas) → n8n enriquece → IA analisa → email personalizado. | **Workflow 2** (captação ativa) | Planejado; implementar depois do Workflow 1 estável. |

Detalhes: `docs/AUTOMACOES_O_QUE_FICAMOS_DE_FAZER_E_O_QUE_FALTA.md`, `AUTOMACOES_ROADMAP_EXECUTIVO.md`, `docs/workflows/WORKFLOWS_3_A_7_DETALHES.md`.

---

## 2. Tudo que realmente falta fazer (lista única)

Consolidado a partir dos docs de implementação.

### Crítico / configuração (sua vez – manual)

- [ ] **Google Search Console:** verificar propriedade, sitemap, indexação (ORDEM §7).
- [ ] **Google Business Profile:** perfil, fotos, serviços, reviews (ORDEM §8).
- [ ] **GA no projeto azimut:** Vercel → projeto azimut → `VITE_GA_MEASUREMENT_ID` = `G-XKHT65THTL` → redeploy (ORDEM §4).
- [ ] **Backoffice Vercel:** garantir deploy no projeto **azimut-backoffice**, Root vazio, Build `cd azimut-cms`, domínio backoffice.azmt.com.br (ORDEM §1).

### n8n (você faz no n8n; eu posso guiar)

- [ ] **Workflow 1 (captação passiva):** criar/importar workflow, nós: Webhook → validação IP (ipapi.co) → email (Hunter opcional) → enriquecimento (SerpAPI, Proxycurl opcional) → IA (DeepSeek/Claude) → PostgreSQL (Neon) → Resend/notificação (PROXIMOS_PASSOS_FINAL, ORDEM §18–22).
- [ ] **Credenciais n8n:** SerpAPI, PostgreSQL (Neon, SSL), DeepSeek, Claude, Resend (conforme doc).
- [ ] **URL do webhook:** copiar URL do nó Webhook (ORDEM §19).
- [ ] **Vercel backoffice:** `N8N_LEAD_INTELLIGENCE_WEBHOOK` = URL do webhook → redeploy (ORDEM §20).
- [ ] **Testar:** enviar lead de teste pelo site → ver Executions no n8n e dados no Neon (ORDEM §22).
- [ ] **Workflows 2–7:** futuros (captação ativa, LinkedIn, Instagram, Google Intent, Reengajamento, Competitor) – ver docs/AUTOMACOES_O_QUE_FICAMOS_DE_FAZER_E_O_QUE_FALTA.

### Código (eu faço / posso fazer)

- [ ] **Navegação inteligente na UI:** já existe IntelligentNavigationSuggestions no Layout; revisar textos/UX se quiser (ORDEM §16–17).
- [ ] **PWA offline:** estratégia de cache no service worker para páginas principais (~30 min) (ORDEM §14).
- [ ] **Error handling:** ErrorBoundary e fallbacks por rota consistentes (ORDEM §29).
- [ ] **Eventos de analytics:** scroll depth, tempo na página, conversão por formulário no GA (~15 min) (ORDEM §28).
- [ ] **Imagens OG:** por página/idioma (meta og:image) (~2 h) (ORDEM §25).
- [ ] **Dashboard analytics (backoffice):** filtros, exportação, funil visual (3–5 h) (ORDEM §26).
- [ ] **Notificações (backoffice):** painel tempo real, alertas hot lead, email/WhatsApp se aplicável (~2 h) (ORDEM §27).
- [ ] **ServiceDetail projetos relacionados:** buscar projetos do mesmo serviço via API e exibir na página (PLANO_PROXIMAS_FEATURES).
- [ ] **APIs backoffice:** /api/public/testimonials, /api/public/publications, /api/public/press (ou equivalente) para Studio/Press/Research dinâmicos.
- [ ] **Sitemap dinâmico:** API que gera sitemap incluindo projetos/publicados do backoffice (FUNCIONALIDADES_AVANCADAS §2).
- [ ] **Game Neurolinguístico (Fase 1):** componente React do game (perguntas + scoring + chamada API game/neurolinguistic + salvar lead) – ver docs/ACOES_GAME_NEUROLINGUISTICO_E_PLANO_IMPLEMENTACAO.
- [ ] **Empathy Engine (melhorias):** botão “Entregar”, highlight combos, som, painel pós-fase, telemetria, i18n (azimut-empathy-engine).

### Conteúdo / operação (você ou equipe)

- [ ] Conteúdo long-form: Vancouver, /what/..., case studies em /studio/credibilidade (contínuo).
- [ ] Blog: 1 post/semana estratégico (contínuo).
- [ ] Backlinks: VFS, VanArts, Museu Olímpico, Study in Canada (contínuo).

---

## 3. Quem faz o quê

### Eu (IA / código) posso fazer

- Qualquer alteração em **código** do site (src/) e do backoffice (azimut-cms/): novos componentes, páginas, hooks, chamadas API, validações, SEO (meta, Schema), PWA, error boundaries, eventos GA, dashboard analytics (front do admin), APIs novas no backoffice.
- **SQL** (migrations Prisma ou scripts .sql) para novos campos/tabelas e dados iniciais.
- **Documentação** técnica e guias de implementação.
- **Otimizar e automatizar** fluxos que dependam de código (ex.: sitemap dinâmico, prefetch, recomendações, formulários, envio de payload para n8n já está no backoffice).

### Você faz (manual / configuração)

- **Google Search Console e Google Business Profile** (contas, propriedades, sitemap, perfil).
- **Vercel:** variáveis de ambiente (GA no projeto azimut, N8N_LEAD_INTELLIGENCE_WEBHOOK no backoffice), confirmação de projeto/domínio do backoffice.
- **n8n:** criar/importar workflow, configurar nós (Webhook, SerpAPI, PostgreSQL, DeepSeek, Claude, Resend), credenciais, ativar workflow, copiar URL do webhook.
- **Contas e APIs externas:** SerpAPI, Proxycurl, Hunter, Resend, Phantombuster (futuro), etc., e colar keys no n8n ou Vercel conforme doc.
- **Conteúdo:** textos long-form, posts do blog, backlinks, revisão de copy.
- **Decisões de produto:** prioridade dos workflows 2–7, Game Neurolinguístico vs Empathy Engine, o que vai para backoffice editável.

### n8n (você configura; eu documento e guio)

- Workflow 1: Webhook → validações → enriquecimento → IA → banco → email.
- Workflows 2–7: quando for a vez, seguindo docs/workflows/WORKFLOWS_3_A_7_DETALHES e AUTOMACOES_O_QUE_FICAMOS_DE_FAZER_E_O_QUE_FALTA.

---

## 4. O que dá para otimizar e automatizar (eu faço no código)

- **Sitemap dinâmico:** API no backoffice que gera sitemap com base em projetos/páginas publicados; site ou Vercel cron chamando essa API.
- **Prefetch:** ao exibir link de projeto/serviço, prefetch da rota ou da API do projeto (FUNCIONALIDADES_AVANCADAS §5).
- **Eventos GA:** enviar scroll depth, tempo na página, clique em CTA, “formulário enviado” (ORDEM §28).
- **Web Vitals:** enviar LCP, INP, CLS para GA4 ou para API do backoffice (FUNCIONALIDADES_AVANCADAS §4).
- **Error Boundary com report:** em caso de erro em produção, POST para /api/errors/report (já existe no backoffice) para não depender só de Sentry.
- **Navegação inteligente:** já conectada (IntelligentNavigationSuggestions); dá para ajustar textos, número de sugestões e lógica de exibição.
- **Formulários:** já com honeypot e rate limit; dá para adicionar mais um campo “assunto” ou “tipo de projeto” vindo do backoffice (lista editável).
- **Dashboard backoffice:** exportação CSV/Excel de leads, filtros por data/score/origem, gráfico de funil (conversão por etapa).

---

## 5. Ações n8n que você precisa fazer

Resumo direto:

1. **Ter n8n rodando** (Railway ou VPS). Se já tiver, acessar a URL (ex.: https://n8n-production-xxx.up.railway.app).
2. **Criar ou importar o Workflow 1 (lead intelligence):**
   - Nó **Webhook** (POST) → URL que você vai copiar.
   - Nós de **validação** (IP com ipapi.co; opcional: email Hunter, AbuseIPDB).
   - Nós de **enriquecimento** (opcional: SerpAPI, Proxycurl).
   - Nó **IA** (DeepSeek ou Claude) para classificação/risco.
   - Nó **PostgreSQL** (Neon): credencial com SSL; salvar/atualizar lead ou perfil.
   - Nó **Resend** (ou similar): enviar email quando aprovado.
3. **Credenciais no n8n:** SerpAPI (api_key), PostgreSQL (host, database, user, password, port 5432, SSL require), DeepSeek/Claude, Resend.
4. **Salvar e ativar** o workflow.
5. **Copiar a URL do Webhook** (ex.: https://seu-n8n.../webhook/lead-intelligence).
6. **Vercel → projeto azimut-backoffice → Environment Variables:** `N8N_LEAD_INTELLIGENCE_WEBHOOK` = essa URL → Save → Redeploy.
7. **Testar:** enviar um lead pelo formulário do site e ver Executions no n8n e registro no Neon.

Detalhes passo a passo: PROXIMOS_PASSOS_FINAL.md, docs/workflows/LEAD_INTELLIGENCE_N8N.md, docs/AUTOMACOES_O_QUE_FICAMOS_DE_FAZER_E_O_QUE_FALTA.md.

---

## 6. APIs que ainda faltam implementar (e onde)

| API | Onde implementar | O que faz | Prioridade |
|-----|------------------|-----------|------------|
| **/api/public/testimonials** (ou conteúdo “depoimentos”) | Backoffice (azimut-cms/app/api/public/) | Lista depoimentos para Studio/Home. Pode ser tabela Testimonial ou Section/Page. | Média |
| **/api/public/publications** (ou equivalente) | Backoffice | Lista publicações para Research. Pode ser tabela Publication ou conteúdo em Page. | Média |
| **/api/public/press** (ou equivalente) | Backoffice | Lista notícias/imprensa para Press. Pode ser tabela Press ou Blog com categoria. | Média |
| **Projetos relacionados por serviço** | Já existe /api/public/project e /api/public/service. | No site (ServiceDetail): chamar API de projetos filtrados por service slug (ex.: /api/public/projects?service=cinema-audiovisual). Se não existir, criar rota no backoffice. | Alta |
| **Sitemap dinâmico** | Backoffice (ex.: /api/sitemap ou /api/public/sitemap.xml) | Retorna XML com URLs de páginas + projetos publicados. Site ou Vercel cron pode consumir. | Média |
| **Game Neurolinguístico** | Backoffice já tem POST /api/game/neurolinguistic. | Site: página/componente do game que envia respostas para essa API e salva lead (tipo GAME_NEUROLINGUISTIC ou similar). | Média (conforme plano do game) |
| **Enriquecimento de lead (site → backoffice)** | Backoffice já chama n8n. | Site não chama enrichment direto; fluxo é formulário → backoffice → n8n. Nenhuma API nova no site. | — |

Onde está cada uma hoje:

- **Projetos:** GET /api/public/project/[slug], listagem via useBackofficeProjects (projetos do backoffice).
- **Serviços:** GET /api/public/service/[slug], GET /api/public/services.
- **Blog:** GET /api/public/blog, /api/public/blog/[slug], /api/public/blog/categories.
- **Páginas:** GET /api/public/page/[slug] (Page + Sections).
- **History:** GET /api/public/history (Company History).
- **Media:** GET /api/public/media (por pageSlug/sectionSlug).
- **Newsletter:** POST /api/public/newsletter.
- **Content (personalização):** GET /api/public/content.

Coerência: o site usa essas rotas; o Prisma tem Project, Service, BlogPost, Page, Section, CompanyHistory, Media, etc. Falta expor testimonials, publications e press de forma explícita e, se quiser, um endpoint de “projetos por serviço” se ainda não existir.

---

## 7. Estado do backoffice e coerência

- **Schema (Prisma):** Projeto, Service, Market, Page, Section, Media, BlogPost, Lead, VisitorSession, PageView, CompanyHistory, TeamMembers, Credentials, MakingOf, etc. Migrations aplicadas (listadas em prisma/migrations). Coerente com o que o site consome.
- **APIs públicas:** project, service, services, blog, page, history, media, newsletter, content. Coerentes com o uso no site (useBackofficeProjects, useBackofficeService, usePageContent, useSearch para blog, etc.).
- **Leads:** POST /api/leads, /api/leads/vancouver, /api/leads/game. Salvam no BD e disparam POST para N8N_LEAD_INTELLIGENCE_WEBHOOK. Coerente; o elo que falta é a configuração do n8n e da variável no Vercel.
- **Admin:** projetos, serviços, mercados, blog, mídia, páginas, equipe, credenciais, histórico, leads, dashboard analytics, roadmap. Coerente com o modelo de dados.
- **Incoerências menores:** SmartContactForm usa `backoffice.azimut.com.br` em um fallback; o correto é `backoffice.azmt.com.br` (ou o domínio oficial). Vale padronizar para VITE_CMS_API_URL.

Conclusão: backoffice e site estão coerentes. O que falta é sobretudo configuração (n8n, variáveis), algumas APIs novas (testimonials, publications, press, projetos por serviço, sitemap) e melhorias de dashboard/notificações.

---

## 8. O que ainda precisa ir para SQL (e resumo implementação)

### Já aplicado (Prisma migrations / scripts)

- Projeto: descrição 4 idiomas, galeria, SEO, filtros avançados, lead analytics, etc.
- Page: hero slogan, subtitle, pillars, hero media, demoreel.
- Lead: leadIntelligence (JSONB), kanban status, assignment, analytics fields, tipo EMPATHY_ENGINE.
- Company History, Team, Credentials, Settings, analytics tables, making-of, Web3/student reward (conforme migrations na pasta prisma/migrations e sql/).

### Pendente / opcional (depende do que for decidido)

- **Tabela Testimonial** (ou uso de Section/Page para depoimentos): se quiser depoimentos editáveis no admin sem tocar no código.
- **Tabela Publication** (ou Section): se quiser publicações de Research editáveis no admin.
- **Tabela Press** (ou Blog com tipo “press”): se quiser notícias/imprensa editáveis no admin.
- **Campo ou tabela para “projetos relacionados” por serviço:** hoje pode ser só filtro por serviceId nos projetos existentes; se precisar de ordem manual, pode haver campo `relatedProjectIds` em Service ou tabela de relação.
- **Game Neurolinguístico:** se implementar no site, pode ser um novo leadType (ex.: GAME_NEUROLINGUISTIC) e campos em leadIntelligence para score/perfil; nada de SQL obrigatório além disso, a menos que queira tabela dedicada de “respostas do game”.

Resumo implementação: a base de dados está alinhada ao schema Prisma e ao uso atual do site e do backoffice. Próximos passos de SQL são pontuais (testimonials/publications/press ou campos extras para relacionamentos/editabilidade), não um “grande migration” único.

---

## 9. Partes do site fixas vs dinâmicas (backoffice)

### Dinâmicas (já vêm do backoffice / API)

- **Projetos:** listagem e detalhe (api/public/project, useBackofficeProjects).
- **Serviços:** listagem e detalhe (api/public/service, api/public/services).
- **Blog:** posts, categorias (api/public/blog).
- **Páginas por slug:** hero, sections (api/public/page/[slug]) – usado onde há Page no backoffice (ex.: filosofia, algumas landing).
- **Company History:** timeline (api/public/history).
- **Media por página/seção:** (api/public/media) – ex.: ServiceDetail hero/gallery.
- **Mercados:** Markets no backoffice (hero message por mercado).
- **Equipe:** TeamMembers (backoffice); Studio Team pode consumir API se existir rota pública ou usar dados injetados; hoje parte é fixa no código.
- **Credenciais:** Credentials (backoffice); Studio Credibilidade pode consumir API ou dados estáticos.

### Fixas (texto ou estrutura no código TSX)

- **Home:** boa parte dos textos (hero, blocos, CTAs) em PT/EN/ES/FR dentro de Home.tsx.
- **Studio:** muitos textos (títulos, descrições, diferenciais, equipe se não vier 100% da API) em Studio.tsx e subpáginas.
- **Academy:** textos em AcademyNew, AcademyCourses, AcademyWorkshops, AcademyCorporate, Vancouver (parcial).
- **What We Do:** estrutura e boa parte do copy em WhatWeDo.tsx.
- **Work:** estrutura e labels de filtros; projetos em si são dinâmicos.
- **Contact:** labels e mensagens; formulário envia para backoffice.
- **Privacy / Terms:** conteúdo longo em arquivos estáticos (podem vir de Page no backoffice se criarem slugs privacy/terms).
- **Webinars:** conteúdo em Webinars.tsx (incl. ES/FR).
- **Press / Research:** estrutura e parte do conteúdo em Press.tsx e Research.tsx; listagens podem ser dinâmicas quando existirem APIs (press, publications).
- **Footer / Header:** menus, links, alguns textos; podem ser parcialmente controlados por Page ou Settings no futuro.

Resumo: **dinâmico** = projetos, serviços, blog, páginas por slug, history, media, mercados. **Fixo** = grande parte dos textos da Home, Studio, Academy, What, Contact, Webinars, Privacy, Terms, e parte de Press/Research até as APIs de conteúdo estarem no ar e o site passando a consumi-las.

---

## 10. O que transferir para SQL/backoffice para um estagiário editar (sem depender de código)

Objetivo: que um estagiário possa alterar textos e listagens pelo admin, sem mexer em repositório ou deploy do site.

### Já editável no backoffice (sem código)

- Projetos (títulos, descrições, categorias, imagens, destaque, etc.).
- Serviços (títulos, descrições, 4 idiomas).
- Blog (posts, categorias).
- Mercados (labels, hero message por idioma).
- Páginas (Page) e seções (Section): slugs, hero, body, pillars (onde já existem no schema).
- Company History (eventos, anos, descrições, 4 idiomas).
- Equipe (TeamMembers): nome, cargo, bio, foto.
- Credenciais (Credentials): texto por idioma.
- Mídia (Media) e tags.

### Vale transferir para o backoffice (tabelas/APIs + uso no site)

1. **Depoimentos (testimonials)**  
   - Criar modelo Testimonial (ou usar Section type “testimonial”) com texto, autor, cargo, foto, idioma.  
   - API GET /api/public/testimonials (ou incluir em Page/Section).  
   - No site: Studio (e eventualmente Home) consumir essa API em vez de texto fixo.

2. **Notícias / imprensa (press)**  
   - Tabela Press (ou Blog com category “press”) com título, resumo, link, data, idioma.  
   - API GET /api/public/press.  
   - Site: Press.tsx listar a partir da API.

2. **Publicações (research)**  
   - Tabela Publication (ou Section/Page) com título, autores, link, ano, idioma.  
   - API GET /api/public/publications.  
   - Site: Research.tsx listar a partir da API.

3. **Textos da Home (hero, blocos, CTAs)**  
   - Opção A: criar uma Page slug “home” com Sections (hero, blocos, CTA) e o site usar GET /api/public/page/home.  
   - Opção B: tabela “SiteCopy” ou “HomeBlock” (chave, valor por idioma) e API GET /api/public/copy/home (ou similar).  
   - Site: Home.tsx passar a buscar da API e usar fallback para os atuais só se a API falhar.

5. **Textos do Studio (diferenciais, “como trabalhamos”, etc.)**  
   - Colocar em Page slug “studio” (e subpáginas) + Sections, ou em SiteCopy por chave.  
   - Site: Studio e subpáginas consumirem page/copy.

5. **Textos da Academy (por página)**  
   - Páginas “academy”, “academy/courses”, etc., no backoffice (Page + Sections).  
   - Site: Academy* consumirem /api/public/page/[slug].

6. **Menu / footer (links e labels)**  
   - Tabela Settings (já existe) ou Page “navigation” com JSON de itens de menu e footer.  
   - API GET /api/public/settings/navigation (ou similar).  
   - Site: Layout usar essa API para montar menu e footer.

7. **Mensagens de formulário (sucesso, erro, placeholders)**  
   - Settings ou tabela “FormCopy” (chave, valor por idioma).  
   - API GET /api/public/copy/forms.  
   - Site: formulários usarem esses textos.

Ordem sugerida para um estagiário poder editar tudo “sem dev”:  
**Nota:** Depoimentos ficam de fora por enquanto. (1) Press + API + uso em Press;  
(2) Publications + API + uso em Research;  
(3) Home via Page home ou SiteCopy;  
(4) Studio/Academy via Pages;  
(5) Menu/Footer via Settings/API;  
(6) Copy de formulários via Settings/API.  

---

## 11. Resumo executivo

- **Fase atual:** Site ~7, Backoffice ~7, No todo ~6 (principalmente por n8n e conteúdo ainda fixo).
- **O que falta de verdade:** configurar n8n (Workflow 1) e variável no Vercel; Google Search Console e Business Profile; GA no projeto azimut; depois, em código: PWA, error handling, eventos GA, OG images, dashboard/notificações, APIs press/publications e consumo no site; Game Neurolinguístico e melhorias do Empathy Engine conforme plano. (Depoimentos: fora por enquanto.)
- **Quem faz:** você = Google, Vercel, n8n, conteúdo e prioridades; eu = código, SQL, docs, otimizações e novas APIs/features.
- **n8n:** Workflow 1 com Webhook → validações → enriquecimento → IA → PostgreSQL → Resend; credenciais; URL no Vercel; teste com lead.
- **APIs a implementar:** publications, press, projetos por serviço (se não existir), sitemap dinâmico; game neuro no site chamando API existente. (Depoimentos: fora por enquanto.)
- **Backoffice:** coerente com o site; falta só config (n8n) e algumas APIs/conteúdos editáveis.
- **SQL:** base ok; pendente só o que for necessário para press, publications e relações editáveis.
- **Fixo vs dinâmico:** projetos, serviços, blog, páginas por slug, history, media = dinâmicos; Home, Studio, Academy, What, Contact, Webinars, Privacy, Terms, parte de Press/Research = fixos até mover para Page/SiteCopy/APIs.
- **Para estagiário editar sem código:** passar imprensa, publicações, Home, Studio, Academy, menu/footer e mensagens de formulário para tabelas/Pages/Settings no backoffice e consumo via API no site. (Depoimentos: quando tiverem conteúdo.)

Com isso, você tem um único documento que responde: fase 0–10, o que falta, quem faz o quê, o que fazer no n8n, quais APIs faltam, estado do backoffice, SQL e o que transferir para o backoffice para um estagiário manter o conteúdo.
