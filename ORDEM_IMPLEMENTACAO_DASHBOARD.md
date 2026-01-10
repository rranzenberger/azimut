# 📋 ORDEM DE IMPLEMENTAÇÃO - DASHBOARD ANALYTICS

**Data:** 11/01/2026  
**Recomendação:** Migration primeiro, Dashboard depois

---

## ✅ ORDEM RECOMENDADA:

### **FASE 1: Migration Prisma (CRÍTICO - Fazer Primeiro) ⚡**

**Por quê primeiro?**
- Sem as tabelas, as APIs vão falhar
- Dashboard não vai funcionar
- É pré-requisito para tudo

**O que fazer:**
```bash
cd azimut-cms
npx prisma migrate dev --name add_analytics_tables
npx prisma generate
```

**Resultado:**
- ✅ Tabela `PWAInstall` criada
- ✅ Tabela `VisitorBehavior` criada
- ✅ Campos novos em `VisitorSession` adicionados
- ✅ Prisma Client atualizado

**Tempo estimado:** 2-3 minutos

---

### **FASE 2: Atualizar Dashboard (Depois da Migration) 📊**

**O que fazer:**
1. ✅ Conectar com `/api/admin/analytics/overview`
2. ✅ Adicionar gráficos de PWA installs
3. ✅ Adicionar tabela de visitantes com fingerprint
4. ✅ Adicionar seção Lead Candidates

**Tempo estimado:** 30-45 minutos

---

## 🎯 PLANO DETALHADO:

### **PASSO 1: Migration (CRÍTICO)**

**Arquivo:** `azimut-cms/prisma/schema.prisma` (já atualizado ✅)

**Comandos:**
```bash
cd azimut-cms
npx prisma migrate dev --name add_analytics_tables
npx prisma generate
```

**Verificar:**
- ✅ Migration criada em `prisma/migrations/`
- ✅ Tabelas criadas no banco
- ✅ Sem erros

---

### **PASSO 2: Testar APIs**

**Endpoints a testar:**
- `/api/admin/analytics/overview` → Retorna métricas
- `/api/admin/analytics/visitors` → Lista visitantes
- `/api/admin/analytics/leads` → Lead candidates

**Se APIs funcionarem = Migration OK ✅**

---

### **PASSO 3: Atualizar Dashboard**

**Arquivo:** `azimut-cms/app/admin/analytics/page.tsx`

**Mudanças:**
1. Trocar API antiga por `/api/admin/analytics/overview`
2. Adicionar seções novas:
   - Gráfico de linha: PWA installs timeline
   - Cards: Visitantes únicos, Retornantes, PWA installs
   - Tabela: Visitantes recentes (com fingerprint)
   - Tabela: Lead Candidates

---

## ⚠️ IMPORTANTE:

**NÃO fazer dashboard antes da migration:**
- ❌ APIs vão dar erro 500
- ❌ Dashboard vai quebrar
- ❌ Vai perder tempo

**FAZER migration primeiro:**
- ✅ APIs funcionam
- ✅ Dashboard conecta perfeitamente
- ✅ Tudo funciona de primeira

---

## 🚀 VAMOS COMEÇAR?

**Ordem:**
1. ✅ **Migration Prisma** (2-3 min)
2. ✅ **Testar APIs** (1 min)
3. ✅ **Atualizar Dashboard** (30-45 min)

**Quer que eu faça na ordem correta agora?**
