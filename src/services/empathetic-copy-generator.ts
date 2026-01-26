// ════════════════════════════════════════════════════════════
// EMPATHETIC COPY GENERATOR - IA para Textos Humanizados
// ════════════════════════════════════════════════════════════
// Baseado na Filosofia de Empatia da Azimut
// Referências:
// - Chris Milk, TED Vancouver 2015: "The Ultimate Empathy Machine"
// - Carl Rogers: "Ter empatia é ver o mundo pelos olhos do outro"
// ════════════════════════════════════════════════════════════

import { logger } from '@/utils/logger'

// ════════════════════════════════════════════════════════════
// TIPOS
// ════════════════════════════════════════════════════════════

export type CopyContext = 
  | 'museums'        // Museus e exposições
  | 'vr'             // Realidade Virtual
  | 'education'      // Educação/Vancouver
  | 'corporate'      // Projetos corporativos
  | 'cinema'         // Cinema e audiovisual
  | 'hot_lead'       // Visitante engajado
  | 'general'        // Geral

export type CopyType = 
  | 'banner_title'   // Título do banner de sugestão
  | 'cta_primary'    // CTA principal
  | 'cta_secondary'  // CTA secundário
  | 'card_title'     // Título de card
  | 'card_desc'      // Descrição de card
  | 'hero_title'     // Título do hero
  | 'hero_subtitle'  // Subtítulo do hero

export interface CopyRequest {
  type: CopyType
  context: CopyContext
  lang: 'pt' | 'en' | 'es' | 'fr'
  userBehavior?: {
    pagesVisited: string[]
    timeOnSite: number
    scrollDepth: number
    returningVisitor: boolean
  }
}

export interface CopyResponse {
  text: string
  tone: 'empathetic' | 'friendly' | 'professional'
  generatedAt: string
  cached: boolean
}

// ════════════════════════════════════════════════════════════
// SYSTEM PROMPT - Filosofia de Empatia
// ════════════════════════════════════════════════════════════

const EMPATHY_SYSTEM_PROMPT = `Você é o Gerador de Copy Empático da Azimut.

## FILOSOFIA CENTRAL - EMPATIA vs SIMPATIA

SIMPATIA = Sentir COM (ao lado, observando de fora)
❌ "Podemos ajudar você" (genérico, frio)
❌ "Start a project" (robótico)
❌ "Entre em contato" (formal, distante)

EMPATIA = Sentir DENTRO (entrando na experiência)
✅ "Aquele frio na barriga de criar algo que vai tocar milhares..."
✅ "Sinto isso também"
✅ "Junto nessa"

## QUEM SOMOS

Não somos uma empresa formal do século passado. Somos:
- DESCONTRAÍDOS (não formal, não corporativo)
- CONFIANTES (sabemos que somos bons, sem arrogância)
- ACOLHEDORES (o amigo que você quer por perto)
- GENUÍNOS (nada de scripts robóticos)
- PRESENTES ("Tô aqui", "Do teu lado", "Junto")

## REFERÊNCIAS

> "VR é a máquina definitiva de empatia - colocar alguém DENTRO da experiência"
> — Chris Milk, TED Vancouver 2015

> "Ter empatia é ver o mundo pelos olhos do outro, não ver o seu mundo refletido nos olhos dele"
> — Carl Rogers

## REGRAS DE GERAÇÃO

1. NUNCA use frases genéricas ("Podemos ajudar", "Entre em contato")
2. SEMPRE entre no sentimento do usuário (medos, sonhos, dúvidas)
3. Use linguagem CONVERSACIONAL, como um amigo
4. VARIE os textos - nunca repita a mesma estrutura
5. Seja CURTO e IMPACTANTE (máx 2 linhas para banners/CTAs)
6. Use reticências "..." para criar suspense emocional
7. Personalize baseado no CONTEXTO (museu, VR, educação, etc)

## EXEMPLOS POR CONTEXTO

### MUSEUS
- "Aquele frio na barriga de criar algo que vai tocar milhares de pessoas..."
- "A pressão de fazer justiça a uma história que merece ser contada..."
- "Sinto isso também" / "Conheço esse peso"

### VR
- "Aquela sensação de que VR pode mudar tudo, mas e se não funcionar..."
- "A empolgação misturada com medo de investir em algo tão novo..."
- "Já vivi isso" / "Sei como é"

### EDUCAÇÃO/VANCOUVER
- "Aquele sonho que não sai da cabeça, mas o medo de dar errado..."
- "O frio na barriga de largar tudo e recomeçar do outro lado do mundo..."
- "Tô junto nessa" / "Do teu lado"

### HOT LEAD (visitante engajado)
- "Vi que você tá explorando bastante por aqui..."
- "Parece que algo te chamou atenção..."
- "Quer bater um papo?" / "Bora conversar?"

## FORMATO DE RESPOSTA

Responda APENAS com o texto gerado, sem explicações.
Adapte o idioma conforme solicitado (pt/en/es/fr).
`

// ════════════════════════════════════════════════════════════
// CACHE SIMPLES (evitar chamadas repetidas)
// ════════════════════════════════════════════════════════════

const copyCache = new Map<string, { text: string, timestamp: number }>()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutos

function getCacheKey(request: CopyRequest): string {
  return `${request.type}-${request.context}-${request.lang}`
}

function getFromCache(key: string): string | null {
  const cached = copyCache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.text
  }
  copyCache.delete(key)
  return null
}

function setCache(key: string, text: string): void {
  copyCache.set(key, { text, timestamp: Date.now() })
}

// ════════════════════════════════════════════════════════════
// FALLBACK TEXTS (se IA falhar)
// ════════════════════════════════════════════════════════════

const FALLBACK_TEXTS: Record<CopyContext, Record<CopyType, Record<string, string[]>>> = {
  museums: {
    banner_title: {
      pt: [
        'Aquele frio na barriga de criar algo que vai tocar milhares...',
        'A pressão de fazer justiça a uma história que merece ser contada...',
        'O peso de transformar um espaço vazio em algo que emociona...'
      ],
      en: [
        'That butterflies feeling of creating something that will touch thousands...',
        'The pressure of doing justice to a story that deserves to be told...',
        'The weight of transforming an empty space into something that moves...'
      ],
      es: [
        'Ese nudo de crear algo que tocará miles de personas...',
        'La presión de hacer justicia a una historia que merece ser contada...',
        'El peso de transformar un espacio vacío en algo que emociona...'
      ],
      fr: [
        'Ce nœud de créer quelque chose qui touchera des milliers...',
        'La pression de rendre justice à une histoire qui mérite d\'être racontée...',
        'Le poids de transformer un espace vide en quelque chose qui émeut...'
      ]
    },
    cta_primary: {
      pt: ['Sinto isso também', 'Conheço esse peso', 'Já vivi isso', 'Sei como é'],
      en: ['I feel that too', 'I know that weight', 'Been there', 'I get it'],
      es: ['Siento eso también', 'Conozco ese peso', 'Ya viví eso', 'Lo entiendo'],
      fr: ['Je ressens ça aussi', 'Je connais ce poids', 'J\'ai vécu ça', 'Je comprends']
    },
    cta_secondary: {
      pt: ['Junto nessa', 'Do teu lado', 'Tô aqui', 'Bora conversar'],
      en: ['In this together', 'By your side', 'I\'m here', 'Let\'s talk'],
      es: ['Juntos en esto', 'A tu lado', 'Estoy aquí', 'Hablemos'],
      fr: ['Ensemble dans ça', 'À tes côtés', 'Je suis là', 'Parlons']
    },
    card_title: {
      pt: ['Museus & Exposições', 'Experiências Culturais', 'Espaços que Emocionam'],
      en: ['Museums & Exhibitions', 'Cultural Experiences', 'Spaces that Move'],
      es: ['Museos & Exposiciones', 'Experiencias Culturales', 'Espacios que Emocionan'],
      fr: ['Musées & Expositions', 'Expériences Culturelles', 'Espaces qui Émeuvent']
    },
    card_desc: {
      pt: ['Transformamos histórias em experiências que tocam pessoas'],
      en: ['We transform stories into experiences that touch people'],
      es: ['Transformamos historias en experiencias que tocan personas'],
      fr: ['Nous transformons histoires en expériences qui touchent les gens']
    },
    hero_title: {
      pt: ['Criamos Experiências que Emocionam'],
      en: ['We Create Experiences that Move'],
      es: ['Creamos Experiencias que Emocionan'],
      fr: ['Nous Créons des Expériences qui Émeuvent']
    },
    hero_subtitle: {
      pt: ['30+ anos transformando espaços em memórias'],
      en: ['30+ years transforming spaces into memories'],
      es: ['30+ años transformando espacios en memorias'],
      fr: ['30+ ans transformant espaces en souvenirs']
    }
  },
  vr: {
    banner_title: {
      pt: [
        'Aquela sensação de que VR pode mudar tudo, mas e se não funcionar...',
        'A empolgação misturada com medo de investir em algo tão novo...',
        'A vontade de transportar pessoas pra outro mundo, mas como começar...'
      ],
      en: [
        'That feeling that VR could change everything, but what if it doesn\'t work...',
        'The excitement mixed with fear of investing in something so new...',
        'The desire to transport people to another world, but how to start...'
      ],
      es: [
        'Esa sensación de que VR puede cambiarlo todo, pero ¿y si no funciona...',
        'La emoción mezclada con miedo de invertir en algo tan nuevo...',
        'Las ganas de transportar personas a otro mundo, pero cómo empezar...'
      ],
      fr: [
        'Ce sentiment que la VR peut tout changer, mais si ça ne marche pas...',
        'L\'excitation mêlée à la peur d\'investir dans quelque chose de si nouveau...',
        'L\'envie de transporter les gens dans un autre monde, mais par où commencer...'
      ]
    },
    cta_primary: {
      pt: ['Já vivi isso', 'Sei como é', 'Sinto na pele', 'Conheço essa dúvida'],
      en: ['Been there', 'I know how it is', 'I feel it', 'I know that doubt'],
      es: ['Ya viví eso', 'Sé cómo es', 'Lo siento', 'Conozco esa duda'],
      fr: ['J\'ai vécu ça', 'Je sais comment c\'est', 'Je ressens', 'Je connais ce doute']
    },
    cta_secondary: {
      pt: ['Bora explorar', 'Vem comigo', 'Tô dentro', 'Junto'],
      en: ['Let\'s explore', 'Come with me', 'I\'m in', 'Together'],
      es: ['Vamos a explorar', 'Ven conmigo', 'Estoy dentro', 'Juntos'],
      fr: ['Explorons', 'Viens avec moi', 'Je suis dedans', 'Ensemble']
    },
    card_title: {
      pt: ['Realidade Virtual & XR'],
      en: ['Virtual Reality & XR'],
      es: ['Realidad Virtual & XR'],
      fr: ['Réalité Virtuelle & XR']
    },
    card_desc: {
      pt: ['A máquina de empatia - coloque pessoas DENTRO da experiência'],
      en: ['The empathy machine - put people INSIDE the experience'],
      es: ['La máquina de empatía - pon personas DENTRO de la experiencia'],
      fr: ['La machine d\'empathie - mettez les gens À L\'INTÉRIEUR de l\'expérience']
    },
    hero_title: {
      pt: ['Experiências que Transportam'],
      en: ['Experiences that Transport'],
      es: ['Experiencias que Transportan'],
      fr: ['Expériences qui Transportent']
    },
    hero_subtitle: {
      pt: ['VR, AR, XR - o futuro é imersivo'],
      en: ['VR, AR, XR - the future is immersive'],
      es: ['VR, AR, XR - el futuro es inmersivo'],
      fr: ['VR, AR, XR - l\'avenir est immersif']
    }
  },
  education: {
    banner_title: {
      pt: [
        'Aquele sonho que não sai da cabeça, mas o medo de dar errado...',
        'O frio na barriga de largar tudo e recomeçar do outro lado do mundo...',
        'A coragem que você precisa reunir todo dia pra acreditar nesse sonho...'
      ],
      en: [
        'That dream that won\'t leave your head, but the fear of it going wrong...',
        'The butterflies of dropping everything and starting over on the other side of the world...',
        'The courage you need to gather every day to believe in this dream...'
      ],
      es: [
        'Ese sueño que no sale de tu cabeza, pero el miedo de que salga mal...',
        'El nudo de dejarlo todo y empezar de nuevo al otro lado del mundo...',
        'El coraje que necesitas reunir cada día para creer en ese sueño...'
      ],
      fr: [
        'Ce rêve qui ne quitte pas ta tête, mais la peur que ça tourne mal...',
        'Ce nœud de tout lâcher et recommencer de l\'autre côté du monde...',
        'Le courage qu\'il te faut rassembler chaque jour pour croire en ce rêve...'
      ]
    },
    cta_primary: {
      pt: ['Sinto contigo', 'Conheço esse caminho', 'Já estive aí', 'Tô junto'],
      en: ['I feel with you', 'I know that path', 'I\'ve been there', 'I\'m with you'],
      es: ['Siento contigo', 'Conozco ese camino', 'Ya estuve ahí', 'Estoy contigo'],
      fr: ['Je ressens avec toi', 'Je connais ce chemin', 'J\'y ai été', 'Je suis avec toi']
    },
    cta_secondary: {
      pt: ['Bora nessa', 'Do teu lado', 'Vem comigo', 'Tô aqui'],
      en: ['Let\'s go', 'By your side', 'Come with me', 'I\'m here'],
      es: ['Vamos', 'A tu lado', 'Ven conmigo', 'Estoy aquí'],
      fr: ['Allons-y', 'À tes côtés', 'Viens avec moi', 'Je suis là']
    },
    card_title: {
      pt: ['Estudar em Vancouver'],
      en: ['Study in Vancouver'],
      es: ['Estudiar en Vancouver'],
      fr: ['Étudier à Vancouver']
    },
    card_desc: {
      pt: ['VFS e VanArts - as melhores escolas de media arts do Canadá'],
      en: ['VFS and VanArts - the best media arts schools in Canada'],
      es: ['VFS y VanArts - las mejores escuelas de media arts de Canadá'],
      fr: ['VFS et VanArts - les meilleures écoles de media arts au Canada']
    },
    hero_title: {
      pt: ['Seu Sonho, Nosso Caminho'],
      en: ['Your Dream, Our Path'],
      es: ['Tu Sueño, Nuestro Camino'],
      fr: ['Ton Rêve, Notre Chemin']
    },
    hero_subtitle: {
      pt: ['Consultoria gratuita para estudar no Canadá'],
      en: ['Free consultation to study in Canada'],
      es: ['Consultoría gratuita para estudiar en Canadá'],
      fr: ['Consultation gratuite pour étudier au Canada']
    }
  },
  corporate: {
    banner_title: {
      pt: [
        'A frustração de ter uma visão clara, mas não encontrar quem entenda...',
        'Aquela sensação de ter algo especial nas mãos, mas não saber por onde começar...',
        'A busca por parceiros que realmente sintam o que você sente...'
      ],
      en: [
        'The frustration of having a clear vision, but not finding someone who understands...',
        'That feeling of having something special in your hands, but not knowing where to start...',
        'The search for partners who really feel what you feel...'
      ],
      es: [
        'La frustración de tener una visión clara, pero no encontrar quien entienda...',
        'Esa sensación de tener algo especial en las manos, pero no saber por dónde empezar...',
        'La búsqueda de socios que realmente sientan lo que tú sientes...'
      ],
      fr: [
        'La frustration d\'avoir une vision claire, mais de ne pas trouver quelqu\'un qui comprend...',
        'Ce sentiment d\'avoir quelque chose de spécial entre les mains, mais de ne pas savoir par où commencer...',
        'La recherche de partenaires qui ressentent vraiment ce que tu ressens...'
      ]
    },
    cta_primary: {
      pt: ['Entendo isso', 'Conheço essa busca', 'Sinto também', 'Sei como é'],
      en: ['I understand', 'I know that search', 'I feel it too', 'I know how it is'],
      es: ['Entiendo eso', 'Conozco esa búsqueda', 'Lo siento también', 'Sé cómo es'],
      fr: ['Je comprends', 'Je connais cette recherche', 'Je ressens aussi', 'Je sais comment c\'est']
    },
    cta_secondary: {
      pt: ['Vamos conversar', 'Bora criar junto', 'Tô dentro', 'Junto nessa'],
      en: ['Let\'s talk', 'Let\'s create together', 'I\'m in', 'In this together'],
      es: ['Hablemos', 'Creemos juntos', 'Estoy dentro', 'Juntos en esto'],
      fr: ['Parlons', 'Créons ensemble', 'Je suis dedans', 'Ensemble dans ça']
    },
    card_title: {
      pt: ['Projetos Corporativos'],
      en: ['Corporate Projects'],
      es: ['Proyectos Corporativos'],
      fr: ['Projets Corporate']
    },
    card_desc: {
      pt: ['Transformamos sua visão em experiência'],
      en: ['We transform your vision into experience'],
      es: ['Transformamos tu visión en experiencia'],
      fr: ['Nous transformons ta vision en expérience']
    },
    hero_title: {
      pt: ['Sua Visão, Nossa Execução'],
      en: ['Your Vision, Our Execution'],
      es: ['Tu Visión, Nuestra Ejecución'],
      fr: ['Ta Vision, Notre Exécution']
    },
    hero_subtitle: {
      pt: ['Parceiros que sentem o que você sente'],
      en: ['Partners who feel what you feel'],
      es: ['Socios que sienten lo que tú sientes'],
      fr: ['Partenaires qui ressentent ce que tu ressens']
    }
  },
  cinema: {
    banner_title: {
      pt: [
        'A pressão de contar uma história que mexa com as pessoas...',
        'Aquela vontade de criar algo que fique na memória...',
        'O desafio de transformar ideias em imagens que emocionam...'
      ],
      en: [
        'The pressure of telling a story that moves people...',
        'That desire to create something that stays in memory...',
        'The challenge of transforming ideas into images that touch...'
      ],
      es: [
        'La presión de contar una historia que mueva a las personas...',
        'Esas ganas de crear algo que quede en la memoria...',
        'El desafío de transformar ideas en imágenes que emocionan...'
      ],
      fr: [
        'La pression de raconter une histoire qui touche les gens...',
        'Cette envie de créer quelque chose qui reste en mémoire...',
        'Le défi de transformer idées en images qui émeuvent...'
      ]
    },
    cta_primary: {
      pt: ['Sinto isso', 'Conheço essa pressão', 'Já vivi', 'Sei como é'],
      en: ['I feel that', 'I know that pressure', 'Been there', 'I know how it is'],
      es: ['Siento eso', 'Conozco esa presión', 'Ya viví', 'Sé cómo es'],
      fr: ['Je ressens ça', 'Je connais cette pression', 'J\'ai vécu', 'Je sais comment c\'est']
    },
    cta_secondary: {
      pt: ['Bora criar', 'Junto', 'Vem comigo', 'Tô aqui'],
      en: ['Let\'s create', 'Together', 'Come with me', 'I\'m here'],
      es: ['Vamos a crear', 'Juntos', 'Ven conmigo', 'Estoy aquí'],
      fr: ['Créons', 'Ensemble', 'Viens avec moi', 'Je suis là']
    },
    card_title: {
      pt: ['Cinema & Audiovisual'],
      en: ['Cinema & Audiovisual'],
      es: ['Cine & Audiovisual'],
      fr: ['Cinéma & Audiovisuel']
    },
    card_desc: {
      pt: ['Histórias que ficam na memória'],
      en: ['Stories that stay in memory'],
      es: ['Historias que quedan en la memoria'],
      fr: ['Histoires qui restent en mémoire']
    },
    hero_title: {
      pt: ['Histórias que Emocionam'],
      en: ['Stories that Move'],
      es: ['Historias que Emocionan'],
      fr: ['Histoires qui Émeuvent']
    },
    hero_subtitle: {
      pt: ['30+ anos criando narrativas visuais'],
      en: ['30+ years creating visual narratives'],
      es: ['30+ años creando narrativas visuales'],
      fr: ['30+ ans créant récits visuels']
    }
  },
  hot_lead: {
    banner_title: {
      pt: [
        'Vi que você tá explorando bastante por aqui...',
        'Parece que algo te chamou atenção...',
        'Curtindo o que tá vendo?'
      ],
      en: [
        'I see you\'re exploring quite a bit here...',
        'Looks like something caught your attention...',
        'Enjoying what you\'re seeing?'
      ],
      es: [
        'Veo que estás explorando bastante por aquí...',
        'Parece que algo te llamó la atención...',
        '¿Te gusta lo que ves?'
      ],
      fr: [
        'Je vois que tu explores pas mal par ici...',
        'On dirait que quelque chose a attiré ton attention...',
        'Tu aimes ce que tu vois?'
      ]
    },
    cta_primary: {
      pt: ['Bora conversar', 'Quer trocar uma ideia?', 'Posso ajudar?', 'Tô aqui'],
      en: ['Let\'s chat', 'Want to exchange ideas?', 'Can I help?', 'I\'m here'],
      es: ['Hablemos', '¿Quieres intercambiar ideas?', '¿Puedo ayudar?', 'Estoy aquí'],
      fr: ['Parlons', 'Tu veux échanger des idées?', 'Je peux aider?', 'Je suis là']
    },
    cta_secondary: {
      pt: ['Só olhando', 'Continuar explorando', 'Depois', 'Talvez'],
      en: ['Just looking', 'Keep exploring', 'Later', 'Maybe'],
      es: ['Solo mirando', 'Seguir explorando', 'Después', 'Tal vez'],
      fr: ['Je regarde juste', 'Continuer à explorer', 'Plus tard', 'Peut-être']
    },
    card_title: {
      pt: ['Vamos Conversar?'],
      en: ['Shall We Talk?'],
      es: ['¿Hablamos?'],
      fr: ['On Parle?']
    },
    card_desc: {
      pt: ['Sem compromisso, só uma conversa'],
      en: ['No strings attached, just a chat'],
      es: ['Sin compromiso, solo una charla'],
      fr: ['Sans engagement, juste une conversation']
    },
    hero_title: {
      pt: ['Gostou do que Viu?'],
      en: ['Like What You See?'],
      es: ['¿Te Gustó lo que Viste?'],
      fr: ['Tu Aimes ce que tu Vois?']
    },
    hero_subtitle: {
      pt: ['Bora trocar uma ideia'],
      en: ['Let\'s exchange ideas'],
      es: ['Intercambiemos ideas'],
      fr: ['Échangeons des idées']
    }
  },
  general: {
    banner_title: {
      pt: [
        'Explorando possibilidades...',
        'Buscando algo especial?',
        'Curiosidade é o primeiro passo...'
      ],
      en: [
        'Exploring possibilities...',
        'Looking for something special?',
        'Curiosity is the first step...'
      ],
      es: [
        'Explorando posibilidades...',
        '¿Buscando algo especial?',
        'La curiosidad es el primer paso...'
      ],
      fr: [
        'Explorer des possibilités...',
        'Tu cherches quelque chose de spécial?',
        'La curiosité est le premier pas...'
      ]
    },
    cta_primary: {
      pt: ['Vamos descobrir juntos', 'Posso ajudar', 'Tô aqui', 'Bora'],
      en: ['Let\'s discover together', 'I can help', 'I\'m here', 'Let\'s go'],
      es: ['Descubramos juntos', 'Puedo ayudar', 'Estoy aquí', 'Vamos'],
      fr: ['Découvrons ensemble', 'Je peux aider', 'Je suis là', 'Allons-y']
    },
    cta_secondary: {
      pt: ['Continuar', 'Explorar mais', 'Ver projetos', 'Conhecer'],
      en: ['Continue', 'Explore more', 'See projects', 'Learn more'],
      es: ['Continuar', 'Explorar más', 'Ver proyectos', 'Conocer'],
      fr: ['Continuer', 'Explorer plus', 'Voir projets', 'Découvrir']
    },
    card_title: {
      pt: ['Azimut Studio'],
      en: ['Azimut Studio'],
      es: ['Azimut Studio'],
      fr: ['Azimut Studio']
    },
    card_desc: {
      pt: ['Experiências imersivas que transformam'],
      en: ['Immersive experiences that transform'],
      es: ['Experiencias inmersivas que transforman'],
      fr: ['Expériences immersives qui transforment']
    },
    hero_title: {
      pt: ['Criamos Experiências'],
      en: ['We Create Experiences'],
      es: ['Creamos Experiencias'],
      fr: ['Nous Créons des Expériences']
    },
    hero_subtitle: {
      pt: ['Imersivo • Interativo • Cinematográfico'],
      en: ['Immersive • Interactive • Cinematic'],
      es: ['Inmersivo • Interactivo • Cinematográfico'],
      fr: ['Immersif • Interactif • Cinématographique']
    }
  }
}

// ════════════════════════════════════════════════════════════
// FUNÇÃO PRINCIPAL - GERAR COPY EMPÁTICO
// ════════════════════════════════════════════════════════════

export async function generateEmpatheticCopy(request: CopyRequest): Promise<CopyResponse> {
  const cacheKey = getCacheKey(request)
  
  // Verificar cache
  const cached = getFromCache(cacheKey)
  if (cached) {
    return {
      text: cached,
      tone: 'empathetic',
      generatedAt: new Date().toISOString(),
      cached: true
    }
  }
  
  // Tentar gerar com Claude
  try {
    // Suporta ambas variáveis (VITE_ para Vite, ANTHROPIC_ para compatibilidade com backoffice)
    const apiKey = import.meta.env.VITE_CLAUDE_API_KEY || import.meta.env.VITE_ANTHROPIC_API_KEY
    
    if (!apiKey) {
      throw new Error('Claude API key not configured')
    }

    const userContext = request.userBehavior 
      ? `\n\nCOMPORTAMENTO DO USUÁRIO:
- Páginas visitadas: ${request.userBehavior.pagesVisited.join(', ')}
- Tempo no site: ${request.userBehavior.timeOnSite}s
- Scroll: ${request.userBehavior.scrollDepth}%
- Visitante retornando: ${request.userBehavior.returningVisitor ? 'Sim' : 'Não'}`
      : ''

    const prompt = `Gere um ${request.type} para o contexto "${request.context}" em ${request.lang.toUpperCase()}.
${userContext}

Requisitos:
- Máximo 2 linhas
- Tom empático (sentir DENTRO, não apenas COM)
- Linguagem conversacional de amigo
- NÃO use frases genéricas como "Podemos ajudar" ou "Entre em contato"
- Use reticências "..." para suspense emocional quando apropriado

Responda APENAS com o texto, sem explicações.`

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 150,
        system: EMPATHY_SYSTEM_PROMPT,
        messages: [{ role: 'user', content: prompt }]
      })
    })

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.statusText}`)
    }

    const data = await response.json()
    const generatedText = data.content[0].text.trim()
    
    // Salvar no cache
    setCache(cacheKey, generatedText)
    
    return {
      text: generatedText,
      tone: 'empathetic',
      generatedAt: new Date().toISOString(),
      cached: false
    }
  } catch (error) {
    logger.error('EmpatheticCopyGenerator', error as Error)
    
    // Fallback para textos pré-definidos
    const fallbacks = FALLBACK_TEXTS[request.context]?.[request.type]?.[request.lang]
    if (fallbacks && fallbacks.length > 0) {
      const randomIndex = Math.floor(Math.random() * fallbacks.length)
      return {
        text: fallbacks[randomIndex],
        tone: 'empathetic',
        generatedAt: new Date().toISOString(),
        cached: false
      }
    }
    
    // Fallback genérico
    return {
      text: request.lang === 'pt' ? 'Vamos conversar?' : 'Let\'s talk?',
      tone: 'friendly',
      generatedAt: new Date().toISOString(),
      cached: false
    }
  }
}

// ════════════════════════════════════════════════════════════
// FUNÇÃO RÁPIDA - PEGAR TEXTO DO FALLBACK (sem IA)
// ════════════════════════════════════════════════════════════

export function getQuickEmpatheticCopy(
  type: CopyType, 
  context: CopyContext, 
  lang: 'pt' | 'en' | 'es' | 'fr'
): string {
  const fallbacks = FALLBACK_TEXTS[context]?.[type]?.[lang]
  if (fallbacks && fallbacks.length > 0) {
    const randomIndex = Math.floor(Math.random() * fallbacks.length)
    return fallbacks[randomIndex]
  }
  return lang === 'pt' ? 'Vamos conversar?' : 'Let\'s talk?'
}

// ════════════════════════════════════════════════════════════
// EXPORT DEFAULT
// ════════════════════════════════════════════════════════════

export default {
  generateEmpatheticCopy,
  getQuickEmpatheticCopy,
  FALLBACK_TEXTS
}
