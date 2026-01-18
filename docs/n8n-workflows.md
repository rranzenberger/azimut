# Workflows n8n - Guia de Implementação

## Workflow 1: Enriquecimento Automático de Lead

### Trigger
- **Tipo:** Webhook
- **Método:** POST
- **Path:** `/webhook/lead-enrichment`
- **Autenticação:** Header `X-API-Key`

### Nodes

1. **Webhook** → Recebe novo lead
2. **Set** → Extrai dados básicos (nome, email, empresa)
3. **IF** → Verifica se já foi enriquecido
4. **HTTP Request** → Proxycurl (LinkedIn)
   - URL: `https://nubela.co/proxycurl/api/v2/linkedin`
   - Headers: `Authorization: Bearer {PROXYCURL_KEY}`
5. **HTTP Request** → SerpAPI (Google)
   - URL: `https://serpapi.com/search`
   - Params: `q={nome} {empresa}`, `api_key={SERPAPI_KEY}`
6. **Code** → Processa dados brutos
7. **HTTP Request** → Claude API (Análise)
   - URL: `https://api.anthropic.com/v1/messages`
   - Headers: `x-api-key: {CLAUDE_KEY}`, `anthropic-version: 2023-06-01`
8. **PostgreSQL** → Salva perfil enriquecido
9. **HTTP Request** → Notifica Slack/Email

## Workflow 2: Email Personalizado

### Trigger
- **Tipo:** Schedule (Cron)
- **Expressão:** `0 9 * * *` (9h todo dia)

### Nodes

1. **PostgreSQL** → Busca leads qualificados (score > 60, sem email enviado)
2. **Loop** → Para cada lead
3. **PostgreSQL** → Busca perfil enriquecido
4. **HTTP Request** → Claude API (Gera email)
5. **HTTP Request** → Resend (Envia email)
6. **PostgreSQL** → Registra email enviado

## Workflow 3: Follow-up Automático

### Trigger
- **Tipo:** Schedule
- **Expressão:** `0 10 * * *` (10h todo dia)

### Nodes

1. **PostgreSQL** → Leads com email enviado há 3 dias, sem resposta
2. **Loop** → Para cada lead
3. **PostgreSQL** → Busca histórico de interações
4. **HTTP Request** → Claude API (Gera follow-up)
5. **HTTP Request** → Resend (Envia)
6. **PostgreSQL** → Atualiza status
