# 📊 RESUMO: BANCO DE DADOS ATUAL

## ✅ O QUE ESTAMOS USANDO

### **PostgreSQL Serverless (Neon.tech)**

- **Tipo**: PostgreSQL Serverless
- **Provider**: Neon - Serverless Postgres (https://neon.tech)
- **Host**: `ep-crimson-firefly-ac8akobs-pooler.sa-east-1.aws.neon.tech`
- **Usuário**: `neondb_owner`
- **Database**: `neondb`
- **Porta**: `5432`
- **Região**: `sa-east-1` (São Paulo)

---

## ❌ O QUE NÃO ESTAMOS USANDO

- **Supabase** - NÃO está sendo usado
- **Vercel Postgres** - NÃO está sendo usado
- **Outros bancos** - NÃO estão sendo usados

---

## 📍 ONDE VER AS INFORMAÇÕES

### **No Vercel:**

1. Acesse: https://vercel.com/dashboard
2. Projeto: **azimut-backoffice**
3. **Settings** → **Environment Variables**
4. Procure: `DATABASE_URL`
5. Valor: `postgresql://neondb_owner:npg_W8VkhFvGTHj2@ep-crimson-firefly-ac8akobs-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require`

### **No Painel Neon:**

- **URL**: https://console.neon.tech
- Faça login com seu email/senha do Neon
- Selecione seu projeto
- Vá em: **Settings** → **Connection Details**
- Lá você verá todas as informações de conexão
- Lá você verá: host, usuário, senha, status

---

## 🔧 VARIÁVEIS NECESSÁRIAS NO VERCEL

### **Obrigatórias:**

```bash
DATABASE_URL=postgresql://azimt_20255:SUA_SENHA@azimt_20255.postgresql.dbaas.com.br:5432/azimt_20255?sslmode=require
JWT_SECRET=seu-jwt-secret-aqui
NEXTAUTH_SECRET=seu-nextauth-secret-aqui
NEXTAUTH_URL=https://azimut-backoffice.vercel.app
SITE_URL=https://azmt.com.br
```

### **Opcionais (NÃO obrigatórias):**

```bash
# Só se quiser usar Supabase para storage de imagens
# NEXT_PUBLIC_SUPABASE_URL=...
# SUPABASE_SERVICE_ROLE_KEY=...
```

---

## ✅ PRÓXIMOS PASSOS

1. **Verificar** se `DATABASE_URL` está configurada no Vercel
2. **Confirmar** a senha do banco está correta
3. **Testar** conexão (deploy no Vercel)
4. **Ignorar** qualquer referência ao Supabase

---

**Documento completo**: Veja `QUAL_BANCO_DADOS_USANDO.md` para mais detalhes.

