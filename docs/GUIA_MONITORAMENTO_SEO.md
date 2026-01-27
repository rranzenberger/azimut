# 📊 Guia Prático: Monitoramento Constante de SEO

## 🎯 Objetivo

Monitorar constantemente o desempenho do site no Google usando Google Search Console e Google Analytics.

---

## 🔧 CONFIGURAÇÃO INICIAL

### 1. Google Search Console

#### 1.1 Verificar Propriedade
1. Acesse: https://search.google.com/search-console
2. Adicione propriedade: `https://azmt.com.br`
3. Escolha método: **"Tag HTML"**
4. Copie o código de verificação
5. Adicione no `index.html` (já preparado ✅)

#### 1.2 Submeter Sitemap
1. Menu lateral → **"Sitemaps"**
2. Adicione: `sitemap.xml`
3. Clique em **"Enviar"**

#### 1.3 Solicitar Indexação
1. Menu lateral → **"Inspeção de URL"**
2. Digite URLs principais:
   - `https://azmt.com.br/pt`
   - `https://azmt.com.br/pt/work`
   - `https://azmt.com.br/pt/academy`
   - `https://azmt.com.br/pt/contact`
3. Para cada URL: **"Testar URL publicada"** → **"Solicitar indexação"**

**Tempo:** 15-20 minutos

---

### 2. Google Analytics 4

#### 2.1 Criar Propriedade
1. Acesse: https://analytics.google.com
2. Criar propriedade → **"Azimut Site"**
3. URL: `https://azmt.com.br`
4. Copie o **Measurement ID** (ex: `G-XXXXXXXXXX`)

#### 2.2 Configurar no Site
1. Adicione variável no Vercel:
   - **Name:** `VITE_GA_MEASUREMENT_ID`
   - **Value:** `G-XXXXXXXXXX` (cole o ID)
2. O componente `GoogleAnalytics.tsx` já está pronto ✅

**Tempo:** 10-15 minutos

---

## 📊 MONITORAMENTO DIÁRIO (5 minutos)

### Google Search Console - Visão Geral

**O que verificar:**
1. **Impressões** - Quantas vezes apareceu no Google
2. **Cliques** - Quantos cliques recebeu
3. **CTR** - Taxa de cliques (cliques/impressões)
4. **Posição média** - Posição média no Google

**Ações:**
- Se CTR < 2% → Melhorar meta descriptions
- Se posição média > 20 → Otimizar conteúdo
- Se impressões caindo → Verificar indexação

---

## 📊 MONITORAMENTO SEMANAL (15 minutos)

### Google Search Console - Análise Detalhada

#### 1. Performance (Queries)
**Onde:** Performance → Queries

**O que verificar:**
- Queries com mais impressões
- Queries com mais cliques
- Queries com baixo CTR
- Queries com posição ruim (> 10)

**Ações:**
- Otimizar páginas para queries importantes
- Criar conteúdo para queries com potencial
- Melhorar meta descriptions para queries com baixo CTR

#### 2. Cobertura (Indexação)
**Onde:** Cobertura → Páginas

**O que verificar:**
- Páginas indexadas
- Páginas não indexadas
- Erros de indexação

**Ações:**
- Corrigir erros de indexação
- Solicitar indexação de páginas importantes
- Verificar se robots.txt não está bloqueando

#### 3. Links (Backlinks)
**Onde:** Links → Backlinks

**O que verificar:**
- Novos backlinks
- Sites que linkam para você
- Páginas mais linkadas

**Ações:**
- Agradecer sites que linkam
- Identificar oportunidades de mais backlinks
- Verificar qualidade dos backlinks

---

### Google Analytics 4 - Análise Semanal

#### 1. Tráfego Orgânico
**Onde:** Aquisição → Visão geral

**O que verificar:**
- Sessões orgânicas (Google)
- Taxa de rejeição
- Tempo médio na página
- Páginas por sessão

**Ações:**
- Se taxa de rejeição > 70% → Melhorar conteúdo
- Se tempo médio < 30s → Melhorar engajamento
- Se páginas/sessão < 2 → Melhorar navegação interna

#### 2. Páginas Mais Visitadas
**Onde:** Comportamento → Páginas

**O que verificar:**
- Páginas com mais visualizações
- Páginas com maior taxa de rejeição
- Páginas com menor tempo na página

**Ações:**
- Otimizar páginas populares
- Melhorar páginas com alta rejeição
- Adicionar CTAs em páginas populares

---

## 📊 MONITORAMENTO MENSAL (1 hora)

### Relatório Completo de SEO

#### 1. Google Search Console - Relatório Mensal

**Métricas principais:**
- Total de impressões (comparar com mês anterior)
- Total de cliques (comparar com mês anterior)
- CTR médio (comparar com mês anterior)
- Posição média (comparar com mês anterior)
- Páginas indexadas (comparar com mês anterior)
- Backlinks totais (comparar com mês anterior)

**Exportar dados:**
1. Performance → Exportar → CSV
2. Salvar em planilha para histórico

#### 2. Google Analytics 4 - Relatório Mensal

**Métricas principais:**
- Sessões orgânicas (comparar com mês anterior)
- Taxa de conversão (comparar com mês anterior)
- Páginas mais visitadas (top 10)
- Origem do tráfego (Google vs outros)
- Dispositivos (mobile vs desktop)

**Exportar dados:**
1. Relatórios → Exportar → PDF/CSV
2. Salvar para histórico

#### 3. Análise de Palavras-chave

**Ferramentas:**
- Google Search Console → Queries
- Google Keyword Planner
- Ubersuggest (versão gratuita)

**O que verificar:**
- Novas palavras-chave que aparecem
- Palavras-chave com potencial
- Palavras-chave que perderam posição

**Ações:**
- Criar conteúdo para novas palavras-chave
- Otimizar para palavras-chave com potencial
- Investigar por que palavras-chave perderam posição

---

## 🚨 ALERTAS E AÇÕES IMEDIATAS

### Se Impressões Caírem > 20%

**Possíveis causas:**
- Problema de indexação
- Penalização do Google
- Mudança de algoritmo
- Concorrência aumentou

**Ações:**
1. Verificar erros no Search Console
2. Verificar se há penalizações
3. Verificar backlinks tóxicos
4. Verificar se conteúdo foi removido

---

### Se CTR Cair > 30%

**Possíveis causas:**
- Meta descriptions ruins
- Títulos não atraentes
- Posição piorou
- Concorrência melhorou snippets

**Ações:**
1. Melhorar meta descriptions
2. Melhorar títulos (H1)
3. Adicionar rich snippets
4. Melhorar snippets com FAQ schema

---

### Se Posição Média Piorar > 5 Posições

**Possíveis causas:**
- Conteúdo desatualizado
- Backlinks perdidos
- Concorrência melhorou
- Problemas técnicos

**Ações:**
1. Atualizar conteúdo
2. Verificar backlinks perdidos
3. Melhorar conteúdo existente
4. Verificar problemas técnicos (velocidade, mobile, etc)

---

## 📋 CHECKLIST DE MONITORAMENTO

### Diário (5 min):
- [ ] Verificar impressões no Search Console
- [ ] Verificar cliques no Search Console
- [ ] Verificar erros críticos

### Semanal (15 min):
- [ ] Analisar queries principais
- [ ] Verificar indexação
- [ ] Verificar novos backlinks
- [ ] Analisar tráfego orgânico no GA4
- [ ] Verificar páginas mais visitadas

### Mensal (1 hora):
- [ ] Relatório completo Search Console
- [ ] Relatório completo Analytics
- [ ] Análise de palavras-chave
- [ ] Comparar com mês anterior
- [ ] Identificar oportunidades
- [ ] Criar plano de ação

---

## 🔧 FERRAMENTAS RECOMENDADAS

### Essenciais (Gratuitas):
- ✅ **Google Search Console** - Monitoramento de SEO
- ✅ **Google Analytics 4** - Análise de tráfego
- ✅ **Google Keyword Planner** - Pesquisa de palavras-chave

### Úteis (Gratuitas):
- **Ubersuggest** - Análise de palavras-chave e backlinks (versão gratuita)
- **Google PageSpeed Insights** - Performance do site
- **Google Mobile-Friendly Test** - Teste mobile

### Avançadas (Pagas - Opcional):
- **Ahrefs** - Análise completa de SEO
- **SEMrush** - Análise completa de SEO
- **Moz** - Domain authority e backlinks

---

## 📊 TEMPLATE DE RELATÓRIO MENSAL

```
RELATÓRIO SEO MENSAL - [Mês/Ano]

GOOGLE SEARCH CONSOLE:
- Impressões: [número] (variação: [%])
- Cliques: [número] (variação: [%])
- CTR: [%] (variação: [%])
- Posição média: [número] (variação: [posições])
- Páginas indexadas: [número] (variação: [número])
- Backlinks: [número] (variação: [número])

GOOGLE ANALYTICS:
- Sessões orgânicas: [número] (variação: [%])
- Taxa de rejeição: [%] (variação: [%])
- Tempo médio: [minutos] (variação: [%])
- Taxa de conversão: [%] (variação: [%])

TOP 5 QUERIES:
1. [query] - Posição: [número] - Cliques: [número]
2. [query] - Posição: [número] - Cliques: [número]
3. [query] - Posição: [número] - Cliques: [número]
4. [query] - Posição: [número] - Cliques: [número]
5. [query] - Posição: [número] - Cliques: [número]

AÇÕES PARA PRÓXIMO MÊS:
- [ ] [Ação 1]
- [ ] [Ação 2]
- [ ] [Ação 3]
```

---

## 🎯 PRÓXIMOS PASSOS

1. **Hoje:** Configurar Google Search Console e Analytics
2. **Esta semana:** Começar monitoramento diário
3. **Próxima semana:** Primeiro relatório semanal
4. **Próximo mês:** Primeiro relatório mensal completo

---

## 📞 RECURSOS ADICIONAIS

- Guia completo de SEO: `docs/GUIA_SEO_PRIMEIRO_LUGAR.md`
- Guia de backlinks: `docs/GUIA_BACKLINKS_PRATICO.md`
- Configurar Search Console: `docs/resumos/RESUMO_CONFIGURACAO_GOOGLE_SEARCH_CONSOLE.md`
