import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { type Lang } from '../i18n'
import SEO from '../components/SEO'
import { ApiService } from '../services/api'

interface GigRadarProps {
  lang: Lang
}

// Beta fechado: quem se cadastra recebe o link do APK + código de liberação pelo WhatsApp.
// (Download não é público — o gate é o cadastro. Grupo/APK chegam na resposta do WhatsApp.)
const WHATSAPP = '5548999701301'

const content = {
  pt: {
    seoTitle: 'GigRadar Beta — o radar de corridas que valem a pena | Azimut',
    seoDesc: 'App para motoristas de aplicativo: lê a oferta da Uber/99 e diz na hora, por cor e por voz, se a corrida paga o seu custo. Teste beta fechado — inscreva-se.',
    badge: '🚧 BETA FECHADO — por convite',
    hero: 'GigRadar',
    sub: 'O radar de corridas que valem a pena. Seu copiloto lê a oferta da Uber/99 na tela e te diz, por cor e por voz, se a corrida paga o seu custo — antes de você aceitar.',
    madeBy: 'Feito por motorista, pra motorista. Um produto Azimut.',
    featTitle: 'O que o app faz',
    feats: [
      ['🟢🟡🔴', 'Veredito instantâneo em cima da oferta (Uber e 99)'],
      ['🗣️', 'Voz: "Aceita. 16 reais e 25. Dois ponto um."'],
      ['📷', 'Alerta de radar de velocidade por voz — a Uber não mostra, nós sim'],
      ['🗺️', 'Zonas a evitar desenhadas por você + morro, servidão e alagamento na chuva'],
      ['🏠', 'Modo Casa: volte pra casa sendo pago'],
      ['📈', 'Financeiro local: lucro real por período — seus dados ficam SÓ no seu telefone'],
    ],
    rulesTitle: 'Regras do beta (leia antes de entrar)',
    rules: [
      'O GigRadar está em fase de testes: pode apresentar erros, leituras incorretas e mudanças sem aviso. Não tome decisões financeiras baseadas só no app.',
      'O acesso é pessoal e intransferível — não repasse o APK nem o código de liberação.',
      'A licença de teste dura 30 dias. Depois o app bloqueia totalmente — peça um novo código grátis pelo WhatsApp enquanto o beta durar.',
      'Pedimos de coração: reporte bugs e sugestões. É isso que faz o app melhorar pra todos.',
      'O app NÃO faz login na Uber/99 e não altera nada — apenas lê a tela para te informar. O uso é por sua conta e risco.',
      'Dirija com atenção. Nunca mexa no telefone com o carro em movimento.',
    ],
    stepsTitle: 'Como funciona a instalação',
    steps: [
      'Cadastre-se abaixo — te chamamos no WhatsApp com o link do APK e seu código de liberação.',
      'Baixe e toque em Instalar (o Android avisa que é fora da Play Store — normal em beta fechado).',
      'Abra o app e siga o assistente: 3 permissões (Acessibilidade, Sobrepor, Localização).',
      'Digite seu código em 💎 e roda — o selo aparece sozinho na primeira oferta. 🎉',
    ],
    privacyTitle: 'Privacidade (resumo honesto)',
    privacy: 'No site coletamos só nome, WhatsApp, e-mail e cidade — pra gerenciar o beta e falar com você. O app não envia NADA pra fora do telefone: corridas, ganhos, zonas e configurações ficam somente no seu aparelho (sem servidor, sem conta, sem rastreamento). Pra excluir seu cadastro, é só pedir.',
    formTitle: 'Quero testar o GigRadar',
    namePh: 'Seu nome',
    whatsPh: 'Seu WhatsApp (com DDD)',
    emailPh: 'Seu e-mail',
    cityPh: 'Cidade / UF',
    appPh: 'App que você dirige',
    appOptions: ['Uber', '99', 'Uber e 99', 'Outro / entregas'],
    phonePh: 'Modelo do celular (opcional)',
    accept: 'Li e aceito as regras do beta e a política de privacidade.',
    cta: 'Entrar no beta',
    sentTitle: '✅ Recebido! Valeu por entrar no ecossistema GigRadar 💚',
    sentMsg: 'Você está ajudando a construir a ferramenta que protege o bolso de quem roda. Te chamamos no WhatsApp com o link do APK, seu código de liberação e o convite do grupo dos testadores. Quer agilizar?',
    sentBtn: '📱 Chamar no WhatsApp agora',
    back: 'Voltar',
  },
  en: {
    seoTitle: 'GigRadar Beta — the radar for rides worth taking | Azimut',
    seoDesc: 'App for rideshare drivers: reads the Uber/99 offer on screen and tells you instantly, by color and voice, if the ride covers your cost. Closed beta — sign up.',
    badge: '🚧 CLOSED BETA — invite only',
    hero: 'GigRadar',
    sub: 'The radar for rides worth taking. Your copilot reads the Uber/99 offer on screen and tells you, by color and voice, if the ride pays your cost — before you accept.',
    madeBy: 'Built by a driver, for drivers. An Azimut product.',
    featTitle: 'What the app does',
    feats: [
      ['🟢🟡🔴', 'Instant verdict on top of the offer (Uber and 99)'],
      ['🗣️', 'Voice: "Accept. 16 reais and 25. Two point one."'],
      ['📷', 'Speed camera alerts by voice — Uber doesn\'t show them, we do'],
      ['🗺️', 'Avoid-zones you draw + hills, alleys and flood risk in the rain'],
      ['🏠', 'Home Mode: get paid to head home'],
      ['📈', 'Local finance: real profit per period — your data stays ONLY on your phone'],
    ],
    rulesTitle: 'Beta rules (read before joining)',
    rules: [
      'GigRadar is in testing: it may show errors, misreads and unannounced changes. Don\'t make financial decisions based on the app alone.',
      'Access is personal and non-transferable — don\'t share the APK or your unlock code.',
      'The test license lasts 30 days. After that the app locks completely — request a new free code on WhatsApp while the beta lasts.',
      'We sincerely ask: report bugs and suggestions. That\'s what makes the app better for everyone.',
      'The app does NOT log into Uber/99 and changes nothing — it only reads the screen to inform you. Use at your own risk.',
      'Drive safely. Never touch the phone while the car is moving.',
    ],
    stepsTitle: 'How installation works',
    steps: [
      'Sign up below — we\'ll message you on WhatsApp with the APK link and your unlock code.',
      'Download and tap Install (Android warns it\'s outside the Play Store — normal for a closed beta).',
      'Open the app and follow the wizard: 3 permissions (Accessibility, Overlay, Location).',
      'Enter your code in 💎 and drive — the badge shows up on the first offer. 🎉',
    ],
    privacyTitle: 'Privacy (honest summary)',
    privacy: 'On this site we only collect name, WhatsApp, e-mail and city — to run the beta and talk to you. The app sends NOTHING off your phone: rides, earnings, zones and settings stay on your device only (no server, no account, no tracking). To delete your registration, just ask.',
    formTitle: 'I want to test GigRadar',
    namePh: 'Your name',
    whatsPh: 'Your WhatsApp',
    emailPh: 'Your e-mail',
    cityPh: 'City / State',
    appPh: 'App you drive for',
    appOptions: ['Uber', '99', 'Uber and 99', 'Other / delivery'],
    phonePh: 'Phone model (optional)',
    accept: 'I\'ve read and accept the beta rules and privacy policy.',
    cta: 'Join the beta',
    sentTitle: '✅ Received! Thanks for joining the GigRadar ecosystem 💚',
    sentMsg: 'You\'re helping build the tool that protects drivers\' pockets. We\'ll message you on WhatsApp with the APK link, your unlock code and the testers group invite. Want to speed it up?',
    sentBtn: '📱 Message us on WhatsApp now',
    back: 'Back',
  },
  es: {
    seoTitle: 'GigRadar Beta — el radar de viajes que valen la pena | Azimut',
    seoDesc: 'App para conductores: lee la oferta de Uber/99 en pantalla y te dice al instante, por color y voz, si el viaje cubre tu costo. Beta cerrada — inscríbete.',
    badge: '🚧 BETA CERRADA — por invitación',
    hero: 'GigRadar',
    sub: 'El radar de viajes que valen la pena. Tu copiloto lee la oferta de Uber/99 en pantalla y te dice, por color y voz, si el viaje paga tu costo — antes de aceptar.',
    madeBy: 'Hecho por un conductor, para conductores. Un producto Azimut.',
    featTitle: 'Qué hace la app',
    feats: [
      ['🟢🟡🔴', 'Veredicto instantáneo sobre la oferta (Uber y 99)'],
      ['🗣️', 'Voz: "Acepta. 16 reales con 25. Dos punto uno."'],
      ['📷', 'Alertas de radar de velocidad por voz — Uber no los muestra, nosotros sí'],
      ['🗺️', 'Zonas a evitar dibujadas por ti + cerros, callejones e inundación con lluvia'],
      ['🏠', 'Modo Casa: vuelve a casa cobrando'],
      ['📈', 'Finanzas locales: ganancia real por período — tus datos quedan SOLO en tu teléfono'],
    ],
    rulesTitle: 'Reglas de la beta (lee antes de entrar)',
    rules: [
      'GigRadar está en pruebas: puede mostrar errores, lecturas incorrectas y cambios sin aviso. No tomes decisiones financieras solo por la app.',
      'El acceso es personal e intransferible — no compartas el APK ni tu código.',
      'La licencia de prueba dura 30 días. Después la app se bloquea por completo — pide un código nuevo gratis por WhatsApp mientras dure la beta.',
      'Te pedimos de corazón: reporta bugs y sugerencias. Eso hace la app mejor para todos.',
      'La app NO inicia sesión en Uber/99 y no altera nada — solo lee la pantalla para informarte. El uso es bajo tu responsabilidad.',
      'Conduce con atención. Nunca toques el teléfono con el auto en movimiento.',
    ],
    stepsTitle: 'Cómo funciona la instalación',
    steps: [
      'Regístrate abajo — te escribimos por WhatsApp con el link del APK y tu código.',
      'Descarga y toca Instalar (Android avisa que es fuera de Play Store — normal en beta cerrada).',
      'Abre la app y sigue el asistente: 3 permisos (Accesibilidad, Superposición, Ubicación).',
      'Escribe tu código en 💎 y a rodar — el sello aparece solo en la primera oferta. 🎉',
    ],
    privacyTitle: 'Privacidad (resumen honesto)',
    privacy: 'En el sitio solo recolectamos nombre, WhatsApp, e-mail y ciudad — para gestionar la beta y hablar contigo. La app no envía NADA fuera del teléfono: viajes, ganancias, zonas y ajustes quedan solo en tu dispositivo (sin servidor, sin cuenta, sin rastreo). Para borrar tu registro, solo pídelo.',
    formTitle: 'Quiero probar GigRadar',
    namePh: 'Tu nombre',
    whatsPh: 'Tu WhatsApp',
    emailPh: 'Tu e-mail',
    cityPh: 'Ciudad / Estado',
    appPh: 'App que manejas',
    appOptions: ['Uber', '99', 'Uber y 99', 'Otra / entregas'],
    phonePh: 'Modelo del teléfono (opcional)',
    accept: 'Leí y acepto las reglas de la beta y la política de privacidad.',
    cta: 'Entrar a la beta',
    sentTitle: '✅ ¡Recibido! Gracias por entrar al ecosistema GigRadar 💚',
    sentMsg: 'Estás ayudando a construir la herramienta que protege el bolsillo de quien maneja. Te escribimos por WhatsApp con el APK, tu código y la invitación al grupo. ¿Quieres agilizar?',
    sentBtn: '📱 Escribir por WhatsApp ahora',
    back: 'Volver',
  },
  fr: {
    seoTitle: 'GigRadar Beta — le radar des courses qui valent la peine | Azimut',
    seoDesc: 'App pour chauffeurs : lit l\'offre Uber/99 à l\'écran et vous dit instantanément, par couleur et par voix, si la course couvre vos coûts. Bêta fermée — inscrivez-vous.',
    badge: '🚧 BÊTA FERMÉE — sur invitation',
    hero: 'GigRadar',
    sub: 'Le radar des courses qui valent la peine. Votre copilote lit l\'offre Uber/99 à l\'écran et vous dit, par couleur et par voix, si la course paie vos coûts — avant d\'accepter.',
    madeBy: 'Créé par un chauffeur, pour les chauffeurs. Un produit Azimut.',
    featTitle: 'Ce que fait l\'app',
    feats: [
      ['🟢🟡🔴', 'Verdict instantané sur l\'offre (Uber et 99)'],
      ['🗣️', 'Voix : « Accepte. 16 réaux 25. Deux virgule un. »'],
      ['📷', 'Alertes radar de vitesse par la voix — Uber ne les montre pas, nous oui'],
      ['🗺️', 'Zones à éviter dessinées par vous + collines, ruelles et inondations sous la pluie'],
      ['🏠', 'Mode Maison : rentrez chez vous en étant payé'],
      ['📈', 'Finances locales : profit réel par période — vos données restent SUR votre téléphone'],
    ],
    rulesTitle: 'Règles de la bêta',
    rules: [
      'GigRadar est en phase de test : erreurs, lectures incorrectes et changements sans préavis possibles. Ne prenez pas de décisions financières sur la seule base de l\'app.',
      'L\'accès est personnel et non transférable — ne partagez ni l\'APK ni votre code.',
      'La licence de test dure 30 jours. Ensuite l\'app se verrouille totalement — demandez un nouveau code gratuit sur WhatsApp pendant la bêta.',
      'Nous vous le demandons sincèrement : signalez bugs et suggestions.',
      'L\'app ne se connecte PAS à Uber/99 et ne modifie rien — elle lit seulement l\'écran. Utilisation à vos risques.',
      'Conduisez prudemment. Ne touchez jamais le téléphone en roulant.',
    ],
    stepsTitle: 'Installation',
    steps: [
      'Inscrivez-vous ci-dessous — nous vous écrivons sur WhatsApp avec le lien APK et votre code.',
      'Téléchargez et appuyez sur Installer (Android signale que c\'est hors Play Store — normal en bêta fermée).',
      'Ouvrez l\'app et suivez l\'assistant : 3 permissions (Accessibilité, Superposition, Localisation).',
      'Entrez votre code dans 💎 et roulez — le badge apparaît dès la première offre. 🎉',
    ],
    privacyTitle: 'Confidentialité (résumé honnête)',
    privacy: 'Sur ce site nous ne collectons que nom, WhatsApp, e-mail et ville — pour gérer la bêta. L\'app n\'envoie RIEN hors du téléphone : courses, gains, zones et réglages restent sur votre appareil (pas de serveur, pas de compte, pas de traçage). Pour supprimer votre inscription, demandez-le simplement.',
    formTitle: 'Je veux tester GigRadar',
    namePh: 'Votre nom',
    whatsPh: 'Votre WhatsApp',
    emailPh: 'Votre e-mail',
    cityPh: 'Ville / région',
    appPh: 'App que vous conduisez',
    appOptions: ['Uber', '99', 'Uber et 99', 'Autre / livraison'],
    phonePh: 'Modèle du téléphone (optionnel)',
    accept: 'J\'ai lu et j\'accepte les règles de la bêta et la politique de confidentialité.',
    cta: 'Rejoindre la bêta',
    sentTitle: '✅ Reçu ! Merci de rejoindre l\'écosystème GigRadar 💚',
    sentMsg: 'Nous vous écrivons sur WhatsApp avec le lien APK, votre code et l\'invitation au groupe des testeurs. Envie d\'accélérer ?',
    sentBtn: '📱 Écrire sur WhatsApp maintenant',
    back: 'Retour',
  },
} as const

const GigRadar: React.FC<GigRadarProps> = ({ lang }) => {
  const t = content[lang] ?? content.pt
  const [formData, setFormData] = useState({ name: '', whatsapp: '', email: '', city: '', app: '', phone: '' })
  const [accepted, setAccepted] = useState(false)
  const [sent, setSent] = useState(false)

  const waLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    `Quero testar o GigRadar! Nome: ${formData.name || '—'} · Cidade: ${formData.city || '—'} · App: ${formData.app || '—'}`
  )}`

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!accepted) return
    try {
      await ApiService.submitLead({
        name: formData.name,
        email: formData.email,
        phone: formData.whatsapp,
        leadType: 'gigradar-beta',
        source: 'gigradar-page',
        lang,
        interest: formData.app,
        message: `GigRadar BETA\nWhatsApp: ${formData.whatsapp}\nCidade: ${formData.city}\nApp: ${formData.app}\nCelular: ${formData.phone || '—'}`,
      })
    } catch {}
    setSent(true)
  }

  return (
    <>
      <SEO title={t.seoTitle} description={t.seoDesc} />
      <main className="min-h-screen pt-28 pb-24 px-4">
        <div className="mx-auto max-w-4xl">

          {/* Hero */}
          <div className="mb-14 text-center">
            <p className="mb-4 inline-block rounded-full border border-azimut-red/40 bg-azimut-red/10 px-4 py-1 text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--theme-text)' }}>
              {t.badge}
            </p>
            <h1 className="mb-5 font-handel text-5xl md:text-7xl uppercase tracking-[0.1em]" style={{ color: 'var(--theme-text)' }}>
              {t.hero}
            </h1>
            <p className="mx-auto max-w-2xl text-lg md:text-xl leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
              {t.sub}
            </p>
            <p className="mt-4 text-sm" style={{ color: 'var(--theme-text-secondary)' }}>{t.madeBy}</p>
          </div>

          {/* Features */}
          <section className="mb-16">
            <h2 className="mb-8 font-handel text-2xl md:text-3xl uppercase tracking-[0.1em] text-center" style={{ color: 'var(--theme-text)' }}>
              {t.featTitle}
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {t.feats.map(([icon, txt], i) => (
                <li key={i} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <span className="text-xl shrink-0">{icon}</span>
                  <span className="text-sm leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>{txt}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Como instala */}
          <section className="mb-16">
            <h2 className="mb-8 font-handel text-2xl md:text-3xl uppercase tracking-[0.1em] text-center" style={{ color: 'var(--theme-text)' }}>
              {t.stepsTitle}
            </h2>
            <ol className="mx-auto max-w-2xl space-y-3">
              {t.steps.map((s, i) => (
                <li key={i} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-azimut-red font-bold text-white text-sm">{i + 1}</span>
                  <span className="text-sm leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>{s}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* Regras */}
          <section className="mb-16">
            <h2 className="mb-8 font-handel text-2xl md:text-3xl uppercase tracking-[0.1em] text-center" style={{ color: 'var(--theme-text)' }}>
              {t.rulesTitle}
            </h2>
            <ul className="mx-auto max-w-2xl space-y-2">
              {t.rules.map((r, i) => (
                <li key={i} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
                  <span className="mt-0.5 shrink-0 text-azimut-red font-bold">{i + 1}.</span>
                  {r}
                </li>
              ))}
            </ul>
          </section>

          {/* Privacidade */}
          <section className="mb-16 mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="mb-3 font-handel text-lg uppercase tracking-[0.1em]" style={{ color: 'var(--theme-text)' }}>
              🔒 {t.privacyTitle}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>{t.privacy}</p>
          </section>

          {/* Formulário */}
          <section className="mx-auto max-w-2xl">
            <h2 className="mb-8 font-handel text-2xl md:text-3xl uppercase tracking-[0.1em] text-center" style={{ color: 'var(--theme-text)' }}>
              {t.formTitle}
            </h2>

            {sent ? (
              <div className="rounded-2xl border border-azimut-red/30 bg-azimut-red/10 p-8 text-center">
                <p className="mb-3 text-lg font-semibold" style={{ color: 'var(--theme-text)' }}>{t.sentTitle}</p>
                <p className="mb-6 text-sm leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>{t.sentMsg}</p>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-xl bg-azimut-red px-6 py-3 font-handel text-sm uppercase tracking-[0.15em] text-white hover:bg-azimut-red/90 transition-colors"
                >
                  {t.sentBtn}
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { key: 'name', ph: t.namePh, type: 'text', req: true },
                  { key: 'whatsapp', ph: t.whatsPh, type: 'tel', req: true },
                  { key: 'email', ph: t.emailPh, type: 'email', req: true },
                  { key: 'city', ph: t.cityPh, type: 'text', req: true },
                  { key: 'phone', ph: t.phonePh, type: 'text', req: false },
                ].map(({ key, ph, type, req }) => (
                  <input
                    key={key}
                    type={type}
                    required={req}
                    placeholder={ph}
                    value={(formData as any)[key]}
                    onChange={e => setFormData(p => ({ ...p, [key]: e.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-azimut-red/60 transition-colors"
                    style={{ color: 'var(--theme-text)' }}
                  />
                ))}
                <select
                  required
                  value={formData.app}
                  onChange={e => setFormData(p => ({ ...p, app: e.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-azimut-red/60 transition-colors"
                  style={{ color: 'var(--theme-text)' }}
                >
                  <option value="" disabled>{t.appPh}</option>
                  {t.appOptions.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                <label className="flex items-start gap-3 text-sm cursor-pointer" style={{ color: 'var(--theme-text-secondary)' }}>
                  <input
                    type="checkbox"
                    required
                    checked={accepted}
                    onChange={e => setAccepted(e.target.checked)}
                    className="mt-1 accent-[#C92337]"
                  />
                  {t.accept}
                </label>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-azimut-red px-6 py-4 font-handel text-sm uppercase tracking-[0.15em] text-white hover:bg-azimut-red/90 transition-colors"
                >
                  {t.cta}
                </button>
              </form>
            )}

            <div className="mt-8 text-center">
              <Link to={`/${lang}`} className="text-sm hover:text-azimut-red transition-colors" style={{ color: 'var(--theme-text-secondary)' }}>
                ← {t.back}
              </Link>
            </div>
          </section>

        </div>
      </main>
    </>
  )
}

export default GigRadar
