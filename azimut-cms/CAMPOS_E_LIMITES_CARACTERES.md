# 📏 LIMITES DE CARACTERES - CAMPOS EDITÁVEIS NO BACKOFFICE

**Data:** Janeiro 2025  
**Finalidade:** Documentar tamanhos máximos recomendados para cada campo editável

---

## 📄 TABELA: Page

### **Campos Básicos:**

| Campo | Localização | Max Caracteres | Descrição |
|-------|-------------|----------------|-----------|
| `name` | Páginas > Informações Básicas > Nome | **100** | Nome da página (ex: "Home", "Studio") |
| `seoTitlePt` | Páginas > SEO > Título > Português | **60** | Título SEO em português (Google mostra até 60) |
| `seoTitleEn` | Páginas > SEO > Título > English | **60** | Título SEO em inglês |
| `seoDescPt` | Páginas > SEO > Descrição > Português | **160** | Meta descrição SEO em português (Google recomenda 150-160) |
| `seoDescEn` | Páginas > SEO > Descrição > English | **160** | Meta descrição SEO em inglês |

### **Hero Section:**

| Campo | Localização | Max Caracteres | Descrição |
|-------|-------------|----------------|-----------|
| `heroSloganPt` | Páginas > Hero > Slogan > Português | **200** | Texto principal do hero (título curto) |
| `heroSloganEn` | Páginas > Hero > Slogan > English | **200** | Hero slogan em inglês |
| `heroSloganEs` | Páginas > Hero > Slogan > Español | **200** | Hero slogan em espanhol |
| `heroSloganFr` | Páginas > Hero > Slogan > Français | **200** | Hero slogan em francês |
| `heroSubtitlePt` | Páginas > Hero > Subtitle > Português | **500** | Texto secundário do hero (subtítulo) |
| `heroSubtitleEn` | Páginas > Hero > Subtitle > English | **500** | Hero subtitle em inglês |
| `heroSubtitleEs` | Páginas > Hero > Subtitle > Español | **500** | Hero subtitle em espanhol |
| `heroSubtitleFr` | Páginas > Hero > Subtitle > Français | **500** | Hero subtitle em francês |

---

## 📑 TABELA: Section

### **Campos de Seção:**

| Campo | Localização | Max Caracteres | Descrição |
|-------|-------------|----------------|-----------|
| `type` | Seções > Tipo | **50** | Tipo da seção (ex: "heritage", "pillars", "research") |
| `layout` | Seções > Layout | **50** | Layout da seção (ex: "grid-2", "grid-3", "list") |
| `titlePt` | Seções > Título > Português | **200** | Título da seção em português |
| `titleEn` | Seções > Título > English | **200** | Título da seção em inglês |
| `titleEs` | Seções > Título > Español | **200** | Título da seção em espanhol |
| `titleFr` | Seções > Título > Français | **200** | Título da seção em francês |
| `bodyPt` | Seções > Corpo > Português | **5000** | Corpo/descrição da seção (texto longo) |
| `bodyEn` | Seções > Corpo > English | **5000** | Corpo da seção em inglês |
| `bodyEs` | Seções > Corpo > Español | **5000** | Corpo da seção em espanhol |
| `bodyFr` | Seções > Corpo > Français | **5000** | Corpo da seção em francês |

**Nota:** Sections podem ter dados adicionais via JSON no campo `body` se necessário para estruturas mais complexas (listas, arrays, etc.)

---

## 🎯 COMO USAR NO BACKOFFICE

### **Na Interface de Edição:**

1. Cada campo deve mostrar:
   - 📍 **Localização:** "Páginas > Hero > Slogan > Português"
   - 📏 **Limite máximo:** "Máximo: 200 caracteres"
   - 🔢 **Contador:** "150 / 200"
   - ⚠️ **Aviso:** Se exceder o limite

2. **Exemplo de exibição:**
   ```
   📍 Páginas > Hero > Slogan > Português
   Hero Slogan (Português)
   [campo de texto]
   Máximo: 200 caracteres                    150 / 200
   ```

3. **Cores do contador:**
   - 🟢 Verde: < 80% do limite
   - 🟡 Amarelo: 80-100% do limite
   - 🔴 Vermelho: > 100% do limite

---

## 📊 RESUMO RÁPIDO

**Campos curtos (até 200):**
- name: 100
- seoTitle: 60
- heroSlogan: 200
- section title: 200

**Campos médios (200-500):**
- seoDesc: 160
- heroSubtitle: 500

**Campos longos (500+):**
- section body: 5000

---

## ⚠️ IMPORTANTE

- Esses limites são **recomendações** baseadas em boas práticas
- Campos podem aceitar mais caracteres no banco (TEXT), mas:
  - SEO titles > 60 caracteres podem ser cortados no Google
  - SEO descriptions > 160 podem ser cortadas
  - Hero slogans muito longos podem quebrar o layout
  - Sempre valide no frontend antes de salvar


