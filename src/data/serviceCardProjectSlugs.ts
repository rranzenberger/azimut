/**
 * Por cada serviço (Solutions /what), slug do projeto no CMS cuja hero define a imagem do card.
 * Slugs validados contra GET /api/public/project/[slug] (backoffice.azmt.com.br).
 *
 * Alterações: editar só este mapa se mudares projetos no CMS.
 */
export const SERVICE_CARD_PROJECT_SLUGS: Record<string, string> = {
  /** Filmes — O Encantador de Almas */
  'cinema-audiovisual': 'encantador-de-almas',
  /** Pós — BW Energy Maromba */
  'pos-producao-vfx': 'bw-energy-maromba',
  /** Animação — Natal de Rio Bonito */
  'animacao-2d-3d': 'natal-rio-bonito-2025',
  /** XR — VR Amazônia */
  'xr-interatividade-web3': 'vr-amazonia',
  /** Cenografia — Museu Olímpico (expografia) */
  'cenografia-design-espacial': 'museu-rio-olimpico',
  /** Jogos / interactives — Senna (ativação / experiência interativa) */
  'games-interativos': 'senna-ativacoes',
  /** IA criativa — mesmo filme (still cinematográfico) */
  'ia-criativa': 'encantador-de-almas',
  /** Direção de arte — Van Gogh / La Fontaine */
  'direcao-arte-criativa': 'van-gogh-la-fontaine',
  /** Teatro / imersivo — Amazônias Possíveis */
  'teatro-espetaculos-imersivos': 'amazonias-possiveis',
  /** Marcas / instalação urbana — Natal Cultural (evento de marca no espaço público) */
  'branded-experiences-ativacoes': 'natal-cultural',
  /** Consultoria — Gramado VR/IA (curadoria estratégica) */
  'consultoria-estrategia': 'gramado-vr-ia',
  /** Educação — First Nation (storyboard / formação) */
  'educacao-treinamento': 'first-nation',
}
