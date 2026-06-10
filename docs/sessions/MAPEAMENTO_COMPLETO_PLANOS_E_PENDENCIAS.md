# 🗺️ Mapeamento completo – Planos, animações, games, automações e pendências

**Objetivo:** Rastrear TUDO que estava nos planos: feito ✅, em andamento 🔄 e pendente ❌.  
**Atualizado:** janeiro 2026

---

## 📚 Fontes dos planos (documentos no repo)

| Documento | Conteúdo principal |
|-----------|--------------------|
| `docs/resumos/RESUMO_COMPLETO_TUDO_QUE_VAMOS_FAZER.md` | Site inteligente, micro-game, melhorias visuais, n8n, Web3/NFT |
| `AUTOMACOES_ROADMAP_EXECUTIVO.md` | 7 workflows n8n (passiva, ativa, LinkedIn, Instagram, Google Intent, Reengajamento, Competitor) |
| `azimut-empathy-engine/docs/PLANO-EVOLUCAO-V1.1-CONSOLIDADO.md` | Game Empathy Engine: Ciclos 0–3 (Entregar, combo highlight, painel pós-fase, telemetria, i18n) |
| `PADRONIZACAO_ANIMACOES_2026.md` | Animações Home vs páginas internas (prefixo narrativo) |
| `IMPLEMENTACAO_VISUAL_ROADMAP.md` | VideoPlayer, ImageGallery, AnimatedTimeline, Vancouver visual, Quiz interativo |
| `PLANO_PROXIMAS_FEATURES.md` | Melhorias visuais, conteúdo dinâmico, analytics, gamificação, Web3 |
| `PLANO_MELHORIAS_VISUAIS.md` | Cards hover, scroll animations, tipografia, hero vídeo, 3D, case studies |
| `docs/workflows/ROADMAP_CAPTACAO_INTELIGENTE.md` | Captação com IA: deploy n8n, enriquecimento, comunicação, chatbot |
| `docs/workflows/WORKFLOWS_3_A_7_DETALHES.md` | LinkedIn, Instagram, Google Intent, Reengajamento, Competitor Watch |
| `SITE_PREMIUM_2026-2030_VISAO_ESTRATEGICA.md` | Visão 2030: 3D, IA, SEO, conversão, CRM |
| `azimut-empathy-engine/docs/ANALISE-PONTOS-PENDENTES-AVALIACAO.md` | Power-ups game, splash premium, mais conteúdo, etc. |
| `ROADMAP_PRIORITARIO_2026.md` | Fases 0–5: crítico, SEO, UX, conteúdo, backoffice, refino |

---

## 1. SITE INTELIGENTE E ADAPTATIVO

| Item | Fonte | Status | Observação |
|------|--------|--------|------------|
| Detecção de comportamento em tempo real | RESUMO_COMPLETO | 🔄 Parcial | Detecção institucional existe |
| IA analisa e detecta intenção | RESUMO_COMPLETO | 🔄 Parcial | ClaudeAssistant, fingerprint |
| Site adapta automaticamente (conteúdo/CTA) | RESUMO_COMPLETO | ❌ Pendente | Navegação invisível IA |
| Guia usuário facilmente (recomendações) | RESUMO_COMPLETO | ❌ Pendente | |
| Fingerprinting sem cookies | RESUMO_COMPLETO | ✅ Existe | visitorFingerprint, personalization |

---

## 2. ANIMAÇÕES E VISUAL

| Item | Fonte | Status | Observação |
|------|--------|--------|------------|
| Padronização animações Home vs internas | PADRONIZACAO_ANIMACOES_2026 | ✅ Feito | Home 5 elementos; internas só prefixo |
| Hover 3D nos cards | PLANO_MELHORIAS, IMPLEMENTACAO_VISUAL | ❌ Pendente | scale/shadow sugeridos |
| Scroll animations melhoradas (stagger, fade-in) | PLANO_MELHORIAS_VISUAIS | ❌ Pendente | |
| Parallax sutil (estrela de fundo) | PLANO_MELHORIAS_VISUAIS | ❌ Pendente | |
| Tipografia mais impactante (headlines, line-height) | PLANO_MELHORIAS_VISUAIS | ❌ Pendente | |
| Hero com vídeo background (Home) | PLANO_MELHORIAS, IMPLEMENTACAO_VISUAL | ❌ Pendente | Opcional, &lt;5MB |
| Elementos 3D sutis (WebGL/partículas) | PLANO_MELHORIAS_VISUAIS, SITE_PREMIUM_2030 | ❌ Pendente | Opcional |
| VideoPlayerEnhanced (controles, lightbox) | IMPLEMENTACAO_VISUAL_ROADMAP | ❌ Pendente | Sprint 1.1 |
| ImageGallery (grid, hover zoom, lightbox) | IMPLEMENTACAO_VISUAL_ROADMAP | ❌ Pendente | Sprint 1.2 |
| AnimatedTimeline (scroll, GSAP) | IMPLEMENTACAO_VISUAL_ROADMAP | ❌ Pendente | Sprint 1.3 |
| Vancouver: hero vídeo, depoimentos vídeo, galeria | IMPLEMENTACAO_VISUAL_ROADMAP | 🔄 Parcial | Vídeos curados; galeria/timeline pendentes |
| Privacy/Terms layout 2 colunas + visual | PLANO_PROXIMAS_FEATURES | ❌ Pendente | |
| Studio: vídeo showreel, timeline, galeria equipe | PLANO_PROXIMAS_FEATURES | ❌ Pendente | |
| Research: grid projetos, publicações | PLANO_PROXIMAS_FEATURES | ❌ Pendente | |
| Academy: cards com imagens, vídeos, depoimentos | PLANO_PROXIMAS_FEATURES | ❌ Pendente | |
| Logo 3D interativa (Three.js / react-three-fiber) | SITE_PREMIUM_2030 | ❌ Pendente | Visão 2030 |

---

## 3. GAME (EMPATHY ENGINE) – JÁ NO SITE

| Item | Fonte | Status | Observação |
|------|--------|--------|------------|
| Game 4 fases (Sentir→Conectar→Sincronizar→Transformar) | Empathy Engine | ✅ Feito | Build copiado para site |
| Balanceamento (800 pts / 45s Fase 4), pity, garantia combo | PLANO-EVOLUCAO-V1.1 | ✅ Feito | |
| Tópico Tecnologia & Consultoria, cartas ponte | PLANO-EVOLUCAO-V1.1 | ✅ Feito | |
| Modo sem tempo (configurações) | PLANO-EVOLUCAO-V1.1 | ✅ Feito | |
| **Botão "Entregar"** (passar de fase ao atingir meta) | PLANO-EVOLUCAO-V1.1 Ciclo 0 | ❌ Pendente | |
| **Highlight cartas compatíveis** ao arrastar | PLANO-EVOLUCAO-V1.1 Ciclo 0 | ❌ Pendente | getCompatibleCombos existe |
| **Animação + som ao ativar combo** (opt-out acessibilidade) | PLANO-EVOLUCAO-V1.1 Ciclo 0 | ❌ Pendente | |
| Painel pós-fase (combos ativados, sugestão) | PLANO-EVOLUCAO-V1.1 Ciclo 2 | ❌ Pendente | |
| Near-miss / Segunda Chance (&lt;50 pts, 1x/dia) | PLANO-EVOLUCAO-V1.1 Ciclo 2 | ❌ Pendente | |
| Sistema de maestria (Aprendiz→Visionário→Maestro) | PLANO-EVOLUCAO-V1.1 Ciclo 2 | ❌ Pendente | |
| Badges e conquistas | PLANO-EVOLUCAO-V1.1 Ciclo 2 | ❌ Pendente | progressionStore.badges existe |
| Coleção de elementos (% por tópico) | PLANO-EVOLUCAO-V1.1 Ciclo 2 | ❌ Pendente | |
| Desafios diários/semanais | PLANO-EVOLUCAO-V1.1 Ciclo 2 | ❌ Pendente | |
| Power-ups Raio-X e Ímã com efeito real | PLANO-EVOLUCAO-V1.1 Ciclo 2 | ❌ Pendente | |
| Telemetria (start, pick, drop, combo, win, lose, quit) | PLANO-EVOLUCAO-V1.1 Ciclo 3 | ❌ Pendente | n8n conversão |
| Acessibilidade (teclado, 44px, alto contraste, daltonismo) | PLANO-EVOLUCAO-V1.1 Ciclo 3 | ❌ Pendente | |
| i18n PT/EN no jogo | PLANO-EVOLUCAO-V1.1 Ciclo 3 | ❌ Pendente | |
| Validação Zod + testes | PLANO-EVOLUCAO-V1.1 Ciclo 3 | ❌ Pendente | |
| Power-ups: Revelar raridade, Trocar carta | ANALISE-PONTOS-PENDENTES | ❌ Pendente | Duplicar carta opcional |
| Splash premium (parallax/partículas) | ANALISE-PONTOS-PENDENTES | ❌ Pendente | Polish |
| Mais briefs e combos | ANALISE-PONTOS-PENDENTES | 🔄 Contínuo | |

---

## 4. OUTROS GAMES / GAMIFICAÇÃO NO SITE

| Item | Fonte | Status | Observação |
|------|--------|--------|------------|
| Quiz 360° interativo (VR/VFX, resultado serviço) | PLANO_PROXIMAS_FEATURES | ❌ Pendente | |
| Quiz Vancouver (VFS vs VanArts) | IMPLEMENTACAO_VISUAL | ❌ Pendente | Sprint 3.1 |
| VR Experience Preview (arrastar 360°, hotspots) | PLANO_PROXIMAS_FEATURES | ❌ Pendente | |
| Easter eggs (Konami, clique logo, hover estrela) | PLANO_PROXIMAS_FEATURES | ❌ Pendente | |
| Sistema de achievements no site | PLANO_PROXIMAS_FEATURES | ❌ Pendente | |

---

## 5. AUTOMAÇÕES N8N (7 WORKFLOWS)

| Workflow | Fonte | Status | Observação |
|----------|--------|--------|------------|
| **1. Captação passiva** (lead → IA → email) | AUTOMACOES_ROADMAP | 🔄 Parcial | n8n config; anti-scam; Railway/$5 |
| **2. Captação ativa** (busca prospects → IA → email) | AUTOMACOES_ROADMAP, ROADMAP_CAPTACAO | ❌ Pendente | Proxycurl, SerpAPI |
| **3. LinkedIn Automation** | WORKFLOWS_3_A_7 | ❌ Futuro | Phantombuster $59 |
| **4. Instagram Outreach** | WORKFLOWS_3_A_7 | ❌ Futuro | $49 |
| **5. Google Intent** | WORKFLOWS_3_A_7 | ❌ Futuro | $50 |
| **6. Reengajamento** (leads antigos) | WORKFLOWS_3_A_7 | ❌ Futuro | $29 |
| **7. Competitor Watch** | WORKFLOWS_3_A_7 | ❌ Futuro | $79 |
| Deploy n8n (Railway/VPS) | ROADMAP_CAPTACAO | ❌ Pendente | |
| Enriquecimento (Proxycurl, SerpAPI, Claude, banco) | ROADMAP_CAPTACAO | ❌ Pendente | |
| Templates email + Resend + follow-up | ROADMAP_CAPTACAO | ❌ Pendente | |
| Chatbot com contexto enriquecido | ROADMAP_CAPTACAO | ❌ Pendente | |
| Webhook lead → n8n (enrichment.ts) | PROXIMOS_PASSOS_FINAL | 🔄 Código existe; config n8n pendente | |

---

## 6. CONTEÚDO DINÂMICO (BACKOFFICE → SITE)

| Item | Fonte | Status | Observação |
|------|--------|--------|------------|
| ServiceDetail: projetos relacionados (API/work) | PLANO_PROXIMAS_FEATURES | ❌ Pendente | |
| Studio: depoimentos, logos, cases (API) | PLANO_PROXIMAS_FEATURES | ❌ Pendente | |
| Research: publicações (API) | PLANO_PROXIMAS_FEATURES | ❌ Pendente | |
| Press: notícias (API) | PLANO_PROXIMAS_FEATURES | ❌ Pendente | |
| APIs: /api/content/testimonials, publications, press | PLANO_PROXIMAS_FEATURES | ❌ Pendente | |

---

## 7. SEO, ANALYTICS E CONVERSÃO

| Item | Fonte | Status | Observação |
|------|--------|--------|------------|
| hreflang no HTML (4 idiomas + x-default) | ROADMAP_PRIORITARIO, PROXIMOS | ❌ Pendente | |
| Schema.org (Review, VideoObject, LocalBusiness, Service) | ROADMAP_PRIORITARIO | 🔄 Parcial | BreadcrumbList existe |
| Google Search Console | ROADMAP_PRIORITARIO | ❌ Pendente | |
| Google Business Profile | ROADMAP_PRIORITARIO | ❌ Pendente | |
| Core Web Vitals (LCP, INP, CLS) | ROADMAP_PRIORITARIO | ❌ Pendente | |
| GA: VITE_GA_MEASUREMENT_ID no projeto azimut | TODO_AMANHA | ❌ Pendente | Se ainda não configurado |
| Eventos analytics (scroll, tempo, conversão) | ROADMAP_PRIORITARIO | 🔄 Básico | Expandir |
| Dashboard analytics real-time (backoffice) | PLANO_PROXIMAS_FEATURES, ROADMAP | 🔄 Parcial | |
| Funil de conversão visual | PLANO_PROXIMAS_FEATURES | ❌ Pendente | |
| Heatmap / Session recording | PLANO_PROXIMAS_FEATURES | ❌ Pendente | |

---

## 8. UX E CONVERSÃO (FORMULÁRIOS, BUSCA, PWA)

| Item | Fonte | Status | Observação |
|------|--------|--------|------------|
| Validação formulários (tempo real, honeypot) | ROADMAP_PRIORITARIO | 🔄 Básico | |
| Loading skeletons | ROADMAP_PRIORITARIO | ❌ Pendente | |
| Breadcrumbs visuais | ROADMAP_PRIORITARIO | ❌ Pendente | Schema existe |
| Sistema de busca global (projetos, serviços, blog) | ROADMAP_PRIORITARIO, PLANO_PROXIMAS | ❌ Pendente | |
| PWA offline (cache strategy) | ROADMAP_PRIORITARIO | ❌ Pendente | SW existe |
| Acessibilidade (ARIA, skip links, foco) | ROADMAP_PRIORITARIO | 🔄 Básico | |

---

## 9. BACKOFFICE

| Item | Fonte | Status | Observação |
|------|--------|--------|------------|
| Deploy no projeto **azimut-backoffice** (Root + Build) | DEPLOY_BACKOFFICE_VERCEL | ❌ Pendente | Config Vercel |
| Dashboard analytics completo (KPIs, gráficos, export) | ROADMAP_PRIORITARIO, PLANO_PROXIMAS | 🔄 Parcial | |
| Lead scoring, notificações, workflows | ROADMAP_PRIORITARIO | 🔄 Parcial | |
| Sistema de notificações (email, WhatsApp) | PROXIMOS_PASSOS_ATUALIZADO | ❌ Pendente | |

---

## 10. WEB3 / NFT

| Item | Fonte | Status | Observação |
|------|--------|--------|------------|
| Wallet Connect (MetaMask/WalletConnect) | PLANO_PROXIMAS_FEATURES, RESUMO_COMPLETO | 🔄 Parcial | Código existe |
| NFT "Explorador de Mundos" (recompensa game) | RESUMO_COMPLETO | ❌ Futuro | |
| NFT showcase, certificados, badges | PLANO_PROXIMAS_FEATURES | ❌ Futuro | |
| Smart contracts (estudantes, recompensas) | docs/ESTRATEGIA_WEB3, contracts/ | 🔄 Parcial | Solidity existe |

---

## 11. BUGS E CRÍTICOS

| Item | Fonte | Status | Observação |
|------|--------|--------|------------|
| ServiceDetail: página vazia / só 3 seções | TODO_AMANHA, CHECKPOINT_SERVICEDETAIL | 🔴 Verificar | Testar em produção |
| Backoffice build: Root Directory + Install/Build | DEPLOY_BACKOFFICE_VERCEL | ❌ Pendente | |
| Webinars ES/FR: conteúdo = content.pt (TODO) | src/pages/Webinars.tsx | ❌ Pendente | |
| BlogPost: theme = 'dark' fixo (TODO) | src/pages/BlogPost.tsx | Baixa | |

---

## 12. CONTEÚDO E CONTEÚDO SEO

| Item | Fonte | Status | Observação |
|------|--------|--------|------------|
| Conteúdo long-form (Vancouver, /what/, case studies) | ROADMAP_PRIORITARIO, FASE_3 | 🔄 Parcial | Vancouver expandido |
| Blog posts estratégicos (1/semana) | ROADMAP_PRIORITARIO | ❌ Pendente | |
| Backlinks (VFS, VanArts, museus, Study in Canada) | ROADMAP_PRIORITARIO | ❌ Pendente | |
| Imagens OG por página/idioma | ROADMAP_PRIORITARIO, OG_IMAGES_PLANO | ❌ Pendente | |

---

## 13. CASE STUDIES E PÁGINAS PROJETO

| Item | Fonte | Status | Observação |
|------|--------|--------|------------|
| Case studies interativos (timeline, galeria, before/after) | PLANO_MELHORIAS_VISUAIS | ❌ Pendente | |
| Making-of videos por projeto | PLANO_MELHORIAS_VISUAIS | 🔄 Backoffice tem making-of | |

---

## 📋 Checklist “o que priorizar” (resumo executivo)

### Crítico (fazer primeiro)
- [ ] Backoffice: config Vercel azimut-backoffice (Root vazio + Install/Build com `cd azimut-cms`)
- [ ] Testar ServiceDetail em produção (`/pt/what/cinema-audiovisual`)
- [ ] Deploy site sempre no projeto **azimut**; backoffice no **azimut-backoffice**

### Alta (planos “muito mais” – animações, games, automações)
- [ ] **Game Empathy Engine – Ciclo 0:** Botão Entregar, highlight combo, animação+som ao ativar combo
- [ ] **Animações:** Hover 3D cards, scroll stagger, hero vídeo (opcional)
- [ ] **Visual roadmap:** VideoPlayerEnhanced, ImageGallery, AnimatedTimeline, Vancouver galeria/timeline
- [ ] **Outros games:** Quiz Vancouver, Quiz 360°, easter eggs
- [ ] **n8n:** Reativar Railway, Workflow 1 estável; depois Workflow 2 (captação ativa)
- [ ] **SEO:** hreflang, Schema completo, Search Console, Business Profile

### Média
- [ ] Conteúdo dinâmico (projetos relacionados, testimonials, press)
- [ ] Game Ciclo 2: painel pós-fase, Segunda Chance, badges, power-ups
- [ ] Busca global, breadcrumbs visuais, loading skeletons
- [ ] Dashboard analytics e lead scoring no backoffice

### Futuro
- [ ] Workflows 3–7 (LinkedIn, Instagram, Google Intent, Reengajamento, Competitor)
- [ ] Web3/NFT recompensa game, certificados
- [ ] Logo 3D, experiências 3D por projeto (visão 2030)

---

**Como usar:** Busque por “Fonte” para abrir o documento original. Use este mapeamento para não perder nenhum item dos planos e para decidir a próxima ação (crítico → alta → média → futuro).
