import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { type Lang } from '../i18n'
import SEO from '../components/SEO'
import { ApiService } from '../services/api'

interface GigRadarProps {
  lang: Lang
}

// Beta fechado: o gate é o cadastro, mas o download em si é instantâneo na página
// (o APK é publicado aqui automaticamente pelo CI do GigRadar a cada build — sempre a
// versão mais recente). O WhatsApp fica só pro código de liberação + grupo de testadores.
const WHATSAPP = '5548999701301'
const APK_URL = '/downloads/gigradar-latest.apk'
const APK_VERSION_URL = '/downloads/gigradar-version.json'

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

const GigRadar: React.FC<GigRadarProps> = ({ lang }) => {
  const t = content[lang] ?? content.pt
  const [formData, setFormData] = useState({ name: '', whatsapp: '', email: '', city: '', app: '', phone: '' })
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [acceptedFeedback, setAcceptedFeedback] = useState(false)
  const [acceptedUpdates, setAcceptedUpdates] = useState(false)
  const [sent, setSent] = useState(false)
  const [apkVersion, setApkVersion] = useState<string | null>(null)

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
      await ApiService.submitLead({
        name: formData.name,
        email: formData.email,
        phone: formData.whatsapp,
        leadType: 'gigradar-beta',
        source: 'gigradar-page',
        lang,
        interest: formData.app,
        message: `GigRadar BETA v1.1\nWhatsApp: ${formData.whatsapp}\nCidade: ${formData.city}\nApp: ${formData.app}\nCelular: ${formData.phone || '—'}\nTermos beta: aceito\nRetorno semanal e regra de 14 dias: aceitos\nDiagnóstico automático: não habilitado\nComunicações de atualização: ${acceptedUpdates ? 'aceitas' : 'não autorizadas'}`,
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
