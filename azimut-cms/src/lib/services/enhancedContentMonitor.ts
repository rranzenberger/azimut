// ════════════════════════════════════════════════════════════
// Serviço: Monitoramento Avançado com Web Scraping
// Integra DeepSeek/Claude para análise inteligente
// ════════════════════════════════════════════════════════════

import { AIProviderService } from '@/src/lib/ai-provider';

export interface EnhancedSearchResult {
  title: string;
  url: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  author?: string;
  publishedAt?: Date;
  sourceType: 'NEWS' | 'INSTAGRAM' | 'YOUTUBE' | 'BLOG' | 'PRESS' | 'TWITTER' | 'FACEBOOK' | 'RSS' | 'LINKEDIN' | 'JOURNAL' | 'TV' | 'PODCAST' | 'NOTION' | 'OTHER';
  sourceName?: string; // Nome da fonte (ex: "Globo", "Folha de S.Paulo")
  sourceIcon?: string; // Emoji ou ícone da fonte
}

/**
 * Detecta tipo de fonte pela URL
 */
export function detectSourceType(url: string): EnhancedSearchResult['sourceType'] {
  const lowerUrl = url.toLowerCase();
  
  if (lowerUrl.includes('notion.so') || lowerUrl.includes('notion.site')) return 'NOTION';
  if (lowerUrl.includes('instagram.com')) return 'INSTAGRAM';
  if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) return 'YOUTUBE';
  if (lowerUrl.includes('linkedin.com')) return 'LINKEDIN';
  if (lowerUrl.includes('facebook.com') || lowerUrl.includes('fb.com')) return 'FACEBOOK';
  if (lowerUrl.includes('twitter.com') || lowerUrl.includes('x.com')) return 'TWITTER';
  if (lowerUrl.includes('globo.com') || lowerUrl.includes('g1.globo.com')) return 'JOURNAL';
  if (lowerUrl.includes('folha.com.br') || lowerUrl.includes('uol.com.br') || lowerUrl.includes('estadao.com.br')) return 'JOURNAL';
  if (lowerUrl.includes('gazeta') || lowerUrl.includes('jornal')) return 'JOURNAL';
  if (lowerUrl.includes('tv') || lowerUrl.includes('televisao') || lowerUrl.includes('programa')) return 'TV';
  if (lowerUrl.includes('podcast') || lowerUrl.includes('spotify.com/podcast')) return 'PODCAST';
  if (lowerUrl.includes('blog') || lowerUrl.includes('medium.com') || lowerUrl.includes('wordpress.com')) return 'BLOG';
  if (lowerUrl.includes('news') || lowerUrl.includes('noticia')) return 'NEWS';
  if (lowerUrl.includes('press') || lowerUrl.includes('imprensa')) return 'PRESS';
  
  return 'OTHER';
}

/**
 * Obtém ícone e nome da fonte
 */
export function getSourceInfo(sourceType: EnhancedSearchResult['sourceType'], url: string): { icon: string; name: string } {
  const lowerUrl = url.toLowerCase();
  
  switch (sourceType) {
    case 'INSTAGRAM':
      return { icon: '📸', name: 'Instagram' };
    case 'YOUTUBE':
      return { icon: '🎥', name: 'YouTube' };
    case 'LINKEDIN':
      return { icon: '💼', name: 'LinkedIn' };
    case 'FACEBOOK':
      return { icon: '👥', name: 'Facebook' };
    case 'TWITTER':
      return { icon: '🐦', name: 'Twitter/X' };
    case 'JOURNAL':
      if (lowerUrl.includes('globo')) return { icon: '📰', name: 'Globo' };
      if (lowerUrl.includes('folha')) return { icon: '📰', name: 'Folha de S.Paulo' };
      if (lowerUrl.includes('estadao')) return { icon: '📰', name: 'Estadão' };
      if (lowerUrl.includes('uol')) return { icon: '📰', name: 'UOL' };
      return { icon: '📰', name: 'Jornal' };
    case 'TV':
      if (lowerUrl.includes('globo')) return { icon: '📺', name: 'TV Globo' };
      if (lowerUrl.includes('record')) return { icon: '📺', name: 'TV Record' };
      if (lowerUrl.includes('sbt')) return { icon: '📺', name: 'SBT' };
      return { icon: '📺', name: 'Televisão' };
    case 'PODCAST':
      return { icon: '🎙️', name: 'Podcast' };
    case 'BLOG':
      return { icon: '📝', name: 'Blog' };
    case 'NEWS':
      return { icon: '📰', name: 'Notícia' };
    case 'PRESS':
      return { icon: '📰', name: 'Imprensa' };
    case 'NOTION':
      return { icon: '📝', name: 'Notion' };
    default:
      return { icon: '🔗', name: 'Outro' };
  }
}

/**
 * Busca conteúdo usando IA (DeepSeek/Claude) para análise inteligente
 */
export async function searchWithAI(
  keywords: string[],
  projectName?: string,
  projectId?: string
): Promise<EnhancedSearchResult[]> {
  const aiService = new AIProviderService();
  
  // Montar prompt para IA
  const prompt = `
Você é um assistente especializado em buscar conteúdo relevante sobre projetos criativos e tecnológicos.

PROJETO: ${projectName || 'Não especificado'}
PALAVRAS-CHAVE: ${keywords.join(', ')}

TAREFA:
Busque e identifique conteúdo relevante nas seguintes fontes:
- Instagram (posts, stories)
- YouTube (vídeos)
- LinkedIn (posts profissionais)
- Facebook (posts)
- Twitter/X (tweets)
- Jornais (Globo, Folha, Estadão, UOL)
- Telejornais (TV Globo, Record, SBT)
- Blogs especializados
- Podcasts

Para cada resultado encontrado, forneça:
1. Título do conteúdo
2. URL completa
3. Resumo do conteúdo
4. Tipo de fonte (INSTAGRAM, YOUTUBE, JOURNAL, etc.)
5. Nome da fonte (ex: "Globo", "Folha de S.Paulo")
6. Data de publicação (se disponível)
7. Autor (se disponível)

IMPORTANTE:
- Foque em conteúdo que mencione o projeto ou palavras-chave
- Priorize fontes confiáveis
- Inclua menções, hashtags e referências relevantes
- Seja específico sobre a origem (jornal, programa de TV, etc.)

Retorne os resultados em formato JSON.
`;

  try {
    const response = await aiService.chat([
      { role: 'system', content: 'Você é um especialista em busca de conteúdo e análise de mídia.' },
      { role: 'user', content: prompt },
    ]);

    // Parsear resposta da IA
    // Nota: A IA pode retornar sugestões de URLs, mas não pode fazer scraping diretamente
    // Por isso, combinamos com web scraping real abaixo
    
    return [];
  } catch (error) {
    console.error('Erro ao buscar com IA:', error);
    return [];
  }
}

/**
 * Busca conteúdo em múltiplas fontes usando web scraping
 */
export async function searchMultipleSources(
  keywords: string[],
  sources: ('instagram' | 'youtube' | 'linkedin' | 'facebook' | 'twitter' | 'news' | 'blog' | 'journal' | 'tv')[] = ['instagram', 'youtube', 'news']
): Promise<EnhancedSearchResult[]> {
  const results: EnhancedSearchResult[] = [];
  const query = keywords.join(' ');

  // Buscar em cada fonte
  for (const source of sources) {
    try {
      let sourceResults: EnhancedSearchResult[] = [];

      switch (source) {
        case 'instagram':
          sourceResults = await searchInstagramPublic(query);
          break;
        case 'youtube':
          sourceResults = await searchYouTubePublic(query);
          break;
        case 'linkedin':
          sourceResults = await searchLinkedInPublic(query);
          break;
        case 'news':
          sourceResults = await searchNewsPublic(query);
          break;
        case 'blog':
          sourceResults = await searchBlogsPublic(query);
          break;
        case 'journal':
          sourceResults = await searchJournalsPublic(query);
          break;
        default:
          break;
      }

      results.push(...sourceResults);
    } catch (error) {
      console.error(`Erro ao buscar em ${source}:`, error);
    }
  }

  return results;
}

/**
 * Busca posts públicos do Instagram
 */
async function searchInstagramPublic(query: string): Promise<EnhancedSearchResult[]> {
  // Implementação de web scraping do Instagram
  // Nota: Instagram pode bloquear, então usar com cuidado
  try {
    const hashtag = query.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const url = `https://www.instagram.com/explore/tags/${hashtag}/`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) return [];

    const html = await response.text();
    const jsonMatch = html.match(/window\._sharedData\s*=\s*({.+?});/);

    if (!jsonMatch) return [];

    const data = JSON.parse(jsonMatch[1]);
    const posts = data?.entry_data?.TagPage?.[0]?.graphql?.hashtag?.edge_hashtag_to_media?.edges || [];

    return posts.slice(0, 12).map((edge: any) => {
      const node = edge.node;
      return {
        title: node.edge_media_to_caption?.edges?.[0]?.node?.text?.substring(0, 100) || `Post sobre ${query}`,
        url: `https://www.instagram.com/p/${node.shortcode}/`,
        content: node.edge_media_to_caption?.edges?.[0]?.node?.text || '',
        imageUrl: node.display_url || node.thumbnail_src,
        author: node.owner?.username,
        publishedAt: node.taken_at_timestamp ? new Date(node.taken_at_timestamp * 1000) : undefined,
        sourceType: 'INSTAGRAM' as const,
        sourceName: 'Instagram',
        sourceIcon: '📸',
      };
    });
  } catch (error) {
    console.error('Erro ao buscar Instagram:', error);
    return [];
  }
}

/**
 * Busca vídeos do YouTube
 */
async function searchYouTubePublic(query: string): Promise<EnhancedSearchResult[]> {
  // Usar YouTube Data API se tiver key, senão fazer scraping básico
  const apiKey = process.env.YOUTUBE_API_KEY;
  
  if (apiKey) {
    try {
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=20&key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      return (data.items || []).map((item: any) => ({
        title: item.snippet?.title || '',
        url: `https://www.youtube.com/watch?v=${item.id?.videoId || ''}`,
        content: item.snippet?.description || '',
        imageUrl: item.snippet?.thumbnails?.high?.url,
        videoUrl: `https://www.youtube.com/watch?v=${item.id?.videoId || ''}`,
        author: item.snippet?.channelTitle,
        publishedAt: item.snippet?.publishedAt ? new Date(item.snippet.publishedAt) : undefined,
        sourceType: 'YOUTUBE' as const,
        sourceName: 'YouTube',
        sourceIcon: '🎥',
      }));
    } catch (error) {
      console.error('Erro ao buscar YouTube:', error);
    }
  }

  return [];
}

/**
 * Busca posts do LinkedIn (web scraping básico)
 */
async function searchLinkedInPublic(query: string): Promise<EnhancedSearchResult[]> {
  // LinkedIn requer autenticação, então retornar vazio por enquanto
  // Implementar depois com LinkedIn API
  return [];
}

/**
 * Busca notícias (Google News)
 */
async function searchNewsPublic(query: string): Promise<EnhancedSearchResult[]> {
  try {
    const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=pt-BR&gl=BR&ceid=BR:pt-419`;
    const response = await fetch(url);
    const text = await response.text();

    // Parsear RSS
    const items = text.match(/<item>[\s\S]*?<\/item>/g) || [];

    return items.slice(0, 20).map((item: string) => {
      const titleMatch = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
      const linkMatch = item.match(/<link>(.*?)<\/link>/);
      const descMatch = item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/);
      const pubDateMatch = item.match(/<pubDate>(.*?)<\/pubDate>/);

      return {
        title: titleMatch?.[1] || '',
        url: linkMatch?.[1] || '',
        content: descMatch?.[1] || '',
        publishedAt: pubDateMatch?.[1] ? new Date(pubDateMatch[1]) : undefined,
        sourceType: 'NEWS' as const,
        sourceName: 'Google News',
        sourceIcon: '📰',
      };
    });
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    return [];
  }
}

/**
 * Busca blogs
 */
async function searchBlogsPublic(query: string): Promise<EnhancedSearchResult[]> {
  // Implementar busca em blogs específicos ou RSS feeds
  return [];
}

/**
 * Busca jornais específicos
 */
async function searchJournalsPublic(query: string): Promise<EnhancedSearchResult[]> {
  // Implementar busca em jornais específicos (Globo, Folha, etc.)
  return [];
}
