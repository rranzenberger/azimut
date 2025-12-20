# 🚀 DEPLOY E INTEGRAÇÃO COMPLETA - PASSO A PASSO

## 📋 Status Atual

✅ **CMS Local** - Funcionando em `http://localhost:3001`  
✅ **UI Melhorada** - Interface profissional e responsiva  
⏳ **Deploy Vercel** - Próximo passo  
⏳ **Integração Site** - Após deploy  

---

## 🎯 PRIORIDADE 1: Deploy do CMS na Vercel

### 📝 PASSO 1.1: Verificar/Criar Projeto na Vercel

1. **Acesse:** https://vercel.com/dashboard
2. **Faça login** com sua conta (GitHub recomendado)
3. **Verifique** se já existe projeto `azimut-backoffice` ou `azimut-cms`
4. **Se não existir:**
   - Clique em **"Add New"** → **"Project"**
   - Conecte seu repositório GitHub
   - Selecione o repositório do projeto
   - Clique em **"Import"**

---

### ⚙️ PASSO 1.2: Configurar Root Directory

1. No projeto na Vercel, vá em **Settings** → **General**
2. Role até **Root Directory**
3. Clique em **Edit**
4. Configure:
   - **Root Directory**: `azimut-cms`
   - **Framework Preset**: Next.js (deve detectar automaticamente)
   - **Build Command**: `npm run build` (já configurado)
   - **Output Directory**: `.next` (já configurado)
5. Clique em **Save**

---

### 🔑 PASSO 1.3: Configurar Variáveis de Ambiente

1. No projeto na Vercel, vá em **Settings** → **Environment Variables**
2. Adicione cada variável abaixo:

#### Variáveis Obrigatórias:

```bash
# Database (Neon/PostgreSQL)
DATABASE_URL=postgresql://usuario:senha@host:5432/database

# JWT Secret (gere um novo para produção)
JWT_SECRET=azimut-cms-secret-jwt-2025-production-[GERE-UM-NOVO]

# Node Environment
NODE_ENV=production

# Supabase (Storage de imagens)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJh... (service_role key)

# Site URL (produção)
SITE_URL=https://azmt.com.br
```

#### Variáveis Opcionais (IA):

```bash
# IA Provider (DeepSeek recomendado)
AI_PROVIDER=deepseek
DEEPSEEK_API_KEY=sk-... (obtenha em https://platform.deepseek.com/)
```

#### ⚠️ IMPORTANTE:

- **Marque TODAS as variáveis** para:
  - ✅ Production
  - ✅ Preview  
  - ✅ Development

- **Para gerar JWT_SECRET seguro:**
  ```bash
  openssl rand -base64 32
  ```

---

### 📦 PASSO 1.4: Fazer Deploy

#### Opção A: Via GitHub (Recomendado)

1. **Commit e push:**
   ```bash
   cd azimut-cms
   git add .
   git commit -m "Preparar deploy para Vercel"
   git push origin main
   ```

2. **Vercel detecta automaticamente** e inicia o deploy

3. **Aguarde** o build completar (2-5 minutos)

#### Opção B: Deploy Manual

1. Na Vercel, vá em **Deployments**
2. Clique em **Redeploy** (se já existe) ou **Deploy**
3. Aguarde o build

---

### 🌱 PASSO 1.5: Executar Seed (Criar Usuário Admin)

Após o deploy, você precisa executar o seed para criar o usuário admin.

#### Opção A: Via Vercel CLI (Recomendado)

1. **Instale Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Faça login:**
   ```bash
   vercel login
   ```

3. **Link o projeto:**
   ```bash
   cd azimut-cms
   vercel link
   ```

4. **Execute o seed remotamente:**
   ```bash
   vercel env pull .env.production
   # Configure DATABASE_URL no .env.production
   npm run prisma:push
   npm run prisma:seed
   ```

#### Opção B: Via Prisma Studio (Local)

1. **Configure `.env.local`** com as mesmas variáveis da Vercel
2. **Execute localmente:**
   ```bash
   cd azimut-cms
   npm run prisma:push
   npm run prisma:seed
   ```

Isso cria:
- ✅ Usuário admin: `admin@azimut.com.br`
- ✅ Senha: `Azimut2025!`

---

### ✅ PASSO 1.6: Testar CMS em Produção

1. **Acesse:** `https://seu-projeto.vercel.app`
2. **Teste login:** `https://seu-projeto.vercel.app/login`
   - Email: `admin@azimut.com.br`
   - Senha: `Azimut2025!`
3. **Teste API pública:**
   ```bash
   curl https://seu-projeto.vercel.app/api/geo
   ```
   Deve retornar: `{"country":"BR","detected":true}`

4. **Anote a URL do CMS:** `https://seu-projeto.vercel.app`

---

## 🔗 PRIORIDADE 2: Conectar Site Principal ao CMS

### 📝 PASSO 2.1: Configurar Variável no Site Principal

1. **Acesse o projeto do site** na Vercel
2. Vá em **Settings** → **Environment Variables**
3. **Adicione:**
   ```bash
   VITE_CMS_API_URL=https://seu-projeto.vercel.app/api
   ```
   ⚠️ **Substitua** `seu-projeto.vercel.app` pela URL real do CMS!

4. **Marque para:**
   - ✅ Production
   - ✅ Preview
   - ✅ Development

---

### 📝 PASSO 2.2: Criar/Atualizar .env Local (Desenvolvimento)

Na raiz do projeto (`azimut-site-vite-tailwind`):

1. **Crie/edite `.env`:**
   ```bash
   # URL do CMS (local para dev, produção para build)
   VITE_CMS_API_URL=http://localhost:3001/api
   ```

2. **Para produção**, use:
   ```bash
   VITE_CMS_API_URL=https://seu-projeto.vercel.app/api
   ```

---

### ✅ PASSO 2.3: Verificar Integração nas Páginas

O código já está pronto! Verifique se está sendo usado:

#### Páginas que devem usar:

1. **`src/pages/Home.tsx`**
   - ✅ Deve usar `useAzimutContent()` hook
   - ✅ Deve usar `trackPageView()` do analytics

2. **`src/pages/Contact.tsx`**
   - ✅ Deve usar `submitLead()` para enviar leads
   - ✅ Budget Wizard integrado

3. **`src/pages/Work.tsx`**
   - ✅ Deve usar `trackProjectInteraction()` para rastrear visualizações

#### Verificar arquivos:

```bash
# Verificar se analytics está sendo usado
grep -r "trackPageView" src/pages/

# Verificar se useAzimutContent está sendo usado
grep -r "useAzimutContent" src/pages/

# Verificar se submitLead está sendo usado
grep -r "submitLead" src/pages/
```

---

### 🧪 PASSO 2.4: Testar Integração

1. **Rode o site localmente:**
   ```bash
   npm run dev
   ```

2. **Abra DevTools** (F12) → **Network tab**

3. **Navegue pelo site:**
   - Acesse a Home
   - Veja um projeto
   - Preencha o formulário de contato

4. **Verifique as chamadas:**
   - ✅ `POST /api/track` - Tracking de comportamento
   - ✅ `GET /api/public/content` - Conteúdo dinâmico
   - ✅ `POST /api/leads` - Envio de leads

5. **Se houver erros:**
   - Verifique se `VITE_CMS_API_URL` está configurado
   - Verifique se o CMS está acessível
   - Verifique CORS no CMS (deve permitir origem do site)

---

### 🚀 PASSO 2.5: Fazer Redeploy do Site

1. **Commit e push:**
   ```bash
   git add .
   git commit -m "Integrar com CMS em produção"
   git push origin main
   ```

2. **Vercel faz deploy automaticamente**

3. **Teste em produção:**
   - Acesse o site em produção
   - Verifique Network tab
   - Confirme que APIs estão sendo chamadas

---

## 🎯 Checklist Final

### CMS (Backoffice):
- [ ] Projeto criado na Vercel
- [ ] Root Directory configurado (`azimut-cms`)
- [ ] Todas as variáveis de ambiente configuradas
- [ ] Deploy realizado com sucesso
- [ ] Seed executado (usuário admin criado)
- [ ] Login funcionando
- [ ] APIs públicas acessíveis

### Site Principal:
- [ ] `VITE_CMS_API_URL` configurado na Vercel
- [ ] `.env` local configurado (desenvolvimento)
- [ ] Páginas usando hooks de integração
- [ ] Tracking funcionando
- [ ] Formulário enviando leads
- [ ] Redeploy realizado

### Testes:
- [ ] CMS acessível em produção
- [ ] Site consumindo APIs do CMS
- [ ] Tracking enviando dados
- [ ] Leads sendo capturados
- [ ] Sem erros no console

---

## 🆘 Troubleshooting

### Erro: "Cannot connect to database"
- Verifique `DATABASE_URL` na Vercel
- Confirme que o banco está acessível publicamente
- Verifique firewall do banco

### Erro: "CORS policy"
- Adicione origem do site no CMS
- Verifique `next.config.js` para CORS

### Erro: "API not found"
- Verifique `VITE_CMS_API_URL` no site
- Confirme que a URL do CMS está correta
- Teste acessar a API diretamente no navegador

### Erro: "Authentication failed"
- Verifique `JWT_SECRET` na Vercel
- Confirme que é o mesmo usado no seed

---

## 📚 Próximos Passos (Opcional)

1. **Configurar IA (DeepSeek/Gemini)**
   - Adicionar `DEEPSEEK_API_KEY` na Vercel
   - Testar análise de visitantes

2. **Configurar Notificações de Email**
   - Email quando novo lead chega
   - Usar Resend/SendGrid

3. **Monitoramento**
   - Configurar Vercel Analytics
   - Configurar logs

---

**🚀 Pronto! Seu CMS está no ar e o site está integrado!**

