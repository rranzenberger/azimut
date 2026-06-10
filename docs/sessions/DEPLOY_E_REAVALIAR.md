# Deploy e reavaliar (Lighthouse / PageSpeed)

**Build já validado:** `npm run build` passou.

---

## Opção A: Deploy via Git (Vercel conectado ao repositório)

1. **Commit e push** das alterações do site:
   ```powershell
   cd c:\Users\ranz\Documents\azimut-site-vite-tailwind
   git add index.html src/ public/sw.js vercel.json docs/*.md
   git add src/App.tsx src/components/DeferredAnalytics.tsx src/components/AnimatedLogo.tsx
   git add src/components/CookieBanner.tsx src/components/ExperiencePreview.tsx src/components/Layout.tsx
   git add src/components/PageFooterNavigation.tsx src/components/VideoPlayer.tsx
   git add src/pages/Home.tsx src/pages/ProjectDetail.tsx
   git status
   git commit -m "perf+a11y: DeferredAnalytics, contraste, youtube-nocookie, width/height, aria-hidden, track captions, console GEO"
   git push
   ```
2. Aguardar o deploy na Vercel (alguns minutos).
3. **Reavaliar:** abra https://www.azmt.com.br/pt → F12 → Lighthouse → Desktop → Analyze page load.

---

## Opção B: Deploy via Vercel CLI

1. No PowerShell, na pasta do projeto:
   ```powershell
   .\DEPLOY_SITE.ps1
   ```
   (Faz `vercel-build` + `vercel --prod`. Requer Vercel CLI: `npm i -g vercel`.)
2. **Reavaliar:** mesmo passo 3 acima.

---

## Depois do deploy – reavaliação

1. Abra **https://www.azmt.com.br/pt** (modo anônimo ou sem cache, se quiser resultado “limpo”).
2. **F12** → aba **Lighthouse**.
3. Marque **Performance**, **Accessibility**, **Best Practices**, **SEO**.
4. Dispositivo: **Desktop** (ou Mobile, se quiser os dois).
5. Clique em **Analyze page load**.
6. Compare os scores com os anteriores (Performance ~68, Acessibilidade ~96, Melhores Práticas ~77, SEO 100).

**O que tende a melhorar:** Acessibilidade (contraste, aria-hidden, track) e Melhores Práticas (youtube-nocookie, menos erros no console). Performance pode subir um pouco; o restante depende de critical CSS e payload (próximos passos no doc `O_QUE_FALTA_PERFORMANCE_ACESSIBILIDADE.md`).
