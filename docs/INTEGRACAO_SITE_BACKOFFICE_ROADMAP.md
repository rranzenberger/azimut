# Roadmap: Integração Site ↔ Backoffice

## Análise Atual

### ✅ Páginas Já Integradas (13 páginas)

| Página | Hook/API | Endpoint | Status |
|--------|----------|----------|--------|
| Home | `useAzimutContent` | `/api/public/content?page=home` | ✅ Completo |
| Work (Portfólio) | `useAzimutContent` | `/api/public/content?page=work` | ✅ Completo |
| ProjectDetail | `useProject` | `/api/public/project/[slug]` | ✅ Completo |
| WhatWeDo (Serviços) | `useBackofficeServices` | `/api/public/services` | ✅ Completo |
| ServiceDetail | `useBackofficeService` | `/api/public/service/[slug]` | ✅ Completo |
| Press (Imprensa) | `usePress` | `/api/public/press` | ✅ Completo |
| Research | `usePublications` | `/api/public/publications` | ✅ Completo |
| Blog | fetch direto | `/api/public/blog` | ✅ Completo |
| BlogPost | fetch direto | `/api/public/blog/[slug]` | ✅ Completo |
| Vancouver | `useBackofficeContent` | `/api/public/page/vancouver` | ⚠️ Parcial |
| AcademyCourses | `useBackofficeContent` | `/api/public/page/academy-courses` | ⚠️ Parcial |
| AcademyCorporate | `useBackofficeContent` | `/api/public/page/academy-corporate` | ⚠️ Parcial |
| AcademyWorkshops | `useBackofficeContent` | `/api/public/page/academy-workshops` | ⚠️ Parcial |

### ❌ Conteúdo Ainda Estático/Hardcoded

| Página | Conteúdo Hardcoded | Arquivo | Linhas |
|--------|-------------------|---------|--------|
| **Studio** | Equipe, credenciais, timeline, história | `src/data/studioContent.ts` | ~500 |
| **AcademyCourses** | Array de 50+ cursos | `src/pages/AcademyCourses.tsx` | 49-710 |
| **Vancouver** | Escolas, programas, comparações | `src/pages/Vancouver.tsx` | 61-1657 |
| **ServiceDetail** | FAQs por serviço | `src/data/serviceFAQs.ts` | ~200 |
| **WhatWeDo** | Fallback de serviços | `src/data/servicesData.ts` | ~150 |

---

## FASE 1: Alta Prioridade (Quick Wins)

### 1.1 Integrar Página Studio

**Impacto:** Alto — conteúdo atualizado frequentemente (equipe, prêmios)

**O que fazer:**

1. **Usar API existente `/api/public/history`** para timeline
   - Criar hook `useHistory.ts` no site
   - Substituir timeline hardcoded em `Studio.tsx`

2. **Usar API existente `/api/public/page/studio`** para conteúdo
   - Criar seções no backoffice: hero, about, heritage
   - Usar `useBackofficeContent` com `page=studio`

3. **Expandir Equipe no backoffice**
   - API já existe: `/admin/team`
   - Criar endpoint público: `/api/public/team`
   - Criar hook `useTeam.ts`

4. **Expandir Credenciais no backoffice**
   - API já existe: `/admin/credentials`
   - Criar endpoint público: `/api/public/credentials`
   - Criar hook `useCredentials.ts`

**Arquivos a modificar:**
```
azimut-cms/app/api/public/team/route.ts        (criar)
azimut-cms/app/api/public/credentials/route.ts (criar)
src/hooks/useTeam.ts                           (criar)
src/hooks/useCredentials.ts                    (criar)
src/hooks/useHistory.ts                        (criar)
src/pages/Studio.tsx                           (modificar)
```

**Passos:**
1. Criar `/api/public/team` no backoffice
2. Criar `/api/public/credentials` no backoffice
3. Criar hooks no site
4. Modificar `Studio.tsx` para usar hooks
5. Manter fallback para conteúdo estático (resiliência)
6. Testar e deploy

---

### 1.2 Criar API para Cursos Academy

**Impacto:** Alto — 50+ cursos hardcoded, atualização frequente

**O que fazer:**

1. **Criar modelo `Course` no Prisma**
   ```prisma
   model Course {
     id            String   @id @default(cuid())
     slug          String   @unique
     titlePt       String
     titleEn       String?
     titleEs       String?
     titleFr       String?
     descriptionPt String?
     descriptionEn String?
     descriptionEs String?
     descriptionFr String?
     duration      String?
     level         String?  // beginner, intermediate, advanced
     category      String?  // vfx, animation, game, etc.
     price         Float?
     imageUrl      String?
     isPublished   Boolean  @default(true)
     displayOrder  Int      @default(0)
     createdAt     DateTime @default(now())
     updatedAt     DateTime @updatedAt
   }
   ```

2. **Criar APIs**
   - Admin: `/api/admin/courses` (CRUD)
   - Público: `/api/public/courses` (listagem)

3. **Criar página no backoffice**
   - `/admin/courses` com listagem e formulário

4. **Criar hook no site**
   - `useCourses.ts`

5. **Migrar dados**
   - Script para popular cursos do array hardcoded

**Arquivos a criar:**
```
azimut-cms/prisma/schema.prisma                    (adicionar model)
azimut-cms/app/api/admin/courses/route.ts          (criar)
azimut-cms/app/api/admin/courses/[id]/route.ts     (criar)
azimut-cms/app/api/public/courses/route.ts         (criar)
azimut-cms/app/admin/courses/page.tsx              (criar)
src/hooks/useCourses.ts                            (criar)
src/pages/AcademyCourses.tsx                       (modificar)
sql/backoffice_courses.sql                         (criar)
```

**Passos:**
1. Adicionar model Course no Prisma
2. Rodar `prisma migrate dev`
3. Criar APIs admin e public
4. Criar página admin
5. Adicionar ao menu do backoffice
6. Criar hook no site
7. Modificar AcademyCourses.tsx
8. Criar script de migração dos dados
9. Testar e deploy

---

### 1.3 Expandir API de Serviços com FAQs

**Impacto:** Médio-Alto — melhora SEO e UX

**O que fazer:**

1. **Adicionar campos FAQ no modelo Service**
   ```prisma
   model Service {
     // ... campos existentes ...
     faqsPt        Json?    // Array de {question, answer}
     faqsEn        Json?
     faqsEs        Json?
     faqsFr        Json?
   }
   ```

2. **Atualizar API `/api/public/service/[slug]`**
   - Incluir FAQs na resposta

3. **Atualizar formulário no backoffice**
   - Adicionar editor de FAQs em `/admin/services`

4. **Atualizar hook `useBackofficeService`**
   - Incluir FAQs no retorno

5. **Migrar dados de `serviceFAQs.ts`**

**Arquivos a modificar:**
```
azimut-cms/prisma/schema.prisma                    (modificar Service)
azimut-cms/app/api/public/service/[slug]/route.ts  (modificar)
azimut-cms/app/admin/services/[id]/page.tsx        (modificar)
src/hooks/useBackofficeService.ts                  (modificar)
src/pages/ServiceDetail.tsx                        (modificar)
```

---

## FASE 2: Média Prioridade

### 2.1 Expandir Página Vancouver

**O que fazer:**
- Adicionar mais seções na página `vancouver` no backoffice
- Seções: schools, programs, comparison, testimonials
- Usar `useBackofficeContent` com seções específicas

**Conteúdo a migrar:**
- Informações das escolas (VFS, VanArts, etc.)
- Tabelas comparativas
- Programas e duração
- Requisitos de visto

---

### 2.2 Usar API de Mídia em Mais Páginas

**O que fazer:**
- Expandir uso de `/api/public/media` 
- Atualmente só usado em `ServiceDetail.tsx`
- Usar para imagens dinâmicas em serviços e projetos

---

## FASE 3: Baixa Prioridade (Nice to Have)

### 3.1 Consolidar Hooks Duplicados

**Problema:** Existem dois `useBackofficeServices.ts` com implementações diferentes

**Solução:**
- Unificar em um único hook
- Padronizar padrão de fetching (hooks vs fetch direto)

---

### 3.2 Integrar Página Contato

**O que fazer:**
- Mover campos do formulário para backoffice
- Mover localizações de escritórios para backoffice
- Criar seções na página `contact`

---

## APIs Existentes Subutilizadas

| API | Uso Atual | Potencial |
|-----|-----------|-----------|
| `/api/public/history` | StudioCredentials, CompanyTimeline | Usar em Studio.tsx |
| `/api/public/media` | ServiceDetail apenas | Usar em todas as páginas de serviço |
| `/api/public/content` | Home, Work | Expandir para mais páginas |

---

## Resumo de Impacto

| Item | Esforço | Impacto | Prioridade |
|------|---------|---------|------------|
| Studio integration | Médio | Alto | 🔴 Alta |
| Academy courses API | Alto | Alto | 🔴 Alta |
| Service FAQs | Baixo | Médio | 🟡 Média |
| Vancouver expansion | Médio | Médio | 🟡 Média |
| Media API expansion | Baixo | Baixo | 🟢 Baixa |
| Hooks consolidation | Baixo | Baixo | 🟢 Baixa |
| Contact integration | Baixo | Baixo | 🟢 Baixa |

---

## Checklist de Implementação

### FASE 1
- [ ] Criar `/api/public/team`
- [ ] Criar `/api/public/credentials`
- [ ] Criar hooks: useTeam, useCredentials, useHistory
- [ ] Modificar Studio.tsx
- [ ] Adicionar model Course no Prisma
- [ ] Criar APIs de cursos (admin + public)
- [ ] Criar página /admin/courses
- [ ] Criar hook useCourses
- [ ] Modificar AcademyCourses.tsx
- [ ] Adicionar FAQs no model Service
- [ ] Atualizar API e formulário de serviços
- [ ] Migrar dados de serviceFAQs.ts

### FASE 2
- [ ] Expandir seções da página Vancouver
- [ ] Usar API de mídia em mais páginas

### FASE 3
- [ ] Consolidar hooks duplicados
- [ ] Integrar página Contato

---

## Benefícios Esperados

1. **Para o time de conteúdo:**
   - Atualizar cursos sem código
   - Gerenciar equipe e credenciais facilmente
   - Editar FAQs de serviços

2. **Para SEO:**
   - FAQs estruturados (schema.org)
   - Conteúdo sempre atualizado
   - Melhor indexação

3. **Para manutenção:**
   - Menos código hardcoded
   - Fonte única de verdade (backoffice)
   - Deploys mais simples (só conteúdo, sem código)

4. **Para resiliência:**
   - Fallbacks mantidos para offline
   - Cache de conteúdo
   - Degradação graciosa
