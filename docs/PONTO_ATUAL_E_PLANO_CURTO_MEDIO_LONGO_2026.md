# 📍 Ponto atual e plano curto / médio / longo prazo (2026)

**Objetivo:** Uma visão única do que está pronto, do que falta e da ordem sugerida para finalizar o site e as implementações extras dos documentos já estabelecidos.

**Atualizado:** fevereiro 2026  
**Fontes:** ORDEM_DE_EXECUCAO_2026.md, MAPEAMENTO_COMPLETO_PLANOS_E_PENDENCIAS.md, ROADMAP_PRIORITARIO_2026.md, PROXIMOS_PASSOS_ATUALIZADO_24JAN2026.md, PLANO_IMPLEMENTACAO_MELHORIAS_PREMIUM.md, PLANO_PROXIMAS_FEATURES.md, PLANO_TRABALHO_NOTURNO_AUTOMATICO.md, FUNCIONALIDADES_AVANCADAS_SEGURAS.md, STATUS_IMPLEMENTACAO.md, ROADMAP_10_DE_10.md, PLANO_FINAL_ACAO_SITE_DINAMICO.md, COMO_FUNCIONA_SISTEMA_INTELIGENTE.md, PROPOSTA_ANALYTICS_PREMIUM_2026.md, PLANO_ANALYTICS_PREMIUM_IMPLEMENTACAO.md

---

## ✅ ONDE ESTAMOS (o que já está feito)

### Site – técnico e SEO
- **Deploy:** Site no projeto **azimut**, backoffice no **azimut-backoffice**
- **hreflang:** 4 idiomas + x-default (index.html + SEO.tsx)
- **Schema.org:** hasOfferCatalog (6 serviços), LocalBusiness (Rio/Vancouver/Floripa), Review, VideoObject showreel
- **GA:** `VITE_GA_MEASUREMENT_ID` no Vercel (projeto azimut)
- **Performance:** Imagens WebP (pattern-azimut, fundo-grao, empaty-engine), preload LCP hero, lazy rotas, analytics adiados
- **Acessibilidade:** Contraste, touch targets (Academy footer), vídeo com aria-hidden/aria-label, track legendas
- **ServiceDetail:** Ajuste de refs (sectionRefs) aplicado
- **Webinars:** Conteúdo ES/FR completo

### Site – UX e formulários
- **Validação:** SmartContactForm (tempo real + honeypot + rate limit); AcademyQuickForm e VancouverInterestForm com honeypot + rate limit
- **Busca global:** Lupa no header, Ctrl+K, SearchModal com projetos, serviços, páginas, **blog** (posts + página Blog)
- **Skeletons:** LoadingSkeleton para rotas lazy (Studio, Academy, Work, etc.); Home sem skeleton de propósito
- **Breadcrumbs:** Schema existe; usuário confirmou que navegação nas subpáginas já atende (não implementar UI extra)
- **Idiomas:** PT, EN, ES, FR
- **Tema:** Claro/escuro

### Backoffice
- Markets (CRUD), Services em 4 idiomas, deploy no projeto correto
- Formulário → backoffice → webhook n8n (código pronto; config n8n pendente)

### Game (Empathy Engine)
- 4 fases no site, balanceamento, tópico Tecnologia & Consultoria, modo sem tempo

### Automação / comportamento do usuário (já no código)
- **useBehaviorTracking:** coleta páginas visitadas, categorias clicadas, projetos vistos, buscas, tempo, scroll depth, CTAs, formulários iniciados (COMO_FUNCIONA_SISTEMA_INTELIGENTE.md)
- **useIntentionDetection:** envia comportamento para IA, detecta intenção (museus, VR, hot_lead, etc.)
- **DynamicSuggestionBanner:** banner “Você pode se interessar por…” com base em intenção
- **Work.tsx:** categoria recomendada em destaque, filtros auto-aplicados
- **CTAs dinâmicos (footer):** texto e link adaptados à intenção
- **ClaudeAssistant:** saudação e contexto de intenção enviados para a IA
- **useIntelligentNavigation:** hook existe; falta conectar à UI (recomendações “Você pode gostar” / “Próximos passos”) – ORDEM §16

---

## ❌ O QUE FALTA (resumo por bloco)

### Crítico / configuração (sua vez – fora do código)
| Item | Ação | Doc de referência |
|------|------|-------------------|
| **Google Search Console** | Verificar propriedade, sitemap, indexação | ORDEM_DE_EXECUCAO §7 |
| **Google Business Profile** | Perfil, fotos, serviços, reviews | ORDEM_DE_EXECUCAO §8 |

### SEO / visibilidade
- Core Web Vitals: medir e ajustar (já há otimizações; Lighthouse ~77 desktop, ~60 mobile)
- Eventos de analytics no GA (scroll, tempo, conversão por formulário) – ORDEM §28

### UX e conversão (código)
- **PWA offline:** estratégia de cache no service worker (~30 min) – ORDEM §14
- **Navegação inteligente (IA):** conectar `useIntelligentNavigation` à UI, recomendações “Você pode gostar” – ORDEM §16–17
- **Error handling:** ErrorBoundary e fallbacks por rota – ORDEM §29

### Automações (n8n)
- n8n: SerpAPI + PostgreSQL no workflow, copiar URL do webhook, `N8N_LEAD_INTELLIGENCE_WEBHOOK` no Vercel (backoffice), testar lead → n8n – ORDEM §18–22, PROXIMOS_PASSOS_FINAL

### Conteúdo e backoffice
- **Conteúdo long-form:** Vancouver, `/what/...`, case studies em `/studio/credibilidade` – contínuo
- **Blog estratégico:** 1 post/semana – contínuo
- **Imagens OG:** por página/idioma (WhatsApp, LinkedIn) – ~2 h – ORDEM §25
- **Dashboard analytics (backoffice):** KPIs, gráficos, filtros, exportação – ~3–5 h – ORDEM §26
- **Notificações (backoffice):** tempo real, email, WhatsApp – ~2 h – ORDEM §27
- **Backlinks:** VFS, VanArts, Museu Olímpico, Study in Canada – contínuo – ORDEM §30

### Automação / comportamento do usuário – o que falta
- **Conectar useIntelligentNavigation à UI:** exibir recomendações “Você pode gostar” / “Próximos passos” no Layout ou barra lateral (ORDEM §16–17, PLANO_FINAL_ACAO_SITE_DINAMICO)
- **Heatmaps (Hotjar / Microsoft Clarity):** onde usuários clicam, scroll depth, áreas ignoradas – análise de comportamento (STATUS_IMPLEMENTACAO, ROADMAP_10_DE_10, PLANO_PROXIMAS_FEATURES §3.3, PROPOSTA_ANALYTICS_PREMIUM_2026)
- **Session recording:** gravação de sessões, replay de navegação, identificar problemas de UX (PLANO_PROXIMAS_FEATURES §3.4, PLANO_ANALYTICS_PREMIUM_IMPLEMENTACAO)
- **Prefetch baseado em comportamento:** prefetch de rotas/páginas mais visitadas e projetos relacionados quando link está visível (FUNCIONALIDADES_AVANCADAS_SEGURAS §5)
- **Recomendações baseadas em comportamento:** conteúdo adaptativo por interesse, personalização (ROADMAP_10_DE_10 §4.2)
- **Dashboard real-time / funil / analytics premium:** visitantes online, funil de conversão visual, heatmap de cliques no backoffice (PLANO_PROXIMAS_FEATURES §3, PLANO_IMPLEMENTACAO_MELHORIAS_PREMIUM)

### Infraestrutura e monitoramento (docs de implantação)
- **Error tracking (Sentry):** monitoramento de erros em produção (STATUS_IMPLEMENTACAO, ROADMAP_10_DE_10, FUNCIONALIDADES_AVANCADAS §3 – Error Boundary com report para backoffice)
- **Staging environment:** ambiente de testes antes de produção (STATUS_IMPLEMENTACAO, ROADMAP_10_DE_10)
- **Web Vitals tracking completo:** integrar Web Vitals com GA4, enviar métricas para backoffice (FUNCIONALIDADES_AVANCADAS §4)
- **Performance Monitoring Dashboard:** Core Web Vitals históricos, alertas (FUNCIONALIDADES_AVANCADAS §9)
- **Sitemap dinâmico:** gerar via API com projetos do backoffice (FUNCIONALIDADES_AVANCADAS §2)

### Trabalho noturno / fases consolidadas (PLANO_TRABALHO_NOTURNO_AUTOMATICO)
- **Fase 1 – Melhorias visuais:** micro-interações, animações de entrada, hover, loading states visuais, feedback em formulários
- **Fase 2 – Performance:** bundle size, preload, cache, imagens WebP + lazy, minificação
- **Fase 3 – UX premium:** breadcrumbs, atalhos teclado, ARIA, smooth scroll
- **Fase 4 – SEO:** meta tags, mais Schema.org, internal linking, FAQ Schema, H1/H2/H3
- **Fase 5 – Analytics avançado:** conversões, heatmap preparation, event tracking, user journey, A/B setup
- **Fase 6 – Componentes premium:** loading skeletons avançados, toasts, modal system, tooltips, progress indicators
- **Fase 7 – Documentação:** consolidar docs, guia de manutenção, changelog, README executivo

### Outros tópicos dos planos (não listados antes)
- **Critical CSS inline** (STATUS_IMPLEMENTACAO, ROADMAP_10_DE_10) – reduzir render-blocking
- **Contraste validado (WCAG)** (STATUS_IMPLEMENTACAO)
- **View Transitions / transições de página** (STATUS_IMPLEMENTACAO)
- **Scroll-triggered em outras páginas** (além de Vancouver) (STATUS_IMPLEMENTACAO)
- **APIs backoffice:** `/api/content/testimonials`, `/api/content/publications`, `/api/content/press` (PLANO_PROXIMAS_FEATURES §2)
- **Image optimization automática:** múltiplos tamanhos, WebP/AVIF, blur placeholder (FUNCIONALIDADES_AVANCADAS §6)
- **Breadcrumbs dinâmicos/contextuais** (FUNCIONALIDADES_AVANCADAS §7) – usuário disse que não precisa de UI extra; manter só se quiser evoluir
- **A/B testing básico** (FUNCIONALIDADES_AVANCADAS §10, ROADMAP_10_DE_10)
- **Background Sync (PWA):** formulários offline com retry (STATUS_IMPLEMENTACAO, FUNCIONALIDADES_AVANCADAS §11)
- **Push Notifications (PWA)** (STATUS_IMPLEMENTACAO, ROADMAP_10_DE_10)
- **WebGL/3D (Three.js já instalado):** background estrelas, logo 3D, portfolio 3D preview, WebAR (STATUS_IMPLEMENTACAO)
- **IA:** chatbot com voz, respostas contextualizadas por página, lead scoring por conversa (STATUS_IMPLEMENTACAO, ROADMAP_10_DE_10)
- **Lighthouse 95+** (STATUS_IMPLEMENTACAO)

### Extras dos planos (documentos pré-estabelecidos)
- **Privacy/Terms:** layout premium (2 colunas, visual) – PLANO_IMPLEMENTACAO_MELHORIAS_PREMIUM §1
- **Studio:** mais cinematográfico (showreel, timeline, galeria equipe) – §1.2
- **Research:** mais visual (grid projetos, publicações) – §1.3
- **Academy:** cards com imagens, vídeos, depoimentos – §1.4
- **ServiceDetail:** projetos relacionados do backoffice – §2.1
- **Studio:** depoimentos/testimonials da API – §2.2
- **Press:** notícias dinâmicas (API) – §2.4
- **Vancouver:** hero vídeo, galeria, timeline, quiz “Qual escola?” – §8
- **Dashboard analytics (backoffice):** leads/mês, conversão, país – §9
- Melhorias visuais (hover 3D, scroll animations, VideoPlayer, ImageGallery, AnimatedTimeline) – MAPEAMENTO §2
- Game Empathy Engine: botão “Entregar”, highlight combos, som, painel pós-fase, telemetria, i18n – MAPEAMENTO §3
- Workflows n8n 2–7 (captação ativa, LinkedIn, Instagram, etc.) – MAPEAMENTO §5
- Web3/NFT (opcional/longo prazo) – MAPEAMENTO §10

---

## 📅 PLANO CURTO PRAZO (1–2 semanas)

**Foco:** fechar o essencial de visibilidade e um fluxo n8n estável.

1. **Google Search Console** (~30 min) – configuração manual  
2. **Google Business Profile** (~1 h) – configuração manual  
3. **n8n:** configurar workflow (SerpAPI, PostgreSQL), webhook no backoffice, testar lead (~40 min) – ORDEM §18–22  
4. **Eventos de analytics:** scroll depth, tempo na página, conversão por formulário no GA (~15 min) – ORDEM §28  
5. **Error handling:** revisar ErrorBoundary e fallbacks por rota (~20 min) – ORDEM §29  
6. **PWA offline:** definir cache das páginas principais no service worker (~30 min) – ORDEM §14  
7. **Conectar useIntelligentNavigation à UI:** exibir “Você pode gostar” / “Próximos passos” (Layout ou barra) (~1–2 h) – automação de comportamento

**Total estimado:** ~4–6 h (excluindo tarefas 100% manuais no Google).

---

## 📅 PLANO MÉDIO PRAZO (1–2 meses)

**Foco:** conteúdo, backoffice e “premium” das páginas principais.

1. **Conteúdo:** expandir Vancouver, páginas `/what/...`, case studies; blog 1 post/semana (contínuo)  
2. **Imagens OG** por página/idioma (~2 h)  
3. **Privacy e Terms** em layout premium (~1 h) – PLANO_IMPLEMENTACAO_MELHORIAS_PREMIUM  
4. **Studio:** showreel, timeline, galeria equipe (~30 min–1 h)  
5. **Research:** grid projetos, publicações (~30 min)  
6. **Academy:** cards com imagens/vídeos/depoimentos (~30 min)  
7. **ServiceDetail:** projetos relacionados do backoffice (~30 min)  
8. **Studio:** depoimentos da API (~20 min)  
9. **Dashboard analytics (backoffice):** KPIs, gráficos, exportação (~3–5 h)  
10. **Notificações (backoffice):** email/tempo real (~2 h)  
11. **Navegação inteligente (IA):** conectar useIntelligentNavigation à UI (~1–2 h) – ORDEM §16  
12. **Backlinks:** contato VFS, VanArts, Museu Olímpico, Study in Canada (contínuo)  
13. **Heatmaps (Hotjar ou Clarity):** análise de comportamento – onde clicam, scroll (~1 h) – STATUS_IMPLEMENTACAO, PLANO_PROXIMAS_FEATURES §3.3  
14. **Web Vitals tracking completo:** enviar métricas para GA4 e/ou backoffice (~1–2 h) – FUNCIONALIDADES_AVANCADAS §4  
15. **Error tracking (Sentry):** opcional (~1 h) – STATUS_IMPLEMENTACAO  
16. **Sitemap dinâmico:** API que inclui projetos do backoffice (~2–3 h) – FUNCIONALIDADES_AVANCADAS §2  

---

## 📅 PLANO LONGO PRAZO (3–6 meses e além)

**Foco:** refinamento visual, game, automações avançadas e opcionais.

1. **Vancouver:** hero vídeo, galeria, AnimatedTimeline, quiz “Qual escola?” (~1–2 h)  
2. **Press:** notícias dinâmicas (API) (~20 min)  
3. **Melhorias visuais:** hover 3D, scroll animations, VideoPlayerEnhanced, ImageGallery, AnimatedTimeline (conforme IMPLEMENTACAO_VISUAL_ROADMAP)  
4. **Game Empathy Engine:** botão “Entregar”, highlight combos, som, painel pós-fase, telemetria, i18n, acessibilidade (PLANO-EVOLUCAO-V1.1)  
5. **Automações n8n:** workflows 2–7 (captação ativa, LinkedIn, Instagram, Google Intent, Reengajamento, Competitor) – conforme AUTOMACOES_ROADMAP_EXECUTIVO  
6. **Analytics premium:** funil visual, session recording, dashboard real-time no backoffice (PLANO_PROXIMAS_FEATURES §3)  
7. **Prefetch baseado em comportamento:** useIntelligentPrefetch quando link visível (FUNCIONALIDADES_AVANCADAS §5)  
8. **Recomendações baseadas em comportamento:** conteúdo adaptativo, A/B testing (ROADMAP_10_DE_10)  
9. **Trabalho noturno (fases 1–7):** micro-interações, performance, UX premium, SEO, analytics avançado, componentes premium, documentação (PLANO_TRABALHO_NOTURNO_AUTOMATICO)  
10. **WebGL/3D, PWA avançado (Background Sync, Push), Error Boundary com report, Performance Dashboard, A/B testing** (conforme docs)  
11. **Web3/NFT:** wallet, certificados, badges (opcional – MAPEAMENTO §10)  
12. **Conteúdo e backlinks:** contínuo  

---

## 📌 RESUMO EXECUTIVO

| Área | Feito | Falta (principais) |
|------|--------|---------------------|
| **SEO / visibilidade** | hreflang, Schema, GA | Search Console, Business Profile, eventos GA |
| **Site técnico** | Performance, acessibilidade, lazy, WebP | PWA cache, error handling |
| **Formulários e busca** | Validação, honeypot, busca global + blog | — |
| **Automações** | Código backoffice → n8n | Config n8n, webhook, testes |
| **Conteúdo** | 4 idiomas, Webinars ES/FR | Long-form, blog contínuo, backlinks |
| **Backoffice** | Markets, Services 4 idiomas | Dashboard analytics, notificações |
| **Comportamento / automação** | useBehaviorTracking, useIntentionDetection, banner sugestão, CTAs dinâmicos, Claude com contexto | useIntelligentNavigation na UI, Heatmaps, Session recording, Prefetch por comportamento |
| **Extras (docs)** | — | Privacy/Terms premium, Studio/Research/Academy/ServiceDetail/Vancouver, game Ciclos, n8n 2–7, trabalho noturno (7 fases), Sentry, Staging, sitemap dinâmico |

**Próximo passo imediato:** Google Search Console + Google Business Profile (manual) e, em paralelo, configurar n8n (webhook + teste de lead). Opcional em seguida: conectar useIntelligentNavigation à UI (automação de comportamento).

---

**Referências rápidas:**  
- Ordem detalhada dos itens: `ORDEM_DE_EXECUCAO_2026.md`  
- Lista completa feito/pendente por tema: `MAPEAMENTO_COMPLETO_PLANOS_E_PENDENCIAS.md`  
- Fases prioritárias: `ROADMAP_PRIORITARIO_2026.md`  
- Premium e visuais: `docs/PLANO_IMPLEMENTACAO_MELHORIAS_PREMIUM.md`  
- Sistema inteligente (comportamento): `COMO_FUNCIONA_SISTEMA_INTELIGENTE.md`, `PLANO_FINAL_ACAO_SITE_DINAMICO.md`  
- Analytics premium / heatmap / session: `PLANO_PROXIMAS_FEATURES.md` (§3), `PROPOSTA_ANALYTICS_PREMIUM_2026.md`  
- Funcionalidades avançadas: `docs/FUNCIONALIDADES_AVANCADAS_SEGURAS.md`  
- Trabalho noturno (7 fases): `PLANO_TRABALHO_NOTURNO_AUTOMATICO.md`  
- Status e lista de espera: `docs/STATUS_IMPLEMENTACAO.md`
