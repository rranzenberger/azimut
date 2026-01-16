// ════════════════════════════════════════════════════════════
// SERVIÇO: Monitoramento de Conteúdo
// Busca conteúdo em Google News, YouTube, Instagram, etc.
// ════════════════════════════════════════════════════════════

interface SearchResult {
  title: string;
  url: string;
  content?: string;
  imageUrl?: string;
  videoUrl?: string;
  author?: string;
  publishedAt?: Date;
  sourceType: 'NEWS' | 'YOUTUBE' | 'INSTAGRAM' | 'BLOG' | 'PRESS' | 'TWITTER' | 'FACEBOOK' | 'RSS';
}

/**
 * Busca notícias no Google News usando NewsAPI
 */
export async function searchGoogleNews(
  keywords: string[],
  apiKey?: string
): Promise<SearchResult[]> {
  if (!apiKey) {
    console.warn('NewsAPI key não configurada. Retornando resultados vazios.');
    return [];
  }

  try {
    const query = keywords.join(' OR ');
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=pt&sortBy=publishedAt&pageSize=20&apiKey=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`NewsAPI error: ${response.statusText}`);
    }

    const data = await response.json();

    return (data.articles || []).map((article: any) => ({
      title: article.title || '',
      url: article.url || '',
      content: article.description || article.content || '',
      imageUrl: article.urlToImage || undefined,
      author: article.author || article.source?.name || undefined,
      publishedAt: article.publishedAt ? new Date(article.publishedAt) : undefined,
      sourceType: 'NEWS' as const,
    }));
  } catch (error) {
    console.error('Erro ao buscar Google News:', error);
    return [];
  }
}

/**
 * Busca vídeos no YouTube usando YouTube Data API
 */
export async function searchYouTube(
  keywords: string[],
  apiKey?: string
): Promise<SearchResult[]> {
  if (!apiKey) {
    console.warn('YouTube API key não configurada. Retornando resultados vazios.');
    return [];
  }

  try {
    const query = keywords.join(' ');
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=20&key=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.statusText}`);
    }

    const data = await response.json();

    return (data.items || []).map((item: any) => ({
      title: item.snippet?.title || '',
      url: `https://www.youtube.com/watch?v=${item.id?.videoId || ''}`,
      content: item.snippet?.description || '',
      imageUrl: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.default?.url || undefined,
      videoUrl: `https://www.youtube.com/watch?v=${item.id?.videoId || ''}`,
      author: item.snippet?.channelTitle || undefined,
      publishedAt: item.snippet?.publishedAt ? new Date(item.snippet.publishedAt) : undefined,
      sourceType: 'YOUTUBE' as const,
    }));
  } catch (error) {
    console.error('Erro ao buscar YouTube:', error);
    return [];
  }
}

/**
 * Busca posts no Instagram
 * 
 * Opção 1: Instagram Graph API (requer conta Business + Access Token)
 * Opção 2: Web Scraping (busca pública por hashtag - mais simples)
 */
export async function searchInstagram(
  hashtags: string[],
  accessToken?: string
): Promise<SearchResult[]> {
  // Se tiver Access Token, usar Instagram Graph API
  if (accessToken) {
    return searchInstagramGraphAPI(hashtags, accessToken);
  }

  // Senão, usar web scraping (busca pública)
  return searchInstagramPublic(hashtags);
}

/**
 * Busca usando Instagram Graph API (oficial)
 * Requer: Instagram Business Account + Access Token
 */
async function searchInstagramGraphAPI(
  hashtags: string[],
  accessToken: string
): Promise<SearchResult[]> {
  try {
    const results: SearchResult[] = [];

    for (const hashtag of hashtags) {
      // Remover # se tiver
      const cleanHashtag = hashtag.replace(/^#/, '');
      
      // Buscar hashtag ID primeiro
      const hashtagUrl = `https://graph.instagram.com/ig_hashtag_search?user_id=${process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID}&q=${encodeURIComponent(cleanHashtag)}&access_token=${accessToken}`;
      
      const hashtagRes = await fetch(hashtagUrl);
      if (!hashtagRes.ok) {
        console.warn(`Erro ao buscar hashtag ${cleanHashtag}:`, hashtagRes.statusText);
        continue;
      }

      const hashtagData = await hashtagRes.json();
      const hashtagId = hashtagData.data?.[0]?.id;

      if (!hashtagId) {
        continue;
      }

      // Buscar posts recentes da hashtag
      const postsUrl = `https://graph.instagram.com/${hashtagId}/recent_media?fields=id,caption,media_type,media_url,permalink,timestamp,username&access_token=${accessToken}&limit=20`;
      
      const postsRes = await fetch(postsUrl);
      if (!postsRes.ok) {
        console.warn(`Erro ao buscar posts da hashtag ${cleanHashtag}:`, postsRes.statusText);
        continue;
      }

      const postsData = await postsRes.json();

      (postsData.data || []).forEach((post: any) => {
        results.push({
          title: post.caption?.substring(0, 100) || `Post sobre ${cleanHashtag}`,
          url: post.permalink || '',
          content: post.caption || '',
          imageUrl: post.media_type === 'IMAGE' ? post.media_url : undefined,
          videoUrl: post.media_type === 'VIDEO' ? post.media_url : undefined,
          author: post.username || undefined,
          publishedAt: post.timestamp ? new Date(post.timestamp) : undefined,
          sourceType: 'INSTAGRAM' as const,
        });
      });
    }

    return results;
  } catch (error) {
    console.error('Erro ao buscar Instagram Graph API:', error);
    return [];
  }
}

/**
 * Busca posts públicos do Instagram via web scraping
 * Funciona com qualquer hashtag pública (sem API)
 * 
 * Nota: Instagram pode bloquear se fizer muitas requisições
 */
async function searchInstagramPublic(
  hashtags: string[]
): Promise<SearchResult[]> {
  try {
    const results: SearchResult[] = [];

    for (const hashtag of hashtags) {
      // Remover # se tiver
      const cleanHashtag = hashtag.replace(/^#/, '').toLowerCase();
      
      // URL pública da hashtag
      const url = `https://www.instagram.com/explore/tags/${cleanHashtag}/`;

      try {
        // Tentar buscar página pública
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          },
        });

        if (!response.ok) {
          console.warn(`Erro ao acessar hashtag ${cleanHashtag}:`, response.status);
          continue;
        }

        const html = await response.text();

        // Instagram usa JSON embutido no HTML
        // Buscar window._sharedData ou similar
        const jsonMatch = html.match(/window\._sharedData\s*=\s*({.+?});/);
        
        if (jsonMatch) {
          try {
            const data = JSON.parse(jsonMatch[1]);
            const posts = data?.entry_data?.TagPage?.[0]?.graphql?.hashtag?.edge_hashtag_to_media?.edges || [];

            posts.slice(0, 12).forEach((edge: any) => {
              const node = edge.node;
              if (node) {
                results.push({
                  title: node.edge_media_to_caption?.edges?.[0]?.node?.text?.substring(0, 100) || `Post sobre ${cleanHashtag}`,
                  url: `https://www.instagram.com/p/${node.shortcode}/`,
                  content: node.edge_media_to_caption?.edges?.[0]?.node?.text || '',
                  imageUrl: node.display_url || node.thumbnail_src,
                  author: node.owner?.username || undefined,
                  publishedAt: node.taken_at_timestamp ? new Date(node.taken_at_timestamp * 1000) : undefined,
                  sourceType: 'INSTAGRAM' as const,
                });
              }
            });
          } catch (parseError) {
            console.warn(`Erro ao parsear dados do Instagram para ${cleanHashtag}:`, parseError);
          }
        }
      } catch (fetchError) {
        console.warn(`Erro ao buscar hashtag ${cleanHashtag}:`, fetchError);
        // Continuar com próxima hashtag
      }
    }

    return results;
  } catch (error) {
    console.error('Erro ao buscar Instagram público:', error);
    return [];
  }
}

/**
 * Busca em múltiplas fontes simultaneamente
 */
export async function searchAllSources(
  keywords: string[],
  sources: ('news' | 'youtube' | 'instagram')[],
  config: {
    newsApiKey?: string;
    youtubeApiKey?: string;
    instagramToken?: string;
  }
): Promise<SearchResult[]> {
  const results: SearchResult[] = [];

  const promises: Promise<SearchResult[]>[] = [];

  if (sources.includes('news') && config.newsApiKey) {
    promises.push(searchGoogleNews(keywords, config.newsApiKey));
  }

  if (sources.includes('youtube') && config.youtubeApiKey) {
    promises.push(searchYouTube(keywords, config.youtubeApiKey));
  }

  if (sources.includes('instagram') && config.instagramToken) {
    promises.push(searchInstagram(keywords, config.instagramToken));
  }

  const allResults = await Promise.all(promises);
  allResults.forEach(result => results.push(...result));

  return results;
}

/**
 * Extrai texto de uma URL (web scraping básico)
 */
export async function extractContentFromUrl(url: string): Promise<{
  title: string;
  content: string;
  imageUrl?: string;
}> {
  try {
    // Usar uma API de scraping ou fazer fetch direto
    // Por enquanto, retornar dados básicos
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const html = await response.text();
    
    // Extração básica de título e conteúdo (pode melhorar com cheerio ou similar)
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : 'Sem título';

    // Tentar extrair conteúdo principal (muito básico)
    const contentMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i) || 
                        html.match(/<article[^>]*>([\s\S]*?)<\/article>/i) ||
                        html.match(/<div[^>]*class="[^"]*content[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
    
    let content = '';
    if (contentMatch) {
      // Remover tags HTML básicas
      content = contentMatch[1]
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .substring(0, 2000); // Limitar tamanho
    }

    // Tentar extrair imagem principal
    const imageMatch = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/i) ||
                       html.match(/<img[^>]*src="([^"]+)"[^>]*>/i);
    const imageUrl = imageMatch ? imageMatch[1] : undefined;

    return {
      title,
      content: content || 'Conteúdo não pôde ser extraído automaticamente.',
      imageUrl,
    };
  } catch (error) {
    console.error('Erro ao extrair conteúdo da URL:', error);
    return {
      title: 'Erro ao extrair',
      content: 'Não foi possível extrair o conteúdo desta URL.',
    };
  }
}
