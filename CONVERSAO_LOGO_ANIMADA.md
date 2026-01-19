# 🎬 CONVERSÃO DE VÍDEO: Logo Animada Azimut

**Data**: 06 Jan 2026  
**Status**: ⏳ **PENDENTE - Aguardando conversão**

---

## 📊 **SITUAÇÃO ATUAL:**

### **Arquivo Original:**
- `public/logo_animada_glow.mov`
- **Formato**: QuickTime MOV
- **Tamanho**: ~? MB (verificar)
- **Compatibilidade**: ⚠️ Safari/Chrome OK, Firefox/Android ❌

### **Código Atualizado:**
```tsx
// AnimatedLogo.tsx - Suporta múltiplos formatos
<video autoPlay loop muted playsInline>
  <source src="/logo_animada_glow.webm" type="video/webm" />
  <source src="/logo_animada_glow.mp4" type="video/mp4" />
  <source src="/logo_animada_glow.mov" type="video/quicktime" />
  <img src="/logo-azimut-star.svg" alt="Fallback" />
</video>
```

**Ordem de prioridade** (browser escolhe o primeiro compatível):
1. **WebM** (VP9) - Menor tamanho, moderno
2. **MP4** (H.264) - Compatibilidade universal
3. **MOV** - Fallback original
4. **SVG** - Se tudo falhar

---

## 🎯 **COMANDOS DE CONVERSÃO:**

### **Opção 1: ffmpeg (Linha de Comando)**

Se você tiver ffmpeg instalado localmente:

```bash
# Navegar até a pasta public
cd public

# Converter para MP4 (H.264 - universal)
ffmpeg -i logo_animada_glow.mov \
  -c:v libx264 \
  -crf 23 \
  -preset slow \
  -vf "scale=-1:720" \
  -pix_fmt yuv420p \
  -movflags +faststart \
  -an \
  logo_animada_glow.mp4

# Converter para WebM (VP9 - menor)
ffmpeg -i logo_animada_glow.mov \
  -c:v libvpx-vp9 \
  -crf 30 \
  -b:v 0 \
  -vf "scale=-1:720" \
  -an \
  logo_animada_glow.webm
```

**Parâmetros Explicados:**
- `-crf 23` (MP4) / `-crf 30` (WebM) = Qualidade (menor = melhor, 23 é ótimo)
- `-preset slow` = Maior compressão (leva mais tempo mas gera arquivo menor)
- `-vf "scale=-1:720"` = Reduz para 720p (manter proporção)
- `-pix_fmt yuv420p` = Compatibilidade máxima
- `-movflags +faststart` = Streaming otimizado (carrega mais rápido)
- `-an` = Remove áudio (logo não precisa)

---

### **Opção 2: Handbrake (GUI)**

1. Download: https://handbrake.fr/
2. Arrastar `logo_animada_glow.mov`
3. **Preset**: "Web" → "Gmail Medium 5 Minutes 720p30"
4. **Video Codec**: H.264 (x264)
5. **Constant Quality**: RF 23
6. **Audio**: Remove track
7. **Save as**: `logo_animada_glow.mp4`

Para WebM, usar preset "VP9 MKV 720p30"

---

### **Opção 3: CloudConvert (Online)**

1. https://cloudconvert.com/mov-to-mp4
2. Upload `logo_animada_glow.mov`
3. **Options**:
   - Codec: H.264
   - Quality: 80%
   - Resolution: 720p
   - Audio: Remove
4. Convert & Download

Repetir para WebM (VP9)

---

### **Opção 4: Adobe Media Encoder / Premiere Pro**

**Para MP4:**
```
Format: H.264
Preset: YouTube 720p HD
Bitrate: VBR, 1 pass, Target 5 Mbps
Audio: None (mute track)
```

**Para WebM:**
```
Format: WebM
Video Codec: VP9
Bitrate: VBR, Target 3 Mbps
Audio: None
```

---

## 📏 **TAMANHOS ESPERADOS:**

| Formato | Resolução | Tamanho Estimado | Compatibilidade |
|---------|-----------|------------------|-----------------|
| **MOV** (atual) | ? | ~? MB | ⚠️ Limitada |
| **MP4** (H.264) | 720p | ~500 KB - 2 MB | ✅ Universal |
| **WebM** (VP9) | 720p | ~300 KB - 1 MB | ✅ Moderno |

**Meta**: MP4 < 2 MB, WebM < 1 MB (para carregamento rápido)

---

## ✅ **CHECKLIST DE CONVERSÃO:**

### **Fase 1: Converter Arquivos**
- [ ] Converter para MP4 (H.264, 720p, CRF 23)
- [ ] Converter para WebM (VP9, 720p, CRF 30)
- [ ] Verificar tamanho (MP4 < 2MB, WebM < 1MB)
- [ ] Testar reprodução local

### **Fase 2: Upload e Teste**
- [ ] Adicionar `logo_animada_glow.mp4` em `/public`
- [ ] Adicionar `logo_animada_glow.webm` em `/public`
- [ ] Testar em Chrome (deve escolher WebM)
- [ ] Testar em Firefox (deve escolher WebM ou MP4)
- [ ] Testar em Safari (deve escolher MP4)
- [ ] Testar em Mobile (Android/iOS)

### **Fase 3: Otimização (Opcional)**
- [ ] Gerar versão menor para mobile (480p)
- [ ] Adicionar `<source media="(max-width: 768px)" src="...480p.mp4">`
- [ ] Considerar lazy load (só carregar quando visível)

---

## 🚀 **APÓS CONVERSÃO:**

### **Estrutura Final em `/public`:**

```
public/
├─ logo_animada_glow.webm    # Novo (menor, moderno)
├─ logo_animada_glow.mp4     # Novo (universal)
├─ logo_animada_glow.mov     # Original (fallback)
└─ logo-azimut-star.svg      # Fallback final
```

### **Build e Verificação:**

```bash
npm run build
# Verificar tamanho do bundle:
# dist/assets/ deve ter aumentado ~1-2 MB (OK)
```

---

## 🎓 **REFERÊNCIAS:**

### **ffmpeg Guides:**
- Official: https://ffmpeg.org/documentation.html
- Web Video Guide: https://trac.ffmpeg.org/wiki/Encode/H.264
- WebM VP9: https://trac.ffmpeg.org/wiki/Encode/VP9

### **Handbrake:**
- Download: https://handbrake.fr/
- Docs: https://handbrake.fr/docs/

### **Online Converters:**
- CloudConvert: https://cloudconvert.com/ (melhor qualidade)
- FreeConvert: https://www.freeconvert.com/ (mais rápido)
- Online-Convert: https://www.online-convert.com/

---

## ⚠️ **IMPORTANTE:**

1. **Manter `.mov` original**: Serve como fallback e master
2. **Transparência**: O `mix-blend-mode: screen` funcionará em todos os formatos
3. **Glow effect**: Aplicado via CSS, não no vídeo
4. **Performance**: WebM é 30-50% menor que MP4 (sempre incluir ambos)

---

**Status**: ✅ **Código preparado para múltiplos formatos**  
**Próximo**: Usuário converter vídeo e adicionar MP4/WebM em `/public`

