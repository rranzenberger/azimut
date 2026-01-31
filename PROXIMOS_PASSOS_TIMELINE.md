# 📋 Próximos Passos - Timeline e Projeto

**Data:** 2026-01-20  
**Status Atual:** Melhorias visuais da timeline concluídas ✅

---

## ✅ **O QUE JÁ FOI FEITO (HOJE)**

1. ✅ **Melhorias visuais da timeline:**
   - Animações fade-in com IntersectionObserver
   - Hover premium nos cards
   - Skeleton loading melhorado
   - Linha vermelha mais larga (w-1)
   - Badges ajustados para evitar sobreposição
   - Contraste adaptativo (tema claro/escuro)
   - Suporte a logos (vanarts.png, vfs.png, Maple-Leaf-Canada.png)

2. ✅ **Novos eventos adicionados:**
   - 2014: Vanarts - CA Agente Educacional
   - 2018: VFS Vancouver Film School - Agente Educacional
   - 1999/2017: Atualizados para usar Maple Leaf

3. ✅ **SQL criado:**
   - `sql/adicionar_vanarts_vfs_maple_leaf.sql` (pronto para executar)
   - Todas as 4 línguas (PT, EN, ES, FR)

4. ✅ **Commit e push:**
   - Mudanças commitadas
   - Push para `main` realizado
   - Deploy automático iniciado no Vercel

---

## 🔴 **PRIORIDADE ALTA - Fazer Agora**

### **1. Executar SQL no Banco de Dados** ⏳
**Status:** Pendente  
**Arquivo:** `sql/adicionar_vanarts_vfs_maple_leaf.sql`

**Como fazer:**
1. Acesse: https://console.neon.tech (ou Vercel SQL Editor)
2. Abra o arquivo `sql/adicionar_vanarts_vfs_maple_leaf.sql`
3. Copie e cole todo o conteúdo
4. Execute o script
5. Verifique com o SELECT no final do arquivo

**Resultado esperado:**
- ✅ 1999: Discreet atualizado com Maple Leaf
- ✅ 2014: Vanarts adicionado
- ✅ 2017: Vancouver atualizado com Maple Leaf
- ✅ 2018: VFS adicionado

---

### **2. Testar Timeline em Produção** ⏳
**Após o deploy do Vercel:**

1. Acesse: `https://azimut.com.br/studio/credibilidade` (ou seu domínio)
2. Verifique:
   - [ ] Timeline carrega corretamente
   - [ ] Animações fade-in funcionam ao scrollar
   - [ ] Logos aparecem (Vanarts, VFS, Maple Leaf)
   - [ ] Badges não sobrepõem números
   - [ ] Contraste está bom no tema claro
   - [ ] Contraste está bom no tema escuro
   - [ ] Responsividade mobile OK
   - [ ] Hover effects funcionam

---

### **3. Verificar Backoffice** ⏳
**Acesse:** `https://backoffice.azmt.com.br/admin/history`

**Verificar:**
- [ ] Login funciona
- [ ] Lista de eventos aparece
- [ ] Novos eventos (Vanarts, VFS) aparecem
- [ ] Pode editar eventos existentes
- [ ] Pode adicionar novos eventos
- [ ] Campo `icon` aceita logos/emojis
- [ ] Todas as 4 línguas editáveis

---

## 🟡 **PRIORIDADE MÉDIA - Próximos Dias**

### **4. Completar Eventos no Backoffice** 📝
**Você mencionou que vai completar:**

1. **Parcerias (2018-2026):**
   - [ ] YDreams (já mencionado)
   - [ ] Escola de Comunicação UFRJ (Pesquisadores) (já mencionado)
   - [ ] Outros nomes (professores, fotógrafos, empresas parceiras)

2. **Projetos importantes:**
   - [ ] Adicionar projetos na timeline via backoffice
   - [ ] Preencher descrições e bullets

3. **Prêmios:**
   - [ ] Adicionar prêmios via backoffice
   - [ ] Preencher ano e descrição

4. **Marcos (milestones):**
   - [ ] Adicionar outros marcos importantes
   - [ ] Preencher detalhes

**Nota:** Tudo isso pode ser feito via backoffice, não precisa de código!

---

### **5. Melhorias Opcionais da Timeline** 🎨
**Se quiser melhorar mais:**

1. **Filtros visuais:**
   - [ ] Botões para filtrar por tipo (milestone, partnership, project, award)
   - [ ] Botão "Ver todos"

2. **Busca:**
   - [ ] Campo de busca para encontrar eventos específicos

3. **Animações extras:**
   - [ ] Parallax sutil no scroll
   - [ ] Efeito de "magnetismo" nos cards ao hover

4. **Export/Share:**
   - [ ] Botão para compartilhar timeline
   - [ ] Exportar como PDF

---

## 🟢 **PRIORIDADE BAIXA - Futuro**

### **6. Outras Melhorias do Site** 🚀
**Baseado nos documentos encontrados:**

1. **Limpar console.logs (158 ocorrências):**
   - Remover logs de produção
   - Melhorar performance

2. **Resolver TODOs pendentes:**
   - `src/pages/Home.tsx:709` - Backoffice integration
   - `src/pages/AcademyNew.tsx:441` - Imagem real do backoffice

3. **Code Splitting:**
   - Lazy loading para páginas pesadas
   - Reduzir bundle size

4. **Melhorias visuais em outras páginas:**
   - Privacy, Terms, Press → Layout premium
   - Studio Page → Cinematográfico
   - Research Page → Visual
   - Academy Pages → Imersivo

5. **Curadoria Invisível (IA):**
   - `usePersonalizedOrder.ts` - Ordenar projetos por interesse
   - `useAdaptiveHero.ts` - Hero adaptativo
   - Navegação guiada por IA

6. **LGPD:**
   - Cookie Banner
   - Política de Privacidade
   - Termos de Uso

---

## 📊 **CHECKLIST RÁPIDO**

### **Hoje (Urgente):**
- [ ] Executar SQL no banco de dados
- [ ] Aguardar deploy do Vercel
- [ ] Testar timeline em produção
- [ ] Verificar backoffice

### **Esta Semana:**
- [ ] Completar eventos no backoffice (parcerias, projetos, prêmios)
- [ ] Testar em diferentes dispositivos
- [ ] Verificar analytics

### **Próximas Semanas:**
- [ ] Melhorias opcionais da timeline
- [ ] Outras melhorias do site
- [ ] Implementar features futuras

---

## 🎯 **RESUMO EXECUTIVO**

**O que fazer AGORA:**
1. ✅ **SQL pronto** → Execute no Neon/Vercel SQL Editor
2. ⏳ **Aguardar deploy** → Vercel faz automaticamente
3. ⏳ **Testar** → Verificar timeline em produção
4. ⏳ **Backoffice** → Completar eventos manualmente

**O que fazer DEPOIS:**
- Completar eventos no backoffice (você faz manualmente)
- Melhorias opcionais (se quiser)
- Outras features do site (prioridade menor)

---

## 📞 **PRÓXIMA AÇÃO IMEDIATA**

**Execute o SQL agora:**
1. Abra: `sql/adicionar_vanarts_vfs_maple_leaf.sql`
2. Copie todo o conteúdo
3. Cole no Neon SQL Editor: https://console.neon.tech
4. Execute
5. Verifique resultado

**Depois me avise se funcionou!** ✅

---

**Status:** ✅ Tudo pronto, só falta executar o SQL e testar!
