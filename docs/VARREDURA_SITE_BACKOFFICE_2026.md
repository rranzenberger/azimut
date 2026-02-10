# Varredura site ↔ backoffice (fev 2026)

Verificação geral de APIs, slugs, URLs e inconsistências entre site e backoffice. Correções aplicadas.

---

## 1. Correções aplicadas

| Problema | Correção |
|----------|----------|
| **SmartContactForm** usava fallback `backoffice.azimut.com.br` (domínio errado) | Fallback unificado: `VITE_CMS_API_URL` ou `VITE_BACKOFFICE_URL` ou `https://backoffice.azmt.com.br`. |
| **API pública página** só aceitava um segmento (`[slug]`) | Rota alterada para **catch-all** `[...slug]`: aceita `academy/courses`, `studio/about`, etc. Arquivo em `app/api/public/page/[...slug]/route.ts`. |
| **AcademyCourses** chamava backoffice com slug `academy-courses` | Passa a usar `academy/courses` (igual ao banco). |
| **AcademyWorkshops** usava `academy-workshops` | Passa a usar `academy/workshops`. |
| **AcademyCorporate** usava `academy-corporate` | Passa a usar `academy/corporate`. |
| **Vancouver** usava `vancouver` | Passa a usar `academy/vancouver` (página no banco). |
| **usePageSEO** não reconhecia slug `academy/vancouver` para imagem/URL | Tratamento com `isVancouver = slug === 'vancouver' \|\| slug === 'academy/vancouver'`. |
| **Content API** em erro não devolvia `featuredProjects` | Resposta de erro passa a incluir `featuredProjects: undefined` para consistência. |

---

## 2. Padrões verificados

- **URL do backoffice:** uso de `VITE_BACKOFFICE_URL` ou `VITE_CMS_API_URL` com fallback `https://backoffice.azmt.com.br` (não `azimut.com.br`).
- **Slugs de páginas:** com **barra** quando for subpágina: `academy/courses`, `academy/workshops`, `academy/corporate`, `academy/vancouver`, `academy/research`, `studio/about`.
- **API page:** `GET /api/public/page/:segment1/:segment2/...` mapeado para slug `segment1/segment2/...` via rota `[...slug]`.

---

## 3. APIs públicas (backoffice) × consumidores (site)

| API | Consumidor no site | Observação |
|-----|--------------------|------------|
| `GET /api/public/page/[...slug]` | useBackofficeContent, usePageContent, usePageSEO | Slug com barra (ex.: `academy/courses`). |
| `GET /api/public/content?page=work` | useAzimutContent (Work, Home) | featuredProjects + highlightProjects (marcados primeiro). |
| `GET /api/public/academy/landing-sections` | AcademyNew | 4 cards com imagem e textos. |
| `GET /api/public/academy/courses` | AcademyCourses | Grid de cursos. |
| `GET /api/public/academy/past-events` | AcademyWorkshops | Galeria Past Events. |
| `GET /api/public/project/[slug]` | useProject, ProjectDetail | Projeto por slug. |
| `GET /api/public/services`, `service/[slug]` | useBackofficeService | Serviços (What). |
| `GET /api/public/newsletter` (POST) | Layout, VancouverInterestForm, AcademyQuickForm, SmartContactForm | Inscrição. |
| Demais (blog, team, credentials, history, press, editais, etc.) | Hooks e páginas correspondentes | Sem alteração. |

---

## 4. Checklist pós-varredura

- [x] Fallbacks de URL do backoffice padronizados (azmt.com.br).
- [x] Rota da API page aceita slugs com barra (catch-all).
- [x] Slugs Academy no site alinhados ao backoffice (academy/courses, etc.).
- [x] usePageSEO trata academy/vancouver para imagem e URL.
- [x] Resposta de erro da Content API inclui featuredProjects.

---

*Varredura fev 2026. Ver também `docs/AUDITORIA_SITE_VS_BACKOFFICE.md`.*
