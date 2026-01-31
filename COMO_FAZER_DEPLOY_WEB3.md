# 🚀 Como Fazer Deploy do Sistema Web3

## ⚡ DEPLOY RÁPIDO

### Opção 1: Script Automático (Recomendado)

**Windows:**
```bash
DEPLOY_WEB3.bat
```

**PowerShell:**
```powershell
.\DEPLOY_WEB3.ps1
```

---

## 📋 DEPLOY MANUAL PASSO A PASSO

### 1. Verificar Mudanças

```bash
git status
```

### 2. Adicionar Arquivos

```bash
git add .
```

### 3. Criar Commit

```bash
git commit -m "feat: Sistema Web3 completo - Carteira, Recompensas, NFTs, Smart Contracts"
```

### 4. Push para GitHub

```bash
git push origin main
```

### 5. Deploy Automático

O Vercel detecta o push e faz deploy automaticamente em ~2-5 minutos.

---

## 🔧 DEPLOY MANUAL (Se Automático Falhar)

### Via Vercel CLI

**1. Instalar Vercel CLI (se não tiver):**
```bash
npm i -g vercel
```

**2. Login:**
```bash
vercel login
```

**3. Deploy do Frontend:**
```bash
vercel --prod
```

**4. Deploy do Backoffice:**
```bash
cd azimut-cms
vercel --prod
```

---

### Via Dashboard Vercel

1. Acesse: https://vercel.com/dashboard
2. Selecione o projeto:
   - **Frontend:** `azimut-site-vite-tailwind`
   - **Backoffice:** `azimut-cms`
3. Clique em **"Deployments"**
4. Clique em **"Redeploy"** (último deploy)
5. Ou **"Create Deployment"** (novo deploy)

---

## ✅ O QUE SERÁ DEPLOYADO

### Frontend (`/`):
- ✅ Componente `WalletConnect.tsx` (melhorado)
- ✅ Página `ExperiencePreview.tsx` (com indicador fixo)
- ✅ Todas as melhorias de UX/UI

### Backoffice (`/azimut-cms`):
- ✅ API `/api/web3/wallet/connect`
- ✅ API `/api/web3/wallet/status`
- ✅ API `/api/web3/rewards/distribute`
- ✅ API `/api/web3/student-reward/register`
- ✅ Página `/admin/web3/setup-wallet`
- ✅ Página `/admin/web3/wallet-status`
- ✅ Página `/admin/web3/student-rewards`

---

## 🔍 VERIFICAR DEPLOY

### 1. Status no Vercel:
- Dashboard: https://vercel.com/dashboard
- Ver logs de build
- Ver status (Building, Ready, Error)

### 2. Testar no Site:
- Frontend: https://azmt.com.br/pt/experience-preview
- Backoffice: https://backoffice.azmt.com.br/admin/web3/wallet-status

### 3. Verificar Funcionalidades:
- ✅ Conectar carteira funciona?
- ✅ Indicador fixo aparece?
- ✅ Status da carteira carrega?
- ✅ APIs respondem?

---

## ⚠️ IMPORTANTE APÓS DEPLOY

### 1. Verificar Variáveis de Ambiente

**Frontend (.env):**
- ✅ `VITE_CMS_API_URL` configurado

**Backoffice (azimut-cms/.env):**
- ✅ `COMPANY_WALLET_ADDRESS` configurado
- ⏳ `COMPANY_WALLET_PRIVATE_KEY` (opcional - para automação)

### 2. Verificar Banco de Dados

Se precisar criar tabelas Web3:
```bash
cd azimut-cms
npx prisma migrate deploy
```

---

## 📊 CHECKLIST DE DEPLOY

### Antes do Deploy:
- [ ] Testado localmente
- [ ] Commits feitos
- [ ] Variáveis de ambiente configuradas
- [ ] Banco de dados atualizado (se necessário)

### Durante o Deploy:
- [ ] Push para GitHub feito
- [ ] Vercel detectou o push
- [ ] Build iniciado
- [ ] Build completou sem erros

### Após o Deploy:
- [ ] Site carrega corretamente
- [ ] Backoffice acessível
- [ ] APIs funcionando
- [ ] Carteira conecta
- [ ] Indicador fixo aparece

---

## 🚨 PROBLEMAS COMUNS

### Deploy não inicia:
- Verificar se push foi feito: `git log`
- Verificar integração Git no Vercel
- Fazer deploy manual via CLI

### Build falha:
- Verificar logs no Vercel Dashboard
- Verificar variáveis de ambiente
- Verificar dependências no `package.json`

### Site não atualiza:
- Limpar cache do navegador (Ctrl+Shift+R)
- Verificar se deploy completou
- Aguardar alguns minutos (CDN pode demorar)

---

## ✅ RESUMO

**Deploy Rápido:**
1. Execute: `DEPLOY_WEB3.bat` ou `DEPLOY_WEB3.ps1`
2. Aguarde deploy automático (~2-5 min)
3. Verifique no Vercel Dashboard

**Pronto!** 🎉
