# Checkpoint 001 – Registrado

**Data:** 29 de Janeiro de 2026  
**Commit:** `129535f` — *fix: usar imagens SVG para bandeiras em vez de emojis*

---

## Estado do site neste checkpoint

- **Branch:** `main`
- **Repositório:** `azimut-site-vite-tailwind`
- **Deploy:** Vercel (frontend + backoffice azimut-cms)

---

## Bandeiras (SVG)

| Código | Arquivo     | Origem                    | Observação                          |
|--------|-------------|---------------------------|-------------------------------------|
| **BR** | `flag-br.svg` | SVG Repo (originais)      | Twemoji-style, viewBox 36×36        |
| **CA** | `flag-ca.svg` | SVG Repo (originais)      | Twemoji-style, viewBox 36×36        |
| **US** | `flag-us.svg` | SVGs atuais (guardados)   | Geometric simplified, viewBox 512×512 |
| **GB** | `flag-gb.svg` | SVGs atuais (guardados)   | Union Jack simplified, viewBox 512×512 |

Detalhes, fontes e código dos SVGs atuais (US/GB) estão em **`docs/BANDEIRAS_SVG.md`**.

---

## Referência rápida

- **Checkpoint:** 001  
- **Commit:** `129535f`  
- **Bandeiras BR/CA:** originais SVG Repo  
- **Bandeiras US/GB:** versões atuais documentadas em `docs/BANDEIRAS_SVG.md`

---

## SEO pós-plano (29 Jan 2026)

Implementações do plano *Verificação SEO e Melhorias para Aparecer em Primeiro*:

- **GSC:** Placeholder removido de `index.html`. Verificação via `VITE_GOOGLE_SEARCH_CONSOLE_VERIFICATION` (componente `GoogleSearchConsoleVerification`). Configurar no Vercel e redeploy para concluir.
- **Academy + Webinars:** Helmet substituído por `<SEO />` em AcademyNew, AcademyCourses, AcademyWorkshops, AcademyCorporate e Webinars. hreflang, canonical e OG ativos nessas páginas.
- **Blog + BlogPost:** `<SEO />` adicionado em Blog (meta por idioma) e BlogPost (seoTitle/seoDesc, type article, author, publishedTime).
- **Sitemap:** `/blog` incluído em `public/sitemap.xml` para pt, en, es, fr com hreflang. Posts dinâmicos: não incluídos (via backoffice; sitemap-blog ou build script se for necessário depois).
- **Schema:** Organization unificada em `SEOGlobal`. Removidos `OrganizationSchema` (App) e `SchemaOrganization` (Layout). `LocalBusinessSchema` (App) e `SchemaBreadcrumbList` (Layout) mantidos.

---

## Próximos passos (a partir deste checkpoint)

Plano completo em **`PROXIMOS_PASSOS_ATUALIZADO_24JAN2026.md`**. Resumo do que podemos fazer em seguida:

### Opção A: SEO máximo (~2h30) – recomendado
1. **hreflang** no HTML (≈10 min) – 4 idiomas, `x-default`
2. **Schema.org** completo (≈1 h) – Organization, BreadcrumbList, Review/Rating, VideoObject, Service, LocalBusiness
3. **Google Search Console** (≈30 min) – verificação, sitemap, alertas
4. **Google Business Profile** (≈1 h) – perfil, fotos, reviews, serviços

**Impacto:** +50% visibilidade no Google.

### Opção B: UX premium (~5h30)
1. Validação de formulários avançada (≈1 h)
2. Loading skeletons (≈30 min)
3. Breadcrumbs visuais (≈1 h)
4. Sistema de busca global (≈3 h)

**Impacto:** +R$ 3.200/mês estimado.

### Opção C: Fase 1 + Fase 2 (~8 h)
- SEO máximo + UX premium.  
**ROI:** +50% visibilidade + +R$ 3.200/mês.

### Deploy
- **Frontend/backoffice:** push para `main` → deploy automático no Vercel (~2–5 min).  
- Scripts úteis: `DEPLOY_WEB3.bat` / `DEPLOY_WEB3.ps1`, `COMO_FAZER_DEPLOY_WEB3.md`.

---

*Checkpoint registrado para controle de versão e rollback.*
