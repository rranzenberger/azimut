# 🗄️ QUAL BANCO DE DADOS ESTAMOS USANDO?

## ✅ BANCO DE DADOS ATUAL

### **PostgreSQL Serverless (Neon.tech)**

Você está usando **Neon** - um PostgreSQL Serverless:

- **Tipo**: PostgreSQL Serverless
- **Provider**: Neon - Serverless Postgres (https://neon.tech)
- **Host**: `ep-crimson-firefly-ac8akobs-pooler.sa-east-1.aws.neon.tech`
- **Usuário**: `neondb_owner`
- **Database**: `neondb`
- **Porta**: `5432`
- **SSL**: Obrigatório (`sslmode=require`)
- **Região**: `sa-east-1` (South America - São Paulo)

---

## 📍 ONDE VER AS INFORMAÇÕES

### **1. No Vercel (Variáveis de Ambiente)**

1. Acesse: https://vercel.com/dashboard
2. Vá no projeto **azimut-backoffice**
3. Clique em **Settings** → **Environment Variables**
4. Procure por: `DATABASE_URL`
5. O valor será algo como:
   ```
   postgresql://azimt_20255:SUA_SENHA@azimt_20255.postgresql.dbaas.com.br:5432/azimt_20255?sslmode=require
   ```

### **2. No Painel Neon**

O banco está hospedado no **Neon.tech**:

1. **Acesse**: https://console.neon.tech
2. **Faça login** com seu email/senha do Neon
3. **Selecione seu projeto** (geralmente tem o nome do banco ou projeto)
4. **Vá em**: **Settings** → **Connection Details**
5. **Lá você verá**:
   - String de conexão completa
   - Host
   - Usuário
   - Database
   - Opção para resetar senha
   - Estatísticas de uso

### **3. No Código (Schema Prisma)**

O tipo de banco está definido em:

**Arquivo**: `azimut-cms/prisma/schema.prisma`

```prisma
datasource db {
  provider = "postgresql"  // ← Tipo: PostgreSQL
  url      = env("DATABASE_URL")  // ← URL vem da variável de ambiente
}
```

---

## 🔍 COMO IDENTIFICAR O PROVEDOR

O formato `*.postgresql.dbaas.com.br` é comum em:

- **Locaweb** (Brasil)
- **UOL Host** (Brasil)
- **KingHost** (Brasil)
- **Outros provedores brasileiros de DBAAS**

Para confirmar:
1. Verifique seu email de criação do banco
2. Procure por "DBAAS" ou "PostgreSQL" no painel do seu provedor
3. Verifique faturas/contratos

---

## ✅ CONFIGURAÇÃO ATUAL

### **String de Conexão (DATABASE_URL)**

String completa:
```
postgresql://neondb_owner:npg_W8VkhFvGTHj2@ep-crimson-firefly-ac8akobs-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require
```

Onde:
- `neondb_owner` = usuário
- `npg_W8VkhFvGTHj2` = senha
- `ep-crimson-firefly-ac8akobs-pooler.sa-east-1.aws.neon.tech` = host (endpoint Neon)
- `neondb` = nome do banco
- `sa-east-1` = região (São Paulo)
- `sslmode=require` = SSL obrigatório

---

## 🚨 IMPORTANTE: SUPABASE NÃO É NECESSÁRIO

### **O que você NÃO precisa:**

❌ **Supabase** - não está sendo usado para o banco de dados
❌ **NEXT_PUBLIC_SUPABASE_URL** - não é obrigatório (só se quiser usar para storage de imagens)
❌ **SUPABASE_SERVICE_ROLE_KEY** - não é obrigatório (só se quiser usar para storage de imagens)

### **O que você PRECISA:**

✅ **DATABASE_URL** - obrigatório (PostgreSQL gerenciado)
✅ **JWT_SECRET** - obrigatório (para autenticação)
✅ **NEXTAUTH_SECRET** - obrigatório (para NextAuth)
✅ **NEXTAUTH_URL** - obrigatório (URL do backoffice)

---

## 📋 VARIÁVEIS DE AMBIENTE OBRIGATÓRIAS

### **No Vercel (azimut-backoffice):**

```bash
# Banco de dados (OBRIGATÓRIO)
DATABASE_URL=postgresql://azimt_20255:SUA_SENHA@azimt_20255.postgresql.dbaas.com.br:5432/azimt_20255?sslmode=require

# Autenticação (OBRIGATÓRIO)
JWT_SECRET=seu-jwt-secret-aqui
NEXTAUTH_SECRET=seu-nextauth-secret-aqui
NEXTAUTH_URL=https://azimut-backoffice.vercel.app

# Site (OBRIGATÓRIO)
SITE_URL=https://azmt.com.br

# Storage (OPCIONAL - só se quiser usar Supabase para imagens)
# NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
# SUPABASE_SERVICE_ROLE_KEY=eyJh...
```

---

## 🔧 SE PRECISAR RESETAR A SENHA

1. Acesse o painel do provedor (onde criou o banco)
2. Vá em "Bancos de Dados" → "azimt_20255"
3. Procure por "Alterar Senha" ou "Reset Password"
4. Atualize a `DATABASE_URL` no Vercel com a nova senha

---

## ✅ RESUMO

- **Banco**: PostgreSQL gerenciado (DBAAS)
- **Host**: `azimt_20255.postgresql.dbaas.com.br`
- **Onde ver**: Vercel → Environment Variables → `DATABASE_URL`
- **Supabase**: NÃO está sendo usado (pode ignorar)

