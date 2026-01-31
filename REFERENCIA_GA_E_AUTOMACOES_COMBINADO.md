# 📌 Referência: GA no projeto Azimut + Automações (o que combinamos)

**Objetivo:** Esclarecer o que é "GA no projeto azimut", onde estão as automações e o que já foi combinado de fazer, com base em todos os arquivos do repo.

---

## 1. O que é "GA no projeto azimut"

**GA = Google Analytics (Google Analytics 4).**

- **O quê:** Variável de ambiente no **Vercel**, no projeto do **site** (nome do projeto: **azimut**), para o site enviar dados de visita (tráfego, páginas, eventos) para o Google Analytics.
- **Nome da variável:** `VITE_GA_MEASUREMENT_ID`
- **Valor:** O **Measurement ID** da propriedade GA4 (ex.: `G-XKHT65THTL` — já existe no `.env` e `.env.local`).
- **Onde configurar:** Vercel → Projeto **azimut** (site) → Settings → Environment Variables → adicionar `VITE_GA_MEASUREMENT_ID` = `G-XKHT65THTL` (ou o ID que você usar no GA4).
- **Depois:** Dar redeploy do projeto **azimut** para a variável valer em produção.
- **Arquivos que usam:** `src/components/GoogleAnalytics.tsx` (já lê `import.meta.env.VITE_GA_MEASUREMENT_ID`); `src/utils/web-vitals.ts` envia Web Vitals para o GA quando o ID está configurado.

**Resumo:** "GA no projeto azimut" = colocar o ID do Google Analytics nas variáveis de ambiente do projeto **azimut** na Vercel e redeployar, para o site passar a enviar dados para o GA4.

**Documentos relacionados:** `ROADMAP_PRIORITARIO_2026.md` (item 22), `VARIAVEIS_VERCEL_COMPLETO.md`, `docs/GUIA_MONITORAMENTO_SEO.md`, `TODO_AMANHA.md`.

---

## 2. Onde estão as automações (arquivos principais)

| Arquivo | Conteúdo |
|--------|----------|
| **`AUTOMACOES_ROADMAP_EXECUTIVO.md`** | Visão dos **7 workflows** n8n (passiva, ativa, LinkedIn, Instagram, Google Intent, Reengajamento, Competitor), custos, cronograma, prioridade (Railway, depois captação ativa). |
| **`PROXIMOS_PASSOS_FINAL.md`** | Passo a passo **combinado**: (1) Corrigir SerpAPI e PostgreSQL no n8n, (2) Ativar e testar workflow, (3) Integrar com o site (webhook, variável `VITE_N8N_WEBHOOK_URL` no Vercel, chamar no formulário). Checklist completo. |
| **`docs/workflows/ROADMAP_CAPTACAO_INTELIGENTE.md`** | Roadmap do sistema de captação: Fase 0 (preparação), Fase 1 (deploy n8n, Railway, variáveis), Fase 2 (enriquecimento), Fase 3 (comunicação/email), Fase 4 (chatbot). |
| **`docs/workflows/WORKFLOWS_3_A_7_DETALHES.md`** | Detalhes dos workflows 3 a 7 (LinkedIn, Instagram, Google Intent, Reengajamento, Competitor). |
| **`MAPEAMENTO_COMPLETO_PLANOS_E_PENDENCIAS.md`** | Seção **5. AUTOMAÇÕES N8N**: status de cada workflow (parcial/pendente), deploy n8n, enriquecimento, webhook lead → n8n. |

Outros relacionados: `docs/workflows/CAPTACAO_PASSIVA_COMPLETA.md`, `docs/workflows/CONFIGURAR_POSTGRESQL_N8N.md`, `docs/resumos/RESUMO_INTEGRACAO_N8N.md`, `docs/workflows/INTEGRAR_N8N_NO_SITE.md`, `n8n/` (workflows JSON).

---

## 3. O que combinamos de fazer (comparando os arquivos)

### GA (Google Analytics)

- [ ] **Vercel – projeto azimut:** Adicionar variável `VITE_GA_MEASUREMENT_ID` = seu Measurement ID GA4 (ex.: `G-XKHT65THTL`).
- [ ] **Redeploy** do projeto **azimut** após salvar a variável.
- Referência: `ROADMAP_PRIORITARIO_2026.md`, `VARIAVEIS_VERCEL_COMPLETO.md`, `docs/GUIA_MONITORAMENTO_SEO.md`.

### Automações (n8n + site)

Combinado principalmente em **`PROXIMOS_PASSOS_FINAL.md`** e **`AUTOMACOES_ROADMAP_EXECUTIVO.md`**:

1. **n8n (Railway ou VPS)**  
   - [ ] Deploy n8n (Railway $5/mês ou VPS).  
   - [ ] Workflow importado; variáveis no Railway: `SERPAPI_KEY`, `CLAUDE_API_KEY`, `RESEND_API_KEY`.

2. **Ajustes no workflow**  
   - [ ] SerpAPI: nó usando `{{ $env.SERPAPI_KEY }}`.  
   - [ ] PostgreSQL: credencial criada (Neon – host, database, user, password, port 5432, SSL require).  
   - [ ] Salvar workflow e ativar (toggle Active).

3. **Integração com o site**  
   - [ ] Pegar URL do webhook do n8n (ex.: `https://n8n-xxx.up.railway.app/webhook/lead-enrichment`).  
   - [ ] **Vercel – projeto azimut:** Adicionar variável `VITE_N8N_WEBHOOK_URL` = essa URL.  
   - [ ] Código: `src/api/enrichment.ts` (ou equivalente) já preparado; garantir que, após salvar o lead no backoffice/site, chama `submitLeadForEnrichment({ id, email, name, company, phone, lang })`.  
   - [ ] Redeploy do site e testar com lead real.

4. **Depois (próximas fases)**  
   - [ ] Workflow de email (Resend, templates, follow-up).  
   - [ ] Integrar chatbot com dados enriquecidos.  
   - [ ] Workflow 2 – Captação ativa (busca prospects, APIs, etc.), conforme `AUTOMACOES_ROADMAP_EXECUTIVO.md`.

---

## 4. Resumo rápido

| Item | O que é | Onde está | O que fazer |
|------|--------|-----------|-------------|
| **GA no projeto azimut** | Google Analytics 4 no site | Vercel → projeto **azimut** → Env Vars | Adicionar `VITE_GA_MEASUREMENT_ID` = ID GA4; redeploy. |
| **Automações** | 7 workflows n8n (lead → IA → email, etc.) | `AUTOMACOES_ROADMAP_EXECUTIVO.md`, `PROXIMOS_PASSOS_FINAL.md`, `docs/workflows/` | Seguir PROXIMOS_PASSOS_FINAL: n8n (SerpAPI, PostgreSQL, ativar) + `VITE_N8N_WEBHOOK_URL` no Vercel + chamar enrichment no formulário. |

---

**Última atualização:** janeiro 2026, com base em ROADMAP_PRIORITARIO_2026.md, MAPEAMENTO_COMPLETO_PLANOS_E_PENDENCIAS.md, PROXIMOS_PASSOS_FINAL.md, AUTOMACOES_ROADMAP_EXECUTIVO.md, VARIAVEIS_VERCEL_COMPLETO.md e docs/workflows/*.
