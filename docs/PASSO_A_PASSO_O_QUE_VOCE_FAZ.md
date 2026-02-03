# Passo a passo: o que você faz (orientação)

Tudo que **depende de você** (configuração, contas, n8n, Vercel, Google) em ordem. Eu (IA) faço o código; quando precisar de algo técnico novo, é comigo.

---

## A. Leads passivos (Workflow 1 n8n) – prioridade

**Objetivo:** Quando alguém preenche formulário no site, o backoffice já envia os dados para o n8n. Falta o n8n estar configurado para receber, investigar (IP, email, etc.) e salvar/notificar.

### 1. Ter o n8n no ar
- Se usar **Railway:** acessar o projeto, ver se o serviço n8n está ativo e qual a URL (ex.: `https://n8n-production-xxx.up.railway.app`).
- Se não tiver: criar projeto no Railway, deployar n8n (ver `PROXIMOS_PASSOS_FINAL.md` ou `docs/workflows/`).

### 2. Criar o Workflow 1 no n8n
- Abrir o n8n (URL acima).
- Criar novo workflow.
- **Nó 1 – Webhook:** trigger “Webhook”, método POST, path ex.: `/webhook/lead-intelligence`. Salvar o workflow uma vez para gerar a URL. **Copiar essa URL** (você vai colar no Vercel).
- **Nó 2 – Validação IP (opcional mas recomendado):** HTTP Request para `https://ipapi.co/{ip}/json/` (o `{ip}` vem do body que o backoffice envia). Usar o IP que vier no payload.
- **Nós seguintes (conforme quiser):** validação de email (Hunter.io), SerpAPI (Google), Proxycurl (LinkedIn), DeepSeek/Claude (análise), PostgreSQL (Neon – salvar resultado), Resend (enviar email).
- Guia detalhado: `PROXIMOS_PASSOS_FINAL.md`, `docs/workflows/LEAD_INTELLIGENCE_N8N.md`, `docs/workflows/CAPTACAO_PASSIVA_COMPLETA.md`.

### 3. Credenciais no n8n
- **PostgreSQL:** host (Neon), database, user, password, port 5432, **SSL: require**. Testar conexão.
- **SerpAPI:** api_key (variável ou credencial).
- **DeepSeek ou Claude:** API key.
- **Resend:** API key (para envio de email).

### 4. Ativar o workflow
- No n8n: botão “Active” / “Ativar” em cima. O webhook só recebe quando o workflow está ativo.

### 5. Colocar a URL do webhook no Vercel (backoffice)
- Vercel → projeto **azimut-backoffice** (não o azimut do site).
- **Settings → Environment Variables.**
- Adicionar: nome = `N8N_LEAD_INTELLIGENCE_WEBHOOK`, valor = **a URL que você copiou** (ex.: `https://n8n-xxx.../webhook/lead-intelligence`).
- **Redeploy** o backoffice (Deployments → ... → Redeploy).

### 6. Testar
- No site, preencher o formulário de contato (ou Vancouver) com um email de teste.
- No n8n: aba “Executions” – deve aparecer uma execução nova.
- No Neon (banco): verificar se o lead foi criado/atualizado com dados do n8n (se você configurou o nó PostgreSQL).

Se algo falhar: conferir se a URL no Vercel é exatamente a do webhook, se o workflow está ativo e se o backoffice fez redeploy.

---

## B. GA no projeto do site (azimut)

- Vercel → projeto **azimut** (site público).
- **Settings → Environment Variables.**
- Adicionar: nome = `VITE_GA_MEASUREMENT_ID`, valor = `G-XKHT65THTL` (ou o ID que vocês usam).
- **Redeploy** o site.

---

## C. Google Search Console

- Acessar [Google Search Console](https://search.google.com/search-console).
- Adicionar propriedade (URL do site, ex.: https://azmt.com.br).
- Verificar propriedade (HTML, DNS ou Google Analytics, conforme o que estiver disponível).
- Enviar sitemap (ex.: `https://azmt.com.br/sitemap.xml` ou a URL que o site expõe).
- Solicitar indexação das URLs principais (Home, Contact, Work, etc.).

---

## D. Google Business Profile

- Acessar [Google Business](https://business.google.com).
- Criar ou reivindicar o perfil da Azimut (endereço, telefone, site).
- Adicionar fotos, horário, serviços.
- Pedir avaliações a clientes (link de review).

---

## E. Leads ativos (Workflow 2) – depois do 1 estável

Quando o Workflow 1 estiver recebendo lead e funcionando:

- Workflow 2 = **captação ativa:** buscar prospects (LinkedIn, Instagram, Google, listas), enriquecer, IA, email.
- Requer contas/APIs: Proxycurl, SerpAPI, etc. Ver `docs/AUTOMACOES_O_QUE_FICAMOS_DE_FAZER_E_O_QUE_FALTA.md` e `docs/workflows/WORKFLOWS_3_A_7_DETALHES.md` (Workflow 2 e “Captação ativa”).

Você pode fazer isso em paralelo ou depois; eu posso guiar passo a passo quando for a vez.

---

## Resumo rápido

| O quê | Onde | Ação |
|------|------|------|
| Leads passivos (n8n) | n8n + Vercel backoffice | Workflow 1 com Webhook, credenciais, ativar, URL em `N8N_LEAD_INTELLIGENCE_WEBHOOK`, redeploy, testar. |
| GA no site | Vercel (projeto azimut) | `VITE_GA_MEASUREMENT_ID` = G-xxx → Redeploy. |
| Search Console | search.google.com | Propriedade, verificação, sitemap, indexação. |
| Business Profile | business.google.com | Perfil, fotos, serviços, reviews. |
| Leads ativos | n8n (depois) | Workflow 2 conforme doc de automações. |

Se em algum passo der erro (ex.: n8n não recebe, 404 no webhook, banco não atualiza), diga em qual passo e qual mensagem aparece que eu te oriento no próximo movimento.
