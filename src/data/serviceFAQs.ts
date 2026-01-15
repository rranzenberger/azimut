// ════════════════════════════════════════════════════════════
// SERVICE FAQs - Perguntas Frequentes por Serviço
// ════════════════════════════════════════════════════════════
// FAQs específicas para cada serviço (SEO + Rich Snippets)
// ════════════════════════════════════════════════════════════

import { Lang } from '../i18n'

export interface ServiceFAQ {
  question: string
  answer: string
}

export interface ServiceFAQs {
  [key: string]: {
    pt: ServiceFAQ[]
    en: ServiceFAQ[]
    es: ServiceFAQ[]
    fr: ServiceFAQ[]
  }
}

export const serviceFAQs: ServiceFAQs = {
  'cinema-audiovisual': {
    pt: [
      {
        question: 'Quanto custa produzir um filme/documentário?',
        answer: 'O investimento varia conforme complexidade, duração e requisitos técnicos. Documentários institucionais começam em R$ 50.000, enquanto produções cinematográficas podem chegar a R$ 500.000+. Oferecemos orçamento personalizado após análise do briefing.'
      },
      {
        question: 'Qual o prazo de entrega de um projeto audiovisual?',
        answer: 'Prazos variam: vídeos institucionais (4-8 semanas), documentários (8-16 semanas), filmes publicitários (6-12 semanas). Sempre respeitamos deadlines críticos e trabalhamos com cronogramas realistas desde o início.'
      },
      {
        question: 'Vocês trabalham com quais formatos de entrega?',
        answer: 'Entregamos em múltiplos formatos: DCP (cinema), ProRes (broadcast), H.265 (streaming), MP4 (web), além de versões para redes sociais. Garantimos qualidade técnica adequada para cada plataforma.'
      },
      {
        question: 'Preciso ter o roteiro pronto ou vocês desenvolvem?',
        answer: 'Ambas opções! Podemos desenvolver roteiro completo do zero, trabalhar com seu roteiro existente ou fazer revisão e aprimoramento. Nossa equipe inclui roteiristas experientes com prêmios em festivais.'
      },
      {
        question: 'Vocês fazem captação em 360° e VR?',
        answer: 'Sim! Somos especialistas em captação 360° e realidade virtual. Trabalhamos com câmeras especializadas (Insta360, GoPro Max) e pipelines de pós-produção para experiências imersivas completas.'
      },
      {
        question: 'Como funciona a pós-produção?',
        answer: 'Nossa pós-produção inclui edição, color grading (DaVinci Resolve), motion graphics, VFX e finalização. Trabalhamos com revisões colaborativas e entregas progressivas para garantir que o resultado final atenda suas expectativas.'
      }
    ],
    en: [
      {
        question: 'How much does it cost to produce a film/documentary?',
        answer: 'Investment varies according to complexity, duration and technical requirements. Institutional documentaries start at R$ 50,000, while cinematic productions can reach R$ 500,000+. We offer personalized quote after briefing analysis.'
      },
      {
        question: 'What is the delivery time for an audiovisual project?',
        answer: 'Timelines vary: institutional videos (4-8 weeks), documentaries (8-16 weeks), advertising films (6-12 weeks). We always respect critical deadlines and work with realistic schedules from the start.'
      },
      {
        question: 'What delivery formats do you work with?',
        answer: 'We deliver in multiple formats: DCP (cinema), ProRes (broadcast), H.265 (streaming), MP4 (web), plus versions for social media. We guarantee appropriate technical quality for each platform.'
      },
      {
        question: 'Do I need to have the script ready or do you develop it?',
        answer: 'Both options! We can develop a complete script from scratch, work with your existing script or do review and enhancement. Our team includes experienced screenwriters with festival awards.'
      },
      {
        question: 'Do you do 360° and VR capture?',
        answer: 'Yes! We are specialists in 360° capture and virtual reality. We work with specialized cameras (Insta360, GoPro Max) and post-production pipelines for complete immersive experiences.'
      },
      {
        question: 'How does post-production work?',
        answer: 'Our post-production includes editing, color grading (DaVinci Resolve), motion graphics, VFX and finishing. We work with collaborative reviews and progressive deliveries to ensure the final result meets your expectations.'
      }
    ],
    es: [
      {
        question: '¿Cuánto cuesta producir una película/documental?',
        answer: 'La inversión varía según complejidad, duración y requisitos técnicos. Documentales institucionales comienzan en R$ 50.000, mientras que producciones cinematográficas pueden llegar a R$ 500.000+. Ofrecemos presupuesto personalizado tras análisis del briefing.'
      },
      {
        question: '¿Cuál es el plazo de entrega de un proyecto audiovisual?',
        answer: 'Los plazos varían: videos institucionales (4-8 semanas), documentales (8-16 semanas), películas publicitarias (6-12 semanas). Siempre respetamos deadlines críticos y trabajamos con cronogramas realistas desde el inicio.'
      },
      {
        question: '¿Con qué formatos de entrega trabajan?',
        answer: 'Entregamos en múltiples formatos: DCP (cine), ProRes (broadcast), H.265 (streaming), MP4 (web), además de versiones para redes sociales. Garantimos calidad técnica adecuada para cada plataforma.'
      },
      {
        question: '¿Necesito tener el guion listo o ustedes lo desarrollan?',
        answer: '¡Ambas opciones! Podemos desarrollar guion completo desde cero, trabajar con su guion existente o hacer revisión y mejora. Nuestro equipo incluye guionistas experimentados con premios en festivales.'
      },
      {
        question: '¿Hacen captura en 360° y VR?',
        answer: '¡Sí! Somos especialistas en captura 360° y realidad virtual. Trabajamos con cámaras especializadas (Insta360, GoPro Max) y pipelines de posproducción para experiencias inmersivas completas.'
      },
      {
        question: '¿Cómo funciona la posproducción?',
        answer: 'Nuestra posproducción incluye edición, color grading (DaVinci Resolve), motion graphics, VFX y finalización. Trabajamos con revisiones colaborativas y entregas progresivas para garantizar que el resultado final cumpla sus expectativas.'
      }
    ],
    fr: [
      {
        question: 'Combien coûte la production d\'un film/documentaire?',
        answer: 'L\'investissement varie selon la complexité, la durée et les exigences techniques. Les documentaires institutionnels commencent à R$ 50.000, tandis que les productions cinématographiques peuvent atteindre R$ 500.000+. Nous offrons un devis personnalisé après analyse du briefing.'
      },
      {
        question: 'Quel est le délai de livraison d\'un projet audiovisuel?',
        answer: 'Les délais varient: vidéos institutionnelles (4-8 semaines), documentaires (8-16 semaines), films publicitaires (6-12 semaines). Nous respectons toujours les deadlines critiques et travaillons avec des calendriers réalistes dès le début.'
      },
      {
        question: 'Avec quels formats de livraison travaillez-vous?',
        answer: 'Nous livrons en plusieurs formats: DCP (cinéma), ProRes (broadcast), H.265 (streaming), MP4 (web), plus des versions pour les réseaux sociaux. Nous garantissons une qualité technique appropriée pour chaque plateforme.'
      },
      {
        question: 'Dois-je avoir le scénario prêt ou vous le développez?',
        answer: 'Les deux options! Nous pouvons développer un scénario complet à partir de zéro, travailler avec votre scénario existant ou faire une révision et amélioration. Notre équipe comprend des scénaristes expérimentés avec des prix de festivals.'
      },
      {
        question: 'Faites-vous de la capture 360° et VR?',
        answer: 'Oui! Nous sommes spécialistes en capture 360° et réalité virtuelle. Nous travaillons avec des caméras spécialisées (Insta360, GoPro Max) et des pipelines de post-production pour des expériences immersives complètes.'
      },
      {
        question: 'Comment fonctionne la post-production?',
        answer: 'Notre post-production comprend montage, étalonnage (DaVinci Resolve), motion graphics, VFX et finalisation. Nous travaillons avec des révisions collaboratives et des livraisons progressives pour garantir que le résultat final réponde à vos attentes.'
      }
    ]
  },
  'museus-exposicoes': {
    pt: [
      {
        question: 'Como funciona uma exposição imersiva?',
        answer: 'Criamos experiências que combinam projeções mapeadas, interatividade, realidade virtual e storytelling. Visitantes exploram narrativas através de múltiplos sentidos, gerando conexão emocional profunda com o conteúdo expositivo.'
      },
      {
        question: 'Quanto tempo leva para desenvolver uma exposição?',
        answer: 'Exposições imersivas levam de 4 a 12 meses, dependendo da complexidade. Inclui pesquisa, desenvolvimento conceitual, produção de conteúdo, instalação técnica e testes. Trabalhamos em parceria com curadores e museólogos.'
      },
      {
        question: 'Vocês fornecem equipamentos ou apenas conteúdo?',
        answer: 'Oferecemos soluções completas: conteúdo audiovisual, desenvolvimento de software interativo, especificação técnica de equipamentos, instalação e suporte. Também podemos trabalhar apenas com conteúdo se o cliente já tiver infraestrutura.'
      },
      {
        question: 'Quais tecnologias vocês usam em exposições?',
        answer: 'Utilizamos projeção mapeada, telas interativas, sensores de movimento, realidade aumentada (AR), realidade virtual (VR), sistemas de áudio espacial e iluminação inteligente. Tudo integrado em uma experiência coesa.'
      },
      {
        question: 'Como garantir acessibilidade em exposições imersivas?',
        answer: 'Desenvolvemos soluções inclusivas: legendas, audiodescrição, versões em LIBRAS, interfaces adaptáveis e percursos alternativos. Acreditamos que tecnologia imersiva deve ser acessível para todos.'
      },
      {
        question: 'Vocês fazem manutenção pós-instalação?',
        answer: 'Sim! Oferecemos pacotes de manutenção preventiva, atualizações de conteúdo, suporte técnico remoto e treinamento de equipes. Garantimos que a exposição continue funcionando perfeitamente ao longo do tempo.'
      }
    ],
    en: [
      {
        question: 'How does an immersive exhibition work?',
        answer: 'We create experiences that combine mapped projections, interactivity, virtual reality and storytelling. Visitors explore narratives through multiple senses, generating deep emotional connection with exhibition content.'
      },
      {
        question: 'How long does it take to develop an exhibition?',
        answer: 'Immersive exhibitions take 4 to 12 months, depending on complexity. Includes research, conceptual development, content production, technical installation and testing. We work in partnership with curators and museologists.'
      },
      {
        question: 'Do you provide equipment or just content?',
        answer: 'We offer complete solutions: audiovisual content, interactive software development, technical equipment specification, installation and support. We can also work with content only if client already has infrastructure.'
      },
      {
        question: 'What technologies do you use in exhibitions?',
        answer: 'We use mapped projection, interactive screens, motion sensors, augmented reality (AR), virtual reality (VR), spatial audio systems and smart lighting. Everything integrated into a cohesive experience.'
      },
      {
        question: 'How to ensure accessibility in immersive exhibitions?',
        answer: 'We develop inclusive solutions: captions, audio description, LIBRAS versions, adaptable interfaces and alternative routes. We believe immersive technology should be accessible to everyone.'
      },
      {
        question: 'Do you do post-installation maintenance?',
        answer: 'Yes! We offer preventive maintenance packages, content updates, remote technical support and team training. We ensure the exhibition continues to work perfectly over time.'
      }
    ],
    es: [
      {
        question: '¿Cómo funciona una exposición inmersiva?',
        answer: 'Creamos experiencias que combinan proyecciones mapeadas, interactividad, realidad virtual y storytelling. Los visitantes exploran narrativas a través de múltiples sentidos, generando conexión emocional profunda con el contenido expositivo.'
      },
      {
        question: '¿Cuánto tiempo lleva desarrollar una exposición?',
        answer: 'Las exposiciones inmersivas llevan de 4 a 12 meses, dependiendo de la complejidad. Incluye investigación, desarrollo conceptual, producción de contenido, instalación técnica y pruebas. Trabajamos en asociación con curadores y museólogos.'
      },
      {
        question: '¿Ustedes proporcionan equipos o solo contenido?',
        answer: 'Ofrecemos soluciones completas: contenido audiovisual, desarrollo de software interactivo, especificación técnica de equipos, instalación y soporte. También podemos trabajar solo con contenido si el cliente ya tiene infraestructura.'
      },
      {
        question: '¿Qué tecnologías usan en exposiciones?',
        answer: 'Utilizamos proyección mapeada, pantallas interactivas, sensores de movimiento, realidad aumentada (AR), realidad virtual (VR), sistemas de audio espacial e iluminación inteligente. Todo integrado en una experiencia cohesiva.'
      },
      {
        question: '¿Cómo garantizar accesibilidad en exposiciones inmersivas?',
        answer: 'Desarrollamos soluciones inclusivas: subtítulos, audiodescripción, versiones en LIBRAS, interfaces adaptables y recorridos alternativos. Creemos que la tecnología inmersiva debe ser accesible para todos.'
      },
      {
        question: '¿Hacen mantenimiento post-instalación?',
        answer: '¡Sí! Ofrecemos paquetes de mantenimiento preventivo, actualizaciones de contenido, soporte técnico remoto y capacitación de equipos. Garantizamos que la exposición continúe funcionando perfectamente a lo largo del tiempo.'
      }
    ],
    fr: [
      {
        question: 'Comment fonctionne une exposition immersive?',
        answer: 'Nous créons des expériences qui combinent projections mappées, interactivité, réalité virtuelle et storytelling. Les visiteurs explorent des récits à travers plusieurs sens, générant une connexion émotionnelle profonde avec le contenu expositif.'
      },
      {
        question: 'Combien de temps faut-il pour développer une exposition?',
        answer: 'Les expositions immersives prennent 4 à 12 mois, selon la complexité. Inclut recherche, développement conceptuel, production de contenu, installation technique et tests. Nous travaillons en partenariat avec conservateurs et muséologues.'
      },
      {
        question: 'Fournissez-vous des équipements ou juste du contenu?',
        answer: 'Nous offrons des solutions complètes: contenu audiovisuel, développement de logiciels interactifs, spécification technique d\'équipements, installation et support. Nous pouvons aussi travailler uniquement avec du contenu si le client a déjà l\'infrastructure.'
      },
      {
        question: 'Quelles technologies utilisez-vous dans les expositions?',
        answer: 'Nous utilisons projection mappée, écrans interactifs, capteurs de mouvement, réalité augmentée (AR), réalité virtuelle (VR), systèmes audio spatiaux et éclairage intelligent. Tout intégré dans une expérience cohésive.'
      },
      {
        question: 'Comment garantir l\'accessibilité dans les expositions immersives?',
        answer: 'Nous développons des solutions inclusives: sous-titres, audio-description, versions LIBRAS, interfaces adaptables et parcours alternatifs. Nous croyons que la technologie immersive doit être accessible à tous.'
      },
      {
        question: 'Faites-vous la maintenance post-installation?',
        answer: 'Oui! Nous offrons des packages de maintenance préventive, mises à jour de contenu, support technique à distance et formation d\'équipes. Nous garantissons que l\'exposition continue de fonctionner parfaitement dans le temps.'
      }
    ]
  },
  'realidade-virtual-vr': {
    pt: [
      {
        question: 'Quanto custa desenvolver uma experiência VR?',
        answer: 'Experiências VR variam de R$ 80.000 (simples) a R$ 500.000+ (complexas com múltiplos cenários). O investimento depende de complexidade, qualidade gráfica, interatividade e plataformas (Oculus, HTC Vive, Pico, etc).'
      },
      {
        question: 'Quais headsets vocês suportam?',
        answer: 'Desenvolvemos para todas as plataformas principais: Meta Quest 2/3/Pro, HTC Vive, Pico 4, PlayStation VR2, além de soluções enterprise (Varjo, Pimax). Garantimos compatibilidade multiplataforma quando necessário.'
      },
      {
        question: 'Como funciona a produção de conteúdo VR?',
        answer: 'Produzimos VR de duas formas: captura 360° (real) e renderização 3D (virtual). Captura 360° usa câmeras especializadas, enquanto renderização 3D cria mundos virtuais interativos. Escolhemos a melhor abordagem por projeto.'
      },
      {
        question: 'VR causa motion sickness?',
        answer: 'Boa VR não causa desconforto! Seguimos best practices: frame rate estável (90fps+), movimento suave, opções de teleporte, e design cuidadoso de interação. Testamos extensivamente antes do lançamento.'
      },
      {
        question: 'Vocês fazem VR para treinamento corporativo?',
        answer: 'Sim! Desenvolvemos simulações VR para treinamento de segurança, procedimentos operacionais, soft skills e onboarding. VR aumenta retenção de aprendizado em até 75% comparado a métodos tradicionais.'
      },
      {
        question: 'Como distribuir uma experiência VR?',
        answer: 'Distribuímos via Oculus Store, Steam VR, App Lab, ou instalação direta (side-loading). Também criamos versões web (WebXR) que funcionam em navegadores sem necessidade de app dedicado.'
      }
    ],
    en: [
      {
        question: 'How much does it cost to develop a VR experience?',
        answer: 'VR experiences range from R$ 80,000 (simple) to R$ 500,000+ (complex with multiple scenarios). Investment depends on complexity, graphic quality, interactivity and platforms (Oculus, HTC Vive, Pico, etc).'
      },
      {
        question: 'Which headsets do you support?',
        answer: 'We develop for all major platforms: Meta Quest 2/3/Pro, HTC Vive, Pico 4, PlayStation VR2, plus enterprise solutions (Varjo, Pimax). We guarantee multiplatform compatibility when needed.'
      },
      {
        question: 'How does VR content production work?',
        answer: 'We produce VR in two ways: 360° capture (real) and 3D rendering (virtual). 360° capture uses specialized cameras, while 3D rendering creates interactive virtual worlds. We choose the best approach per project.'
      },
      {
        question: 'Does VR cause motion sickness?',
        answer: 'Good VR doesn\'t cause discomfort! We follow best practices: stable frame rate (90fps+), smooth movement, teleport options, and careful interaction design. We test extensively before launch.'
      },
      {
        question: 'Do you do VR for corporate training?',
        answer: 'Yes! We develop VR simulations for safety training, operational procedures, soft skills and onboarding. VR increases learning retention by up to 75% compared to traditional methods.'
      },
      {
        question: 'How to distribute a VR experience?',
        answer: 'We distribute via Oculus Store, Steam VR, App Lab, or direct installation (side-loading). We also create web versions (WebXR) that work in browsers without dedicated app.'
      }
    ],
    es: [
      {
        question: '¿Cuánto cuesta desarrollar una experiencia VR?',
        answer: 'Las experiencias VR varían de R$ 80.000 (simples) a R$ 500.000+ (complejas con múltiples escenarios). La inversión depende de complejidad, calidad gráfica, interactividad y plataformas (Oculus, HTC Vive, Pico, etc).'
      },
      {
        question: '¿Qué headsets soportan?',
        answer: 'Desarrollamos para todas las plataformas principales: Meta Quest 2/3/Pro, HTC Vive, Pico 4, PlayStation VR2, además de soluciones empresariales (Varjo, Pimax). Garantizamos compatibilidad multiplataforma cuando sea necesario.'
      },
      {
        question: '¿Cómo funciona la producción de contenido VR?',
        answer: 'Producimos VR de dos formas: captura 360° (real) y renderizado 3D (virtual). La captura 360° usa cámaras especializadas, mientras que el renderizado 3D crea mundos virtuales interactivos. Elegimos el mejor enfoque por proyecto.'
      },
      {
        question: '¿VR causa motion sickness?',
        answer: '¡La buena VR no causa incomodidad! Seguimos mejores prácticas: frame rate estable (90fps+), movimiento suave, opciones de teletransporte y diseño cuidadoso de interacción. Probamos extensivamente antes del lanzamiento.'
      },
      {
        question: '¿Hacen VR para capacitación corporativa?',
        answer: '¡Sí! Desarrollamos simulaciones VR para capacitación de seguridad, procedimientos operacionales, soft skills y onboarding. VR aumenta la retención de aprendizaje hasta 75% comparado con métodos tradicionales.'
      },
      {
        question: '¿Cómo distribuir una experiencia VR?',
        answer: 'Distribuimos vía Oculus Store, Steam VR, App Lab, o instalación directa (side-loading). También creamos versiones web (WebXR) que funcionan en navegadores sin necesidad de app dedicado.'
      }
    ],
    fr: [
      {
        question: 'Combien coûte le développement d\'une expérience VR?',
        answer: 'Les expériences VR varient de R$ 80.000 (simples) à R$ 500.000+ (complexes avec multiples scénarios). L\'investissement dépend de la complexité, qualité graphique, interactivité et plateformes (Oculus, HTC Vive, Pico, etc).'
      },
      {
        question: 'Quels casques supportez-vous?',
        answer: 'Nous développons pour toutes les plateformes principales: Meta Quest 2/3/Pro, HTC Vive, Pico 4, PlayStation VR2, plus solutions enterprise (Varjo, Pimax). Nous garantissons compatibilité multiplateforme si nécessaire.'
      },
      {
        question: 'Comment fonctionne la production de contenu VR?',
        answer: 'Nous produisons VR de deux façons: capture 360° (réelle) et rendu 3D (virtuel). Capture 360° utilise caméras spécialisées, tandis que rendu 3D crée mondes virtuels interactifs. Nous choisissons la meilleure approche par projet.'
      },
      {
        question: 'VR cause-t-elle le mal des transports?',
        answer: 'La bonne VR ne cause pas d\'inconfort! Nous suivons meilleures pratiques: frame rate stable (90fps+), mouvement fluide, options de téléportation et design soigné d\'interaction. Nous testons extensivement avant lancement.'
      },
      {
        question: 'Faites-vous VR pour formation corporative?',
        answer: 'Oui! Nous développons simulations VR pour formation sécurité, procédures opérationnelles, soft skills et onboarding. VR augmente rétention d\'apprentissage jusqu\'à 75% comparé aux méthodes traditionnelles.'
      },
      {
        question: 'Comment distribuer une expérience VR?',
        answer: 'Nous distribuons via Oculus Store, Steam VR, App Lab, ou installation directe (side-loading). Nous créons aussi versions web (WebXR) qui fonctionnent dans navigateurs sans app dédié.'
      }
    ]
  },
  'ia-criativa': {
    pt: [
      {
        question: 'Como a IA generativa pode ajudar minha marca?',
        answer: 'IA generativa acelera criação de conteúdo visual, personaliza experiências em escala, gera variações de campanhas automaticamente e cria narrativas adaptativas. Reduz tempo de produção em até 70% mantendo qualidade premium.'
      },
      {
        question: 'Quais ferramentas de IA vocês usam?',
        answer: 'Trabalhamos com Midjourney, DALL-E, Stable Diffusion, Runway ML, ChatGPT, Claude e ferramentas proprietárias. Escolhemos a melhor ferramenta por tipo de projeto e integramos IA no pipeline criativo existente.'
      },
      {
        question: 'Conteúdo gerado por IA é único e original?',
        answer: 'Sim! Combinamos geração por IA com direção de arte humana, refinamento manual e personalização. Cada peça passa por curadoria e ajustes para garantir originalidade e alinhamento com identidade da marca.'
      },
      {
        question: 'IA pode substituir criativos humanos?',
        answer: 'Não! IA é uma ferramenta poderosa que amplifica criatividade humana. Nossos diretores de arte usam IA para explorar ideias rapidamente, mas decisões criativas finais sempre são humanas. IA acelera, humanos criam.'
      },
      {
        question: 'Como garantir que IA não viole direitos autorais?',
        answer: 'Seguimos práticas éticas: treinamos modelos com datasets próprios quando possível, fazemos curadoria rigorosa de outputs, verificamos similaridade e sempre adicionamos elementos originais. Respeitamos propriedade intelectual.'
      },
      {
        question: 'Quanto tempo leva para criar conteúdo com IA?',
        answer: 'IA acelera significativamente: conceitos visuais que levavam dias agora levam horas. Mas refinamento, direção de arte e integração ainda requerem expertise humana. Economia de tempo: 50-70% em fases iniciais.'
      }
    ],
    en: [
      {
        question: 'How can generative AI help my brand?',
        answer: 'Generative AI accelerates visual content creation, personalizes experiences at scale, automatically generates campaign variations and creates adaptive narratives. Reduces production time by up to 70% while maintaining premium quality.'
      },
      {
        question: 'What AI tools do you use?',
        answer: 'We work with Midjourney, DALL-E, Stable Diffusion, Runway ML, ChatGPT, Claude and proprietary tools. We choose the best tool per project type and integrate AI into existing creative pipeline.'
      },
      {
        question: 'Is AI-generated content unique and original?',
        answer: 'Yes! We combine AI generation with human art direction, manual refinement and personalization. Each piece goes through curation and adjustments to ensure originality and alignment with brand identity.'
      },
      {
        question: 'Can AI replace human creatives?',
        answer: 'No! AI is a powerful tool that amplifies human creativity. Our art directors use AI to explore ideas quickly, but final creative decisions are always human. AI accelerates, humans create.'
      },
      {
        question: 'How to ensure AI doesn\'t violate copyright?',
        answer: 'We follow ethical practices: train models with own datasets when possible, rigorous curation of outputs, verify similarity and always add original elements. We respect intellectual property.'
      },
      {
        question: 'How long does it take to create content with AI?',
        answer: 'AI significantly accelerates: visual concepts that took days now take hours. But refinement, art direction and integration still require human expertise. Time savings: 50-70% in initial phases.'
      }
    ],
    es: [
      {
        question: '¿Cómo la IA generativa puede ayudar a mi marca?',
        answer: 'IA generativa acelera creación de contenido visual, personaliza experiencias a escala, genera variaciones de campañas automáticamente y crea narrativas adaptativas. Reduce tiempo de producción hasta 70% manteniendo calidad premium.'
      },
      {
        question: '¿Qué herramientas de IA usan?',
        answer: 'Trabajamos con Midjourney, DALL-E, Stable Diffusion, Runway ML, ChatGPT, Claude y herramientas propietarias. Elegimos la mejor herramienta por tipo de proyecto e integramos IA en el pipeline creativo existente.'
      },
      {
        question: '¿El contenido generado por IA es único y original?',
        answer: '¡Sí! Combinamos generación por IA con dirección de arte humana, refinamiento manual y personalización. Cada pieza pasa por curaduría y ajustes para garantizar originalidad y alineación con identidad de marca.'
      },
      {
        question: '¿IA puede reemplazar creativos humanos?',
        answer: '¡No! IA es una herramienta poderosa que amplifica creatividad humana. Nuestros directores de arte usan IA para explorar ideas rápidamente, pero decisiones creativas finales siempre son humanas. IA acelera, humanos crean.'
      },
      {
        question: '¿Cómo garantizar que IA no viole derechos de autor?',
        answer: 'Seguimos prácticas éticas: entrenamos modelos con datasets propios cuando es posible, hacemos curaduría rigurosa de outputs, verificamos similitud y siempre agregamos elementos originales. Respetamos propiedad intelectual.'
      },
      {
        question: '¿Cuánto tiempo lleva crear contenido con IA?',
        answer: 'IA acelera significativamente: conceptos visuales que llevaban días ahora llevan horas. Pero refinamiento, dirección de arte e integración aún requieren expertise humana. Ahorro de tiempo: 50-70% en fases iniciales.'
      }
    ],
    fr: [
      {
        question: 'Comment l\'IA générative peut aider ma marque?',
        answer: 'IA générative accélère création de contenu visuel, personnalise expériences à l\'échelle, génère automatiquement variations de campagnes et crée narratifs adaptatifs. Réduit temps de production jusqu\'à 70% tout en maintenant qualité premium.'
      },
      {
        question: 'Quels outils IA utilisez-vous?',
        answer: 'Nous travaillons avec Midjourney, DALL-E, Stable Diffusion, Runway ML, ChatGPT, Claude et outils propriétaires. Nous choisissons le meilleur outil par type de projet et intégrons IA dans pipeline créatif existant.'
      },
      {
        question: 'Le contenu généré par IA est-il unique et original?',
        answer: 'Oui! Nous combinons génération par IA avec direction artistique humaine, raffinement manuel et personnalisation. Chaque pièce passe par curation et ajustements pour garantir originalité et alignement avec identité de marque.'
      },
      {
        question: 'L\'IA peut-elle remplacer les créatifs humains?',
        answer: 'Non! IA est un outil puissant qui amplifie créativité humaine. Nos directeurs artistiques utilisent IA pour explorer idées rapidement, mais décisions créatives finales sont toujours humaines. IA accélère, humains créent.'
      },
      {
        question: 'Comment garantir que IA ne viole pas droits d\'auteur?',
        answer: 'Nous suivons pratiques éthiques: formons modèles avec datasets propres quand possible, curation rigoureuse des outputs, vérifions similarité et ajoutons toujours éléments originaux. Nous respectons propriété intellectuelle.'
      },
      {
        question: 'Combien de temps faut-il pour créer contenu avec IA?',
        answer: 'IA accélère significativement: concepts visuels qui prenaient jours prennent maintenant heures. Mais raffinement, direction artistique et intégration nécessitent encore expertise humaine. Économie de temps: 50-70% en phases initiales.'
      }
    ]
  },
  'pos-producao-vfx': {
    pt: [
      {
        question: 'Quanto custa um projeto de VFX?',
        answer: 'Projetos VFX variam de R$ 30.000 (composições simples) a R$ 500.000+ (efeitos complexos com múltiplos elementos). O investimento depende de complexidade, número de shots, qualidade fotorealística e prazos. Oferecemos orçamento detalhado após análise técnica.'
      },
      {
        question: 'Quais softwares vocês usam para VFX?',
        answer: 'Trabalhamos com Nuke, After Effects, Fusion, Houdini, Maya, Blender e ferramentas proprietárias. Escolhemos a melhor ferramenta por tipo de efeito e integramos em pipelines eficientes que garantem qualidade e agilidade.'
      },
      {
        question: 'Vocês fazem motion graphics?',
        answer: 'Sim! Criamos motion graphics desde simples animações 2D até complexas composições 3D. Desenvolvemos identidades visuais animadas, infográficos, aberturas de programas e peças publicitárias com alta qualidade técnica e criativa.'
      },
      {
        question: 'Qual o prazo para pós-produção?',
        answer: 'Prazos variam: edição simples (1-2 semanas), color grading (1 semana), motion graphics (2-4 semanas), VFX complexos (4-12 semanas). Sempre trabalhamos com cronogramas realistas e entregas progressivas para garantir qualidade.'
      },
      {
        question: 'Vocês trabalham com projetos remotos?',
        answer: 'Sim! Temos infraestrutura para trabalhar remotamente com clientes de qualquer lugar. Utilizamos ferramentas de revisão online, transferência segura de arquivos e comunicação constante para garantir que projetos remotos funcionem perfeitamente.'
      },
      {
        question: 'Como funciona o processo de revisão?',
        answer: 'Utilizamos plataformas de revisão online (Frame.io, Wipster) que permitem comentários precisos por frame. Realizamos revisões colaborativas em tempo real quando necessário e sempre garantimos que feedback seja incorporado de forma eficiente.'
      }
    ],
    en: [
      {
        question: 'How much does a VFX project cost?',
        answer: 'VFX projects range from R$ 30,000 (simple compositions) to R$ 500,000+ (complex effects with multiple elements). Investment depends on complexity, number of shots, photorealistic quality and deadlines. We offer detailed quote after technical analysis.'
      },
      {
        question: 'What software do you use for VFX?',
        answer: 'We work with Nuke, After Effects, Fusion, Houdini, Maya, Blender and proprietary tools. We choose the best tool per effect type and integrate into efficient pipelines that guarantee quality and agility.'
      },
      {
        question: 'Do you do motion graphics?',
        answer: 'Yes! We create motion graphics from simple 2D animations to complex 3D compositions. We develop animated visual identities, infographics, program openings and advertising pieces with high technical and creative quality.'
      },
      {
        question: 'What is the deadline for post-production?',
        answer: 'Deadlines vary: simple editing (1-2 weeks), color grading (1 week), motion graphics (2-4 weeks), complex VFX (4-12 weeks). We always work with realistic schedules and progressive deliveries to guarantee quality.'
      },
      {
        question: 'Do you work with remote projects?',
        answer: 'Yes! We have infrastructure to work remotely with clients from anywhere. We use online review tools, secure file transfer and constant communication to ensure remote projects work perfectly.'
      },
      {
        question: 'How does the review process work?',
        answer: 'We use online review platforms (Frame.io, Wipster) that allow precise comments per frame. We conduct collaborative reviews in real time when needed and always ensure feedback is incorporated efficiently.'
      }
    ],
    es: [
      {
        question: '¿Cuánto cuesta un proyecto de VFX?',
        answer: 'Proyectos VFX varían de R$ 30.000 (composiciones simples) a R$ 500.000+ (efectos complejos con múltiples elementos). La inversión depende de complejidad, número de shots, calidad fotorrealística y plazos. Ofrecemos presupuesto detallado tras análisis técnico.'
      },
      {
        question: '¿Qué softwares usan para VFX?',
        answer: 'Trabajamos con Nuke, After Effects, Fusion, Houdini, Maya, Blender y herramientas propietarias. Elegimos la mejor herramienta por tipo de efecto e integramos en pipelines eficientes que garantizan calidad y agilidad.'
      },
      {
        question: '¿Hacen motion graphics?',
        answer: '¡Sí! Creamos motion graphics desde simples animaciones 2D hasta complejas composiciones 3D. Desarrollamos identidades visuales animadas, infografías, aperturas de programas y piezas publicitarias con alta calidad técnica y creativa.'
      },
      {
        question: '¿Cuál el plazo para posproducción?',
        answer: 'Plazos varían: edición simple (1-2 semanas), color grading (1 semana), motion graphics (2-4 semanas), VFX complejos (4-12 semanas). Siempre trabajamos con cronogramas realistas y entregas progresivas para garantizar calidad.'
      },
      {
        question: '¿Trabajan con proyectos remotos?',
        answer: '¡Sí! Tenemos infraestructura para trabajar remotamente con clientes de cualquier lugar. Utilizamos herramientas de revisión online, transferencia segura de archivos y comunicación constante para garantizar que proyectos remotos funcionen perfectamente.'
      },
      {
        question: '¿Cómo funciona el proceso de revisión?',
        answer: 'Utilizamos plataformas de revisión online (Frame.io, Wipster) que permiten comentarios precisos por frame. Realizamos revisiones colaborativas en tiempo real cuando es necesario y siempre garantizamos que feedback sea incorporado de forma eficiente.'
      }
    ],
    fr: [
      {
        question: 'Combien coûte un projet VFX?',
        answer: 'Projets VFX varient de R$ 30.000 (compositions simples) à R$ 500.000+ (effets complexes avec multiples éléments). L\'investissement dépend de complexité, nombre de shots, qualité photoréaliste et délais. Nous offrons devis détaillé après analyse technique.'
      },
      {
        question: 'Quels logiciels utilisez-vous pour VFX?',
        answer: 'Nous travaillons avec Nuke, After Effects, Fusion, Houdini, Maya, Blender et outils propriétaires. Nous choisissons le meilleur outil par type d\'effet et intégrons dans pipelines efficients qui garantissent qualité et agilité.'
      },
      {
        question: 'Faites-vous motion graphics?',
        answer: 'Oui! Nous créons motion graphics de simples animations 2D aux compositions 3D complexes. Nous développons identités visuelles animées, infographies, ouvertures de programmes et pièces publicitaires avec haute qualité technique et créative.'
      },
      {
        question: 'Quel est le délai pour post-production?',
        answer: 'Délais varient: montage simple (1-2 semaines), étalonnage (1 semaine), motion graphics (2-4 semaines), VFX complexes (4-12 semaines). Nous travaillons toujours avec calendriers réalistes et livraisons progressives pour garantir qualité.'
      },
      {
        question: 'Travaillez-vous avec projets distants?',
        answer: 'Oui! Nous avons infrastructure pour travailler à distance avec clients de n\'importe où. Nous utilisons outils de révision en ligne, transfert sécurisé de fichiers et communication constante pour garantir que projets distants fonctionnent parfaitement.'
      },
      {
        question: 'Comment fonctionne le processus de révision?',
        answer: 'Nous utilisons plateformes de révision en ligne (Frame.io, Wipster) qui permettent commentaires précis par frame. Nous réalisons révisions collaboratives en temps réel quand nécessaire et garantissons toujours que feedback soit incorporé efficacement.'
      }
    ]
  },
  'animacao-2d-3d': {
    pt: [
      {
        question: 'Quanto custa produzir uma animação?',
        answer: 'Animações variam de R$ 50.000 (2D simples, 30s) a R$ 800.000+ (3D complexa, longa-metragem). O investimento depende de estilo (2D/3D), duração, complexidade de personagens, qualidade gráfica e prazos. Oferecemos orçamento personalizado.'
      },
      {
        question: 'Qual a diferença entre animação 2D e 3D?',
        answer: '2D é tradicional (desenho animado), mais rápida e econômica, ideal para vídeos explicativos e publicidade. 3D é tridimensional, mais realista e imersiva, ideal para filmes, games e experiências interativas. Escolhemos a melhor abordagem por projeto.'
      },
      {
        question: 'Quanto tempo leva para produzir uma animação?',
        answer: 'Prazos variam: animação 2D simples (4-8 semanas), 3D curta (8-16 semanas), longa-metragem (12-24 meses). Sempre trabalhamos com cronogramas realistas e entregas progressivas (storyboard, animatic, animação final).'
      },
      {
        question: 'Vocês fazem animação para games?',
        answer: 'Sim! Criamos animações de personagens, cutscenes, cinemáticas e animações de gameplay para jogos. Trabalhamos com engines como Unity e Unreal, garantindo que animações funcionem perfeitamente integradas ao jogo.'
      },
      {
        question: 'Preciso fornecer roteiro ou vocês desenvolvem?',
        answer: 'Ambas opções! Podemos desenvolver roteiro completo, trabalhar com seu roteiro existente ou fazer adaptação. Nossa equipe inclui roteiristas especializados em animação que entendem as particularidades narrativas do formato.'
      },
      {
        question: 'Vocês fazem voice-over e trilha sonora?',
        answer: 'Sim! Oferecemos produção completa: voice-over profissional (dublagem em múltiplos idiomas), composição de trilha sonora original, sound design e mixagem. Tudo integrado para criar experiência audiovisual completa e impactante.'
      }
    ],
    en: [
      {
        question: 'How much does it cost to produce an animation?',
        answer: 'Animations range from R$ 50,000 (simple 2D, 30s) to R$ 800,000+ (complex 3D, feature film). Investment depends on style (2D/3D), duration, character complexity, graphic quality and deadlines. We offer personalized quote.'
      },
      {
        question: 'What is the difference between 2D and 3D animation?',
        answer: '2D is traditional (cartoon), faster and more economical, ideal for explanatory videos and advertising. 3D is three-dimensional, more realistic and immersive, ideal for films, games and interactive experiences. We choose the best approach per project.'
      },
      {
        question: 'How long does it take to produce an animation?',
        answer: 'Deadlines vary: simple 2D animation (4-8 weeks), short 3D (8-16 weeks), feature film (12-24 months). We always work with realistic schedules and progressive deliveries (storyboard, animatic, final animation).'
      },
      {
        question: 'Do you do animation for games?',
        answer: 'Yes! We create character animations, cutscenes, cinematics and gameplay animations for games. We work with engines like Unity and Unreal, ensuring animations work perfectly integrated into the game.'
      },
      {
        question: 'Do I need to provide script or do you develop it?',
        answer: 'Both options! We can develop complete script, work with your existing script or do adaptation. Our team includes animation-specialized screenwriters who understand narrative particularities of the format.'
      },
      {
        question: 'Do you do voice-over and soundtrack?',
        answer: 'Yes! We offer complete production: professional voice-over (dubbing in multiple languages), original soundtrack composition, sound design and mixing. Everything integrated to create complete and impactful audiovisual experience.'
      }
    ],
    es: [
      {
        question: '¿Cuánto cuesta producir una animación?',
        answer: 'Animaciones varían de R$ 50.000 (2D simple, 30s) a R$ 800.000+ (3D compleja, largometraje). La inversión depende de estilo (2D/3D), duración, complejidad de personajes, calidad gráfica y plazos. Ofrecemos presupuesto personalizado.'
      },
      {
        question: '¿Cuál la diferencia entre animación 2D y 3D?',
        answer: '2D es tradicional (dibujo animado), más rápida y económica, ideal para videos explicativos y publicidad. 3D es tridimensional, más realista e inmersiva, ideal para películas, juegos y experiencias interactivas. Elegimos el mejor enfoque por proyecto.'
      },
      {
        question: '¿Cuánto tiempo lleva producir una animación?',
        answer: 'Plazos varían: animación 2D simple (4-8 semanas), 3D corta (8-16 semanas), largometraje (12-24 meses). Siempre trabajamos con cronogramas realistas y entregas progresivas (storyboard, animatic, animación final).'
      },
      {
        question: '¿Hacen animación para juegos?',
        answer: '¡Sí! Creamos animaciones de personajes, cutscenes, cinemáticas y animaciones de gameplay para juegos. Trabajamos con engines como Unity y Unreal, garantizando que animaciones funcionen perfectamente integradas al juego.'
      },
      {
        question: '¿Necesito proporcionar guion o ustedes lo desarrollan?',
        answer: '¡Ambas opciones! Podemos desarrollar guion completo, trabajar con su guion existente o hacer adaptación. Nuestro equipo incluye guionistas especializados en animación que entienden particularidades narrativas del formato.'
      },
      {
        question: '¿Hacen voice-over y banda sonora?',
        answer: '¡Sí! Ofrecemos producción completa: voice-over profesional (doblaje en múltiples idiomas), composición de banda sonora original, sound design y mezcla. Todo integrado para crear experiencia audiovisual completa e impactante.'
      }
    ],
    fr: [
      {
        question: 'Combien coûte produire une animation?',
        answer: 'Animations varient de R$ 50.000 (2D simple, 30s) à R$ 800.000+ (3D complexe, long métrage). L\'investissement dépend de style (2D/3D), durée, complexité de personnages, qualité graphique et délais. Nous offrons devis personnalisé.'
      },
      {
        question: 'Quelle est la différence entre animation 2D et 3D?',
        answer: '2D est traditionnelle (dessin animé), plus rapide et économique, idéale pour vidéos explicatives et publicité. 3D est tridimensionnelle, plus réaliste et immersive, idéale pour films, jeux et expériences interactives. Nous choisissons la meilleure approche par projet.'
      },
      {
        question: 'Combien de temps faut-il pour produire une animation?',
        answer: 'Délais varient: animation 2D simple (4-8 semaines), 3D courte (8-16 semaines), long métrage (12-24 mois). Nous travaillons toujours avec calendriers réalistes et livraisons progressives (storyboard, animatic, animation finale).'
      },
      {
        question: 'Faites-vous animation pour jeux?',
        answer: 'Oui! Nous créons animations de personnages, cutscenes, cinématiques et animations de gameplay pour jeux. Nous travaillons avec engines comme Unity et Unreal, garantissant que animations fonctionnent parfaitement intégrées au jeu.'
      },
      {
        question: 'Dois-je fournir scénario ou vous le développez?',
        answer: 'Les deux options! Nous pouvons développer scénario complet, travailler avec votre scénario existant ou faire adaptation. Notre équipe comprend scénaristes spécialisés en animation qui comprennent particularités narratives du format.'
      },
      {
        question: 'Faites-vous voice-over et bande sonore?',
        answer: 'Oui! Nous offrons production complète: voice-over professionnel (doublage en multiples langues), composition de bande sonore originale, sound design et mixage. Tout intégré pour créer expérience audiovisuelle complète et impactante.'
      }
    ]
  },
  'xr-interatividade-web3': {
    pt: [
      {
        question: 'O que é XR e como difere de VR/AR?',
        answer: 'XR (Extended Reality) é termo guarda-chuva que inclui VR (Realidade Virtual), AR (Realidade Aumentada) e MR (Realidade Mista). VR é totalmente imersivo, AR sobrepõe digital ao real, MR combina ambos. Escolhemos a melhor tecnologia por projeto.'
      },
      {
        question: 'Quanto custa desenvolver uma experiência XR?',
        answer: 'Experiências XR variam de R$ 60.000 (AR simples) a R$ 600.000+ (VR complexa com múltiplos cenários). Investimento depende de complexidade, plataforma (mobile/web/headset), interatividade e qualidade gráfica. Oferecemos orçamento personalizado.'
      },
      {
        question: 'Vocês desenvolvem para WebXR (navegador)?',
        answer: 'Sim! Desenvolvemos experiências WebXR que funcionam diretamente no navegador, sem necessidade de apps. Ideal para acessibilidade e distribuição ampla. Utilizamos Three.js, A-Frame e frameworks modernos para garantir compatibilidade multiplataforma.'
      },
      {
        question: 'Como funciona interatividade em XR?',
        answer: 'Criamos interações naturais: gestos, voz, movimento, toque. Utilizamos sensores de movimento, reconhecimento de voz, eye-tracking e controllers. Cada interação é projetada para ser intuitiva e imersiva, aproveitando capacidades únicas de cada plataforma XR.'
      },
      {
        question: 'Vocês trabalham com Web3 e NFTs?',
        answer: 'Sim! Desenvolvemos experiências que integram blockchain, NFTs e metaverso. Criamos galerias virtuais, experiências tokenizadas e integrações com wallets Web3. Entendemos que Web3 é o futuro da propriedade digital e criamos pontes entre mundos físico e virtual.'
      },
      {
        question: 'Qual plataforma XR vocês suportam?',
        answer: 'Desenvolvemos para todas principais: Meta Quest, Apple Vision Pro, HoloLens, Magic Leap, Pico, HTC Vive, além de WebXR (navegadores) e AR mobile (iOS/Android). Garantimos compatibilidade multiplataforma quando necessário.'
      }
    ],
    en: [
      {
        question: 'What is XR and how does it differ from VR/AR?',
        answer: 'XR (Extended Reality) is umbrella term that includes VR (Virtual Reality), AR (Augmented Reality) and MR (Mixed Reality). VR is fully immersive, AR overlays digital on real, MR combines both. We choose best technology per project.'
      },
      {
        question: 'How much does it cost to develop an XR experience?',
        answer: 'XR experiences range from R$ 60,000 (simple AR) to R$ 600,000+ (complex VR with multiple scenarios). Investment depends on complexity, platform (mobile/web/headset), interactivity and graphic quality. We offer personalized quote.'
      },
      {
        question: 'Do you develop for WebXR (browser)?',
        answer: 'Yes! We develop WebXR experiences that work directly in browser, without apps. Ideal for accessibility and wide distribution. We use Three.js, A-Frame and modern frameworks to ensure multiplatform compatibility.'
      },
      {
        question: 'How does interactivity work in XR?',
        answer: 'We create natural interactions: gestures, voice, movement, touch. We use motion sensors, voice recognition, eye-tracking and controllers. Each interaction is designed to be intuitive and immersive, leveraging unique capabilities of each XR platform.'
      },
      {
        question: 'Do you work with Web3 and NFTs?',
        answer: 'Yes! We develop experiences that integrate blockchain, NFTs and metaverse. We create virtual galleries, tokenized experiences and Web3 wallet integrations. We understand Web3 is future of digital ownership and create bridges between physical and virtual worlds.'
      },
      {
        question: 'Which XR platforms do you support?',
        answer: 'We develop for all major ones: Meta Quest, Apple Vision Pro, HoloLens, Magic Leap, Pico, HTC Vive, plus WebXR (browsers) and mobile AR (iOS/Android). We guarantee multiplatform compatibility when needed.'
      }
    ],
    es: [
      {
        question: '¿Qué es XR y cómo difiere de VR/AR?',
        answer: 'XR (Extended Reality) es término paraguas que incluye VR (Realidad Virtual), AR (Realidad Aumentada) y MR (Realidad Mixta). VR es totalmente inmersivo, AR superpone digital al real, MR combina ambos. Elegimos la mejor tecnología por proyecto.'
      },
      {
        question: '¿Cuánto cuesta desarrollar una experiencia XR?',
        answer: 'Experiencias XR varían de R$ 60.000 (AR simple) a R$ 600.000+ (VR compleja con múltiples escenarios). La inversión depende de complejidad, plataforma (mobile/web/headset), interactividad y calidad gráfica. Ofrecemos presupuesto personalizado.'
      },
      {
        question: '¿Desarrollan para WebXR (navegador)?',
        answer: '¡Sí! Desarrollamos experiencias WebXR que funcionan directamente en el navegador, sin necesidad de apps. Ideal para accesibilidad y distribución amplia. Utilizamos Three.js, A-Frame y frameworks modernos para garantizar compatibilidad multiplataforma.'
      },
      {
        question: '¿Cómo funciona interactividad en XR?',
        answer: 'Creamos interacciones naturales: gestos, voz, movimiento, toque. Utilizamos sensores de movimiento, reconocimiento de voz, eye-tracking y controllers. Cada interacción está diseñada para ser intuitiva e inmersiva, aprovechando capacidades únicas de cada plataforma XR.'
      },
      {
        question: '¿Trabajan con Web3 y NFTs?',
        answer: '¡Sí! Desarrollamos experiencias que integran blockchain, NFTs y metaverso. Creamos galerías virtuales, experiencias tokenizadas e integraciones con wallets Web3. Entendemos que Web3 es el futuro de la propiedad digital y creamos puentes entre mundos físico y virtual.'
      },
      {
        question: '¿Qué plataformas XR soportan?',
        answer: 'Desarrollamos para todas principales: Meta Quest, Apple Vision Pro, HoloLens, Magic Leap, Pico, HTC Vive, además de WebXR (navegadores) y AR mobile (iOS/Android). Garantizamos compatibilidad multiplataforma cuando sea necesario.'
      }
    ],
    fr: [
      {
        question: 'Qu\'est-ce que XR et comment diffère-t-il de VR/AR?',
        answer: 'XR (Extended Reality) est terme parapluie qui inclut VR (Réalité Virtuelle), AR (Réalité Augmentée) et MR (Réalité Mixte). VR est totalement immersive, AR superpose numérique au réel, MR combine les deux. Nous choisissons meilleure technologie par projet.'
      },
      {
        question: 'Combien coûte développer une expérience XR?',
        answer: 'Expériences XR varient de R$ 60.000 (AR simple) à R$ 600.000+ (VR complexe avec multiples scénarios). L\'investissement dépend de complexité, plateforme (mobile/web/headset), interactivité et qualité graphique. Nous offrons devis personnalisé.'
      },
      {
        question: 'Développez-vous pour WebXR (navigateur)?',
        answer: 'Oui! Nous développons expériences WebXR qui fonctionnent directement dans navigateur, sans apps. Idéal pour accessibilité et distribution large. Nous utilisons Three.js, A-Frame et frameworks modernes pour garantir compatibilité multiplateforme.'
      },
      {
        question: 'Comment fonctionne interactivité en XR?',
        answer: 'Nous créons interactions naturelles: gestes, voix, mouvement, toucher. Nous utilisons capteurs de mouvement, reconnaissance vocale, eye-tracking et controllers. Chaque interaction est conçue pour être intuitive et immersive, exploitant capacités uniques de chaque plateforme XR.'
      },
      {
        question: 'Travaillez-vous avec Web3 et NFTs?',
        answer: 'Oui! Nous développons expériences qui intègrent blockchain, NFTs et métavers. Nous créons galeries virtuelles, expériences tokenisées et intégrations avec wallets Web3. Nous comprenons que Web3 est avenir de propriété numérique et créons ponts entre mondes physique et virtuel.'
      },
      {
        question: 'Quelles plateformes XR supportez-vous?',
        answer: 'Nous développons pour toutes principales: Meta Quest, Apple Vision Pro, HoloLens, Magic Leap, Pico, HTC Vive, plus WebXR (navigateurs) et AR mobile (iOS/Android). Nous garantissons compatibilité multiplateforme si nécessaire.'
      }
    ]
  },
  'games-interativos': {
    pt: [
      {
        question: 'Vocês desenvolvem jogos completos?',
        answer: 'Sim! Desenvolvemos jogos desde conceito até publicação. Criamos jogos educacionais, serious games, jogos promocionais e experiências gamificadas. Trabalhamos com Unity e Unreal Engine, garantindo qualidade profissional e performance otimizada.'
      },
      {
        question: 'Quanto custa desenvolver um jogo?',
        answer: 'Jogos variam de R$ 80.000 (simples, 2D) a R$ 1.000.000+ (AAA, 3D complexo). Investimento depende de complexidade, plataforma (mobile/PC/console), gráficos, mecânicas e prazos. Oferecemos orçamento detalhado após análise do conceito.'
      },
      {
        question: 'Vocês fazem serious games para treinamento?',
        answer: 'Sim! Especializamo-nos em serious games para educação corporativa, treinamento de segurança, simulações médicas e educação. Jogos aumentam engajamento e retenção de aprendizado em até 75% comparado a métodos tradicionais.'
      },
      {
        question: 'Quais plataformas vocês suportam?',
        answer: 'Desenvolvemos para PC (Windows/Mac/Linux), mobile (iOS/Android), web (HTML5), consoles (quando aplicável) e VR/AR. Garantimos otimização específica para cada plataforma, garantindo melhor performance e experiência do usuário.'
      },
      {
        question: 'Vocês fazem port de jogos existentes?',
        answer: 'Sim! Realizamos port de jogos entre plataformas, adaptando controles, interface e otimizando performance. Nossa experiência garante que o jogo funcione perfeitamente na nova plataforma mantendo qualidade e jogabilidade originais.'
      },
      {
        question: 'Como funciona monetização de jogos?',
        answer: 'Implementamos sistemas de monetização: compras in-app, assinaturas, anúncios, DLCs. Trabalhamos com modelos freemium, premium e híbridos. Desenvolvemos estratégias de monetização que equilibram receita com experiência do jogador.'
      }
    ],
    en: [
      {
        question: 'Do you develop complete games?',
        answer: 'Yes! We develop games from concept to publication. We create educational games, serious games, promotional games and gamified experiences. We work with Unity and Unreal Engine, ensuring professional quality and optimized performance.'
      },
      {
        question: 'How much does it cost to develop a game?',
        answer: 'Games range from R$ 80,000 (simple, 2D) to R$ 1,000,000+ (AAA, complex 3D). Investment depends on complexity, platform (mobile/PC/console), graphics, mechanics and deadlines. We offer detailed quote after concept analysis.'
      },
      {
        question: 'Do you do serious games for training?',
        answer: 'Yes! We specialize in serious games for corporate education, safety training, medical simulations and education. Games increase engagement and learning retention by up to 75% compared to traditional methods.'
      },
      {
        question: 'Which platforms do you support?',
        answer: 'We develop for PC (Windows/Mac/Linux), mobile (iOS/Android), web (HTML5), consoles (when applicable) and VR/AR. We guarantee specific optimization for each platform, ensuring best performance and user experience.'
      },
      {
        question: 'Do you do port of existing games?',
        answer: 'Yes! We perform game ports between platforms, adapting controls, interface and optimizing performance. Our experience ensures game works perfectly on new platform maintaining original quality and gameplay.'
      },
      {
        question: 'How does game monetization work?',
        answer: 'We implement monetization systems: in-app purchases, subscriptions, ads, DLCs. We work with freemium, premium and hybrid models. We develop monetization strategies that balance revenue with player experience.'
      }
    ],
    es: [
      {
        question: '¿Desarrollan juegos completos?',
        answer: '¡Sí! Desarrollamos juegos desde concepto hasta publicación. Creamos juegos educacionales, serious games, juegos promocionales y experiencias gamificadas. Trabajamos con Unity y Unreal Engine, garantizando calidad profesional y performance optimizada.'
      },
      {
        question: '¿Cuánto cuesta desarrollar un juego?',
        answer: 'Juegos varían de R$ 80.000 (simple, 2D) a R$ 1.000.000+ (AAA, 3D complejo). La inversión depende de complejidad, plataforma (mobile/PC/consola), gráficos, mecánicas y plazos. Ofrecemos presupuesto detallado tras análisis del concepto.'
      },
      {
        question: '¿Hacen serious games para capacitación?',
        answer: '¡Sí! Nos especializamos en serious games para educación corporativa, capacitación de seguridad, simulaciones médicas y educación. Juegos aumentan engagement y retención de aprendizaje hasta 75% comparado con métodos tradicionales.'
      },
      {
        question: '¿Qué plataformas soportan?',
        answer: 'Desarrollamos para PC (Windows/Mac/Linux), mobile (iOS/Android), web (HTML5), consolas (cuando aplicable) y VR/AR. Garantizamos optimización específica para cada plataforma, garantizando mejor performance y experiencia del usuario.'
      },
      {
        question: '¿Hacen port de juegos existentes?',
        answer: '¡Sí! Realizamos port de juegos entre plataformas, adaptando controles, interfaz y optimizando performance. Nuestra experiencia garantiza que el juego funcione perfectamente en la nueva plataforma manteniendo calidad y jugabilidad originales.'
      },
      {
        question: '¿Cómo funciona monetización de juegos?',
        answer: 'Implementamos sistemas de monetización: compras in-app, suscripciones, anuncios, DLCs. Trabajamos con modelos freemium, premium e híbridos. Desarrollamos estrategias de monetización que equilibran receita con experiencia del jugador.'
      }
    ],
    fr: [
      {
        question: 'Développez-vous jeux complets?',
        answer: 'Oui! Nous développons jeux de concept à publication. Nous créons jeux éducatifs, serious games, jeux promotionnels et expériences gamifiées. Nous travaillons avec Unity et Unreal Engine, garantissant qualité professionnelle et performance optimisée.'
      },
      {
        question: 'Combien coûte développer un jeu?',
        answer: 'Jeux varient de R$ 80.000 (simple, 2D) à R$ 1.000.000+ (AAA, 3D complexe). L\'investissement dépend de complexité, plateforme (mobile/PC/console), graphiques, mécaniques et délais. Nous offrons devis détaillé après analyse du concept.'
      },
      {
        question: 'Faites-vous serious games pour formation?',
        answer: 'Oui! Nous spécialisons en serious games pour éducation corporative, formation sécurité, simulations médicales et éducation. Jeux augmentent engagement et rétention d\'apprentissage jusqu\'à 75% comparé aux méthodes traditionnelles.'
      },
      {
        question: 'Quelles plateformes supportez-vous?',
        answer: 'Nous développons pour PC (Windows/Mac/Linux), mobile (iOS/Android), web (HTML5), consoles (quand applicable) et VR/AR. Nous garantissons optimisation spécifique pour chaque plateforme, assurant meilleure performance et expérience utilisateur.'
      },
      {
        question: 'Faites-vous port de jeux existants?',
        answer: 'Oui! Nous réalisons port de jeux entre plateformes, adaptant contrôles, interface et optimisant performance. Notre expérience assure que jeu fonctionne parfaitement sur nouvelle plateforme maintenant qualité et jouabilité originales.'
      },
      {
        question: 'Comment fonctionne monétisation de jeux?',
        answer: 'Nous implémentons systèmes de monétisation: achats in-app, abonnements, publicités, DLCs. Nous travaillons avec modèles freemium, premium et hybrides. Nous développons stratégies de monétisation qui équilibrent revenu avec expérience joueur.'
      }
    ]
  },
  'cenografia-design-espacial': {
    pt: [
      {
        question: 'Quanto custa um projeto de cenografia?',
        answer: 'Projetos de cenografia variam de R$ 50.000 (conceito e visualizações) a R$ 500.000+ (projeto completo com implantação). Investimento depende de complexidade, tamanho do espaço, tecnologias integradas e escopo de execução. Oferecemos orçamento personalizado após análise do briefing.'
      },
      {
        question: 'Vocês fazem apenas visualizações 3D ou também executam?',
        answer: 'Ambas opções! Podemos fazer apenas projeto conceitual e visualizações 3D, ou acompanhar execução completa incluindo coordenação com construtoras, fornecedores e equipes técnicas. Adaptamos nosso escopo conforme necessidade do cliente.'
      },
      {
        question: 'Como funciona integração de tecnologia em cenografia?',
        answer: 'Integramos projeções mapeadas, iluminação inteligente, telas interativas, sensores e sistemas de áudio espacial. Trabalhamos em parceria com especialistas técnicos para garantir que tecnologia funcione perfeitamente integrada ao design espacial.'
      },
      {
        question: 'Vocês trabalham com acessibilidade?',
        answer: 'Sim! Acessibilidade é prioridade em todos nossos projetos. Desenvolvemos soluções inclusivas: sinalética tátil, contrastes adequados, percursos alternativos, integração com tecnologias assistivas. Garantimos que espaços sejam acessíveis para todos os visitantes.'
      },
      {
        question: 'Qual o prazo para desenvolvimento de projeto?',
        answer: 'Prazos variam: conceito e visualizações (4-8 semanas), projeto executivo completo (8-16 semanas), acompanhamento de execução (conforme cronograma da obra). Sempre trabalhamos com prazos realistas e entregas progressivas.'
      },
      {
        question: 'Vocês fazem sinalética e wayfinding?',
        answer: 'Sim! Desenvolvemos sistemas completos de sinalética e wayfinding que guiam visitantes de forma intuitiva. Criamos iconografia, tipografia e layouts que comunicam claramente sem sobrecarregar visualmente, garantindo navegação fácil e agradável.'
      }
    ],
    en: [
      {
        question: 'How much does a scenography project cost?',
        answer: 'Scenography projects range from R$ 50,000 (concept and visualizations) to R$ 500,000+ (complete project with implementation). Investment depends on complexity, space size, integrated technologies and execution scope. We offer personalized quote after briefing analysis.'
      },
      {
        question: 'Do you do only 3D visualizations or also execute?',
        answer: 'Both options! We can do only conceptual project and 3D visualizations, or follow complete execution including coordination with construction companies, suppliers and technical teams. We adapt our scope according to client needs.'
      },
      {
        question: 'How does technology integration work in scenography?',
        answer: 'We integrate projection mapping, smart lighting, interactive screens, sensors and spatial audio systems. We work in partnership with technical specialists to ensure technology works perfectly integrated with spatial design.'
      },
      {
        question: 'Do you work with accessibility?',
        answer: 'Yes! Accessibility is priority in all our projects. We develop inclusive solutions: tactile signage, adequate contrasts, alternative routes, integration with assistive technologies. We ensure spaces are accessible for all visitors.'
      },
      {
        question: 'What is the deadline for project development?',
        answer: 'Deadlines vary: concept and visualizations (4-8 weeks), complete executive project (8-16 weeks), execution follow-up (according to construction schedule). We always work with realistic deadlines and progressive deliveries.'
      },
      {
        question: 'Do you do signage and wayfinding?',
        answer: 'Yes! We develop complete signage and wayfinding systems that guide visitors intuitively. We create iconography, typography and layouts that communicate clearly without visual overload, ensuring easy and pleasant navigation.'
      }
    ],
    es: [
      {
        question: '¿Cuánto cuesta un proyecto de escenografía?',
        answer: 'Proyectos de escenografía varían de R$ 50.000 (concepto y visualizaciones) a R$ 500.000+ (proyecto completo con implementación). La inversión depende de complejidad, tamaño del espacio, tecnologías integradas y alcance de ejecución. Ofrecemos presupuesto personalizado tras análisis del briefing.'
      },
      {
        question: '¿Hacen solo visualizaciones 3D o también ejecutan?',
        answer: '¡Ambas opciones! Podemos hacer solo proyecto conceptual y visualizaciones 3D, o acompañar ejecución completa incluyendo coordinación con constructoras, proveedores y equipos técnicos. Adaptamos nuestro alcance conforme necesidad del cliente.'
      },
      {
        question: '¿Cómo funciona integración de tecnología en escenografía?',
        answer: 'Integramos proyecciones mapeadas, iluminación inteligente, pantallas interactivas, sensores y sistemas de audio espacial. Trabajamos en asociación con especialistas técnicos para garantizar que tecnología funcione perfectamente integrada al diseño espacial.'
      },
      {
        question: '¿Trabajan con accesibilidad?',
        answer: '¡Sí! Accesibilidad es prioridad en todos nuestros proyectos. Desarrollamos soluciones inclusivas: señalética táctil, contrastes adecuados, recorridos alternativos, integración con tecnologías asistivas. Garantizamos que espacios sean accesibles para todos los visitantes.'
      },
      {
        question: '¿Cuál el plazo para desarrollo de proyecto?',
        answer: 'Plazos varían: concepto y visualizaciones (4-8 semanas), proyecto ejecutivo completo (8-16 semanas), seguimiento de ejecución (conforme cronograma de obra). Siempre trabajamos con plazos realistas y entregas progresivas.'
      },
      {
        question: '¿Hacen señalética y orientación?',
        answer: '¡Sí! Desarrollamos sistemas completos de señalética y orientación que guían visitantes de forma intuitiva. Creamos iconografía, tipografía y layouts que comunican claramente sin sobrecargar visualmente, garantizando navegación fácil y agradable.'
      }
    ],
    fr: [
      {
        question: 'Combien coûte un projet de scénographie?',
        answer: 'Projets de scénographie varient de R$ 50.000 (concept et visualisations) à R$ 500.000+ (projet complet avec mise en œuvre). L\'investissement dépend de complexité, taille de l\'espace, technologies intégrées et portée d\'exécution. Nous offrons devis personnalisé après analyse du briefing.'
      },
      {
        question: 'Faites-vous seulement visualisations 3D ou aussi exécutez?',
        answer: 'Les deux options! Nous pouvons faire seulement projet conceptuel et visualisations 3D, ou suivre exécution complète incluant coordination avec entreprises de construction, fournisseurs et équipes techniques. Nous adaptons notre portée selon besoins du client.'
      },
      {
        question: 'Comment fonctionne intégration de technologie en scénographie?',
        answer: 'Nous intégrons projections mappées, éclairage intelligent, écrans interactifs, capteurs et systèmes audio spatiaux. Nous travaillons en partenariat avec spécialistes techniques pour garantir que technologie fonctionne parfaitement intégrée au design spatial.'
      },
      {
        question: 'Travaillez-vous avec accessibilité?',
        answer: 'Oui! Accessibilité est priorité dans tous nos projets. Nous développons solutions inclusives: signalétique tactile, contrastes adéquats, parcours alternatifs, intégration avec technologies d\'assistance. Nous garantissons que espaces soient accessibles pour tous visiteurs.'
      },
      {
        question: 'Quel est le délai pour développement de projet?',
        answer: 'Délais varient: concept et visualisations (4-8 semaines), projet exécutif complet (8-16 semaines), suivi d\'exécution (selon calendrier de chantier). Nous travaillons toujours avec délais réalistes et livraisons progressives.'
      },
      {
        question: 'Faites-vous signalétique et orientation?',
        answer: 'Oui! Nous développons systèmes complets de signalétique et orientation qui guident visiteurs intuitivement. Nous créons iconographie, typographie et layouts qui communiquent clairement sans surcharge visuelle, assurant navigation facile et agréable.'
      }
    ]
  },
  'direcao-arte-criativa': {
    pt: [
      {
        question: 'Quanto custa direção de arte?',
        answer: 'Direção de arte varia de R$ 30.000 (projeto simples) a R$ 300.000+ (projeto complexo com múltiplas entregas). Investimento depende de escopo, número de entregas, complexidade e duração do projeto. Oferecemos orçamento personalizado após análise do briefing.'
      },
      {
        question: 'Vocês desenvolvem identidade visual completa?',
        answer: 'Sim! Desenvolvemos identidades visuais completas incluindo logotipo, tipografia, paleta de cores, iconografia, guidelines e aplicações. Criamos sistemas de design coesos que funcionam em múltiplos contextos e plataformas.'
      },
      {
        question: 'Como funciona supervisão de produção?',
        answer: 'Acompanhamos todas as etapas de produção, revisando e aprovando elementos visuais, garantindo que atendam padrões de qualidade e coerência com identidade visual. Trabalhamos em parceria com equipes de produção para garantir execução perfeita.'
      },
      {
        question: 'Vocês coordenam equipes criativas?',
        answer: 'Sim! Coordenamos equipes multidisciplinares incluindo fotógrafos, videomakers, designers, ilustradores e desenvolvedores. Garantimos que todos estejam alinhados com visão criativa e que entregas sejam consistentes e de alta qualidade.'
      },
      {
        question: 'Qual o prazo para desenvolvimento de identidade visual?',
        answer: 'Prazos variam: conceito e mood board (2-4 semanas), desenvolvimento de identidade (4-8 semanas), style guide completo (2-4 semanas). Sempre trabalhamos com cronogramas realistas e entregas progressivas para garantir qualidade.'
      },
      {
        question: 'Vocês fazem art direction para vídeo e foto?',
        answer: 'Sim! Oferecemos direção de arte para produções audiovisuais e fotográficas. Desenvolvemos conceitos visuais, selecionamos locações, coordenamos styling, iluminação e composição. Garantimos que cada frame comunique a mensagem desejada com impacto visual.'
      }
    ],
    en: [
      {
        question: 'How much does art direction cost?',
        answer: 'Art direction ranges from R$ 30,000 (simple project) to R$ 300,000+ (complex project with multiple deliveries). Investment depends on scope, number of deliveries, complexity and project duration. We offer personalized quote after briefing analysis.'
      },
      {
        question: 'Do you develop complete visual identity?',
        answer: 'Yes! We develop complete visual identities including logo, typography, color palette, iconography, guidelines and applications. We create cohesive design systems that work in multiple contexts and platforms.'
      },
      {
        question: 'How does production supervision work?',
        answer: 'We follow all production stages, reviewing and approving visual elements, ensuring they meet quality standards and coherence with visual identity. We work in partnership with production teams to ensure perfect execution.'
      },
      {
        question: 'Do you coordinate creative teams?',
        answer: 'Yes! We coordinate multidisciplinary teams including photographers, videomakers, designers, illustrators and developers. We ensure everyone is aligned with creative vision and that deliveries are consistent and high quality.'
      },
      {
        question: 'What is the deadline for visual identity development?',
        answer: 'Deadlines vary: concept and mood board (2-4 weeks), identity development (4-8 weeks), complete style guide (2-4 weeks). We always work with realistic schedules and progressive deliveries to ensure quality.'
      },
      {
        question: 'Do you do art direction for video and photo?',
        answer: 'Yes! We offer art direction for audiovisual and photographic productions. We develop visual concepts, select locations, coordinate styling, lighting and composition. We ensure each frame communicates desired message with visual impact.'
      }
    ],
    es: [
      {
        question: '¿Cuánto cuesta dirección de arte?',
        answer: 'Dirección de arte varía de R$ 30.000 (proyecto simple) a R$ 300.000+ (proyecto complejo con múltiples entregas). La inversión depende de alcance, número de entregas, complejidad y duración del proyecto. Ofrecemos presupuesto personalizado tras análisis del briefing.'
      },
      {
        question: '¿Desarrollan identidad visual completa?',
        answer: '¡Sí! Desarrollamos identidades visuales completas incluyendo logotipo, tipografía, paleta de colores, iconografía, guías y aplicaciones. Creamos sistemas de diseño cohesivos que funcionan en múltiples contextos y plataformas.'
      },
      {
        question: '¿Cómo funciona supervisión de producción?',
        answer: 'Acompañamos todas las etapas de producción, revisando y aprobando elementos visuales, garantizando que cumplan estándares de calidad y coherencia con identidad visual. Trabajamos en asociación con equipos de producción para garantizar ejecución perfecta.'
      },
      {
        question: '¿Coordinan equipos creativos?',
        answer: '¡Sí! Coordinamos equipos multidisciplinares incluyendo fotógrafos, videomakers, diseñadores, ilustradores y desarrolladores. Garantizamos que todos estén alineados con visión creativa y que entregas sean consistentes y de alta calidad.'
      },
      {
        question: '¿Cuál el plazo para desarrollo de identidad visual?',
        answer: 'Plazos varían: concepto y mood board (2-4 semanas), desarrollo de identidad (4-8 semanas), guía de estilo completa (2-4 semanas). Siempre trabajamos con cronogramas realistas y entregas progresivas para garantizar calidad.'
      },
      {
        question: '¿Hacen dirección de arte para video y foto?',
        answer: '¡Sí! Ofrecemos dirección de arte para producciones audiovisuales y fotográficas. Desarrollamos conceptos visuales, seleccionamos locaciones, coordinamos styling, iluminación y composición. Garantizamos que cada frame comunique el mensaje deseado con impacto visual.'
      }
    ],
    fr: [
      {
        question: 'Combien coûte direction artistique?',
        answer: 'Direction artistique varie de R$ 30.000 (projet simple) à R$ 300.000+ (projet complexe avec multiples livraisons). L\'investissement dépend de portée, nombre de livraisons, complexité et durée du projet. Nous offrons devis personnalisé après analyse du briefing.'
      },
      {
        question: 'Développez-vous identité visuelle complète?',
        answer: 'Oui! Nous développons identités visuelles complètes incluant logo, typographie, palette de couleurs, iconographie, guides et applications. Nous créons systèmes de design cohésifs qui fonctionnent dans multiples contextes et plateformes.'
      },
      {
        question: 'Comment fonctionne supervision de production?',
        answer: 'Nous suivons toutes les étapes de production, révisant et approuvant éléments visuels, assurant qu\'ils répondent aux standards de qualité et cohérence avec identité visuelle. Nous travaillons en partenariat avec équipes de production pour assurer exécution parfaite.'
      },
      {
        question: 'Coordonnez-vous équipes créatives?',
        answer: 'Oui! Nous coordonnons équipes multidisciplinaires incluant photographes, vidéastes, designers, illustrateurs et développeurs. Nous assurons que tous soient alignés avec vision créative et que livraisons soient cohérentes et haute qualité.'
      },
      {
        question: 'Quel est le délai pour développement d\'identité visuelle?',
        answer: 'Délais varient: concept et mood board (2-4 semaines), développement d\'identité (4-8 semaines), guide de style complet (2-4 semaines). Nous travaillons toujours avec calendriers réalistes et livraisons progressives pour assurer qualité.'
      },
      {
        question: 'Faites-vous direction artistique pour vidéo et photo?',
        answer: 'Oui! Nous offrons direction artistique pour productions audiovisuelles et photographiques. Nous développons concepts visuels, sélectionnons lieux, coordonnons styling, éclairage et composition. Nous assurons que chaque frame communique message désiré avec impact visuel.'
      }
    ]
  },
  'consultoria-estrategia': {
    pt: [
      {
        question: 'Como funciona consultoria estratégica?',
        answer: 'Oferecemos consultoria completa desde concepção até execução. Analisamos viabilidade, desenvolvemos estratégias, ajudamos na captação de recursos e coordenamos implementação. Adaptamos nosso modelo de trabalho conforme necessidade de cada cliente.'
      },
      {
        question: 'Vocês ajudam com captação de recursos via editais?',
        answer: 'Sim! Temos experiência em editais nacionais (Ancine, Lei Rouanet) e internacionais. Ajudamos a identificar oportunidades, desenvolver projetos, escrever propostas e acompanhar processos de aprovação. Nossa expertise aumenta significativamente chances de aprovação.'
      },
      {
        question: 'Como funciona integração tecnológica?',
        answer: 'Desenvolvemos estratégias para adoção de IA, XR, blockchain e outras tecnologias. Analisamos necessidades, identificamos oportunidades, selecionamos ferramentas adequadas e desenvolvemos planos de implementação. Garantimos que tecnologia seja adotada de forma estratégica e eficiente.'
      },
      {
        question: 'Vocês fazem gestão de projetos?',
        answer: 'Sim! Oferecemos gestão completa de projetos culturais e tecnológicos. Coordenamos equipes, gerenciamos prazos e orçamentos, garantimos qualidade de entregas e comunicação constante com stakeholders. Nossa experiência garante que projetos sejam concluídos com sucesso.'
      },
      {
        question: 'Qual o investimento para consultoria?',
        answer: 'Consultoria varia de R$ 20.000 (projeto pontual) a R$ 200.000+ (acompanhamento completo). Investimento depende de escopo, duração e complexidade. Oferecemos modelos: por projeto, mensalidade ou sucesso (percentual sobre recursos captados).'
      },
      {
        question: 'Vocês trabalham com projetos internacionais?',
        answer: 'Sim! Trabalhamos com editais e projetos internacionais. Temos experiência em processos de diferentes países e ajudamos a adaptar projetos para contextos culturais e regulatórios específicos. Facilitamos conexões e parcerias internacionais quando necessário.'
      }
    ],
    en: [
      {
        question: 'How does strategic consulting work?',
        answer: 'We offer complete consulting from conception to execution. We analyze feasibility, develop strategies, help with resource acquisition and coordinate implementation. We adapt our working model according to each client\'s needs.'
      },
      {
        question: 'Do you help with resource acquisition through grants?',
        answer: 'Yes! We have experience with national (Ancine, Lei Rouanet) and international grants. We help identify opportunities, develop projects, write proposals and follow approval processes. Our expertise significantly increases approval chances.'
      },
      {
        question: 'How does technology integration work?',
        answer: 'We develop strategies for adoption of AI, XR, blockchain and other technologies. We analyze needs, identify opportunities, select appropriate tools and develop implementation plans. We ensure technology is adopted strategically and efficiently.'
      },
      {
        question: 'Do you do project management?',
        answer: 'Yes! We offer complete management of cultural and technological projects. We coordinate teams, manage deadlines and budgets, ensure delivery quality and constant communication with stakeholders. Our experience ensures projects are completed successfully.'
      },
      {
        question: 'What is the investment for consulting?',
        answer: 'Consulting ranges from R$ 20,000 (punctual project) to R$ 200,000+ (complete follow-up). Investment depends on scope, duration and complexity. We offer models: per project, monthly fee or success-based (percentage on acquired resources).'
      },
      {
        question: 'Do you work with international projects?',
        answer: 'Yes! We work with international grants and projects. We have experience in processes from different countries and help adapt projects to specific cultural and regulatory contexts. We facilitate connections and international partnerships when needed.'
      }
    ],
    es: [
      {
        question: '¿Cómo funciona consultoría estratégica?',
        answer: 'Ofrecemos consultoría completa desde concepción hasta ejecución. Analizamos viabilidad, desarrollamos estrategias, ayudamos en captación de recursos y coordinamos implementación. Adaptamos nuestro modelo de trabajo conforme necesidad de cada cliente.'
      },
      {
        question: '¿Ayudan con captación de recursos vía convocatorias?',
        answer: '¡Sí! Tenemos experiencia en convocatorias nacionales (Ancine, Lei Rouanet) e internacionales. Ayudamos a identificar oportunidades, desarrollar proyectos, escribir propuestas y acompañar procesos de aprobación. Nuestra expertise aumenta significativamente chances de aprobación.'
      },
      {
        question: '¿Cómo funciona integración tecnológica?',
        answer: 'Desarrollamos estrategias para adopción de IA, XR, blockchain y otras tecnologías. Analizamos necesidades, identificamos oportunidades, seleccionamos herramientas adecuadas y desarrollamos planes de implementación. Garantizamos que tecnología sea adoptada de forma estratégica y eficiente.'
      },
      {
        question: '¿Hacen gestión de proyectos?',
        answer: '¡Sí! Ofrecemos gestión completa de proyectos culturales y tecnológicos. Coordinamos equipos, gestionamos plazos y presupuestos, garantizamos calidad de entregas y comunicación constante con stakeholders. Nuestra experiencia garantiza que proyectos sean concluidos con éxito.'
      },
      {
        question: '¿Cuál la inversión para consultoría?',
        answer: 'Consultoría varía de R$ 20.000 (proyecto puntual) a R$ 200.000+ (seguimiento completo). La inversión depende de alcance, duración y complejidad. Ofrecemos modelos: por proyecto, mensualidad o éxito (porcentaje sobre recursos captados).'
      },
      {
        question: '¿Trabajan con proyectos internacionales?',
        answer: '¡Sí! Trabajamos con convocatorias y proyectos internacionales. Tenemos experiencia en procesos de diferentes países y ayudamos a adaptar proyectos para contextos culturales y regulatorios específicos. Facilitamos conexiones y partnerships internacionales cuando necesario.'
      }
    ],
    fr: [
      {
        question: 'Comment fonctionne conseil stratégique?',
        answer: 'Nous offrons conseil complet de conception à exécution. Nous analysons faisabilité, développons stratégies, aidons à acquisition de ressources et coordonnons mise en œuvre. Nous adaptons notre modèle de travail selon besoins de chaque client.'
      },
      {
        question: 'Aidez-vous avec acquisition de ressources via subventions?',
        answer: 'Oui! Nous avons expérience avec subventions nationales (Ancine, Lei Rouanet) et internationales. Nous aidons à identifier opportunités, développer projets, écrire propositions et suivre processus d\'approbation. Notre expertise augmente significativement chances d\'approbation.'
      },
      {
        question: 'Comment fonctionne intégration technologique?',
        answer: 'Nous développons stratégies pour adoption d\'IA, XR, blockchain et autres technologies. Nous analysons besoins, identifions opportunités, sélectionnons outils appropriés et développons plans d\'implémentation. Nous assurons que technologie soit adoptée stratégiquement et efficacement.'
      },
      {
        question: 'Faites-vous gestion de projets?',
        answer: 'Oui! Nous offrons gestion complète de projets culturels et technologiques. Nous coordonnons équipes, gérons délais et budgets, assurons qualité de livraisons et communication constante avec parties prenantes. Notre expérience assure que projets soient complétés avec succès.'
      },
      {
        question: 'Quel est l\'investissement pour conseil?',
        answer: 'Conseil varie de R$ 20.000 (projet ponctuel) à R$ 200.000+ (suivi complet). L\'investissement dépend de portée, durée et complexité. Nous offrons modèles: par projet, mensualité ou succès (pourcentage sur ressources acquises).'
      },
      {
        question: 'Travaillez-vous avec projets internationaux?',
        answer: 'Oui! Nous travaillons avec subventions et projets internationaux. Nous avons expérience dans processus de différents pays et aidons à adapter projets à contextes culturels et réglementaires spécifiques. Nous facilitons connexions et partenariats internationaux si nécessaire.'
      }
    ]
  }
}

// Função helper para buscar FAQs de um serviço
export function getServiceFAQs(slug: string, lang: Lang): ServiceFAQ[] {
  return serviceFAQs[slug]?.[lang] || []
}

// Função para verificar se um serviço tem FAQs
export function hasServiceFAQs(slug: string): boolean {
  return !!serviceFAQs[slug]
}
