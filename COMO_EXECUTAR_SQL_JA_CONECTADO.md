# 🚀 COMO EXECUTAR SQL - BANCO JÁ CONECTADO
**Data:** 15/01/2026  
**Status:** 📋 **GUIA ESPECÍFICO PARA SUA TELA ATUAL**

---

## ✅ O QUE VOCÊ ESTÁ VENDO

Você está na tela de **Storage** da Vercel, no projeto **azimut-backoffice**, e vê:

- **Banco:** "azimut-backoffice" (com ícone verde)
- **Tipo:** Database
- **Criado:** 12/19/25
- **Botão:** "Connect" (branco com borda preta)

---

## 🎯 PASSO A PASSO (SIGA NA ORDEM)

### **PASSO 1: Clicar no Banco ou no Botão "Connect"**

**Opção A: Clicar no Banco**
1. Clicar diretamente no card/linha do banco "azimut-backoffice"
2. Isso deve abrir as opções/configurações do banco

**Opção B: Clicar no Botão "Connect"**
1. Clicar no botão **"Connect"** (branco com borda preta) ao lado do banco
2. Isso conecta o banco ao projeto e abre opções

**Resultado esperado:** Abre uma nova tela/página com informações do banco ou opções

---

### **PASSO 2: Encontrar SQL Editor ou Query**

Após clicar, você vai ver uma das opções abaixo:

#### **Opção A: Ver Botão "SQL Editor" ou "Query"**
1. Procurar por:
   - **"SQL Editor"**
   - **"Query"**
   - **"SQL"**
   - **"Run SQL"**
   - **"Execute Query"**
2. Clicar

#### **Opção B: Ver Botão "Open in Neon" ou "Manage"**
1. Procurar por:
   - **"Open in Neon"**
   - **"Manage"**
   - **"View Database"**
2. Clicar
3. Isso abre o Neon Dashboard
4. No Neon Dashboard, procurar **"SQL Editor"** no menu lateral
5. Clicar

#### **Opção C: Ver Abas/Tabs**
1. Procurar abas no topo como:
   - **"Overview"**
   - **"SQL Editor"**
   - **"Settings"**
2. Clicar em **"SQL Editor"**

---

### **PASSO 3: SQL Editor Aberto**

Você vai ver:
- Editor de texto grande (área branca/cinza)
- Botão **"Run"** ou **"Execute"** (geralmente no topo direito)
- Ou botão de play (▶️)

**✅ Se viu editor de texto → Próximo passo**

---

### **PASSO 4: Copiar SQL do Arquivo**

1. **No VS Code (ou outro editor):**
   - Abrir arquivo: `azimut-cms/scripts/populate-field-metadata.sql`
   - Selecionar TODO (Ctrl+A)
   - Copiar (Ctrl+C)

2. **Verificar que copiou:**
   - O conteúdo deve ter centenas de linhas
   - Deve começar com `-- ═════════════════════════...`
   - Deve terminar com queries de verificação

---

### **PASSO 5: Colar no SQL Editor**

1. **Voltar para o navegador** (onde está o SQL Editor)

2. **Clicar dentro do editor** (área branca/cinza)

3. **Limpar conteúdo existente** (se houver):
   - Selecionar tudo (Ctrl+A)
   - Deletar (Delete ou Backspace)

4. **Colar:**
   - Pressionar **Ctrl+V** (Windows/Linux) ou **Cmd+V** (Mac)
   - Aguardar texto aparecer (pode demorar alguns segundos)

**✅ SQL colado no editor → Próximo passo**

---

### **PASSO 6: Executar SQL**

1. **Verificar que SQL está completo:**
   - Rolar para baixo no editor
   - Verificar que há muito texto (centenas de linhas)

2. **Executar:**
   
   **Opção A: Botão Run**
   - Procurar botão **"Run"** (geralmente no topo direito)
   - Clicar

   **Opção B: Botão Execute**
   - Procurar botão **"Execute"**
   - Clicar

   **Opção C: Atalho de Teclado**
   - Pressionar **Ctrl+Enter** (Windows/Linux) ou **Cmd+Enter** (Mac)

3. **Aguardar execução:**
   - Pode levar 10-30 segundos
   - Pode aparecer loading ou "Running..."
   - Aguardar terminar

**Esperado:**
- Mensagem "Query executed successfully"
- Ou "Success"
- Ou lista de resultados
- Ou mensagem de sucesso no canto

**✅ SQL executado → Próximo passo**

---

### **PASSO 7: Verificar se Funcionou**

No mesmo SQL Editor, digitar (ou copiar/colar):

```sql
SELECT COUNT(*) FROM field_metadata;
```

**Executar:**
- Selecionar a query (ou deixar cursor nela)
- Clicar em **"Run"** ou pressionar **Ctrl+Enter**

**Resultado esperado:**
- Uma linha com um número (ex: 20, 30, 40)
- Número deve ser **> 0**

**Se aparecer número > 0:**
- ✅ **SUCESSO!** Tabelas criadas e dados populados!

**Se aparecer erro ou 0:**
- ❌ Verificar se SQL foi executado completamente
- ❌ Tentar executar novamente

---

## 🚨 SE NÃO ENCONTROU SQL EDITOR

### **Tente estas opções:**

1. **Clicar diretamente no nome do banco** "azimut-backoffice"
   - Isso pode abrir página de detalhes
   - Procurar por "SQL Editor" ou "Query"

2. **Procurar no menu lateral** (se aparecer):
   - Menu à esquerda com opções
   - Procurar por "SQL", "Query", "Editor"

3. **Clicar em "Connect" primeiro:**
   - Clicar no botão "Connect"
   - Aguardar conectar
   - Depois procurar SQL Editor

4. **Abrir Neon Direto:**
   - Abrir nova aba
   - Acessar: https://console.neon.tech
   - Fazer login
   - Procurar projeto "azimut-backoffice"
   - Abrir SQL Editor

---

## ✅ CHECKLIST

- [ ] Tela Storage da Vercel aberta
- [ ] Banco "azimut-backoffice" visível
- [ ] Clicou no banco ou botão "Connect"
- [ ] SQL Editor encontrado e aberto
- [ ] SQL copiado do arquivo
- [ ] SQL colado no editor
- [ ] SQL executado com sucesso
- [ ] Verificação executada (COUNT > 0)
- [ ] Tudo funcionando! ✅

---

## 🎯 PRÓXIMO PASSO

Após executar SQL com sucesso:

**PASSO 2:** Gerar Migration Prisma

```bash
cd azimut-cms
npx prisma migrate dev --name add_field_metadata_and_image_specs
npx prisma generate
```

**Ver:** `PASSO_A_PASSO_COMPLETO.md` (Passo 2)

---

**✅ CLIQUE NO BANCO "azimut-backoffice" OU NO BOTÃO "CONNECT"!**

Depois procure por "SQL Editor" ou "Query"!
