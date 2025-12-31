/**
 * Helper para criar um AbortSignal com timeout
 * Compatível com navegadores mais antigos (não requer AbortSignal.timeout)
 * 
 * IMPORTANTE: AbortSignal.timeout() foi introduzido em 2023 e não está disponível
 * em todos os navegadores. Esta função fornece a mesma funcionalidade usando
 * AbortController, que é suportado desde 2017.
 */
export function createTimeoutSignal(ms: number): AbortSignal {
  // Se AbortSignal.timeout estiver disponível, usar (mais moderno)
  if (typeof AbortSignal !== 'undefined' && 'timeout' in AbortSignal && typeof AbortSignal.timeout === 'function') {
    return AbortSignal.timeout(ms);
  }
  
  // Fallback: usar AbortController (compatível com navegadores antigos)
  const controller = new AbortController();
  
  setTimeout(() => {
    controller.abort();
  }, ms);
  
  return controller.signal;
}

