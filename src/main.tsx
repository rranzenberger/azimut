import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import './index.css'
import { initWebVitals } from './utils/web-vitals'
import { registerServiceWorker, setupInstallPrompt } from './utils/pwa'

// Inicializar tracking de Web Vitals
initWebVitals()

// Registrar Service Worker (PWA)
if (import.meta.env.PROD) {
  registerServiceWorker()
  setupInstallPrompt()
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)
