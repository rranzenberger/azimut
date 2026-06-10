# 🔍 ANÁLISE: PROBLEMA DE CONTRASTE EM CARDS ESCUROS

## 📋 PROBLEMA IDENTIFICADO

Os cards com **fundo escuro** (azul marinho/preto) no tema claro estão com **texto escuro**, tornando impossível a leitura.

### Onde acontece:
1. **Home** - Card "STUDIO SNAPSHOT" (fundo escuro + texto branco que vira preto)
2. **WhatWeDo** - Cards de pilares (fundo escuro + texto escuro)
3. **Studio** - Cards de timeline (fundo escuro + texto escuro)
4. **Academy** - Cards de research areas (fundo escuro + texto escuro)

## 🎯 CAUSA RAIZ

Os cards NÃO estão usando as classes `.card-adaptive`, `.card-dark-adaptive` ou `.card-dark-fixed`.

Estão usando classes genéricas como:
- `bg-gradient-to-br from-slate-800 to-slate-900`
- `bg-white/5 backdrop-blur`
- `rounded-2xl bg-gradient-to-br from-slate-900`

As regras CSS que criamos só funcionam para elementos com classes específicas.

## ✅ SOLUÇÃO

Adicionar regras CSS que detectam **QUALQUER** elemento com fundo escuro e garantem texto claro:

```css
/* Detectar fundos escuros por classe */
html[data-theme="light"] [class*="from-slate-8"],
html[data-theme="light"] [class*="from-slate-9"],
html[data-theme="light"] [class*="to-slate-8"],
html[data-theme="light"] [class*="to-slate-9"],
html[data-theme="light"] [class*="bg-slate-8"],
html[data-theme="light"] [class*="bg-slate-9"] {
  /* Forçar TODOS os textos dentro para CLARO */
  color: #d3cec3 !important;
}

/* Forçar textos filhos também */
html[data-theme="light"] [class*="from-slate-8"] *,
html[data-theme="light"] [class*="from-slate-9"] *,
html[data-theme="light"] [class*="to-slate-8"] *,
html[data-theme="light"] [class*="to-slate-9"] *,
html[data-theme="light"] [class*="bg-slate-8"] *,
html[data-theme="light"] [class*="bg-slate-9"] * {
  color: #d3cec3 !important;
}
```

## 🎨 LÓGICA CORRIGIDA

```
TEMA CLARO:

1. FUNDO BEGE (padrão)
   → Texto: ESCURO (#0d0d0d, #1a1a1a)
   
2. FUNDO ESCURO (slate-800, slate-900, gradientes escuros)
   → Texto: CLARO (#d3cec3, #ffffff)
   
3. BOTÃO VERMELHO (bg-azimut-red)
   → Texto: BRANCO (#ffffff)
   
4. AZUL BEBÊ (slate-400, slate-500, blue-*)
   → Converter para: AZUL MARINHO (#1e3a5f)
```

Vou implementar agora.










