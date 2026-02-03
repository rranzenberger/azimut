# ⚙️ Automações: o que ficamos de fazer e o que falta implementar

**Objetivo:** Listar todas as automações combinadas nos documentos e o status (feito vs pendente).

**Fontes:** `AUTOMACOES_ROADMAP_EXECUTIVO.md`, `docs/workflows/WORKFLOWS_3_A_7_DETALHES.md`, `ORDEM_DE_EXECUCAO_2026.md`, `MAPEAMENTO_COMPLETO_PLANOS_E_PENDENCIAS.md`, `docs/workflows/ROADMAP_CAPTACAO_INTELIGENTE.md`, `docs/workflows/LEAD_INTELLIGENCE_N8N.md`, `docs/workflows/VISAO_ORIGINAL_CAPTACAO_PASSIVA_ATIVA.md`.

---

## 📋 Visão geral: os 7 workflows

| # | Nome | Função resumida | Status | Custo extra |
|---|------|-----------------|--------|------------|
| **1** | **Captação passiva** | Lead preenche formulário → investigar (IP, email, LinkedIn, etc.) → email personalizado ou bloquear | 🔄 Parcial | ~$55/mês (Railway + APIs) |
| **2** | **Captação ativa** | Buscar prospects (LinkedIn, Instagram, Google) → IA analisa → email hiper-personalizado | ❌ Pendente | +$200/mês |
| **3** | **LinkedIn Automation** | Buscar prospects no LinkedIn → enviar conexão → mensagem personalizada → follow-ups | ❌ Futuro | +$59/mês |
| **4** | **Instagram Outreach** | Buscar perfis (hashtags culturais) → analisar → encontrar email → enviar + seguir | ❌ Futuro | +$49/mês (já contado em 2) |
| **5** | **Google Intent** | Monitorar buscas (VR, museus, etc.) → identificar quem pesquisa → enriquecer → email | ❌ Futuro | $0 (APIs já no 2) |
| **6** | **Reengajamento** | Leads inativos 6+ meses → verificar mudanças (LinkedIn) → email com novidades | ❌ Futuro | $0 |
| **7** | **Competitor Watch** | Quem visita sites de concorrentes (Leadfeeder) → identificar → abordar | ❌ Futuro | +$79/mês |

---

## ✅ O que já está feito (código / backoffice)

- **Backoffice:** Ao criar lead (formulário de contato, Vancouver, jogo Empathy Engine), o backoffice faz **POST para o webhook n8n** (`N8N_LEAD_INTELLIGENCE_WEBHOOK`). Código em `azimut-cms` (leads/route, vancouver, etc.).
- **Site:** Formulários enviam para o backoffice; não chamam n8n direto. Nada a alterar no site para o fluxo lead → n8n.
- **Documentação:** Workflows 1–7 descritos (passiva, ativa, 3–7 com estrutura N8N, APIs, custos).
- **Schema/APIs:** SQL de enriquecimento, exemplos de integração (`docs/n8n-workflows.md`, `sql/enrichment_schema.sql`), API Game Neurolinguístico no backoffice.

---

## ❌ O que falta implementar (por workflow)

### Workflow 1: Captação passiva (prioridade imediata)

**O que faz (combinado):**
- Receber lead via webhook (backoffice já envia).
- Validar **IP** (ipapi.co: geolocalização, VPN, proxy).
- Validar **email** (Hunter.io: válido, descartável, score).
- Opcional: blacklist IP (AbuseIPDB), Google Search (nome+empresa), LinkedIn (Proxycurl), análise IA (Claude/DeepSeek).
- Decidir: enviar email personalizado / email genérico / não enviar (marcar suspeito).
- Salvar perfil enriquecido (JSONB `leadIntelligence` no banco).
- Notificar (Slack/email) e/ou enviar email via Resend.

**O que falta:**
1. **Deploy do n8n** (Railway ou VPS) e garantir que o webhook está acessível.
2. **Configurar workflow no n8n:** webhook → nós de validação (IP, email) → enriquecimento (SerpAPI, Proxycurl, etc.) → Claude/DeepSeek → PostgreSQL (salvar) → Resend (email) / notificação.
3. **Variáveis de ambiente:** no n8n (Proxcurl, SerpAPI, Claude, Resend, etc.); no **Vercel (backoffice)** → `N8N_LEAD_INTELLIGENCE_WEBHOOK` = URL do webhook (ex.: `https://seu-n8n.railway.app/webhook/lead-intelligence`).
4. **PostgreSQL no workflow:** credencial Neon (ou outro) no n8n; nós que leem/escrevem lead e perfil enriquecido.
5. **Testar fluxo:** criar lead de teste pelo site → verificar Executions no n8n e dados no banco.

**Referências:**  
`ORDEM_DE_EXECUCAO_2026.md` §18–22, `docs/workflows/LEAD_INTELLIGENCE_N8N.md`, `docs/workflows/CAPTACAO_PASSIVA_COMPLETA.md`, `docs/workflows/VISAO_ORIGINAL_CAPTACAO_PASSIVA_ATIVA.md`.

---

### Workflow 2: Captação ativa

**O que faz (combinado):**
- Buscar prospects em fontes externas (Secretaria de Cultura, NFB, Creative BC, LinkedIn, Instagram, Google).
- Enriquecer com SerpAPI, Proxycurl, etc.
- IA (DeepSeek/Claude): scoring Frio/Morno/Quente, decisão enviar ou não.
- Salvar no banco (ex.: `external_leads` ou tabela equivalente).
- Gerar email personalizado (Claude) e enviar (Resend) apenas para quentes (ou com aprovação manual no backoffice).

**O que falta:**
1. Deploy n8n (se ainda não feito).
2. Contas e APIs: Proxycurl, SerpAPI (e opcionalmente Hunter, Resend).
3. Workflow n8n: trigger (agendado ou manual) → busca (SerpAPI/lista) → enriquecimento → IA → PostgreSQL → Resend.
4. Backoffice: tela/filtro para “leads externos” e aprovação de envio (se desejado).
5. Definir fontes e volume (ex.: 10 prospects/dia).

**Referências:**  
`docs/workflows/SISTEMA_CAPTACAO_ATIVA_LEADS.md`, `AUTOMACOES_ROADMAP_EXECUTIVO.md`, `docs/workflows/ROADMAP_CAPTACAO_INTELIGENTE.md`.

---

### Workflow 3: LinkedIn Automation

**O que faz:**  
Schedule diário → buscar prospects (ex.: Phantombuster) → enriquecer (Proxycurl) → analisar (DeepSeek: fit, SEND/SKIP) → enviar conexão (Phantombuster) → após aceitar, mensagem personalizada (Claude) → follow-ups (3, 7, 14 dias).

**O que falta:**  
Conta Phantombuster ($59/mês), conectar LinkedIn ao Phantombuster, criar workflow no n8n conforme `docs/workflows/WORKFLOWS_3_A_7_DETALHES.md` (Workflow 3). Pré-requisito: Workflows 1 e 2 estáveis.

---

### Workflow 4: Instagram Outreach

**O que faz:**  
Schedule diário → buscar perfis por hashtag (Apify) → analisar (DeepSeek) → encontrar email (Hunter.io) → criar email (Claude) → enviar (Resend) → seguir no Instagram (Apify).

**O que falta:**  
Configurar Apify para Instagram; criar workflow no n8n conforme `WORKFLOWS_3_A_7_DETALHES.md` (Workflow 4). Pré-requisito: Workflows 1 e 2.

---

### Workflow 5: Google Intent

**O que faz:**  
Google Alerts (termos: VR museum, museu interativo, etc.) → webhook → extrair dados → SerpAPI → Hunter → DeepSeek → Claude (email “vi que você pesquisou…”) → Resend.

**O que falta:**  
Configurar Google Alerts, webhook para receber alertas, workflow n8n conforme `WORKFLOWS_3_A_7_DETALHES.md` (Workflow 5).

---

### Workflow 6: Reengajamento

**O que faz:**  
Schedule mensal → PostgreSQL (leads inativos 6+ meses, email enviado, sem resposta) → Proxycurl (mudanças no LinkedIn) → DeepSeek (vale reengajar?) → Claude (email “vi que você [mudança]…”) → Resend.

**O que falta:**  
Query SQL de leads inativos (exemplo no doc); workflow n8n conforme `WORKFLOWS_3_A_7_DETALHES.md` (Workflow 6).

---

### Workflow 7: Competitor Watch

**O que faz:**  
Leadfeeder webhook (visitante em site de concorrente) → identificar empresa → Hunter (email) → DeepSeek (fit) → Claude (email “vi que visitou [concorrente]…”) → Resend.

**O que falta:**  
Conta Leadfeeder ($79/mês), tracking em sites concorrentes, webhook no n8n, workflow conforme `WORKFLOWS_3_A_7_DETALHES.md` (Workflow 7).

---

## 📅 Ordem sugerida (documentos)

1. **Agora (curto prazo):**  
   - n8n deployado (Railway/VPS).  
   - Workflow 1 configurado (SerpAPI + PostgreSQL no n8n, URL do webhook, `N8N_LEAD_INTELLIGENCE_WEBHOOK` no Vercel backoffice).  
   - Testar lead de teste → n8n → banco.

2. **Em seguida (médio prazo):**  
   - Workflow 2 (captação ativa): contas Proxycurl/SerpAPI, workflow, backoffice para leads externos (se desejado).

3. **Futuro (conforme roadmap):**  
   - Workflows 3–7 na ordem e quando custo/ROI fizer sentido (Mês 4–6 e 7+).

---

## 📂 Referências rápidas

| Tema | Documento |
|------|------------|
| Visão geral 7 workflows + custos | `AUTOMACOES_ROADMAP_EXECUTIVO.md` (raiz) |
| Passos n8n imediatos (webhook, Vercel, teste) | `ORDEM_DE_EXECUCAO_2026.md` §18–22 |
| Detalhes Workflows 3–7 (estrutura N8N, APIs) | `docs/workflows/WORKFLOWS_3_A_7_DETALHES.md` |
| Captação passiva (validações, anti-scam) | `docs/workflows/CAPTACAO_PASSIVA_COMPLETA.md`, `docs/workflows/LEAD_INTELLIGENCE_N8N.md` |
| Captação ativa (arquitetura, tabela external_leads) | `docs/workflows/SISTEMA_CAPTACAO_ATIVA_LEADS.md` |
| Visão original (passiva + ativa) | `docs/workflows/VISAO_ORIGINAL_CAPTACAO_PASSIVA_ATIVA.md` |
| Roadmap captação com IA (fases 0–4) | `docs/workflows/ROADMAP_CAPTACAO_INTELIGENTE.md` |
| Mapeamento feito/pendente (tudo) | `MAPEAMENTO_COMPLETO_PLANOS_E_PENDENCIAS.md` |
| Plano geral 2026 | `docs/PONTO_ATUAL_E_PLANO_CURTO_MEDIO_LONGO_2026.md` |

---

**Atualizado:** fevereiro 2026.  
**Objetivo:** Uma única referência para “quais automações ficamos de fazer” e “o que falta implementar” em cada uma.
