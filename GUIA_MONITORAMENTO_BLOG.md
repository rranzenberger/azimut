# 🤖 Guia: Sistema de Monitoramento de Conteúdo

## ✅ O que foi implementado

### 1. **Serviços de Busca** (`lib/services/contentMonitor.ts`)
- ✅ Busca Google News (NewsAPI)
- ✅ Busca YouTube (YouTube Data API)
- ✅ Busca Instagram (estrutura pronta, requer configuração)
- ✅ Extração de conteúdo de URLs

### 2. **Serviço de IA** (`lib/services/aiProcessor.ts`)
- ✅ Processamento com OpenAI GPT-4o-mini
- ✅ Reescreve textos evitando plágio
- ✅ Melhora SEO automaticamente
- ✅ Gera títulos e excerpts
- ✅ Suporte multi-idioma (PT, EN, ES, FR)

### 3. **APIs** (`/api/admin/blog/monitor`)
- ✅ `POST /search` - Buscar conteúdo
- ✅ `GET /` - Listar sugestões
- ✅ `POST /` - Criar sugestão manual
- ✅ `GET /[id]` - Buscar sugestão
- ✅ `PUT /[id]` - Atualizar sugestão
- ✅ `DELETE /[id]` - Deletar sugestão
- ✅ `POST /[id]/process-ai` - Processar com IA
- ✅ `POST /[id]/approve` - Aprovar e criar post

### 4. **Interface no Backoffice** (`/admin/blog/monitor`)
- ✅ Busca manual por palavras-chave
- ✅ Filtros (status, fonte, projeto)
- ✅ Lista de sugestões
- ✅ Processar com IA
- ✅ Aprovar e criar post
- ✅ Rejeitar sugestões

---

## 🔧 Configuração Necessária

### Variáveis de Ambiente

Adicione no `.env` do backoffice:

```env
# OpenAI (para reescrever textos)
OPENAI_API_KEY=sk-...

# NewsAPI (para buscar notícias)
NEWS_API_KEY=...

# YouTube Data API (para buscar vídeos)
YOUTUBE_API_KEY=...

# Instagram (opcional - requer configuração complexa)
INSTAGRAM_ACCESS_TOKEN=...
```

### Como obter as chaves:

1. **OpenAI API Key:**
   - Acesse: https://platform.openai.com/api-keys
   - Crie uma nova chave
   - Custo: ~$0.01-0.02 por post processado

2. **NewsAPI Key:**
   - Acesse: https://newsapi.org/register
   - Plano gratuito: 100 requisições/dia
   - Plano pago: $449/mês (ilimitado)

3. **YouTube API Key:**
   - Acesse: https://console.cloud.google.com/
   - Crie projeto → Ative YouTube Data API v3
   - Crie credencial (API Key)
   - Gratuito: 10.000 unidades/dia

---

## 🚀 Como Usar

### 1. Buscar Conteúdo

1. Acesse: https://backoffice.azmt.com.br/admin/blog/monitor
2. Na seção "🔍 Buscar Conteúdo":
   - Digite palavras-chave (ex: "Rio Museu Olímpico, Azimut")
   - Selecione projeto (opcional)
   - Escolha fontes (Notícias, YouTube, Instagram)
3. Clique em "🔍 Buscar Agora"
4. O sistema busca e salva sugestões automaticamente

### 2. Processar com IA

1. Encontre uma sugestão na lista
2. Clique em "🤖 Processar com IA"
3. Aguarde processamento (30-60 segundos)
4. O sistema reescreve o texto, melhora SEO e gera título/excerpt

### 3. Aprovar e Criar Post

1. Após processar com IA, clique em "✅ Aprovar e Criar Post"
2. O sistema cria um post no blog como **rascunho**
3. Você pode editar antes de publicar
4. Acesse `/admin/blog` para ver o post criado

---

## 📋 Fluxo Completo

```
1. Buscar Conteúdo
   ↓
2. Sugestões aparecem como "PENDING"
   ↓
3. Processar com IA (reescreve, melhora SEO)
   ↓
4. Revisar sugestão processada
   ↓
5. Aprovar → Cria post como rascunho
   ↓
6. Editar no editor do blog (opcional)
   ↓
7. Publicar post
```

---

## 🎯 Exemplo Prático

### Cenário: "Rio Museu Olímpico"

1. **Buscar:**
   - Keywords: "Rio Museu Olímpico, Azimut, instalação"
   - Fontes: Notícias + YouTube
   - Resultado: 5-10 sugestões encontradas

2. **Processar uma sugestão:**
   - Texto original: "O Rio Museu Olímpico foi inaugurado..."
   - Após IA: "A Azimut foi responsável pela montagem e instalação das experiências audiovisuais do Rio Museu Olímpico, um dos projetos mais desafiadores da nossa trajetória..."
   - SEO melhorado, crédito adicionado

3. **Aprovar:**
   - Post criado: `/admin/blog/[id]`
   - Status: DRAFT
   - Você edita e publica quando quiser

---

## ⚠️ Importante

1. **Custos:**
   - OpenAI: ~$0.01-0.02 por processamento
   - NewsAPI: Gratuito (100/dia) ou pago
   - YouTube: Gratuito (10k/dia)

2. **Limitações:**
   - Instagram requer configuração complexa (Instagram Business Account)
   - Alguns sites bloqueiam scraping (retorna erro)
   - IA pode demorar 30-60 segundos

3. **Recomendações:**
   - Sempre revise o conteúdo gerado pela IA
   - Edite antes de publicar
   - Verifique créditos e links
   - Use filtros para organizar sugestões

---

## 🔄 Próximos Passos (Opcional)

1. **Automação:**
   - Cron job para buscar automaticamente
   - Notificações de novas sugestões
   - Processamento em lote

2. **Melhorias:**
   - Suporte a mais fontes (Twitter, Facebook)
   - Filtros avançados
   - Exportação de relatórios
   - Dashboard de métricas

---

## ✅ Sistema Pronto!

O sistema está **100% funcional**. Basta configurar as chaves de API e começar a usar!

**Acesse:** https://backoffice.azmt.com.br/admin/blog/monitor
