/**
 * Verifica HTTP das URLs em SERVICE_CARD_IMAGE_DEFAULTS (espelho de src/data/serviceCardImages.ts).
 * Executar: node scripts/check-service-card-images.mjs
 */

const CURATED = [
  'cinema-audiovisual',
  'pos-producao-vfx',
  'animacao-2d-3d',
  'xr-interatividade-web3',
  'cenografia-design-espacial',
  'games-interativos',
  'ia-criativa',
  'direcao-arte-criativa',
  'teatro-espetaculos-imersivos',
  'branded-experiences-ativacoes',
  'consultoria-estrategia',
  'educacao-treinamento',
]

const SERVICE_CARD_IMAGE_DEFAULTS = {
  'cinema-audiovisual': 'https://img.youtube.com/vi/1Pcoi_E9SXI/maxresdefault.jpg',
  'pos-producao-vfx': 'https://img.youtube.com/vi/Vm1s2cwHI-M/maxresdefault.jpg',
  'animacao-2d-3d': 'https://img.youtube.com/vi/y3uhoRpQPYY/maxresdefault.jpg',
  'xr-interatividade-web3': 'https://img.youtube.com/vi/Vm1s2cwHI-M/maxresdefault.jpg',
  'cenografia-design-espacial': '/images/service-cards/cenografia-design-espacial.png',
  'games-interativos': 'https://img.youtube.com/vi/KuzwrKRacG8/maxresdefault.jpg',
  'ia-criativa': 'https://img.youtube.com/vi/y3uhoRpQPYY/maxresdefault.jpg',
  'direcao-arte-criativa': 'https://img.youtube.com/vi/OFOy_z2sJag/maxresdefault.jpg',
  'teatro-espetaculos-imersivos': 'https://img.youtube.com/vi/BXC9j4oauQo/maxresdefault.jpg',
  'branded-experiences-ativacoes': 'https://img.youtube.com/vi/1Pcoi_E9SXI/maxresdefault.jpg',
  'consultoria-estrategia': 'https://img.youtube.com/vi/FWHN6qFf-tE/maxresdefault.jpg',
  'educacao-treinamento': 'https://img.youtube.com/vi/1DR6AuPBMxU/maxresdefault.jpg',
}

const EMERGENCY = 'https://img.youtube.com/vi/1Pcoi_E9SXI/hqdefault.jpg'

async function probe(label, url) {
  try {
    if (url.startsWith('/')) {
      const fs = await import('fs')
      const path = await import('path')
      const local = path.join(process.cwd(), 'public', url.replace(/^\//, ''))
      const exists = fs.existsSync(local)
      return {
        label,
        url,
        status: exists ? 200 : 404,
        ok: exists,
        ct: exists ? 'local/public' : 'missing-file',
      }
    }
    const r = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: { Range: 'bytes=0-2048' },
    })
    const ct = r.headers.get('content-type') || ''
    const ok = r.ok && (ct.includes('image') || ct.includes('octet-stream'))
    return { label, url, status: r.status, ok, ct: ct.slice(0, 40) }
  } catch (e) {
    return { label, url, status: 0, ok: false, error: String(e?.message || e) }
  }
}

async function main() {
  const missingKeys = CURATED.filter((s) => !SERVICE_CARD_IMAGE_DEFAULTS[s])
  const extraKeys = Object.keys(SERVICE_CARD_IMAGE_DEFAULTS).filter((s) => !CURATED.includes(s))

  console.log('=== Alinhamento curated ↔ defaults ===')
  if (missingKeys.length) console.log('FALTAM slugs no defaults:', missingKeys)
  else console.log('Todos os 12 slugs curados têm entrada.')
  if (extraKeys.length) console.log('Slugs extra no defaults (não usados na grelha):', extraKeys)

  console.log('\n=== GET (Range) por card ===')
  const rows = []
  for (const slug of CURATED) {
    const url = SERVICE_CARD_IMAGE_DEFAULTS[slug]
    rows.push(await probe(slug, url))
  }

  let failed = rows.filter((r) => !r.ok)
  for (const r of rows) {
    const flag = r.ok ? 'OK ' : 'BAD'
    console.log(`${flag} ${r.status} ${r.label}`)
    console.log(`    ${r.url}`)
    if (!r.ok) console.log(`    ${r.ct || r.error || ''}`)
  }

  console.log('\n=== Fallback emergência ===')
  const em = await probe('emergency', EMERGENCY)
  console.log(em.ok ? 'OK' : 'BAD', em.status, EMERGENCY)

  // maxres por vezes 404; verificar hq para os mesmos vídeos se falhar
  if (failed.length) {
    console.log('\n=== Reteste com hqdefault (mesmo vídeo) para falhas ===')
    for (const r of failed) {
      if (!r.url) continue
      const hq = r.url.replace('maxresdefault.jpg', 'hqdefault.jpg')
      const p = await probe(r.label + ' (hq)', hq)
      console.log(p.ok ? 'OK ' : 'BAD', p.status, p.label)
      console.log(`    ${hq}`)
    }
  }

  const anyBad =
    rows.some((r) => !r.ok) || !em.ok || failed.some((r) => r.error)
  process.exit(anyBad ? 1 : 0)
}

main()
