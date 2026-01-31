# Empathy Engine — Análise: Documento Claude vs. O que temos

Comparação entre as recomendações do **Documento de Game Design (Claude, Jan 2026)** e o estado atual do código. Objetivo: ver o que **já fizemos**, o que **vale a pena fazer** e o que **priorizar**.

---

## 1. JÁ IMPLEMENTADO (documento vs. código)

### 1.1 Balanceamento (Fase 1 do documento)

| Recomendação | Status | Onde está |
|--------------|--------|-----------|
| Metas: 200 → 350 → 550 → 800 | ✅ Feito | `gameStore.ts`: `TARGET_SCORE` 200, 350, 550, 800 |
| Fase 4: tempo 30s → 45s | ✅ Feito | `gameStore.ts`: `PHASE_DURATION[4] = 45` |
| Garantir 1 carta rara/epic/mythic no pool | ✅ Feito | `ensureRareInPool()` em `gameStore.ts` |
| Garantir 1 combo possível no pool | ✅ Feito | `ensureComboInPool()` em `gameStore.ts` |
| Pity system (após 3 derrotas) | ✅ Feito | +5s e carta rara no próximo pool (`consecutiveLosses >= 3`) |

### 1.2 Conteúdo (Fase 2 do documento)

| Recomendação | Status | Onde está |
|--------------|--------|-----------|
| Tópico "Tecnologia & Consultoria" | ✅ Feito | `topics.ts`, `elements.ts`, `briefs.ts`, `combos.ts` |
| Expandir Cultura & Museus | ✅ Feito | Vários elementos e combos (storytelling-museal, cms-acervo, expografia, etc.) |
| Expandir Produção (Runway, Houdini, RED, etc.) | ✅ Feito | `elements.ts`: runway-ml, houdini, red-camera, blackmagic, nuke, after-effects, etc. |
| Expandir XR/VR (Meta Quest, HTC Vive, ARKit, ativação de marca) | ✅ Feito | `elements.ts` e `combos.ts` |
| Novos briefs e combos | ✅ Feito | Múltiplos briefs por tópico; combos ponte; Tech & Consultoria com 6 combos |

### 1.3 UX e feedback (Fase 4 do documento)

| Recomendação | Status | Onde está |
|--------------|--------|-----------|
| Barra de progresso da meta com cor (amarelo → verde) | ✅ Feito | `GameScreen.tsx`: "Progresso para Meta", `progressPercent`, `isNearGoal`, `isGoalReached` |
| Preview de combo (highlight cartas compatíveis ao arrastar) | ✅ Feito | `getComboPartnersForElement`, `highlightCombo` em `Element.tsx`, `comboPartnerIds` em GameScreen |
| Reroll limitado (trocar cartas) | ✅ Feito | `rerollsLeft: 1` por fase, `rerollPool()` em `gameStore.ts`, botão "Trocar cartas (1x)" |

### 1.4 UI/Polish já feito (fora do documento)

- Fundo unificado (`.game-bg`) em todas as telas; glow nos cards (`.card-glow-home`, `.card-glow-soft`).
- Card da Quest destacado: "Sua Quest", "Objetivo", "O que precisa fazer", "Como jogar" em passos; títulos maiores.
- Nome do jogo "EMPATHY ENGINE" no header com mesmo tamanho do título da Quest (34px).
- Pílula Estudar Canadá: cor #be0320, fundo neutro, maple leaf (imagem em assets).

---

## 2. VALE A PENA FAZER (prioridades sugeridas)

### 2.1 Alto impacto, esforço moderado

| Item | Descrição | Benefício |
|------|-----------|-----------|
| **Modal/tooltip de surpresa** | Ao iniciar fase, se `brief.surprise` existir, mostrar um modal curto: "Nesta fase: [descrição da surpresa]". | Clareza: jogador entende "combo obrigatório", "tempo reduzido", etc. |
| **Toast de combo ativado** | Ao formar combo, mostrar toast: "Combo: [nome] (+X pts)". | Feedback imediato e satisfação. |
| **Ajuste de pontos (opcional)** | Documento sugere common 100→120, epic 400→450 para reduzir gap. Nosso `elements.ts` usa `basePoints` por raridade (common 100, rare 150, epic 250, legendary 400, mythic 600). | Pode deixar como está ou alinhar ao documento se quiser metas mais suaves. |

### 2.2 Rejogabilidade (Fase 3 do documento)

| Item | Descrição | Benefício |
|------|-----------|-----------|
| **Conquistas (achievements)** | Ex.: "Mestre dos Combos", "Velocista", "Perfeccionista". Novo `achievementsStore.ts` + tela ou seção. | Meta-jogo e motivo para rejogar. |
| **Leaderboard por tópico** | Ranking separado por tópico (melhor score XR/VR, Produção, etc.). | Competição e variedade. |
| **Modo Zen** | Sem timer; foco em máxima pontuação. | Acessibilidade e outro tipo de desafio. |

### 2.3 Novos power-ups (documento: 5 adicionais)

Hoje temos 3: Time Extra, Raio-X, Ímã de Combos. Documento sugere: Revelar Raridade, Duplicar Carta, Trocar Carta, Multiplicador 3x, Congelar Tempo. Vale a pena escolher 1–2 para implementar primeiro (ex.: Congelar Tempo, Multiplicador 3x) e deixar o resto para uma segunda leva.

---

## 3. O QUE NÃO FAZER OU DEIXAR PARA DEPOIS

| Item | Motivo |
|------|--------|
| **Reduzir gap de pontos (common 120, epic 450)** | Já temos metas e pool balanceados; mudar pontos mexe em todo o balanceamento. Só fazer se houver playtest indicando necessidade. |
| **Distribuição fixa no pool (6 common, 5 uncommon, …)** | Garantir 1 Rare+ e 1 combo já reduz frustração; distribuição rígida pode deixar o pool previsível demais. |
| **Ajustar bônus de combos (150/250/400)** | Nossos combos já têm valores variados (50–300); mudar tudo pode desbalancear. |
| **Modo Desafio / Modo Aleatório** | Boa ideia de rejogabilidade, mas exige mais lógica e UI; priorizar após conquistas e leaderboard. |
| **Desbloqueáveis (power-ups por pontuação)** | Aumenta complexidade de progressão; fazer depois de conquistas. |

---

## 4. CHECKLIST OBJETIVO

### Já feito ✅
- [x] Metas 200 / 350 / 550 / 800
- [x] Tempo Fase 4 = 45s
- [x] Garantia de 1 Rare+ no pool
- [x] Garantia de 1 combo possível no pool
- [x] Pity system (3 derrotas → +5s e carta rara)
- [x] Tópico Tecnologia & Consultoria (elementos, briefs, combos)
- [x] Expansão Cultura & Museus, Produção, XR/VR
- [x] Barra de progresso da meta (com cor)
- [x] Highlight de cartas em combo ao arrastar
- [x] Reroll 1x por fase
- [x] UI da Quest e "Como jogar" em destaque

### Vale a pena fazer em seguida
- [ ] Modal/tooltip explicando a surpresa no início da fase
- [ ] Toast "Combo ativado: [nome] (+X pts)"
- [ ] 1–2 power-ups novos (ex.: Congelar Tempo, Multiplicador 3x)
- [ ] Sistema de conquistas (store + UI)
- [ ] Leaderboard por tópico

### Depois / opcional
- [ ] Modo Zen (sem timer)
- [ ] Mais power-ups (Revelar Raridade, Duplicar Carta, etc.)
- [ ] Modo Desafio / Modo Aleatório
- [ ] Ajuste fino de pontos (common/epic) só se playtest pedir

---

## 5. Conclusão

A maior parte das **recomendações de Fase 1 (balanceamento)** e **Fase 2 (conteúdo)** do documento já está implementada, junto com **feedback visual** (barra de meta, highlight de combo, reroll). O que mais agrega agora é: **clareza das surpresas** (modal), **feedback de combo** (toast), **rejogabilidade** (conquistas, leaderboard por tópico) e **1–2 power-ups novos**. O resto pode ser feito em fases seguintes conforme prioridade de produto e tempo de desenvolvimento.
