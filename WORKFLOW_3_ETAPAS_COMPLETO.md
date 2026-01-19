# 🎯 WORKFLOW 3 ETAPAS: Captação → Avaliação → Envio

## ✅ FLUXO COMPLETO:

### **ETAPA 1: CAPTAR** 📥
- **SerpAPI** busca informações (Google)
- Extrai LinkedIn, Instagram, projetos
- Coleta dados básicos do lead

### **ETAPA 2: AVALIAR/MONITORAR** 🔍 (Primeira Chamada IA)
- **Claude AI** faz análise profunda
- Avalia perfil completo
- Calcula scoring (0-100)
- Classifica temperatura (Frio/Morno/Quente)
- Identifica interesses, projetos, redes sociais
- Recomenda abordagem e canal

### **ETAPA 3: ENVIAR** 📧 (Segunda Chamada IA)
- **Baseado na avaliação**, Claude gera mensagem personalizada
- Usa todos os dados da avaliação
- Mensagem super pessoal e amigável
- Envia automaticamente (se score >= 70)

---

## 🔄 SEQUÊNCIA:

```
Webhook → Set → SerpAPI → Processar Captação
    ↓
ETAPA 2: Claude Avalia/Monitora
    ↓
Salvar Avaliação no Banco
    ↓
IF: Lead Quente? (score >= 70)
    ↓ SIM
ETAPA 3: Claude Gera Mensagem (baseado na avaliação)
    ↓
Processar Mensagem
    ↓
IF: Email ou WhatsApp?
    ↓
Enviar (Resend ou WhatsApp)
```

---

## 🎯 DIFERENÇAS DO WORKFLOW ANTERIOR:

### **Antes:**
- 1 chamada IA (análise + geração de mensagem junto)

### **Agora:**
- **2 chamadas IA separadas:**
  1. **Primeira:** Avaliar/Monitorar (análise profunda)
  2. **Segunda:** Gerar mensagem (baseado na avaliação)

### **Vantagens:**
- ✅ Avaliação mais profunda e detalhada
- ✅ Mensagem mais precisa (usa dados da avaliação)
- ✅ Melhor separação de responsabilidades
- ✅ Mais fácil de monitorar e ajustar

---

## 📋 DETALHES DAS ETAPAS:

### **ETAPA 1: Captar**

**O que faz:**
- Busca no Google via SerpAPI
- Extrai LinkedIn, Instagram
- Coleta dados básicos

**Output:**
- LinkedIn URL
- Instagram URL
- Resultados da busca
- Cidade detectada

---

### **ETAPA 2: Avaliar/Monitorar (Primeira IA)**

**O que faz:**
- Analisa perfil completo
- Calcula scoring detalhado
- Identifica interesses e projetos
- Analisa redes sociais
- Recomenda abordagem

**Output:**
```json
{
  "evaluation": {
    "role": "Produtor Audiovisual",
    "decisionPower": "Alto",
    "partnershipPotential": "Alto",
    "communicationTone": "Casual",
    "bestChannel": "email",
    "bestTime": "manhã"
  },
  "interests": {
    "sports": "Futebol",
    "hobbies": "Aventura",
    "origin": "São Paulo"
  },
  "projects": [...],
  "socialMedia": {
    "linkedinInsights": "...",
    "instagramInsights": "..."
  },
  "leadScore": 85,
  "leadTemperature": "hot",
  "smallTalk": [
    "Vi seu Instagram, que massa!",
    "Vi que você trabalhou em [projeto]"
  ],
  "recommendedApproach": "..."
}
```

---

### **ETAPA 3: Gerar Mensagem (Segunda IA)**

**O que faz:**
- **USA TODOS OS DADOS DA AVALIAÇÃO**
- Gera mensagem super pessoal
- Baseado em:
  - Small talk da avaliação
  - Projetos encontrados
  - Interesses identificados
  - Tom recomendado
  - Canal recomendado

**Output:**
```json
{
  "channel": "email",
  "subject": "Olá [Nome] - Vi seu trabalho incrível!",
  "message": "Mensagem super pessoal baseada na avaliação..."
}
```

---

## 🚀 COMO IMPORTAR:

1. **No n8n:**
   - Vá em **Workflows**
   - **Add workflow** → **Import from File**
   - Escolha: `n8n-workflow-captacao-avaliacao-envio.json`

2. **Configurar credenciais:**
   - SerpAPI ✅
   - Claude ✅
   - PostgreSQL ✅
   - Resend (nova!)

3. **Ativar workflow:**
   - Toggle **"Active"** ligado

---

## 📊 EXEMPLO DE FLUXO:

### **Lead Entra:**
```json
{
  "id": "lead-123",
  "email": "joao@exemplo.com",
  "name": "João Silva",
  "company": "Produtora X"
}
```

### **ETAPA 1: Capta**
- Encontra LinkedIn: `linkedin.com/in/joao-silva`
- Encontra Instagram: `instagram.com/joaosilva`
- Encontra projetos no portfólio

### **ETAPA 2: Avalia (Primeira IA)**
- Score: 85 (Quente)
- Interesses: Futebol, Aventura
- Projetos: 3 projetos relevantes
- Recomendação: Email, Tom Casual

### **ETAPA 3: Gera Mensagem (Segunda IA)**
- Usa small talk: "Vi seu Instagram, que massa!"
- Menciona projeto específico
- Tom casual e amigável
- Foco em parceria

### **Envia:**
- Email enviado automaticamente via Resend

---

## ✅ CHECKLIST:

- [ ] Workflow importado
- [ ] Credenciais configuradas
- [ ] Resend configurado
- [ ] Workflow ativado
- [ ] Teste executado
- [ ] Verificar 2 chamadas IA (avaliação + mensagem)

---

**Workflow completo com 3 etapas claras!** 🚀
