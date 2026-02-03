/**
 * Converte imagens PNG pesadas para WebP (melhor compressão)
 * Execução: node scripts/convert-to-webp.mjs
 */
import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, basename, extname } from 'path';

const PUBLIC_DIR = './public';

const IMAGES_TO_CONVERT = [
  'pattern-azimut.png',
  'fundo grao.png',
  'empaty-engine.png'
];

async function convertToWebP(inputPath, quality = 80) {
  const outputPath = inputPath.replace(/\.png$/i, '.webp');
  const name = basename(inputPath);

  try {
    const inputStats = await stat(inputPath);
    const inputSizeKB = Math.round(inputStats.size / 1024);

    await sharp(inputPath)
      .webp({ quality, effort: 6 })
      .toFile(outputPath);

    const outputStats = await stat(outputPath);
    const outputSizeKB = Math.round(outputStats.size / 1024);
    const savings = Math.round((1 - outputSizeKB / inputSizeKB) * 100);

    console.log(`✅ ${name}: ${inputSizeKB} KB → ${outputSizeKB} KB (${savings}% menor)`);
    return { name, inputSizeKB, outputSizeKB, savings };
  } catch (err) {
    console.error(`❌ Erro em ${name}:`, err.message);
    return null;
  }
}

async function main() {
  console.log('🖼️  Convertendo imagens para WebP...\n');

  const results = [];
  for (const img of IMAGES_TO_CONVERT) {
    const inputPath = join(PUBLIC_DIR, img);
    const result = await convertToWebP(inputPath);
    if (result) results.push(result);
  }

  console.log('\n📊 Resumo:');
  const totalSaved = results.reduce((acc, r) => acc + (r.inputSizeKB - r.outputSizeKB), 0);
  console.log(`   Total economizado: ${totalSaved} KB (${Math.round(totalSaved / 1024 * 100) / 100} MB)`);
}

main();
