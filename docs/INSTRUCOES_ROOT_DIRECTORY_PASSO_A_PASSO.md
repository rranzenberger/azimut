# 📍 INSTRUÇÕES PASSO A PASSO - ROOT DIRECTORY

## 🎯 **COMO ENCONTRAR O ROOT DIRECTORY:**

### **PASSO 1: Ir para Settings**
1. No topo da página, você vê várias abas:
   - Overview | **Deployments** | Analytics | Speed Insights | Logs | **Settings** | ...
2. **Clique na aba "Settings"** (⚙️ Configurações)

---

### **PASSO 2: Abrir Build and Deployment**
1. No menu lateral esquerdo, você verá:
   - General
   - **Build and Deployment** ← **CLIQUE AQUI!**
   - Domains
   - Environments
   - Environment Variables
   - etc.

---

### **PASSO 3: Procurar Root Directory**
1. Na página "Build and Deployment", procure por:
   - **"Root Directory"** (geralmente no topo)
   - Ou em **"Build Settings"**
   - Ou em **"Build Configuration"**

2. Você deve ver um campo de texto que pode estar:
   - Vazio
   - Ou com algum valor (pode estar errado)

3. **Digite:** `azimut-cms` (sem barras, sem ponto)

4. **Clique em "Save"**

---

## 🔍 **SE NÃO ENCONTRAR EM "Build and Deployment":**

### **Alternativa 1: Procurar em General (rolar até o final)**
1. Settings → General
2. **Role a página PARA BAIXO** até o final
3. Pode estar após todas as outras configurações

### **Alternativa 2: Criar novo projeto (último recurso)**
Se realmente não encontrar, podemos:
1. Criar um novo projeto no Vercel
2. Durante a criação, ele pergunta sobre Root Directory
3. Conectar ao mesmo repositório GitHub

---

## ✅ **VERIFICAÇÃO:**

Depois de configurar:

1. Vá em **Deployments**
2. Clique em qualquer deploy com erro
3. Clique em **"Build Logs"**
4. Deve aparecer algo como:
   ```
   Running build in azimut-cms/
   Found package.json
   Installing dependencies...
   ```

---

## 🚀 **RESUMO DO CAMINHO:**

```
Vercel Dashboard
  → azimut-backoffice (projeto)
    → Settings (aba no topo) ← CLIQUE AQUI AGORA!
      → Build and Deployment (menu lateral esquerdo)
        → Root Directory (campo na página)
          → Digite: azimut-cms
            → Save
```

---

**PRÓXIMO PASSO:** Clique em "Settings" → "Build and Deployment" → procure "Root Directory"

