# 🐛 CORREÇÃO: Duplicação de Prefixos de Idioma

**Data**: 3 de Janeiro de 2026  
**Status**: ✅ **CORRIGIDO**

---

## 🔴 **PROBLEMA IDENTIFICADO**

### **Bug 1: Duplicação de Prefixos** `/fr/fr/fr/...`
Ao trocar idiomas múltiplas vezes, os prefixos se acumulavam:
- Primeira troca: `/pt` → `/fr` ✅
- Segunda troca: `/fr` → `/en/fr` ❌
- Terceira troca: `/en/fr` → `/pt/en/fr` ❌

**Causa**: A função `changeLang()` só removia o prefixo do idioma **atual**, não qualquer prefixo.

```typescript
// ANTES (ERRADO)
const currentPath = location.pathname.replace(`/${currentLang}`, '')
// Se currentLang='en' mas URL='/fr', não remove nada!

// DEPOIS (CORRETO)
const currentPath = location.pathname.replace(/^\/(pt|en|fr|es)/, '')
// Remove QUALQUER prefixo de idioma
```

---

### **Bug 2: Duplicação em Links** `/pt/pt/studio`
Links internos podiam adicionar prefixo duplicado se o caminho já tivesse um.

**Causa**: `getLangPath()` não verificava se o path já tinha prefixo.

```typescript
// ANTES (ERRADO)
const cleanPath = path.startsWith('/') ? path : `/${path}`
return `/${targetLang}${cleanPath}`
// Se path='/pt/studio', retorna '/en/pt/studio' ❌

// DEPOIS (CORRETO)
let cleanPath = path.startsWith('/') ? path : `/${path}`
cleanPath = cleanPath.replace(/^\/(pt|en|fr|es)/, '')
if (!cleanPath.startsWith('/')) cleanPath = `/${cleanPath}`
return `/${targetLang}${cleanPath}`
// Se path='/pt/studio', retorna '/en/studio' ✅
```

---

## ✅ **CORREÇÕES APLICADAS**

### **Arquivo**: `src/hooks/useLanguageRoute.ts`

1. **`changeLang()`**: Usa regex para remover QUALQUER prefixo
2. **`getLangPath()`**: Remove prefixo existente antes de adicionar novo

---

## ⚠️ **PROBLEMA DO BACKOFFICE (Texto em Português)**

### **O que você viu:**
```
"EXPERIÊNCIAS QUE CONECTAM MUNDOS"
"Criamos experiências imersivas entre Brasil e Canadá."
"MUSEUMS & CULTURE"
"BRANDS & EVENTS"
"EDUCATION & RESEARCH"
```

Mesmo em **inglês**, o texto hero aparece em **português**.

---

### **POR QUE ISSO ACONTECE?**

O texto da **Home page** vem de **2 fontes**:

#### **1. Backoffice (PostgreSQL)** → Hero dinâmico
```typescript
// src/pages/Home.tsx
const heroContent = content?.heroSection || {
  title: "Default Title",
  subtitle: "Default Subtitle"
}
```

Se o backoffice **não tem** o hero em inglês/francês/espanhol, ele **mostra vazio** ou usa o fallback em português.

#### **2. Arquivo `i18n.ts`** → Pills e botões
```typescript
// src/i18n.ts
export const translations = {
  en: {
    pillMuseums: "MUSEUMS & CULTURE",
    pillBrands: "BRANDS & EVENTS",
    // ...
  },
  pt: {
    pillMuseums: "MUSEUS & CULTURA",
    pillBrands: "MARCAS & EVENTOS",
    // ...
  }
}
```

Essas **pills** estão traduzidas e funcionam!

---

### **SOLUÇÃO**

Você precisa **popular o backoffice** com conteúdo em **todos os idiomas**.

#### **Opção 1: Via Interface do Backoffice** (Recomendado)
1. Acesse o backoffice PostgreSQL (Vercel/Local)
2. Encontre a tabela `hero_content` ou similar
3. Adicione versões em EN, FR, ES para cada campo

#### **Opção 2: Via Script** (Rápido)
Posso criar um script para popular automaticamente:

```typescript
// scripts/seed-hero-i18n.ts
const heroContent = {
  en: {
    title: "EXPERIENCES THAT CONNECT WORLDS",
    subtitle: "We create immersive experiences between Brazil and Canada."
  },
  fr: {
    title: "EXPÉRIENCES QUI CONNECTENT LES MONDES",
    subtitle: "Nous créons des expériences immersives entre le Brésil et le Canada."
  },
  es: {
    title: "EXPERIENCIAS QUE CONECTAN MUNDOS",
    subtitle: "Creamos experiencias inmersivas entre Brasil y Canadá."
  },
  pt: {
    title: "EXPERIÊNCIAS QUE CONECTAM MUNDOS",
    subtitle: "Criamos experiências imersivas entre Brasil e Canadá."
  }
}
```

---

## 🚀 **TESTES AGORA**

Reinicie o dev server:

```bash
npm run dev
```

Teste a correção:
1. Acesse `localhost:1753/pt`
2. Troque para FR → URL deve ser `localhost:1753/fr` ✅
3. Troque para EN → URL deve ser `localhost:1753/en` ✅
4. Troque para ES → URL deve ser `localhost:1753/es` ✅
5. Navegue para Studio → URL deve ser `localhost:1753/es/studio` ✅

**NÃO deve mais duplicar prefixos!** ✅

---

## 📝 **PRÓXIMOS PASSOS**

1. ✅ Testar correção de duplicação
2. ⏳ Decidir se quer popular backoffice ou usar fallback em `i18n.ts`
3. ⏳ Deploy

**Quer que eu crie o script para popular o backoffice automaticamente?** 🚀

