/**
 * Hook para buscar projeto individual por slug
 */

import { useState, useEffect } from 'react';

interface ProjectData {
  slug: string;
  title: string;
  shortTitle?: string;
  summary?: string;
  description?: string; // Descrição completa/rich text
  city?: string;
  stateProvince?: string;
  country?: string;
  year?: number;
  month?: number;
  client?: string;
  partnership?: string | null;
  coproduction?: string | null;
  type?: string;
  tags: string[];
  services: Array<{ slug: string; title: string }>;
  heroImage?: {
    type?: 'IMAGE' | 'VIDEO';
    original: string;
    thumbnail?: string;
    medium?: string;
    large?: string;
    webp?: string;
    avif?: string;
    alt?: string;
  } | null;
  gallery?: Array<{
    id: string;
    type: 'IMAGE' | 'VIDEO';
    original: string;
    thumbnail?: string;
    medium?: string;
    large?: string;
    webp?: string;
    avif?: string;
    width?: number;
    height?: number;
    alt?: string;
    order: number;
    caption?: string | null;
  }>;
  market?: {
    code: string;
    label: string;
  } | null;
  cta?: {
    label?: string;
    url?: string;
  };
  // 🔍 SEO - Campos otimizados pela IA
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

interface UseProjectResult {
  project: ProjectData | null;
  loading: boolean;
  error: string | null;
}

const API_URL = import.meta.env.VITE_BACKOFFICE_URL || 'https://backoffice.azmt.com.br';

// ═══════════════════════════════════════════════════════════════
// FALLBACK: Projetos placeholder quando backoffice está vazio
// ═══════════════════════════════════════════════════════════════
function getPlaceholderProject(slug: string, lang: string = 'pt'): ProjectData | null {
  const placeholders: Record<string, (lang: string) => ProjectData> = {
    'museu-olimpico-rio': (lang) => ({
      slug: 'museu-olimpico-rio',
      title: lang === 'pt' ? 'Museu Olímpico do Rio' : lang === 'es' ? 'Museo Olímpico de Río' : lang === 'fr' ? 'Musée Olympique de Rio' : 'Rio Olympic Museum',
      shortTitle: lang === 'pt' ? 'Projeto Expográfico e Museográfico Digital' : lang === 'es' ? 'Proyecto Expográfico y Museográfico Digital' : lang === 'fr' ? 'Projet Expographique et Muséographique Numérique' : 'Digital Expographic and Museographic Project',
      summary: lang === 'pt' 
        ? 'Direção geral, direção de tecnologia e direção audiovisual. Projeto expográfico completo com recursos interativos digitais, instalações audiovisuais interativas, narrativas cinematográficas e experiência multissensorial. Gestão de curadoria de conteúdo, programação de circuitos expositivos, salas imersivas 360° e sistemas de cadastro de visitantes.'
        : lang === 'es'
        ? 'Dirección general, dirección de tecnología y dirección audiovisual. Proyecto expográfico completo con recursos interactivos digitales, instalaciones audiovisuales interactivas, narrativas cinematográficas y experiencia multisensorial. Gestión de curaduría de contenido, programación de circuitos expositivos, salas inmersivas 360° y sistemas de registro de visitantes.'
        : lang === 'fr'
        ? 'Direction générale, direction de la technologie et direction audiovisuelle. Projet expographique complet avec ressources interactives numériques, installations audiovisuelles interactives, récits cinématographiques et expérience multisensorielle. Gestion de curation de contenu, programmation de circuits expositifs, salles immersives 360° et systèmes d\'enregistrement des visiteurs.'
        : 'General direction, technology direction and audiovisual direction. Complete expographic project with digital interactive resources, interactive audiovisual installations, cinematic narratives and multisensory experience. Content curation management, exhibition circuit programming, 360° immersive rooms and visitor registration systems.',
      description: lang === 'pt'
        ? 'O Rio Museu Olímpico é um dos maiores projetos de museografia digital do Brasil. A Azimut foi responsável pela Direção Geral, Direção de Tecnologia e Direção Audiovisual, desenvolvendo um ecossistema completo de experiências imersivas e interativas.'
        : lang === 'es'
        ? 'El Museo Olímpico de Río es uno de los mayores proyectos de museografía digital de Brasil. Azimut fue responsable de la Dirección General, Dirección de Tecnología y Dirección Audiovisual, desarrollando un ecosistema completo de experiencias inmersivas e interactivas.'
        : lang === 'fr'
        ? 'Le Musée Olympique de Rio est l\'un des plus grands projets de muséographie numérique du Brésil. Azimut était responsable de la Direction Générale, Direction de la Technologie et Direction Audiovisuelle, développant un écosystème complet d\'expériences immersives et interactives.'
        : 'Rio Olympic Museum is one of the largest digital museography projects in Brazil. Azimut was responsible for General Direction, Technology Direction and Audiovisual Direction, developing a complete ecosystem of immersive and interactive experiences.',
      city: lang === 'pt' ? 'Rio de Janeiro' : lang === 'es' ? 'Río de Janeiro' : 'Rio de Janeiro',
      country: lang === 'pt' ? 'Brasil' : lang === 'es' ? 'Brasil' : lang === 'fr' ? 'Brésil' : 'Brazil',
      year: 2016,
      tags: [
        lang === 'pt' ? 'Museografia Digital' : lang === 'es' ? 'Museografía Digital' : lang === 'fr' ? 'Muséographie Numérique' : 'Digital Museography',
        lang === 'pt' ? 'Projeto Expográfico' : lang === 'es' ? 'Proyecto Expográfico' : lang === 'fr' ? 'Projet Expographique' : 'Expographic Project',
        lang === 'pt' ? 'Recursos Interativos' : lang === 'es' ? 'Recursos Interactivos' : lang === 'fr' ? 'Ressources Interactives' : 'Interactive Resources',
        lang === 'pt' ? 'Curadoria' : lang === 'es' ? 'Curaduría' : lang === 'fr' ? 'Curation' : 'Curation'
      ],
      services: [],
      heroImage: {
        type: 'VIDEO',
        original: 'https://www.youtube.com/watch?v=1Pcoi_E9SXI',
        thumbnail: 'https://img.youtube.com/vi/1Pcoi_E9SXI/maxresdefault.jpg',
        alt: lang === 'pt' ? 'Vídeo Museu Olímpico Rio' : lang === 'es' ? 'Video Museo Olímpico Río' : 'Rio Olympic Museum Video'
      },
    }),
    'exposicao-itinerante-tmnt': (lang) => ({
      slug: 'exposicao-itinerante-tmnt',
      title: lang === 'pt' ? 'TMNT - Tartarugas Ninjas - Exposição Itinerante' : lang === 'es' ? 'TMNT - Tortugas Ninja - Exposición Itinerante' : lang === 'fr' ? 'TMNT - Tortues Ninja - Exposition Itinérante' : 'TMNT - Teenage Mutant Ninja Turtles - Itinerant Exhibition',
      shortTitle: lang === 'pt' ? 'Exposição Itinerante em Cartaz' : lang === 'es' ? 'Exposición Itinerante en Cartel' : lang === 'fr' ? 'Exposition Itinérante à l\'Affiche' : 'Itinerant Exhibition on Display',
      summary: lang === 'pt'
        ? 'Projeto expográfico para exposição itinerante interativa sobre as Tartarugas Ninjas. Animação, motion design e edição de vídeo. Recursos interativos digitais com displays sensíveis ao toque, narrativas cinematográficas e experiência multissensorial. Exposição percorre diferentes cidades ampliando acesso à cultura, atualmente em cartaz em Fortaleza.'
        : lang === 'es'
        ? 'Proyecto expográfico para exposición itinerante interactiva sobre las Tortugas Ninja. Animación, motion design y edición de video. Recursos interactivos digitales con displays sensibles al tacto, narrativas cinematográficas y experiencia multisensorial. Exposición recorre diferentes ciudades ampliando acceso a la cultura, actualmente en cartel en Fortaleza.'
        : lang === 'fr'
        ? 'Projet expographique pour exposition itinérante interactive sur les Tortues Ninja. Animation, motion design et montage vidéo. Ressources interactives numériques avec écrans tactiles, récits cinématographiques et expérience multisensorielle. Exposition parcourt différentes villes élargissant l\'accès à la culture, actuellement à l\'affiche à Fortaleza.'
        : 'Expographic project for interactive itinerant exhibition about Teenage Mutant Ninja Turtles. Animation, motion design and video editing. Digital interactive resources with touch-sensitive displays, cinematic narratives and multisensory experience. Exhibition travels through different cities expanding cultural access, currently on display in Fortaleza.',
      description: lang === 'pt'
        ? 'Exposição itinerante interativa sobre as Tartarugas Ninjas com animação, motion design e edição de vídeo. Atualmente em cartaz em Fortaleza.'
        : lang === 'es'
        ? 'Exposición itinerante interactiva sobre las Tortugas Ninja con animación, motion design y edición de video. Actualmente en cartel en Fortaleza.'
        : lang === 'fr'
        ? 'Exposition itinérante interactive sur les Tortues Ninja avec animation, motion design et montage vidéo. Actuellement à l\'affiche à Fortaleza.'
        : 'Interactive itinerant exhibition about Teenage Mutant Ninja Turtles with animation, motion design and video editing. Currently on display in Fortaleza.',
      city: lang === 'pt' ? 'Fortaleza' : lang === 'es' ? 'Fortaleza' : 'Fortaleza',
      country: lang === 'pt' ? 'Brasil' : lang === 'es' ? 'Brasil' : lang === 'fr' ? 'Brésil' : 'Brazil',
      year: 2024,
      tags: [
        lang === 'pt' ? 'Exposição Itinerante' : lang === 'es' ? 'Exposición Itinerante' : lang === 'fr' ? 'Exposition Itinérante' : 'Itinerant Exhibition',
        lang === 'pt' ? 'Em Cartaz' : lang === 'es' ? 'En Cartel' : lang === 'fr' ? 'À l\'Affiche' : 'On Display',
        lang === 'pt' ? 'Animação' : lang === 'es' ? 'Animación' : lang === 'fr' ? 'Animation' : 'Animation',
        lang === 'pt' ? 'Motion Design' : lang === 'es' ? 'Motion Design' : lang === 'fr' ? 'Motion Design' : 'Motion Design'
      ],
      services: [],
      heroImage: null,
    }),
    'paisagens-vangogh': (lang) => ({
      slug: 'paisagens-vangogh',
      title: lang === 'pt' ? 'Paisagens de VanGogh - Exposição Itinerante' : lang === 'es' ? 'Paisajes de VanGogh - Exposición Itinerante' : lang === 'fr' ? 'Paysages de VanGogh - Exposition Itinérante' : 'VanGogh Landscapes - Itinerant Exhibition',
      shortTitle: lang === 'pt' ? 'Exposição Itinerante em Cartaz' : lang === 'es' ? 'Exposición Itinerante en Cartel' : lang === 'fr' ? 'Exposition Itinérante à l\'Affiche' : 'Itinerant Exhibition on Display',
      summary: lang === 'pt'
        ? 'Projeto expográfico para exposição itinerante sobre as paisagens de VanGogh. Curadoria de conteúdo, recursos interativos digitais com displays sensíveis ao toque, narrativas cinematográficas e experiência multissensorial. Exposição percorre diferentes cidades ampliando acesso à cultura.'
        : lang === 'es'
        ? 'Proyecto expográfico para exposición itinerante sobre los paisajes de VanGogh. Curaduría de contenido, recursos interactivos digitales con displays sensibles al tacto, narrativas cinematográficas y experiencia multisensorial. Exposición recorre diferentes ciudades ampliando acceso a la cultura.'
        : lang === 'fr'
        ? 'Projet expographique pour exposition itinérante sur les paysages de VanGogh. Curation de contenu, ressources interactives numériques avec écrans tactiles, récits cinématographiques et expérience multisensorielle. Exposition parcourt différentes villes élargissant l\'accès à la culture.'
        : 'Expographic project for itinerant exhibition about VanGogh landscapes. Content curation, digital interactive resources with touch-sensitive displays, cinematic narratives and multisensory experience. Exhibition travels through different cities expanding cultural access.',
      description: lang === 'pt'
        ? 'Exposição itinerante sobre as paisagens de VanGogh com recursos interativos digitais e experiência multissensorial.'
        : lang === 'es'
        ? 'Exposición itinerante sobre los paisajes de VanGogh con recursos interactivos digitales y experiencia multisensorial.'
        : lang === 'fr'
        ? 'Exposition itinérante sur les paysages de VanGogh avec ressources interactives numériques et expérience multisensorielle.'
        : 'Itinerant exhibition about VanGogh landscapes with digital interactive resources and multisensory experience.',
      city: lang === 'pt' ? 'São Paulo' : lang === 'es' ? 'São Paulo' : 'São Paulo',
      country: lang === 'pt' ? 'Brasil' : lang === 'es' ? 'Brasil' : lang === 'fr' ? 'Brésil' : 'Brazil',
      year: 2019,
      tags: [
        lang === 'pt' ? 'Exposição Itinerante' : lang === 'es' ? 'Exposición Itinerante' : lang === 'fr' ? 'Exposition Itinérante' : 'Itinerant Exhibition',
        lang === 'pt' ? 'Em Cartaz' : lang === 'es' ? 'En Cartel' : lang === 'fr' ? 'À l\'Affiche' : 'On Display',
        lang === 'pt' ? 'Projeto Expográfico' : lang === 'es' ? 'Proyecto Expográfico' : lang === 'fr' ? 'Projet Expographique' : 'Expographic Project',
        lang === 'pt' ? 'Curadoria' : lang === 'es' ? 'Curaduría' : lang === 'fr' ? 'Curation' : 'Curation'
      ],
      services: [],
      heroImage: null,
    }),
    'exposicao-itinerante-vangogh': (lang) => ({
      slug: 'exposicao-itinerante-vangogh',
      title: lang === 'pt' ? 'Paisagens de VanGogh - Exposição Itinerante' : lang === 'es' ? 'Paisajes de VanGogh - Exposición Itinerante' : lang === 'fr' ? 'Paysages de VanGogh - Exposition Itinérante' : 'VanGogh Landscapes - Itinerant Exhibition',
      shortTitle: lang === 'pt' ? 'Exposição Itinerante em Cartaz' : lang === 'es' ? 'Exposición Itinerante en Cartel' : lang === 'fr' ? 'Exposition Itinérante à l\'Affiche' : 'Itinerant Exhibition on Display',
      summary: lang === 'pt'
        ? 'Projeto expográfico para exposição itinerante sobre as paisagens de VanGogh. Curadoria de conteúdo, recursos interativos digitais com displays sensíveis ao toque, narrativas cinematográficas e experiência multissensorial. Exposição percorre diferentes cidades ampliando acesso à cultura.'
        : lang === 'es'
        ? 'Proyecto expográfico para exposición itinerante sobre los paisajes de VanGogh. Curaduría de contenido, recursos interactivos digitales con displays sensibles al tacto, narrativas cinematográficas y experiencia multisensorial. Exposición recorre diferentes ciudades ampliando acceso a la cultura.'
        : lang === 'fr'
        ? 'Projet expographique pour exposition itinérante sur les paysages de VanGogh. Curation de contenu, ressources interactives numériques avec écrans tactiles, récits cinématographiques et expérience multisensorielle. Exposition parcourt différentes villes élargissant l\'accès à la culture.'
        : 'Expographic project for itinerant exhibition about VanGogh landscapes. Content curation, digital interactive resources with touch-sensitive displays, cinematic narratives and multisensory experience. Exhibition travels through different cities expanding cultural access.',
      description: lang === 'pt'
        ? 'Exposição itinerante sobre as paisagens de VanGogh com recursos interativos digitais e experiência multissensorial.'
        : lang === 'es'
        ? 'Exposición itinerante sobre los paisajes de VanGogh con recursos interactivos digitales y experiencia multisensorial.'
        : lang === 'fr'
        ? 'Exposition itinérante sur les paysages de VanGogh avec ressources interactives numériques et expérience multisensorielle.'
        : 'Itinerant exhibition about VanGogh landscapes with digital interactive resources and multisensory experience.',
      city: lang === 'pt' ? 'São Paulo' : lang === 'es' ? 'São Paulo' : 'São Paulo',
      country: lang === 'pt' ? 'Brasil' : lang === 'es' ? 'Brasil' : lang === 'fr' ? 'Brésil' : 'Brazil',
      year: 2019,
      tags: [
        lang === 'pt' ? 'Exposição Itinerante' : lang === 'es' ? 'Exposición Itinerante' : lang === 'fr' ? 'Exposition Itinérante' : 'Itinerant Exhibition',
        lang === 'pt' ? 'Em Cartaz' : lang === 'es' ? 'En Cartel' : lang === 'fr' ? 'À l\'Affiche' : 'On Display',
        lang === 'pt' ? 'Projeto Expográfico' : lang === 'es' ? 'Proyecto Expográfico' : lang === 'fr' ? 'Projet Expographique' : 'Expographic Project',
        lang === 'pt' ? 'Curadoria' : lang === 'es' ? 'Curaduría' : lang === 'fr' ? 'Curation' : 'Curation'
      ],
      services: [],
      heroImage: null,
    }),
    'curadoria-festival-gramado-vr': (lang) => ({
      slug: 'curadoria-festival-gramado-vr',
      title: lang === 'pt' ? 'Curadoria Festival de Cinema de Gramado - Mostra VR' : lang === 'es' ? 'Curaduría Festival de Cine de Gramado - Muestra VR' : lang === 'fr' ? 'Curation Festival de Cinéma de Gramado - Sélection VR' : 'Gramado Film Festival Curation - VR Showcase',
      shortTitle: lang === 'pt' ? 'Curadoria de Conteúdo VR' : lang === 'es' ? 'Curaduría de Contenido VR' : lang === 'fr' ? 'Curation de Contenu VR' : 'VR Content Curation',
      summary: lang === 'pt'
        ? 'Curadoria e programação de mostra de filmes em realidade virtual para Festival de Cinema de Gramado desde 2017. Seleção de filmes por curadoria do festival para competição nacional, definição de públicos-alvo e visão conceitual. Exibições e ativações imersivas com aluguel de equipamentos e equipe especializada. Único estúdio no Brasil que combina produção técnica premium com expertise em curadoria cinematográfica.'
        : lang === 'es'
        ? 'Curaduría y programación de muestra de películas en realidad virtual para Festival de Cine de Gramado desde 2017. Selección de películas por curaduría del festival para competencia nacional, definición de públicos objetivo y visión conceptual. Exhibiciones y activaciones inmersivas con alquiler de equipos y equipo especializado. Único estudio en Brasil que combina producción técnica premium con experiencia en curaduría cinematográfica.'
        : lang === 'fr'
        ? 'Curation et programmation de sélection de films en réalité virtuelle pour Festival de Cinéma de Gramado depuis 2017. Sélection de films par curation du festival pour compétition nationale, définition de publics cibles et vision conceptuelle. Projections et activations immersives avec location d\'équipements et équipe spécialisée. Le seul studio au Brésil qui combine production technique premium avec expertise en curation cinématographique.'
        : 'Curation and programming of virtual reality film showcase for Gramado Film Festival since 2017. Film selection by festival curation for national competition, target audience definition and conceptual vision. Immersive screenings and activations with equipment rental and specialized team. The only studio in Brazil that combines premium technical production with expertise in film curation.',
      description: lang === 'pt'
        ? 'Curadoria e programação de mostra de filmes em realidade virtual para Festival de Cinema de Gramado desde 2017. Único estúdio no Brasil que combina produção técnica premium com expertise em curadoria cinematográfica.'
        : lang === 'es'
        ? 'Curaduría y programación de muestra de películas en realidad virtual para Festival de Cine de Gramado desde 2017. Único estudio en Brasil que combina producción técnica premium con experiencia en curaduría cinematográfica.'
        : lang === 'fr'
        ? 'Curation et programmation de sélection de films en réalité virtuelle pour Festival de Cinéma de Gramado depuis 2017. Le seul studio au Brésil qui combine production technique premium avec expertise en curation cinématographique.'
        : 'Curation and programming of virtual reality film showcase for Gramado Film Festival since 2017. The only studio in Brazil that combines premium technical production with expertise in film curation.',
      city: lang === 'pt' ? 'Gramado' : 'Gramado',
      country: lang === 'pt' ? 'Brasil' : lang === 'es' ? 'Brasil' : lang === 'fr' ? 'Brésil' : 'Brazil',
      year: 2024,
      tags: [
        lang === 'pt' ? 'Curadoria' : lang === 'es' ? 'Curaduría' : lang === 'fr' ? 'Curation' : 'Curation',
        lang === 'pt' ? 'Festival' : lang === 'es' ? 'Festival' : lang === 'fr' ? 'Festival' : 'Festival',
        lang === 'pt' ? 'Realidade Virtual' : lang === 'es' ? 'Realidad Virtual' : lang === 'fr' ? 'Réalité Virtuelle' : 'Virtual Reality',
        lang === 'pt' ? 'Programação' : lang === 'es' ? 'Programación' : lang === 'fr' ? 'Programmation' : 'Programming'
      ],
      services: [],
      heroImage: null,
    }),
    'filme-vr-360-zen': (lang) => ({
      slug: 'filme-vr-360-zen',
      title: lang === 'pt' ? 'VR ZEN - Filme em Realidade Virtual 360°' : lang === 'es' ? 'VR ZEN - Película en Realidad Virtual 360°' : lang === 'fr' ? 'VR ZEN - Film en Réalité Virtuelle 360°' : 'VR ZEN - 360° Virtual Reality Film',
      shortTitle: lang === 'pt' ? 'Documentário 360° Autoral' : lang === 'es' ? 'Documental 360° Autoral' : lang === 'fr' ? 'Documentaire 360° Auteur' : 'Authorial 360° Documentary',
      summary: lang === 'pt'
        ? 'Coprodução de filme autoral em realidade virtual 360° com Caixote Virtual. Narrativa transmidiática interativa com artes digitais imersivas que inserem o espectador em experiência multissensorial. Documentário 360° com obras que exploram narrativas cinematográficas em realidade virtual, criando imersão completa através de narrativa cinematográfica.'
        : lang === 'es'
        ? 'Coproducción de película autoral en realidad virtual 360° con Caixote Virtual. Narrativa transmediática interactiva con artes digitales inmersivas que insertan al espectador en experiencia multisensorial. Documental 360° con obras que exploran narrativas cinematográficas en realidad virtual, creando inmersión completa a través de narrativa cinematográfica.'
        : lang === 'fr'
        ? 'Coproduction de film auteur en réalité virtuelle 360° avec Caixote Virtual. Récit transmédiatique interactif avec arts numériques immersifs qui insèrent le spectateur dans une expérience multisensorielle. Documentaire 360° avec œuvres explorant récits cinématographiques en réalité virtuelle, créant immersion complète grâce à narration cinématographique.'
        : 'Co-production of authorial film in 360° virtual reality with Caixote Virtual. Interactive transmedia narrative with immersive digital arts that insert the viewer into a multisensory experience. 360° documentary with works exploring cinematic narratives in virtual reality, creating complete immersion through cinematic storytelling.',
      description: lang === 'pt'
        ? 'Coprodução de filme autoral em realidade virtual 360° com Caixote Virtual. Narrativa transmidiática interativa com artes digitais imersivas.'
        : lang === 'es'
        ? 'Coproducción de película autoral en realidad virtual 360° con Caixote Virtual. Narrativa transmediática interactiva con artes digitales inmersivas.'
        : lang === 'fr'
        ? 'Coproduction de film auteur en réalité virtuelle 360° avec Caixote Virtual. Récit transmédiatique interactif avec arts numériques immersifs.'
        : 'Co-production of authorial film in 360° virtual reality with Caixote Virtual. Interactive transmedia narrative with immersive digital arts.',
      city: null,
      country: lang === 'pt' ? 'Brasil' : lang === 'es' ? 'Brasil' : lang === 'fr' ? 'Brésil' : 'Brazil',
      year: 2023,
      tags: [
        lang === 'pt' ? 'Realidade Virtual' : lang === 'es' ? 'Realidad Virtual' : lang === 'fr' ? 'Réalité Virtuelle' : 'Virtual Reality',
        lang === 'pt' ? '360°' : '360°',
        lang === 'pt' ? 'Documentário' : lang === 'es' ? 'Documental' : lang === 'fr' ? 'Documentaire' : 'Documentary',
        lang === 'pt' ? 'Coprodução' : lang === 'es' ? 'Coproducción' : lang === 'fr' ? 'Coproduction' : 'Co-production'
      ],
      services: [],
      heroImage: null,
    }),
    'curso-producao-cinematicvr-ufrj': (lang) => ({
      slug: 'curso-producao-cinematicvr-ufrj',
      title: lang === 'pt' ? 'Produção CinematicVR - UFRJ' : lang === 'es' ? 'Producción CinematicVR - UFRJ' : lang === 'fr' ? 'Production CinematicVR - UFRJ' : 'CinematicVR Production - UFRJ',
      shortTitle: lang === 'pt' ? 'Formação Profissional em VR' : lang === 'es' ? 'Formación Profesional en VR' : lang === 'fr' ? 'Formation Professionnelle en VR' : 'Professional VR Training',
      summary: lang === 'pt'
        ? 'Curso de Produção CinematicVR na UFRJ abordando técnicas de produção de conteúdo em realidade virtual e 360 graus. Formação profissional em narrativas cinematográficas imersivas, captação 360°, pós-produção e finalização de projetos VR. Workshops especializados com foco em experiência multissensorial e artes digitais imersivas.'
        : lang === 'es'
        ? 'Curso de Producción CinematicVR en UFRJ abordando técnicas de producción de contenido en realidad virtual y 360 grados. Formación profesional en narrativas cinematográficas inmersivas, captura 360°, posproducción y finalización de proyectos VR. Talleres especializados con enfoque en experiencia multisensorial y artes digitales inmersivas.'
        : lang === 'fr'
        ? 'Cours de Production CinematicVR à UFRJ abordant techniques de production de contenu en réalité virtuelle et 360 degrés. Formation professionnelle en récits cinématographiques immersifs, capture 360°, post-production et finalisation de projets VR. Ateliers spécialisés axés sur expérience multisensorielle et arts numériques immersifs.'
        : 'CinematicVR Production course at UFRJ covering techniques for producing content in virtual reality and 360 degrees. Professional training in immersive cinematic narratives, 360° capture, post-production and VR project finishing. Specialized workshops focused on multisensory experience and immersive digital arts.',
      description: lang === 'pt'
        ? 'Curso de Produção CinematicVR na UFRJ abordando técnicas de produção de conteúdo em realidade virtual e 360 graus.'
        : lang === 'es'
        ? 'Curso de Producción CinematicVR en UFRJ abordando técnicas de producción de contenido en realidad virtual y 360 grados.'
        : lang === 'fr'
        ? 'Cours de Production CinematicVR à UFRJ abordant techniques de production de contenu en réalité virtuelle et 360 degrés.'
        : 'CinematicVR Production course at UFRJ covering techniques for producing content in virtual reality and 360 degrees.',
      city: lang === 'pt' ? 'Rio de Janeiro' : lang === 'es' ? 'Río de Janeiro' : 'Rio de Janeiro',
      country: lang === 'pt' ? 'Brasil' : lang === 'es' ? 'Brasil' : lang === 'fr' ? 'Brésil' : 'Brazil',
      year: 2020,
      tags: [
        lang === 'pt' ? 'Educação' : lang === 'es' ? 'Educación' : lang === 'fr' ? 'Éducation' : 'Education',
        lang === 'pt' ? 'Formação Profissional' : lang === 'es' ? 'Formación Profesional' : lang === 'fr' ? 'Formation Professionnelle' : 'Professional Training',
        lang === 'pt' ? 'Realidade Virtual' : lang === 'es' ? 'Realidad Virtual' : lang === 'fr' ? 'Réalité Virtuelle' : 'Virtual Reality',
        lang === 'pt' ? 'Workshop' : lang === 'es' ? 'Taller' : lang === 'fr' ? 'Atelier' : 'Workshop'
      ],
      services: [],
      heroImage: null,
    }),
  };

  const placeholder = placeholders[slug];
  return placeholder ? placeholder(lang) : null;
}

export function useProject(slug: string, lang: string = 'pt'): UseProjectResult {
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${API_URL}/api/public/project/${slug}?lang=${lang}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          if (response.status === 404) {
            // ═══════════════════════════════════════════════════════════════
            // FALLBACK: Se projeto não encontrado, usar placeholder
            // ═══════════════════════════════════════════════════════════════
            const placeholderProject = getPlaceholderProject(slug, lang);
            if (placeholderProject) {
              if (!cancelled) {
                setProject(placeholderProject);
                setError(null); // Não é erro, é placeholder
              }
              return;
            }
            throw new Error('Project not found');
          }
          throw new Error(`Failed to fetch project: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (!cancelled) {
          setProject(data);
        }
      } catch (err) {
        if (!cancelled) {
          // Tentar fallback antes de mostrar erro
          const placeholderProject = getPlaceholderProject(slug, lang);
          if (placeholderProject) {
            setProject(placeholderProject);
            setError(null);
          } else {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch project';
            setError(errorMessage);
            console.warn('Failed to fetch project:', errorMessage);
          }
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchProject();

    return () => {
      cancelled = true;
    };
  }, [slug, lang]);

  return { project, loading, error };
}

