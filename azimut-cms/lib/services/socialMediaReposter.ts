// ════════════════════════════════════════════════════════════
// Serviço: Repostagem Automática em Redes Sociais
// ════════════════════════════════════════════════════════════

export interface RepostConfig {
  text: string;
  imageUrl?: string;
  videoUrl?: string;
  linkUrl?: string;
  hashtags?: string[];
}

export interface RepostResult {
  success: boolean;
  platform: string;
  postId?: string;
  url?: string;
  error?: string;
}

/**
 * Reposta em todas as redes sociais configuradas
 */
export async function repostToAllPlatforms(
  config: RepostConfig,
  platforms: ('instagram' | 'youtube' | 'linkedin' | 'vimeo')[]
): Promise<RepostResult[]> {
  const results: RepostResult[] = [];

  for (const platform of platforms) {
    try {
      const result = await repostToPlatform(platform, config);
      results.push(result);
    } catch (error) {
      results.push({
        success: false,
        platform,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return results;
}

/**
 * Reposta em uma plataforma específica
 */
async function repostToPlatform(
  platform: 'instagram' | 'youtube' | 'linkedin' | 'vimeo',
  config: RepostConfig
): Promise<RepostResult> {
  switch (platform) {
    case 'instagram':
      return await repostToInstagram(config);
    case 'youtube':
      return await repostToYouTube(config);
    case 'linkedin':
      return await repostToLinkedIn(config);
    case 'vimeo':
      return await repostToVimeo(config);
    default:
      throw new Error(`Plataforma não suportada: ${platform}`);
  }
}

/**
 * Reposta no Instagram
 * Requer: Instagram Graph API + Access Token
 */
async function repostToInstagram(config: RepostConfig): Promise<RepostResult> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const accountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;

  if (!accessToken || !accountId) {
    return {
      success: false,
      platform: 'instagram',
      error: 'Instagram Access Token não configurado',
    };
  }

  try {
    // Criar container de mídia
    const containerUrl = config.imageUrl
      ? `https://graph.instagram.com/${accountId}/media?image_url=${encodeURIComponent(config.imageUrl)}&caption=${encodeURIComponent(config.text)}&access_token=${accessToken}`
      : `https://graph.instagram.com/${accountId}/media?media_type=REELS&video_url=${encodeURIComponent(config.videoUrl!)}&caption=${encodeURIComponent(config.text)}&access_token=${accessToken}`;

    const containerRes = await fetch(containerUrl, { method: 'POST' });
    const containerData = await containerRes.json();

    if (!containerData.id) {
      throw new Error('Erro ao criar container de mídia');
    }

    // Publicar mídia
    const publishUrl = `https://graph.instagram.com/${accountId}/media_publish?creation_id=${containerData.id}&access_token=${accessToken}`;
    const publishRes = await fetch(publishUrl, { method: 'POST' });
    const publishData = await publishRes.json();

    if (!publishData.id) {
      throw new Error('Erro ao publicar no Instagram');
    }

    return {
      success: true,
      platform: 'instagram',
      postId: publishData.id,
      url: `https://www.instagram.com/p/${publishData.id}/`,
    };
  } catch (error) {
    return {
      success: false,
      platform: 'instagram',
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Reposta no YouTube
 * Nota: YouTube requer upload de vídeo completo, não apenas post
 * Por enquanto, retorna erro (requer implementação mais complexa)
 */
async function repostToYouTube(config: RepostConfig): Promise<RepostResult> {
  // YouTube não suporta "repost" simples
  // Requer upload de vídeo completo via YouTube Data API
  // Implementar depois se necessário

  return {
    success: false,
    platform: 'youtube',
    error: 'YouTube requer upload de vídeo completo (não implementado ainda)',
  };
}

/**
 * Reposta no LinkedIn
 * Requer: LinkedIn API + Access Token
 */
async function repostToLinkedIn(config: RepostConfig): Promise<RepostResult> {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  const organizationId = process.env.LINKEDIN_ORGANIZATION_ID;

  if (!accessToken || !organizationId) {
    return {
      success: false,
      platform: 'linkedin',
      error: 'LinkedIn Access Token não configurado',
    };
  }

  try {
    // Criar post no LinkedIn
    const postUrl = `https://api.linkedin.com/v2/ugcPosts`;
    
    const postData = {
      author: `urn:li:organization:${organizationId}`,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: config.text,
          },
          shareMediaCategory: config.imageUrl ? 'IMAGE' : 'ARTICLE',
          media: config.imageUrl ? [{
            status: 'READY',
            media: config.imageUrl,
            title: {
              text: config.text.substring(0, 200),
            },
          }] : [],
        },
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
      },
    };

    const response = await fetch(postUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Erro ao postar no LinkedIn: ${error}`);
    }

    const data = await response.json();

    return {
      success: true,
      platform: 'linkedin',
      postId: data.id,
      url: `https://www.linkedin.com/feed/update/${data.id}`,
    };
  } catch (error) {
    return {
      success: false,
      platform: 'linkedin',
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Reposta no Vimeo
 * Nota: Vimeo é principalmente para vídeos, não posts
 */
async function repostToVimeo(config: RepostConfig): Promise<RepostResult> {
  // Vimeo é principalmente para upload de vídeos
  // Não suporta "posts" como Instagram/LinkedIn
  // Implementar depois se necessário

  return {
    success: false,
    platform: 'vimeo',
    error: 'Vimeo requer upload de vídeo completo (não implementado ainda)',
  };
}
