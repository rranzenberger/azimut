// ════════════════════════════════════════════════════════════
// SCRIPT: POPULAR DADOS DE TESTE NO BANCO DE DADOS
// ════════════════════════════════════════════════════════════
// 
// USO:
//   npx tsx scripts/populate-test-data.ts
//
// APAGAR DADOS DE TESTE:
//   npx tsx scripts/delete-test-data.ts
//
// ════════════════════════════════════════════════════════════

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Prefixo para identificar dados de teste
const TEST_PREFIX = 'TESTE_'

// Dados fictícios para gerar dados realistas - VARIEDADE MÁXIMA
const countries = [
  'BR', 'CA', 'BR', 'CA', 'BR', 'CA', // 30% BR, 30% CA
  'US', 'US', 'FR', 'FR', 'ES', 'ES', 'PT', 'PT', // 20% outros principais
  'AR', 'MX', 'CL', 'CO', 'PE', 'UY', 'BO', 'PY', // 20% América Latina
  'GB', 'DE', 'IT', 'NL', 'BE', 'CH', 'AT', 'SE', // 10% Europa
  'AU', 'NZ', 'JP', 'KR', 'CN', 'IN', 'ZA', 'EG'  // 10% outros continentes
]

const cities = {
  BR: ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Curitiba', 'Porto Alegre', 'Salvador', 'Recife', 'Fortaleza', 'Brasília', 'Florianópolis', 'Manaus', 'Belém', 'Goiânia', 'Vitória', 'Natal'],
  CA: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa', 'Quebec City', 'Winnipeg', 'Edmonton', 'Victoria', 'Halifax', 'Hamilton', 'London', 'Kitchener', 'Windsor', 'Saskatoon'],
  US: ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Boston', 'San Francisco', 'Seattle', 'Washington', 'Atlanta', 'Dallas'],
  FR: ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Bordeaux', 'Lille', 'Rennes'],
  ES: ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Bilbao', 'Málaga', 'Murcia', 'Zaragoza', 'Palma', 'Las Palmas'],
  PT: ['Lisboa', 'Porto', 'Coimbra', 'Braga', 'Faro', 'Aveiro', 'Évora', 'Setúbal', 'Funchal', 'Ponta Delgada'],
  AR: ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'La Plata', 'Tucumán', 'Mar del Plata', 'Salta', 'Santa Fe', 'San Juan'],
  MX: ['Mexico City', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana', 'León', 'Juárez', 'Torreón', 'Querétaro', 'San Luis Potosí'],
  CL: ['Santiago', 'Valparaíso', 'Concepción', 'La Serena', 'Antofagasta', 'Temuco', 'Rancagua', 'Talca', 'Arica', 'Iquique'],
  CO: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Bucaramanga', 'Pereira', 'Santa Marta', 'Manizales', 'Armenia'],
  PE: ['Lima', 'Arequipa', 'Trujillo', 'Chiclayo', 'Piura', 'Iquitos', 'Cusco', 'Huancayo', 'Tacna', 'Ica'],
  UY: ['Montevideo', 'Salto', 'Ciudad de la Costa', 'Paysandú', 'Las Piedras', 'Rivera', 'Maldonado', 'Tacuarembó', 'Melo', 'Mercedes'],
  BO: ['La Paz', 'Santa Cruz', 'Cochabamba', 'Sucre', 'El Alto', 'Oruro', 'Tarija', 'Potosí', 'Trinidad', 'Cobija'],
  PY: ['Asunción', 'Ciudad del Este', 'San Lorenzo', 'Luque', 'Capiatá', 'Lambaré', 'Fernando de la Mora', 'Encarnación', 'Pedro Juan Caballero', 'Villarrica'],
  GB: ['London', 'Manchester', 'Birmingham', 'Glasgow', 'Liverpool', 'Leeds', 'Edinburgh', 'Bristol', 'Cardiff', 'Belfast'],
  DE: ['Berlin', 'Munich', 'Hamburg', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig'],
  IT: ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo', 'Genoa', 'Bologna', 'Florence', 'Bari', 'Catania'],
  NL: ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven', 'Groningen', 'Tilburg', 'Almere', 'Breda', 'Nijmegen'],
  BE: ['Brussels', 'Antwerp', 'Ghent', 'Charleroi', 'Liège', 'Bruges', 'Namur', 'Leuven', 'Mons', 'Aalst'],
  CH: ['Zurich', 'Geneva', 'Basel', 'Bern', 'Lausanne', 'Winterthur', 'Lucerne', 'St. Gallen', 'Lugano', 'Biel'],
  AT: ['Vienna', 'Graz', 'Linz', 'Salzburg', 'Innsbruck', 'Klagenfurt', 'Villach', 'Wels', 'Sankt Pölten', 'Dornbirn'],
  SE: ['Stockholm', 'Gothenburg', 'Malmö', 'Uppsala', 'Västerås', 'Örebro', 'Linköping', 'Helsingborg', 'Jönköping', 'Norrköping'],
  AU: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Newcastle', 'Canberra', 'Sunshine Coast', 'Wollongong'],
  NZ: ['Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Tauranga', 'Napier', 'Palmerston North', 'Rotorua', 'New Plymouth', 'Whangarei'],
  JP: ['Tokyo', 'Yokohama', 'Osaka', 'Nagoya', 'Sapporo', 'Fukuoka', 'Kobe', 'Kawasaki', 'Kyoto', 'Saitama'],
  KR: ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon', 'Gwangju', 'Suwon', 'Ulsan', 'Changwon', 'Goyang'],
  CN: ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Hangzhou', 'Wuhan', 'Xi\'an', 'Nanjing', 'Tianjin'],
  IN: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Surat', 'Pune', 'Jaipur'],
  ZA: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth', 'Bloemfontein', 'East London', 'Pietermaritzburg', 'Nelspruit', 'Kimberley'],
  EG: ['Cairo', 'Alexandria', 'Giza', 'Shubra El Kheima', 'Port Said', 'Suez', 'Luxor', 'Aswan', 'Asyut', 'Ismailia']
}

// Tipos de perfis e emails - EXPANDIDO COM PERFIS DO SITE
const profileTypes = [
  // Profissionais Culturais
  { type: 'diretor', emails: ['diretor', 'director', 'dir'], hot: 0.7, interests: ['cinema', 'exhibition'] },
  { type: 'curador', emails: ['curador', 'curator', 'cur'], hot: 0.6, interests: ['exhibition', 'museum'] },
  { type: 'produtora', emails: ['produtora', 'production', 'prod'], hot: 0.5, interests: ['cinema', 'xr'] },
  
  // Instituições
  { type: 'instituicao', emails: ['museu', 'museum', 'instituto', 'institute', 'fundacao', 'foundation'], hot: 0.4, interests: ['exhibition', 'museum'] },
  { type: 'festival', emails: ['festival'], hot: 0.6, interests: ['cinema', 'festival'] },
  
  // Educação e Pesquisa
  { type: 'professor', emails: ['professor', 'teacher', 'prof'], hot: 0.3, interests: ['education', 'research'] },
  { type: 'pesquisador', emails: ['pesquisador', 'researcher', 'research'], hot: 0.4, interests: ['research', 'xr'] },
  
  // Estudantes (diversos interesses)
  { type: 'aluno_vr', emails: ['aluno', 'student', 'estudante'], hot: 0.2, interests: ['vr', 'xr', 'vancouver'] },
  { type: 'aluno_animation', emails: ['aluno', 'student', 'estudante'], hot: 0.2, interests: ['animation', 'motion', 'vancouver'] },
  { type: 'aluno_game', emails: ['aluno', 'student', 'estudante'], hot: 0.2, interests: ['game', 'vancouver'] },
  { type: 'aluno_vancouver', emails: ['aluno', 'student', 'estudante'], hot: 0.3, interests: ['vancouver', 'education'] },
  { type: 'aluno_geral', emails: ['aluno', 'student', 'estudante'], hot: 0.15, interests: ['education'] },
  
  // Interessados em VR/XR
  { type: 'vr_enthusiast', emails: ['vr', 'xr', 'immersive'], hot: 0.5, interests: ['vr', 'xr'] },
  { type: 'motion_designer', emails: ['motion', 'designer', 'mograph'], hot: 0.4, interests: ['motion', 'animation'] },
  { type: 'game_developer', emails: ['game', 'developer', 'gamedev'], hot: 0.4, interests: ['game', 'vancouver'] },
  
  // Interessados em Estudar Fora
  { type: 'estudar_fora', emails: ['estudar', 'study', 'vancouver'], hot: 0.3, interests: ['vancouver', 'education'] },
  { type: 'vancouver_interested', emails: ['vancouver', 'vfs', 'vanarts'], hot: 0.35, interests: ['vancouver', 'education'] },
]

// Domínios por tipo
const domainTypes = {
  BR: {
    instituicao: ['museu.gov.br', 'museu.br', 'instituto.br', 'fundacao.br', '.edu.br'],
    produtora: ['producoes.com.br', 'films.com.br', 'cine.com.br', 'studio.com.br'],
    pessoal: ['gmail.com', 'hotmail.com', 'yahoo.com.br', 'outlook.com'],
    festival: ['festival.com.br', 'festival.br'],
    aluno: ['estudante.ufrj.br', 'aluno.usp.br', 'estudante.puc-rio.br', 'aluno.unb.br']
  },
  CA: {
    instituicao: ['museum.ca', 'gallery.ca', 'institute.ca', '.edu.ca', 'cultural.ca'],
    produtora: ['productions.ca', 'films.ca', 'studio.ca', 'media.ca'],
    pessoal: ['gmail.com', 'hotmail.com', 'yahoo.ca', 'outlook.com'],
    festival: ['festival.ca', 'filmfest.ca'],
    aluno: ['student.ubc.ca', 'student.utoronto.ca', 'student.mcgill.ca']
  }
}

const devices = ['desktop', 'mobile', 'tablet'] as const
const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera'] as const
const os = ['Windows', 'macOS', 'Linux', 'iOS', 'Android'] as const
const screenResolutions = ['1920x1080', '1366x768', '1440x900', '1536x864', '375x667', '414x896', '768x1024']

const pages = [
  // Páginas principais
  '/', '/en', '/fr', '/es', '/pt',
  
  // Work/Projetos
  '/work',
  '/work/museu-olimpico-rio',
  '/work/projeto-exemplo-1',
  
  // Serviços/Áreas
  '/studio',
  '/academy',
  '/contact',
  
  // Vancouver/Academia (mais visitadas por estudantes)
  '/vancouver',
  '/academy/vancouver',
  '/academy/vfs',
  '/academy/vanarts',
  
  // Conteúdo específico
  '/academy/animation',
  '/academy/game-design',
  '/academy/vr',
  '/academy/motion-graphics',
  
  // Outras páginas
  '/about',
  '/services',
]

const behaviorTypes = ['page_view', 'click', 'scroll', 'form_start', 'form_submit', 'download', 'video_play'] as const

// Função para gerar fingerprint único
function generateFingerprint(index: number): string {
  return `${TEST_PREFIX}fingerprint_${String(index).padStart(6, '0')}`
}

// Função para gerar IP aleatório
function generateIP(): string {
  return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
}

// Função para gerar data aleatória nos últimos 60 dias (mais variedade)
function randomDate(): Date {
  const now = new Date()
  const daysAgo = Math.floor(Math.random() * 60) // Últimos 60 dias
  const hoursAgo = Math.floor(Math.random() * 24)
  const minutesAgo = Math.floor(Math.random() * 60)
  
  const date = new Date(now)
  date.setDate(date.getDate() - daysAgo)
  date.setHours(date.getHours() - hoursAgo)
  date.setMinutes(date.getMinutes() - minutesAgo)
  
  return date
}

// Função para gerar múltiplas visitas (datas variadas)
function generateVisitDates(firstVisit: Date, visitCount: number): Date[] {
  const dates: Date[] = [firstVisit]
  
  for (let i = 1; i < visitCount; i++) {
    const daysAfter = Math.floor(Math.random() * 30) + 1 // 1-30 dias depois
    const nextVisit = new Date(firstVisit)
    nextVisit.setDate(nextVisit.getDate() + daysAfter)
    dates.push(nextVisit)
  }
  
  return dates.sort((a, b) => a.getTime() - b.getTime()) // Ordenar por data
}

// Funções para gerar nomes e emails realistas
function randomName(country: string): string {
  const firstNamesBR = ['João', 'Maria', 'Pedro', 'Ana', 'Carlos', 'Julia', 'Lucas', 'Fernanda', 'Rafael', 'Beatriz', 'Gabriel', 'Isabella', 'Thiago', 'Larissa', 'Felipe', 'Mariana', 'Diego', 'Camila', 'Bruno', 'Amanda']
  const lastNamesBR = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Gomes', 'Ribeiro', 'Martins', 'Carvalho', 'Almeida', 'Lopes', 'Soares', 'Fernandes', 'Vieira', 'Barbosa', 'Rocha']
  
  const firstNamesEN = ['John', 'Sarah', 'Michael', 'Emily', 'David', 'Jessica', 'James', 'Amanda', 'Robert', 'Lisa', 'William', 'Jennifer', 'Richard', 'Michelle', 'Joseph', 'Nicole', 'Thomas', 'Stephanie', 'Charles', 'Angela']
  const lastNamesEN = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee']
  
  if (country === 'BR') {
    return `${firstNamesBR[Math.floor(Math.random() * firstNamesBR.length)]} ${lastNamesBR[Math.floor(Math.random() * lastNamesBR.length)]}`
  } else {
    return `${firstNamesEN[Math.floor(Math.random() * firstNamesEN.length)]} ${lastNamesEN[Math.floor(Math.random() * lastNamesEN.length)]}`
  }
}

// Função para gerar email realista baseado no perfil
function generateEmail(index: number, country: string, profileType: { type: string, emails: string[], hot: number }): string {
  const domains = domainTypes[country as keyof typeof domainTypes] || domainTypes.CA
  
  // 30% instituição, 20% produtora, 40% pessoal, 10% festival/aluno
  const rand = Math.random()
  let domain: string
  
  if (rand < 0.3 && domains.instituicao) {
    domain = domains.instituicao[Math.floor(Math.random() * domains.instituicao.length)]
  } else if (rand < 0.5 && domains.produtora) {
    domain = domains.produtora[Math.floor(Math.random() * domains.produtora.length)]
  } else if (rand < 0.6 && domains.festival) {
    domain = domains.festival[Math.floor(Math.random() * domains.festival.length)]
  } else if (rand < 0.7 && domains.aluno && profileType.type === 'aluno') {
    domain = domains.aluno[Math.floor(Math.random() * domains.aluno.length)]
  } else {
    domain = domains.pessoal[Math.floor(Math.random() * domains.pessoal.length)]
  }
  
  const emailPrefix = profileType.emails[Math.floor(Math.random() * profileType.emails.length)]
  const number = Math.floor(Math.random() * 1000)
  
  return `${TEST_PREFIX}${emailPrefix}${number}@${domain}`
}

async function populateTestData() {
  console.log('🚀 Iniciando população de dados de teste...')
  console.log(`📌 Prefixo de teste: ${TEST_PREFIX}`)
  console.log('')

  const totalSessions = 150 // Total de sessões/visitantes (aumentado para mais dados)
  const sessionsCreated: string[] = []

  try {
    // Criar sessões de visitantes
    for (let i = 1; i <= totalSessions; i++) {
      const fingerprint = generateFingerprint(i)
      const country = countries[Math.floor(Math.random() * countries.length)]
      const city = cities[country as keyof typeof cities]?.[Math.floor(Math.random() * (cities[country as keyof typeof cities]?.length || 0))] || 'Unknown'
      const device = devices[Math.floor(Math.random() * devices.length)]
      const browser = browsers[Math.floor(Math.random() * browsers.length)]
      const osSystem = os[Math.floor(Math.random() * os.length)]
      const screenRes = screenResolutions[Math.floor(Math.random() * screenResolutions.length)]
      
      // Selecionar perfil baseado em probabilidade (mais diretores/curadores = mais hot)
      const profileType = profileTypes[Math.floor(Math.random() * profileTypes.length)]
      const isHotLead = Math.random() < profileType.hot
      const interests = (profileType as any).interests || [] // Interesses do perfil
      
      // Variedade de visitas: alguns visitam muito (até 15x), outros pouco (1x)
      // 20% visitam muito (5-15x), 30% visitam médio (3-5x), 50% visitam pouco (1-3x)
      const visitRand = Math.random()
      let visitCount: number
      if (visitRand < 0.2) {
        visitCount = Math.floor(Math.random() * 11) + 5 // 5-15 visitas (visitantes frequentes)
      } else if (visitRand < 0.5) {
        visitCount = Math.floor(Math.random() * 3) + 3 // 3-5 visitas (visitantes médios)
      } else {
        visitCount = Math.floor(Math.random() * 3) + 1 // 1-3 visitas (visitantes casuais)
      }
      
      // Hot leads tendem a visitar mais
      if (isHotLead && visitCount < 3) {
        visitCount = Math.floor(Math.random() * 5) + 3 // 3-7 visitas para hot leads
      }
      
      const isReturning = visitCount > 1
      const isPWAInstalled = isHotLead ? Math.random() > 0.7 : Math.random() > 0.85 // Hot leads instalam mais PWA
      
      // Engagement e conversion baseados no perfil
      const baseEngagement = isHotLead ? Math.floor(Math.random() * 40) + 60 : Math.floor(Math.random() * 60) + 20
      const engagementScore = Math.min(100, baseEngagement + (visitCount * 5))
      const conversionProbability = isHotLead ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 50) + 10
      const bounceRate = isHotLead ? Math.random() < 0.2 : Math.random() < 0.6 // Boolean: true se bounceu
      
      // Gerar primeira visita e múltiplas visitas se visitCount > 1
      const firstVisit = randomDate()
      const visitDates = generateVisitDates(firstVisit, visitCount)
      const createdAt = visitDates[0] // Primeira visita
      const lastActivityAt = visitDates[visitDates.length - 1] // Última visita
      
      // Gerar nome e email realistas
      const name = randomName(country)
      const email = generateEmail(i, country, profileType)

      // Criar sessão
      const session = await prisma.visitorSession.create({
        data: {
          sessionId: `${TEST_PREFIX}session_${String(i).padStart(6, '0')}`,
          visitorFingerprint: fingerprint,
          ipAddress: generateIP(),
          country: country,
          city: city,
          deviceType: device,
          browser: browser,
          os: osSystem,
          screenResolution: screenRes,
          referrer: Math.random() > 0.5 ? `https://${['google.com', 'bing.com', 'yahoo.com', 'facebook.com'][Math.floor(Math.random() * 4)]}` : null,
          utmSource: Math.random() > 0.7 ? ['google', 'facebook', 'instagram', 'linkedin'][Math.floor(Math.random() * 4)] : null,
          utmMedium: Math.random() > 0.7 ? ['cpc', 'organic', 'social', 'email'][Math.floor(Math.random() * 4)] : null,
          utmCampaign: Math.random() > 0.8 ? `${TEST_PREFIX}campaign_${Math.floor(Math.random() * 10)}` : null,
          visitCount: visitCount,
          isReturning: isReturning,
          isPWAInstalled: isPWAInstalled,
          engagementScore: engagementScore,
          conversionProbability: conversionProbability,
          bounceRate: bounceRate,
          lastActivityAt: lastActivityAt,
          createdAt: createdAt,
          updatedAt: lastActivityAt,
        },
      })

      const sessionId = session.sessionId
      sessionsCreated.push(sessionId)

      // Criar page views (1-10 páginas por sessão)
      const pageViewCount = Math.floor(Math.random() * 10) + 1
      for (let j = 0; j < pageViewCount; j++) {
        const page = pages[Math.floor(Math.random() * pages.length)]
        const timeSpent = Math.floor(Math.random() * 300) + 10 // 10-310 segundos
        
        await prisma.pageView.create({
          data: {
            sessionId: sessionId,
            pageSlug: page,
            timeSpent: timeSpent,
            viewedAt: new Date(createdAt.getTime() + j * 60000), // +j minutos
          },
        })
      }

      // Criar comportamentos distribuídos ao longo das visitas
      // Hot leads têm mais comportamentos
      const behaviorCount = isHotLead 
        ? Math.floor(Math.random() * 10) + 5 // 5-14 comportamentos
        : Math.floor(Math.random() * 6) // 0-5 comportamentos
      
      for (let j = 0; j < behaviorCount; j++) {
        const behaviorType = behaviorTypes[Math.floor(Math.random() * behaviorTypes.length)]
        // Selecionar páginas baseadas nos interesses
        let page: string
        if (interests.includes('vancouver') && Math.random() > 0.5) {
          const vancouverPages = pages.filter(p => p.includes('vancouver') || p.includes('academy'))
          page = vancouverPages.length > 0 ? vancouverPages[Math.floor(Math.random() * vancouverPages.length)] : pages[Math.floor(Math.random() * pages.length)]
        } else {
          page = pages[Math.floor(Math.random() * pages.length)]
        }
        
        // Distribuir comportamentos ao longo das visitas
        const visitIndex = Math.floor((j / behaviorCount) * visitDates.length)
        const visitDate = visitDates[Math.min(visitIndex, visitDates.length - 1)]
        
        await prisma.visitorBehavior.create({
          data: {
            sessionId: sessionId,
            behaviorType: behaviorType,
            pageSlug: page,
            metadata: {
              timestamp: new Date(visitDate.getTime() + (j % 60) * 60000).toISOString(),
            },
            timestamp: new Date(visitDate.getTime() + (j % 60) * 60000),
          },
        })
      }

      // Criar PWA install se aplicável (20% chance)
      if (isPWAInstalled) {
        await prisma.pWAInstall.create({
          data: {
            sessionId: sessionId,
            type: 'installed',
            platform: osSystem === 'iOS' ? 'iPhone' : osSystem === 'Android' ? 'Android' : 'Win32',
            browser: browser,
            deviceType: device,
            outcome: 'accepted',
            country: country,
            city: city,
            createdAt: new Date(createdAt.getTime() + Math.random() * 3600000),
          },
        })
      }

      // Criar InterestScore para alguns (para gerar leads)
      if (conversionProbability > 50 || engagementScore > 60) {
        const baseScore = Math.floor(Math.random() * 50) + 50 // 50-100
        
        await prisma.interestScore.create({
          data: {
            sessionId: sessionId,
            museumScore: Math.floor(Math.random() * 100),
            brandScore: Math.floor(Math.random() * 100),
            festivalScore: Math.floor(Math.random() * 100),
            cityScore: Math.floor(Math.random() * 100),
            educationScore: Math.floor(Math.random() * 100),
            researchScore: Math.floor(Math.random() * 100),
            vrScore: Math.floor(Math.random() * 100),
            aiScore: Math.floor(Math.random() * 100),
            installationScore: Math.floor(Math.random() * 100),
            conversionScore: baseScore,
            visitorType: baseScore > 75 ? 'client' : baseScore > 60 ? 'lead' : 'general',
            updatedAt: lastActivityAt,
          },
        })
        
        // Criar Lead para hot/warm leads (30% dos que têm interest score)
        if (conversionProbability > 70 && Math.random() > 0.7) {
          const companies = {
            BR: ['Museu de Arte Moderna', 'Cinema Nacional', 'Produções Culturais', 'Instituto Cultural', 'Fundação Artística'],
            CA: ['Modern Art Museum', 'National Cinema', 'Cultural Productions', 'Art Institute', 'Cultural Foundation']
          }
          const positions = {
            BR: ['Diretor', 'Curador', 'Produtor', 'Coordenador', 'Gerente'],
            CA: ['Director', 'Curator', 'Producer', 'Coordinator', 'Manager']
          }
          
          const company = companies[country as keyof typeof companies]?.[Math.floor(Math.random() * (companies[country as keyof typeof companies]?.length || 0))] || 'Organization'
          const position = positions[country as keyof typeof positions]?.[Math.floor(Math.random() * (positions[country as keyof typeof positions]?.length || 0))] || 'Professional'
          
          try {
            const lead = await prisma.lead.create({
              data: {
                name: name,
                email: email,
                phone: country === 'BR' ? `+55 ${Math.floor(Math.random() * 90) + 10} ${Math.floor(Math.random() * 90000) + 10000}-${Math.floor(Math.random() * 9000) + 1000}` : `+1 ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
                company: company,
                position: position,
                leadType: 'CONTACT_FORM',
                country: country,
                city: city,
                leadScore: conversionProbability,
                status: conversionProbability > 80 ? 'CONTACTED' : 'NEW',
                priority: conversionProbability > 80 ? 'HIGH' : conversionProbability > 60 ? 'MEDIUM' : 'LOW',
                createdAt: createdAt,
              },
            })
            
            // Atualizar sessão com leadId
            await prisma.visitorSession.update({
              where: { sessionId: sessionId },
              data: { leadId: lead.id },
            })
          } catch (error: any) {
            // Ignorar erro se lead já existe (email duplicado)
            if (!error.message?.includes('Unique constraint')) {
              console.warn(`⚠️  Erro ao criar lead: ${error.message}`)
            }
          }
        }
      }

      if (i % 10 === 0) {
        console.log(`✅ Criados ${i}/${totalSessions} visitantes...`)
      }
    }

    console.log('')
    console.log('✅ Dados de teste criados com sucesso!')
    console.log(`📊 Total: ${totalSessions} visitantes`)
    console.log(`📌 Prefixo usado: ${TEST_PREFIX}`)
    console.log('')
    console.log('🗑️  Para apagar todos os dados de teste, execute:')
    console.log('   npx tsx scripts/delete-test-data.ts')
    console.log('')

  } catch (error) {
    console.error('❌ Erro ao criar dados de teste:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

populateTestData()
  .then(() => {
    console.log('✅ Processo concluído!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Erro fatal:', error)
    process.exit(1)
  })
