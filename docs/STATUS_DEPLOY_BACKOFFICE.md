# 📊 Status Deploy Backoffice - Verificação

## ✅ **Verificações no Dashboard Vercel:**

### **1. Verificar Deploy Atual:**
- [ ] Último deploy está "Ready" (verde)?
- [ ] Quando foi o último deploy?
- [ ] Há algum erro no build?

### **2. Verificar Configuração:**
- [ ] **Root Directory** está configurado como `azimut-cms`?
- [ ] **Framework** está como `Next.js`?
- [ ] **Build Command** está como `npm run build`?
- [ ] **Output Directory** está como `.next`?

### **3. Verificar Variáveis de Ambiente:**
Acesse: Settings → Environment Variables

Verificar se estão configuradas:
- [ ] `DATABASE_URL` (já configurada no Vercel Store - Neon)
- [ ] `JWT_SECRET`
- [ ] `NEXTAUTH_SECRET`
- [ ] `NEXTAUTH_URL` = `https://azimut-backoffice.vercel.app`
- [ ] `SITE_URL` = `https://azmt.com.br`
- [ ] `NODE_ENV` = `production`

### **4. Se Precisar Fazer Novo Deploy:**

**Opção A: Via Dashboard**
1. Clique em "Deployments"
2. Clique em "Redeploy" no último deploy
3. Ou faça push no GitHub para trigger automático

**Opção B: Via CLI**
```powershell
cd azimut-cms
vercel --prod
```

### **5. Testar Após Deploy:**
- [ ] Acessar: `https://azimut-backoffice.vercel.app`
- [ ] Testar login: `admin@azimut.com.br` / `Azimut2025!`
- [ ] Verificar dashboard
- [ ] Testar API: `https://azimut-backoffice.vercel.app/api/public/content`

---

## 🔍 **O que verificar agora:**

1. **Último deploy** - quando foi feito?
2. **Status** - está "Ready" ou com erro?
3. **Root Directory** - está configurado corretamente?
4. **Variáveis** - todas configuradas?

Me diga o que você está vendo no dashboard para eu ajudar melhor!

