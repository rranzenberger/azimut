# 🎬 INSTRUÇÕES: Converter Logo Animada para Web

## ❌ PROBLEMA ATUAL
- Arquivo: `logo_animada_glow.mov` (10.8 MB)
- Formato `.mov` não é suportado por todos navegadores
- Por isso aparece uma caixa/imagem quebrada no site

## ✅ SOLUÇÃO: Converter para WebM + MP4

### **OPÇÃO 1: Conversão Online (Mais Fácil)**

Use o site **CloudConvert** (gratuito, sem registro):

1. Acesse: https://cloudconvert.com/mov-to-webm
2. Upload do arquivo: `public/logo_animada_glow.mov`
3. Configure:
   - **Output Format:** WebM
   - **Video Codec:** VP9
   - **Audio:** Remove (é só logo, sem som)
   - **Quality:** 80%
   - **Resolution:** Manter original
4. Clique em **"Convert"**
5. Baixe o arquivo: `logo_animada_glow.webm`
6. Salve em: `public/logo_animada_glow.webm`

7. **REPITA** para MP4:
   - Acesse: https://cloudconvert.com/mov-to-mp4
   - **Output Format:** MP4
   - **Video Codec:** H.264
   - **Quality:** 80%
   - Salve em: `public/logo_animada_glow.mp4`

---

### **OPÇÃO 2: ffmpeg (Linha de Comando)**

Se quiser instalar o `ffmpeg` localmente:

#### 1️⃣ **Instalar ffmpeg no Windows:**

```powershell
# Via Chocolatey:
choco install ffmpeg

# Ou baixe manualmente:
# https://www.gyan.dev/ffmpeg/builds/
```

#### 2️⃣ **Converter para WebM:**

```bash
cd public

ffmpeg -i logo_animada_glow.mov \
  -c:v libvpx-vp9 \
  -crf 30 \
  -b:v 0 \
  -an \
  logo_animada_glow.webm
```

#### 3️⃣ **Converter para MP4:**

```bash
ffmpeg -i logo_animada_glow.mov \
  -c:v libx264 \
  -crf 23 \
  -preset slow \
  -an \
  logo_animada_glow.mp4
```

---

## 🔄 DEPOIS DA CONVERSÃO

1. Coloque os arquivos em `public/`:
   - ✅ `logo_animada_glow.webm` (~2-3 MB)
   - ✅ `logo_animada_glow.mp4` (~3-4 MB)
   - ✅ `logo_animada_glow.mov` (manter como fallback)

2. Descomente o código do vídeo em `src/components/AnimatedLogo.tsx`:

```tsx
export const AnimatedLogo: React.FC = () => {
  return (
    <div className="animated-logo-container">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="animated-logo-video"
      >
        <source src="/logo_animada_glow.webm" type="video/webm" />
        <source src="/logo_animada_glow.mp4" type="video/mp4" />
        <source src="/logo_animada_glow.mov" type="video/quicktime" />
        <img src="/logo-azimut-star.svg" alt="Azimut Star" className="animated-logo-video" />
      </video>
      
      <style>{`
        .animated-logo-container {
          pointer-events: none;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .animated-logo-video {
          width: 100%;
          height: 100%;
          object-fit: contain;
          mix-blend-mode: screen;
          filter: 
            drop-shadow(0 0 30px rgba(201, 35, 55, 0.6)) 
            drop-shadow(0 0 60px rgba(201, 35, 55, 0.3));
          opacity: 0.9;
        }
      `}</style>
    </div>
  )
}
```

---

## 🎯 RESULTADO ESPERADO

✅ Logo animada no hero (desktop: grande à direita, mobile: watermark)
✅ Tamanho reduzido: de 10.8 MB para ~3-4 MB
✅ Compatível com todos navegadores
✅ Sem "caixa quebrada" ou erro de imagem

---

**POR ENQUANTO:** Estou usando o SVG estático com animação de pulse para não ter erro visual! 🎨

