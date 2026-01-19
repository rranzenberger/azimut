# 🚀 ORDEM DE IMPLEMENTAÇÃO - PASSO A PASSO

**Recomendação:** Migration primeiro, Dashboard depois

---

## ✅ ORDEM CORRETA:

### **1️⃣ PRIMEIRO: Migration Prisma (CRÍTICO)**

**Por quê primeiro?**
- Sem tabelas no banco, APIs retornam erro 500
- Dashboard não funciona sem dados
- É pré-requisito obrigatório

**Comandos:**
```bash
cd azimut-cms
npx prisma migrate dev --name add_analytics_tables
npx prisma generate
```

**O que cria:**
- ✅ Tabela `PWAInstall`
- ✅ Tabela `VisitorBehavior`
- ✅ Campos novos em `VisitorSession`
- ✅ Prisma Client atualizado

**Tempo:** 2-3 minutos

---

### **2️⃣ SEGUNDO: Testar APIs (Rápido)**

**Testar endpoints:**
- `GET /api/admin/analytics/overview`
- `GET /api/admin/analytics/visitors`
- `GET /api/admin/analytics/leads`

**Se retornar dados = OK ✅**

**Tempo:** 1 minuto

---

### **3️⃣ TERCEIRO: Atualizar Dashboard**

**Arquivo:** `azimut-cms/app/admin/analytics/page.tsx`

**Mudanças:**
1. ✅ Conectar com `/api/admin/analytics/overview`
2. ✅ Adicionar gráfico de PWA installs (linha)
3. ✅ Adicionar tabela de visitantes (com fingerprint)
4. ✅ Adicionar seção Lead Candidates

**Tempo:** 30-45 minutos

---

## 🎯 POR QUE ESTA ORDEM?

### ❌ **Se fizer Dashboard primeiro:**
- APIs vão dar erro 500 (tabelas não existem)
- Dashboard vai quebrar
- Você vai perder tempo debugando

### ✅ **Se fizer Migration primeiro:**
- APIs funcionam perfeitamente
- Dashboard conecta e mostra dados
- Tudo funciona de primeira

---

## 📋 CHECKLIST:

- [ ] **1. Rodar Migration** (FAZER AGORA)
- [ ] **2. Testar APIs** (1 min)
- [ ] **3. Atualizar Dashboard** (30-45 min)

---

## 🚀 VAMOS COMEÇAR?

**Quer que eu:**
1. **Crie os comandos de migration prontos?** ✅
2. **Atualize o dashboard depois?** ✅

**OU você prefere rodar a migration manualmente primeiro?**

---

## 💡 SUGESTÃO:

**Opção A: Você roda migration, eu atualizo dashboard**
- Você: `cd azimut-cms && npx prisma migrate dev --name add_analytics_tables`
- Eu: Atualizo dashboard completo enquanto você roda

**Opção B: Eu faço tudo**
- Eu crio script de migration
- Você só aprova e roda
- Depois eu atualizo dashboard

**Qual prefere?**
