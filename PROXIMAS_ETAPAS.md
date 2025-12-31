# 🎯 Próximas Etapas - Site Azimut

**Data:** 2025-01-27  
**Status Atual:** Migração de conteúdo 60% completa

---

## ✅ O Que Já Foi Feito

1. ✅ **Migração de Conteúdo:**
   - Home, Work, WhatWeDo: 100% migradas para backoffice
   - Academy, Research: Parcialmente migradas (mantêm conteúdo estático)
   - Studio, Contact, NotFound: Estáticas (não migradas)

2. ✅ **Correções:**
   - Erro `locale is not defined` em Academy corrigido
   - Função `locale()` restaurada para conteúdo estático

3. ✅ **Documentação:**
   - Status da migração documentado
   - Backup criado antes da migração

---

## 🚀 Próximas Etapas (Prioridade)

### 🔴 PRIORIDADE ALTA - Imediato

#### 1. **Deploy e Testes em Produção**
   - [ ] Fazer deploy no Vercel (site principal)
   - [ ] Fazer deploy no Vercel (backoffice)
   - [ ] Testar todas as páginas em produção:
     - [ ] Home - verificar se projetos carregam
     - [ ] Work - verificar se projetos aparecem
     - [ ] WhatWeDo - verificar se serviços aparecem
     - [ ] Academy - verificar se não há erros
     - [ ] Research - verificar se não há erros
     - [ ] Studio - verificar se funciona
     - [ ] Contact - verificar se formulário funciona
   - [ ] Verificar console do navegador por erros
   - [ ] Testar em diferentes idiomas (PT, EN, ES, FR)
   - [ ] Testar responsividade (mobile, tablet, desktop)

#### 2. **Verificação de Erros e Inconsistências**
   - [ ] Verificar se há erros no console
   - [ ] Verificar se APIs estão respondendo corretamente
   - [ ] Verificar se fallbacks funcionam se API falhar
   - [ ] Verificar se imagens carregam corretamente
   - [ ] Verificar se links funcionam

---

### 🟡 PRIORIDADE MÉDIA - Próximos Dias

#### 3. **Limpeza de Código (TODOs Encontrados)**
   - [ ] **Layout.tsx (linha 1247):** Integrar com Kabbam/CRM
   - [ ] **PlausibleScript.tsx (linha 10):** Substituir 'azimut.com' pelo domínio real
   - [ ] **StructuredData.tsx (linha 11):** Usar variável de ambiente para baseUrl
   - [ ] **leads.ts (linha 35):** Verificar se chamada à API está correta
   - [ ] **Academy.tsx / Research.tsx:** Decidir se implementar modelo Lab no banco

#### 4. **Otimizações de Performance**
   - [ ] Verificar se lazy loading está funcionando
   - [ ] Verificar se imagens estão otimizadas
   - [ ] Verificar se bundle size está otimizado
   - [ ] Verificar se há código duplicado

#### 5. **Melhorias de UX/UI**
   - [ ] Verificar se loading states estão adequados
   - [ ] Verificar se mensagens de erro são claras
   - [ ] Verificar se feedback visual está adequado
   - [ ] Verificar se acessibilidade está OK

---

### 🟢 PRIORIDADE BAIXA - Futuro (Opcional)

#### 6. **Migração Completa de Academy (Opcional)**
   - [ ] Criar modelo `Workshop` no Prisma
   - [ ] Criar modelo `ResearchArea` no Prisma
   - [ ] Criar APIs para workshops e áreas de pesquisa
   - [ ] Migrar dados de workshops para banco
   - [ ] Atualizar Academy para usar backoffice
   - **Motivo:** Estrutura complexa, pode ser mantida estática se não houver necessidade de edição frequente

#### 7. **Migração de Studio (Opcional)**
   - [ ] Criar modelo `TeamMember` no Prisma (se necessário)
   - [ ] Migrar dados da equipe para banco
   - [ ] Atualizar Studio para usar backoffice
   - **Motivo:** Dados raramente mudam, pode ser mantido estático

#### 8. **Melhorias no Backoffice**
   - [ ] Adicionar preview de páginas no backoffice
   - [ ] Adicionar validação de campos obrigatórios
   - [ ] Adicionar histórico de edições
   - [ ] Melhorar interface de edição

---

## 📋 Checklist de Deploy

### Antes do Deploy:
- [ ] Verificar se não há erros no build local
- [ ] Verificar se variáveis de ambiente estão configuradas
- [ ] Verificar se APIs estão funcionando
- [ ] Fazer commit de todas as mudanças

### Durante o Deploy:
- [ ] Monitorar logs do build
- [ ] Verificar se build foi bem-sucedido
- [ ] Verificar se deploy foi concluído

### Após o Deploy:
- [ ] Testar todas as páginas
- [ ] Verificar console por erros
- [ ] Testar em diferentes dispositivos
- [ ] Testar em diferentes idiomas
- [ ] Verificar se APIs estão respondendo

---

## 🔍 Verificações Técnicas

### APIs do Backoffice:
- [ ] `GET /api/public/content?page=home&lang=pt` - Funciona?
- [ ] `GET /api/public/page/[slug]?lang=pt` - Funciona?
- [ ] CORS está configurado corretamente?
- [ ] Headers estão corretos?

### Hooks:
- [ ] `useAzimutContent` - Funciona?
- [ ] `useBackofficeContent` - Funciona?
- [ ] `useBackofficeProjects` - Funciona?
- [ ] `useBackofficeServices` - Funciona?
- [ ] Fallbacks funcionam se API falhar?

### Variáveis de Ambiente:
- [ ] `VITE_BACKOFFICE_URL` está configurada?
- [ ] URLs estão corretas em produção?
- [ ] Fallbacks estão configurados?

---

## 📊 Métricas de Sucesso

### Critérios de Sucesso:
- ✅ Todas as páginas carregam sem erros
- ✅ Conteúdo do backoffice aparece corretamente
- ✅ Fallbacks funcionam se API falhar
- ✅ Site funciona em todos os idiomas
- ✅ Site é responsivo em todos os dispositivos
- ✅ Performance está adequada

### Métricas a Monitorar:
- Tempo de carregamento das páginas
- Taxa de erro nas APIs
- Uso de fallbacks
- Erros no console

---

## 🎯 Recomendação Imediata

**Próximo passo:** Fazer deploy e testar em produção.

1. Fazer deploy do site principal
2. Fazer deploy do backoffice
3. Testar todas as páginas
4. Verificar erros no console
5. Corrigir problemas encontrados
6. Documentar resultados

---

## 📚 Documentação Relacionada

- `STATUS_MIGRACAO_CONTENTO.md` - Status detalhado da migração
- `PONTO_CONTROLE_ANTES_MIGRACAO_SITE_BACKOFFICE.md` - Backup antes da migração
- `azimut-cms/STATUS_MIGRACAO_CONTENTO.md` - Status no backoffice

---

**Última atualização:** 2025-01-27

