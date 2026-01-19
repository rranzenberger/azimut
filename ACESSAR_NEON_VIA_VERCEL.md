# 🔑 ACESSAR NEON VIA VERCEL - Passo a Passo

## 📋 SITUAÇÃO:

O banco Neon está integrado ao Vercel, então você precisa acessar as credenciais através do Vercel, não diretamente do Neon Console.

---

## 🎯 COMO ACESSAR AS CREDENCIAIS:

### Opção 1: Variáveis de Ambiente no Vercel (RECOMENDADO)

1. **Acesse:** https://vercel.com
2. **Faça login**
3. **Vá em seu projeto** (azimut ou azimut-backoffice)
4. **Vá em "Settings"** → **"Environment Variables"**
5. **Procure por:** `DATABASE_URL`

**A `DATABASE_URL` tem o formato:**
```
postgresql://usuario:senha@host:5432/database?sslmode=require
```

**Exemplo:**
```
postgresql://neondb_owner:senha123@ep-xxx.us-east-2.aws.neon.tech:5432/neondb?sslmode=require
```

**Extrair dados:**
- **Host:** `ep-xxx.us-east-2.aws.neon.tech`
- **Database:** `neondb` (ou o nome após a última `/`)
- **User:** `neondb_owner` (ou o nome antes do `:`)
- **Password:** `senha123` (entre `:` e `@`)
- **Port:** `5432`

---

### Opção 2: Vercel Dashboard → Storage

1. **Acesse:** https://vercel.com
2. **Vá em seu projeto**
3. **Vá em "Storage"** ou **"Database"**
4. **Clique no banco Neon**
5. **Veja "Connection Details"**

---

### Opção 3: Vercel → Integrations → Neon

1. **Acesse:** https://vercel.com
2. **Vá em seu projeto**
3. **Vá em "Settings"** → **"Integrations"**
4. **Procure por "Neon"**
5. **Clique e veja os detalhes de conexão**

---

## 🔧 PREENCHER CREDENCIAL NO N8N:

### Depois de pegar os dados:

1. **Clique em "Create new credential"** no n8n

2. **Preencha:**

   **Name:** `Neon PostgreSQL`

   **Host:** (extraído da DATABASE_URL)
   - Exemplo: `ep-xxx.us-east-2.aws.neon.tech`

   **Database:** (extraído da DATABASE_URL)
   - Exemplo: `neondb`

   **User:** (extraído da DATABASE_URL)
   - Exemplo: `neondb_owner`

   **Password:** (extraído da DATABASE_URL)
   - Cole a senha

   **Port:** `5432`

   **SSL:** Selecione `require` ⚠️ **OBRIGATÓRIO!**

3. **Clique em "Test"** (se houver)
4. **Clique em "Save"**

---

## 💡 DICA: Usar DATABASE_URL Direta

**Se o n8n suportar connection string:**

Alguns n8n permitem usar a `DATABASE_URL` completa diretamente.

**Se houver opção "Connection String" ou "URL":**
- Cole a `DATABASE_URL` completa do Vercel

---

## 🆘 SE NÃO ENCONTRAR DATABASE_URL:

### Verificar no Backoffice:

1. **Acesse o backoffice:** https://backoffice.azmt.com.br
2. **Vá em "Settings"** ou **"Configurações"**
3. **Procure por variáveis de ambiente**
4. **Veja `DATABASE_URL`**

### Ou verificar no código:

1. **Procure no projeto:** `.env` ou `.env.local`
2. **Procure por:** `DATABASE_URL`
3. **Copie o valor**

---

## ✅ CHECKLIST:

- [ ] Acessou Vercel
- [ ] Encontrou `DATABASE_URL` em Environment Variables
- [ ] Extraiu Host, Database, User, Password
- [ ] Preencheu credencial no n8n
- [ ] Configurou SSL: `require`
- [ ] Testou conexão
- [ ] Salvou credencial
- [ ] Selecionou credencial no nó PostgreSQL

---

**Acesse o Vercel, pegue a DATABASE_URL e me avise se conseguiu!** 🚀
