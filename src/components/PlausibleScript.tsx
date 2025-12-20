import React from 'react'
import { Helmet } from 'react-helmet-async'

const PlausibleScript: React.FC = () => {
  // Não carregar em desenvolvimento
  if (import.meta.env.DEV) {
    return null
  }

  // TODO: Substituir 'azimut.com' pelo domínio real
  const domain = 'azimut.com'

  return (
    <Helmet>
      {/* Plausible Analytics - Privacy-first, GDPR compliant */}
      <script
        defer
        data-domain={domain}
        src="https://plausible.io/js/script.js"
      />
      
      {/* Ou self-hosted (descomentar quando configurar):
      <script
        defer
        data-domain={domain}
        src="https://analytics.azimut.com/js/script.js"
      />
      */}
    </Helmet>
  )
}

export default PlausibleScript




















