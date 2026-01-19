# 🚀 CHECKLIST PARA NOVO DEPLOY

**Data:** 07 Jan 2026  
**Problema Atual:** Deploy com código antigo (imagem de fundo + logo sem transparência)

---

## ❌ PROBLEMAS NO DEPLOY ATUAL

1. **Imagem do Louvre como fundo** (código antigo pegando imagem de projeto)
2. **Logo sem transparência** (box escuro ao redor)
3. **Logo 1080p** (3.62 MB, não otimizada)

---

## ✅ CÓDIGO LOCAL CORRETO

### 1. Fundo Hero (src/pages/Home.tsx):
```tsx
{/* Background Gradiente Azul Premium (sem imagem) */}
<div className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />

{/* Glass Overlay Premium */}
<div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
```
✅ Sem imagem dinâmica  
✅ Gradiente azul fixo

### 2. Logo Transparente (src/components/AnimatedLogo.tsx):
```tsx
style={{ 
  mixBlendMode: 'screen', // Luma key: preto vira transparente
  filter: 'drop-shadow(...)'  // Glow vermelho
}}
```
✅ `mixBlendMode: 'screen'` ativa  
✅ Transparência via chroma key CSS

### 3. Logo Otimizada (public/):
```tsx
<source src="/logo_animada_glow_720p.webm" type="video/webm; codecs=vp9" />
```
✅ 720p (2.18 MB) em vez de 1080p (3.62 MB)

---

## 📦 ARQUIVOS QUE PRECISAM ESTAR NO DEPLOY

### Vídeos da Logo:
- ✅ `public/logo_animada_glow_720p.webm` (2.18 MB) - **PRINCIPAL**
- ✅ `public/logo_animada_glow.mp4` (2.66 MB) - Fallback Safari
- ✅ `public/logo_animada_glow.mov` (10.33 MB) - Fallback final
- ✅ `public/logo-azimut-star.svg` - Fallback estático

### Arquivos Modificados:
- ✅ `src/pages/Home.tsx` (fundo azul sem imagem)
- ✅ `src/components/AnimatedLogo.tsx` (transparência + 720p)

---

## 🔧 COMANDOS PARA NOVO DEPLOY

### 1. Verificar se todos os arquivos estão commitados:
```bash
git status
```

### 2. Adicionar arquivos novos/modificados:
```bash
# Adicionar vídeos otimizados
git add public/logo_animada_glow_720p.webm
git add public/logo_animada_glow.mp4

# Adicionar código modificado
git add src/pages/Home.tsx
git add src/components/AnimatedLogo.tsx
```

### 3. Fazer commit:
```bash
git commit -m "fix: hero com fundo azul + logo 720p transparente

- Remove imagem dinâmica de fundo do hero
- Aplica gradiente azul premium fixo (slate-950 → blue-950)
- Ativa transparência logo via mixBlendMode screen
- Otimiza logo para 720p (2.18 MB, -40%)
- Layout 50/50 mais centralizado
- Título em 2 linhas (fonte menor)"
```

### 4. Push para repositório:
```bash
git push origin main
# ou
git push origin master
```

### 5. Deploy (se não for automático):

**Vercel:**
```bash
vercel --prod
```

**Netlify:**
```bash
netlify deploy --prod
```

**Ou pelo painel:** Trigger manual deploy no dashboard

---

## ✅ COMO VERIFICAR SE DEU CERTO

Após o deploy, abra o site e verifique:

### 1. Fundo do Hero:
- ❌ **Não deve ter:** Imagem do Louvre ou qualquer foto
- ✅ **Deve ter:** Gradiente azul escuro (quase preto → azul navy)

### 2. Logo Animada:
- ❌ **Não deve ter:** Box/retângulo escuro ao redor da logo
- ✅ **Deve ter:** Logo flutuando transparente com glow vermelho

### 3. Performance:
- ✅ Logo deve carregar rápido (2.18 MB WebM ou 2.66 MB MP4)
- ✅ Fundo deve ser instantâneo (sem carregar imagem)

### 4. DevTools:
```
F12 → Network → Filter "logo"
- Deve carregar: logo_animada_glow_720p.webm (2.18 MB)
- Ou: logo_animada_glow.mp4 (2.66 MB) no Safari
```

---

## 🐛 SE AINDA TIVER PROBLEMA

### Cache do Navegador:
```
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

### Cache do CDN (Vercel/Netlify):
- Vercel: Deploy faz purge automático
- Netlify: Settings → Build & Deploy → Clear cache

### Verificar arquivos no servidor:
```bash
# Listar arquivos public/ no build
ls -la dist/ 
# ou
ls -la build/public/
```

---

## 📊 COMPARAÇÃO ESPERADA

### Antes (Deploy Atual):
```
┌────────────────────────────┐
│ [FOTO DO LOUVRE DE FUNDO]  │
│                             │
│ EXPERIÊNCIAS QUE            │
│ CONNECTENT LES              │
│ MONDES                      │
│                             │
│         [LOGO EM BOX]  ←─── ❌ Não transparente
└────────────────────────────┘
```

### Depois (Novo Deploy):
```
┌────────────────────────────┐
│ [GRADIENTE AZUL ESCURO]    │ ← ✅ Sem imagem
│                             │
│ EXPERIÊNCIAS QUE  [LOGO]   │ ← ✅ Transparente
│ CONNECTENT        GLOW     │    com glow
│ MONDES                      │
│                             │
└────────────────────────────┘
```

---

## 🎯 RESUMO EXECUTIVO

**Problema:** Deploy desatualizado  
**Solução:** Git push + novo deploy  
**Arquivos críticos:** Home.tsx, AnimatedLogo.tsx, logo_720p.webm  
**Tempo estimado:** 5-10 min (build + deploy)  

**Após deploy:** Fundo azul + logo transparente! ✨

---

## 📞 SUPORTE

Se após o deploy ainda aparecer a imagem do Louvre:
1. Limpar cache (Ctrl+Shift+R)
2. Verificar se commit foi para branch correta
3. Verificar se Vercel/Netlify está deployando a branch certa
4. Checar logs de build para erros

**Status:** 🟡 Aguardando novo deploy

