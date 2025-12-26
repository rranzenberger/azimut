# 🔧 Solução: Erro 405 no Login do Backoffice

## 🐛 **Problema Identificado:**

Erro **405 (Method Not Allowed)** ao tentar fazer login no backoffice.

## 🔍 **Possíveis Causas:**

### **1. Banco de Dados sem Usuário Admin**
O banco de dados em produção pode não ter o usuário admin criado (seed não executado).

### **2. DATABASE_URL não Configurada**
A variável `DATABASE_URL` pode não estar configurada no Vercel.

### **3. Erro de Conexão com Banco**
O Prisma pode não estar conseguindo conectar ao banco Neon.

## ✅ **Soluções:**

### **Solução 1: Rodar Seed no Banco de Produção**

O banco precisa ter o usuário admin criado. Execute via Vercel CLI ou crie um script:

```powershell
# Opção A: Via Vercel CLI (terminal local conectado ao banco)
cd azimut-cms
vercel env pull .env.local  # Baixar variáveis de ambiente
npm run prisma:push
npm run prisma:seed
```

### **Solução 2: Verificar Variáveis de Ambiente no Vercel**

1. Vercel → `azimut-backoffice` → Settings → Environment Variables
2. Verificar se está configurada:
   - `DATABASE_URL` = `postgresql://neondb_owner:npg_W8VkhFvGTHj2@ep-crimson-firefly-ac8akobs-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require`
3. Se não estiver, adicionar e fazer novo deploy

### **Solução 3: Criar Endpoint de Setup Automático**

Criar endpoint `/api/admin/setup` que roda o seed automaticamente (apenas primeira vez):

**⚠️ Criar apenas se necessário, e depois remover ou proteger com senha!**

---

## 📋 **Checklist para Resolver:**

- [ ] Verificar se `DATABASE_URL` está configurada no Vercel
- [ ] Verificar se banco Neon está ativo e acessível
- [ ] Rodar seed no banco de produção
- [ ] Verificar logs do deploy para erros de Prisma
- [ ] Testar login novamente

---

## 🚀 **Passo a Passo Recomendado:**

### **1. Verificar Variáveis no Vercel:**
- Acesse: Dashboard Vercel → `azimut-backoffice` → Settings → Environment Variables
- Confirme que `DATABASE_URL` está configurada

### **2. Rodar Seed (se necessário):**

**Opção A: Via Painel Neon**
1. Acesse: https://console.neon.tech
2. Seu projeto → SQL Editor
3. Execute manualmente a criação do usuário (ou importe do seed.ts)

**Opção B: Via Vercel CLI (mais fácil)**
```powershell
cd azimut-cms
vercel env pull .env.local
npm run prisma:seed
```

### **3. Verificar Logs:**
- Vercel → Deployments → Último deploy → Logs
- Procurar por erros de Prisma ou conexão

---

## 🔍 **Debug Adicional:**

Se ainda não funcionar, verifique:
1. Logs do deploy para erros
2. Console do navegador para erros de rede
3. Se o endpoint `/api/admin/login` está acessível

Avise qual erro aparece agora para eu ajudar melhor!

