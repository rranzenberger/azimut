# 🔍 GUIA PASSO A PASSO: TESTAR APIs NOVAS

**Data:** 11/01/2026  
**Objetivo:** Verificar se as novas APIs funcionam

---

## ✅ PASSO 1: Testar API Overview

### **No Navegador (Fácil):**

1. **Acessar a URL:**
```
https://backoffice.azmt.com.br/api/admin/analytics/overview
```

**OU se estiver logado, abrir DevTools (F12) e executar:**

```javascript
fetch('/api/admin/analytics/overview')
  .then(r => r.json())
  .then(data => console.log(data))
  .catch(err => console.error(err))
```

### **Resultado Esperado:**
```json
{
  "success": true,
  "metrics": {
    "totalSessions": 100,
    "uniqueVisitors": 50,
    "returningVisitors": 10,
    "pwaInstalls": 0,
    "totalPageViews": 500,
    "bounceRate": 0,
    "avgSessionDuration": 5
  },
  "charts": {
    "timeline": [
      { "date": "2026-01-10", "count": 10 },
      { "date": "2026-01-11", "count": 15 }
    ],
    "topPages": [],
    "countries": [],
    "devices": []
  }
}
```

**✅ Se funcionar:** API está OK!  
**❌ Se der erro 500:** Tabelas não existem ou migration não aplicada

---

## ✅ PASSO 2: Testar API Visitors

### **No Navegador:**

```
https://backoffice.azmt.com.br/api/admin/analytics/visitors?page=1&limit=20
```

**OU via DevTools:**

```javascript
fetch('/api/admin/analytics/visitors?page=1&limit=20')
  .then(r => r.json())
  .then(data => console.log(data))
  .catch(err => console.error(err))
```

### **Resultado Esperado:**
```json
{
  "success": true,
  "visitors": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 0,
    "totalPages": 0
  }
}
```

**✅ Se funcionar:** API está OK!  
**❌ Se der erro 500:** Verificar logs

---

## ✅ PASSO 3: Testar API Leads

### **No Navegador:**

```
https://backoffice.azmt.com.br/api/admin/analytics/leads
```

**OU via DevTools:**

```javascript
fetch('/api/admin/analytics/leads')
  .then(r => r.json())
  .then(data => console.log(data))
  .catch(err => console.error(err))
```

### **Resultado Esperado:**
```json
{
  "success": true,
  "leads": []
}
```

**✅ Se funcionar:** API está OK!

---

## 📋 CHECKLIST DE TESTE:

- [ ] API `/api/admin/analytics/overview` funciona
- [ ] API `/api/admin/analytics/visitors` funciona
- [ ] API `/api/admin/analytics/leads` funciona
- [ ] Todas retornam JSON válido
- [ ] Não há erros 500

---

## 🎯 DEPOIS DE TESTAR:

### **Se APIs funcionarem:**
✅ **Atualizar Dashboard:**
- Adicionar gráfico de linha timeline
- Adicionar cards novos
- Adicionar tabela visitantes com fingerprint
- Adicionar tabela lead candidates

### **Se APIs derem erro:**
❌ **Verificar:**
- Migration aplicada no banco?
- Tabelas existem?
- Prisma Client gerado?

---

## 💡 DICA RÁPIDA:

**Teste mais rápido:**
1. Abrir DevTools (F12)
2. Console
3. Colar: `fetch('/api/admin/analytics/overview').then(r => r.json()).then(console.log)`
4. Enter
5. Ver resultado

**Se aparecer JSON = ✅ Funcionou!**  
**Se aparecer erro = ❌ Verificar logs**

---

**🚀 Comece testando a API overview primeiro!**
