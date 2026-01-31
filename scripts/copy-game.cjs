/**
 * Copia o build do Empathy Engine (azimut-empathy-engine/dist) para public/{lang}/game
 * para ser servido em /pt/game/, /en/game/, etc. no site principal.
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
  const publicGameDir = path.join(publicDir, lang, 'game')
  if (fs.existsSync(publicGameDir)) {
    fs.rmSync(publicGameDir, { recursive: true })
  }
  fs.mkdirSync(publicGameDir, { recursive: true })
  fs.cpSync(distDir, publicGameDir, { recursive: true })
  console.log(`Build do jogo copiado para public/${lang}/game`)
}
