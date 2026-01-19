# 📸 Guia: Monitoramento do Instagram

## 🎯 Como Funciona

### **Opção 1: Instagram Graph API (Recomendado - Mas Complexo)**

O Instagram Graph API permite buscar posts de contas públicas, mas requer:

1. **Instagram Business Account** (não conta pessoal)
2. **Facebook App** aprovado pelo Facebook
3. **Access Token** com permissões específicas
4. **Revisão do Facebook** para produção

### **Opção 2: Web Scraping (Mais Simples - Mas Limitado)**

Buscar posts públicos diretamente do site do Instagram (sem API oficial).

---

## 🔧 Configuração Recomendada

### **Cenário Ideal:**

1. **Conta Instagram da Azimut** (Business Account)
   - Exemplo: `@azimut_brasil` ou `@azimut_canada`
   - Deve ser conta Business (não pessoal)

2. **Hashtags e Menções:**
   - Hashtags: `#Azimut`, `#RioMuseuOlimpico`, `#FalaSerioMae`
   - Menções: `@azimut_brasil`
   - Palavras-chave: "Azimut", "projeto Azimut", etc.

3. **O que o sistema busca:**
   - Posts que mencionam a Azimut
   - Posts com hashtags relacionadas aos projetos
   - Posts de clientes/parceiros sobre projetos
   - Stories (se configurado)

---

## 📋 Passo a Passo: Configurar Instagram Graph API

### **PASSO 1: Criar Facebook App**

1. Acesse: https://developers.facebook.com/
2. Clique em "Meus Apps" → "Criar App"
3. Escolha tipo: **"Business"**
4. Preencha nome: "Azimut Content Monitor"

### **PASSO 2: Adicionar Instagram Graph API**

1. No dashboard do app, clique em "Adicionar Produto"
2. Adicione **"Instagram Graph API"**
3. Configure permissões:
   - `instagram_basic`
   - `instagram_content_publish` (se quiser postar)
   - `pages_read_engagement`

### **PASSO 3: Conectar Conta Instagram**

1. Vá em "Configurações" → "Básico"
2. Adicione **Instagram Business Account**
3. Gere **Access Token** de longa duração

### **PASSO 4: Configurar no Backoffice**

Adicione no `.env` do backoffice:

```env
INSTAGRAM_ACCESS_TOKEN=seu_token_aqui
INSTAGRAM_BUSINESS_ACCOUNT_ID=seu_id_aqui
```

---

## 🔍 Como o Sistema Busca

### **Busca por Hashtag:**

```typescript
// Exemplo: Buscar posts com #RioMuseuOlimpico
POST /api/admin/blog/monitor/search
{
  "keywords": ["Rio Museu Olímpico", "#RioMuseuOlimpico"],
  "sources": ["instagram"]
}
```

### **O que é retornado:**

- URL do post
- Imagem
- Legenda (texto)
- Data de publicação
- Autor (conta que postou)
- Número de curtidas/comentários

### **Processamento:**

1. Sistema busca posts com hashtags/palavras-chave
2. Salva como sugestão (status: PENDING)
3. Você processa com IA (reescreve texto)
4. Você aprova e cria post no blog

---

## ⚠️ Limitações e Alternativas

### **Limitações do Instagram Graph API:**

1. **Apenas contas Business** (não pessoais)
2. **Revisão do Facebook** necessária para produção
3. **Rate Limits:** ~200 requisições/hora
4. **Apenas posts públicos** da conta conectada

### **Alternativa: Web Scraping**

Se não quiser usar a API oficial, posso implementar:

1. **Busca por hashtag no site público:**
   - Acessa `instagram.com/explore/tags/azimut`
   - Extrai posts públicos
   - Salva como sugestões

2. **Vantagens:**
   - Não precisa de API
   - Funciona com qualquer hashtag pública
   - Mais simples de configurar

3. **Desvantagens:**
   - Pode quebrar se Instagram mudar layout
   - Pode ser bloqueado (rate limiting)
   - Menos confiável

---

## 🎯 Recomendação

### **Para Começar (Mais Simples):**

1. **Use busca manual:**
   - Você vai no Instagram
   - Copia URL do post interessante
   - Cola no backoffice manualmente
   - Sistema processa com IA

2. **Implementar depois:**
   - Instagram Graph API (quando tiver conta Business)
   - Ou web scraping (se preferir)

### **Para Produção (Mais Robusto):**

1. Configure Instagram Business Account
2. Crie Facebook App
3. Configure Access Token
4. Sistema busca automaticamente

---

## 💡 Exemplo Prático

### **Cenário: Cliente posta sobre projeto**

1. **Cliente posta no Instagram:**
   ```
   "Ficou incrível o trabalho da @azimut_brasil 
   no Rio Museu Olímpico! 🎬 #RioMuseuOlimpico"
   ```

2. **Sistema detecta:**
   - Hashtag: `#RioMuseuOlimpico`
   - Menção: `@azimut_brasil`
   - Palavra-chave: "Rio Museu Olímpico"

3. **Sistema cria sugestão:**
   - Status: PENDING
   - Fonte: Instagram
   - URL do post
   - Imagem do post
   - Texto original

4. **Você vê no backoffice:**
   - 🔔 Alerta piscando
   - Card amarelo "PRECISA PROCESSAR COM IA"

5. **Você processa:**
   - Clica "Processar com IA"
   - IA reescreve texto
   - Adiciona crédito: "Animação por Azimut"

6. **Você aprova:**
   - Clica "Aprovar e Criar Post"
   - Post criado no blog
   - Link para post original do Instagram

---

## 🚀 Próximos Passos

### **Opção A: Configurar API (Recomendado para produção)**

1. Criar Instagram Business Account
2. Criar Facebook App
3. Obter Access Token
4. Adicionar no `.env`
5. Sistema busca automaticamente

### **Opção B: Busca Manual (Para começar)**

1. Você copia URLs de posts interessantes
2. Cola no backoffice
3. Sistema processa com IA
4. Você aprova

### **Opção C: Web Scraping (Alternativa)**

1. Implemento busca por hashtag no site público
2. Sistema busca automaticamente
3. Mais simples, mas menos confiável

---

## ❓ Qual você prefere?

1. **Configurar Instagram Graph API agora?** (Precisa de conta Business)
2. **Implementar busca manual primeiro?** (Mais rápido)
3. **Implementar web scraping?** (Alternativa sem API)

**Me diga qual opção você prefere e eu implemento!**
