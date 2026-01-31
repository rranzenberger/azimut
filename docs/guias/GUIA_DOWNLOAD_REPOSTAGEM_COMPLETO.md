# 📥🎬 Sistema Completo: Download e Repostagem Automática

## ✅ O que foi implementado

### **1. Download Automático de Mídias** 📥

#### **Funcionalidades:**
- ✅ Baixa imagens do Instagram
- ✅ Baixa vídeos do Instagram
- ✅ Baixa thumbnails do YouTube
- ✅ Salva no backoffice (tabela `Media`)
- ✅ Associa à sugestão de blog

#### **Como usar:**
1. Vá em `/admin/blog/monitor`
2. Encontre uma sugestão com mídia
3. Clique em **"📥 Baixar Mídia"**
4. Sistema baixa e salva automaticamente
5. Mídia fica disponível no backoffice

---

### **2. Repostagem Automática** 📱

#### **Redes Sociais Suportadas:**
- 📸 **Instagram:** `@azimut.art` (requer Access Token)
- 💼 **LinkedIn:** `company/azimut-art` (requer Access Token)
- 🎥 **YouTube:** `@azimutart` (requer upload completo - não implementado ainda)
- 🎬 **Vimeo:** `azimutart` (requer upload completo - não implementado ainda)

#### **Como usar:**
1. Processe sugestão com IA
2. Clique em **"📱 Repostar nas Redes"**
3. Selecione redes sociais (ex: `instagram,linkedin`)
4. Digite texto personalizado (ou use padrão)
5. Adicione hashtags (opcional)
6. Sistema reposta automaticamente

---

## 🔧 Configuração Necessária

### **Para Instagram:**
```env
INSTAGRAM_ACCESS_TOKEN=seu_token_aqui
INSTAGRAM_BUSINESS_ACCOUNT_ID=seu_id_aqui
```

### **Para LinkedIn:**
```env
LINKEDIN_ACCESS_TOKEN=seu_token_aqui
LINKEDIN_ORGANIZATION_ID=seu_id_aqui
```

---

## 📋 Fluxo Completo

### **Cenário: Cliente posta sobre projeto**

1. **Sistema identifica post:**
   - Post no Instagram mencionando `@azimut.art`
   - Hashtag `#RioMuseuOlimpico`

2. **Você vê no backoffice:**
   - 🔔 Alerta piscando
   - Card amarelo "PRECISA PROCESSAR COM IA"

3. **Você processa:**
   - Clica "🤖 Processar com IA"
   - IA reescreve texto
   - Adiciona crédito: "Animação por Azimut"

4. **Você baixa mídia:**
   - Clica "📥 Baixar Mídia"
   - Sistema baixa imagem/vídeo
   - Salva no backoffice

5. **Você reposta:**
   - Clica "📱 Repostar nas Redes"
   - Seleciona: `instagram,linkedin`
   - Digite texto personalizado
   - Sistema reposta automaticamente

6. **Resultado:**
   - ✅ Post no Instagram da Azimut
   - ✅ Post no LinkedIn da Azimut
   - ✅ Mídia salva no backoffice
   - ✅ Sugestão pronta para criar post no blog

---

## 🎯 Funcionalidades Detalhadas

### **Download de Mídia:**

#### **Instagram:**
- Extrai imagem ou vídeo do post
- Baixa em alta resolução
- Salva como arquivo local
- Cria registro na tabela `Media`

#### **YouTube:**
- Por enquanto, baixa thumbnail em alta resolução
- Para vídeo completo, requer `yt-dlp` (implementar depois)

#### **URL Genérica:**
- Baixa qualquer imagem direta
- Detecta tipo automaticamente

---

### **Repostagem:**

#### **Instagram:**
- Usa Instagram Graph API
- Publica imagem ou vídeo
- Adiciona legenda personalizada
- Inclui hashtags

#### **LinkedIn:**
- Usa LinkedIn API
- Publica como post da empresa
- Adiciona imagem (se houver)
- Inclui texto e hashtags

#### **YouTube/Vimeo:**
- Requer upload completo de vídeo
- Não implementado ainda (muito complexo)
- Pode implementar depois se necessário

---

## ⚙️ Estrutura de Arquivos

### **Serviços:**
- `lib/services/mediaDownloader.ts` - Download de mídias
- `lib/services/socialMediaReposter.ts` - Repostagem

### **APIs:**
- `api/admin/blog/monitor/[id]/download-media` - Baixar mídia
- `api/admin/blog/monitor/[id]/repost` - Repostar

### **Interface:**
- Botões adicionados em `/admin/blog/monitor`
- "📥 Baixar Mídia"
- "📱 Repostar nas Redes"

---

## 🚀 Próximos Passos

### **Para Funcionar Completamente:**

1. **Configurar Access Tokens:**
   - Instagram Business Account
   - LinkedIn Company Page
   - Adicionar no `.env`

2. **Testar Download:**
   - Adicionar URL manualmente
   - Clicar "📥 Baixar Mídia"
   - Verificar se salvou

3. **Testar Repostagem:**
   - Processar com IA
   - Clicar "📱 Repostar nas Redes"
   - Verificar se postou

---

## 📝 Notas Importantes

### **Limitações:**
- YouTube/Vimeo requerem upload completo (não implementado)
- Instagram Stories não suportados (apenas posts)
- Rate limits das APIs podem limitar frequência

### **Recomendações:**
- Sempre revisar texto antes de repostar
- Verificar se mídia baixou corretamente
- Testar com posts pequenos primeiro

---

## ✅ Status

- ✅ Download de mídias implementado
- ✅ Repostagem Instagram implementada
- ✅ Repostagem LinkedIn implementada
- ⏳ YouTube/Vimeo (requer upload completo)
- ⏳ Stories do Instagram (não suportado pela API)

**Sistema pronto para uso! Configure os Access Tokens e teste!** 🚀
