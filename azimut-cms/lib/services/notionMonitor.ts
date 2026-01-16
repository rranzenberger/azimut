// ════════════════════════════════════════════════════════════
// Serviço: Monitoramento do Notion (PREPARADO PARA FUTURO)
// ════════════════════════════════════════════════════════════

/**
 * Busca páginas do Notion usando Notion API
 * 
 * Requisitos:
 * - NOTION_API_KEY no .env
 * - NOTION_DATABASE_ID no .env
 * - Database compartilhado com integration
 */
export async function searchNotion(
  databaseId?: string,
  filters?: {
    status?: string;
    type?: string;
    project?: string;
  }
): Promise<Array<{
  id: string;
  title: string;
  url: string;
  content: string;
  imageUrl?: string;
  author?: string;
  publishedAt?: Date;
  sourceType: 'NOTION';
}>> {
  const apiKey = process.env.NOTION_API_KEY;
  const dbId = databaseId || process.env.NOTION_DATABASE_ID;

  if (!apiKey || !dbId) {
    console.warn('Notion API não configurada. Retornando resultados vazios.');
    return [];
  }

  try {
    // Construir filtros
    const notionFilters: any = {};
    
    if (filters?.status) {
      notionFilters.and = [
        ...(notionFilters.and || []),
        {
          property: 'Status',
          select: { equals: filters.status },
        },
      ];
    }

    if (filters?.type) {
      notionFilters.and = [
        ...(notionFilters.and || []),
        {
          property: 'Tipo',
          select: { equals: filters.type },
        },
      ];
    }

    // Buscar páginas do database
    const response = await fetch(`https://api.notion.com/v1/databases/${dbId}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filter: Object.keys(notionFilters).length > 0 ? notionFilters : undefined,
        sorts: [
          {
            property: 'Created',
            direction: 'descending',
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Notion API error: ${response.statusText}`);
    }

    const data = await response.json();

    // Converter resultados do Notion para formato padrão
    return (data.results || []).map((page: any) => {
      // Extrair título (pode estar em diferentes propriedades)
      const titleProperty = page.properties?.Title || page.properties?.Nome || page.properties?.title;
      const title = titleProperty?.title?.[0]?.plain_text || 
                   titleProperty?.rich_text?.[0]?.plain_text || 
                   'Sem título';

      // Extrair conteúdo (primeiro bloco de texto)
      const content = page.properties?.Descrição?.rich_text?.[0]?.plain_text || 
                     page.properties?.Content?.rich_text?.[0]?.plain_text || 
                     '';

      // Extrair imagem (se houver)
      const imageUrl = page.cover?.external?.url || 
                      page.cover?.file?.url || 
                      page.properties?.Imagem?.files?.[0]?.external?.url ||
                      page.properties?.Imagem?.files?.[0]?.file?.url;

      // Extrair autor
      const author = page.properties?.Autor?.people?.[0]?.name ||
                    page.properties?.Author?.people?.[0]?.name;

      // Extrair data
      const publishedAt = page.properties?.Data?.date?.start ||
                         page.properties?.Created?.created_time ||
                         page.created_time;

      return {
        id: page.id,
        title,
        url: page.url,
        content,
        imageUrl,
        author,
        publishedAt: publishedAt ? new Date(publishedAt) : undefined,
        sourceType: 'NOTION' as const,
      };
    });
  } catch (error) {
    console.error('Erro ao buscar Notion:', error);
    return [];
  }
}

/**
 * Monitora Notion e salva resultados na curadoria
 */
export async function monitorNotionAndSave(
  projectId?: string,
  projectName?: string
): Promise<number> {
  try {
    const results = await searchNotion(undefined, {
      status: 'Publicar', // Páginas marcadas como "Publicar"
    });

    if (results.length === 0) {
      return 0;
    }

    // Salvar como sugestões na curadoria
    // (implementar depois com prisma)
    console.log(`Encontradas ${results.length} páginas do Notion para publicar`);

    return results.length;
  } catch (error) {
    console.error('Erro ao monitorar Notion:', error);
    return 0;
  }
}
