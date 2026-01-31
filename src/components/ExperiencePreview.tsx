/**
 * Componente de "Degustação" - Preview Interativo
 * Mostra o que podemos fazer pelo cliente de forma empolgante
 * Foco: VR, NFT, Web3, Experiências Imersivas
 */

import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { type Lang } from '../i18n'
import { WalletConnect } from './WalletConnect'

interface PreviewOption {
  id: string
  title: string
  description: string
  icon: string
  category: 'vr' | 'nft' | 'web3' | 'immersive' | 'marketing'
  features: string[]
  examples: string[]
  cta: string
}

const previewOptions: PreviewOption[] = [
  {
    id: 'empathy-engine-game',
    title: 'Jogue o Empathy Engine',
    description: 'Ativação de marca no seu evento: estande em feira comercial, centro cultural, lançamento de produto, evento de divulgação, interno ou exposição. Quiosque com game, tecnologia e audiovisual integrados atraem visitantes ao seu estande e à sua página. Jogo por brief: monte propostas (XR, audiovisual, eventos) e veja o cliente reagir.',
    icon: '🎮',
    category: 'immersive',
    features: [
      'No seu evento: estande em feira comercial — game atrai visitantes ao stand',
      'Centro cultural, lançamento, evento de divulgação ou exposição — quiosque com game',
      'Tecnologia + audiovisual integrados; na sua página ou no seu evento',
      'Jogo por brief: XR/VR, Produção, Eventos. 4 fases de desafio',
    ],
    examples: [
      'Monte uma proposta de XR',
      'Crie um evento híbrido',
      'Proponha curso no Canadá',
      'Surpreenda o cliente com combos',
    ],
    cta: 'Jogar',
  },
  {
    id: 'vr-experience',
    title: 'Experiência VR Imersiva',
    description: 'Crie mundos virtuais que seus clientes nunca esquecerão',
    icon: '🥽',
    category: 'vr',
    features: [
      'Tour virtual 360° do seu projeto',
      'Interatividade em tempo real',
      'Multiplayer para equipes',
      'Integração com dispositivos VR',
      'Analytics de engajamento',
    ],
    examples: [
      'Museu virtual interativo',
      'Showroom de produtos em VR',
      'Treinamento imersivo',
      'Evento virtual com avatares',
    ],
    cta: 'Quero minha experiência VR',
  },
  {
    id: 'nft-collection',
    title: 'Coleção NFT Personalizada',
    description: 'NFTs únicos como certificados, badges, recompensas',
    icon: '🎨',
    category: 'nft',
    features: [
      'Design personalizado exclusivo',
      'Mint automático na Polygon',
      'Carteira digital integrada',
      'Marketplace próprio',
      'Gamificação com NFTs',
    ],
    examples: [
      'Certificados digitais de curso',
      'Badges de conquistas',
      'Acesso VIP a eventos',
      'Recompensas por engajamento',
    ],
    cta: 'Quero minha coleção NFT',
  },
  {
    id: 'web3-integration',
    title: 'Integração Web3 Completa',
    description: 'Blockchain, wallets, tokens e economia digital',
    icon: '⛓️',
    category: 'web3',
    features: [
      'Wallet Connect (MetaMask)',
      'Tokens personalizados',
      'Smart contracts Solidity',
      'Economia digital',
      'Pagamentos em crypto',
    ],
    examples: [
      'Sistema de recompensas com tokens',
      'Marketplace descentralizado',
      'Governança com DAO',
      'Loyalty program blockchain',
    ],
    cta: 'Quero integração Web3',
  },
  {
    id: 'immersive-marketing',
    title: 'Marketing Imersivo',
    description: 'Campanhas que envolvem e convertem',
    icon: '🚀',
    category: 'marketing',
    features: [
      'Experiências interativas',
      'Gamificação avançada',
      'Realidade aumentada (AR)',
      'Projeção mapping',
      'Analytics em tempo real',
    ],
    examples: [
      'Campanha AR para lançamento',
      'Game show interativo',
      'Instalação imersiva em evento',
      'Experiência viral nas redes',
    ],
    cta: 'Quero marketing imersivo',
  },
  {
    id: 'full-package',
    title: 'Pacote Completo VR + NFT + Web3',
    description: 'Tudo integrado: experiência imersiva com economia digital',
    icon: '🎯',
    category: 'immersive',
    features: [
      'Experiência VR completa',
      'Coleção NFT personalizada',
      'Integração Web3 total',
      'Marketing imersivo',
      'Analytics completo',
    ],
    examples: [
      'Museu VR com NFTs de arte',
      'Evento com economia digital',
      'Plataforma completa imersiva',
      'Ecossistema Web3 completo',
    ],
    cta: 'Quero o pacote completo',
  },
]

interface ExperiencePreviewProps {
  lang: Lang
}

export function ExperiencePreview({ lang }: ExperiencePreviewProps) {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [connectedWallet, setConnectedWallet] = useState<{ address: string; chainId: number; balance?: string } | null>(null)

  const selectedOption = previewOptions.find(o => o.id === selected)

  function formatAddress(address: string) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  function getChainName(chainId: number) {
    const chains: Record<number, string> = {
      1: 'Ethereum',
      137: 'Polygon',
      56: 'BSC',
      42161: 'Arbitrum',
      10: 'Optimism',
    }
    return chains[chainId] || `Chain ${chainId}`
  }

  return (
    <div style={{
      padding: '60px 20px',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
      minHeight: '100vh',
      position: 'relative',
    }}>
      {/* Indicador Fixo de Carteira Conectada - ABAIXO DO HEADER */}
      {connectedWallet && (
        <div style={{
          position: 'fixed',
          top: '80px', // Abaixo do header (header tem ~80px de altura)
          left: 0,
          right: 0,
          zIndex: 40, // Abaixo do header (header tem z-50)
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.95) 0%, rgba(16, 185, 129, 0.95) 100%)',
          backdropFilter: 'blur(10px)',
          borderBottom: '2px solid rgba(34, 197, 94, 0.5)',
          padding: '12px 20px',
          boxShadow: '0 4px 20px rgba(34, 197, 94, 0.3)',
        }}>
          <div style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: '#fff',
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                animation: 'pulse 2s ease-in-out infinite',
              }} />
              <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>
                ✅ Carteira Conectada
              </div>
              <div style={{
                padding: '4px 12px',
                borderRadius: 6,
                background: 'rgba(255, 255, 255, 0.2)',
                fontSize: 12,
                fontWeight: 600,
                color: '#fff',
                fontFamily: 'monospace',
              }}>
                {formatAddress(connectedWallet.address)}
              </div>
              <div style={{
                padding: '4px 10px',
                borderRadius: 6,
                background: 'rgba(255, 255, 255, 0.15)',
                fontSize: 11,
                color: '#fff',
                fontWeight: 500,
              }}>
                ⛓️ {getChainName(connectedWallet.chainId)}
              </div>
              {connectedWallet.balance && (
                <div style={{
                  padding: '4px 10px',
                  borderRadius: 6,
                  background: 'rgba(255, 255, 255, 0.15)',
                  fontSize: 11,
                  color: '#fff',
                  fontWeight: 500,
                }}>
                  💰 {connectedWallet.balance} {connectedWallet.chainId === 137 ? 'MATIC' : 'ETH'}
                </div>
              )}
            </div>
            <a
              href={connectedWallet.chainId === 137 
                ? `https://polygonscan.com/address/${connectedWallet.address}`
                : `https://etherscan.io/address/${connectedWallet.address}`
              }
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '6px 14px',
                borderRadius: 6,
                background: 'rgba(255, 255, 255, 0.2)',
                color: '#fff',
                fontSize: 12,
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
              }}
            >
              Ver no Explorer →
            </a>
          </div>
          <style>{`
            @keyframes pulse {
              0%, 100% { opacity: 0.8; transform: scale(1); }
              50% { opacity: 1; transform: scale(1.1); }
            }
          `}</style>
        </div>
      )}

      <div style={{ maxWidth: 1200, margin: '0 auto', paddingTop: connectedWallet ? '140px' : '80px' }}>
        {/* Hero Card Compacto - Estilo Home Banner */}
        <div style={{
          position: 'relative',
          borderRadius: 20,
          padding: 2,
          marginBottom: 48,
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.5) 0%, rgba(236, 72, 153, 0.3) 25%, rgba(59, 130, 246, 0.3) 50%, rgba(34, 197, 94, 0.2) 75%, rgba(168, 85, 247, 0.4) 100%)',
          boxShadow: '0 0 40px rgba(168, 85, 247, 0.15)',
        }}>
          <div style={{
            borderRadius: 18,
            padding: 'clamp(24px, 4vw, 36px)',
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.95) 100%)',
            backdropFilter: 'blur(16px)',
          }}>
            {/* Layout em 2 colunas no desktop */}
            <div style={{ display: 'flex', flexDirection: 'row', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
              
              {/* Coluna Esquerda - Conteúdo */}
              <div style={{ flex: '1 1 400px', minWidth: 280 }}>
                {/* Título com emoji e badge Web3 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 'clamp(32px, 4vw, 44px)' }}>🎁</span>
                  <h1 style={{
                    fontSize: 'clamp(24px, 3.5vw, 36px)',
                    fontWeight: 800,
                    letterSpacing: '-0.01em',
                    lineHeight: 1.1,
                    margin: 0,
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 30%, #22c55e 60%, #ec4899 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontFamily: '"Handel Gothic", "Syne", sans-serif',
                    textTransform: 'uppercase',
                  }}>
                    {lang === 'pt' ? 'Curadoria Imersiva' : lang === 'en' ? 'Immersive Curation' : lang === 'es' ? 'Curaduría Inmersiva' : 'Curation Immersive'}
                  </h1>
                  {/* Badge Web3 com ícone SVG */}
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.15) 100%)',
                    border: '2px solid rgba(139, 92, 246, 0.5)',
                    boxShadow: '0 0 16px rgba(139, 92, 246, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <img src="/web-3-icon.svg" alt="Web3" style={{ width: 28, height: 28 }} />
                  </div>
                </div>

                {/* Subtítulo com tecnologias */}
                <p style={{
                  fontSize: 'clamp(14px, 1.8vw, 18px)',
                  color: '#A78BFA',
                  fontWeight: 600,
                  margin: '0 0 16px 0',
                  letterSpacing: '0.02em',
                }}>
                  VR • AR • Web3 • {lang === 'pt' ? 'Colecionáveis (NFTs)' : 'Collectibles (NFTs)'}
                </p>

                {/* Texto curto */}
                <h2 style={{
                  fontSize: 'clamp(16px, 2vw, 20px)',
                  fontWeight: 600,
                  color: '#fff',
                  margin: '0 0 10px 0',
                }}>
                  {lang === 'pt' ? 'Tem um projeto? Vamos construir juntos.' : lang === 'en' ? 'Have a project? Let\'s build it together.' : lang === 'es' ? '¿Tienes un proyecto?' : 'Vous avez un projet?'}
                </h2>
                <p style={{
                  fontSize: 'clamp(13px, 1.4vw, 15px)',
                  color: '#9CA3AF',
                  lineHeight: 1.6,
                  margin: '0 0 16px 0',
                }}>
                  {lang === 'pt' 
                    ? 'Criamos experiências imersivas que param as pessoas—onde tecnologia encontra storytelling.'
                    : lang === 'en'
                    ? 'We craft immersive experiences that stop people in their tracks—where technology meets storytelling.'
                    : lang === 'es'
                    ? 'Creamos experiencias inmersivas que detienen a las personas—donde tecnología encuentra storytelling.'
                    : 'Nous créons des expériences immersives—où la technologie rencontre le storytelling.'}
                </p>

                {/* Tag de contexto */}
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 12px',
                  borderRadius: 16,
                  background: 'rgba(236, 72, 153, 0.12)',
                  border: '1px solid rgba(236, 72, 153, 0.25)',
                  fontSize: 12,
                  color: '#F472B6',
                }}>
                  🏛️ {lang === 'pt' ? 'Museus, festivais & ativações' : 'Museums, festivals & activations'}
                </span>
              </div>

              {/* Coluna Direita - CTAs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'stretch', minWidth: 220 }}>
                {/* CTA Principal - JOGAR AGORA */}
                <Link
                  to={`/${lang}/game`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    padding: '14px 24px',
                    borderRadius: 12,
                    background: 'linear-gradient(135deg, #10B981 0%, #059669 50%, #047857 100%)',
                    color: '#fff',
                    fontSize: 15,
                    fontWeight: 700,
                    textDecoration: 'none',
                    boxShadow: '0 6px 20px rgba(16, 185, 129, 0.35)',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'
                    e.currentTarget.style.boxShadow = '0 10px 28px rgba(16, 185, 129, 0.45)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)'
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.35)'
                  }}
                >
                  <span style={{ fontSize: 18 }}>🎮</span>
                  <span>{lang === 'pt' ? 'Jogar' : lang === 'en' ? 'Play' : lang === 'es' ? 'Jugar' : 'Jouer'}</span>
                  <img
                    src="/empaty-engine.png"
                    alt="Empathy Engine"
                    style={{ height: 22, width: 'auto', maxWidth: 140, objectFit: 'contain' }}
                  />
                  <span>→</span>
                </Link>

                {/* Info badge compacto */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  padding: '10px 16px',
                  borderRadius: 8,
                  background: 'rgba(251, 191, 36, 0.08)',
                  border: '1px solid rgba(251, 191, 36, 0.2)',
                }}>
                  <span style={{ fontSize: 12 }}>🔒</span>
                  <span style={{ fontSize: 11, color: '#FCD34D' }}>
                    {lang === 'pt' ? 'Grátis • sem cadastro' : 'Free • no signup'}
                  </span>
                </div>

                {/* CTA Secundário - Ver Cases */}
                <Link
                  to={`/${lang}/work`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    padding: '12px 20px',
                    borderRadius: 10,
                    background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 600,
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(220, 38, 38, 0.25)',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  {lang === 'pt' ? 'Ver Cases Imersivos' : 'See Immersive Cases'}
                  <span>→</span>
                </Link>

                {/* Link Solutions */}
                <Link
                  to={`/${lang}/solutions`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 4,
                    padding: '8px 12px',
                    color: '#9CA3AF',
                    fontSize: 13,
                    fontWeight: 500,
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}
                >
                  VR / AR / Web3 Solutions ›
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Cards de Opções - MELHOR ESPAÇAMENTO E LAYOUT */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 28,
          marginBottom: 60,
        }}>
          {previewOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => {
                // Se for o jogo, navegar para /{lang}/game
                if (option.id === 'empathy-engine-game') {
                  navigate(`/${lang}/game`)
                  return
                }
                setSelected(option.id)
                setShowDetails(true)
              }}
              style={{
                padding: 32,
                borderRadius: 16,
                background: option.id === 'empathy-engine-game'
                  ? 'linear-gradient(135deg, rgba(139, 35, 50, 0.4) 0%, rgba(107, 26, 38, 0.5) 100%)'
                  : selected === option.id
                    ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)'
                    : 'rgba(0,0,0,0.4)',
                border: option.id === 'empathy-engine-game'
                  ? '2px solid rgba(139, 35, 50, 0.7)'
                  : `2px solid ${selected === option.id ? 'rgba(34, 197, 94, 0.5)' : 'rgba(255,255,255,0.1)'}`,
                cursor: 'pointer',
                transition: 'all 0.3s',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: option.id === 'empathy-engine-game' ? '0 8px 32px rgba(139, 35, 50, 0.3)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (option.id === 'empathy-engine-game') {
                  e.currentTarget.style.borderColor = 'rgba(139, 35, 50, 1)'
                  e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)'
                  e.currentTarget.style.boxShadow = '0 16px 48px rgba(139, 35, 50, 0.5)'
                } else if (selected !== option.id) {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }
              }}
              onMouseLeave={(e) => {
                if (option.id === 'empathy-engine-game') {
                  e.currentTarget.style.borderColor = 'rgba(139, 35, 50, 0.7)'
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(139, 35, 50, 0.3)'
                } else if (selected !== option.id) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 16 }}>{option.icon}</div>
              <h3 style={{
                fontSize: 24,
                fontWeight: 700,
                color: '#fff',
                marginBottom: 12,
              }}>
                {option.title}
              </h3>
              <p style={{
                fontSize: 14,
                color: '#c0bccf',
                lineHeight: 1.6,
                marginBottom: 20,
              }}>
                {option.description}
              </p>
              <div style={{
                padding: '12px 20px',
                borderRadius: 8,
                background: option.id === 'empathy-engine-game'
                  ? 'rgba(139, 35, 50, 0.6)'
                  : selected === option.id
                    ? 'rgba(34, 197, 94, 0.3)'
                    : 'rgba(139, 92, 246, 0.2)',
                color: option.id === 'empathy-engine-game' ? '#fff' : selected === option.id ? '#86efac' : '#c4b5fd',
                fontSize: 14,
                fontWeight: 600,
                textAlign: 'center',
              }}>
                {option.id === 'empathy-engine-game'
                  ? (lang === 'pt' ? '🎮 Jogar →' : lang === 'en' ? '🎮 Play →' : lang === 'es' ? '🎮 Jugar →' : '🎮 Jouer →')
                  : selected === option.id ? '✓ Selecionado' : 'Ver Detalhes →'}
              </div>
            </div>
          ))}
        </div>

        {/* Detalhes Expandidos */}
        {showDetails && selectedOption && (
          <div style={{
            padding: 40,
            borderRadius: 20,
            background: 'rgba(0,0,0,0.6)',
            border: '2px solid rgba(139, 92, 246, 0.5)',
            marginBottom: 40,
            animation: 'fadeIn 0.3s',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                  <span style={{ fontSize: 64 }}>{selectedOption.icon}</span>
                  <div>
                    <h2 style={{
                      fontSize: 32,
                      fontWeight: 700,
                      color: '#fff',
                      marginBottom: 8,
                    }}>
                      {selectedOption.title}
                    </h2>
                    <p style={{ fontSize: 18, color: '#c0bccf' }}>
                      {selectedOption.description}
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowDetails(false)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                ✕ Fechar
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 32 }}>
              <div>
                <h3 style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: '#86efac',
                  marginBottom: 16,
                }}>
                  ✨ O Que Você Ganha:
                </h3>
                <ul style={{ margin: 0, paddingLeft: 20, color: '#c0bccf', fontSize: 16, lineHeight: 2 }}>
                  {selectedOption.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: '#93c5fd',
                  marginBottom: 16,
                }}>
                  🎯 Exemplos Reais:
                </h3>
                <ul style={{ margin: 0, paddingLeft: 20, color: '#c0bccf', fontSize: 16, lineHeight: 2 }}>
                  {selectedOption.examples.map((example, idx) => (
                    <li key={idx}>{example}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{
              padding: 24,
              borderRadius: 12,
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)',
              border: '1px solid rgba(34, 197, 94, 0.5)',
              textAlign: 'center',
            }}>
              <h3 style={{
                fontSize: 24,
                fontWeight: 700,
                color: '#fff',
                marginBottom: 16,
              }}>
                🚀 Pronto para Transformar Sua Ideia em Realidade?
              </h3>
              <p style={{
                fontSize: 16,
                color: '#c0bccf',
                marginBottom: 24,
              }}>
                Esta é apenas uma prévia. Imagine o que podemos criar juntos!
              </p>
              <a
                href={`/${lang}/contact?interest=${selectedOption.id}`}
                style={{
                  display: 'inline-block',
                  padding: '16px 32px',
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #22c55e 0%, #3b82f6 100%)',
                  color: '#fff',
                  fontSize: 18,
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 4px 20px rgba(34, 197, 94, 0.4)',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)'
                  e.currentTarget.style.boxShadow = '0 6px 30px rgba(34, 197, 94, 0.6)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(34, 197, 94, 0.4)'
                }}
              >
                {selectedOption.cta} →
              </a>
            </div>
          </div>
        )}

        {/* Seção de Conexão de Carteira - DESTACADA E BEM POSICIONADA */}
        <div style={{ 
          marginTop: 80,
          marginBottom: 60,
          padding: '40px',
          borderRadius: '20px',
          background: 'rgba(0, 0, 0, 0.3)',
          border: '2px solid rgba(139, 92, 246, 0.3)',
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: 32,
          }}>
            <h2 style={{
              fontSize: 'clamp(24px, 3vw, 32px)',
              fontWeight: 700,
              color: '#fff',
              marginBottom: 12,
              background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              🔗 Conecte Sua Carteira Web3
            </h2>
            <p style={{
              fontSize: 'clamp(14px, 1.8vw, 18px)',
              color: '#c0bccf',
              lineHeight: '1.6',
            }}>
              Conecte sua carteira para desbloquear NFTs exclusivos, tokens e recompensas especiais
            </p>
          </div>
          <WalletConnect
            lang={lang}
            onConnect={(wallet) => {
              console.log('Carteira conectada:', wallet)
              setConnectedWallet(wallet)
              // Salvar conexão via API (opcional - não bloqueia se falhar)
              try {
                const backofficeUrl = import.meta.env.VITE_CMS_API_URL || 'https://backoffice.azmt.com.br'
                fetch(`${backofficeUrl}/api/web3/wallet/connect`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    address: wallet.address,
                    chainId: wallet.chainId,
                  }),
                }).catch((err) => {
                  // Silencioso - não quebrar experiência se API falhar
                  console.warn('Erro ao salvar conexão de carteira (não crítico):', err)
                })
              } catch (err) {
                // Silencioso - não quebrar experiência
                console.warn('Erro ao conectar carteira (não crítico):', err)
              }
            }}
            onDisconnect={() => {
              console.log('Carteira desconectada')
              setConnectedWallet(null)
            }}
          />
        </div>

        {/* Call to Action Final */}
        <div style={{
          padding: 40,
          borderRadius: 20,
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
          border: '2px solid rgba(139, 92, 246, 0.5)',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontSize: 36,
            fontWeight: 700,
            color: '#fff',
            marginBottom: 16,
          }}>
            💎 Somos Únicos no Mercado
          </h2>
          <p style={{
            fontSize: 18,
            color: '#c0bccf',
            marginBottom: 24,
            lineHeight: 1.8,
          }}>
            Combinamos <strong style={{ color: '#86efac' }}>VR imersivo</strong>,{' '}
            <strong style={{ color: '#c4b5fd' }}>NFTs personalizados</strong>,{' '}
            <strong style={{ color: '#fde047' }}>Web3 integrado</strong> e{' '}
            <strong style={{ color: '#fca5a5' }}>marketing que converte</strong>.
            <br />
            <strong style={{ color: '#fff' }}>Somos empáticos, simpáticos e parceiros para cooperação e coprodução.</strong>
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={`/${lang}/contact?interest=vr-nft-web3`}
              style={{
                padding: '16px 32px',
                borderRadius: 12,
                background: 'rgba(34, 197, 94, 0.2)',
                border: '2px solid rgba(34, 197, 94, 0.5)',
                color: '#86efac',
                fontSize: 16,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              🎯 Quero Fechar Negócio
            </a>
            <a
              href={`/${lang}/work`}
              style={{
                padding: '16px 32px',
                borderRadius: 12,
                background: 'rgba(59, 130, 246, 0.2)',
                border: '2px solid rgba(59, 130, 246, 0.5)',
                color: '#93c5fd',
                fontSize: 16,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              👀 Ver Projetos Reais
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
