import sharp from 'sharp';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface OptimizeOptions {
  file: Buffer;
  filename: string;
  folder?: string;
}

type OptimizedUrlKey = 'original' | 'thumbnail' | 'small' | 'medium' | 'large' | 'webp';

type OptimizedUrls = Record<OptimizedUrlKey, string> & { avif?: string };

export async function optimizeAndUploadImage({
  file,
  filename,
  folder = 'projects',
}: OptimizeOptions): Promise<OptimizedUrls> {
  const timestamp = Date.now();
  const baseName = filename.replace(/\.[^/.]+$/, '');
  const baseFolder = `${folder}/${timestamp}-${baseName}`;

  // Obter metadata da imagem original
  const image = sharp(file);
  const metadata = await image.metadata();

  // Gerar versões otimizadas
  const versions: Array<{ name: OptimizedUrlKey; width: number; quality: number }> = [
    { name: 'thumbnail', width: 200, quality: 80 },
    { name: 'small', width: 640, quality: 85 },
    { name: 'medium', width: 1024, quality: 85 },
    { name: 'large', width: 1920, quality: 90 },
  ];

  const urls: OptimizedUrls = {
    original: '',
    thumbnail: '',
    small: '',
    medium: '',
    large: '',
    webp: '',
    avif: undefined,
  };

  // Upload original
  const { data: originalData, error: originalError} = await supabase.storage
    .from('media')
    .upload(`${baseFolder}/original.${metadata.format}`, file, {
      contentType: `image/${metadata.format}`,
      cacheControl: '31536000',
    });

  if (originalError) throw originalError;
  urls.original = supabase.storage.from('media').getPublicUrl(originalData.path).data.publicUrl;

  // Gerar e fazer upload das versões
  for (const version of versions) {
    // JPEG otimizado
    const jpegBuffer = await image
      .clone()
      .resize(version.width, null, { withoutEnlargement: true })
      .jpeg({ quality: version.quality, progressive: true })
      .toBuffer();

    const { data: jpegData } = await supabase.storage
      .from('media')
      .upload(`${baseFolder}/${version.name}.jpg`, jpegBuffer, {
        contentType: 'image/jpeg',
        cacheControl: '31536000',
      });

    if (jpegData) {
      const publicUrl = supabase.storage.from('media').getPublicUrl(jpegData.path).data.publicUrl;
      if (version.name === 'thumbnail') urls.thumbnail = publicUrl;
      else if (version.name === 'small') urls.small = publicUrl;
      else if (version.name === 'medium') urls.medium = publicUrl;
      else if (version.name === 'large') urls.large = publicUrl;
    }

    // WebP
    const webpBuffer = await image
      .clone()
      .resize(version.width, null, { withoutEnlargement: true })
      .webp({ quality: version.quality - 10 })
      .toBuffer();

    const { data: webpData } = await supabase.storage
      .from('media')
      .upload(`${baseFolder}/${version.name}.webp`, webpBuffer, {
        contentType: 'image/webp',
        cacheControl: '31536000',
      });

    if (version.name === 'large' && webpData) {
      urls.webp = supabase.storage.from('media').getPublicUrl(webpData.path).data.publicUrl;
    }

    // AVIF (apenas para large)
    if (version.name === 'large') {
      try {
        const avifBuffer = await image
          .clone()
          .resize(version.width, null, { withoutEnlargement: true })
          .avif({ quality: version.quality - 20 })
          .toBuffer();

        const { data: avifData } = await supabase.storage
          .from('media')
          .upload(`${baseFolder}/large.avif`, avifBuffer, {
            contentType: 'image/avif',
            cacheControl: '31536000',
          });

        if (avifData) {
          urls.avif = supabase.storage.from('media').getPublicUrl(avifData.path).data.publicUrl;
        }
      } catch (error) {
        console.warn('AVIF generation failed:', error);
      }
    }
  }

  return urls;
}

// Extrair cores dominantes
export async function extractDominantColors(buffer: Buffer): Promise<string[]> {
  const { dominant } = await sharp(buffer).stats();
  
  const toHex = (r: number, g: number, b: number) =>
    `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;

  return [toHex(dominant.r, dominant.g, dominant.b)];
}












