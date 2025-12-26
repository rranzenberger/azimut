# 🚀 Guia de Deploy do Backoffice na Vercel

## 📋 Pré-requisitos

- ✅ Código commitado no GitHub
- ✅ Projeto `azimut-backoffice` criado na Vercel
- ✅ Acesso ao banco de dados PostgreSQL

---

## 🎯 PASSO 1: Verificar Configuração do Projeto na Vercel

### 1.1 Acessar o Projeto

1. Acesse: https://vercel.com/dashboard
2. Clique no projeto **`azimut-backoffice`**

### 1.2 Verificar Root Directory

1. Vá em **Settings** → **General**
2. Verifique se **Root Directory** está configurado como: **`azimut-cms`**
3. Se não estiver:
   - Clique em **Edit**
   - Digite: `azimut-cms`
   - Clique em **Save**

### 1.3 Verificar Build Settings

Confirme que está assim:
- **Framework Preset:** Next.js (automático)
- **Build Command:** `npm run build` (padrão)
- **Output Directory:** `.next` (padrão)
- **Install Command:** `npm install` (padrão)

---

## 🎯 PASSO 2: Configurar Variáveis de Ambiente

### 2.1 Acessar Environment Variables

1. No projeto, vá em **Settings** → **Environment Variables**

### 2.2 Adicionar Variáveis Obrigatórias

Adicione cada variável clicando em **Add New**:

#### **DATABASE_URL** (OBRIGATÓRIO)
```
Name: DATABASE_URL
Value: postgresql://azimt_20255:SUA_SENHA@azimt_20255.postgresql.dbaas.com.br:5432/azimt_20255?sslmode=require
Environments: Production, Preview, Development
```

⚠️ **Substitua `SUA_SENHA` pela senha real do banco!**

#### **JWT_SECRET** (OBRIGATÓRIO)
```
Name: JWT_SECRET
Value: azimut-cms-secret-jwt-2025-production-change-me
Environments: Production, Preview, Development
```

⚠️ **Use um valor aleatório forte em produção!**

#### **NODE_ENV** (OBRIGATÓRIO)
```
Name: NODE_ENV
Value: production
Environments: Production, Preview, Development
```

#### **NEXT_PUBLIC_SUPABASE_URL** (OBRIGATÓRIO se usar Supabase)
```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://your-project.supabase.co
Environments: Production, Preview, Development
```

#### **SUPABASE_SERVICE_ROLE_KEY** (OBRIGATÓRIO se usar Supabase)
```
Name: SUPABASE_SERVICE_ROLE_KEY
Value: your-service-role-key
Environments: Production, Preview, Development
```

#### **SITE_URL** (OPCIONAL)
```
Name: SITE_URL
Value: https://azmt.com.br
Environments: Production, Preview, Development
```

### 2.3 Variáveis Opcionais (IA)

Se quiser usar IA para scoring:

#### **DEEPSEEK_API_KEY** (Recomendado - Grátis)
```
Name: DEEPSEEK_API_KEY
Value: your-deepseek-api-key
Environments: Production, Preview, Development
```

Ou use OpenAI/Gemini:
- `OPENAI_API_KEY`
- `GEMINI_API_KEY`

---

## 🎯 PASSO 3: Fazer o Deploy

### Opção A: Deploy Automático (via GitHub)

1. Faça commit e push das mudanças:
   ```bash
   git add .
   git commit -m "Fix: preparar para deploy"
   git push origin main
   ```

2. A Vercel detectará automaticamente e fará o deploy

### Opção B: Deploy Manual

1. Na Vercel, vá em **Deployments**
2. Clique nos **3 pontinhos** do último deploy
3. Clique em **Redeploy**
4. Ou use o botão **Deploy** se houver

### Opção C: Deploy via CLI

```bash
cd azimut-cms
npm install -g vercel
vercel login
vercel --prod
```

---

## 🎯 PASSO 4: Verificar o Deploy

### 4.1 Verificar Build Logs

1. Vá em **Deployments**
2. Clique no deployment mais recente
3. Verifique os **Build Logs**:
   - Deve aparecer: `✓ Compiled successfully`
   - Não deve ter erros de TypeScript
   - Prisma deve gerar o client: `✓ Generated Prisma Client`

### 4.2 Verificar Runtime Logs

1. No mesmo deployment, veja **Runtime Logs**
2. Teste acessando: `https://azimut-backoffice.vercel.app`
3. Deve aparecer a página inicial do CMS

### 4.3 Testar Endpoints

Teste os endpoints principais:

```bash
# Geo detection
curl https://azimut-backoffice.vercel.app/api/geo

# Public content
curl https://azimut-backoffice.vercel.app/api/public/content?lang=pt&country=BR
```

---

## 🎯 PASSO 5: Executar Seed do Banco (Primeira Vez)

### 5.1 Localmente

Execute localmente para criar o usuário admin:

```bash
cd azimut-cms
npm install
cp .env.example .env.local
# Edite .env.local com as variáveis corretas
npm run prisma:generate
npm run prisma:push
npm run prisma:seed
```

### 5.2 Credenciais do Admin

Após o seed, você pode fazer login com:
- **Email:** `admin@azimut.com.br`
- **Senha:** `Azimut2025!`

---

## 🎯 PASSO 6: Configurar Domínio Customizado (Opcional)

### 6.1 Adicionar Domínio na Vercel

1. Vá em **Settings** → **Domains**
2. Clique em **Add Domain**
3. Digite: `cms.azimut.com.br`
4. Anote o valor CNAME que aparecer

### 6.2 Configurar DNS

Na Locaweb (ou seu provedor DNS):

1. Adicione um registro **CNAME**:
   - **Nome:** `cms`
   - **Valor:** `cname.vercel-dns.com` (ou o valor que a Vercel mostrar)
   - **TTL:** `3600`

2. Aguarde propagação (5-30 minutos)

---

## ❌ Problemas Comuns e Soluções

### Erro: "DEPLOYMENT_NOT_FOUND"

**Causa:** Root Directory incorreto ou projeto não deployado

**Solução:**
1. Verifique se Root Directory = `azimut-cms`
2. Faça um novo deploy

### Erro: "Prisma Client not generated"

**Causa:** Prisma não está gerando o client no build

**Solução:**
1. Verifique se `package.json` tem `"postinstall": "prisma generate"`
2. Faça redeploy

### Erro: "Cannot connect to database"

**Causa:** `DATABASE_URL` incorreta ou banco inacessível

**Solução:**
1. Verifique se `DATABASE_URL` está correta
2. Verifique se o banco permite conexões externas (firewall)
3. Teste a conexão localmente

### Erro: "JWT_SECRET is required"

**Causa:** Variável de ambiente não configurada

**Solução:**
1. Adicione `JWT_SECRET` nas Environment Variables
2. Faça redeploy

### Erro: "crypto is not defined" (Edge Runtime)

**Causa:** Rotas usando crypto no edge runtime

**Solução:** ✅ **JÁ CORRIGIDO!** As rotas `/api/admin/login` e `/api/admin/me` agora têm `export const runtime = 'nodejs'`

### Build falha com erros de TypeScript

**Causa:** Erros de tipagem no código

**Solução:**
1. Execute `npm run build` localmente para ver os erros
2. Corrija os erros
3. Faça commit e push

---

## ✅ Checklist Final

Antes de considerar o deploy completo:

- [ ] Root Directory configurado: `azimut-cms`
- [ ] Variáveis de ambiente adicionadas (DATABASE_URL, JWT_SECRET, etc.)
- [ ] Build bem-sucedido (sem erros)
- [ ] Site acessível: `https://azimut-backoffice.vercel.app`
- [ ] Endpoints funcionando (`/api/geo`, `/api/public/content`)
- [ ] Seed executado (usuário admin criado)
- [ ] Login funcionando (`/login`)
- [ ] Domínio customizado configurado (se aplicável)

---

## 🎉 Pronto!

Seu backoffice está deployado e funcionando! 🚀

**URL de produção:** `https://azimut-backoffice.vercel.app`

**Próximos passos:**
1. Fazer login e testar o admin
2. Configurar conteúdo inicial
3. Integrar com o site principal (atualizar `VITE_CMS_API_URL`)

---

**Dúvidas?** Consulte:
- [README.md](./README.md) - Documentação geral
- [QUICK_START.md](./QUICK_START.md) - Setup rápido
- [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) - Integração com site






## 📋 Pré-requisitos

- ✅ Código commitado no GitHub
- ✅ Projeto `azimut-backoffice` criado na Vercel
- ✅ Acesso ao banco de dados PostgreSQL

---

## 🎯 PASSO 1: Verificar Configuração do Projeto na Vercel

### 1.1 Acessar o Projeto

1. Acesse: https://vercel.com/dashboard
2. Clique no projeto **`azimut-backoffice`**

### 1.2 Verificar Root Directory

1. Vá em **Settings** → **General**
2. Verifique se **Root Directory** está configurado como: **`azimut-cms`**
3. Se não estiver:
   - Clique em **Edit**
   - Digite: `azimut-cms`
   - Clique em **Save**

### 1.3 Verificar Build Settings

Confirme que está assim:
- **Framework Preset:** Next.js (automático)
- **Build Command:** `npm run build` (padrão)
- **Output Directory:** `.next` (padrão)
- **Install Command:** `npm install` (padrão)

---

## 🎯 PASSO 2: Configurar Variáveis de Ambiente

### 2.1 Acessar Environment Variables

1. No projeto, vá em **Settings** → **Environment Variables**

### 2.2 Adicionar Variáveis Obrigatórias

Adicione cada variável clicando em **Add New**:

#### **DATABASE_URL** (OBRIGATÓRIO)
```
Name: DATABASE_URL
Value: postgresql://azimt_20255:SUA_SENHA@azimt_20255.postgresql.dbaas.com.br:5432/azimt_20255?sslmode=require
Environments: Production, Preview, Development
```

⚠️ **Substitua `SUA_SENHA` pela senha real do banco!**

#### **JWT_SECRET** (OBRIGATÓRIO)
```
Name: JWT_SECRET
Value: azimut-cms-secret-jwt-2025-production-change-me
Environments: Production, Preview, Development
```

⚠️ **Use um valor aleatório forte em produção!**

#### **NODE_ENV** (OBRIGATÓRIO)
```
Name: NODE_ENV
Value: production
Environments: Production, Preview, Development
```

#### **NEXT_PUBLIC_SUPABASE_URL** (OBRIGATÓRIO se usar Supabase)
```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://your-project.supabase.co
Environments: Production, Preview, Development
```

#### **SUPABASE_SERVICE_ROLE_KEY** (OBRIGATÓRIO se usar Supabase)
```
Name: SUPABASE_SERVICE_ROLE_KEY
Value: your-service-role-key
Environments: Production, Preview, Development
```

#### **SITE_URL** (OPCIONAL)
```
Name: SITE_URL
Value: https://azmt.com.br
Environments: Production, Preview, Development
```

### 2.3 Variáveis Opcionais (IA)

Se quiser usar IA para scoring:

#### **DEEPSEEK_API_KEY** (Recomendado - Grátis)
```
Name: DEEPSEEK_API_KEY
Value: your-deepseek-api-key
Environments: Production, Preview, Development
```

Ou use OpenAI/Gemini:
- `OPENAI_API_KEY`
- `GEMINI_API_KEY`

---

## 🎯 PASSO 3: Fazer o Deploy

### Opção A: Deploy Automático (via GitHub)

1. Faça commit e push das mudanças:
   ```bash
   git add .
   git commit -m "Fix: preparar para deploy"
   git push origin main
   ```

2. A Vercel detectará automaticamente e fará o deploy

### Opção B: Deploy Manual

1. Na Vercel, vá em **Deployments**
2. Clique nos **3 pontinhos** do último deploy
3. Clique em **Redeploy**
4. Ou use o botão **Deploy** se houver

### Opção C: Deploy via CLI

```bash
cd azimut-cms
npm install -g vercel
vercel login
vercel --prod
```

---

## 🎯 PASSO 4: Verificar o Deploy

### 4.1 Verificar Build Logs

1. Vá em **Deployments**
2. Clique no deployment mais recente
3. Verifique os **Build Logs**:
   - Deve aparecer: `✓ Compiled successfully`
   - Não deve ter erros de TypeScript
   - Prisma deve gerar o client: `✓ Generated Prisma Client`

### 4.2 Verificar Runtime Logs

1. No mesmo deployment, veja **Runtime Logs**
2. Teste acessando: `https://azimut-backoffice.vercel.app`
3. Deve aparecer a página inicial do CMS

### 4.3 Testar Endpoints

Teste os endpoints principais:

```bash
# Geo detection
curl https://azimut-backoffice.vercel.app/api/geo

# Public content
curl https://azimut-backoffice.vercel.app/api/public/content?lang=pt&country=BR
```

---

## 🎯 PASSO 5: Executar Seed do Banco (Primeira Vez)

### 5.1 Localmente

Execute localmente para criar o usuário admin:

```bash
cd azimut-cms
npm install
cp .env.example .env.local
# Edite .env.local com as variáveis corretas
npm run prisma:generate
npm run prisma:push
npm run prisma:seed
```

### 5.2 Credenciais do Admin

Após o seed, você pode fazer login com:
- **Email:** `admin@azimut.com.br`
- **Senha:** `Azimut2025!`

---

## 🎯 PASSO 6: Configurar Domínio Customizado (Opcional)

### 6.1 Adicionar Domínio na Vercel

1. Vá em **Settings** → **Domains**
2. Clique em **Add Domain**
3. Digite: `cms.azimut.com.br`
4. Anote o valor CNAME que aparecer

### 6.2 Configurar DNS

Na Locaweb (ou seu provedor DNS):

1. Adicione um registro **CNAME**:
   - **Nome:** `cms`
   - **Valor:** `cname.vercel-dns.com` (ou o valor que a Vercel mostrar)
   - **TTL:** `3600`

2. Aguarde propagação (5-30 minutos)

---

## ❌ Problemas Comuns e Soluções

### Erro: "DEPLOYMENT_NOT_FOUND"

**Causa:** Root Directory incorreto ou projeto não deployado

**Solução:**
1. Verifique se Root Directory = `azimut-cms`
2. Faça um novo deploy

### Erro: "Prisma Client not generated"

**Causa:** Prisma não está gerando o client no build

**Solução:**
1. Verifique se `package.json` tem `"postinstall": "prisma generate"`
2. Faça redeploy

### Erro: "Cannot connect to database"

**Causa:** `DATABASE_URL` incorreta ou banco inacessível

**Solução:**
1. Verifique se `DATABASE_URL` está correta
2. Verifique se o banco permite conexões externas (firewall)
3. Teste a conexão localmente

### Erro: "JWT_SECRET is required"

**Causa:** Variável de ambiente não configurada

**Solução:**
1. Adicione `JWT_SECRET` nas Environment Variables
2. Faça redeploy

### Erro: "crypto is not defined" (Edge Runtime)

**Causa:** Rotas usando crypto no edge runtime

**Solução:** ✅ **JÁ CORRIGIDO!** As rotas `/api/admin/login` e `/api/admin/me` agora têm `export const runtime = 'nodejs'`

### Build falha com erros de TypeScript

**Causa:** Erros de tipagem no código

**Solução:**
1. Execute `npm run build` localmente para ver os erros
2. Corrija os erros
3. Faça commit e push

---

## ✅ Checklist Final

Antes de considerar o deploy completo:

- [ ] Root Directory configurado: `azimut-cms`
- [ ] Variáveis de ambiente adicionadas (DATABASE_URL, JWT_SECRET, etc.)
- [ ] Build bem-sucedido (sem erros)
- [ ] Site acessível: `https://azimut-backoffice.vercel.app`
- [ ] Endpoints funcionando (`/api/geo`, `/api/public/content`)
- [ ] Seed executado (usuário admin criado)
- [ ] Login funcionando (`/login`)
- [ ] Domínio customizado configurado (se aplicável)

---

## 🎉 Pronto!

Seu backoffice está deployado e funcionando! 🚀

**URL de produção:** `https://azimut-backoffice.vercel.app`

**Próximos passos:**
1. Fazer login e testar o admin
2. Configurar conteúdo inicial
3. Integrar com o site principal (atualizar `VITE_CMS_API_URL`)

---

**Dúvidas?** Consulte:
- [README.md](./README.md) - Documentação geral
- [QUICK_START.md](./QUICK_START.md) - Setup rápido
- [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) - Integração com site











