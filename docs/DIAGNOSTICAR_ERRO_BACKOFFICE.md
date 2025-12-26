# 🔍 Diagnosticar Erro do Backoffice

## 📋 **Passos para Identificar o Erro:**

### **1. Ver Logs do Deploy:**
No dashboard Vercel:
1. Clique no deploy que falhou (ou o mais recente)
2. Aba "Logs" ou "Build Logs"
3. Procure por:
   - ❌ `Error:`
   - ❌ `Failed:`
   - ❌ `Cannot find module`
   - ❌ `DATABASE_URL`
   - ❌ `Prisma`

### **2. Erros Comuns e Soluções:**

#### **Erro: "DATABASE_URL is not defined"**
**Solução:**
- Vercel → Settings → Environment Variables
- Adicionar: `DATABASE_URL` = `postgresql://neondb_owner:npg_W8VkhFvGTHj2@ep-crimson-firefly-ac8akobs-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require`
- Marcar para: Production, Preview, Development
- Fazer novo deploy

#### **Erro: "Prisma Client not generated"**
**Solução:**
- Verificar se `postinstall` está no package.json: `"postinstall": "prisma generate"`
- Build command deve ser: `npm run build` (já inclui `prisma generate`)

#### **Erro: "Cannot find module '@prisma/client'"
**Solução:**
- Verificar se `@prisma/client` está em `dependencies` (não `devDependencies`)
- Fazer novo deploy

#### **Erro: "Root Directory not found"**
**Solução:**
- Vercel → Settings → General
- **Root Directory:** `azimut-cms`
- Salvar e fazer novo deploy

#### **Erro: "Build failed"**
**Solução:**
- Verificar logs completos
- Pode ser erro de TypeScript, importação, etc.
- Testar build local: `cd azimut-cms && npm run build`

### **3. Verificar Configuração do Projeto:**

**Settings → General:**
- [ ] Framework Preset: `Next.js`
- [ ] Root Directory: `azimut-cms`
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `.next`
- [ ] Install Command: `npm install`

**Settings → Environment Variables:**
- [ ] `DATABASE_URL` (obrigatório)
- [ ] `NEXTAUTH_SECRET` (obrigatório)
- [ ] `NEXTAUTH_URL` = `https://azimut-backoffice.vercel.app`
- [ ] `SITE_URL` = `https://azmt.com.br`
- [ ] `NODE_ENV` = `production`

### **4. Testar Build Local:**

```powershell
cd azimut-cms
npm install
npm run build
```

Se funcionar localmente, o problema é configuração no Vercel.
Se falhar localmente, o problema é no código.

---

## 🆘 **Me Diga:**

1. **Qual é a mensagem de erro exata?** (copie dos logs)
2. **Em que etapa falha?** (Installing, Building, Deploying)
3. **O build funciona localmente?** (`npm run build` na pasta azimut-cms)

Com essas informações, posso ajudar a resolver!

