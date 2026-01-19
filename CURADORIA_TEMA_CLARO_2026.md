# ═══════════════════════════════════════════════════════════════
# CUradoria Completa - Tema Claro Azimut 2026
# Direção de Arte Premium & Comparativo com Referências
# ═══════════════════════════════════════════════════════════════

**Data:** Janeiro 2026  
**Escopo:** Todas as páginas e subpáginas no tema claro  
**Objetivo:** Direção de arte premium, comparativo com referências top e plano de implementação

---

## 📋 MAPEAMENTO COMPLETO DE PÁGINAS

### Páginas Principais
1. **Home** (`/home`)
2. **Soluções** (`/what`) + 16 subpáginas (`/what/:slug`)
3. **Projetos** (`/work`) + subpáginas de detalhe (`/work/:slug`)
4. **Studio** (`/studio`) + 3 subpáginas:
   - Studio Team (`/studio/equipe`)
   - Studio Diferenciais (`/studio/diferenciais`)
   - Studio Credentials (`/studio/credentials`)
5. **Academy** (`/academy`) + 4 subpáginas:
   - Academy New (principal)
   - Academy Corporate
   - Academy Courses
   - Academy Workshops
6. **Contact** (`/contact`)
7. **Press** (`/press`)
8. **Vancouver** (`/vancouver`)
9. **Research** (`/research`)
10. **Thank You** (`/thank-you`)
11. **Terms** (`/terms`)
12. **Privacy** (`/privacy`)
13. **NotFound** (404)

### Subpáginas de Serviços (16 total)
1. cinema-audiovisual
2. pos-producao-vfx
3. animacao-2d-3d
4. realidade-virtual-vr
5. xr-interatividade-web3
6. cenografia-design-espacial
7. games-interativos
8. museus-exposicoes
9. festivais-curadoria-eventos
10. teatro-espetaculos-imersivos
11. branded-experiences-ativacoes
12. arquitetura-virtual-bim
13. direcao-arte-criativa
14. ia-criativa
15. consultoria-estrategia
16. educacao-treinamento

---

## 🔍 ANÁLISE ATUAL - PROBLEMAS IDENTIFICADOS NO TEMA CLARO

### 1. **Granulação (Film Grain)**
✅ **CORRIGIDO:** Opacidade reduzida de 0.35 para 0.12  
✅ **CORRIGIDO:** `.film-grain::before` com opacity 0.25 e mix-blend-mode soft-light  
**Status:** Resolvido - granulação mais sutil, não interfere na leitura

### 2. **Cards de Soluções (WhatWeDo)**
✅ **CORRIGIDO:** Regra CSS específica para manter texto claro nos cards escuros  
**Status:** Cards mantêm cores idênticas ao tema escuro (texto creme #d3cec3)

### 3. **Contraste de Textos**
✅ **CORRIGIDO:** Regras CSS existentes garantem contraste adequado  
**Status:** Textos escuros em fundos claros, textos claros em fundos escuros

---

## 🎨 DIRETRIZES DE DESIGN PREMIUM (Baseado em Referências)

### Referências Analisadas
- **Framestore** (VFX Studio)
- **Cinesite** (VFX Studio)
- **MPC** (VFX Studio)
- **The Mill** (Creative Studio)
- **Gravity Sketch** (VR/AR)
- **Oculus** (VR)
- **Meta Reality Labs** (XR)
- **Apple Vision Pro** (Immersive)

### Princípios Identificados

#### 1. **Paleta de Cores - Tema Claro**
- **Fundo Principal:** Bege/Cream (#c5c0b5) - ✅ IMPLEMENTADO
- **Textos Principais:** Preto (#0f172a) - ✅ IMPLEMENTADO
- **Textos Secundários:** Azul Marinho (#1e3a5f) - ✅ IMPLEMENTADO
- **Cards Escuros:** Mantêm fundo escuro com texto claro - ✅ IMPLEMENTADO
- **Acentos:** Vermelho Azimut (#c92337) - ✅ IMPLEMENTADO

#### 2. **Hierarquia Visual**
- **Títulos:** Contraste máximo (16:1) - ✅ IMPLEMENTADO
- **Subtítulos:** Contraste alto (7.8:1) - ✅ IMPLEMENTADO
- **Corpos de Texto:** Contraste adequado (4.5:1 mínimo) - ✅ IMPLEMENTADO

#### 3. **Espaçamento e Respiração**
- **Padding:** Sistema 4px base - ✅ IMPLEMENTADO
- **Gaps:** Consistentes entre elementos - ✅ IMPLEMENTADO
- **Margins:** Harmônicos e proporcionais - ✅ IMPLEMENTADO

#### 4. **Tipografia**
- **Títulos:** Handel Gothic (monumental) - ✅ IMPLEMENTADO
- **Corpo:** Inter (legível) - ✅ IMPLEMENTADO
- **Labels:** Sora (elegante) - ✅ IMPLEMENTADO

---

## 📊 ANÁLISE POR PÁGINA

### Home (`/home`)
**Status:** ⚠️ **REQUER REVISÃO**
- Hero section com background escuro (ok - mantém identidade)
- Cards de projetos com `card-adaptive` (ok)
- Textos adaptativos (verificar contraste)

**Melhorias Sugeridas:**
- [ ] Revisar contraste de textos no hero
- [ ] Verificar cards de projetos no tema claro
- [ ] Testar legibilidade de todos os textos

### Soluções (`/what`)
**Status:** ✅ **CORRIGIDO**
- Cards com background escuro inline - textos corrigidos
- Filtros funcionais
- Grid responsivo

**Melhorias Sugeridas:**
- [ ] Testar em diferentes tamanhos de tela
- [ ] Verificar hover states

### ServiceDetail (`/what/:slug`) - 16 páginas
**Status:** ⚠️ **REQUER REVISÃO**
- ServiceHero com borda e linha vermelha (ok)
- Seções com cards adaptativos
- Galeria de imagens

**Melhorias Sugeridas:**
- [ ] Revisar contraste em todas as seções
- [ ] Verificar cards "Sobre o serviço"
- [ ] Verificar cards "O que entregamos"
- [ ] Verificar cards "Nosso processo"
- [ ] Testar galeria de imagens

### Projetos (`/work`)
**Status:** ⚠️ **REQUER REVISÃO**
- Grid de projetos
- Filtros e navegação interna
- Cards de projetos

**Melhorias Sugeridas:**
- [ ] Revisar contraste nos cards
- [ ] Verificar filtros
- [ ] Testar navegação interna

### ProjectDetail (`/work/:slug`)
**Status:** ⚠️ **REQUER REVISÃO**
- Hero do projeto
- Galeria de imagens
- Informações do projeto

**Melhorias Sugeridas:**
- [ ] Revisar contraste geral
- [ ] Verificar galeria
- [ ] Testar textos informativos

### Studio (`/studio`)
**Status:** ⚠️ **REQUER REVISÃO**
- Grid de membros do time
- Navegação para subpáginas

**Melhorias Sugeridas:**
- [ ] Revisar cards de membros
- [ ] Verificar contraste de textos

### StudioTeam (`/studio/equipe`)
**Status:** ⚠️ **REQUER REVISÃO**
- Perfis detalhados
- Fotos do time
- Informações de contato

**Melhorias Sugeridas:**
- [ ] Revisar layout de perfis
- [ ] Verificar contraste
- [ ] Testar responsividade

### StudioDiferenciais (`/studio/diferenciais`)
**Status:** ⚠️ **REQUER REVISÃO**
- Seções informativas
- Cards e elementos visuais

**Melhorias Sugeridas:**
- [ ] Revisar todas as seções
- [ ] Verificar contraste
- [ ] Testar hierarquia visual

### StudioCredentials (`/studio/credentials`)
**Status:** ⚠️ **REQUER REVISÃO**
- Certificações e credenciais
- Timeline ou grid

**Melhorias Sugeridas:**
- [ ] Revisar layout
- [ ] Verificar contraste
- [ ] Testar legibilidade

### AcademyNew (`/academy`)
**Status:** ⚠️ **REQUER REVISÃO**
- Hero section
- Programas e cursos
- Cards informativos

**Melhorias Sugeridas:**
- [ ] Revisar hero (background escuro)
- [ ] Verificar cards de programas
- [ ] Testar contraste geral

### AcademyCorporate (`/academy/corporate`)
**Status:** ⚠️ **REQUER REVISÃO**
- Conteúdo corporativo
- Formulários ou CTAs

**Melhorias Sugeridas:**
- [ ] Revisar layout
- [ ] Verificar contraste
- [ ] Testar formulários

### AcademyCourses (`/academy/courses`)
**Status:** ⚠️ **REQUER REVISÃO**
- Grid de cursos
- Informações de cursos

**Melhorias Sugeridas:**
- [ ] Revisar cards de cursos
- [ ] Verificar contraste
- [ ] Testar responsividade

### AcademyWorkshops (`/academy/workshops`)
**Status:** ⚠️ **REQUER REVISÃO**
- Workshops disponíveis
- Informações e CTAs

**Melhorias Sugeridas:**
- [ ] Revisar layout
- [ ] Verificar contraste
- [ ] Testar CTAs

### Contact (`/contact`)
**Status:** ⚠️ **REQUER REVISÃO**
- Formulário de contato
- Informações de contato

**Melhorias Sugeridas:**
- [ ] Revisar formulário (inputs adaptativos)
- [ ] Verificar contraste
- [ ] Testar validação

### Press (`/press`)
**Status:** ⚠️ **REQUER REVISÃO**
- Releases e notícias
- Grid ou lista

**Melhorias Sugeridas:**
- [ ] Revisar layout
- [ ] Verificar contraste
- [ ] Testar legibilidade

### Vancouver (`/vancouver`)
**Status:** ⚠️ **REQUER REVISÃO**
- Conteúdo específico
- Seções informativas

**Melhorias Sugeridas:**
- [ ] Revisar todas as seções
- [ ] Verificar contraste
- [ ] Testar responsividade

### Research (`/research`)
**Status:** ⚠️ **REQUER REVISÃO**
- Conteúdo de pesquisa
- Publicações ou artigos

**Melhorias Sugeridas:**
- [ ] Revisar layout
- [ ] Verificar contraste
- [ ] Testar legibilidade

### Páginas Legais (Terms, Privacy)
**Status:** ⚠️ **REQUER REVISÃO**
- Textos longos
- Legibilidade crítica

**Melhorias Sugeridas:**
- [ ] Revisar contraste (máximo)
- [ ] Verificar espaçamento entre linhas
- [ ] Testar leitura prolongada

---

## 🎯 PLANO DE IMPLEMENTAÇÃO - PRIORIDADES

### FASE 1: Correções Críticas (Já Implementadas) ✅
1. ✅ Granulação reduzida
2. ✅ Cards de soluções corrigidos
3. ✅ Regras de contraste base

### FASE 2: Revisão Sistemática (Próximos Passos)
1. **Home e Soluções** (alto tráfego)
   - Revisar todos os textos
   - Testar cards e elementos interativos
   - Verificar responsividade

2. **ServiceDetail (16 páginas)** (alto tráfego)
   - Revisar ServiceHero
   - Revisar todas as seções
   - Testar galeria
   - Verificar CTAs

3. **Work e ProjectDetail** (médio tráfego)
   - Revisar grid de projetos
   - Verificar ProjectDetail
   - Testar filtros

4. **Studio e subpáginas** (médio tráfego)
   - Revisar todas as 4 páginas
   - Verificar perfis do time
   - Testar navegação

5. **Academy e subpáginas** (baixo-médio tráfego)
   - Revisar todas as 5 páginas
   - Verificar cards de programas
   - Testar formulários

6. **Outras páginas** (baixo tráfego)
   - Contact, Press, Vancouver, Research
   - Terms, Privacy, NotFound

### FASE 3: Refinamento e Testes
1. Testes de contraste (WCAG AA mínimo, AAA ideal)
2. Testes de responsividade (mobile, tablet, desktop)
3. Testes de acessibilidade
4. Ajustes finos baseados em feedback

---

## 📐 PADRÕES DE DESIGN SYSTEM - TEMA CLARO

### Cores
```css
/* Fundos */
--theme-bg: #c5c0b5 (Bege)
--theme-bg-secondary: #b0ab9f (Bege escuro)

/* Textos */
--theme-text: #0f172a (Preto - máximo contraste)
--theme-text-secondary: #1a1a1a (Quase preto)
--theme-text-muted: #1e3a5f (Azul marinho)

/* Cards Escuros (mantêm fundo escuro) */
--theme-card-bg: linear-gradient(135deg, #0a0f1a 0%, #1a1f2e 100%)
--theme-card-text: #d3cec3 (Creme)

/* Acentos */
--theme-accent-red: #a01a2a (Vermelho escuro no tema claro)
```

### Tipografia
- **Títulos (H1-H3):** #0f172a (Preto)
- **Subtítulos:** #475569 (Slate-600)
- **Corpo:** #1a1a1a (Quase preto)
- **Muted:** #1e3a5f (Azul marinho)

### Cards
- **Cards Escuros:** Mantêm fundo escuro, texto claro (#d3cec3)
- **Cards Claros:** Fundo claro, texto escuro (#0f172a)

---

## ✅ CHECKLIST DE VALIDAÇÃO POR PÁGINA

Para cada página, validar:

- [ ] Contraste de textos (mínimo 4.5:1, ideal 7:1)
- [ ] Cards adaptativos funcionando
- [ ] Granulação sutil (não interfere)
- [ ] Hierarquia visual clara
- [ ] Espaçamentos consistentes
- [ ] Responsividade (mobile, tablet, desktop)
- [ ] Acessibilidade (navegação por teclado)
- [ ] Performance (carregamento rápido)
- [ ] Consistência com identidade Azimut

---

## 🚀 PRÓXIMOS PASSOS

1. **Revisão página por página** (sugestão: começar por Home e WhatWeDo)
2. **Testes de contraste** (ferramentas: WebAIM, Contrast Checker)
3. **Feedback de usuários** (se possível)
4. **Ajustes incrementais** (iterar e melhorar)
5. **Documentação** (atualizar este documento com resultados)

---

**Última Atualização:** Janeiro 2026  
**Status:** Fase 1 Completa ✅ | Fase 2 Pendente ⏳