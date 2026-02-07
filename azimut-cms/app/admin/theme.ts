/**
 * Tokens visuais do backoffice — alinhados ao site Azimut
 * Para o backoffice parecer próximo do site nas atualizações (imagens, vídeo, uploads).
 */

export const AZIMUT = {
  /** Vermelho principal do site (#c92337) */
  red: '#c92337',
  redRgb: '201, 35, 55',
  /** Fundo escuro do site (slate-950) */
  bgDark: '#0a0e18',
  bgCard: 'rgba(255,255,255,0.03)',
  /** Texto */
  text: '#e8e6f2',
  textSecondary: '#c0bccf',
  textMuted: '#8f8ba2',
  /** Bordas */
  border: 'rgba(255,255,255,0.08)',
  borderLight: 'rgba(255,255,255,0.12)',
  /** Destaque / referência "como no site" */
  accentBg: 'rgba(201, 35, 55, 0.12)',
  accentBorder: 'rgba(201, 35, 55, 0.35)',
  accentText: '#fca5a5',
  /** Preview / card "Assim no site" */
  previewBg: 'rgba(15, 23, 42, 0.6)',
  previewBorder: 'rgba(201, 35, 55, 0.25)',
} as const;
