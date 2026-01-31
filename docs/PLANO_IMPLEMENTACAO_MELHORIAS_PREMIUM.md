# Plano de implementação – Melhorias e torne o site Premium

**Objetivo:** Deixar claro o que **falta** implementar nos planos de ação e para tornar o site **premium**.

---

## O que já está feito (contexto)

- Formulários com i18n (AcademyQuickForm, VancouverInterestForm, SmartContactForm)
- Menu/rodapé com `t(lang, key)` (Layout)
- Code-splitting (páginas secundárias em lazy)
- Design system premium (CSS, glassmorphism, CTAs)
- Breadcrumbs, busca (Ctrl+K), validação em tempo real nos formulários
- Multi-idioma (PT, EN, FR, ES), tema claro/escuro

---

## O que falta – por prioridade

### Alta prioridade (impacto visual + credibilidade)

| # | Item | Onde está no plano | Tempo | Status |
|---|------|--------------------|-------|--------|
| 1 | **Privacy e Terms → layout premium** | PLANO_PROXIMAS_FEATURES § 1.1 | ~1h | Pendente |
| | Layout 2 colunas (texto + visual), ícones, gradientes, quebras visuais | | | |
| 2 | **Página Studio → mais cinematográfica** | PLANO_PROXIMAS_FEATURES § 1.2 | ~30min | Pendente |
| | Vídeo de fundo (showreel), timeline, galeria equipe, prêmios | | | |
| 3 | **Página Research → mais visual** | PLANO_PROXIMAS_FEATURES § 1.3 | ~30min | Pendente |
| | Grid de projetos, publicações, parcerias, imagens | | | |
| 4 | **Academy (Courses, Workshops, Corporate) → mais imersivo** | PLANO_PROXIMAS_FEATURES § 1.4 | ~30min | Pendente |
| | Cards com imagens, vídeos, depoimentos, galeria de trabalhos | | | |

### Média prioridade (UX e conteúdo dinâmico)

| # | Item | Onde está no plano | Tempo | Status |
|---|------|--------------------|-------|--------|
| 5 | **ServiceDetail – projetos relacionados** | PLANO_PROXIMAS_FEATURES § 2.1 | ~30min | Pendente |
| | Trocar “Em breve” por projetos do backoffice filtrados por serviço | | | |
| 6 | **Studio – depoimentos/testimonials** | PLANO_PROXIMAS_FEATURES § 2.2 | ~20min | Pendente |
| | Conteúdo vindo do backoffice (API testimonials) | | | |
| 7 | **Press – notícias dinâmicas** | PLANO_PROXIMAS_FEATURES § 2.4 | ~20min | Pendente |
| | API `/api/content/press`, listagem dinâmica | | | |
| 8 | **Vancouver page – completar** | PROXIMAS_ACOES_SUGERIDAS § 8 | 1–2h | Pendente |
| | Hero em vídeo, ImageGallery, AnimatedTimeline, quiz “Qual escola?”, mais vídeos | | | |

### Fase “Trabalho noturno” (PLANO_TRABALHO_NOTURNO) – ainda em aberto

| Fase | Itens pendentes | Tempo |
|------|-----------------|-------|
| **1. Melhorias visuais** | Micro-interações, animações de entrada, hover, loading states, feedback em formulários | 2h |
| **2. Performance** | Bundle size, preload, cache, imagens WebP + lazy, minificação | 1h |
| **3. UX premium** | Breadcrumbs (já existe; revisar), navegação, atalhos teclado, ARIA, smooth scroll | 2h |
| **4. SEO** | Meta tags, mais Schema.org, internal linking, FAQ Schema, H1/H2/H3 | 1h |
| **5. Analytics avançado** | Conversões, heatmap, event tracking, user journey, A/B | 1h |
| **6. Componentes premium** | Loading skeletons avançados, toasts, modal system, tooltips, progress | 2h |
| **7. Documentação** | Consolidar docs, guia de manutenção, changelog, README executivo | 1h |

### Backoffice / produto

| # | Item | Onde está | Status |
|---|------|------------|--------|
| 9 | **Dashboard analytics** (leads/mês, conversão, país, score) | PROXIMAS_ACOES_SUGERIDAS § 9 | Pendente |
| 10 | **Analytics premium** (real-time, funil, heatmap, session recording) | PLANO_PROXIMAS_FEATURES § 3 | Pendente |
| 11 | **CRM melhorias** (bulk actions, export CSV, histórico, notas) | PLANO_ACAO_COMPLETO | Pendente |
| 12 | **Email automations** (SMTP, email cliente/equipe, Slack) | PLANO_ACAO_COMPLETO | Pendente |

### Opcionais / futuro

| # | Item | Prioridade | Tempo |
|---|------|------------|-------|
| 13 | Gamificação (quiz 360°, VR preview, easter eggs) | Baixa | 3–4h |
| 14 | Web3/NFT (wallet, NFTs, analytics on-chain) | Muito baixa | 5–6h |
| 15 | Validação avançada (Twilio/Abstract API) | Quando > 50–300 leads/mês | 2–3h |

---

## Ordem sugerida para “tornar premium” rápido

1. **Privacy + Terms em layout premium** (~1h) – maior ganho visual imediato.  
2. **Studio + Research + Academy** com mais visual (~1h30 no total).  
3. **ServiceDetail** com projetos relacionados (~30min).  
4. **Vancouver** – hero vídeo + quiz + timeline (~1–2h).  
5. Depois: fases do “trabalho noturno” (performance, UX, SEO, componentes).

---

## Checklist resumido – implementação premium

- [ ] Privacy page (layout 2 colunas, visual)
- [ ] Terms page (layout 2 colunas, visual)
- [ ] Studio (vídeo fundo, timeline, galeria)
- [ ] Research (grid projetos, publicações)
- [ ] Academy Courses/Workshops/Corporate (cards, vídeos, depoimentos)
- [ ] ServiceDetail – projetos relacionados dinâmicos
- [ ] Vancouver – hero vídeo, quiz, timeline, galeria
- [ ] Micro-interações e loading states
- [ ] Performance (bundle, imagens, cache)
- [ ] SEO (meta, Schema, FAQ, títulos)
- [ ] Documentação consolidada

---

## Referência aos documentos originais

- `PLANO_TRABALHO_NOTURNO_AUTOMATICO.md` – fases 1–7 (melhorias visuais a documentação).
- `PLANO_PROXIMAS_FEATURES.md` – opções 1–5 (visuais, conteúdo dinâmico, analytics, gamificação, Web3).
- `PROXIMAS_ACOES_SUGERIDAS.md` – testes, ServiceDetail, GA, Vancouver, dashboard.
- `PLANO_ACAO_COMPLETO.md` – deploy, CRM, email, visão geral.

Se quiser, posso detalhar a implementação de um bloco específico (ex.: só Privacy/Terms premium ou só Vancouver) em tarefas passo a passo no código.
