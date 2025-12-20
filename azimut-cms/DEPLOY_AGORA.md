# 🚀 Deploy Imediato - Passo a Passo Rápido

## ⚡ Deploy Rápido (15 minutos)

### 1️⃣ Verificar na Vercel (2 min)

1. Acesse: https://vercel.com/dashboard
2. Abra projeto **`azimut-backoffice`**
3. **Settings** → **General**
4. Verifique: **Root Directory** = `azimut-cms`
5. Se não estiver, altere e salve

### 2️⃣ Adicionar Variáveis de Ambiente (5 min)

**Settings** → **Environment Variables** → Adicione:

```
DATABASE_URL=postgresql://azimt_20255:SUA_SENHA@azimt_20255.postgresql.dbaas.com.br:5432/azimt_20255?sslmode=require
JWT_SECRET=azimut-cms-secret-jwt-2025-production-change-me
NODE_ENV=production
NEXT_PUBLIC_SUPABASE_URL=https://etkclzwowodislmickch.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua-chave-do-supabase
SITE_URL=https://azmt.com.br
```

⚠️ **Importante:**
- Substitua `SUA_SENHA` pela senha real do PostgreSQL
- Pegue `SUPABASE_SERVICE_ROLE_KEY` em: https://supabase.com/dashboard/project/etkclzwowodislmickch/settings/api
- Pegue `NEXT_PUBLIC_SUPABASE_URL` no mesmo lugar

### 3️⃣ Fazer Deploy (3 min)

**Opção A - Via GitHub (Recomendado):**
```bash
git add .
git commit -m "Fix: runtime nodejs + preparar deploy"
git push origin main
```

**Opção B - Manual na Vercel:**
- **Deployments** → **Redeploy** (último deploy)

### 4️⃣ Verificar Deploy (3 min)

1. Aguarde build completar (2-3 min)
2. Acesse: `https://azimut-backoffice.vercel.app`
3. Deve aparecer página inicial do CMS
4. Teste login: `/login`
   - Email: `admin@azimut.com.br`
   - Senha: `Azimut2025!`

### 5️⃣ Executar Seed (2 min)

**Localmente:**
```bash
cd azimut-cms
npm install
# Crie .env.local com as variáveis acima
npm run prisma:generate
npm run prisma:push
npm run prisma:seed
```

Isso cria o usuário admin no banco.

---

## ✅ Checklist Rápido

- [ ] Root Directory = `azimut-cms`
- [ ] Variáveis de ambiente adicionadas
- [ ] Deploy iniciado
- [ ] Build bem-sucedido
- [ ] Site acessível
- [ ] Seed executado
- [ ] Login funcionando

---

## 🎯 Após Deploy

### Testar Funcionalidades:

1. **Login:** `/login` → Fazer login
2. **Dashboard:** `/admin` → Ver estatísticas
3. **Upload:** `/admin/media` → Enviar imagem
4. **API:** `https://azimut-backoffice.vercel.app/api/geo` → Deve retornar JSON

### Manter Supabase Ativo:

- Use o backoffice regularmente
- Ou configure um cron job para chamar a API periodicamente
- Ou faça upgrade para Pro (sem pausa automática)

---

**Pronto! Em ~15 minutos você terá o backoffice no ar!** 🚀






## ⚡ Deploy Rápido (15 minutos)

### 1️⃣ Verificar na Vercel (2 min)

1. Acesse: https://vercel.com/dashboard
2. Abra projeto **`azimut-backoffice`**
3. **Settings** → **General**
4. Verifique: **Root Directory** = `azimut-cms`
5. Se não estiver, altere e salve

### 2️⃣ Adicionar Variáveis de Ambiente (5 min)

**Settings** → **Environment Variables** → Adicione:

```
DATABASE_URL=postgresql://azimt_20255:SUA_SENHA@azimt_20255.postgresql.dbaas.com.br:5432/azimt_20255?sslmode=require
JWT_SECRET=azimut-cms-secret-jwt-2025-production-change-me
NODE_ENV=production
NEXT_PUBLIC_SUPABASE_URL=https://etkclzwowodislmickch.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua-chave-do-supabase
SITE_URL=https://azmt.com.br
```

⚠️ **Importante:**
- Substitua `SUA_SENHA` pela senha real do PostgreSQL
- Pegue `SUPABASE_SERVICE_ROLE_KEY` em: https://supabase.com/dashboard/project/etkclzwowodislmickch/settings/api
- Pegue `NEXT_PUBLIC_SUPABASE_URL` no mesmo lugar

### 3️⃣ Fazer Deploy (3 min)

**Opção A - Via GitHub (Recomendado):**
```bash
git add .
git commit -m "Fix: runtime nodejs + preparar deploy"
git push origin main
```

**Opção B - Manual na Vercel:**
- **Deployments** → **Redeploy** (último deploy)

### 4️⃣ Verificar Deploy (3 min)

1. Aguarde build completar (2-3 min)
2. Acesse: `https://azimut-backoffice.vercel.app`
3. Deve aparecer página inicial do CMS
4. Teste login: `/login`
   - Email: `admin@azimut.com.br`
   - Senha: `Azimut2025!`

### 5️⃣ Executar Seed (2 min)

**Localmente:**
```bash
cd azimut-cms
npm install
# Crie .env.local com as variáveis acima
npm run prisma:generate
npm run prisma:push
npm run prisma:seed
```

Isso cria o usuário admin no banco.

---

## ✅ Checklist Rápido

- [ ] Root Directory = `azimut-cms`
- [ ] Variáveis de ambiente adicionadas
- [ ] Deploy iniciado
- [ ] Build bem-sucedido
- [ ] Site acessível
- [ ] Seed executado
- [ ] Login funcionando

---

## 🎯 Após Deploy

### Testar Funcionalidades:

1. **Login:** `/login` → Fazer login
2. **Dashboard:** `/admin` → Ver estatísticas
3. **Upload:** `/admin/media` → Enviar imagem
4. **API:** `https://azimut-backoffice.vercel.app/api/geo` → Deve retornar JSON

### Manter Supabase Ativo:

- Use o backoffice regularmente
- Ou configure um cron job para chamar a API periodicamente
- Ou faça upgrade para Pro (sem pausa automática)

---

**Pronto! Em ~15 minutos você terá o backoffice no ar!** 🚀







