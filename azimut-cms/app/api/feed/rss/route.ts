/**
 * RSS Feed - Gera feed RSS 2.0 com últimos projetos publicados
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma'

const SITE_URL = 'https://azmt.com.br'
const FEED_TITLE = 'Azimut - Projetos e Notícias'
const FEED_DESCRIPTION = 'Últimos projetos de VR, AR, experiências imersivas e notícias da Azimut'

export async function GET(request: NextRequest) {
  try {
    // ⚠️ NUNCA quebrar se houver erro - sempre retornar RSS válido
    let projects: any[] = []

    try {
      // Buscar últimos 20 projetos publicados
      projects = await prisma.project.findMany({
        where: {
          status: 'PUBLISHED',
        },
        select: {
          slug: true,
          title: true,
          summaryPt: true,
          summaryEn: true,
          summaryEs: true,
          summaryFr: true,
          createdAt: true,
          updatedAt: true,
          heroImage: {
            select: {
              largeUrl: true,
              mediumUrl: true,
              originalUrl: true,
            },
          },
        },
        orderBy: {
          updatedAt: 'desc',
        },
        take: 20,
      })
    } catch (dbError) {
      // ⚠️ Se banco falhar, continuar com projetos vazios
      console.warn('[RSS Feed] Erro ao buscar projetos, usando lista vazia:', dbError)
    }

    // Data de atualização do feed (último projeto ou agora)
    const lastBuildDate = projects.length > 0 && projects[0].updatedAt
      ? new Date(projects[0].updatedAt).toUTCString()
      : new Date().toUTCString()

    // Gerar XML RSS 2.0
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <link>${SITE_URL}</link>
    <language>pt-BR</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <pubDate>${lastBuildDate}</pubDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <generator>Azimut CMS</generator>
`

    // Adicionar itens (projetos)
    for (const project of projects) {
      const title = project.title || 'Projeto Azimut'
      const description = project.summaryPt || project.summaryEn || project.summaryEs || project.summaryFr || 'Projeto da Azimut'
      const link = `${SITE_URL}/pt/work/${project.slug}`
      const pubDate = project.updatedAt 
        ? new Date(project.updatedAt).toUTCString()
        : project.createdAt
        ? new Date(project.createdAt).toUTCString()
        : new Date().toUTCString()
      
      // Imagem do projeto (se disponível)
      const imageUrl = project.heroImage?.largeUrl || 
                      project.heroImage?.mediumUrl || 
                      project.heroImage?.originalUrl || 
                      null

      xml += `    <item>
      <title>${escapeXml(title)}</title>
      <description>${escapeXml(description.substring(0, 500))}</description>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${pubDate}</pubDate>
`

      // Adicionar imagem se disponível
      if (imageUrl) {
        xml += `      <enclosure url="${escapeXml(imageUrl)}" type="image/jpeg" />
`
      }

      xml += `    </item>
`
    }

    xml += `  </channel>
</rss>`

    // Retornar XML com headers corretos
    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache por 1 hora
      },
    })
  } catch (error) {
    // ⚠️ NUNCA retornar erro - sempre retornar RSS básico
    console.error('[RSS Feed] Erro crítico, retornando RSS básico:', error)
    
    // RSS básico de emergência
    const basicXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <link>${SITE_URL}</link>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  </channel>
</rss>`

    return new NextResponse(basicXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
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
