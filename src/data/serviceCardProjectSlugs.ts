/**
 * Por cada serviço (Solutions /what), slug do projeto no CMS cuja hero define a imagem do card.
 * - Cinema = Encantador de Almas. IA criativa usa imagem estática no card (sem projeto hero).
 * - Serviços omitidos caem no fallback em serviceCardImages.ts (YouTube).
 */
export const SERVICE_CARD_PROJECT_SLUGS: Record<string, string> = {
  'cinema-audiovisual': 'encantador-de-almas',
  'pos-producao-vfx': 'bw-energy-maromba',
  'animacao-2d-3d': 'natal-rio-bonito-2025',
  'xr-interatividade-web3': 'vr-amazonia',
  'cenografia-design-espacial': 'museu-rio-olimpico',
  'games-interativos': 'senna-ativacoes',
  'direcao-arte-criativa': 'van-gogh-la-fontaine',
  'teatro-espetaculos-imersivos': 'amazonias-possiveis',
  'branded-experiences-ativacoes': 'natal-cultural',
  'consultoria-estrategia': 'first-nation',
  // educacao-treinamento: usa só fallback YouTube (evita duplicar Gramado / First Nation)
}
