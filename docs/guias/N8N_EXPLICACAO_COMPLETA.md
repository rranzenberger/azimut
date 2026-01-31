# 🎓 N8N - EXPLICAÇÃO COMPLETA

## **📋 O QUE É N8N:**

N8N é uma plataforma visual de automação. Você cria workflows arrastando "caixas" (nós) e conectando com setas.

**Analogia:** É como um diagrama de fluxo, mas que executa ações reais!

---

## **🔧 TIPOS DE NÓS - EXPLICAÇÃO DETALHADA:**

### **1. TRIGGER (Gatilho) - Inicia o Workflow**

**Exemplos:**
- **Webhook:** Recebe dados de fora (backoffice chama URL)
- **Schedule:** Roda em horários específicos (ex: todo dia 10h)
- **Manual:** Você clica para executar

**No nosso caso:**
- **Webhook** recebe lead do backoffice
- Quando backoffice faz POST → Workflow inicia automaticamente

**Como funciona:**
```
Backoffice → POST /webhook/lead-intelligence → N8N recebe → Workflow inicia
```

---

### **2. VALIDADOR - Verifica Condições**

**Exemplos:**
- **IF:** Se condição = TRUE → vai por um caminho, se FALSE → outro
- **Switch:** Múltiplas condições, múltiplas rotas

**No nosso caso:**
- **IF "É Legítimo?"** → Se `classification == "LEGITIMATE"` → Envia email, senão → Para
- **IF "Tem WhatsApp?"** → Se tem telefone → Envia WhatsApp, senão → Pula

**Como funciona:**
```
Dados → IF (condição?) → TRUE → Ação A
                      → FALSE → Ação B
```

**Exemplo prático:**
```
Lead → IF (é legítimo?) → SIM → Enviar email
                      → NÃO → Rejeitar (não envia)
```

---

### **3. BUSCADOR - Busca Dados Externos**

**Exemplos:**
- **HTTP Request:** Chama APIs externas
- **PostgreSQL:** Busca no banco de dados

**No nosso caso:**
- **HTTP Request → ipapi.co:** Busca localização do IP
- **HTTP Request → Hunter.io:** Valida email
- **HTTP Request → Proxycurl:** Busca LinkedIn
- **HTTP Request → SerpAPI:** Busca no Google
- **PostgreSQL:** Busca lead anterior no banco

**Como funciona:**
```
N8N → HTTP Request → API Externa → Retorna dados → N8N recebe
```

**Exemplo prático:**
```
Lead (IP: 177.34.123.45) 
  → HTTP Request → ipapi.co/177.34.123.45/json/
  → Retorna: {city: "São Paulo", country: "BR", vpn: false}
  → N8N recebe dados
```

---

### **4. PROCESSADOR - Transforma Dados**

**Exemplos:**
- **Code (JavaScript):** Executa código customizado
- **Set:** Modifica campos
- **Function:** Transformações simples

**No nosso caso:**
- **Code "Detectar Idioma":** Analisa texto e detecta PT/EN/ES
- **Code "Processar DeepSeek":** Limpa resposta da IA e faz parse do JSON
- **Code "Preparar leadIntelligence":** Junta todos os dados em um JSON

**Como funciona:**
```
Dados → Code (processa) → Dados transformados → Próximo nó
```

**Exemplo prático:**
```
DeepSeek retorna: "{\"classification\":\"LEGITIMATE\"}"
  → Code (remove markdown, faz parse)
  → Retorna: {classification: "LEGITIMATE"}
```

---

### **5. IA (Inteligência Artificial) - Analisa e Gera**

**DeepSeek (Análise):**
- **O que faz:** Analisa dados e classifica
- **Entrada:** Todos os dados coletados (IP, email, LinkedIn, etc)
- **Saída:** Classification, riskScore, persona, interest, etc
- **Como:** HTTP Request → `https://api.deepseek.com/v1/chat/completions`

**Claude (Geração):**
- **O que faz:** Gera textos (emails, small talk)
- **Entrada:** Contexto do lead (local, empresa, interesse)
- **Saída:** Texto personalizado
- **Como:** HTTP Request → `https://api.anthropic.com/v1/messages`

**Como funciona:**
```
Dados coletados → DeepSeek → Análise completa → Classificação
Contexto → Claude → Texto personalizado → Email/Small Talk
```

**Exemplo prático:**
```
DeepSeek recebe:
- IP: São Paulo, não VPN
- Email: válido, não descartável
- LinkedIn: Diretor de Museu
- Descrição: "Queremos exposição imersiva"

DeepSeek analisa e retorna:
{
  classification: "LEGITIMATE",
  riskScore: 15,
  persona: "museum",
  interest: "exhibition",
  temperature: "HOT"
}
```

---

### **6. SALVADOR - Salva no Banco**

**PostgreSQL:**
- **O que faz:** Salva ou busca dados no banco
- **Operações:** SELECT, INSERT, UPDATE, DELETE

**No nosso caso:**
- **SELECT:** Buscar lead anterior
- **UPDATE:** Salvar `leadIntelligence` completo

**Como funciona:**
```
N8N → PostgreSQL → Executa SQL → Retorna resultado
```

**Exemplo prático:**
```
UPDATE "Lead" 
SET "leadIntelligence" = '{"classification":"LEGITIMATE",...}'::jsonb
WHERE id = 'abc123'
```

---

## **🔄 FLUXO COMPLETO EXPLICADO:**

### **FASE 1: RECEBER E IDENTIFICAR**

```
1. Webhook recebe lead
   ↓
2. Switch identifica formulário (contact_form ou vancouver)
   ↓
3. PostgreSQL busca se já existe lead anterior
   ↓
4. Code decide: continuar investigação ou rejeitar?
```

**Por quê:** Queremos saber se é lead novo ou follow-up, e se já foi classificado como scam antes.

---

### **FASE 2: VALIDAR E BUSCAR (Paralelo)**

```
5. HTTP Request → ipapi.co (validar IP)
   ↓
6. HTTP Request → AbuseIPDB (verificar blacklist)
   ↓
7. HTTP Request → Hunter.io (validar email) [opcional]
   ↓
8. HTTP Request → Proxycurl (buscar LinkedIn) [opcional]
   ↓
9. HTTP Request → SerpAPI (Google Search) [opcional]
```

**Por quê:** Coletamos o máximo de informações possível para a IA analisar. Algumas APIs são opcionais (se não tiver, pode pular).

**Paralelo:** Algumas buscas podem rodar ao mesmo tempo (mais rápido).

---

### **FASE 3: ANALISAR COM IA**

```
10. Code detecta idioma (PT/EN/ES)
    ↓
11. HTTP Request → DeepSeek (analisa TUDO)
    ↓
12. Code processa resposta DeepSeek
    ↓
13. IF: É legítimo?
    SIM → Continua
    NÃO → Para (não envia email)
```

**Por quê:** DeepSeek é o "cérebro" - analisa todos os dados coletados e decide se é lead legítimo, scam, competidor, etc.

---

### **FASE 4: GERAR E ENVIAR (Se Legítimo)**

```
14. HTTP Request → Claude (gera small talk)
    ↓
15. Code processa small talk
    ↓
16. HTTP Request → Claude (gera email completo)
    ↓
17. Code processa email
    ↓
18. HTTP Request → Resend (envia email)
    ↓
19. IF: Tem WhatsApp?
    SIM → Envia WhatsApp [opcional]
    NÃO → Pula
```

**Por quê:** Se DeepSeek classificou como LEGITIMATE, geramos email personalizado e enviamos. Se tiver WhatsApp, também enviamos mensagem.

---

### **FASE 5: SALVAR TUDO**

```
20. Code prepara JSON completo (leadIntelligence)
    ↓
21. PostgreSQL salva no banco
    ↓
22. Responder Webhook (sucesso)
```

**Por quê:** Salvamos TODOS os dados coletados no campo `leadIntelligence` para consultar depois.

---

## **🎯 COMO OS DADOS FLUEM:**

### **Exemplo Real:**

**Lead preenche formulário:**
```json
{
  "name": "Maria Silva",
  "email": "maria@museunacional.br",
  "phone": "+5521999999999",
  "company": "Museu Nacional",
  "formType": "contact_form",
  "ip": "177.34.123.45"
}
```

**N8N processa:**

1. **Webhook recebe** → Dados ficam em `{{$json}}`
2. **Validar IP** → `{{$('Validar IP').json}}` = `{city: "São Paulo", vpn: false}`
3. **Validar Email** → `{{$('Validar Email').json}}` = `{valid: true, disposable: false}`
4. **DeepSeek analisa** → Recebe TODOS os dados acima
5. **DeepSeek retorna** → `{classification: "LEGITIMATE", persona: "museum"}`
6. **Claude gera email** → Recebe análise + contexto
7. **Claude retorna** → `{subject: "...", body: "..."}`
8. **Resend envia** → Email chega na caixa de entrada
9. **PostgreSQL salva** → Tudo fica no campo `leadIntelligence`

---

## **💡 CONCEITOS IMPORTANTES:**

### **1. Expressões N8N:**

**`{{$json}}`** = Dados do nó atual  
**`{{$('Nome do Nó').json}}`** = Dados de outro nó  
**`{{$env.VARIAVEL}}`** = Variável de ambiente

**Exemplo:**
```
{{$json.email}} = email do lead atual
{{$('Validar IP').json.city}} = cidade do IP validado
{{$env.DEEPSEEK_API_KEY}} = API key do DeepSeek
```

---

### **2. Continue On Fail:**

Algumas APIs podem falhar (ex: LinkedIn não encontrado).  
Marcar **"Continue On Fail"** faz o workflow continuar mesmo se falhar.

**Usar em:**
- Buscar LinkedIn (pode não ter)
- Google Search (pode não encontrar)
- APIs opcionais

---

### **3. Paralelo vs Sequencial:**

**Sequencial:**
```
Nó 1 → Nó 2 → Nó 3
```
Um depois do outro (mais lento, mas ordenado)

**Paralelo:**
```
Nó 1 → Nó 2 (paralelo)
     → Nó 3 (paralelo)
```
Ao mesmo tempo (mais rápido)

**No nosso caso:**
- Validar IP e Validar Email podem rodar em paralelo
- Depois se juntam no Google Search

---

## **📊 RESUMO VISUAL:**

```
┌─────────────┐
│  TRIGGER    │ ← Inicia workflow
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ VALIDADOR   │ ← Verifica condições
└──────┬──────┘
       │
       ├─── TRUE ──┐
       │           │
       └─── FALSE ─┘
                   │
                   ▼
┌─────────────┐
│ BUSCADOR    │ ← Busca dados externos
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ PROCESSADOR │ ← Transforma dados
└──────┬──────┘
       │
       ▼
┌─────────────┐
│     IA      │ ← Analisa/Gera
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  SALVADOR   │ ← Salva no banco
└─────────────┘
```

---

## **🎯 PRÓXIMO PASSO:**

Agora você entende como funciona! 

**Vamos criar o workflow no N8N seguindo o guia `COMO_IMPORTAR_WORKFLOW_N8N.md`**

**Me avisa quando estiver no N8N que eu te guio nó por nó!** 🚀
