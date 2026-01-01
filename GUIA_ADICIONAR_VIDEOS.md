# 🎬 GUIA: ADICIONAR VÍDEOS AOS PROJETOS

## 🎯 Objetivo
Adicionar vídeos do YouTube ou Vimeo aos projetos do backoffice.

---

## 📝 COMO USAR

### **Passo 1: Coletar URLs dos Vídeos**

#### **YouTube:**
- Acesse o vídeo no YouTube
- Copie a URL completa:
  - `https://www.youtube.com/watch?v=VIDEO_ID`
  - `https://youtu.be/VIDEO_ID`
  - `https://www.youtube.com/embed/VIDEO_ID`

#### **Vimeo:**
- Acesse o vídeo no Vimeo
- Copie a URL completa:
  - `https://vimeo.com/VIDEO_ID`
  - `https://player.vimeo.com/video/VIDEO_ID`

---

### **Passo 2: Editar o Script**

Abrir: `azimut-cms/migrations/adicionar-videos-projetos.js`

Encontrar o projeto e colar a URL:

```javascript
'instalacao-imersiva': {
  // Cole aqui a URL do vídeo ↓
  videoUrl: 'https://www.youtube.com/watch?v=ABC123XYZ',
  alt: 'Vídeo da Instalação Imersiva'
},
```

---

### **Passo 3: Executar**

```bash
cd azimut-cms
node migrations/adicionar-videos-projetos.js
```

---

## ✅ O QUE O SCRIPT FAZ

1. **Extrai ID do vídeo** automaticamente (YouTube ou Vimeo)
2. **Gera thumbnail** automaticamente:
   - YouTube: `https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg`
   - Vimeo: `https://vumbnail.com/VIDEO_ID.jpg`
3. **Cria registro Media** tipo `VIDEO` no banco
4. **Associa ao projeto** como `heroImage`
5. **Substitui imagem** se já existir (opcional)

---

## 🎬 COMO FUNCIONA NO SITE

### **Quando há vídeo:**
- ✅ Mostra **thumbnail** do vídeo
- ✅ Botão **Play** no centro
- ✅ Ao clicar, abre **player** do YouTube/Vimeo
- ✅ Badge da plataforma (YouTube/Vimeo)

### **Quando não há vídeo:**
- ✅ Mostra **imagem** (se houver)
- ✅ Ou **placeholder** visual

---

## 📋 LISTA DE PROJETOS

### **Para adicionar vídeos:**
- [ ] Instalação Imersiva
- [ ] Exposição Digital
- [ ] Filme VR 360°
- [ ] First Nation (DeepLab/IXLabs)
- [ ] VR Amazônia
- [ ] Senna (Tower/Interlagos)
- [ ] Van Gogh / La Fontaine
- [ ] Natal Cultural
- [ ] Gramado VR/IA
- [ ] Museu Rio Olímpico

---

## 💡 DICAS

### ✅ **URLs que funcionam:**
- YouTube: `https://www.youtube.com/watch?v=VIDEO_ID`
- YouTube: `https://youtu.be/VIDEO_ID`
- Vimeo: `https://vimeo.com/VIDEO_ID`

### ❌ **URLs que NÃO funcionam:**
- URLs privadas (não públicas)
- URLs com autenticação
- URLs de outros serviços (não YouTube/Vimeo)

### 🔒 **Verificar se o vídeo é público:**
1. Abra a URL no navegador em modo anônimo
2. Se o vídeo aparecer → ✅ Funciona!
3. Se pedir login → ❌ Não funciona

---

## 🎯 EXEMPLO COMPLETO

### **YouTube:**
```javascript
'instalacao-imersiva': {
  videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  alt: 'Vídeo da Instalação Imersiva'
},
```

### **Vimeo:**
```javascript
'vr-amazonia': {
  videoUrl: 'https://vimeo.com/123456789',
  alt: 'Vídeo VR Amazônia'
},
```

---

## 🚀 PRÓXIMOS PASSOS

1. ✅ Coletar URLs dos vídeos
2. ✅ Editar `adicionar-videos-projetos.js`
3. ✅ Executar o script
4. ✅ Testar no site
5. ✅ Verificar se vídeos aparecem corretamente

---

## 🆘 PROBLEMAS COMUNS

### **1. Vídeo não aparece**
- Verificar se URL está correta
- Verificar se vídeo é público
- Verificar console (F12) → Ver erros

### **2. Thumbnail não carrega**
- YouTube/Vimeo pode estar bloqueado
- Verificar se URL do thumbnail está correta
- Placeholder será mostrado automaticamente

### **3. Player não abre**
- Verificar se JavaScript está habilitado
- Verificar se não há bloqueador de anúncios
- Verificar console (F12) → Ver erros

---

## ✅ RESULTADO ESPERADO

**No site:**
- ✅ Thumbnail do vídeo aparece
- ✅ Botão Play no centro
- ✅ Ao clicar, player abre
- ✅ Vídeo reproduz corretamente

**No backoffice:**
- ✅ Projeto mostra tipo "VIDEO"
- ✅ URL do vídeo salva
- ✅ Thumbnail gerada automaticamente

---

**🎉 Com vídeos, os projetos ficam muito mais envolventes!**

