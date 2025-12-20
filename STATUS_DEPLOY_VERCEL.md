# 📊 Status do Deploy na Vercel

## ✅ Informações do Projeto

**Nome do Projeto:** `azimut-backoffice`  
**URL Esperada:** `https://azimut-backoffice.vercel.app`  
**Repositório:** `rranzenberger/azimut`  
**Root Directory:** `azimut-cms`  

---

## 📋 O Que Já Foi Feito

### ✅ Configuração Inicial
- [x] Projeto criado na Vercel (ontem)
- [x] Repositório conectado ao GitHub
- [x] Código commitado e enviado (agora)

### ⏳ O Que Falta Fazer

#### 1. Verificar/Configurar Root Directory
- [ ] Acessar: https://vercel.com/dashboard
- [ ] Abrir projeto `azimut-backoffice`
- [ ] Settings → General → Root Directory
- [ ] Verificar se está: `azimut-cms`
- [ ] Se não estiver, alterar e salvar

#### 2. Adicionar Variáveis de Ambiente
- [ ] Settings → Environment Variables
- [ ] Adicionar as 6 variáveis obrigatórias:

```
DATABASE_URL=postgresql://neondb_owner:npg_W8VkhFvGTHj2@ep-crimson-firefly-ac8akobs-pooler.sa-east-1.neon.tech/neondb?sslmode=require

JWT_SECRET=H/sK/83/Ne+sZgp/t0Olc+rCQArOFwuOBBfCnBqrlqc=

NODE_ENV=production

NEXT_PUBLIC_SUPABASE_URL=(copie do seu .env.local)

SUPABASE_SERVICE_ROLE_KEY=(copie do seu .env.local)

SITE_URL=https://azmt.com.br
```

⚠️ **IMPORTANTE:**
- Marque TODAS para: Production, Preview e Development
- Use o JWT_SECRET gerado: `H/sK/83/Ne+sZgp/t0Olc+rCQArOFwuOBBfCnBqrlqc=`

#### 3. Fazer Redeploy
- [ ] Deployments → Redeploy (último deploy)
- [ ] Aguardar build completar (2-5 minutos)

#### 4. Executar Seed
- [ ] Localmente: `cd azimut-cms && npm run prisma:seed`
- [ ] Isso cria o usuário admin

#### 5. Testar
- [ ] Acessar: `https://azimut-backoffice.vercel.app`
- [ ] Testar login: `/login`
- [ ] Testar API: `/api/geo`

---

## 🔑 Valores para Copiar

### DATABASE_URL
Copie do seu `azimut-cms\.env.local`:
- Procure a linha: `DATABASE_URL=...`
- Copie o valor completo

### NEXT_PUBLIC_SUPABASE_URL
Copie do seu `azimut-cms\.env.local`:
- Procure a linha: `NEXT_PUBLIC_SUPABASE_URL=...`
- Copie o valor completo

### SUPABASE_SERVICE_ROLE_KEY
Copie do seu `azimut-cms\.env.local`:
- Procure a linha: `SUPABASE_SERVICE_ROLE_KEY=...`
- Copie o valor completo (é uma chave longa)

### JWT_SECRET (Já Gerado)
```
H/sK/83/Ne+sZgp/t0Olc+rCQArOFwuOBBfCnBqrlqc=
```

---

## 🚀 Próximos Passos Rápidos

1. **Acesse:** https://vercel.com/dashboard
2. **Abra:** projeto `azimut-backoffice`
3. **Configure:** Root Directory = `azimut-cms` (se não estiver)
4. **Adicione:** as 6 variáveis de ambiente
5. **Redeploy:** Deployments → Redeploy
6. **Aguarde:** build completar
7. **Execute:** `cd azimut-cms && npm run prisma:seed`
8. **Teste:** `https://azimut-backoffice.vercel.app/login`

---

## 📝 Credenciais do Admin

Após executar o seed:
- **Email:** `admin@azimut.com.br`
- **Senha:** `Azimut2025!`

---

**Tudo pronto! Só falta configurar as variáveis na Vercel!** 🚀

