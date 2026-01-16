// ════════════════════════════════════════════════════════════
// API: Cron Job para Monitoramento Automático
// Executa periodicamente (ex: a cada 6 horas)
// ════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server';
import { runAutoMonitoring } from '@/lib/services/autoMonitor';

export const dynamic = 'force-dynamic';

// Proteção: só executa com secret key (configurar no Vercel Cron)
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await runAutoMonitoring();

    return NextResponse.json({
      success: result.success,
      message: `Monitoramento concluído: ${result.projectsMonitored} projetos, ${result.resultsFound} resultados`,
      ...result,
    });
  } catch (error: unknown) {
    console.error('Erro no cron de monitoramento:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: errorMessage || 'Erro no monitoramento' },
      { status: 500 }
    );
  }
}
