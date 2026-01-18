'use client';

import { useState } from 'react';

interface N8nWorkflowClientProps {
  n8nUrl: string;
  workflowId: string;
  webhookUrl: string;
}

export function N8nWorkflowClient({ n8nUrl, workflowId, webhookUrl }: N8nWorkflowClientProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const workflowUrl = `${n8nUrl}/workflow/${workflowId}`;

  const openWorkflow = () => {
    window.open(workflowUrl, '_blank');
  };

  const openN8n = () => {
    window.open(n8nUrl, '_blank');
  };

  const testWorkflow = async () => {
    setLoading(true);
    setMessage(null);
    
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: `test-${Date.now()}`,
          email: 'teste@exemplo.com',
          name: 'Teste Automatico',
          company: 'Empresa Teste',
          phone: '+5511999999999',
          lang: 'pt',
        }),
      });

      if (response.ok) {
        setMessage({ 
          type: 'success', 
          text: 'Workflow executado com sucesso! Verifique os logs no n8n.' 
        });
      } else {
        setMessage({ 
          type: 'error', 
          text: `Erro (${response.status}): Verifique se o workflow esta ativo.` 
        });
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: 'Erro: ' + error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Info Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '16px',
        marginBottom: '32px'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px',
          padding: '20px',
        }}>
          <div style={{ fontSize: '14px', color: '#8f8ba2', marginBottom: '8px' }}>URL do n8n</div>
          <div style={{ fontSize: '14px', color: '#ffffff', wordBreak: 'break-all' }}>{n8nUrl}</div>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px',
          padding: '20px',
        }}>
          <div style={{ fontSize: '14px', color: '#8f8ba2', marginBottom: '8px' }}>ID do Workflow</div>
          <div style={{ fontSize: '14px', color: '#ffffff', fontFamily: 'monospace' }}>{workflowId}</div>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px',
          padding: '20px',
        }}>
          <div style={{ fontSize: '14px', color: '#8f8ba2', marginBottom: '8px' }}>Status</div>
          <div style={{ fontSize: '14px', color: '#4ade80' }}>Ativo</div>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div
          style={{
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '24px',
            background: message.type === 'success' ? 'rgba(74,222,128,0.2)' : 'rgba(239,68,68,0.2)',
            border: `1px solid ${message.type === 'success' ? '#4ade80' : '#ef4444'}`,
            color: message.type === 'success' ? '#4ade80' : '#ef4444',
            fontSize: '14px',
          }}
        >
          {message.text}
        </div>
      )}

      {/* Actions */}
      <div style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '8px',
        padding: '24px',
        marginBottom: '24px',
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', marginBottom: '16px' }}>
          Acoes
        </h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={openN8n}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              background: '#c92337',
              color: '#ffffff',
              border: 'none',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Abrir n8n
          </button>
          <button
            onClick={openWorkflow}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              background: '#4a9eff',
              color: '#ffffff',
              border: 'none',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Abrir Workflow
          </button>
          <button
            onClick={testWorkflow}
            disabled={loading}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              background: loading ? 'rgba(74,222,128,0.5)' : '#4ade80',
              color: '#000000',
              border: 'none',
              fontSize: '14px',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? 'Testando...' : 'Testar Workflow'}
          </button>
        </div>
      </div>

      {/* Info */}
      <div style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '8px',
        padding: '24px',
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', marginBottom: '16px' }}>
          Webhook URL
        </h3>
        <code style={{
          background: 'rgba(0,0,0,0.3)',
          padding: '12px 16px',
          borderRadius: '4px',
          display: 'block',
          wordBreak: 'break-all',
          fontSize: '13px',
          color: '#d3cec3',
        }}>
          {webhookUrl}
        </code>
        <p style={{ marginTop: '16px', color: '#8f8ba2', fontSize: '14px' }}>
          Esta URL e chamada quando um lead e criado no site para iniciar o enriquecimento automatico.
        </p>
      </div>
    </div>
  );
}
