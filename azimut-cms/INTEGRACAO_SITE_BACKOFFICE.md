# 🔗 INTEGRAÇÃO SITE ↔ BACKOFFICE

## 📊 **O QUE FOI FEITO**

### **1. Schema do Banco Atualizado** ✅
- Adicionados campos **SEO ES/FR** ao modelo `Page`
- Campos: `seoTitleEs`, `seoTitleFr`, `seoDescEs`, `seoDescFr`

### **2. Frontend do Backoffice Atualizado** ✅
- Formulário de edição agora mostra **todos os 4 idiomas** (PT, EN, ES, FR)
- Seção SEO completa com contador de caracteres
- Botões de tradução automática via IA

### **3. Script de População Criado** ✅
- Arquivo: `azimut-cms/scripts/populate-content.ts`
- Popula banco com todos os textos do site
- **11 páginas**: home, what, work, studio, studio/about, studio/team, academy, academy/research, academy/courses, academy/corporate, contact

---

## 🚀 **COMO EXECUTAR (PASSO A PASSO)**

### **PASSO 1: Aplicar Schema no Banco** (Obrigatório)

Abra um terminal no **azimut-cms** e execute:

```bash
cd azimut-cms
npx prisma db push
npx prisma generate
```

**OU** execute o arquivo `.bat` (Windows):
```bash
cd azimut-cms
.\update-schema.bat
```

**Resultado esperado:**
```
✅ Your database is now in sync with your Prisma schema.
✅ Generated Prisma Client
```

---

### **PASSO 2: Popular Banco com Textos** (Obrigatório)

Execute o script de população:

```bash
cd azimut-cms
npx tsx scripts/populate-content.ts
```

**Resultado esperado:**
```
🚀 INICIANDO POPULAÇÃO DO BANCO DE DADOS

📄 Atualizando: Home (home)
   ✅ Sucesso!

📄 Atualizando: Soluções (what)
   ✅ Sucesso!

... (11 páginas no total)

═══════════════════════════════════════════════════════════════
✅ 11 páginas atualizadas com sucesso!
═══════════════════════════════════════════════════════════════
```

---

### **PASSO 3: Redeploy do Backoffice** (Obrigatório)

Faça commit e push das mudanças:

```bash
cd ..
git add -A
git commit -m "feat: add SEO ES/FR fields and populate content"
git push origin main
```

**Vercel** fará deploy automático.

---

### **PASSO 4: Testar no Backoffice** (Verificação)

1. Acesse: https://backoffice.azmt.com.br/admin/site-pages
2. Clique em qualquer página (ex: Home)
3. Role até **🔍 SEO**
4. Verifique se os 4 idiomas estão lá:
   - ✅ Português
   - ✅ English
   - ✅ Español
   - ✅ Français

---

## 📋 **STATUS DE INTEGRAÇÃO**

| Etapa | Status | Descrição |
|-------|--------|-----------|
| **Schema** | ✅ | Campos ES/FR adicionados |
| **Frontend** | ✅ | Formulário com 4 idiomas |
| **População** | ⏳ | **Execute PASSO 2** |
| **API Pública** | ⏳ | Próximo passo |
| **Site Consome** | ⏳ | Próximo passo |

---

## 🎯 **PRÓXIMOS PASSOS (AUTOMÁTICO)**

Depois de executar os passos acima, vou criar:

1. **API Pública** (`/api/public/page/[slug]/route.ts`)
   - Endpoint sem autenticação para o site consumir
   - Retorna: heroSlogan, heroSubtitle, SEO (4 idiomas)

2. **Hook do Site** (`src/hooks/useAzimutContent.ts`)
   - Atualizar para buscar do backoffice
   - Fallback para textos locais se API falhar

3. **Teste Completo**
   - Verificar se site consome dados do backoffice
   - Validar fallback funcional

---

## 🛠️ **TROUBLESHOOTING**

### **Erro: "npx não reconhecido"**
```bash
# Use npm em vez de npx:
npm exec prisma db push
npm exec prisma generate
npm exec tsx scripts/populate-content.ts
```

### **Erro: "Cannot find module 'tsx'"**
```bash
cd azimut-cms
npm install --save-dev tsx
```

### **Erro: "Schema validation failed"**
```bash
# Verifique se está na pasta correta:
cd azimut-cms
# Verifique DATABASE_URL em .env
cat .env | grep DATABASE_URL
```

---

## 📝 **CONTEÚDO POPULADO**

Todas as 11 páginas serão populadas com:

- ✅ **Hero Slogan** (PT, EN, ES, FR) - Título principal
- ✅ **Hero Subtitle** (PT, EN, ES, FR) - Descrição
- ✅ **SEO Title** (PT, EN, ES, FR) - Google/Bing
- ✅ **SEO Description** (PT, EN, ES, FR) - Google/Bing

**Páginas:**
1. Home
2. Soluções (What)
3. Projetos (Work)
4. Estúdio
5. Sobre (Studio/About)
6. Equipe (Studio/Team)
7. Academy
8. Pesquisa (Academy/Research)
9. Cursos (Academy/Courses)
10. Corporate (Academy/Corporate)
11. Contato

---

## ✅ **ME AVISE QUANDO EXECUTAR!**

Depois de rodar os **PASSOS 1, 2 e 3**, me avise para continuar com a API pública! 🚀

