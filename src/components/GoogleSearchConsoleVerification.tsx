// ════════════════════════════════════════════════════════════
// GOOGLE SEARCH CONSOLE VERIFICATION
// ════════════════════════════════════════════════════════════
// Meta tag de verificação do Google Search Console
// ════════════════════════════════════════════════════════════

import React from 'react'
import { Helmet } from 'react-helmet-async'

interface GoogleSearchConsoleVerificationProps {
  /**
   * Código de verificação fornecido pelo Google Search Console
   * Exemplo: "ABC123XYZ..."
   * 
   * Para obter:
   * 1. Acesse https://search.google.com/search-console
   * 2. Adicione propriedade do site
   * 3. Escolha método "Tag HTML"
   * 4. Copie o conteúdo da tag
   */
  verificationCode?: string
}

/**
 * Componente para adicionar meta tag de verificação do Google Search Console
 * 
 * USO:
 * 1. Obtenha o código de verificação no Google Search Console
 * 2. Adicione como variável de ambiente: VITE_GOOGLE_SEARCH_CONSOLE_VERIFICATION
 * 3. Ou passe diretamente: <GoogleSearchConsoleVerification verificationCode="ABC123..." />
 * 
 * @example
 * <GoogleSearchConsoleVerification />
 * // ou
 * <GoogleSearchConsoleVerification verificationCode="ABC123XYZ..." />
 */
const GoogleSearchConsoleVerification: React.FC<GoogleSearchConsoleVerificationProps> = ({
  verificationCode
}) => {
  // Buscar código de verificação de variável de ambiente ou prop
  const code = verificationCode || import.meta.env.VITE_GOOGLE_SEARCH_CONSOLE_VERIFICATION

  // Se não houver código, não renderizar nada
  if (!code) {
    return null
  }

  return (
    <Helmet>
      <meta name="google-site-verification" content={code} />
    </Helmet>
  )
}

export default GoogleSearchConsoleVerification
