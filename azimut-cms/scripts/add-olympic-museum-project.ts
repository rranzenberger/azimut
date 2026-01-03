/**
 * Script para adicionar o Projeto Museu Olímpico do Rio ao backoffice
 * Com vídeo do YouTube integrado
 * 
 * Execução: npx tsx scripts/add-olympic-museum-project.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function addOlympicMuseumProject() {
  console.log('🎬 ADICIONANDO PROJETO: MUSEU OLÍMPICO DO RIO\n')

  try {
    // 1. Criar/buscar tags necessárias
    console.log('📌 Criando tags...')
    const tagImmersive = await prisma.tag.upsert({
      where: { slug: 'immersive' },
      update: {},
      create: {
        slug: 'immersive',
        labelPt: 'Imersivo',
        labelEn: 'Immersive',
        labelEs: 'Inmersivo',
        labelFr: 'Immersif',
        category: 'FORMAT',
      },
    })

    const tagInstitutional = await prisma.tag.upsert({
      where: { slug: 'institutional' },
      update: {},
      create: {
        slug: 'institutional',
        labelPt: 'Institucional',
        labelEn: 'Institutional',
        labelEs: 'Institucional',
        labelFr: 'Institutionnel',
        category: 'INDUSTRY',
      },
    })

    const tagMuseum = await prisma.tag.upsert({
      where: { slug: 'museum' },
      update: {},
      create: {
        slug: 'museum',
        labelPt: 'Museu',
        labelEn: 'Museum',
        labelEs: 'Museo',
        labelFr: 'Musée',
        category: 'INDUSTRY',
      },
    })

    const tagOlympics = await prisma.tag.upsert({
      where: { slug: 'olympics' },
      update: {},
      create: {
        slug: 'olympics',
        labelPt: 'Olímpico',
        labelEn: 'Olympic',
        labelEs: 'Olímpico',
        labelFr: 'Olympique',
        category: 'OTHER',
      },
    })

    console.log('✅ Tags criadas\n')

    // 2. Buscar market Brasil
    console.log('🌍 Buscando market Brasil...')
    const marketBR = await prisma.market.findUnique({
      where: { code: 'BR' },
    })
    console.log('✅ Market encontrado\n')

    // 3. Criar mídia (vídeo do YouTube)
    console.log('🎥 Criando mídia (vídeo YouTube)...')
    const heroVideo = await prisma.media.create({
      data: {
        type: 'VIDEO',
        originalUrl: 'https://www.youtube.com/watch?v=1Pcoi_E9SXI',
        thumbnailUrl: 'https://img.youtube.com/vi/1Pcoi_E9SXI/maxresdefault.jpg',
        mediumUrl: 'https://img.youtube.com/vi/1Pcoi_E9SXI/hqdefault.jpg',
        largeUrl: 'https://img.youtube.com/vi/1Pcoi_E9SXI/maxresdefault.jpg',
        width: 1280,
        height: 720,
        format: 'video/youtube',
        contentType: 'video/mp4',
        altPt: 'Vídeo do Museu Olímpico do Rio - Inauguração e experiências imersivas',
        altEn: 'Rio Olympic Museum Video - Opening and immersive experiences',
        altEs: 'Video del Museo Olímpico de Río - Inauguración y experiencias inmersivas',
        altFr: 'Vidéo du Musée Olympique de Rio - Inauguration et expériences immersives',
      },
    })
    console.log('✅ Mídia criada\n')

    // 4. Buscar serviços relacionados
    console.log('🛠️  Buscando serviços relacionados...')
    const services = await prisma.service.findMany({
      where: {
        slug: {
          in: ['cinema-av', 'xr', 'animation'],
        },
      },
    })
    console.log(`✅ ${services.length} serviços encontrados\n`)

    // 5. Criar projeto
    console.log('🏆 Criando projeto Museu Olímpico do Rio...')
    const project = await prisma.project.upsert({
      where: { slug: 'museu-olimpico-rio' },
      update: {
        title: 'Museu Olímpico do Rio',
        shortTitle: 'Museu Olímpico',
        summaryPt:
          'Direção geral e curadoria de conteúdo para o Museu Olímpico do Rio. Uma experiência imersiva que celebra a história olímpica através de instalações audiovisuais interativas e narrativas cinematográficas.',
        summaryEn:
          'General direction and content curation for the Rio Olympic Museum. An immersive experience that celebrates Olympic history through interactive audiovisual installations and cinematic narratives.',
        summaryEs:
          'Dirección general y curaduría de contenido para el Museo Olímpico de Río. Una experiencia inmersiva que celebra la historia olímpica a través de instalaciones audiovisuales interactivas y narrativas cinematográficas.',
        summaryFr:
          'Direction générale et curation de contenu pour le Musée Olympique de Rio. Une expérience immersive qui célèbre l\'histoire olympique à travers des installations audiovisuelles interactives et des récits cinématographiques.',
        descriptionPt:
          'O Museu Olímpico do Rio representa um marco na preservação da memória olímpica brasileira. A Azimut liderou a direção geral do projeto, integrando tecnologia, narrativa e design para criar uma experiência única que transporta visitantes através da história dos Jogos Olímpicos Rio 2016.\n\nO projeto incluiu:\n- Direção geral de conteúdo e curadoria\n- Instalações audiovisuais imersivas\n- Sinalização digital interativa\n- Narrativas cinematográficas\n- Integração de múltiplas tecnologias (projeção, touchscreens, VR)',
        descriptionEn:
          'The Rio Olympic Museum represents a milestone in preserving Brazilian Olympic memory. Azimut led the general direction of the project, integrating technology, narrative and design to create a unique experience that transports visitors through the history of the Rio 2016 Olympic Games.\n\nThe project included:\n- General content direction and curation\n- Immersive audiovisual installations\n- Interactive digital signage\n- Cinematic narratives\n- Integration of multiple technologies (projection, touchscreens, VR)',
        descriptionEs:
          'El Museo Olímpico de Río representa un hito en la preservación de la memoria olímpica brasileña. Azimut lideró la dirección general del proyecto, integrando tecnología, narrativa y diseño para crear una experiencia única que transporta a los visitantes a través de la historia de los Juegos Olímpicos Río 2016.\n\nEl proyecto incluyó:\n- Dirección general de contenido y curaduría\n- Instalaciones audiovisuales inmersivas\n- Señalización digital interactiva\n- Narrativas cinematográficas\n- Integración de múltiples tecnologías (proyección, pantallas táctiles, VR)',
        descriptionFr:
          'Le Musée Olympique de Rio représente une étape importante dans la préservation de la mémoire olympique brésilienne. Azimut a dirigé la direction générale du projet, intégrant technologie, narration et design pour créer une expérience unique qui transporte les visiteurs à travers l\'histoire des Jeux Olympiques de Rio 2016.\n\nLe projet comprenait:\n- Direction générale du contenu et curation\n- Installations audiovisuelles immersives\n- Signalisation numérique interactive\n- Récits cinématographiques\n- Intégration de multiples technologies (projection, écrans tactiles, VR)',
        city: 'Rio de Janeiro',
        stateProvince: 'RJ',
        country: 'BR',
        year: 2016,
        client: 'Prefeitura do Rio de Janeiro',
        type: 'MUSEUM',
        featured: true,
        priorityHome: 10,
        status: 'PUBLISHED',
        ctaLabelPt: 'Ver Projeto',
        ctaLabelEn: 'View Project',
        ctaUrl: '/work/museu-olimpico-rio',
        heroImageId: heroVideo.id,
        marketId: marketBR?.id || null,
        tags: {
          set: [
            { id: tagImmersive.id },
            { id: tagInstitutional.id },
            { id: tagMuseum.id },
            { id: tagOlympics.id },
          ],
        },
        services: {
          set: services.map((s) => ({ id: s.id })),
        },
      },
      create: {
        slug: 'museu-olimpico-rio',
        title: 'Museu Olímpico do Rio',
        shortTitle: 'Museu Olímpico',
        summaryPt:
          'Direção geral e curadoria de conteúdo para o Museu Olímpico do Rio. Uma experiência imersiva que celebra a história olímpica através de instalações audiovisuais interativas e narrativas cinematográficas.',
        summaryEn:
          'General direction and content curation for the Rio Olympic Museum. An immersive experience that celebrates Olympic history through interactive audiovisual installations and cinematic narratives.',
        summaryEs:
          'Dirección general y curaduría de contenido para el Museo Olímpico de Río. Una experiencia inmersiva que celebra la historia olímpica a través de instalaciones audiovisuales interactivas y narrativas cinematográficas.',
        summaryFr:
          'Direction générale et curation de contenu pour le Musée Olympique de Rio. Une expérience immersive qui célèbre l\'histoire olympique à travers des installations audiovisuelles interactives et des récits cinématographiques.',
        descriptionPt:
          'O Museu Olímpico do Rio representa um marco na preservação da memória olímpica brasileira. A Azimut liderou a direção geral do projeto, integrando tecnologia, narrativa e design para criar uma experiência única que transporta visitantes através da história dos Jogos Olímpicos Rio 2016.\n\nO projeto incluiu:\n- Direção geral de conteúdo e curadoria\n- Instalações audiovisuais imersivas\n- Sinalização digital interativa\n- Narrativas cinematográficas\n- Integração de múltiplas tecnologias (projeção, touchscreens, VR)',
        descriptionEn:
          'The Rio Olympic Museum represents a milestone in preserving Brazilian Olympic memory. Azimut led the general direction of the project, integrating technology, narrative and design to create a unique experience that transports visitors through the history of the Rio 2016 Olympic Games.\n\nThe project included:\n- General content direction and curation\n- Immersive audiovisual installations\n- Interactive digital signage\n- Cinematic narratives\n- Integration of multiple technologies (projection, touchscreens, VR)',
        descriptionEs:
          'El Museo Olímpico de Río representa un hito en la preservación de la memoria olímpica brasileña. Azimut lideró la dirección general del proyecto, integrando tecnología, narrativa y diseño para crear una experiencia única que transporta a los visitantes a través de la historia de los Juegos Olímpicos Río 2016.\n\nEl proyecto incluyó:\n- Dirección general de contenido y curaduría\n- Instalaciones audiovisuales inmersivas\n- Señalización digital interactiva\n- Narrativas cinematográficas\n- Integración de múltiples tecnologías (proyección, pantallas táctiles, VR)',
        descriptionFr:
          'Le Musée Olympique de Rio représente une étape importante dans la préservation de la mémoire olympique brésilienne. Azimut a dirigé la direction générale du projet, intégrant technologie, narration et design pour créer une expérience unique qui transporte les visiteurs à travers l\'histoire des Jeux Olympiques de Rio 2016.\n\nLe projet comprenait:\n- Direction générale du contenu et curation\n- Installations audiovisuelles immersives\n- Signalisation numérique interactive\n- Récits cinématographiques\n- Intégration de multiples technologies (projection, écrans tactiles, VR)',
        city: 'Rio de Janeiro',
        stateProvince: 'RJ',
        country: 'BR',
        year: 2016,
        client: 'Prefeitura do Rio de Janeiro',
        type: 'MUSEUM',
        featured: true,
        priorityHome: 10,
        status: 'PUBLISHED',
        ctaLabelPt: 'Ver Projeto',
        ctaLabelEn: 'View Project',
        ctaUrl: '/work/museu-olimpico-rio',
        heroImageId: heroVideo.id,
        marketId: marketBR?.id || null,
        tags: {
          connect: [
            { id: tagImmersive.id },
            { id: tagInstitutional.id },
            { id: tagMuseum.id },
            { id: tagOlympics.id },
          ],
        },
        services: {
          connect: services.map((s) => ({ id: s.id })),
        },
      },
    })

    console.log('✅ Projeto criado com sucesso!\n')

    // RESUMO
    console.log('═══════════════════════════════════════════════════════════════')
    console.log('✅ PROJETO ADICIONADO COM SUCESSO!')
    console.log('═══════════════════════════════════════════════════════════════')
    console.log(`📁 Slug: ${project.slug}`)
    console.log(`🏆 Título: ${project.title}`)
    console.log(`🎥 Vídeo: https://www.youtube.com/watch?v=1Pcoi_E9SXI`)
    console.log(`📍 Localização: ${project.city}, ${project.stateProvince}`)
    console.log(`📅 Ano: ${project.year}`)
    console.log(`⭐ Featured: ${project.featured}`)
    console.log(`🔢 Priority: ${project.priorityHome}`)
    console.log(`📊 Status: ${project.status}`)
    console.log('═══════════════════════════════════════════════════════════════\n')

    console.log('🔗 PRÓXIMOS PASSOS:')
    console.log('1. Acesse o backoffice: https://backoffice.azmt.com.br/admin/projects')
    console.log('2. O projeto já está publicado e aparecerá na Home!')
    console.log('3. Para editar: clique em "Museu Olímpico do Rio"')
    console.log('4. Para adicionar mais imagens: vá em "Galeria" no projeto\n')

  } catch (error) {
    console.error('❌ ERRO ao adicionar projeto:', error)
    throw error
  }
}

// Executar
addOlympicMuseumProject()
  .then(() => {
    console.log('✨ CONCLUÍDO!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 ERRO FATAL:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

