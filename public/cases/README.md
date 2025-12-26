# 📁 Pasta de Mídia dos Projetos

## 📸 Como adicionar imagens/vídeos

### **1. Preparar as imagens:**

- **Tamanho recomendado para Hero (Home/Work featured):**
  - 1920x1080px (16:9)
  - Formato: WebP ou JPEG otimizado
  - Peso: máximo 200KB

- **Tamanho recomendado para Cards (grid de projetos):**
  - 640x360px (16:9)
  - Formato: WebP ou JPEG otimizado
  - Peso: máximo 80KB

### **2. Nomear os arquivos:**

Use o padrão: `{slug-do-projeto}-{tipo}.{extensão}`

Exemplos:
- `rio-olympic-hero.webp` (imagem principal do Rio Olympic Museum)
- `rio-olympic-loop.mp4` (vídeo loop do Rio Olympic Museum)
- `gramado-vr-hero.webp`
- `natal-rio-bonito-hero.webp`

### **3. Colocar os arquivos aqui:**

```
public/cases/
  ├── rio-olympic-hero.webp
  ├── rio-olympic-loop.mp4
  ├── gramado-vr-hero.webp
  ├── natal-rio-bonito-hero.webp
  └── ...
```

### **4. Atualizar `src/data/content.ts`:**

Descomente e adicione os caminhos:

```typescript
{
  slug: 'museu-rio-olimpico',
  // ... outros campos ...
  mediaPoster: '/cases/rio-olympic-hero.webp',  // ← Descomentar
  mediaLoop: '/cases/rio-olympic-loop.mp4',     // ← Descomentar (opcional)
}
```

### **5. Testar:**

- Rode `npm run dev`
- Navegue para Home e Work
- As imagens devem aparecer automaticamente!

---

## 🎬 Para vídeos:

- **Formato:** MP4 (H.264) ou WebM
- **Duração:** 5-20 segundos (loops curtos)
- **Sem áudio:** Mute o vídeo antes de exportar
- **Resolução:** 1920x1080 (hero) ou 1280x720 (cards)
- **Peso:** máximo 2MB (hero) ou 800KB (cards)

---

## 🖼️ Ferramentas recomendadas:

- **Otimizar imagens:** https://squoosh.app/
- **Comprimir vídeos:** HandBrake ou FFmpeg
- **Imagens gratuitas:** Unsplash, Pexels
- **Vídeos gratuitos:** Pexels Videos, Pixabay

---

## ✅ Checklist:

- [ ] Imagem otimizada (WebP/JPEG)
- [ ] Tamanho correto (1920x1080 ou 640x360)
- [ ] Peso dentro do limite
- [ ] Nome do arquivo segue padrão
- [ ] Arquivo colocado em `public/cases/`
- [ ] Campo `mediaPoster` atualizado no `content.ts`
- [ ] Testado no navegador

---

**Última atualização:** Dezembro 2025
























