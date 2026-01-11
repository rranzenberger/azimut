# 📊 RESUMO: O QUE FALTA NO DASHBOARD

**Data:** 11/01/2026  
**Status Atual:** Dashboard funciona, mas falta features novas

---

## ✅ O QUE ESTÁ FUNCIONANDO AGORA:

1. ✅ Dashboard carrega (`/admin/analytics`)
2. ✅ Cards overview (Total Sessões, Perfil IA, Leads Quentes/Mornos)
3. ✅ Gráfico de pizza (distribuição scores)
4. ✅ Gráficos de barras (tipos visitantes, países)
5. ✅ Tabela de sessões recentes
6. ✅ Tabela de projetos mais visualizados

**API atual:** `/api/admin/analytics` (API antiga)

---

## ❌ O QUE ESTÁ FALTANDO:

### **1. Gráfico de Linha - Timeline (FALTANDO!)**

**O que deveria ter:**
```
📈 Gráfico de Linha
- Visitantes únicos por dia (últimos 30 dias)
- PWA installs por dia (se houver dados)
- Eixo X: Datas (01/01, 02/01, 03/01...)
- Eixo Y: Quantidade
```

**API já retorna isso:**
- `/api/admin/analytics/overview` → `charts.timeline`

**Status:** ❌ Não existe no dashboard atual

---

### **2. Cards Novos (FALTANDO!)**

**O que deveria ter:**
- ✅ Total de Sessões (já tem)
- ❌ **Visitantes Únicos** (com fingerprint) - FALTANDO
- ❌ **Visitantes Retornantes** - FALTANDO  
- ❌ **Total de PWA Installs** - FALTANDO
- ✅ Com Perfil IA (já tem)
- ✅ Leads Quentes/Mornos (já tem)

**API já retorna:**
- `/api/admin/analytics/overview` → `metrics.uniqueVisitors`
- `/api/admin/analytics/overview` → `metrics.returningVisitors`
- `/api/admin/analytics/overview` → `metrics.pwaInstalls`

**Status:** ❌ Não existem no dashboard atual

---

### **3. Tabela de Visitantes com Fingerprint (FALTANDO!)**

**O que deveria ter:**
```
Tabela: "Visitantes Recentes (com Fingerprint)"

Colunas:
- Fingerprint (hash único)
- Device (mobile/desktop/tablet)
- Browser (Chrome, Safari, etc)
- País
- Visitas (visitCount)
- Última visita
- Ações (ver detalhes)
```

**API já existe:**
- `/api/admin/analytics/visitors`

**Status:** ❌ Não existe no dashboard atual

---

### **4. Tabela Lead Candidates (FALTANDO!)**

**O que deveria ter:**
```
Tabela: "Lead Candidates"

Colunas:
- Fingerprint
- Probabilidade de Conversão (%)
- Engajamento (score 0-100)
- Device
- País
- Última visita
- Ações (converter em lead)
```

**API já existe:**
- `/api/admin/analytics/leads`

**Status:** ❌ Não existe no dashboard atual

---

## 🔄 O QUE PRECISA SER FEITO:

### **1. Testar Novas APIs (PRIMEIRO)**

**APIs para testar:**
- ✅ `/api/admin/analytics/overview`
- ✅ `/api/admin/analytics/visitors`
- ✅ `/api/admin/analytics/leads`

**Como testar:**
1. Abrir DevTools (F12)
2. Console
3. Colar: `fetch('/api/admin/analytics/overview').then(r => r.json()).then(console.log)`
4. Ver se retorna JSON

**✅ Se funcionar:** Pode atualizar dashboard  
**❌ Se der erro:** Migration não aplicada ou tabelas não existem

---

### **2. Atualizar Dashboard (DEPOIS)**

**Arquivo:** `azimut-cms/app/admin/analytics/page.tsx`

**Mudanças:**
1. **Trocar API:** `/api/admin/analytics` → `/api/admin/analytics/overview`
2. **Adicionar gráfico de linha** (timeline)
3. **Adicionar cards novos** (Visitantes Únicos, Retornantes, PWA Installs)
4. **Adicionar tabela visitantes** (com fingerprint)
5. **Adicionar tabela leads** (lead candidates)

---

## 📋 CHECKLIST COMPLETO:

### **Testar APIs:**
- [ ] Testar `/api/admin/analytics/overview`
- [ ] Testar `/api/admin/analytics/visitors`
- [ ] Testar `/api/admin/analytics/leads`
- [ ] Verificar se todas retornam JSON válido

### **Atualizar Dashboard:**
- [ ] Gráfico de linha timeline
- [ ] Card Visitantes Únicos
- [ ] Card Visitantes Retornantes
- [ ] Card PWA Installs
- [ ] Tabela Visitantes com Fingerprint
- [ ] Tabela Lead Candidates

---

## 🎯 ORDEM DE EXECUÇÃO:

```
1. ⏳ Testar APIs novas (AGORA)
   └─ Verificar se funcionam

2. ⏳ Atualizar Dashboard (DEPOIS)
   ├─ Trocar API antiga → nova
   ├─ Adicionar gráfico de linha
   ├─ Adicionar cards novos
   ├─ Adicionar tabela visitantes
   └─ Adicionar tabela leads
```

---

## 💡 RESUMO RÁPIDO:

**O que funciona:**
- ✅ Dashboard atual (API antiga)
- ✅ Gráficos de pizza e barras
- ✅ Tabela de sessões

**O que falta:**
- ❌ Gráfico de linha timeline
- ❌ Cards novos (Visitantes Únicos, Retornantes, PWA)
- ❌ Tabela visitantes com fingerprint
- ❌ Tabela lead candidates

**Próximo passo:**
- 🔍 Testar se as novas APIs funcionam
- 🎨 Depois atualizar dashboard

---

**🚀 Comece testando as APIs primeiro!**
