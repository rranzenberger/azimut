# 🚀 COMO EXECUTAR SQL VANCOUVER - ATUALIZAR TEXTOS NO BANCO

## 📍 **LOCAL DO SCRIPT:**
```
azimut-cms/scripts/ATUALIZAR_VANCOUVER_TEXTO_2026.sql
```

---

## ✅ **PASSO A PASSO:**

### 1. **Acessar Neon Console via Vercel:**
1. Acesse: https://vercel.com
2. Vá em **Storage** → **Neon**
3. Clique em **"Open in Neon"** ou **"SQL Editor"**

### 2. **Copiar e Colar o Script:**
1. Abra o arquivo: `azimut-cms/scripts/ATUALIZAR_VANCOUVER_TEXTO_2026.sql`
2. **Copie TODO o conteúdo**
3. Cole no **SQL Editor** do Neon

### 3. **Executar:**
1. Clique em **"Run"** ou **"Execute"**
2. Aguarde a execução
3. Verifique os resultados das queries de verificação no final

---

## 📋 **O QUE O SCRIPT FAZ:**

### ✅ **Atualiza Tabela `Page`:**
- Hero Slogan (Title) - 4 idiomas
- Hero Subtitle - 4 idiomas

### ✅ **Atualiza/Cria Tabela `Section`:**
- Hero Description CURTO (Mobile) - 4 idiomas
- Hero Description COMPLETO (Desktop) - 4 idiomas  
- CTA Hero - 4 idiomas

---

## 🔍 **VERIFICAÇÃO:**

O script inclui queries de verificação no final que mostram:
- ✅ Se a página foi atualizada
- ✅ Se as sections foram criadas/atualizadas

**Resultado esperado:**
- 1 linha na tabela `Page` (Vancouver)
- 3 linhas na tabela `Section` (hero_description_short, hero_description_full, cta_hero)

---

## ⚠️ **IMPORTANTE:**

- O script é **idempotente** (pode executar várias vezes sem problemas)
- Se a página não existir, ela será criada
- Se as sections não existirem, elas serão criadas
- Se já existirem, serão atualizadas

---

## 🎯 **PRÓXIMOS PASSOS:**

1. ✅ Execute o script no Neon
2. ✅ Verifique os resultados
3. ✅ Teste no backoffice se os textos aparecem corretamente
4. ✅ (Opcional) Verifique no site se está tudo funcionando

---

**Pronto!** 🎉
