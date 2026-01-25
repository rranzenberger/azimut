# RODAPÉ PREMIUM - VERSÃO FINAL 2026

**Data:** 24 de Janeiro de 2026  
**Status:** ✅ APROVADO E FINALIZADO  
**Arquivo:** `src/components/Layout.tsx`

---

## ESTRUTURA DO RODAPÉ DESKTOP

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  LOGO/TAGLINE          │  NAVEGAÇÃO    EDUCAÇÃO      COMEÇAR    │  NEWSLETTER   │
│  (col-span-3)          │  (col-span-5)                          │  (col-span-4) │
│                        │                                         │               │
│  [Logo Azimut]         │  Navegação    Educação &    Começar    │  Newsletter   │
│                        │               Pesquisa                  │  [input]      │
│  Experiências          │  Início       Academy       Soluções   │  [Inscrever]  │
│  imersivas...          │  Soluções     └─ Cursos     Contato    │               │
│                        │  Projetos     └─ Workshops  Imprensa   │  Entre em     │
│                        │  Estúdio      └─ Corporate  Revisar    │  contato      │
│                        │  Equipe       └─ Estude em  Blog       │  [📧 email]   │
│                        │                  Vancouver              │               │
│  🇨🇦 Vancouver • 🇧🇷 Rio · Florianópolis                         │               │
│                        │─────────────────────────────────────────│               │
│                        │  [CTA]    [WhatsApp]    [Sociais]      │               │
└─────────────────────────────────────────────────────────────────────────────────┘
                    ════════════════════════════════════════════
                    (linha gradiente vermelha premium - 2px)
                    
© 2026 Azimut Projetos Audiovisuais Ltda. · Brasil ↔ Canadá    [Privacidade] [Termos]
```

---

## ESPECIFICAÇÕES TÉCNICAS

### 1. COLUNA BRANDING (col-span-3)
- **Logo:** `maxWidth: 260px`, `width: 100%`
- **Tagline:** `text-[0.8rem] sm:text-[0.85rem] md:text-[0.9rem]`, cor `#94a3b8`
- **Cidades:** 
  - `justify-between`, `maxWidth: 260px` (alinhado com logo)
  - Vancouver separado com `•` (entre países)
  - Rio · Florianópolis juntos com `·` (mesmo país)
  - Bandeiras: `h-4` (16px)

### 2. COLUNA NAVEGAÇÃO (col-span-5)
- **Grid:** `grid-cols-3 gap-x-4 md:gap-x-5`
- **Títulos:** `text-[0.72rem] sm:text-[0.78rem]`, uppercase, tracking `0.15em`
- **Links:** `text-[0.78rem] sm:text-[0.82rem] md:text-[0.85rem]`
- **Sub-items Academy:** `└─` prefix, `ml-3`, cor `#94a3b8`

### 3. LINHA CTA/WHATSAPP/SOCIAIS
- **Separador:** Gradiente branco sutil
  ```css
  background: linear-gradient(90deg, 
    rgba(255,255,255,0.08) 0%, 
    rgba(255,255,255,0.3) 30%, 
    rgba(255,255,255,0.3) 70%, 
    rgba(255,255,255,0.08) 100%
  )
  ```
- **CTA:** `width: 130px`, `height: 42px`, borda vermelha Azimut
- **WhatsApp:** Gradiente verde, `height: 42px`
- **Ícones Sociais:** `w-7 h-7` (28px), `gap: 0.625rem`

### 4. COLUNA NEWSLETTER (col-span-4)
- **Input:** `height: 44px`, borda `white/10`
- **Botão Inscrever:** `height: 44px`, fundo vermelho Azimut
- **Email contato:** `height: 40px`, fundo `rgba(255,255,255,0.04)`
- **Título "Entre em contato":** `text-[0.68rem] sm:text-[0.72rem]`, uppercase

### 5. LINHA COPYRIGHT (PREMIUM)
- **Separador:** Gradiente vermelho premium (2px)
  ```css
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(139, 35, 50, 0.6) 20%, 
    rgba(201, 35, 55, 0.8) 50%, 
    rgba(139, 35, 50, 0.6) 80%, 
    transparent 100%
  )
  ```
- **Copyright:** `text-[0.85rem] sm:text-[0.9rem] md:text-[0.95rem]`
- **Brasil ↔ Canadá:** Seta em vermelho Azimut `#8B2332`
- **Links Privacidade/Termos:** Botões com hover vermelho

---

## CORES UTILIZADAS

| Elemento | Cor |
|----------|-----|
| Texto principal | `#cbd5e1` |
| Texto secundário | `#94a3b8` |
| Texto terciário | `#64748b` |
| Vermelho Azimut | `#8B2332` / `rgba(201, 35, 55)` |
| Verde WhatsApp | `#25D366` / `rgba(37, 211, 102)` |
| Bordas | `rgba(255,255,255,0.1)` a `0.15` |

---

## RESPONSIVIDADE

### Desktop (≥768px)
- Grid 12 colunas: 3 + 5 + 4
- Todas as seções visíveis lado a lado

### Mobile (<768px)
- Layout empilhado vertical
- Logo centralizada
- Navegação em acordeão ou lista
- CTA e sociais centralizados

---

## NÃO ALTERAR

⚠️ **Este rodapé foi aprovado em 24/01/2026. Não fazer alterações sem aprovação.**

Elementos fixados:
- [x] Alinhamento das cidades com largura da logo
- [x] Linha gradiente vermelha premium no copyright
- [x] Linha gradiente branca sutil acima do CTA
- [x] Tamanho dos ícones sociais (28px)
- [x] Estrutura 3 colunas de navegação
- [x] Email de contato abaixo da newsletter
- [x] WhatsApp ao lado do CTA
- [x] Copyright com "Brasil ↔ Canadá"
- [x] Botões Privacidade/Termos com hover

---

**Parabéns! Rodapé premium finalizado com sucesso!** 🎉
