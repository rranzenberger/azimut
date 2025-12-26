# 🔐 ACESSOS E CREDENCIAIS - AZIMUT

**⚠️ ATENÇÃO: Este arquivo contém informações sensíveis. NÃO compartilhe publicamente!**

---

## 📍 LOCALIZAÇÃO DO PROJETO

### **Caminho Local (Windows):**
```
C:\Users\ranz\Documents\azimut-site-vite-tailwind
```

### **Estrutura:**
```
azimut-site-vite-tailwind/
├── src/                    # Site Principal (Vite/React)
├── azimut-cms/            # Backoffice (Next.js)
├── public/                # Arquivos públicos do site
└── package.json          # Dependências do site principal
```

---

## 🌐 URLS LOCAIS (DESENVOLVIMENTO)

### **Site Principal:**
- **URL**: `http://localhost:1753`
- **Comando para iniciar**: `npm run dev` (na raiz do projeto)
- **Framework**: Vite + React
- **Porta**: 1753

### **Backoffice (CMS):**
- **URL**: `http://localhost:3001`
- **Comando para iniciar**: 
  ```bash
  cd azimut-cms
  npm run dev
  ```
- **Framework**: Next.js
- **Porta**: 3001

---

## 🌍 URLS PÚBLICAS (PRODUÇÃO)

### **Site Principal:**
- **URL**: `https://azmt.com.br` (ou URL do Vercel)
- **Deploy**: Vercel
- **Projeto Vercel**: `azimut-site` (ou nome similar)
- **Root Directory**: `/` (raiz)

### **Backoffice (CMS):**
- **URL**: `https://azimut-backoffice.vercel.app` (ou URL customizada)
- **Deploy**: Vercel
- **Projeto Vercel**: `azimut-backoffice`
- **Root Directory**: `azimut-cms/`

---

## 🔑 LOGINS E SENHAS

### **Site Principal (Preview/Login):**
- **URL de Login**: `http://localhost:1753/login` (local) ou `https://azmt.com.br/login` (produção)
- **Usuário**: `azimut`
- **Senha**: `Azimut2025!Preview`
- **Tipo**: Autenticação via sessionStorage (não usa banco de dados)

### **Backoffice (CMS):**
- **URL de Login**: `http://localhost:3001/login` (local) ou `https://azimut-backoffice.vercel.app/login` (produção)
- **Email**: `admin@azimut.com.br`
- **Senha**: `Azimut2025!`
- **Tipo**: Autenticação via JWT (usa banco de dados)

---

## ☁️ VERCEL (DEPLOY)

### **Acesso:**
- **URL**: https://vercel.com/dashboard
- **Usuário**: `driveazimut-3632`
- **Login**: `drive.azimut@gmail.com`
- **Senha**: Entrar com **GITHUB** (autenticação via GitHub)
- **Banco de Dados**: Neon configurado no Vercel Store

### **Projetos:**

#### **1. Site Principal:**
- **Nome do Projeto**: `azimut-site` (ou nome similar)
- **Root Directory**: `/` (raiz)
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

#### **2. Backoffice:**
- **Nome do Projeto**: `azimut-backoffice`
- **Root Directory**: `azimut-cms/`
- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

### **Variáveis de Ambiente (Backoffice):**
Acesse: Vercel → `azimut-backoffice` → Settings → Environment Variables

**DATABASE_URL** (configurada no Vercel Store - Neon):
```bash
postgresql://neondb_owner:npg_W8VkhFvGTHj2@ep-crimson-firefly-ac8akobs-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require
```

**Outras variáveis necessárias:**
```bash
JWT_SECRET=seu-jwt-secret-aqui
NEXTAUTH_SECRET=seu-nextauth-secret-aqui
NEXTAUTH_URL=https://azimut-backoffice.vercel.app
SITE_URL=https://azmt.com.br
NODE_ENV=production
```

**⚠️ IMPORTANTE:**
- A `DATABASE_URL` está configurada no **Vercel Store** (Neon) - banco de dados Neon integrado
- Substitua `seu-jwt-secret-aqui` e `seu-nextauth-secret-aqui` pelos valores reais configurados no Vercel
- A `DATABASE_URL` já está configurada com o banco Neon

---

## 🗄️ BANCO DE DADOS

### **Tipo:**
PostgreSQL Gerenciado (Neon.tech)

### **Provider:**
Neon - Serverless Postgres (https://neon.tech)

### **Informações:**
- **Host**: `ep-crimson-firefly-ac8akobs-pooler.sa-east-1.aws.neon.tech`
- **Usuário**: `neondb_owner`
- **Database**: `neondb`
- **Porta**: `5432` (padrão PostgreSQL)
- **SSL**: Obrigatório (`sslmode=require`)
- **Região**: `sa-east-1` (South America - São Paulo)

### **String de Conexão (DATABASE_URL):**
```
postgresql://neondb_owner:npg_W8VkhFvGTHj2@ep-crimson-firefly-ac8akobs-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require
```

### **Acesso ao Painel Neon:**
- **URL**: https://console.neon.tech
- **Login**: (acessar via Vercel Store ou email cadastrado no Neon)
- **Senha**: (ou autenticação via Vercel)
- **Projeto**: (nome do projeto no Neon)
- **Nota**: Banco configurado via **Vercel Store** (integração Neon)

### **Onde encontrar informações:**
1. **Painel Neon**: https://console.neon.tech → Seu projeto → Settings → Connection Details
2. **Vercel**: Environment Variables → `DATABASE_URL`
3. **Email de criação**: Email do Neon quando criou o banco

### **Como resetar senha:**
1. Acesse: https://console.neon.tech
2. Vá em: Seu projeto → Settings → Database
3. Clique em: "Reset Password" ou "Change Password"
4. Atualize `DATABASE_URL` no Vercel após resetar

---

## 📦 GITHUB (REPOSITÓRIO)

### **Repositório:**
- **URL**: `https://github.com/rranzenberger/azimut.git`
- **Branch Principal**: `main`
- **Tipo**: Monorepo (site + backoffice no mesmo repositório)

### **Acesso:**
- **URL**: https://github.com/rranzenberger/azimut
- **Login Principal**: `rranzenberger`
- **Senha/Token**: `Fejgnq@1057`

### **Segundo Acesso (Alternativo):**
- **Login**: `ranz@azmt.ca`
- **Senha/Token**: `fejgnq10`

### **Comandos Git:**
```bash
# Ver status
git status

# Adicionar mudanças
git add .

# Commit
git commit -m "mensagem"

# Push
git push origin main
```

---

## 🛠️ COMANDOS ÚTEIS

### **Iniciar Site Principal (Local):**
```bash
# Na raiz do projeto
npm run dev
# Acesse: http://localhost:1753
```

### **Iniciar Backoffice (Local):**
```bash
# Na pasta azimut-cms
cd azimut-cms
npm run dev
# Acesse: http://localhost:3001
```

### **Build do Site Principal:**
```bash
npm run build
```

### **Build do Backoffice:**
```bash
cd azimut-cms
npm run build
```

### **Prisma (Backoffice):**
```bash
cd azimut-cms

# Gerar cliente Prisma
npm run prisma:generate

# Criar/atualizar tabelas
npm run prisma:push

# Popular com dados iniciais
npm run prisma:seed

# Abrir Prisma Studio (interface visual)
npm run prisma:studio
```

---

## 📝 VARIÁVEIS DE AMBIENTE LOCAIS

### **Site Principal (.env.local na raiz):**
```bash
# Opcional - credenciais de preview
VITE_PREVIEW_USER=azimut
VITE_PREVIEW_PASS=Azimut2025!Preview

# Opcional - URL do CMS (se quiser integrar)
VITE_CMS_API_URL=http://localhost:3001/api
```

### **Backoffice (.env.local em azimut-cms/):**
```bash
# Banco de dados (OBRIGATÓRIO) - Neon
DATABASE_URL=postgresql://neondb_owner:npg_W8VkhFvGTHj2@ep-crimson-firefly-ac8akobs-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require

# Autenticação (OBRIGATÓRIO)
JWT_SECRET=seu-jwt-secret-local
NEXTAUTH_SECRET=seu-nextauth-secret-local
NEXTAUTH_URL=http://localhost:3001

# Site (OBRIGATÓRIO)
SITE_URL=http://localhost:1753

# Storage (OPCIONAL - só se quiser usar Supabase para imagens)
# NEXT_PUBLIC_SUPABASE_URL=...
# SUPABASE_SERVICE_ROLE_KEY=...

# IA (OPCIONAL)
# AI_PROVIDER=deepseek
# DEEPSEEK_API_KEY=...
```

**⚠️ IMPORTANTE:**
- Substitua `seu-jwt-secret-local` e `seu-nextauth-secret-local` pelos valores reais
- Gere secrets com: `openssl rand -base64 32`

---

## 🔍 ONDE ENCONTRAR INFORMAÇÕES

### **Senhas Esquecidas:**

#### **Site Principal (Login Preview):**
- Verificar: `.env.local` na raiz (variável `VITE_PREVIEW_PASS`)
- Padrão: `Azimut2025!Preview`

#### **Backoffice (Login Admin):**
- Verificar: Banco de dados (tabela `User`)
- Padrão após seed: `Azimut2025!`
- Resetar: Rodar `npm run prisma:seed` novamente

#### **Vercel:**
- Acesse: https://vercel.com/login
- Login: `drive.azimut@gmail.com`
- Autenticação: Via **GitHub** (conectar conta GitHub)
- Usuário: `driveazimut-3632`

#### **GitHub:**
- Acesse: https://github.com/login
- **Login Principal**: `rranzenberger` / Senha: `Fejgnq@1057`
- **Login Alternativo**: `ranz@azmt.ca` / Senha: `fejgnq10`
- Use: "Forgot Password" se necessário

#### **Banco de Dados:**
- Painel Neon: https://console.neon.tech
- Vercel → Environment Variables → `DATABASE_URL`

---

## 📋 CHECKLIST DE ACESSOS

### **Desenvolvimento Local:**
- [ ] Site Principal: `http://localhost:1753`
- [ ] Backoffice: `http://localhost:3001`
- [ ] Login Site: `azimut` / `Azimut2025!Preview`
- [ ] Login Backoffice: `admin@azimut.com.br` / `Azimut2025!`

### **Produção:**
- [ ] Site Principal: `https://azmt.com.br`
- [ ] Backoffice: `https://azimut-backoffice.vercel.app`
- [ ] Vercel Dashboard: https://vercel.com/dashboard

### **Repositório:**
- [ ] GitHub: https://github.com/rranzenberger/azimut

---

## 🆘 RECUPERAÇÃO DE ACESSO

### **Se perder acesso ao site local:**
1. Verificar se servidor está rodando (`npm run dev`)
2. Verificar porta (1753 para site, 3001 para backoffice)
3. Limpar cache do navegador
4. Tentar modo anônimo

### **Se perder login do site:**
- **Site Principal**: Usar credenciais padrão (`azimut` / `Azimut2025!Preview`)
- **Backoffice**: Resetar via Prisma (`npm run prisma:seed`)

### **Se perder acesso ao Vercel:**
- Usar "Forgot Password" em https://vercel.com/login
- Verificar email cadastrado

### **Se perder acesso ao GitHub:**
- Usar "Forgot Password" em https://github.com/login
- Verificar email cadastrado

### **Se perder senha do banco:**
- Acessar painel Neon: https://console.neon.tech
- Settings → Database → Reset Password
- Copiar nova senha
- Atualizar `DATABASE_URL` no Vercel após resetar

---

## 📌 NOTAS IMPORTANTES

1. **NUNCA** compartilhe este arquivo publicamente
2. **SEMPRE** use senhas fortes em produção
3. **MANTENHA** este arquivo atualizado
4. **BACKUP** este arquivo em local seguro
5. **NÃO** commite este arquivo no GitHub (adicionar ao `.gitignore`)

---

## 🔄 ATUALIZAÇÕES

**Última atualização**: 2025-01-XX

**Próxima revisão**: Sempre que houver mudanças de senha, URL ou configuração

**Histórico de mudanças:**
- 2025-01-XX: Atualizado banco de dados para Neon (PostgreSQL Serverless)
- 2025-01-XX: Adicionadas informações completas de acesso e credenciais

---

## 📚 DOCUMENTOS RELACIONADOS

Para mais informações detalhadas, consulte:
- `INFORMACOES_NEON_BANCO_DADOS.md` - Informações completas do banco Neon
- `CONFIGURACAO_DEFINITIVA_BANCO_DADOS.md` - Configuração do banco
- `MEMORIA_DEFINITIVA_PROJETO.md` - Memória completa do projeto

---

**💡 DICA**: Mantenha este arquivo salvo em local seguro (não no repositório Git) e faça backup regularmente!

