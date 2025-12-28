# ⚠️ AÇÃO NECESSÁRIA: Remover Pastas Antigas

**Data:** Janeiro 2025  
**Motivo:** Rota antiga `[slug]` interfere com nova rota catch-all `[...slug]`

---

## 🗑️ PASTAS PARA DELETAR

### **1. Frontend:**
```
DELETE: azimut-cms/app/admin/pages/[slug]/
MANTER: azimut-cms/app/admin/pages/[...slug]/
```

### **2. API:**
```
DELETE: azimut-cms/app/api/admin/pages/[slug]/
MANTER: azimut-cms/app/api/admin/pages/[...slug]/
```

---

## 📝 COMO DELETAR

### **Opção 1: Via Explorer (Windows)**
1. Abrir pasta do projeto
2. Navegar até `azimut-cms/app/admin/pages/`
3. Deletar pasta `[slug]`
4. Navegar até `azimut-cms/app/api/admin/pages/`
5. Deletar pasta `[slug]`

### **Opção 2: Via Terminal**
```bash
# No PowerShell
cd azimut-cms/app/admin/pages
Remove-Item -Recurse -Force "[slug]"

cd ../../api/admin/pages
Remove-Item -Recurse -Force "[slug]"
```

### **Opção 3: Via Git**
```bash
git rm -r azimut-cms/app/admin/pages/\[slug\]
git rm -r azimut-cms/app/api/admin/pages/\[slug\]
git commit -m "Remove old [slug] route, use catch-all [...slug] instead"
```

---

## ✅ VERIFICAÇÃO

Após deletar, a estrutura deve ficar assim:

```
app/admin/pages/
  └── [...slug]/          ← Apenas esta pasta
      └── edit/
          └── page.tsx

app/api/admin/pages/
  ├── [...slug]/          ← Apenas esta pasta
  │   └── route.ts
  └── route.ts            ← Lista todas páginas
```

---

## 🎯 POR QUE DELETAR?

1. **Evitar conflito:** Duas rotas para mesma coisa causa confusão
2. **Rota catch-all funciona para tudo:** `[...slug]` funciona tanto para `home` quanto para `studio/about`
3. **Código mais limpo:** Uma única rota é mais fácil de manter

---

**⚠️ IMPORTANTE:** Deletar essas pastas ANTES de fazer deploy!

**Status:** ⏳ **Aguardando ação manual**


