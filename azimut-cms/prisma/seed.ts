/**
 * Seed do banco de dados
 * Dados iniciais para o CMS Azimut
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');
  
  // 1. Criar usuário admin
  console.log('Creating admin user...');
  const hashedPassword = await bcrypt.hash('Azimut2025!', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@azimut.com.br' },
    update: {},
    create: {
      email: 'admin@azimut.com.br',
      name: 'Admin Azimut',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
  });
  console.log('✅ Admin created:', admin.email);
  
  // 2. Criar mercados
  console.log('\nCreating markets...');
  const marketBR = await prisma.market.upsert({
    where: { code: 'BR' },
    update: {},
    create: {
      code: 'BR',
      labelPt: 'Brasil',
      labelEn: 'Brazil',
      heroMessagePt: 'Experiências imersivas, interativas e cinematográficas para cultura, marcas e espaços híbridos no Brasil.',
      heroMessageEn: 'Immersive, interactive and cinematic experiences for culture, brands and hybrid spaces in Brazil.',
      priority: 1,
    },
  });
  
  const marketCA = await prisma.market.upsert({
    where: { code: 'CA' },
    update: {},
    create: {
      code: 'CA',
      labelPt: 'Canadá',
      labelEn: 'Canada',
      heroMessagePt: 'Pesquisa, VR/XR e IA para museus, marcas e instituições no Canadá.',
      heroMessageEn: 'Research, VR/XR and AI for museums, brands and institutions in Canada.',
      priority: 2,
    },
  });
  
  const marketDefault = await prisma.market.upsert({
    where: { code: 'DEFAULT' },
    update: {},
    create: {
      code: 'DEFAULT',
      labelPt: 'Internacional',
      labelEn: 'International',
      heroMessagePt: 'Estúdio criativo-tecnológico entre Brasil e Canadá.',
      heroMessageEn: 'Creative-tech studio between Brazil and Canada.',
      priority: 0,
    },
  });
  console.log('✅ Markets created');
  
  // 3. Criar tags
  console.log('\nCreating tags...');
  const tagVR = await prisma.tag.upsert({
    where: { slug: 'vr' },
    update: {},
    create: { slug: 'vr', labelPt: 'VR', labelEn: 'VR', category: 'TECHNOLOGY' },
  });
  
  const tagXR = await prisma.tag.upsert({
    where: { slug: 'xr' },
    update: {},
    create: { slug: 'xr', labelPt: 'XR', labelEn: 'XR', category: 'TECHNOLOGY' },
  });
  
  const tagIA = await prisma.tag.upsert({
    where: { slug: 'ia' },
    update: {},
    create: { slug: 'ia', labelPt: 'IA', labelEn: 'AI', category: 'TECHNOLOGY' },
  });
  
  const tagMuseu = await prisma.tag.upsert({
    where: { slug: 'museu' },
    update: {},
    create: { slug: 'museu', labelPt: 'Museu', labelEn: 'Museum', category: 'INDUSTRY' },
  });
  
  const tagInstalacao = await prisma.tag.upsert({
    where: { slug: 'instalacao' },
    update: {},
    create: { slug: 'instalacao', labelPt: 'Instalação', labelEn: 'Installation', category: 'FORMAT' },
  });

  const tagFestival = await prisma.tag.upsert({
    where: { slug: 'festival' },
    update: {},
    create: { slug: 'festival', labelPt: 'Festival', labelEn: 'Festival', category: 'INDUSTRY' },
  });

  const tagCidade = await prisma.tag.upsert({
    where: { slug: 'cidade' },
    update: {},
    create: { slug: 'cidade', labelPt: 'Cidade', labelEn: 'City', category: 'INDUSTRY' },
  });
  
  console.log('✅ Tags created');
  
  // 4. Criar serviços
  console.log('\nCreating services...');
  const serviceCenografia = await prisma.service.upsert({
    where: { slug: 'cenografia-digital' },
    update: {},
    create: {
      slug: 'cenografia-digital',
      titlePt: 'Cenografia Digital',
      titleEn: 'Digital Scenography',
      descriptionPt: 'Espacos imersivos e narrativas visuais para museus, exposições e eventos.',
      descriptionEn: 'Immersive spaces and visual narratives for museums, exhibitions and events.',
      icon: 'scenography',
      priority: 10,
      segments: ['museus', 'centros-culturais', 'eventos'],
    },
  });

  const serviceVR = await prisma.service.upsert({
    where: { slug: 'vr-xr' },
    update: {},
    create: {
      slug: 'vr-xr',
      titlePt: 'VR/XR',
      titleEn: 'VR/XR',
      descriptionPt: 'Realidade virtual e estendida para experiências imersivas e treinamentos.',
      descriptionEn: 'Virtual and extended reality for immersive experiences and training.',
      icon: 'vr',
      priority: 9,
      segments: ['marcas', 'educacao', 'corporativo'],
    },
  });

  console.log('✅ Services created');

  // 5. Criar projeto: Natal Rio Bonito 2025 (animação IA)
  console.log('\nCreating project: Natal Rio Bonito 2025...');
  const heroNatal = await prisma.media.create({
    data: {
      type: 'IMAGE',
      originalUrl: 'https://example.com/media/natal-rio-bonito-2025.jpg',
      thumbnailUrl: 'https://example.com/media/natal-rio-bonito-2025-thumb.jpg',
      mediumUrl: 'https://example.com/media/natal-rio-bonito-2025-medium.jpg',
      largeUrl: 'https://example.com/media/natal-rio-bonito-2025-large.jpg',
      webpUrl: 'https://example.com/media/natal-rio-bonito-2025.webp',
      width: 1242,
      height: 699,
      format: 'jpg',
      contentType: 'image/jpeg',
      sizeBytes: 350000, // atualizar quando subir o arquivo real
      altPt:
        'Ilustração animada de duendes montando presentes em uma cabana de Natal; cena para Rio Bonito, RJ.',
      altEn:
        'Animated illustration of elves preparing gifts in a Christmas cabin; scene for Rio Bonito, Brazil.',
    },
  });

  await prisma.project.upsert({
    where: { slug: 'natal-rio-bonito-2025' },
    update: {},
    create: {
      slug: 'natal-rio-bonito-2025',
      title: 'Natal de Rio Bonito 2025',
      shortTitle: 'Natal Rio Bonito',
      summaryPt:
        'Instalação animada em IA para a praça central de Rio Bonito (RJ), com duendes montando presentes ao longo do dia e da noite.',
      summaryEn:
        'AI-assisted animated installation for Rio Bonito central square, elves crafting gifts through day and night.',
      city: 'Rio Bonito',
      stateProvince: 'RJ',
      country: 'Brasil',
      year: 2025,
      client: 'Prefeitura de Rio Bonito / YDreams',
      type: 'ANIMACAO_IA',
      featured: true,
      priorityHome: 9,
      status: 'PUBLISHED',
      ctaLabelPt: 'Ver projeto',
      ctaLabelEn: 'View project',
      ctaUrl: '/contact',
      heroImage: { connect: { id: heroNatal.id } },
      tags: {
        connect: [
          { slug: 'cidade' },
          { slug: 'festival' },
          { slug: 'ia' },
        ],
      },
      services: {
        connect: [
          { slug: 'cenografia-digital' },
          { slug: 'vr-xr' },
        ],
      },
    },
  });
  console.log('✅ Project created: Natal Rio Bonito 2025');
  
  // 6. Criar página Home (com conteúdo completo migrado do código estático)
  console.log('\nCreating pages...');
  const homePage = await prisma.page.upsert({
    where: { slug: 'home' },
    update: {
      // Hero Slogan (já estava)
      heroSloganPt: 'Experiências que Conectam Mundos',
      heroSloganEn: 'Experiences that Connect Worlds',
      heroSloganEs: 'Experiencias que Conectan Mundos',
      heroSloganFr: 'Expériences qui Connectent les Mondes',
      // Hero Subtitle (MIGRADO do código estático)
      heroSubtitlePt: 'Após 30 anos explorando diferentes caminhos, descobrimos que nossa combinação de curadoria de festivais, produção comercial, educação e pesquisa é única. Transformamos espaços culturais, marcas e experiências imersivas entre Brasil e Canadá.',
      heroSubtitleEn: 'After 30 years exploring different paths, we discovered our combination of festival curation, commercial production, education and research is unique. We transform cultural spaces, brands and immersive experiences between Brazil and Canada.',
      heroSubtitleEs: 'Tras 30 años explorando diferentes caminos, descubrimos que nuestra combinación de curaduría de festivales, producción comercial, educación e investigación es única. Transformamos espacios culturales, marcas y experiencias inmersivas entre Brasil y Canadá.',
      heroSubtitleFr: 'Après 30 ans à explorer différents chemins, nous avons découvert que notre combinaison de curation de festivals, production commerciale, éducation et recherche est unique. Nous transformons les espaces culturels, les marques et les expériences immersives entre le Brésil et le Canada.',
    },
    create: {
      name: 'Home',
      slug: 'home',
      seoTitlePt: 'Azimut - Experiências Imersivas, Interativas e Cinematográficas',
      seoTitleEn: 'Azimut - Immersive, Interactive and Cinematic Experiences',
      seoDescPt: 'Estúdio criativo-tecnológico especializado em cenografia digital, VR/XR e IA.',
      seoDescEn: 'Creative-tech studio specialized in digital scenography, VR/XR and AI.',
      // Hero Slogan
      heroSloganPt: 'Experiências que Conectam Mundos',
      heroSloganEn: 'Experiences that Connect Worlds',
      heroSloganEs: 'Experiencias que Conectan Mundos',
      heroSloganFr: 'Expériences qui Connectent les Mondes',
      // Hero Subtitle (MIGRADO do código estático - src/data/content.ts)
      heroSubtitlePt: 'Após 30 anos explorando diferentes caminhos, descobrimos que nossa combinação de curadoria de festivais, produção comercial, educação e pesquisa é única. Transformamos espaços culturais, marcas e experiências imersivas entre Brasil e Canadá.',
      heroSubtitleEn: 'After 30 years exploring different paths, we discovered our combination of festival curation, commercial production, education and research is unique. We transform cultural spaces, brands and immersive experiences between Brazil and Canada.',
      heroSubtitleEs: 'Tras 30 años explorando diferentes caminos, descubrimos que nuestra combinación de curaduría de festivales, producción comercial, educación e investigación es única. Transformamos espacios culturales, marcas y experiencias inmersivas entre Brasil y Canadá.',
      heroSubtitleFr: 'Après 30 ans à explorer différents chemins, nous avons découvert que notre combinaison de curation de festivals, production commerciale, éducation et recherche est unique. Nous transformons les espaces culturels, les marques et les expériences immersives entre le Brésil et le Canada.',
      status: 'PUBLISHED',
    },
  });
  
  // Criar todas as páginas do site
  const pagesToCreate = [
    { name: 'Home', slug: 'home', status: 'PUBLISHED' },
    { name: 'Soluções', slug: 'what', status: 'PUBLISHED' },
    { name: 'Projetos', slug: 'work', status: 'PUBLISHED' },
    { name: 'Estúdio', slug: 'studio', status: 'PUBLISHED' },
    { name: 'Sobre', slug: 'studio/about', status: 'PUBLISHED' },
    { name: 'Equipe', slug: 'studio/team', status: 'PUBLISHED' },
    { name: 'Academy', slug: 'academy', status: 'PUBLISHED' },
    { name: 'CA Vancouver', slug: 'academy/vancouver', status: 'PUBLISHED' },
    { name: 'Cursos', slug: 'academy/courses', status: 'PUBLISHED' },
    { name: 'Workshops & Eventos', slug: 'academy/workshops', status: 'PUBLISHED' },
    { name: 'Corporate', slug: 'academy/corporate', status: 'PUBLISHED' },
    { name: 'Pesquisa', slug: 'academy/research', status: 'PUBLISHED' },
    { name: 'Contato', slug: 'contact', status: 'PUBLISHED' },
  ];

  for (const pageData of pagesToCreate) {
    if (pageData.slug !== 'home') {
      await prisma.page.upsert({
        where: { slug: pageData.slug },
        update: {
          name: pageData.name,
          status: pageData.status as any,
        },
        create: {
          name: pageData.name,
          slug: pageData.slug,
          status: pageData.status as any,
        },
      });
    }
  }
  
  console.log('✅ Pages created');
  
  console.log('\n✅ Database seeded successfully!');
  console.log('\n📝 Credenciais do Admin:');
  console.log('   Email: admin@azimut.com.br');
  console.log('   Senha: Azimut2025!');
  console.log('\n🚀 Acesse: http://localhost:3001/login');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });








