# 📍 ONDE ESTÁ CADA COISA

## ✅ **BACKOFFICE (azimut-cms/) - CRM com IA**

### **Localização:** `azimut-cms/app/admin/leads/`

**Features implementadas:**
- ✅ Lista de leads (`/admin/leads`)
- ✅ Filtro por score
- ✅ Badge de score nos cards
- ✅ Modal de edição rápida (botão "✏️ Editar")
- ✅ Página de detalhes (`/admin/leads/[id]`)
- ✅ Painel de Insights IA (🤖 Análise IA)

**APIs:**
- ✅ `/api/admin/leads/[id]/ai-insights` - Insights IA
- ✅ `/api/admin/leads/[id]` - Atualizar lead

---

## ✅ **SITE PRINCIPAL (src/) - Formulário com IA**

### **Localização:** `src/components/SmartContactForm.tsx`

**Features implementadas:**
- ✅ Formulário inteligente (`/contact`)
- ✅ Sugestões IA em tempo real
- ✅ 14 campos qualificadores
- ✅ Score automático

**APIs:**
- ✅ `/api/ai/form-suggestions` - Sugestões para formulário
- ✅ `/api/leads` - Criar lead

---

## 🎯 **RESUMO:**

| Feature | Onde Está | Acesso |
|---------|-----------|--------|
| **CRM Completo** | Backoffice | `/admin/leads` |
| **Insights IA** | Backoffice | `/admin/leads/[id]` |
| **Edição Rápida** | Backoffice | Botão "Editar" nos cards |
| **Filtro Score** | Backoffice | Dropdown nos filtros |
| **Formulário IA** | Site Principal | `/contact` |
| **Sugestões IA** | Site Principal | Aparece no formulário |

---

**TUDO ESTÁ NO LUGAR CERTO! ✅**
