# 🚀 PLANO GRADUAL BACKOFFICE 2026
**Data:** 15/01/2026  
**Status:** 📋 **PLANO DE AÇÃO - Implementação Gradual e Segura**

---

## 🎯 OBJETIVO

Integrar o backoffice de forma gradual e segura, permitindo edição de textos e imagens sem precisar pedir mudanças básicas toda hora. Popular o backoffice nas 4 línguas (PT, EN, ES, FR) e melhorar a gestão de mídias.

---

## 📊 SITUAÇÃO ATUAL

### ✅ **O que já temos:**
- Backoffice funcionando em: `https://backoffice.azmt.com.br`
- Banco Neon PostgreSQL configurado
- Hooks de integração: `useAzimutContent`, `useBackofficeContent`
- Sistema multilíngue (PT, EN, ES, FR)
- Fallbacks seguros (site nunca quebra)

### ⚠️ **O que precisa melhorar:**
- Popular conteúdo nas 4 línguas
- Otimizar gestão de mídias (imagens/vídeos)
- Expandir campos editáveis no backoffice
- Melhorar interface de edição
- Sincronizar conteúdo estático → backoffice

---

## 🗺️ ESTRATÉGIA GRADUAL (Página por Página)

### **FASE 1: Preparação e Diagnóstico** (1-2 dias)
- [ ] Verificar conexão com Neon DB
- [ ] Auditar estrutura atual do backoffice
- [ ] Mapear todas as páginas do site
- [ ] Identificar conteúdo estático que precisa migrar
- [ ] Criar backup completo do banco

### **FASE 2: Página Piloto - Home** (2-3 dias)
- [ ] Migrar conteúdo Home (PT, EN, ES, FR)
- [ ] Testar edição de textos no backoffice
- [ ] Testar upload/troca de imagens
- [ ] Validar que site funciona com fallback
- [ ] Documentar processo

### **FASE 3: Páginas Principais** (1 semana)
- [ ] **WhatWeDo.tsx** - Serviços
- [ ] **Work.tsx** - Projetos
- [ ] **Vancouver.tsx** - Página Academy Vancouver
- [ ] **AcademyNew.tsx** - Página Academy principal

### **FASE 4: Páginas Secundárias** (1 semana)
- [ ] **ServiceDetail.tsx** - Detalhes de serviços
- [ ] **ProjectDetail.tsx** - Detalhes de projetos
- [ ] **StudioTeam.tsx** - Equipe
- [ ] **StudioCredentials.tsx** - Credenciais

### **FASE 5: Otimização de Mídias** (3-5 dias)
- [ ] Sistema de upload otimizado
- [ ] Compressão automática de imagens
- [ ] CDN para imagens/vídeos
- [ ] Gestão de alt text e SEO

---

## 🔧 IMPLEMENTAÇÃO TÉCNICA

### **1. Estrutura de Dados no Backoffice**

#### **Páginas (Pages)**
```typescript
{
  slug: string // 'home', 'what-we-do', 'work', 'vancouver'
  name: string
  seo: {
    pt: { title, description, keywords }
    en: { title, description, keywords }
    es: { title, description, keywords }
    fr: { title, description, keywords }
  }
  hero: {
    pt: { title, subtitle, description, image }
    en: { title, subtitle, description, image }
    es: { title, subtitle, description, image }
    fr: { title, subtitle, description, image }
  }
  content: {
    pt: { sections: [...] }
    en: { sections: [...] }
    es: { sections: [...] }
    fr: { sections: [...] }
  }
}
```

#### **Mídias (Media)**
```typescript
{
  id: string
  type: 'image' | 'video'
  url: string
  thumbnail?: string
  alt: {
    pt: string
    en: string
    es: string
    fr: string
  }
  tags: string[]
  page?: string // 'home', 'vancouver', etc.
  section?: string // 'hero', 'gallery', etc.
}
```

---

## 📝 CHECKLIST POR PÁGINA

### **Para cada página migrada:**

1. **Backend (Backoffice)**
   - [ ] Criar/verificar modelo de dados no Prisma
   - [ ] Criar API endpoint `/api/public/page/{slug}`
   - [ ] Criar interface de edição no admin
   - [ ] Testar CRUD completo

2. **Frontend (Site)**
   - [ ] Adicionar hook `useBackofficeContent` ou `useAzimutContent`
   - [ ] Implementar fallback para conteúdo estático
   - [ ] Testar em todas as 4 línguas
   - [ ] Validar que não quebra se backoffice offline

3. **Conteúdo**
   - [ ] Popular conteúdo em PT
   - [ ] Traduzir para EN
   - [ ] Traduzir para ES
   - [ ] Traduzir para FR
   - [ ] Validar imagens/mídias

---

## 🛡️ GARANTIAS DE SEGURANÇA

### **Nunca Quebrar o Site:**
1. ✅ **Fallback sempre presente** - Se backoffice falhar, usa conteúdo estático
2. ✅ **Timeout curto** - 5 segundos máximo
3. ✅ **Erros silenciosos** - Não mostrar erros ao usuário
4. ✅ **Cache local** - Última versão válida em localStorage
5. ✅ **Testes antes de deploy** - Validar em staging primeiro

### **Rollback Rápido:**
- Git tags antes de cada fase
- Branch separada para cada página
- Documentação de como reverter

---

## 🎨 MELHORIAS DE UX NO BACKOFFICE

### **Interface de Edição:**
- [ ] Editor WYSIWYG para textos longos
- [ ] Preview em tempo real
- [ ] Upload drag-and-drop de imagens
- [ ] Validação de campos obrigatórios
- [ ] Indicador de traduções faltando

### **Gestão de Mídias:**
- [ ] Biblioteca central de imagens
- [ ] Busca por tags/página
- [ ] Compressão automática
- [ ] CDN integrado
- [ ] Alt text multilíngue

---

## 📅 CRONOGRAMA SUGERIDO

### **Semana 1: Preparação**
- Dia 1-2: Diagnóstico e backup
- Dia 3-4: Estrutura de dados
- Dia 5: Testes de conexão

### **Semana 2: Home (Piloto)**
- Dia 1-2: Migração Home PT
- Dia 3: Traduções EN/ES/FR
- Dia 4: Testes e ajustes
- Dia 5: Deploy e validação

### **Semana 3: Páginas Principais**
- Dia 1-2: WhatWeDo
- Dia 3-4: Work
- Dia 5: Vancouver

### **Semana 4: Páginas Secundárias**
- Dia 1-2: ServiceDetail
- Dia 3: ProjectDetail
- Dia 4-5: StudioTeam + Credentials

### **Semana 5: Otimização**
- Dia 1-3: Sistema de mídias
- Dia 4-5: Testes finais e documentação

---

## 🚀 PRÓXIMOS PASSOS IMEDIATOS

1. **Verificar Neon DB:**
   ```bash
   # Testar conexão
   # Verificar tabelas existentes
   # Verificar dados atuais
   ```

2. **Auditar Backoffice:**
   - Acessar: https://backoffice.azmt.com.br/admin
   - Verificar estrutura atual
   - Listar páginas existentes
   - Verificar mídias

3. **Escolher Página Piloto:**
   - Sugestão: **Home.tsx** (mais simples)
   - Ou **Vancouver.tsx** (já tem conteúdo rico)

---

## 📚 DOCUMENTAÇÃO NECESSÁRIA

- [ ] Guia de como editar conteúdo no backoffice
- [ ] Guia de como adicionar imagens
- [ ] Guia de traduções (PT → EN/ES/FR)
- [ ] Troubleshooting comum
- [ ] FAQ para equipe

---

## ✅ CRITÉRIOS DE SUCESSO

- [ ] Pelo menos 3 páginas migradas e funcionando
- [ ] Conteúdo editável em todas as 4 línguas
- [ ] Upload de imagens funcionando
- [ ] Site nunca quebra (fallback sempre funciona)
- [ ] Equipe consegue editar sem ajuda técnica

---

**Próxima ação:** Escolher página piloto e começar Fase 1 (Preparação)
