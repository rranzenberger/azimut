# ⚠️ Configurar Root Directory (ESSENCIAL!)

## ✅ Situação Atual

**Você já fez:**
- ✅ Conectou o repositório: `rranzenberger/azimut`
- ✅ Status: "Connected just now"

**Agora precisa:**
- ⚠️ Configurar **Root Directory** = `azimut-cms`

---

## 🎯 O Que Fazer Agora

### **PASSO 1: Ir para "Build and Deployment"**

1. **No menu lateral (esquerda), procure por:**
   - "Build and Deployment"
   - Está logo abaixo de "General"

2. **Clique em "Build and Deployment"**

---

### **PASSO 2: Encontrar "Root Directory"**

**Na tela "Build and Deployment", procure por:**

1. **Seção "Build Settings"** ou "Build Configuration"
2. **Campo "Root Directory"** ou "Project Root"
   - Deve ser um campo de texto
   - Pode estar vazio ou com algum valor

---

### **PASSO 3: Configurar Root Directory**

1. **Clique no campo "Root Directory"**
2. **Digite:** `azimut-cms`
3. ✅ **Isso é ESSENCIAL!** Sem isso, o deploy não funciona!

---

### **PASSO 4: Salvar**

1. **Procure por um botão "Save"** (geralmente no canto inferior direito)
2. **Clique em "Save"**
3. **Vercel pode pedir confirmação** → Confirme

---

### **PASSO 5: Aguardar Deploy Automático**

1. **Após salvar, o Vercel fará um deploy automático**
2. **Você será redirecionado para "Deployments"**
3. **Status mudará:**
   - 🟡 "Building" (em andamento)
   - 🟢 "Ready" (concluído)

4. **Aguarde até status "Ready"** (verde)

---

## 🎯 Resumo Visual

```
MENU LATERAL:
└── Settings
    ├── General
    ├── Build and Deployment ← CLIQUE AQUI!
    ├── Domains
    └── ...

TELA "Build and Deployment":
└── Build Settings
    └── Root Directory: [azimut-cms] ← DIGITE AQUI! ⚠️
    └── [Save] ← CLIQUE AQUI!

DEPOIS:
└── Deploy automático
    └── Status: "Ready" (verde) ✅
```

---

## ⚠️ Por Que Isso É Essencial?

**Sem Root Directory:**
- ❌ Vercel procura arquivos na raiz do repositório
- ❌ Não encontra `package.json` do backoffice
- ❌ Não encontra `app/`, `prisma/`, etc.
- ❌ Deploy falha!

**Com Root Directory `azimut-cms`:**
- ✅ Vercel procura arquivos em `azimut-cms/`
- ✅ Encontra `package.json` do backoffice
- ✅ Encontra `app/`, `prisma/`, etc.
- ✅ Deploy funciona perfeitamente!

---

## ✅ Checklist

- [ ] Cliquei em "Build and Deployment" no menu lateral
- [ ] Encontrei o campo "Root Directory"
- [ ] Digitei: `azimut-cms` ⚠️
- [ ] Cliquei em "Save"
- [ ] Aguardei deploy automático
- [ ] Status: "Ready" (verde) ✅

---

## 🎯 Localização Alternativa

**Se não encontrar em "Build and Deployment":**

1. **Procure em "General"** (primeira opção do menu)
2. **Procure por "Project Root"** ou "Root Directory"
3. **Ou procure na tela de configuração do repositório Git**

**Dica:** Use Ctrl+F (ou Cmd+F no Mac) e procure por "Root" na página

---

**Ação imediata:** Vá em "Build and Deployment" → Configure Root Directory = `azimut-cms` → Salve!

