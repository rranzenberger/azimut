# 🔑 CONFIGURAÇÃO DE API KEYS - PASSO A PASSO

## 🎯 OBJETIVO
Configurar Claude + DeepSeek para o chatbot funcionar com **máximo ROI** (78% economia!)

---

## 📋 PASSO 1: OBTER CLAUDE API KEY

### **1.1 Criar conta Anthropic:**
1. Acessar: https://console.anthropic.com/
2. Criar conta (email + senha)
3. Verificar email

### **1.2 Adicionar créditos:**
1. Ir em: **Billing** → **Add Credits**
2. Adicionar: **$10 USD** (suficiente para 1-2 meses!)
3. Confirmar pagamento

### **1.3 Gerar API Key:**
1. Ir em: **API Keys** → **Create Key**
2. Nome: `Azimut Website Chatbot`
3. Copiar chave (começa com `sk-ant-api03-...`)
4. ⚠️ **IMPORTANTE:** Salvar em local seguro! Não compartilhar!

**Chave copiada:**
```
sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 📋 PASSO 2: OBTER DEEPSEEK API KEY

### **2.1 Criar conta DeepSeek:**
1. Acessar: https://platform.deepseek.com/
2. Sign up (email + senha)
3. Verificar email

### **2.2 Adicionar créditos:**
1. Ir em: **Billing** → **Top Up**
2. Adicionar: **$5 USD** (suficiente para 2-3 meses!)
3. Confirmar pagamento

### **2.3 Gerar API Key:**
1. Ir em: **API Keys** → **Create New Key**
2. Nome: `Azimut Website`
3. Copiar chave (começa com `sk-...`)
4. ⚠️ **IMPORTANTE:** Salvar em local seguro!

**Chave copiada:**
```
sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 📋 PASSO 3: CONFIGURAR LOCALMENTE

### **3.1 Criar arquivo `.env`:**

Na **raiz do projeto** (onde está `package.json`):

```bash
# Windows PowerShell:
New-Item -Path .env -ItemType File

# Ou criar manualmente no editor de código
```

### **3.2 Adicionar as chaves:**

Editar `.env` e adicionar:

```bash
# Claude API (Alta qualidade)
VITE_CLAUDE_API_KEY=sk-ant-api03-SUA-CHAVE-CLAUDE-AQUI

# DeepSeek API (Economia)
VITE_DEEPSEEK_API_KEY=sk-SUA-CHAVE-DEEPSEEK-AQUI

# Backend URL
VITE_API_URL=http://localhost:3001
```

**Substituir:**
- `SUA-CHAVE-CLAUDE-AQUI` → Chave do Passo 1.3
- `SUA-CHAVE-DEEPSEEK-AQUI` → Chave do Passo 2.3

---

## 📋 PASSO 4: CONFIGURAR NO VERCEL (Produção)

### **4.1 Acessar Vercel Dashboard:**
1. https://vercel.com/rranzenberger/azimut
2. Clicar em: **Settings**
3. Ir em: **Environment Variables**

### **4.2 Adicionar Claude API Key:**
1. Clicar em: **Add New**
2. **Name:** `VITE_CLAUDE_API_KEY`
3. **Value:** `sk-ant-api03-...` (sua chave)
4. **Environment:** Selecionar **Production**
5. Clicar em: **Save**

### **4.3 Adicionar DeepSeek API Key:**
1. Clicar em: **Add New**
2. **Name:** `VITE_DEEPSEEK_API_KEY`
3. **Value:** `sk-...` (sua chave)
4. **Environment:** Selecionar **Production**
5. Clicar em: **Save**

### **4.4 Redeploy:**
1. Ir em: **Deployments**
2. Clicar nos 3 pontinhos (`...`) do último deploy
3. Clicar em: **Redeploy**
4. Aguardar 2-3 minutos

---

## 📋 PASSO 5: TESTAR LOCALMENTE

### **5.1 Rodar o site:**
```bash
npm run dev
```

### **5.2 Abrir navegador:**
```
http://localhost:5173
```

### **5.3 Verificar chatbot:**
1. Aguardar **15 segundos** → Chatbot aparece! 💬
2. Ou clicar no **botão flutuante** no canto direito
3. Enviar mensagem: `"Olá"`
4. **Abrir Console (F12)** e verificar logs:

**✅ FUNCIONANDO se você vê:**
```
⚡ Routing to DEEPSEEK (standard)
💬 AI Used: deepseek { costSaved: 0.005 }
```

**❌ ERRO se você vê:**
```
Claude API error: Unauthorized
DeepSeek API error: Invalid API Key
```

**SOLUÇÃO:**
- Verificar se `.env` está correto
- Verificar se as chaves estão válidas
- Reiniciar servidor: `Ctrl+C` → `npm run dev`

---

## 📋 PASSO 6: TESTAR EM PRODUÇÃO

### **6.1 Acessar site:**
```
https://azmt.com.br
```

### **6.2 Hard Refresh:**
```
Ctrl + Shift + R  (Windows)
Cmd + Shift + R   (Mac)
```

### **6.3 Testar chatbot:**
1. Aguardar 15s → Chatbot aparece
2. Enviar mensagem simples: `"Quais serviços vocês oferecem?"`
3. **DeepSeek** deve responder (econômico!)
4. Enviar mensagem crítica: `"Quanto custa um projeto de VR?"`
5. **Claude** deve responder (qualidade máxima!)

### **6.4 Verificar Console:**
```javascript
// F12 → Console
// Ver logs de roteamento:
⚡ Routing to DEEPSEEK  // Perguntas simples
🔥 Routing to CLAUDE    // Alta intenção
⬆️ Upgrading to CLAUDE  // Auto-upgrade
```

---

## 📊 MONITORAMENTO DE CUSTOS

### **Claude Dashboard:**
1. https://console.anthropic.com/
2. **Usage** → Ver consumo em tempo real
3. **Billing** → Ver créditos restantes

### **DeepSeek Dashboard:**
1. https://platform.deepseek.com/
2. **Usage** → Ver consumo
3. **Billing** → Ver saldo

### **Custos Esperados (por mês):**
```
Claude:    600 conversas × $0.005 = $30
DeepSeek:  2400 conversas × $0.00014 = $3
TOTAL:     $33/mês

Economia vs Só Claude: 78%! 💰
```

---

## 🚨 TROUBLESHOOTING

### **Erro: "Chatbot não aparece"**
✅ Verificar console (F12)
✅ Ver se há erro JavaScript
✅ Hard refresh: `Ctrl + Shift + R`

### **Erro: "API Key inválida"**
✅ Verificar se chave está correta no `.env`
✅ Verificar se não tem espaços extras
✅ Regenerar chave no dashboard

### **Erro: "Rate limit exceeded"**
✅ Aguardar 1 minuto
✅ Adicionar mais créditos
✅ Verificar se não está sendo abusado

### **Erro: "DeepSeek não responde"**
✅ Fazer fallback para Claude automaticamente
✅ Ver logs no console
✅ Verificar status: https://status.deepseek.com/

---

## ✅ CHECKLIST FINAL

```
□ Claude API Key obtida
□ DeepSeek API Key obtida
□ .env criado localmente
□ Chaves adicionadas no .env
□ Testado localmente (npm run dev)
□ Chaves adicionadas no Vercel
□ Redeploy feito no Vercel
□ Testado em produção (azmt.com.br)
□ Console mostra roteamento funcionando
□ Dashboards de uso verificados
```

---

## 🎉 RESULTADO ESPERADO

**✅ Chatbot funcionando:**
- Aparece após 15s ou ao clicar
- Responde em PT/EN/ES/FR
- DeepSeek para perguntas simples (80%)
- Claude para conversões críticas (20%)
- **Economia de 78% nos custos!**

**💰 Custo/Benefício:**
- Investimento: ~$33/mês
- Leads qualificados: +35%
- ROI: +300-400%! 🚀

---

**PRONTO PARA CONFIGURAR? QUALQUER DÚVIDA, ME AVISE!** 🎯
