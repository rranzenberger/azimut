export type Lang = 'en' | 'fr' | 'pt' | 'es'

type Dict = {
  [K in Lang]: Record<string, string>
}

export const translations: Dict = {
  en: {
    // Hero Home
    heroTitle: 'EXPERIENCES THAT CONNECT WORLDS',
    heroSubtitle: 'We create immersive experiences between Brazil and Canada.',
    
    // Navigation
    navHome: 'Home',
    navWhat: 'Solutions',
    navWork: 'Work',
    navStudio: 'Studio',
    navAcademy: 'Academy',
    navPress: 'Press',
    heroLead:
      'Immersive, interactive and cinematic experiences for culture, brands and hybrid spaces – operating between Brazil and Canada.',
    pill1: 'Museums & exhibitions',
    pill2: 'Brand & seasonal activations',
    pill3: 'Hybrid AV & AI',
    cardTitle: 'Studio snapshot',
    cardBody:
      'We combine cinema, interactive design, spatial storytelling and AI-driven pipelines to build narrative installations, hybrid environments and time-based experiences for museums, festivals, brands and research labs.',
    tag1: 'Immersive spaces',
    tag2: 'Exhibitions & culture',
    tag3: 'Hybrid AV & AI',
    cities: 'Rio • São Paulo • Belém • Florianópolis • Vancouver',
    contactTitle: 'Tell us what you need and where your project lives.',
    contactNote:
      'For now, contact is via e-mail or WhatsApp. Soon this will open a full brief form connected to our backoffice.',
    ctaLabel: 'Start a project',
    footer: '© {year} Azimut Projetos Audiovisuais Ltda. · Brazil ↔ Canada.',
  },
  fr: {
    // Hero Home
    heroTitle: 'EXPÉRIENCES QUI CONNECTENT LES MONDES',
    heroSubtitle: 'Nous créons des expériences immersives entre le Brésil et le Canada.',
    
    // Navigation
    navHome: 'Accueil',
    navWhat: 'Services',
    navWork: 'Projets',
    navStudio: 'Studio',
    navAcademy: 'Academy',
    navPress: 'Presse',
    heroLead:
      'Expériences immersives, interactives et cinématographiques pour la culture, les marques et les espaces hybrides – entre le Brésil et le Canada.',
    pill1: 'Musées & expositions',
    pill2: 'Activations de marque & saisonnières',
    pill3: 'Audiovisuel hybride & IA',
    cardTitle: 'Aperçu du studio',
    cardBody:
      'Nous combinons cinéma, design interactif, narration spatiale et pipelines pilotés par l’IA pour créer des installations narratives, des environnements hybrides et des expériences temporelles pour musées, festivals, marques et laboratoires de recherche.',
    tag1: 'Espaces immersifs',
    tag2: 'Expositions & culture',
    tag3: 'Audiovisuel hybride & IA',
    cities: 'Rio • São Paulo • Belém • Florianópolis • Vancouver',
    contactTitle: 'Dites-nous ce dont vous avez besoin et où vit votre projet.',
    contactNote:
      'Pour l’instant, le contact se fait par e-mail ou WhatsApp. Bientôt, ceci ouvrira un formulaire complet relié à notre backoffice.',
    ctaLabel: 'Commencer un projet',
    footer: '© {year} Azimut Projetos Audiovisuais Ltda. · Brésil ↔ Canada.',
  },
  pt: {
    // Hero Home
    heroTitle: 'EXPERIÊNCIAS QUE CONECTAM MUNDOS',
    heroSubtitle: 'Criamos experiências imersivas entre Brasil e Canadá.',
    
    navHome: 'Início',
    navWhat: 'Soluções',
    navWork: 'Projetos',
    navStudio: 'Estúdio',
    navAcademy: 'Academy',
    navPress: 'Imprensa',
    heroLead:
      'Experiências imersivas, interativas e cinematográficas para cultura, marcas e espaços híbridos – atuando entre Brasil e Canadá.',
    pill1: 'Museus & exposições',
    pill2: 'Ativações de marca & sazonais',
    pill3: 'Audiovisual híbrido & IA',
    cardTitle: 'Retrato do estúdio',
    cardBody:
      'Combinamos cinema, design interativo, storytelling espacial e pipelines com IA para criar instalações narrativas, ambientes híbridos e experiências temporais para museus, festivais, marcas e laboratórios de pesquisa.',
    tag1: 'Espaços imersivos',
    tag2: 'Exposições & cultura',
    tag3: 'Audiovisual híbrido & IA',
    cities: 'Rio • São Paulo • Belém • Florianópolis • Vancouver',
    contactTitle: 'Conte o que você precisa e onde vive o seu projeto.',
    contactNote:
      'Por enquanto, o contato é por e-mail ou WhatsApp. Em breve aqui será um formulário completo conectado ao nosso backoffice.',
    ctaLabel: 'Iniciar um projeto',
    footer: '© {year} Azimut Projetos Audiovisuais Ltda. · Brasil ↔ Canadá.',
  },
  es: {
    // Hero Home
    heroTitle: 'EXPERIENCIAS QUE CONECTAN MUNDOS',
    heroSubtitle: 'Creamos experiencias inmersivas entre Brasil y Canadá.',
    
    // Navigation
    navHome: 'Inicio',
    navWhat: 'Servicios',
    navWork: 'Proyectos',
    navStudio: 'Estudio',
    navAcademy: 'Academy',
    navPress: 'Prensa',
    heroLead:
      'Experiencias inmersivas, interactivas y cinematográficas para cultura, marcas y espacios híbridos – operando entre Brasil y Canadá.',
    pill1: 'Museos & exposiciones',
    pill2: 'Activaciones de marca & estacionales',
    pill3: 'Audiovisual híbrido & IA',
    cardTitle: 'Vista del estudio',
    cardBody:
      'Combinamos cine, diseño interactivo, narrativa espacial y flujos impulsados por IA para crear instalaciones narrativas, entornos híbridos y experiencias temporales para museos, festivales, marcas y laboratorios de investigación.',
    tag1: 'Espacios inmersivos',
    tag2: 'Exposiciones & cultura',
    tag3: 'Audiovisual híbrido & IA',
    cities: 'Río • São Paulo • Belém • Florianópolis • Vancouver',
    contactTitle: 'Cuéntanos qué necesitas y dónde vive tu proyecto.',
    contactNote:
      'Por ahora, el contacto es por correo electrónico o WhatsApp. Pronto aquí habrá un formulario completo conectado a nuestro backoffice.',
    ctaLabel: 'Iniciar un proyecto',
    footer: '© {year} Azimut Projetos Audiovisuais Ltda. · Brasil ↔ Canadá.',
  },
}

export function t(lang: Lang, key: string): string {
  const dict = translations[lang]
  return dict?.[key] ?? translations.en[key] ?? key
}