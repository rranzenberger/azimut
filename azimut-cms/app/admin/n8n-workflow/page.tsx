import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAuthToken } from '@/src/lib/auth';
import { N8nWorkflowClient } from './components/N8nWorkflowClient';

export const revalidate = 0;

export default async function N8nWorkflowPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('azimut_admin_token')?.value;
  const session = token ? verifyAuthToken(token) : null;

  if (!session) {
    redirect('/login');
  }

  // URL do workflow que ja esta rodando no n8n
  const n8nUrl = process.env.N8N_URL || 'https://n8n-production-dce3.up.railway.app';
  const workflowId = process.env.N8N_WORKFLOW_ID || 'of7Eei71oSXKZCQQCpb8R';
  const webhookUrl = process.env.N8N_WEBHOOK_URL || `${n8nUrl}/webhook/lead-enrichment`;

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
          Automacao n8n
        </h1>
        <p style={{ fontSize: '16px', color: '#8f8ba2', marginBottom: '24px' }}>
          Gerencie o workflow de enriquecimento automatico de leads.
        </p>
      </div>

      <N8nWorkflowClient 
        n8nUrl={n8nUrl} 
        workflowId={workflowId}
        webhookUrl={webhookUrl}
      />
    </div>
  );
}
