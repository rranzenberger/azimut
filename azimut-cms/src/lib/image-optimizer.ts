import sharp from 'sharp';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

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
  
  // Caminho local para salvar (public/uploads)
  const uploadDir = join(process.cwd(), 'public', 'uploads', baseFolder);
  await mkdir(uploadDir, { recursive: true });

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

  // Salvar original
  const originalPath = join(uploadDir, `original.${metadata.format}`);
  await writeFile(originalPath, file);
  urls.original = `/uploads/${baseFolder}/original.${metadata.format}`;

  // Gerar e salvar as versões
  for (const version of versions) {
    // JPEG otimizado
    const jpegBuffer = await image
      .clone()
      .resize(version.width, null, { withoutEnlargement: true })
      .jpeg({ quality: version.quality, progressive: true })
      .toBuffer();

    const jpegPath = join(uploadDir, `${version.name}.jpg`);
    await writeFile(jpegPath, jpegBuffer);
    urls[version.name] = `/uploads/${baseFolder}/${version.name}.jpg`;

    // WebP
    const webpBuffer = await image
      .clone()
      .resize(version.width, null, { withoutEnlargement: true })
      .webp({ quality: version.quality - 10 })
      .toBuffer();

    const webpPath = join(uploadDir, `${version.name}.webp`);
    await writeFile(webpPath, webpBuffer);
    
    if (version.name === 'large') {
      urls.webp = `/uploads/${baseFolder}/${version.name}.webp`;
    }

    // AVIF (apenas para large)
    if (version.name === 'large') {
      try {
        const avifBuffer = await image
          .clone()
          .resize(version.width, null, { withoutEnlargement: true })
          .avif({ quality: version.quality - 20 })
          .toBuffer();

        const avifPath = join(uploadDir, 'large.avif');
        await writeFile(avifPath, avifBuffer);
        urls.avif = `/uploads/${baseFolder}/large.avif`;
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
