# 🎮 Ações de Game Neurolinguístico e Outras — O que era e como implementar

**Objetivo:** Reparar e consolidar todas as ações relacionadas a **game neurolinguístico**, **micro-game**, **onboarding neurocientífico** e itens de gamificação que estavam no plano, com o que já existe e o que falta implementar.

**Fontes:** `GAME_NEUROLINGUISTICO_LEADS.md`, `RESUMO_COMPLETO_TUDO_QUE_VAMOS_FAZER.md`, `PONTO_ATUAL_E_PLANO_CURTO_MEDIO_LONGO_2026.md`, `OBJETIVOS_GAME_EMPATHY_ENGINE.md`, roadmap backoffice.

---

## 📍 O que já existe hoje

| Item | O que é | Onde está |
|------|---------|-----------|
| **Empathy Engine** | Game de ciclos no site (4 fases, tema Tecnologia & Consultoria, modo sem tempo). Objetivo: ativação de marca, captação de leads, tempo no site. | `/{lang}/game`, iframe do azimut-empathy-engine |
| **Gamification Widget** | Widget flutuante: XP, nível, badges, sequência, “Como funciona?”, CTA “Ver meu progresso na página Studio”. | Layout do site (GamificationWidget.tsx) |
| **API Game Neurolinguístico (backoffice)** | API que analisa respostas e qualifica leads com neurolinguística + IA. | `azimut-cms/app/api/game/neurolinguistic/route.ts` |
| **Leads do jogo** | Fluxo: Empathy Engine → POST backoffice → lead `EMPATHY_ENGINE` → n8n. | LEADS_JOGO_EMPATHY_ENGINE.md |

Ou seja: o **game que já está no ar** é o **Empathy Engine**. O **Game Neurolinguístico** é um **novo produto** planejado (quiz/jogo com análise neurolinguística para qualificação de leads), ainda **não implementado no site**.

---

## 🧠 1. Game Neurolinguístico — O que era

**Doc principal:** `docs/GAME_NEUROLINGUISTICO_LEADS.md`

### Conceito

- **Nome de produto:** “Explorador de Mundos Imersivos”.
- **Objetivo:** Jogo interativo que usa **neurolinguística** para:
  - Identificar lead **quente** vs **frio**
  - Detectar sério vs brincadeira
  - Entender intenção (cooperação, coprodução, orientação, curso)
  - Ser empático e memorável
  - Dar “gostinho” com **NFT** como prova

### Mecânica (conforme doc)

- **Fase 1 – Exploração:** 3 perguntas (experiência que fascina, como prefere aprender, o que motiva).
- **Fase 2 – Profundidade:** 2 perguntas (projeto ideal, quando começar).
- **Análise:** Padrões V-A-K (Visual/Auditivo/Cinestésico), metaprogramas (Proativo/Reativo, Global/Específico, Associação/Dissociação), valores e crenças.
- **Scoring:** 80–100 = Lead quente, 60–79 = Alto, 40–59 = Médio, 0–39 = Frio, negativo = muito frio.
- **Recompensa:** NFT “Certificado de Exploração” (tipos: Explorador Quente / Curioso / Iniciante) conforme pontuação.
- **IA:** Após o game, Claude/DeepSeek analisa padrões neurolinguísticos, consistência, intenção real vs brincadeira, sugestão de abordagem empática.

### Evolução desejada (conversas anteriores)

- Não só “perguntas e respostas” ou “escolher imagens”: um **game mais atrativo**, com **movimento e ação**, onde as pessoas fiquem “presas” no jogo.
- A análise viria também de **como** jogam (stealth assessment): velocidade, cliques, tempo, caminhos — mapeados para padrões neurolinguísticos e score de lead **sem depender só de perguntas**.

Ou seja: o plano inclui tanto a **versão quiz** (perguntas com análise NL) quanto uma **evolução** para game com interação/movimento e análise comportamental.

---

## 🚀 2. Game Neurolinguístico — Como implementar (checklist do doc)

### Fase 1: Game Neurolinguístico (estimativa: 1 semana)

| # | Ação | Detalhe | Status |
|---|------|---------|--------|
| 1 | Criar componente React do game | Página/rota ex.: `/{lang}/explorer` ou `/{lang}/game-neuro`; telas de perguntas, alternativas, progresso | Pendente |
| 2 | Implementar perguntas e lógica | 5 perguntas (3 exploração + 2 profundidade), alternativas com mapeamento V-A-K e metaprogramas | Pendente |
| 3 | Sistema de scoring | Pontuação por escolhas (tabela do doc), classificação Quente/Alto/Médio/Frio | Pendente |
| 4 | Análise com IA (Claude/DeepSeek) | Chamar API existente `POST /api/game/neurolinguistic` (backoffice) ou equivalente no site; exibir resumo/sugestão de abordagem | Pendente |
| 5 | Salvar resultado no banco | Enviar resultado (score, tipo, respostas anônimas ou com email) para backoffice; lead tipo `GAME_NEUROLINGUISTIC` ou similar | Pendente |

### Fase 2: NFTs (estimativa: 1 semana)

| # | Ação | Detalhe | Status |
|---|------|---------|--------|
| 1 | Smart contract Solidity | Certificado de Exploração (tipos Quente/Curioso/Iniciante) | Pendente |
| 2 | Deploy na Polygon | Rede escolhida no doc (custo baixo) | Pendente |
| 3 | Sistema de minting | Mint após conclusão do game conforme score | Pendente |
| 4 | Design dos NFTs | Arte + metadados (nome, score, data, sistema, intenção) | Pendente |
| 5 | Integração com game | Após “fim do game”, oferta de mint; opcional: carteira (não obrigatória) | Pendente |

### Fase 3: Qualificação automática (estimativa: 3 dias)

| # | Ação | Detalhe | Status |
|---|------|---------|--------|
| 1 | API que analisa resultado do game | Já existe em parte: `api/game/neurolinguistic` | Parcial (backoffice) |
| 2 | Classificação Quente/Frio | Garantir que score e rótulo cheguem ao CRM/backoffice | Pendente (fluxo site→backoffice) |
| 3 | Sugestão de abordagem | IA retorna texto empático; exibir no game e/ou guardar no lead | Pendente |
| 4 | Notificação para equipe | Lead criado → n8n / email (como em LEADS_JOGO_EMPATHY_ENGINE) | Pendente |

---

## 🎯 3. Outras ações de “game” / neuro do plano

Estas aparecem em `RESUMO_COMPLETO_TUDO_QUE_VAMOS_FAZER.md`, `PONTO_ATUAL_E_PLANO_CURTO_MEDIO_LONGO_2026.md` e relacionados.

### 3.1 Micro-game interativo / onboarding neurocientífico (Semanas 5–7 do resumo)

- **O que era:** Game “viciante” no início do site, com **neurociência** (dopamina, progresso, recompensas), captura de interesse real, integração com n8n.
- **Como encaixa:** Pode ser:
  - a **entrada** para o Game Neurolinguístico (“Explorador de Mundos”), ou
  - uma **versão curta** do mesmo (primeiras perguntas + recompensa imediata), ou
  - o **Empathy Engine** já cumprindo parte desse papel (e evoluir com mais recompensas/feedback neuro).
- **Ações a definir:** Onde colocar no site (hero, bloco “Ativação de marca”, CTA “Jogue”), duração (2–3 min), e como cruzar com o Game Neurolinguístico (se for produto único ou dois fluxos).

### 3.2 Game Empathy Engine — melhorias já listadas (plano médio/longo)

- Botão **“Entregar”** (submit final).
- **Highlight de combos**, **som**, **painel pós-fase**.
- **Telemetria** (eventos para analytics).
- **i18n** completo (4 idiomas).
- **Acessibilidade** (teclado, leitores de tela).

Doc: `PLANO-EVOLUCAO-V1.1` / MAPEAMENTO §3.

### 3.3 Vancouver — quiz “Qual escola?”

- Quiz “Qual escola?” na página Vancouver (VFS vs VanArts).
- Pode ser **independente** do Game Neurolinguístico; se quiser, pode reutilizar padrão de “perguntas + perfil” para qualificação de lead (curso Vancouver).

Doc: `PONTO_ATUAL_E_PLANO_CURTO_MEDIO_LONGO_2026.md` (extras Vancouver).

### 3.4 Web3/NFT (futuro)

- Carteira opcional, certificados, badges.
- Conectar com **NFT do Game Neurolinguístico** (Explorador Quente/Curioso/Iniciante) quando Fase 2 estiver pronta.

Doc: MAPEAMENTO §10, RESUMO_COMPLETO (Semana 13+).

---

## 📋 4. Resumo: o que precisa “entrar” e em que ordem sugerida

| Prioridade | Ação | Onde está no plano | Próximo passo |
|------------|------|--------------------|---------------|
| 1 | **Game Neurolinguístico – Fase 1** (componente React + perguntas + scoring + IA + salvar lead) | GAME_NEUROLINGUISTICO_LEADS.md § Implementação | Criar rota e componente no site; integrar com `api/game/neurolinguistic` e CRUD de leads no backoffice |
| 2 | **Qualificação automática** (classificação Quente/Frio, notificação equipe, n8n) | Fase 3 do mesmo doc | Definir payload lead “game neuro”; n8n branch para esse tipo |
| 3 | **Evolução para “game com movimento/ação”** (stealth assessment) | Conversas + doc | Pesquisa de UX/design: minigame (cliques, tempo, caminhos) → padrões NL; depois especificar telas e eventos |
| 4 | **NFTs do Explorador** (Solidity, Polygon, minting, design) | Fase 2 do doc | Após Fase 1 estável; smart contract + arte + integração no fim do game |
| 5 | **Empathy Engine:** “Entregar”, combos, som, painel pós-fase, telemetria, i18n | Plano médio/longo | Sprint de melhorias no azimut-empathy-engine e no site |
| 6 | **Vancouver quiz “Qual escola?”** | Extras Vancouver | Página Vancouver: componente de quiz + opcional lead/curso |
| 7 | **Micro-game / onboarding neuro** no início do site | RESUMO_COMPLETO Semanas 5–7 | Decisão: é o próprio Game Neurolinguístico encurtado ou um bloco separado; depois implementar entrada (hero ou bloco) |

---

## 📂 Referências rápidas

- **Game Neurolinguístico (conteúdo e fases):** `docs/GAME_NEUROLINGUISTICO_LEADS.md`
- **API backoffice:** `azimut-cms/app/api/game/neurolinguistic/route.ts`
- **Roadmap backoffice (game neuro):** `azimut-cms/app/admin/roadmap/web3-strategy/page.tsx` (seção Game Neurolinguístico)
- **Empathy Engine (objetivos e links):** `docs/OBJETIVOS_GAME_EMPATHY_ENGINE.md`
- **Leads do jogo (fluxo atual):** `docs/LEADS_JOGO_EMPATHY_ENGINE.md`
- **Plano geral curto/médio/longo:** `docs/PONTO_ATUAL_E_PLANO_CURTO_MEDIO_LONGO_2026.md`
- **Resumo “tudo que vamos fazer”:** `docs/resumos/RESUMO_COMPLETO_TUDO_QUE_VAMOS_FAZER.md`

---

**Atualizado:** fevereiro 2026.  
**Objetivo do doc:** Ter uma única referência para “o que era o game neurolinguístico e outras ações” e “como e em que ordem implementar”.
