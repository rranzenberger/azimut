# 🔴 PROBLEMAS IDENTIFICADOS NOS FORMULÁRIOS

**Data:** 11 Jan 2026  
**Status:** Investigação em andamento

---

## ✅ PROBLEMA 1: RESOLVIDO - Campo POSITION no SmartContactForm

### **Descrição:**
O campo "YOUR POSITION" estava abaixo do campo de telefone, mas o usuário queria que ficasse ao lado.

### **Solução:**
✅ **IMPLEMENTADO** - Movido campo POSITION para a mesma linha (grid) que o telefone

**Commit:** `535d957` - "fix: mover campo POSITION ao lado do telefone no SmartContactForm"

**Status:** ✅ **RESOLVIDO**

---

## ⚠️ PROBLEMA 2: Tamanho do Dropdown VancouverInterestForm

### **Descrição:**
Usuário reportou que o tamanho do dropdown não mudou no formulário de Vancouver, mesmo após implementação da classe `.dropdown-azimut`.

### **Possíveis Causas:**
1. **Cache do navegador** - CSS não atualizado
2. **CSS não carregando** - Classe `.dropdown-azimut` não sendo aplicada
3. **Estilos inline** - `style={{ width: '115px' }}` pode estar sobrescrevendo

### **Código Atual:**
```tsx
<select
  value={formData.countryCode}
  onChange={(e) => setFormData(prev => ({ ...prev, countryCode: e.target.value, whatsapp: '' }))}
  className="dropdown-azimut"
  style={{ width: '115px', minWidth: '115px', maxWidth: '115px', flexShrink: 0 }}
>
```

### **Status:** ⚠️ **VERIFICANDO** - Pode ser cache do navegador

### **Ação Recomendada:**
1. Limpar cache do navegador (Ctrl+Shift+R / Cmd+Shift+R)
2. Verificar se CSS está carregando (F12 → Console)
3. Verificar se classe `.dropdown-azimut` está no `index.css`

---

## 🔴 PROBLEMA 3: Erro de Validação do Backend - Campos Obrigatórios Antigos

### **Descrição:**
Erro ao enviar formulário de Vancouver:

```
Campos obrigatórios faltando: 
whatsapp, age, city, currentSituation, targetSchool, 
areaInterest, intakeYear, englishLevel, hasPortfolio, 
budgetRange, fundingSource, howHeard
```

### **Causa Identificada:**
O **backend** (`/api/leads/vancouver`) ainda está validando campos como **obrigatórios** que o frontend já tornou **opcionais**.

### **Validação Frontend (Atual):**
```javascript
// Validação suave - só essenciais
if (!formData.name || !formData.name.trim()) {
  setError('Por favor, preencha seu nome.')
  return
}

// Validar se tem PELO MENOS email OU telefone
const hasEmail = formData.email && formData.email.trim()
const hasPhone = formData.whatsapp && formData.whatsapp.replace(/\D/g, '').length >= 8

if (!hasEmail && !hasPhone) {
  setError('Por favor, preencha pelo menos seu email OU telefone.')
  return
}
```

### **Validação Backend (Antiga):**
O backend ainda está esperando que esses campos tenham valores:
- `whatsapp` (obrigatório)
- `age` (obrigatório)
- `city` (obrigatório)
- `currentSituation` (obrigatório)
- `targetSchool` (obrigatório)
- `areaInterest` (obrigatório)
- `intakeYear` (obrigatório)
- `englishLevel` (obrigatório)
- `hasPortfolio` (obrigatório)
- `budgetRange` (obrigatório)
- `fundingSource` (obrigatório)
- `howHeard` (obrigatório)

### **Problema:**
- Frontend envia campos opcionais como **strings vazias** (`''`)
- Backend rejeita strings vazias como "campo obrigatório faltando"

### **Soluções Possíveis:**

#### **Opção A: Atualizar Backend** (RECOMENDADO) ⭐
```typescript
// No backend: azimut-cms/app/api/leads/vancouver/route.ts
// Remover validação de campos opcionais ou tornar opcionais no schema Prisma

// Campos obrigatórios apenas:
- name: obrigatório
- email OU whatsapp: pelo menos um

// Todos os outros: opcionais
```

**Vantagens:**
- ✅ Solução correta e permanente
- ✅ Alinha frontend e backend
- ✅ Permite formulário flexível

**Desvantagens:**
- ⏳ Requer acesso ao código do backend
- ⏳ Requer deploy do backend

#### **Opção B: Enviar Valores Padrão do Frontend** (WORKAROUND)
```javascript
// Enviar "N/A" ou null em vez de strings vazias
const submitData = {
  ...formData,
  whatsapp: formData.whatsapp || null,
  age: formData.age || null,
  city: formData.city || null,
  // ... etc
}
```

**Vantagens:**
- ✅ Solução rápida
- ✅ Não requer mudanças no backend

**Desvantagens:**
- ❌ Backend ainda valida campos como obrigatórios
- ❌ Pode causar problemas se backend espera strings não-vazias
- ❌ Solução temporária, não permanente

#### **Opção C: Não Enviar Campos Vazios** (WORKAROUND)
```javascript
// Remover campos vazios do payload
const submitData = Object.entries(formData).reduce((acc, [key, value]) => {
  if (value && value.trim && value.trim() !== '') {
    acc[key] = value
  } else if (value !== '' && value !== null && value !== undefined) {
    acc[key] = value
  }
  return acc
}, {} as any)
```

**Vantagens:**
- ✅ Não envia dados desnecessários
- ✅ Mais limpo

**Desvantagens:**
- ❌ Backend pode ainda validar campos ausentes
- ❌ Depende de como backend trata campos ausentes

### **Status:** 🔴 **PENDENTE** - Requer ação no backend

### **Recomendação:**
⭐ **OPÇÃO A** - Atualizar backend para tornar campos opcionais

**Localização do Backend:**
- `azimut-cms/app/api/leads/vancouver/route.ts`
- Schema Prisma: `azimut-cms/prisma/schema.prisma` (model VancouverLead)

---

## 📋 RESUMO DE AÇÕES NECESSÁRIAS

### ✅ **FEITO:**
1. Campo POSITION movido ao lado do telefone no SmartContactForm

### ⚠️ **VERIFICAR:**
2. Cache do navegador para dropdown Vancouver
3. CSS carregando corretamente

### 🔴 **REQUER AÇÃO:**
4. **ATUALIZAR BACKEND** - Remover validação de campos opcionais
   - Localização: `azimut-cms/app/api/leads/vancouver/route.ts`
   - Schema: `azimut-cms/prisma/schema.prisma`

---

## 🚀 PRÓXIMOS PASSOS

### **Imediato:**
1. Limpar cache do navegador (Ctrl+Shift+R)
2. Testar dropdown Vancouver novamente
3. Se ainda não funcionar, verificar CSS no F12

### **Urgente:**
4. **Atualizar backend** para tornar campos opcionais
5. Testar envio de formulário após atualização

### **Futuro:**
6. Alinhar validação frontend e backend
7. Documentar campos obrigatórios vs opcionais

---

**Última atualização:** 11 Jan 2026  
**Próxima ação:** Atualizar backend ou implementar workaround
