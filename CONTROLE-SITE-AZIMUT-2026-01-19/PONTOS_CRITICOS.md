# ⚠️ PONTOS CRÍTICOS - NÃO MEXER SEM LER

**AVISO:** Estas áreas são **EXTREMAMENTE SENSÍVEIS** e foram ajustadas após horas de debug. Modificações sem cuidado podem quebrar o site inteiro.

---

## 🔴 ÁREA 1: THEME TOGGLE (Context API)

### **Arquivos:**
- `src/contexts/ThemeContext.tsx`
- `src/main.tsx`
- `src/hooks/useTheme.ts`

### **⚠️ O QUE NÃO FAZER:**
- ❌ Criar novo `useState` para tema em componentes
- ❌ Duplicar lógica de toggle
- ❌ Usar `localStorage` diretamente (use context)
- ❌ Remover `ThemeProvider` do `main.tsx`

### **✅ O QUE FAZER:**
- ✅ Sempre usar `const { theme, toggleTheme } = useTheme()`
- ✅ Se precisar escutar mudanças: `useEffect` com `theme` como dependência
- ✅ Se adicionar novo componente: garantir que está dentro de `<ThemeProvider>`

### **Como Funciona:**
```
main.tsx
  └─ <ThemeProvider>        ← Estado único global
      └─ <App>
          └─ Qualquer componente usa useTheme()
```

### **Se Quebrar:**
1. Verificar se há múltiplos `useState` para tema
2. Garantir que `ThemeProvider` está em `main.tsx`
3. Console logs em `ThemeContext.tsx` (já tem)
4. Reverter: `git checkout checkpoint-2026-01-19`

---

## 🔴 ÁREA 2: LOGO NO FORMULÁRIO (CSS Exception)

### **Arquivos:**
- `src/index.css` (linhas 1625-1640)
- `src/components/SmartContactForm.tsx`

### **⚠️ O QUE NÃO FAZER:**
- ❌ Remover classe `.logo-keep-original`
- ❌ Mudar filtro global de logos no tema claro
- ❌ Aplicar `invert()` inline na logo do form

### **✅ O QUE FAZER:**
- ✅ Sempre adicionar classe `.logo-keep-original` em logos de fundos escuros
- ✅ Manter a exceção no CSS: `:not(.logo-keep-original)`

### **CSS Crítico:**
```css
/* Global: inverte logos no tema claro */
[data-theme="light"] img[src*="logo-azimut-star.svg"]:not(.logo-keep-original) {
  filter: invert(1) brightness(0.15);
}

/* Exception: logos em fundos escuros mantêm original */
.logo-keep-original {
  filter: none !important;
  opacity: 1 !important;
}
```

### **Se Quebrar:**
- Logo preta no formulário tema claro? → Verificar se tem classe `.logo-keep-original`
- Logo clara em fundo claro? → Verificar se NÃO tem a classe

---

## 🔴 ÁREA 3: GRADIENT HOME TEMA CLARO

### **Arquivos:**
- `src/index.css` (`.hero-gradient-light`)
- `src/pages/Home.tsx`

### **⚠️ O QUE NÃO FAZER:**
- ❌ Mudar percentuais sem testar em 1366px, 1440px, 1920px
- ❌ Adicionar cores azuis
- ❌ Fazer gradient simétrico
- ❌ Remover `z-index: -1`

### **✅ Percentuais Testados:**
```css
.hero-gradient-light {
  background: linear-gradient(90deg,
    #d3cec3 0%,     /* BEIGE lateral esquerda */
    #d3cec3 2%,
    #3a2f28 7%,     /* TERMINA antes do texto (7%) */
    #2a1f18 68%,    /* Dark brown centro */
    #3a2f28 68%,    /* INICIA após texto (68%) */
    #d3cec3 100%    /* BEIGE lateral direita */
  );
}
```

### **Por que esses números?**
- **7%:** Texto hero inicia ~10% da tela
- **68%:** Texto hero termina ~65% da tela
- **Margem:** 3-5% de segurança para não pegar no texto

### **Se Quebrar:**
- Gradient pegando no texto? → Aumentar 7% (ex: 9%)
- Muito escuro? → Clarear `#2a1f18` para `#3a2f28`
- Muito claro? → Escurecer centro
- **TESTAR EM:** Chrome DevTools → 1366px, 1440px, 1920px

---

## 🔴 ÁREA 4: VANCOUVER LAYOUT

### **Arquivos:**
- `src/pages/Vancouver.tsx`
- `src/components/VancouverMagazine.tsx`

### **⚠️ O QUE NÃO FAZER:**
- ❌ Mover "Visual School Quiz" de volta para baixo
- ❌ Remover `min-h` dos cards
- ❌ Remover `line-clamp-2`
- ❌ Mudar ordem: AI Tools → Quiz → FAQ

### **✅ Ordem Correta (NÃO MUDAR):**
```
1. Hero
2. Tabela Comparativa
3. Magazine Cards
4. WhyVancouver
5. AI Tools (Quiz + Calculator)    ← IMPORTANTE
6. Visual School Quiz (Timeline)    ← LOGO APÓS
7. FAQ
8. Formulário
```

### **Por que essa ordem?**
- **Timeline após Calculator:** Elimina espaço vazio
- **FAQ depois:** Responde dúvidas após decisão
- **Form por último:** CTA final

### **Cards - Alturas Fixas (NÃO REMOVER):**
```typescript
// Título
min-h-[2.5rem] flex items-end

// Texto
min-h-[3rem] line-clamp-2
```

### **Se Quebrar:**
- Espaço vazio grande? → Verificar ordem das sections
- Cards truncando? → Verificar `min-h` e `line-clamp`

---

## 🔴 ÁREA 5: CORES TEMA CLARO (CSS Variables)

### **Arquivos:**
- `src/index.css` (início do arquivo, linhas 2-85)
- Múltiplos componentes usando `var(--theme-*)`

### **⚠️ O QUE NÃO FAZER:**
- ❌ Mover regras de tema para o final do arquivo (Tailwind v4!)
- ❌ Usar cores fixas em vez de variables
- ❌ Remover `!important` das regras de contraste

### **✅ Variáveis Críticas:**
```css
:root {
  --theme-bg: #050814;
  --theme-bg-secondary: #0a0f1a;
  --theme-text: #ffffff;
  --theme-text-secondary: #d3cec3;
  --theme-border: rgba(255, 255, 255, 0.1);
  --theme-card-bg: linear-gradient(180deg, #0a0f1a 0%, #1a1f2e 100%);
}

[data-theme="light"] {
  --theme-bg: #d3cec3;
  --theme-bg-secondary: #e5ddd3;
  --theme-text: #0f172a;
  --theme-text-secondary: #1e3a5f;
  --theme-border: rgba(15, 23, 42, 0.2);
  --theme-card-bg: linear-gradient(180deg, #2a2825 0%, #1e1c1a 100%);
}
```

### **Por que no início do arquivo?**
- Tailwind v4 processa regras custom **ANTES** de gerar classes
- Regras no final são sobrescritas por classes inline

### **Se Quebrar:**
- Contraste ruim? → Verificar se está usando `var(--theme-text)`
- Cards escuros no claro? → Usar `var(--theme-card-bg)`

---

## 🔴 ÁREA 6: MENU NAVEGAÇÃO (Layout.tsx)

### **Arquivos:**
- `src/components/Layout.tsx`

### **⚠️ O QUE NÃO FAZER (SEÇÕES PROTEGIDAS):**

Conforme `REGRAS DO CURSOR` (repo rules):

#### **1. Logo**
- ❌ Mudar height: '56px'
- ❌ Mudar alinhamento esquerdo
- ❌ Usar mesma logo desktop/mobile

#### **2. Botão CTA**
- ❌ Mudar minWidth: '130px'
- ❌ Mudar height: '48px'
- ❌ Mudar fontSize: '0.54rem'

#### **3. Detecção Hamburger**
- ❌ Basear em medição de elementos (usar `windowWidth`)
- ❌ Mudar larguras por idioma:
  - PT: 460px
  - EN: 420px
  - FR: 480px
  - ES: 450px

#### **4. Cálculo Breakpoint**
```javascript
totalNeeded = logoWidth(180) + menuWidth + rightSideWidth(220) + gaps(80)
showHamburger = totalNeeded > windowWidth
```

### **Se Quebrar:**
- Hamburger aparecendo errado? → Verificar cálculo acima
- Logo errada? → Desktop: `logo-topo-site.svg`, Mobile: `logobasicaa.png`

---

## 🔴 ÁREA 7: SELETOR DE IDIOMAS

### **Arquivos:**
- `src/components/Layout.tsx`

### **⚠️ O QUE NÃO FAZER:**
- ❌ Mudar círculos: ● (U+25CF)
- ❌ Mudar tamanho bolinhas: fontSize: '0.65rem'
- ❌ Mudar estrutura: 🇨🇦EN●FR | 🇧🇷PT●ES
- ❌ Adicionar marginRight nas bandeiras (usa gap: '1px')
- ❌ Mudar rightSideWidth: 220px

### **Se Quebrar:**
- Alinhamento errado? → Verificar se não mudou espaçamentos
- Círculos desalinhados? → `transform: translateY(-2px)`

---

## 🔴 ÁREA 8: RODAPÉ (Footer)

### **Arquivos:**
- `src/components/Layout.tsx`

### **⚠️ O QUE NÃO FAZER:**
- ❌ Mudar grid de colunas (col-span-3, col-span-5)
- ❌ Mudar linha vermelha: h-[3px] bg-azimut-red (sólida!)
- ❌ Mudar background gradients (dark e light)
- ❌ Remover `whiteSpace: 'nowrap'` do email

### **Gradientes Testados:**
```css
/* Dark */
linear-gradient(180deg, #0a0e18 0%, #060a12 100%)

/* Light */
linear-gradient(180deg, #2a2825 0%, #1e1c1a 100%)
```

---

## 🆘 PROTOCOLO DE EMERGÊNCIA

### **Se mexeu e quebrou:**

1. **PARE IMEDIATAMENTE** ❌
2. **NÃO tente "consertar rápido"** (vai piorar)
3. **Reverter:**
   ```bash
   git checkout checkpoint-2026-01-19
   ```
4. **Ler este documento novamente**
5. **Planejar mudança com mais cuidado**

### **Se não tem certeza:**
1. Ler `README.md` desta pasta
2. Ler `BUGS_RESOLVIDOS.md`
3. Criar branch teste: `git checkout -b test-mudanca`
4. Testar exaustivamente antes de merge

---

## 📊 NÍVEL DE PERIGO POR ÁREA

| Área | Perigo | Tempo Debug se Quebrar |
|------|--------|------------------------|
| Theme Toggle | 🔴🔴🔴🔴🔴 | 3-6 horas |
| Gradient Home | 🔴🔴🔴🔴 | 2-4 horas |
| Logo Formulário | 🔴🔴🔴 | 1-2 horas |
| Vancouver Layout | 🔴🔴🔴 | 1-2 horas |
| CSS Variables | 🔴🔴🔴🔴 | 2-3 horas |
| Menu Navegação | 🔴🔴🔴🔴🔴 | 4-8 horas |
| Seletor Idiomas | 🔴🔴🔴🔴 | 2-4 horas |
| Rodapé | 🔴🔴 | 1 hora |

---

**⚠️ LEMBRETE FINAL:**

> "Se funcionou depois de horas de debug, está funcionando por um motivo específico. Não mude 'só pra melhorar' sem entender exatamente o que aquele código faz."

---

**📅 Criado:** 19/01/2026  
**🎯 Propósito:** Evitar dor de cabeça desnecessária  
**💾 Backup seguro:** checkpoint-2026-01-19
