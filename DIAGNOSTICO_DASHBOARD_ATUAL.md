# 🔍 DIAGNÓSTICO: DASHBOARD ANALYTICS ATUAL

**Data:** 11/01/2026  
**Status:** Dashboard carregando, mas usando API antiga

---

## ✅ O QUE ESTÁ FUNCIONANDO:

### **1. Dashboard Carrega:**
- ✅ Página `/admin/analytics` renderiza
- ✅ Dados sendo exibidos (sessões, scores, gráficos)
- ✅ Tabela "Sessões Recentes" funcionando

### **2. Dados Visíveis:**
- Total de Sessões: 100
- Com Perfil IA: 58 (58%)
- Leads Quentes: 26 (> 75% score)
- Leads Mornos: 6 (50-75% score)
- Score Médio: 55%
- Gráfico de pizza (conversion scores)
- Gráfico de barras (tipos de visitantes, países)
- Tabela de sessões recentes

---

## ⚠️ O QUE ESTÁ FALTANDO:

### **1. Gráfico de Linha - Timeline (FALTANDO!)**
**O que deveria ter:**
- Gráfico de linha mostrando PWA installs ao longo do tempo
- Gráfico de linha mostrando visitantes únicos por dia
- Período: últimos 30 dias (configurável)

**API já retorna isso:**
- `/api/admin/analytics/overview` retorna `charts.timeline`

---

### **2. Cards Overview (FALTANDO/INCOMPLETO)**
**O que deveria ter:**
- ✅ Total de Sessões (já tem)
- ❌ Visitantes Únicos (com fingerprint) - FALTANDO
- ❌ Visitantes Retornantes - FALTANDO
- ❌ Total de PWA Installs - FALTANDO
- ✅ Com Perfil IA (já tem)
- ✅ Leads Quentes/Mornos (já tem)

---

### **3. Tabela de Visitantes com Fingerprint (FALTANDO!)**
**O que deveria ter:**
- Colunas:
  - Fingerprint (hash)
  - Device (mobile/desktop/tablet)
  - Browser
  - País
  - Visitas (visitCount)
  - Última visita
  - Ações (ver detalhes)

**API já existe:**
- `/api/admin/analytics/visitors`

---

### **4. Tabela Lead Candidates (FALTANDO!)**
**O que deveria ter:**
- Visitantes com alta probabilidade de conversão
- Colunas:
  - Fingerprint
  - Probabilidade de Conversão (%)
  - Engajamento (score 0-100)
  - Device
  - País
  - Última visita

**API já existe:**
- `/api/admin/analytics/leads`

---

## 🔄 O QUE PRECISA SER ATUALIZADO:

### **1. Trocar API Antiga → Nova API**
**Dashboard atual provavelmente usa:**
- API antiga (não tem dados de PWA, fingerprint, etc)

**Deveria usar:**
- `/api/admin/analytics/overview` (métricas completas)
- `/api/admin/analytics/visitors` (visitantes com fingerprint)
- `/api/admin/analytics/leads` (lead candidates)

---

### **2. Adicionar Gráfico de Linha**
**Biblioteca:** Recharts ou Chart.js

**Dados:**
```json
{
  "charts": {
    "timeline": [
      { "date": "2026-01-01", "count": 10 },
      { "date": "2026-01-02", "count": 15 },
      ...
    ]
  }
}
```

**Visualização:**
- Linha 1: Visitantes únicos por dia
- Linha 2: PWA installs por dia (se houver dados)

---

### **3. Atualizar Cards**
**Adicionar novos cards:**
- Visitantes Únicos (com fingerprint)
- Visitantes Retornantes
- Total de PWA Installs

---

## 📋 CHECKLIST DO QUE FALTA:

- [ ] **Gráfico de linha timeline** (PWA installs, visitantes por dia)
- [ ] **Cards novos** (Visitantes Únicos, Retornantes, PWA Installs)
- [ ] **Tabela Visitantes com Fingerprint**
- [ ] **Tabela Lead Candidates**
- [ ] **Trocar API antiga → Nova API** (se necessário)
- [ ] **Testar se novas APIs funcionam**

---

## 🎯 PRÓXIMOS PASSOS:

1. ✅ Verificar qual API o dashboard atual usa
2. ⏳ Trocar para nova API `/api/admin/analytics/overview`
3. ⏳ Adicionar gráfico de linha timeline
4. ⏳ Adicionar cards novos
5. ⏳ Adicionar tabela visitantes com fingerprint
6. ⏳ Adicionar tabela lead candidates

---

**🔍 DIAGNÓSTICO:** Dashboard funciona, mas precisa usar as novas APIs e adicionar features novas!
