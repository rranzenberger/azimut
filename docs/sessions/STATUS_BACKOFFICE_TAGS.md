# 📋 STATUS: BACKOFFICE - SISTEMA DE TAGS

## ❌ **O QUE AINDA NÃO ESTÁ IMPLEMENTADO:**

### **1. Interface de Upload** ❌
- ❌ **FALTANDO:** Campos no formulário para preencher:
  - `pageSlug` (dropdown: "Para qual página?")
  - `sectionSlug` (dropdown: "Onde na página?")
  - `servicesTags` (multi-select: "Qual(is) serviço(s)?")
- ✅ **EXISTE:** Apenas campos básicos (tipo, arquivo, altPt, altEn)

### **2. Lista de Mídias** ❌
- ❌ **FALTANDO:** Lista/grid de mídias existentes
- ❌ **FALTANDO:** Exibição dos campos de tags (pageSlug, sectionSlug, servicesTags)
- ❌ **FALTANDO:** Filtros por tags
- ✅ **EXISTE:** Apenas formulário de upload (não lista mídias)

### **3. API** ✅
- ✅ **PRONTO:** API aceita e salva os campos
- ✅ **PRONTO:** GET /api/admin/media retorna os campos
- ✅ **PRONTO:** Endpoint público para buscar por tags

---

## 🔧 **O QUE PRECISA SER FEITO:**

### **1. Adicionar Campos no Formulário de Upload:**
```tsx
// Dropdown: Para qual página?
<select name="pageSlug">
  <option value="">Selecione...</option>
  <option value="what/cinema-audiovisual">Cinema & Audiovisual</option>
  <option value="what/pos-producao-vfx">Pós-Produção & VFX</option>
  // ... todos os 16 serviços
</select>

// Dropdown: Onde na página?
<select name="sectionSlug">
  <option value="">Selecione...</option>
  <option value="hero">Hero (Banner)</option>
  <option value="gallery">Galeria</option>
</select>

// Multi-select: Qual(is) serviço(s)?
// (checkboxes ou select múltiplo)
```

### **2. Criar Lista de Mídias:**
```tsx
// Grid/Lista de mídias com:
- Thumbnail da imagem
- Nome/ID
- pageSlug (se preenchido)
- sectionSlug (se preenchido)
- servicesTags (se preenchidos)
- Botão para editar tags
```

### **3. Adicionar Filtros:**
```tsx
// Filtrar por:
- pageSlug
- sectionSlug
- servicesTags
```

---

## ✅ **RESUMO:**

| Funcionalidade | Status |
|----------------|--------|
| API aceita campos | ✅ Pronto |
| API salva campos | ✅ Pronto |
| API retorna campos | ✅ Pronto |
| **Interface: campos no upload** | ❌ **Faltando** |
| **Interface: lista de mídias** | ❌ **Faltando** |
| **Interface: exibir tags** | ❌ **Faltando** |
| **Interface: filtrar por tags** | ❌ **Faltando** |

---

**CONCLUSÃO:** A API está pronta, mas a **interface do backoffice ainda não mostra os campos de tags nem lista as mídias**.
