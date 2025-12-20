# 🚀 DEPLOY NA VERCEL - GUIA VISUAL PASSO A PASSO

## ✅ Status da Sua Configuração

✅ **DATABASE_URL** - Configurado  
✅ **SUPABASE_URL** - Configurado  
⚠️ **JWT_SECRET** - Precisa gerar para produção  

---

## 📋 PASSO 1: Acessar Vercel

1. **Abra:** https://vercel.com/dashboard
2. **Faça login** (GitHub recomendado)

---

## 📋 PASSO 2: Verificar/Criar Projeto

### Se JÁ TEM projeto:
- Abra o projeto existente
- Vá para **PASSO 3**

### Se NÃO TEM projeto:
1. Clique em **"Add New"** → **"Project"**
2. Conecte seu repositório GitHub
3. Selecione o repositório do projeto
4. Clique em **"Import"**
5. **NÃO configure nada ainda**, apenas importe

---

## 📋 PASSO 3: Configurar Root Directory

1. No projeto, vá em **Settings** (ícone de engrenagem)
2. Clique em **General**
3. Role até **Root Directory**
4. Clique em **Edit**
5. Digite: `azimut-cms`
6. Clique em **Save**

✅ **Pronto!** Agora a Vercel sabe onde está o código do CMS.

---

## 📋 PASSO 4: Gerar JWT_SECRET

Execute no PowerShell:

```powershell
.\scripts\gerar-jwt-secret.ps1
```

Ou gere manualmente:
- Acesse: https://generate-secret.vercel.app/32
- Copie o valor gerado

**Anote este valor!** Você vai precisar na próxima etapa.

---

## 📋 PASSO 5: Configurar Variáveis de Ambiente

1. No projeto na Vercel, vá em **Settings** → **Environment Variables**
2. Clique em **Add New**
3. Adicione **cada variável** abaixo:

### Variável 1: DATABASE_URL

- **Key:** `DATABASE_URL`
- **Value:** (copie do seu `azimut-cms\.env.local`)
  - Procure a linha que começa com `DATABASE_URL=`
  - Copie o valor completo (incluindo aspas se tiver)
- **Environments:** ✅ Production ✅ Preview ✅ Development
- Clique em **Save**

### Variável 2: JWT_SECRET

- **Key:** `JWT_SECRET`
- **Value:** (use o valor gerado no PASSO 4)
  - Exemplo: `vITLKYaR2twRFVJCZxHOFXfzDp7/lrnbnweqMGrx2RM=`
- **Environments:** ✅ Production ✅ Preview ✅ Development
- Clique em **Save**

### Variável 3: NODE_ENV

- **Key:** `NODE_ENV`
- **Value:** `production`
- **Environments:** ✅ Production ✅ Preview ✅ Development
- Clique em **Save**

### Variável 4: NEXT_PUBLIC_SUPABASE_URL

- **Key:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** (copie do seu `azimut-cms\.env.local`)
  - Procure a linha que começa com `NEXT_PUBLIC_SUPABASE_URL=`
  - Copie o valor completo
- **Environments:** ✅ Production ✅ Preview ✅ Development
- Clique em **Save**

### Variável 5: SUPABASE_SERVICE_ROLE_KEY

- **Key:** `SUPABASE_SERVICE_ROLE_KEY`
- **Value:** (copie do seu `azimut-cms\.env.local`)
  - Procure a linha que começa com `SUPABASE_SERVICE_ROLE_KEY=`
  - Copie o valor completo (é uma chave longa que começa com `eyJh...`)
- **Environments:** ✅ Production ✅ Preview ✅ Development
- Clique em **Save**

### Variável 6: SITE_URL

- **Key:** `SITE_URL`
- **Value:** `https://azmt.com.br`
- **Environments:** ✅ Production ✅ Preview ✅ Development
- Clique em **Save**

### Variável 7 (Opcional): DEEPSEEK_API_KEY

- **Key:** `DEEPSEEK_API_KEY`
- **Value:** (se você tiver, copie do `.env.local`)
- **Environments:** ✅ Production ✅ Preview ✅ Development
- Clique em **Save**

---

## 📋 PASSO 6: Fazer Deploy

### Opção A: Via GitHub (Recomendado)

1. Abra o terminal na pasta do projeto
2. Execute:

```powershell
cd azimut-cms
git add .
git commit -m "Preparar deploy para Vercel"
git push origin main
```

3. A Vercel **detecta automaticamente** e inicia o deploy
4. Aguarde 2-5 minutos

### Opção B: Deploy Manual

1. Na Vercel, vá em **Deployments**
2. Clique em **"Redeploy"** (se já existe) ou **"Deploy"**
3. Aguarde 2-5 minutos

---

## 📋 PASSO 7: Verificar Build

1. Na Vercel, vá em **Deployments**
2. Clique no último deploy
3. Veja os **Logs**

### ✅ Se build foi bem-sucedido:
- Você verá: "Build Completed"
- Anote a URL: `https://seu-projeto.vercel.app`

### ❌ Se build falhou:
- Veja os erros nos logs
- Erros comuns:
  - `DATABASE_URL` incorreta → Verifique a URL
  - Variável faltando → Adicione todas as variáveis
  - Erro de sintaxe → Verifique o código

---

## 📋 PASSO 8: Executar Seed (Criar Usuário Admin)

Após o deploy, você precisa criar o usuário admin no banco:

1. Abra o terminal na pasta `azimut-cms`
2. Execute:

```powershell
cd azimut-cms
npm run prisma:push
npm run prisma:seed
```

Você verá:
```
✅ Database seeded successfully!

📝 Credenciais do Admin:
   Email: admin@azimut.com.br
   Senha: Azimut2025!
```

---

## 📋 PASSO 9: Testar CMS em Produção

1. **Acesse:** `https://seu-projeto.vercel.app`
2. **Teste login:**
   - URL: `https://seu-projeto.vercel.app/login`
   - Email: `admin@azimut.com.br`
   - Senha: `Azimut2025!`
3. **Teste API:**
   - URL: `https://seu-projeto.vercel.app/api/geo`
   - Deve retornar: `{"country":"BR","detected":true}`

---

## ✅ Checklist Final

- [ ] Projeto criado/aberto na Vercel
- [ ] Root Directory = `azimut-cms`
- [ ] Todas as 6 variáveis adicionadas
- [ ] Todas marcadas para Production, Preview e Development
- [ ] Deploy realizado
- [ ] Build bem-sucedido
- [ ] Seed executado
- [ ] Login funcionando
- [ ] API `/api/geo` funcionando

---

## 🎯 Próximo Passo: Conectar Site Principal

Após o CMS estar no ar:

1. **Anote a URL do CMS:** `https://seu-projeto.vercel.app`
2. **Leia:** `DEPLOY_E_INTEGRACAO_COMPLETA.md` → **PRIORIDADE 2**
3. **Adicione no site principal:**
   - Variável: `VITE_CMS_API_URL`
   - Valor: `https://seu-projeto.vercel.app/api`

---

## 🆘 Precisa de Ajuda?

Se algo der errado:

1. **Verifique os logs** na Vercel (Deployments > Logs)
2. **Confirme todas as variáveis** estão corretas
3. **Teste localmente** primeiro (`npm run dev`)
4. **Verifique** se o banco está acessível

---

**🚀 Pronto! Siga os passos acima e seu CMS estará no ar!**


