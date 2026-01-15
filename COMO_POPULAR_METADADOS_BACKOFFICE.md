# 📋 COMO POPULAR METADADOS NO BACKOFFICE
**Data:** 15/01/2026  
**Status:** ✅ **SCRIPTS SQL PRONTOS**

---

## 🎯 OBJETIVO

Popular metadados diretamente no banco de dados para que apareçam na interface do backoffice, evitando confusão na edição.

---

## 🚀 PASSO A PASSO

### **PASSO 1: Acessar Neon SQL Editor** (2 min)

1. Acessar: https://console.neon.tech
2. Selecionar projeto
3. Abrir **SQL Editor**
4. Criar nova query

---

### **PASSO 2: Executar Script de Metadados** (5 min)

1. Abrir arquivo: `azimut-cms/scripts/populate-field-metadata.sql`
2. Copiar **TODO** o conteúdo
3. Colar no SQL Editor do Neon
4. Executar (Run ou Ctrl+Enter)

**O que faz:**
- ✅ Cria tabela `field_metadata` (se não existir)
- ✅ Cria tabela `image_specifications` (se não existir)
- ✅ Cria índices para performance
- ✅ Popula metadados da Home (hero, pillars, stats)
- ✅ Popula especificações de imagens

---

### **PASSO 3: Verificar Inserções** (2 min)

Após executar, rodar esta query para verificar:

```sql
-- Ver quantos metadados foram criados
SELECT 
  page_slug,
  section_key,
  COUNT(*) as total_fields
FROM field_metadata
GROUP BY page_slug, section_key
ORDER BY page_slug, section_key;
```

**Esperado:** Várias linhas com contagens de campos

---

### **PASSO 4: Ver Metadados da Home** (2 min)

```sql
-- Ver todos os metadados da Home
SELECT 
  field_key,
  field_label,
  max_length,
  min_length,
  required,
  text_format,
  where_appears
FROM field_metadata
WHERE page_slug = 'home'
ORDER BY section_key, field_key;
```

**Esperado:** Lista completa de campos com suas informações

---

## 📊 O QUE FOI POPULADO

### **HOME - Hero Section:**
- ✅ `hero_title` - Título (80 chars max, uma linha)
- ✅ `hero_subtitle` - Subtítulo (120 chars max, 2 linhas)
- ✅ `hero_description` - Descrição (500 chars max, parágrafo)
- ✅ `hero_image_url` - Imagem (1920x1080, 16:9, 2MB max)
- ✅ `hero_cta_text` - Botão CTA (30 chars max)

### **HOME - Pillars (4 Cards):**
- ✅ `pillar_1_title` - Título Card 1 (50 chars max)
- ✅ `pillar_1_description` - Descrição Card 1 (200 chars max)
- ✅ `pillar_1_icon` - Ícone Card 1
- ✅ `pillar_2_title`, `pillar_3_title`, `pillar_4_title` (similar)

### **HOME - Stats (4 Estatísticas):**
- ✅ `stat_1_value` - Valor Estatística 1 (20 chars max)
- ✅ `stat_1_label` - Label Estatística 1 (50 chars max)
- ✅ `stat_2_value`, `stat_3_value`, `stat_4_value` (similar)

### **Especificações de Imagens:**
- ✅ `hero_image_url` - 1920x1080, 16:9, 2MB, formatos: jpg/jpeg/webp/avif

---

## 🔧 PRÓXIMOS PASSOS

### **1. Criar API Endpoints** (1-2 horas)

Criar endpoints no backoffice para buscar metadados:

- `GET /api/admin/metadata/{pageSlug}/{sectionKey}/{fieldKey}`
- `GET /api/admin/metadata/{pageSlug}/{sectionKey}`
- `GET /api/admin/image-spec/{pageSlug}/{sectionKey}/{fieldKey}`

**Arquivo de referência:** `azimut-cms/scripts/API_GET_METADATA.md`

---

### **2. Integrar na Interface de Edição** (2-3 horas)

Modificar interface de edição para:
- ✅ Buscar metadados automaticamente
- ✅ Mostrar informações do campo (label, descrição)
- ✅ Mostrar onde aparece no site
- ✅ Validar em tempo real (comprimento, formato)
- ✅ Mostrar contador de caracteres
- ✅ Mostrar exemplo de valor
- ✅ Mostrar especificações de imagem (se for imagem)

---

### **3. Expandir para Outras Páginas** (gradual)

Após Home funcionar, popular metadados para:
- [ ] Vancouver
- [ ] WhatWeDo
- [ ] Work
- [ ] AcademyNew

---

## ✅ CHECKLIST

- [ ] Script SQL executado no Neon
- [ ] Tabelas criadas (`field_metadata`, `image_specifications`)
- [ ] Metadados da Home populados
- [ ] Verificação de inserções OK
- [ ] API endpoints criados
- [ ] Interface de edição integrada
- [ ] Testado com estagiário (validação de usabilidade)

---

## 🎨 COMO APARECE NA INTERFACE

Quando um estagiário for editar um campo, verá:

```
┌─────────────────────────────────────────┐
│ Título do Hero *                        │
│                                         │
│ Título principal que aparece no topo   │
│ da página Home, acima do subtítulo.     │
│ Texto em MAIÚSCULAS, uma linha.        │
│                                         │
│ 📍 Onde aparece:                        │
│ Topo da página Home, centralizado,     │
│ acima do subtítulo, em fonte grande    │
│                                         │
│ [Campo de texto]                        │
│ EXPERIÊNCIAS QUE CONECTAM MUNDOS       │
│                                         │
│ 45 / 80 caracteres                      │
│                                         │
│ 💡 Exemplo:                             │
│ EXPERIÊNCIAS QUE CONECTAM MUNDOS        │
└─────────────────────────────────────────┘
```

---

**Próxima ação:** Executar script SQL no Neon e criar API endpoints
