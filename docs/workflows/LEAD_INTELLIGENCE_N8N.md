# 🕵️ Lead Intelligence & Qualificação com N8N

## **🎯 Objetivo**

Investigar TODOS os leads ANTES de enviar email, identificando:
- ✅ Leads legítimos (enviar email personalizado)
- ⚠️ Leads suspeitos (enviar email genérico + monitorar)
- ❌ Leads falsos (NÃO enviar + marcar como spam)

---

## **🔍 O que o workflow faz:**

### **1️⃣ Validar IP (Geolocalização)**
**API:** `ipapi.co` (gratuita, 1k requests/dia)

**Verifica:**
- 🌍 Localização real (cidade, país)
- 🚨 IP via proxy/VPN/hosting
- ⛔ IP em listas de ameaças
- ⚠️ Cidade informada ≠ cidade real

**Exemplo:**
```json
{
  "ip": "177.34.123.45",
  "city": "São Paulo",
  "country": "Brazil",
  "proxy": false,
  "hosting": false,
  "threat_level": "low"
}
```

---

### **2️⃣ Validar Email (Hunter.io)**
**API:** Hunter.io ($49/mês = 1k buscas/mês)

**Verifica:**
- ✅ Email válido (existe?)
- 🗑️ Email descartável (temp mail)
- 📧 Email genérico (info@, contato@)
- 🏢 Email corporativo vs. pessoal

**Exemplo:**
```json
{
  "result": "deliverable",
  "score": 95,
  "disposable": false,
  "free": false,
  "role": false
}
```

---

### **3️⃣ Google Search (Nome + Empresa)**
**API:** Google Custom Search ($5/1k buscas)

**Busca:**
- 📰 Notícias sobre a pessoa/empresa
- 🔗 Website oficial
- 🏆 Prêmios, projetos anteriores

**Red flag:** Nenhum resultado = pessoa/empresa não existe?

---

### **4️⃣ LinkedIn Search (Proxycurl)**
**API:** Proxycurl ($0.01/busca)

**Verifica:**
- 👤 Perfil existe?
- 🆕 Perfil criado recentemente?
- 📉 Poucas conexões (<10)?
- 💼 Cargo condiz com interesse?
- 🏢 Empresa condiz?

**Exemplo:**
```json
{
  "public_identifier": "joao-silva-ceo",
  "headline": "CEO at Museu XYZ",
  "company": "Museu XYZ",
  "connections": 500,
  "profile_created_recently": false
}
```

---

### **5️⃣ Enriquecer Empresa (Clearbit)**
**API:** Clearbit ($99/mês = 2.5k buscas/mês)

**Busca pelo domínio do email:**
- 🏢 Nome oficial da empresa
- 👥 Número de funcionários
- 💰 Receita estimada
- 🌐 Website oficial
- 📍 Endereço físico

**Exemplo:**
```json
{
  "name": "Museu de Arte Moderna",
  "domain": "mam.org.br",
  "metrics": {
    "employees": 120,
    "estimatedAnnualRevenue": "$5M-$10M"
  }
}
```

---

### **6️⃣ Análise de Risco (IA)**

**Sistema de pontuação:**

| Situação | Risco | Qualidade | Decisão |
|----------|-------|-----------|---------|
| Email inválido | +100 | -50 | ❌ REJECT |
| IP via VPN | +30 | -10 | ⚠️ CAUTION |
| Email descartável | +60 | -30 | ⚠️ CAUTION |
| Concorrente detectado | +80 | -100 | ❌ REJECT |
| Sem LinkedIn | +20 | -20 | ⚠️ CAUTION |
| Perfil LinkedIn novo | +15 | -10 | ⚠️ CAUTION |
| Sem resultados Google | +25 | -30 | ⚠️ CAUTION |
| Cidade informada ≠ real | +20 | -15 | ⚠️ CAUTION |
| Tempo no site <30s | +10 | -5 | - |

---

## **🎯 Decisões do workflow:**

### **❌ REJECT (RiskScore ≥ 80)**
```
Ações:
1. NÃO enviar email
2. Marcar lead como SPAM no banco
3. Notificar time interno
```

**Exemplos:**
- Email inválido/inexistente
- Concorrente detectado
- IP em lista de ameaças + email descartável

---

### **⚠️ CAUTION (RiskScore 40-79)**
```
Ações:
1. Enviar email GENÉRICO (sem personalização)
2. Notificar time para monitorar
3. Adicionar nota "Lead suspeito" no backoffice
```

**Exemplos:**
- Email descartável
- Sem presença no Google/LinkedIn
- IP via VPN + sem dados da empresa

---

### **✅ SEND (RiskScore < 40)**
```
Ações:
1. Enviar email PERSONALIZADO (com dados enriquecidos)
2. Email interno com contexto completo
3. Adicionar dados enriquecidos no backoffice
```

**Email personalizado usa:**
- 🌍 Cidade real (do IP)
- 💼 Cargo real (do LinkedIn)
- 🏢 Porte da empresa (do Clearbit)
- 🎯 Projetos similares encontrados (do Google)

---

## **📊 Exemplo de análise completa:**

### **Lead recebido:**
```json
{
  "name": "João Silva",
  "email": "joao.silva@museu-abc.com.br",
  "company": "Museu ABC",
  "city": "São Paulo",
  "interest": "Tour virtual 360°",
  "budget": "R$ 100-200k"
}
```

### **Resultado da análise:**
```
✅ LEAD LEGÍTIMO - ENVIAR EMAIL PERSONALIZADO

Risk Score: 5/100
Quality Score: 95/100

Dados enriquecidos:
🌍 Localização real: São Paulo, Brasil (IP condiz ✓)
✅ Email válido: joao.silva@museu-abc.com.br (corporativo)
👤 LinkedIn: João Silva - Diretor de Projetos Culturais
🏢 Empresa: Museu ABC (50-100 funcionários, $1M-$5M)
🔍 Google: 15 resultados (projetos anteriores, prêmios)

Insights para email:
- Mencionar projeto do Museu Olímpico (similar ao interesse)
- Tom profissional (empresa estabelecida)
- Propor reunião presencial (mesmo estado)
```

---

## **🔧 APIs necessárias:**

### **Gratuitas:**
1. **ipapi.co** - Geolocalização (1k/dia grátis)
   - Signup: https://ipapi.co/

### **Pagas (mas essenciais):**
2. **Hunter.io** - Validação de email ($49/mês)
   - https://hunter.io/pricing

3. **Proxycurl** - LinkedIn ($29/mês = 3k buscas)
   - https://nubela.co/proxycurl/pricing

4. **Clearbit** - Enriquecimento ($99/mês)
   - https://clearbit.com/pricing

5. **Google Custom Search** ($5/1k buscas)
   - https://developers.google.com/custom-search

**Custo total:** ~$182/mês (para 1k-3k leads/mês)

---

## **🚀 Como implementar:**

### **1. Importar workflow no N8N:**
```bash
# Copiar arquivo para pasta do N8N
cp n8n/lead-intelligence-workflow.json ~/n8n/workflows/

# Ou importar pela UI:
N8N → Import → Selecionar arquivo
```

### **2. Configurar credenciais:**
No N8N, adicionar:
- `hunterApiKey` (Hunter.io)
- `proxycurlAuth` (Proxycurl)
- `clearbitAuth` (Clearbit)
- `googleApiKey` + `googleSearchEngineId`

### **3. Adicionar lista de concorrentes:**
Editar o código do nó "6️⃣ Análise de Risco":

```javascript
const competitorDomains = [
  'studioazul.com.br',
  'outraproducao.com',
  'seuconorrente.com'
  // Adicionar todos os concorrentes conhecidos
];
```

### **4. Conectar ao backoffice:**
Criar endpoint para receber webhook do N8N:

```typescript
// azimut-cms/app/api/leads/route.ts

// Trocar fetch direto para /api/notify-form por webhook N8N:
const N8N_WEBHOOK_URL = process.env.N8N_LEAD_INTELLIGENCE_WEBHOOK;

fetch(N8N_WEBHOOK_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id: lead.id,
    name: data.name,
    email: data.email,
    ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip'),
    // ... outros dados
  })
});
```

---

## **📈 Resultados esperados:**

Com esse sistema, você vai:

✅ **Eliminar 90% dos leads falsos** (spam, concorrentes, curiosos)
✅ **Priorizar leads quentes** (decisores reais, empresas legítimas)
✅ **Personalizar emails com contexto real** (cargo, empresa, projetos anteriores)
✅ **Economizar tempo do time** (não perseguir leads ruins)
✅ **Aumentar taxa de conversão** (emails mais relevantes)

---

## **🎯 Próximos passos:**

1. Criar contas nas APIs (Hunter, Proxycurl, Clearbit)
2. Importar workflow no N8N
3. Configurar credenciais
4. Testar com lead de exemplo
5. Conectar ao backoffice
6. Monitorar primeiros 50 leads

Quer que eu ajude a configurar as APIs ou ajustar o workflow?
