# 🛡️ BACKUP + POPULAR SOLUÇÕES

## 📅 Data: 07 Jan 2026

---

## 🎯 OBJETIVO

1. ✅ Fazer backup completo do backoffice (caso dê merda)
2. ✅ Popular página "Soluções" (What) + 7 Serviços

---

## 📋 COMANDOS

### **PASSO 1: Fazer Backup** (OBRIGATÓRIO!)

```bash
cd azimut-cms
npx tsx scripts/backup-database.ts
```

**O que faz:**
- Exporta TODOS os dados do banco em JSON
- Salva em `azimut-cms/backups/backup-YYYY-MM-DD.json`
- Inclui: Pages, Services, Tags, Projects, Markets, Users, Leads, Settings
- **NÃO** inclui senhas (por segurança)

**Output esperado:**
```
🛡️ INICIANDO BACKUP DO BANCO DE DADOS

✅ BACKUP CONCLUÍDO COM SUCESSO!

📁 Arquivo: azimut-cms/backups/backup-2026-01-07.json

📊 DADOS SALVOS:
   - Pages: X
   - Services: X
   - Tags: X
   - Projects: X
   - Markets: X
   - Users: X
   - Leads: X
   - Settings: X

🛡️ Para restaurar: npx tsx scripts/restore-database.ts backup-2026-01-07.json
```

---

### **PASSO 2: Popular Soluções** (SEGURO!)

```bash
cd azimut-cms
npx tsx scripts/populate-solucoes.ts
```

**O que faz:**
- Cria/atualiza a página "Soluções" (What) com SEO em PT/EN/ES/FR
- Cria/atualiza 7 serviços:
  1. Cinema & Audiovisual
  2. Animação 2D/3D
  3. XR / Interatividade
  4. Arte Técnica / CAD / Revit
  5. IA Criativa
  6. Educação & Formação
  7. Consultoria & Estratégia

**Usa `upsert`:**
- Se já existe: **ATUALIZA**
- Se não existe: **CRIA**
- **NUNCA DELETA**

**Output esperado:**
```
🚀 POPULANDO PÁGINA DE SOLUÇÕES + SERVIÇOS

📄 POPULANDO PÁGINA "SOLUÇÕES"...

   ✅ Página "Soluções" populada

🛠️  POPULANDO SERVIÇOS...

   ✅ Cinema & Audiovisual
   ✅ Animação 2D/3D
   ✅ XR / Interatividade
   ✅ Arte Técnica / CAD / Revit
   ✅ IA Criativa
   ✅ Educação & Formação
   ✅ Consultoria & Estratégia

═══════════════════════════════════════════════════════════════
✅ Página "Soluções": 1
✅ Serviços: 7
═══════════════════════════════════════════════════════════════

✨ POPULAÇÃO DE SOLUÇÕES CONCLUÍDA!
```

---

### **PASSO 3: Verificar no Admin**

```bash
cd azimut-cms
npm run dev
```

Abrir: http://localhost:3001/admin

**Verificar:**
- [ ] **Pages** → "Soluções" (What) aparece
- [ ] **Services** → 7 serviços aparecem
- [ ] Clicar em cada serviço e ver:
  - Títulos em PT/EN/ES/FR ✅
  - Descrições em PT/EN/ES/FR ✅
  - Priority (10 a 4) ✅
  - Status: PUBLISHED ✅

---

## 🛡️ SEGURANÇA

### **Se der MERDA:**

1. **Parar qualquer processo:**
   ```bash
   Ctrl+C
   ```

2. **Restaurar backup:**
   ```bash
   cd azimut-cms
   npx tsx scripts/restore-database.ts backups/backup-2026-01-07.json
   ```

3. **Verificar se voltou:**
   ```bash
   npm run dev
   ```

---

## ✅ CHECKLIST

- [ ] **PASSO 1:** Fazer backup (`backup-database.ts`)
- [ ] **PASSO 2:** Popular soluções (`populate-solucoes.ts`)
- [ ] **PASSO 3:** Verificar no admin (http://localhost:3001/admin)
- [ ] **PASSO 4:** Testar página Soluções no site (http://localhost:5173/pt/what)

---

## 📊 CONTEÚDO POPULADO

### **Página "Soluções" (What)**

**SEO PT:**
- Título: "Soluções | Azimut"
- Descrição: "Cinema, design interativo, storytelling espacial e IA para criar instalações narrativas e experiências temporais."

**Hero PT:**
- Slogan: "O Que Fazemos"
- Subtítulo: "Combinamos cinema, design interativo, storytelling espacial e pipelines com IA para criar instalações narrativas, ambientes híbridos e experiências temporais."

**Também em:** EN, ES, FR

---

### **7 Serviços**

| **Serviço** | **Slug** | **Priority** | **Segments** |
|---|---|---|---|
| Cinema & Audiovisual | `cinema-av` | 10 | museum, culture, brand |
| Animação 2D/3D | `animation` | 9 | brand, culture, education |
| XR / Interatividade | `xr` | 8 | museum, culture, brand |
| Arte Técnica / CAD / Revit | `cad-revit` | 7 | museum, culture |
| IA Criativa | `creative-ai` | 6 | research, brand, culture |
| Educação & Formação | `education` | 5 | education, research |
| Consultoria & Estratégia | `consulting` | 4 | consulting, research |

**Cada serviço tem:**
- Título em PT/EN/ES/FR
- Descrição completa em PT/EN/ES/FR
- Priority (ordem de exibição)
- Segments (categorias)
- Status: PUBLISHED

---

## 🎯 PRÓXIMOS PASSOS

Depois de popular Soluções, podemos:

1. **Popular HOME** (hero, pillars, stats)
2. **Popular PROJETOS** (8 cases)
3. **Popular STUDIO/ABOUT** (team, história)
4. **Popular ACADEMY** (courses, research)
5. **Popular CONTACT** (já tem formulário, só SEO)

**Ou fazer tudo de uma vez:**
```bash
cd azimut-cms
npx tsx scripts/populate-all-content.ts
```

---

## 📝 NOTAS

- Script usa `upsert`: **NUNCA DELETA**, só cria ou atualiza
- Backup salvo em `azimut-cms/backups/` (não vai pro Git)
- Se já existir dados, serão **atualizados** (não duplicados)
- Senhas de usuários **NÃO** são incluídas no backup (segurança)

---

## ✅ STATUS

- [x] Script de backup criado
- [x] Script de popular soluções criado
- [ ] Backup executado
- [ ] Soluções populadas
- [ ] Verificado no admin
- [ ] Testado no site

