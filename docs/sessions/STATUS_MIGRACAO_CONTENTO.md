# Status da Migração de Conteúdo - Site Principal

**Data:** 2025-01-27

## 📊 Resumo Geral

### ✅ Páginas 100% Migradas para Backoffice

1. **Home (`/`)**
   - ✅ Hero (slogan, subtitle) - 100% backoffice
   - ✅ Projetos destacados - 100% backoffice
   - ✅ Casos - 100% backoffice

2. **Work (`/work`)**
   - ✅ Lista de projetos - 100% backoffice
   - ✅ Dados dos projetos (título, descrição, tags, localização) - 100% backoffice

3. **WhatWeDo (`/what`)**
   - ✅ Lista de serviços - 100% backoffice
   - ✅ Dados dos serviços (título, descrição, ícone) - 100% backoffice

### ⚠️ Páginas Parcialmente Migradas (Híbridas)

4. **Academy (`/academy`)**
   - ✅ SEO e hero - backoffice (opcional, não bloqueia)
   - ⚠️ **Conteúdo estático mantido:**
     - Submenus: Research, Courses, Corporate
     - Workshops/Cursos (dados hardcoded)
     - Áreas de pesquisa (hardcoded)
     - Formatos corporativos (hardcoded)
   - **Motivo:** Estrutura complexa com submenus e muito conteúdo específico que não está no banco ainda
   - **Função `locale()` restaurada** para conteúdo estático

5. **Research (`/research`)**
   - ✅ SEO e hero - backoffice (opcional)
   - ⚠️ **Conteúdo estático mantido:**
     - Áreas de pesquisa (hardcoded)
     - Lab items - vazio (não há no banco ainda)

### 📌 Páginas 100% Estáticas (Não Migradas)

6. **Studio (`/studio`)**
   - 📌 **100% estático** - dados da equipe, credenciais, timeline
   - Usa `teamData` e `studioContent` hardcoded
   - Função `locale()` definida localmente (OK)
   - **Motivo:** Conteúdo muito específico e raramente muda

7. **Contact (`/contact`)**
   - 📌 **100% estático** - formulário, labels, opções
   - Usa `labels` hardcoded
   - Função `i18n()` local (OK)
   - **Motivo:** Formulário com lógica específica

8. **NotFound (`/404`)**
   - 📌 **100% estático** - mensagens de erro
   - **Motivo:** Página de erro simples

## 🔧 Hooks e APIs Utilizados

### Hooks Criados:
- `useAzimutContent({ page, lang? })` - Busca conteúdo geral (páginas, projetos, serviços, markets)
- `useBackofficeContent(slug, lang)` - Busca conteúdo de uma página específica
- `useBackofficeProjects(lang?)` - Busca projetos
- `useBackofficeServices(lang?)` - Busca serviços

### APIs do Backoffice:
- `GET /api/public/content?page=home&lang=pt` - Conteúdo geral
- `GET /api/public/page/[slug]?lang=pt` - Página específica

## ⚠️ Problemas Encontrados e Corrigidos

1. **Academy - `locale is not defined`**
   - ✅ **Corrigido:** Função `locale()` restaurada para conteúdo estático
   - Commit: `9c5097a`

2. **Contact - Module not found (deploy antigo)**
   - ✅ **Diagnosticado:** Deploy antigo no Vercel
   - **Solução:** Novo deploy necessário

## 📝 Decisões de Design

### Por que manter Academy estático?
- Estrutura complexa com 3 submenus (Research, Courses, Corporate)
- Workshops têm muitos campos (título, descrição, nível, duração, audiência)
- Áreas de pesquisa são tags simples
- Formatos corporativos são específicos
- **Próximo passo:** Criar modelo `Workshop` e `ResearchArea` no banco se necessário

### Por que manter Studio estático?
- Dados da equipe raramente mudam
- Timeline histórica é fixa
- Credenciais são específicas
- **Próximo passo:** Migrar apenas se houver necessidade de edição frequente

## 🎯 Próximos Passos (Opcional)

1. **Academy:**
   - [ ] Criar modelo `Workshop` no Prisma
   - [ ] Criar modelo `ResearchArea` no Prisma
   - [ ] Migrar workshops para banco
   - [ ] Atualizar Academy para usar backoffice

2. **Studio:**
   - [ ] Criar modelo `TeamMember` no Prisma (se necessário)
   - [ ] Migrar dados da equipe para banco
   - [ ] Atualizar Studio para usar backoffice

3. **Contact:**
   - [ ] Manter estático (formulário funciona bem assim)

## ✅ Checklist de Testes

- [x] Home carrega projetos do backoffice
- [x] Work carrega projetos do backoffice
- [x] WhatWeDo carrega serviços do backoffice
- [x] Academy funciona (conteúdo estático)
- [x] Research funciona (conteúdo estático)
- [x] Studio funciona (conteúdo estático)
- [x] Contact funciona (conteúdo estático)
- [ ] Testar em produção após deploy

## 📚 Arquivos Relevantes

- `src/hooks/useAzimutContent.ts` - Hook principal
- `src/hooks/useBackofficeContent.ts` - Hook para páginas
- `src/hooks/useBackofficeProjects.ts` - Hook para projetos
- `src/hooks/useBackofficeServices.ts` - Hook para serviços
- `src/data/content.ts` - ⚠️ **DEPRECATED** - Não usar mais
- `azimut-cms/app/api/public/content/route.ts` - API pública
- `azimut-cms/app/api/public/page/[slug]/route.ts` - API de página















