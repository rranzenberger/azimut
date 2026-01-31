# Game Design — Empathy Engine

Documento de referência do design do jogo: visão, pilares, modelo de dados e fluxo.

---

## 1. Visão

O Empathy Engine é um jogo de **composição por brief/tópico**: em cada fase o jogador recebe um **brief** (tema + objetivo), monta uma proposta arrastando **cartas do tema** para a zona de composição e tenta atingir a **meta de pontos** antes do tempo. Às vezes o brief traz uma **surpresa** (ex.: cliente pede um combo; tempo extra ou reduzido).

---

## 2. Pilares

1. **Tópicos** — Cada rodada/fase tem um tema: **XR/VR**, **Produção audiovisual**, **Eventos corporativos** ou **Estudar Canadá**. As cartas da rodada são apenas as do tópico sorteado.
2. **Brief com objetivo** — Em cada fase aparece um brief com título e objetivo narrativo (ex.: "Monte uma proposta de experiência XR para o cliente") além da meta numérica de pontos.
3. **Pool por tópico** — O pool de cartas é filtrado pelo tópico do brief; não há mistura de todos os elementos em uma única lista.
4. **Surpresa** — Alguns briefs incluem uma surpresa (ex.: "Cliente pede pelo menos um combo", "Tempo reduzido", "Meta extra de pontos"). O resultado da surpresa (ex.: combo entregue ou não) é mostrado na tela de resultado.

---

## 3. Modelo de dados

| Conceito | Onde | Descrição |
|----------|------|-----------|
| **Topic** | `src/data/topics.ts` | `id`, `name`, `shortDescription`, `elementIds[]`. Define o tema e quais elementos (cartas) pertencem a ele. |
| **GameElement** | `src/data/elements.ts` | `id`, `name`, `category`, `rarity`, `points`. Cartas que podem ser usadas; cada uma pertence a um ou mais tópicos via `topics[].elementIds`. |
| **Brief** | `src/data/briefs.ts` | `id`, `topicId`, `title`, `objective`, `targetScore?`, `surprise?`. Objetivo da fase; opcionalmente `surprise: { type, description }`. |
| **Combo** | `src/data/combos.ts` | `id`, `elementIds`, `name`, `bonusPoints`, `topicId?`. Combinações que dão bônus; `topicId` opcional para filtrar por tópico. |
| **Store** | `src/stores/gameStore.ts` | `currentTopicId`, `currentBrief`, `surpriseSatisfied`, `poolOrder` (elementIds do tópico), etc. |

- **Surpresa (BriefSurprise)**  
  Tipos: `combo-required`, `time-reduced`, `time-extra`, `target-bonus`. Aplicados em `startGame`/avanço de fase (tempo/meta); `combo-required` é avaliado ao fim da fase e refletido em `surpriseSatisfied` e na tela de resultado.

---

## 4. Fluxo

1. **Splash** — Explica: você recebe um brief (tema + objetivo); as cartas são do tema (XR, Audiovisual, Eventos, Estudar Canadá); objetivo é cumprir o brief e a meta; às vezes há surpresa. CTA: "Sentir & Criar", "Ver tutorial completo", "Experiências criadas".
2. **Tutorial** (opcional) — Passos: receber brief; cartas do tema; arrastar para zona; atingir meta e surpresa; 4 fases e power-ups.
3. **Jogo** — Para cada fase: sorteio de **tópico** e **brief**; pool = elementos do tópico; exibição do brief no topo (tema + objetivo + surpresa se houver); timer e meta; zona de composição; "O cliente reage"; power-ups. Ao fim da fase: avanço para próxima (novo tópico/brief) ou fim do jogo.
4. **Result** — Pontuação final; se houve surpresa do tipo "combo", mensagem "O cliente queria um combo — você entregou!" ou "quase lá"; combos ativados; CTAs (jogar de novo, salvar, leaderboard, etc.).

---

## 5. Referências

- **Card-based design** — Valor condicional das cartas (contexto do tópico e do brief); percepção do jogador em relação a combos e objetivos.
- **Objetivo por rodada** — Uso de brief como "design brief": tema + objetivo claro por fase.
- **Surpresa como modificador** — Randomness (sorteio de tópico/brief, surpresa opcional) com agência (jogador escolhe quais cartas compor).

---

## 6. Arquivos principais

| Aspecto | Arquivo |
|---------|---------|
| Tópicos | `src/data/topics.ts` |
| Elementos (cartas) | `src/data/elements.ts` |
| Briefs | `src/data/briefs.ts` |
| Combos | `src/data/combos.ts` |
| Reações do cliente | `src/data/clientReactions.ts` |
| Store (estado do jogo) | `src/stores/gameStore.ts` |
| Splash | `src/screens/SplashScreen.tsx` |
| Jogo | `src/screens/GameScreen.tsx` |
| Tutorial | `src/screens/TutorialScreen.tsx` |
| Resultado | `src/screens/ResultScreen.tsx` |

Este documento é o ponto único de referência do game design do Engine e não depende do documento 4098f3a7 (que cobre o site principal).
