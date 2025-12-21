# 🔧 Passo a Passo: Desconectar e Reconectar Repositório

## 🎯 O Que Você Precisa Fazer AGORA

### **PASSO 1: Desconectar Repositório Errado** (30 segundos)

**Na tela atual (Settings → Git):**

1. **Na seção "Connected Git Repository"**
   - Você vê: `rranzenberger/azimut-backoffice` (ERRADO!)

2. **No canto direito**, há um botão **"Disconnect"**
   - Clique nele

3. **Confirme a desconexão**
   - Uma janela pode aparecer pedindo confirmação
   - Clique em "Confirm" ou "Disconnect"

---

### **PASSO 2: Conectar ao Repositório Correto** (1 minuto)

**Após desconectar, você verá:**

1. **"Connect Git Repository"** ou lista de repositórios

2. **Procure na lista:**
   - ✅ **`rranzenberger/azimut`** (este é o CORRETO!)
   - ❌ **NÃO conecte:** `azimut-backoffice` (errado)

3. **Clique em "Connect"** ao lado de `rranzenberger/azimut`

---

### **PASSO 3: Configurar Durante a Conexão** (2 minutos)

**Quando conectar, uma tela de configuração aparecerá:**

#### **3.1. Root Directory** ⚠️ ESSENCIAL!

1. **Procure por "Root Directory"** ou "Project Root"
2. **Clique em "Edit"** ou "Configure"
3. **Digite:** `azimut-cms`
4. ✅ **Isso é CRUCIAL!** Sem isso, não funciona!

#### **3.2. Framework Preset**

- Selecione: **"Next.js"** (ou deixe auto-detect)

#### **3.3. Build Command**

- Deve aparecer automaticamente: `cd azimut-cms && npm run build`
- Se não aparecer, digite manualmente

#### **3.4. Output Directory**

- Deve aparecer: `.next`
- Ou deixe vazio

#### **3.5. Production Branch**

- Selecione: **`main`**

#### **3.6. Environment Variables**

- Se necessário, adicione:
  - `DATABASE_URL`
  - `JWT_SECRET`
  - `NODE_ENV=production`

#### **3.7. Deploy**

- Clique em **"Deploy"** ou **"Connect"**

---

### **PASSO 4: Aguardar Deploy** (2-5 minutos)

1. **Você será redirecionado** para a página de deploy
2. **Status mudará:**
   - 🟡 "Building" (em andamento)
   - 🟢 "Ready" (concluído)

3. **Aguarde até status "Ready"** (verde)

---

### **PASSO 5: Verificar se Funcionou** (1 minuto)

1. **Vá em "Deployments"**
2. **Clique no deploy mais recente**
3. **Aba "Deployment" → Seção "Source"**
4. **Verifique commit:**
   - ✅ Deve mostrar: `333fff4` ou mais recente
   - ❌ **NÃO deve ser:** `62dcdb5`

---

## ⚠️ Sobre "Ignored Build Step"

**Você viu na tela:**
- "Ignored Build Step" → "Behavior: Automatic"

**Isso está CORRETO!**
- ✅ Não precisa alterar
- ✅ "Automatic" é o comportamento correto
- ✅ O problema é o repositório conectado, não isso

---

## ✅ Checklist Rápido

- [ ] Desconectei: `rranzenberger/azimut-backoffice` (errado)
- [ ] Conectei: `rranzenberger/azimut` (correto)
- [ ] Configurei Root Directory: `azimut-cms`
- [ ] Aguardei deploy: Status "Ready" (verde)
- [ ] Verifiquei commit: `333fff4` ou mais recente
- [ ] Testei menu: "Páginas" (sem "em breve")

---

## 🎯 Resumo Visual

```
TELA ATUAL:
└── Connected Git Repository
    └── rranzenberger/azimut-backoffice (ERRADO!)
        └── [Disconnect] ← CLIQUE AQUI

DEPOIS:
└── Connect Git Repository
    └── rranzenberger/azimut (CORRETO!) ← CLIQUE AQUI
        └── [Configurar]
            └── Root Directory: azimut-cms ← DIGITE AQUI
            └── [Deploy]
```

---

**Ação imediata:** Clique em "Disconnect" e depois conecte `rranzenberger/azimut` com Root Directory `azimut-cms`.

