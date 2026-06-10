# 🚀 Roadmap prioritário – Site Azimut 2026

**Ordem:** crítico → alta → média → baixa.  
**Atualizado:** janeiro 2026

---

## 📌 MAPEAMENTO COMPLETO (tudo que estava nos planos)

**Para ver TUDO** – animações, games, automações, melhorias, feito vs pendente – use:

- **`MAPEAMENTO_COMPLETO_PLANOS_E_PENDENCIAS.md`** – lista completa por tema (site inteligente, animações, game Empathy Engine, outros games, 7 workflows n8n, conteúdo dinâmico, SEO, UX, backoffice, Web3, bugs, conteúdo). Cada item com fonte (documento original) e status (✅/🔄/❌).

Os planos tinham **muito mais**: padronização de animações (feita), game Ciclos 0–3 (Ciclo 0 pendente: Entregar, highlight combo, som), outros games (Quiz Vancouver, Quiz 360°, easter eggs), 7 automações n8n (só 1 parcial), melhorias visuais (VideoPlayer, ImageGallery, Timeline, Vancouver galeria), conteúdo dinâmico, analytics premium, Web3/NFT. Tudo está rastreado no mapeamento.

---

## 🔴 FASE 0 – Crítico (fazer primeiro)

### 1. Backoffice: build no projeto certo
- **O quê:** Garantir que deploy do backoffice vá para **azimut-backoffice** (Neon, variáveis).
- **Como:** [docs/DEPLOY_BACKOFFICE_VERCEL.md](docs/DEPLOY_BACKOFFICE_VERCEL.md) – Root vazio, Install/Build com `cd azimut-cms && ...`.
- **Tempo:** 5 min (config no Vercel + redeploy).
- **Status:** ⚠️ Ajuste de configuração pendente.

### 2. ServiceDetail (página de serviço) – bug histórico
- **O quê:** `/pt/what/cinema-audiovisual` (e similares) às vezes renderiza só 3 seções; hero e conteúdo principal somem.
- **Onde:** `src/pages/ServiceDetail.tsx`; ver `CHECKPOINT_SERVICEDETAIL_2026-01-11.md` se existir.
- **Ação:** Retomar debug (refs, layout, dados) ou validar se já foi corrigido em produção.
- **Tempo:** 1–2 h.
- **Status:** 🔴 Crítico se ainda ocorrer em produção.

### 3. Variáveis e publicação
- **O quê:** Site no projeto **azimut** (não azimut-site-vite-tailwind); backoffice no **azimut-backoffice**.
- **Ação:** Sempre deploy site com `vercel link --project azimut` na raiz; backoffice com link em `azimut-backoffice` e build a partir de `azimut-cms`.
- **Status:** ✅ Já documentado; manter checklist de deploy.

---

## 🟠 FASE 1 – SEO e visibilidade (esta semana, ~2h30)

### 4. hreflang no HTML
- **O quê:** `<link rel="alternate" hreflang="pt|en|es|fr" />` + `x-default` em todas as páginas.
- **Impacto:** Google serve a versão correta por país/idioma.
- **Tempo:** ~10 min.
- **Status:** ❌ Falta (sitemap já tem).

### 5. Schema.org completo
- **O quê:** Organization, BreadcrumbList (já parcial), **Review/Rating** (depoimentos), **VideoObject** (demoreel), **Service** (6 especialidades), **LocalBusiness** (Rio, Vancouver, Floripa).
- **Impacto:** Rich snippets, estrelas e mais CTR no Google.
- **Tempo:** ~1 h.
- **Status:** ⚠️ Parcial.

### 6. Google Search Console
- **O quê:** Conta, verificação do domínio, envio do sitemap, alertas.
- **Tempo:** ~30 min.
- **Status:** ❌ Falta.

### 7. Google Business Profile
- **O quê:** Perfil criado/atualizado, fotos, serviços, pedir reviews.
- **Impacto:** +tráfego local.
- **Tempo:** ~1 h.
- **Status:** ❌ Falta.

### 8. Core Web Vitals
- **O quê:** Medir e otimizar LCP, INP, CLS (lazy load, tamanho de chunks, fontes).
- **Tempo:** ~30 min análise + ajustes.
- **Status:** ❌ Falta análise.

---

## 🟡 FASE 2 – UX e conversão (próximas 2 semanas, ~5h30)

### 9. Validação de formulários
- **O quê:** Validação em tempo real, mensagens claras, feedback visual, honeypot anti-spam.
- **Impacto:** Menos erros e mais conversão.
- **Tempo:** ~1 h.
- **Status:** ⚠️ Básico existe.

### 10. Loading skeletons
- **O quê:** Skeleton screens nas páginas principais e listagens.
- **Tempo:** ~30 min.
- **Status:** ❌ Falta.

### 11. Breadcrumbs visuais
- **O quê:** Breadcrumbs em todas as páginas; Schema BreadcrumbList já existe, falta UI.
- **Tempo:** ~1 h.
- **Status:** ⚠️ Só Schema.

### 12. Sistema de busca
- **O quê:** Busca global (projetos, serviços, blog), filtros e resultados por idioma.
- **Tempo:** ~3 h.
- **Status:** ❌ Falta.

### 13. PWA offline
- **O quê:** Estratégia de cache no service worker para páginas principais.
- **Tempo:** ~30 min.
- **Status:** ⚠️ SW existe, falta cache.

### 14. Acessibilidade
- **O quê:** ARIA, foco, skip links, contraste.
- **Tempo:** ~20 min.
- **Status:** ⚠️ Básico.

---

## 🟢 FASE 3 – Conteúdo e autoridade (próximo mês, ~10–15 h)

### 15. Conteúdo long-form
- **O quê:** Expandir Vancouver, páginas `/what/...`, case studies em `/studio/credibilidade`.
- **Impacto:** Mais autoridade e SEO.
- **Status:** ⚠️ Parcial.

### 16. Blog estratégico
- **O quê:** 1 post/semana (VR, documentário, VFS vs VanArts, museus imersivos, IA em audiovisual).
- **Status:** ❌ Falta.

### 17. Backlinks
- **O quê:** VFS, VanArts, Museu Olímpico, portais “Study in Canada”.
- **Status:** ❌ Falta contato.

---

## 🔵 FASE 4 – Backoffice e automação (próximo mês, ~15–20 h)

### 18. Dashboard analytics
- **O quê:** KPIs, gráficos, filtros, exportação.
- **Status:** ⚠️ Básico.

### 19. Automação de leads
- **O quê:** Lead scoring, notificações, workflows, email pós-lead.
- **Status:** ⚠️ Parcial.

### 20. Notificações
- **O quê:** Tempo real, email, WhatsApp (se aplicável).
- **Status:** ⚠️ Básico.

### 21. n8n + enriquecimento de leads
- **O quê:** Webhook do site → n8n → enriquecimento → Neon/Postgres; ver PROXIMOS_PASSOS_FINAL.md.
- **Status:** ⚠️ Config pendente (SerpAPI, PostgreSQL, ativar workflow).

---

## ⚪ FASE 5 – Refino e manutenção

### 22. Google Analytics
- **O quê:** `VITE_GA_MEASUREMENT_ID` no Vercel (projeto **azimut**), redeploy.
- **Status:** ❌ Se ainda não configurado.

### 23. Eventos de analytics
- **O quê:** Scroll depth, tempo na página, cliques em CTA, conversões por formulário.
- **Tempo:** ~15 min.
- **Status:** ⚠️ Básico.

### 24. Imagens OG
- **O quê:** OG image por página/idioma para WhatsApp/LinkedIn.
- **Status:** ❌ Falta.

### 25. Webinars – ES/FR
- **O quê:** Em `Webinars.tsx`, conteúdo `es` e `fr` estão como `content.pt` (TODO); trocar por traduções reais.
- **Tempo:** ~30 min.
- **Status:** ❌ TODO no código.

### 26. BlogPost – tema
- **O quê:** Em `BlogPost.tsx`, `theme = 'dark'` está fixo; receber via props se necessário.
- **Status:** Baixa prioridade.

### 27. Error handling
- **O quê:** ErrorBoundary e fallbacks por rota/página.
- **Tempo:** ~20 min.
- **Status:** ⚠️ Básico.

---

## 📋 Checklist “esta semana” (prioridade máxima)

- [ ] **Backoffice:** config Vercel azimut-backoffice (Root + Install/Build) e redeploy.
- [ ] **ServiceDetail:** testar `/pt/what/cinema-audiovisual` em produção; se quebrado, retomar debug.
- [ ] **hreflang:** adicionar tags no HTML (4 idiomas + x-default).
- [ ] **Schema:** Review/Rating, VideoObject, LocalBusiness.
- [ ] **Google Search Console:** verificar domínio e enviar sitemap.
- [ ] **Google Business Profile:** criar/atualizar perfil.
- [ ] **GA:** conferir `VITE_GA_MEASUREMENT_ID` no projeto **azimut** e redeploy se necessário.

---

## 🎯 Ordem sugerida de execução

| Ordem | Item                    | Fase | Tempo  |
|-------|-------------------------|------|--------|
| 1     | Backoffice build       | 0    | 5 min  |
| 2     | Testar ServiceDetail    | 0    | 15 min |
| 3     | hreflang                | 1    | 10 min |
| 4     | Schema (Review, Video, Local) | 1 | 1 h    |
| 5     | Google Search Console   | 1    | 30 min |
| 6     | Google Business Profile| 1    | 1 h    |
| 7     | Core Web Vitals         | 1    | 30 min |
| 8     | Validação formulários   | 2    | 1 h    |
| 9     | Loading skeletons       | 2    | 30 min |
| 10    | Breadcrumbs visuais     | 2    | 1 h    |

Depois: busca global, PWA offline, conteúdo long-form, blog, backoffice analytics e automação.

---

**Resumo:** Começar por **Fase 0** (backoffice + ServiceDetail), em seguida **Fase 1 (SEO)** para ganhar visibilidade rápido; depois **Fase 2 (UX)** e, em paralelo, conteúdo e backoffice.
