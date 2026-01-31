# Azimut • Empathy Engine — Plano de Evolução v1.1 (Consolidado)

**Data:** 31/01/2026  
**Fontes:** Documentação consolidada do projeto + análise Gemini + prioridades de implementação.

O núcleo do projeto é **converter o portfólio técnico da Azimut em uma experiência lúdica** que educa o cliente e qualifica leads através de decisões criativas.

---

## 1. Diagnóstico do Estado Atual

### Estrutura atual
- **4 fases:** Sentir → Conectar → Sincronizar → Transformar
- **Sistema:** raridade (common → mythic), combos fixos por tópico, briefs com surpresas
- **Stack:** React, TypeScript, Vite, Zustand, Framer Motion, @dnd-kit

### Riscos identificados (Gemini + time)

| Risco | Descrição | Mitigação no plano |
|-------|-----------|--------------------|
| **Desequilíbrio de conteúdo** | Cultura & Museus com poucas cartas dedicadas → repetição precoce | Expansão para 12+ dedicadas + cartas ponte |
| **Dificuldade punitiva** | Fase 4: meta alta (1000 pts) + pouco tempo (30s) → frustração | Metas/tempos suavizados + garantias de pool |
| **Feedback insuficiente** | Falta destaque imediato ao ativar combos → jogador não sente recompensa | Highlight em tempo real + animação/som ao ativar combo |

---

## 2. Status de Implementação (Snapshot)

### ✅ Já implementado (v1.1)

| Item | Detalhe |
|------|---------|
| **Balanceamento** | Fase 1: 200 pts / 20s • Fase 2: 350 pts / 30s • Fase 3: 550 pts / 40s • Fase 4: **800 pts / 45s** |
| **Garantia de combo** | Algoritmo assegura pelo menos 1 combo (2+ cartas) possível no pool de 18 |
| **Garantia de raridade** | Pelo menos 1 carta Rare+ em cada pool |
| **Refresh limitado** | 1 reroll por fase (botão "Trocar cartas" — troca 6 cartas) |
| **Pity system** | Após 3 derrotas: +5s e +1 carta Rare garantida no próximo pool |
| **Novo tópico** | Tecnologia & Consultoria (Figma, IA generativa, BIM, Consultoria, etc.) |
| **Expansão Cultura & Museus** | Storytelling Museal, CMS Acervo, Expografia, Mediação, Totem, Rouanet, etc. |
| **Cartas ponte** | Virtual Production, Runway ML, ARKit/ARCore, DMX/ArtNet, etc. |
| **Novos elementos** | 33+ novos (Produção AV, XR/VR, Eventos, Cultura, Tech & Consultoria) |
| **Novos combos** | IA Filmmaking, Virtual Production, Museu Híbrido, Dados Decidem, etc. |
| **Novos briefs** | Híbridos + Tech & Consultoria (O Futuro do Museu, Festival VR, Marca Premium 2026, etc.) |
| **Modo sem tempo** | Opção em Configurações (checkbox) para jogar sem timer |

### ⏳ Pendente (prioridades unificadas)

As prioridades abaixo **juntam** as pendências do time com as diretrizes da análise Gemini.

---

## 3. Plano de Ação Consolidado (4 Ciclos)

### Ciclo 0 — Ajustes rápidos (prioridade imediata)

| # | Ação | Descrição | Status |
|---|------|-----------|--------|
| 0.1 | **Botão "Entregar"** | Permitir passar de fase ao atingir a meta (ou entregar antes do tempo), não só quando o tempo acaba | ⏳ Pendente |
| 0.2 | **Feedback visual de combo em tempo real** | Ao arrastar uma carta, destacar (highlight) as outras que formam combo com ela (`getCompatibleCombos` já existe no store) | ⏳ Pendente |
| 0.3 | **Dopamina ao ativar combo** | Animação curta de "punch" + som opcional ao formar combo (com opt-out para acessibilidade) | ⏳ Pendente |

**Meta do Ciclo 0:** Jogo mais justo (já feito) + jogador **sentir** a recompensa ao ativar combos.

---

### Ciclo 1 — Conteúdo e variedade

| # | Ação | Descrição | Status |
|---|------|-----------|--------|
| 1.1 | Tópico Tecnologia & Consultoria | Ativado com elementos, combos e briefs | ✅ Feito |
| 1.2 | Cartas ponte | Virtual Production, Runway ML, ARKit/ARCore, DMX/ArtNet, etc. | ✅ Feito |
| 1.3 | Expansão Cultura & Museus | Mín. 12 cartas dedicadas (curadoria, acervo, acessibilidade, expografia, mediação) | ✅ Feito |
| 1.4 | Briefs híbridos | Museu + Web + VR; Evento + LED + AR; Educação + Carreira | ✅ Feito |

**Meta do Ciclo 1:** Mitigar repetição e cobrir lacunas do portfólio. **Concluído.**

---

### Ciclo 2 — Engajamento e progressão

| # | Ação | Descrição | Status |
|---|------|-----------|--------|
| 2.1 | **Painel pós-fase** | Ao terminar cada fase: combos ativados, oportunidades perdidas, 1 sugestão de melhoria | ⏳ Pendente |
| 2.2 | **Near-miss / Segunda Chance** | Se perder por &lt; 50 pts: oferecer "Segunda Chance" (1x/dia) com +5s e dica de combo | ⏳ Pendente |
| 2.3 | **Sistema de maestria** | Aprendiz → Visionário → Maestro; níveis com desbloqueios e cosméticos | ⏳ Pendente |
| 2.4 | **Badges** | Conquistas por combos, vitórias, tópicos explorados (`progressionStore.badges` já existe) | ⏳ Pendente |
| 2.5 | **Coleção de elementos** | % de completude por tópico (quantos elementos o jogador já usou/desbloqueou) | ⏳ Pendente |
| 2.6 | **Desafios diários/semanais** | Brief raro com recompensa; limite saudável para evitar fadiga | ⏳ Pendente |
| 2.7 | **Power-ups com efeito real** | Raio-X: revelar sinergias (highlight). Ímã: hint ou garantia de combo no pool | ⏳ Pendente |

**Meta do Ciclo 2:** Retenção ("só mais uma rodada") e sensação de progresso.

---

### Ciclo 3 — Dados, UX e produto

| # | Ação | Descrição | Status |
|---|------|-----------|--------|
| 3.1 | **Telemetria** | Eventos: start, pick, drop, combo, reroll, win, lose, quit (para ajustes e conversão via n8n) | ⏳ Pendente |
| 3.2 | **Acessibilidade completa** | Teclado funcional, targets mín. 44px, modo alto contraste, opção daltonismo | ⏳ Pendente |
| 3.3 | **i18n (PT/EN)** | Troca de idioma no jogo; uso de `nameEn` nos elementos | ⏳ Pendente |
| 3.4 | **Validação e testes** | Zod nos dados; testes simples de regras/combos | ⏳ Pendente |

**Meta do Ciclo 3:** Iterar com dados e padrão premium de acessibilidade.

---

## 4. Diretrizes de UX e Acessibilidade (Gemini)

Para atingir o padrão **Premium**:

| Diretriz | Implementação |
|----------|---------------|
| **Dopamina** | Animações curtas de "punch" e sons ao ativar combos (Ciclo 0) |
| **Teclado funcional** | Navegação completa por teclado (Ciclo 3) |
| **Targets 44px** | Áreas clicáveis com mínimo 44px (Ciclo 3) |
| **Modo sem tempo** | Já existe em Configurações ✅ |
| **Alto contraste / daltonismo** | Opções em Configurações (Ciclo 3) |
| **Near-miss** | Segunda Chance diária se perder por &lt; 50 pts (Ciclo 2) |

---

## 5. Resumo Executivo

- **Ciclo 0:** Foco em **feedback imediato** (Entregar + highlight de combo + animação/som).  
- **Ciclo 1:** Conteúdo e variedade **concluídos**.  
- **Ciclo 2:** Engajamento (painel pós-fase, Segunda Chance, maestria, badges, coleção, desafios, power-ups úteis).  
- **Ciclo 3:** Dados (telemetria), acessibilidade completa, i18n e qualidade (Zod, testes).

Este planejamento unificado transforma o Empathy Engine em ferramenta robusta de **marketing estratégico e qualificação de leads**, alinhando diversão com a autoridade técnica da Azimut.

---

## 6. Checklist Rápido (próximos passos)

- [ ] Botão "Entregar" na GameScreen  
- [ ] Highlight de cartas compatíveis ao arrastar (usar `getCompatibleCombos`)  
- [ ] Animação + som ao ativar combo (com opt-out)  
- [ ] Painel pós-fase (combos ativados + sugestão)  
- [ ] Segunda Chance (near-miss &lt; 50 pts, 1x/dia)  
- [ ] Maestria + badges + coleção + desafios diários  
- [ ] Power-ups Raio-X e Ímã com efeito real  
- [ ] Telemetria (eventos mínimos)  
- [ ] Acessibilidade (teclado, 44px, alto contraste, daltonismo)  
- [ ] i18n PT/EN no jogo  
- [ ] Validação Zod + testes  
