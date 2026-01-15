# 🚀 PRÓXIMOS PASSOS BACKOFFICE - IMEDIATOS
**Data:** 15/01/2026  
**Status:** ✅ **PRONTO PARA COMEÇAR**

---

## 🎯 OBJETIVO

Integrar backoffice gradualmente, página por página, permitindo edição de textos e imagens sem precisar pedir mudanças básicas.

---

## ✅ CHECKLIST INICIAL (30 minutos)

### **1. Verificar Conexão Neon DB** (5 min)
```bash
# Opção A: Via Neon Dashboard
1. Acessar: https://console.neon.tech
2. Selecionar projeto
3. Abrir SQL Editor
4. Executar: SELECT version();
```

**Esperado:** Versão do PostgreSQL retornada

### **2. Auditar Estrutura Atual** (10 min)
```sql
-- Ver tabelas existentes
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Ver estrutura da tabela Page (se existir)
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'Page';

-- Ver páginas existentes
SELECT slug, "heroSloganPt", "heroSubtitlePt" 
FROM "Page" 
LIMIT 5;
```

### **3. Verificar Backoffice Online** (5 min)
```bash
# Testar API
curl https://backoffice.azmt.com.br/api/health

# Testar endpoint de conteúdo
curl "https://backoffice.azmt.com.br/api/public/content?lang=pt&page=home"
```

**Esperado:** Resposta JSON ou erro específico

### **4. Criar Backup** (10 min)
```sql
-- Exportar dados atuais (se houver)
-- Via Neon Dashboard: Settings → Export Database
```

---

## 📋 ESCOLHER PÁGINA PILOTO

### **Opção A: Home.tsx** ⭐ RECOMENDADO
**Vantagens:**
- Mais simples (só hero + pillars)
- Menos campos para migrar
- Fácil de testar

**Campos a migrar:**
- Hero: title, subtitle, description
- Pillars: 4 cards (title, description, icon)
- SEO: title, description

### **Opção B: Vancouver.tsx**
**Vantagens:**
- Conteúdo rico e completo
- Já tem estrutura multilíngue
- Mais impacto visual

**Campos a migrar:**
- Hero: title, subtitle, description, badges
- Stats: 4 estatísticas
- Sections: múltiplas seções
- SEO: title, description

---

## 🔧 IMPLEMENTAÇÃO - PÁGINA PILOTO (Home)

### **PASSO 1: Verificar/Criar Estrutura no Backoffice**

#### **1.1. Verificar se tabela Page existe:**
```sql
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'Page'
);
```

#### **1.2. Se não existir, criar (via Prisma):**
```bash
# No diretório azimut-cms
npx prisma migrate dev --name add_pages_multilingual
```

#### **1.3. Verificar estrutura atual:**
```sql
-- Ver colunas da tabela Page
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'Page'
ORDER BY ordinal_position;
```

---

### **PASSO 2: Popular Conteúdo Home - PT**

```sql
-- 1. Verificar se página home existe
SELECT id, slug FROM "Page" WHERE slug = 'home';

-- 2. Criar página se não existir
INSERT INTO "Page" (slug, "heroSloganPt", "heroSubtitlePt")
VALUES (
  'home',
  'EXPERIÊNCIAS QUE CONECTAM MUNDOS',
  'Criamos experiências imersivas entre Brasil e Canadá.'
)
ON CONFLICT (slug) DO UPDATE SET
  "heroSloganPt" = EXCLUDED."heroSloganPt",
  "heroSubtitlePt" = EXCLUDED."heroSubtitlePt";

-- 3. Verificar inserção
SELECT slug, "heroSloganPt", "heroSubtitlePt" 
FROM "Page" 
WHERE slug = 'home';
```

---

### **PASSO 3: Testar API**

```bash
# Testar endpoint
curl "https://backoffice.azmt.com.br/api/public/content?lang=pt&page=home"

# Resposta esperada:
{
  "page": {
    "heroSlogan": "EXPERIÊNCIAS QUE CONECTAM MUNDOS",
    "heroSubtitle": "Criamos experiências imersivas entre Brasil e Canadá."
  }
}
```

---

### **PASSO 4: Atualizar Frontend (se necessário)**

Verificar se `Home.tsx` já usa `useAzimutContent`:

```typescript
// Se já usa, está pronto!
const { content: cmsContent } = useAzimutContent({ 
  page: 'home',
  lang 
})

// Se não usa, adicionar:
const heroSlogan = cmsContent?.page?.heroSlogan || t.hero.slogan
const heroSubtitle = cmsContent?.page?.heroSubtitle || t.hero.subtitle
```

---

### **PASSO 5: Popular Traduções (EN, ES, FR)**

```sql
-- Inglês
UPDATE "Page" 
SET 
  "heroSloganEn" = 'EXPERIENCES THAT CONNECT WORLDS',
  "heroSubtitleEn" = 'We create immersive experiences between Brazil and Canada.'
WHERE slug = 'home';

-- Francês
UPDATE "Page" 
SET 
  "heroSloganFr" = 'EXPÉRIENCES QUI CONNECTENT LES MONDES',
  "heroSubtitleFr" = 'Nous créons des expériences immersives entre le Brésil et le Canada.'
WHERE slug = 'home';

-- Espanhol
UPDATE "Page" 
SET 
  "heroSloganEs" = 'EXPERIENCIAS QUE CONECTAN MUNDOS',
  "heroSubtitleEs" = 'Creamos experiencias inmersivas entre Brasil y Canadá.'
WHERE slug = 'home';
```

---

## 🎨 MELHORIAS DE MÍDIAS

### **Sistema de Upload Otimizado:**

1. **Biblioteca Central:**
   - Todas as imagens em um lugar
   - Busca por tags/página
   - Preview antes de usar

2. **Compressão Automática:**
   - WebP/AVIF automático
   - Thumbnails gerados
   - Lazy loading

3. **Alt Text Multilíngue:**
   - PT, EN, ES, FR
   - SEO otimizado
   - Acessibilidade

---

## 📊 PRÓXIMAS PÁGINAS (Após Home funcionar)

### **Prioridade 1:**
1. **Vancouver.tsx** - Página rica, muito conteúdo
2. **WhatWeDo.tsx** - Serviços (6 cards)
3. **Work.tsx** - Projetos (grid)

### **Prioridade 2:**
4. **AcademyNew.tsx** - Academy principal
5. **ServiceDetail.tsx** - Detalhes de serviços
6. **ProjectDetail.tsx** - Detalhes de projetos

---

## 🛡️ GARANTIAS

### **Nunca Quebrar:**
- ✅ Fallback sempre presente
- ✅ Timeout curto (5s)
- ✅ Erros silenciosos
- ✅ Testes antes de deploy

### **Rollback Rápido:**
```sql
-- Reverter Home para conteúdo estático
UPDATE "Page" 
SET 
  "heroSloganPt" = NULL,
  "heroSubtitlePt" = NULL
WHERE slug = 'home';
```

---

## ✅ CRITÉRIOS DE SUCESSO

- [ ] Home editável no backoffice
- [ ] Funciona em 4 idiomas
- [ ] Site nunca quebra (fallback)
- [ ] Upload de imagens funcionando
- [ ] Equipe consegue editar sem ajuda técnica

---

## 🚀 COMANDOS ÚTEIS

### **Verificar Neon DB:**
```bash
# Via Neon Dashboard SQL Editor
SELECT * FROM "Page" WHERE slug = 'home';
```

### **Testar API:**
```bash
curl "https://backoffice.azmt.com.br/api/public/content?lang=pt&page=home"
```

### **Ver logs do backoffice:**
```bash
# Vercel Dashboard → Functions → Logs
```

---

**Próxima ação:** Escolher página piloto e começar PASSO 1 (Verificar estrutura)
