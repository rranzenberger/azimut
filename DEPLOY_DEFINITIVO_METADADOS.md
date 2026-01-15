# 🚀 DEPLOY DEFINITIVO - METADADOS BACKOFFICE
**Data:** 15/01/2026  
**Status:** ✅ **GUIA COMPLETO DE DEPLOY**

---

## ✅ CHECKLIST ANTES DO DEPLOY

### **1. Verificações Locais:**
- [ ] Models Prisma adicionados e validados
- [ ] Migration criada e testada localmente
- [ ] API endpoints criados e testados
- [ ] Componente React criado e testado
- [ ] SQL executado no Neon (metadados populados)
- [ ] Tudo funcionando em localhost

### **2. Verificações de Banco:**
- [ ] Tabelas criadas no Neon (`field_metadata`, `image_specifications`)
- [ ] Metadados populados (verificar com `SELECT COUNT(*)`)
- [ ] Índices criados
- [ ] Conexão com banco funcionando

### **3. Verificações de Código:**
- [ ] Sem erros de TypeScript
- [ ] Sem erros de lint
- [ ] Build do backoffice funciona (`npm run build`)
- [ ] Build do site funciona (`npm run build`)

---

## 🔧 PASSO 1: PREPARAR BANCO DE DADOS (PRODUÇÃO)

### **1.1. Executar SQL no Neon (Produção)**

1. Acessar: https://console.neon.tech
2. Selecionar projeto de **produção**
3. Abrir **SQL Editor**
4. Executar: `azimut-cms/scripts/populate-field-metadata.sql`
5. Verificar:
   ```sql
   SELECT COUNT(*) FROM field_metadata;
   SELECT COUNT(*) FROM image_specifications;
   ```
   **Esperado:** Números > 0

---

## 🔧 PASSO 2: PREPARAR CÓDIGO

### **2.1. Verificar Prisma Schema**

```bash
cd azimut-cms
npx prisma format
npx prisma validate
```

**Esperado:** Sem erros

### **2.2. Gerar Migration (se ainda não fez)**

```bash
cd azimut-cms
npx prisma migrate dev --name add_field_metadata_and_image_specs
```

### **2.3. Verificar Build**

```bash
# Backoffice
cd azimut-cms
npm run build

# Site (se necessário)
cd ..
npm run build
```

**Esperado:** Build sem erros

---

## 🔧 PASSO 3: COMMIT E PUSH

### **3.1. Verificar Mudanças**

```bash
git status
git diff
```

### **3.2. Commit Final**

```bash
git add -A
git commit -m "feat: Sistema de metadados backoffice completo

- Models Prisma (FieldMetadata, ImageSpecification)
- API endpoints para buscar metadados
- Componente FieldEditorWithMetadata
- SQL populado no banco
- Pronto para produção"
```

### **3.3. Push**

```bash
git push origin main
```

---

## 🔧 PASSO 4: DEPLOY NO VERCEL

### **4.1. Deploy Backoffice**

1. Acessar: https://vercel.com
2. Selecionar projeto `azimut-cms` (backoffice)
3. Ir em **Deployments**
4. Clicar em **Redeploy** (último commit)
5. Ou aguardar deploy automático (se configurado)

### **4.2. Verificar Deploy**

1. Aguardar build completar
2. Verificar logs de build (sem erros)
3. Testar URL: https://backoffice.azmt.com.br/api/health

**Esperado:** Status 200 OK

### **4.3. Testar API Endpoints**

```bash
# Testar metadata endpoint
curl https://backoffice.azmt.com.br/api/admin/metadata/home/hero/hero_title

# Testar image spec endpoint
curl https://backoffice.azmt.com.br/api/admin/image-spec/home/hero/hero_image_url
```

**Esperado:** JSON com dados de metadados

---

## 🔧 PASSO 5: APLICAR MIGRATION EM PRODUÇÃO

### **5.1. Via Vercel (Recomendado)**

1. Acessar: https://vercel.com
2. Projeto → Settings → Environment Variables
3. Verificar `DATABASE_URL` está configurada
4. Deploy automático aplica migrations

### **5.2. Via CLI (Alternativo)**

```bash
cd azimut-cms
npx prisma migrate deploy
```

**⚠️ IMPORTANTE:** Usar `migrate deploy` (não `migrate dev`) em produção

---

## 🔧 PASSO 6: VERIFICAÇÃO FINAL

### **6.1. Testar Backoffice Admin**

1. Acessar: https://backoffice.azmt.com.br/admin
2. Fazer login
3. Ir em página de edição (ex: Home)
4. Verificar que metadados aparecem nos campos
5. Testar validação (tentar passar do limite de caracteres)
6. Testar contador de caracteres

### **6.2. Testar API Endpoints**

```bash
# Metadata por campo
curl https://backoffice.azmt.com.br/api/admin/metadata/home/hero/hero_title

# Metadata por seção
curl https://backoffice.azmt.com.br/api/admin/metadata/home/hero

# Image spec
curl https://backoffice.azmt.com.br/api/admin/image-spec/home/hero/hero_image_url
```

**Esperado:** JSON válido com dados

### **6.3. Verificar Banco de Dados**

```sql
-- No Neon SQL Editor (produção)
SELECT 
  page_slug,
  section_key,
  COUNT(*) as total_fields
FROM field_metadata
GROUP BY page_slug, section_key;

-- Verificar especificações de imagens
SELECT COUNT(*) FROM image_specifications;
```

**Esperado:** Dados populados

---

## 🛡️ ROLLBACK (SE DER PROBLEMA)

### **Reverter Deploy:**

1. Acessar Vercel → Deployments
2. Encontrar deploy anterior (antes das mudanças)
3. Clicar em **"..."** → **Redeploy**

### **Reverter Código:**

```bash
git checkout checkpoint-pre-metadados-backoffice
git push origin main --force
```

### **Reverter Banco:**

```sql
-- No Neon SQL Editor
DROP TABLE IF EXISTS image_specifications;
DROP TABLE IF EXISTS field_metadata;
```

---

## 📋 CHECKLIST FINAL DE DEPLOY

### **Antes de Fazer Deploy:**
- [ ] Tudo testado em localhost
- [ ] Build funciona sem erros
- [ ] SQL executado no Neon (produção)
- [ ] Migration criada
- [ ] Commit e push feito

### **Durante Deploy:**
- [ ] Build no Vercel sem erros
- [ ] Migration aplicada em produção
- [ ] API endpoints respondendo

### **Após Deploy:**
- [ ] Backoffice admin funcionando
- [ ] Metadados aparecendo nos campos
- [ ] Validação funcionando
- [ ] Banco de dados populado

---

## 🚨 TROUBLESHOOTING

### **Erro: "Table does not exist"**
- ✅ Verificar se SQL foi executado no Neon
- ✅ Verificar se migration foi aplicada

### **Erro: "Model not found"**
- ✅ Verificar se Prisma Client foi gerado
- ✅ Verificar se schema.prisma está correto

### **Erro: "API endpoint not found"**
- ✅ Verificar se arquivos foram criados
- ✅ Verificar se build incluiu os arquivos

### **Erro: "Metadata not found"**
- ✅ Verificar se SQL populou dados
- ✅ Verificar se está no banco correto (produção)

---

## ✅ RESUMO DO DEPLOY

### **Ordem de Execução:**
1. ✅ Executar SQL no Neon (produção)
2. ✅ Gerar migration Prisma
3. ✅ Testar build local
4. ✅ Commit e push
5. ✅ Deploy no Vercel
6. ✅ Aplicar migration em produção
7. ✅ Verificar tudo funcionando

### **Tempo Estimado:**
- SQL no Neon: 5 min
- Migration: 2 min
- Build e teste: 5 min
- Deploy Vercel: 5-10 min
- Verificação: 5 min

**Total:** ~30 minutos

---

## 🎯 PRÓXIMOS PASSOS APÓS DEPLOY

1. **Testar com estagiário** (validação de usabilidade)
2. **Popular metadados de outras páginas** (Vancouver, WhatWeDo, etc.)
3. **Expandir funcionalidades** (mais validações, mais campos)

---

**✅ TUDO PRONTO PARA DEPLOY DEFINITIVO!**

Seguir os passos na ordem e verificar cada etapa antes de avançar! 🚀
