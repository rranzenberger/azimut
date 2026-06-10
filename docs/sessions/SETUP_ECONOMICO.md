# 💰 SETUP ECONÔMICO - Sem Enriquecimento Externo

## ✅ DECISÃO: Começar sem Proxycurl/Apollo

**Motivo:** Economizar custos iniciais ($49-99/mês)
**Estratégia:** Adicionar enriquecimento depois, quando tiver mais leads

---

## 🔑 APIs NECESSÁRIAS (3 contas)

### 1. SerpAPI (Google Search) - ESSENCIAL
**Link:** https://serpapi.com

**O que faz:**
- Pesquisa Google sobre a empresa do lead
- Encontra informações públicas
- Notícias, site, redes sociais

**Preço:**
- Free: 100 searches/mês
- Starter: $50/mês (5.000 searches)

**Como criar:**
1. Acessar: https://serpapi.com
2. Clicar "Sign Up"
3. Preencher dados
4. Confirmar email
5. Login → Dashboard → API Key
6. **Anotar:** `SERPAPI_KEY=xxxxx`

---

### 2. Resend (Email) - ESSENCIAL
**Link:** https://resend.com

**O que faz:**
- Envio de emails transacionais
- Tracking de abertura/clique
- Templates HTML

**Preço:**
- Free: 3.000 emails/mês
- Pro: $20/mês (50.000 emails)

**Como criar:**
1. Acessar: https://resend.com
2. Verificar se já tem conta
3. Se não: Sign Up
4. API Keys → Create API Key
5. **Anotar:** `RESEND_API_KEY=xxxxx`

---

### 3. Claude API (Anthropic) - ESSENCIAL
**Link:** https://console.anthropic.com

**O que faz:**
- Análise de perfil do lead
- Geração de mensagens personalizadas
- Identificação de gatilhos de conversa

**Preço:**
- Pay-as-you-go
- ~$0.003 por 1K tokens
- Estimativa: $10-30/mês (depende do volume)

**Como criar:**
1. Acessar: https://console.anthropic.com
2. Verificar se já tem conta
3. Se não: Sign Up
4. API Keys → Create Key
5. **Anotar:** `CLAUDE_API_KEY=xxxxx`

---

## 📝 CHECKLIST DE SETUP

### ✅ Passo 1: Criar Contas (10-15 min)
- [ ] SerpAPI: https://serpapi.com
- [ ] Resend: https://resend.com
- [ ] Claude: https://console.anthropic.com

### ✅ Passo 2: Anotar API Keys
```
SERPAPI_KEY=xxxxx
RESEND_API_KEY=xxxxx
CLAUDE_API_KEY=xxxxx
```

### ✅ Passo 3: Deploy n8n
- Escolher: Railway, VPS ou Local
- Seguir: `n8n/docker-compose.yml`
- Adicionar as 3 keys acima

### ✅ Passo 4: Configurar Workflows
- Importar workflows do `docs/n8n-workflows.md`
- Ajustar para usar apenas SerpAPI (sem Proxycurl)
- Testar conexões

---

## 💡 O QUE FUNCIONA SEM ENRIQUECIMENTO EXTERNO

### ✅ Funciona:
1. **Captura de Lead** (formulário, chatbot)
2. **Pesquisa Google** (SerpAPI sobre a empresa)
3. **Análise IA** (Claude analisa dados coletados)
4. **Personalização** (Claude gera mensagem personalizada)
5. **Envio de Email** (Resend)
6. **Tracking** (abertura, clique, resposta)

### ❌ Não funciona (por enquanto):
- Dados detalhados do LinkedIn
- Enriquecimento automático de perfil
- Informações de cargo/empresa do LinkedIn

### 💡 Mas funciona com:
- Dados do formulário (nome, email, empresa)
- Pesquisa Google (SerpAPI encontra informações públicas)
- Análise IA (Claude cria contexto a partir do que tem)

---

## 🎯 FLUXO SIMPLIFICADO

```
[Lead chega] 
    ↓
[Captura dados do formulário]
    ↓
[SerpAPI pesquisa Google sobre empresa]
    ↓
[Claude analisa: formulário + dados Google]
    ↓
[Claude gera mensagem personalizada]
    ↓
[Resend envia email]
    ↓
[Tracking e follow-up]
```

---

## 💰 CUSTOS ESTIMADOS

### Mínimo (Free Tier):
- SerpAPI: Free (100 searches/mês)
- Resend: Free (3.000 emails/mês)
- Claude: ~$5-10/mês (uso baixo)
- **Total: ~$5-10/mês**

### Recomendado (Starter):
- SerpAPI: $50/mês (5.000 searches)
- Resend: Free (3.000 emails)
- Claude: ~$20/mês (uso médio)
- **Total: ~$70/mês**

---

## 🚀 PRÓXIMOS PASSOS

1. **Criar as 3 contas** (SerpAPI, Resend, Claude)
2. **Anotar todas as keys**
3. **Fazer deploy do n8n**
4. **Configurar workflows** (sem Proxycurl)
5. **Testar com lead real**

---

## 📚 DOCUMENTAÇÃO ATUALIZADA

- ✅ `SETUP_ECONOMICO.md` (este arquivo)
- ✅ `ALTERNATIVAS_PROXYCURL.md` (alternativas futuras)
- ⏳ `docs/n8n-workflows.md` (será atualizado sem Proxycurl)

---

**Pronto para começar!** 🎉
