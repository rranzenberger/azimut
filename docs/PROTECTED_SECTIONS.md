# 🔒 Seções Protegidas do Código - Azimut Site

## ⚠️ ATENÇÃO: NÃO MODIFICAR SEM AUTORIZAÇÃO EXPLÍCITA

Este documento lista todas as seções do código que foram finalizadas e não devem ser modificadas ao usar outros modelos de IA ou fazer manutenções gerais.

---

## 📂 src/components/Layout.tsx

### 🔒 Menu de Navegação Desktop (Linhas ~88-233)

**Localização:** `<nav className="hidden items-center gap-1..."`

**Valores protegidos:**
```tsx
// Gap entre itens
gap-1, gap-1.5 (768px), gap-2 (md), gap-2.5 (lg), gap-3 (xl)

// Tamanhos de fonte
text-[0.48rem] (base + 768px)
text-[0.52rem] (md)
text-[0.58rem] (lg)
text-[0.62rem] (xl)

// Padding interno dos links
padding: '0 6px'

// Altura da barra vermelha ativa
h-[1px] (base)
h-[1.5px] (768px + md)
h-[2px] (lg + xl)

// Text-shadow item ativo (tema escuro)
text-shadow: 0 0 12px rgba(201, 35, 55, 0.7), 0 0 25px rgba(201, 35, 55, 0.4)

// Cor item ativo
color: #c92337
```

**Não alterar:**
- Lógica `shouldShowLine()`
- Estados `activeRoute` e `hoveredRoute`
- Estrutura dos 6 itens: Home, What, Work, Studio, Research, Academy

---

### 🔒 Seletor de Idiomas Desktop (Linhas ~245-320)

**Localização:** `<div className="hidden items-center gap-0 font-sora..."`

**Valores protegidos:**
```tsx
// Estrutura
🇨🇦 EN●FR | 🇧🇷 PT●ES

// Círculos entre idiomas
Caractere: ● (U+25CF - Black Circle)
mx-[2px]
text-[0.5rem] (base 768px)
text-[0.55rem] (768px)
text-[0.6rem] (md)
text-[0.65rem] (lg)

// Separador entre grupos
| (pipe)
mx-2 (desktop)
text-[0.5rem]
opacity-40

// Bandeiras
Canadá: mr-0.5
Brasil: mr-1

// Botões idiomas
minWidth: 18px
minHeight: 22px
padding: 0

// Cor ativo/hover
Ativo: #c92337, opacity: 1
Inativo: var(--theme-text-muted), opacity: 0.7
```

---

### 🔒 Menu Mobile (Linhas ~326-555)

**Localização:** Menu hamburguer e drawer lateral

**Valores protegidos:**
```tsx
// Hamburger - tema light
backgroundColor: #2a2825

// Hamburger - tema dark
backgroundColor: #d3cec3

// Idiomas mobile
Círculos: ●
mx-[2px]
text-[0.6rem] (base)
text-[0.65rem] (sm)

// Separador mobile
|
mx-3.5
text-[0.8rem]
opacity-50
```

---

### 🔒 Rodapé (Linhas ~524-705)

**Localização:** `<footer className="relative mt-20..."`

**Valores protegidos:**
```tsx
// Linha vermelha superior
h-[3px] bg-azimut-red (sólida, não gradiente)

// Background tema escuro
linear-gradient(180deg, #0a0e18 0%, #060a12 100%)

// Background tema claro
linear-gradient(180deg, #2a2825 0%, #1e1c1a 100%)

// Grid principal
grid-cols-1 (mobile)
grid-cols-12 (768px+)
gap-6 (mobile), gap-7 (sm), gap-3 (768px), gap-4 (md), gap-8 (lg)

// Colunas
Logo/descrição: col-span-3 (768px/md), col-span-4 (lg)
Contato/social: col-span-5 (768px/md/lg)
Navegação: col-span-2

// Ícones sociais
grid grid-cols-3 (mobile)
grid-cols-5 (768px+)
gap-2 (768px), gap-2.5 (md)

// Email
whiteSpace: 'nowrap'
wordBreak: 'keep-all'
overflowWrap: 'normal'
```

---

## 📂 src/pages/*.tsx - Estrela de Fundo

### 🔒 Todas as páginas (exceto 404)

**Arquivos:**
- Home.tsx (linha ~42-50)
- WhatWeDo.tsx (linha ~20-28)
- Work.tsx (linha ~20-28)
- Studio.tsx (linha ~221-229)
- Research.tsx (linha ~20-28)
- Academy.tsx (linha ~20-28)
- Contact.tsx (linha ~20-28)

**Valores protegidos:**
```tsx
// Estrutura
<div 
  className="pointer-events-none absolute -right-28 -bottom-40 h-[520px] w-[520px] md:-right-40 md:-bottom-60 md:h-[680px] md:w-[680px]" 
  style={{ 
    opacity: 0.3,
    zIndex: -5
  }}
>
  <img src="/logo-azimut-star.svg" alt="" className="h-full w-full object-contain" />
</div>

// Mobile
-right-28 -bottom-40
h-[520px] w-[520px]

// Desktop (md+)
-right-40 -bottom-60
h-[680px] w-[680px]

// Opacidade
0.3

// Z-index
-5
```

---

### 🔒 Página 404 (NotFound.tsx)

**Localização:** Linha ~50-58

**Valores protegidos:**
```tsx
// Posição central
absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2

// Tamanhos
h-[400px] w-[400px] (mobile)
h-[600px] w-[600px] (md+)

// Opacidade (mais suave que outras páginas)
0.15

// Z-index
-5
```

---

## 📂 src/index.css

### 🔒 Efeito Glow no Menu (Linhas ~339-375)

**Valores protegidos:**
```css
/* Hover padrão */
.nav-link-glow:hover {
  text-shadow: 0 0 25px rgba(201, 35, 55, 0.6), 0 0 50px rgba(201, 35, 55, 0.3);
}

.nav-link-glow:hover::before {
  background: radial-gradient(ellipse at center, rgba(201, 35, 55, 0.15) 0%, transparent 70%);
  opacity: 1;
}

/* Hover tema escuro (mais intenso) */
[data-theme="dark"] .nav-link-glow:hover {
  text-shadow: 0 0 12px rgba(201, 35, 55, 0.7), 0 0 25px rgba(201, 35, 55, 0.4);
}

[data-theme="dark"] .nav-link-glow:hover::before {
  background: radial-gradient(ellipse at center, rgba(201, 35, 55, 0.18) 0%, rgba(201, 35, 55, 0.08) 50%, transparent 70%);
  opacity: 1;
}
```

---

## 🎨 Cores Principais

### 🔒 Cor Azimut Red
```css
#c92337 (RGB: 201, 35, 55)
```

**Usado em:**
- Menu item ativo
- Idioma selecionado
- Linha abaixo do menu
- Linha superior do rodapé
- Links hover
- Botões CTA

**NÃO ALTERAR** esta cor em nenhum lugar!

---

## 📱 Breakpoints Responsivos

### 🔒 Breakpoints Tailwind + Custom

```
sm:   640px   (mobile grande)
min-[768px]:  768px   (iPad Mini/Air - CUSTOM)
md:   768px   (tablet padrão)
lg:   1024px  (desktop)
xl:   1280px  (desktop grande)
```

**IMPORTANTE:** O breakpoint `min-[768px]` foi adicionado especificamente para iPads e não deve ser removido!

---

## ✅ Checklist de Proteção

Antes de fazer qualquer mudança, verifique:

- [ ] A mudança afeta o menu de navegação?
- [ ] A mudança afeta o seletor de idiomas?
- [ ] A mudança afeta a estrela de fundo?
- [ ] A mudança afeta o rodapé?
- [ ] A mudança afeta as cores principais?
- [ ] A mudança afeta os breakpoints responsivos?

**Se a resposta for SIM para qualquer item, NÃO FAÇA A MUDANÇA sem autorização!**

---

## 🔄 Como Reverter Mudanças

Se algo for modificado por engano:

```bash
# Reverter arquivo específico
git checkout src/components/Layout.tsx

# Reverter todas as páginas
git checkout src/pages/*.tsx

# Reverter CSS
git checkout src/index.css

# Ver histórico de commits
git log --oneline

# Voltar para commit específico
git checkout <commit-hash> -- <arquivo>
```

---

## 📝 Histórico de Ajustes

### Menu e Navegação
- Ajustado espaçamento entre itens para todos os dispositivos
- Calibrado tamanho da barra vermelha proporcional ao texto
- Otimizado efeito glow para tema escuro

### Seletor de Idiomas
- Trocado de "·" para "●" (círculo mais redondo)
- Ajustado espaçamento: EN●FR e PT●ES bem próximos
- Separador "|" com espaços proporcionais
- Respiro maior na bandeira do Brasil

### Estrela de Fundo
- Adicionada em todas as 8 páginas
- Opacidade aumentada para melhor visibilidade
- Z-index ajustado para não interferir com conteúdo

### Rodapé
- Linha superior mudada de gradiente para sólida
- Colunas reorganizadas para melhor distribuição
- Email sem quebra de linha
- Ícones sociais em grid responsivo

---

**Última atualização:** Dezembro 2025  
**Status:** ✅ FINALIZADO - NÃO MODIFICAR




























