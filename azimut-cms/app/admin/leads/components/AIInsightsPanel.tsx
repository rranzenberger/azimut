'use client';

import { useState, useEffect } from 'react';

interface AIInsights {
  summary: string;
  conversionProbability: number;
  estimatedValue: string;
  urgency: string;
  recommendedActions: Array<{
    action: string;
    reason: string;
    priority: string;
  }>;
  suggestedStatus: string;
  suggestedPriority: string;
  risks: string[];
  opportunities: string[];
  nextBestAction: string;
  timing: string;
  personalizedMessage: string;
  emailSubject: string;
  aiEnabled?: boolean;
  fallback?: boolean;
  leadScore?: number;
  conversionScore?: number;
  visitorType?: string | null;
  hoursSinceCreation?: number;
  hasBeenContacted?: boolean;
}

export function AIInsightsPanel({
  leadId,
  leadScore,
  conversionScore,
}: {
  leadId: string;
  leadScore: number;
  conversionScore: number | null;
}) {
  const [insights, setInsights] = useState<AIInsights | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInsights();
  }, [leadId]);

  const fetchInsights = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/leads/${leadId}/ai-insights`);
      if (!res.ok) throw new Error('Failed to fetch insights');
      const data = await res.json();
      setInsights(data);
    } catch (err: any) {
      setError(err.message);
      // Fallback básico
      setInsights({
        summary: `Lead com score ${leadScore || conversionScore || 0}/100`,
        conversionProbability: leadScore || conversionScore || 0,
        estimatedValue: 'Não estimado',
        urgency: leadScore >= 80 ? 'ALTA' : leadScore >= 60 ? 'MÉDIA' : 'BAIXA',
        recommendedActions: [],
        suggestedStatus: 'NEW',
        suggestedPriority: 'MEDIUM',
        risks: [],
        opportunities: [],
        nextBestAction: leadScore >= 70 ? 'Contatar o lead urgentemente' : 'Aguardar mais informações',
        timing: 'Hoje',
        personalizedMessage: '',
        emailSubject: '',
        fallback: true,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16,
          padding: 24,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ fontSize: 24 }}>🤖</span>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Análise IA</h3>
        </div>
        <div style={{ color: '#9f9bb0', fontSize: 14 }}>Analisando lead com DeepSeek AI...</div>
      </div>
    );
  }

  if (error && !insights) {
    return (
      <div
        style={{
          background: 'rgba(201,35,55,0.1)',
          border: '1px solid rgba(201,35,55,0.3)',
          borderRadius: 16,
          padding: 24,
        }}
      >
        <div style={{ color: '#fca5a5', fontSize: 14 }}>
          Erro ao carregar insights.{' '}
          <button
            onClick={fetchInsights}
            style={{
              textDecoration: 'underline',
              background: 'none',
              border: 'none',
              color: '#fca5a5',
              cursor: 'pointer',
            }}
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  if (!insights) return null;

  const getUrgencyColor = (urgency: string) => {
    if (urgency === 'ALTA')
      return {
        bg: 'rgba(201,35,55,0.15)',
        border: 'rgba(201,35,55,0.35)',
        text: '#fca5a5',
      };
    if (urgency === 'MÉDIA')
      return {
        bg: 'rgba(251,191,36,0.15)',
        border: 'rgba(251,191,36,0.35)',
        text: '#fde047',
      };
    return {
      bg: 'rgba(156,163,175,0.15)',
      border: 'rgba(156,163,175,0.35)',
      text: '#d1d5db',
    };
  };

  const urgencyStyle = getUrgencyColor(insights.urgency);

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 16,
        padding: 24,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 24 }}>🤖</span>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>
            {insights.aiEnabled ? 'Análise IA (DeepSeek)' : 'Análise Inteligente'}
          </h3>
          {insights.fallback && (
            <span
              style={{
                fontSize: 11,
                color: '#9f9bb0',
                padding: '2px 8px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 4,
              }}
            >
              (Modo básico)
            </span>
          )}
        </div>
        <button
          onClick={fetchInsights}
          style={{
            padding: '6px 12px',
            borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.05)',
            color: '#fff',
            fontSize: 12,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
          }}
        >
          🔄 Atualizar
        </button>
      </div>

      {/* Summary */}
      <div
        style={{
          marginBottom: 20,
          padding: 16,
          background: 'rgba(255,255,255,0.02)',
          borderRadius: 12,
        }}
      >
        <div style={{ color: '#d3cec3', fontSize: 14, lineHeight: 1.6 }}>{insights.summary}</div>
      </div>

      {/* Metrics */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            padding: 12,
            background: 'rgba(255,255,255,0.02)',
            borderRadius: 8,
          }}
        >
          <div
            style={{
              color: '#9f9bb0',
              fontSize: 11,
              textTransform: 'uppercase',
              marginBottom: 4,
            }}
          >
            Probabilidade Conversão
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>
            {insights.conversionProbability}%
          </div>
        </div>
        <div
          style={{
            padding: 12,
            background: 'rgba(255,255,255,0.02)',
            borderRadius: 8,
          }}
        >
          <div
            style={{
              color: '#9f9bb0',
              fontSize: 11,
              textTransform: 'uppercase',
              marginBottom: 4,
            }}
          >
            Valor Estimado
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#86efac' }}>
            {insights.estimatedValue}
          </div>
        </div>
      </div>

      {/* Urgency Badge */}
      <div
        style={{
          padding: '8px 12px',
          borderRadius: 8,
          background: urgencyStyle.bg,
          border: `1px solid ${urgencyStyle.border}`,
          color: urgencyStyle.text,
          fontSize: 12,
          fontWeight: 600,
          marginBottom: 20,
          display: 'inline-block',
        }}
      >
        ⚡ Urgência: {insights.urgency}
      </div>

      {/* Next Best Action */}
      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            color: '#9f9bb0',
            fontSize: 12,
            textTransform: 'uppercase',
            marginBottom: 8,
          }}
        >
          Próxima Ação Recomendada
        </div>
        <div
          style={{
            padding: 16,
            background: 'rgba(201,35,55,0.1)',
            border: '1px solid rgba(201,35,55,0.3)',
            borderRadius: 12,
          }}
        >
          <div style={{ color: '#fff', fontSize: 16, fontWeight: 600, marginBottom: 4 }}>
            {insights.nextBestAction}
          </div>
          <div style={{ color: '#d3cec3', fontSize: 13 }}>⏰ {insights.timing}</div>
        </div>
      </div>

      {/* Recommended Actions */}
      {insights.recommendedActions.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              color: '#9f9bb0',
              fontSize: 12,
              textTransform: 'uppercase',
              marginBottom: 8,
            }}
          >
            Ações Recomendadas
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            {insights.recommendedActions.map((action, idx) => (
              <div
                key={idx}
                style={{
                  padding: 12,
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: 8,
                }}
              >
                <div style={{ color: '#fff', fontSize: 14, fontWeight: 600, marginBottom: 4 }}>
                  {action.action}
                </div>
                <div style={{ color: '#9f9bb0', fontSize: 12 }}>{action.reason}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Opportunities */}
      {insights.opportunities.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              color: '#9f9bb0',
              fontSize: 12,
              textTransform: 'uppercase',
              marginBottom: 8,
            }}
          >
            Oportunidades
          </div>
          <ul
            style={{
              margin: 0,
              paddingLeft: 20,
              color: '#86efac',
              fontSize: 13,
            }}
          >
            {insights.opportunities.map((opp, idx) => (
              <li key={idx} style={{ marginBottom: 4 }}>
                {opp}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Risks */}
      {insights.risks.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              color: '#9f9bb0',
              fontSize: 12,
              textTransform: 'uppercase',
              marginBottom: 8,
            }}
          >
            Riscos
          </div>
          <ul
            style={{
              margin: 0,
              paddingLeft: 20,
              color: '#fca5a5',
              fontSize: 13,
            }}
          >
            {insights.risks.map((risk, idx) => (
              <li key={idx} style={{ marginBottom: 4 }}>
                {risk}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Personalized Message */}
      {insights.personalizedMessage && (
        <div
          style={{
            marginTop: 20,
            padding: 16,
            background: 'rgba(59,130,246,0.1)',
            border: '1px solid rgba(59,130,246,0.3)',
            borderRadius: 12,
          }}
        >
          <div
            style={{
              color: '#9f9bb0',
              fontSize: 12,
              textTransform: 'uppercase',
              marginBottom: 8,
            }}
          >
            Mensagem Personalizada (IA)
          </div>
          <div
            style={{
              color: '#d3cec3',
              fontSize: 13,
              lineHeight: 1.6,
              marginBottom: 8,
              whiteSpace: 'pre-wrap',
            }}
          >
            {insights.personalizedMessage}
          </div>
          {insights.emailSubject && (
            <div style={{ color: '#93c5fd', fontSize: 12, fontStyle: 'italic' }}>
              Assunto sugerido: "{insights.emailSubject}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
