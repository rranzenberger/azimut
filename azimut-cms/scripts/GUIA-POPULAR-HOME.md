# 🚀 GUIA PASSO A PASSO: POPULAR HOME NO BACKOFFICE

## 📋 O QUE FOI CRIADO:

✅ **Arquivo JSON:** `azimut-cms/scripts/content-export-home.json`
   - Conteúdo da HOME nas 4 línguas (PT, EN, FR, ES)

✅ **Script SQL:** `azimut-cms/scripts/01-popular-page-home.sql`
   - Script para inserir dados no banco Neon
   - Safe: usa `ON CONFLICT DO UPDATE` (não duplica)

---

## 🎯 COMO EXECUTAR (5 MINUTOS):

### **PASSO 1: Abrir Neon Console**

1. Abra seu navegador
2. Vá em: https://console.neon.tech
3. Faça login (se necessário)
4. Selecione o projeto **Azimut**

---

### **PASSO 2: Abrir SQL Editor**

1. No menu lateral, clique em **"SQL Editor"**
2. Aguarde carregar (pode demorar alguns segundos)

---

### **PASSO 3: Copiar o Script SQL**

1. Abra o arquivo:
   ```
   azimut-cms/scripts/01-popular-page-home.sql
   ```

2. Selecione **TODO O CONTEÚDO** (Ctrl + A)

3. Copie (Ctrl + C)

---

### **PASSO 4: Colar e Executar**

1. No **SQL Editor** do Neon, cole o script (Ctrl + V)

2. **IMPORTANTE:** Clique no botão **"Run"** (NÃO em "Explain"!)

3. Aguarde a execução (5-10 segundos)

---

### **PASSO 5: Verificar Resultados**

Você deve ver **2 tabelas de resultado**:

**Tabela 1:** Dados da página HOME
```
name | slug | status    | seoTitlePt                  | seoTitleEn
Home | home | PUBLISHED | Azimut – Experiências...    | Azimut – Immersive...
```

**Tabela 2:** Seção "Studio Snapshot"
```
type       | order | titlePt              | titleEn
text-block | 1     | Retrato do estúdio   | Studio snapshot
```

---

## ✅ SE DEU CERTO:

- ✅ Nenhum erro vermelho
- ✅ 2 tabelas com dados aparecem
- ✅ Mensagem de sucesso no topo

---

## ❌ SE DEU ERRO:

### **ERRO: "relation 'Page' does not exist"**
❌ O schema não foi aplicado no banco.
✅ **Solução:** Execute primeiro a migration do Prisma:
   ```bash
   cd azimut-cms
   npx prisma migrate deploy
   ```

### **ERRO: "column 'xxx' does not exist"**
❌ O schema está desatualizado.
✅ **Solução:** Atualize o schema:
   ```bash
   cd azimut-cms
   npx prisma db push
   ```

### **ERRO: Timeout ou "Query timeout"**
❌ Neon está lento ou em modo sleep.
✅ **Solução:** Aguarde 30 segundos e tente novamente.

---

## 🎯 PRÓXIMO PASSO:

Depois de popular a HOME, vamos popular:

1. ✅ **Solutions** (serviços nas 4 línguas)
2. ✅ **Work** (projetos)
3. ✅ **Studio** (sobre o estúdio)
4. ✅ **Academy** (cursos)

---

## 💡 DICA:

**Salve este guia!** Vamos repetir esses passos para cada página/tabela.

---

**Me avise quando executar o script e eu te ajudo com o próximo!** 🚀
