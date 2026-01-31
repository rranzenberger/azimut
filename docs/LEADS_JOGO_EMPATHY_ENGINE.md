# Leads do Jogo (Empathy Engine) — Integração

## Fluxo

1. **Jogo** (iframe em `/{lang}/game`): usuário preenche "Salvar Progresso", "Receber NFT" ou "Consultoria Grátis" e clica em Enviar.
2. **Game** envia `POST` para a API do backoffice: `{ name, email, type: 'save' | 'nft' | 'consulting', lang }`.
3. **Backoffice** (`POST /api/leads/game`):
   - Cria lead com `leadType: EMPATHY_ENGINE`, `description` com o tipo (Salvar Progresso, Receber NFT, Consultoria).
   - `leadIntelligence` guarda `origin: 'empathy_engine'`, `gameLeadType`, `lang`.
   - Dispara o webhook **n8n** (mesmo `N8N_LEAD_INTELLIGENCE_WEBHOOK`) com `formType: 'empathy_engine'`, `origin: 'empathy_engine'`.
   - Chama `POST /api/notify-form` no mesmo host para email (subject inclui `Lead_do_Jogo`).
4. **Backoffice UI**: área **Leads do Jogo** em `/admin/leads/game` (redireciona para `/admin/leads?leadType=EMPATHY_ENGINE`). Filtro "Todos os tipos" inclui "🎮 Empathy Engine (Jogo)".

## Onde está `origin: 'empathy_engine'`

- **Banco**: lead criado com `leadType: EMPATHY_ENGINE`; em `leadIntelligence` (JSON) fica `origin: 'empathy_engine'`, `gameLeadType`, `lang`.
- **n8n**: o payload do webhook inclui `formType: 'empathy_engine'` e `origin: 'empathy_engine'`. No n8n você pode:
  - Filtrar por `body.formType === 'empathy_engine'` ou `body.origin === 'empathy_engine'`.
  - Criar um branch ou workflow separado para leads do jogo (notificação, CRM, etc.).
- **Email (notify-form)**: `formType: 'empathy_engine_game'` → subject com `Lead_do_Jogo` e destino `leads@` (se configurado).

## Variáveis de ambiente

- **Jogo** (Empathy Engine): `VITE_LEADS_API_URL` ou `VITE_CMS_API_URL` = URL do backoffice (ex.: `https://backoffice.azmt.com.br`). Se não definido, usa `https://backoffice.azmt.com.br`.
- **Backoffice**: `N8N_LEAD_INTELLIGENCE_WEBHOOK` = URL do webhook n8n (usado para todos os leads, incluindo jogo).

## n8n — processar só leads do jogo

No workflow que recebe o webhook de lead-intelligence:

1. Após o nó **Webhook**, adicione um **IF** (ou **Switch**):
   - Condição: `{{ $json.body.formType === 'empathy_engine' }}` ou `{{ $json.body.origin === 'empathy_engine' }}`.
2. No branch "true": notificação específica (Slack/Email "Novo lead do jogo"), ou envio para uma lista/CRM separada.
3. No branch "false**: fluxo atual (outros leads).

Campos úteis no payload do jogo: `leadId`, `name`, `email`, `gameLeadType` (save | nft | consulting), `description`, `leadScore`, `lang`.
