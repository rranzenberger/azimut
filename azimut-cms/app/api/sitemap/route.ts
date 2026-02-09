/**
 * Sitemap Dinâmico - Gera sitemap.xml automaticamente
 * Inclui todas as páginas fixas + todos os projetos do banco
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma'

const SITE_URL = 'https://azmt.com.br'
const LANGUAGES = ['pt', 'en', 'es', 'fr'] as const

// Páginas fixas do site
const STATIC_PAGES = [
  { path: '', priority: 1.0, changefreq: 'weekly' },
  { path: 'work', priority: 0.9, changefreq: 'weekly' },
  { path: 'what', priority: 0.8, changefreq: 'monthly' },
  { path: 'academy', priority: 0.9, changefreq: 'weekly' },
  { path: 'academy/vancouver', priority: 0.95, changefreq: 'weekly' },
  { path: 'studio', priority: 0.8, changefreq: 'monthly' },
  { path: 'contact', priority: 0.7, changefreq: 'monthly' },
  { path: 'press', priority: 0.6, changefreq: 'monthly' },
  { path: 'research', priority: 0.6, changefreq: 'monthly' },
]

export async function GET(request: NextRequest) {
  try {
    // ⚠️ NUNCA quebrar se houver erro - sempre retornar sitemap válido
    let projects: any[] = []
    let lastProjectUpdate: Date | null = null

    try {
      // Buscar todos os projetos publicados
      projects = await prisma.project.findMany({
        where: {
          status: 'PUBLISHED',
        },
        select: {
          slug: true,
          updatedAt: true,
          createdAt: true,
          priorityHome: true,
        },
        orderBy: [
          { priorityHome: 'asc' },
          { updatedAt: 'desc' },
        ],
      })

      // Data da última atualização de projeto
      if (projects.length > 0) {
        lastProjectUpdate = projects[0].updatedAt
      }
    } catch (dbError) {
      // ⚠️ Se banco falhar, continuar com projetos vazios
      console.warn('[Sitemap] Erro ao buscar projetos, usando lista vazia:', dbError)
    }

    // Data atual para páginas fixas
    const now = new Date().toISOString().split('T')[0]

    // Gerar XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`

    // 1. Páginas fixas (todas as versões de idioma)
    for (const page of STATIC_PAGES) {
      for (const lang of LANGUAGES) {
        const url = `${SITE_URL}/${lang}${page.path ? `/${page.path}` : ''}`
        const lastmod = page.path === 'work' && lastProjectUpdate 
          ? lastProjectUpdate.toISOString().split('T')[0]
          : now

        xml += `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
`

        // hreflang tags
        for (const altLang of LANGUAGES) {
          const altUrl = `${SITE_URL}/${altLang}${page.path ? `/${page.path}` : ''}`
          const hreflang = altLang === 'pt' ? 'pt-BR' : altLang === 'en' ? 'en-US' : altLang === 'es' ? 'es-ES' : 'fr-FR'
          xml += `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${escapeXml(altUrl)}" />\n`
        }
        
        if (lang === 'en') {
          xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${SITE_URL}/en${page.path ? `/${page.path}` : ''}`)}" />\n`
        }

        xml += `  </url>
`
      }
    }

    // 2. Projetos (todas as versões de idioma)
    for (const project of projects) {
      for (const lang of LANGUAGES) {
        const url = `${SITE_URL}/${lang}/work/${project.slug}`
        const lastmod = project.updatedAt 
          ? project.updatedAt.toISOString().split('T')[0]
          : project.createdAt.toISOString().split('T')[0]
        
        // Prioridade baseada em priorityHome: slots 1–7 (0.6 a 0.9), outros 0.7
        const priority = project.priorityHome >= 1 && project.priorityHome <= 7
          ? Math.max(0.5, Math.min(0.9, 0.5 + (project.priorityHome / 7) * 0.4))
          : 0.7

        xml += `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority.toFixed(2)}</priority>
`

        // hreflang tags
        for (const altLang of LANGUAGES) {
          const altUrl = `${SITE_URL}/${altLang}/work/${project.slug}`
          const hreflang = altLang === 'pt' ? 'pt-BR' : altLang === 'en' ? 'en-US' : altLang === 'es' ? 'es-ES' : 'fr-FR'
          xml += `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${escapeXml(altUrl)}" />\n`
        }
        
        if (lang === 'en') {
          xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${SITE_URL}/en/work/${project.slug}`)}" />\n`
        }

        xml += `  </url>
`
      }
    }

    xml += `</urlset>`

    // Retornar XML com headers corretos
    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache por 1 hora
      },
    })
  } catch (error) {
    // ⚠️ NUNCA retornar erro - sempre retornar sitemap básico
    console.error('[Sitemap] Erro crítico, retornando sitemap básico:', error)
    
    // Sitemap básico de emergência (apenas home)
    const basicXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/pt</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>`

    return new NextResponse(basicXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    })
  }
}

// Helper: Escapar XML
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
