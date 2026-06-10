# 🚀 SCRIPT AUTOMÁTICO: POPULAR SERVIÇOS NO BACKOFFICE

**Data:** 01/01/2026  
**Objetivo:** Inserir os 6 serviços diretamente no banco de dados com textos em 4 idiomas

---

## ✅ OPÇÕES DE EXECUÇÃO

### **OPÇÃO 1: Via Supabase SQL Editor (MAIS FÁCIL)** ⭐

1. **Acessar Supabase:**
   - https://supabase.com/dashboard
   - Login com sua conta
   - Selecionar projeto `azimut-backoffice`

2. **Abrir SQL Editor:**
   - Menu lateral → SQL Editor
   - Clicar em "New query"

3. **Colar o script:**
   - Abrir: `azimut-cms/migrations/popular_servicos.sql`
   - Copiar TUDO
   - Colar no SQL Editor

4. **Executar:**
   - Clicar em botão "Run" (ou Ctrl + Enter)
   - Aguardar mensagem de sucesso

5. **Verificar:**
   - Deve aparecer lista dos 6 serviços criados
   - Status: PUBLISHED
   - Prioridades: 1, 2, 3, 4, 5, 6

---

### **OPÇÃO 2: Via Prisma Studio** 

1. **No terminal do backoffice:**
   ```bash
   cd azimut-cms
   npx prisma studio
   ```

2. **Abrir no navegador:**
   - http://localhost:5555

3. **Acessar tabela "Service":**
   - Clicar em "Service"
   - Clicar em "Add record"
   - Preencher campos manualmente (trabalhoso!)

**❌ NÃO RECOMENDADO** - Muito demorado!

---

### **OPÇÃO 3: Via psql (Linha de comando)**

```bash
# Conectar no banco
psql $DATABASE_URL -f azimut-cms/migrations/popular_servicos.sql
```

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

**Antes (fallback):**
```
⚠️ Usando serviços estáticos (fallback)
```

**Depois (backoffice):**
```
✅ Usando serviços do backoffice
```

---

## 🔄 SE JÁ EXISTIREM SERVIÇOS

### **Opção A: Manter e adicionar novos**
Comentar a linha 9 do script:
```sql
-- DELETE FROM "Service";  ← Deixar comentado
```

### **Opção B: Resetar e adicionar novos**
Descomentar a linha 9:
```sql
DELETE FROM "Service";  ← Vai deletar TODOS os serviços existentes
```

**⚠️ CUIDADO!** Opção B deleta tudo!

---

## 🎯 VANTAGENS DESTE MÉTODO

✅ **Rápido:** 30 segundos vs 20 minutos manual  
✅ **Sem erros:** Textos já testados e aprovados  
✅ **4 idiomas:** Tudo de uma vez  
✅ **Seguro:** Script SQL testado  
✅ **Repetível:** Pode executar em staging/produção  

---

## 📝 DEPOIS DE POPULAR

### **Você pode:**

1. **Editar textos** no backoffice
2. **Trocar ícones**
3. **Mudar ordem** (alterar priority)
4. **Desabilitar** serviços (status DRAFT)
5. **Adicionar mais** serviços

**Tudo sem tocar no código!** ✅

---

## 🐛 SE DER ERRO

### **Erro: "relation Service does not exist"**
**Solução:** Rodar migrations primeiro:
```bash
cd azimut-cms
npx prisma migrate deploy
```

### **Erro: "duplicate key value violates unique constraint"**
**Solução:** Serviços já existem! Opções:
1. Deletar serviços existentes no backoffice
2. Mudar slugs no script (ex: `cinema-audiovisual-2`)

### **Erro: "permission denied for table Service"**
**Solução:** Verificar DATABASE_URL tem permissões corretas

---

## ✅ CHECKLIST

- [ ] Acessei Supabase SQL Editor
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

**Execute o script e teste! 🚀**

