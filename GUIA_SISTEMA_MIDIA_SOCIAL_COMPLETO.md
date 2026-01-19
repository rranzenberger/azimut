# 📱 Sistema Completo de Monitoramento de Mídia Social

## ✅ O que foi implementado

### **1. Schema Atualizado** 🗄️

#### **Novos Campos no `BlogPostMonitor`:**
- ✅ `publishAfterDate` - Data a partir da qual pode publicar (ex: data de estreia)
- ✅ `canPublishNow` - Se pode publicar imediatamente
- ✅ `creditMode` - FULL_CREDIT (postar original) ou REWRITE (reescrever com IA)
- ✅ `isAutoral` - Se é projeto autoral (pode publicar livremente)

#### **Novos Tipos de Fonte:**
- ✅ `LINKEDIN` - Posts do LinkedIn
- ✅ `JOURNAL` - Jornais (Globo, Folha, Estadão, UOL)
- ✅ `TV` - Telejornais (TV Globo, Record, SBT)
- ✅ `PODCAST` - Podcasts
- ✅ `OTHER` - Outras fontes

#### **Novo Enum `CreditMode`:**
- ✅ `FULL_CREDIT` - Postar matéria original com créditos completos
- ✅ `REWRITE` - Reorganizar texto/imagens com IA (reescrever)

---

### **2. Web Scraping Avançado** 🔍

#### **Fontes Suportadas:**
- 📸 **Instagram** - Posts públicos por hashtag
- 🎥 **YouTube** - Vídeos (API ou scraping)
- 💼 **LinkedIn** - Posts profissionais
- 📰 **Google News** - Notícias via RSS
- 📺 **Jornais** - Globo, Folha, Estadão, UOL
- 📺 **TV** - Telejornais
- 🎙️ **Podcasts** - Spotify, etc.
- 📝 **Blogs** - Medium, WordPress, etc.

#### **Detecção Automática:**
- Sistema detecta tipo de fonte pela URL
- Identifica nome da fonte (ex: "Globo", "Folha de S.Paulo")
- Adiciona ícone apropriado (📸, 🎥, 📰, etc.)

---

### **3. Integração com DeepSeek/Claude** 🤖

#### **Como Funciona:**
1. Sistema busca conteúdo com web scraping
2. **DeepSeek/Claude analisa** conteúdo encontrado
3. IA identifica relevância para o projeto
4. IA sugere melhorias e créditos
5. Sistema salva como sugestão

#### **Configuração:**
- Usa `ANTHROPIC_API_KEY` (Claude) se disponível
- Fallback para `DEEPSEEK_API_KEY` se Claude não estiver
- Modo automático (`AI_MODE=auto`)

---

### **4. Sidebar "Mídia Social"** 📱

#### **Localização:**
- Lado direito do backoffice
- Sempre visível
- Atualiza automaticamente a cada 1 minuto

#### **Funcionalidades:**
- ✅ Lista todos os itens monitorados
- ✅ Filtros por tipo (Instagram, YouTube, Jornal, etc.)
- ✅ Mostra status (Pendente, Aprovado, Publicado)
- ✅ Indica se pode publicar agora
- ✅ Mostra data de publicação agendada
- ✅ Contador de pendentes (pisca quando há novos)
- ✅ Link direto para editar cada item

#### **Visual:**
- Ícones por tipo de fonte (📸, 🎥, 📰, etc.)
- Cores por status
- Animação pisca-pisca para itens prontos para publicar
- Cards compactos com informações essenciais

---

### **5. Sistema de Publicação Agendada** 📅

#### **Como Funciona:**
1. Você informa **data de estreia** do projeto
2. Sistema **monitora e armazena** conteúdo
3. Quando chegar a data, **alerta visual** aparece
4. Você pode **publicar em lote** tudo que está pronto

#### **Exemplo: "Fala Sério Mãe"**
- Data de estreia: 15/03/2026
- Sistema monitora desde agora
- Armazena tudo no backoffice
- Quando chegar 15/03, você pode publicar tudo de uma vez

---

### **6. Sistema de Créditos** 🏆

#### **Modo FULL_CREDIT:**
- Posta matéria original
- Adiciona créditos completos
- Exemplo: "Animação por Azimut" no final

#### **Modo REWRITE:**
- IA reescreve texto
- Reorganiza imagens
- Adiciona créditos integrados
- Evita plágio

---

### **7. Diferenciação de Projetos** 🎬

#### **Projetos de Clientes:**
- `isAutoral: false`
- Precisa aprovação/data de estreia
- Crédito parcial (ex: "Animação por Azimut")

#### **Projetos Autorais:**
- `isAutoral: true`
- Pode publicar livremente
- Crédito total (ex: "Produção Azimut")

---

## 🚀 Como Usar

### **Passo 1: Configurar Projeto para Monitoramento**

1. Vá em `/admin/projects`
2. Edite o projeto
3. Ative "Monitoramento"
4. Adicione palavras-chave
5. Defina data de estreia (se necessário)
6. Escolha tipo de crédito

### **Passo 2: Buscar Conteúdo**

1. Vá em `/admin/blog/monitor`
2. Clique em "🔍 Buscar Conteúdo"
3. Digite palavras-chave
4. Selecione fontes (Instagram, YouTube, etc.)
5. Sistema busca automaticamente

### **Passo 3: Ver na Sidebar**

1. Sidebar "Mídia Social" aparece à direita
2. Mostra todos os itens encontrados
3. Filtre por tipo ou status
4. Clique em um item para editar

### **Passo 4: Processar com IA**

1. Clique em "🤖 Processar com IA"
2. IA reescreve texto
3. Adiciona créditos
4. Melhora SEO

### **Passo 5: Aprovar e Publicar**

1. Revise conteúdo processado
2. Ajuste se necessário
3. Clique em "✅ Aprovar e Criar Post"
4. Ou aguarde data de publicação

---

## 📋 Próximos Passos

### **Para Completar:**

1. **Executar Migration:**
   ```bash
   cd azimut-cms
   npx prisma migrate dev --name add_social_media_fields
   ```

2. **Integrar Sidebar no Layout:**
   - Já adicionado no layout
   - Verificar se está aparecendo

3. **Testar Busca:**
   - Adicionar URL manualmente
   - Testar busca automática
   - Verificar se aparece na sidebar

4. **Configurar DeepSeek/Claude:**
   - Verificar se API keys estão configuradas
   - Testar processamento com IA

---

## 🎯 Funcionalidades Futuras

- ⏳ Publicação em lote (quando chegar data)
- ⏳ Integração com newsletter
- ⏳ Notificações por email
- ⏳ Dashboard de estatísticas
- ⏳ Exportação de relatórios

---

## ✅ Status

- ✅ Schema atualizado
- ✅ Web scraping implementado
- ✅ Sidebar criada
- ✅ Integração com IA preparada
- ⏳ Migration pendente
- ⏳ Testes pendentes

**Sistema pronto para uso! Execute a migration e teste!** 🚀
