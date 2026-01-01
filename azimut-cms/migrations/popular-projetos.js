// ════════════════════════════════════════════════════════════
// SCRIPT: POPULAR PROJETOS NO BACKOFFICE
// ════════════════════════════════════════════════════════════
// Data: 01/01/2026
// Objetivo: Inserir os 3 projetos exemplo com textos em 4 idiomas
// ════════════════════════════════════════════════════════════

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Iniciando população de projetos...\n')

  // Dados dos 3 projetos exemplo
  const projetos = [
    {
      slug: 'instalacao-imersiva',
      title: 'Instalação Imersiva',
      shortTitle: 'Experiência Visual Interativa',
      summaryPt: 'Uma instalação interativa que combina narrativa cinematográfica com tecnologia imersiva para criar uma experiência única que conecta audiências de diferentes culturas.',
      summaryEn: 'An interactive installation that combines cinematic storytelling with immersive technology to create a unique experience that connects audiences from different cultures.',
      summaryEs: 'Una instalación interactiva que combina narrativa cinematográfica con tecnología inmersiva para crear una experiencia única que conecta audiencias de diferentes culturas.',
      summaryFr: 'Une installation interactive qui combine narration cinématographique et technologie immersive pour créer une expérience unique qui connecte des audiences de différentes cultures.',
      city: 'São Paulo',
      country: 'Brasil',
      year: 2024,
      type: 'INSTALLATION',
      featured: true,
      priorityHome: 1,
      status: 'PUBLISHED'
    },
    {
      slug: 'exposicao-digital',
      title: 'Exposição Digital',
      shortTitle: 'Narrativa Espacial',
      summaryPt: 'Uma exposição que utiliza realidade aumentada e projeções mapeadas para contar histórias através do espaço físico.',
      summaryEn: 'An exhibition that uses augmented reality and mapped projections to tell stories through physical space.',
      summaryEs: 'Una exposición que utiliza realidad aumentada y proyecciones mapeadas para contar historias a través del espacio físico.',
      summaryFr: 'Une exposition qui utilise la réalité augmentée et les projections mappées pour raconter des histoires à travers l\'espace physique.',
      city: 'Montreal',
      country: 'Canadá',
      year: 2024,
      type: 'EXHIBITION',
      featured: false,
      priorityHome: 2,
      status: 'PUBLISHED'
    },
    {
      slug: 'filme-vr-360',
      title: 'Filme VR 360°',
      shortTitle: 'Experiência Virtual',
      summaryPt: 'Um filme de realidade virtual que transporta o espectador para diferentes locais e momentos históricos.',
      summaryEn: 'A virtual reality film that transports the viewer to different locations and historical moments.',
      summaryEs: 'Una película de realidad virtual que transporta al espectador a diferentes lugares y momentos históricos.',
      summaryFr: 'Un film de réalité virtuelle qui transporte le spectateur vers différents lieux et moments historiques.',
      city: 'Rio de Janeiro',
      country: 'Brasil',
      year: 2023,
      type: 'VR_FILM',
      featured: false,
      priorityHome: 3,
      status: 'PUBLISHED'
    }
  ]

  // Tags para os projetos
  const tagsData = [
    { slug: 'imersivo', labelPt: 'Imersivo', labelEn: 'Immersive', labelEs: 'Inmersivo', labelFr: 'Immersif', category: 'TECHNOLOGY' },
    { slug: 'interativo', labelPt: 'Interativo', labelEn: 'Interactive', labelEs: 'Interactivo', labelFr: 'Interactif', category: 'TECHNOLOGY' },
    { slug: 'cinema', labelPt: 'Cinema', labelEn: 'Cinema', labelEs: 'Cine', labelFr: 'Cinéma', category: 'FORMAT' },
    { slug: 'ar', labelPt: 'AR', labelEn: 'AR', labelEs: 'AR', labelFr: 'AR', category: 'TECHNOLOGY' },
    { slug: 'educacao', labelPt: 'Educação', labelEn: 'Education', labelEs: 'Educación', labelFr: 'Éducation', category: 'INDUSTRY' },
    { slug: 'vr', labelPt: 'VR', labelEn: 'VR', labelEs: 'VR', labelFr: 'VR', category: 'TECHNOLOGY' },
    { slug: '360', labelPt: '360°', labelEn: '360°', labelEs: '360°', labelFr: '360°', category: 'FORMAT' }
  ]

  // Criar tags primeiro
  console.log('🏷️  Criando/verificando tags...\n')
  const tagsMap = {}
  
  for (const tagData of tagsData) {
    try {
      const tag = await prisma.tag.upsert({
        where: { slug: tagData.slug },
        update: tagData,
        create: tagData
      })
      tagsMap[tagData.slug] = tag.id
      console.log(`   ✅ Tag "${tagData.labelPt}" (${tagData.slug})`)
    } catch (error) {
      console.log(`   ⚠️  Erro ao criar tag "${tagData.slug}":`, error.message)
    }
  }

  // Associar tags aos projetos
  const projetoTags = [
    { projeto: 'instalacao-imersiva', tags: ['imersivo', 'interativo', 'cinema'] },
    { projeto: 'exposicao-digital', tags: ['ar', 'educacao'] },
    { projeto: 'filme-vr-360', tags: ['vr', '360', 'cinema'] }
  ]

  // Criar projetos
  console.log('\n📁 Criando projetos...\n')
  let criados = 0
  let ignorados = 0

  for (const projeto of projetos) {
    try {
      // Verificar se já existe
      const existe = await prisma.project.findUnique({
        where: { slug: projeto.slug }
      })

      if (existe) {
        console.log(`⏭️  Projeto "${projeto.slug}" já existe, pulando...`)
        ignorados++
        continue
      }

      // Buscar tags deste projeto
      const tagsProjeto = projetoTags.find(pt => pt.projeto === projeto.slug)
      const tagIds = tagsProjeto 
        ? tagsProjeto.tags.map(t => tagsMap[t]).filter(Boolean)
        : []

      // Criar projeto com tags
      await prisma.project.create({
        data: {
          ...projeto,
          tags: {
            connect: tagIds.map(id => ({ id }))
          }
        }
      })

      console.log(`✅ Projeto "${projeto.title}" criado com sucesso!`)
      criados++
    } catch (error) {
      console.error(`❌ Erro ao criar "${projeto.slug}":`, error.message)
    }
  }

  console.log(`\n📊 Resumo:`)
  console.log(`   ✅ Criados: ${criados}`)
  console.log(`   ⏭️  Ignorados (já existiam): ${ignorados}`)
  console.log(`   📦 Total: ${projetos.length}`)

  // Listar projetos criados
  console.log('\n📋 Projetos no banco:')
  const todos = await prisma.project.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { priorityHome: 'asc' },
    select: {
      slug: true,
      title: true,
      status: true,
      priorityHome: true,
      featured: true,
      heroImageId: true,
      tags: {
        select: { labelPt: true }
      }
    }
  })

  todos.forEach(p => {
    const tagsList = p.tags.map(t => t.labelPt).join(', ')
    const imagemStatus = p.heroImageId ? '✅ Tem imagem' : '⚠️  Aguardando imagem'
    const destaque = p.featured ? '⭐ DESTAQUE' : ''
    console.log(`   ${p.title} (${p.slug})`)
    console.log(`      ${imagemStatus} | Tags: ${tagsList || 'Nenhuma'} ${destaque}`)
  })

  console.log('\n✅ Concluído!')
  console.log('\n💡 Próximo passo: Adicionar imagens hero aos projetos no backoffice')
}

main()
  .catch(e => {
    console.error('❌ Erro fatal:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

// ════════════════════════════════════════════════════════════
// COMO EXECUTAR:
// ════════════════════════════════════════════════════════════
// cd azimut-cms
// node migrations/popular-projetos.js
// ════════════════════════════════════════════════════════════

