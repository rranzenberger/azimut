# 📸 Como Funciona o Monitoramento do Instagram

## 🎯 Resposta Rápida

### **Como deve funcionar:**

1. **Você define projetos para monitorar** no backoffice
2. **Sistema busca automaticamente** posts que mencionam:
   - Hashtags relacionadas (ex: `#RioMuseuOlimpico`, `#Azimut`)
   - Menções da conta da Azimut (ex: `@azimut_brasil`)
   - Palavras-chave dos projetos
3. **Sistema puxa os posts** e cria sugestões
4. **Você aprova/edita** e publica no blog

---

## 🔧 Opções de Implementação

### **Opção 1: Instagram Graph API (Oficial - Recomendado)**

**Requisitos:**
- ✅ Conta Instagram **Business** (não pessoal)
- ✅ Conta da Azimut (ex: `@azimut_brasil`)
- ✅ Facebook App criado e aprovado
- ✅ Access Token configurado

**Como funciona:**
- Sistema busca posts públicos da conta Business
- Busca por hashtags e menções
- Retorna posts, imagens, textos, datas

**Vantagens:**
- ✅ Oficial e confiável
- ✅ Não quebra facilmente
- ✅ Dados completos

**Desvantagens:**
- ❌ Requer conta Business (não pessoal)
- ❌ Processo de aprovação do Facebook
- ❌ Configuração mais complexa

---

### **Opção 2: Busca Manual (Mais Simples - Para Começar)**

**Como funciona:**
- Você encontra um post interessante no Instagram
- Copia a URL do post
- Cola no backoffice
- Sistema extrai conteúdo e processa com IA

**Vantagens:**
- ✅ Funciona imediatamente
- ✅ Não precisa de API
- ✅ Você controla o que monitora

**Desvantagens:**
- ❌ Não é automático
- ❌ Você precisa encontrar os posts

---

### **Opção 3: Web Scraping (Alternativa)**

**Como funciona:**
- Sistema acessa `instagram.com/explore/tags/azimut`
- Extrai posts públicos da página
- Salva como sugestões

**Vantagens:**
- ✅ Automático
- ✅ Não precisa de API
- ✅ Funciona com qualquer hashtag pública

**Desvantagens:**
- ❌ Pode quebrar se Instagram mudar layout
- ❌ Pode ser bloqueado (rate limiting)
- ❌ Menos confiável

---

## 💡 Recomendação

### **Para Começar AGORA (Mais Simples):**

1. **Busca Manual:**
   - Você copia URLs de posts interessantes
   - Cola no backoffice
   - Sistema processa com IA
   - Você aprova

2. **Depois, configurar API:**
   - Quando tiver conta Business
   - Configurar Instagram Graph API
   - Sistema busca automaticamente

---

## 🚀 O que vou implementar AGORA

Vou criar **2 opções**:

1. **Busca Manual por URL** (funciona imediatamente)
2. **Estrutura para Instagram Graph API** (para configurar depois)

Assim você pode usar manualmente agora e automatizar depois!

---

## 📋 Configuração Futura (Instagram Graph API)

### **Passo 1: Criar Conta Business**

1. Abra o Instagram no celular
2. Vá em Configurações → Conta
3. Mude para **"Conta Comercial"**
4. Conecte com uma Página do Facebook

### **Passo 2: Criar Facebook App**

1. Acesse: https://developers.facebook.com/
2. Crie um App tipo "Business"
3. Adicione produto "Instagram Graph API"
4. Gere Access Token

### **Passo 3: Configurar no Backoffice**

Adicione no `.env`:

```env
INSTAGRAM_ACCESS_TOKEN=seu_token_aqui
INSTAGRAM_BUSINESS_ACCOUNT_ID=seu_id_aqui
```

---

## ❓ Qual você prefere?

**A) Implementar busca manual AGORA** (você cola URLs)
**B) Implementar web scraping** (busca automática por hashtag)
**C) Preparar para Instagram Graph API** (você configura depois)

**Ou posso fazer os 3!** 🚀
