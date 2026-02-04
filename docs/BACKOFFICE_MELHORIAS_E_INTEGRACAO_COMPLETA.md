# Backoffice: Melhorias e Integração Completa

Objetivo: deixar o backoffice **redondo**, **bem integrado ao site** e **autônomo**, para não depender de ajustes contínuos. Use este doc como checklist e referência.

---

## 1. O que já está integrado (site ↔ backoffice)

| Área | Backoffice | API pública | Site usa? | Observação |
|------|------------|-------------|-----------|------------|
| Home, Work | Páginas (Page) | `/api/public/content`, `/api/public/project/[slug]` | ✅ | Completo |
| Projetos | `/admin/projects` | `/api/public/project/[slug]` | ✅ | Completo |
| Serviços | `/admin/services` | `/api/public/service/[slug]`, `/api/public/services` | ✅ | Inclui FAQs |
| Imprensa | `/admin/press` | `/api/public/press` | ✅ | Completo |
| Research | `/admin/publications` | `/api/public/publications` | ✅ | Completo |
| Blog | `/admin/blog` | `/api/public/blog`, `/api/public/blog/[slug]` | ✅ | Completo |
| **Equipe** | `/admin/team` | `/api/public/team` | ✅ | Studio.tsx usa useTeam com fallback |
| **Credenciais** | `/admin/credentials` | `/api/public/credentials` | ✅ | Studio.tsx usa useCredentials com fallback |
| **Histórico (timeline)** | `/admin/history` | `/api/public/history` | ✅ | Studio.tsx usa useHistory com fallback |
| Vancouver, Academy pages | Páginas (Page) | `/api/public/page/[slug]` | ✅ | Parcial (conteúdo genérico) |

---

## 2. O que falta para “não ter que ficar pedindo ajustes”

### 2.1 Integrar página Studio no site (prioridade alta) — ✅ FEITO

**Implementado:**

1. **No site** (`src/pages/Studio.tsx`):
   - Usa `useTeam(lang)` para a seção Equipe; fallback para conteúdo estático se a API falhar ou retornar vazio.
   - Usa `useCredentials(lang)` para a seção Credenciais; fallback para conteúdo estático.
   - Usa `useHistory(lang)` para a timeline; fallback para `STATIC_TIMELINE[lang]`.
2. Dados são **compostos** no próprio componente: quando o backoffice retorna dados, eles são usados; senão, usa-se o conteúdo estático (resiliência).
3. **No backoffice:** em **Páginas do Site** (`/admin/site-pages`) há seção "Estúdio (Equipe, Credenciais, Histórico)" com links para `/admin/team`, `/admin/credentials`, `/admin/history`. Nas páginas Histórico, Equipe e Credenciais já consta que os dados aparecem na página Estúdio do site.

---

### 2.2 Backoffice: “Ver no site” contextual (opcional mas útil)

**Hoje:** O botão **“Ver Site Principal”** no layout leva sempre à home do site.

**Melhoria:** Em telas de edição (Projeto, Serviço, Post, etc.), mostrar um link **“Ver esta página no site”** que abre a URL correta (ex.: `/pt/work/nome-do-projeto`). Pode ser um link secundário ao lado do “Salvar”.

**Onde:** Componente reutilizável que recebe `path` (ex. `/${lang}/work/${slug}`) e usa `NEXT_PUBLIC_SITE_URL`.

---

### 2.3 Validação e feedback nos formulários

- **Campos obrigatórios:** Garantir que todos os formulários principais (Projetos, Serviços, Imprensa, Publicações, Equipe, Credenciais, Histórico) marquem claramente campos obrigatórios e mostrem erro ao salvar se faltar algo crítico (ex.: título PT, slug).
- **Slug único:** Ao criar/editar, validar slug único onde aplicável (projetos, serviços, blog) e mostrar mensagem clara se duplicado.
- **Toast de sucesso:** Após salvar, mostrar “Salvo com sucesso” (já existe em vários lugares; padronizar onde faltar).

---

### 2.4 Páginas do Site: Estúdio (Equipe, Credenciais, Histórico)

Na tela **Páginas do Site** (`/admin/site-pages`), além de Imprensa e Research, deixar explícito:

- **Estúdio – conteúdo editável:**  
  Links para **Equipe** (`/admin/team`), **Credenciais** (`/admin/credentials`) e **Histórico** (`/admin/history`), com texto curto: “Equipe”, “Credenciais”, “Timeline (histórico)”. Assim o usuário sabe onde editar o que aparece em `/studio`, `/studio/equipe` e `/studio/credibilidade`.

---

### 2.5 Manual e ajuda

- **Manual** (`/admin/help`) já existe e está ligado ao `menuManual.ts`. Manter atualizado quando surgir nova área ou fluxo.
- Em cada área (Equipe, Credenciais, Histórico), um texto de uma linha na página explicando: “Estes dados aparecem na página Estúdio do site.”

---

### 2.6 Cursos Academy e Vancouver (fase posterior)

- **Cursos:** Você definiu que cursos são “próxima fase”. Quando for fazer, o roadmap está em `docs/INTEGRACAO_SITE_BACKOFFICE_ROADMAP.md` (modelo Course, APIs, hook `useCourses`, migração do array hardcoded).
- **Vancouver:** Manter como está; quando houver demanda, expandir seções no backoffice (Page `vancouver`) e usar no site.

---

## 3. Checklist “deixar redondo”

Use este checklist para ir fechando lacunas sem depender de pedidos de ajuste:

- [x] **Studio no site:** `Studio.tsx` usar `useTeam`, `useCredentials`, `useHistory` com fallback.
- [x] **Páginas do Site:** Seção “Estúdio (Equipe, Credenciais, Histórico)” com links para `/admin/team`, `/admin/credentials`, `/admin/history`.
- [ ] **Ver no site:** Onde fizer sentido, link “Ver esta página no site” com URL correta (projeto, serviço, post).
- [ ] **Formulários:** Campos obrigatórios claros; validação de slug único; toast de sucesso ao salvar.
- [ ] **Manual:** Atualizar ajuda quando adicionar novas áreas; em Equipe/Credenciais/Histórico, frase: “Aparecem na página Estúdio do site.”
- [ ] **Build antes de deploy:** Sempre rodar `npm run build` no `azimut-cms` antes de deploy (regra em `.cursor/rules/deploy-checklist.mdc`).

---

## 4. Referências rápidas

| Documento | Conteúdo |
|-----------|----------|
| `docs/INTEGRACAO_SITE_BACKOFFICE_ROADMAP.md` | Roadmap completo de integração (Studio, Academy, FAQs, Vancouver, etc.) |
| `docs/BACKOFFICE_BUILD_FALHA_SOLUCAO.md` | Build falhando → domínio mostra site errado; prevenção e correção |
| `docs/BACKOFFICE_DOMINIO_LOGIN.md` | DNS e domínio do backoffice |
| `azimut-cms/app/admin/config/menuManual.ts` | Textos do manual e tooltips do menu |
| `.cursor/rules/deploy-checklist.mdc` | Regra: build local antes de deploy |

---

## 5. Resumo em uma frase

**Para o backoffice ficar redondo e a integração com o site sem precisar ficar pedindo ajustes:** integrar a página **Studio** do site aos dados do backoffice (Equipe, Credenciais, Histórico), expor esses links em **Páginas do Site**, e manter validação/feedback e manual atualizados; o resto (cursos, Vancouver) em fases seguintes conforme prioridade.
