# Direção de arte — UI premium (AZIMUT EMPATHY ENGINE)

Documento para **verificação das escolhas visuais** e **plano de elevação ao nível diretor de arte sênior**.  
Use este guia para localizar cada decisão no projeto e aplicar melhorias de arte visual.

---

## 1. Local do projeto

| O quê | Caminho no repositório |
|-------|------------------------|
| **Raiz do Empathy Engine** | `azimut-empathy-engine/` (dentro de `azimut-site-vite-tailwind`) |
| **Caminho absoluto típico** | `C:\Users\ranz\Documents\azimut-site-vite-tailwind\azimut-empathy-engine` |
| **Estilos globais e tokens** | `azimut-empathy-engine/src/index.css` |
| **Componentes de UI** | `azimut-empathy-engine/src/components/ui/` |
| **Componentes de jogo** | `azimut-empathy-engine/src/components/game/` |
| **Telas** | `azimut-empathy-engine/src/screens/` |
| **Config Tailwind** | `@tailwindcss/vite` no `vite.config.ts`; tema em `index.css` com `@theme` |
| **Assets (imagens, fontes)** | `azimut-empathy-engine/public/` e `src/assets/` |
| **Documento de design** | `azimut-empathy-engine/docs/4098f3a7-bfed-4c9b-9d38-af87279faea4.txt` |

**Como rodar e ver a UI:** na pasta `azimut-empathy-engine`, execute `npm run dev` e abra o endereço indicado (ex.: http://localhost:5174).

---

## 2. Escolhas visuais atuais (o que está definido)

### 2.1 Cores (Design Document)

- **Vermelho Azimut:** `#C92337` — principal, CTAs, destaques.
- **Dourado:** `#D4AF37` — conquistas, XP, meta, premium.
- **Roxo Épico:** `#A855F7` — combos, sinergia, raridade.
- **Fundos:** `#0A0E18` (darkest), `#1A1F2E` (dark), `#242938` (mid).
- **Texto:** branco, `#D3CEC3` (secondary), `#A8A29E` (tertiary).

Onde verificar/alterar: **`src/index.css`** — bloco `@theme { }` e `:root { }` (variáveis `--color-*`, `--text-*`, `--bg-*` se existirem).

### 2.2 Tipografia

- **Atual:** `system-ui`, Avenir, Helvetica, Arial (genérico).
- **Documento sugere:** Handel Gothic (títulos), Sora (corpo), Orbitron (dados).

Onde verificar/alterar: **`src/index.css`** — `:root { font-family: ... }` e qualquer classe de título/body. Para fontes customizadas: `index.html` (link Google Fonts ou arquivos em `public/fonts/`) e depois `font-family` no CSS.

### 2.3 Componentes

- **UI:** Button, Card, Input, Badge, Modal, Toast, ProgressBar, SkipLink — em `src/components/ui/`.
- **Jogo:** Element (card de tecnologia), CompositionZone, Timer, ScoreDisplay, ComboRays, ComboPreview3D — em `src/components/game/`.
- **Telas:** SplashScreen, GameScreen, ResultScreen, TutorialScreen, LeaderboardScreen, SettingsScreen — em `src/screens/`.

Cada componente define suas próprias classes (Tailwind). Para “premium”, concentre primeiro em: **Button**, **Card**, **Element**, **CompositionZone**, **SplashScreen**, **GameScreen**, **ResultScreen**.

### 2.4 Layout e espaçamento

- Containers: em geral `max-w-4xl mx-auto`, `p-6`, `space-y-6`.
- Bordas: `rounded-xl`, `border-2`, `border-dashed` na zona de composição.
- Sem sistema explícito de “ritmo” (8px grid) nem hierarquia de espaços documentada.

Onde verificar/alterar: **`src/index.css`** (variáveis `--space-*`, `--radius-*`) e os arquivos das telas/componentes (classes `p-*`, `gap-*`, `space-y-*`, `max-w-*`).

### 2.5 Animações e movimento

- GSAP em helpers em `src/utils/gsap-helpers.ts` (pop-in, raios, overlay).
- CSS: `@keyframes combo-ray` em `src/index.css` para raios de sinergia.
- Respeito a `prefers-reduced-motion` e `reducedMotion` do settings.

Micro-interações em botões e elementos (Framer Motion) já implementadas. **Transições entre telas** implementadas em `App.tsx` com AnimatePresence (fade + slide); respeitam `reducedMotion` das configurações.

### 2.6 Splash

- Fundo: gradiente + estrela Azimut (classe `.splash-bg` em `index.css`).
- Conteúdo: título, tagline, 3 botões — em `src/screens/SplashScreen.tsx`.
- Sem partículas, sem “respiração” do fundo, sem hierarquia tipográfica forte.

---

## 3. Por que a UI ainda parece “pobre”

Resumo objetivo para priorizar o que mudar:

| Problema | Onde acontece | Impacto |
|----------|----------------|---------|
| **Tipografia genérica** | `index.css`, telas | Parece template; sem identidade de marca. |
| **Pouca profundidade** | Fundos e cards | Tudo “flat”; sem camadas, sombras ou glass. |
| **Quase nenhum “premium”** | Botões, cards, zona | Falta glow, bordas finas, hover/focus elaborado. |
| **Cores pouco exploradas** | Uso de gradientes e destaques | Vermelho/dourado/roxo pouco usados em gradientes e estados. |
| **Sem micro-interações** | Botões, chips, elementos arrastáveis | Hover/active básico ou inexistente. |
| **Transições entre telas** | Navegação Splash → Game → Result | Corte seco; sem fade/slide. |
| **Hierarquia visual fraca** | Títulos vs corpo vs dados | Tamanhos e pesos pouco diferenciados. |
| **Sem “respiração”** | Splash e fundos | Fundo estático; sem movimento sutil. |
| **Ícones e símbolos** | Emojis (🔥, 💡, etc.) | Funcional, mas não uma linha gráfica única. |

---

## 4. Plano premium — diretor de arte sênior

Ordem sugerida para quem for implementar (você ou um diretor de arte).

### 4.1 Tipografia (identidade)

- **Arquivo:** `src/index.css` e, se existir, `index.html`.
- **Ações:**
  - Incluir fontes: **Handel Gothic** (ou similar forte) para títulos, **Sora** para corpo, **Orbitron** para números/timer/dados.
  - Definir em `:root` ou em classes: `--font-display`, `--font-body`, `--font-mono/data`.
  - Aplicar em: Splash (título), GameScreen (Fase X/4, Pontos de conexão), ResultScreen (score), Timer e ScoreDisplay.
- **Onde tocar:** `index.css`, `SplashScreen.tsx`, `GameScreen.tsx`, `ResultScreen.tsx`, `Timer.tsx`, `ScoreDisplay.tsx`, componentes de Button/Card se tiverem texto “especial”.

### 4.2 Profundidade e camadas

- **Arquivos:** `src/index.css`, `src/components/ui/Card.tsx`, `src/components/game/Element.tsx`, `src/components/game/CompositionZone.tsx`, `src/screens/SplashScreen.tsx`, `src/screens/GameScreen.tsx`.
- **Ações:**
  - Criar níveis de sombra: `--shadow-sm`, `--shadow-card`, `--shadow-glow-red`, `--shadow-glow-gold` (já existem referências a glow no doc; garantir uso).
  - Cards: sombra + borda sutil (ex.: `border border-white/10`) e, em destaque, leve `box-shadow` com cor da marca.
  - Zona de composição: fundo em “camada” (ex.: `bg-bg-dark/80`) e borda que reage no hover (já existe em parte; reforçar).
  - Splash: fundo em 2–3 camadas (gradiente base + gradiente de cor + estrela) para dar profundidade.
- **Verificar:** `index.css` (tokens de sombra) e classes dos componentes acima.

### 4.3 Botões e CTAs “premium”

- **Arquivo:** `src/components/ui/Button.tsx`.
- **Ações:**
  - Primary: gradiente sutil (vermelho → vermelho escuro) ou fundo sólido + `box-shadow` com `--azimut-red-glow`.
  - Hover: leve `scale(1.02)`, aumento do glow ou brilho na borda.
  - Focus: outline visível (acessível) e consistente com a marca.
  - Secondary/Ghost: borda ou fundo translúcido; hover com fundo `white/5` ou `white/10`.
- **Verificar:** variantes `primary`, `secondary`, `ghost` e tamanhos.

### 4.4 Cards de elemento (tecnologia)

- **Arquivo:** `src/components/game/Element.tsx`.
- **Ações:**
  - Por raridade: borda e/ou sombra com a cor da raridade (common → mythic); gradiente muito sutil no fundo.
  - Hover (não arrastando): leve scale, brilho na borda, sombra um pouco maior.
  - Estado “disabled” (já na composição): opacidade reduzida e estilo “colocado” (ex.: check ou borda dourada).
- **Verificar:** classes por `rarity` e estados `isDragging` e `disabled`.

### 4.5 Zona de composição

- **Arquivo:** `src/components/game/CompositionZone.tsx`.
- **Ações:**
  - Fundo: glass (ex.: `backdrop-blur-sm`) + borda que ganha cor (vermelho/dourado) quando `isOver`.
  - Chips dos elementos: sombra pequena, borda sutil; ao adicionar, manter animação de “entrada” (já pode existir com GSAP).
- **Verificar:** `className` do container e dos chips.

### 4.6 Splash “premium”

- **Arquivos:** `src/index.css` (`.splash-bg`), `src/screens/SplashScreen.tsx`.
- **Ações:**
  - Fundo: gradiente em 2–3 camadas; estrela com opacidade baixa (já existe); opcional: partículas estáticas ou animação muito sutil (CSS only).
  - Título: fonte display (Handel Gothic ou similar), tamanho grande, tracking; opcional: leve text-shadow ou gradiente no texto.
  - Botões: destaque maior no “Sentir & Criar” (tamanho, cor, sombra); os outros com hierarquia clara.
  - Espaçamento: mais “ar” entre título, tagline e botões para sensação premium.
- **Verificar:** estrutura do JSX e classes aplicadas ao container e aos botões.

### 4.7 GameScreen e Result

- **Arquivos:** `src/screens/GameScreen.tsx`, `src/screens/ResultScreen.tsx`.
- **Ações:**
  - Header do jogo: título da fase com tipografia forte; timer e “Pontos de conexão” com fonte de dados (Orbitron ou mono); barra de XP com gradiente dourado.
  - Result: score grande com destaque (cor, sombra ou glow); seção de combos com cards ou listas bem definidas; botões claramente hierarquizados.
  - Bloco “O cliente reage”: fundo discreto (card ou borda) para separar do resto; tipografia legível.
- **Verificar:** uso de `ScoreDisplay`, `Timer`, `ProgressBar` e textos estáticos.

### 4.8 Micro-interações e transições

- **Arquivos:** `src/components/ui/Button.tsx`, `src/components/game/Element.tsx`, `src/App.tsx` ou roteador de telas.
- **Ações:**
  - Botões: `transition` para `transform`, `box-shadow`, `background`; hover/active com scale e sombra.
  - Element: hover com scale e sombra; opcional: transição suave de cor de borda por raridade.
  - Troca de tela: wrapper com Framer Motion (já na stack) — `AnimatePresence` + fade ou slide entre Splash ↔ Game ↔ Result.
- **Verificar:** onde está a troca de view (ex.: estado em `App.tsx`) e adicionar `<motion.div>` + `AnimatePresence`.

### 4.9 Paleta e gradientes

- **Arquivo:** `src/index.css`.
- **Ações:**
  - Definir gradientes reutilizáveis: `--gradient-hero` (fundo Splash), `--gradient-cta` (botão primary), `--gradient-gold` (XP, meta).
  - Usar em fundos e, onde fizer sentido, em texto (com `background-clip: text`) para títulos especiais.
- **Verificar:** `@theme` e `:root` e uso dessas variáveis nos componentes.

### 4.10 Ícones e linha gráfica

- **Onde:** em todos os lugares que hoje usam emoji (🔥, 💡, ▶, etc.).
- **Ações:**
  - Decidir: manter emojis com estilo consistente (tamanho, filtro) ou substituir por ícones SVG (próprios ou biblioteca).
  - Se SVG: pasta `src/assets/icons/` ou `public/icons/` e componente `Icon`; aplicar em botões, combos, power-ups, fase.
- **Verificar:** `SplashScreen.tsx`, `GameScreen.tsx`, `ResultScreen.tsx`, componentes de game.

---

## 5. Checklist de verificação (onde está cada coisa)

Use esta tabela para abrir o arquivo certo ao melhorar um aspecto.

| Aspecto | Onde está | O que alterar |
|---------|-----------|----------------|
| Cores globais | `src/index.css` | `@theme`, `:root` (--color-*, --text-*, sombras) |
| Fontes globais | `src/index.css`, `index.html` | font-family, @font-face ou link |
| Botões | `src/components/ui/Button.tsx` | Variantes, hover, focus, sombra |
| Cards | `src/components/ui/Card.tsx` | Sombra, borda, variantes |
| Card de elemento (jogo) | `src/components/game/Element.tsx` | Raridade, hover, disabled |
| Zona de composição | `src/components/game/CompositionZone.tsx` | Fundo, borda, chips |
| Timer / Score | `src/components/game/Timer.tsx`, `ScoreDisplay.tsx` | Tipografia, cor, tamanho |
| Splash | `src/screens/SplashScreen.tsx`, `index.css` (.splash-bg) | Fundo, título, botões |
| Tela de jogo | `src/screens/GameScreen.tsx` | Header, seções, dica, grid |
| Resultado | `src/screens/ResultScreen.tsx` | Score, combos, botões |
| Transições de tela | `src/App.tsx` | ✅ AnimatePresence + motion.div (fade/slide); respeita reducedMotion |
| Animações GSAP | `src/utils/gsap-helpers.ts` | Duração, easing, novos efeitos |

---

## 6. Resumo executivo

- **Projeto:** `azimut-empathy-engine` (em `azimut-site-vite-tailwind`).
- **Causas da sensação “pobre” (e o que já foi atacado):**
  - ~~Tipografia genérica~~ → **Feito:** fontes Syne/Sora/Orbitron, tokens `--font-display`, `--font-body`, `--font-data` em `index.css` e aplicadas nas telas/componentes.
  - ~~Pouca profundidade~~ → **Feito:** sombras e glass em cards, zona de composição, modais; tokens `--shadow-*`, `--gradient-*`.
  - ~~Botões/cards sem premium~~ → **Feito:** Button com gradiente, glow, hover/tap (Framer Motion); Card e Element com glass, raridade, hover/disabled.
  - ~~Transições secas~~ → **Feito:** `App.tsx` com AnimatePresence e motion.div (fade + slide), respeitando reducedMotion.
  - **Pendente/opcional:** uso mais amplo de gradientes em texto (background-clip), substituição de emojis por ícones SVG, “respiração” do fundo do Splash.
- **Prioridades para nível “diretor de arte sênior premium”:** (1) ~~Tipografia~~, (2) ~~Profundidade e sombras~~, (3) ~~Botões e cards premium~~, (4) ~~Splash e Game/Result com hierarquia~~, (5) ~~Micro-interações e transições~~, (6) Gradientes em texto e opcionalmente ícones SVG.
- **Documento de referência de produto/design:** `docs/4098f3a7-bfed-4c9b-9d38-af87279faea4.txt`.

Com este documento você consegue **localizar cada escolha no projeto** e **aplicar as melhorias de arte visual** de forma sistemática.
