# ═══════════════════════════════════════════════════════════════
# REGRAS DE DESIGN - TEMA CLARO AZIMUT
# ═══════════════════════════════════════════════════════════════

**Data:** Janeiro 2026  
**Status:** REGRAS DEFINITIVAS - SEMPRE SEGUIR  
**Aplicação:** Todas as páginas e componentes no tema claro

---

## 🚫 REGRAS ABSOLUTAS - NUNCA VIOLAR

### 1. **TEXTO CLARO/BRANCO EM FUNDO CLARO**
❌ **NUNCA:** Texto branco (#ffffff) ou texto claro (bege, cinza claro) sobre fundo claro (bege, branco)  
✅ **SEMPRE:** Texto escuro (#0f172a, #1a1a1a) sobre fundo claro

**Razão:** Contraste insuficiente, ilegível, viola WCAG AA/AAA

### 2. **TEXTO ESCURO EM CARDS ESCUROS**
❌ **NUNCA:** Texto escuro (preto, azul marinho) sobre fundo escuro (cards escuros, fundos escuros)  
✅ **SEMPRE:** Texto claro (#d3cec3, #ffffff) sobre fundo escuro

**Razão:** Contraste insuficiente, ilegível, viola WCAG AA/AAA

### 3. **CARDS BRANCOS/CLAROS EM FUNDO CLARO**
❌ **NUNCA:** Cards brancos ou claros sobre fundo bege/claro (sem contraste suficiente)  
✅ **SEMPRE:** 
- Cards escuros (com texto claro) sobre fundo claro, OU
- Cards com borda forte e sombra para separação visual, OU
- Cards com fundo ligeiramente diferente do background

**Razão:** Cards desaparecem visualmente, sem hierarquia, experiência ruim

---

## ✅ PRINCÍPIOS DE DESIGN

### Contraste Mínimo (WCAG)
- **Textos normais:** Mínimo 4.5:1 (WCAG AA)
- **Textos grandes (18pt+):** Mínimo 3:1 (WCAG AA)
- **Ideal:** 7:1 ou superior (WCAG AAA)

### Hierarquia Visual
- **Fundos claros:** Texto escuro
- **Fundos escuros:** Texto claro
- **Cards escuros:** Sempre texto claro (mesmo em tema claro)
- **Cards claros:** Sempre texto escuro (se usado)

---

## 🎨 APLICAÇÃO PRÁTICA

### Fundo Principal (Tema Claro)
- **Cor atual:** #c5c0b5 (Bege)
- **Avaliação:** Pode estar muito escuro - pesquisar referências
- **Texto sobre fundo:** SEMPRE escuro (#0f172a, #1a1a1a)

### Cards Escuros (Tema Claro)
- **Fundo:** linear-gradient(135deg, #0a0f1a 0%, #1a1f2e 100%)
- **Texto:** SEMPRE claro (#d3cec3, #ffffff)
- **Usar quando:** Destaque, hierarquia, identidade visual

### Cards Claros (se usado)
- **Fundo:** Branco ou bege muito claro
- **Texto:** SEMPRE escuro (#0f172a)
- **Borda/Sombra:** Necessária para separação visual
- **Nota:** Preferir cards escuros quando possível

---

## 📋 CHECKLIST DE VALIDAÇÃO

Antes de implementar qualquer elemento no tema claro:

- [ ] Texto claro/branco sobre fundo claro? ❌ PROIBIDO
- [ ] Texto escuro sobre card escuro? ❌ PROIBIDO
- [ ] Card branco/claro sobre fundo claro? ❌ PROIBIDO (sem separação adequada)
- [ ] Contraste mínimo 4.5:1? ✅ VERIFICAR
- [ ] Hierarquia visual clara? ✅ VERIFICAR
- [ ] Identidade Azimut preservada? ✅ VERIFICAR

---

## 🔍 REFERÊNCIAS E PESQUISA

- Sites premium analisados: Framestore, Cinesite, MPC, The Mill, Gravity Sketch, Oculus
- Padrões WCAG 2.1 AA/AAA
- Design System Azimut

---

**Última Atualização:** Janeiro 2026  
**Status:** ATIVO - Sempre seguir estas regras