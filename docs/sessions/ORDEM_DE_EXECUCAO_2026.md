# 📋 Ordem de execução – O que fazer e em que ordem

**Objetivo:** Uma única lista ordenada com tudo que combinamos e o que falta, para executar na sequência.

**Atualizado:** janeiro 2026  
**Status:** Em execução – seguindo a ordem abaixo.

---

## ⚠️ LEMBRETE – VOLTAR ATRÁS

Depois do Item 6 (Schema.org), **voltar atrás** e fazer (se ainda não fez):

- **Item 4 – GA no projeto azimut:** Vercel → projeto **azimut** → Environment Variables → adicionar `VITE_GA_MEASUREMENT_ID` = `G-XKHT65THTL` → Redeploy.

---

## 🔴 BLOCO 1 – Crítico (fazer primeiro)

| # | Item | O quê fazer | Tempo |
|---|------|-------------|--------|
| 1 | **Backoffice – projeto e domínio** | Garantir deploy no projeto **azimut-backoffice** (Root vazio, Install/Build com `cd azimut-cms`). Domínio **backoffice.azmt.com.br** só nesse projeto (remover do **azimut** se estiver lá). | 5–10 min |
| 2 | **ServiceDetail** | ~~Testar e corrigir~~ **Correção aplicada:** refs duplicados (`sectionRefs.current[4]` e `[5]`) foram separados para índices únicos (5, 6, 7). Testar em produção após deploy. | 15–30 min |
| 3 | **Webinars ES/FR** | ~~Trocar conteúdo es/fr~~ **Feito:** conteúdo completo em espanhol e francês em `src/pages/Webinars.tsx` (meta, hero, upcoming, recorded, topics, register, cta). | ~30 min |

---

## 🟠 BLOCO 2 – SEO e visibilidade (esta semana)

| # | Item | O quê fazer | Tempo |
|---|------|-------------|--------|
| 4 | **GA no projeto azimut** | **Sua vez:** Vercel → projeto **azimut** → Environment Variables → adicionar `VITE_GA_MEASUREMENT_ID` = `G-XKHT65THTL`. Redeploy. | 5 min |
| 5 | **hreflang** | ~~Adicionar tags~~ **Feito:** `index.html` tem hreflang pt-BR, en-US, es-ES, fr-FR + x-default para home; demais páginas já usam `SEO.tsx` (Helmet). | ~10 min |
| 6 | **Schema.org** | ~~Completar~~ **Feito:** em `SEOGlobal.tsx`: (1) hasOfferCatalog com 6 serviços (Cinema, VR, Museus, Educação, Consultoria, VFX); (2) LocalBusiness Rio com `review` (2 depoimentos); (3) VideoObject showreel; (4) LocalBusiness Rio/Vancouver/Floripa já existiam. | ~1 h |
| 7 | **Google Search Console** | Verificar propriedade do domínio, enviar sitemap, solicitar indexação das URLs principais. | ~30 min |
| 8 | **Google Business Profile** | Criar/atualizar perfil, fotos, serviços, pedir reviews. | ~1 h |
| 9 | **Core Web Vitals** | Medir LCP, INP, CLS (Lighthouse/PageSpeed). Ajustar lazy load, chunks, fontes se necessário. | ~30 min |

---

## 🟡 BLOCO 3 – UX e conversão

| # | Item | O quê fazer | Tempo |
|---|------|-------------|--------|
| 10 | **Validação de formulários** | Validação em tempo real, mensagens claras, honeypot anti-spam. | ~1 h |
| 11 | **Loading skeletons** | Skeleton screens nas páginas principais e listagens. | ~30 min |
| 12 | **Breadcrumbs visuais** | Breadcrumbs em todas as páginas (Schema já existe; falta UI). | ~1 h |
| 13 | **Sistema de busca** | Busca global (projetos, serviços, blog), filtros e resultados por idioma. | ~3 h |
| 14 | **PWA offline** | Estratégia de cache no service worker para páginas principais. | ~30 min |
| 15 | **Acessibilidade** | Revisar ARIA, foco, skip links, contraste. | ~20 min |

---

## 🤖 BLOCO 4 – Navegação inteligente por IA

| # | Item | O quê fazer | Tempo |
|---|------|-------------|--------|
| 16 | **Conectar useIntelligentNavigation à UI** | Usar o hook em um componente (ex.: Layout ou barra lateral). Exibir recomendações (“Você pode gostar” / “Próximos passos”) com base em perfil e localização. | ~1–2 h |
| 17 | **Adaptar conteúdo/CTA por perfil** | (Opcional) Usar `userContext` do hook para destacar menu/CTA diferente (ex.: student → Academy, business → Corporate). | ~1 h |

---

## ⚙️ BLOCO 5 – Automações (n8n + backoffice)

**Estado no código:** O **backoffice** já chama o n8n quando um lead é criado (`azimut-cms/app/api/leads/route.ts` e `leads/vancouver/route.ts`): após salvar o lead, faz POST para `N8N_LEAD_INTELLIGENCE_WEBHOOK` (ou fallback `.../webhook/lead-intelligence`). O site não precisa chamar n8n direto: formulário → backoffice → n8n.

| # | Item | O quê fazer | Tempo |
|---|------|-------------|--------|
| 18 | **n8n – SerpAPI e PostgreSQL** | No workflow n8n: nó SerpAPI com `{{ $env.SERPAPI_KEY }}`; credencial PostgreSQL (Neon, SSL require). Salvar e ativar workflow. Ver `PROXIMOS_PASSOS_FINAL.md`. | ~15 min |
| 19 | **n8n – URL do webhook** | Copiar URL do webhook (ex.: `.../webhook/lead-intelligence` ou `.../webhook/lead-enrichment`). | 2 min |
| 20 | **Vercel – backoffice** | Projeto **azimut-backoffice** → Environment Variables → adicionar `N8N_LEAD_INTELLIGENCE_WEBHOOK` = URL do webhook do n8n (se diferente do fallback). Redeploy. | 5 min |
| 21 | **Site – chamar enrichment** | **Já coberto:** formulário envia para backoffice; backoffice salva e chama n8n. Nada a alterar no site. | — |
| 22 | **Testar fluxo lead → n8n** | Enviar lead de teste pelo site; verificar em n8n (Executions) e no banco (Neon) se os dados chegaram. | ~15 min |

---

## 🟢 BLOCO 6 – Conteúdo e backoffice

| # | Item | O quê fazer | Tempo |
|---|------|-------------|--------|
| 23 | **Conteúdo long-form** | Expandir Vancouver, páginas `/what/...`, case studies em `/studio/credibilidade`. | contínuo |
| 24 | **Blog estratégico** | 1 post/semana (VR, documentário, VFS vs VanArts, museus imersivos, IA em audiovisual). | contínuo |
| 25 | **Imagens OG** | OG image por página/idioma (WhatsApp, LinkedIn). | ~2 h |
| 26 | **Dashboard analytics (backoffice)** | KPIs, gráficos, filtros, exportação. | ~3–5 h |
| 27 | **Notificações (backoffice)** | Tempo real, email, WhatsApp (se aplicável). | ~2 h |

---

## 🔵 BLOCO 7 – Refino

| # | Item | O quê fazer | Tempo |
|---|------|-------------|--------|
| 28 | **Eventos de analytics** | Scroll depth, tempo na página, cliques em CTA, conversões por formulário no GA. | ~15 min |
| 29 | **Error handling** | ErrorBoundary e fallbacks por rota/página. | ~20 min |
| 30 | **Backlinks** | Contato VFS, VanArts, Museu Olímpico, portais “Study in Canada”. | contínuo |

---

## 📌 Resumo da ordem (número a número)

```
1 → 2 → 3          Bloco 1 (crítico)
4 → 5 → 6 → 7 → 8 → 9   Bloco 2 (SEO)
10 → 11 → 12 → 13 → 14 → 15   Bloco 3 (UX)
16 → 17             Bloco 4 (navegação inteligente IA)
18 → 19 → 20 → 21 → 22   Bloco 5 (automações)
23 → 24 → 25 → 26 → 27   Bloco 6 (conteúdo e backoffice)
28 → 29 → 30        Bloco 7 (refino)
```

**Sugestão:** Fazer na ordem acima. Blocos 1 e 2 primeiro; 3 e 4 em seguida; 5 quando n8n estiver disponível; 6 e 7 em paralelo ou depois.

---

**Referências:** ROADMAP_PRIORITARIO_2026.md, MAPEAMENTO_COMPLETO_PLANOS_E_PENDENCIAS.md, PROXIMOS_PASSOS_FINAL.md, REFERENCIA_GA_E_AUTOMACOES_COMBINADO.md, AUTOMACOES_ROADMAP_EXECUTIVO.md.
