# 🚀 GUIA RÁPIDO - POPULAR BACKOFFICE MULTILÍNGUE

**Data**: 03 de janeiro de 2025  
**Tempo estimado**: 5 minutos

---

## ✅ **O QUE FAZER:**

### **1. ABRIR CONSOLE DO NEON/VERCEL** (2 min)

**Opção A - Neon Dashboard:**
1. Acesse: https://console.neon.tech/
2. Selecione seu projeto `azimut-cms`
3. Clique em "SQL Editor" no menu lateral
4. Cole o script abaixo

**Opção B - VS Code (se tiver extensão PostgreSQL):**
1. Conecte ao banco com a `DATABASE_URL`
2. Abra um novo query
3. Cole o script

---

### **2. EXECUTAR O SCRIPT** (1 min)

**Arquivo**: `azimut-cms/scripts/populate-multilingual-pages.sql`

**O script faz:**
1. Cria páginas `home`, `what`, `work`, `studio`, `academy` (se não existirem)
2. Atualiza hero title/subtitle em **4 idiomas** (PT/EN/FR/ES)
3. Atualiza pillars da home (3 botões)
4. Atualiza SEO title/description em **4 idiomas**
5. Verifica se foi populado corretamente

**Total de campos atualizados**: ~120 campos (5 páginas × 24 campos)

---

### **3. VERIFICAR SE FUNCIONOU** (2 min)

**Testar API diretamente:**

```bash
# Português
curl "https://backoffice.azmt.com.br/api/public/content?lang=pt&page=home"

# Inglês
curl "https://backoffice.azmt.com.br/api/public/content?lang=en&page=home"

# Francês
curl "https://backoffice.azmt.com.br/api/public/content?lang=fr&page=home"

# Espanhol
curl "https://backoffice.azmt.com.br/api/public/content?lang=es&page=home"
```

**Resposta esperada (PT):**
```json
{
  "lang": "pt",
  "heroSlogan": "EXPERIÊNCIAS QUE CONECTAM MUNDOS",
  "heroSubtitle": "Criamos experiências imersivas entre Brasil e Canadá.",
  "page": {
    "name": "Home",
    "slug": "home",
    "heroSlogan": "EXPERIÊNCIAS QUE CONECTAM MUNDOS",
    "heroSubtitle": "Criamos experiências imersivas entre Brasil e Canadá.",
    "pillars": [
      "Museus & Cultura",
      "Marcas & Eventos",
      "Educação & Pesquisa"
    ]
  }
}
```

---

## 🎯 **O QUE VAI ACONTECER DEPOIS:**

### **ANTES (Atual):**
```
/pt → "EXPERIÊNCIAS..." (do i18n.ts - frontend)
/en → "EXPERIENCES..." (do i18n.ts - frontend)
```

### **DEPOIS (Com banco populado):**
```
/pt → "EXPERIÊNCIAS..." (do backoffice - banco de dados) ✅
/en → "EXPERIENCES..." (do backoffice - banco de dados) ✅
```

**Frontend já está pronto**, só falta popular o banco!

---

## 📊 **ESTRUTURA DO BANCO (ANTES × DEPOIS):**

### **ANTES (Vazio):**
```sql
SELECT "heroSloganPt", "heroSloganEn" FROM "Page" WHERE slug = 'home';
```
**Resultado**: `NULL`, `NULL`

### **DEPOIS (Populado):**
```sql
SELECT "heroSloganPt", "heroSloganEn" FROM "Page" WHERE slug = 'home';
```
**Resultado**: 
```
EXPERIÊNCIAS QUE CONECTAM MUNDOS | EXPERIENCES THAT CONNECT WORLDS
```

---

## ✅ **CHECKLIST:**

- [ ] Abrir Neon SQL Editor
- [ ] Copiar script `populate-multilingual-pages.sql`
- [ ] Executar script
- [ ] Verificar query final (8 linhas no resultado)
- [ ] Testar API com curl (4 idiomas)
- [ ] Abrir site: `https://azimut.art/en` (deve mostrar inglês)
- [ ] Abrir site: `https://azimut.art/pt` (deve mostrar português)

---

## 🚨 **SE DER ERRO:**

### **Erro: "relation Page does not exist"**
**Causa**: Banco não foi inicializado  
**Solução**: Rodar migration do Prisma primeiro:
```bash
cd azimut-cms
npx prisma migrate deploy
```

### **Erro: "duplicate key value violates unique constraint"**
**Causa**: Páginas já existem  
**Solução**: Normal! O script usa `ON CONFLICT DO NOTHING`, então só vai atualizar

### **API retorna NULL em `heroSlogan`**
**Causa**: Script não rodou corretamente  
**Solução**: Verificar query final do script (passo 7)

---

## 📝 **PRÓXIMOS PASSOS (DEPOIS DE POPULAR):**

1. ✅ Testar site em 4 idiomas
2. ✅ Editar via backoffice (interface CMS)
3. ✅ Adicionar mais páginas (Contact, Press, etc)
4. ✅ Traduzir serviços e projetos

---

**Tempo total**: ~5 minutos  
**Complexidade**: Baixa (copiar e colar)  
**Impacto**: Site 100% multilíngue! 🌍

---

**Criado por**: Cursor AI + Ranz  
**Última atualização**: 03 de janeiro de 2025

