# 🚀 GUIA: REDEPLOY BACKOFFICE E TESTAR APIs

**Data:** 11/01/2026  
**Status:** Pronto para deploy!

---

## ✅ ANTES DO DEPLOY:

### **O que já está feito:**
- ✅ Schema Prisma completo (PWAInstall, VisitorBehavior, campos novos)
- ✅ Migration SQL criada
- ✅ **Migration aplicada no banco localmente**
- ✅ Prisma Client gerado
- ✅ APIs criadas (`/api/admin/analytics/*`)

---

## 🚀 REDEPLOY DO BACKOFFICE:

### **Opção 1: Via Vercel (Recomendado)**
```bash
cd azimut-cms
git add .
git commit -m "feat: analytics tables migration applied"
git push origin main
```

**Vercel vai:**
- Fazer build automaticamente
- Executar `prisma generate`
- **NÃO** vai executar `prisma migrate deploy` (já aplicamos)
- Deploy do backoffice

### **Opção 2: Via Vercel Dashboard**
1. Acessar: https://vercel.com
2. Projeto: `azimut-cms`
3. Clicar em "Redeploy"

---

## ⚠️ IMPORTANTE: Migration no Vercel

**Atenção:** A migration já foi aplicada **localmente**, mas precisa verificar se o banco de **produção** também tem as tabelas.

### **Se o banco for o MESMO (local = produção):**
✅ **Tudo OK!** Migration já aplicada, APIs vão funcionar.

### **Se o banco for DIFERENTE (produção separado):**
⚠️ **Precisa aplicar migration no banco de produção também!**

**Como aplicar:**
1. Via Vercel CLI:
```bash
vercel env pull  # Pega DATABASE_URL de produção
cd azimut-cms
npx prisma migrate deploy  # Aplica no banco de produção
```

2. Ou no build script do Vercel:
```json
"build": "prisma generate && prisma migrate deploy && next build"
```

---

## 🧪 DEPOIS DO DEPLOY - TESTAR APIs:

### **1. Acessar Dashboard Analytics**
```
https://seu-backoffice.vercel.app/admin/analytics
```

**O que verificar:**
- ✅ Página carrega sem erro 500
- ✅ Não aparece "Table does not exist"
- ✅ Dados aparecem (mesmo que vazios inicialmente)

---

### **2. Testar API Overview**
```
GET https://seu-backoffice.vercel.app/api/admin/analytics/overview
```

**Resposta esperada:**
```json
{
  "success": true,
  "metrics": {
    "totalSessions": 0,
    "uniqueVisitors": 0,
    "returningVisitors": 0,
    "pwaInstalls": 0,
    "totalPageViews": 0,
    "bounceRate": 0,
    "avgSessionDuration": 0
  },
  "charts": {
    "timeline": [],
    "topPages": [],
    "countries": [],
    "devices": []
  }
}
```

**Se funcionar:** ✅ Tudo OK!  
**Se der erro 500:** ❌ Tabelas não existem no banco de produção

---

### **3. Testar API Visitors**
```
GET https://seu-backoffice.vercel.app/api/admin/analytics/visitors?page=1&limit=20
```

**Resposta esperada:**
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

---

### **4. Testar API Leads**
```
GET https://seu-backoffice.vercel.app/api/admin/analytics/leads
```

**Resposta esperada:**
```json
{
  "success": true,
  "leads": []
}
```

---

## 🐛 SE DER ERRO:

### **Erro: "Table 'PWAInstall' does not exist"**
**Causa:** Migration não aplicada no banco de produção.

**Solução:**
```bash
cd azimut-cms
vercel env pull
npx prisma migrate deploy
```

---

### **Erro: "Cannot find module '@prisma/client'"**
**Causa:** Prisma Client não gerado no build.

**Solução:** Verificar build script:
```json
"build": "prisma generate && next build"
```

---

### **Erro: "Unauthorized"**
**Causa:** Não está logado no backoffice.

**Solução:** Fazer login primeiro em `/admin/login`

---

## ✅ CHECKLIST DE TESTE:

- [ ] Backoffice deployado com sucesso
- [ ] Página `/admin/analytics` carrega
- [ ] API `/api/admin/analytics/overview` funciona
- [ ] API `/api/admin/analytics/visitors` funciona
- [ ] API `/api/admin/analytics/leads` funciona
- [ ] Não há erros 500 no console
- [ ] Dados aparecem (mesmo que vazios)

---

## 🎯 PRÓXIMOS PASSOS APÓS TESTAR:

### **Se APIs funcionarem:**
✅ Atualizar Dashboard com:
- Cards overview
- Gráfico PWA installs
- Tabela visitantes
- Tabela leads

### **Se APIs derem erro:**
❌ Aplicar migration no banco de produção primeiro

---

## 💡 DICA:

**Para testar rápido:**
1. Fazer redeploy
2. Acessar `/admin/analytics` no navegador
3. Verificar se carrega
4. Se carregar = ✅ Funcionou!
5. Se der erro = ❌ Verificar logs do Vercel

---

**🚀 Pode fazer redeploy agora!**  
**Depois me diga se funcionou! 😊**
