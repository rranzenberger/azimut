# 📋 VALIDAÇÃO PADRÃO DE FORMULÁRIOS AZIMUT

## ✅ IMPLEMENTADO EM TODOS OS FORMULÁRIOS (Jan 2026)

---

## 🎯 REGRA UNIVERSAL: EMAIL **OU** TELEFONE

### Princípio:
- O usuário DEVE fornecer **pelo menos UM** dos dois
- Pode fornecer **ambos** se desejar
- Mas **não pode** enviar sem nenhum dos dois

---

## 📝 FORMULÁRIOS ATUALIZADOS:

### 1. ✅ **SmartContactForm** (`src/components/SmartContactForm.tsx`)
- **Localização:** `/pt/contact`, `/en/contact`, `/fr/contact`, `/es/contact`
- **Validação:** Email OU Telefone (mínimo 8 dígitos)
- **Aviso visual:** "💡 Pelo menos email OU telefone é necessário"
- **Commit:** `86204cf`

### 2. ✅ **VancouverInterestForm** (`src/components/VancouverInterestForm.tsx`)
- **Localização:** `/pt/vancouver`, `/en/vancouver`, `/fr/vancouver`, `/es/vancouver`
- **Validação:** Email OU WhatsApp (mínimo 8 dígitos)
- **Aviso visual:** "💡 Pelo menos email OU telefone é necessário"
- **Commit:** `7de75a2`

### 3. ✅ **AcademyQuickForm** (`src/components/AcademyQuickForm.tsx`)
- **Localização:** Home, Academy, modais
- **Validação:** Email OU Telefone (mínimo 8 dígitos)
- **Sem aviso visual** (formulário compacto)
- **Já estava correto** desde implementação inicial

### 4. ⏭️ **BudgetWizard** (`src/components/BudgetWizard.tsx`)
- **Não coleta email/telefone** → Não precisa desta validação
- Apenas dados do projeto (budget, prazo, tipo)

---

## 🔍 LÓGICA DE VALIDAÇÃO (Código JavaScript)

### Padrão implementado em todos:

```javascript
// 1. Verificar se tem PELO MENOS um
const hasEmail = formData.email && formData.email.trim()
const hasPhone = formData.phone && formData.phone.replace(/\D/g, '').length >= 8

if (!hasEmail && !hasPhone) {
  // ERRO: Precisa de pelo menos um
  setError('Por favor, preencha pelo menos seu email OU telefone.')
  return
}

// 2. Se tem email, validar formato
if (hasEmail) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.email)) {
    setError('Por favor, forneça um email válido (exemplo: seu@email.com).')
    return
  }
}

// 3. Se tem telefone, validar se está completo
if (formData.phone && formData.phone.replace(/\D/g, '').length > 0 && formData.phone.replace(/\D/g, '').length < 8) {
  setError('O número de telefone parece incompleto. Por favor, verifique.')
  return
}
```

---

## 📊 CENÁRIOS ACEITOS/REJEITADOS:

| Email | Telefone | Resultado | Mensagem de Erro |
|-------|----------|-----------|------------------|
| ✅ Válido | ❌ Vazio | ✅ **ACEITO** | - |
| ❌ Vazio | ✅ Completo (8+ dígitos) | ✅ **ACEITO** | - |
| ✅ Válido | ✅ Completo | ✅ **ACEITO** | - |
| ❌ Vazio | ❌ Vazio | ❌ **REJEITADO** | "Pelo menos email OU telefone" |
| ✅ Válido | ⚠️ Incompleto (< 8 dígitos) | ❌ **REJEITADO** | "Telefone incompleto" |
| ⚠️ Inválido (sem @) | ❌ Vazio | ❌ **REJEITADO** | "Email inválido" |
| ❌ Vazio | ⚠️ Incompleto (< 8 dígitos) | ❌ **REJEITADO** | "Pelo menos email OU telefone" |

---

## 💬 MENSAGENS DE ERRO (Multi-idioma):

### 1. **Nenhum dos dois preenchido:**
```javascript
pt: 'Por favor, preencha pelo menos seu email OU telefone.'
en: 'Please fill in at least your email OR phone.'
fr: 'Veuillez remplir au moins votre email OU téléphone.'
es: 'Por favor, complete al menos su correo electrónico O teléfono.'
```

### 2. **Email inválido (se preenchido):**
```javascript
pt: 'Por favor, forneça um email válido (exemplo: seu@email.com).'
en: 'Please provide a valid email (example: your@email.com).'
fr: 'Veuillez fournir un email valide (exemple: votre@email.com).'
es: 'Por favor, proporcione un correo electrónico válido (ejemplo: su@correo.com).'
```

### 3. **Telefone incompleto (se começou a preencher):**
```javascript
pt: 'O número de telefone parece incompleto. Por favor, verifique.'
en: 'The phone number seems incomplete. Please check.'
fr: 'Le numéro de téléphone semble incomplet. Veuillez vérifier.'
es: 'El número de teléfono parece incompleto. Por favor, verifique.'
```

---

## 🎨 AVISO VISUAL:

### Implementado em:
- **SmartContactForm** ✅
- **VancouverInterestForm** ✅
- **AcademyQuickForm** ❌ (formulário compacto, não necessário)

### Código:
```tsx
<p className="text-xs text-amber-400/80 mt-2 flex items-start gap-1.5">
  <span>💡</span>
  <span>
    {lang === 'pt' && 'Pelo menos email OU telefone é necessário'}
    {lang === 'en' && 'At least email OR phone is required'}
    {lang === 'fr' && 'Au moins email OU téléphone est requis'}
    {lang === 'es' && 'Al menos correo O teléfono es requerido'}
  </span>
</p>
```

### Visual:
```
💡 Pelo menos email OU telefone é necessário
```
- Cor: Âmbar (`text-amber-400/80`)
- Ícone: 💡 (lâmpada = "dica")
- Posição: Logo após campos de email/telefone

---

## 🔐 VALIDAÇÕES ESPECÍFICAS:

### Email (Regex):
```javascript
/^[^\s@]+@[^\s@]+\.[^\s@]+$/
```
- ✅ Aceita: `usuario@dominio.com`, `contato@empresa.com.br`
- ❌ Rejeita: `sem@dominio`, `@dominio.com`, `usuario@`

### Telefone (Contagem de dígitos):
```javascript
formData.phone.replace(/\D/g, '').length >= 8
```
- Remove formatação (espaços, parênteses, traços)
- Conta apenas números
- Mínimo: **8 dígitos**
- ✅ Aceita: Brasil `11987654321` (11 dígitos), Canadá `4165551234` (10 dígitos)
- ❌ Rejeita: `12345` (5 dígitos), `1234567` (7 dígitos)

---

## 🚀 PRÓXIMOS PASSOS (Futuros):

### Implementar `libphonenumber-js` (validação avançada):
```bash
npm install libphonenumber-js
```

```javascript
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js'

// Validar por país
const isValid = isValidPhoneNumber(formData.phone, countryCode)

// Formatar automaticamente
const parsed = parsePhoneNumber(formData.phone, countryCode)
const formatted = parsed.formatInternational() // +55 11 98765-4321
```

**Benefícios:**
- ✅ Validação por país (BR: 11 dígitos, CA: 10 dígitos)
- ✅ Detecta números inválidos (tipo `11 00000-0000`)
- ✅ Formatação automática inteligente
- ✅ Suporta 200+ países
- ✅ **100% gratuito** (biblioteca open-source)

---

## 📦 CLASSES CSS UTILIZADAS:

### Inputs e Textareas:
```css
.input-adaptive
```

### Dropdowns:
```css
.dropdown-azimut
```

### Labels:
```css
.label-adaptive
```

**Documentação completa:** `GUIA_FORMULARIOS_AZIMUT.md`

---

## 🧪 COMO TESTAR:

### Teste 1: Email válido, telefone vazio
1. Preencher nome
2. Preencher email válido (`teste@azimut.com`)
3. Deixar telefone vazio
4. Submeter
5. ✅ **Deve passar**

### Teste 2: Email vazio, telefone válido
1. Preencher nome
2. Deixar email vazio
3. Preencher telefone completo (`11987654321`)
4. Submeter
5. ✅ **Deve passar**

### Teste 3: Ambos vazios
1. Preencher nome
2. Deixar email vazio
3. Deixar telefone vazio
4. Submeter
5. ❌ **Deve falhar** → "Pelo menos email OU telefone"

### Teste 4: Email inválido
1. Preencher nome
2. Preencher email inválido (`teste@`) ou (`teste.com`)
3. Submeter
4. ❌ **Deve falhar** → "Email inválido"

### Teste 5: Telefone incompleto
1. Preencher nome
2. Deixar email vazio
3. Preencher telefone incompleto (`12345`)
4. Submeter
5. ❌ **Deve falhar** → "Telefone incompleto"

---

## 📌 COMMITS RELACIONADOS:

- `86204cf` - SmartContactForm: email OU telefone
- `7de75a2` - VancouverInterestForm: email OU telefone
- `74a574d` - AcademyQuickForm: já tinha email OU telefone

---

## 🛡️ GARANTIAS:

✅ **TODOS os formulários com validação consistente**  
✅ **Mensagens em 4 idiomas (PT/EN/FR/ES)**  
✅ **Avisos visuais claros antes de errar**  
✅ **Regex de email validado e testado**  
✅ **Validação de telefone por contagem de dígitos**  
✅ **UX amigável e intuitiva**  

---

**Última atualização:** 11 Jan 2026  
**Status:** ✅ IMPLEMENTADO EM PRODUÇÃO
