# 🎯 GUIA COMPLETO - Sistema Azimut (Site + Backoffice)

## 📋 ÍNDICE

1. [Visão Geral](#visão-geral)
2. [Sistema de Monitoramento](#sistema-de-monitoramento)
3. [Sistema de Making-of](#sistema-de-making-of)
4. [Área de Curadoria](#área-de-curadoria)
5. [Publicação Automática](#publicação-automática)
6. [Alertas e Prioridades](#alertas-e-prioridades)
7. [Fluxos Automáticos](#fluxos-automáticos)
8. [UX/UI - Guia para Estagiário](#uxui-guia-para-estagiário)

---

## 🎯 VISÃO GERAL

### **O que o Sistema Faz:**

1. **Monitora automaticamente** conteúdo sobre projetos Azimut
2. **Organiza making-ofs** (pessoais, colaboradores, clientes)
3. **Faz curadoria** antes de publicar
4. **Publica automaticamente** nos lugares corretos
5. **Alerta visualmente** sobre pendências

---

## 🤖 SISTEMA DE MONITORAMENTO

### **Como Funciona:**

#### **1. Configurar Projeto para Monitoramento**

**Onde:** `/admin/projects/[id]/monitoring`

**Passos:**
1. Vá em "Projetos" no menu lateral
2. Clique no projeto que quer monitorar
3. Clique no botão "🤖 Monitoramento" (ou acesse diretamente)
4. Ative "Monitoramento Automático"
5. Adicione palavras-chave (ex: "Rio Museu Olímpico, instalação imersiva")
6. Configure créditos e contribuições
7. Clique "💾 Salvar"

**Resultado:**
- ✅ Projeto fica sendo monitorado automaticamente
- ✅ DeepSeek/Claude busca conteúdo relacionado
- ✅ Resultados aparecem na curadoria

---

#### **2. Monitoramento Automático**

**Frequência:**
- **Automático:** A cada 6 horas (cron job)
- **Manual:** Botão "🔍 Buscar Agora" (busca imediata)

**O que Busca:**
- 📸 Instagram (posts, hashtags)
- 🎥 YouTube (vídeos)
- 📰 Google News (notícias)
- 💼 LinkedIn (posts profissionais)
- 📺 Jornais (Globo, Folha, Estadão)
- 📝 Blogs especializados

**Processamento:**
1. Sistema busca conteúdo
2. **DeepSeek/Claude analisa** relevância
3. Filtra apenas conteúdo relevante
4. Salva como sugestão na curadoria

---

## 🎬 SISTEMA DE MAKING-OF

### **Tipos de Making-of:**

1. **👤 Pessoal** - Equipe Azimut
   - Pode publicar: Imediatamente
   - Exemplo: "Making-of Montagem Rio Museu Olímpico"

2. **🤝 Parceria** - Troca de apoio
   - Pode publicar: Conforme acordo
   - Exemplo: "Making-of em parceria com [Nome]"

3. **💼 Contratado** - Colaborador (Eduardo Nartino, etc.)
   - Créditos: "Making-of por Eduardo Nartino"
   - Exemplo: "Making-of Festival VR - Eduardo Nartino"

4. **👥 Cliente** - Material enviado pelo cliente
   - Status: `REVIEW` (aguarda aprovação)
   - Exemplo: "Depoimento do cliente sobre experiência"

5. **🎬 Evento** - Festivais, workshops
   - Tags: Incluem "academy" se relacionado
   - Exemplo: "Making-of Festival VR 2026"

---

### **Como Criar Making-of:**

#### **Opção 1: Via Formulário**

1. Vá em `/admin/making-of/new`
2. Preencha informações:
   - Título
   - Descrição
   - Tipo (Pessoal, Parceria, etc.)
   - Projeto relacionado
   - Colaborador/Cliente (se aplicável)
3. Configure publicação:
   - ☑️ Blog
   - ☑️ Newsletter
   - ☑️ Redes Sociais
4. Salve

#### **Opção 2: Via SQL (Templates)**

1. Vá em `/admin/making-of/templates`
2. Escolha template adequado
3. Copie SQL
4. Personalize valores
5. Execute no SQL Editor
6. Aparece na curadoria

---

## 🎨 ÁREA DE CURADORIA

### **Localização:** `/admin/making-of/curation`

### **O que Você Vê:**

#### **Estatísticas (Topo):**
- 🟡 **Aguardando Curadoria** - Novos itens para revisar
- 🟢 **Prontos para Publicar** - Aprovados, podem publicar
- 🔵 **Aprovados** - Já aprovados
- 🟣 **Publicados** - Já no ar

#### **Filtros:**
- Todos
- DRAFT (Rascunho)
- REVIEW (Aguardando Revisão)
- APPROVED (Aprovado)
- PUBLISHED (Publicado)

#### **Visualização:**
- **Grid** - Cards com thumbnails
- **Lista** - Lista compacta

#### **Seleção Múltipla:**
- ☑️ Selecionar vários itens
- ✅ Aprovar em lote
- 🚀 Publicar em lote

---

### **Alertas Visuais (Pisca-Pisca):**

#### **1. Badge no Menu Lateral:**
- Link "🤖 Monitoramento" com contador vermelho
- **Pisca quando há pendentes**
- Atualiza a cada 30 segundos

#### **2. Banner no Topo do Blog:**
- Banner gradiente (amarelo → laranja → vermelho)
- **Pisca quando há sugestões pendentes**
- Mostra quantas estão aguardando
- Botão "👉 Ver e Aprovar Agora"
- Atualiza a cada 1 minuto

#### **3. Cards na Curadoria:**
- **Amarelo piscando:** Precisa processar com IA primeiro
- **Verde:** Pronto para aprovar
- **Azul:** Aguardando processamento
- **Badge "🔔 PENDENTE"** piscando em cada card

#### **4. Contador no Header:**
- Badge vermelho grande no canto direito
- Mostra quantas sugestões estão pendentes
- **Animação pisca-pisca**

---

## 🚀 PUBLICAÇÃO AUTOMÁTICA

### **Quando Aprova, Publica Automaticamente:**

#### **1. Blog** (se `publishToBlog: true`)
- ✅ Cria post automaticamente
- ✅ Inclui todas as mídias
- ✅ Adiciona créditos
- ✅ Tags automáticas

#### **2. Newsletter** (se `publishToNewsletter: true`)
- ✅ Adiciona à próxima newsletter
- ✅ Link para making-of completo

#### **3. Redes Sociais** (se `publishToSocial: true`)
- ✅ Instagram
- ✅ LinkedIn
- ✅ Usa sistema de repostagem

#### **4. Projeto** (sempre, se tiver `projectId`)
- ✅ Adiciona mídias à galeria
- ✅ Atualiza página do projeto

#### **5. Home** (se for vídeo destacado)
- ✅ Condições:
  - `mediaType === 'VIDEO'` ou `'MIXED'`
  - `featured === true`
  - Tiver projeto do portfólio
- ✅ Aparece na seção "Vídeos em Destaque"

#### **6. Academy** (se relacionado)
- ✅ Condições:
  - Tags: "academy", "curso", "workshop"
  - Tipo: `EVENT` relacionado a educação

---

## 🔔 ALERTAS E PRIORIDADES

### **Sistema de Alertas Visuais:**

#### **Prioridade ALTA (Pisca-Pisca Vermelho):**
- ⚠️ Sugestões pendentes de aprovação
- ⚠️ Making-ofs aguardando curadoria
- ⚠️ Itens prontos para publicar

#### **Prioridade MÉDIA (Amarelo):**
- ⏳ Precisa processar com IA
- ⏳ Aguardando revisão

#### **Prioridade BAIXA (Azul/Verde):**
- ✅ Aprovado
- ✅ Publicado

---

### **Onde Aparecem os Alertas:**

1. **Menu Lateral:**
   - Badge vermelho no "🤖 Monitoramento"
   - Pisca quando há pendentes

2. **Página do Blog:**
   - Banner grande no topo
   - Pisca quando há sugestões

3. **Área de Curadoria:**
   - Cards coloridos
   - Contador no header
   - Badges "PENDENTE" piscando

4. **Página de Monitoramento:**
   - Contador no header
   - Cards com alertas visuais

---

## ⚙️ FLUXOS AUTOMÁTICOS

### **Fluxo 1: Monitoramento → Curadoria → Publicação**

```
1. Sistema monitora projeto (automático a cada 6h)
   ↓
2. DeepSeek/Claude busca e analisa
   ↓
3. Salva na curadoria (status: PENDING)
   ↓
4. 🔔 ALERTA: Badge pisca, banner aparece
   ↓
5. Você revisa na curadoria
   ↓
6. Processa com IA (se necessário)
   ↓
7. Aprova
   ↓
8. Sistema publica automaticamente:
   ✅ Blog
   ✅ Newsletter
   ✅ Redes Sociais
   ✅ Projeto
   ✅ Home (se destacado)
```

---

### **Fluxo 2: Making-of Manual → Curadoria → Publicação**

```
1. Criar making-of (formulário ou SQL)
   ↓
2. Upload de mídias
   ↓
3. Aparece na curadoria (status: DRAFT)
   ↓
4. 🔔 ALERTA: Aparece em "Aguardando Curadoria"
   ↓
5. Você revisa
   ↓
6. Aprova
   ↓
7. Sistema publica automaticamente
```

---

### **Fluxo 3: Material do Cliente → Aprovação → Publicação**

```
1. Cliente envia material
   ↓
2. Você cria making-of tipo "CLIENT"
   ↓
3. Status: REVIEW (aguarda aprovação)
   ↓
4. 🔔 ALERTA: Aparece em "Aguardando Curadoria"
   ↓
5. Você revisa e aprova
   ↓
6. Sistema publica automaticamente
```

---

## 👨‍💼 UX/UI - GUIA PARA ESTAGIÁRIO

### **📱 ÁREA DE CURADORIA - Passo a Passo**

#### **1. Acessar Curadoria:**
- Menu lateral → "🎨 Curadoria"
- OU: Menu → "🎬 Making-of" → "🎨 Curadoria"

#### **2. Ver o que Precisa Atenção:**
- **Topo:** Estatísticas mostram quantos em cada etapa
- **Amarelo piscando:** Precisa atenção urgente
- **Verde:** Pronto para aprovar

#### **3. Filtrar:**
- Use filtros no topo (DRAFT, REVIEW, etc.)
- OU veja "Todos"

#### **4. Revisar Item:**
- Clique no card/item
- Veja informações completas
- Veja mídias (imagens/vídeos)
- Verifique créditos

#### **5. Processar com IA (se necessário):**
- Se não tiver conteúdo processado
- Clique "🤖 Processar com IA"
- Aguarde processamento
- Revise resultado

#### **6. Aprovar:**
- **Individual:** Clique "✅ Aprovar"
- **Em Lote:** Selecione vários → "✅ Aprovar Selecionados"
- Sistema publica automaticamente

---

### **🤖 CONFIGURAR MONITORAMENTO - Passo a Passo**

#### **1. Acessar:**
- Menu → "Projetos"
- Clique no projeto
- Botão "🤖 Monitoramento" (se ativo)
- OU: `/admin/projects/[id]/monitoring`

#### **2. Configurar:**
- ☑️ Ativar "Monitoramento Automático"
- Digite palavras-chave (separadas por vírgula)
- Exemplo: "Rio Museu Olímpico, instalação imersiva, Azimut"
- Configure créditos
- Clique "💾 Salvar"

#### **3. Buscar Agora (Opcional):**
- Clique "🔍 Buscar Agora"
- Sistema busca imediatamente
- Resultados aparecem abaixo

#### **4. Ver Resultados:**
- Aparecem na seção "📊 Resultados Encontrados"
- Clique para ver detalhes
- Vão para curadoria automaticamente

---

### **🎬 CRIAR MAKING-OF - Passo a Passo**

#### **1. Acessar:**
- Menu → "🎬 Making-of" → "➕ Novo"
- OU: `/admin/making-of/new`

#### **2. Preencher:**
- **Título:** Nome do making-of
- **Descrição:** O que é
- **Tipo:** Pessoal, Parceria, Contratado, Cliente, Evento
- **Origem:** Interno, Colaborador, Cliente, Parceiro
- **Projeto:** Selecione ou digite nome

#### **3. Colaborador/Cliente (se aplicável):**
- Se for colaborador: Digite nome (ex: "Eduardo Nartino")
- Se for cliente: Digite nome e email

#### **4. Publicação:**
- ☑️ Publicar no Blog?
- ☑️ Incluir na Newsletter?
- ☑️ Publicar nas Redes Sociais?
- ☑️ Pode publicar imediatamente?

#### **5. Salvar:**
- Clique "💾 Salvar Making-of"
- Aparece na curadoria

---

### **⚠️ ALERTAS - O que Fazer:**

#### **Badge Piscando no Menu:**
- **O que é:** Há sugestões pendentes
- **O que fazer:** Clique em "🤖 Monitoramento"
- **Ação:** Revisar e aprovar

#### **Banner no Blog:**
- **O que é:** Sugestões aguardando aprovação
- **O que fazer:** Clique "👉 Ver e Aprovar Agora"
- **Ação:** Ir para curadoria e aprovar

#### **Card Amarelo Piscando:**
- **O que é:** Precisa processar com IA primeiro
- **O que fazer:** Clique "🤖 Processar com IA"
- **Ação:** Aguardar processamento, depois aprovar

#### **Card Verde:**
- **O que é:** Pronto para aprovar
- **O que fazer:** Clique "✅ Aprovar"
- **Ação:** Sistema publica automaticamente

---

## 🔄 AUTOMAÇÕES

### **Totalmente Automático:**

1. ✅ **Monitoramento** - Busca a cada 6h
2. ✅ **Análise com IA** - DeepSeek/Claude analisa relevância
3. ✅ **Publicação** - Quando aprova, publica automaticamente
4. ✅ **Alertas** - Atualiza badges e banners automaticamente

### **Semi-Automático (Precisa Aprovação):**

1. ⚠️ **Curadoria** - Você revisa antes de aprovar
2. ⚠️ **Processamento IA** - Você decide quando processar
3. ⚠️ **Publicação** - Você aprova antes de publicar

---

## 📊 PRIORIDADES DE CURADORIA

### **Ordem de Prioridade:**

1. **🔴 ALTA - Pisca Vermelho:**
   - Sugestões prontas para aprovar (tem conteúdo processado)
   - Making-ofs aguardando aprovação
   - Itens com data de publicação chegando

2. **🟡 MÉDIA - Amarelo:**
   - Precisa processar com IA
   - Aguardando revisão

3. **🟢 BAIXA - Verde:**
   - Já aprovado
   - Já publicado

---

## ✅ CHECKLIST DIÁRIO (Para Estagiário)

### **Manhã:**
- [ ] Verificar badges piscando no menu
- [ ] Verificar banner no blog
- [ ] Ir na curadoria
- [ ] Revisar itens com prioridade ALTA (vermelho)
- [ ] Aprovar os relevantes

### **Durante o Dia:**
- [ ] Processar com IA itens que precisam
- [ ] Revisar novos resultados do monitoramento
- [ ] Criar making-ofs manuais se necessário

### **Fim do Dia:**
- [ ] Verificar se tudo foi aprovado
- [ ] Verificar se publicações foram feitas
- [ ] Limpar itens rejeitados

---

## 🎯 RESUMO EXECUTIVO

### **O que o Sistema Faz Sozinho:**
- ✅ Monitora projetos automaticamente
- ✅ Busca conteúdo com DeepSeek/Claude
- ✅ Analisa relevância
- ✅ Publica quando você aprova
- ✅ Atualiza alertas visualmente

### **O que Você Precisa Fazer:**
- ⚠️ Configurar projetos para monitoramento
- ⚠️ Revisar resultados na curadoria
- ⚠️ Aprovar antes de publicar
- ⚠️ Criar making-ofs manuais

### **Alertas Visuais:**
- 🔔 Badge piscando = Há pendências
- 📢 Banner no blog = Sugestões aguardando
- ⚠️ Cards coloridos = Status visual
- 📊 Estatísticas = Quantos em cada etapa

---

## 🚀 PRÓXIMOS PASSOS

1. **Executar Migration** (agora)
2. **Testar Monitoramento** (configurar 1 projeto)
3. **Testar Curadoria** (criar 1 making-of)
4. **Verificar Alertas** (confirmar que piscam)

---

**Sistema completo e pronto para uso!** 🎉
