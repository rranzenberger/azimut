# 🧪 GUIA DE TESTE - IA DeepSeek Ativa

**Data:** 5 de Janeiro de 2026  
**Status:** ✅ IA ATIVA E FUNCIONANDO

---

## 🎯 OBJETIVO

Testar se a IA DeepSeek está analisando visitantes do site e gerando recomendações personalizadas.

---

## 📋 PRÉ-REQUISITOS

- ✅ Deploy `7HdJVdGPp` concluído (Ready)
- ✅ `DEEPSEEK_API_KEY` configurada no Vercel
- ✅ Backoffice acessível em `backoffice.azmt.com.br`
- ✅ Site acessível em `azimut.com`

---

## 🧪 TESTE 1: Verificar Tracking no Site

### Passo a Passo:

1. **Abrir o site em navegador anônimo:**
   - URL: `https://azimut.com`
   - Usar **modo anônimo** para criar nova sessão

2. **Abrir DevTools (F12):**
   - Ir para aba **Console**
   - Ir para aba **Network**

3. **Navegar pelo site:**
   - Ver página **Home** (ficar 10-15 segundos)
   - Clicar em **Projetos/Work**
   - Clicar em algum **projeto específico** (ex: Olympic Games)
   - Rolar a página até o final (scroll depth)

4. **Verificar no Console:**
   - Procurar mensagens do tipo:
     ```
     [Analytics] Page view sent: home
     [Analytics] Project interaction sent: olympic-games-2024
     ```

5. **Verificar no Network (aba XHR):**
   - Procurar requisições para:
     ```
     POST backoffice.azmt.com.br/api/track
     ```
   - Status deve ser **200 OK**

### ✅ Resultado Esperado:
- Requisições `POST /api/track` sendo enviadas
- Console mostrando tracking ativo
- Status 200 nas respostas

---

## 🧪 TESTE 2: Verificar Dados no Backoffice

### Passo a Passo:

1. **Fazer login no backoffice:**
   - URL: `https://backoffice.azmt.com.br/admin/login`
   - Usar suas credenciais de admin

2. **Acessar o banco via Prisma Studio (opcional):**
   - No Vercel, ir para **Storage** (se tiver acesso direto)
   - Ou usar Prisma Studio localmente:
     ```bash
     cd azimut-cms
     npx prisma studio
     ```

3. **Verificar tabelas:**

   #### a) `VisitorSession`:
   - Deve ter novas sessões criadas
   - Campos preenchidos:
     - `sessionId` (UUID único)
     - `ip`, `userAgent`, `language`
     - `country` (se detectado)
     - `firstSeen`, `lastSeen`

   #### b) `PageView`:
   - Deve ter registros de páginas vistas
   - Campos preenchidos:
     - `sessionId` (vinculado à sessão)
     - `pageSlug` (home, work, etc.)
     - `timeSpent` (em segundos)
     - `scrollDepth` (0-100)
     - `viewedAt` (timestamp)

   #### c) `ProjectInteraction`:
   - Deve ter interações com projetos
   - Campos preenchidos:
     - `sessionId`
     - `projectId`
     - `type` (VIEW, CLICK, etc.)
     - `metadata` (JSON com dados)

   #### d) `InterestScore`:
   - **MAIS IMPORTANTE!** Scores calculados pela IA
   - Campos preenchidos:
     - `sessionId`
     - `museumScore`, `brandScore`, `festivalScore`, etc. (0-100)
     - `visitorType` (ex: "MUSEUM_CURATOR", "TECH_ENTHUSIAST")
     - `recommendedProjects` (JSON com 3 projetos)
     - `suggestedAction` (texto sugerindo próxima ação)
     - `suggestedPage` (slug da próxima página)
     - `conversionScore` (0-100)

### ✅ Resultado Esperado:
- Tabelas populadas com dados reais
- `InterestScore` com recomendações da IA
- `visitorType` identificado corretamente

---

## 🧪 TESTE 3: Verificar Logs do DeepSeek

### Passo a Passo:

1. **No Vercel, ir para o deploy `7HdJVdGPp`**

2. **Clicar em "Logs" (aba superior)**

3. **Filtrar por "Runtime Logs"**

4. **Procurar mensagens relacionadas à IA:**
   - `[AI] Analyzing visitor session...`
   - `[AI] DeepSeek response received`
   - `[AI] Visitor type: MUSEUM_CURATOR`
   - `[AI] Recommended projects: [...]`

5. **Procurar erros (se houver):**
   - `[AI] DeepSeek API error: ...`
   - `[AI] Failed to analyze: ...`

### ✅ Resultado Esperado:
- Logs mostrando chamadas ao DeepSeek
- Respostas JSON da IA sendo processadas
- **SEM erros de API key inválida**

---

## 🧪 TESTE 4: Simular Perfis Diferentes

Para testar se a IA identifica corretamente diferentes tipos de visitantes:

### Perfil 1: Curador de Museu
**Navegação:**
1. Ver página **Academy**
2. Filtrar projetos por **"Museums & Culture"**
3. Clicar em **3 projetos de museus** (ex: Olympic, MVRDV, etc.)
4. Gastar **30+ segundos** em cada projeto
5. Rolar até o final de cada página

**IA deve identificar:**
- `visitorType: "MUSEUM_CURATOR"`
- `museumScore: 80-100`
- Recomendar projetos culturais

---

### Perfil 2: Tech Enthusiast
**Navegação:**
1. Ver página **Research**
2. Filtrar projetos por **"VR/XR/AR"**
3. Clicar em projetos com tags **"AI", "Spatial Computing"**
4. Interagir com demos (se houver)

**IA deve identificar:**
- `visitorType: "TECH_ENTHUSIAST"`
- `vrScore: 80-100`
- `aiScore: 70-90`
- Recomendar projetos tecnológicos

---

### Perfil 3: Gestor de Marca
**Navegação:**
1. Ver página **Work**
2. Filtrar por **"Brands & Events"**
3. Clicar em projetos corporativos
4. Acessar página **Contact** (interesse em orçamento)

**IA deve identificar:**
- `visitorType: "BRAND_MANAGER"`
- `brandScore: 80-100`
- `conversionScore: 60-80` (alto potencial)
- Recomendar projetos de marcas

---

## 🔍 ANÁLISE DOS RESULTADOS

### ✅ IA Funcionando Corretamente Se:

1. **Tracking ativo:**
   - Requisições `POST /api/track` com status 200
   - Dados sendo salvos no banco

2. **Scores calculados:**
   - Tabela `InterestScore` populada
   - Valores de 0-100 para cada categoria
   - Scores mais altos para áreas relevantes

3. **Visitor Type identificado:**
   - Campo `visitorType` preenchido
   - Tipo condiz com navegação realizada
   - Ex: Quem vê museus → `MUSEUM_CURATOR`

4. **Recomendações personalizadas:**
   - JSON `recommendedProjects` com 3 projetos
   - Projetos relevantes ao perfil identificado
   - Campo `reason` explicando por quê

5. **Sugestões de ação:**
   - `suggestedAction` com texto personalizado
   - Ex: "Ver mais projetos de museus"
   - `suggestedPage` com slug relevante

---

## ⚠️ PROBLEMAS COMUNS

### Problema 1: Tracking não envia dados
**Causa:** CORS ou URL errada  
**Solução:**
- Verificar `API_URL` em `src/utils/analytics.ts`
- Deve apontar para `backoffice.azmt.com.br`

### Problema 2: InterestScore vazio
**Causa:** DeepSeek não sendo chamado  
**Solução:**
- Verificar `DEEPSEEK_API_KEY` no Vercel
- Ver logs de runtime para erros de API

### Problema 3: visitorType sempre "GENERAL_PUBLIC"
**Causa:** Falta de eventos suficientes  
**Solução:**
- Navegar mais (5+ páginas)
- Interagir mais com projetos (3+ cliques)
- IA precisa de dados mínimos para inferir

### Problema 4: recommendedProjects vazio
**Causa:** Projetos não publicados ou sem tags  
**Solução:**
- Verificar que há projetos com `status: PUBLISHED`
- Verificar que projetos têm tags relevantes

---

## 📊 MÉTRICAS DE SUCESSO

### Mínimo Aceitável:
- ✅ 80% das sessões rastreadas
- ✅ 50% das sessões com `visitorType` identificado
- ✅ 30% das sessões com recomendações

### Ideal:
- ✅ 95%+ das sessões rastreadas
- ✅ 70%+ com `visitorType` específico (não GENERAL_PUBLIC)
- ✅ 60%+ com 3 recomendações de projetos
- ✅ Recomendações relevantes ao comportamento

---

## 🚀 PRÓXIMOS PASSOS

Após confirmar que a IA está funcionando:

1. **Implementar Curadoria Invisível** (opcional):
   - Reordenar projetos na página Work
   - Mostrar hero adaptativo
   - Pre-aplicar filtros sugeridos

2. **Adicionar LGPD/GDPR**:
   - Cookie consent banner
   - Política de privacidade
   - Termos de uso

3. **Dashboard de IA** (futuro):
   - Visualizar sessões no backoffice
   - Ver distribuição de visitor types
   - Analytics de recomendações

---

## 📞 SUPORTE

Se algo não funcionar:
1. Verificar logs no Vercel
2. Ver console do navegador (F12)
3. Consultar documentação DeepSeek
4. Revisar `GUIA_IA_ANALISE_USUARIO_DEEPSEEK.md`

---

**Boa sorte com os testes!** 🚀🤖

