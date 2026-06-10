# 🔍 DIAGNÓSTICO: PROBLEMAS DE CONTRASTE NO TEMA CLARO

## 📋 PROBLEMAS IDENTIFICADOS (Análise das Imagens)

### ❌ PROBLEMA 1: Texto branco sobre fundo bege
- **Onde**: Home, WhatWeDo, várias seções
- **Esperado**: Texto escuro (#0d0d0d ou #1a1a1a)
- **Atual**: Texto branco/claro
- **Impacto**: Leitura impossível

### ❌ PROBLEMA 2: Azul bebê não convertido
- **Onde**: Links, meta informações (ex: "2025", "Rio de Janeiro, BR", "MUSEUM_DIRECTION")
- **Esperado**: Azul marinho (#1e3a5f)
- **Atual**: Azul claro/bebê
- **Impacto**: Baixo contraste

### ❌ PROBLEMA 3: Cards escuros com texto escuro
- **Onde**: Alguns cards que deveriam manter texto claro
- **Esperado**: Texto claro (#d3cec3) em cards escuros
- **Atual**: Pode estar sendo forçado para escuro
- **Impacto**: Inversão incorreta

## 🔎 CAUSAS PROVÁVEIS

### 1. Especificidade CSS Insuficiente
```css
/* PROBLEMA: Seletores muito genéricos */
[data-theme="light"] .text-white { color: var(--theme-text) !important; }

/* SOLUÇÃO: Precisa ser mais específico e excluir cards */
```

### 2. Variáveis CSS Não Atualizadas
```css
/* PROBLEMA: Variáveis podem não estar sendo aplicadas corretamente */
--theme-text: #0d0d0d; /* No [data-theme="light"] */

/* Mas os componentes podem estar usando classes diretas em vez de variáveis */
```

### 3. Classes Tailwind Sobrescrevendo
```tsx
/* PROBLEMA: Classes Tailwind têm alta especificidade */
<h1 className="text-white">  {/* Sobrescreve tudo */}

/* SOLUÇÃO: Usar style inline ou remover classe completamente */
```

### 4. Ordem de Aplicação CSS
- Regras de correção podem estar sendo carregadas ANTES das regras base
- Tailwind pode estar gerando classes que sobrescrevem

## 🎯 LÓGICA CORRETA

### Regra Geral (Tema Claro):
```
FUNDO BEGE (body, sections normais)
  → TEXTO ESCURO (#0d0d0d, #1a1a1a)

FUNDO ESCURO (cards, .card-adaptive, .card-dark-*)
  → TEXTO CLARO (#d3cec3, #ffffff)

BOTÃO VERMELHO (bg-azimut-red)
  → TEXTO BRANCO (sempre)

AZUL CLARO (text-blue-*, text-sky-*, text-slate-500)
  → AZUL MARINHO (#1e3a5f)
```

## 🛠️ PLANO DE CORREÇÃO

### FASE 1: Limpar regras conflitantes
1. Remover !important desnecessários
2. Aumentar especificidade dos seletores
3. Usar `html[data-theme="light"]` em vez de `[data-theme="light"]`

### FASE 2: Aplicar regras por camada
1. Base (variáveis CSS)
2. Utilitários gerais
3. Componentes específicos
4. Exceções (cards escuros, botões)

### FASE 3: Substituir classes Tailwind por variáveis
1. `text-white` → `style={{ color: 'var(--theme-text)' }}`
2. `text-slate-300` → `style={{ color: 'var(--theme-text-secondary)' }}`
3. Manter classes apenas em cards escuros

### FASE 4: Testes específicos
1. Home page (fundo bege)
2. ProjectDetail (fundo bege + cards escuros)
3. WhatWeDo (cards escuros)
4. Botões vermelhos

## 📊 CHECKLIST DE VERIFICAÇÃO

- [ ] Texto corrido sobre fundo bege = ESCURO
- [ ] Títulos sobre fundo bege = ESCURO
- [ ] Meta info (data, local) = AZUL MARINHO
- [ ] Texto em cards escuros = CLARO
- [ ] Botões vermelhos = texto BRANCO
- [ ] Links em breadcrumb = ESCURO com hover
- [ ] Pills/tags sobre fundo bege = ESCURO

## 🚨 AÇÃO IMEDIATA REQUERIDA

1. **Revisar `src/index.css`**:
   - Verificar se regras `[data-theme="light"]` existem
   - Aumentar especificidade
   - Adicionar `html` antes do seletor

2. **Revisar componentes principais**:
   - `Home.tsx` - remover `text-white` onde não deveria ter
   - `WhatWeDo.tsx` - verificar cards
   - `ProjectDetail.tsx` - meta informações

3. **Criar regra específica para azul**:
   - Forçar conversão de todos os azuis claros
   - Aplicar em elementos de meta informação

4. **Testar isoladamente**:
   - Um componente por vez
   - Verificar inspector do navegador
   - Confirmar que regras estão sendo aplicadas










