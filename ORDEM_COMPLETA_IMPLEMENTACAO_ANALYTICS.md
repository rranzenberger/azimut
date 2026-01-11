# 🎯 ORDEM COMPLETA - IMPLEMENTAÇÃO ANALYTICS

**Data:** 11/01/2026  
**Status Atual:** ✅ Migration aplicada com sucesso!

---

## ✅ FASE 1: MIGRATION (CONCLUÍDA!)

### **O que foi feito:**
1. ✅ Schema Prisma completo (PWAInstall, VisitorBehavior, campos novos)
2. ✅ Migration SQL criada manualmente
3. ✅ **Migration aplicada no banco** (SQL executado com sucesso!)
4. ✅ Prisma Client gerado

**Resultado:** Tabelas criadas no banco PostgreSQL ✅

---

## ⏳ FASE 2: TESTAR APIs (PRÓXIMO PASSO)

### **APIs para testar:**

**1. Overview - Métricas Gerais**
```
GET /api/admin/analytics/overview
```
**Esperado:**
```json
{
  "totalVisitors": 0,
  "uniqueVisitors": 0,
  "pwaInstalls": 0,
  "returningVisitors": 0,
  "topCountries": [],
  "topDevices": [],
  "visitsByDay": []
}
```

**2. Visitors - Lista de Visitantes**
```
GET /api/admin/analytics/visitors?page=1&limit=20
```
**Esperado:** Array de visitantes com fingerprint

**3. Leads - Lead Candidates**
```
GET /api/admin/analytics/leads
```
**Esperado:** Array de visitantes com alta probabilidade de conversão

---

### **Como testar:**

**Opção 1: Via Backoffice**
- Acessar `/admin/analytics`
- Verificar se dados aparecem (pode estar vazio inicialmente)

**Opção 2: Via API Direta**
- Usar Postman/Insomnia/curl
- Ou testar no navegador se GET permitido

**Opção 3: Via Logs**
- Rodar backoffice localmente
- Fazer requests e ver logs

---

## ⏳ FASE 3: ATUALIZAR DASHBOARD (DEPOIS DE TESTAR)

### **Arquivo:** `azimut-cms/app/admin/analytics/page.tsx`

### **O que adicionar:**

#### **1. Cards Overview** (Topo)
```typescript
- Visitantes Únicos (com fingerprint)
- Visitantes Retornantes
- Instalações PWA (total)
- Taxa de Conversão (%)
```

#### **2. Gráfico de Linha - PWA Installs Timeline**
- Últimos 30 dias
- Mostrar: Installs por dia
- Usar Recharts ou Chart.js

#### **3. Tabela - Visitantes Recentes**
**Colunas:**
- Fingerprint (hash)
- Device (mobile/desktop/tablet)
- Browser
- País
- Visitas
- Última visita
- Ações (ver detalhes)

**Filtros:**
- País
- Device Type
- Retornante (sim/não)

#### **4. Tabela - Lead Candidates**
**Colunas:**
- Fingerprint
- Probabilidade de Conversão (%)
- Engajamento (score 0-100)
- Device
- País
- Última visita
- Ações (converter em lead)

**Filtro:**
- Apenas `conversionProbability > 0.7`

---

## 📋 CHECKLIST COMPLETO:

### ✅ **CONCLUÍDO:**
- [x] Schema Prisma completo
- [x] APIs criadas (overview, visitors, leads)
- [x] Frontend tracking integrado
- [x] Migration SQL criada
- [x] **Migration aplicada no banco** ✅
- [x] Prisma Client gerado

### ⏳ **PRÓXIMOS PASSOS:**
- [ ] Testar API `/api/admin/analytics/overview`
- [ ] Testar API `/api/admin/analytics/visitors`
- [ ] Testar API `/api/admin/analytics/leads`
- [ ] Atualizar Dashboard com cards overview
- [ ] Adicionar gráfico PWA installs timeline
- [ ] Adicionar tabela visitantes recentes
- [ ] Adicionar tabela lead candidates

---

## 🎯 ORDEM EXECUTIVA:

```
✅ 1. Migration Prisma → FEITO!
⏳ 2. Testar APIs → AGORA
⏳ 3. Atualizar Dashboard → DEPOIS
```

---

## 💡 PRÓXIMA AÇÃO:

**Testar as APIs para garantir que funcionam!**

Se as APIs funcionarem, podemos seguir para atualizar o dashboard. Se der erro, verificar logs e corrigir.

---

**✅ MIGRATION APLICADA COM SUCESSO!**  
**🚀 PRÓXIMO: Testar APIs**
