# 🚀 COMO FAZER DEPLOY - Vercel

**Data:** Janeiro 2025  
**Plataforma:** Vercel

---

## 🤔 COMO FUNCIONA O DEPLOY NO VERCEL

### **Deploy Automático (Padrão):**

O Vercel faz deploy **automaticamente** quando você:

1. **Faz push para o GitHub/GitLab/Bitbucket**
   - Push para `main` ou `master` → Deploy em produção
   - Push para outras branches → Deploy de preview

2. **Configuração padrão:**
   - ✅ Conectado ao repositório Git
   - ✅ Deploy automático habilitado (padrão)
   - ✅ Build automático ao detectar mudanças

### **Deploy Manual:**

Você também pode fazer deploy manual:

1. Via **Dashboard do Vercel:**
   - Acessar: https://vercel.com/dashboard
   - Selecionar o projeto
   - Clicar em "Deploy" → Escolher branch/commit

2. Via **CLI do Vercel:**
   ```bash
   npm i -g vercel
   cd azimut-cms
   vercel --prod
   ```

---

## 📋 PROCESSO ATUAL (O QUE MUDOU)

### **Antes:**
- ❌ Deploy não atualizava automaticamente
- ❌ Provavelmente não estava conectado ao Git
- ❌ Ou deploy automático estava desabilitado

### **Agora:**
- ✅ Deploy automático quando você faz push
- ✅ Conectado ao repositório Git
- ✅ Build automático ao detectar mudanças

---

## 🔧 COMO VERIFICAR/CONFIGURAR

### **1. Verificar no Dashboard Vercel:**

1. Acesse: https://vercel.com/dashboard
2. Selecione o projeto `azimut-cms` (ou nome do projeto)
3. Vá em **Settings** → **Git**
4. Verifique:
   - ✅ Repositório conectado?
   - ✅ Branch de produção (`main`/`master`)?
   - ✅ Deploy automático habilitado?

### **2. Configurações Importantes:**

**Settings → Git:**
- **Production Branch:** `main` ou `master`
- **Auto-deploy:** ✅ Habilitado (recomendado)
- **Preview Deployments:** ✅ Habilitado (para branches de dev)

**Settings → General:**
- **Build Command:** `npm run build` (já configurado no `vercel.json`)
- **Output Directory:** `.next` (já configurado)
- **Install Command:** `npm install` (já configurado)

---

## 🚀 FAZENDO DEPLOY AGORA

### **Opção 1: Deploy Automático (Recomendado)**

1. **Fazer commit das mudanças:**
   ```bash
   cd azimut-cms
   git add .
   git commit -m "Fix: Suporte a slugs com barras usando catch-all route"
   git push origin main
   ```

2. **Aguardar deploy automático:**
   - Vercel detecta o push
   - Inicia build automaticamente
   - Deploy em ~2-5 minutos
   - Recebe notificação por email

### **Opção 2: Deploy Manual via CLI**

1. **Instalar Vercel CLI (se não tiver):**
   ```bash
   npm i -g vercel
   ```

2. **Fazer login:**
   ```bash
   vercel login
   ```

3. **Deploy em produção:**
   ```bash
   cd azimut-cms
   vercel --prod
   ```

### **Opção 3: Deploy Manual via Dashboard**

1. Acessar: https://vercel.com/dashboard
2. Selecionar projeto
3. Clicar em **"Deployments"**
4. Clicar em **"Redeploy"** (último deploy) ou **"Create Deployment"**

---

## ⚙️ CONFIGURAÇÃO ATUAL (`vercel.json`)

```json
{
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "framework": "nextjs",
  "outputDirectory": ".next"
}
```

**Status:** ✅ Configurado corretamente

---

## 🔍 VERIFICANDO SE DEPLOY ESTÁ AUTOMÁTICO

### **Sinais de que está automático:**

1. ✅ Vercel conectado ao GitHub/GitLab
2. ✅ Deployments aparecem automaticamente após push
3. ✅ Status no dashboard mostra "Auto-deploy"
4. ✅ Email/notificação quando deploy completa

### **Se não estiver automático:**

1. Ir em Settings → Git
2. Conectar repositório (se não estiver)
3. Habilitar "Auto-deploy"
4. Salvar

---

## 📊 MONITORAMENTO DE DEPLOY

### **Ver status do deploy:**

1. Dashboard Vercel → Deployments
2. Ver:
   - ✅ Status (Building, Ready, Error)
   - ⏱️ Tempo de build
   - 📝 Logs do build
   - 🔗 URL do deploy

### **Logs do deploy:**

Clicar em um deployment → Ver logs completos:
- Instalação de dependências
- Build do projeto
- Erros (se houver)

---

## ⚠️ PROBLEMAS COMUNS

### **Deploy falha:**

1. **Ver logs no Vercel Dashboard**
2. **Erros comuns:**
   - ❌ Variáveis de ambiente faltando
   - ❌ Build command errado
   - ❌ Dependências faltando
   - ❌ Erro de TypeScript/compilação

### **Deploy não atualiza:**

1. Verificar se commit foi feito
2. Verificar se push foi feito
3. Verificar branch (precisa ser `main`/`master` para produção)
4. Verificar se Auto-deploy está habilitado

---

## ✅ RESUMO

**Como funciona agora:**
1. Você faz commit e push no Git
2. Vercel detecta automaticamente
3. Faz build automaticamente
4. Deploy em produção automaticamente
5. Site atualizado em ~2-5 minutos

**Não precisa fazer nada manualmente** se estiver configurado para deploy automático!

---

**🎉 Deploy automático está funcionando se você vê novas deployments aparecendo no dashboard após fazer push!**


