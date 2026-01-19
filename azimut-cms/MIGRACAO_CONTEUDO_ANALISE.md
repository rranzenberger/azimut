# 📊 ANÁLISE: Migração de Conteúdo Site → Banco de Dados

## ✅ O QUE JÁ ESTÁ NO BANCO DE DADOS

### **Página Home (`slug: 'home'`)** - ✅ JÁ MIGRADO

**Campos atuais no banco:**
- ✅ `heroSloganPt`: "Experiências que Conectam Mundos"
- ✅ `heroSloganEn`: "Experiences that Connect Worlds"
- ✅ `heroSloganEs`: "Experiencias que Conectan Mundos"
- ✅ `heroSloganFr`: "Expériences qui Connectent les Mondes"
- ✅ `seoTitlePt`: "Azimut - Experiências Imersivas, Interativas e Cinematográficas"
- ✅ `seoTitleEn`: "Azimut - Immersive, Interactive and Cinematic Experiences"
- ✅ `seoDescPt`: "Estúdio criativo-tecnológico especializado em cenografia digital, VR/XR e IA."
- ✅ `seoDescEn`: "Creative-tech studio specialized in digital scenography, VR/XR and AI."

**Status:** ✅ Já está sendo usado pelo site via `useAzimutContent` (Home.tsx linha 28)

---

## ⏳ O QUE ESTÁ NO CÓDIGO MAS AINDA NÃO ESTÁ NO BANCO

### **1. Hero Subtitle** - ❌ NÃO MIGRADO

**No código (`src/data/content.ts`):**
```typescript
homeContent.hero.subtitle = {
  pt: 'Após 30 anos explorando diferentes caminhos, descobrimos que nossa combinação de curadoria de festivais, produção comercial, educação e pesquisa é única. Transformamos espaços culturais, marcas e experiências imersivas entre Brasil e Canadá.',
  en: 'After 30 years exploring different paths, we discovered our combination of festival curation, commercial production, education and research is unique. We transform cultural spaces, brands and immersive experiences between Brazil and Canada.',
  es: 'Tras 30 años explorando diferentes caminos, descubrimos que nuestra combinación de curaduría de festivales, producción comercial, educación e investigación es única. Transformamos espacios culturales, marcas y experiencias inmersivas entre Brasil y Canadá.'
}
```

**Solução:** Adicionar campos `heroSubtitlePt`, `heroSubtitleEn`, `heroSubtitleEs`, `heroSubtitleFr` na tabela `Page`

---

### **2. Pillars (Pilares)** - ❌ NÃO MIGRADO

**No código:**
```typescript
pillars: [
  { pt: 'Museus & Cultura', en: 'Museums & Culture', es: 'Museos & Cultura' },
  { pt: 'Marcas & Eventos', en: 'Brands & Events', es: 'Marcas & Eventos' },
  { pt: 'Educação & Pesquisa', en: 'Education & Research', es: 'Educación & Investigación' }
]
```

**Solução:** Criar uma `Section` do tipo `'pillars'` na página home, ou adicionar como JSON na tabela Page

---

### **3. Why (Por que escolher)** - ❌ NÃO MIGRADO

**No código:**
```typescript
why: [
  { pt: 'Arte + Tech + Cinema + Educação, 30 anos de prática.', en: '...', es: '...' },
  { pt: 'Binacional Brasil–Canadá, cultura + marcas + governo.', en: '...', es: '...' },
  { pt: 'VR/IA com curadoria em festivais (Gramado, FAM, Rio2C).', en: '...', es: '...' },
  { pt: 'Ponta a ponta: conceito → roteiro → instalação → métricas.', en: '...', es: '...' },
  { pt: 'Equipe sênior em audiovisual, XR, IA e cenografia digital.', en: '...', es: '...' }
]
```

**Solução:** Criar uma `Section` do tipo `'why'` na página home com lista de itens

---

### **4. Outras Páginas** - ❌ NÃO MIGRADAS

- ❌ **Studio** (`studioContent.ts`) - Conteúdo completo ainda não migrado
- ❌ **Academy** - Conteúdo ainda no código
- ❌ **What We Do** - Conteúdo ainda no código
- ❌ **Work** - Conteúdo ainda no código

---

## 🎯 RECOMENDAÇÕES: O QUE FAZER AGORA

### **PRIORIDADE ALTA (Fácil de migrar):**

1. ✅ **Hero Subtitle** 
   - Adicionar migration para campos `heroSubtitlePt/En/Es/Fr`
   - Atualizar seed.ts com os textos existentes
   - Atualizar interface de edição para incluir subtitle
   - Limite sugerido: 500 caracteres

2. ✅ **Atualizar seed.ts com textos atuais**
   - Os textos já existem no código, só precisam ser copiados para o seed

### **PRIORIDADE MÉDIA (Requer Sections):**

3. ⏳ **Pillars e Why**
   - Usar o sistema de Sections que já existe
   - Criar sections do tipo 'pillars' e 'why' na página home
   - Cada item seria uma Section com título multilíngue

### **PRIORIDADE BAIXA (Trabalho maior):**

4. ⏳ **Migrar outras páginas completas**
   - Studio, Academy, What We Do, Work
   - Criar páginas no banco com suas sections

---

## 📝 PRÓXIMOS PASSOS SUGERIDOS

1. **Adicionar Hero Subtitle ao banco** ✅ RECOMENDADO COMEÇAR AQUI
   - Migration rápida
   - Interface de edição já preparada
   - Textos já existem

2. **Migrar Pillars e Why via Sections**
   - Criar interface de gerenciamento de sections
   - Adicionar sections na página home

3. **Completar migração de outras páginas**
   - Criar páginas no banco
   - Migrar conteúdo via sections

---

## 🔍 COMO USAR OS TEXTOS QUE JÁ ESTÃO NO BANCO

O site já está configurado para usar os textos do banco! 

**No código (`src/pages/Home.tsx` linha 28):**
```typescript
const heroSlogan = cmsContent?.page?.heroSlogan || locale(contentModel.home.hero.title)
```

**Funcionamento:**
- ✅ Se o CMS responder, usa `heroSlogan` do banco
- ✅ Se falhar, usa fallback do código local
- ✅ Já está funcionando!

**Para editar:**
- Acesse `/admin/site-pages`
- Clique na página "Home"
- Edite o campo "Hero Slogan" 
- Salve e o site usará automaticamente

---

**Status:** ✅ Sistema funcional, apenas precisa migrar conteúdo restante!


