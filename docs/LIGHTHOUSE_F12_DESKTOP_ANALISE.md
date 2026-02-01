# Análise Lighthouse (F12) – Desktop – azmt.com.br/pt

Resumo da análise feita com **Lighthouse** nas Ferramentas do Desenvolvedor (F12) do Chrome, modo **Desktop**, para a URL `https://www.azmt.com.br/pt`.

---

## Pontuações observadas

| Categoria        | Score | Status   |
|------------------|-------|----------|
| **Performance**  | 68    | Laranja  |
| **Acessibilidade** | 96  | Verde    |
| **Melhores Práticas** | 77 | Laranja  |
| **SEO**          | 100   | Verde    |

---

## Performance (68)

### Cadeia de requisições críticas
- **Latência máxima do caminho crítico:** ~1.351 ms.
- **Documento:** `/pt` (~243 ms, 3,41 KiB).
- **CSS:** `/assets/index-*.css` (~1.351 ms, 42 KiB) – principal gargalo.
- **JS:** `/assets/index-*.js` (~623 ms, 38 KiB).

**Sugestões:** CSS crítico inline no `<head>` e carregar o restante de forma assíncrona; ou revisar o bundle CSS do Vite (purge, split).

### Render blocking
- **Economia estimada:** ~20 ms.
- Recurso principal: `index-*.css` (42 KiB). Já há defer de analytics; o CSS do bundle continua bloqueando.

### Payload de rede
- **Total:** ~5.512 KiB.
- Maiores: `logo_animada_glow_720p.webm` (~2.232 KiB), `pattern-azimut.png` (~1.227 KiB), `Inter-VariableFont.ttf` (~444 KiB), vendor JS (~79 KiB).

### JavaScript não utilizado
- **Economia estimada:** ~100 KiB (vendor ~49,5 KiB, GTM ~50,8 KiB).
- Analytics já em `DeferredAnalytics`; GTM carregado após idle. Possível evoluir code-splitting e tree-shaking.

### Imagens sem width/height
- Lighthouse aponta imagens sem `width`/`height` (CLS).
- **Já feito:** `logo-topo-site.svg`, bandeiras, `web-3-icon.svg`, `empaty-engine.png`, hero via `OptimizedImage` (width/height + `fetchpriority="high"` quando `priority`).
- Se o LCP for uma imagem do CMS/Unsplash, `OptimizedImage` já repassa dimensões e prioridade.

### fetchpriority e LCP
- Hero na home usa `OptimizedImage` com `priority={true}` → `loading="eager"` e `fetchPriority="high"`.
- Nenhum preconnect para Google Fonts no `index.html` (fontes locais).

---

## Acessibilidade (96)

### Contraste
- **Problemas citados:** Botão de idioma (ex.: "PT"), header, parágrafo com `text-white/20`, link "Saiba mais", texto "AZIMUT" (vermelho).
- **Ações no código:**
  - Texto de versão no footer: `text-white/20` → `text-white/50`.
  - Botões de idioma e links ativos no tema escuro: `#c92337` → `#e84d5c` em `Layout.tsx`.
  - Badge "AZIMUT" na Home: no tema escuro cor `#e84d5c` (contraste acessível).
  - Links Privacy/Terms no footer (mobile): no tema escuro cor `#e84d5c`.
  - Link "Saiba mais" no CookieBanner: `text-azimut-red` → `color: #e84d5c`.

### Áudio e vídeo
- Oportunidade: `<video>` com `<track kind="captions">` para legendas onde fizer sentido.

### Elementos ocultos (`div.lg:hidden`)
- `div.lg:hidden.absolute.inset-0`: garantir que não sejam focáveis quando invisíveis (ex.: `aria-hidden` ou evitar conteúdo interativo).

---

## Melhores Práticas (77)

### Cookies de terceiros (YouTube)
- **Problema:** 4 cookies do YouTube (embed) – "Uses third-party cookies".
- **Ação no código:** Embeds passam a usar **youtube-nocookie.com**:
  - `VideoPlayer.tsx`: URL de embed `https://www.youtube-nocookie.com/embed/...`
  - `ProjectDetail.tsx`: `videoEmbedUrl` com `youtube-nocookie.com`
- Cookies só são definidos após o usuário dar play, alinhado às restrições de cookies de terceiros.

### Issues no console
- Problemas podem ser registrados no painel Issues do DevTools (rede, segurança, etc.). Verificar após deploy.

### Trust & Safety
- Recomendações genéricas: CSP contra XSS, HSTS, COOP, X-Frame-Options, Trusted Types – evoluir em projeto de segurança/infra.

---

## SEO (100)

- Auditorias básicas de SEO aprovadas.
- Dados estruturados: verificação manual sugerida ("Structured data is valid").
- Core Web Vitals e outros fatores de ranking não entram no score 100, mas Performance e LCP impactam experiência e SEO indiretamente.

---

## Preconnect

- **Unused preconnect:** Se o Lighthouse ainda apontar `fonts.googleapis.com` / `fonts.gstatic.com`, pode ser cache antigo ou outra origem (extensão, script). O `index.html` do projeto **não** declara preconnect para Google Fonts (apenas Unsplash, img.youtube.com, plausible.io).
- **Candidatos atuais no código:** `images.unsplash.com`, `img.youtube.com`, `plausible.io` (máx. 4).

---

## Resumo das alterações feitas no código

1. **VideoPlayer.tsx:** embed YouTube → `youtube-nocookie.com/embed/...`
2. **ProjectDetail.tsx:** `videoEmbedUrl` → `youtube-nocookie.com/embed/...`
3. **Home.tsx:** badge "AZIMUT" com cor `#e84d5c` no tema escuro (contraste).
4. **Layout.tsx:** links Privacy/Terms no footer mobile com cor `#e84d5c` no tema escuro.
5. **CookieBanner.tsx:** link "Saiba mais" com `color: #e84d5c` (contraste no fundo escuro).

---

## Próximos passos sugeridos

1. **Performance:** Avaliar critical CSS + defer do restante do CSS; reduzir payload (vídeo, pattern, fontes).
2. **Melhores Práticas:** Revisar Issues do DevTools e políticas de segurança (CSP, etc.).
3. **Acessibilidade:** Legendas em vídeos onde aplicável; revisar elementos `lg:hidden` para foco/teclado.
4. Rodar novo Lighthouse (F12) após deploy para comparar scores e métricas (LCP, CLS, TBT).

---

*Documento gerado com base nos relatórios Lighthouse (F12) Desktop de fev/2026 e nas alterações aplicadas no repositório.*
