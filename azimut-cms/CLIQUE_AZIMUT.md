# ✅ SIM! Clique em "Connect" ao lado de `azimut`

## 🎯 O Que Você Vê na Tela

**Lista de repositórios:**

- ✅ **`azimut`** (1h ago) ← **ESCOLHA ESTE!**
  - Botão: **[Connect]** ← **CLIQUE AQUI!**

- ❌ **`azimut-backoffice`** (23h ago) ← **NÃO ESCOLHA!**
  - Tem ícone de cadeado 🔒
  - **NÃO clique aqui!**

---

## ✅ Ação Imediata

### **PASSO 1: Verificar se Precisa Desconectar**

**Se ainda estiver conectado a `azimut-backoffice`:**

1. **Procure por um botão "Disconnect"** no topo
2. **Clique em "Disconnect"** primeiro
3. **Confirme a desconexão**

**Se já estiver desconectado:**
- ✅ Pule para o Passo 2

---

### **PASSO 2: Conectar ao Repositório Correto**

1. **Na lista de repositórios, encontre:**
   - ✅ **`azimut`** (sem "backoffice")

2. **Clique no botão "Connect"** ao lado de `azimut`

3. **Uma tela de configuração aparecerá**

---

### **PASSO 3: Configurar Root Directory** ⚠️ ESSENCIAL!

**Na tela de configuração que aparecer:**

#### **3.1. Root Directory** ⚠️ MUITO IMPORTANTE!

1. **Procure por:** "Root Directory" ou "Project Root"
2. **Clique em "Edit"** ou "Configure" (se necessário)
3. **Digite:** `azimut-cms`
4. ✅ **Isso é CRUCIAL!** Sem isso, não funciona!

#### **3.2. Production Branch**

- Selecione: **`main`**

#### **3.3. Framework Preset**

- Selecione: **"Next.js"** (ou deixe auto-detect)

#### **3.4. Build Command**

- Deve aparecer: `cd azimut-cms && npm run build`
- Se não aparecer, digite manualmente

#### **3.5. Output Directory**

- Deve aparecer: `.next`
- Ou deixe vazio

#### **3.6. Deploy**

- Clique em **"Deploy"** ou **"Connect"**

---

## 🎯 Resumo Visual

```
TELA ATUAL:
└── Lista de repositórios:
    ├── azimut (1h ago) ← ESCOLHA ESTE! ✅
    │   └── [Connect] ← CLIQUE AQUI!
    └── azimut-backoffice (23h ago) ← NÃO ESCOLHA! ❌

TELA SEGUINTE (Configuração):
└── Root Directory: azimut-cms ← DIGITE AQUI! ⚠️
└── Production Branch: main
└── [Deploy] ← CLIQUE AQUI
```

---

## ✅ Checklist

- [ ] Verifiquei se preciso desconectar `azimut-backoffice` primeiro
- [ ] Cliquei em "Connect" ao lado de `azimut` ✅
- [ ] Configurei Root Directory: `azimut-cms` ⚠️
- [ ] Configurei Production Branch: `main`
- [ ] Cliquei em "Deploy"
- [ ] Aguardei deploy: Status "Ready" (verde)

---

## ⚠️ Lembrete Importante

**Root Directory = `azimut-cms`** é ESSENCIAL!

- ✅ Com isso: Vercel procura em `azimut-cms/` → Deploy funciona!
- ❌ Sem isso: Vercel procura na raiz → Deploy falha!

---

**Ação imediata:** Clique em "Connect" ao lado de `azimut` (não `azimut-backoffice`)!

