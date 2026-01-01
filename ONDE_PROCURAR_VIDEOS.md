# 🔍 ONDE PROCURAR VÍDEOS DOS PROJETOS

## 🎯 Objetivo
Encontrar vídeos reais dos projetos da Ydreams/Azimut para adicionar ao backoffice.

---

## 📺 PLATAFORMAS PRINCIPAIS

### **1. YouTube** 🎬

#### **Canais para verificar:**
- Canal oficial da Ydreams
- Canal da Azimut
- Canais de parceiros/clientes

#### **Como buscar:**
1. Acesse: https://www.youtube.com
2. Busque por:
   - "Ydreams [nome do projeto]"
   - "Azimut [nome do projeto]"
   - "First Nation DeepLab"
   - "VR Amazônia Ydreams"
   - "Museu Rio Olímpico instalação"
   - "Festival Gramado VR"

#### **Exemplo de URL:**
```
https://www.youtube.com/watch?v=VIDEO_ID
```

---

### **2. Vimeo** 🎥

#### **Como buscar:**
1. Acesse: https://vimeo.com
2. Busque por:
   - "Ydreams"
   - "Azimut"
   - Nome do projeto específico

#### **Exemplo de URL:**
```
https://vimeo.com/VIDEO_ID
```

---

## 🌐 SITES DE CLIENTES/PARCEIROS

### **Museu Rio Olímpico**
- Site oficial do museu
- Seção de vídeos/exposições
- YouTube do museu

### **Festival de Gramado**
- Site do festival
- Canal do YouTube do festival
- Vídeos de edições anteriores

### **Exposições (Van Gogh, La Fontaine)**
- Sites das exposições
- Canais oficiais
- Redes sociais das exposições

---

## 📱 REDES SOCIAIS

### **Instagram** 📸
- Perfil oficial da Ydreams/Azimut
- Stories com vídeos dos projetos
- Posts com vídeos
- IGTV/Reels

**Como copiar:**
- Vídeos do Instagram podem ser salvos e enviados para YouTube/Vimeo
- Ou usar links diretos se disponíveis

### **LinkedIn** 💼
- Página da empresa
- Posts sobre projetos
- Vídeos incorporados

### **Facebook** 📘
- Página da empresa
- Vídeos dos projetos
- Álbuns de vídeos

---

## 🎯 PROJETOS ESPECÍFICOS

### **1. First Nation (DeepLab/IXLabs)**
- Buscar: "First Nation DeepLab"
- Buscar: "IXLabs First Nation"
- Site do DeepLab
- Site do IXLabs

### **2. VR Amazônia**
- Buscar: "VR Amazônia Rio Madeira"
- Buscar: "Círio VR Ydreams"
- Sites relacionados ao Círio

### **3. Senna (Tower/Interlagos)**
- Buscar: "Senna Tower Interlagos"
- Site da Tower
- Eventos relacionados

### **4. Natal Cultural**
- Buscar: "Natal Cultural IA animação"
- Sites de eventos natalinos
- Canais de cultura

---

## 💡 DICAS DE BUSCA

### **Termos de busca eficazes:**
- `"Ydreams" + "nome do projeto"`
- `"Azimut" + "nome do projeto"`
- `"instalação imersiva" + "Ydreams"`
- `"VR 360" + "Ydreams"`
- `"realidade virtual" + "projeto"`

### **Filtros no YouTube:**
- Filtrar por: "Vídeos"
- Filtrar por: "Canal" (se souber o canal)
- Filtrar por: "Data" (mais recentes primeiro)

---

## 📋 CHECKLIST DE BUSCA

Para cada projeto, verificar:

- [ ] YouTube (canal oficial)
- [ ] YouTube (busca geral)
- [ ] Vimeo (portfolio)
- [ ] Site do cliente/parceiro
- [ ] Instagram (stories/posts)
- [ ] LinkedIn (posts)
- [ ] Facebook (vídeos)
- [ ] Sites de eventos/festivais

---

## 🎬 COMO ADICIONAR AO BACKOFFICE

### **Passo 1: Encontrar o vídeo**
- Use os lugares acima
- Copie a URL completa

### **Passo 2: Editar script**
- Abrir: `azimut-cms/migrations/popular-videos-reais.js`
- Colar URL no projeto correspondente

### **Passo 3: Executar**
```bash
cd azimut-cms
node migrations/popular-videos-reais.js
```

---

## ✅ EXEMPLO PRÁTICO

### **Encontrei um vídeo no YouTube:**
```
URL: https://www.youtube.com/watch?v=dQw4w9WgXcQ
Projeto: Instalação Imersiva
```

### **No script:**
```javascript
'instalacao-imersiva': {
  videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  alt: 'Vídeo da Instalação Imersiva'
},
```

### **Executar:**
```bash
node migrations/popular-videos-reais.js
```

### **Resultado:**
- ✅ Vídeo adicionado ao backoffice
- ✅ Thumbnail gerada automaticamente
- ✅ Aparece no site com player

---

## 🆘 SE NÃO ENCONTRAR

### **Opções:**
1. **Usar imagens por enquanto**
   - Imagens Unsplash já estão funcionando
   - Vídeos podem ser adicionados depois

2. **Criar vídeos de demonstração**
   - Slideshow de imagens
   - Vídeo simples explicativo

3. **Contatar equipe**
   - Verificar se há vídeos internos
   - Verificar se há material não publicado

---

## 📊 STATUS ATUAL

| Projeto | Vídeo | Status |
|---------|-------|--------|
| Instalação Imersiva | ⬜ | Buscar |
| Exposição Digital | ⬜ | Buscar |
| Filme VR 360° | ⬜ | Buscar |
| First Nation | ⬜ | Buscar |
| VR Amazônia | ⬜ | Buscar |
| Senna | ⬜ | Buscar |
| Van Gogh/La Fontaine | ⬜ | Buscar |
| Natal Cultural | ⬜ | Buscar |
| Gramado VR/IA | ⬜ | Buscar |
| Museu Rio Olímpico | ⬜ | Buscar |

---

**🎯 Use este guia para encontrar os vídeos e depois execute o script!**

