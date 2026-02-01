import React, { useState, useEffect, lazy, Suspense } from 'react'

const GoogleAnalytics = lazy(() =>
  import('./GoogleAnalytics').then((m) => ({ default: m.default }))
)
const PlausibleScript = lazy(() =>
  import('./PlausibleScript').then((m) => ({ default: m.default }))
)

/**
 * Monta Google Analytics e Plausible após o first paint (requestIdleCallback ou delay)
 * para não bloquear LCP no mobile.
 */
const DeferredAnalytics: React.FC = () => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    const run = () => {
      if (!cancelled) setReady(true)
    }

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const id = (window as Window & { requestIdleCallback: (cb: () => void, o?: { timeout: number }) => number })
        .requestIdleCallback(run, { timeout: 1500 })
      return () => {
        cancelled = true
        ;(window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(id)
      }
    }
    const id = setTimeout(run, 500)
    return () => {
      cancelled = true
      clearTimeout(id)
    }
  }, [])

  if (!ready) return null

  return (
    <Suspense fallback={null}>
      <GoogleAnalytics />
      <PlausibleScript />
    </Suspense>
  )
}

export default DeferredAnalytics
