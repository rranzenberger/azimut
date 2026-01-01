// ════════════════════════════════════════════════════════════
// SCRIPT NODE.JS: POPULAR SERVIÇOS NO BACKOFFICE (NEON)
// ════════════════════════════════════════════════════════════
// Data: 01/01/2026
// Objetivo: Inserir os 6 serviços usando Prisma (mais seguro que SQL direto)
// ════════════════════════════════════════════════════════════

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Iniciando população de serviços...\n')

  // Dados dos 6 serviços
  const servicos = [
    {
      slug: 'cinema-audiovisual',
      titlePt: 'Cinema & Audiovisual',
      titleEn: 'Cinema & Audiovisual',
      titleEs: 'Cine & Audiovisual',
      titleFr: 'Cinéma & Audiovisuel',
      descriptionPt: 'Criamos narrativas cinematográficas que conectam audiências. Do conceito à finalização, entregamos conteúdo de alta qualidade para museus, festivais e marcas, com expertise técnica de 30 anos.',
      descriptionEn: 'We create cinematic narratives that connect audiences. From concept to finishing, we deliver high-quality content for museums, festivals and brands, with 30 years of technical expertise.',
      descriptionEs: 'Creamos narrativas cinematográficas que conectan audiencias. Del concepto a la finalización, entregamos contenido de alta calidad para museos, festivales y marcas, con expertise técnica de 30 años.',
      descriptionFr: 'Nous créons des narrations cinématographiques qui connectent les audiences. Du concept à la finalisation, nous livrons du contenu de haute qualité pour musées, festivals et marques, avec 30 ans d\'expertise technique.',
      icon: '🎬',
      status: 'PUBLISHED',
      priority: 1,
      segments: ['museums', 'festivals', 'brands']
    },
    {
      slug: 'animacao-2d-3d',
      titlePt: 'Animação 2D/3D',
      titleEn: '2D/3D Animation',
      titleEs: 'Animación 2D/3D',
      titleFr: 'Animation 2D/3D',
      descriptionPt: 'Damos vida a personagens e mundos através de animação 2D/3D. Nossa expertise técnica permite criar narrativas visuais envolventes, desde storyboards até finalização completa.',
      descriptionEn: 'We bring characters and worlds to life through 2D/3D animation. Our technical expertise enables us to create engaging visual narratives, from storyboards to complete finishing.',
      descriptionEs: 'Damos vida a personajes y mundos a través de animación 2D/3D. Nuestra expertise técnica nos permite crear narrativas visuales envolventes, desde storyboards hasta finalización completa.',
      descriptionFr: 'Nous donnons vie aux personnages et mondes grâce à l\'animation 2D/3D. Notre expertise technique nous permet de créer des narrations visuelles engageantes, des storyboards à la finalisation complète.',
      icon: '🎨',
      status: 'PUBLISHED',
      priority: 2,
      segments: ['museums', 'festivals', 'brands', 'education']
    },
    {
      slug: 'xr-interatividade',
      titlePt: 'XR / Interatividade',
      titleEn: 'XR / Interactive',
      titleEs: 'XR / Interactivo',
      titleFr: 'XR / Interactif',
      descriptionPt: 'Criamos experiências imersivas que transportam pessoas para novos mundos. De filmes VR 360° a instalações interativas, nossa curadoria em festivais nos dá uma visão única do que funciona em narrativas imersivas.',
      descriptionEn: 'We create immersive experiences that transport people to new worlds. From 360° VR films to interactive installations, our festival curation gives us unique insight into what works in immersive storytelling.',
      descriptionEs: 'Creamos experiencias inmersivas que transportan personas a nuevos mundos. De películas VR 360° a instalaciones interactivas, nuestra curaduría en festivales nos da una visión única de lo que funciona en narrativas inmersivas.',
      descriptionFr: 'Nous créons des expériences immersives qui transportent les gens vers de nouveaux mondes. Des films VR 360° aux installations interactives, notre curation de festivals nous donne un aperçu unique de ce qui fonctionne dans la narration immersive.',
      icon: '🥽',
      status: 'PUBLISHED',
      priority: 3,
      segments: ['museums', 'festivals', 'brands']
    },
    {
      slug: 'ia-criativa',
      titlePt: 'IA Criativa',
      titleEn: 'Creative AI',
      titleEs: 'IA Creativa',
      titleFr: 'IA Créative',
      descriptionPt: 'Exploramos o potencial da IA generativa para narrativas. Nossa pesquisa desde 1997 e experiência prática nos permite criar pipelines únicos que combinam IA com linguagem cinematográfica tradicional.',
      descriptionEn: 'We explore the potential of generative AI for storytelling. Our research since 1997 and practical experience enables us to create unique pipelines that combine AI with traditional cinematic language.',
      descriptionEs: 'Exploramos el potencial de la IA generativa para narrativas. Nuestra investigación desde 1997 y experiencia práctica nos permite crear pipelines únicos que combinan IA con lenguaje cinematográfico tradicional.',
      descriptionFr: 'Nous explorons le potentiel de l\'IA générative pour la narration. Nos recherches depuis 1997 et notre expérience pratique nous permettent de créer des pipelines uniques qui combinent IA et langage cinématographique traditionnel.',
      icon: '🤖',
      status: 'PUBLISHED',
      priority: 4,
      segments: ['museums', 'festivals', 'brands', 'research']
    },
    {
      slug: 'educacao-formacao',
      titlePt: 'Educação & Formação',
      titleEn: 'Education & Training',
      titleEs: 'Educación & Formación',
      titleFr: 'Éducation & Formation',
      descriptionPt: 'Compartilhamos conhecimento acumulado em 30 anos. Nossos workshops e mentorias formaram centenas de profissionais, enquanto nossa curadoria em festivais nos permite identificar e apresentar as melhores práticas do setor.',
      descriptionEn: 'We share knowledge accumulated over 30 years. Our workshops and mentoring have trained hundreds of professionals, while our festival curation allows us to identify and present the industry\'s best practices.',
      descriptionEs: 'Compartimos conocimiento acumulado en 30 años. Nuestros workshops y mentorías han formado cientos de profesionales, mientras nuestra curaduría en festivales nos permite identificar y presentar las mejores prácticas del sector.',
      descriptionFr: 'Nous partageons les connaissances accumulées sur 30 ans. Nos ateliers et mentorats ont formé des centaines de professionnels, tandis que notre curation de festivals nous permet d\'identifier et présenter les meilleures pratiques de l\'industrie.',
      icon: '📚',
      status: 'PUBLISHED',
      priority: 5,
      segments: ['education', 'festivals']
    },
    {
      slug: 'consultoria-estrategia',
      titlePt: 'Consultoria & Estratégia',
      titleEn: 'Consulting & Strategy',
      titleEs: 'Consultoría & Estrategia',
      titleFr: 'Conseil & Stratégie',
      descriptionPt: 'Acompanhamos projetos desde a concepção até a execução. Nossa experiência em captação de recursos (editais nacionais e internacionais) e estratégia de IA permite que clientes realizem projetos que de outra forma não conseguiriam.',
      descriptionEn: 'We support projects from conception to execution. Our experience in funding (national and international grants) and AI strategy enables clients to realize projects they otherwise could not.',
      descriptionEs: 'Acompañamos proyectos desde la concepción hasta la ejecución. Nuestra experiencia en captación de recursos (editais nacionales e internacionales) y estrategia de IA permite que clientes realicen proyectos que de otra forma no podrían.',
      descriptionFr: 'Nous accompagnons les projets de la conception à l\'exécution. Notre expérience en financement (subventions nationales et internationales) et stratégie IA permet aux clients de réaliser des projets qu\'ils ne pourraient pas autrement.',
      icon: '💡',
      status: 'PUBLISHED',
      priority: 6,
      segments: ['museums', 'brands', 'government']
    }
  ]

  // Criar cada serviço
  let criados = 0
  let ignorados = 0

  for (const servico of servicos) {
    try {
      // Verificar se já existe
      const existe = await prisma.service.findUnique({
        where: { slug: servico.slug }
      })

      if (existe) {
        console.log(`⏭️  Serviço "${servico.slug}" já existe, pulando...`)
        ignorados++
        continue
      }

      // Criar serviço
      await prisma.service.create({
        data: servico
      })

      console.log(`✅ Serviço "${servico.titlePt}" criado com sucesso!`)
      criados++
    } catch (error) {
      console.error(`❌ Erro ao criar "${servico.slug}":`, error.message)
    }
  }

  console.log(`\n📊 Resumo:`)
  console.log(`   ✅ Criados: ${criados}`)
  console.log(`   ⏭️  Ignorados (já existiam): ${ignorados}`)
  console.log(`   📦 Total: ${servicos.length}`)

  // Listar serviços criados
  console.log('\n📋 Serviços no banco:')
  const todos = await prisma.service.findMany({
    orderBy: { priority: 'asc' },
    select: {
      slug: true,
      titlePt: true,
      icon: true,
      status: true,
      priority: true
    }
  })

  todos.forEach(s => {
    console.log(`   ${s.icon} ${s.titlePt} (${s.slug}) - ${s.status} - Prioridade: ${s.priority}`)
  })

  console.log('\n✅ Concluído!')
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
// 
// 1. Certifique-se que DATABASE_URL está no .env
// 2. Execute:
//    cd azimut-cms
//    node migrations/popular-servicos.js
// 
// ════════════════════════════════════════════════════════════

