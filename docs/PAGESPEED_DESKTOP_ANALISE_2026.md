# Análise PageSpeed Insights – Desktop (azmt.com.br)

Resumo da análise de **Desktop** com base nos relatórios do Google PageSpeed Insights e ações aplicadas no código.

---

## Performance

### Oportunidades (Insights)
- **Melhorar entrega de imagens:** ~1.386 KiB de economia estimada. Principais alvos: `pattern-azimut.png`, `fundo grao.png`, `empaty-engine.png`, imagem Unsplash do hero. Recomendações: WebP/AVIF, imagens responsivas.
- **Cache eficiente:** 64 KiB. Thumbnail do YouTube (`maxresdefault.jpg`) com TTL curto; cache de assets/fontes já configurado no `vercel.json`.
- **Forced reflow:** ~78 ms. Investigar leituras de layout (ex.: `offsetWidth`) logo após alterações de estilo.
- **LCP breakdown:** Resource load delay ~3,97 s; element render delay ~820 ms. Elemento LCP: imagem hero Unsplash (`picture > img`). Já tem `width`, `height`, `loading="eager"`, `fetchpriority="high"`.
- **LCP request discovery:** Imagem LCP é de terceiros (`images.unsplash.com`). **Ação:** adicionado `preconnect` para `https://images.unsplash.com` no `index.html`.
- **Network dependency tree:** Latência do caminho crítico ~711 ms; recursos: HTML, `index-*.css`, `index-*.js`.

### Diagnósticos
- **Reduzir JavaScript não utilizado:** ~119 KiB (vendor + Google Tag Manager). Analytics já em `DeferredAnalytics` (requestIdleCallback/setTimeout); GlobalSearch em lazy.
- **Imagens sem width/height:** **Ação:** adicionados `width` e `height` em: `logo-topo-site.svg`, `flag-ca.svg`, `flag-br.svg`, `flag-es.svg`, `web-3-icon.svg`, `empaty-engine.png` (Layout, Home, ExperiencePreview).
- **Payload de rede:** Total ~8.852 KiB. Maiores: `logo_animada_glow.mp4`, `pattern-azimut.png`, fontes, vendor JS, Unsplash.
- **Main-thread work:** ~2,1 s. Relacionado a JS e terceiros (YouTube, GTM).

### Ações realizadas no código
1. **Preconnect** no `index.html`: `images.unsplash.com` (LCP), `img.youtube.com`, `plausible.io` (máx. 4 origens).
2. **width/height** em todas as imagens indicadas pelo relatório (header, footer, Home, ExperiencePreview).

---

## Acessibilidade (score 93)

### Contraste
- **Problema:** Cores de fundo e primeiro plano sem contraste suficiente.
- **Elementos apontados:** Botão de idioma "EN" (vermelho `#c92337` no tema escuro), parágrafo com `text-white/20`, header.
- **Ações realizadas:**
  - Texto de versão no footer: `text-white/20` → `text-white/50` em `PageFooterNavigation.tsx`.
  - Botões de idioma (EN, FR, PT, ES) e links ativos no tema escuro: `#c92337` → `#e84d5c` em `Layout.tsx` (header inline, dropdown, nav desktop, menu mobile, footer). Mantido `#c92337` no tema claro.

### Touch targets (Best Practices)
- Áreas de toque já ajustadas no footer (min 44px). Persistir em qualquer novo botão/link.

### Áudio e vídeo
- Oportunidade: `<video>` com `<track kind="captions">` para legendas. Considerar adicionar faixas de legenda onde fizer sentido.

---

## Best Practices (score 96)

### Erros no console
- **ip-api.com:** `403 Forbidden` na requisição de geo (JSON).
- **ipapi.co:** `429 Too Many Requests` (limite de taxa).
- **Causa:** Detecção de país/idioma por IP usa APIs gratuitas com limites. O site já tem fallback por timezone e idioma da URL.
- **Recomendação:** Tratar erros em silêncio (evitar `console.error` em produção para essas chamadas) ou usar uma API de geo com chave e cota maior. Não bloqueia funcionalidade.

### Trust & Safety (recomendações gerais)
- CSP, HSTS, COOP, X-Frame-Options, Trusted Types: revisar em projeto de segurança/infra.

---

## Próximos passos sugeridos

1. **Imagens:** Servir `pattern-azimut.png` e demais PNGs em WebP/AVIF e tamanhos responsivos (`srcset`).
2. **Vídeo:** Manter hero em desktop com vídeo sob demanda; considerar versão mais leve ou poster estático para primeiro frame.
3. **Geo:** Reduzir ruído no console (try/catch e não logar 403/429) ou migrar para API de geo com cota.
4. **Cache:** Thumbnails do YouTube são de terceiros; onde houver proxy próprio, definir Cache-Control longo.
5. **LCP:** Com preconnect para Unsplash e dimensões explícitas, rodar novo Lighthouse após deploy para comparar LCP e scores.

---

*Documento gerado com base nos relatórios PageSpeed Desktop de jan/2026 e alterações aplicadas no repositório.*
