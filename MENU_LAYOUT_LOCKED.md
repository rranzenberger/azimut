# 🔒 MENU LAYOUT - CONFIGURAÇÃO TRAVADA

**Data do travamento:** 8 de dezembro de 2024
**Status:** DEFINITIVAMENTE TRAVADO - NÃO MODIFICAR

---

## ⚠️ AVISO CRÍTICO

Este documento contém as configurações FINAIS e APROVADAS do menu e seletor de idiomas.

**QUALQUER MODIFICAÇÃO QUEBRARÁ O ALINHAMENTO PERFEITO E O SISTEMA DE DETECÇÃO.**

---

## 1. Logo (src/components/Layout.tsx)

```typescript
height: '56px'
width: 'auto'
display: 'block'
gridColumn: '1'
justifyContent: 'flex-start'
```

**Posição:** Alinhada à ESQUERDA do container

---

## 2. Seletor de Idiomas - Ultra Compacto

### Estrutura
```
🇨🇦EN●FR | 🇧🇷PT●ES
```

### Bolinhas (●)
```typescript
fontSize: '0.65rem'
transform: 'translateY(-2px)'
margin: '0' // usa gap do container
lineHeight: '1'
```

### Separador (|)
```typescript
marginLeft: '5px'
marginRight: '9px'
fontSize: '0.55rem'
opacity: 0.4
```

### Bandeiras
```typescript
height: '3.5' // h-3.5
marginRight: REMOVIDO // usa gap
rounded: '[2px]'
```

### Botões Idiomas
```typescript
minWidth: '20px'
fontSize: '0.6rem'
letterSpacing: '0.02em'
padding: '0'
margin: '0'
```

### Container Idiomas
```typescript
gap: '1px' // ultra compacto
display: 'flex'
alignItems: 'center'
```

---

## 3. Botão CTA "Iniciar um Projeto"

```typescript
minWidth: '130px'
maxWidth: '130px'
height: '48px'
minHeight: '48px'
padding: '10px 12px'
fontSize: '0.54rem'
lineHeight: '1.4'
letterSpacing: '0.03em'
marginLeft: '12px'
gap: '3px'
```

**Comportamento:** Duas linhas de texto, sem overflow em nenhum idioma

---

## 4. Sistema de Detecção de Hamburger

### Método
Cálculo baseado na **largura da janela** (não em medição de elementos DOM)

### Valores Fixos
```typescript
logoWidth = 180px
rightSideWidth = 220px // Tema + Idiomas + CTA (ultra compacto)
gaps = 80px

menuWidths = {
  pt: 460px,
  en: 420px,
  fr: 480px,
  es: 450px
}
```

### Fórmula
```typescript
totalNeeded = logoWidth + menuWidth[lang] + rightSideWidth + gaps

if (totalNeeded > windowWidth) {
  // Mostrar hamburger
} else {
  // Mostrar menu completo
}
```

### Vantagens
- ✅ Não depende de medir elementos escondidos
- ✅ Funciona durante resize em tempo real
- ✅ Ajusta automaticamente por idioma
- ✅ Sem loops ou piscar

---

## 5. Alinhamento do Header

```typescript
max-w-6xl // Igual ao corpo do site
px-6 // Padding horizontal fixo
grid-cols-[auto_1fr_auto] // Logo | Menu | Direita
```

**Importante:** O header está alinhado com as margens do corpo do site (`max-w-6xl px-6`)

---

## 6. Gaps e Espaçamentos

### Container Principal
```typescript
gap-1.5 md:gap-2 // Entre tema, idiomas e CTA
```

### Menu Principal
```typescript
gap-2.5 md:gap-3 lg:gap-3.5 xl:gap-4 // Entre itens do menu
```

---

## 7. Breakpoints Importantes

```typescript
< 768px: Hamburger sempre (mobile)
768px+: Menu completo (se cabe)
Dinâmico: Hamburger quando totalNeeded > windowWidth
```

---

## 8. Arquivos Relacionados

1. `src/components/Layout.tsx` - Componente principal
2. `.cursorrules` - Regras de proteção
3. `PROTECTED_SECTIONS.md` - Documentação de seções protegidas

---

## 9. Testes Realizados

✅ Logo grande e alinhada à esquerda
✅ Bolinhas (●) alinhadas verticalmente com o texto
✅ Separador (|) posicionado perfeitamente entre grupos
✅ Idiomas ultra compactos, dando espaço ao menu
✅ Botão CTA sem overflow em PT, EN, FR, ES
✅ Hamburger aparece exatamente quando necessário
✅ Funciona em tempo real durante resize
✅ Alinhamento mantido em todas as larguras de tela

---

## 10. O Que NÃO Fazer

❌ Modificar tamanhos de fonte dos idiomas
❌ Alterar espaçamentos (gap, margin, padding)
❌ Mudar posição do separador "|"
❌ Modificar altura da logo
❌ Alterar largura do botão CTA
❌ Mudar valores de rightSideWidth ou menuWidths
❌ Modificar a fórmula de detecção do hamburger
❌ Alterar alinhamento das bolinhas (transform: translateY)

---

## ✅ CONFIGURAÇÃO APROVADA E TRAVADA

**Todas as modificações foram testadas e aprovadas pelo usuário.**
**Qualquer mudança futura nesta área deve ser EXPLICITAMENTE solicitada.**

---

**Última atualização:** 8 de dezembro de 2024
**Status:** 🔒 LOCKED











