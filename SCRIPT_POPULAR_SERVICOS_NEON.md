# 🚀 SCRIPT AUTOMÁTICO: POPULAR SERVIÇOS NO BACKOFFICE (NEON)

**Data:** 01/01/2026  
**Banco:** Neon PostgreSQL (serverless)  
**Objetivo:** Inserir os 6 serviços diretamente no banco de dados com textos em 4 idiomas

---

## ✅ OPÇÕES DE EXECUÇÃO COM NEON

### **OPÇÃO 1: Via Neon SQL Editor (MAIS FÁCIL)** ⭐

1. **Acessar Neon Dashboard:**
   - https://console.neon.tech
   - Login com sua conta
   - Selecionar projeto do backoffice

2. **Abrir SQL Editor:**
   - Menu lateral → **SQL Editor**
   - Ou clicar em "Query your database"

3. **Colar o script:**
   - Abrir: `azimut-cms/migrations/popular_servicos.sql`
   - Copiar TUDO
   - Colar no SQL Editor do Neon

4. **Executar:**
   - Clicar em botão **"Run"**
   - Aguardar mensagem de sucesso

5. **Verificar:**
   - Deve aparecer lista dos 6 serviços criados
   - Status: PUBLISHED
   - Prioridades: 1, 2, 3, 4, 5, 6

---

### **OPÇÃO 2: Via psql com Connection String do Neon**

1. **Pegar Connection String:**
   - No Neon Dashboard → **Connection Details**
   - Copiar a **Connection String** (psql format)
   - Exemplo: `postgresql://username:password@ep-xyz.us-east-2.aws.neon.tech/neondb`

2. **No terminal:**
   ```bash
   # Executar script
   psql "sua-connection-string-aqui" -f azimut-cms/migrations/popular_servicos.sql
   ```

   **Exemplo:**
   ```bash
   psql "postgresql://neondb_owner:xyz@ep-abc.us-east-2.aws.neon.tech/neondb" -f azimut-cms/migrations/popular_servicos.sql
   ```

---

### **OPÇÃO 3: Via Prisma Studio + Script Node.js** 

Criei um script Node.js que usa Prisma para popular:

```bash
cd azimut-cms
node migrations/popular-servicos.js
```

*(Script abaixo)*

---

## 📄 ONDE ESTÁ O SCRIPT SQL

**Arquivo:** `azimut-cms/migrations/popular_servicos.sql`

**Contém:**
- INSERT de 6 serviços
- Textos em 4 idiomas (PT, EN, ES, FR)
- Ícones, status, prioridades
- Tudo pronto para executar!

---

## 🔍 COMO ENCONTRAR SUA CONNECTION STRING DO NEON

### **Passo 1:** Acessar https://console.neon.tech

### **Passo 2:** Selecionar seu projeto

### **Passo 3:** Clicar em "Connection Details"

### **Passo 4:** Copiar uma das opções:

**Psql:**
```
postgresql://neondb_owner:senha@ep-xyz.us-east-2.aws.neon.tech/neondb?sslmode=require
```

**Prisma (já no .env):**
```
DATABASE_URL="postgresql://neondb_owner:senha@ep-xyz.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

---

## 🎯 RECOMENDAÇÃO: Usar Neon SQL Editor

**Mais fácil e seguro!**

1. ✅ Interface visual
2. ✅ Não precisa instalar psql
3. ✅ Não precisa lidar com connection strings
4. ✅ Mostra resultado direto

---

## 📊 O QUE O SCRIPT FAZ

### **Insere 6 serviços com:**

1. ✅ **Slug único** (cinema-audiovisual, animacao-2d-3d, etc.)
2. ✅ **Ícones** (🎬, 🎨, 🥽, 🤖, 📚, 💡)
3. ✅ **Status:** PUBLISHED (visível no site)
4. ✅ **Prioridade:** 1-6 (ordem de exibição)
5. ✅ **Textos em 4 idiomas:**
   - Português (PT)
   - Inglês (EN)
   - Espanhol (ES)
   - Francês (FR)

---

## ✅ APÓS EXECUTAR O SCRIPT

### **1. Verificar no Backoffice:**
https://backoffice.azmt.com.br/admin/services

Deve aparecer:
- ✅ 6 serviços listados
- ✅ Com ícones e títulos
- ✅ Status: Publicado

### **2. Verificar no Site:**
https://azmt.com.br

**Abrir Console (F12) e verificar:**
```
✅ Usando serviços do backoffice
```

---

## 🐛 SE DER ERRO NO NEON

### **Erro: "permission denied for table Service"**
**Solução:** 
- Verificar se está usando a connection string com permissões corretas
- No Neon, usar a string que tem `neondb_owner` ou `postgres`

### **Erro: "relation Service does not exist"**
**Solução:** Rodar migrations primeiro:
```bash
cd azimut-cms
npx prisma migrate deploy
```

### **Erro: "duplicate key value violates unique constraint"**
**Solução:** Serviços já existem! 
- Deletar serviços existentes no backoffice primeiro
- Ou descomentar linha 9 do script: `DELETE FROM "Service";`

---

## ⚡ OPÇÃO RÁPIDA: Script Node.js

Se preferir não usar SQL direto, use este script Node.js:

**Arquivo:** `azimut-cms/migrations/popular-servicos.js`

```bash
cd azimut-cms
npm install
node migrations/popular-servicos.js
```

*(Script criado abaixo)*

---

## ⏱️ TEMPO:

**Manual:** 20 minutos (copiar, colar campo por campo)  
**Com script SQL:** **30 segundos!** ⚡  
**Com script Node.js:** **1 minuto!** ⚡

---

## ✅ CHECKLIST

- [ ] Acessei Neon Console (https://console.neon.tech)
- [ ] Abri SQL Editor
- [ ] Copiei script `popular_servicos.sql`
- [ ] Colei no SQL Editor
- [ ] Cliquei em "Run"
- [ ] Vi mensagem de sucesso
- [ ] Verifiquei backoffice (6 serviços)
- [ ] Verifiquei site (console: ✅ Usando serviços do backoffice)

---

## 🎉 RESULTADO FINAL

**Site mostra os mesmos serviços, mas agora:**
- ✅ Vêm do backoffice (editável)
- ✅ 4 idiomas completos
- ✅ Sem precisar tocar no código
- ✅ Fallback continua funcionando

---

**Execute o script no Neon e teste! 🚀**

