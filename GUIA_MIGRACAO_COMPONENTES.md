# 🎯 GUIA DE MIGRAÇÃO - Primeiros Componentes
## Sugestão de Ordem e Como Fazer

**Data:** 02/01/2026  
**Status:** Pronto para migrar

---

## ✅ O QUE JÁ FOI FEITO

### **1. CSS Variables Expandidas** ✅
- Spacing system (4px base)
- Border radius consistente
- Transições suaves
- Sombras cinematográficas
- Hover/focus states

### **2. Grain Texture Ajustado** ✅
- Opacity: 0.6 → **0.05** (sutil, como The Mill)
- Size: 150px → **200px** (menos repetitivo)
- Tema dark: **0.05** opacity
- Tema light: **0.03** opacity

### **3. Componentes Novos Criados** ✅
- **Button.tsx** (primary, secondary, ghost)
- **Card.tsx** (default, elevated, glass)
- **ExemploComponentes.tsx** (guia de uso)

---

## 🎯 PRÓXIMOS 2-3 COMPONENTES PARA MIGRAR

### **SUGESTÃO: Começar pelos MAIS SIMPLES** 📊

---

## 🥇 **COMPONENTE #1: SimplePasswordGate** (30 min)
**Dificuldade:** ⭐ FÁCIL  
**Risco:** BAIXO  
**Impacto:** Alto (página de entrada)

### **Por quê migrar primeiro:**
✅ Componente pequeno e isolado  
✅ Não tem dependências complexas  
✅ Fácil testar (abrir site sem autenticação)  
✅ Visual: logo + input + botão (perfeito para testar Button.tsx!)

### **O que mudar:**

**ANTES (cores hardcoded):**
```tsx
<button 
  style={{ 
    backgroundColor: '#c92337',
    color: 'white',
    padding: '12px 24px'
  }}
>
  Entrar
</button>
```

**DEPOIS (usando Button.tsx):**
```tsx
<Button variant="primary" size="lg" type="submit" fullWidth>
  Entrar
</Button>
```

### **Arquivo:** `src/components/SimplePasswordGate.tsx`

### **Linhas para mudar:**
- Linha ~60: Input de senha → usar CSS Variables
- Linha ~80: Botão → usar `<Button />`
- Linha ~40: Card → usar `<Card />`

---

## 🥈 **COMPONENTE #2: BudgetWizardModal** (45 min)
**Dificuldade:** ⭐⭐ MÉDIO  
**Risco:** BAIXO  
**Impacto:** Alto (formulário de contato)

### **Por quê migrar:**
✅ Usa muitos botões (perfeito para testar Button.tsx)  
✅ Cards de steps (perfeito para testar Card.tsx)  
✅ Inputs (testar CSS Variables)

### **O que mudar:**

**ANTES:**
```tsx
<button className="bg-azimut-red hover:bg-red-600 px-6 py-3">
  Próximo
</button>
```

**DEPOIS:**
```tsx
<Button variant="primary" size="md" onClick={nextStep}>
  Próximo
</Button>
```

### **Arquivo:** `src/components/BudgetWizardModal.tsx`

### **Linhas principais:**
- Botões de navegação (Próximo, Voltar, Enviar)
- Cards de cada step
- Inputs de formulário

---

## 🥉 **COMPONENTE #3: Contact.tsx** (1 hora)
**Dificuldade:** ⭐⭐ MÉDIO  
**Risco:** MÉDIO  
**Impacto:** Alto (página de contato)

### **Por quê migrar:**
✅ Página pública importante  
✅ Usa formulários complexos  
✅ Boa para testar Cards e Buttons juntos

### **O que mudar:**

**ANTES:**
```tsx
<div className="rounded-xl border border-white/10 p-6">
  {/* Conteúdo */}
</div>
```

**DEPOIS:**
```tsx
<Card variant="elevated" padding="lg" rounded="xl">
  {/* Conteúdo */}
</Card>
```

### **Arquivo:** `src/pages/Contact.tsx`

---

## 📋 PASSO A PASSO PARA MIGRAR

### **ETAPA 1: Preparação (5 min)**

1. Abrir o componente alvo
2. Ler o código e identificar:
   - [ ] Botões (substituir por `<Button />`)
   - [ ] Cards/containers (substituir por `<Card />`)
   - [ ] Cores hardcoded (substituir por CSS Variables)
   - [ ] Espaçamentos hardcoded (substituir por classes Tailwind ou CSS Variables)

### **ETAPA 2: Import dos novos componentes (2 min)**

```tsx
import Button from './Button' // ou '../components/Button'
import Card from './Card'     // ou '../components/Card'
```

### **ETAPA 3: Substituir UM elemento de cada vez (20-40 min)**

**NÃO FAZER TUDO DE UMA VEZ!**

1. Trocar 1 botão
2. Salvar
3. Testar no navegador
4. Se funcionar → próximo botão
5. Se quebrar → desfazer (Ctrl+Z)

### **ETAPA 4: Testar em Dark + Light (5 min)**

1. Abrir site no navegador
2. Testar tema escuro
3. Clicar no toggle de tema
4. Testar tema claro
5. Verificar contraste e legibilidade

### **ETAPA 5: Commit (2 min)**

```bash
git add .
git commit -m "feat: migrar SimplePasswordGate para Design System"
git push
```

---

## 🎯 ORDEM SUGERIDA (Próximos 3 dias)

### **Dia 1: SimplePasswordGate** (30 min)
- [x] CSS Variables adicionadas
- [x] Grain ajustado
- [x] Button.tsx criado
- [x] Card.tsx criado
- [ ] **HOJE:** Migrar SimplePasswordGate
- [ ] Testar dark/light
- [ ] Commit

### **Dia 2: BudgetWizardModal** (45 min)
- [ ] Migrar BudgetWizardModal
- [ ] Testar formulário completo
- [ ] Testar envio
- [ ] Commit

### **Dia 3: Contact.tsx** (1 hora)
- [ ] Migrar Contact.tsx
- [ ] Testar formulário de contato
- [ ] Testar envio de email
- [ ] Commit

---

## ⚠️ COMPONENTES QUE **NÃO** DEVEM SER MIGRADOS (PROTEGIDOS)

### **NUNCA TOCAR:**
1. ❌ **Layout.tsx** → Menu de navegação (PROTEGIDO!)
2. ❌ **Layout.tsx** → Seletor de idiomas (PROTEGIDO!)
3. ❌ **Layout.tsx** → Rodapé (PROTEGIDO!)
4. ❌ Qualquer página com `*.tsx` → Estrela de fundo (PROTEGIDO!)

**Por quê?**  
Esses componentes foram cuidadosamente ajustados para responsividade e têm regras específicas no `.cursorules`.

---

## 🔥 MIGRAÇÃO RÁPIDA: SimplePasswordGate (EXEMPLO)

Vou mostrar EXATAMENTE como migrar o primeiro:

### **ANTES (src/components/SimplePasswordGate.tsx):**

```tsx
<div style={{
  background: 'linear-gradient(135deg, #0a0f1a 0%, #1a1f2e 100%)',
  border: '1px solid rgba(201, 35, 55, 0.3)',
  borderRadius: '1rem',
  padding: '3rem'
}}>
  <input
    type="password"
    style={{
      width: '100%',
      padding: '0.75rem',
      borderRadius: '0.5rem',
      background: 'rgba(0, 0, 0, 0.3)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      color: 'white'
    }}
  />
  <button
    style={{
      width: '100%',
      padding: '0.75rem',
      background: '#c92337',
      color: 'white',
      borderRadius: '0.5rem',
      fontWeight: '600'
    }}
  >
    Entrar
  </button>
</div>
```

### **DEPOIS (migrado):**

```tsx
import Button from './Button'
import Card from './Card'

<Card variant="elevated" padding="xl" rounded="2xl">
  <input
    type="password"
    className="input-adaptive" // já existe no index.css!
  />
  <Button variant="primary" size="lg" type="submit" fullWidth>
    Entrar
  </Button>
</Card>
```

**Linhas de código:**  
**ANTES:** ~30 linhas de estilos inline  
**DEPOIS:** ~10 linhas (70% menos código!)

**Manutenção:**  
**ANTES:** Se mudar cor vermelha = editar N arquivos  
**DEPOIS:** Se mudar cor vermelha = editar 1 linha no `index.css`

---

## 📊 IMPACTO ESPERADO (Após migrar 3 componentes)

### **Antes:**
- 🔴 Cores hardcoded em 3 componentes
- 🔴 Estilos inline difíceis de manter
- 🔴 Inconsistência visual

### **Depois:**
- ✅ Componentes usando Design System
- ✅ Código 50-70% menor
- ✅ Manutenção centralizada
- ✅ Consistência visual total

---

## 🚀 PRONTO PARA COMEÇAR?

**Posso migrar o SimplePasswordGate AGORA (30 min)?**

Ou prefere:
- [ ] Ver o código atual do SimplePasswordGate primeiro?
- [ ] Migrar outro componente antes?
- [ ] Fazer um teste isolado primeiro?

**Me diga e eu executo!** 🎯

