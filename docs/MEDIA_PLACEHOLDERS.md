# 🖼️ Guia de Áreas de Mídia - Placeholders para Backoffice

## 📍 Onde estão as áreas preparadas para imagens/vídeos

### ✅ **Home Page** (`src/pages/Home.tsx`)

#### 1. **Featured Project Hero** (Linha ~135)
```tsx
{/* TODO: Substituir por {contentModel.cases[0].mediaPoster || contentModel.cases[0].mediaLoop} */}
```
- **Tipo**: Imagem (16:9) ou Vídeo loop
- **Tamanho sugerido**: 1920x1080px (Full HD)
- **Formato**: WebP/AVIF (imagem) ou MP4/WebM (vídeo)
- **Campo do backoffice**: `cases[0].mediaPoster` ou `cases[0].mediaLoop`
- **Visual atual**: Gradiente com ícone de play animado

---

### ✅ **Work Page** (`src/pages/Work.tsx`)

#### 1. **Featured Project (Destaque)** (Linha ~54)
```tsx
{/* TODO: <img src={cases[0].mediaPoster} /> ou <video src={cases[0].mediaLoop} /> */}
```
- **Tipo**: Imagem ou Vídeo loop
- **Tamanho**: 960x540px (aspect 16:9)
- **Campo do backoffice**: `cases[0].mediaPoster` ou `cases[0].mediaLoop`
- **Visual atual**: Gradiente vermelho com ícone de imagem + badge "Ativo"

#### 2. **Project Grid Cards** (Linha ~116)
```tsx
{/* TODO: <img src={item.mediaPoster} className="w-full h-full object-cover" /> */}
```
- **Tipo**: Imagem de capa
- **Tamanho**: 640x360px (aspect 16:9)
- **Campo do backoffice**: `item.mediaPoster`
- **Quantidade**: Todos os cases (menos o primeiro)
- **Visual atual**: Gradiente com ícone de imagem + nome da categoria

---

## 🎨 Padrão de Implementação

### **Quando o campo tiver imagem:**
```tsx
{item.mediaPoster ? (
  <img 
    src={item.mediaPoster} 
    alt={locale(item.title)}
    className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105"
  />
) : (
  // Placeholder atual (gradiente + ícone)
)}
```

### **Quando o campo tiver vídeo:**
```tsx
{item.mediaLoop ? (
  <video 
    src={item.mediaLoop}
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 h-full w-full object-cover"
  />
) : item.mediaPoster ? (
  <img src={item.mediaPoster} ... />
) : (
  // Placeholder
)}
```

---

## 📦 Estrutura de Campos no Backoffice

### **Case/Project Model**
```typescript
{
  slug: string
  title: { pt, en, es, fr }
  shortDescription: { pt, en, es, fr }
  
  // CAMPOS DE MÍDIA:
  mediaPoster: string        // URL da imagem de capa (JPEG/WebP/AVIF)
  mediaLoop: string          // URL do vídeo loop (MP4/WebM)
  mediaGallery: string[]     // Array de URLs para galeria (futuro)
  
  // Metadata opcional:
  mediaAlt: { pt, en, es, fr }  // Texto alternativo para acessibilidade
  mediaCredit: string           // Crédito do fotógrafo/videomaker
}
```

---

## 🎬 Especificações Técnicas

### **Imagens**
| Uso | Tamanho | Formato | Peso Max |
|-----|---------|---------|----------|
| Featured Hero | 1920x1080 | WebP/AVIF | 200KB |
| Project Card | 640x360 | WebP/AVIF | 80KB |
| Thumbnail | 320x180 | WebP | 30KB |

### **Vídeos**
| Uso | Resolução | Formato | Duração | Peso Max |
|-----|-----------|---------|---------|----------|
| Hero Loop | 1920x1080 | MP4 (H.264) | 10-20s | 2MB |
| Card Loop | 1280x720 | MP4 (H.264) | 5-10s | 800KB |

### **Otimização**
- **Imagens**: Comprimir com TinyPNG/Squoosh
- **Vídeos**: 
  - Bitrate: 1-2 Mbps
  - Frame rate: 24-30fps
  - Codec: H.264 (compatibilidade) ou H.265 (melhor compressão)
  - Sem áudio (videos de loop)

---

## 🔄 Exemplo de Integração Completa

### **1. No Backoffice (CMS)**
Upload da mídia → Gera URL → Salva no campo `mediaPoster`

### **2. Na API**
```json
GET /api/cases?lang=pt
{
  "cases": [
    {
      "slug": "rio-olympic-museum",
      "title": { "pt": "Rio Museu Olímpico", ... },
      "mediaPoster": "https://cdn.azimut.com/cases/rio-olympic-museum-hero.webp",
      "mediaLoop": "https://cdn.azimut.com/cases/rio-olympic-museum-loop.mp4"
    }
  ]
}
```

### **3. No Frontend**
```tsx
// src/pages/Work.tsx
const cases = await fetch('/api/cases?lang=pt').then(r => r.json())

// Renderizar:
{cases[0].mediaLoop ? (
  <video src={cases[0].mediaLoop} autoPlay loop muted playsInline />
) : cases[0].mediaPoster ? (
  <img src={cases[0].mediaPoster} alt={cases[0].title.pt} />
) : (
  <PlaceholderGradient /> // Fallback visual
)}
```

---

## 🎯 Checklist de Implementação

- [ ] Definir campos `mediaPoster` e `mediaLoop` no CMS
- [ ] Configurar upload de imagens/vídeos no backoffice
- [ ] Configurar CDN (Cloudflare/Vercel) para servir mídia
- [ ] Otimizar imagens existentes (WebP/AVIF)
- [ ] Otimizar vídeos existentes (compressão, bitrate)
- [ ] Substituir placeholders em `Home.tsx`
- [ ] Substituir placeholders em `Work.tsx`
- [ ] Adicionar lazy loading para imagens
- [ ] Adicionar preload para hero images
- [ ] Testar em mobile/tablet/desktop

---

## 🚀 Próximos Passos

### **Fase 1: Preparar Mídia**
1. Selecionar imagens/vídeos dos projetos
2. Otimizar e converter para formatos modernos
3. Fazer upload no CMS

### **Fase 2: Conectar ao Frontend**
1. Atualizar `src/data/content.ts` com URLs das mídias
2. Testar renderização local
3. Conectar API quando backend estiver pronto

### **Fase 3: Melhorias Avançadas**
- [ ] Lazy loading de imagens (Intersection Observer)
- [ ] Blur placeholder (LQIP - Low Quality Image Placeholder)
- [ ] Galeria de imagens (lightbox)
- [ ] Video player customizado
- [ ] Thumbnails geradas automaticamente

---

## 📞 Contato

Para dúvidas sobre implementação de mídia: contato@azimutimmersive.com

**Última atualização**: Dezembro 2025




























