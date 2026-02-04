'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// ═══════════════════════════════════════════════════════════════
// ⌨️ ATALHOS DE TECLADO - Navegação Rápida
// ═══════════════════════════════════════════════════════════════

const SHORTCUTS = [
  { keys: ['g', 'd'], path: '/admin/dashboard', label: 'Dashboard' },
  { keys: ['g', 'p'], path: '/admin/projects', label: 'Projetos' },
  { keys: ['g', 'l'], path: '/admin/leads', label: 'Leads' },
  { keys: ['g', 'm'], path: '/admin/media', label: 'Mídias' },
  { keys: ['g', 's'], path: '/admin/site-pages', label: 'Páginas' },
  { keys: ['g', 'a'], path: '/admin/analytics', label: 'Analytics' },
  { keys: ['g', 'c'], path: '/admin/settings', label: 'Configurações' },
];

export function KeyboardShortcuts() {
  const router = useRouter();
  const [showHelper, setShowHelper] = useState(false);
  const [pendingKey, setPendingKey] = useState<string | null>(null);
  const [lastKeyTime, setLastKeyTime] = useState(0);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Ignorar se estiver digitando em input/textarea
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement ||
      e.target instanceof HTMLSelectElement
    ) {
      return;
    }

    const now = Date.now();
    const key = e.key.toLowerCase();

    // Ctrl+K ou Cmd+K - Abrir busca (futuro)
    if ((e.ctrlKey || e.metaKey) && key === 'k') {
      e.preventDefault();
      // TODO: Implementar busca global
      console.log('🔍 Busca global - Em breve!');
      return;
    }

    // ? - Mostrar atalhos
    if (key === '?' || (e.shiftKey && key === '/')) {
      e.preventDefault();
      setShowHelper((prev) => !prev);
      return;
    }

    // Escape - Fechar helper
    if (key === 'escape') {
      setShowHelper(false);
      setPendingKey(null);
      return;
    }

    // Sequência G + letra
    if (pendingKey === 'g' && now - lastKeyTime < 1000) {
      const shortcut = SHORTCUTS.find((s) => s.keys[1] === key);
      if (shortcut) {
        e.preventDefault();
        router.push(shortcut.path);
      }
      setPendingKey(null);
      return;
    }

    // Primeiro G da sequência
    if (key === 'g') {
      setPendingKey('g');
      setLastKeyTime(now);
      return;
    }

    // Resetar se não for G
    setPendingKey(null);
  }, [pendingKey, lastKeyTime, router]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Indicator quando G foi pressionado
  const showGIndicator = pendingKey === 'g' && Date.now() - lastKeyTime < 1000;

  return (
    <>
      {/* G Indicator */}
      {showGIndicator && (
        <div
          style={{
            position: 'fixed',
            bottom: 80,
            right: 24,
            padding: '8px 16px',
            borderRadius: 8,
            background: 'rgba(201, 35, 55, 0.9)',
            color: '#fff',
            fontSize: 13,
            fontWeight: 600,
            zIndex: 9998,
            // Animação removida para compatibilidade com Next.js App Router
          }}
        >
          G + ? para navegar...
        </div>
      )}

      {/* Helper Modal */}
      {showHelper && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
          onClick={() => setShowHelper(false)}
        >
          <div
            style={{
              background: '#1a1f2e',
              borderRadius: 16,
              padding: 32,
              minWidth: 400,
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ margin: '0 0 24px', fontSize: 20, fontWeight: 600, color: '#fff' }}>
              ⌨️ Atalhos de Teclado
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {SHORTCUTS.map((shortcut) => (
                <div
                  key={shortcut.path}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <span style={{ color: '#9ca3af', fontSize: 14 }}>{shortcut.label}</span>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {shortcut.keys.map((k, i) => (
                      <kbd
                        key={i}
                        style={{
                          padding: '4px 8px',
                          borderRadius: 6,
                          background: 'rgba(255,255,255,0.08)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: '#fff',
                          fontSize: 12,
                          fontFamily: 'monospace',
                          textTransform: 'uppercase',
                        }}
                      >
                        {k}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <span style={{ color: '#9ca3af', fontSize: 14 }}>Busca Global (em breve)</span>
                <div style={{ display: 'flex', gap: 4 }}>
                  <kbd
                    style={{
                      padding: '4px 8px',
                      borderRadius: 6,
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#fff',
                      fontSize: 12,
                      fontFamily: 'monospace',
                    }}
                  >
                    Ctrl
                  </kbd>
                  <kbd
                    style={{
                      padding: '4px 8px',
                      borderRadius: 6,
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#fff',
                      fontSize: 12,
                      fontFamily: 'monospace',
                    }}
                  >
                    K
                  </kbd>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 0',
                }}
              >
                <span style={{ color: '#9ca3af', fontSize: 14 }}>Mostrar/Ocultar Atalhos</span>
                <kbd
                  style={{
                    padding: '4px 8px',
                    borderRadius: 6,
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#fff',
                    fontSize: 12,
                    fontFamily: 'monospace',
                  }}
                >
                  ?
                </kbd>
              </div>
            </div>

            <p style={{ margin: '24px 0 0', fontSize: 12, color: '#6b7280', textAlign: 'center' }}>
              Pressione <kbd style={{ background: 'rgba(255,255,255,0.08)', padding: '2px 6px', borderRadius: 4 }}>Esc</kbd> para fechar
            </p>
          </div>
        </div>
      )}

    </>
  );
}
