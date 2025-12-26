# ✅ Checklist de Deploy - Azimut Backoffice

Use este checklist para garantir que tudo está configurado corretamente antes do deploy.

## 📋 Antes do Deploy

### Código
- [x] Código commitado no GitHub
- [x] Runtime Node.js configurado nas rotas que usam crypto (`/api/admin/login`, `/api/admin/me`)
- [x] Tipagem correta no `image-optimizer.ts`
- [x] Sem erros de TypeScript (`npm run build` local passa)

### Configuração na Vercel

#### Settings → General
- [ ] Root Directory: `azimut-cms`
- [ ] Framework Preset: Next.js
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `.next`

#### Settings → Environment Variables
- [ ] `DATABASE_URL` (obrigatório)
- [ ] `JWT_SECRET` (obrigatório)
- [ ] `NODE_ENV=production` (obrigatório)
- [ ] `NEXT_PUBLIC_SUPABASE_URL` (se usar Supabase)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` (se usar Supabase)
- [ ] `SITE_URL` (opcional)
- [ ] `DEEPSEEK_API_KEY` (opcional - para IA)

### Banco de Dados
- [ ] Banco PostgreSQL acessível
- [ ] `DATABASE_URL` testada localmente
- [ ] Seed executado (usuário admin criado)

## 🚀 Durante o Deploy

- [ ] Deploy iniciado (via GitHub push ou manual)
- [ ] Build logs sem erros
- [ ] Prisma Client gerado com sucesso
- [ ] Deploy concluído com status "Ready"

## ✅ Após o Deploy

### Testes Básicos
- [ ] Site acessível: `https://azimut-backoffice.vercel.app`
- [ ] Página inicial carrega
- [ ] Endpoint `/api/geo` funciona
- [ ] Endpoint `/api/public/content` funciona

### Testes de Autenticação
- [ ] Página `/login` carrega
- [ ] Login funciona com credenciais do seed
- [ ] Dashboard `/admin` acessível após login
- [ ] Logout funciona

### Testes de API
- [ ] `GET /api/geo` retorna país
- [ ] `GET /api/public/content?lang=pt&country=BR` retorna conteúdo
- [ ] `POST /api/track` aceita eventos
- [ ] `POST /api/leads` cria leads

## 🌐 Domínio Customizado (Opcional)

- [ ] Domínio `cms.azimut.com.br` adicionado na Vercel
- [ ] DNS configurado (CNAME)
- [ ] DNS propagado (teste com `nslookup cms.azimut.com.br`)
- [ ] SSL certificado (automático na Vercel)

## 📊 Monitoramento

- [ ] Logs da Vercel sem erros recorrentes
- [ ] Métricas de uso dentro dos limites
- [ ] Alertas configurados (opcional)

---

## 🆘 Se Algo Der Errado

### Erro: "DEPLOYMENT_NOT_FOUND"
→ Verifique Root Directory = `azimut-cms`

### Erro: "Prisma Client not generated"
→ Verifique se `package.json` tem `"postinstall": "prisma generate"`

### Erro: "Cannot connect to database"
→ Verifique `DATABASE_URL` e firewall do banco

### Erro: "crypto is not defined"
→ ✅ Já corrigido! Rotas têm `export const runtime = 'nodejs'`

### Build falha
→ Execute `npm run build` localmente para ver erros detalhados

---

**Documentação completa:** [DEPLOY_VERCEL.md](./DEPLOY_VERCEL.md)






Use este checklist para garantir que tudo está configurado corretamente antes do deploy.

## 📋 Antes do Deploy

### Código
- [x] Código commitado no GitHub
- [x] Runtime Node.js configurado nas rotas que usam crypto (`/api/admin/login`, `/api/admin/me`)
- [x] Tipagem correta no `image-optimizer.ts`
- [x] Sem erros de TypeScript (`npm run build` local passa)

### Configuração na Vercel

#### Settings → General
- [ ] Root Directory: `azimut-cms`
- [ ] Framework Preset: Next.js
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `.next`

#### Settings → Environment Variables
- [ ] `DATABASE_URL` (obrigatório)
- [ ] `JWT_SECRET` (obrigatório)
- [ ] `NODE_ENV=production` (obrigatório)
- [ ] `NEXT_PUBLIC_SUPABASE_URL` (se usar Supabase)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` (se usar Supabase)
- [ ] `SITE_URL` (opcional)
- [ ] `DEEPSEEK_API_KEY` (opcional - para IA)

### Banco de Dados
- [ ] Banco PostgreSQL acessível
- [ ] `DATABASE_URL` testada localmente
- [ ] Seed executado (usuário admin criado)

## 🚀 Durante o Deploy

- [ ] Deploy iniciado (via GitHub push ou manual)
- [ ] Build logs sem erros
- [ ] Prisma Client gerado com sucesso
- [ ] Deploy concluído com status "Ready"

## ✅ Após o Deploy

### Testes Básicos
- [ ] Site acessível: `https://azimut-backoffice.vercel.app`
- [ ] Página inicial carrega
- [ ] Endpoint `/api/geo` funciona
- [ ] Endpoint `/api/public/content` funciona

### Testes de Autenticação
- [ ] Página `/login` carrega
- [ ] Login funciona com credenciais do seed
- [ ] Dashboard `/admin` acessível após login
- [ ] Logout funciona

### Testes de API
- [ ] `GET /api/geo` retorna país
- [ ] `GET /api/public/content?lang=pt&country=BR` retorna conteúdo
- [ ] `POST /api/track` aceita eventos
- [ ] `POST /api/leads` cria leads

## 🌐 Domínio Customizado (Opcional)

- [ ] Domínio `cms.azimut.com.br` adicionado na Vercel
- [ ] DNS configurado (CNAME)
- [ ] DNS propagado (teste com `nslookup cms.azimut.com.br`)
- [ ] SSL certificado (automático na Vercel)

## 📊 Monitoramento

- [ ] Logs da Vercel sem erros recorrentes
- [ ] Métricas de uso dentro dos limites
- [ ] Alertas configurados (opcional)

---

## 🆘 Se Algo Der Errado

### Erro: "DEPLOYMENT_NOT_FOUND"
→ Verifique Root Directory = `azimut-cms`

### Erro: "Prisma Client not generated"
→ Verifique se `package.json` tem `"postinstall": "prisma generate"`

### Erro: "Cannot connect to database"
→ Verifique `DATABASE_URL` e firewall do banco

### Erro: "crypto is not defined"
→ ✅ Já corrigido! Rotas têm `export const runtime = 'nodejs'`

### Build falha
→ Execute `npm run build` localmente para ver erros detalhados

---

**Documentação completa:** [DEPLOY_VERCEL.md](./DEPLOY_VERCEL.md)











