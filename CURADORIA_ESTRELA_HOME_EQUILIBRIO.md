# ⭐ CURADORIA ESTRELA SVG HOME - EQUILÍBRIO PERFEITO

**Data:** 07 Jan 2026  
**Status:** ✅ CONCLUÍDO  
**Estratégia:** Visível mas não competitiva

---

## 🎯 PROCESSO DE CURADORIA

### Evolução das posições testadas:

| Versão | Mobile | Desktop | Resultado |
|--------|--------|---------|-----------|
| 1ª | `-bottom-40` | `-bottom-60` | ❌ Sobreposição com logo |
| 2ª | `-bottom-[20rem]` | `-bottom-[30rem]` | ❌ Muito escondida |
| **3ª** | **`-bottom-[10rem]`** | **`-bottom-[12rem]`** | ✅ **EQUILÍBRIO IDEAL** |

---

## ✅ POSIÇÃO FINAL (CURADA)

```tsx
{/* Estrela de fundo - HOME: Equilíbrio entre visibilidade e não competir com logo animada */}
<div
  className="pointer-events-none fixed -right-28 -bottom-[10rem] h-[520px] w-[520px] md:-right-40 md:-bottom-[12rem] md:h-[680px] md:w-[680px] opacity-30"
  style={{
    zIndex: -5,
    backgroundImage: 'url(/logo-azimut-star.svg)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  }}
/>
```

---

## 📊 ANÁLISE TÉCNICA

### Mobile: `-bottom-[10rem]` (160px para baixo)
- Hero: ~85vh (~650px)
- Logo animada watermark: Centro (opacity 20%)
- Estrela: Começa em ~160px do fundo
- **Resultado:** Visível ao rolar para os cards, não compete com hero

### Desktop: `-bottom-[12rem]` (192px para baixo)
- Hero: 85vh (~900px em tela Full HD)
- Logo animada: 1000px (ocupa coluna direita 50%)
- Estrela: Começa em ~192px do fundo
- **Resultado:** Aparece sutilmente ao final do hero, complementa logo

---

## 🎨 ESTRATÉGIA DE DESIGN

### Princípios aplicados:

1. **Hierarquia visual:**
   - Logo animada = **protagonista** (centro hero)
   - Estrela SVG = **coadjuvante** (canto inferior)

2. **Profundidade:**
   - Logo: Z-index normal, opacity 100%, tamanho 1000px
   - Estrela: Z-index -5, opacity 30%, tamanho 680px

3. **Timing de aparição:**
   - Logo: Imediata (first paint)
   - Estrela: Gradual (scroll ~10-15%)

4. **Complementaridade:**
   - Logo: Branca com glow vermelho (destaque)
   - Estrela: Branca com opacity baixa (sutileza)

---

## 📐 COMPARAÇÃO COM OUTRAS PÁGINAS

| Página | Posição | Visibilidade | Razão |
|--------|---------|--------------|-------|
| **Home** | `-bottom-[12rem]` (192px) | Parcial inicial, total após scroll | Logo de 1000px |
| Soluções | `top-32` (128px do topo) | Total imediata | Sem logo grande |
| Studio | `top-32` | Total imediata | Sem logo grande |
| Projetos | `top-32` | Total imediata | Sem logo grande |

**Diferença:** ~320px entre Home e outras páginas (desktop)

---

## 🧠 DECISÕES DE CURADORIA

### Por que -12rem e não -15rem ou -8rem?

#### -15rem (240px):
- ❌ Ainda muito escondida
- ❌ Usuário precisa scroll demais
- ❌ Perde função decorativa

#### **-12rem (192px):** ✅
- ✅ Aparece sutilmente no final do hero
- ✅ Visível em ~80% ao carregar
- ✅ Complementa sem competir
- ✅ Cria profundidade no layout

#### -8rem (128px):
- ❌ Muito visível, compete com logo
- ❌ Pode criar confusão visual
- ❌ Tira atenção da logo principal

---

## 🎯 PONTOS DE CHECAGEM

### Hero 85vh (~900px desktop):
- **0-450px:** Logo animada domina (50% superior)
- **450-700px:** Transição visual (cards começam)
- **700-900px:** Estrela começa a aparecer (~20%)
- **900px+:** Estrela totalmente visível (scroll)

### Resultado:
✅ Logo animada tem **protagonismo total** no viewport inicial  
✅ Estrela aparece como **elemento de continuidade** no scroll  
✅ **Zero competição** visual  
✅ **Dupla identidade** trabalhando em harmonia  

---

## 🎨 METÁFORA DE DESIGN

**Logo animada** = Maestro (frente do palco, holofotes)  
**Estrela SVG** = Orquestra (fundo do palco, apoio sutil)

Ambos essenciais, hierarquia clara, resultado harmonioso.

---

## 📱 RESPONSIVIDADE

| Tela | Estrela Position | Logo Size | Harmonia |
|------|------------------|-----------|----------|
| Mobile (<768px) | `-bottom-[10rem]` | Watermark 200px | ✅ Perfeito |
| Tablet (768-1024px) | `-bottom-[12rem]` | Split ~400px | ✅ Perfeito |
| Desktop (>1024px) | `-bottom-[12rem]` | Split 1000px | ✅ Perfeito |

---

**CONCLUSÃO DA CURADORIA:**  
`-bottom-[12rem]` é o **sweet spot** entre visibilidade e não-competição! 🎯✨

