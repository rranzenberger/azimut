# 🔍 ONDE ESTÁ O ROOT DIRECTORY NO VERCEL?

## 📍 **LOCALIZAÇÕES POSSÍVEIS:**

### **OPÇÃO 1: Build and Deployment (MAIS PROVÁVEL!)**

1. No menu lateral esquerdo, procure por **"Build and Deployment"**
2. Clique em **"Build and Deployment"**
3. Procure pela seção **"Build Settings"** ou **"Build Configuration"**
4. Lá você deve encontrar:
   - **Root Directory**
   - **Build Command**
   - **Output Directory**
   - **Install Command**

---

### **OPÇÃO 2: General (mas precisa rolar para baixo)**

1. Em **Settings → General**
2. **Role a página para baixo** (use a barra de rolagem)
3. O Root Directory pode estar mais abaixo, após:
   - Project Name
   - Project ID
   - Vercel Toolbar
   - Preview Deployment Suffix
   - Transfer
   - Delete Project

---

### **OPÇÃO 3: Durante o Deploy (Configuração Inicial)**

Se o projeto foi criado recentemente, o Root Directory pode ser configurado durante o primeiro deploy:

1. Vá em **Deployments**
2. Clique no último deploy
3. Procure por **"Configure"** ou **"Settings"** no deploy
4. Ou faça um **"Redeploy"** e durante o processo pode aparecer opção de configurar

---

## 🔧 **SOLUÇÃO ALTERNATIVA: Via vercel.json**

Se não encontrar no Dashboard, podemos forçar via código:

### **Criar/Editar `azimut-cms/vercel.json`:**

```json
{
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "framework": "nextjs",
  "outputDirectory": ".next"
}
```

**NOTA:** O `vercel.json` não aceita `rootDirectory` diretamente, mas o Vercel pode detectar automaticamente se o `package.json` estiver na pasta correta.

---

## 🎯 **MELHOR SOLUÇÃO: Verificar Build and Deployment**

1. **Settings** (ícone de engrenagem)
2. Menu lateral → **"Build and Deployment"**
3. Procure por **"Root Directory"** ou **"Build Settings"**
4. Se encontrar, configure como: `azimut-cms`

---

## 📋 **SE AINDA NÃO ENCONTRAR:**

### **Opção A: Criar Novo Projeto (Último Recurso)**

1. Vercel Dashboard → **Add New Project**
2. Conecte ao mesmo repositório GitHub
3. **Durante a criação**, o Vercel pergunta:
   - "Configure Root Directory"
   - Digite: `azimut-cms`
4. Complete a criação

### **Opção B: Usar Vercel CLI**

```powershell
cd azimut-cms
vercel link
# Durante o link, configure Root Directory
vercel --prod
```

---

## ✅ **VERIFICAÇÃO:**

Depois de configurar, verifique:

1. Vá em **Deployments**
2. Clique no último deploy
3. Veja os **Build Logs**
4. Deve aparecer algo como:
   ```
   Running build in azimut-cms/
   Found package.json
   ```

---

**TENTE PRIMEIRO: Settings → Build and Deployment → Root Directory**

