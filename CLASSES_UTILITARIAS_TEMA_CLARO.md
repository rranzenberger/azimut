# ═══════════════════════════════════════════════════════════════
# CLASSES UTILITÁRIAS - TEMA CLARO AZIMUT
# ═══════════════════════════════════════════════════════════════

**Data:** Janeiro 2026  
**Status:** ATIVO - Reutilizáveis em todo o site  
**Localização:** `src/index.css` (após linha 2387)

---

## 📚 CLASSES DISPONÍVEIS

### Textos em Cards Escuros (Tema Claro)

#### `.text-theme-card-text`
- **Uso:** Texto principal em cards escuros (card-adaptive)
- **Cor:** `#d3cec3` (creme - mesma cor da logo)
- **Aplicação:** Títulos, textos importantes em cards escuros

```tsx
<h3 className="text-theme-card-text">Título do Card</h3>
```

#### `.text-theme-card-text-secondary`
- **Uso:** Texto secundário em cards escuros (card-adaptive)
- **Cor:** `#cbd5e1` (cinza claro)
- **Aplicação:** Descrições, textos secundários em cards escuros

```tsx
<p className="text-theme-card-text-secondary">Descrição do card</p>
```

### Textos em Fundo Claro (Tema Claro)

#### `.text-theme-light-main`
- **Uso:** Texto principal sobre fundo bege/claro
- **Cor:** `#0f172a` (preto - máximo contraste)
- **Aplicação:** Títulos principais, textos importantes no fundo claro

```tsx
<h1 className="text-theme-light-main">Título Principal</h1>
```

#### `.text-theme-light-secondary`
- **Uso:** Texto secundário sobre fundo bege/claro
- **Cor:** `#1a1a1a` (quase preto)
- **Aplicação:** Subtítulos, textos secundários no fundo claro

```tsx
<p className="text-theme-light-secondary">Texto secundário</p>
```

#### `.text-theme-light-muted`
- **Uso:** Texto muted/discreto sobre fundo bege/claro
- **Cor:** `#1e3a5f` (azul marinho)
- **Aplicação:** Textos menos importantes, labels, informações auxiliares

```tsx
<span className="text-theme-light-muted">Informação auxiliar</span>
```

---

## ✅ REGRAS DE USO

### 1. Cards Escuros (card-adaptive)
**SEMPRE usar:**
- `.text-theme-card-text` para textos principais
- `.text-theme-card-text-secondary` para textos secundários

**NUNCA usar:**
- `.text-white` (use `.text-theme-card-text`)
- `.text-slate-900` (não funciona em cards escuros)
- Cores escuras (preto, azul marinho)

### 2. Fundo Claro (bege)
**SEMPRE usar:**
- `.text-theme-light-main` para textos principais
- `.text-theme-light-secondary` para textos secundários
- `.text-theme-light-muted` para textos muted

**NUNCA usar:**
- `.text-white` (não tem contraste)
- `.text-slate-400` (use `.text-theme-light-muted`)
- Cores claras (branco, bege claro)

---

## 🔄 MIGRAÇÃO DE CÓDIGO EXISTENTE

### Antes (❌ ERRADO)
```tsx
<p className="text-slate-900 dark:text-slate-200">Descrição</p>
```

### Depois (✅ CORRETO)
```tsx
{/* Se estiver em card-adaptive */}
<p className="text-theme-card-text-secondary">Descrição</p>

{/* Se estiver em fundo claro */}
<p className="text-theme-light-secondary">Descrição</p>
```

---

## 📋 CHECKLIST DE IMPLEMENTAÇÃO

Ao usar essas classes:
- [ ] Verificou se é card escuro ou fundo claro?
- [ ] Usou a classe correta para o contexto?
- [ ] Testou no tema claro?
- [ ] Verificou contraste (mínimo 4.5:1)?

---

## 🔍 EXEMPLOS PRÁTICOS

### Card Escuro (Home.tsx)
```tsx
<article className="card-adaptive">
  <h3 className="text-theme-card-text">Título</h3>
  <p className="text-theme-card-text-secondary">Descrição</p>
</article>
```

### Fundo Claro (Seção normal)
```tsx
<section>
  <h2 className="text-theme-light-main">Título da Seção</h2>
  <p className="text-theme-light-secondary">Descrição da seção</p>
  <span className="text-theme-light-muted">Informação adicional</span>
</section>
```

---

**Última Atualização:** Janeiro 2026  
**Status:** ATIVO - Usar sempre que possível