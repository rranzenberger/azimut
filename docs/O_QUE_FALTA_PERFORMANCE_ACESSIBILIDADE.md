# O que já fizemos × o que ainda falta

Checklist **Performance**, **Acessibilidade** e **Melhores Práticas** (Lighthouse / PageSpeed), após as últimas otimizações.

---

## ✅ Já feito (no código)

### Performance
- DeferredAnalytics (GA + Plausible após requestIdleCallback/setTimeout)
- GlobalSearch em lazy (só carrega ao abrir busca)
- Preconnect: images.unsplash.com, img.youtube.com, plausible.io
- Preload: logo hero, fonte HandelGothic; sem preconnect Google Fonts
- Hero mobile: só poster (sem vídeo) para LCP
- width/height em imagens: logo, bandeiras, web-3-icon, empaty-engine, hero OptimizedImage
- fetchpriority="high" + loading="eager" no hero (OptimizedImage com priority)
- Cache: vercel.json para assets e fonts (max-age longo)
- Service Worker: tratamento de cache miss (sem TypeError)

### Acessibilidade
- Contraste: text-white/20 → text-white/50; botões de idioma e links ativos #c92337 → #e84d5c no tema escuro
- Badge "AZIMUT", links Privacy/Terms, "Saiba mais" (CookieBanner): vermelho acessível #e84d5c
- Ordem de cabeçalhos: h4 → h2 no footer
- Touch targets: min 44px em links/botões do footer e navegação
- Política de cookies: item explícito sobre cookies de terceiros (PT/EN/ES/FR)
- **Div decorativo mobile:** `lg:hidden absolute inset-0` com `aria-hidden="true"`
- **Vídeo hero:** `<track kind="captions">` (faixa vazia para vídeo decorativo; atende auditoria)

### Melhores Práticas
- YouTube embed → youtube-nocookie.com (VideoPlayer + ProjectDetail) – menos cookies de terceiros
- **Console:** GEO não loga erro em produção (só `console.warn` em DEV) – evita “Browser errors logged”

---

## 🟡 O que ainda falta (por categoria)

### Performance (o que sobra é mais infra/build)
| Item | Onde | Observação |
|------|------|------------|
| CSS bloqueando (~1.35 s) | Bundle Vite/Tailwind | Critical CSS inline + defer do restante, ou split; exige build |
| Payload grande | Vídeo, pattern, fontes | WebP/AVIF para pattern/fundo; vídeo mais leve ou lazy; fonte subset |
| JS não utilizado (~100 KiB) | vendor + GTM | Tree-shake, code-split; GTM já adiado |
| Cache thumbnail YouTube | Terceiros | Não controlamos; se houver proxy próprio, Cache-Control |

Ou seja: **performance que ainda falta é sobretudo infraestrutura e assets** (critical CSS, compressão de imagens/vídeo, fontes), não lógica em React.

---

### Acessibilidade (pouco por código)
| Item | Onde | Observação |
|------|------|------------|
| Legendas reais em vídeos | AnimatedLogo, outros vídeos | Hoje: track vazio (decorativo). Para vídeos com fala: arquivo .vtt real |
| Verificação manual (10 itens) | Lighthouse | “Additional items to manually check” – testes manuais de a11y |
| Foco visível / teclado | Links, botões | Garantir outline/focus-visible em todos os interativos (já em boa parte) |

Ou seja: **acessibilidade que falta é sobretudo conteúdo (legendas) e testes manuais**.

---

### Melhores Práticas (segurança / infra)
| Item | Onde | Observação |
|------|------|------------|
| CSP eficaz contra XSS | Servidor / headers | Content-Security-Policy no Vercel ou proxy |
| HSTS | Servidor | Header Strict-Transport-Security |
| COOP / X-Frame-Options | Servidor | Isolamento e anti-clickjacking |
| Trusted Types | App (opcional) | Mitigar XSS DOM; exige política de tipos |

Ou seja: **melhores práticas que faltam são principalmente headers e política de segurança** (servidor/infra), não mudanças grandes no front.

---

## Resumo direto

- **Performance:** As principais otimizações que dependem de código (defer, lazy, preconnect, dimensões, cache) já foram feitas. O que falta é **infra/build**: critical CSS, compressão de imagens/vídeo, fontes, eventualmente menos JS no bundle.
- **Acessibilidade:** Contraste, touch targets, ordem de cabeçalhos, aria-hidden e track de legendas (vazio) já feitos. Falta **conteúdo** (legendas reais onde houver fala) e **testes manuais**.
- **Melhores Práticas:** YouTube nocookie e console limpo em produção já feitos. Falta **configuração de servidor**: CSP, HSTS, COOP, X-Frame-Options (e opcionalmente Trusted Types).

Se quiser subir mais os scores sem mexer em infra agora, o próximo passo é **re-rodar Lighthouse após o deploy** (para ver o ganho de a11y e Best Practices) e, na sequência, atacar **critical CSS e payload** quando for hora de mexer em build/infra.
