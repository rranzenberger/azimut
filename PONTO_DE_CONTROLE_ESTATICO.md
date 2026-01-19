# 🛑 PONTO DE CONTROLE ESTÁTICO
**Data:** 01/01/2026  
**Status:** ✅ **ATIVO - Site em modo estático (sem backoffice)**

---

## 📋 SITUAÇÃO

Devido a **erros de conexão com o backoffice**, o site foi revertido para um **ponto de controle estático**. Todas as chamadas de API foram **desativadas** e o site está funcionando com **conteúdo local fixo**.

---

## ✅ ARQUIVOS MODIFICADOS

### **1. src/pages/Home.tsx**
- ❌ Integração com `useAzimutContent` DESATIVADA
- ❌ Integração com `usePersonalizedContent` DESATIVADA
- ✅ Usando `defaultProjects` (hardcoded)
- ✅ Usando serviços padrão (hardcoded)
- ✅ Usando pillars padrão (hardcoded)

**Linhas modificadas:**
- L5-6: Imports do backoffice comentados
- L18-24: Hooks do CMS comentados
- L26-27: Hero slogan/subtitle estáticos
- L88-91: Projetos sempre usam `defaultProjects`
- L204-220: Pillars sempre usam array local
- L268-308: Serviços sempre usam array local

---

### **2. src/pages/WhatWeDo.tsx**
- ❌ Integração com `useAzimutContent` DESATIVADA
- ✅ Usando serviços padrão (hardcoded)

**Linhas modificadas:**
- L5-6: Import do backoffice comentado
- L13-17: Hook do CMS comentado
- L19: Variável `services` usa array local
- L59-62: Lógica de escolha entre backoffice e padrão removida

---

### **3. src/pages/Work.tsx**
- ❌ Integração com `useAzimutContent` DESATIVADA
- ✅ Usando `defaultCases` (hardcoded)

**Linhas modificadas:**
- L7-8: Import do backoffice comentado
- L27-30: Hook do CMS comentado + `cmsLoading = false`
- L32: Comentário "Projetos de exemplo"
- L71-74: `allCases` sempre usa `defaultCases`

---

## 🔄 COMO REATIVAR A INTEGRAÇÃO COM BACKOFFICE

Quando o backoffice estiver funcionando novamente e os erros de conexão forem resolvidos:

### **Passo 1: Verificar se o backoffice está online**
```bash
curl https://backoffice.azmt.com.br/api/public/content?lang=pt&page=home
```
**Esperado:** Resposta JSON com conteúdo (status 200)

---

### **Passo 2: Descomentar os imports**

**src/pages/Home.tsx** (linhas 5-6):
```typescript
import { useAzimutContent } from '../hooks/useAzimutContent'
import { usePersonalizedContent } from '../hooks/usePersonalizedContent'
```

**src/pages/WhatWeDo.tsx** (linha 5):
```typescript
import { useAzimutContent } from '../hooks/useAzimutContent'
```

**src/pages/Work.tsx** (linha 7):
```typescript
import { useAzimutContent } from '../hooks/useAzimutContent'
```

---

### **Passo 3: Reverter as mudanças**

#### **3.1. Home.tsx**

**Linha 18-27 - Descomentar hooks:**
```typescript
// Integração com CMS - conteúdo personalizado (100% backoffice)
const { content: cmsContent, loading: cmsLoading } = useAzimutContent({ page: 'home' })

// Personalização baseada em IA - perfil do visitante
const {
  profile,
  recommendedProjects: personalizedProjects,
  heroMessage: personalizedHeroMessage,
  heroSubtitle: personalizedHeroSubtitle,
  ctaText: personalizedCtaText,
  ctaLink: personalizedCtaLink,
  shouldShowEditais,
  loading: personalizationLoading,
} = usePersonalizedContent()

// Slogan e subtitle do hero: Personalizado por IA OU do backoffice (fallback)
const heroSlogan = personalizedHeroMessage || cmsContent?.page?.heroSlogan || 'Experiências que Conectam Mundos'
const heroSubtitle = personalizedHeroSubtitle || cmsContent?.page?.heroSubtitle || 'Criamos experiências imersivas entre Brasil e Canadá.'
```

**Linha 88-98 - Reverter lógica de projetos:**
```typescript
// GARANTIR que sempre seja um array válido - FORÇAR uso de defaultProjects se necessário
const projects = useMemo(() => {
  // Tentar usar personalizedProjects se válido
  if (personalizedProjects && Array.isArray(personalizedProjects) && personalizedProjects.length > 0) {
    return personalizedProjects;
  } 
  // Se não, tentar usar highlightProjects do CMS
  if (cmsContent?.highlightProjects && Array.isArray(cmsContent.highlightProjects) && cmsContent.highlightProjects.length > 0) {
    return cmsContent.highlightProjects;
  }
  // Se nenhum, usar defaultProjects (GARANTE que sempre há projetos)
  return defaultProjects;
}, [personalizedProjects, cmsContent?.highlightProjects, defaultProjects]);
```

**Linha 204-212 - Reverter lógica de pillars:**
```typescript
{/* Pillars - Do backoffice OU padrão */}
<div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4 animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s' }}>
  {(cmsContent?.page?.pillars && cmsContent.page.pillars.length > 0 
    ? cmsContent.page.pillars 
    : [
        lang === 'pt' ? 'Museus & Cultura' : lang === 'es' ? 'Museos & Cultura' : lang === 'fr' ? 'Musées & Culture' : 'Museums & Culture',
        lang === 'pt' ? 'Marcas & Eventos' : lang === 'es' ? 'Marcas & Eventos' : lang === 'fr' ? 'Marques & Événements' : 'Brands & Events',
        lang === 'pt' ? 'Educação & Pesquisa' : lang === 'es' ? 'Educación & Investigación' : lang === 'fr' ? 'Éducation & Recherche' : 'Education & Research'
      ]
  ).map((pillar: string, index: number) => (
```

**Linha 268 - Reverter lógica de serviços:**
```typescript
{cmsContent?.services && cmsContent.services.length > 0 ? (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {cmsContent.services.slice(0, 6).map((service: any, index: number) => (
```

---

#### **3.2. WhatWeDo.tsx**

**Linha 13-17 - Descomentar hook:**
```typescript
// Buscar serviços do backoffice (100% backoffice)
const { content: cmsContent, loading: cmsLoading } = useAzimutContent({ page: 'what' })

// Fallback: Serviços padrão quando backoffice está vazio
const defaultServices = [
```

**Linha 59-62 - Reverter lógica:**
```typescript
// Usar serviços do backoffice se existirem, senão usar padrão
const services = (cmsContent?.services && cmsContent.services.length > 0) 
  ? cmsContent.services 
  : defaultServices
```

---

#### **3.3. Work.tsx**

**Linha 27-30 - Descomentar hook:**
```typescript
// Buscar projetos do backoffice (100% backoffice)
const { content: cmsContent, loading: cmsLoading } = useAzimutContent({ page: 'work' })

// Fallback: Projetos de exemplo quando backoffice está vazio
```

**Linha 71-77 - Reverter lógica:**
```typescript
// GARANTIR que sempre há projetos - usar defaultCases se backoffice falhar
const allCases = useMemo(() => {
  if (cmsContent?.highlightProjects && Array.isArray(cmsContent.highlightProjects) && cmsContent.highlightProjects.length > 0) {
    return cmsContent.highlightProjects;
  }
  return defaultCases;
}, [cmsContent?.highlightProjects, defaultCases])
```

---

### **Passo 4: Testar localmente**
```bash
npm run dev
```

Abrir http://localhost:5173 e verificar:
- ✅ Home carrega sem erros no console
- ✅ Soluções (What We Do) carrega sem erros
- ✅ Projetos (Work) carrega sem erros
- ✅ Não há erros de conexão com API

---

### **Passo 5: Deploy**
```bash
git add src/pages/Home.tsx src/pages/WhatWeDo.tsx src/pages/Work.tsx
git commit -m "reativar integração com backoffice - ponto de controle revertido"
git push
```

---

## 🚨 ERROS CONHECIDOS (ANTES DO PONTO DE CONTROLE)

### **1. Erro de Conexão**
```
Failed to fetch
TypeError: NetworkError when attempting to fetch resource
```
**Causa:** Backoffice offline ou problema de CORS  
**Solução:** Verificar se https://backoffice.azmt.com.br está acessível

---

### **2. Erro de Timeout**
```
TimeoutError: Request timed out after 5000ms
```
**Causa:** Backoffice lento ou não respondendo  
**Solução:** Aumentar timeout em `createTimeoutSignal()` ou investigar performance do backoffice

---

### **3. Erro 500/404 da API**
```
HTTP 500: Internal Server Error
HTTP 404: Not Found
```
**Causa:** Problema no servidor ou rota inexistente  
**Solução:** Verificar logs do backoffice no Vercel

---

## 📝 NOTAS IMPORTANTES

1. **Este é um ponto de controle temporário**  
   O objetivo é ter um site funcionando 100% sem depender do backoffice.

2. **Fallbacks já existem**  
   Quando reativar o backoffice, os fallbacks garantem que o site nunca quebre.

3. **Não deletar este arquivo**  
   Manter como referência caso precise reverter novamente.

4. **Tracking continua funcionando**  
   `useUserTracking` e `trackPageView` continuam ativos (não bloqueantes).

---

## ✅ CHECKLIST DE REATIVAÇÃO

Antes de reativar o backoffice, verificar:

- [ ] Backoffice está online e acessível
- [ ] API `/api/public/content` responde corretamente
- [ ] Variável `VITE_BACKOFFICE_URL` está configurada no Vercel
- [ ] Testar em ambiente de desenvolvimento primeiro
- [ ] Verificar console do navegador por erros
- [ ] Fazer deploy gradual (staging → production)

---

## 📞 CONTATO

Se houver dúvidas sobre este ponto de controle ou como reativar o backoffice:
- Consultar: `INSTRUCOES_FINAL.md`
- Verificar: `VERIFICACAO_PROJETOS_VERCEL.md`

---

**🎯 OBJETIVO:** Site sempre funcional, independente do estado do backoffice.

