// ════════════════════════════════════════════════════════════
// Serviço: Publicação Automática de Making-of
// Publica automaticamente quando aprovado no backoffice
// ════════════════════════════════════════════════════════════

import { prisma } from '@/lib/prisma';

export interface PublishingResult {
  success: boolean;
  publishedTo: string[];
  errors: string[];
}

/**
 * Publica making-of automaticamente nos lugares corretos
 */
export async function publishMakingOf(makingOfId: string): Promise<PublishingResult> {
  const result: PublishingResult = {
    success: true,
    publishedTo: [],
    errors: [],
  };

  try {
    const makingOf = await prisma.makingOf.findUnique({
      where: { id: makingOfId },
      include: {
        project: true,
        collaborator: true,
        mediaFiles: true,
      },
    });

    if (!makingOf) {
      throw new Error('Making-of não encontrado');
    }

    // 1. Publicar no Blog (se configurado)
    if (makingOf.publishToBlog) {
      try {
        await publishToBlog(makingOf);
        result.publishedTo.push('Blog');
      } catch (error) {
        result.errors.push(`Erro ao publicar no Blog: ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    // 2. Publicar na Newsletter (se configurado)
    if (makingOf.publishToNewsletter) {
      try {
        await publishToNewsletter(makingOf);
        result.publishedTo.push('Newsletter');
      } catch (error) {
        result.errors.push(`Erro ao publicar na Newsletter: ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    // 3. Publicar nas Redes Sociais (se configurado)
    if (makingOf.publishToSocial) {
      try {
        await publishToSocial(makingOf);
        result.publishedTo.push('Redes Sociais');
      } catch (error) {
        result.errors.push(`Erro ao publicar nas Redes Sociais: ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    // 4. Publicar no Projeto (sempre, se tiver projeto)
    if (makingOf.projectId) {
      try {
        await publishToProject(makingOf);
        result.publishedTo.push(`Projeto: ${makingOf.project?.title || makingOf.projectName}`);
      } catch (error) {
        result.errors.push(`Erro ao publicar no Projeto: ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    // 5. Publicar na Home (se for vídeo destacado)
    if (shouldPublishToHome(makingOf)) {
      try {
        await publishToHome(makingOf);
        result.publishedTo.push('Home (Destaque)');
      } catch (error) {
        result.errors.push(`Erro ao publicar na Home: ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    // 6. Publicar na Academy (se for relacionado)
    if (shouldPublishToAcademy(makingOf)) {
      try {
        await publishToAcademy(makingOf);
        result.publishedTo.push('Academy');
      } catch (error) {
        result.errors.push(`Erro ao publicar na Academy: ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    // Atualizar status
    await prisma.makingOf.update({
      where: { id: makingOfId },
      data: { status: 'PUBLISHED' },
    });

    result.success = result.errors.length === 0;
    return result;
  } catch (error) {
    result.success = false;
    result.errors.push(error instanceof Error ? error.message : String(error));
    return result;
  }
}

/**
 * Publica no Blog
 */
async function publishToBlog(makingOf: any) {
  // Criar post no blog
  const slug = `making-of-${makingOf.id}`;
  
  await prisma.blogPost.create({
    data: {
      slug,
      titlePt: makingOf.title,
      titleEn: makingOf.title,
      excerptPt: makingOf.description || `Making-of: ${makingOf.title}`,
      excerptEn: makingOf.description || `Behind the scenes: ${makingOf.title}`,
      contentPt: generateBlogContent(makingOf, 'pt'),
      contentEn: generateBlogContent(makingOf, 'en'),
      coverImageId: makingOf.mediaFiles?.[0]?.id || null,
      status: 'PUBLISHED',
      featured: makingOf.featured,
      publishedAt: new Date(),
      tags: {
        connectOrCreate: makingOf.tags.map((tag: string) => ({
          where: { slug: tag.toLowerCase() },
          create: { slug: tag.toLowerCase(), namePt: tag, nameEn: tag },
        })),
      },
    },
  });
}

/**
 * Publica na Newsletter
 */
async function publishToNewsletter(makingOf: any) {
  // Adicionar à próxima newsletter
  // Implementar depois com sistema de newsletter
  console.log('Adicionando making-of à newsletter:', makingOf.id);
}

/**
 * Publica nas Redes Sociais
 */
async function publishToSocial(makingOf: any) {
  // Usar sistema de repostagem existente
  // Implementar depois
  console.log('Publicando making-of nas redes sociais:', makingOf.id);
}

/**
 * Publica no Projeto
 */
async function publishToProject(makingOf: any) {
  if (!makingOf.projectId) return;

  // Adicionar mídias ao projeto
  for (const media of makingOf.mediaFiles) {
    await prisma.projectMedia.create({
      data: {
        projectId: makingOf.projectId,
        mediaId: media.id,
        order: 0,
      },
    });
  }

  // Atualizar página do projeto (se existir)
  const project = makingOf.project;
  if (project?.slug) {
    const pageSlug = `projetos/${project.slug}`;
    const page = await prisma.page.findUnique({
      where: { slug: pageSlug },
    });

    if (page) {
      // Adicionar seção de making-of na página
      // Implementar depois
    }
  }
}

/**
 * Verifica se deve publicar na Home
 */
function shouldPublishToHome(makingOf: any): boolean {
  // Publicar na Home se:
  // 1. For vídeo (mediaType === 'VIDEO' ou 'MIXED')
  // 2. For destacado (featured === true)
  // 3. Tiver projeto do portfólio
  return (
    (makingOf.mediaType === 'VIDEO' || makingOf.mediaType === 'MIXED') &&
    makingOf.featured === true &&
    (makingOf.projectId !== null || makingOf.projectName !== null)
  );
}

/**
 * Publica na Home (vídeo destacado)
 */
async function publishToHome(makingOf: any) {
  // Adicionar à seção de vídeos destacados da Home
  // Criar/atualizar seção "Vídeos em Destaque"
  
  const homePage = await prisma.page.findUnique({
    where: { slug: 'home' },
    include: { sections: true },
  });

  if (!homePage) return;

  // Buscar ou criar seção de vídeos destacados
  let featuredSection = homePage.sections.find(s => s.type === 'featured_videos');
  
  if (!featuredSection) {
    featuredSection = await prisma.section.create({
      data: {
        pageId: homePage.id,
        type: 'featured_videos',
        order: 999,
        titlePt: 'Vídeos em Destaque',
        titleEn: 'Featured Videos',
      },
    });
  }

  // Adicionar making-of à seção
  // Implementar relação Section -> MakingOf depois
  console.log('Adicionando making-of à Home:', makingOf.id);
}

/**
 * Verifica se deve publicar na Academy
 */
function shouldPublishToAcademy(makingOf: any): boolean {
  // Publicar na Academy se:
  // 1. Tiver tag "academy", "curso", "workshop", "tutorial"
  // 2. For tipo EVENT relacionado a educação
  return (
    makingOf.tags.some((tag: string) => 
      ['academy', 'curso', 'workshop', 'tutorial', 'educação', 'education'].includes(tag.toLowerCase())
    ) ||
    makingOf.makingOfType === 'EVENT'
  );
}

/**
 * Publica na Academy
 */
async function publishToAcademy(makingOf: any) {
  const academyPage = await prisma.page.findUnique({
    where: { slug: 'academy' },
    include: { sections: true },
  });

  if (!academyPage) return;

  // Adicionar à seção de making-ofs da Academy
  console.log('Adicionando making-of à Academy:', makingOf.id);
}

/**
 * Gera conteúdo do blog
 */
function generateBlogContent(makingOf: any, lang: 'pt' | 'en'): string {
  const creditText = makingOf.creditText || 
    (makingOf.collaboratorName ? `Making-of por ${makingOf.collaboratorName}` : 'Making-of Azimut');

  let content = `# ${makingOf.title}\n\n`;
  
  if (makingOf.description) {
    content += `${makingOf.description}\n\n`;
  }

  // Adicionar mídias
  if (makingOf.mediaFiles && makingOf.mediaFiles.length > 0) {
    content += `## Galeria\n\n`;
    for (const media of makingOf.mediaFiles) {
      if (media.type === 'IMAGE') {
        content += `![${makingOf.title}](${media.originalUrl})\n\n`;
      } else if (media.type === 'VIDEO') {
        content += `<video src="${media.originalUrl}" controls></video>\n\n`;
      }
    }
  }

  // Adicionar metadados
  if (makingOf.location) {
    content += `**Local:** ${makingOf.location}\n\n`;
  }
  if (makingOf.eventDate) {
    content += `**Data:** ${new Date(makingOf.eventDate).toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US')}\n\n`;
  }
  if (makingOf.projectName) {
    content += `**Projeto:** ${makingOf.projectName}\n\n`;
  }

  // Créditos
  content += `---\n\n*${creditText}*\n\n`;

  return content;
}
