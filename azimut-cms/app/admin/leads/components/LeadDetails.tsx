'use client';

const statusLabels: Record<string, string> = {
  NEW: 'Novo',
  IN_PROGRESS: 'Em Progresso',
  WON: 'Ganho',
  LOST: 'Perdido',
};

const priorityLabels: Record<string, string> = {
  LOW: 'Baixa',
  MEDIUM: 'Média',
  HIGH: 'Alta',
  URGENT: 'Urgente',
};

const leadTypeLabels: Record<string, string> = {
  CONTACT_FORM: 'Formulário de Contato',
  BUDGET_INQUIRY: 'Solicitação de Orçamento',
};

export function LeadDetails({ lead }: { lead: any }) {
  const mainSession = lead.sessions?.[0];
  const interestScore = mainSession?.interestScore;
  const pageViews = mainSession?.pageViews || [];

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 16,
        padding: 24,
      }}
    >
      <h2 style={{ margin: '0 0 20px', fontSize: 20, fontWeight: 700, letterSpacing: '-0.3px' }}>
        Informações do Lead
      </h2>

      <div style={{ display: 'grid', gap: 16 }}>
        <div>
          <label style={{ color: '#9f9bb0', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6, display: 'block' }}>
            Nome
          </label>
          <div style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>{lead.name}</div>
        </div>

        <div>
          <label style={{ color: '#9f9bb0', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6, display: 'block' }}>
            Email
          </label>
          <div style={{ color: '#d3cec3', fontSize: 14 }}>
            <a href={`mailto:${lead.email}`} style={{ color: '#c92337', textDecoration: 'none' }}>
              {lead.email}
            </a>
          </div>
        </div>

        {lead.phone && (
          <div>
            <label style={{ color: '#9f9bb0', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6, display: 'block' }}>
              Telefone
            </label>
            <div style={{ color: '#d3cec3', fontSize: 14 }}>
              <a href={`tel:${lead.phone}`} style={{ color: '#c92337', textDecoration: 'none' }}>
                {lead.phone}
              </a>
            </div>
          </div>
        )}

        {lead.company && (
          <div>
            <label style={{ color: '#9f9bb0', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6, display: 'block' }}>
              Empresa
            </label>
            <div style={{ color: '#d3cec3', fontSize: 14 }}>{lead.company}</div>
          </div>
        )}

        {lead.position && (
          <div>
            <label style={{ color: '#9f9bb0', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6, display: 'block' }}>
              Cargo
            </label>
            <div style={{ color: '#d3cec3', fontSize: 14 }}>{lead.position}</div>
          </div>
        )}

        <div>
          <label style={{ color: '#9f9bb0', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6, display: 'block' }}>
            Tipo
          </label>
          <div style={{ color: '#d3cec3', fontSize: 14 }}>
            {leadTypeLabels[lead.leadType] || lead.leadType}
          </div>
        </div>

        {lead.projectType && (
          <div>
            <label style={{ color: '#9f9bb0', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6, display: 'block' }}>
              Tipo de Projeto
            </label>
            <div style={{ color: '#d3cec3', fontSize: 14 }}>{lead.projectType}</div>
          </div>
        )}

        {lead.budget && (
          <div>
            <label style={{ color: '#9f9bb0', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6, display: 'block' }}>
              Budget
            </label>
            <div style={{ color: '#d3cec3', fontSize: 14 }}>{lead.budget}</div>
          </div>
        )}

        {lead.timeline && (
          <div>
            <label style={{ color: '#9f9bb0', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6, display: 'block' }}>
              Timeline
            </label>
            <div style={{ color: '#d3cec3', fontSize: 14 }}>{lead.timeline}</div>
          </div>
        )}

        {lead.description && (
          <div>
            <label style={{ color: '#9f9bb0', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6, display: 'block' }}>
              Descrição
            </label>
            <div style={{ color: '#d3cec3', fontSize: 14, whiteSpace: 'pre-wrap' }}>{lead.description}</div>
          </div>
        )}

        <div>
          <label style={{ color: '#9f9bb0', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6, display: 'block' }}>
            Criado em
          </label>
          <div style={{ color: '#d3cec3', fontSize: 14 }}>
            {new Date(lead.createdAt).toLocaleString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
      </div>

      {interestScore && (
        <>
          <h3 style={{ margin: '32px 0 16px', fontSize: 18, fontWeight: 700, letterSpacing: '-0.3px' }}>
            Análise Comportamental (IA)
          </h3>
          <div style={{ display: 'grid', gap: 12 }}>
            <div>
              <label style={{ color: '#9f9bb0', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6, display: 'block' }}>
                Score de Conversão
              </label>
              <div style={{ color: '#d3cec3', fontSize: 16, fontWeight: 600 }}>
                {interestScore.conversionScore}/100
              </div>
            </div>
            {interestScore.visitorType && (
              <div>
                <label style={{ color: '#9f9bb0', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6, display: 'block' }}>
                  Tipo de Visitante
                </label>
                <div style={{ color: '#d3cec3', fontSize: 14 }}>{interestScore.visitorType}</div>
              </div>
            )}
          </div>
        </>
      )}

      {pageViews.length > 0 && (
        <>
          <h3 style={{ margin: '32px 0 16px', fontSize: 18, fontWeight: 700, letterSpacing: '-0.3px' }}>
            Páginas Visitadas
          </h3>
          <div style={{ display: 'grid', gap: 8 }}>
            {pageViews.map((pv: any, idx: number) => (
              <div
                key={idx}
                style={{
                  padding: '12px 14px',
                  borderRadius: 8,
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <div style={{ color: '#d3cec3', fontSize: 14 }}>
                  {pv.project ? pv.project.title : pv.pageSlug || 'Página'}
                </div>
                <div style={{ color: '#8f8ba2', fontSize: 12, marginTop: 4 }}>
                  {new Date(pv.viewedAt).toLocaleString('pt-BR')}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

