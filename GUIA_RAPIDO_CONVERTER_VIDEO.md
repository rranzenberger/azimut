# 🎬 GUIA RÁPIDO: Converter Logo Animada (SEM INSTALAR NADA)

## ✅ O QUE VOCÊ PRECISA FAZER:

### **PASSO 1: Converter para MP4** (Universal - Safari, mobile)

1. Abra: https://cloudconvert.com/mov-to-mp4
2. Clique em **"Select File"**
3. Selecione: `C:\Users\ranz\Documents\azimut-site-vite-tailwind\public\logo_animada_glow.mov`
4. **NÃO MEXA EM NADA** (padrão está ótimo)
5. Clique em **"Convert"**
6. Aguarde (~1-3 minutos)
7. Clique em **"Download"**
8. Salve como: `logo_animada_glow.mp4`
9. Mova para: `C:\Users\ranz\Documents\azimut-site-vite-tailwind\public\`

---

### **PASSO 2: Converter para WebM** (Melhor compressão - Chrome, Firefox)

1. Abra: https://cloudconvert.com/mov-to-webm
2. Clique em **"Select File"**
3. Selecione: `C:\Users\ranz\Documents\azimut-site-vite-tailwind\public\logo_animada_glow.mov`
4. **NÃO MEXA EM NADA** (padrão está ótimo)
5. Clique em **"Convert"**
6. Aguarde (~1-3 minutos)
7. Clique em **"Download"**
8. Salve como: `logo_animada_glow.webm`
9. Mova para: `C:\Users\ranz\Documents\azimut-site-vite-tailwind\public\`

---

## ✅ DEPOIS DE CONVERTER:

### **Você terá 3 arquivos em `public/`:**

```
public/
├── logo_animada_glow.mov   (original - manter como fallback)
├── logo_animada_glow.mp4   (universal - ✅)
├── logo_animada_glow.webm  (melhor - ✅)
```

### **O site já vai funcionar automaticamente!** 🎉

O componente `AnimatedLogo.tsx` já está preparado para usar os 3 formatos:

```tsx
<video autoPlay loop muted playsInline>
  <source src="/logo_animada_glow.webm" type="video/webm" />  ← Chrome/Firefox
  <source src="/logo_animada_glow.mp4" type="video/mp4" />    ← Safari/Mobile
  <source src="/logo_animada_glow.mov" type="video/quicktime" /> ← Fallback
</video>
```

---

## 🎯 RESULTADO ESPERADO:

✅ Logo animada funcionando em **TODOS** os navegadores
✅ Tamanho reduzido (de ~10 MB para ~3-4 MB)
✅ WebM para Chrome/Firefox (melhor compressão)
✅ MP4 para Safari/Mobile (compatibilidade universal)

---

## ⏱️ TEMPO TOTAL: ~5 minutos

1. CloudConvert MP4: ~2 min
2. CloudConvert WebM: ~2 min
3. Mover arquivos: ~30 seg
4. Testar no navegador: ~30 seg

---

**É SÓ ISSO!** Não precisa instalar nada, não precisa linha de comando! 🚀

