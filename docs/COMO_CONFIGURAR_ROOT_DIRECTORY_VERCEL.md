# 📍 COMO CONFIGURAR ROOT DIRECTORY NO VERCEL

## 🎯 PASSO A PASSO COMPLETO:

### **1. Acessar Vercel Dashboard:**

1. Abra seu navegador
2. Acesse: **https://vercel.com/dashboard**
3. Faça login (se necessário):
   - Email: `drive.azimut@gmail.com`
   - Ou via GitHub (autenticação OAuth)

---

### **2. Entrar no Projeto:**

1. No dashboard, procure pelo projeto: **`azimut-backoffice`**
2. Clique no nome do projeto para abrir

---

### **3. Acessar Settings (Configurações):**

1. No topo da página do projeto, você verá várias abas:
   - **Deployments** | **Analytics** | **Logs** | **Settings** | etc.
2. Clique na aba **"Settings"** (ou "⚙️ Configurações")

---

### **4. Encontrar Root Directory:**

1. Na página de Settings, você verá um menu lateral à esquerda com:
   - **General**
   - **Environment Variables**
   - **Domains**
   - **Git**
   - etc.
2. Clique em **"General"** (primeira opção)

---

### **5. Configurar Root Directory:**

1. Na página General, você verá várias configurações
2. Procure pela seção **"Root Directory"** 
3. Você verá um campo de texto (provavelmente vazio ou com outro valor)
4. **Digite:** `azimut-cms` (sem barras, sem ponto)
5. Clique no botão **"Save"** ou **"Salvar"**

---

### **6. Fazer Redeploy:**

Após salvar:

1. Vá para a aba **"Deployments"** (ou volte para a página principal)
2. Encontre o último deploy (deve estar com status "Error" ou "Failed")
3. Clique nos **três pontinhos (...)** ao lado do deploy
4. Selecione **"Redeploy"**
5. Ou simplesmente aguarde o próximo deploy automático (se houver push no git)

---

## 📸 O QUE VOCÊ DEVE VER:

```
Settings → General

┌─────────────────────────────────────────┐
│ Project Name                            │
│ azimut-backoffice                       │
├─────────────────────────────────────────┤
│                                         │
│ Root Directory                          │
│ ┌─────────────────────────────────────┐ │
│ │ azimut-cms                          │ │ ← Digite aqui
│ └─────────────────────────────────────┘ │
│                                         │
│ [ Save ]                                │ ← Clique aqui
│                                         │
└─────────────────────────────────────────┘
```

---

## ⚠️ IMPORTANTE:

- **NÃO use barras:** `azimut-cms` ✅ (correto)
- **NÃO use:** `/azimut-cms` ❌
- **NÃO use:** `azimut-cms/` ❌
- **NÃO use ponto:** `.` ❌

---

## 🔍 SE NÃO ENCONTRAR:

Se não encontrar a opção "Root Directory":

1. Verifique se está no projeto correto: **azimut-backoffice**
2. Verifique se está em Settings → General
3. Se não aparecer, pode estar em uma versão diferente do Vercel
4. Alternativamente, tente criar um novo projeto e configurar durante a criação

---

## ✅ APÓS CONFIGURAR:

1. ✅ Root Directory configurado = `azimut-cms`
2. ✅ Salvar
3. ⏳ Fazer Redeploy
4. ⏳ Aguardar build passar
5. ⏳ Testar se build passou
6. ⏳ Rodar seed no banco Neon

---

**Dúvidas? Me avise!** 😊

