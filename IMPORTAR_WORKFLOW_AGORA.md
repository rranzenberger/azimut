# 🚀 IMPORTAR WORKFLOW AGORA - GUIA RÁPIDO

## **✅ VOCÊ ESTÁ NO LUGAR CERTO!**

Você já está no workflow "Enriquecimento Automático de Lead". Vamos expandir ele para o workflow completo!

---

## **🎯 OPÇÃO 1: IMPORTAR WORKFLOW COMPLETO (RECOMENDADO)**

### **Passo 1: Baixar o arquivo JSON**

1. No seu computador, abra o arquivo:
   ```
   c:\Users\ranz\Documents\azimut-site-vite-tailwind\n8n\lead-intelligence-workflow-completo.json
   ```

2. **Copiar TODO o conteúdo** (Ctrl+A, Ctrl+C)

---

### **Passo 2: Importar no N8N**

1. **No N8N**, clique no **menu de 3 pontos** (⋮) no canto superior direito
2. Ou clique em **"Workflow"** no menu superior
3. Procure por **"Import from File"** ou **"Import"**
4. Cole o JSON copiado
5. Clique em **"Import"**

**OU:**

1. Clique no **ícone de menu** (☰) no canto superior esquerdo
2. Vá em **"Workflows"**
3. Clique em **"Import"** ou **"Import from File"**
4. Cole o JSON
5. Clique em **"Import"**

---

### **Passo 3: Renomear (se necessário)**

Se importou como novo workflow:
- Renomeie para: **"Captação Passiva - Lead Intelligence"**

---

## **🎯 OPÇÃO 2: EXPANDIR WORKFLOW ATUAL**

Se preferir expandir o workflow que você já tem (7 nós), vamos adicionar os nós faltantes:

### **Nós que você já tem:**
- ✅ Webhook
- ✅ Set
- ✅ SerpAPI
- ✅ Processar SerpAPI
- ✅ Claude AI
- ✅ Processar Claude
- ✅ PostgreSQL

### **Nós que faltam adicionar:**
- ⚠️ Switch (Identificar Formulário)
- ⚠️ PostgreSQL (Verificar Lead Anterior)
- ⚠️ Code (Decisão Lead Existente)
- ⚠️ IF (Continuar Investigação?)
- ⚠️ HTTP Request (Validar IP)
- ⚠️ HTTP Request (Verificar Blacklist IP)
- ⚠️ HTTP Request (Validar Email) [opcional]
- ⚠️ HTTP Request (Buscar LinkedIn) [opcional]
- ⚠️ Code (Detectar Idioma)
- ⚠️ HTTP Request (Analisar com DeepSeek)
- ⚠️ Code (Processar DeepSeek)
- ⚠️ IF (É Legítimo?)
- ⚠️ HTTP Request (Gerar Small Talk)
- ⚠️ Code (Processar Small Talk)
- ⚠️ HTTP Request (Gerar Email)
- ⚠️ Code (Processar Email)
- ⚠️ HTTP Request (Enviar Email - Resend)
- ⚠️ IF (Tem WhatsApp?)
- ⚠️ Code (Preparar leadIntelligence)
- ⚠️ Respond to Webhook

**Total: 12 nós adicionais**

---

## **💡 RECOMENDAÇÃO:**

**Importar o workflow completo (Opção 1)** é mais rápido e garante que tudo está conectado corretamente.

Depois de importar, você só precisa:
1. Configurar credenciais (DeepSeek, Claude, Resend, PostgreSQL)
2. Ajustar variáveis de ambiente (se necessário)
3. Testar

---

## **🔧 DEPOIS DE IMPORTAR:**

### **1. Verificar Webhook:**

1. Clique no nó **"Receber Lead"** (Webhook)
2. Veja a URL do webhook (deve ser algo como: `https://n8n-production-dce3.up.railway.app/webhook/lead-intelligence`)
3. **Copie essa URL**
4. Você vai precisar adicionar no `.env` do backoffice:
   ```
   N8N_LEAD_INTELLIGENCE_WEBHOOK=https://n8n-production-dce3.up.railway.app/webhook/lead-intelligence
   ```

### **2. Configurar Credenciais:**

Para cada nó que precisa de credencial:

1. Clique no nó
2. Clique em **"Credential"** ou **"Add Credential"**
3. Escolha o tipo:
   - **PostgreSQL** → Adicionar credenciais do banco
   - **HTTP Header Auth** → Para APIs (DeepSeek, Claude, Resend, etc)
4. Preencher dados
5. Salvar

### **3. Ativar Workflow:**

1. Clique no toggle **"Active"** no topo (deve ficar verde)
2. Workflow fica escutando webhooks

---

## **🧪 TESTAR:**

1. Clique em **"Execute Workflow"** (botão vermelho)
2. Na tela que abrir, clique em **"Add Input Data"**
3. Cole este JSON de teste:

```json
{
  "leadId": "test-123",
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "phone": "+5511999999999",
  "company": "Museu Nacional",
  "formType": "contact_form",
  "projectType": "exhibition",
  "description": "Queremos criar uma exposição imersiva sobre arte contemporânea",
  "ip": "177.34.123.45",
  "userAgent": "Mozilla/5.0",
  "sourceUrl": "https://azmt.com.br",
  "lang": "pt"
}
```

4. Clique em **"Execute Workflow"**
5. Veja se executa sem erros
6. Verifique os logs

---

## **❓ PRECISA DE AJUDA?**

**Me avise:**
- ✅ Se conseguiu importar
- ✅ Se encontrou algum erro
- ✅ Se precisa configurar alguma credencial específica

**Vou te guiar passo a passo!** 🚀
