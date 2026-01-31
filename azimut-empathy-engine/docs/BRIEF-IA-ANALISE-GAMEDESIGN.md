# Brief para IAs — Análise do game design do Empathy Engine

**Objetivo deste documento:** Ser usado em Claude, ChatGPT, Gemini, Perplexity ou outras IAs para que analisem **tópicos**, **cards (elementos)**, **briefs**, **combos** e o **game design** do jogo Empathy Engine, entendam como ele funciona e **sugiram melhorias concretas** (conteúdo, balanceamento, UX, novos tópicos/cards, narrativa, etc.).

---

## 1. Contexto do projeto

- **Azimut:** Empresa de soluções criativas e tecnológicas (XR/VR, produção audiovisual, eventos, cultura, educação, consultoria). Site com página “O que fazemos” (soluções por filtro: Cultura, Marcas, Produção, Tecnologia, Educação).
- **Empathy Engine:** Jogo web de **composição por brief**: o jogador recebe um **brief** (tema + objetivo), monta uma “proposta” arrastando **cartas do tema** para uma zona de composição e tenta atingir a **meta de pontos** antes do tempo acabar. O jogo serve para divulgar os serviços da Azimut de forma lúdica.
- **Stack:** React, TypeScript, Vite, Zustand, Framer Motion. Dados em arquivos TypeScript (`src/data/*.ts`).

---

## 2. Visão do game design

- **Gênero:** Card-based, por fase, com timer e meta de pontos.
- **Loop:** Em cada **fase** (4 fases por partida) o sistema sorteia um **tópico** e um **brief** desse tópico. O **pool de cartas** é apenas os elementos daquele tópico (não mistura todos). O jogador arrasta cartas para a zona de composição; a pontuação = soma dos pontos das cartas + bônus de **combos** (combinações específicas que dão pontos extras). Às vezes o brief traz uma **surpresa** (ex.: “cliente pede pelo menos um combo”, “tempo reduzido”, “meta de pontos maior”).
- **Pilares:**
  1. **Tópicos** — Cada fase tem um tema (XR/VR, Produção audiovisual, Eventos corporativos, Cultura & Museus, Estudar Canadá). Só aparecem cartas desse tópico.
  2. **Brief com objetivo** — Título + objetivo narrativo (ex.: “Monte uma proposta de experiência XR para o cliente”) + meta numérica.
  3. **Pool por tópico** — Cartas filtradas pelo tópico do brief.
  4. **Surpresa** — Alguns briefs modificam a fase (combo obrigatório, tempo extra/reduzido, meta aumentada). O cumprimento da surpresa “combo” é mostrado na tela de resultado.

---

## 3. Regras e mecânicas (detalhes)

### 3.1 Fases e partida
- **4 fases** por partida. Nomes: Fase 1 “Sentir”, 2 “Conectar”, 3 “Sincronizar”, 4 “Transformar”.
- **Duração por fase (segundos):** Fase 1: 20, Fase 2: 30, Fase 3: 40, Fase 4: 30. Podem ser alteradas por surpresa (tempo extra +10s, tempo reduzido 60% do valor, mínimo 10s).
- **Meta de pontos por fase:** Fase 1: 200, Fase 2: 400, Fase 3: 600, Fase 4: 1000. Surpresa “target-bonus” aumenta em 25%.
- **Pool de cartas:** 18 cartas por fase, sorteadas (sem repetição) entre os `elementIds` do tópico atual.
- **Pontuação da fase:** Soma dos pontos de cada carta selecionada + bônus de todos os combos ativados (considerando o tópico atual). Opcionalmente há um multiplicador aleatório (20% de chance de 2x) por fase.
- **Fim da fase:** Jogador clica em “Entregar” (ou equivalente). Se atingir a meta, passa para a próxima fase (novo tópico + novo brief); na fase 4, termina a partida e vai para tela de resultado.
- **Surpresa “combo-required”:** Se o brief tiver essa surpresa, ao final da fase verifica-se se houve pelo menos 1 combo. Isso é exibido na tela de resultado (“O cliente queria um combo — você entregou!” ou similar).

### 3.2 Cartas (elementos)
- Cada elemento tem: `id`, `name`, `nameEn` (opcional), `category`, `rarity`, `points`.
- **Raridades e pontos base:** common 100, rare 150, epic 250, legendary 400, mythic 600.
- O jogador pode selecionar várias cartas; a ordem não importa para combos (apenas o conjunto de IDs).

### 3.3 Combos
- **Combo:** conjunto fixo de `elementIds` que, quando todos estão selecionados, dá `bonusPoints` e pode ter `topicId` para contar só naquele tópico.
- Vários combos podem ser ativados ao mesmo tempo; os bônus somam.
- Ao formar um novo combo (em relação ao estado anterior), há 35% de chance de surgir um **power-up** (aleatório entre os disponíveis).

### 3.4 Power-ups
- **time-extra:** +10s no timer (efeito imediato).
- **raio-x:** “Revela sinergias” (conceitual).
- **ima-combos:** “Atrai combos” (conceitual).
- Apenas “time-extra” tem efeito numérico implementado; os outros são narrativos/UX.

### 3.5 Reações do cliente
- Enquanto o jogador monta a composição, um texto (“reação do cliente”) é exibido. Se houver combo ativado, mostra a frase do combo de maior bônus; senão, algo genérico por categoria ou fallback.

---

## 4. Modelo de dados (tipos)

```ts
// Raridade e pontos base
type Rarity = 'common' | 'rare' | 'epic' | 'legendary' | 'mythic'

// Carta
interface GameElement {
  id: string
  name: string
  nameEn?: string
  category: string
  rarity: Rarity
  points: number
  icon?: string
  description?: string
}

// Tópico (tema da fase)
interface Topic {
  id: string
  name: string
  shortDescription: string
  elementIds: string[]   // IDs das cartas que pertencem a este tópico
}

// Surpresa do brief
interface BriefSurprise {
  type: 'combo-required' | 'time-reduced' | 'time-extra' | 'target-bonus'
  description: string
}

// Brief (objetivo da fase)
interface Brief {
  id: string
  topicId: string
  title: string
  objective: string
  targetScore?: number
  surprise?: BriefSurprise
}

// Combo
interface Combo {
  id: string
  elementIds: string[]
  name: string
  bonusPoints: number
  synergy?: boolean
  topicId?: string
}

// Power-up
interface PowerUp {
  id: string
  name: string
  effect: string
  duration?: number
}
```

---

## 5. Dados completos (tópicos, elementos, briefs, combos, power-ups, reações)

### 5.1 TÓPICOS (5)

| id | name | shortDescription | elementIds (quantidade) |
|----|------|------------------|--------------------------|
| xr-vr | XR / VR | Experiências imersivas: VR, AR, câmera 360, Unity, Unreal, metaverso. | 17 |
| producao-audiovisual | Produção audiovisual | Pré-produção, roteiro, elenco, câmera, locação, edição, VFX, som. | 23 |
| eventos-corporativos | Eventos corporativos | Palco, som, iluminação, transmissão ao vivo, cenografia, projeção. | 16 |
| cultura-museus | Cultura & Museus | Curadoria, exposição, museu, festival, teatro, espetáculo imersivo, projeção mapeada. | 11 |
| estudar-canada | Estudar Canadá | VFS, VanArts, Vancouver Academy, cursos animação/VFX/game, visto. | 11 |

**elementIds por tópico:**

- **xr-vr:** vr-headset, ar-glasses, 360-camera, oculus-vr, unity, unreal-engine, tracking, volumetric-capture, spatial-audio, nft, blockchain, metaverse, touchdesigner, notch, resolume, webxr, instalacao-interativa
- **producao-audiovisual:** camera, light, screen, ai-sora, vfx-compositing, pre-producao, roteiro, elenco, atores, camera-video, locacao, edicao, som, pos-edicao, direcao, color-grading, motion-design, rotoscopia, blender, maya, toon-boom, godot, gamificacao
- **eventos-corporativos:** stage, som-evento, iluminacao-evento, transmissao-ao-vivo, cenografia, projecao-evento, streaming, camera, light, screen, curadoria, festival, teatro, qlab, painel-led, projecao-mapeada, tour-virtual
- **cultura-museus:** curadoria, exposicao, acervo-digital, tour-virtual, acessibilidade, festival, teatro, espetaculo-imersivo, qlab, painel-led, projecao-mapeada
- **estudar-canada:** vancouver-academy, vfs, vanarts, curso-animacao, curso-vfx, curso-game-design, visto-estudante, residencia-permanente, workshop, curso-online, treinamento-corporativo

---

### 5.2 ELEMENTOS (cartas) — 72 itens

Formato: `id | name | nameEn | category | rarity | points`

**XR/VR**
- vr-headset | Headset VR | VR Headset | VR | common | 100
- ar-glasses | Óculos AR | AR Glasses | VR | rare | 150
- 360-camera | Câmera 360 | 360 Camera | VR | common | 100
- oculus-vr | Oculus VR | Oculus VR | VR | rare | 150
- unity | Unity | Unity | VR | epic | 250
- unreal-engine | Unreal Engine | Unreal Engine | VR | epic | 250
- tracking | Tracking espacial | Spatial tracking | VR | rare | 150
- volumetric-capture | Captura volumétrica | Volumetric capture | VR | legendary | 400
- spatial-audio | Áudio espacial | Spatial audio | VR | rare | 150
- nft | NFT | NFT | Web3 | mythic | 600
- blockchain | Blockchain | Blockchain | Web3 | legendary | 400
- metaverse | Metaverso | Metaverse | Web3 | mythic | 600
- touchdesigner | TouchDesigner | TouchDesigner | VR | epic | 250
- notch | Notch | Notch | VR | epic | 250
- resolume | Resolume | Resolume | VR | rare | 150
- webxr | WebXR | WebXR | VR | epic | 250
- instalacao-interativa | Instalação interativa | Interactive installation | VR | legendary | 400

**Produção audiovisual (Cinema, VFX, IA, Games)**
- camera | Câmera | Camera | Cinema | common | 100
- light | Luz | Light | Cinema | common | 100
- screen | Tela | Screen | Cinema | common | 100
- ai-sora | IA Sora | AI Sora | IA | legendary | 400
- vfx-compositing | Compositing VFX | VFX Compositing | VFX | epic | 250
- pre-producao | Pré-produção | Pre-production | Cinema | common | 100
- roteiro | Roteiro | Script | Cinema | common | 100
- elenco | Elenco | Cast | Cinema | rare | 150
- atores | Atores | Actors | Cinema | common | 100
- camera-video | Câmera de vídeo | Video camera | Cinema | common | 100
- locacao | Locação | Location | Cinema | rare | 150
- edicao | Edição | Editing | Cinema | common | 100
- som | Som | Sound | Cinema | common | 100
- pos-edicao | Pós-edição | Post-production | Cinema | rare | 150
- direcao | Direção | Direction | Cinema | epic | 250
- color-grading | Color grading | Color grading | Cinema | rare | 150
- motion-design | Motion design | Motion design | VFX | epic | 250
- rotoscopia | Rotoscopia | Rotoscoping | VFX | rare | 150
- blender | Blender | Blender | VFX | epic | 250
- maya | Maya | Maya | VFX | epic | 250
- toon-boom | Toon Boom | Toon Boom | VFX | rare | 150
- godot | Godot | Godot | Games | rare | 150
- gamificacao | Gamificação | Gamification | Games | epic | 250

**Eventos**
- stage | Palco | Stage | Eventos | common | 100
- som-evento | Som ao vivo | Live sound | Eventos | common | 100
- iluminacao-evento | Iluminação | Lighting | Eventos | common | 100
- transmissao-ao-vivo | Transmissão ao vivo | Live streaming | Eventos | epic | 250
- cenografia | Cenografia | Set design | Eventos | rare | 150
- projecao-evento | Projeção | Projection | Eventos | rare | 150
- streaming | Streaming | Streaming | Eventos | epic | 250
- curadoria | Curadoria | Curation | Eventos | epic | 250
- festival | Festival | Festival | Eventos | rare | 150
- teatro | Teatro | Theater | Eventos | rare | 150
- qlab | QLab | QLab | Eventos | rare | 150
- painel-led | Painel LED | LED panel | Eventos | epic | 250
- projecao-mapeada | Projeção mapeada | Projection mapping | Eventos | legendary | 400
- tour-virtual | Tour virtual | Virtual tour | Eventos | epic | 250

**Cultura & Museus**
- exposicao | Exposição | Exhibition | Cultura | common | 100
- acervo-digital | Acervo digital | Digital archive | Cultura | rare | 150
- acessibilidade | Acessibilidade | Accessibility | Cultura | epic | 250
- espetaculo-imersivo | Espetáculo imersivo | Immersive show | Cultura | legendary | 400

**Estudar Canadá**
- vancouver-academy | Vancouver Academy | Vancouver Academy | Academy | legendary | 400
- vfs | VFS | VFS | Academy | epic | 250
- vanarts | VanArts | VanArts | Academy | epic | 250
- curso-animacao | Curso Animação | Animation course | Academy | rare | 150
- curso-vfx | Curso VFX | VFX course | Academy | rare | 150
- curso-game-design | Curso Game Design | Game design course | Academy | rare | 150
- visto-estudante | Visto de estudante | Study permit | Academy | epic | 250
- residencia-permanente | Residência permanente | Permanent residence | Academy | legendary | 400
- workshop | Workshop | Workshop | Academy | rare | 150
- curso-online | Curso online | Online course | Academy | rare | 150
- treinamento-corporativo | Treinamento corporativo | Corporate training | Academy | epic | 250

---

### 5.3 BRIEFS (15)

| id | topicId | title | objective | surprise |
|----|---------|-------|-----------|----------|
| brief-xr-experiencia | xr-vr | Experiência imersiva | Monte uma proposta de experiência XR/VR para o cliente. Combine tecnologias que criem imersão. | — |
| brief-xr-museu | xr-vr | VR para museu | O cliente quer levar visitantes a uma exposição em VR. Selecione as tecnologias ideais. | combo-required |
| brief-xr-metaverso | xr-vr | Presença no metaverso | Proposta para presença da marca no metaverso. Inclua captura, engines e interação. | target-bonus |
| brief-av-comercial | producao-audiovisual | Comercial de marca | Monte a equipe e o pipeline para um comercial. Do roteiro à pós-edição. | — |
| brief-av-doc | producao-audiovisual | Documentário | Proposta de produção documental: pré-produção, câmera, locação, edição e som. | time-reduced |
| brief-av-ia-vfx | producao-audiovisual | IA e VFX | O cliente quer explorar IA e VFX na pós-produção. Combine as tecnologias certas. | combo-required |
| brief-ev-corporativo | eventos-corporativos | Evento corporativo | Monte a estrutura de um evento: palco, som, iluminação e transmissão. | — |
| brief-ev-hibrido | eventos-corporativos | Evento híbrido | Evento presencial e online. Inclua transmissão ao vivo, projeção e streaming. | time-extra |
| brief-ev-cenografia | eventos-corporativos | Cenografia e projeção | O cliente prioriza cenografia e projeção. Combine com som e iluminação. | — |
| brief-canada-vfx | estudar-canada | Estudar VFX no Canadá | Ajude o cliente a montar um plano: escolas (VFS, VanArts), curso VFX e visto. | — |
| brief-canada-game | estudar-canada | Game design no Canadá | Proposta de formação em game design: Vancouver Academy, cursos e residência. | combo-required |
| brief-canada-animacao | estudar-canada | Curso de animação | O cliente quer estudar animação em Vancouver. Combine escolas e vistos. | — |
| brief-cultura-museu | cultura-museus | Museus & Exposições | Monte uma proposta de exposição ou experiência museal: curadoria, acervo digital, tour virtual e acessibilidade. | — |
| brief-cultura-festival | cultura-museus | Festival ou teatro imersivo | O cliente quer um festival ou espetáculo imersivo. Combine curadoria, palco, projeção mapeada e painel LED. | combo-required |
| brief-cultura-tour | cultura-museus | Tour virtual e exposição | Proposta de tour virtual e exposição com projeção mapeada e acessibilidade. | — |

---

### 5.4 COMBOS (20)

| id | topicId | name | elementIds | bonusPoints |
|----|---------|------|------------|-------------|
| combo-vr-cinema | xr-vr | Experiência Imersiva | vr-headset, 360-camera | 50 |
| combo-xr-imersivo | xr-vr | XR Imersivo | vr-headset, 360-camera, unity | 100 |
| combo-web3 | xr-vr | Web3 Completo | nft, blockchain, metaverse | 300 |
| combo-ia-vfx | producao-audiovisual | IA + VFX | ai-sora, vfx-compositing | 100 |
| combo-luz-camera | producao-audiovisual | Setup Clássico | camera, light, screen | 75 |
| combo-producao-completa | producao-audiovisual | Produção Completa | roteiro, camera-video, edicao | 120 |
| combo-elenco-direcao | producao-audiovisual | Equipe Criativa | elenco, direcao, roteiro | 90 |
| combo-motion-vfx | producao-audiovisual | Motion + VFX | motion-design, vfx-compositing, color-grading | 130 |
| combo-palco-som | eventos-corporativos | Palco Completo | stage, som-evento, iluminacao-evento | 80 |
| combo-transmissao | eventos-corporativos | Evento Híbrido | transmissao-ao-vivo, streaming, camera | 150 |
| combo-cenografia | eventos-corporativos | Cenografia + Projeção | cenografia, projecao-evento, iluminacao-evento | 100 |
| combo-curadoria-festival | eventos-corporativos | Curadoria + Festival | curadoria, festival, teatro | 120 |
| combo-projecao-led | eventos-corporativos | Projeção + LED | projecao-mapeada, painel-led, qlab | 150 |
| combo-exposicao-tour | cultura-museus | Exposição + Tour Virtual | exposicao, tour-virtual, acervo-digital | 130 |
| combo-espetaculo-imersivo | cultura-museus | Espetáculo Imersivo | espetaculo-imersivo, teatro, projecao-mapeada | 180 |
| combo-museu-acessivel | cultura-museus | Museu Acessível | acessibilidade, exposicao, tour-virtual | 140 |
| combo-academy-full | estudar-canada | Tríplice Academy | vancouver-academy, vfs, vanarts | 200 |
| combo-cursos-vancouver | estudar-canada | Cursos Vancouver | curso-animacao, curso-vfx, curso-game-design | 100 |
| combo-visto-residencia | estudar-canada | Visto e Residência | visto-estudante, residencia-permanente | 150 |
| combo-workshop-treinamento | estudar-canada | Workshop + Treinamento | workshop, treinamento-corporativo, curso-online | 120 |

---

### 5.5 POWER-UPS (3)

| id | name | effect | duration |
|----|------|--------|----------|
| time-extra | Tempo Extra | +10s | 10 |
| raio-x | Raio-X | Revela sinergias | — |
| ima-combos | Ímã de Combos | Atrai combos | — |

---

### 5.6 REAÇÕES DO CLIENTE (por combo)

Quando o jogador ativa um combo, a reação exibida é a do combo de maior bônus. Fallback quando não há combo: por categoria dominante ou “O cliente está explorando as possibilidades.” / “O cliente sente que há sinergia entre as escolhas.”

- combo-vr-cinema: O cliente sente imersão total. "É como estar dentro da história."
- combo-xr-imersivo: O cliente vê a experiência XR completa. "VR, 360 e Unity — imersão total."
- combo-web3: O cliente se anima com Web3. "NFT, blockchain e metaverso."
- combo-ia-vfx: O cliente vê o futuro da produção. "IA e VFX juntos mudam tudo."
- combo-luz-camera: O cliente reconhece o clássico. "Luz, câmera, ação."
- combo-producao-completa: O cliente aprova o pipeline. "Roteiro, câmera e edição — produção completa."
- combo-elenco-direcao: O cliente valoriza a equipe. "Elenco, direção e roteiro — equipe criativa."
- combo-palco-som: O cliente aprova o palco. "Palco, som e iluminação — evento pronto."
- combo-transmissao: O cliente quer o híbrido. "Transmissão ao vivo e streaming — evento híbrido."
- combo-cenografia: O cliente valoriza a cenografia. "Cenografia, projeção e iluminação."
- combo-curadoria-festival: O cliente aprova a curadoria. "Festival, teatro e curadoria — programação forte."
- combo-projecao-led: O cliente valoriza o visual. "Projeção mapeada e LED — impacto total."
- combo-exposicao-tour: O cliente quer o museu digital. "Exposição, tour virtual e acervo — experiência completa."
- combo-espetaculo-imersivo: O cliente se emociona. "Espetáculo imersivo com teatro e projeção."
- combo-museu-acessivel: O cliente valoriza inclusão. "Acessibilidade, exposição e tour virtual."
- combo-motion-vfx: O cliente vê a pós de alto nível. "Motion, VFX e color — pipeline premium."
- combo-academy-full: O cliente valoriza a formação. "Três academias de peso."
- combo-cursos-vancouver: O cliente vê os cursos. "Animação, VFX e game design em Vancouver."
- combo-visto-residencia: O cliente pensa no longo prazo. "Visto e residência — plano completo."
- combo-workshop-treinamento: O cliente investe em formação. "Workshop, treinamento e curso online."

---

## 6. Fluxo de telas

1. **Splash** — Apresentação do jogo, “Sentir & Criar”, link para tutorial e “Experiências criadas”.
2. **Tutorial** (opcional) — Passos: receber brief; cartas do tema; arrastar para zona; atingir meta e surpresa; 4 fases e power-ups.
3. **Jogo** — Para cada fase: exibe brief (tema + objetivo + surpresa se houver), timer, meta, pool de 18 cartas, zona de composição, reação do cliente, power-up (se disponível). Botão “Entregar” para encerrar a fase.
4. **Resultado** — Pontuação final, feedback da surpresa “combo” (se aplicável), combos ativados, opções (jogar de novo, leaderboard, etc.).

---

## 7. Pedido explícito às IAs

Ao analisar este documento, por favor:

1. **Entenda** o jogo: tópicos, cartas, briefs, combos, surpresas, pontuação e fluxo.
2. **Analise** criticamente:
   - **Tópicos:** Faz sentido ter 5? Falta algum (ex.: Tecnologia/Consultoria, Games)? Nomes e descrições estão claros?
   - **Cartas (elementos):** Balanceamento por raridade/pontos, redundâncias, lacunas por tema, nomes e categorias.
   - **Briefs:** Objetivos claros? Variedade por tópico? Surpresas bem distribuídas e compreensíveis?
   - **Combos:** Quantidade por tópico, dificuldade de ativar, bônus justos, combos que nunca aparecem (cartas fora do pool)?
   - **Game design geral:** Curva de dificuldade, clareza do objetivo, sensação de progressão, repetitividade, conexão com a marca Azimut.
3. **Sugira melhorias concretas**, por exemplo:
   - Novos tópicos ou ajustes nos atuais.
   - Novos elementos (cards) com id, name, category, rarity sugerida.
   - Novos briefs (título, objetivo, surpresa opcional).
   - Novos combos (elementIds, nome, bônus sugerido).
   - Ajustes de balanceamento (tempo por fase, metas de pontos, pontos base por raridade).
   - Ideias para power-ups (efeitos reais ou narrativos).
   - Melhorias de UX/copy (textos do brief, reações do cliente, tutorial).
   - Ideias de “surpresa” ou mecânicas adicionais para deixar o jogo mais rico e rejogável.

Use a lista completa de dados (seção 5) como referência. Pode responder em tópicos, tabelas ou lista numerada, conforme preferir. O objetivo é **melhorar muito** o Empathy Engine com base na sua análise.
