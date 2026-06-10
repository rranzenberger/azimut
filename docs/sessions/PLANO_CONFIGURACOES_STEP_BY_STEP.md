# 📋 PLANO STEP-BY-STEP - Configurações

**Objetivo:** Criar sistema de configurações sem erros em cascata

---

## 🔍 ANÁLISE INICIAL

### O que precisa ser configurável?

1. **Configurações Gerais do Site:**
   - Nome do site
   - URL do site
   - Email de contato
   - Telefone de contato

2. **SEO Global:**
   - Meta description padrão
   - Keywords padrão
   - Open Graph image

3. **Redes Sociais:**
   - Facebook URL
   - Instagram URL
   - LinkedIn URL
   - Twitter/X URL
   - YouTube URL

4. **Integrações:**
   - Kabbam/CRM (API key, URL)
   - Email (SMTP settings)
   - DeepSeek API (key)
   - Notificações (email para novos leads)

5. **Outros:**
   - Idioma padrão
   - País padrão
   - Timezone

---

## 📝 STEP-BY-STEP PLAN

### STEP 1: Criar Modelo Settings no Prisma ✅
- [x] Analisar schema atual
- [ ] Criar modelo Settings
- [ ] Validar tipos e campos nullable
- [ ] Verificar se não quebra nada existente

### STEP 2: Criar Migration ✅
- [ ] Gerar migration
- [ ] Validar SQL gerado
- [ ] Testar migration localmente (se possível)

### STEP 3: Criar API GET Settings ✅
- [ ] Criar `/api/admin/settings/route.ts` (GET)
- [ ] Validar autenticação
- [ ] Testar retorno

### STEP 4: Criar API PUT Settings ✅
- [ ] Criar `/api/admin/settings/route.ts` (PUT)
- [ ] Validar campos permitidos
- [ ] Validar tipos
- [ ] Testar atualização

### STEP 5: Criar Página de Configurações ✅
- [ ] Criar `/admin/settings/page.tsx`
- [ ] Criar componentes de formulário
- [ ] Validar campos
- [ ] Testar salvamento

### STEP 6: Atualizar Menu ✅
- [ ] Habilitar link de Configurações
- [ ] Remover "Em desenvolvimento"

---

## 🛡️ VALIDAÇÕES EM CADA STEP

### Antes de cada step:
- [ ] Verificar schema do Prisma
- [ ] Verificar tipos TypeScript
- [ ] Verificar padrões de outras APIs
- [ ] Testar localmente (se possível)

### Após cada step:
- [ ] Verificar linter
- [ ] Verificar tipos TypeScript
- [ ] Commit com mensagem clara

---

## 🎯 MODELO DE PROGRAMAÇÃO

**Usar:** Modelo automático (padrão)
- Implementação direta
- Validações em cada step
- Commits incrementais

---

**Status:** Pronto para começar STEP 1

