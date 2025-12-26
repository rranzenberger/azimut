# 🚀 DeepSeek - Setup Completo

## Por que DeepSeek?

✅ **Open Source** (código aberto)  
✅ **Muito barato** (~$1-10/mês vs $30-50 OpenAI)  
✅ **Desempenho comparável** ao GPT-3.5/4  
✅ **Pode self-host** (controle total)  
✅ **API compatível** com OpenAI (fácil migração)  
✅ **Desenvolvido na China** (alternativa ao domínio US)  

---

## 📝 Como obter API Key (Grátis)

### 1. Criar conta no DeepSeek

Acesse: **https://platform.deepseek.com/**

- Clique em "Sign Up"
- Use email ou GitHub
- Confirme email

### 2. Gerar API Key

1. Faça login
2. Vá em: **API Keys** (menu lateral)
3. Clique: **"Create API Key"**
4. Copie a key (começa com `sk-`)

⚠️ **IMPORTANTE:** Salve a key imediatamente! Ela só aparece uma vez.

### 3. Adicionar no `.env.local`

```bash
AI_PROVIDER="deepseek"
DEEPSEEK_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

### 4. Testar

```bash
# No terminal do CMS
node -e "console.log(process.env.DEEPSEEK_API_KEY ? '✅ Key configurada!' : '❌ Key não encontrada')"
```

---

## 💰 Preços (Jan 2025)

### Input (texto enviado)
- **$0.14 / 1M tokens** (~700 páginas de texto)

### Output (resposta da IA)
- **$0.28 / 1M tokens**

### Exemplo prático:

**Análise de 1 visitante:**
- Input: ~300 tokens (dados da sessão)
- Output: ~200 tokens (análise + recomendações)
- **Custo: ~$0.00014** (menos de 1 centavo!)

**1000 visitantes/mês:**
- **Custo total: ~$0.14** (14 centavos)

**Mesmo com 10.000 visitantes/mês: ~$1.40!**

---

## 🔧 Configuração Avançada

### Ajustar temperatura (criatividade)

Em `src/lib/ai-scoring.ts`, linha ~200:

```typescript
const response = await ai.chat(messages, {
  temperature: 0.3, // 0 = preciso, 1 = criativo
  maxTokens: 800,
});
```

**Recomendado:** 0.2-0.4 para análise comportamental (mais preciso)

### Trocar modelo

DeepSeek tem vários modelos:

```bash
# No .env.local
AI_PROVIDER="deepseek"
DEEPSEEK_MODEL="deepseek-chat"  # padrão
# ou
DEEPSEEK_MODEL="deepseek-coder" # especializado em código
```

---

## 🆚 Comparação com Concorrentes

| Provider | Custo (1M tokens) | Velocidade | Qualidade |
|----------|-------------------|------------|-----------|
| **DeepSeek** | $0.14 | 🚀 Rápido | ⭐⭐⭐⭐ |
| OpenAI GPT-3.5 | $1.50 | 🚀 Rápido | ⭐⭐⭐⭐⭐ |
| OpenAI GPT-4 | $30.00 | 🐢 Lento | ⭐⭐⭐⭐⭐ |
| Gemini Pro | GRÁTIS* | 🚀 Rápido | ⭐⭐⭐⭐ |
| Llama 3 (local) | GRÁTIS | 🐢 Médio | ⭐⭐⭐ |

*Gemini: grátis até 60 req/min, depois $0.50/1M tokens

**Veredito:** DeepSeek é o melhor custo-benefício!

---

## 🔄 Trocar de Provider (futuro)

O sistema está preparado para trocar facilmente:

```bash
# DeepSeek (atual)
AI_PROVIDER="deepseek"
DEEPSEEK_API_KEY="sk-..."

# Gemini (grátis)
AI_PROVIDER="gemini"
GEMINI_API_KEY="..."

# OpenAI (mais caro mas melhor)
AI_PROVIDER="openai"
OPENAI_API_KEY="sk-..."

# Llama 3 (self-hosted, grátis)
AI_PROVIDER="llama"
LLAMA_ENDPOINT="http://localhost:11434"
```

**Não precisa mudar código!** Só a variável de ambiente.

---

## 🧪 Testar a IA

### Teste rápido:

```bash
cd azimut-cms
npm run dev
```

Acesse o site e:
1. Navegue por algumas páginas
2. Veja projetos de museus
3. Volte ao terminal do CMS

Você verá:
```
🎯 Lead qualificado detectado: [sessionId]
{
  type: 'MUSEUM_CURATOR',
  conversionScore: 75
}
```

---

## 📊 Monitorar Uso (evitar surpresas)

### Dashboard do DeepSeek

1. Acesse: https://platform.deepseek.com/
2. Menu: **Usage**
3. Veja:
   - Total de tokens usados
   - Custo acumulado
   - Requisições por dia

### Configurar alerta de custo

1. Menu: **Billing**
2. Configure: **Usage Limit**
3. Ex: Alerta se passar de $5/mês

---

## 🔒 Segurança

### Proteger API Key

✅ **NUNCA** commite no Git:
```bash
# .gitignore já inclui
.env.local
.env*.local
```

✅ **Use variáveis de ambiente** em produção (Vercel):
```
Dashboard > Settings > Environment Variables
DEEPSEEK_API_KEY = sk-...
```

✅ **Rate limiting** já está implementado:
```typescript
// app/api/track/route.ts
// Máx 100 requisições/minuto por IP
```

---

## 🚀 Alternativas ao DeepSeek

### Se quiser mudar no futuro:

#### 1. Gemini (Google) - GRÁTIS
```bash
AI_PROVIDER="gemini"
GEMINI_API_KEY="..."
# Obtenha em: https://makersuite.google.com/app/apikey
```

**Vantagem:** Gratuito até 60 req/min  
**Desvantagem:** Quotas podem mudar

#### 2. Llama 3 (Meta) - GRÁTIS
```bash
AI_PROVIDER="llama"
LLAMA_ENDPOINT="http://localhost:11434"
# Instale Ollama: https://ollama.ai/
```

**Vantagem:** Totalmente gratuito, privado  
**Desvantagem:** Precisa de servidor próprio

#### 3. OpenAI - PAGO
```bash
AI_PROVIDER="openai"
OPENAI_API_KEY="sk-..."
```

**Vantagem:** Melhor qualidade  
**Desvantagem:** ~10x mais caro que DeepSeek

---

## ✅ Checklist

- [ ] Criou conta no DeepSeek
- [ ] Gerou API Key
- [ ] Adicionou no `.env.local`
- [ ] Testou a integração
- [ ] Configurou alerta de custo (opcional)
- [ ] Verificou que não commitou a key

---

## 🆘 Problemas Comuns

### "Invalid API Key"

```
Error: DeepSeek API error: Unauthorized
```

**Solução:**
- Verifique se copiou a key completa
- Confirme que começa com `sk-`
- Gere uma nova key se necessário

### "Rate limit exceeded"

```
Error: Too many requests
```

**Solução:**
- DeepSeek tem limite de ~60 req/min
- Sistema já tem rate limiting
- Pode ser temporário, tente novamente em 1 minuto

### IA não está sendo usada

```
AI enhancement failed, using base scores
```

**Solução:**
- Isso é normal! Sistema funciona sem IA (usa regras)
- Verifique se `DEEPSEEK_API_KEY` está configurada
- Veja logs para erro específico

---

## 📚 Documentação Oficial

- Site: https://www.deepseek.com/
- Docs: https://platform.deepseek.com/docs
- GitHub: https://github.com/deepseek-ai
- Paper: https://arxiv.org/abs/2401.02954

---

**🎉 Pronto! DeepSeek configurado e funcionando!**

**Custo estimado: $1-3/mês para uso moderado (100-500 análises/mês)**

Muito mais barato que:
- OpenAI: $30-50/mês
- HubSpot: $800/mês
- Salesforce: $1200/mês

**E você tem controle total + open source! 🚀**
























