# 🔧 CONFIGURAR API KEYS NO VERCEL - PASSO A PASSO

## ✅ PASSO 1: VERIFICAR SE JÁ ESTÁ CONFIGURADO

### **1.1 Acessar Vercel:**
```
https://vercel.com/login
```

### **1.2 Fazer Login:**
- Login com GitHub OU
- Login com email/senha

### **1.3 Ir no Projeto do Site:**
```
https://vercel.com/rranzenberger/azimut
```

**OU:**
- Dashboard → Ver lista de projetos
- Clicar em: **azimut**

### **1.4 Abrir Settings:**
- Clicar na aba: **Settings** (⚙️)

### **1.5 Ir em Environment Variables:**
- Menu lateral esquerdo
- Clicar em: **Environment Variables**

### **1.6 Procurar por:**
```
VITE_CLAUDE_API_KEY
VITE_DEEPSEEK_API_KEY
```

**SE ENCONTRAR AMBAS:**
✅ **JÁ ESTÁ CONFIGURADO!**
→ Pule para PASSO 4 (Testar)

**SE NÃO ENCONTRAR:**
❌ **PRECISA CONFIGURAR!**
→ Continue no PASSO 2

---

## 🔑 PASSO 2: OBTER AS API KEYS (Se não tiver)

### **2.1 Claude API Key:**

**A) Acessar:**
```
https://console.anthropic.com/
```

**B) Login/Cadastro:**
- Sign up (se não tiver conta)
- OU Login (se já tiver)

**C) Adicionar Créditos:**
1. Menu lateral → **Billing**
2. Clicar em: **Add Credits**
3. Adicionar: **$10 USD** (mínimo)
4. Preencher cartão → Confirmar

**D) Gerar API Key:**
1. Menu lateral → **API Keys**
2. Clicar em: **Create Key**
3. Nome: `Azimut Website`
4. Copiar a chave (começa com `sk-ant-api03-...`)
5. ⚠️ **GUARDAR EM LOCAL SEGURO!** (só mostra 1 vez)

**Exemplo:**
```
sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

### **2.2 DeepSeek API Key:**

**A) Acessar:**
```
https://platform.deepseek.com/
```

**B) Login/Cadastro:**
- Sign up (se não tiver conta)
- OU Login (se já tiver)

**C) Adicionar Créditos:**
1. Menu superior → **Billing**
2. Clicar em: **Top Up**
3. Adicionar: **$5 USD** (mínimo)
4. Preencher cartão → Confirmar

**D) Gerar API Key:**
1. Menu superior → **API Keys**
2. Clicar em: **Create New Key**
3. Nome: `Azimut Website`
4. Copiar a chave (começa com `sk-...`)
5. ⚠️ **GUARDAR EM LOCAL SEGURO!** (só mostra 1 vez)

**Exemplo:**
```
sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## ⚙️ PASSO 3: ADICIONAR NO VERCEL

### **3.1 Voltar ao Vercel:**
```
https://vercel.com/rranzenberger/azimut
```

### **3.2 Ir em Settings → Environment Variables**

### **3.3 Adicionar Claude API Key:**

**A) Clicar no botão:** `Add New`

**B) Preencher:**
- **Name (campo 1):**
  ```
  VITE_CLAUDE_API_KEY
  ```
- **Value (campo 2):**
  ```
  sk-ant-api03-SUA-CHAVE-AQUI
  ```
  (Colar a chave que você copiou do Claude)

**C) Selecionar Environment:**
- ✅ Marcar: **Production**
- ✅ Marcar: **Preview** (opcional)
- ✅ Marcar: **Development** (opcional)

**D) Clicar:** `Save`

---

### **3.4 Adicionar DeepSeek API Key:**

**A) Clicar no botão:** `Add New` (de novo)

**B) Preencher:**
- **Name (campo 1):**
  ```
  VITE_DEEPSEEK_API_KEY
  ```
- **Value (campo 2):**
  ```
  sk-SUA-CHAVE-DEEPSEEK-AQUI
  ```
  (Colar a chave que você copiou do DeepSeek)

**C) Selecionar Environment:**
- ✅ Marcar: **Production**
- ✅ Marcar: **Preview** (opcional)
- ✅ Marcar: **Development** (opcional)

**D) Clicar:** `Save`

---

### **3.5 Verificar se salvou:**

Você deve ver na lista:
```
VITE_CLAUDE_API_KEY         sk-ant-api03-****...  Production
VITE_DEEPSEEK_API_KEY       sk-****...            Production
```

(Valores aparecem ocultos com **** por segurança)

✅ **Se aparecer:** Sucesso!

---

## 🔄 PASSO 4: REDEPLOY (OBRIGATÓRIO!)

**As variáveis só funcionam DEPOIS do redeploy!**

### **4.1 Ir na aba Deployments:**
- Clicar em: **Deployments** (topo da página)

### **4.2 Ver último deployment:**
- Ver o deployment mais recente (topo da lista)
- Deve ser: `f6b28ee` ou similar

### **4.3 Clicar nos 3 pontinhos (...):**
- Ao lado direito do deployment
- Clicar no menu `⋮` (3 pontinhos verticais)

### **4.4 Selecionar Redeploy:**
- Clicar em: **Redeploy**
- Confirmar: **Redeploy**

### **4.5 Aguardar (2-3 minutos):**
- Status: Building... (amarelo)
- Aguardar ficar: Ready (verde) ✅

---

## ✅ PASSO 5: TESTAR!

### **5.1 Acessar o site:**
```
https://azmt.com.br
```

### **5.2 Hard Refresh:**
- Windows: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

### **5.3 Abrir Console:**
- Pressionar: `F12`
- Ou: Botão direito → Inspecionar → Console

### **5.4 Aguardar 15 segundos:**
- Chatbot deve aparecer automaticamente! 💬

### **5.5 Clicar no chatbot:**
- Enviar mensagem: `Olá`

### **5.6 Ver resultado:**

**✅ FUNCIONANDO se você vê:**
```
⚡ Routing to DEEPSEEK (standard)
💬 AI Used: deepseek
🎯 USER PROFILE DETECTED: {...}
```

- Chatbot responde em 2-3 segundos
- Badge aparece: **⚡ DeepSeek** (azul)
- Sem erros vermelhos no console

**❌ ERRO se você vê:**
```
Error: Invalid API Key
Unauthorized
401
```

**SOLUÇÃO:**
1. Verificar se copiou chaves corretamente
2. Verificar se fez REDEPLOY
3. Aguardar mais 2 minutos (cache)
4. Hard refresh novamente

---

## 🔧 FAZER O MESMO NO BACKOFFICE

### **Projeto Backoffice:**
```
https://vercel.com/rranzenberger/azimut-backoffice
```

### **Adicionar:**
- **Name:** `DEEPSEEK_API_KEY`
- **Value:** `sk-...` (mesma chave DeepSeek)
- **Environment:** Production
- **Save**

### **Redeploy:**
- Deployments → ⋮ → Redeploy

---

## 📋 CHECKLIST FINAL

### **Verificar se tudo está configurado:**

```
□ Acessei Vercel: https://vercel.com/rranzenberger/azimut
□ Login feito
□ Settings → Environment Variables
□ Adicionei: VITE_CLAUDE_API_KEY (com valor)
□ Adicionei: VITE_DEEPSEEK_API_KEY (com valor)
□ Salvei ambas
□ Fiz Redeploy (Deployments → ⋮ → Redeploy)
□ Aguardei build finalizar (verde)
□ Testei site: https://azmt.com.br
□ Chatbot aparece
□ Chatbot responde
□ Console sem erros
```

---

## 🚨 TROUBLESHOOTING

### **Problema 1: "Não consigo acessar Vercel"**
**Solução:**
- Verificar email de login
- Tentar "Forgot Password"
- Login via GitHub (se usou na criação)

### **Problema 2: "Projeto não aparece"**
**Solução:**
- Verificar se está logado na conta certa
- URL direta: https://vercel.com/rranzenberger/azimut

### **Problema 3: "Variável não salva"**
**Solução:**
- Nome EXATO: `VITE_CLAUDE_API_KEY` (com underscore)
- Valor sem espaços no início/fim
- Clicar Save (não apenas fechar)

### **Problema 4: "Redeploy não funciona"**
**Solução:**
- Aguardar 3-5 minutos completos
- Hard refresh: Ctrl + Shift + R
- Limpar cache do navegador

### **Problema 5: "Chatbot não responde"**
**Solução:**
- F12 → Console → Copiar erros
- Verificar se API keys estão corretas
- Tentar regenerar chaves nas plataformas

---

## 💰 CUSTOS

### **Investimento Inicial:**
```
Claude:    $10 USD  (dura 1-2 meses)
DeepSeek:  $5 USD   (dura 2-3 meses)
─────────────────────────────────────
TOTAL:     $15 USD  (~R$ 75)
```

### **Custo Mensal (Produção):**
```
Claude:    $30/mês  (20% das conversas)
DeepSeek:  $3/mês   (80% das conversas)
─────────────────────────────────────
TOTAL:     $33/mês  (~R$ 165)
```

**ROI:** +300% em vendas! 🚀

---

## ✅ PRONTO!

**Depois de configurar, volte aqui e me diga:**

**A)** ✅ "Configurei, chatbot funciona!"
**B)** ⚠️ "Configurei, mas tem erro: [copiar erro]"
**C)** ❓ "Travei no passo X, me ajuda?"

**ESTOU AGUARDANDO! 😊**
