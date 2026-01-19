# 🚀 PRÓXIMAS ATIVIDADES - PLANEJAMENTO

**Data Base:** 19/01/2026  
**Status Atual:** ✅ Site estável, pronto para próxima fase

---

## ⚡ URGENTE - FAZER HOJE/AMANHÃ (< 1 hora total)

### 1. **Google Analytics** (5 min) 🎯
**Prioridade:** MÁXIMA

```bash
# 1. Copiar Measurement ID do Google Analytics
# 2. Adicionar em .env (local e Vercel)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# 3. Rebuild
npm run build
```

**Verificação:**
- Abrir site em incognito
- F12 → Network → Filtrar "google-analytics"
- Ver requests sendo feitos

**Tempo:** 5 minutos  
**Impacto:** Alto (dados desde agora)

---

### 2. **Teste Rápido Site** (15 min) 🧪
**Prioridade:** ALTA

**Checklist:**
- [ ] Home (dark + light)
- [ ] Work
- [ ] Studio
- [ ] WhatWeDo
- [ ] Solutions (2-3 páginas)
- [ ] Vancouver
- [ ] Contact
- [ ] Academy
- [ ] Toggle tema em todas

**Método:**
1. Abrir em incognito (Ctrl+Shift+N)
2. Testar desktop (1920px, 1440px, 1366px)
3. Testar mobile (iPhone SE, iPhone 12, iPad)

**Tempo:** 15 minutos  
**Impacto:** Crítico (garantir funcionamento)

---

### 3. **Teste Backoffice** (10 min) 🏢
**Prioridade:** ALTA

**Checklist:**
- [ ] Login
- [ ] Dashboard
- [ ] Leads (listar, filtrar)
- [ ] Newsletter (listar, adicionar manual)
- [ ] Analytics (se houver)

**URL:** https://backoffice.azmt.com.br

**Tempo:** 10 minutos  
**Impacto:** Alto (garantir gestão)

---

### 4. **Verificar Analytics (24h depois)** (5 min) 📊
**Prioridade:** MÉDIA

**O que verificar:**
- Pageviews sendo registrados?
- Events funcionando?
- Bounce rate razoável?

**Tempo:** 5 minutos (amanhã)  
**Impacto:** Médio (ajustar se necessário)

---

## 📅 PRÓXIMA SEMANA (3-5 horas)

### 5. **SEO Básico** (2h)
**Prioridade:** ALTA

**Tarefas:**
```markdown
- [ ] Revisar meta descriptions (muito longas/curtas?)
- [ ] Verificar títulos (< 60 chars)
- [ ] Adicionar alt texts faltantes em imagens
- [ ] Verificar sitemap.xml atualizado
- [ ] Testar structured data (schema.org)
```

**Ferramentas:**
- Google Search Console
- Lighthouse (Chrome DevTools)
- https://search.google.com/test/rich-results

**Impacto:** Alto (SEO orgânico)

---

### 6. **OG Images Personalizadas** (3h)
**Prioridade:** MÉDIA

**Páginas prioritárias:**
1. Home
2. Vancouver
3. Work (principais cases)

**Formato:**
- 1200x630px
- PNG ou JPG
- Texto legível em thumbnail pequeno

**Ferramenta sugerida:**
- Figma / Canva
- Template com brand colors

**Impacto:** Médio (shares sociais)

---

### 7. **Conteúdo - Revisão** (2h)
**Prioridade:** MÉDIA

**O que revisar:**
```markdown
- [ ] Textos Home (typos?)
- [ ] Vancouver (dados atualizados?)
- [ ] Cases Work (completos?)
- [ ] Solutions (claros?)
- [ ] FAQ (perguntas comuns cobertas?)
```

**Impacto:** Médio (profissionalismo)

---

## 🔧 PRÓXIMAS 2 SEMANAS (5-8 horas)

### 8. **TypeScript Cleanup** (3h)
**Prioridade:** BAIXA (mas importante)

**Tarefas:**
```bash
# 1. Instalar types faltando
npm install --save-dev @types/node

# 2. Corrigir implicit any
# Buscar: grep -r "any" src/

# 3. Adicionar types para props
interface MyComponentProps {
  lang: 'pt' | 'en' | 'fr' | 'es'
  data: MyData[]
}
```

**Impacto:** Baixo (manutenibilidade futura)

---

### 9. **Traduções FR/ES** (2-3h)
**Prioridade:** MÉDIA

**Páginas faltando:**
- Solutions (algumas)
- Newsletter (textos)
- Error messages

**Método:**
1. Identificar textos hardcoded
2. Adicionar ao sistema de i18n
3. Traduzir (Google Translate + revisão)

**Impacto:** Médio (audiência internacional)

---

### 10. **Performance Otimizações** (2h)
**Prioridade:** BAIXA

**Tarefas:**
```markdown
- [ ] Lazy load imagens pesadas (> 200kb)
- [ ] Minificar SVGs grandes
- [ ] Adicionar WebP alternativas
- [ ] Code splitting (se necessário)
- [ ] Preload fonts críticas
```

**Ferramentas:**
- Lighthouse
- WebPageTest
- Chrome DevTools → Performance

**Impacto:** Baixo (já está rápido)

---

## 🎯 BACKLOG (SEM PRAZO)

### 11. **Newsletter Campaigns**
**Complexidade:** ALTA  
**Tempo estimado:** 10-15 horas

**Escopo:**
- n8n workflow setup
- Email templates HTML
- Segmentação de listas
- Testes A/B
- Analytics de email

**Quando fazer:** Quando houver > 100 inscritos

---

### 12. **Dashboard Analytics Backoffice**
**Complexidade:** MÉDIA  
**Tempo estimado:** 6-8 horas

**Escopo:**
- Charts (pageviews, leads, conversões)
- Filtros por período
- Export CSV/PDF
- Comparação mês anterior

**Quando fazer:** Após 1 mês de dados

---

### 13. **PWA Melhorias**
**Complexidade:** BAIXA  
**Tempo estimado:** 2-3 horas

**Escopo:**
- Install prompt mais amigável
- Offline fallback melhor
- Push notifications (futuro)

**Quando fazer:** Se houver demanda mobile alta

---

## 📊 MATRIZ DE PRIORIZAÇÃO

| Tarefa | Prioridade | Tempo | Impacto | Fazer Quando |
|--------|-----------|-------|---------|--------------|
| Google Analytics | 🔴 | 5min | Alto | HOJE |
| Teste Site | 🔴 | 15min | Crítico | HOJE |
| Teste Backoffice | 🔴 | 10min | Alto | HOJE |
| Ver Analytics | 🟡 | 5min | Médio | Amanhã |
| SEO Básico | 🔴 | 2h | Alto | Esta semana |
| OG Images | 🟡 | 3h | Médio | Esta semana |
| Revisão Conteúdo | 🟡 | 2h | Médio | Esta semana |
| TypeScript | 🟢 | 3h | Baixo | 2 semanas |
| Traduções | 🟡 | 3h | Médio | 2 semanas |
| Performance | 🟢 | 2h | Baixo | 2 semanas |
| Newsletter Campaigns | 🟢 | 15h | Baixo | > 100 inscritos |
| Dashboard Analytics | 🟢 | 8h | Baixo | Após 1 mês |
| PWA Melhorias | 🟢 | 3h | Baixo | Se demanda |

**Legenda:**
- 🔴 Alta
- 🟡 Média  
- 🟢 Baixa

---

## 🎯 METAS MENSURÁVEIS

### **Esta Semana**
- [ ] Analytics configurado e funcionando
- [ ] Site 100% testado (todas as páginas)
- [ ] Backoffice 100% testado
- [ ] SEO básico revisado
- [ ] OG images principais páginas

### **Próximas 2 Semanas**
- [ ] TypeScript sem erros críticos
- [ ] Traduções FR/ES completas
- [ ] Performance score > 90 (Lighthouse)

### **Próximo Mês**
- [ ] 50+ newsletter inscritos
- [ ] 10+ leads qualificados
- [ ] Analytics com dados úteis

---

## 🚫 O QUE **NÃO** FAZER

### ❌ **Evitar:**
1. **Redesigns grandes** (site está bom)
2. **Adicionar features não pedidas** (foco no core)
3. **Mexer em áreas críticas** (ver `PONTOS_CRITICOS.md`)
4. **Otimizações prematuras** (já está rápido)
5. **Refactors sem motivo** (funciona? deixa)

### ✅ **Focar em:**
1. **Testar tudo**
2. **Coletar dados (Analytics)**
3. **Melhorias incrementais pequenas**
4. **Documentar mudanças**
5. **Backup antes de mexer**

---

## 📞 QUANDO PEDIR AJUDA

### **Se encontrar bug:**
1. Ler `BUGS_RESOLVIDOS.md` (pode ser conhecido)
2. Ler `PONTOS_CRITICOS.md` (pode ser área sensível)
3. Testar em incognito (pode ser cache)
4. Reverter checkpoint se crítico
5. Documentar novo bug encontrado

### **Se tiver dúvida:**
1. Ler este `PROXIMAS_ATIVIDADES.md`
2. Ler `CHECKLIST.md`
3. Verificar git log (pode ter contexto)
4. Usar git blame para entender código

---

## 🎉 CELEBRAR VITÓRIAS

Após **CADA tarefa concluída:**
- [ ] Marcar checkbox ✅
- [ ] Commit com mensagem clara
- [ ] Testar em produção
- [ ] Atualizar CHECKLIST.md
- [ ] Comemorar (pequenas vitórias importam!)

---

**📅 Próxima Revisão:** 22/01/2026 (3 dias)  
**🎯 Objetivo:** Analytics funcionando + Site 100% testado  
**💪 Vamos com tudo!**
