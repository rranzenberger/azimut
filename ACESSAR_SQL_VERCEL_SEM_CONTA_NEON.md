# 🔧 ACESSAR SQL EDITOR - VIA VERCEL (SEM CONTA NEON)
**Data:** 15/01/2026  
**Situação:** Banco conectado na Vercel, sem conta Neon separada

---

## ✅ SOLUÇÃO: ACESSAR VIA VERCEL

Como o banco está **conectado na Vercel**, você pode acessar o SQL Editor através da própria Vercel, sem precisar de conta Neon separada.

---

## 🎯 PASSO A PASSO

### **PASSO 1: Clicar no Banco "azimut-backoffice"**

Na tela **Storage** que você está vendo:

1. **Clicar diretamente no CARD** do banco "azimut-backoffice"
   - Pode clicar no nome, no ícone, ou em qualquer lugar do card
   - **NÃO clique no botão "Connect"** (banco já está conectado)

### **PASSO 2: O que Vai Aparecer**

Após clicar, uma destas coisas vai acontecer:

#### **Cenário A: Abre Página de Detalhes do Banco**

Você vai ver:
- Nome do banco no topo
- **Abas no topo:** "Overview", "SQL Editor", "Settings", etc.
- **CLICAR na aba "SQL Editor"**

---

#### **Cenário B: Mostra Menu Lateral**

Você vai ver:
- Menu lateral esquerdo
- Opções: "Dashboard", "SQL Editor", "Settings", etc.
- **CLICAR em "SQL Editor"**

---

#### **Cenário C: Mostra Botão "Open in Neon" ou "Manage"**

Você vai ver:
- Botão "Open in Neon"
- Ou botão "Manage"
- **CLICAR no botão**
- Isso abre o Neon **usando sua conta da Vercel** (sem login separado)
- Depois procurar "SQL Editor" no menu lateral

---

#### **Cenário D: Mostra Informações + Botão "View Database"**

Você vai ver:
- Informações do banco
- Botão "View Database" ou "SQL Editor"
- **CLICAR no botão**

---

## 🚨 SE NÃO APARECEU NADA OU NÃO ENCONTROU SQL EDITOR

### **Alternativa 1: Via Environment Variables**

1. **Na Vercel:**
   - Clicar em **"Settings"** (no topo)
   - Clicar em **"Environment Variables"** (menu lateral)
   - Procurar por `DATABASE_URL`
   - Copiar o valor (string longa começando com `postgresql://`)

2. **Usar Cliente PostgreSQL:**
   - Instalar: DBeaver (grátis), pgAdmin, ou usar psql
   - Conectar usando `DATABASE_URL`
   - Executar SQL

---

### **Alternativa 2: Criar Conta Neon (Grátis)**

Se quiser acesso direto:

1. **Acessar:** https://console.neon.tech
2. **Clicar em "Sign Up"** ou "Get Started"
3. **Escolher:** "Sign up with Google" ou "Sign up with GitHub"
4. **Usar mesma conta da Vercel** (se possível)
5. **Depois:** Procurar projeto "azimut-backoffice" ou criar novo

**Nota:** Pode precisar que o dono da conta Vercel te convide

---

### **Alternativa 3: Via Vercel CLI (Terminal)**

1. **Instalar Vercel CLI** (se não tiver):
   ```bash
   npm i -g vercel
   ```

2. **Fazer login:**
   ```bash
   vercel login
   ```

3. **Conectar ao projeto:**
   ```bash
   cd azimut-cms
   vercel link
   ```

4. **Executar SQL via Prisma:**
   ```bash
   # Criar arquivo SQL temporário
   # Copiar conteúdo de populate-field-metadata.sql
   # Executar:
   npx prisma db execute --file populate-field-metadata.sql --schema prisma/schema.prisma
   ```

---

## ✅ MÉTODO MAIS FÁCIL (RECOMENDADO)

### **Tentar Via Vercel Primeiro:**

1. **CLICAR no card** "azimut-backoffice" na tela Storage
2. **PROCURAR** "SQL Editor" ou "Query" ou "Run SQL"
3. **CLICAR** quando encontrar

**Se não encontrar:**
- Procurar botão "Open in Neon" ou "Manage"
- Clicar → Abre Neon com sua conta Vercel
- Procurar "SQL Editor" no menu lateral

---

## 📋 SEQUÊNCIA COMPLETA

1. ✅ **CLICAR** no card "azimut-backoffice" (na Vercel)
2. ✅ **PROCURAR** "SQL Editor" ou "Query"
3. ✅ **CLICAR** em "SQL Editor"
4. ✅ **COLAR** SQL (de `azimut-cms/scripts/populate-field-metadata.sql`)
5. ✅ **EXECUTAR** (Run ou Ctrl+Enter)
6. ✅ **VERIFICAR** (SELECT COUNT(*) FROM field_metadata;)

---

## 🎯 O QUE FAZER AGORA

**AGORA:**
1. **CLICAR no card** "azimut-backoffice" (qualquer lugar do card)
2. **OLHAR** o que apareceu
3. **PROCURAR** por "SQL Editor", "Query", ou "Run SQL"
4. **CLICAR** quando encontrar

**SE NÃO ENCONTRAR:**
- Procurar botão "Open in Neon" ou "Manage"
- Ou criar conta Neon grátis (só precisa email)

---

**✅ CLIQUE NO CARD "azimut-backoffice" AGORA E ME DIGA O QUE APARECEU!**

Depois posso te ajudar a encontrar o SQL Editor exatamente onde você está! 👆
