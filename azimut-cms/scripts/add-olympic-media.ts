/**
 * Script para adicionar TODAS as imagens do Museu Olímpico ao backoffice
 * 
 * Organiza por categorias:
 * - Jornal (O Globo)
 * - Instalações (velódromo, semi-esfera, interativos)
 * - Ginástica (5 áreas temáticas)
 * - Eventos (inauguração, crowd)
 * - Making-of (construção, timelapse)
 * 
 * Execução: npx tsx scripts/add-olympic-media.ts
 * 
 * IMPORTANTE: Antes de executar, coloque as imagens na pasta:
 * azimut-cms/public/uploads/museu-olimpico/
 */

import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

interface MediaItem {
  filename: string
  category: 'jornal' | 'instalacoes' | 'ginastica' | 'eventos' | 'making-of'
  altPt: string
  altEn: string
  altEs: string
  altFr: string
  order?: number
}

// ═══════════════════════════════════════════════════════════════
// CONFIGURAÇÃO: Adicione aqui as imagens que você tem
// ═══════════════════════════════════════════════════════════════

const mediaItems: MediaItem[] = [
  // JORNAL
  {
    filename: 'jornal-o-globo-capa.jpg',
    category: 'jornal',
    altPt: 'Capa do jornal O Globo com matéria sobre o Museu Olímpico do Rio - Crédito: Azimut como diretor de Tecnologia-Audiovisual',
    altEn: 'O Globo newspaper front page with article about Rio Olympic Museum - Credit: Azimut as Technology-Audiovisual Director',
    altEs: 'Portada del periódico O Globo con artículo sobre el Museo Olímpico de Río - Crédito: Azimut como Director de Tecnología-Audiovisual',
    altFr: 'Première page du journal O Globo avec article sur le Musée Olympique de Rio - Crédit: Azimut comme Directeur Technologie-Audiovisuel',
    order: 1
  },
  {
    filename: 'jornal-o-globo-materia.jpg',
    category: 'jornal',
    altPt: 'Matéria completa do jornal O Globo sobre o Museu Olímpico do Rio',
    altEn: 'Complete O Globo newspaper article about Rio Olympic Museum',
    altEs: 'Artículo completo del periódico O Globo sobre el Museo Olímpico de Río',
    altFr: 'Article complet du journal O Globo sur le Musée Olympique de Rio',
    order: 2
  },

  // INSTALAÇÕES
  {
    filename: 'velodromo-exterior.jpg',
    category: 'instalacoes',
    altPt: 'Vista exterior do Velódromo do Parque Olímpico, sede do Museu Olímpico do Rio',
    altEn: 'Exterior view of Olympic Park Velodrome, home of Rio Olympic Museum',
    altEs: 'Vista exterior del Velódromo del Parque Olímpico, sede del Museo Olímpico de Río',
    altFr: 'Vue extérieure du Vélodrome du Parc Olympique, siège du Musée Olympique de Rio',
    order: 1
  },
  {
    filename: 'semi-esfera-verde.jpg',
    category: 'instalacoes',
    altPt: 'Semi-esfera verde e túnel interativo do Museu Olímpico - Tecnologia Azimut',
    altEn: 'Green semi-sphere and interactive tunnel at Olympic Museum - Azimut Technology',
    altEs: 'Semi-esfera verde y túnel interactivo del Museo Olímpico - Tecnología Azimut',
    altFr: 'Semi-sphère verte et tunnel interactif du Musée Olympique - Technologie Azimut',
    order: 2
  },
  {
    filename: 'bicicleta-interativa.jpg',
    category: 'instalacoes',
    altPt: 'Instalação interativa "Pedale pela Cidade" - Games interativos desenvolvidos pela Azimut',
    altEn: 'Interactive installation "Pedal through the City" - Interactive games developed by Azimut',
    altEs: 'Instalación interactiva "Pedalea por la Ciudad" - Juegos interactivos desarrollados por Azimut',
    altFr: 'Installation interactive "Pédalez dans la Ville" - Jeux interactifs développés par Azimut',
    order: 3
  },
  {
    filename: 'tela-interativa-mapa.jpg',
    category: 'instalacoes',
    altPt: 'Tela interativa com mapa do Rio - UI/grafismo desenvolvido pela Azimut',
    altEn: 'Interactive screen with Rio map - UI/graphics developed by Azimut',
    altEs: 'Pantalla interactiva con mapa de Río - UI/grafismo desarrollado por Azimut',
    altFr: 'Écran interactif avec carte de Rio - UI/grafisme développé par Azimut',
    order: 4
  },
  {
    filename: 'estruturas-arquitetonicas.jpg',
    category: 'instalacoes',
    altPt: 'Estruturas arquitetônicas coloridas do Museu Olímpico - Integração cenografia, tecnologia e audiovisual pela Azimut',
    altEn: 'Colorful architectural structures at Olympic Museum - Scenography, technology and audiovisual integration by Azimut',
    altEs: 'Estructuras arquitectónicas coloridas del Museo Olímpico - Integración escenografía, tecnología y audiovisual por Azimut',
    altFr: 'Structures architecturales colorées du Musée Olympique - Intégration scénographie, technologie et audiovisuel par Azimut',
    order: 5
  },

  // GINÁSTICA ARTÍSTICA
  {
    filename: 'ginastica-barras-assimetricas.jpg',
    category: 'ginastica',
    altPt: 'Área de Ginástica Artística - Barras Assimétricas com equipamento físico e tela interativa',
    altEn: 'Artistic Gymnastics area - Uneven Bars with physical equipment and interactive screen',
    altEs: 'Área de Gimnasia Artística - Barras Asimétricas con equipo físico y pantalla interactiva',
    altFr: 'Zone de Gymnastique Artistique - Barres Asymétriques avec équipement physique et écran interactif',
    order: 1
  },
  {
    filename: 'ginastica-argolas.jpg',
    category: 'ginastica',
    altPt: 'Área de Ginástica Artística - Argolas com equipamento físico e vídeo de atleta',
    altEn: 'Artistic Gymnastics area - Rings with physical equipment and athlete video',
    altEs: 'Área de Gimnasia Artística - Anillas con equipo físico y video de atleta',
    altFr: 'Zone de Gymnastique Artistique - Anneaux avec équipement physique et vidéo d\'athlète',
    order: 2
  },
  {
    filename: 'ginastica-cavalo-alca.jpg',
    category: 'ginastica',
    altPt: 'Área de Ginástica Artística - Cavalo com Alça com equipamento físico Rio 2016',
    altEn: 'Artistic Gymnastics area - Pommel Horse with Rio 2016 physical equipment',
    altEs: 'Área de Gimnasia Artística - Caballo con Arcos con equipo físico Rio 2016',
    altFr: 'Zone de Gymnastique Artistique - Cheval d\'Arçons avec équipement physique Rio 2016',
    order: 3
  },
  {
    filename: 'ginastica-salto.jpg',
    category: 'ginastica',
    altPt: 'Área de Ginástica Artística - Salto com equipamento físico Rio 2016',
    altEn: 'Artistic Gymnastics area - Vault with Rio 2016 physical equipment',
    altEs: 'Área de Gimnasia Artística - Salto con equipo físico Rio 2016',
    altFr: 'Zone de Gymnastique Artistique - Saut avec équipement physique Rio 2016',
    order: 4
  },
  {
    filename: 'ginastica-trave-equilibrio.jpg',
    category: 'ginastica',
    altPt: 'Área de Ginástica Artística - Trave de Equilíbrio com equipamento físico',
    altEn: 'Artistic Gymnastics area - Balance Beam with physical equipment',
    altEs: 'Área de Gimnasia Artística - Barra de Equilibrio con equipo físico',
    altFr: 'Zone de Gymnastique Artistique - Poutre d\'Équilibre avec équipement physique',
    order: 5
  },

  // EVENTOS
  {
    filename: 'inauguracao-1.jpg',
    category: 'eventos',
    altPt: 'Inauguração do Museu Olímpico do Rio - Evento oficial com autoridades',
    altEn: 'Rio Olympic Museum inauguration - Official event with authorities',
    altEs: 'Inauguración del Museo Olímpico de Río - Evento oficial con autoridades',
    altFr: 'Inauguration du Musée Olympique de Rio - Événement officiel avec autorités',
    order: 1
  },
  {
    filename: 'crowd-verde.jpg',
    category: 'eventos',
    altPt: 'Público no espaço verde do Museu Olímpico durante evento',
    altEn: 'Crowd in green space at Olympic Museum during event',
    altEs: 'Público en espacio verde del Museo Olímpico durante evento',
    altFr: 'Foule dans l\'espace vert du Musée Olympique pendant l\'événement',
    order: 2
  },

  // MAKING-OF
  {
    filename: 'construcao-1.jpg',
    category: 'making-of',
    altPt: 'Processo de construção e montagem do Museu Olímpico - Making-of',
    altEn: 'Construction and assembly process of Olympic Museum - Making-of',
    altEs: 'Proceso de construcción y montaje del Museo Olímpico - Making-of',
    altFr: 'Processus de construction et montage du Musée Olympique - Making-of',
    order: 1
  },
  // Adicione mais imagens de making-of aqui conforme disponível
]

// ═══════════════════════════════════════════════════════════════
// FUNÇÃO PRINCIPAL
// ═══════════════════════════════════════════════════════════════

async function addOlympicMedia() {
  console.log('🏆 ADICIONANDO MÍDIA: MUSEU OLÍMPICO DO RIO\n')
  console.log('📸 Total de itens configurados:', mediaItems.length, '\n')

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

    // 3. Processar cada item de mídia
    let added = 0
    let skipped = 0
    let errors = 0

    for (const item of mediaItems) {
      const filePath = path.join(baseUploadPath, item.filename)
      
      // Verificar se arquivo existe
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  Arquivo não encontrado: ${item.filename}`)
        console.log(`   📍 Esperado em: ${filePath}`)
        skipped++
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
          console.log(`⏭️  Mídia já existe: ${item.filename}`)
          skipped++
          continue
        }

        // Criar registro de mídia
        // NOTA: Este script assume que as imagens já estão processadas
        // Para upload real, use a API /api/admin/media
        const mediaUrl = `/uploads/museu-olimpico/${item.filename}`
        
        const media = await prisma.media.create({
          data: {
            type: 'IMAGE',
            originalUrl: mediaUrl,
            thumbnailUrl: mediaUrl, // Será processado depois
            mediumUrl: mediaUrl,
            largeUrl: mediaUrl,
            altPt: item.altPt,
            altEn: item.altEn,
            altEs: item.altEs,
            altFr: item.altFr,
          }
        })

        console.log(`✅ Mídia criada: ${item.filename} (${item.category})`)

        // Associar ao projeto
        await prisma.projectMedia.create({
          data: {
            projectId: project.id,
            mediaId: media.id,
            order: item.order || 999,
          }
        })

        console.log(`   └─ Associada ao projeto (ordem: ${item.order || 999})`)
        added++

      } catch (error: any) {
        console.error(`❌ Erro ao processar ${item.filename}:`, error.message)
        errors++
      }
    }

    // 4. Resumo
    console.log('\n' + '═'.repeat(50))
    console.log('📊 RESUMO:')
    console.log(`   ✅ Adicionadas: ${added}`)
    console.log(`   ⏭️  Ignoradas: ${skipped}`)
    console.log(`   ❌ Erros: ${errors}`)
    console.log('═'.repeat(50) + '\n')

    if (added > 0) {
      console.log('🎉 Mídia adicionada com sucesso!')
      console.log('💡 Próximo passo: Processar imagens via API para gerar thumbnails')
    }

  } catch (error: any) {
    console.error('❌ Erro fatal:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Executar
addOlympicMedia()
  .then(() => {
    console.log('✅ Script concluído!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Erro:', error)
    process.exit(1)
  })

