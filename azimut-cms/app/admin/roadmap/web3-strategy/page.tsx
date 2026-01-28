/**
 * Estratégia Web3/NFT Detalhada
 * Plano completo de implementação com foco em gamificação para alunos
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'

const phases = [
  {
    id: 'fase1',
    title: 'FASE 1: Gamificação Básica',
    duration: '1-2 semanas',
    priority: '🔴 ALTA',
    status: 'planned',
    features: [
      {
        title: 'Sistema de Pontuação',
        description: 'Usuário ganha pontos por ações no site',
        points: [
          'Visitar página de curso: +10 pontos',
          'Assistir vídeo completo: +50 pontos',
          'Preencher formulário: +100 pontos',
          'Compartilhar projeto: +25 pontos',
          'Completar quiz: +75 pontos',
          'Ficar 5+ minutos: +30 pontos',
        ],
      },
      {
        title: 'Dashboard de Progresso',
        description: 'Visualização de pontos, níveis e conquistas',
        points: [
          'Barra de progresso visual',
          'Níveis: Iniciante → Explorador → Mestre → Lenda',
          'Badges por conquistas',
          'Leaderboard (opcional)',
        ],
      },
    ],
  },
  {
    id: 'fase2',
    title: 'FASE 2: Integração Web3',
    duration: '2 semanas',
    priority: '🟠 ALTA',
    status: 'planned',
    dependencies: ['Fase 1'],
    features: [
      {
        title: 'Wallet Connect',
        description: 'Conectar carteiras digitais',
        points: [
          'MetaMask/WalletConnect',
          'Verificar se já tem carteira',
          'Criar carteira simples (opcional)',
          'Salvar endereço no perfil',
        ],
      },
      {
        title: 'Sistema de Recompensas',
        description: 'NFT desbloqueado ao atingir X pontos',
        points: [
          'Ao atingir meta → NFT desbloqueado',
          'NFT aparece como "pronto para claim"',
          'Usuário conecta carteira',
          'NFT é mintado e enviado',
        ],
      },
    ],
  },
  {
    id: 'fase3',
    title: 'FASE 3: NFTs Personalizados',
    duration: '1 semana',
    priority: '🟡 MÉDIA',
    status: 'planned',
    dependencies: ['Fase 2'],
    features: [
      {
        title: 'Tipos de NFTs',
        description: 'Diferentes NFTs por conquista',
        points: [
          'NFT de Exploração (100 pontos) - "Explorador Azimut"',
          'NFT de Curso (500 pontos) - "Estudante [Curso]"',
          'NFT de Conquista (1000 pontos) - "Mestre Imersivo"',
          'NFT Especial (Eventos) - "Participante Game Show"',
        ],
      },
      {
        title: 'Personalização',
        description: 'NFTs únicos para cada usuário',
        points: [
          'Nome do aluno no NFT',
          'Data de conquista',
          'Raridade baseada em ações',
          'Visual único por tipo',
        ],
      },
    ],
  },
  {
    id: 'fase4',
    title: 'FASE 4: Game Show e Eventos',
    duration: '2 semanas',
    priority: '🟡 MÉDIA',
    status: 'planned',
    dependencies: ['Fase 3'],
    features: [
      {
        title: 'Game Show Interativo',
        description: 'Quiz ao vivo durante eventos',
        points: [
          'Quiz aparece na tela',
          'Participantes respondem no site',
          'Pontos em tempo real',
          'Leaderboard ao vivo',
        ],
      },
      {
        title: 'Recompensas Especiais',
        description: 'NFTs exclusivos para eventos',
        points: [
          'Top 1: NFT "Campeão Game Show" (único)',
          'Top 2-5: NFT "Finalista" (raro)',
          'Top 6-10: NFT "Participante" (comum)',
          'Todos: +200 pontos',
        ],
      },
    ],
  },
]

const pointSystem = [
  { action: 'Visitar homepage', points: 5, frequency: 'Diária' },
  { action: 'Visitar página de curso', points: 10, frequency: 'Diária' },
  { action: 'Assistir vídeo (50%+)', points: 30, frequency: 'Por vídeo' },
  { action: 'Assistir vídeo completo', points: 50, frequency: 'Por vídeo' },
  { action: 'Preencher formulário interesse', points: 100, frequency: 'Única' },
  { action: 'Compartilhar projeto', points: 25, frequency: 'Por compartilhamento' },
  { action: 'Completar quiz', points: 75, frequency: 'Por quiz' },
  { action: 'Ficar 5+ minutos', points: 30, frequency: 'Por sessão' },
  { action: 'Ficar 10+ minutos', points: 50, frequency: 'Por sessão' },
  { action: 'Visitar 5+ páginas', points: 40, frequency: 'Por sessão' },
  { action: 'Retornar ao site (2ª visita)', points: 20, frequency: 'Única' },
  { action: 'Retornar ao site (3ª+ visita)', points: 30, frequency: 'Por visita' },
  { action: 'Agendar call', points: 150, frequency: 'Única' },
  { action: 'Se inscrever em curso', points: 500, frequency: 'Única' },
]

const levels = [
  { level: '🌱 Iniciante', points: '0-99', nft: 'Nenhum' },
  { level: '🎯 Explorador', points: '100-299', nft: 'NFT "Explorador Azimut"' },
  { level: '🎓 Estudante', points: '300-499', nft: 'NFT "Estudante [Curso]"' },
  { level: '⭐ Mestre', points: '500-999', nft: 'NFT "Mestre Imersivo"' },
  { level: '👑 Lenda', points: '1000+', nft: 'NFT "Lenda Azimut" (raro)' },
]

export default function Web3StrategyPage() {
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null)

  return (
    <div style={{ width: '100%', maxWidth: 1400 }}>
      <header style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
              🎮 Estratégia Web3/NFT - Gamificação
            </h1>
            <p style={{ margin: 0, color: '#c0bccf', fontSize: 16 }}>
              Plano completo para engajar alunos com NFTs personalizados
            </p>
          </div>
          <Link
            href="/admin/roadmap"
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.05)',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            ← Voltar ao Roadmap
          </Link>
        </div>
      </header>

      {/* Objetivo Principal */}
      <div style={{
        padding: 24,
        borderRadius: 12,
        background: 'rgba(139, 92, 246, 0.1)',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        marginBottom: 32,
      }}>
        <h2 style={{ margin: '0 0 12px 0', fontSize: 20, fontWeight: 600, color: '#c4b5fd' }}>
          🎯 Objetivo Principal
        </h2>
        <p style={{ margin: 0, color: '#c0bccf', fontSize: 16, lineHeight: 1.6 }}>
          <strong>Engajar alunos e visitantes através de gamificação, recompensando com NFTs personalizados por ações no site.</strong>
          <br />
          Foco especial em cursos Online e Vancouver, com sistema de pontuação que leva a NFTs únicos.
        </p>
      </div>

      {/* Fases de Implementação */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16, color: '#fff' }}>
          📋 Fases de Implementação
        </h2>
        <div style={{ display: 'grid', gap: 20 }}>
          {phases.map((phase) => (
            <div
              key={phase.id}
              style={{
                padding: 24,
                borderRadius: 12,
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: '#fff' }}>
                      {phase.title}
                    </h3>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 600,
                      background: phase.priority.includes('ALTA') 
                        ? 'rgba(239, 68, 68, 0.2)' 
                        : 'rgba(251, 191, 36, 0.2)',
                      color: phase.priority.includes('ALTA') ? '#ef4444' : '#fbbf24',
                    }}>
                      {phase.priority}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
                    <span style={{ fontSize: 14, color: '#8f8ba2' }}>
                      ⏱️ {phase.duration}
                    </span>
                    {phase.dependencies && (
                      <span style={{ fontSize: 14, color: '#93c5fd' }}>
                        ⚠️ Depende de: {phase.dependencies.join(', ')}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gap: 16, marginTop: 16 }}>
                {phase.features.map((feature, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: 16,
                      borderRadius: 8,
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    <h4 style={{ margin: '0 0 8px 0', fontSize: 16, fontWeight: 600, color: '#fff' }}>
                      {feature.title}
                    </h4>
                    <p style={{ margin: '0 0 12px 0', color: '#c0bccf', fontSize: 14 }}>
                      {feature.description}
                    </p>
                    <ul style={{ margin: 0, paddingLeft: 20, color: '#c0bccf', fontSize: 13 }}>
                      {feature.points.map((point, pIdx) => (
                        <li key={pIdx} style={{ marginBottom: 4 }}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sistema de Pontuação */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16, color: '#fff' }}>
          💰 Sistema de Pontuação Detalhado
        </h2>
        <div style={{
          padding: 24,
          borderRadius: 12,
          background: 'rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#c0bccf', fontSize: 14, fontWeight: 600 }}>
                    Ação
                  </th>
                  <th style={{ padding: '12px', textAlign: 'center', color: '#c0bccf', fontSize: 14, fontWeight: 600 }}>
                    Pontos
                  </th>
                  <th style={{ padding: '12px', textAlign: 'center', color: '#c0bccf', fontSize: 14, fontWeight: 600 }}>
                    Frequência
                  </th>
                </tr>
              </thead>
              <tbody>
                {pointSystem.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '12px', color: '#fff', fontSize: 14 }}>
                      {item.action}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center', color: '#22c55e', fontSize: 14, fontWeight: 600 }}>
                      +{item.points}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center', color: '#c0bccf', fontSize: 13 }}>
                      {item.frequency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Níveis e Recompensas */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16, color: '#fff' }}>
          🏆 Níveis e Recompensas
        </h2>
        <div style={{ display: 'grid', gap: 12 }}>
          {levels.map((level, idx) => (
            <div
              key={idx}
              style={{
                padding: 20,
                borderRadius: 12,
                background: idx === 0 
                  ? 'rgba(0,0,0,0.3)' 
                  : idx === levels.length - 1
                  ? 'rgba(251, 191, 36, 0.1)'
                  : 'rgba(139, 92, 246, 0.05)',
                border: `1px solid ${
                  idx === 0 
                    ? 'rgba(255,255,255,0.1)' 
                    : idx === levels.length - 1
                    ? 'rgba(251, 191, 36, 0.3)'
                    : 'rgba(139, 92, 246, 0.2)'
                }`,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 24, marginBottom: 4 }}>{level.level}</div>
                  <div style={{ fontSize: 14, color: '#c0bccf' }}>
                    {level.points} pontos
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 14, color: '#86efac', fontWeight: 600 }}>
                    {level.nft}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Foco: Cursos Online vs Vancouver */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16, color: '#fff' }}>
          🎓 Estratégia: Cursos Online vs Vancouver
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{
            padding: 24,
            borderRadius: 12,
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
          }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: 18, fontWeight: 600, color: '#93c5fd' }}>
              📱 Cursos Online
            </h3>
            <ul style={{ margin: 0, paddingLeft: 20, color: '#c0bccf', fontSize: 14 }}>
              <li>NFT "Estudante Online" (mais fácil)</li>
              <li>Foco: assistir aulas, completar módulos</li>
              <li>Pontos: 300 para NFT básico</li>
              <li>Recompensas mais frequentes</li>
            </ul>
          </div>
          
          <div style={{
            padding: 24,
            borderRadius: 12,
            background: 'rgba(251, 191, 36, 0.1)',
            border: '1px solid rgba(251, 191, 36, 0.3)',
          }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: 18, fontWeight: 600, color: '#fde047' }}>
              🏫 Cursos Vancouver
            </h3>
            <ul style={{ margin: 0, paddingLeft: 20, color: '#c0bccf', fontSize: 14 }}>
              <li>NFT "Explorador Vancouver" (mais raro)</li>
              <li>Foco: interesse, formulário, agendamento</li>
              <li>Pontos: 500 para NFT básico</li>
              <li>NFT especial para inscritos: "Futuro Estudante VFS/VanArts"</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Game Neurolinguístico */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16, color: '#fff' }}>
          🧠 Game Neurolinguístico para Qualificação
        </h2>
        <div style={{
          padding: 24,
          borderRadius: 12,
          background: 'rgba(139, 92, 246, 0.1)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
        }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: 18, fontWeight: 600, color: '#c4b5fd' }}>
            Sistema que identifica: Quente/Frio, Sério/Brincadeira, Intenção Real
          </h3>
          <p style={{ margin: '0 0 16px 0', color: '#c0bccf', fontSize: 14, lineHeight: 1.6 }}>
            Game interativo que usa neurolinguística para qualificar leads automaticamente.
            Analisa padrões comportamentais (Visual/Auditivo/Cinestésico) e identifica se é lead quente ou apenas explorando.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
            <div>
              <h4 style={{ margin: '0 0 8px 0', fontSize: 14, fontWeight: 600, color: '#fff' }}>
                O que identifica:
              </h4>
              <ul style={{ margin: 0, paddingLeft: 20, color: '#c0bccf', fontSize: 13 }}>
                <li>Lead Quente vs Frio</li>
                <li>Sério vs Brincadeira</li>
                <li>Intenção: Cooperação, Coprodução, Curso</li>
                <li>Perfil comportamental</li>
                <li>Abordagem empática ideal</li>
              </ul>
            </div>
            <div>
              <h4 style={{ margin: '0 0 8px 0', fontSize: 14, fontWeight: 600, color: '#fff' }}>
                Recompensa:
              </h4>
              <ul style={{ margin: 0, paddingLeft: 20, color: '#c0bccf', fontSize: 13 }}>
                <li>NFT como "prova/gostinho"</li>
                <li>Personalizado por resultado</li>
                <li>Memorável e compartilhável</li>
                <li>Valor emocional</li>
              </ul>
            </div>
          </div>
          <div style={{ marginTop: 16, padding: 12, borderRadius: 8, background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
            <div style={{ fontSize: 12, color: '#93c5fd' }}>
              <strong>API criada:</strong> <code>/api/game/neurolinguistic</code>
              <br />
              <strong>Documentação:</strong> <code>docs/GAME_NEUROLINGUISTICO_LEADS.md</code>
            </div>
          </div>
        </div>
      </section>

      {/* Tecnologia: Solidity vs Rust */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16, color: '#fff' }}>
          💻 Tecnologia: Solidity vs Rust
        </h2>
        <div style={{
          padding: 24,
          borderRadius: 12,
          background: 'rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{
              padding: 20,
              borderRadius: 8,
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
            }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: 18, fontWeight: 600, color: '#86efac' }}>
                ✅ SOLIDITY + POLYGON (Recomendado)
              </h3>
              <ul style={{ margin: 0, paddingLeft: 20, color: '#c0bccf', fontSize: 14 }}>
                <li>Mais fácil de aprender</li>
                <li>Ecossistema maior</li>
                <li>MetaMask compatível</li>
                <li>Custo baixo (~$0.01/NFT)</li>
                <li>Implementação rápida (1-2 semanas)</li>
              </ul>
            </div>
            
            <div style={{
              padding: 20,
              borderRadius: 8,
              background: 'rgba(251, 191, 36, 0.1)',
              border: '1px solid rgba(251, 191, 36, 0.3)',
            }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: 18, fontWeight: 600, color: '#fde047' }}>
                ⚠️ RUST + SOLANA (Alternativa)
              </h3>
              <ul style={{ margin: 0, paddingLeft: 20, color: '#c0bccf', fontSize: 14 }}>
                <li>Mais rápido e barato</li>
                <li>Mais complexo</li>
                <li>Ecossistema menor</li>
                <li>Menos carteiras</li>
                <li>Implementação mais longa (3-4 semanas)</li>
              </ul>
            </div>
          </div>
          <div style={{ marginTop: 16, padding: 16, borderRadius: 8, background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 18, color: '#86efac', fontWeight: 700, marginBottom: 8 }}>
                  ✅ DECISÃO FINAL: SOLIDITY + POLYGON
                </div>
                <div style={{ fontSize: 14, color: '#c0bccf', marginBottom: 12, lineHeight: 1.6 }}>
                  <strong>Análise completa realizada:</strong> Solidity ganha com score 4.85/5.0
                  <br />
                  Melhor equilíbrio entre facilidade, compatibilidade, ecossistema e custo.
                </div>
                <div style={{ fontSize: 12, color: '#8f8ba2', padding: 12, borderRadius: 6, background: 'rgba(0,0,0,0.2)' }}>
                  <strong>⚠️ Outras opções analisadas:</strong>
                  <ul style={{ margin: '8px 0 0 0', paddingLeft: 20 }}>
                    <li>Rust: Score 3.15/5 - Muito complexo, só vale se escala &gt;50k NFTs</li>
                    <li>Vyper: Score 3.65/5 - Ecossistema muito pequeno</li>
                  </ul>
                </div>
              </div>
              <Link
                href="/admin/roadmap/web3-strategy/linguagem-decisao"
                style={{
                  padding: '10px 20px',
                  borderRadius: 8,
                  border: '1px solid rgba(34, 197, 94, 0.5)',
                  background: 'rgba(34, 197, 94, 0.2)',
                  color: '#86efac',
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                Ver Análise Completa →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Fluxo Completo */}
      <section>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16, color: '#fff' }}>
          🔄 Fluxo Completo do Usuário
        </h2>
        <div style={{
          padding: 24,
          borderRadius: 12,
          background: 'rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          <div style={{ display: 'grid', gap: 16 }}>
            {[
              { step: 1, title: 'Usuário entra no site', desc: 'Sistema cria perfil anônimo, começa a acumular pontos' },
              { step: 2, title: 'Usuário faz ações', desc: 'Pontos adicionados automaticamente, barra atualiza, notificações' },
              { step: 3, title: 'Usuário atinge meta', desc: 'Notificação: "🎉 Você desbloqueou um NFT!", botão para reivindicar' },
              { step: 4, title: 'Usuário conecta carteira', desc: 'MetaMask/WalletConnect abre, usuário aprova, endereço salvo' },
              { step: 5, title: 'NFT é mintado', desc: 'Smart contract cria NFT, envia para carteira, confirmação visual' },
              { step: 6, title: 'Usuário vê NFT', desc: 'Link para OpenSea/Rarible, mostrar na galeria, compartilhar' },
            ].map((item) => (
              <div
                key={item.step}
                style={{
                  display: 'flex',
                  gap: 16,
                  padding: 16,
                  borderRadius: 8,
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'rgba(139, 92, 246, 0.2)',
                  border: '1px solid rgba(139, 92, 246, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#c4b5fd',
                  flexShrink: 0,
                }}>
                  {item.step}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: 16, fontWeight: 600, color: '#fff' }}>
                    {item.title}
                  </h4>
                  <p style={{ margin: 0, color: '#c0bccf', fontSize: 14 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
