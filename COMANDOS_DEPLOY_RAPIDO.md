# ⚡ COMANDOS DE DEPLOY RÁPIDO
**Data:** 15/01/2026  
**Uso:** Copiar/colar para deploy rápido

---

## 🚀 DEPLOY COMPLETO (ORDEM)

### **1. Preparar Banco (Neon SQL Editor)**

```sql
-- Copiar e executar: azimut-cms/scripts/populate-field-metadata.sql
-- Verificar:
SELECT COUNT(*) FROM field_metadata;
SELECT COUNT(*) FROM image_specifications;
```

### **2. Preparar Código**

```bash
# Verificar Prisma
cd azimut-cms
npx prisma format
npx prisma validate

# Gerar migration (se ainda não fez)
npx prisma migrate dev --name add_field_metadata_and_image_specs

# Testar build
npm run build

# Voltar para raiz
cd ..
```

### **3. Commit e Push**

```bash
git add -A
git commit -m "feat: Sistema de metadados backoffice - pronto para produção"
git push origin main
```

### **4. Deploy Vercel**

1. Acessar: https://vercel.com
2. Projeto backoffice → Redeploy
3. Aguardar build

### **5. Aplicar Migration (Produção)**

```bash
cd azimut-cms
npx prisma migrate deploy
```

### **6. Verificar**

```bash
# Testar API
curl https://backoffice.azmt.com.br/api/admin/metadata/home/hero/hero_title

# Testar health
curl https://backoffice.azmt.com.br/api/health
```

---

## 🛡️ ROLLBACK RÁPIDO

```bash
# Reverter código
git checkout checkpoint-pre-metadados-backoffice
git push origin main --force

# Reverter banco (Neon SQL Editor)
DROP TABLE IF EXISTS image_specifications;
DROP TABLE IF EXISTS field_metadata;
```

---

**Copie e cole na ordem!** 🚀
