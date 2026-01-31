# 📸 GUIA: ADICIONAR IMAGENS/VÍDEOS REAIS DOS PROJETOS

## 🎯 Objetivo
Substituir as imagens temporárias do Unsplash pelas imagens/vídeos reais dos projetos publicados no YouTube, Instagram, Vimeo, etc.

---

## 📝 ONDE ENCONTRAR AS IMAGENS

### 1️⃣ **YouTube**
- Acesse o canal da Ydreams/Azimut
- Encontre o vídeo do projeto
- Copie o ID do vídeo (ex: `https://youtube.com/watch?v=ABC123` → ID é `ABC123`)
- Use: `https://img.youtube.com/vi/ABC123/maxresdefault.jpg`

**Qualidades disponíveis:**
- `maxresdefault.jpg` - 1280x720 (melhor!)
- `sddefault.jpg` - 640x480
- `hqdefault.jpg` - 480x360

### 2️⃣ **Instagram**
- Acesse o post do projeto
- Clique com **botão direito** na imagem
- Selecione **"Copiar endereço da imagem"**
- Cole no script

### 3️⃣ **Vimeo**
- Acesse o vídeo no Vimeo
- Clique com botão direito → "Inspecionar elemento"
- Procure por `<meta property="og:image">`
- Copie a URL da thumbnail

### 4️⃣ **Facebook/LinkedIn**
- Similar ao Instagram
- Botão direito → Copiar endereço da imagem

### 5️⃣ **Site próprio**
- Se tiver imagens hospedadas no site da Ydreams
- Copie a URL direta da imagem

---

## 🚀 COMO USAR

### **Passo 1: Editar o arquivo**
Abra o arquivo: `azimut-cms/migrations/atualizar-com-midias-reais.js`

### **Passo 2: Substituir URLs**
Encontre cada projeto e substitua a URL:

```javascript
'instalacao-imersiva': {
  // ANTES (Unsplash):
  url: 'https://images.unsplash.com/photo-1558618666...',
  
  // DEPOIS (sua imagem real):
  url: 'https://img.youtube.com/vi/SEU_VIDEO_ID/maxresdefault.jpg',
  // OU
  url: 'https://scontent.cdninstagram.com/v/t51.../sua_foto.jpg',
  
  alt: 'Instalação Imersiva - Experiência Visual Interativa'
},
```

### **Passo 3: Executar**
```bash
cd azimut-cms
node migrations/atualizar-com-midias-reais.js
```

---

## 📋 LISTA DE PROJETOS PARA ATUALIZAR

### ✅ Já tem imagem própria:
- [x] Natal de Rio Bonito 2025

### 🎨 Com imagem Unsplash (precisa substituir):
- [ ] Instalação Imersiva
- [ ] Exposição Digital
- [ ] Filme VR 360°
- [ ] Projeto First Nation (DeepLab/IXLabs)
- [ ] VR Amazônia (Rio Madeira / Círio)
- [ ] Senna (Tower/Interlagos)
- [ ] Van Gogh / La Fontaine
- [ ] Natal Cultural (IA + animação)
- [ ] Gramado VR/IA
- [ ] Museu Rio Olímpico

---

## 💡 DICAS

### ✅ **URLs que funcionam bem:**
- YouTube thumbnails (img.youtube.com)
- Unsplash (images.unsplash.com)
- Pexels (images.pexels.com)
- Imgur (i.imgur.com)
- CDNs de redes sociais (Instagram, Facebook)

### ❌ **URLs que podem dar problema:**
- URLs com autenticação/login necessário
- URLs temporárias (expiram)
- URLs privadas (não públicas)

### 🔒 **Verificar se a URL funciona:**
1. Cole a URL no navegador
2. Se abrir a imagem → ✅ Funciona!
3. Se pedir login/erro → ❌ Não funciona

---

## 🎬 EXEMPLO COMPLETO: YouTube

**Vídeo:** `https://www.youtube.com/watch?v=dQw4w9WgXcQ`

**Thumbnail máxima qualidade:**
```
https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg
```

**No script:**
```javascript
'meu-projeto': {
  url: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
  alt: 'Meu Projeto Incrível'
},
```

---

## 📸 EXEMPLO COMPLETO: Instagram

**Post:** `https://www.instagram.com/p/ABC123/`

**Passos:**
1. Abrir o post
2. Botão direito na imagem
3. "Copiar endereço da imagem"
4. Resultado: `https://scontent.cdninstagram.com/v/t51.../foto.jpg`

**No script:**
```javascript
'meu-projeto': {
  url: 'https://scontent.cdninstagram.com/v/t51.../foto.jpg',
  alt: 'Meu Projeto Incrível'
},
```

---

## ✅ VERIFICAR RESULTADO

Após executar o script:

```bash
# Testar o site
cd ..
npm run dev
```

Abrir: http://localhost:5173

- Home → Ver projetos em destaque
- Projetos → Ver todos os cards
- Verificar se imagens aparecem corretamente

---

## 🆘 PROBLEMAS COMUNS

### 1. **Imagem não aparece**
- Verificar se URL está correta (testar no navegador)
- Verificar se URL é pública (não pede login)

### 2. **Erro CORS**
- Algumas CDNs bloqueiam acesso externo
- Solução: Fazer upload no backoffice ou usar outra fonte

### 3. **Imagem de baixa qualidade**
- YouTube: usar `/maxresdefault.jpg` (melhor qualidade)
- Instagram: pegar a imagem original (não thumbnail)

---

## 📞 PRÓXIMOS PASSOS

1. ✅ Editar `atualizar-com-midias-reais.js`
2. ✅ Colar URLs das imagens reais
3. ✅ Executar: `node migrations/atualizar-com-midias-reais.js`
4. ✅ Testar no navegador
5. ✅ Fazer deploy!

---

**🎉 Com imagens reais, o site ficará muito mais profissional!**

