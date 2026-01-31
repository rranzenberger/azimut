# Game design: área secreta e quests premium

## Objetivo
- **200 cards** e **80 quests**, com **3 quests premium** (Rio Museu Olímpico, Festival de Gramado, Exposição internacional).
- Área secreta com **diferencial visual** (glow, cores premium, gradientes) e **mecânica de descoberta**.
- Links para **ver currículo, soluções e projetos** no modal da área secreta.

## Como o usuário descobre a área secreta

1. **Hint na splash**
   - Texto com destaque visual (cyan/glow): *"Área secreta — você descobre?"*
   - Tooltip/hover: *"Toque 5 vezes no texto acima para descobrir."*

2. **Desbloqueio**
   - **5 toques** no texto "Área secreta — você descobre?" na tela inicial.
   - Estado salvo em `localStorage` (`empathy_secret_unlocked`) para persistir entre sessões.

3. **Tutorial e dicas**
   - No tutorial: *"Área secreta. Existe um lugar escondido no Empathy Engine — só quem joga com atenção e explora tudo consegue encontrar."*
   - Nas dicas: *"Explore tudo. Conquistas, ranking e configurações escondem detalhes. Quem explora descobre mais — inclusive a área secreta."*

## Como o usuário encontra quests premium (incl. escondidas)

1. **Desbloqueio**
   - Ao descobrir a área secreta (5 toques), o jogo passa a ter **15% de chance** de sortear um **brief premium** ao iniciar cada fase (em vez de um brief normal do tópico).

2. **Quests premium**
   - **Rio Museu Olímpico** — experiência imersiva, curadoria, acervo digital, tour virtual, VR, acessibilidade.
   - **Festival de Cinema de Gramado** — cobertura, cenografia, transmissão ao vivo, projeção mapeada, palco, curadoria.
   - **Exposição internacional** — storytelling museal, expografia, mediação, tecnologia.

3. **Quest super-premium (só área secreta)**
   - **Rio Museu Olímpico — Experiência Completa** — única quest super-premium; só aparece para quem descobriu a área secreta.
   - Dentro dos 15% de chance de premium, **25%** é esta quest (o resto são as 3 premium normais). Badge **"✦ Super Premium"** (laranja/âmbar) na UI.

3. **UI quando a quest é premium**
   - **Badge "✦ Premium"** com cor dourada e leve glow na modal da quest, na sidebar (desktop) e na faixa compacta (mobile).
   - No mobile: barra com gradiente dourado e borda esquerda dourada.
   - Título exibido é o **título do brief** (ex.: "Rio Museu Olímpico") em vez do nome do tópico.

## Área secreta — visual diferente

- **Modal** com fundo escuro, barra superior em gradiente dourado/âmbar com glow.
- Título em gradiente dourado (✦ Área Secreta).
- Texto de parabéns e descrição dos projetos (Rio Museu Olímpico, Festival de Gramado, exposições internacionais).
- **Botões** com estilo premium (borda dourada, fundo âmbar suave):
  - **Ver currículo** → `/#curriculum`
  - **Ver soluções** → `/#what-we-do`
  - **Ver projetos** → `/#work`
- Botão **Fechar** traduzido (PT/EN/ES/FR).

## Nome correto
- **Rio Museu Olímpico** (PT).
- EN: Rio Olympic Museum | ES: Rio Museo Olímpico | FR: Rio Musée Olympique.

## Easter eggs dentro do jogo

1. **Durante o jogo (GameScreen)**  
   - **7 toques** no título **"EMPATHY ENGINE"** no header (desktop).  
   - Aparece um toast: *"Você é um explorador! Easter egg encontrado. 🎮✨"*

2. **Tela de resultado (ResultScreen)**  
   - **5 toques** no **número da pontuação final** (o score grande em dourado).  
   - Aparece um toast: *"Obrigado por jogar! Você é curioso. ✨"*

Nenhum dos dois altera progresso ou desbloqueia conteúdo; são apenas recompensas de descoberta para quem explora a interface.

## Resumo para o jogador
- Explorar a splash e o tutorial aumenta a chance de descobrir a área secreta.
- Quem descobre passa a ter chance de receber quests de projetos reais (Rio Museu Olímpico, Gramado, exposições).
- Essas quests aparecem com visual premium (badge, glow) e levam ao currículo, soluções e projetos da Azimut.
- Easter eggs: 7 toques no título durante o jogo e 5 toques no score na tela de resultado.
