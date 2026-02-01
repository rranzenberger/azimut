import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './contexts/ThemeContext'
import App from './App'
import './index.css'

// ═══════════════════════════════════════════════════════════════
// PERFORMANCE: Lazy load non-critical utilities
// ═══════════════════════════════════════════════════════════════

// Render first, then load non-critical code
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>,
)

// After initial render, load Web Vitals and PWA (non-blocking)
if (typeof window !== 'undefined') {
  // Use requestIdleCallback for non-critical work
  const loadNonCritical = () => {
    // Web Vitals - async load
    import('./utils/web-vitals').then(({ initWebVitals }) => {
      initWebVitals()
    }).catch(() => {
      // Silently fail - not critical
    })

    // PWA - only in production
    if (import.meta.env.PROD) {
      import('./utils/pwa').then(({ registerServiceWorker, setupInstallPrompt }) => {
        registerServiceWorker()
        setupInstallPrompt()
      }).catch(() => {
        // Silently fail - not critical
      })
    }
  }

  // Use requestIdleCallback if available, otherwise setTimeout
  if ('requestIdleCallback' in window) {
    (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(loadNonCritical)
  } else {
    setTimeout(loadNonCritical, 1000)
  }
}
