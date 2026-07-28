import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { type Lang } from '../i18n'
import SEO from '../components/SEO'
import { ApiService } from '../services/api'
import { useTheme } from '../contexts/ThemeContext'

interface GigRadarProps {
  lang: Lang
}

// Beta fechado: o gate é o cadastro, mas o download em si é instantâneo na página
// (o APK é publicado aqui automaticamente pelo CI do GigRadar a cada build — sempre a
// versão mais recente). O WhatsApp fica só pro código de liberação + grupo de testadores.
const WHATSAPP = '5548999701301'
const APK_URL = '/downloads/gigradar-latest.apk'
const APK_VERSION_URL = '/downloads/gigradar-version.json'
const GIGRADAR_ADMIN_URL = import.meta.env.VITE_GIGRADAR_ADMIN_URL || 'https://cms-gigradar.azmt.com.br'

const content = {
  pt: {
    seoTitle: 'GigRadar Beta — o radar de corridas que valem a pena | Azimut',
    seoDesc: 'App para motoristas de aplicativo: lê a oferta da Uber/99 e diz na hora, por cor e por voz, se a corrida paga o seu custo. Teste beta fechado — inscreva-se.',
    badge: '🚧 BETA FECHADO — por convite',
    hero: 'GigRadar',
    sub: 'O radar de corridas que valem a pena. Seu copiloto lê a oferta da Uber/99 na tela e te diz, por cor e por voz, se a corrida paga o seu custo — antes de você aceitar.',
    madeBy: 'Feito por motorista, pra motorista. Um produto Azimut.',
    positionTitle: 'Muito mais que um leitor de ofertas',
    positionIntro: 'O GigRadar está sendo construído como uma central de decisão para proteger o bolso, o carro e o trabalho do motorista. O Beta valida cada camada na rua antes do lançamento comercial.',
    pillars: [
      ['💰', 'Seu ganho real', 'Cruza valor, tempo, quilômetros e seus próprios custos para mostrar se o trabalho realmente compensa.'],
      ['🚗', 'Seu carro protegido', 'Considera morros, chuva, alagamentos, vias difíceis e desgaste — porque uma corrida ruim pode custar mais que combustível.'],
      ['🛡️', 'Sua rota mais consciente', 'Acrescenta contexto de trânsito, incidentes, zonas e alertas sem dirigir, aceitar ou decidir por você.'],
      ['📋', 'Seu trabalho documentado', 'Organiza histórico, ganhos, custos e diagnósticos para você entender o turno e ter registros quando precisar de suporte.'],
    ],
    cameraPlanned: 'Em desenvolvimento — câmera de segurança e registro de ocorrências: a proposta é permitir que o motorista salve um registro sob seu controle, com data, integridade e exportação. Não é prova judicial garantida; o uso depende do caso e deverá respeitar privacidade e LGPD.',
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
      'O GigRadar está em fase de testes: pode apresentar erros e leituras incorretas. Mudanças relevantes serão comunicadas na página ou no aplicativo. Não tome decisões financeiras baseadas só no app.',
      'O acesso é pessoal e intransferível — não repasse o APK nem o código de liberação.',
      'No beta atual, todos os recursos disponíveis estão liberados por 30 dias. Depois o app bloqueia totalmente — peça um novo código grátis pelo WhatsApp enquanto o beta durar.',
      'Participar do beta inclui enviar um retorno curto por semana, mesmo que seja “testei e não encontrei erros”. Após 14 dias sem retorno e pelo menos um lembrete, a equipe pode não renovar a licença.',
      'O app NÃO faz login na Uber/99 e não altera nada — apenas lê a tela para te informar. A decisão de dirigir, aceitar trabalho ou seguir rota é sempre sua.',
      'Dirija com atenção. Nunca mexa no telefone com o carro em movimento.',
    ],
    androidOnly: '📱 Disponível apenas para Android (Uber/99 rodam em Android e iPhone, mas o GigRadar por enquanto só lê a tela no Android).',
    stepsTitle: 'Como funciona a instalação',
    steps: [
      'Cadastre-se abaixo — a página de download libera na hora, com o APK mais recente e seu convite de código pelo WhatsApp.',
      'Baixe e toque em Instalar (o Android avisa que é fora da Play Store — normal em beta fechado).',
      'Abra o app e siga o assistente: 3 permissões (Acessibilidade, Sobrepor, Localização).',
      'Digite seu código em 💎 e roda — o selo aparece sozinho na primeira oferta. 🎉',
    ],
    downloadTitle: '📲 Baixar o GigRadar',
    downloadBtn: '⬇️ Baixar o APK (Android)',
    downloadNote: 'Sempre a versão mais recente — este link se atualiza sozinho a cada nova versão.',
    codeTitle: '🔓 Já instalou? Libere seu acesso',
    codeIntro: 'Abra o app, toque em 💎 e copie o "ID de aparelho". Cole aqui com o e-mail ou WhatsApp que você usou no cadastro — o código sai na hora.',
    codeDevicePh: 'ID de aparelho (da tela 💎)',
    codeContactPh: 'E-mail ou WhatsApp do cadastro',
    codeBtn: '🔑 Gerar meu código',
    codeLoading: 'Gerando…',
    codeResultTitle: 'Seu código (válido 30 dias):',
    codeResultHint: 'Copie e cole na tela 💎 do app → Liberar. Guarde: é pessoal e intransferível.',
    setupModesTitle: 'Na primeira abertura, você escolhe como configurar',
    setupModesIntro: 'Não tem certo ou errado — escolha o que combina com você agora. Dá pra mudar tudo depois em Ajustes.',
    setupModes: [
      ['⚡', 'Simples', 'Pula tudo e já começa a usar com valores padrão. Ideal se você só quer testar rápido.'],
      ['🎯', 'Guiado', 'Perguntas rápidas (veículo, categoria, estado) e o app estima seus custos sozinho.'],
      ['🔵', 'Personalizado', 'Mesma base do Guiado, mas você já ajusta cada número (combustível, manutenção, metas) na hora.'],
      ['⚙️', 'Avançado', 'Vai direto pras configurações completas — pra quem já sabe exatamente o que quer.'],
    ],
    privacyTitle: 'Privacidade (resumo honesto)',
    privacy: 'No site coletamos só nome, WhatsApp, e-mail e cidade — pra gerenciar o beta e falar com você. O app não transmite automaticamente corridas, ganhos, zonas ou configurações: esses dados ficam no aparelho, salvo quando você escolhe compartilhar um relatório de diagnóstico. Pra excluir seu cadastro, é só pedir.',
    diagnosticsNotice: 'Nesta fase, o app não envia logs automaticamente. Quando necessário, você pode revisar e compartilhar voluntariamente o relatório seguro pelo botão de diagnóstico. Uma coleta automática futura só poderá começar após aviso destacado e autorização separada dentro do app. Não envie prints com dados de passageiros, endereços, documentos ou informações bancárias.',
    termsTitle: 'Termos de participação do beta',
    termsVersion: 'Versão 1.1 · 13 de julho de 2026',
    betaTerms: [
      ['Beta experimental', 'O acesso é gratuito, libera todos os recursos disponíveis nesta versão por 30 dias e pode ser alterado, suspenso ou encerrado por necessidade técnica, segurança ou fim do programa.'],
      ['Sem promessa de resultado', 'O GigRadar é um apoio informativo. Não garante ganhos, segurança de rota, valor de corrida, trânsito ou disponibilidade de trabalho.'],
      ['Uso seguro', 'Nunca use o celular de forma que distraia a direção. O motorista decide se aceita uma corrida e deve cumprir as leis de trânsito e as regras das plataformas.'],
      ['Acesso pessoal', 'Não compartilhe APK, link de instalação ou código. Troca de aparelho e extensão do período dependem de solicitação e aprovação da equipe.'],
      ['Colaboração semanal', 'O participante se compromete a enviar uma vez por semana um retorno curto: se utilizou o app, se funcionou, se encontrou falha e, quando houver, uma sugestão. Informar que testou e não encontrou erros também cumpre a colaboração.'],
      ['Continuidade do acesso', 'Após 14 dias sem retorno e pelo menos um lembrete, a equipe pode não renovar a próxima licença. Compartilhar APK ou código, fraudar o teste, abusar do serviço ou criar risco de segurança pode encerrar a participação.'],
      ['Diagnóstico técnico', 'O envio de diagnóstico é iniciado pelo participante, que pode revisar o conteúdo antes de compartilhar. O app não envia logs automaticamente nesta fase; eventual coleta futura exigirá aviso e autorização próprios dentro do aplicativo.'],
      ['Dados de cadastro', 'Nome, contato, cidade, aparelho e apps usados são tratados para administrar o beta, enviar instruções e suporte, conforme a Política de Privacidade da Azimut.'],
      ['Mudanças e saída', 'Mudanças relevantes nos termos ou no tratamento de dados serão destacadas. Você pode sair do beta e solicitar seus direitos de privacidade pelo canal indicado na Política de Privacidade.'],
    ],
    privacyLink: 'Ler a Política de Privacidade da Azimut',
    formTitle: 'Quero testar o GigRadar',
    namePh: 'Seu nome',
    whatsPh: 'Seu WhatsApp (com DDD)',
    emailPh: 'Seu e-mail',
    cityPh: 'Cidade / UF',
    appPh: 'App que você dirige',
    appOptions: ['Uber', '99', 'Uber e 99', 'Outro / entregas'],
    phonePh: 'Modelo do celular (opcional)',
    referralPh: 'Código de quem te indicou (opcional)',
    acceptTerms: 'Li e aceito os Termos de Participação do Beta e a Política de Privacidade.',
    acceptFeedback: 'Comprometo-me a enviar um retorno curto por semana, mesmo que não encontre erros. Entendo que 14 dias sem retorno, após um lembrete, podem impedir a renovação da licença Beta.',
    acceptUpdates: 'Quero receber mensagens sobre meu acesso beta, correções e novas versões. (opcional)',
    cta: 'Entrar no beta',
    sentTitle: '✅ Recebido! Valeu por entrar no ecossistema GigRadar 💚',
    sentMsg: 'Você está ajudando a construir a ferramenta que protege o bolso de quem roda. Baixe o app logo abaixo — e te chamamos no WhatsApp com seu código de liberação e o convite do grupo dos testadores.',
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
    positionTitle: 'Much more than an offer reader',
    positionIntro: 'GigRadar is being built as a decision centre that protects the driver’s earnings, vehicle and work. The Beta validates each layer on the road before commercial release.',
    pillars: [
      ['💰', 'Your real earnings', 'Combines price, time, distance and your own costs to show whether the job is truly worthwhile.'],
      ['🚗', 'Your vehicle protected', 'Considers hills, rain, flooding, difficult roads and wear — because a bad ride can cost more than fuel.'],
      ['🛡️', 'A better-informed route', 'Adds traffic, incident, zone and alert context without driving, accepting or deciding for you.'],
      ['📋', 'Your work documented', 'Organises history, earnings, costs and diagnostics so you can understand each shift and keep records for support.'],
    ],
    cameraPlanned: 'In development — safety camera and incident records: the proposal is to let drivers save a record under their control, with date, integrity and export. It is not guaranteed legal evidence; use depends on the case and must comply with privacy and data-protection rules.',
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
      'GigRadar is in testing: it may show errors and misreads. Significant changes will be communicated on this page or in the app. Do not make financial decisions based on the app alone.',
      'Access is personal and non-transferable — don\'t share the APK or your unlock code.',
      'In the current beta, every available feature is unlocked for 30 days. After that the app locks completely — request a new free code on WhatsApp while the beta lasts.',
      'Joining the beta includes sending one short update per week, even if it only says “tested and found no errors.” After 14 days without an update and at least one reminder, the team may decline to renew the licence.',
      'The app does NOT log into Uber/99 and changes nothing — it only reads the screen to inform you. Driving, work acceptance and route decisions are always yours.',
      'Drive safely. Never touch the phone while the car is moving.',
    ],
    androidOnly: '📱 Android only for now (Uber/99 run on Android and iPhone, but GigRadar\'s screen-reading only works on Android so far).',
    stepsTitle: 'How installation works',
    steps: [
      'Sign up below — the download page unlocks instantly, with the latest APK and your unlock code invite on WhatsApp.',
      'Download and tap Install (Android warns it\'s outside the Play Store — normal for a closed beta).',
      'Open the app and follow the wizard: 3 permissions (Accessibility, Overlay, Location).',
      'Enter your code in 💎 and drive — the badge shows up on the first offer. 🎉',
    ],
    downloadTitle: '📲 Download GigRadar',
    downloadBtn: '⬇️ Download the APK (Android)',
    downloadNote: 'Always the latest version — this link updates itself with every new release.',
    codeTitle: '🔓 Already installed? Unlock your access',
    codeIntro: 'Open the app, tap 💎 and copy your "device ID". Paste it here with the e-mail or WhatsApp you signed up with — your code appears instantly.',
    codeDevicePh: 'Device ID (from the 💎 screen)',
    codeContactPh: 'Sign-up e-mail or WhatsApp',
    codeBtn: '🔑 Generate my code',
    codeLoading: 'Generating…',
    codeResultTitle: 'Your code (valid 30 days):',
    codeResultHint: 'Copy and paste it in the app\'s 💎 screen → Unlock. Keep it: personal and non-transferable.',
    setupModesTitle: 'On first launch, you choose how to set up',
    setupModesIntro: 'There\'s no right or wrong — pick what fits you now. You can change everything later in Settings.',
    setupModes: [
      ['⚡', 'Simple', 'Skip everything and start using default values. Best if you just want to try it fast.'],
      ['🎯', 'Guided', 'A few quick questions (vehicle, category, state) and the app estimates your costs for you.'],
      ['🔵', 'Custom', 'Same base as Guided, but you fine-tune every number (fuel, maintenance, goals) right away.'],
      ['⚙️', 'Advanced', 'Goes straight to full settings — for those who already know exactly what they want.'],
    ],
    privacyTitle: 'Privacy (honest summary)',
    privacy: 'On this site we only collect name, WhatsApp, e-mail and city — to run the beta and talk to you. The app does not automatically transmit rides, earnings, zones or settings: they remain on the device unless you choose to share a diagnostic report. To delete your registration, just ask.',
    diagnosticsNotice: 'At this stage, the app does not send logs automatically. When needed, you can review and voluntarily share the safe report using the diagnostic button. Any future automatic collection may only begin after a prominent notice and separate authorisation inside the app. Never send screenshots containing passenger data, addresses, documents or banking information.',
    termsTitle: 'Beta participation terms',
    termsVersion: 'Version 1.1 · July 13, 2026',
    betaTerms: [
      ['Experimental beta', 'Access is free, unlocks every feature available in this version for 30 days and may be changed, suspended or ended for technical needs, safety or the end of the program.'],
      ['No promised outcome', 'GigRadar is an informational aid. It does not guarantee earnings, route safety, ride value, traffic conditions or work availability.'],
      ['Safe use', 'Never use your phone in a way that distracts from driving. The driver decides whether to accept a ride and must follow traffic laws and platform rules.'],
      ['Personal access', 'Do not share the APK, installation link or code. Device changes and trial extensions require a request and team approval.'],
      ['Weekly collaboration', 'Participants agree to send one short update per week: whether they used the app, whether it worked, whether they found a problem and, when available, a suggestion. Reporting that no errors were found also fulfils this requirement.'],
      ['Continued access', 'After 14 days without an update and at least one reminder, the team may decline to renew the next licence. Sharing the APK or code, test fraud, abuse or a security risk may end participation.'],
      ['Technical diagnostics', 'Diagnostic sharing is initiated by the participant, who can review the content before sharing. The app does not send logs automatically at this stage; any future collection will require its own in-app notice and authorisation.'],
      ['Registration data', 'Name, contact details, city, device and apps used are processed to manage the beta, send instructions and provide support, under Azimut\'s Privacy Policy.'],
      ['Changes and exit', 'Material changes to these terms or data handling will be highlighted. You may leave the beta and request privacy rights through the channel in the Privacy Policy.'],
    ],
    privacyLink: 'Read Azimut\'s Privacy Policy',
    formTitle: 'I want to test GigRadar',
    namePh: 'Your name',
    whatsPh: 'Your WhatsApp',
    emailPh: 'Your e-mail',
    cityPh: 'City / State',
    appPh: 'App you drive for',
    appOptions: ['Uber', '99', 'Uber and 99', 'Other / delivery'],
    phonePh: 'Phone model (optional)',
    referralPh: "Referral code from who invited you (optional)",
    acceptTerms: 'I have read and accept the Beta Participation Terms and Privacy Policy.',
    acceptFeedback: 'I agree to send one short update per week, even when I find no errors. I understand that 14 days without an update, after a reminder, may prevent renewal of my Beta licence.',
    acceptUpdates: 'I want messages about my beta access, fixes and new versions. (optional)',
    cta: 'Join the beta',
    sentTitle: '✅ Received! Thanks for joining the GigRadar ecosystem 💚',
    sentMsg: 'You\'re helping build the tool that protects drivers\' pockets. Download the app right below — we\'ll message you on WhatsApp with your unlock code and the testers group invite.',
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
    positionTitle: 'Mucho más que un lector de ofertas',
    positionIntro: 'GigRadar se está construyendo como una central de decisión para proteger las ganancias, el vehículo y el trabajo del conductor. La Beta valida cada capa en la calle antes del lanzamiento comercial.',
    pillars: [
      ['💰', 'Tus ganancias reales', 'Combina valor, tiempo, distancia y tus propios costos para mostrar si el trabajo realmente compensa.'],
      ['🚗', 'Tu vehículo protegido', 'Considera pendientes, lluvia, inundaciones, vías difíciles y desgaste — porque un mal viaje puede costar más que combustible.'],
      ['🛡️', 'Una ruta más consciente', 'Añade contexto de tráfico, incidentes, zonas y alertas sin conducir, aceptar ni decidir por ti.'],
      ['📋', 'Tu trabajo documentado', 'Organiza historial, ganancias, costos y diagnósticos para comprender el turno y conservar registros para soporte.'],
    ],
    cameraPlanned: 'En desarrollo — cámara de seguridad y registro de incidentes: la propuesta es permitir que el conductor guarde un registro bajo su control, con fecha, integridad y exportación. No es una prueba judicial garantizada; su uso depende del caso y deberá respetar la privacidad y las normas de protección de datos.',
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
      'GigRadar está en pruebas: puede mostrar errores y lecturas incorrectas. Los cambios relevantes se comunicarán en esta página o en la app. No tomes decisiones financieras solo por la app.',
      'El acceso es personal e intransferible — no compartas el APK ni tu código.',
      'En la beta actual, todas las funciones disponibles están liberadas por 30 días. Después la app se bloquea por completo — pide un código nuevo gratis por WhatsApp mientras dure la beta.',
      'Participar en la beta incluye enviar un breve informe por semana, aunque solo diga “probé y no encontré errores”. Tras 14 días sin informe y al menos un recordatorio, el equipo puede no renovar la licencia.',
      'La app NO inicia sesión en Uber/99 y no altera nada — solo lee la pantalla para informarte. Las decisiones de conducir, aceptar trabajo o seguir una ruta siempre son tuyas.',
      'Conduce con atención. Nunca toques el teléfono con el auto en movimiento.',
    ],
    androidOnly: '📱 Disponible solo para Android por ahora (Uber/99 funcionan en Android y iPhone, pero la lectura de pantalla de GigRadar solo funciona en Android).',
    stepsTitle: 'Cómo funciona la instalación',
    steps: [
      'Regístrate abajo — la página de descarga se abre al instante, con el APK más reciente y tu invitación de código por WhatsApp.',
      'Descarga y toca Instalar (Android avisa que es fuera de Play Store — normal en beta cerrada).',
      'Abre la app y sigue el asistente: 3 permisos (Accesibilidad, Superposición, Ubicación).',
      'Escribe tu código en 💎 y a rodar — el sello aparece solo en la primera oferta. 🎉',
    ],
    downloadTitle: '📲 Descargar GigRadar',
    downloadBtn: '⬇️ Descargar el APK (Android)',
    downloadNote: 'Siempre la versión más reciente — este link se actualiza solo con cada nueva versión.',
    codeTitle: '🔓 ¿Ya instalaste? Libera tu acceso',
    codeIntro: 'Abre la app, toca 💎 y copia tu "ID de dispositivo". Pégalo aquí con el e-mail o WhatsApp que usaste al registrarte — el código sale al instante.',
    codeDevicePh: 'ID de dispositivo (de la pantalla 💎)',
    codeContactPh: 'E-mail o WhatsApp del registro',
    codeBtn: '🔑 Generar mi código',
    codeLoading: 'Generando…',
    codeResultTitle: 'Tu código (válido 30 días):',
    codeResultHint: 'Cópialo y pégalo en la pantalla 💎 de la app → Desbloquear. Guárdalo: es personal e intransferible.',
    setupModesTitle: 'En la primera apertura, eliges cómo configurar',
    setupModesIntro: 'No hay correcto o incorrecto — elige lo que te convenga ahora. Puedes cambiar todo después en Ajustes.',
    setupModes: [
      ['⚡', 'Simple', 'Omite todo y empieza a usar con valores predeterminados. Ideal si solo quieres probar rápido.'],
      ['🎯', 'Guiado', 'Preguntas rápidas (vehículo, categoría, estado) y la app estima tus costos sola.'],
      ['🔵', 'Personalizado', 'Misma base que Guiado, pero ajustas cada número (combustible, mantenimiento, metas) al instante.'],
      ['⚙️', 'Avanzado', 'Va directo a la configuración completa — para quien ya sabe exactamente lo que quiere.'],
    ],
    privacyTitle: 'Privacidad (resumen honesto)',
    privacy: 'En el sitio solo recolectamos nombre, WhatsApp, e-mail y ciudad — para gestionar la beta y hablar contigo. La app no transmite automáticamente viajes, ganancias, zonas o ajustes: permanecen en el dispositivo salvo que elijas compartir un informe de diagnóstico. Para borrar tu registro, solo pídelo.',
    diagnosticsNotice: 'En esta fase, la app no envía registros automáticamente. Cuando sea necesario, puedes revisar y compartir voluntariamente el informe seguro mediante el botón de diagnóstico. Cualquier recopilación automática futura solo podrá comenzar tras un aviso destacado y una autorización separada dentro de la app. Nunca envíes capturas con datos de pasajeros, direcciones, documentos o información bancaria.',
    termsTitle: 'Términos de participación en la beta',
    termsVersion: 'Versión 1.1 · 13 de julio de 2026',
    betaTerms: [
      ['Beta experimental', 'El acceso es gratuito, libera todas las funciones disponibles en esta versión por 30 días y puede cambiarse, suspenderse o terminarse por necesidad técnica, seguridad o fin del programa.'],
      ['Sin resultados prometidos', 'GigRadar es una ayuda informativa. No garantiza ingresos, seguridad de ruta, valor de viaje, tráfico o disponibilidad de trabajo.'],
      ['Uso seguro', 'Nunca uses el teléfono de una forma que distraiga al conducir. El conductor decide si acepta un viaje y debe cumplir las leyes y reglas de las plataformas.'],
      ['Acceso personal', 'No compartas el APK, link de instalación o código. Cambios de teléfono y extensiones requieren solicitud y aprobación del equipo.'],
      ['Colaboración semanal', 'El participante se compromete a enviar una vez por semana un informe breve: si utilizó la app, si funcionó, si encontró un problema y, cuando exista, una sugerencia. Informar que no encontró errores también cumple este requisito.'],
      ['Continuidad del acceso', 'Tras 14 días sin informe y al menos un recordatorio, el equipo puede no renovar la siguiente licencia. Compartir el APK o el código, fraude en la prueba, abuso o un riesgo de seguridad puede finalizar la participación.'],
      ['Diagnóstico técnico', 'El envío del diagnóstico lo inicia el participante, que puede revisar el contenido antes de compartirlo. La app no envía registros automáticamente en esta fase; cualquier recopilación futura requerirá su propio aviso y autorización dentro de la aplicación.'],
      ['Datos de registro', 'Nombre, contacto, ciudad, dispositivo y apps usadas se tratan para gestionar la beta, enviar instrucciones y brindar soporte, conforme a la Política de Privacidad de Azimut.'],
      ['Cambios y salida', 'Los cambios relevantes de estos términos o del tratamiento de datos se destacarán. Puedes salir de la beta y ejercer tus derechos de privacidad por el canal de la Política de Privacidad.'],
    ],
    privacyLink: 'Leer la Política de Privacidad de Azimut',
    formTitle: 'Quiero probar GigRadar',
    namePh: 'Tu nombre',
    whatsPh: 'Tu WhatsApp',
    emailPh: 'Tu e-mail',
    cityPh: 'Ciudad / Estado',
    appPh: 'App que manejas',
    appOptions: ['Uber', '99', 'Uber y 99', 'Otra / entregas'],
    phonePh: 'Modelo del teléfono (opcional)',
    referralPh: 'Código de quien te invitó (opcional)',
    acceptTerms: 'Leí y acepto los Términos de Participación de la Beta y la Política de Privacidad.',
    acceptFeedback: 'Me comprometo a enviar un informe breve por semana, aunque no encuentre errores. Entiendo que 14 días sin informe, después de un recordatorio, pueden impedir la renovación de mi licencia Beta.',
    acceptUpdates: 'Quiero recibir mensajes sobre mi acceso beta, correcciones y nuevas versiones. (opcional)',
    cta: 'Entrar a la beta',
    sentTitle: '✅ ¡Recibido! Gracias por entrar al ecosistema GigRadar 💚',
    sentMsg: 'Estás ayudando a construir la herramienta que protege el bolsillo de quien maneja. Descarga la app justo abajo — te escribimos por WhatsApp con tu código y la invitación al grupo.',
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
    positionTitle: 'Bien plus qu’un lecteur d’offres',
    positionIntro: 'GigRadar est conçu comme un centre de décision qui protège les revenus, le véhicule et le travail du chauffeur. La Bêta valide chaque couche sur la route avant le lancement commercial.',
    pillars: [
      ['💰', 'Vos revenus réels', 'Combine le prix, le temps, la distance et vos propres coûts pour montrer si le travail est réellement rentable.'],
      ['🚗', 'Votre véhicule protégé', 'Tient compte des pentes, de la pluie, des inondations, des routes difficiles et de l’usure — car une mauvaise course peut coûter plus que le carburant.'],
      ['🛡️', 'Un trajet mieux éclairé', 'Ajoute le contexte du trafic, des incidents, des zones et des alertes sans conduire, accepter ni décider à votre place.'],
      ['📋', 'Votre travail documenté', 'Organise l’historique, les revenus, les coûts et les diagnostics pour comprendre chaque service et conserver des éléments utiles au support.'],
    ],
    cameraPlanned: 'En développement — caméra de sécurité et registre d’incidents : l’objectif est de permettre au chauffeur de conserver un enregistrement sous son contrôle, avec date, intégrité et exportation. Il ne s’agit pas d’une preuve judiciaire garantie ; son usage dépend du cas et devra respecter la vie privée et la protection des données.',
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
      'GigRadar est en phase de test : des erreurs et des lectures incorrectes sont possibles. Les changements importants seront communiqués sur cette page ou dans l\'app. Ne prenez pas de décisions financières sur la seule base de l\'app.',
      'L\'accès est personnel et non transférable — ne partagez ni l\'APK ni votre code.',
      'Dans la bêta actuelle, toutes les fonctionnalités disponibles sont déverrouillées pendant 30 jours. Ensuite l\'app se verrouille totalement — demandez un nouveau code gratuit sur WhatsApp pendant la bêta.',
      'Participer à la bêta implique d\'envoyer un bref retour par semaine, même pour indiquer « testé, aucune erreur trouvée ». Après 14 jours sans retour et au moins un rappel, l\'équipe peut refuser de renouveler la licence.',
      'L\'app ne se connecte PAS à Uber/99 et ne modifie rien — elle lit seulement l\'écran. Les décisions de conduite, d\'acceptation du travail ou d\'itinéraire vous appartiennent toujours.',
      'Conduisez prudemment. Ne touchez jamais le téléphone en roulant.',
    ],
    androidOnly: '📱 Disponible uniquement sur Android pour l\'instant (Uber/99 fonctionnent sur Android et iPhone, mais la lecture d\'écran de GigRadar ne fonctionne que sur Android).',
    stepsTitle: 'Installation',
    steps: [
      'Inscrivez-vous ci-dessous — la page de téléchargement s\'ouvre aussitôt, avec l\'APK le plus récent et votre invitation code sur WhatsApp.',
      'Téléchargez et appuyez sur Installer (Android signale que c\'est hors Play Store — normal en bêta fermée).',
      'Ouvrez l\'app et suivez l\'assistant : 3 permissions (Accessibilité, Superposition, Localisation).',
      'Entrez votre code dans 💎 et roulez — le badge apparaît dès la première offre. 🎉',
    ],
    downloadTitle: '📲 Télécharger GigRadar',
    downloadBtn: '⬇️ Télécharger l\'APK (Android)',
    downloadNote: 'Toujours la dernière version — ce lien se met à jour automatiquement à chaque nouvelle version.',
    codeTitle: '🔓 Déjà installé ? Débloquez votre accès',
    codeIntro: 'Ouvrez l\'app, appuyez sur 💎 et copiez votre « ID d\'appareil ». Collez-le ici avec l\'e-mail ou le WhatsApp de votre inscription — le code apparaît aussitôt.',
    codeDevicePh: 'ID d\'appareil (écran 💎)',
    codeContactPh: 'E-mail ou WhatsApp d\'inscription',
    codeBtn: '🔑 Générer mon code',
    codeLoading: 'Génération…',
    codeResultTitle: 'Votre code (valable 30 jours) :',
    codeResultHint: 'Copiez-le dans l\'écran 💎 de l\'app → Débloquer. Gardez-le : personnel et non transférable.',
    setupModesTitle: 'Au premier lancement, vous choisissez comment configurer',
    setupModesIntro: 'Il n\'y a pas de bon ou mauvais choix — prenez ce qui vous convient maintenant. Vous pourrez tout changer plus tard dans les Réglages.',
    setupModes: [
      ['⚡', 'Simple', 'Passez tout et commencez avec des valeurs par défaut. Idéal pour essayer rapidement.'],
      ['🎯', 'Guidé', 'Quelques questions rapides (véhicule, catégorie, région) et l\'app estime vos coûts elle-même.'],
      ['🔵', 'Personnalisé', 'Même base que Guidé, mais vous ajustez chaque chiffre (carburant, entretien, objectifs) tout de suite.'],
      ['⚙️', 'Avancé', 'Va directement aux réglages complets — pour qui sait déjà exactement ce qu\'il veut.'],
    ],
    privacyTitle: 'Confidentialité (résumé honnête)',
    privacy: 'Sur ce site nous ne collectons que nom, WhatsApp, e-mail et ville — pour gérer la bêta. L\'app ne transmet pas automatiquement les courses, gains, zones ou réglages : ils restent sur l\'appareil sauf si vous choisissez de partager un rapport de diagnostic. Pour supprimer votre inscription, demandez-le simplement.',
    diagnosticsNotice: 'À ce stade, l\'app n\'envoie pas automatiquement de journaux. Si nécessaire, vous pouvez vérifier et partager volontairement le rapport sécurisé avec le bouton de diagnostic. Toute collecte automatique future ne pourra commencer qu\'après un avis visible et une autorisation séparée dans l\'app. N\'envoyez jamais de captures contenant des données de passagers, adresses, documents ou informations bancaires.',
    termsTitle: 'Conditions de participation à la bêta',
    termsVersion: 'Version 1.1 · 13 juillet 2026',
    betaTerms: [
      ['Bêta expérimentale', 'L\'accès est gratuit, déverrouille toutes les fonctionnalités disponibles dans cette version pendant 30 jours et peut être modifié, suspendu ou arrêté pour des besoins techniques, de sécurité ou à la fin du programme.'],
      ['Aucun résultat garanti', 'GigRadar est une aide informative. Il ne garantit ni revenus, ni sécurité d\'itinéraire, ni valeur de course, ni trafic, ni disponibilité de travail.'],
      ['Utilisation sûre', 'N\'utilisez jamais le téléphone d\'une manière qui détourne l\'attention de la conduite. Le conducteur décide d\'accepter une course et doit respecter les lois et règles des plateformes.'],
      ['Accès personnel', 'Ne partagez ni APK, ni lien d\'installation, ni code. Les changements d\'appareil et prolongations nécessitent une demande et l\'approbation de l\'équipe.'],
      ['Collaboration hebdomadaire', 'Les participants s\'engagent à envoyer un bref retour chaque semaine : utilisation de l\'app, bon fonctionnement, problème éventuel et, lorsqu\'elle existe, une suggestion. Indiquer qu\'aucune erreur n\'a été trouvée remplit aussi cette obligation.'],
      ['Continuité de l\'accès', 'Après 14 jours sans retour et au moins un rappel, l\'équipe peut refuser de renouveler la licence suivante. Le partage de l\'APK ou du code, la fraude, l\'abus ou un risque de sécurité peut mettre fin à la participation.'],
      ['Diagnostic technique', 'Le partage du diagnostic est déclenché par le participant, qui peut vérifier le contenu avant l\'envoi. L\'app n\'envoie pas automatiquement de journaux à ce stade ; toute collecte future exigera son propre avis et une autorisation dans l\'application.'],
      ['Données d\'inscription', 'Le nom, le contact, la ville, l\'appareil et les applications utilisées sont traités pour gérer la bêta, envoyer des instructions et assurer le support, conformément à la Politique de confidentialité d\'Azimut.'],
      ['Modifications et sortie', 'Les changements importants de ces conditions ou du traitement des données seront mis en évidence. Vous pouvez quitter la bêta et exercer vos droits via le canal de la Politique de confidentialité.'],
    ],
    privacyLink: 'Lire la Politique de confidentialité d\'Azimut',
    formTitle: 'Je veux tester GigRadar',
    namePh: 'Votre nom',
    whatsPh: 'Votre WhatsApp',
    emailPh: 'Votre e-mail',
    cityPh: 'Ville / région',
    appPh: 'App que vous conduisez',
    appOptions: ['Uber', '99', 'Uber et 99', 'Autre / livraison'],
    phonePh: 'Modèle du téléphone (optionnel)',
    referralPh: "Code de parrainage (optionnel)",
    acceptTerms: 'J\'ai lu et j\'accepte les Conditions de participation à la bêta et la Politique de confidentialité.',
    acceptFeedback: 'Je m\'engage à envoyer un bref retour chaque semaine, même sans erreur trouvée. Je comprends que 14 jours sans retour, après un rappel, peuvent empêcher le renouvellement de ma licence Bêta.',
    acceptUpdates: 'Je souhaite recevoir des messages sur mon accès bêta, les corrections et les nouvelles versions. (facultatif)',
    cta: 'Rejoindre la bêta',
    sentTitle: '✅ Reçu ! Merci de rejoindre l\'écosystème GigRadar 💚',
    sentMsg: 'Téléchargez l\'app juste ci-dessous — nous vous écrivons sur WhatsApp avec votre code et l\'invitation au groupe des testeurs.',
    sentBtn: '📱 Écrire sur WhatsApp maintenant',
    back: 'Retour',
  },
} as const

// Guia de uso (as 4 abas + card + zonas) — isolado do `content` acima pra não mexer no que já existe.
const GIG_GUIDE = {
  pt: {
    guideTitle: 'Guia rápido: as 4 abas',
    guideIntro: 'Embaixo da tela ficam Radar, Ganhos, Proteção e Mais — é por aí que você navega tudo.',
    tabs: [
      ['◎', 'Radar', 'O coração do app: veredito na hora (aceita / atenção / recusa) com o R$/km e R$/h REAIS. Aqui você liga o leitor e usa o comando de voz.'],
      ['📈', 'Ganhos', 'Seu dinheiro de verdade. Em "Metas e semáforo" ficam os ajustes de R$ por corrida e por hora (o que define verde/amarelo). Lance abastecimento e custos — o app calcula seu custo/km real e afina os limites sozinho.'],
      ['🛡️', 'Proteção', 'O diferencial. Mapa com zonas, "Alertas e riscos" (morro, servidão, alagamento, dinheiro à noite — cada um em 🔕 ignora / ⚠️ avisa / 🚫 recusa) e locais a evitar por nome.'],
      ['⋯', 'Mais', 'Ajustes e avançado: plataformas (Uber, 99 e apps do mundo), seu carro, aparência do card, saúde do carro por OBD2 e a Central de Ajuda.'],
    ],
    cardTitle: 'O card é seu — sugestão de padrão',
    cardIntro: 'Ele aparece por cima do Uber/99. A regra de ouro é não cobrir o que você toca no app de corrida. Nossa sugestão já vem pensada pra isso:',
    cardDefaults: [
      'Card único (junto), não separado — ocupa menos e some rápido.',
      'No topo da tela (~28% de cima pra baixo) — ali o Uber/99 não põe o botão de aceitar.',
      'Transparência ~85% — você lê o veredito e ainda enxerga o app por baixo.',
      'Tamanho médio — bate o olho sem tapar o mapa. Arraste e ajuste tudo em Mais → Aparência.',
    ],
    zonesTitle: 'Áreas de risco: você marca, ele respeita',
    zones: [
      ['✍️', 'Por nome', 'Digite o bairro ou o local a evitar.'],
      ['🖊️', 'Desenhando', 'Trace a região no mapa com o dedo.'],
      ['📍', 'Por pin', 'Finque um pin no ponto exato.'],
    ],
    extras: 'No fone ele fala tudo; com passageiro a bordo disfarça em código de navegação; o Modo Casa te traz de volta sendo pago. De 0 às 5h, as zonas de risco endurecem sozinhas.',
    permsTitle: 'As autorizações no telefone, explicadas',
    permsIntro: 'São 4, feitas uma vez só. Cada uma tem um motivo — e sem elas, algumas partes não funcionam.',
    perms: [
      ['👁️', 'Acessibilidade — essencial', 'Deixa o app SÓ LER a oferta na tela do Uber/99. Nunca clica, nunca aceita, nunca faz login. Sem ela, não há veredito.'],
      ['🪟', 'Sobreposição — essencial', 'Permite o card flutuante aparecer por cima do Uber/99. É o que você vê na hora da oferta.'],
      ['🔋', 'Bateria sem restrição', 'Pra o Samsung não "matar" o leitor no meio do corre. No Samsung, tire também o app de "Apps em suspensão".'],
      ['📍', 'Localização', 'Fala o bairro do destino, avisa morro/servidão e o trânsito ao vivo. Quem não liga, usa o resto normal.'],
    ],
    moreTitle: 'Mais recursos — ajustes e avançado',
    more: [
      ['🌎', 'Plataformas e testes', 'Escolha seus apps (Uber, 99 e outros do mundo) e seu tipo de transporte (carro, moto, bike).'],
      ['🚗', 'Meu carro (FIPE + avaria)', 'O valor do carro entra no cálculo de desgaste real por km.'],
      ['🎨', 'Aparência e alertas', 'Tema (claro/escuro) e o ajuste completo do card — tamanho, transparência, posição.'],
      ['🎯', 'Metas e semáforo', 'Aqui você ajusta o R$ por corrida e por hora que definem o verde/amarelo/vermelho.'],
      ['🔌', 'Saúde do carro (OBD2)', 'Com o sensor, lê consumo real, RPM e temperatura — precisão máxima e segurança do carro.'],
      ['❓', 'Central de Ajuda', 'Tudo explicado, sempre à mão, direto no app.'],
    ],
    diffTitle: 'Por que o GigRadar é diferente de todos',
    diffIntro: 'Os outros apps mostram quanto você já ganhou — relatório do passado. O GigRadar decide antes de aceitar e protege o que ninguém protege junto:',
    diff: [
      ['💰', 'Seu bolso', 'R$/km e R$/h reais, já com o seu custo. O valor cheio engana — ele mostra o que sobra.'],
      ['🛡️', 'Seu carro', 'Morro, servidão, alagamento. Bater o carro é o custo escondido que ninguém conta. Ele conta.'],
      ['🚨', 'Você', 'Zonas que você marca, dinheiro à noite, madrugada. Segurança que vem antes do lucro.'],
    ],
  },
  en: {
    guideTitle: 'Quick guide: the 4 tabs',
    guideIntro: 'Radar, Earnings, Protection and More sit at the bottom — that\'s how you get around.',
    tabs: [
      ['◎', 'Radar', 'The heart of the app: instant verdict (accept / caution / decline) with your REAL R$/km and R$/h. Turn on the reader and use voice commands here.'],
      ['📈', 'Earnings', 'Your real money. In "Goals & traffic-light" you set R$ per ride and per hour (what defines green/yellow). Log fuel and costs — the app computes your real cost/km and tunes the limits itself.'],
      ['🛡️', 'Protection', 'The difference. Map with zones, "Alerts & risks" (hills, alleys, floods, cash at night — each as 🔕 ignore / ⚠️ warn / 🚫 decline) and places to avoid by name.'],
      ['⋯', 'More', 'Settings and advanced: platforms (Uber, 99 and world apps), your car, card appearance, car health via OBD2, and the Help Center.'],
    ],
    cardTitle: 'The card is yours — suggested default',
    cardIntro: 'It shows on top of Uber/99. The golden rule: don\'t cover what you tap in the ride app. Our default is already built for that:',
    cardDefaults: [
      'A single card (joined), not split — smaller footprint.',
      'At the top of the screen (~28% down) — Uber/99 doesn\'t put the accept button there.',
      'About 85% opacity — read the verdict and still see the app behind it.',
      'Medium size — glanceable without hiding the map. Drag and tweak it all in More → Appearance.',
    ],
    zonesTitle: 'Risk areas: you mark, it respects',
    zones: [
      ['✍️', 'By name', 'Type the neighborhood or place to avoid.'],
      ['🖊️', 'By drawing', 'Trace the area on the map with your finger.'],
      ['📍', 'By pin', 'Drop a pin on the exact spot.'],
    ],
    extras: 'On earbuds it says everything; with a passenger it disguises as navigation codes; Home Mode brings you back while getting paid. From midnight to 5am, risk zones tighten on their own.',
    permsTitle: 'The phone permissions, explained',
    permsIntro: 'Just 4, granted once. Each has a reason — without them, some parts won\'t work.',
    perms: [
      ['👁️', 'Accessibility — essential', 'Lets the app ONLY READ the Uber/99 offer on screen. Never taps, accepts, or logs in. Without it, there is no verdict.'],
      ['🪟', 'Overlay — essential', 'Lets the floating card show on top of Uber/99. It\'s what you see when an offer appears.'],
      ['🔋', 'Unrestricted battery', 'So Samsung doesn\'t "kill" the reader mid-shift. On Samsung, also remove the app from "Sleeping apps".'],
      ['📍', 'Location', 'Speaks the destination neighborhood, warns about hills/alleys and live traffic. Without it, everything else still works.'],
    ],
    moreTitle: 'More — settings and advanced',
    more: [
      ['🌎', 'Platforms and tests', 'Choose your apps (Uber, 99 and others worldwide) and your transport type (car, moto, bike).'],
      ['🚗', 'My car (book value + damage)', 'Your car value feeds the real wear cost per km.'],
      ['🎨', 'Appearance and alerts', 'Theme (light/dark) and the full card tweak — size, transparency, position.'],
      ['🎯', 'Goals & traffic light', 'Set the R$ per ride and per hour that define green/yellow/red.'],
      ['🔌', 'Car health (OBD2)', 'With the sensor, reads real fuel use, RPM and temperature — top precision and car safety.'],
      ['❓', 'Help Center', 'Everything explained, always at hand, right in the app.'],
    ],
    diffTitle: 'Why GigRadar is different from all the rest',
    diffIntro: 'Other apps show what you already earned — a report of the past. GigRadar decides before you accept and protects what no one else protects together:',
    diff: [
      ['💰', 'Your wallet', 'Real R$/km and R$/h, already with your cost. The sticker price lies — it shows what\'s left.'],
      ['🛡️', 'Your car', 'Hills, alleys, flooding. Damaging the car is the hidden cost no one counts. It counts it.'],
      ['🚨', 'You', 'Zones you mark, cash at night, late hours. Safety comes before profit.'],
    ],
  },
  es: {
    guideTitle: 'Guía rápida: las 4 pestañas',
    guideIntro: 'Abajo están Radar, Ganancias, Protección y Más — por ahí navegas todo.',
    tabs: [
      ['◎', 'Radar', 'El corazón del app: veredicto al instante (acepta / atención / rechaza) con tu R$/km y R$/h REALES. Aquí enciendes el lector y usas el comando de voz.'],
      ['📈', 'Ganancias', 'Tu dinero de verdad. En "Metas y semáforo" ajustas R$ por viaje y por hora (lo que define verde/amarillo). Registra combustible y costos — el app calcula tu costo/km real y afina los límites solo.'],
      ['🛡️', 'Protección', 'La diferencia. Mapa con zonas, "Alertas y riesgos" (subidas, callejones, inundación, efectivo de noche — cada uno en 🔕 ignora / ⚠️ avisa / 🚫 rechaza) y lugares a evitar por nombre.'],
      ['⋯', 'Más', 'Ajustes y avanzado: plataformas (Uber, 99 y apps del mundo), tu auto, apariencia del card, salud del auto por OBD2 y el Centro de Ayuda.'],
    ],
    cardTitle: 'El card es tuyo — sugerencia de base',
    cardIntro: 'Aparece encima de Uber/99. La regla de oro: no tapar lo que tocas en el app de viajes. Nuestra base ya está pensada para eso:',
    cardDefaults: [
      'Un solo card (junto), no separado — ocupa menos.',
      'Arriba de la pantalla (~28%) — ahí Uber/99 no pone el botón de aceptar.',
      'Transparencia ~85% — lees el veredicto y aún ves el app por debajo.',
      'Tamaño medio — se ve de un vistazo sin tapar el mapa. Arrastra y ajusta todo en Más → Apariencia.',
    ],
    zonesTitle: 'Áreas de riesgo: tú marcas, él respeta',
    zones: [
      ['✍️', 'Por nombre', 'Escribe el barrio o lugar a evitar.'],
      ['🖊️', 'Dibujando', 'Traza la región en el mapa con el dedo.'],
      ['📍', 'Por pin', 'Clava un pin en el punto exacto.'],
    ],
    extras: 'Con audífonos dice todo; con pasajero disfraza en códigos de navegación; el Modo Casa te trae de vuelta ganando. De 0 a 5h, las zonas de riesgo se endurecen solas.',
    permsTitle: 'Los permisos del teléfono, explicados',
    permsIntro: 'Son 4, solo una vez. Cada uno tiene un motivo — sin ellos, algunas partes no funcionan.',
    perms: [
      ['👁️', 'Accesibilidad — esencial', 'Deja que el app SOLO LEA la oferta de Uber/99 en pantalla. Nunca toca, acepta ni inicia sesión. Sin ella, no hay veredicto.'],
      ['🪟', 'Superposición — esencial', 'Permite que el card flotante aparezca encima de Uber/99. Es lo que ves al llegar la oferta.'],
      ['🔋', 'Batería sin restricción', 'Para que Samsung no "mate" el lector a mitad de turno. En Samsung, quita también el app de "Apps en reposo".'],
      ['📍', 'Ubicación', 'Dice el barrio del destino, avisa subidas/callejones y el tráfico en vivo. Sin ella, el resto sigue funcionando.'],
    ],
    moreTitle: 'Más — ajustes y avanzado',
    more: [
      ['🌎', 'Plataformas y pruebas', 'Elige tus apps (Uber, 99 y otros del mundo) y tu tipo de transporte (auto, moto, bici).'],
      ['🚗', 'Mi auto (valor + avería)', 'El valor del auto entra en el cálculo del desgaste real por km.'],
      ['🎨', 'Apariencia y alertas', 'Tema (claro/oscuro) y el ajuste completo del card — tamaño, transparencia, posición.'],
      ['🎯', 'Metas y semáforo', 'Aquí ajustas el R$ por viaje y por hora que define verde/amarillo/rojo.'],
      ['🔌', 'Salud del auto (OBD2)', 'Con el sensor, lee consumo real, RPM y temperatura — máxima precisión y seguridad.'],
      ['❓', 'Centro de Ayuda', 'Todo explicado, siempre a mano, dentro del app.'],
    ],
    diffTitle: 'Por qué GigRadar es diferente de todos',
    diffIntro: 'Los otros apps muestran lo que ya ganaste — reporte del pasado. GigRadar decide antes de aceptar y protege lo que nadie más protege junto:',
    diff: [
      ['💰', 'Tu bolsillo', 'R$/km y R$/h reales, ya con tu costo. El precio completo engaña — muestra lo que sobra.'],
      ['🛡️', 'Tu auto', 'Subidas, callejones, inundación. Dañar el auto es el costo oculto que nadie cuenta. Él lo cuenta.'],
      ['🚨', 'Tú', 'Zonas que marcas, efectivo de noche, madrugada. La seguridad viene antes que la ganancia.'],
    ],
  },
  fr: {
    guideTitle: 'Guide rapide : les 4 onglets',
    guideIntro: 'Radar, Gains, Protection et Plus sont en bas — c\'est par là que tout se navigue.',
    tabs: [
      ['◎', 'Radar', 'Le cœur de l\'app : verdict instantané (accepte / attention / refuse) avec vos R$/km et R$/h RÉELS. On y active le lecteur et la commande vocale.'],
      ['📈', 'Gains', 'Votre vrai argent. Dans « Objectifs & feu » vous réglez les R$ par course et par heure (ce qui définit vert/jaune). Notez carburant et coûts — l\'app calcule votre coût/km réel et ajuste les seuils tout seul.'],
      ['🛡️', 'Protection', 'La différence. Carte avec zones, « Alertes & risques » (côtes, ruelles, inondation, espèces la nuit — chacun en 🔕 ignore / ⚠️ prévient / 🚫 refuse) et lieux à éviter par nom.'],
      ['⋯', 'Plus', 'Réglages et avancé : plateformes (Uber, 99 et apps du monde), votre voiture, apparence du card, santé auto via OBD2 et le Centre d\'aide.'],
    ],
    cardTitle: 'Le card est à vous — réglage suggéré',
    cardIntro: 'Il s\'affiche par-dessus Uber/99. La règle d\'or : ne pas cacher ce que vous touchez dans l\'app de course. Notre réglage est déjà pensé pour ça :',
    cardDefaults: [
      'Un seul card (groupé), pas séparé — plus compact.',
      'En haut de l\'écran (~28 %) — Uber/99 n\'y met pas le bouton accepter.',
      'Transparence ~85 % — lisez le verdict et voyez l\'app derrière.',
      'Taille moyenne — visible d\'un coup d\'œil sans cacher la carte. Glissez et ajustez tout dans Plus → Apparence.',
    ],
    zonesTitle: 'Zones à risque : vous marquez, il respecte',
    zones: [
      ['✍️', 'Par nom', 'Tapez le quartier ou le lieu à éviter.'],
      ['🖊️', 'En dessinant', 'Tracez la zone sur la carte au doigt.'],
      ['📍', 'Par épingle', 'Placez une épingle sur le point exact.'],
    ],
    extras: 'Au casque il dit tout ; avec un passager il se déguise en codes de navigation ; le Mode Maison vous ramène en étant payé. De 0 h à 5 h, les zones à risque se durcissent seules.',
    permsTitle: 'Les autorisations du téléphone, expliquées',
    permsIntro: '4 seulement, accordées une fois. Chacune a une raison — sans elles, certaines parties ne marchent pas.',
    perms: [
      ['👁️', 'Accessibilité — essentiel', 'Permet à l\'app de SEULEMENT LIRE l\'offre Uber/99 à l\'écran. Ne touche jamais, n\'accepte jamais, ne se connecte jamais. Sans elle, pas de verdict.'],
      ['🪟', 'Superposition — essentiel', 'Permet au card flottant d\'apparaître par-dessus Uber/99. C\'est ce que vous voyez à l\'offre.'],
      ['🔋', 'Batterie sans restriction', 'Pour que Samsung ne "tue" pas le lecteur en pleine course. Sur Samsung, retirez aussi l\'app des "Apps en veille".'],
      ['📍', 'Localisation', 'Dit le quartier de destination, prévient des côtes/ruelles et du trafic en direct. Sans elle, le reste marche quand même.'],
    ],
    moreTitle: 'Plus — réglages et avancé',
    more: [
      ['🌎', 'Plateformes et tests', 'Choisissez vos apps (Uber, 99 et autres dans le monde) et votre type de transport (voiture, moto, vélo).'],
      ['🚗', 'Ma voiture (valeur + dommage)', 'La valeur de la voiture entre dans le calcul de l\'usure réelle au km.'],
      ['🎨', 'Apparence et alertes', 'Thème (clair/sombre) et le réglage complet du card — taille, transparence, position.'],
      ['🎯', 'Objectifs et feu', 'Réglez ici les R$ par course et par heure qui définissent vert/jaune/rouge.'],
      ['🔌', 'Santé auto (OBD2)', 'Avec le capteur, lit la conso réelle, le RPM et la température — précision maximale et sécurité.'],
      ['❓', 'Centre d\'aide', 'Tout expliqué, toujours à portée de main, dans l\'app.'],
    ],
    diffTitle: 'Pourquoi GigRadar est différent de tous',
    diffIntro: 'Les autres apps montrent ce que vous avez déjà gagné — un rapport du passé. GigRadar décide avant que vous acceptiez et protège ce que personne d\'autre ne protège ensemble :',
    diff: [
      ['💰', 'Votre portefeuille', 'R$/km et R$/h réels, déjà avec votre coût. Le prix affiché ment — il montre ce qui reste.'],
      ['🛡️', 'Votre voiture', 'Côtes, ruelles, inondation. Abîmer la voiture est le coût caché que personne ne compte. Lui, si.'],
      ['🚨', 'Vous', 'Zones que vous marquez, espèces la nuit, heures tardives. La sécurité avant le profit.'],
    ],
  },
} as const

const GigRadar: React.FC<GigRadarProps> = ({ lang }) => {
  const t = content[lang] ?? content.pt
  const g = GIG_GUIDE[lang] ?? GIG_GUIDE.pt
  const [formData, setFormData] = useState({ name: '', whatsapp: '', email: '', city: '', app: '', phone: '', referral: '' })
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [acceptedFeedback, setAcceptedFeedback] = useState(false)
  const [acceptedUpdates, setAcceptedUpdates] = useState(false)
  const [sent, setSent] = useState(false)
  const [apkVersion, setApkVersion] = useState<string | null>(null)
  const { theme, setTheme } = useTheme()

  // Padrão escuro só nesta página (pedido Ranz 22/jul) — restaura o tema anterior ao sair,
  // sem marcar como escolha manual do usuário nem afetar o resto do site.
  useEffect(() => {
    const previous = theme
    setTheme('dark')
    return () => setTheme(previous)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 🔓 Self-service do código de liberação (16/jul): deviceId + contato → código na hora.
  const [codeDevice, setCodeDevice] = useState('')
  const [codeContact, setCodeContact] = useState('')
  const [codeResult, setCodeResult] = useState<string | null>(null)
  const [codeError, setCodeError] = useState<string | null>(null)
  const [codeLoading, setCodeLoading] = useState(false)

  const handleGenerateCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setCodeError(null)
    setCodeResult(null)
    if (!codeDevice.trim() || !codeContact.trim()) return
    setCodeLoading(true)
    try {
      const res = await ApiService.redeemGigRadarCode(codeDevice.trim(), codeContact.trim())
      setCodeResult(res.code)
    } catch (err) {
      setCodeError(err instanceof Error ? err.message : 'Erro ao gerar o código.')
    } finally {
      setCodeLoading(false)
    }
  }

  // 15/jul: no celular o site entra claro por padrão — só nesta página força escuro (GigRadar
  // é radar de motorista, escuro combina mais e reduz brilho à noite). Ao sair, recalcula o
  // padrão certo direto do localStorage (mesma regra do ThemeProvider) em vez de confiar numa
  // variável "anterior" capturada na closure — mais robusto contra o double-effect do React em
  // dev e não mexe na preferência do usuário nas outras páginas.
  useEffect(() => {
    const isMobile = window.innerWidth < 768
    if (!isMobile) return
    setTheme('dark')
    return () => {
      const manual = localStorage.getItem('azimut-theme-manual') === 'true'
      const saved = localStorage.getItem('azimut-theme')
      setTheme(manual && (saved === 'dark' || saved === 'light') ? saved : 'light')
    }
  }, [])

  useEffect(() => {
    fetch(APK_VERSION_URL)
      .then(r => (r.ok ? r.json() : null))
      .then(d => setApkVersion(d?.version ?? null))
      .catch(() => {})
  }, [])

  const waLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    `Quero testar o GigRadar! Nome: ${formData.name || '—'} · Cidade: ${formData.city || '—'} · App: ${formData.app || '—'}`
  )}`

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!acceptedTerms || !acceptedFeedback) return
    try {
      await fetch(`${GIGRADAR_ADMIN_URL}/api/testers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          whatsapp: formData.whatsapp,
          city: formData.city,
          app: formData.app,
          referredBy: formData.referral || undefined,
          acceptedTos: acceptedTerms && acceptedFeedback,
        }),
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
            <p className="mt-3 text-sm font-semibold" style={{ color: 'var(--theme-text)' }}>{t.androidOnly}</p>
          </div>

          {/* Posicionamento do produto */}
          <section className="mb-16 mx-auto max-w-3xl">
            <h2 className="mb-4 font-handel text-2xl md:text-3xl uppercase tracking-[0.1em] text-center" style={{ color: 'var(--theme-text)' }}>
              {t.positionTitle}
            </h2>
            <p className="mx-auto mb-7 max-w-2xl text-center text-base leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
              {t.positionIntro}
            </p>
            <ul className="grid gap-4 sm:grid-cols-2">
              {t.pillars.map(([icon, title, body]) => (
                <li key={title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="text-xl" aria-hidden="true">{icon}</span>
                    <strong style={{ color: 'var(--theme-text)' }}>{title}</strong>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>{body}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-2xl border border-amber-400/30 bg-amber-400/5 p-5 text-sm leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
              🎥 {t.cameraPlanned}
            </p>
          </section>

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

          {/* Guia de uso: as 4 abas + card + zonas de risco */}
          <section className="mb-16">
            <h2 className="mb-8 font-handel text-2xl md:text-3xl uppercase tracking-[0.1em] text-center" style={{ color: 'var(--theme-text)' }}>
              {g.guideTitle}
            </h2>
            <p className="mx-auto mb-7 max-w-2xl text-center text-base leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>{g.guideIntro}</p>
            <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
              {g.tabs.map(([emoji, tab, desc], i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="mb-2 flex items-center gap-3">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-lg"
                      style={{ background: 'linear-gradient(135deg, rgba(109,40,217,.35), rgba(245,158,11,.35))' }}
                      aria-hidden="true"
                    >{emoji}</span>
                    <strong className="font-handel text-sm uppercase tracking-[0.08em]" style={{ color: 'var(--theme-text)' }}>{tab}</strong>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>{desc}</p>
                </div>
              ))}
            </div>

            {/* Card: sugestão de padrão */}
            <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-azimut-red/30 bg-azimut-red/5 p-6">
              <h3 className="mb-2 font-handel text-lg uppercase tracking-[0.1em]" style={{ color: 'var(--theme-text)' }}>{g.cardTitle}</h3>
              <p className="mb-3 text-sm leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>{g.cardIntro}</p>
              <ul className="space-y-2">
                {g.cardDefaults.map((d, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
                    <span className="text-azimut-red" aria-hidden="true">▸</span>{d}
                  </li>
                ))}
              </ul>
            </div>

            {/* Zonas de risco */}
            <div className="mx-auto mt-6 max-w-3xl">
              <h3 className="mb-4 text-center font-handel text-lg uppercase tracking-[0.1em]" style={{ color: 'var(--theme-text)' }}>{g.zonesTitle}</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                {g.zones.map(([emoji, title, body], i) => (
                  <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
                    <div className="mb-2 text-2xl">{emoji}</div>
                    <strong className="mb-1 block text-sm" style={{ color: 'var(--theme-text)' }}>{title}</strong>
                    <span className="text-sm leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>{body}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 rounded-2xl border border-amber-400/30 bg-amber-400/5 p-5 text-center text-sm leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>{g.extras}</p>
            </div>

            {/* Permissões, explicadas item a item pra quem é leigo */}
            <div className="mx-auto mt-10 max-w-3xl">
              <h3 className="mb-2 text-center font-handel text-lg uppercase tracking-[0.1em]" style={{ color: 'var(--theme-text)' }}>{g.permsTitle}</h3>
              <p className="mx-auto mb-5 max-w-2xl text-center text-sm leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>{g.permsIntro}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {g.perms.map(([emoji, title, body], i) => (
                  <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-lg">{emoji}</span>
                      <strong className="text-sm" style={{ color: 'var(--theme-text)' }}>{title}</strong>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>{body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mais recursos: plataformas, carro, aparência, metas, OBD2, ajuda */}
            <div className="mx-auto mt-10 max-w-3xl">
              <h3 className="mb-5 text-center font-handel text-lg uppercase tracking-[0.1em]" style={{ color: 'var(--theme-text)' }}>{g.moreTitle}</h3>
              <div className="grid gap-3 sm:grid-cols-3">
                {g.more.map(([emoji, title, body], i) => (
                  <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                    <div className="mb-1 text-xl">{emoji}</div>
                    <strong className="mb-1 block text-xs" style={{ color: 'var(--theme-text)' }}>{title}</strong>
                    <span className="text-xs leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>{body}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Diferencial: por que somos diferentes de todos */}
            <div className="mx-auto mt-10 max-w-3xl rounded-2xl p-7" style={{ background: 'linear-gradient(135deg, rgba(201,35,55,.14), rgba(201,35,55,.04))', border: '1px solid rgba(201,35,55,.25)' }}>
              <h3 className="mb-2 text-center font-handel text-xl uppercase tracking-[0.1em]" style={{ color: 'var(--theme-text)' }}>{g.diffTitle}</h3>
              <p className="mx-auto mb-5 max-w-2xl text-center text-sm leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>{g.diffIntro}</p>
              <div className="grid gap-4 sm:grid-cols-3">
                {g.diff.map(([emoji, title, body], i) => (
                  <div key={i} className="text-center">
                    <div className="mb-1 text-2xl">{emoji}</div>
                    <strong className="mb-1 block text-sm" style={{ color: 'var(--theme-text)' }}>{title}</strong>
                    <span className="text-xs leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>{body}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 🔓 Self-service do código de liberação */}
          <section className="mb-16 mx-auto max-w-2xl rounded-2xl border border-azimut-red/30 bg-azimut-red/5 p-6">
            <h2 className="mb-2 font-handel text-xl md:text-2xl uppercase tracking-[0.1em]" style={{ color: 'var(--theme-text)' }}>
              {t.codeTitle}
            </h2>
            <p className="mb-5 text-sm leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
              {t.codeIntro}
            </p>
            <form onSubmit={handleGenerateCode} className="space-y-3">
              <input
                type="text"
                value={codeDevice}
                onChange={e => setCodeDevice(e.target.value)}
                placeholder={t.codeDevicePh}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-azimut-red/60 transition-colors font-mono"
                style={{ color: 'var(--theme-text)' }}
              />
              <input
                type="text"
                value={codeContact}
                onChange={e => setCodeContact(e.target.value)}
                placeholder={t.codeContactPh}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-azimut-red/60 transition-colors"
                style={{ color: 'var(--theme-text)' }}
              />
              <button
                type="submit"
                disabled={codeLoading}
                className="w-full rounded-xl bg-azimut-red px-6 py-4 font-handel text-sm uppercase tracking-[0.15em] text-white hover:bg-azimut-red/90 transition-colors disabled:opacity-60"
              >
                {codeLoading ? t.codeLoading : t.codeBtn}
              </button>
            </form>

            {codeError && (
              <p className="mt-4 rounded-xl border border-amber-400/40 bg-amber-400/10 p-3 text-sm" style={{ color: 'var(--theme-text)' }}>
                ⚠️ {codeError}
              </p>
            )}

            {codeResult && (
              <div className="mt-5 rounded-xl border border-green-400/40 bg-green-400/10 p-5 text-center">
                <p className="mb-2 text-sm" style={{ color: 'var(--theme-text-secondary)' }}>{t.codeResultTitle}</p>
                <p className="font-mono text-2xl md:text-3xl font-bold tracking-[0.2em] select-all" style={{ color: 'var(--theme-text)' }}>
                  {codeResult}
                </p>
                <p className="mt-3 text-xs leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>{t.codeResultHint}</p>
              </div>
            )}
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

          {/* Termos do beta */}
          <section id="termos-beta" className="mb-16 mx-auto max-w-2xl rounded-2xl border border-azimut-red/30 bg-azimut-red/5 p-6">
            <h2 className="mb-2 font-handel text-xl uppercase tracking-[0.1em]" style={{ color: 'var(--theme-text)' }}>
              {t.termsTitle}
            </h2>
            <p className="mb-5 text-xs uppercase tracking-[0.12em]" style={{ color: 'var(--theme-text-secondary)' }}>
              {t.termsVersion}
            </p>
            <ol className="space-y-4">
              {t.betaTerms.map(([title, body], i) => (
                <li key={title} className="text-sm leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
                  <span className="mr-2 font-semibold text-azimut-red">{i + 1}.</span>
                  <strong style={{ color: 'var(--theme-text)' }}>{title}.</strong> {body}
                </li>
              ))}
            </ol>
            <Link to={`/${lang}/privacy`} className="mt-6 inline-block text-sm text-azimut-red hover:underline">
              {t.privacyLink} →
            </Link>
          </section>

          {/* Privacidade */}
          <section className="mb-16 mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="mb-3 font-handel text-lg uppercase tracking-[0.1em]" style={{ color: 'var(--theme-text)' }}>
              🔒 {t.privacyTitle}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>{t.privacy}</p>
            <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>{t.diagnosticsNotice}</p>
          </section>

          {/* Formulário */}
          <section className="mx-auto max-w-2xl">
            <h2 className="mb-8 font-handel text-2xl md:text-3xl uppercase tracking-[0.1em] text-center" style={{ color: 'var(--theme-text)' }}>
              {t.formTitle}
            </h2>

            {sent ? (
              <div className="space-y-6">
                <div className="rounded-2xl border border-azimut-red/30 bg-azimut-red/10 p-8 text-center">
                  <p className="mb-3 text-lg font-semibold" style={{ color: 'var(--theme-text)' }}>{t.sentTitle}</p>
                  <p className="mb-6 text-sm leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>{t.sentMsg}</p>

                  <p className="mb-2 font-handel text-base uppercase tracking-[0.12em]" style={{ color: 'var(--theme-text)' }}>
                    {t.downloadTitle}
                  </p>
                  <a
                    href={APK_URL}
                    download
                    className="inline-block rounded-xl bg-[#1FA46A] px-6 py-3 font-handel text-sm uppercase tracking-[0.15em] text-white hover:opacity-90 transition-opacity"
                  >
                    {t.downloadBtn}
                  </a>
                  <p className="mt-2 text-xs" style={{ color: 'var(--theme-text-secondary)' }}>
                    {t.downloadNote}{apkVersion ? ` (v${apkVersion})` : ''}
                  </p>

                  <div className="mt-6 border-t border-white/10 pt-6">
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-xl bg-azimut-red px-6 py-3 font-handel text-sm uppercase tracking-[0.15em] text-white hover:bg-azimut-red/90 transition-colors"
                    >
                      {t.sentBtn}
                    </a>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="mb-4 font-handel text-lg uppercase tracking-[0.1em] text-center" style={{ color: 'var(--theme-text)' }}>
                    {t.stepsTitle}
                  </h3>
                  <ol className="space-y-3">
                    {t.steps.map((s, i) => (
                      <li key={i} className="flex items-start gap-4 text-sm leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-azimut-red font-bold text-white text-xs">{i + 1}</span>
                        {s}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="mb-2 font-handel text-lg uppercase tracking-[0.1em] text-center" style={{ color: 'var(--theme-text)' }}>
                    {t.setupModesTitle}
                  </h3>
                  <p className="mb-5 text-center text-xs" style={{ color: 'var(--theme-text-secondary)' }}>
                    {t.setupModesIntro}
                  </p>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {t.setupModes.map(([icon, name, desc]) => (
                      <li key={name} className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-lg" aria-hidden="true">{icon}</span>
                          <strong className="text-sm" style={{ color: 'var(--theme-text)' }}>{name}</strong>
                        </div>
                        <p className="text-xs leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>{desc}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { key: 'name', ph: t.namePh, type: 'text', req: true },
                  { key: 'whatsapp', ph: t.whatsPh, type: 'tel', req: true },
                  { key: 'email', ph: t.emailPh, type: 'email', req: true },
                  { key: 'city', ph: t.cityPh, type: 'text', req: true },
                  { key: 'phone', ph: t.phonePh, type: 'text', req: false },
                  { key: 'referral', ph: t.referralPh, type: 'text', req: false },
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
                    checked={acceptedTerms}
                    onChange={e => setAcceptedTerms(e.target.checked)}
                    className="mt-1 accent-[#C92337]"
                  />
                  {t.acceptTerms}
                </label>
                <label className="flex items-start gap-3 text-sm cursor-pointer" style={{ color: 'var(--theme-text-secondary)' }}>
                  <input
                    type="checkbox"
                    required
                    checked={acceptedFeedback}
                    onChange={e => setAcceptedFeedback(e.target.checked)}
                    className="mt-1 accent-[#C92337]"
                  />
                  {t.acceptFeedback}
                </label>
                <label className="flex items-start gap-3 text-sm cursor-pointer" style={{ color: 'var(--theme-text-secondary)' }}>
                  <input
                    type="checkbox"
                    checked={acceptedUpdates}
                    onChange={e => setAcceptedUpdates(e.target.checked)}
                    className="mt-1 accent-[#C92337]"
                  />
                  {t.acceptUpdates}
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
