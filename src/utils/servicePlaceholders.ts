// Função para gerar placeholders de galeria baseados no serviço

export interface ServiceGalleryPlaceholder {
  url: string
  alt: string
  thumbnail?: string
}

// URLs de placeholder do Unsplash (livre para uso comercial)
const PLACEHOLDER_IMAGES: Record<string, string[]> = {
  'cinema-audiovisual': [
    'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=600&fit=crop'
  ],
  'pos-producao-vfx': [
    'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop'
  ],
  'animacao-2d-3d': [
    'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1558599144-6c9f87ad2d7b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&h=600&fit=crop'
  ],
  'xr-interatividade-web3': [
    'https://images.unsplash.com/photo-1617802690992-15d51f6e6d3e?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop'
  ],
  'cenografia-design-espacial': [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop'
  ],
  'games-interativos': [
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop'
  ],
  'ia-criativa': [
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1527477396000-e27137b33bfb?w=800&h=600&fit=crop'
  ],
  'direcao-arte-criativa': [
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1557683311-eac922347aa1?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=600&fit=crop'
  ],
  'consultoria-estrategia': [
    'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1556761175-4b46ac572b81?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&h=600&fit=crop'
  ],
  'teatro-espetaculos-imersivos': [
    'https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1478147427282-58a87a120781?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop'
  ],
  'branded-experiences-ativacoes': [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1556761175-4b46ac572b81?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop'
  ],
  'museus-exposicoes': [
    'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop'
  ],
  'festivais-curadoria-eventos': [
    'https://images.unsplash.com/photo-1478147427282-58a87a120781?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop'
  ],
  'educacao-treinamento': [
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop'
  ],
  'realidade-virtual-vr': [
    'https://images.unsplash.com/photo-1617802690992-15d51f6e6d3e?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop'
  ],
  'arquitetura-virtual-bim': [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop'
  ]
}

/**
 * Gera placeholders de galeria para um serviço
 * @param slug - Slug do serviço
 * @param serviceTitle - Título do serviço (para alt text)
 * @param count - Quantidade de imagens (padrão: 6)
 */
export function getServiceGalleryPlaceholders(
  slug: string,
  serviceTitle: string,
  count: number = 6
): ServiceGalleryPlaceholder[] {
  const images = PLACEHOLDER_IMAGES[slug] || PLACEHOLDER_IMAGES['cinema-audiovisual']
  
  // Limitar ao número solicitado
  const selectedImages = images.slice(0, Math.min(count, images.length))
  
  return selectedImages.map((url, index) => ({
    url,
    thumbnail: url,
    alt: `${serviceTitle} - Imagem ${index + 1}`
  }))
}
