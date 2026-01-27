/**
 * API para Gerar Preview Personalizado
 * Cria uma "degustação" personalizada baseada no interesse do cliente
 */

import { NextRequest, NextResponse } from 'next/server'

interface PreviewRequest {
  interest: 'vr' | 'nft' | 'web3' | 'immersive' | 'marketing' | 'all'
  name?: string
  email?: string
  company?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: PreviewRequest = await request.json()
    const { interest = 'all', name, email, company } = body

    // Gerar preview personalizado baseado no interesse
    const previews = {
      vr: {
        title: 'Experiência VR Personalizada para Você',
        description: 'Criamos uma experiência VR única que mostra o potencial do seu projeto',
        features: [
          'Tour virtual 360° interativo',
          'Prototipo em 48h',
          'Demo personalizada',
          'Análise de engajamento',
        ],
        examples: [
          'Museu virtual com suas obras',
          'Showroom de produtos em VR',
          'Evento virtual imersivo',
        ],
        cta: 'Quero minha demo VR',
      },
      nft: {
        title: 'Coleção NFT Exclusiva',
        description: 'NFTs personalizados que geram valor e engajamento',
        features: [
          'Design exclusivo',
          'Smart contract na Polygon',
          'Marketplace integrado',
          'Gamificação completa',
        ],
        examples: [
          'Certificados digitais',
          'Badges de conquistas',
          'Acesso VIP',
        ],
        cta: 'Quero minha coleção NFT',
      },
      web3: {
        title: 'Integração Web3 Completa',
        description: 'Economia digital com blockchain, tokens e wallets',
        features: [
          'Wallet Connect',
          'Tokens personalizados',
          'Smart contracts',
          'Economia digital',
        ],
        examples: [
          'Sistema de recompensas',
          'Marketplace descentralizado',
          'Loyalty program',
        ],
        cta: 'Quero integração Web3',
      },
      immersive: {
        title: 'Experiência Imersiva Completa',
        description: 'VR + NFT + Web3 integrados em uma experiência única',
        features: [
          'Experiência VR completa',
          'NFTs como recompensas',
          'Economia Web3',
          'Marketing imersivo',
        ],
        examples: [
          'Museu VR com NFTs',
          'Evento com economia digital',
          'Plataforma completa',
        ],
        cta: 'Quero experiência completa',
      },
      marketing: {
        title: 'Marketing que Converte',
        description: 'Campanhas imersivas que geram resultados',
        features: [
          'AR interativo',
          'Gamificação',
          'Analytics em tempo real',
          'Conversão otimizada',
        ],
        examples: [
          'Campanha AR viral',
          'Game show interativo',
          'Instalação imersiva',
        ],
        cta: 'Quero campanha imersiva',
      },
      all: {
        title: 'Pacote Completo: VR + NFT + Web3',
        description: 'Tudo que você precisa para se destacar no mercado',
        features: [
          'Experiência VR completa',
          'Coleção NFT personalizada',
          'Integração Web3 total',
          'Marketing imersivo',
          'Analytics completo',
        ],
        examples: [
          'Ecossistema completo imersivo',
          'Plataforma Web3 integrada',
          'Experiência única no mercado',
        ],
        cta: 'Quero o pacote completo',
      },
    }

    const preview = previews[interest]

    // Se tiver email, salvar lead
    if (email) {
      try {
        const { prisma } = await import('@/src/lib/prisma')
        await prisma.lead.create({
          data: {
            name: name || 'Interessado em Preview',
            email: email,
            company: company || null,
            leadType: 'PREVIEW_INTEREST',
            status: 'NEW',
            priority: 'HIGH',
            leadScore: 70, // Lead quente (interessado em preview)
            projectType: interest === 'all' ? 'full-package' : interest,
            leadIntelligence: {
              source: 'experience_preview',
              interest: interest,
              viewedPreview: true,
              timestamp: new Date().toISOString(),
            } as any,
          },
        })
      } catch (dbError) {
        console.error('Erro ao salvar lead:', dbError)
        // Não falhar se banco der erro
      }
    }

    return NextResponse.json({
      success: true,
      preview,
      personalized: {
        name: name || 'Cliente',
        message: `Olá ${name || 'Cliente'}! Vamos criar algo incrível juntos.`,
      },
    })
  } catch (error: any) {
    console.error('[Marketing Preview] Erro:', error)
    return NextResponse.json(
      {
        error: 'Erro ao gerar preview',
        message: error.message || 'Erro desconhecido',
      },
      { status: 500 }
    )
  }
}
