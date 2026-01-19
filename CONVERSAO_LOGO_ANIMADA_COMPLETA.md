# 🎬 **CONVERSÃO LOGO ANIMADA - INSTRUÇÕES COMPLETAS**

## ✅ **STATUS ATUAL:**

- ✅ Arquivo original: `public/logo_animada_glow.mov` (existe!)
- ✅ Componente: `src/components/AnimatedLogo.tsx` (pronto!)
- ✅ Já está na Home: Desktop (split-screen) + Mobile (watermark)
- ❌ Falta: Converter `.mov` para `.webm` e `.mp4`

---

## **🔧 COMO CONVERTER (Windows):**

### **Opção 1: ffmpeg (Recomendado)**

**1. Instalar ffmpeg:**
- Download: https://www.gyan.dev/ffmpeg/builds/
- Extrair e adicionar ao PATH

**2. Abrir PowerShell na pasta do projeto:**
```powershell
cd "C:\Users\ranz\Documents\azimut-site-vite-tailwind\public"
```

**3. Converter para WebM (melhor compressão):**
```powershell
ffmpeg -i logo_animada_glow.mov -c:v libvpx-vp9 -b:v 1M -c:a libopus -b:a 128k logo_animada_glow.webm
```

**4. Converter para MP4 (compatibilidade universal):**
```powershell
ffmpeg -i logo_animada_glow.mov -c:v libx264 -preset slow -crf 22 -c:a aac -b:a 128k logo_animada_glow.mp4
```

---

### **Opção 2: Handbrake (Interface Gráfica)**

1. Download: https://handbrake.fr/downloads.php
2. Abrir `logo_animada_glow.mov`
3. **Para MP4:**
   - Preset: "Fast 1080p30"
   - Format: MP4
   - Save as: `logo_animada_glow.mp4`
4. **Para WebM:**
   - Preset: "VP9 MKV 1080p30"
   - Format: WebM (MKV)
   - Save as: `logo_animada_glow.webm`

---

### **Opção 3: CloudConvert (Online)**

1. https://cloudconvert.com/mov-to-mp4
2. Upload `logo_animada_glow.mov`
3. Convert to: **MP4** (primeiro)
4. Download
5. Repetir para **WebM**
6. Colocar ambos na pasta `public/`

---

## **📁 RESULTADO FINAL:**

Depois da conversão, você terá:

```
public/
├── logo_animada_glow.mov   (original - 🔴 maior)
├── logo_animada_glow.mp4   (universal - ✅ bom)
├── logo_animada_glow.webm  (menor - ✅ melhor)
└── logo-azimut-star.svg    (fallback estático)
```

---

## **🎨 COMO ESTÁ NA HOME AGORA:**

### **Desktop (lg+):**
```tsx
<div className="lg:w-2/5">
  <div className="w-full max-w-[500px] aspect-square">
    <AnimatedLogo /> {/* Logo grande, destaque à direita */}
  </div>
</div>
```

### **Mobile:**
```tsx
<div className="lg:hidden absolute inset-0 opacity-25">
  <div className="w-[200px] h-[200px]">
    <AnimatedLogo /> {/* Logo watermark no fundo */}
  </div>
</div>
```

---

## **⚙️ COMO FUNCIONA:**

O componente `AnimatedLogo` já está configurado para usar os 3 formatos:

```tsx
<video autoPlay loop muted playsInline>
  <source src="/logo_animada_glow.webm" type="video/webm" />  ← Tenta primeiro
  <source src="/logo_animada_glow.mp4" type="video/mp4" />    ← Fallback 1
  <source src="/logo_animada_glow.mov" type="video/quicktime" /> ← Fallback 2
  <img src="/logo-azimut-star.svg" alt="Fallback" />          ← Fallback final
</video>
```

**Ordem de prioridade:**
1. **WebM** (Chrome, Firefox, Edge) - menor tamanho
2. **MP4** (Safari, navegadores antigos) - universal
3. **MOV** (QuickTime) - apenas se nada funcionar
4. **SVG** (imagem estática) - último recurso

---

## **✨ EFEITOS APLICADOS:**

```css
.animated-logo-video {
  /* Luma key: preto vira transparente */
  mix-blend-mode: screen;
  
  /* Glow vermelho Azimut */
  filter: 
    drop-shadow(0 0 30px rgba(201, 35, 55, 0.6)) 
    drop-shadow(0 0 60px rgba(201, 35, 55, 0.3));
  
  opacity: 0.9;
}
```

**Resultado:**
- Fundo preto do vídeo fica transparente ✨
- Logo ganha glow vermelho (cor Azimut #c92337)
- Levemente translúcida (0.9) para blend com fundo

---

## **🚀 DEPOIS DE CONVERTER:**

1. Coloque os arquivos `.mp4` e `.webm` na pasta `public/`
2. O site já vai usar automaticamente!
3. Teste no navegador:
   - Chrome/Edge → vai usar `.webm`
   - Safari → vai usar `.mp4`
   - Se nada funcionar → usa `.mov` atual

---

## **📊 TAMANHOS ESPERADOS:**

| Formato | Tamanho aprox. | Qualidade | Compatibilidade |
|---------|----------------|-----------|------------------|
| MOV (original) | ~10-50 MB | Máxima | QuickTime apenas |
| WebM | ~1-3 MB | Ótima | Chrome, Firefox, Edge |
| MP4 | ~2-5 MB | Ótima | Universal (Safari, mobile) |

---

## **🎯 RECOMENDAÇÃO:**

**Se o .mov estiver muito grande:**
- Converter para WebM + MP4
- Remover o .mov da pasta `public/` (economiza espaço)
- Manter apenas WebM + MP4 + SVG fallback

**Se o .mov for pequeno (<5MB):**
- Deixar todos os formatos
- Navegadores vão escolher o melhor automaticamente

---

## **❓ PRECISA DE AJUDA?**

Se tiver dúvida em algum passo, me avise! Posso:
- Criar um script PowerShell automatizado
- Detalhar mais qualquer etapa
- Ajustar tamanhos/qualidade se necessário

---

**Documentação:** `CONVERSAO_LOGO_ANIMADA_COMPLETA.md`  
**Data:** 06 Janeiro 2026  
**Status:** ✅ Instruções completas | ⏳ Aguardando conversão

