# 📍 MAPA COMPLETO: LOCALIZAÇÃO DE TODOS OS FORMULÁRIOS AZIMUT

## 🗺️ ONDE ESTÃO OS FORMULÁRIOS

### 1. 💼 **SmartContactForm** (Formulário de Proposta)

**Arquivo:** `src/components/SmartContactForm.tsx`

**Onde aparece:**
- 📄 Página Contact: `/pt/contact`, `/en/contact`, `/fr/contact`, `/es/contact`
- 🎯 Modal Budget Wizard: Ao finalizar o wizard de orçamento
- 🏠 Home: Seção de contato

**Campos:**
- Nome Completo
- Email
- Telefone / WhatsApp (com código de país)
- Seu Cargo
- Nome da Organização
- Você Representa (dropdown: governo, museu, universidade, fundação, empresa, produtor, outro)
- Tipo de Projeto (dropdown: museu/exposição, instalação, VR/AR, app, evento, treinamento)
- Budget Disponível (dropdown com ranges)
- Quando Precisa Estar Pronto (dropdown: urgente, 3-6m, 6-12m, 12m+)
- País
- Cidade
- Descrição do Projeto (textarea)
- Interesse em Grants/Editais (checkbox)
- Aceito receber contato (checkbox obrigatório)

**Estilo:**
- Layout: Card premium com glow effect
- Grid: 2 colunas em desktop
- Background: Gradiente escuro translúcido

---

### 2. 🇨🇦 **VancouverInterestForm** (Formulário Vancouver Detalhado)

**Arquivo:** `src/components/VancouverInterestForm.tsx`

**Onde aparece:**
- 📄 Página Vancouver: `/pt/vancouver`, `/en/vancouver`, `/fr/vancouver`, `/es/vancouver`
- 🎓 Academy: Seção "Estudar em Vancouver"

**Campos:**
- **Informações Pessoais:**
  - Nome Completo
  - Email
  - WhatsApp/Telefone (com código de país)
  - Idade
  - Cidade/País

- **Situação Atual:**
  - Situação Atual (dropdown: ensino médio, graduação, outro)

- **Interesse em Vancouver:**
  - Qual escola te interessa? (dropdown: VFS, VanArts, não sei)
  - Área de interesse (dropdown: animação/VFX, game art, produção, sound design, atuação, outro)
  - Ano de Intake (dropdown: 2025, 2026, 2027, não sei)
  - Nível de inglês (dropdown: básico, intermediário, avançado, fluente)
  - Tem portfolio? (dropdown: sim, não, trabalhando nisso)

- **Financeiro:**
  - Budget disponível (dropdown: <30k, 30-50k, 50-80k, 80k+, não sei)
  - Fonte de financiamento (dropdown: próprio, família, FIES, bolsa, não sei)

- **Outros:**
  - Como soube de nós? (dropdown)
  - Comentários adicionais (textarea)
  - Newsletter (checkbox)
  - Whatsapp updates (checkbox)

**Estilo:**
- Layout: Formulário longo com seções
- Background: Escuro com seções separadas
- Títulos de seção em destaque

---

### 3. 🎓 **AcademyQuickForm** (Formulário Rápido Academy)

**Arquivo:** `src/components/AcademyQuickForm.tsx`

**Onde aparece:**
- 📄 Página Academy: `/pt/academy`, `/en/academy`, `/fr/academy`, `/es/academy`
- 🎮 Quiz Vancouver: Ao finalizar o quiz
- 🎯 Course Recommendation: Após recomendação de curso

**Tipos:**
- `type="vancouver"` - Para estudos em Vancouver
- `type="course"` - Para curso específico
- `type="general"` - Geral

**Campos:**
- Nome Completo
- Email
- Telefone (com código de país - dropdown customizado)
- Escola (apenas Vancouver): VFS, VanArts, não sei
- Área de Curso (dropdown customizado com ícones): Lista completa de cursos VFS e VanArts
- Idioma Preferido (dropdown: PT, EN, FR, ES)
- Forma de Contato (dropdown: Email, WhatsApp, Ambos)
- Interesse/Dúvida (textarea - opcional)

**Estilo:**
- Layout: Compacto, uma coluna
- SelectField customizado: Dropdown com ícones
- Auto-preenchimento: Dados do quiz/recomendação

---

### 4. 🎮 **AcademyGameForm** (Formulário Gamificado)

**Arquivo:** `src/components/AcademyGameForm.tsx`

**Onde aparece:**
- Não está em uso ativo no momento
- Reservado para futuro "formulário interativo/gamificado"

---

### 5. 💰 **BudgetWizard** (Wizard de Orçamento)

**Arquivo:** `src/components/BudgetWizard.tsx`

**Onde aparece:**
- 🏠 Home: Modal acionado por "Solicitar Orçamento"
- 📄 Qualquer página: Via botão "Get Budget Estimate"

**Etapas:**
1. **Tipo de Projeto** (cards visuais)
   - Museu/Exposição
   - Instalação Imersiva
   - VR/AR
   - App/Plataforma
   - Evento/Festival
   - Treinamento Corporativo

2. **Escala do Projeto** (cards)
   - Pequeno (< 50m²)
   - Médio (50-200m²)
   - Grande (> 200m²)
   - Virtual/Digital

3. **Features Desejadas** (checkboxes múltiplas)
   - Interatividade
   - Multiplayer
   - Conteúdo Generativo
   - Analytics
   - CMS
   - Mobile App

4. **Prazo** (dropdown)
   - Urgente (< 3 meses)
   - Normal (3-6 meses)
   - Planejamento (6-12 meses)
   - Longo prazo (12+ meses)

5. **Resumo + Contato Final**
   - Mostra estimativa de budget
   - Redireciona para SmartContactForm preenchido

**Estilo:**
- Layout: Modal full-screen
- Navegação: Stepper visual
- Cards: Interativos com hover effects
- Progressão: Barra de progresso

---

## 📊 CAMPOS PADRONIZADOS

### Altura dos Campos

```css
/* INPUTS E DROPDOWNS - ALTURA PADRÃO */
min-height: 48px

/* TEXTAREA - ALTURA VARIÁVEL */
textarea[rows="4"]: ~96px (4 linhas)
textarea[rows="6"]: ~144px (6 linhas)
```

### Classes Universais

```tsx
// Input/Email/Tel/Date
<input className="input-adaptive" />

// Dropdown/Select
<select className="dropdown-azimut" />

// Textarea
<textarea className="input-adaptive" rows={4} />

// Label
<label className="label-adaptive" />
```

---

## 🎨 PADRÕES VISUAIS POR TIPO

### Campos Curtos (48px altura)
- Nome
- Email
- Telefone
- Cargo
- Cidade
- País
- Idade

### Campos Médios (48px altura, width variável)
- Dropdowns de código de país: `width: 115px`
- Dropdowns de opções: `width: 100%`

### Campos Longos (altura aumentada)
- **Descrição de Projeto:** `rows={4}` (~96px)
- **Comentários Adicionais:** `rows={4}` (~96px)
- **Interesse/Dúvida:** `rows={3}` (~72px)

---

## 🚀 ROTAS COMPLETAS

### Português (PT)
- `/pt/contact` - SmartContactForm
- `/pt/vancouver` - VancouverInterestForm
- `/pt/academy` - AcademyQuickForm

### Inglês (EN)
- `/en/contact` - SmartContactForm
- `/en/vancouver` - VancouverInterestForm
- `/en/academy` - AcademyQuickForm

### Francês (FR)
- `/fr/contact` - SmartContactForm
- `/fr/vancouver` - VancouverInterestForm
- `/fr/academy` - AcademyQuickForm

### Espanhol (ES)
- `/es/contact` - SmartContactForm
- `/es/vancouver` - VancouverInterestForm
- `/es/academy` - AcademyQuickForm

---

## 📝 NOTAS IMPORTANTES

### Formulários com Auto-preenchimento
1. **AcademyQuickForm** - Preenche automaticamente dados do Quiz Vancouver
2. **BudgetWizard → SmartContactForm** - Transfere dados do wizard

### Formulários com Geolocalização
Todos os formulários com campo de telefone detectam automaticamente o país do usuário e pré-selecionam o código:
- SmartContactForm
- VancouverInterestForm
- AcademyQuickForm

### Formulários com Notificação Email
Todos os formulários enviam para `/api/notify-form`:
- SmartContactForm
- VancouverInterestForm
- AcademyQuickForm
- BudgetWizard (via SmartContactForm)

---

## 🔧 MANUTENÇÃO

### Para adicionar novo formulário:
1. Criar arquivo em `src/components/NomeForm.tsx`
2. Usar classes padrão: `.input-adaptive`, `.dropdown-azimut`, `.label-adaptive`
3. Implementar geolocalização para telefone (se aplicável)
4. Conectar ao `/api/notify-form`
5. Adicionar redirecionamento para `/thank-you`
6. Testar em tema dark e light
7. Atualizar este mapa

### Para modificar altura de campos:
1. **Inputs normais:** Não modificar (48px padrão via CSS)
2. **Textareas:** Ajustar via atributo `rows={número}`
3. **Dropdowns:** Não modificar (48px padrão via CSS)

---

**Atualizado em:** 2026-01-11  
**Total de Formulários Ativos:** 4  
**Total de Páginas com Formulários:** 12 (3 páginas × 4 idiomas)
