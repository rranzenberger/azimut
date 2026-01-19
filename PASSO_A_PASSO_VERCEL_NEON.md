# 🚀 PASSO A PASSO - VERCEL + NEON (MANUAL)
**Data:** 15/01/2026  
**Status:** 📋 **GUIA VISUAL PASSO A PASSO**

---

## 📸 PASSO 1: ACESSAR VERCEL (2 min)

### **1.1. Abrir Vercel Dashboard**

1. Abrir navegador (Chrome, Edge, Firefox)
2. Digitar na barra de endereço: **https://vercel.com**
3. Pressionar Enter
4. Fazer login (se necessário)

### **1.2. Selecionar Projeto**

1. Na tela principal, procurar por **"azimut-cms"**
2. Ou procurar por **"azimut"** ou **"backoffice"**
3. Clicar no projeto

**Tela esperada:** Dashboard do projeto com abas (Deployments, Settings, etc.)

---

## 📸 PASSO 2: ENCONTRAR NEON/DATABASE (3 min)

### **2.1. Procurar por "Storage" ou "Databases"**

**Opção A: Menu Lateral Esquerdo**
1. Olhar no menu lateral esquerdo
2. Procurar por:
   - **"Storage"**
   - **"Databases"**
   - **"Data"**
   - **"Database"**
3. Clicar

**Opção B: Aba no Topo**
1. Olhar nas abas no topo da página
2. Procurar por:
   - **"Storage"**
   - **"Databases"**
3. Clicar

**Opção C: Settings**
1. Clicar em **"Settings"** (no menu ou aba)
2. Procurar por:
   - **"Storage"**
   - **"Databases"**
   - **"Environment Variables"** (ver `DATABASE_URL`)

### **2.2. O que Você Vai Ver:**

- Lista de databases/storage
- Ou botão **"Create Database"**
- Ou lista com **"Neon"** ou **"PostgreSQL"**
- Ou botão **"Open in Neon"** / **"Manage"**

**✅ Se encontrou algo relacionado a database/Neon → Próximo passo**

---

## 📸 PASSO 3: ABRIR NEON (2 min)

### **3.1. Se Apareceu Botão "Open in Neon" ou "Manage":**

1. Clicar no botão
2. Isso abre uma nova aba/janela
3. Pode pedir login (usar conta do Neon ou Vercel)
4. Aguardar carregar

**Resultado esperado:** Neon Dashboard aberto

### **3.2. Se Apareceu Lista de Databases:**

1. Clicar no database que aparece (geralmente só tem um)
2. Pode aparecer opções
3. Clicar em **"SQL Editor"** ou **"Query"**
4. Ou clicar em **"Open in Neon"**

### **3.3. Se Não Encontrou Nada:**

**Usar Neon Direto:**
1. Abrir nova aba
2. Acessar: **https://console.neon.tech**
3. Fazer login (mesma conta ou conta do Neon)
4. Procurar projeto pelo nome (azimut, backoffice, etc.)

---

## 📸 PASSO 4: ABRIR SQL EDITOR (1 min)

### **4.1. No Neon Dashboard:**

1. Olhar no menu lateral esquerdo
2. Procurar por:
   - **"SQL Editor"**
   - **"Query"**
   - **"SQL"**
   - **"Editor"**
3. Clicar

### **4.2. O que Você Vai Ver:**

- Editor de texto grande (área branca)
- Botão **"Run"** ou **"Execute"** (geralmente no topo)
- Ou botão de play (▶️)

**✅ Se viu editor de texto → Próximo passo**

---

## 📸 PASSO 5: COPIAR SQL (2 min)

### **5.1. Abrir Arquivo no VS Code:**

1. Abrir VS Code (se não estiver aberto)
2. Abrir arquivo:
   ```
   azimut-cms/scripts/populate-field-metadata.sql
   ```
3. Aguardar arquivo carregar

### **5.2. Selecionar TODO o Conteúdo:**

1. Clicar dentro do arquivo (qualquer lugar)
2. Pressionar **Ctrl+A** (Windows/Linux) ou **Cmd+A** (Mac)
   - Isso seleciona TODO o texto
3. Verificar que está tudo selecionado (texto azul/cinza)

### **5.3. Copiar:**

1. Pressionar **Ctrl+C** (Windows/Linux) ou **Cmd+C** (Mac)
   - Isso copia o texto
2. Verificar que copiou (mensagem pode aparecer no canto)

**✅ Conteúdo copiado → Próximo passo**

---

## 📸 PASSO 6: COLAR NO SQL EDITOR (1 min)

### **6.1. Voltar para o Navegador:**

1. Voltar para a aba do Neon SQL Editor
2. Clicar dentro do editor (área branca)

### **6.2. Limpar Conteúdo Existente (se houver):**

1. Se houver algum texto no editor:
   - Selecionar tudo (Ctrl+A)
   - Deletar (Delete ou Backspace)

### **6.3. Colar:**

1. Clicar dentro do editor
2. Pressionar **Ctrl+V** (Windows/Linux) ou **Cmd+V** (Mac)
3. Aguardar texto aparecer (pode demorar se for grande)

**✅ SQL colado no editor → Próximo passo**

---

## 📸 PASSO 7: EXECUTAR SQL (2 min)

### **7.1. Verificar que SQL Está Completo:**

1. Rolagem para baixo no editor
2. Verificar que há muito texto (centenas de linhas)
3. Verificar que termina com queries de verificação

### **7.2. Executar:**

**Opção A: Botão Run**
1. Procurar botão **"Run"** (geralmente no topo direito)
2. Clicar

**Opção B: Botão Execute**
1. Procurar botão **"Execute"**
2. Clicar

**Opção C: Atalho de Teclado**
1. Pressionar **Ctrl+Enter** (Windows/Linux) ou **Cmd+Enter** (Mac)

### **7.3. Aguardar Execução:**

1. Aguardar alguns segundos (10-30 segundos)
2. Pode aparecer mensagem de "Running..." ou loading
3. Aguardar terminar

**Esperado:**
- Mensagem "Query executed successfully"
- Ou "Success"
- Ou lista de resultados
- Ou mensagem de sucesso no canto

**✅ SQL executado → Próximo passo**

---

## 📸 PASSO 8: VERIFICAR SE FUNCIONOU (2 min)

### **8.1. Executar Query de Verificação:**

No mesmo SQL Editor, digitar (ou copiar/colar):

```sql
SELECT COUNT(*) FROM field_metadata;
```

### **8.2. Executar:**

1. Selecionar a query (ou deixar cursor nela)
2. Clicar em **"Run"** ou pressionar **Ctrl+Enter**
3. Aguardar resultado

### **8.3. Ver Resultado:**

**Esperado:** 
- Uma linha com um número (ex: 20, 30, 40)
- Número deve ser **> 0**

**Se aparecer número > 0:**
- ✅ **SUCESSO!** Tabelas criadas e dados populados!

**Se aparecer erro:**
- ❌ Ver seção de Troubleshooting abaixo

---

## 🚨 TROUBLESHOOTING

### **Erro: "Table does not exist"**

**Causa:** SQL não foi executado ou falhou

**Solução:**
1. Verificar se SQL foi executado completamente
2. Verificar se não houve erros durante execução
3. Tentar executar novamente
4. Verificar se está no banco correto

### **Erro: "Permission denied"**

**Causa:** Não tem permissões para criar tabelas

**Solução:**
1. Verificar se está no projeto correto
2. Verificar se tem permissões de admin/owner
3. Tentar com outra conta

### **Erro: "Connection timeout"**

**Causa:** Banco Neon em modo sleep ou conexão lenta

**Solução:**
1. Aguardar alguns segundos
2. Tentar novamente
3. Verificar conexão com internet
4. "Acordar" o banco fazendo uma query simples primeiro

### **Não Encontrou Neon na Vercel:**

**Solução Alternativa:**
1. Acessar: https://console.neon.tech diretamente
2. Fazer login
3. Procurar projeto pelo nome
4. Abrir SQL Editor
5. Executar SQL

---

## ✅ CHECKLIST COMPLETO

- [ ] Vercel Dashboard aberto
- [ ] Projeto azimut-cms selecionado
- [ ] Storage/Databases encontrado
- [ ] Neon aberto (via Vercel ou direto)
- [ ] SQL Editor aberto
- [ ] Arquivo SQL aberto no VS Code
- [ ] Conteúdo copiado (Ctrl+A, Ctrl+C)
- [ ] SQL colado no editor (Ctrl+V)
- [ ] SQL executado (Run ou Ctrl+Enter)
- [ ] Verificação executada (COUNT > 0)
- [ ] Tudo funcionando! ✅

---

## 🎯 PRÓXIMO PASSO

Após executar SQL com sucesso:

**PASSO 2:** Gerar Migration Prisma

Abrir terminal e executar:
```bash
cd azimut-cms
npx prisma migrate dev --name add_field_metadata_and_image_specs
npx prisma generate
```

**Ver:** `PASSO_A_PASSO_COMPLETO.md` (Passo 2)

---

**✅ SEGUIR OS PASSOS NA ORDEM!**

Cada passo tem instruções detalhadas. Não pule etapas!
