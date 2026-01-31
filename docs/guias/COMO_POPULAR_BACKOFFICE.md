# 🚀 SCRIPTS PARA POPULAR BACKOFFICE

**Data:** 2026-01-20  
**Status:** ✅ Pronto para executar

---

## 📦 **OPÇÕES DISPONÍVEIS:**

### **OPÇÃO 1: SQL Direto (Mais Rápido)** ⭐

Cole o arquivo SQL completo no Neon SQL Editor:

```bash
sql/populate_company_history_complete.sql
```

**Passos:**
1. Acesse: https://console.neon.tech
2. Selecione o projeto Azimut
3. Clique em "SQL Editor"
4. Cole TODO o conteúdo do arquivo acima
5. Clique em "Run"
6. ✅ Pronto! ~30 eventos inseridos

---

### **OPÇÃO 2: Script Bash (Linux/Mac)**

Execute o script automatizado:

```bash
chmod +x scripts/populate-backoffice.sh
./scripts/populate-backoffice.sh
```

**O que faz:**
1. ✅ Verifica dependências
2. ✅ Gera cliente Prisma
3. ✅ Aplica migrations
4. ✅ Popula o banco

---

### **OPÇÃO 3: Script Node.js (TypeScript)**

Para desenvolvimento:

```bash
cd azimut-cms
npx tsx ../scripts/populate-history.ts
```

**O que faz:**
1. ✅ Verifica se já existe dados
2. ✅ Limpa dados existentes (opcional)
3. ✅ Insere eventos um por um
4. ✅ Mostra progresso

---

## 🔧 **VERIFICAR SE FUNCIONOU:**

### **1. Via API:**
```bash
curl https://cms.azimut.com.br/api/public/history?lang=pt
```

### **2. Via SQL:**
```sql
SELECT COUNT(*) FROM "CompanyHistory";
-- Deve retornar ~30
```

### **3. Via Frontend:**
```
http://localhost:5173/pt/studio/credibilidade
```

---

## 📊 **DADOS QUE SERÃO INSERIDOS:**

### **Por Década:**
- **1980-1995:** 3 eventos (formação)
- **1996-2000:** 8 eventos (fundação)
- **2000-2005:** 10 eventos (reconhecimento)
- **2005-2012:** 8 eventos (games)
- **2010-2026:** 5 eventos (era moderna)

### **Por Tipo:**
- **milestone:** 8 eventos
- **partnership:** 10 eventos
- **project:** 7 eventos
- **award:** 3 eventos
- **location:** 2 eventos

### **Featured (Destaques):**
- 15 eventos marcados como destaque
- Aparecem primeiro nos filtros

---

## 🗂️ **ESTRUTURA DOS DADOS:**

Cada evento tem:

```typescript
{
  year: number          // Ano inicial
  yearEnd?: number      // Ano final (para períodos)
  type: 'milestone' | 'partnership' | 'project' | 'award' | 'location'
  
  // Multilíngue (PT/EN/ES/FR)
  titlePt: string
  titleEn: string
  titleEs?: string
  titleFr?: string
  
  descriptionPt?: string
  descriptionEn?: string
  descriptionEs?: string
  descriptionFr?: string
  
  // Bullets (arrays)
  bulletsPt?: string[]
  bulletsEn?: string[]
  bulletsEs?: string[]
  bulletsFr?: string[]
  
  // Metadados
  icon?: string         // Emoji
  logoUrl?: string      // URL logo parceria
  externalLink?: string // Link externo
  
  // Flags
  isPublished: boolean  // default: true
  isFeatured: boolean   // default: false
  displayOrder: number  // ordem de exibição
}
```

---

## 🎯 **CAMPOS ADICIONAIS (SE PRECISAR):**

Se você quiser adicionar mais campos no futuro:

### **1. Atualizar schema Prisma:**
```prisma
model CompanyHistory {
  // ... campos existentes ...
  
  // NOVOS CAMPOS (exemplo):
  videoUrl       String?  // URL de vídeo
  imageUrl       String?  // URL de imagem
  galleryUrls    String[] // Array de URLs de galeria
  relatedProjects String[] // IDs de projetos relacionados
  tags           String[] // Tags para busca
  
  // ... resto ...
}
```

### **2. Criar migration:**
```bash
cd azimut-cms
npx prisma migrate dev --name add_history_media_fields
```

### **3. Atualizar SQL de população:**
Adicione os novos campos nos INSERTs

---

## 💡 **DICAS:**

### **Para limpar e repopular:**
```sql
-- Cuidado! Isso apaga TODOS os dados
DELETE FROM "CompanyHistory";

-- Depois rode o SQL de população novamente
```

### **Para adicionar apenas 1 evento:**
```sql
INSERT INTO "CompanyHistory" (
  "year", "type", "titlePt", "titleEn", 
  "descriptionPt", "descriptionEn", 
  "icon", "isFeatured", "displayOrder"
)
VALUES (
  2026, 'partnership', 
  'Nova Parceria 2026', 'New Partnership 2026',
  'Descrição em português', 'Description in English',
  '🚀', true, 200
);
```

### **Para atualizar um evento:**
```sql
UPDATE "CompanyHistory"
SET 
  "titlePt" = 'Novo Título',
  "isFeatured" = true
WHERE "year" = 2005 AND "titlePt" LIKE '%Digital Designer%';
```

---

## 🐛 **TROUBLESHOOTING:**

### **Erro: Tabela não existe**
```bash
cd azimut-cms
npx prisma migrate deploy
```

### **Erro: Dados duplicados**
```sql
-- Verificar duplicatas
SELECT "year", "titlePt", COUNT(*) 
FROM "CompanyHistory" 
GROUP BY "year", "titlePt" 
HAVING COUNT(*) > 1;

-- Limpar tudo e repopular
DELETE FROM "CompanyHistory";
```

### **Erro: Permissão negada**
- Verifique se o usuário do banco tem permissões de INSERT
- Verifique a string de conexão no `.env`

---

## ✅ **CHECKLIST DE EXECUÇÃO:**

- [ ] 1. Aplicar migration: `npx prisma migrate deploy`
- [ ] 2. Escolher método de população (SQL direto / script)
- [ ] 3. Executar população
- [ ] 4. Verificar: `SELECT COUNT(*) FROM "CompanyHistory";`
- [ ] 5. Testar API: `/api/public/history?lang=pt`
- [ ] 6. Testar frontend: `/studio/credibilidade`
- [ ] 7. ✅ Pronto!

---

## 🚀 **EXECUTAR AGORA:**

### **Método mais simples:**

```bash
# 1. Copiar SQL
cat sql/populate_company_history_complete.sql

# 2. Colar no Neon SQL Editor
# https://console.neon.tech

# 3. Run!
```

**✅ 5 minutos e está pronto!**

---

**Criado em:** 2026-01-20  
**Arquivos:**
- `scripts/populate-backoffice.sh` (bash)
- `scripts/populate-history.ts` (typescript)
- `sql/populate_company_history_complete.sql` (sql) ⭐
