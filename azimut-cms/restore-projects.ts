import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function restoreProjects() {
  try {
    console.log('🔄 Restaurando projetos do código...\n');

    const projects = [
      {
        slug: 'museu-olimpico-rio',
        title: 'Rio Olympic Museum',
        summaryPt: 'Direção geral, direção de tecnologia e direção audiovisual. Projeto expográfico completo com recursos interativos digitais.',
        summaryEn: 'General direction, technology direction and audiovisual direction. Complete expographic project with digital interactive resources.',
        summaryEs: 'Dirección general, dirección de tecnología y dirección audiovisual. Proyecto expográfico completo con recursos interactivos digitales.',
        summaryFr: 'Direction générale, direction de la technologie et direction audiovisuelle. Projet expographique complet avec ressources interactives numériques.',
        city: 'Rio de Janeiro',
        country: 'Brazil',
        year: 2016,
        type: 'MUSEUM',
        projectCategory: ['museum', 'exhibition'],
        technologies: ['Interactive', '360'],
        videoShowreel: 'https://www.youtube.com/watch?v=1Pcoi_E9SXI',
        hasDetailPage: true,
        status: 'PUBLISHED',
      },
      {
        slug: 'exposicao-itinerante-tmnt',
        title: 'TMNT - Ninja Turtles - Itinerant Exhibition',
        summaryPt: 'Projeto expográfico para exposição itinerante interativa sobre as Tartarugas Ninjas.',
        summaryEn: 'Expographic project for interactive itinerant exhibition about Ninja Turtles.',
        summaryEs: 'Proyecto expográfico para exposición itinerante interactiva sobre Tortugas Ninja.',
        summaryFr: 'Projet expographique pour exposition itinérante interactive sur les Tortues Ninja.',
        city: 'Fortaleza',
        country: 'Brazil',
        year: 2024,
        type: 'EXHIBITION',
        projectCategory: ['museum', 'exhibition', 'animation'],
        technologies: ['Interactive', 'Animation'],
        hasDetailPage: true,
        status: 'PUBLISHED',
      },
      {
        slug: 'curadoria-festival-gramado-vr',
        title: 'Gramado Film Festival - VR Showcase',
        summaryPt: 'Curadoria e programação de mostra de filmes em realidade virtual para Festival de Cinema de Gramado desde 2017.',
        summaryEn: 'Curation and programming of virtual reality film showcase for Gramado Film Festival since 2017.',
        summaryEs: 'Curaduría y programación de muestra de películas en realidad virtual para Festival de Cine de Gramado desde 2017.',
        summaryFr: 'Curation et programmation de projection de films en réalité virtuelle pour le Festival de Cinéma de Gramado depuis 2017.',
        city: 'Gramado',
        country: 'Brazil',
        year: 2024,
        type: 'FESTIVAL',
        projectCategory: ['curadoria', 'festival', 'vr-360'],
        technologies: ['VR', '360'],
        hasDetailPage: true,
        status: 'PUBLISHED',
      },
      {
        slug: 'filme-vr-360-zen',
        title: 'VR ZEN - 360° Virtual Reality Film',
        summaryPt: 'Coprodução de filme autoral em realidade virtual 360° com Caixote Virtual.',
        summaryEn: 'Co-production of authorial 360° virtual reality film. Interactive transmedia narrative with immersive digital arts.',
        summaryEs: 'Coproducción de película autoral en realidad virtual 360°.',
        summaryFr: 'Coproduction de film autoral en réalité virtuelle 360°.',
        city: null,
        country: 'Brazil',
        year: 2023,
        type: 'VR_FILM',
        projectCategory: ['vr-360', 'vr', 'cinema', 'video'],
        technologies: ['VR', '360'],
        hasDetailPage: true,
        status: 'PUBLISHED',
      },
      {
        slug: 'curso-producao-cinematicvr-ufrj',
        title: 'CinematicVR Production - UFRJ',
        summaryPt: 'Curso de extensão universitária em Produção CinematicVR na UFRJ.',
        summaryEn: 'University extension course in CinematicVR Production at UFRJ. Audiovisual and pedagogical direction.',
        summaryEs: 'Curso de extensión universitaria en Producción CinematicVR en la UFRJ.',
        summaryFr: 'Cours d\'extension universitaire en Production CinematicVR à l\'UFRJ.',
        city: 'Rio de Janeiro',
        country: 'Brazil',
        year: 2023,
        type: 'EDUCATION',
        projectCategory: ['education', 'vr-360'],
        technologies: ['VR', 'Interactive'],
        hasDetailPage: true,
        status: 'PUBLISHED',
      },
      {
        slug: 'animacao-3d-personagens',
        title: '3D Animation & Characters',
        summaryPt: 'Criação de personagens 3D, animações e motion design para projetos expográficos, corporativos e educacionais.',
        summaryEn: '3D character creation, animations and motion design for exhibitions, corporate and educational projects.',
        summaryEs: 'Creación de personajes 3D, animaciones y motion design para proyectos expográficos, corporativos y educativos.',
        summaryFr: 'Création de personnages 3D, animations et motion design pour projets expographiques, corporatifs et éducatifs.',
        city: 'São Paulo',
        country: 'Brazil',
        year: 2024,
        type: 'ANIMATION',
        projectCategory: ['design', 'animation', 'vfx'],
        technologies: ['3D', 'Animation', 'Motion Graphics'],
        hasDetailPage: true,
        status: 'PUBLISHED',
      },
      {
        slug: 'maquete-virtual-arquitetura',
        title: 'Virtual Model & 3D Renders',
        summaryPt: 'Maquetes virtuais interativas e renders 3D de alta qualidade para projetos arquitetônicos, expográficos e culturais.',
        summaryEn: 'Interactive virtual models and high-quality 3D renders for architectural, exhibition and cultural projects.',
        summaryEs: 'Maquetas virtuales interactivas y renders 3D de alta calidad para proyectos arquitectónicos, expográficos y culturales.',
        summaryFr: 'Maquettes virtuelles interactives et rendus 3D de haute qualité pour projets architecturaux, expographiques et culturels.',
        city: 'Rio de Janeiro',
        country: 'Brazil',
        year: 2024,
        type: 'ARCHITECTURE',
        projectCategory: ['design', 'vfx'],
        technologies: ['3D', 'Interactive'],
        hasDetailPage: true,
        status: 'PUBLISHED',
      },
      {
        slug: 'natal-rio-bonito-2025',
        title: 'Natal de Rio Bonito 2025',
        summaryPt: 'Instalação animada com auxílio de IA para praça central de Rio Bonito.',
        summaryEn: 'AI-assisted animated installation for Rio Bonito central square.',
        summaryEs: 'Instalación animada asistida por IA para plaza central de Rio Bonito.',
        summaryFr: 'Installation animée assistée par IA pour place centrale de Rio Bonito.',
        city: 'Rio Bonito',
        country: 'Brazil',
        year: 2025,
        type: 'FESTIVAL',
        projectCategory: ['festival', 'city', 'ai'],
        technologies: ['AI', 'Animation'],
        hasDetailPage: true,
        status: 'PUBLISHED',
      },
    ];

    for (const project of projects) {
      await prisma.project.upsert({
        where: { slug: project.slug },
        update: project,
        create: project
      });
      console.log(`✅ ${project.slug}`);
    }

    const count = await prisma.project.count();
    console.log(`\n🎉 ${count} projetos restaurados com sucesso!`);

  } catch (error: any) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

restoreProjects();
