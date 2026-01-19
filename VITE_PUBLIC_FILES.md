# ⚠️ **VITE NÃO COPIA ARQUIVOS PUBLIC AUTOMATICAMENTE**

## 🔍 **PROBLEMA:**

Vite **NÃO copia automaticamente** arquivos da pasta `public/` para `dist/` durante o build.

Arquivos em `public/` são servidos na **raiz** durante desenvolvimento, mas precisam estar em `dist/` para produção.

---

## ✅ **SOLUÇÃO RÁPIDA:**

### **Opção 1: Copiar Manualmente (Mais Rápido)**

```bash
# PowerShell
Copy-Item "public/azimut 3d para 2d.mp4" -Destination "dist/"
Copy-Item "public/azimut-3d-para-2d.mp4" -Destination "dist/"
Copy-Item "public/azimut-glow-alpha-vp9.webm" -Destination "dist/"
Copy-Item "public/logo_azimut_azimut_animago.gif" -Destination "dist/"
```

### **Opção 2: Vite Plugin (Melhor Longo Prazo)**

Instalar plugin:
```bash
npm install vite-plugin-static-copy --save-dev
```

Atualizar `vite.config.ts`:
```typescript
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/*.mp4',
          dest: ''
        },
        {
          src: 'public/*.webm',
          dest: ''
        },
        {
          src: 'public/*.gif',
          dest: ''
        }
      ]
    })
  ],
  // ... resto da config
})
```

---

## 🚀 **SOLUÇÃO IMEDIATA (AGORA):**

### **1. Copiar vídeos para dist:**
```bash
Copy-Item "public/azimut 3d para 2d.mp4" -Destination "dist/"
Copy-Item "public/azimut-3d-para-2d.mp4" -Destination "dist/"
Copy-Item "public/azimut-glow-alpha-vp9.webm" -Destination "dist/"
```

### **2. Testar local:**
```bash
npm run preview
```

### **3. Se funcionar, deploy:**
```bash
git add .
git commit -m "fix: logo animada com video (inclui arquivos mp4/webm)"
git push
```

---

## 📝 **VERCEL PEGA ARQUIVOS DE PUBLIC AUTOMATICAMENTE**

**Boa notícia:** Vercel **COPIA** arquivos de `public/` automaticamente durante o deploy!

Então o problema é **APENAS LOCAL** (preview).

**Para produção:** Só fazer push que Vercel cuida.

---

## 🎯 **AÇÃO RECOMENDADA:**

**Fazer deploy direto:**

```bash
git add src/components/AnimatedLogo.tsx
git commit -m "fix: reativar logo animada com video (MP4/WebM)"
git push
```

**Vercel vai:**
1. Pegar arquivos de `public/`
2. Copiar para build
3. Servir corretamente

---

## ✅ **RESUMO:**

- ✅ Componente AnimatedLogo.tsx **ATUALIZADO**
- ✅ Vídeos estão em `public/` (7.7MB MP4)
- ✅ Build sem erros
- ⚠️ Vídeos **NÃO** estão em `dist/` (normal, Vercel cuida)
- 🚀 **PRONTO PARA DEPLOY**

---

**Ação:** Fazer git push que Vercel vai servir os vídeos corretamente! 🎬

