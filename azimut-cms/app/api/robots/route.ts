/**
 * Robots.txt Dinâmico - Otimizado para múltiplos buscadores
 * Inclui Google, Bing, Yandex, Baidu, DuckDuckGo e bots de IA
 */

import { NextRequest, NextResponse } from 'next/server'

const SITE_URL = 'https://azmt.com.br'

export async function GET(request: NextRequest) {
  const robotsTxt = `# ═══════════════════════════════════════════════════════════
# robots.txt - Azimut Site
# Otimizado para SEO e múltiplos buscadores
# ═══════════════════════════════════════════════════════════

# ═══════════════════════════════════════════════════════════
# BUSCADORES PRINCIPAIS (TIER 1 - CRÍTICO)
# ═══════════════════════════════════════════════════════════

# Google (92% do mercado)
User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Googlebot-Image
Allow: /

User-agent: Googlebot-Video
Allow: /

# Bing (3% do mercado + alimenta ChatGPT/Copilot)
User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: msnbot
Allow: /
Crawl-delay: 1

# ═══════════════════════════════════════════════════════════
# BUSCADORES SECUNDÁRIOS (TIER 2 - IMPORTANTE)
# ═══════════════════════════════════════════════════════════

# Yandex (Rússia/Europa)
User-agent: Yandex
Allow: /
Crawl-delay: 1

User-agent: YandexBot
Allow: /
Crawl-delay: 1

# Baidu (China)
User-agent: Baiduspider
Allow: /
Crawl-delay: 2

# DuckDuckGo (Privacidade - usa Bing)
User-agent: DuckDuckBot
Allow: /
Crawl-delay: 1

# ═══════════════════════════════════════════════════════════
# BUSCADADORES DE IA (TIER 3 - EMERGENTE)
# ═══════════════════════════════════════════════════════════

# OpenAI (ChatGPT Web Search)
User-agent: GPTBot
Allow: /
Crawl-delay: 1

User-agent: ChatGPT-User
Allow: /
Crawl-delay: 1

# Anthropic (Claude)
User-agent: anthropic-ai
Allow: /
Crawl-delay: 1

User-agent: Claude-Web
Allow: /
Crawl-delay: 1

# Perplexity AI
User-agent: PerplexityBot
Allow: /
Crawl-delay: 1

# Common Crawl (usado por muitos buscadores de IA)
User-agent: CCBot
Allow: /
Crawl-delay: 2

# ═══════════════════════════════════════════════════════════
# REGRAS GLOBAIS
# ═══════════════════════════════════════════════════════════

# Permitir todos os outros bots (padrão)
User-agent: *
Allow: /
Crawl-delay: 1

# Bloquear áreas administrativas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /static/
Disallow: /debug/
Disallow: /login/

# ═══════════════════════════════════════════════════════════
# SITEMAP (OBRIGATÓRIO PARA SEO)
# ═══════════════════════════════════════════════════════════

Sitemap: ${SITE_URL}/sitemap.xml

# Host (opcional, mas recomendado para Yandex)
Host: ${SITE_URL}
`

  return new NextResponse(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache por 1 hora
    },
  })
}
