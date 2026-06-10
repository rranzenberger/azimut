# 📋 MAPEAMENTO COMPLETO DOS FORMULÁRIOS

## 🎯 STATUS ATUAL

### ✅ FORMULÁRIOS CONECTADOS (Email IA + Redirecionamento)

| # | Formulário | Página(s) | Status Email | Status Redirect | Observações |
|---|-----------|-----------|--------------|-----------------|-------------|
| 1 | **SmartContactForm** | `/contact` | ✅ Conectado | ✅ Thank You | Principal formulário de contato |
| 2 | **AcademyQuickForm** | `/vancouver`<br>`/academy-courses` | ✅ Conectado | ✅ Thank You | Formulário rápido (3 campos) |
| 3 | **VancouverInterestForm** | `/vancouver` | ✅ Conectado | ✅ Thank You | Formulário completo Vancouver |

---

### ⏳ FORMULÁRIOS FALTANDO (Precisa conectar)

| # | Formulário | Página(s) | Status Email | Status Redirect | Ação Necessária |
|---|-----------|-----------|--------------|-----------------|-----------------|
| 4 | **BudgetWizard** | Layout (Modal global) | ❌ Não conectado | ❌ Sem redirect | Conectar ao notify-form + Thank You |
| 5 | **AcademyGameForm** | Não usado atualmente | ❌ Não conectado | ❌ Sem redirect | Conectar se for usado |

---

## 📍 ONDE CADA FORMULÁRIO APARECE

### 1. SmartContactForm
**Página:** `/pt/contact`, `/en/contact`, `/fr/contact`, `/es/contact`

**Características:**
- Formulário completo com 12+ campos
- IA sugere projetos baseado em respostas
- Já conectado ao sistema de email
- Redireciona para thank-you após 2s

**Campos principais:**
- Nome, Email, Telefone, Empresa
- Tipo de organização, Tipo de projeto
- Orçamento, Timeline, Descrição
- País, Cidade

---

### 2. AcademyQuickForm
**Páginas:**
- `/pt/vancouver` (e outros idiomas)
- `/pt/academy-courses` (e outros idiomas)

**Características:**
- Formulário ultra-rápido (apenas 3-5 campos)
- Detecta dados do Quiz Vancouver automaticamente
- Já conectado ao sistema de email
- Redireciona para thank-you após 2s

**Campos principais:**
- Nome
- Email ou WhatsApp
- Escola de interesse (se Vancouver)
- Idioma preferido
- Preferência de contato

**Variantes:**
- `type="vancouver"` → Para estudar em Vancouver
- `type="course"` → Para cursos gerais
- `type="workshop"` → Para workshops
- `type="corporate"` → Para treinamento corporativo

---

### 3. VancouverInterestForm
**Página:** `/pt/vancouver` (e outros idiomas)

**Características:**
- Formulário completo com 14 campos
- Específico para interessados em Vancouver
- Já conectado ao sistema de email
- Redireciona para thank-you após 2s

**Campos principais:**
- Dados pessoais (Nome, Email, WhatsApp, Idade, Cidade)
- Situação educacional atual
- Escola alvo (VFS/VanArts/Não sei)
- Área de interesse
- Quando pretende ir
- Nível de inglês
- Portfolio (sim/não)
- Faixa de orçamento
- Fonte de financiamento
- Como conheceu
- Comentários

---

### 4. BudgetWizard (⚠️ PRECISA CONECTAR)
**Localização:** Modal global (aparece em várias páginas)

**Onde é usado:**
- Botão no menu/header (Layout.tsx)
- Pode ser aberto de qualquer página
- Modal overlay

**Características:**
- Wizard de 4 etapas
- Recomenda editais baseado em respostas
- **NÃO está conectado ao notify-form ainda**
- **NÃO redireciona para thank-you**

**Etapas:**
1. O que você precisa? (multi-select)
2. Qual seu orçamento?
3. Contexto do projeto (localização, deadline, etc)
4. Recomendações de editais

**Campos coletados:**
- needs (array)
- budget
- location
- deadline
- audience
- objective
- needsFunding

**Status atual:**
- Salva lead no backoffice via `ApiService.submitLead()`
- **FALTA:** Enviar email via notify-form API
- **FALTA:** Redirecionar para thank-you

---

### 5. AcademyGameForm (⚠️ NÃO USADO ATUALMENTE)
**Localização:** Componente criado mas não importado em nenhuma página

**Características:**
- Formulário gamificado (estilo quiz/jogo)
- Progressão visual com etapas
- Tom divertido e friendly
- **NÃO está sendo usado no site atual**

**Se for usado no futuro:**
- Precisa conectar ao notify-form
- Precisa adicionar redirecionamento

---

## 🔧 PRÓXIMAS AÇÕES

### 1. BudgetWizard (PRIORIDADE ALTA)
```typescript
// Localização: src/components/BudgetWizard.tsx
// Linha ~180-190 (onComplete)

// ADICIONAR:
1. Import useNavigate
2. Enviar para notify-form API
3. Redirecionar para thank-you após 2s
```

**Impacto:** ALTO - Modal usado em todo o site

---

### 2. AcademyGameForm (PRIORIDADE BAIXA)
**Status:** Componente não usado
**Ação:** Decidir se vai ser usado. Se sim, conectar.

---

## 📊 RESUMO EXECUTIVO

### Formulários totais: 5
- ✅ **Conectados e funcionando:** 3
- ⏳ **Faltando conectar:** 1 (BudgetWizard)
- ❓ **Não usado:** 1 (AcademyGameForm)

### Cobertura atual: **75%**
- 3/4 formulários ativos estão conectados
- Falta apenas BudgetWizard

---

## 🚀 ESTIMATIVA DE TEMPO

### BudgetWizard
- Conectar ao notify-form: **10 min**
- Adicionar redirecionamento: **5 min**
- Testar: **5 min**
- **TOTAL: ~20 minutos**

---

## 📝 OBSERVAÇÕES IMPORTANTES

1. **Todos os formulários conectados:**
   - Enviam email com IA personalizada
   - Email interno sempre em PT
   - Subject inteligente com múltiplas tags
   - Roteamento automático (academy@, contact@, leads@)

2. **Flash branco corrigido:**
   - Nenhum formulário mostra mensagem de sucesso intermediária
   - Redirecionamento direto para thank-you

3. **BudgetWizard é especial:**
   - Não é uma página específica
   - É um modal global
   - Pode ser acessado de qualquer lugar
   - Por isso é PRIORITÁRIO conectar

---

## 🎯 RECOMENDAÇÃO

**CONECTAR BUDGETWIZARD AGORA:**
- É o último formulário ativo faltando
- Usado em todo o site
- Rápido de implementar (~20 min)
- Depois disso: **100% dos formulários conectados!** ✅
