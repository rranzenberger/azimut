/**
 * Copia o build do Empathy Engine (azimut-empathy-engine/dist) para public/{lang}/play
 * para ser servido em /pt/play/, /en/play/, etc. (carregado no iframe pelo wrapper Game.tsx).
 * Usamos /play/ (e não /game/) para o jogo estático NÃO sombrear a rota React /:lang/game,
 * garantindo que o wrapper (loading + fallback de erro) seja usado.
 * Node 16+ (fs.cpSync). CommonJS para rodar com npm run.
 */

const fs = require('fs')
const path = require('path')

const distDir = path.join(__dirname, '..', 'azimut-empathy-engine', 'dist')
const publicDir = path.join(__dirname, '..', 'public')
const LANGS = ['pt', 'en', 'es', 'fr']

if (!fs.existsSync(distDir)) {
  console.error('Erro: azimut-empathy-engine/dist não encontrado. Rode "npm run build:game" antes.')
  process.exit(1)
}

for (const lang of LANGS) {
  const publicGameDir = path.join(publicDir, lang, 'play')
  if (fs.existsSync(publicGameDir)) {
    fs.rmSync(publicGameDir, { recursive: true })
  }
  fs.mkdirSync(publicGameDir, { recursive: true })
  fs.cpSync(distDir, publicGameDir, { recursive: true })
  console.log(`Build do jogo copiado para public/${lang}/play`)

  // Limpa cópia antiga em public/{lang}/game (era servida direta e sombreava a rota React)
  const legacyGameDir = path.join(publicDir, lang, 'game')
  if (fs.existsSync(legacyGameDir)) {
    fs.rmSync(legacyGameDir, { recursive: true })
    console.log(`Removida cópia antiga em public/${lang}/game`)
  }
}
