# 🤖 WORKFLOW AUTOMÁTICO COMPLETO - ENVIO AUTOMÁTICO

## ✅ O QUE FOI CRIADO:

### **Workflow n8n com Envio Automático**

**Arquivo:** `n8n-workflow-enriquecimento-completo-auto.json`

**Fluxo:**
1. **Webhook** → Recebe lead
2. **Set** → Organiza dados
3. **SerpAPI** → Busca informações
4. **Processar SerpAPI** → Extrai LinkedIn/Instagram
5. **Claude AI** → Analisa perfil completo
6. **Processar Claude** → Extrai dados
7. **PostgreSQL** → Salva no banco
8. **IF: Lead Quente?** → Se score >= 70, continua
9. **Claude: Gerar Mensagem** → Gera mensagem SUPER PESSOAL
10. **Processar Mensagem** → Prepara envio
11. **IF: Email?** → Decide canal
12. **Resend: Enviar Email** → OU **WhatsApp Link** → Envia

---

## 🎯 CARACTERÍSTICAS:

### **1. Análise Completa**
- Busca LinkedIn e Instagram
- Analisa projetos
- Identifica interesses (futebol, aventura, etc.)
- Gera small talk personalizado

### **2. Mensagem Super Pessoal**
- "Vi seu Instagram, que massa! Amei..."
- "Vi que você trabalhou em [projeto], que incrível!"
- "Vi que você gosta de [interesse], eu também!"
- "Acho que podemos fazer algo incrível juntos"
- "Seria massa trabalharmos juntos"

### **3. Envio Automático**
- **Se score >= 70 (Quente):** Envia automaticamente
- **Email:** Via Resend
- **WhatsApp:** Gera link (ou pode integrar API)

---

## 📋 COMO IMPORTAR:

### **1. No n8n:**

1. Acesse: `https://n8n-production-dce3.up.railway.app`
2. Vá em **Workflows**
3. Clique em **"Add workflow"**
4. Clique nos **3 pontinhos (⋮)**
5. Selecione **"Import from File"**
6. Escolha: `n8n-workflow-enriquecimento-completo-auto.json`
7. **Configure credenciais:**
   - SerpAPI ✅
   - Claude ✅
   - PostgreSQL ✅
   - Resend (nova!)

### **2. Configurar Resend:**

1. No node **"Resend: Enviar Email"**
2. Clique em **"Credential"**
3. Crie nova credencial tipo **"Header Auth"**
4. **Header Name:** `Authorization`
5. **Header Value:** `Bearer SUA_RESEND_API_KEY`
6. **Salve**

### **3. Ativar Workflow:**

1. Clique no **toggle "Active"** (canto superior direito)
2. ✅ Workflow está rodando!

---

## 🚀 COMO FUNCIONA:

### **Fluxo Automático:**

1. **Lead entra** → Webhook recebe
2. **Enriquece** → SerpAPI + Claude analisam
3. **Salva** → PostgreSQL armazena
4. **Avalia** → Se score >= 70 (Quente)
5. **Gera mensagem** → Claude cria mensagem pessoal
6. **Envia** → Email ou WhatsApp automaticamente

### **Mensagem Gerada:**

**Exemplo para Email:**
```
Assunto: Olá [Nome] - Vi seu trabalho incrível!

Oi [Nome],

Vi seu Instagram, que massa! Amei o projeto [projeto específico] que você fez. 

Vi que você trabalhou em [projeto], que incrível! Seu trabalho em [área] é exatamente o tipo de coisa que admiramos.

Somos a Azimut, especialistas em VR/AR e cinema interativo, atuando entre Brasil e Canadá desde 1996.

Acho que podemos fazer algo incrível juntos! Que tal conversarmos sobre uma parceria?

Seria massa trabalharmos juntos em projetos de realidade virtual ou cinema interativo.

Abraços,
Equipe Azimut
```

**Exemplo para WhatsApp:**
```
Oi [Nome]! 👋

Vi seu Instagram, que massa! Amei o projeto [projeto] que você fez.

Somos a Azimut, especialistas em VR/AR. Acho que podemos fazer algo incrível juntos!

Que tal conversarmos? Seria massa trabalharmos juntos! 🚀
```

---

## ⚙️ CONFIGURAÇÕES:

### **Variáveis de Ambiente (Railway):**

- ✅ `SERPAPI_KEY` (já configurada)
- ✅ `CLAUDE_API_KEY` (já configurada)
- ✅ `RESEND_API_KEY` (precisa adicionar!)
- ✅ `DATABASE_URL` (já configurada)

### **Adicionar RESEND_API_KEY:**

1. Acesse Railway: https://railway.app
2. Vá no projeto n8n
3. **Variables** → **New Variable**
4. **Name:** `RESEND_API_KEY`
5. **Value:** Sua chave Resend
6. **Save**

---

## 🎯 PERSONALIZAÇÃO:

### **Small Talk Incluído:**

- ✅ "Vi seu Instagram, que massa! Amei..."
- ✅ "Vi que você trabalhou em [projeto]..."
- ✅ "Vi que você gosta de [interesse]..."
- ✅ "Que incrível seu trabalho em [área]..."

### **Tom Natural:**

- ✅ Como se fosse um amigo
- ✅ Não robótico
- ✅ Caloroso e convidativo
- ✅ Foco em parceria/trabalhar juntos

---

## ✅ CHECKLIST:

- [ ] Workflow importado
- [ ] Credencial Resend configurada
- [ ] `RESEND_API_KEY` adicionada no Railway
- [ ] Workflow ativado
- [ ] Teste com lead real
- [ ] Verificar envio automático

---

## 🧪 TESTAR:

### **1. Teste Manual:**

1. No n8n, clique em **"Execute Workflow"**
2. Envie dados de teste:
```json
{
  "id": "test-123",
  "email": "teste@exemplo.com",
  "name": "João Silva",
  "company": "Produtora X",
  "phone": "+5511999999999",
  "lang": "pt"
}
```

3. Veja o fluxo completo
4. Verifique se email foi enviado (se score >= 70)

### **2. Teste Real:**

1. Crie um lead no site
2. Workflow enriquece automaticamente
3. Se for quente, envia mensagem automaticamente
4. Verifique email/WhatsApp recebido

---

**Workflow completo com envio automático pronto!** 🚀
