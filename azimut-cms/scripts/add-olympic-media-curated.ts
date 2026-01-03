/**
 * Script para adicionar MÍDIA CURADORIA do Museu Olímpico
 * 
 * Organizado por TIER de impacto e público-alvo:
 * - TIER 1: Máximo impacto (usar sempre)
 * - TIER 2: Alto impacto (contextos específicos)
 * - TIER 3: Complementar (enriquecer)
 * 
 * Execução: npx tsx scripts/add-olympic-media-curated.ts
 */

import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

interface CuratedMediaItem {
  filename: string
  tier: 1 | 2 | 3
  category: 'jornal' | 'instalacoes' | 'ginastica' | 'eventos' | 'making-of' | 'tecnologia'
  targetAudience: string[] // ['governantes', 'centros-culturais', 'produtoras', 'empresas', 'publico-geral', 'parceiros']
  altPt: string
  altEn: string
  altEs: string
  altFr: string
  order?: number
  highlight?: boolean // Para destacar na galeria principal
}

// ═══════════════════════════════════════════════════════════════
// TIER 1: MÁXIMO IMPACTO (Usar sempre)
// ═══════════════════════════════════════════════════════════════

const tier1Media: CuratedMediaItem[] = [
  {
    filename: 'jornal-o-globo-capa.jpg',
    tier: 1,
    category: 'jornal',
    targetAudience: ['governantes', 'centros-culturais', 'produtoras', 'empresas', 'publico-geral'],
    altPt: 'Capa do jornal O Globo com matéria "Museu para o alto do pódio" - Crédito explícito: Azimut como diretor de Tecnologia-Audiovisual',
    altEn: 'O Globo newspaper front page with article "Museum for the top of the podium" - Explicit credit: Azimut as Technology-Audiovisual Director',
    altEs: 'Portada del periódico O Globo con artículo "Museo para lo alto del podio" - Crédito explícito: Azimut como Director de Tecnología-Audiovisual',
    altFr: 'Première page du journal O Globo avec article "Musée pour le haut du podium" - Crédit explicite: Azimut comme Directeur Technologie-Audiovisuel',
    order: 1,
    highlight: true
  },
  {
    filename: 'velodromo-exterior.jpg',
    tier: 1,
    category: 'instalacoes',
    targetAudience: ['governantes', 'centros-culturais', 'empresas', 'publico-geral'],
    altPt: 'Vista exterior do Velódromo do Parque Olímpico - Sede oficial do Museu Olímpico do Rio, projeto da Prefeitura do Rio de Janeiro',
    altEn: 'Exterior view of Olympic Park Velodrome - Official home of Rio Olympic Museum, City of Rio de Janeiro project',
    altEs: 'Vista exterior del Velódromo del Parque Olímpico - Sede oficial del Museo Olímpico de Río, proyecto de la Prefectura de Río de Janeiro',
    altFr: 'Vue extérieure du Vélodrome du Parc Olympique - Siège officiel du Musée Olympique de Rio, projet de la Mairie de Rio de Janeiro',
    order: 2,
    highlight: true
  },
  {
    filename: 'semi-esfera-verde.jpg',
    tier: 1,
    category: 'instalacoes',
    targetAudience: ['centros-culturais', 'produtoras', 'empresas', 'publico-geral', 'parceiros'],
    altPt: 'Semi-esfera verde e túnel interativo do Museu Olímpico - Tecnologia e inovação desenvolvidas pela Azimut',
    altEn: 'Green semi-sphere and interactive tunnel at Olympic Museum - Technology and innovation developed by Azimut',
    altEs: 'Semi-esfera verde y túnel interactivo del Museo Olímpico - Tecnología e innovación desarrolladas por Azimut',
    altFr: 'Semi-sphère verte et tunnel interactif du Musée Olympique - Technologie et innovation développées par Azimut',
    order: 3,
    highlight: true
  },
  {
    filename: 'bicicleta-interativa.jpg',
    tier: 1,
    category: 'instalacoes',
    targetAudience: ['centros-culturais', 'produtoras', 'empresas', 'publico-geral'],
    altPt: 'Instalação interativa "Pedale pela Cidade" - Games interativos desenvolvidos pela Azimut para o Museu Olímpico',
    altEn: 'Interactive installation "Pedal through the City" - Interactive games developed by Azimut for Olympic Museum',
    altEs: 'Instalación interactiva "Pedalea por la Ciudad" - Juegos interactivos desarrollados por Azimut para el Museo Olímpico',
    altFr: 'Installation interactive "Pédalez dans la Ville" - Jeux interactifs développés par Azimut pour le Musée Olympique',
    order: 4,
    highlight: true
  },
  {
    filename: 'tela-interativa-mapa.jpg',
    tier: 1,
    category: 'tecnologia',
    targetAudience: ['centros-culturais', 'produtoras', 'parceiros'],
    altPt: 'Tela interativa com mapa do Rio - UI/grafismo desenvolvido pela Azimut, integrando tecnologia e conteúdo audiovisual',
    altEn: 'Interactive screen with Rio map - UI/graphics developed by Azimut, integrating technology and audiovisual content',
    altEs: 'Pantalla interactiva con mapa de Río - UI/grafismo desarrollado por Azimut, integrando tecnología y contenido audiovisual',
    altFr: 'Écran interactif avec carte de Rio - UI/grafisme développé par Azimut, intégrant technologie et contenu audiovisuel',
    order: 5,
    highlight: true
  }
]

// ═══════════════════════════════════════════════════════════════
// TIER 2: ALTO IMPACTO (Contextos específicos)
// ═══════════════════════════════════════════════════════════════

const tier2Media: CuratedMediaItem[] = [
  {
    filename: 'ginastica-barras-assimetricas.jpg',
    tier: 2,
    category: 'ginastica',
    targetAudience: ['centros-culturais', 'produtoras'],
    altPt: 'Área de Ginástica Artística - Barras Assimétricas - Exemplo de curadoria e integração perfeita entre equipamento físico, tecnologia e conteúdo audiovisual',
    altEn: 'Artistic Gymnastics area - Uneven Bars - Example of curation and perfect integration between physical equipment, technology and audiovisual content',
    altEs: 'Área de Gimnasia Artística - Barras Asimétricas - Ejemplo de curaduría e integración perfecta entre equipo físico, tecnología y contenido audiovisual',
    altFr: 'Zone de Gymnastique Artistique - Barres Asymétriques - Exemple de curation et intégration parfaite entre équipement physique, technologie et contenu audiovisuel',
    order: 10
  },
  {
    filename: 'ginastica-argolas.jpg',
    tier: 2,
    category: 'ginastica',
    targetAudience: ['centros-culturais', 'produtoras'],
    altPt: 'Área de Ginástica Artística - Argolas - Integração entre equipamento físico Rio 2016, vídeo de atleta e tecnologia interativa',
    altEn: 'Artistic Gymnastics area - Rings - Integration between Rio 2016 physical equipment, athlete video and interactive technology',
    altEs: 'Área de Gimnasia Artística - Anillas - Integración entre equipo físico Rio 2016, video de atleta y tecnología interactiva',
    altFr: 'Zone de Gymnastique Artistique - Anneaux - Intégration entre équipement physique Rio 2016, vidéo d\'athlète et technologie interactive',
    order: 11
  },
  {
    filename: 'inauguracao-1.jpg',
    tier: 2,
    category: 'eventos',
    targetAudience: ['governantes', 'empresas'],
    altPt: 'Inauguração oficial do Museu Olímpico do Rio - Evento com autoridades da Prefeitura do Rio de Janeiro',
    altEn: 'Official inauguration of Rio Olympic Museum - Event with City of Rio de Janeiro authorities',
    altEs: 'Inauguración oficial del Museo Olímpico de Río - Evento con autoridades de la Prefectura de Río de Janeiro',
    altFr: 'Inauguration officielle du Musée Olympique de Rio - Événement avec autorités de la Mairie de Rio de Janeiro',
    order: 20
  },
  {
    filename: 'construcao-1.jpg',
    tier: 2,
    category: 'making-of',
    targetAudience: ['produtoras', 'parceiros'],
    altPt: 'Processo de construção e montagem do Museu Olímpico - Making-of mostrando o trabalho por trás das câmeras da Azimut',
    altEn: 'Construction and assembly process of Olympic Museum - Making-of showing Azimut\'s behind-the-scenes work',
    altEs: 'Proceso de construcción y montaje del Museo Olímpico - Making-of mostrando el trabajo detrás de cámaras de Azimut',
    altFr: 'Processus de construction et montage du Musée Olympique - Making-of montrant le travail dans les coulisses d\'Azimut',
    order: 30
  }
]

// ═══════════════════════════════════════════════════════════════
// TIER 3: COMPLEMENTAR (Enriquecer)
// ═══════════════════════════════════════════════════════════════

const tier3Media: CuratedMediaItem[] = [
  {
    filename: 'ginastica-cavalo-alca.jpg',
    tier: 3,
    category: 'ginastica',
    targetAudience: ['centros-culturais'],
    altPt: 'Área de Ginástica Artística - Cavalo com Alça com equipamento físico Rio 2016',
    altEn: 'Artistic Gymnastics area - Pommel Horse with Rio 2016 physical equipment',
    altEs: 'Área de Gimnasia Artística - Caballo con Arcos con equipo físico Rio 2016',
    altFr: 'Zone de Gymnastique Artistique - Cheval d\'Arçons avec équipement physique Rio 2016',
    order: 40
  },
  {
    filename: 'ginastica-salto.jpg',
    tier: 3,
    category: 'ginastica',
    targetAudience: ['centros-culturais'],
    altPt: 'Área de Ginástica Artística - Salto com equipamento físico Rio 2016',
    altEn: 'Artistic Gymnastics area - Vault with Rio 2016 physical equipment',
    altEs: 'Área de Gimnasia Artística - Salto con equipo físico Rio 2016',
    altFr: 'Zone de Gymnastique Artistique - Saut avec équipement physique Rio 2016',
    order: 41
  },
  {
    filename: 'ginastica-trave-equilibrio.jpg',
    tier: 3,
    category: 'ginastica',
    targetAudience: ['centros-culturais'],
    altPt: 'Área de Ginástica Artística - Trave de Equilíbrio com equipamento físico',
    altEn: 'Artistic Gymnastics area - Balance Beam with physical equipment',
    altEs: 'Área de Gimnasia Artística - Barra de Equilibrio con equipo físico',
    altFr: 'Zone de Gymnastique Artistique - Poutre d\'Équilibre avec équipement physique',
    order: 42
  },
  {
    filename: 'estruturas-arquitetonicas.jpg',
    tier: 3,
    category: 'instalacoes',
    targetAudience: ['publico-geral'],
    altPt: 'Estruturas arquitetônicas coloridas do Museu Olímpico - Integração cenografia, tecnologia e audiovisual pela Azimut',
    altEn: 'Colorful architectural structures at Olympic Museum - Scenography, technology and audiovisual integration by Azimut',
    altEs: 'Estructuras arquitectónicas coloridas del Museo Olímpico - Integración escenografía, tecnología y audiovisual por Azimut',
    altFr: 'Structures architecturales colorées du Musée Olympique - Intégration scénographie, technologie et audiovisuel par Azimut',
    order: 50
  },
  {
    filename: 'crowd-verde.jpg',
    tier: 3,
    category: 'eventos',
    targetAudience: ['publico-geral'],
    altPt: 'Público no espaço verde do Museu Olímpico durante evento',
    altEn: 'Crowd in green space at Olympic Museum during event',
    altEs: 'Público en espacio verde del Museo Olímpico durante evento',
    altFr: 'Foule dans l\'espace vert du Musée Olympique pendant l\'événement',
    order: 60
  }
]

// ═══════════════════════════════════════════════════════════════
// TODAS AS MÍDIAS CURADORIA
// ═══════════════════════════════════════════════════════════════

const allCuratedMedia: CuratedMediaItem[] = [
  ...tier1Media,
  ...tier2Media,
  ...tier3Media
]

// ═══════════════════════════════════════════════════════════════
// FUNÇÃO PRINCIPAL
// ═══════════════════════════════════════════════════════════════

async function addCuratedMedia() {
  console.log('🎯 ADICIONANDO MÍDIA CURADORIA: MUSEU OLÍMPICO DO RIO\n')
  console.log('📊 Organização por TIER de impacto:\n')
  console.log(`   TIER 1 (Máximo impacto): ${tier1Media.length} itens`)
  console.log(`   TIER 2 (Alto impacto): ${tier2Media.length} itens`)
  console.log(`   TIER 3 (Complementar): ${tier3Media.length} itens`)
  console.log(`   TOTAL: ${allCuratedMedia.length} itens\n`)
  console.log('💡 DICA: Você pode executar este script várias vezes!')
  console.log('   Ele só adiciona o que ainda não existe.\n')

  try {
    // 1. Buscar o projeto
    console.log('🔍 Buscando projeto...')
    const project = await prisma.project.findUnique({
      where: { slug: 'museu-olimpico-rio' },
      include: { gallery: { include: { media: true } } }
    })

    if (!project) {
      console.error('❌ Projeto não encontrado!')
      console.error('💡 Execute primeiro: npx tsx scripts/add-olympic-museum-project.ts')
      process.exit(1)
    }

    console.log('✅ Projeto encontrado:', project.title, '\n')

    // 2. Pasta base para uploads
    const baseUploadPath = path.join(process.cwd(), 'public', 'uploads', 'museu-olimpico')
    
    // Criar pasta se não existir
    if (!fs.existsSync(baseUploadPath)) {
      fs.mkdirSync(baseUploadPath, { recursive: true })
      console.log('📁 Pasta criada:', baseUploadPath, '\n')
    }

    // 3. Processar por TIER
    const stats = {
      tier1: { added: 0, skipped: 0, errors: 0 },
      tier2: { added: 0, skipped: 0, errors: 0 },
      tier3: { added: 0, skipped: 0, errors: 0 }
    }

    for (const item of allCuratedMedia) {
      const filePath = path.join(baseUploadPath, item.filename)
      
      // Verificar se arquivo existe
      if (!fs.existsSync(filePath)) {
        // Não mostrar warning para arquivos que ainda não foram adicionados (normal em processo gradual)
        // console.log(`⚠️  Arquivo não encontrado: ${item.filename}`)
        // console.log(`   📍 Esperado em: ${filePath}`)
        stats[`tier${item.tier}` as keyof typeof stats].skipped++
        continue
      }

      try {
        // Verificar se mídia já existe
        const existingMedia = await prisma.media.findFirst({
          where: {
            originalUrl: {
              contains: item.filename
            }
          }
        })

        if (existingMedia) {
          // Não mostrar para cada item existente (pode ser verboso)
          // console.log(`⏭️  Mídia já existe: ${item.filename} (TIER ${item.tier})`)
          stats[`tier${item.tier}` as keyof typeof stats].skipped++
          continue
        }

        // Criar registro de mídia
        const mediaUrl = `/uploads/museu-olimpico/${item.filename}`
        
        const media = await prisma.media.create({
          data: {
            type: 'IMAGE',
            originalUrl: mediaUrl,
            thumbnailUrl: mediaUrl,
            mediumUrl: mediaUrl,
            largeUrl: mediaUrl,
            altPt: item.altPt,
            altEn: item.altEn,
            altEs: item.altEs,
            altFr: item.altFr,
          }
        })

        const tierEmoji = item.tier === 1 ? '⭐' : item.tier === 2 ? '✨' : '📸'
        console.log(`${tierEmoji} Mídia criada: ${item.filename} (TIER ${item.tier}, ${item.category})`)

        // Associar ao projeto
        await prisma.projectMedia.create({
          data: {
            projectId: project.id,
            mediaId: media.id,
            order: item.order || 999,
          }
        })

        // Marcar como highlight se for TIER 1
        if (item.highlight) {
          console.log(`   └─ ⭐ DESTACADA na galeria principal`)
        }

        stats[`tier${item.tier}` as keyof typeof stats].added++

      } catch (error: any) {
        console.error(`❌ Erro ao processar ${item.filename}:`, error.message)
        stats[`tier${item.tier}` as keyof typeof stats].errors++
      }
    }

    // 4. Resumo por TIER
    console.log('\n' + '═'.repeat(60))
    console.log('📊 RESUMO POR TIER:')
    console.log('\n⭐ TIER 1 (Máximo Impacto):')
    console.log(`   ✅ Adicionadas: ${stats.tier1.added}`)
    console.log(`   ⏭️  Ignoradas: ${stats.tier1.skipped}`)
    console.log(`   ❌ Erros: ${stats.tier1.errors}`)
    
    console.log('\n✨ TIER 2 (Alto Impacto):')
    console.log(`   ✅ Adicionadas: ${stats.tier2.added}`)
    console.log(`   ⏭️  Ignoradas: ${stats.tier2.skipped}`)
    console.log(`   ❌ Erros: ${stats.tier2.errors}`)
    
    console.log('\n📸 TIER 3 (Complementar):')
    console.log(`   ✅ Adicionadas: ${stats.tier3.added}`)
    console.log(`   ⏭️  Ignoradas: ${stats.tier3.skipped}`)
    console.log(`   ❌ Erros: ${stats.tier3.errors}`)
    
    const totalAdded = stats.tier1.added + stats.tier2.added + stats.tier3.added
    console.log('\n' + '═'.repeat(60))
    console.log(`🎉 TOTAL ADICIONADO: ${totalAdded} itens`)
    console.log('═'.repeat(60) + '\n')

    if (totalAdded > 0) {
      console.log('💡 Próximos passos:')
      console.log('   1. Verifique no site: /work/museu-olimpico-rio')
      console.log('   2. Teste os filtros e seções temáticas')
      console.log('   3. Adicione mais imagens quando disponível e execute novamente!')
    } else {
      console.log('💡 Nenhuma nova imagem adicionada.')
      console.log('   - Todas as imagens já existem, OU')
      console.log('   - Arquivos ainda não foram colocados na pasta')
      console.log('   📁 Pasta esperada: azimut-cms/public/uploads/museu-olimpico/')
    }

  } catch (error: any) {
    console.error('❌ Erro fatal:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Executar
addCuratedMedia()
  .then(() => {
    console.log('✅ Script concluído!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Erro:', error)
    process.exit(1)
  })

