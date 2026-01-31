# 🚀 COMEÇAR WORKFLOW AGORA - Passo a Passo Visual

## ✅ ONDE VOCÊ ESTÁ:

Você está no **editor de workflow do n8n**! Vejo a tela em branco com "Add first step..." no centro.

---

## 🎯 O QUE FAZER AGORA:

### PASSO 1: Adicionar Primeiro Nó (Webhook)

**Na tela atual:**

1. **Clique no quadrado tracejado** no centro que diz "Add first step..."
   - Ou clique no **ícone "+"** no canto superior esquerdo da sidebar
   - Ou clique no **ícone "+"** no canto superior direito

2. **Uma busca aparecerá** - digite: `webhook`

3. **Selecione "Webhook"** → **"Webhook"** (não "Wait for Webhook")

4. **Um nó Webhook aparecerá** na tela

---

### PASSO 2: Configurar o Webhook

**Clique no nó Webhook que apareceu:**

1. **HTTP Method:** 
   - Clique no dropdown
   - Selecione `POST`

2. **Path:**
   - Digite: `/webhook/lead-enrichment`

3. **Response Mode:**
   - Clique no dropdown
   - Selecione `Last Node`

4. **Authentication:**
   - Deixe como `None` (por enquanto)

5. **Clique em "Save"** (botão vermelho no canto superior direito)

---

### PASSO 3: Ativar o Workflow

**No canto superior direito da tela:**

1. **Procure o toggle "Inactive"** (ou "Active")
2. **Clique nele** para ativar
3. **Mudará para "Active"** (verde)

4. **Uma URL aparecerá** abaixo do nó Webhook ou na configuração
   - Exemplo: `https://n8n-production-dce3.up.railway.app/webhook/lead-enrichment`
5. **Copie esta URL** e guarde (você vai usar depois)

---

### PASSO 4: Salvar o Workflow

1. **Clique no botão "Save"** (vermelho, no canto superior direito)
2. **Dê um nome ao workflow:**
   - Ex: "Enriquecimento de Lead"
   - Ou "Lead Enrichment"

---

## ✅ CHECKLIST RÁPIDO:

- [ ] Clicar "Add first step..." ou ícone "+"
- [ ] Buscar "webhook"
- [ ] Selecionar "Webhook"
- [ ] Configurar: POST, `/webhook/lead-enrichment`, Last Node
- [ ] Salvar workflow
- [ ] Ativar workflow (toggle)
- [ ] Copiar URL do webhook

---

## 🎯 DEPOIS DO WEBHOOK (Próximos Passos):

**Você me avisa quando terminar o webhook e eu te guio para:**

1. **Adicionar nó "Set"** (extrair dados do lead)
2. **Adicionar nó "HTTP Request"** (SerpAPI)
3. **Adicionar nó "HTTP Request"** (Claude AI)
4. **Adicionar nó "PostgreSQL"** (salvar dados)

---

## 💡 DICAS:

- **Salve sempre:** Use Ctrl+S ou clique em "Save"
- **Teste:** Clique no nó Webhook e depois em "Test" para ver se funciona
- **Não se preocupe:** Vamos ajustar conforme necessário
- **Pergunte:** Me avise se tiver qualquer dúvida

---

## 🚀 RESUMO:

**AGORA:**
1. ⏳ Clicar "Add first step..."
2. ⏳ Buscar "webhook"
3. ⏳ Configurar Webhook
4. ⏳ Ativar workflow
5. ⏳ Copiar URL do webhook

**DEPOIS:**
- ⏳ Adicionar outros nós
- ⏳ Testar workflow completo

---

**Comece clicando em "Add first step..." e me avise quando configurar o Webhook!** 🚀
