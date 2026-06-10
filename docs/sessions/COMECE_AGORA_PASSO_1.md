# 🚀 COMECE AGORA - PASSO 1: EXECUTAR SQL NO NEON
**Data:** 15/01/2026  
**Status:** ⚠️ **PRIMEIRO PASSO OBRIGATÓRIO**

---

## ⚠️ IMPORTANTE

**Este é o PRIMEIRO passo e é OBRIGATÓRIO!**

Sem executar o SQL no Neon, as APIs vão retornar erro 404 (tabelas não existem).

---

## 📋 PASSO A PASSO DETALHADO

### **1. Abrir Neon Dashboard**

1. Abrir navegador
2. Acessar: **https://console.neon.tech**
3. Fazer login (se necessário)
4. Selecionar projeto **Azimut** (ou o projeto correto)

### **2. Abrir SQL Editor**

1. No menu lateral esquerdo, procurar por **"SQL Editor"**
2. Ou procurar por **"Query"** ou **"SQL"**
3. Clicar para abrir
4. Aguardar editor carregar (pode levar alguns segundos)

### **3. Abrir Script SQL no VS Code**

1. No VS Code, abrir arquivo:
   ```
   azimut-cms/scripts/populate-field-metadata.sql
   ```
2. Selecionar **TODO** o conteúdo:
   - Pressionar **Ctrl+A** (selecionar tudo)
   - Ou arrastar do início ao fim
3. Copiar:
   - Pressionar **Ctrl+C**

### **4. Colar no Neon SQL Editor**

1. Voltar para o navegador (Neon SQL Editor)
2. Clicar dentro do editor SQL
3. Limpar qualquer conteúdo existente (se houver)
4. Colar o conteúdo:
   - Pressionar **Ctrl+V**
5. Verificar que o SQL está completo (deve ter várias linhas)

### **5. Executar SQL**

1. Verificar que o SQL está completo
2. Clicar no botão **"Run"** (geralmente no canto superior direito)
   - Ou pressionar **Ctrl+Enter**
3. Aguardar execução (pode levar 10-30 segundos)

**Esperado:** Mensagem de sucesso ou "Query executed successfully"

### **6. Verificar se Funcionou**

No mesmo SQL Editor, executar estas queries:

```sql
-- Verificar quantos metadados foram criados
SELECT COUNT(*) FROM field_metadata;
```

**Esperado:** Número > 0 (ex: 20, 30, etc.)

```sql
-- Verificar especificações de imagens
SELECT COUNT(*) FROM image_specifications;
```

**Esperado:** Número > 0 (ex: 1, 2, etc.)

```sql
-- Ver alguns metadados da Home
SELECT 
  field_key,
  field_label,
  max_length,
  required
FROM field_metadata
WHERE page_slug = 'home'
LIMIT 5;
```

**Esperado:** Lista de 5 campos (hero_title, hero_subtitle, etc.)

---

## ✅ SE FUNCIONOU

**PASSO 1 CONCLUÍDO!** ✅

Agora pode seguir para o **PASSO 2**: Gerar Migration Prisma

Ver: `PASSO_A_PASSO_COMPLETO.md` (Passo 2)

---

## 🚨 SE DEU ERRO

### **Erro: "Table already exists"**
- ✅ **Isso é OK!** Significa que as tabelas já existem
- ✅ Pode continuar para o Passo 2

### **Erro: "Permission denied"**
- ✅ Verificar se está no projeto correto
- ✅ Verificar se tem permissões de admin

### **Erro: "Syntax error"**
- ✅ Verificar se copiou TODO o conteúdo
- ✅ Verificar se não faltou nenhuma linha
- ✅ Tentar copiar novamente

### **Erro: "Connection timeout"**
- ✅ Verificar conexão com internet
- ✅ Tentar novamente
- ✅ Verificar se o banco Neon está online

---

## 📋 CHECKLIST

- [ ] Neon Dashboard aberto
- [ ] SQL Editor aberto
- [ ] Script SQL copiado (TODO o conteúdo)
- [ ] SQL colado no editor
- [ ] SQL executado com sucesso
- [ ] Verificação executada (COUNT > 0)
- [ ] Dados aparecendo nas queries

---

## 🎯 PRÓXIMO PASSO

Após executar SQL com sucesso:

**PASSO 2:** Gerar Migration Prisma

```bash
cd azimut-cms
npx prisma migrate dev --name add_field_metadata_and_image_specs
npx prisma generate
```

---

**✅ EXECUTAR SQL NO NEON AGORA!**

Este é o passo mais importante. Sem isso, nada vai funcionar!
