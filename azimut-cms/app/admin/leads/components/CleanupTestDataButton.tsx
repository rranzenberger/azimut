'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function CleanupTestDataButton() {
  const router = useRouter()
  const [cleaningUp, setCleaningUp] = useState(false)

  const handleCleanupTestData = async () => {
    if (!confirm('⚠️ ATENÇÃO: Isso apagará TODOS os dados de teste (prefixo TESTE_). Tem certeza?')) {
      return
    }

    setCleaningUp(true)
    try {
      const response = await fetch('/api/admin/cleanup-test-data', {
        method: 'POST',
      })

      const result = await response.json()

      if (result.success) {
        alert(`✅ ${result.message}\n\nApagados:\n- ${result.deleted.sessions} sessões\n- ${result.deleted.pageViews} page views\n- ${result.deleted.behaviors} comportamentos\n- ${result.deleted.pwaInstalls} PWA installs\n- ${result.deleted.interestScores} interest scores\n- ${result.deleted.leads} leads`)
        // Recarregar página
        router.refresh()
      } else {
        alert(`❌ Erro: ${result.error || 'Erro desconhecido'}`)
      }
    } catch (error: any) {
      console.error('Erro ao apagar dados de teste:', error)
      alert(`❌ Erro ao apagar dados de teste: ${error.message}`)
    } finally {
      setCleaningUp(false)
    }
  }

  return (
    <button
      onClick={handleCleanupTestData}
      disabled={cleaningUp}
      style={{
        padding: '8px 16px',
        background: cleaningUp ? '#6b7280' : '#dc2626',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: 600,
        cursor: cleaningUp ? 'not-allowed' : 'pointer',
        transition: 'background 0.2s',
      }}
      onMouseEnter={(e) => {
        if (!cleaningUp) {
          e.currentTarget.style.background = '#b91c1c'
        }
      }}
      onMouseLeave={(e) => {
        if (!cleaningUp) {
          e.currentTarget.style.background = '#dc2626'
        }
      }}
      title="Apagar todos os dados de teste (prefixo TESTE_)"
    >
      {cleaningUp ? '⏳ Apagando...' : '🗑️ Apagar Dados de Teste'}
    </button>
  )
}
