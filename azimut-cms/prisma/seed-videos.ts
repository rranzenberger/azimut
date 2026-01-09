// ════════════════════════════════════════════════════════════
// SEED: ACADEMY VIDEOS
// ════════════════════════════════════════════════════════════
// Popula banco com vídeos iniciais VFS/VanArts
// Run: npx tsx prisma/seed-videos.ts
// ════════════════════════════════════════════════════════════

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const initialVideos = [
  // VanArts - Institucional
  {
    videoUrl: 'https://www.youtube.com/watch?v=Vm1s2cwHI-M',
    thumbnailUrl: 'https://img.youtube.com/vi/Vm1s2cwHI-M/maxresdefault.jpg',
    type: 'YOUTUBE',
    titlePt: 'VanArts: Your Creative Future',
    titleEn: 'VanArts: Your Creative Future',
    titleEs: 'VanArts: Tu Futuro Creativo',
    titleFr: 'VanArts: Votre Avenir Créatif',
    descriptionPt: 'Explore o vibrante campus e programas da VanArts em Vancouver.',
    descriptionEn: 'Explore the vibrant campus and programs at VanArts in Vancouver.',
    descriptionEs: 'Explora el vibrante campus y programas de VanArts en Vancouver.',
    descriptionFr: 'Explorez le campus dynamique et les programmes de VanArts à Vancouver.',
    category: 'INSTITUTIONAL',
    section: 'VANCOUVER',
    school: 'VanArts',
    duration: 180, // 3 minutes
    featured: true,
    priority: 100,
    status: 'PUBLISHED'
  },
  
  // VanArts - Depoimentos Brasileiros
  {
    videoUrl: 'https://www.youtube.com/watch?v=y3uhoRpQPYY',
    thumbnailUrl: 'https://img.youtube.com/vi/y3uhoRpQPYY/maxresdefault.jpg',
    type: 'YOUTUBE',
    titlePt: 'Depoimentos de Brasileiros na VanArts',
    titleEn: 'Brazilian Students Testimonials at VanArts',
    titleEs: 'Testimonios de Brasileños en VanArts',
    titleFr: 'Témoignages de Brésiliens à VanArts',
    descriptionPt: 'Estudantes brasileiros compartilham suas experiências em Vancouver.',
    descriptionEn: 'Brazilian students share their experiences in Vancouver.',
    descriptionEs: 'Estudiantes brasileños comparten sus experiencias en Vancouver.',
    descriptionFr: 'Des étudiants brésiliens partagent leurs expériences à Vancouver.',
    category: 'TESTIMONIAL',
    section: 'VANCOUVER',
    school: 'VanArts',
    duration: 420, // 7 minutes
    featured: true,
    priority: 90,
    status: 'PUBLISHED'
  },

  // Placeholders para outros vídeos
  {
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Placeholder
    thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    type: 'YOUTUBE',
    titlePt: 'VFS: About Vancouver Film School',
    titleEn: 'VFS: About Vancouver Film School',
    titleEs: 'VFS: Acerca de Vancouver Film School',
    titleFr: 'VFS: À propos de Vancouver Film School',
    descriptionPt: 'Descubra a VFS e o que a torna líder global em educação em entretenimento.',
    descriptionEn: 'Discover VFS and what makes it a global leader in entertainment arts education.',
    descriptionEs: 'Descubre VFS y lo que la convierte en líder global en educación en entretenimiento.',
    descriptionFr: 'Découvrez VFS et ce qui en fait un leader mondial de l\'éducation aux arts du divertissement.',
    category: 'INSTITUTIONAL',
    section: 'VANCOUVER',
    school: 'VFS',
    duration: 240,
    featured: true,
    priority: 80,
    status: 'DRAFT' // Marcar como DRAFT até conseguir URL real
  },

  {
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Placeholder
    thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    type: 'YOUTUBE',
    titlePt: 'VanArts Student Showreel 2024',
    titleEn: 'VanArts Student Showreel 2024',
    titleEs: 'VanArts Showreel de Estudiantes 2024',
    titleFr: 'VanArts Showreel Étudiants 2024',
    descriptionPt: 'Compilação dos melhores trabalhos dos alunos da VanArts em 2024.',
    descriptionEn: 'A compilation of the best student work from VanArts in 2024.',
    descriptionEs: 'Una compilación de los mejores trabajos de estudiantes de VanArts en 2024.',
    descriptionFr: 'Une compilation des meilleurs travaux d\'étudiants de VanArts en 2024.',
    category: 'STUDENT_WORK',
    section: 'VANCOUVER',
    school: 'VanArts',
    duration: 300,
    featured: false,
    priority: 70,
    status: 'DRAFT' // Marcar como DRAFT até conseguir URL real
  },

  // Placeholder Azimut (Cursos)
  {
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Placeholder
    thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    type: 'YOUTUBE',
    titlePt: 'Curso VR & Cinema 360° - Azimut Academy',
    titleEn: 'VR & 360° Cinema Course - Azimut Academy',
    titleEs: 'Curso VR y Cine 360° - Azimut Academy',
    titleFr: 'Cours VR et Cinéma 360° - Azimut Academy',
    descriptionPt: 'Conheça nosso curso de produção em realidade virtual.',
    descriptionEn: 'Discover our virtual reality production course.',
    descriptionEs: 'Descubre nuestro curso de producción en realidad virtual.',
    descriptionFr: 'Découvrez notre cours de production en réalité virtuelle.',
    category: 'PROMO',
    section: 'COURSES',
    school: 'Azimut',
    duration: 120,
    featured: true,
    priority: 60,
    status: 'DRAFT'
  }
]

async function main() {
  console.log('🌱 Seeding Academy Videos...')

  for (const video of initialVideos) {
    const created = await prisma.academyVideo.create({
      data: video
    })
    console.log(`✅ Created video: ${created.titleEn} (${created.school})`)
  }

  console.log('✅ Seed completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
