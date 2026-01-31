# Análise Claude vs. Implementado — Empathy Engine

Documento que confronta as recomendações do Claude com o que já está no projeto.  
**Data:** 30/01/2026

---

## 1. Já implementado (conforme análise Claude)

| Item da análise Claude | Onde está no projeto | Estado |
|------------------------|----------------------|--------|
| **Metas suavizadas** (200 → 350 → 550 → 800) | `gameStore.ts`: `TARGET_SCORE` | ✅ Feito |
| **Tempo Fase 4** (30s → 45s) | `gameStore.ts`: `PHASE_DURATION[4] = 45` | ✅ Feito |
| **Garantia de raridade no pool** (pelo menos 1 Rare+) | `gameStore.ts`: `ensureRareInPool()` | ✅ Feito |
| **Garantia de combo no pool** (pelo menos 1 combo possível) | `gameStore.ts`: `ensureComboInPool()` | ✅ Feito |
| **Pity system** (3 derrotas → +5s e carta rara) | `gameStore.ts`: `startGame()` / `consecutiveLosses` | ✅ Feito |
| **Reroll** (1 por fase, troca cartas) | `gameStore.ts`: `rerollPool()`, `rerollsLeft` | ✅ Feito |
| **Tópico Tecnologia & Consultoria** | `topics.ts`, `briefs.ts`, `combos.ts`, `elements.ts` | ✅ Feito |
| **Modal de surpresa ao iniciar fase** | `GameScreen.tsx`: `showSurpriseIntroModal`, Modal com título por tipo | ✅ Feito |
| **Barra de progresso da meta** | `GameScreen.tsx`: `progressPercent`, bloco "Progresso para Meta" | ✅ Feito |
| **Preview/highlight de combo** (cartas compatíveis ao arrastar) | `combos.ts`: `getComboPartnersForElement`; `Element.tsx`: `highlightCombo` | ✅ Feito |
| **Bloco Bônus Surpresa** com mesma arte (borda lateral roxa) | `GameScreen.tsx`: seção "Bônus Surpresa" com borda roxa | ✅ Feito |
| **Expansão de conteúdo** (elementos, briefs, combos por tópico) | Vários elementos/briefs/combos em `elements.ts`, `briefs.ts`, `combos.ts` | ✅ Em grande parte |

---

## 2. Implementado nesta rodada (jan 2026)

| Item | Onde está |
|------|------------|
| **Toast de combo ativado** | `GameScreen.tsx`: efeito ao formar combo, `<Toast>` "Combo: [nome] (+X pts)". |
| **Power-ups Congelar Tempo + Multiplicador 3×** | `powerups.ts`; `gameStore.ts`: `timerFrozenUntil`, `multiplierForCard`, `consumePowerUp`. |
| **Sistema de conquistas** | `achievementsStore.ts`; seção em `SettingsScreen.tsx`; snapshots em `gameStore`; link "Conquistas e Configurações" no Splash. |
| **Leaderboard por tópico** | `LeaderboardScreen.tsx`: abas "Todos" + por tópico; salvamento com `topicIds` ao fim do jogo. |
| **Barra de progresso com cor** | `GameScreen.tsx`: longe (&lt;50% cinza), meio (tópico), perto (amarelo), atingido (verde). |
| **Feedback visual de raridade** | `Element.tsx`: glow reforçado para rare/epic/legendary/mythic. |
| **Near-miss / Segunda Chance** | `ResultScreen.tsx`: botão 1x/dia quando perdeu por &lt;50 pts; localStorage por data. |
| **Modos Zen e Desafio** | `settingsStore.ts`: `noTimer` (Zen), `challengeMode`; `briefs.ts`: `pickRandomBriefForTopic(_, true)`; opções em Settings. |

---

## 3. O que ainda falta (opcional e roadmap)

### Polish e opcionais

| Item | Descrição |
|------|-----------|
| **Som ao adicionar carta rara** | Toque curto ao dropar carta rare/epic/mythic (Web Audio ou arquivo). |
| **Redução de gap de pontos** | Common 100→120, Epic 400→450 (opcional para balanceamento). |
| **Distribuição fixa no pool** | 6 common, 5 uncommon, 4 rare, 2 epic, 1 mythic por pool (opcional). |
| **Bônus de combos padronizados** | 2 elem: +150, 3: +250, 4+: +400 (opcional; hoje valores variados). |

### Roadmap futuro (dados, produto, i18n)

| Item | Descrição |
|------|-----------|
| **Telemetria** | Eventos: start, pick, drop, combo, reroll, win, lose, quit para A/B e métricas. |
| **i18n** | Strings em PT/EN (e estrutura para mais idiomas). |
| **Leaderboard backend** | Integração com Supabase (ou outro) para ranking global persistente. |
| **Desafios diários/semanais** | Brief raro com recompensa; limite saudável. |
| **Coleção de elementos** | % de completude por tópico (metas de desbloqueio). |
| **Mais power-ups** | Revelar Raridade, Duplicar Carta, Trocar Carta (doc Claude). |
| **Acessibilidade** | Teclado completo, targets 44px, alto contraste (parcial), reduce motion (já existe). |

---

## 4. Parcialmente implementado ou diferente do documento

| Item do documento | Situação no projeto |
|-------------------|---------------------|
| **Redução de gap de pontos** (Common 100→120, Epic 400→450) | Projeto usa `basePoints` com `common: 100`, `rare: 150`, `epic: 250`, `legendary: 400`, `mythic: 600`. O doc sugeria common 120 e epic 450; não foi aplicado nesses valores — opcional para balanceamento fino. |
| **Distribuição fixa no pool** (6 common, 5 uncommon, 4 rare, 2 epic, 1 mythic) | Hoje existe apenas garantia de pelo menos 1 Rare+ (`ensureRareInPool`). Distribuição fixa exata não está implementada — pode ser adicionada em `gameStore` ao montar o pool. |
| **Ajuste de bônus de combos** (2 elem: +150, 3: +250, 4+: +400) | Combos atuais têm `bonusPoints` variados (50–300). Padronizar seria uma mudança grande de dados; opcional. |

---

## 5. Resumo executivo

- **Já está alinhado com a análise:** balanceamento (metas, tempo, Fase 4), garantias de pool (raridade + combo), pity, reroll, tópico Tecnologia & Consultoria, modal de surpresa, barra de progresso da meta, highlight de combo e bloco de Bônus Surpresa.
- **Próximos passos recomendados (em ordem):**
  1. **Toast de combo ativado** — baixo esforço, alto impacto de feedback.
  2. **1–2 power-ups novos** (Congelar Tempo, Multiplicador 3x) — aumenta variedade estratégica.
  3. **Sistema de conquistas** — aumenta rejogabilidade e sensação de progresso.
  4. **Leaderboard por tópico** — melhora competição e identidade por tema.
  5. Barra de progresso com cor, feedback de raridade, Near-miss e modos alternativos conforme prioridade de produto.

Este documento pode ser usado para planejar sprints e para que Claude, ChatGPT, Gemini ou Perplexity sugiram implementações concretas (código) para cada item pendente.
