# 🚀 DEPOIS DE IMPORTAR O WORKFLOW - O QUE FAZER?

## ✅ SE VOCÊ JÁ IMPORTOU:

Parabéns! O workflow está no n8n. Agora precisa **configurar as credenciais**!

---

## 📋 CHECKLIST PÓS-IMPORTAÇÃO:

### **1. Verificar Nodes Importados** ✅

Você deve ver **7 nodes** conectados:

1. 🔗 **Webhook** (verde/azul - trigger)
2. 📝 **Set** (organiza dados)
3. 🌐 **SerpAPI** (busca Google)
4. **{} Processar SerpAPI** (código JavaScript)
5. 🌐 **Claude AI** (análise IA)
6. **{} Processar Claude** (código JavaScript)
7. 🐘 **PostgreSQL** (salva no banco)

**Se não vê todos os nodes:** O workflow não importou corretamente. Tente importar novamente.

---

### **2. Configurar Credencial PostgreSQL** ✅

1. **Clique no node "PostgreSQL"** (último da direita)
2. **No painel direito**, procure por **"Credential"**
3. **Selecione a credencial** que você criou antes (a que testou com sucesso)
4. ✅ **Pronto!** PostgreSQL está configurado

---

### **3. Criar Credencial SerpAPI** 🔑

1. **Clique no node "SerpAPI"** (terceiro da esquerda)
2. **No painel direito**, procure por **"Credential"**
3. **Clique em "Create New Credential"** ou **"Add Credential"**
4. **Escolha tipo:** `Query Auth` ou `Generic Credential Type`
5. **Preencha:**
   - **Name:** `SerpAPI Key` (ou qualquer nome)
   - **Query Parameter Name:** `api_key`
   - **Value:** Cole sua chave SerpAPI
6. **Clique em "Save"**
7. ✅ **Pronto!** SerpAPI configurado

**Sua chave SerpAPI:** (você já tem, está nas variáveis do Railway)

---

### **4. Criar Credencial Claude** 🤖

1. **Clique no node "Claude AI"** (quinto da esquerda)
2. **No painel direito**, procure por **"Credential"**
3. **Clique em "Create New Credential"** ou **"Add Credential"**
4. **Escolha tipo:** `Header Auth` ou `Generic Credential Type`
5. **Preencha:**
   - **Name:** `Claude API Key` (ou qualquer nome)
   - **Header Name:** `x-api-key`
   - **Header Value:** Cole sua chave Claude
   - **Outro header (se necessário):**
     - **Header Name:** `anthropic-version`
     - **Header Value:** `2023-06-01`
6. **Clique em "Save"**
7. ✅ **Pronto!** Claude configurado

**Sua chave Claude:** (você já tem, está nas variáveis do Railway)

---

### **5. Verificar Webhook URL** 🔗

1. **Clique no node "Webhook"** (primeiro da esquerda)
2. **No painel direito**, procure por **"Webhook URL"** ou **"Production URL"**
3. **Copie a URL completa** (exemplo: `https://n8n-production-dce3.up.railway.app/webhook/lead-enrichment`)
4. **Guarde essa URL!** Você vai precisar no site!

**Exemplo de URL:**
```
https://seu-n8n.up.railway.app/webhook/lead-enrichment
```

---

### **6. Ativar Workflow** ▶️

1. **No canto superior direito** do workflow, procure o **toggle "Active"**
2. **Clique para ativar** (ficará verde/azul quando ativo)
3. ✅ **Workflow está rodando!**

**Importante:** O workflow só funciona quando está **Active**!

---

## 🧪 TESTAR WORKFLOW:

### **Opção 1: Teste Manual no n8n**

1. **Clique no node "Webhook"**
2. **Procure botão "Test"** ou **"Execute Workflow"**
3. **Clique para testar**
4. **Veja os resultados** em cada node

### **Opção 2: Teste via cURL (Terminal)**

Abra o PowerShell e execute:

```powershell
curl -X POST https://seu-n8n.up.railway.app/webhook/lead-enrichment `
  -H "Content-Type: application/json" `
  -d '{
    "id": "test-123",
    "email": "teste@exemplo.com",
    "name": "João Silva",
    "company": "Empresa Teste",
    "phone": "+5511999999999",
    "lang": "pt"
  }'
```

**Substitua `seu-n8n.up.railway.app` pela sua URL real!**

---

## ✅ VERIFICAÇÃO FINAL:

- [ ] Workflow importado com 7 nodes
- [ ] Credencial PostgreSQL selecionada
- [ ] Credencial SerpAPI criada e configurada
- [ ] Credencial Claude criada e configurada
- [ ] Webhook URL copiada
- [ ] Workflow ativado (toggle "Active" ligado)
- [ ] Teste executado com sucesso

---

## 🎯 PRÓXIMO PASSO (Depois de Tudo Configurado):

**Integrar no site!**

1. Adicionar variável `VITE_N8N_WEBHOOK_URL` no Vercel
2. Atualizar código do site para chamar webhook
3. Testar com lead real do formulário

---

## 🆘 PROBLEMAS COMUNS:

### **Erro: "Credential not found"**
- **Solução:** Crie a credencial primeiro, depois selecione no node

### **Erro: "Connection failed" (PostgreSQL)**
- **Solução:** Verifique se selecionou a credencial correta

### **Erro: "API key invalid" (SerpAPI/Claude)**
- **Solução:** Verifique se colou a chave completa (sem espaços)

### **Workflow não executa**
- **Solução:** Verifique se está **Active** (toggle ligado)

---

**Configure as 3 credenciais e ative o workflow!** 🚀
