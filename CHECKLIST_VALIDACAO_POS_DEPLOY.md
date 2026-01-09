# ✅ CHECKLIST DE VALIDAÇÃO PÓS-DEPLOY
## Pontos para Testar e Ajustar Após Deploy

---

## 🎯 **SITUAÇÃO ATUAL**

```
✅ BUILD: SUCESSO (6.07s)
✅ ERROS: 0 (ZERO)
⚠️  WARNINGS: Apenas CSS (não-críticos)
✅ DEPLOY: PRONTO PARA IR AO AR
```

**Você pode fazer deploy agora.** Depois, vamos testar e ajustar pontos específicos.

---

## 📋 **FASE 1: VALIDAÇÃO FUNCIONAL (30 min)**

### **1.1 Quiz Vancouver + CRM** 🤖
```
✅ TESTAR:
1. Acesse: https://azmt.com.br/pt/academy/vancouver
2. Role até "Ferramentas Inteligentes"
3. Complete o Quiz (10 perguntas)
4. Veja o resultado (score 0-100)
5. Clique em "Falar com Consultor"

🔍 VALIDAR:
- [ ] Quiz completa sem erros
- [ ] Resultado aparece corretamente
- [ ] Score 0-100 faz sentido
- [ ] Recomendações são úteis
- [ ] CTA funciona

📊 VERIFICAR NO CRM:
- [ ] Abrir Prisma Studio do backoffice
- [ ] Procurar tabela "QuizVancouverResponse"
- [ ] Ver se resposta foi salva
- [ ] Checar se score está correto
```

**⚠️ POSSÍVEIS AJUSTES:**
```
→ Perguntas muito técnicas? Simplificar
→ Score muito alto/baixo? Ajustar algoritmo
→ Recomendações genéricas? Melhorar lógica
→ Não salvou no CRM? Verificar CORS/API
```

---

### **1.2 Recomendador de Cursos + CRM** 📚
```
✅ TESTAR:
1. Acesse: https://azmt.com.br/pt/academy/courses
2. Role até "Recomendação IA"
3. Responda 5 perguntas
4. Veja Top 3 cursos recomendados
5. Veja roadmap personalizado

🔍 VALIDAR:
- [ ] Perguntas são rápidas (5 perguntas OK)
- [ ] Cursos recomendados fazem sentido
- [ ] Match % parece correto
- [ ] Roadmap é útil
- [ ] CTA funciona

📊 VERIFICAR NO CRM:
- [ ] Abrir Prisma Studio
- [ ] Tabela "CourseRecommendationResponse"
- [ ] Ver se resposta foi salva
- [ ] Checar se cursos estão corretos
```

**⚠️ POSSÍVEIS AJUSTES:**
```
→ Cursos não são relevantes? Melhorar matching
→ Roadmap genérico? Adicionar mais detalhes
→ Preços desatualizados? Atualizar valores
```

---

### **1.3 Calculadora de Custos Vancouver** 💰
```
✅ TESTAR:
1. Acesse: https://azmt.com.br/pt/academy/vancouver
2. Role até "Calculadora de Custos"
3. Altere: escola, programa, duração
4. Veja breakdown detalhado
5. Troque CAD → BRL

🔍 VALIDAR:
- [ ] Cálculos parecem corretos
- [ ] Conversão CAD/BRL está OK
- [ ] Breakdown é claro
- [ ] Dicas de economia são úteis
```

**⚠️ POSSÍVEIS AJUSTES:**
```
→ Valores defasados? Atualizar preços 2026
→ Taxa de câmbio? Ajustar (atualmente 4.0)
→ Custos faltando? Adicionar mais itens
```

---

### **1.4 Página Webinars** 🎤
```
✅ TESTAR:
1. Acesse: https://azmt.com.br/pt/webinars
2. Veja webinars agendados
3. Veja gravações disponíveis
4. Veja temas cobertos

🔍 VALIDAR:
- [ ] Página carrega corretamente
- [ ] Design está bonito
- [ ] Responsivo funciona
- [ ] CTAs estão claros
```

**⚠️ POSSÍVEIS AJUSTES:**
```
→ Conteúdo mock? Adicionar webinars reais
→ Datas passadas? Atualizar calendário
→ Falta inscrição? Implementar formulário real
```

---

## 📋 **FASE 2: VALIDAÇÃO TÉCNICA (20 min)**

### **2.1 APIs Backoffice**
```
✅ TESTAR:
1. POST /api/quiz/vancouver
   → Enviar dados de teste
   → Ver se retorna sucesso

2. POST /api/quiz/course-recommender
   → Enviar dados de teste
   → Ver se retorna sucesso

3. GET /api/academy/videos?section=vancouver
   → Ver se retorna vídeos
   → Checar thumbnails
```

**⚠️ POSSÍVEIS AJUSTES:**
```
→ CORS error? Adicionar domínio no next.config.js
→ 500 error? Verificar logs Vercel
→ Timeout? Aumentar timeout
```

---

### **2.2 Banco de Dados**
```
✅ VERIFICAR:
1. Abrir Neon.tech console
2. Ver tabelas novas:
   - QuizVancouverResponse
   - CourseRecommendationResponse
   - AcademyVideo
   - Webinar
   - WebinarRegistration

📊 CHECAR:
- [ ] Tabelas existem
- [ ] Vídeos foram seedados (5 iniciais)
- [ ] Schema está correto
```

**⚠️ POSSÍVEIS AJUSTES:**
```
→ Tabelas não existem? Rodar prisma db push
→ Vídeos não aparecem? Rodar seed novamente
→ Campos faltando? Verificar schema
```

---

## 📋 **FASE 3: VALIDAÇÃO UX/DESIGN (15 min)**

### **3.1 Mobile (Celular)**
```
✅ TESTAR:
- [ ] Quiz Vancouver funciona no celular
- [ ] Calculadora é usável no celular
- [ ] Recomendador funciona no celular
- [ ] Webinars página está OK
- [ ] Formulários são fáceis de preencher
```

**⚠️ POSSÍVEIS AJUSTES:**
```
→ Textos pequenos? Aumentar font-size
→ Botões difíceis de clicar? Aumentar padding
→ Inputs difíceis? Melhorar campos
```

---

### **3.2 Performance**
```
✅ TESTAR:
1. Google PageSpeed Insights
   → https://pagespeed.web.dev/
   → Testar /academy/vancouver
   → Testar /academy/courses
   → Testar /webinars

🎯 META:
- [ ] Score > 80 (Mobile)
- [ ] Score > 90 (Desktop)
- [ ] LCP < 2.5s
- [ ] FID < 100ms
```

**⚠️ POSSÍVEIS AJUSTES:**
```
→ Score baixo? Lazy load imagens
→ LCP alto? Otimizar hero image
→ Bundle grande? Code splitting
```

---

## 📋 **FASE 4: AJUSTES PRIORITÁRIOS (Ranking)**

### **🔴 CRÍTICO (Fazer ASAP se falhar)**
```
1. Quiz/Recomendador não salva no CRM
   → Verificar CORS
   → Verificar API endpoints
   → Verificar logs Vercel

2. Calculadora valores errados
   → Atualizar preços 2026
   → Ajustar taxa de câmbio

3. Erros 500 nas APIs
   → Verificar logs backoffice
   → Verificar Prisma Client
   → Verificar DATABASE_URL
```

---

### **🟡 IMPORTANTE (Fazer esta semana)**
```
1. Adicionar mais vídeos VFS/VanArts
   → Pesquisar no YouTube
   → Adicionar via seed ou backoffice

2. Atualizar conteúdo de Webinars
   → Agendar webinar real
   → Definir datas
   → Criar landing page específica

3. Melhorar textos Quiz/Recomendador
   → Simplificar perguntas
   → Adicionar exemplos
   → Melhorar recomendações
```

---

### **🟢 BOM TER (Fazer próximo mês)**
```
1. UI Admin para Vídeos
   → CRUD completo
   → Upload thumbnails
   → Estatísticas

2. UI Admin para Webinars
   → Agendar webinars
   → Ver inscrições
   → Enviar emails

3. Dashboards CRM
   → Visualizar respostas Quiz
   → Gráficos de score
   → Análise de recomendações
```

---

## 🎯 **PONTOS DE ATENÇÃO ESPECIAIS**

### **1. Integração CRM**
```
⚠️ O QUE OBSERVAR:
- Quiz/Recomendador podem falhar silenciosamente
- Usuário NÃO vê erro se CRM falhar
- Respostas continuam sendo exibidas normalmente

✅ COMO VALIDAR:
1. Complete Quiz/Recomendador
2. Abra Console do browser (F12)
3. Veja se tem erro no console
4. Veja se tem log "✅ Quiz salvo no CRM"

🔧 SE FALHAR:
- Verificar CORS no backoffice
- Verificar API_URL no .env
- Verificar logs Vercel backoffice
```

---

### **2. Sistema de Vídeos**
```
⚠️ O QUE OBSERVAR:
- 5 vídeos iniciais (2 reais, 3 placeholders)
- Placeholders têm URL fake (dQw4w9WgXcQ)
- Status DRAFT não aparece no site

✅ COMO VALIDAR:
1. API: /api/academy/videos?section=vancouver
2. Deveria retornar 2 vídeos (VanArts)
3. Thumbnails devem funcionar

🔧 SE FALHAR:
- Rodar seed novamente
- Verificar Prisma Client
- Adicionar vídeos reais
```

---

### **3. Google Ads**
```
⚠️ O QUE OBSERVAR:
- Documento é estratégico (não implementado)
- Precisa criar conta Google Ads
- Precisa instalar GTM
- Budget: R$ 4k-5k/mês

✅ PRÓXIMO PASSO:
1. Ler ESTRATEGIA_GOOGLE_ADS_COMPLETA_2026.md
2. Criar conta Google Ads
3. Seguir checklist do documento

🔧 PRIORIDADE:
- Não é urgente
- Pode começar com R$ 50/dia (teste)
- Monitorar CPA
```

---

## 📊 **TEMPLATE DE REPORTE DE AJUSTES**

```markdown
## AJUSTES NECESSÁRIOS

### Quiz Vancouver
- [ ] Ajuste 1: [descrever]
- [ ] Ajuste 2: [descrever]

### Recomendador Cursos
- [ ] Ajuste 1: [descrever]
- [ ] Ajuste 2: [descrever]

### Calculadora Custos
- [ ] Ajuste 1: [descrever]
- [ ] Ajuste 2: [descrever]

### Webinars
- [ ] Ajuste 1: [descrever]
- [ ] Ajuste 2: [descrever]

### CRM/APIs
- [ ] Ajuste 1: [descrever]
- [ ] Ajuste 2: [descrever]

### Performance
- [ ] Ajuste 1: [descrever]
- [ ] Ajuste 2: [descrever]
```

---

## 🚀 **RESUMO FINAL**

```
✅ PODE FAZER DEPLOY AGORA

📋 DEPOIS DO DEPLOY:
1. Testar Quiz + CRM (5 min)
2. Testar Recomendador + CRM (5 min)
3. Testar Calculadora (3 min)
4. Testar Webinars (2 min)
5. Verificar APIs (5 min)
6. Testar Mobile (5 min)
7. PageSpeed (5 min)

⏱️  TOTAL: 30 minutos de validação

🔧 AJUSTES ESPERADOS:
- Pequenos: textos, valores, cores
- Médios: conteúdo, vídeos reais
- Grandes: Google Ads (próximo mês)

💪 VOCÊ FEZ UM ÓTIMO TRABALHO!
   Agora é testar e refinar.
```

---

**🎉 PRONTO PARA DEPLOY! BOA SORTE! 🚀**
