# 🚀 Deploy Final - Passo a Passo Completo

Baseado em `ACESSOS_E_CREDENCIAIS.md`

---

## ✅ **PRÉ-REQUISITOS VERIFICADOS**

- [x] Vercel CLI instalado (v49.2.0)
- [x] Build do site funcionando
- [x] Repositório GitHub: `https://github.com/rranzenberger/azimut`
- [x] Vercel login: `drive.azimut@gmail.com` (via GitHub)

---

## 📦 **1. DEPLOY DO SITE PRINCIPAL**

### **Opção A: Via Vercel CLI (Recomendado)**

```powershell
# 1. Certifique-se de estar na raiz do projeto
cd C:\Users\ranz\Documents\azimut-site-vite-tailwind

# 2. Login no Vercel (se não estiver logado)
vercel login

# 3. Deploy (primeira vez - vai perguntar configurações)
vercel

# 4. Quando perguntar:
# - Set up and deploy? Yes
# - Which scope? (escolha sua conta)
# - Link to existing project? No (primeira vez) ou Yes (se já existe)
# - Project name: azimut-site
# - Directory: ./
# - Override settings? No

# 5. Deploy para produção
vercel --prod
```

### **Opção B: Via Dashboard Vercel**

1. Acesse: https://vercel.com/new
2. Conecte repositório: `rranzenberger/azimut`
3. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `/` (raiz)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. Clique em **"Deploy"**

**Variáveis de Ambiente (se necessário):**
- `VITE_CMS_API_URL` (após deploy do backoffice)

---

## 🔧 **2. DEPLOY DO BACKOFFICE (CMS)**

### **Via Vercel CLI**

```powershell
# 1. Ir para pasta do CMS
cd C:\Users\ranz\Documents\azimut-site-vite-tailwind\azimut-cms

# 2. Deploy (primeira vez)
vercel

# 3. Quando perguntar:
# - Set up and deploy? Yes
# - Which scope? (escolha sua conta)
# - Link to existing project? No (primeira vez) ou Yes (se já existe)
# - Project name: azimut-backoffice
# - Directory: ./
# - Override settings? No

# 4. Deploy para produção
vercel --prod
```

### **Via Dashboard Vercel**

1. Acesse: https://vercel.com/new
2. Conecte repositório: `rranzenberger/azimut`
3. Configure:
   - **Framework Preset:** Next.js
   - **Root Directory:** `azimut-cms`
   - **Build Command:** `npm run build` (já inclui `prisma generate`)
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`
4. Clique em **"Deploy"**

---

## 🔐 **3. CONFIGURAR VARIÁVEIS DE AMBIENTE (BACKOFFICE)**

Após o deploy do backoffice, configure no Dashboard Vercel:

**Acesse:** Vercel → `azimut-backoffice` → Settings → Environment Variables

### **Variáveis Obrigatórias:**

```bash
# Banco de Dados (já configurado no Vercel Store - Neon)
DATABASE_URL=postgresql://neondb_owner:npg_W8VkhFvGTHj2@ep-crimson-firefly-ac8akobs-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require

# Autenticação
JWT_SECRET=seu-jwt-secret-aqui
NEXTAUTH_SECRET=seu-nextauth-secret-aqui
NEXTAUTH_URL=https://azimut-backoffice.vercel.app

# Site
SITE_URL=https://azmt.com.br

# Ambiente
NODE_ENV=production
```

**⚠️ IMPORTANTE:**
- A `DATABASE_URL` já está configurada no **Vercel Store** (Neon)
- Gere secrets com: `openssl rand -base64 32` ou use um gerador online
- Substitua `seu-jwt-secret-aqui` e `seu-nextauth-secret-aqui` pelos valores reais

---

## 🔗 **4. CONECTAR SITE AO BACKOFFICE**

Após deploy do backoffice, anote a URL: `https://azimut-backoffice.vercel.app`

No **site principal**, adicione variável de ambiente no Vercel:

```
VITE_CMS_API_URL=https://azimut-backoffice.vercel.app/api
```

**Como adicionar:**
1. Vercel → `azimut-site` → Settings → Environment Variables
2. Adicione: `VITE_CMS_API_URL` = `https://azimut-backoffice.vercel.app/api`
3. Marque para **Production**, **Preview** e **Development**
4. Faça um novo deploy: `vercel --prod`

---

## 🌐 **5. CONFIGURAR DOMÍNIOS (OPCIONAL)**

### **Site Principal:**
1. Vercel → `azimut-site` → Settings → Domains
2. Adicione: `azmt.com.br`, `www.azmt.com.br`, etc.
3. Configure DNS conforme instruções da Vercel

### **Backoffice:**
1. Vercel → `azimut-backoffice` → Settings → Domains
2. Adicione: `cms.azmt.com.br` (ou subdomínio desejado)

---

## ✅ **6. VERIFICAÇÃO PÓS-DEPLOY**

### **Site Principal:**
- [ ] Acesse: `https://azimut-site.vercel.app` (ou domínio customizado)
- [ ] Verifique se todas as páginas carregam
- [ ] Teste responsividade
- [ ] Verifique imagens/assets
- [ ] Teste login: `azimut` / `Azimut2025!Preview`

### **Backoffice:**
- [ ] Acesse: `https://azimut-backoffice.vercel.app`
- [ ] Teste login: `admin@azimut.com.br` / `Azimut2025!`
- [ ] Verifique dashboard
- [ ] Teste edição de conteúdo
- [ ] Verifique API: `https://azimut-backoffice.vercel.app/api/public/content`

---

## 📝 **7. COMANDOS ÚTEIS**

```powershell
# Ver status do deploy
vercel ls

# Ver logs
vercel logs

# Ver informações do projeto
vercel inspect

# Remover deploy
vercel rm <deployment-url>

# Re-deploy forçado
vercel --prod --force

# Ver variáveis de ambiente
vercel env ls
```

---

## 🆘 **PROBLEMAS COMUNS**

### **Build falha:**
```powershell
# Limpar e reinstalar
rm -rf node_modules dist
npm install
npm run build
```

### **Erro de variáveis de ambiente:**
- Verificar se todas estão configuradas no Vercel
- Verificar se `VITE_` está no início (site principal)
- Fazer novo deploy após adicionar variáveis

### **Erro de banco de dados (CMS):**
- Verificar se `DATABASE_URL` está configurada
- Verificar se banco Neon está ativo
- Verificar se `prisma generate` roda no build

### **Erro de autenticação:**
- Verificar se `NEXTAUTH_SECRET` e `JWT_SECRET` estão configurados
- Verificar se `NEXTAUTH_URL` está correto

---

## 📋 **CHECKLIST FINAL**

### **Antes do Deploy:**
- [ ] Build local funciona (`npm run build`)
- [ ] Testes locais passaram
- [ ] Código commitado no GitHub
- [ ] Variáveis de ambiente anotadas

### **Deploy Site:**
- [ ] Deploy concluído
- [ ] Site acessível
- [ ] Todas as páginas funcionam
- [ ] Assets carregam

### **Deploy Backoffice:**
- [ ] Deploy concluído
- [ ] Variáveis de ambiente configuradas
- [ ] Login funciona
- [ ] API responde

### **Integração:**
- [ ] Site conectado ao backoffice
- [ ] Variável `VITE_CMS_API_URL` configurada
- [ ] Teste de integração OK

---

## 🎉 **PRONTO!**

Seu site e backoffice estão no ar!

**URLs:**
- Site: `https://azimut-site.vercel.app` (ou domínio customizado)
- Backoffice: `https://azimut-backoffice.vercel.app`
- Dashboard Vercel: https://vercel.com/dashboard

---

**💡 DICA:** Mantenha este guia salvo junto com `ACESSOS_E_CREDENCIAIS.md` para referência futura!

