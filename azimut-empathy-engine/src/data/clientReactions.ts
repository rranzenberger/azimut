import { getCombosForElements } from './combos'
import { getElementById } from './elements'

const COMBO_REACTIONS: Record<string, string> = {
  'combo-vr-cinema': 'O cliente sente imersão total. "É como estar dentro da história."',
  'combo-xr-imersivo': 'O cliente vê a experiência XR completa. "VR, 360 e Unity — imersão total."',
  'combo-web3': 'O cliente se anima com Web3. "NFT, blockchain e metaverso."',
  'combo-ia-vfx': 'O cliente vê o futuro da produção. "IA e VFX juntos mudam tudo."',
  'combo-luz-camera': 'O cliente reconhece o clássico. "Luz, câmera, ação."',
  'combo-producao-completa': 'O cliente aprova o pipeline. "Roteiro, câmera e edição — produção completa."',
  'combo-elenco-direcao': 'O cliente valoriza a equipe. "Elenco, direção e roteiro — equipe criativa."',
  'combo-palco-som': 'O cliente aprova o palco. "Palco, som e iluminação — evento pronto."',
  'combo-transmissao': 'O cliente quer o híbrido. "Transmissão ao vivo e streaming — evento híbrido."',
  'combo-cenografia': 'O cliente valoriza a cenografia. "Cenografia, projeção e iluminação."',
  'combo-academy-full': 'O cliente valoriza a formação. "Três academias de peso."',
  'combo-cursos-vancouver': 'O cliente vê os cursos. "Animação, VFX e game design em Vancouver."',
  'combo-visto-residencia': 'O cliente pensa no longo prazo. "Visto e residência — plano completo."',
  'combo-curadoria-festival': 'O cliente aprova a curadoria. "Festival, teatro e curadoria — programação forte."',
  'combo-projecao-led': 'O cliente valoriza o visual. "Projeção mapeada e LED — impacto total."',
  'combo-exposicao-tour': 'O cliente quer o museu digital. "Exposição, tour virtual e acervo — experiência completa."',
  'combo-espetaculo-imersivo': 'O cliente se emociona. "Espetáculo imersivo com teatro e projeção."',
  'combo-museu-acessivel': 'O cliente valoriza inclusão. "Acessibilidade, exposição e tour virtual."',
  'combo-motion-vfx': 'O cliente vê a pós de alto nível. "Motion, VFX e color — pipeline premium."',
  'combo-workshop-treinamento': 'O cliente investe em formação. "Workshop, treinamento e curso online."',
}

const FALLBACK = [
  'O cliente está explorando as possibilidades.',
  'O cliente sente que há sinergia entre as escolhas.',
]

export function getClientReaction(selectedIds: string[], topicId?: string | null): string {
  if (selectedIds.length === 0) return 'Arraste elementos para a área e veja como o cliente reage.'
  const combos = getCombosForElements(selectedIds, topicId)
  if (combos.length > 0) {
    const top = combos.sort((a, b) => b.bonusPoints - a.bonusPoints)[0]
    if (top && COMBO_REACTIONS[top.id]) return COMBO_REACTIONS[top.id]
  }
  const categories: Record<string, number> = {}
  selectedIds.forEach((id) => {
    const el = getElementById(id)
    if (el) categories[el.category] = (categories[el.category] ?? 0) + 1
  })
  const topCat = Object.entries(categories).sort((a, b) => b[1] - a[1])[0]?.[0]
  if (topCat) return `O cliente pensa em ${topCat}.`
  return FALLBACK[Math.floor(Math.random() * FALLBACK.length)]!
}
