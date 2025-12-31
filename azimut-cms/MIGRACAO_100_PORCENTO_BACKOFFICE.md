# 🚀 Migração 100% Backoffice - Em Andamento

**Data:** 2025-01-27  
**Status:** 🔄 **EM PROGRESSO**

## 📋 Objetivo

Remover toda duplicidade de conteúdo e fazer o site usar **100% do backoffice** como fonte única de verdade.

## ✅ Progresso

### Completado
- [x] ✅ **Home.tsx** - Migrado para 100% backoffice
  - Removido fallback para `contentModel`
  - Usando `useAzimutContent` para hero e projetos
  - Projetos vêm de `cmsContent.highlightProjects`

### Em Progresso
- [ ] 🔄 **Work.tsx** - Parcialmente migrado
  - Hook `useAzimutContent` adicionado
  - Removido `contentModel.cases`
  - Ainda precisa ajustar uso de `locale()`, `mediaPoster`, `services`
  - Precisa usar `heroImage`, `tags`, `summary` do backoffice

### Pendente
- [ ] ⏳ **WhatWeDo.tsx** - Precisa migrar
  - Atualmente usa `contentModel.services`
  - Precisa usar `useAzimutContent` ou `useBackofficeServices`
  - Serviços vêm de `cmsContent.services`

- [ ] ⏳ **Academy.tsx** - Precisa migrar
  - Atualmente usa `contentModel.lab`
  - Precisa usar `useBackofficeContent` para página academy

- [ ] ⏳ **Research.tsx** - Precisa migrar
  - Atualmente usa `contentModel.lab`
  - Precisa usar `useBackofficeContent` para página academy/research

## 🔄 Estrutura de Dados

### Backoffice → Site (API `/api/public/content`)

**Projetos:**
```typescript
{
  slug: string
  title: string  // JÁ TRADUZIDO (não precisa locale())
  shortTitle?: string
  summary: string  // JÁ TRADUZIDO (substitui shortDescription)
  city?: string
  country?: string
  tags: string[]  // JÁ TRADUZIDO (substitui services)
  heroImage?: {
    large?: string  // Substitui mediaPoster
    medium?: string
    alt?: string
  }
}
```

**Serviços:**
```typescript
{
  slug: string
  title: string  // JÁ TRADUZIDO
  description?: string  // JÁ TRADUZIDO
  icon?: string
}
```

## 🔧 Mudanças Necessárias

### Work.tsx
1. ✅ Remover `import contentModel`
2. ✅ Adicionar `useAzimutContent`
3. ⏳ Remover função `locale()` 
4. ⏳ Trocar `item.title` → `item.title` (já traduzido)
5. ⏳ Trocar `item.shortDescription` → `item.summary`
6. ⏳ Trocar `item.mediaPoster` → `item.heroImage?.large`
7. ⏳ Trocar `item.services` → `item.tags`
8. ⏳ Trocar `item.location` → `[item.city, item.country]`

### WhatWeDo.tsx
1. Remover `import contentModel`
2. Adicionar `useAzimutContent({ page: 'what' })`
3. Usar `cmsContent.services` (já traduzidos)
4. Remover função `locale()`

### Academy.tsx e Research.tsx
1. Remover `import contentModel`
2. Adicionar `useBackofficeContent('academy', lang)` ou `useAzimutContent`
3. Usar `cmsContent.page` para conteúdo

## ⚠️ Notas Importantes

- **NÃO usar `locale()`** - dados já vêm traduzidos do backoffice
- **NÃO usar fallback** - site deve depender 100% do backoffice
- Se API falhar, mostrar loading/erro, não fallback hardcoded
- Manter `contentModel` marcado como `@deprecated` por enquanto (para referência)

## 📝 Checklist Final

- [ ] Todas as páginas migradas
- [ ] `contentModel` marcado como deprecated
- [ ] Testar todas as páginas
- [ ] Verificar loading states
- [ ] Documentar variável `VITE_CMS_API_URL` necessária

---

**Status:** Trabalho em progresso - Home.tsx completo, Work.tsx parcialmente completo

