// ════════════════════════════════════════════════════════════
// Serviço: Download de Mídias (Instagram, YouTube, etc.)
// ════════════════════════════════════════════════════════════

import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export interface DownloadedMedia {
  url: string;
  type: 'image' | 'video';
  filename: string;
  path: string;
  size: number;
  mimeType: string;
}

/**
 * Baixa uma imagem/vídeo de uma URL
 */
export async function downloadMedia(
  url: string,
  outputDir?: string
): Promise<DownloadedMedia> {
  // Definir diretório padrão se não fornecido
  const finalOutputDir = outputDir || join(process.cwd(), 'public', 'uploads', 'media');
  try {
    // Criar diretório se não existir
    if (!existsSync(finalOutputDir)) {
      await mkdir(finalOutputDir, { recursive: true });
    }

    // Detectar tipo de mídia pela URL
    const isVideo = url.includes('video') || url.includes('.mp4') || url.includes('.webm');
    const isImage = url.includes('image') || url.includes('.jpg') || url.includes('.png') || url.includes('.webp');

    // Fazer download
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao baixar mídia: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    const arrayBuffer = Buffer.from(buffer);

    // Detectar tipo MIME
    const contentType = response.headers.get('content-type') || 
      (isVideo ? 'video/mp4' : 'image/jpeg');

    // Gerar nome do arquivo
    const extension = getExtensionFromMimeType(contentType);
    const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.${extension}`;
    const filepath = join(finalOutputDir, filename);

    // Salvar arquivo
    await writeFile(filepath, arrayBuffer);

    return {
      url: `/uploads/media/${filename}`, // URL relativa para acesso público
      type: isVideo ? 'video' : 'image',
      filename,
      path: filepath,
      size: arrayBuffer.length,
      mimeType: contentType,
    };
  } catch (error) {
    console.error('Erro ao baixar mídia:', error);
    throw error;
  }
}

/**
 * Baixa mídia do Instagram (imagem ou vídeo)
 */
export async function downloadInstagramMedia(
  postUrl: string,
  outputDir?: string
): Promise<DownloadedMedia | null> {
  try {
    // Extrair shortcode do post
    const shortcodeMatch = postUrl.match(/instagram\.com\/p\/([^/?]+)/);
    if (!shortcodeMatch) {
      throw new Error('URL do Instagram inválida');
    }

    const shortcode = shortcodeMatch[1];

    // Buscar dados do post (via scraping ou API)
    const response = await fetch(`https://www.instagram.com/p/${shortcode}/`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao acessar post do Instagram');
    }

    const html = await response.text();

    // Extrair URL da mídia do JSON embutido
    const jsonMatch = html.match(/window\._sharedData\s*=\s*({.+?});/);
    if (!jsonMatch) {
      throw new Error('Não foi possível extrair dados do Instagram');
    }

    const data = JSON.parse(jsonMatch[1]);
    const post = data?.entry_data?.PostPage?.[0]?.graphql?.shortcode_media;

    if (!post) {
      throw new Error('Post não encontrado');
    }

    // Determinar se é vídeo ou imagem
    const isVideo = post.is_video;
    const mediaUrl = isVideo 
      ? post.video_url 
      : post.display_url || post.display_resources?.[post.display_resources.length - 1]?.src;

    if (!mediaUrl) {
      throw new Error('URL da mídia não encontrada');
    }

    // Baixar mídia
    return await downloadMedia(mediaUrl, outputDir);
  } catch (error) {
    console.error('Erro ao baixar mídia do Instagram:', error);
    return null;
  }
}

/**
 * Baixa vídeo do YouTube
 */
export async function downloadYouTubeVideo(
  videoUrl: string,
  outputDir?: string
): Promise<DownloadedMedia | null> {
  try {
    // Extrair ID do vídeo
    const videoIdMatch = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?]+)/);
    if (!videoIdMatch) {
      throw new Error('URL do YouTube inválida');
    }

    const videoId = videoIdMatch[1];

    // Usar API do YouTube para obter thumbnail (vídeo completo requer yt-dlp)
    // Por enquanto, baixamos o thumbnail em alta resolução
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    return await downloadMedia(thumbnailUrl, outputDir);
  } catch (error) {
    console.error('Erro ao baixar vídeo do YouTube:', error);
    return null;
  }
}

/**
 * Baixa mídia de qualquer URL (detecta automaticamente)
 */
export async function downloadMediaFromUrl(
  url: string,
  outputDir?: string
): Promise<DownloadedMedia | null> {
  if (url.includes('instagram.com')) {
    return await downloadInstagramMedia(url, outputDir);
  } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return await downloadYouTubeVideo(url, outputDir);
  } else {
    // URL genérica (imagem direta)
    return await downloadMedia(url, outputDir);
  }
}

/**
 * Obtém extensão do arquivo baseado no MIME type
 */
function getExtensionFromMimeType(mimeType: string): string {
  const mimeMap: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
    'video/mp4': 'mp4',
    'video/webm': 'webm',
    'video/quicktime': 'mov',
  };

  return mimeMap[mimeType] || 'jpg';
}
