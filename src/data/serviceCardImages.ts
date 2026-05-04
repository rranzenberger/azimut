/**
 * Imagens de referência quando o CMS não define `cardImageUrl`.
 * Thumbs YouTube (img.youtube.com) usados no próprio site — mais fiáveis que OG estáticos.
 * Alguns serviços partilham o mesmo vídeo de propósito (mínimo de duplicados, máxima carga).
 */

function ytMax(id: string): string {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
}

/** Fallback quando maxres não existe (YouTube devolve 404). */
export function ytHq(id: string): string {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
}

/** Último recurso visual (Museu Olímpico — sempre presente no site). */
export const CARD_IMAGE_EMERGENCY_FALLBACK = ytHq('1Pcoi_E9SXI')

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

/**
 * Nota: OG em azmt.com.br (og-work / og-vancouver) falharam em produção para alguns browsers/CDN,
 * deixando o card só com o fundo escuro. Os cards usam thumbs YouTube (mesmo pool do site).
 * Alguns slugs partilham o mesmo vídeo de forma intencional para fiabilidade.
 */
export const SERVICE_CARD_IMAGE_DEFAULTS: Record<string, string> = {
  'cinema-audiovisual': THUMB_MUSEU,
  /** Post / pipeline — mesmo reel tech Van (carrega bem em img.youtube.com). */
  'pos-producao-vfx': THUMB_VAN_A,
  'animacao-2d-3d': THUMB_VAN_B,
  'xr-interatividade-web3': THUMB_VAN_A,
  'cenografia-design-espacial': THUMB_MAG_1,
  'games-interativos': THUMB_MAG_5,
  /** IA — imagem estática (still cinematico); evita colidir com VanArts no reel do projeto. */
  'ia-criativa': '/images/service-cards/ia-criativa.png',
  'direcao-arte-criativa': THUMB_MAG_2,
  'teatro-espetaculos-imersivos': THUMB_MAG_3,
  /** Ativações — imagem institucional forte (evita og-vancouver.jpg que quebrava). */
  'branded-experiences-ativacoes': THUMB_MUSEU,
  'consultoria-estrategia': THUMB_MAG_4,
  'educacao-treinamento': THUMB_MAG_6,
}

export function getDefaultServiceCardImage(slug: string): string | undefined {
  return SERVICE_CARD_IMAGE_DEFAULTS[slug]
}
