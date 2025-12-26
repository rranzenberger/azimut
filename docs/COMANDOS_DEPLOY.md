# 🚀 Comandos de Deploy - Execute Após Login

## ✅ **1. Verificar Login**
```powershell
vercel whoami
```

## 📦 **2. Deploy do Site Principal**
```powershell
# Na raiz do projeto
cd C:\Users\ranz\Documents\azimut-site-vite-tailwind
vercel --prod
```

Quando perguntar:
- Link to existing project? **Yes** (se já existe) ou **No** (primeira vez)
- Project name: **azimut-site**
- Directory: **./**

## 🔧 **3. Deploy do Backoffice**
```powershell
# Na pasta do CMS
cd C:\Users\ranz\Documents\azimut-site-vite-tailwind\azimut-cms
vercel --prod
```

Quando perguntar:
- Link to existing project? **Yes** (se já existe) ou **No** (primeira vez)
- Project name: **azimut-backoffice**
- Directory: **./**

## 📊 **4. Monitorar Deploys**
```powershell
# Ver lista de deploys
vercel ls

# Ver logs do último deploy
vercel logs

# Ver informações do projeto
vercel inspect
```

## ⚙️ **5. Configurar Variáveis de Ambiente (Backoffice)**

Após deploy, acesse: https://vercel.com/dashboard → azimut-backoffice → Settings → Environment Variables

Adicione:
- `DATABASE_URL` (já configurada no Vercel Store)
- `JWT_SECRET` (gerar com: `openssl rand -base64 32`)
- `NEXTAUTH_SECRET` (gerar com: `openssl rand -base64 32`)
- `NEXTAUTH_URL` = `https://azimut-backoffice.vercel.app`
- `SITE_URL` = `https://azmt.com.br`
- `NODE_ENV` = `production`

## 🔗 **6. Conectar Site ao Backoffice**

Após deploy do backoffice, no site principal:
- Vercel → azimut-site → Settings → Environment Variables
- Adicione: `VITE_CMS_API_URL` = `https://azimut-backoffice.vercel.app/api`
- Faça novo deploy: `vercel --prod`

