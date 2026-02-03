# Performance no mobile e logo animada

## Por que a performance diminuiu no mobile (score ~60)

O Lighthouse no **mobile** aponta principalmente:

1. **CSS bloqueando a renderização** (~2.660 ms)
   - O arquivo `index-*.css` (42 KiB) atrasa o First Contentful Paint e o LCP.
   - Solução de médio prazo: critical CSS inline + carregar o restante de forma assíncrona.

2. **Payload de rede grande** (~3.368 KiB / 3,3 MB)
   - Maiores: `pattern-azimut.png` (~1.226 KiB), imagem Unsplash do hero (~595 KiB), `Inter-VariableFont.ttf` (~444 KiB), thumbnails YouTube, vendor JS.
   - Solução: WebP/AVIF para imagens, subset de fontes, lazy load de recursos abaixo da dobra.

3. **JavaScript não utilizado** (~120 KiB)
   - `vendor-*.js` e Google Tag Manager (já adiado via DeferredAnalytics).
   - Solução: tree-shaking e code-splitting no build.

4. **LCP e FCP altos** (ex.: 16,2 s e 6,2 s)
   - O CSS bloqueante e o tamanho do payload atrasam a primeira pintura e o elemento LCP (no mobile costuma ser a logo ou a imagem do hero).

5. **Animações não compostas** (4–7 elementos)
   - Animações que não usam só `transform`/`opacity` podem causar reflow e piorar performance no mobile.

6. **Preconnect**
   - “More than 4 preconnect connections” – hoje há 3 preconnect + 1 dns-prefetch; se o relatório contar outros (ex.: Helmet), vale deixar no máximo 3–4 origens críticas.

7. **Forced reflow** (~191 ms)
   - Leitura de layout (ex.: `offsetWidth`) após mudança de DOM, em especial em `vendor-*.js` e no bundle principal.

---

## Onde está a animação da logo no mobile?

**No mobile a logo não é animada (vídeo).** É proposital.

- No **desktop** (telas > 768px): o componente **AnimatedLogo** mostra o **vídeo** da logo (`logo_animada_glow_720p.webm` / `.mp4`).
- No **mobile** (≤ 768px): o mesmo componente mostra só a **imagem estática** (`/logo-azimut-star.svg`), com `loading="eager"` e `fetchPriority="high"`.

Motivo: evitar baixar ~2 MB de vídeo no mobile e melhorar o LCP. O elemento LCP no mobile costuma ser essa imagem da logo (ou a imagem do hero, dependendo do viewport).

**Resumo:** A “animação” da logo (vídeo) existe apenas no **desktop**. No mobile você vê apenas a estrela estática (SVG). Os “4–7 animated elements” do Lighthouse são outros (CSS, transições, etc.), não o vídeo da logo.

Arquivo: `src/components/AnimatedLogo.tsx` (hook `useIsMobile()` e branch `if (isMobile)` com `<img>` estático).
