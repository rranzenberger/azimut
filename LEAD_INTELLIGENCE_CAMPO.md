# 🕵️ Campo `leadIntelligence` - Documentação

## **🎯 Objetivo**

O campo `leadIntelligence` (JSON) armazena **TODA** a investigação sobre um lead, permitindo que você saiba **com quem está falando** em qualquer momento, mesmo em trocas de email posteriores.

---

## **📊 O que é armazenado**

### **1. CLASSIFICAÇÃO** 
```json
{
  "classification": "LEGIT" | "SUSPECT" | "SCAM" | "COMPETITOR" | "FISHING" | "TESTING",
  "riskScore": 0-100,
  "qualityScore": 0-100,
  "status": "SEND" | "CAUTION" | "MANUAL_REVIEW" | "BLOCKED"
}
```

**Exemplo real:**
- `LEGIT` = Cliente legítimo, empresa verificada
- `SUSPECT` = Suspeito (VPN + email genérico)
- `SCAM` = Golpista detectado (email descartável + bot)
- `COMPETITOR` = Concorrente disfarçado
- `FISHING` = Tentando extrair informações
- `TESTING` = Testando o sistema/preços

---

### **2. DADOS REAIS DESCOBERTOS**
```json
{
  "realData": {
    "realCity": "São Paulo",
    "realCountry": "Brazil",
    "realIP": "177.34.123.45",
    "ipType": "residential" | "vpn" | "proxy" | "hosting" | "tor",
    "emailValid": true,
    "emailType": "corporate" | "personal" | "disposable" | "role",
    "phoneValid": true,
    "phoneCountry": "BR"
  }
}
```

**Casos de uso:**
- Lead disse "Rio", mas IP é de "São Paulo" → Suspeito
- Email corporativo verificado → Legítimo
- IP via VPN + email descartável → Scam

---

### **3. VERIFICAÇÕES**
```json
{
  "verifications": {
    "email": {
      "provider": "Hunter.io",
      "result": "deliverable",
      "score": 95,
      "disposable": false,
      "verifiedAt": "2026-01-20T12:00:00Z"
    },
    "ip": {
      "provider": "ipapi.co",
      "proxy": false,
      "hosting": false,
      "threatLevel": "low",
      "abuseScore": 0
    },
    "phone": {
      "provider": "Twilio",
      "valid": true,
      "carrier": "Vivo",
      "type": "mobile"
    },
    "blacklist": {
      "emailBlacklisted": false,
      "ipBlacklisted": false
    }
  }
}
```

---

### **4. COMPORTAMENTO NO SITE**
```json
{
  "behavior": {
    "timeOnSite": 300000,
    "pagesVisited": ["/", "/work", "/contact"],
    "formFillTime": 120000,
    "copyPasteCount": 0,
    "mouseMovements": 450,
    "suspiciousActivity": false
  }
}
```

**Red flags:**
- `formFillTime < 5s` → Bot
- `mouseMovements < 10` → Bot
- `timeOnSite < 15s` → Suspeito

---

### **5. ENRIQUECIMENTO**
```json
{
  "enrichment": {
    "linkedin": {
      "found": true,
      "profileUrl": "linkedin.com/in/maria-santos",
      "headline": "Coordenadora de Projetos",
      "company": "Museu do Amanhã",
      "connections": 500,
      "verified": true
    },
    "company": {
      "name": "Museu do Amanhã",
      "domain": "museudoamanha.org.br",
      "employees": 120,
      "revenue": "$5M-$10M",
      "founded": 2015,
      "verified": true
    }
  }
}
```

---

### **6. FLAGS E ALERTAS**
```json
{
  "flags": [
    "🟢 Email corporativo verificado",
    "🟢 LinkedIn com 500+ conexões",
    "🟢 Empresa estabelecida (2015)"
  ],
  "alerts": [
    "⚠️ Lead precisa revisão manual"
  ]
}
```

---

### **7. CORRESPONDÊNCIAS**
```json
{
  "matches": {
    "cityMatch": true,       // Cidade informada = cidade do IP
    "phoneCountryMatch": true, // País do telefone = país do IP
    "emailDomainMatch": true, // Domínio do email = empresa informada
    "timezoneMatch": true     // Timezone do navegador = timezone do IP
  }
}
```

---

### **8. HISTÓRICO DE INVESTIGAÇÃO**
```json
{
  "investigationHistory": [
    {
      "timestamp": "2026-01-20T12:00:00Z",
      "action": "INITIAL_SCREENING",
      "result": "PASSED",
      "details": "Todas as verificações iniciais passaram"
    },
    {
      "timestamp": "2026-01-20T12:05:00Z",
      "action": "ENRICHMENT",
      "result": "SUCCESS",
      "details": "Dados enriquecidos via LinkedIn e Clearbit"
    },
    {
      "timestamp": "2026-01-20T14:30:00Z",
      "action": "MANUAL_REVIEW",
      "result": "PASSED",
      "details": "Revisado por João Silva - Lead parece legítimo"
    },
    {
      "timestamp": "2026-01-20T14:35:00Z",
      "action": "EMAIL_SENT",
      "result": "SUCCESS",
      "details": "Email personalizado enviado com sucesso"
    }
  ]
}
```

---

### **9. DECISÃO FINAL**
```json
{
  "decision": {
    "classification": "LEGIT",
    "action": "SEND",
    "confidence": 95,
    "decidedBy": "n8n_workflow",
    "decidedAt": "2026-01-20T12:05:00Z",
    "humanReviewed": false
  }
}
```

---

### **10. NOTAS INTERNAS**
```json
{
  "internalNotes": [
    "Cliente parece legítimo, empresa verificada no Google e LinkedIn",
    "LinkedIn condiz com informações fornecidas",
    "Revisar orçamento antes de enviar proposta"
  ]
}
```

---

## **🎯 Casos de Uso Práticos**

### **Caso 1: Troca de emails posterior**

**Situação:** Lead responde seu email 3 dias depois.

**Ação:** Antes de responder, consulte `leadIntelligence`:

```sql
SELECT leadIntelligence 
FROM "Lead" 
WHERE email = 'maria@museudoamanha.org.br';
```

**Resultado:**
```json
{
  "classification": "LEGIT",
  "riskScore": 5,
  "qualityScore": 95,
  "realData": {
    "realCity": "Rio de Janeiro",
    "emailValid": true,
    "emailType": "corporate"
  },
  "enrichment": {
    "company": {
      "name": "Museu do Amanhã",
      "employees": 120
    }
  }
}
```

**Decisão:** Responder com confiança, propor reunião presencial.

---

### **Caso 2: Lead pedindo orçamento urgente**

**Situação:** Lead envia 3 emails pedindo orçamento "URGENTE".

**Ação:** Consultar `leadIntelligence`:

```sql
SELECT leadIntelligence->'flags' as flags,
       leadIntelligence->>'riskScore' as risk
FROM "Lead" 
WHERE email = 'joao@temp-mail.com';
```

**Resultado:**
```json
{
  "flags": [
    "🔴 Email descartável detectado",
    "🔴 Formulário preenchido em 3s (bot)",
    "🔴 Fingerprint usado 5x"
  ],
  "riskScore": 85
}
```

**Decisão:** Não responder, marcar como spam.

---

### **Caso 3: Concorrente disfarçado**

**Situação:** Lead pergunta sobre seus processos e preços.

**Ação:** Consultar `leadIntelligence`:

```sql
SELECT leadIntelligence->>'classification' as classification,
       leadIntelligence->'realData'->>'emailType' as emailType
FROM "Lead" 
WHERE email = 'info@studioazul.com.br';
```

**Resultado:**
```json
{
  "classification": "COMPETITOR",
  "emailType": "corporate",
  "realData": {
    "emailDomain": "studioazul.com.br"
  },
  "flags": [
    "⚔️ ALERTA: Concorrente identificado!"
  ]
}
```

**Decisão:** Enviar resposta genérica, não revelar detalhes.

---

## **📊 Queries Úteis**

### **Ver todos os leads suspeitos:**
```sql
SELECT id, name, email, 
       leadIntelligence->>'classification' as classification,
       leadIntelligence->>'riskScore' as risk
FROM "Lead" 
WHERE leadIntelligence->>'classification' IN ('SUSPECT', 'SCAM', 'COMPETITOR')
ORDER BY CAST(leadIntelligence->>'riskScore' AS INTEGER) DESC;
```

### **Leads que precisam revisão manual:**
```sql
SELECT * FROM "Lead" 
WHERE leadIntelligence->>'status' = 'MANUAL_REVIEW'
  AND (leadIntelligence->'decision'->>'humanReviewed')::boolean = false;
```

### **Leads bloqueados:**
```sql
SELECT id, name, email, 
       leadIntelligence->'flags' as flags
FROM "Lead" 
WHERE leadIntelligence->>'status' = 'BLOCKED';
```

### **Leads com flags vermelhos:**
```sql
SELECT * FROM "Lead" 
WHERE leadIntelligence->'flags' @> '["🔴"]';
```

### **Leads por país real (IP):**
```sql
SELECT leadIntelligence->'realData'->>'realCountry' as country, 
       COUNT(*) as total
FROM "Lead" 
WHERE leadIntelligence IS NOT NULL
GROUP BY country
ORDER BY total DESC;
```

---

## **🔧 Como N8N preenche este campo**

O workflow N8N (depois de todas as 5 camadas de análise) faz:

```typescript
// No final do workflow N8N
await prisma.lead.update({
  where: { id: leadId },
  data: {
    leadIntelligence: {
      classification: 'LEGIT',
      riskScore: 5,
      qualityScore: 95,
      status: 'SEND',
      realData: {
        realCity: 'São Paulo',
        realCountry: 'Brazil',
        realIP: '177.34.123.45',
        ipType: 'residential',
        emailValid: true,
        emailType: 'corporate'
      },
      verifications: { /* ... */ },
      behavior: { /* ... */ },
      enrichment: { /* ... */ },
      flags: ['🟢 Email verificado', '🟢 LinkedIn OK'],
      alerts: [],
      matches: { /* ... */ },
      investigationHistory: [ /* ... */ ],
      decision: {
        classification: 'LEGIT',
        action: 'SEND',
        confidence: 95,
        decidedBy: 'n8n_workflow',
        decidedAt: new Date().toISOString(),
        humanReviewed: false
      },
      internalNotes: []
    }
  }
});
```

---

## **👁️ Como humanos atualizam este campo**

### **No backoffice:**

```typescript
// Adicionar nota interna
const lead = await prisma.lead.findUnique({ where: { id } });
const intelligence = lead.leadIntelligence as LeadIntelligence;

intelligence.internalNotes.push('Cliente ligou, projeto confirmado');
intelligence.investigationHistory.push({
  timestamp: new Date().toISOString(),
  action: 'MANUAL_REVIEW',
  result: 'PASSED',
  details: 'Revisado por João - Lead legítimo'
});
intelligence.decision.humanReviewed = true;
intelligence.decision.reviewedBy = 'João Silva';

await prisma.lead.update({
  where: { id },
  data: { leadIntelligence: intelligence }
});
```

---

## **🎯 Benefícios**

✅ **Sempre sabe com quem está falando** (legítimo, suspeito, scam)
✅ **Evita golpes** (detecta VPN, bots, emails falsos)
✅ **Prioriza leads** (riskScore + qualityScore)
✅ **Rastreia histórico** (todas as investigações e ações)
✅ **Facilita revisão** (time vê flags e alertas)
✅ **Correspondência de dados** (cidade informada = IP?)
✅ **Notas internas** (humanos deixam observações)

---

## **📈 Próximos passos:**

1. Rodar migration SQL para criar o campo
2. N8N workflow popula automaticamente
3. Backoffice exibe o campo (UI amigável)
4. Time pode adicionar notas internas
5. Emails futuros consideram a classificação
