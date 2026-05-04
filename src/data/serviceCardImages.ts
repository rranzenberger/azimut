/**
 * Imagens de referência quando o CMS não define `cardImageUrl`.
 * Cada slug tem URL única (sem repetir): OG azmt.com.br + thumbs de vídeos já usados no site
 * (Home/Museu, Vancouver reels, VancouverMagazine).
 */

function ytMax(id: string): string {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
}

/** Museu Olímpico — demoreel / Work */
const THUMB_MUSEU = ytMax('1Pcoi_E9SXI')
/** Reels Vancouver (WhyVancouverConvincing / academy) */
const THUMB_VAN_A = ytMax('Vm1s2cwHI-M')
const THUMB_VAN_B = ytMax('y3uhoRpQPYY')
/** Thumbs de vídeos curados em VancouverMagazine.tsx (conteúdo Azimut no site) */
const THUMB_MAG_1 = ytMax('aK81n1sF7ds')
const THUMB_MAG_2 = ytMax('OFOy_z2sJag')
const THUMB_MAG_3 = ytMax('BXC9j4oauQo')
const THUMB_MAG_4 = ytMax('FWHN6qFf-tE')
const THUMB_MAG_5 = ytMax('KuzwrKRacG8')
const THUMB_MAG_6 = ytMax('1DR6AuPBMxU')

const OG_WORK_JPG = 'https://azmt.com.br/og-work.jpg'
const OG_WORK_PNG = 'https://azmt.com.br/og-work.png'
const OG_VANCOUVER_JPG = 'https://azmt.com.br/og-vancouver.jpg'

export const SERVICE_CARD_IMAGE_DEFAULTS: Record<string, string> = {
  'cinema-audiovisual': THUMB_MUSEU,
  'pos-producao-vfx': OG_WORK_JPG,
  'animacao-2d-3d': THUMB_VAN_B,
  'xr-interatividade-web3': THUMB_VAN_A,
  'cenografia-design-espacial': THUMB_MAG_1,
  'games-interativos': THUMB_MAG_5,
  'ia-criativa': OG_WORK_PNG,
  'direcao-arte-criativa': THUMB_MAG_2,
  'teatro-espetaculos-imersivos': THUMB_MAG_3,
  'branded-experiences-ativacoes': OG_VANCOUVER_JPG,
  'consultoria-estrategia': THUMB_MAG_4,
  'educacao-treinamento': THUMB_MAG_6,
}

export function getDefaultServiceCardImage(slug: string): string | undefined {
  return SERVICE_CARD_IMAGE_DEFAULTS[slug]
}
