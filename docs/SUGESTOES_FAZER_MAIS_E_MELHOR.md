# Sugestões: o que podemos fazer a mais e melhor

**Análise:** jogo Empathy Engine, site Azimut, backoffice, integrações e roadmap.  
**Objetivo:** lista priorizada de melhorias e próximos passos.

---

## 1. Jogo Empathy Engine

### 1.1 Já feito (resumo)
- 200 cards, 80 quests, 3 premium + 1 super-premium (Rio Museu Olímpico — Experiência Completa)
- Área secreta (5 toques), easter eggs (7 toques título, 5 toques score), conquistas (Explorador, Curioso, Área Secreta, Quest Premium)
- UI premium/super-premium (badges, gradientes, modal), i18n PT/EN/ES/FR para briefs premium
- Documentação: GAME_DESIGN_SECRET_AREA, RECOMPENSAS_NFT_E_SEM_CARTEIRA

### 1.2 Sugestões — jogo

| Prioridade | Sugestão | Impacto | Esforço |
|------------|----------|---------|--------|
| **Alta** | **Som:** feedback ao arrastar carta, combo, meta atingida, área secreta; opção mutar em Configurações | Engajamento e polish | ~2–3 h |
| **Alta** | **Analytics no jogo:** eventos (game_start, phase_complete, secret_unlock, premium_quest_played, lead_save, lead_nft) para medir funil e valor da área secreta | Dados para decisão | ~1–2 h |
| **Média** | **Compartilhar resultado:** "Compartilhar minha pontuação" na tela de resultado (link com score + lang) para WhatsApp/LinkedIn | Viralidade e tráfego | ~1 h |
| **Média** | **Conquista "Super Premium":** desbloquear ao completar uma fase com a quest super-premium; mostrar na tela de conquistas e no fluxo NFT | Reforça recompensa | ~30 min |
| **Média** | **Tutorial em vídeo curto (opcional):** link para um vídeo de 30–60 s "Como jogar" no modal da primeira quest | Reduz abandono de novos | ~30 min + vídeo |
| **Baixa** | **Modo acessível:** opção em Configurações para timer mais longo e/ou meta menor (já existe "Modo Zen") | Inclusão | Já parcial |
| **Baixa** | **Leaderboard por idioma ou global:** filtro por idioma; ou "melhores da semana" | Competição leve | ~1 h |

---

## 2. Site (Azimut)

### 2.1 Alinhado ao roadmap

- **Fase 0 (crítico):** backoffice build no projeto certo; testar ServiceDetail em produção; variáveis de deploy.
- **Fase 1 (SEO):** hreflang, Schema (Review/Rating, VideoObject, LocalBusiness), Google Search Console, Google Business Profile, Core Web Vitals.
- **Fase 2 (UX):** validação de formulários, loading skeletons, breadcrumbs visuais, busca global, PWA offline, acessibilidade.
- **Fase 3 (conteúdo):** long-form, blog estratégico, backlinks (VFS, VanArts, Museu Olímpico).

### 2.2 Sugestões adicionais — site

| Prioridade | Sugestão | Impacto | Esforço |
|------------|----------|---------|--------|
| **Alta** | **CTA "Jogar" na Home:** botão ou card visível "Jogue o Empathy Engine" com link para `/{lang}/game` (além do fluxo experience-preview) | Mais jogadores e leads | ~30 min |
| ~~Case Rio Museu Olímpico + link para o jogo~~ | **Removido.** O game não é “case Museu Olímpico” — objetivos são: captação de leads, ativação de marca (amostra do que fazemos), tempo no site e entendimento. Ver docs/OBJETIVOS_GAME_EMPATHY_ENGINE.md. | — | — |
| **Média** | **OG images por página/idioma:** geração ou estáticas para Home, Work, Academy, Game, Contact (compartilhamento bonito) | Mais CTR em redes | ~2 h |
| **Média** | **Webinars ES/FR:** trocar TODOs em `Webinars.tsx` por conteúdo real em espanhol e francês | Consistência multi-idioma | ~30 min |
| **Média** | **ErrorBoundary por rota:** fallback amigável em cada área (Home, Work, Game, etc.) | Menos tela branca em erro | ~20 min |
| **Baixa** | **Blog:** primeiro post sobre "Como criamos o Empathy Engine" (leads, ativação de marca, engajamento) | SEO e storytelling | ~2–4 h |

---

## 3. Integração Game ↔ Site

| Prioridade | Sugestão | Impacto | Esforço |
|------------|----------|---------|--------|
| **Alta** | **Links do modal área secreta:** garantir que `/#curriculum`, `/#what-we-do`, `/#work` abram no site pai (se o jogo estiver em iframe) e rolem até a âncora | Conversão da área secreta em visita ao site | ~30 min |
| **Alta** | **Lead do jogo no mesmo CRM:** quando o jogador preenche "Salvar progresso" ou "Receber NFT", enviar para o mesmo fluxo de leads do site (Neon/n8n) com origem "empathy_engine" | Um único funil de leads | ~2–4 h (API + backoffice) |
| **Média** | **Utm / origem:** links do site para o jogo com `?utm_source=site&utm_medium=cta_home` (e variantes) para analytics | Saber de onde vêm os jogadores | ~15 min |
| **Média** | **Pós-jogo:** na ResultScreen, além de "Ver ranking" e "Consultoria", um botão "Conhecer projetos reais" → `/{lang}/#work` | Converter jogador em lead de projeto | ~15 min |

---

## 4. Backoffice e automação

| Prioridade | Sugestão | Impacto | Esforço |
|------------|----------|---------|--------|
| **Crítico** | **Deploy backoffice:** config Vercel azimut-backoffice (root, install/build em azimut-cms) conforme DEPLOY_BACKOFFICE_VERCEL.md | CMS estável | ~5 min |
| **Alta** | **Dashboard de leads do jogo:** filtro "origem = empathy_engine" ou "game"; coluna "conquistas" ou "premium_quest" se enviar no payload | Qualificar leads do jogo | ~1–2 h |
| **Alta** | **n8n:** webhook do formulário "Receber NFT" / "Salvar progresso" do jogo → mesmo pipeline de enriquecimento e salvamento no Neon | Automação de leads do jogo | ~2 h |
| **Média** | **Notificação em tempo real:** quando um lead do jogo (ou com alta pontuação) for criado, notificação (email/Telegram) | Resposta rápida a leads quentes | ~1 h |

---

## 5. Web3 / NFT (próximos passos)

| Prioridade | Sugestão | Impacto | Esforço |
|------------|----------|---------|--------|
| **Média** | **Backend "direito a NFT":** API que recebe email + lista de conquistas (explorador, curioso, area_secreta, quest_premium) e grava em BD; depois um job ou painel para "mint para estes emails" quando tiver carteira | Preparar minting sem exigir carteira no jogo | ~4–8 h |
| **Média** | **Landing "Resgate seu NFT":** página no site (ex. /nft-claim) onde quem tem email cadastrado pode conectar carteira e mintar; consulta ao backend por email | Fluxo completo sem carteira no jogo | ~4 h |
| **Baixa** | **Design dos NFTs:** 4–5 variantes visuais (Explorador, Curioso, Área Secreta, Quest Premium, Super Premium) para quando o minting estiver ativo | Diferenciação real | Design + dev |

---

## 6. UX e acessibilidade (geral)

| Prioridade | Sugestão | Impacto | Esforço |
|------------|----------|---------|--------|
| **Média** | **Skip links e foco:** garantir skip link "Ir para o conteúdo" e ordem de tab lógica no site e no jogo | Acessibilidade | ~20 min |
| **Média** | **Contraste e texto:** revisar contraste (WCAG AA) em botões e textos secundários no jogo (badges, sidebar) | Acessibilidade | ~30 min |
| **Baixa** | **Redução de movimento:** respeitar `prefers-reduced-motion` no jogo (menos animações ou desligáveis em Configurações) | Inclusão | ~1 h |

---

## 7. Conteúdo e SEO

| Prioridade | Sugestão | Impacto | Esforço |
|------------|----------|---------|--------|
| **Alta** | **Schema VideoObject** no demoreel e em vídeos de projetos | Rich results no Google | ~30 min |
| **Alta** | **Schema Review/Rating** em depoimentos | Estrelas no snippet | ~30 min |
| **Média** | **Página /game com texto único por idioma:** descrição do Empathy Engine, benefícios (conhecer soluções, jogar com briefs reais), CTA "Jogar" e "Ver projetos" | SEO e conversão | ~1 h |
| **Média** | **Backlinks:** contato com Museu Olímpico, VFS, VanArts para menção/link | Autoridade | Contato + conteúdo |

---

## 8. Ordem sugerida (quick wins primeiro)

| # | Ação | Onde | Tempo |
|---|------|------|--------|
| 1 | Deploy backoffice (config Vercel) | Fase 0 | 5 min |
| 2 | Testar ServiceDetail em produção | Fase 0 | 15 min |
| 3 | hreflang no HTML (4 idiomas + x-default) | Site | 10 min |
| 4 | CTA "Jogar" na Home → /game | Site | 30 min |
| 5 | Links área secreta abrirem no site pai (âncoras) | Game | 30 min |
| 6 | Eventos de analytics no jogo (game_start, secret_unlock, etc.) | Game | 1–2 h |
| 7 | Schema Review + VideoObject | Site | 1 h |
| 8 | Conquista "Super Premium" no jogo | Game | 30 min |
| 9 | Botão "Compartilhar minha pontuação" na ResultScreen | Game | 1 h |
| 10 | Lead do jogo para mesmo CRM (origem empathy_engine) | Backoffice + Game | 2–4 h |

Depois: som no jogo, dashboard leads jogo, n8n webhook jogo, OG images, página /game rica em SEO, backlinks e conteúdo long-form.

---

## 9. Resumo por área

- **Jogo:** som, analytics, compartilhar resultado, conquista Super Premium, tutorial em vídeo opcional.
- **Site:** CTA jogo na Home, OG images, Webinars ES/FR, ErrorBoundary, blog. (Game = leads, ativação de marca, tempo no site — não “case Museu Olímpico”.)
- **Integração:** âncoras do modal no site pai, lead jogo no mesmo CRM, utm, CTA pós-jogo "Conhecer projetos".
- **Backoffice:** deploy correto, filtro leads jogo, n8n para formulários do jogo, notificações.
- **Web3:** API "direito a NFT" por email + conquistas, landing resgate com carteira, design dos NFTs.
- **UX/A11y:** skip links, contraste, reduced-motion no jogo.
- **SEO:** Schema Review/VideoObject, página /game com conteúdo único, backlinks.

Use este doc como checklist e priorize conforme tempo e impacto (quick wins na seção 8).
