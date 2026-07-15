/**
 * Configuração do menu do backoffice: rótulos, links e descrições para
 * tooltip (passar o mouse) e para a página Manual / Ajuda.
 */

export interface MenuItemManual {
  href: string
  label: string
  /** Texto curto para tooltip ao passar o mouse */
  tooltip: string
  /** Texto para a página Manual: o que é, que dados contém e como usar */
  description: string
  /** Instruções passo a passo para usar a funcionalidade */
  howTo?: string[]
  /** Dicas importantes */
  tips?: string[]
  /** Campos principais que o usuário vai encontrar */
  fields?: string[]
  /** Erros comuns e como evitar */
  commonErrors?: string[]
}

export const MENU_MANUAL_ITEMS: MenuItemManual[] = [
  {
    href: '/admin/help',
    label: '📖 Manual',
    tooltip: 'Manual do backoffice: descrição de cada área e como usar.',
    description: 'Esta página. Lista todas as áreas do backoffice com link e explicação: o que é, que dados contém e como usar. Consulte quando tiver dúvida sobre uma aba ou função.',
    tips: [
      'Passe o mouse sobre qualquer item do menu lateral para ver uma descrição curta',
      'Use Ctrl+F para buscar nesta página',
    ],
  },
  {
    href: '/admin',
    label: '🏠 Dashboard',
    tooltip: 'Visão geral do backoffice: resumo de conteúdo e acessos rápidos.',
    description: 'Página inicial do painel. Mostra visão geral do sistema, atalhos e resumo de projetos, leads e conteúdo. Use para ter uma visão rápida do estado do site e acessar outras áreas.',
    howTo: [
      'Acesse o Dashboard ao fazer login',
      'Veja os cards de resumo: projetos, leads, posts',
      'Clique nos atalhos para ir direto à área desejada',
    ],
    tips: [
      'Comece o dia pelo Dashboard para ver se há leads novos ou pendências',
    ],
  },
  {
    href: '/admin/analytics',
    label: '📊 Analytics IA',
    tooltip: 'Métricas e gráficos de visitantes, leads e comportamento no site.',
    description: 'Métricas e análises do site: visitantes, países, funil de conversão, distribuição de score dos leads, timeline. Os dados vêm do rastreamento no site (GA/backend). Use para acompanhar tráfego e eficácia de campanhas.',
    howTo: [
      'Acesse Analytics IA no menu',
      'Selecione o período desejado (7 dias, 30 dias, etc.)',
      'Analise os gráficos de visitantes, países e funil',
      'Veja a distribuição de score dos leads',
    ],
    tips: [
      'Compare períodos para identificar tendências',
      'Leads com score alto (70+) são prioridade',
      'Verifique de quais países vêm os visitantes para campanhas segmentadas',
    ],
  },
  {
    href: '/admin/projects',
    label: '🎥 Projetos',
    tooltip: 'Portfólio: projetos na página Projetos (/work) e nos cards da Home. Imagem de capa = card.',
    description: 'CRUD do portfólio. Cada projeto aparece na listagem /work e, se tiver prioridade, nos cards "Projetos em Destaque" da Home. A "Imagem de capa" do projeto é a que aparece no card (Home e página Projetos). Campos: título, descrição, galeria, tags, slug, SEO.',
    howTo: [
      'Clique em "Novo Projeto" para criar',
      'Preencha: Título (PT obrigatório), Slug (URL amigável), Descrição',
      'Adicione imagem de capa (thumbnail) — ideal 1200x800px',
      'Adicione imagens na Galeria (arraste para reordenar)',
      'Defina Tags para filtros no site',
      'Preencha SEO: título e descrição para Google',
      'Marque "Publicado" e salve',
    ],
    fields: [
      'Título (PT, EN, ES, FR) — nome do projeto',
      'Slug — URL do projeto (ex: "museu-olimpico" → /work/museu-olimpico)',
      'Descrição — texto sobre o projeto',
      'Cliente — nome do cliente',
      'Ano — ano de realização',
      'Thumbnail — imagem de capa (aparece na listagem)',
      'Galeria — imagens do projeto',
      'Tags — categorias para filtro',
      'SEO Title / Description — para Google',
      'Publicado — se aparece no site',
    ],
    tips: [
      'Slug deve ser único e sem acentos (ex: "museu-olimpico")',
      'Use imagens otimizadas (WebP, max 500KB)',
      'Preencha pelo menos PT e EN para SEO internacional',
      'Projetos não publicados não aparecem no site, mas ficam salvos',
    ],
    commonErrors: [
      'Slug duplicado: cada projeto precisa de um slug único',
      'Imagem muito grande: otimize antes de fazer upload',
      'Esquecer de marcar "Publicado": o projeto não aparece no site',
    ],
  },
  {
    href: '/admin/academy',
    label: '🎓 Academy',
    tooltip: 'Edição visual da Academy: Cursos, Workshops, Corporate, Vancouver. Cards como na Home — trocar imagem e editar textos.',
    description: 'Hub visual da Academy. Lista as páginas da Academy (Cursos, Workshops, Corporate, Research, etc.) em cards como no site. Em cada card: Trocar imagem (hero) e EDITAR (abre o editor de página). Inclui link para a galeria Past Events.',
    howTo: [
      'Acesse Academy no menu',
      'Veja os cards de cada parte (Cursos, Workshops, Corporate, etc.)',
      'Use "Trocar imagem" para alterar o hero; "EDITAR" para textos e SEO',
      'Para Past Events: use o link "Galeria Past Events" ou edite a página Workshops',
    ],
    tips: [
      'O mesmo padrão da Home: preview visual + botões Trocar e EDITAR',
      'As páginas Academy são editadas em Páginas > editar; o hub é um atalho visual',
    ],
  },
  {
    href: '/admin/blog',
    label: '📝 Blog',
    tooltip: 'Artigos do blog: criar, editar e publicar posts do site.',
    description: 'Gestão dos artigos do blog do site. Crie posts, defina categorias, imagens e SEO. Os artigos publicados aparecem na listagem do blog no site. Use para conteúdo de blog e SEO.',
    howTo: [
      'Clique em "Novo Post" para criar',
      'Preencha: Título, Slug, Conteúdo (editor de texto)',
      'Selecione uma Categoria',
      'Adicione imagem de capa',
      'Preencha Excerpt (resumo para listagem)',
      'Configure SEO: título e descrição',
      'Defina status: Rascunho, Publicado ou Agendado',
      'Salve',
    ],
    fields: [
      'Título (PT, EN, ES, FR) — título do post',
      'Slug — URL do post (ex: "como-criar-experiencias-imersivas")',
      'Conteúdo — texto do artigo (suporta formatação)',
      'Excerpt — resumo curto (aparece na listagem)',
      'Categoria — para organização e filtros',
      'Imagem de capa — aparece no topo e na listagem',
      'Autor — nome e foto do autor',
      'Tempo de leitura — estimativa em minutos',
      'SEO Title / Description — para Google',
      'Status — Rascunho, Publicado, Agendado',
    ],
    tips: [
      'Posts em "Rascunho" não aparecem no site',
      'Use títulos atrativos e SEO-friendly',
      'Excerpt deve ter 150-200 caracteres',
      'Imagem de capa ideal: 1200x630px (proporção para redes sociais)',
    ],
    commonErrors: [
      'Esquecer de mudar status para "Publicado"',
      'Slug duplicado: use slugs únicos',
      'Conteúdo sem formatação: use títulos (H2, H3) para organizar',
    ],
  },
  {
    href: '/admin/blog/monitor',
    label: '🤖 Monitoramento',
    tooltip: 'Sugestões de posts geradas por IA para aprovar ou descartar.',
    description: 'Monitor de sugestões de conteúdo para o blog geradas por IA. Lista itens pendentes de aprovação; você pode aprovar, editar ou descartar. O badge no menu mostra a quantidade de pendências.',
    howTo: [
      'Acesse Monitoramento no menu',
      'Veja a lista de sugestões pendentes',
      'Clique em uma sugestão para ver detalhes',
      'Opções: Aprovar (vira post), Editar (ajustar antes), Descartar (ignorar)',
      'Sugestões aprovadas vão para o Blog como rascunho',
    ],
    tips: [
      'Revise o conteúdo antes de aprovar — IA pode errar',
      'Verifique se o tema é relevante para o público',
      'Descarte sugestões duplicadas ou irrelevantes',
    ],
  },
  {
    href: '/admin/making-of',
    label: '🎬 Making-of',
    tooltip: 'Conteúdo making-of: vídeos e materiais de bastidores dos projetos.',
    description: 'Gestão de conteúdos "making-of" (bastidores) vinculados a projetos. Crie e publique making-ofs; podem ser exibidos no site ou em materiais de divulgação. Use para enriquecer a página de cada projeto.',
    howTo: [
      'Clique em "Novo Making-of"',
      'Selecione o Projeto relacionado',
      'Adicione título e descrição',
      'Faça upload de vídeo ou imagens',
      'Marque como publicado e salve',
    ],
    tips: [
      'Making-ofs enriquecem a página do projeto',
      'Vídeos curtos (1-3 min) têm mais engajamento',
    ],
  },
  {
    href: '/admin/making-of/curation',
    label: '🎨 Curadoria',
    tooltip: 'Curadoria e organização dos conteúdos making-of.',
    description: 'Curadoria dos making-ofs: organizar, destacar ou ocultar itens. Use para decidir quais making-ofs aparecem em destaque no site.',
    howTo: [
      'Acesse Curadoria',
      'Arraste itens para reordenar',
      'Marque itens como "Destaque" para aparecerem primeiro',
      'Oculte itens que não devem aparecer',
    ],
  },
  {
    href: '/admin/site-pages',
    label: '📄 Páginas',
    tooltip: 'Textos e mídia do topo de cada página. Home = slogan, vídeo e capa do hero (não os cards de projetos).',
    description: 'Edição do conteúdo das páginas do site (Home, Studio, Academy, Contato, etc.). Na Home você edita: slogan, subtítulo, vídeo e capa do topo (hero). Os cards "Projetos em Destaque" vêm de Projetos, não daqui. Cada página tem hero, textos e SEO.',
    howTo: [
      'Acesse Páginas no menu',
      'Clique na página que deseja editar (ex: Home, Studio)',
      'Edite as seções: Hero (banner principal), textos, CTAs',
      'Cada seção tem campos em PT, EN, ES, FR',
      'Configure SEO da página',
      'Salve as alterações',
    ],
    fields: [
      'Hero Slogan — frase principal do banner',
      'Hero Subtitle — subtítulo do banner',
      'Hero CTA — texto do botão principal',
      'Seções — blocos de conteúdo da página',
      'SEO Title / Description — para Google',
    ],
    tips: [
      'Alterações aparecem imediatamente no site após salvar',
      'Preencha todos os idiomas para SEO internacional',
      'Hero é a primeira coisa que o visitante vê — capriche!',
      'Use as áreas Imprensa e Publicações para conteúdo específico',
    ],
    commonErrors: [
      'Salvar sem preencher PT: campo obrigatório',
      'Textos muito longos no Hero: mantenha curto e impactante',
    ],
  },
  {
    href: '/admin/media',
    label: '🖼️ Mídias',
    tooltip: 'Enviar imagens e vídeos aqui; depois use em Páginas e Projetos (Selecionar da Biblioteca).',
    description: 'Upload central de imagens e vídeos. Envie aqui primeiro; ao editar uma Página ou um Projeto, use "Selecionar da Biblioteca" para escolher essas mídias. O que você envia aqui aparece disponível em Home (vídeo/capa), Projetos (imagem de capa e galeria) e Serviços.',
    howTo: [
      'Acesse Mídias no menu',
      'Clique em "Upload" para enviar novas imagens',
      'Arraste arquivos ou clique para selecionar',
      'Após upload, a imagem fica disponível para uso em projetos e páginas',
      'Clique em uma imagem para ver detalhes e copiar URL',
    ],
    fields: [
      'Nome — nome do arquivo',
      'URL — link direto para a imagem',
      'Alt Text — descrição para acessibilidade e SEO',
      'Tamanho — dimensões e peso do arquivo',
    ],
    tips: [
      'Use WebP para melhor performance',
      'Otimize imagens antes do upload (max 500KB)',
      'Preencha Alt Text para SEO e acessibilidade',
      'Evite duplicar imagens — busque antes de fazer upload',
    ],
    commonErrors: [
      'Imagens muito grandes: site fica lento',
      'Alt Text vazio: prejudica SEO e acessibilidade',
    ],
  },
  {
    href: '/admin/leads',
    label: '👥 Leads',
    tooltip: 'Leads captados pelo site: contato, Vancouver, formulários e scoring.',
    description: 'Lista de leads captados pelo site (formulário de contato, Vancouver, quiz, etc.). Visualize dados, score de qualidade e status. O Kanban permite organizar por estágio. Use para acompanhar e qualificar oportunidades.',
    howTo: [
      'Acesse Leads no menu',
      'Veja a lista de leads (mais recentes primeiro)',
      'Clique em um lead para ver detalhes completos',
      'Use filtros para buscar por status, score ou origem',
      'Mude o status do lead: Novo → Contatado → Proposta → Ganho/Perdido',
      'Adicione notas internas sobre o lead',
    ],
    fields: [
      'Nome — nome do lead',
      'E-mail — contato principal',
      'Telefone — se fornecido',
      'Empresa — empresa do lead',
      'Origem — de onde veio (formulário, quiz, Vancouver)',
      'Score — pontuação de qualidade (0-100)',
      'Status — estágio no funil (Novo, Contatado, etc.)',
      'Notas — anotações internas',
    ],
    tips: [
      'Leads com score alto (70+) são prioridade — contate primeiro',
      'Atualize o status sempre que houver interação',
      'Use notas para registrar conversas e próximos passos',
      'Leads "Perdidos" ficam no histórico para análise',
    ],
    commonErrors: [
      'Esquecer de atualizar status: dificulta acompanhamento',
      'Não registrar notas: perde histórico de conversas',
    ],
  },
  {
    href: '/admin/leads?leadType=GIGRADAR_BETA',
    label: '🚗 GigRadar Beta',
    tooltip: 'Cadastros do beta fechado do app GigRadar (motoristas de app).',
    description: 'Lista filtrada dos leads que vieram da página /gigradar (cadastro do beta fechado do app de motorista). Mesma tela de Leads, já filtrada pra esse tipo.',
    howTo: [
      'Acesse GigRadar Beta no menu',
      'Veja quem se cadastrou pra testar o app',
      'Use o WhatsApp/e-mail do lead pra mandar o código de liberação',
    ],
    fields: [
      'Nome, WhatsApp, e-mail, cidade — do formulário /gigradar',
    ],
    tips: [
      'O deviceId do testador chega por WhatsApp, não aqui — gere o código com tools/gr_code.py',
    ],
    commonErrors: [],
  },
  {
    href: '/admin/gigradar-logs',
    label: '🧪 GigRadar Logs',
    tooltip: 'Logs de diagnóstico enviados pelos beta testers do GigRadar.',
    description: 'Logs que o app GigRadar manda quando o testador aperta "Enviar log" (fase beta). Cada entrada já vem com um resumo automático por IA. Use pra revisar bugs reportados por testador e data.',
    howTo: [
      'Acesse GigRadar Logs no menu',
      'Leia o resumo por IA (destacado em roxo) de cada entrada',
      'Abra o log bruto (clique no card) se precisar do detalhe completo',
    ],
    fields: [
      'deviceId — identifica o aparelho (não a pessoa)',
      'appVersion — versão do app que mandou',
      'aiSummary — resumo automático gerado por IA',
      'logText — o log bruto (já redigido/seguro no app antes de enviar)',
    ],
    tips: [
      'Sem log em 7 dias, o próprio app já cobra o testador de novo (bloqueio automático).',
    ],
    commonErrors: [],
  },
  {
    href: '/admin/leads/game',
    label: '🎮 Leads do Jogo',
    tooltip: 'Leads gerados pelo game neurolinguístico no site.',
    description: 'Leads que vieram do game neurolinguístico (jogo interativo no site). Lista separada para analisar e nutrir esse público específico. Esses leads geralmente têm perfil mais engajado.',
    howTo: [
      'Acesse Leads do Jogo no menu',
      'Veja leads que completaram o game',
      'Analise as respostas do quiz para entender o perfil',
      'Contate leads qualificados',
    ],
    tips: [
      'Leads do jogo geralmente são mais engajados',
      'Use as respostas do quiz para personalizar a abordagem',
    ],
  },
  {
    href: '/admin/leads/dashboard',
    label: '🎯 Dashboard Leads IA',
    tooltip: 'Visão consolidada de leads com insights e priorização por IA.',
    description: 'Dashboard focado em leads: KPIs, insights gerados por IA e priorização. Use para decisões rápidas sobre quais leads abordar primeiro.',
    howTo: [
      'Acesse Dashboard Leads IA',
      'Veja KPIs: total de leads, taxa de conversão, leads quentes',
      'Leia insights gerados por IA',
      'Veja a lista priorizada de leads para contato',
    ],
    tips: [
      'Comece o dia por aqui para ver prioridades',
      'Insights de IA ajudam a identificar padrões',
    ],
  },
  {
    href: '/admin/tools',
    label: '🛠️ Ferramentas',
    tooltip: 'Ferramentas auxiliares: tradução, SEO, limpeza de dados, etc.',
    description: 'Ferramentas utilitárias do backoffice: tradução em massa, otimização de SEO, limpeza de dados de teste e outras ações em lote. Use com cuidado em produção.',
    howTo: [
      'Acesse Ferramentas no menu',
      'Selecione a ferramenta desejada',
      'Siga as instruções na tela',
      'Confirme antes de executar ações destrutivas',
    ],
    tips: [
      'CUIDADO: algumas ferramentas apagam dados',
      'Leia a descrição antes de usar',
      'Em caso de dúvida, pergunte ao supervisor',
    ],
    commonErrors: [
      'Usar "Limpar dados de teste" em produção: apaga dados reais',
    ],
  },
  {
    href: '/admin/roadmap',
    label: '🗺️ Roadmap',
    tooltip: 'Planejamento e roadmap de funcionalidades do produto.',
    description: 'Roadmap e planejamento de funcionalidades. Consulte prioridades e próximos passos do produto e do backoffice. Área informativa.',
  },
  {
    href: '/admin/marketing/preview',
    label: '🎁 Marketing Preview',
    tooltip: 'Preview de materiais e campanhas de marketing.',
    description: 'Visualização de materiais de marketing (landing pages, e-mails, etc.) antes de publicar. Use para validar campanhas.',
    howTo: [
      'Acesse Marketing Preview',
      'Selecione o material para visualizar',
      'Revise o conteúdo e layout',
      'Aprove ou solicite ajustes',
    ],
  },
  {
    href: '/admin/web3/setup-wallet',
    label: '🔐 Configurar Carteira',
    tooltip: 'Configuração da carteira Web3 para recompensas e pagamentos.',
    description: 'Configuração da carteira cripto (Web3) usada para receber pagamentos e distribuir recompensas a estudantes. Necessário para o fluxo de recompensas. Área avançada — consulte o supervisor.',
  },
  {
    href: '/admin/web3/wallet-status',
    label: '💰 Carteira Web3',
    tooltip: 'Status e saldo da carteira Web3 conectada.',
    description: 'Consulta o status e o saldo da carteira Web3 configurada. Use para conferir se há saldo para recompensas.',
  },
  {
    href: '/admin/web3/student-rewards',
    label: '🎓 Recompensas Estudantes',
    tooltip: 'Gestão de recompensas (ex.: NFT) para estudantes.',
    description: 'Gestão de recompensas para estudantes (ex.: certificados, NFTs). Registre e distribua recompensas vinculadas ao programa Academy. Área avançada.',
  },
  {
    href: '/admin/newsletter',
    label: '📨 Inscritos',
    tooltip: 'Lista de inscritos na newsletter e gestão de envios.',
    description: 'Lista de e-mails inscritos na newsletter. Você pode adicionar, remover, exportar e enviar campanhas. Use para comunicação em massa com quem se inscreveu no site.',
    howTo: [
      'Acesse Inscritos no menu',
      'Veja a lista de e-mails cadastrados',
      'Use filtros para buscar inscritos específicos',
      'Clique em "Exportar" para baixar a lista (CSV)',
      'Use "Enviar campanha" para disparar e-mails',
    ],
    fields: [
      'E-mail — endereço do inscrito',
      'Data de inscrição — quando se inscreveu',
      'Origem — de onde veio (site, landing page)',
      'Status — ativo ou cancelado',
    ],
    tips: [
      'Respeite a LGPD: só envie para quem autorizou',
      'Ofereça opção de descadastro em todo e-mail',
      'Limpe a lista periodicamente (e-mails inválidos)',
    ],
  },
  {
    href: '/admin/editais',
    label: '📋 Editais',
    tooltip: 'Oportunidades ativas: editais e chamadas. Ligar/desligar cada item no site pelo status.',
    description: 'Lista de editais e chamadas (cultura, arte, XR, festivais, BR/CA). Os com status Aberto aparecem na seção "Oportunidades Ativas" na página Projetos do site. Use status Aberto para exibir e Fechado para ocultar. Não precisa de SQL.',
    howTo: [
      'Acesse Editais no menu',
      'Clique em um edital para editar',
      'Altere Status para Aberto (mostra no site) ou Fechado (oculta)',
      'Salve. O site atualiza na próxima visita à página Projetos',
    ],
    tips: [
      'Ligar item no site = Status Aberto. Desligar = Status Fechado.',
      'Sugestões da IA entram como Enviado; revise e mude para Aberto se quiser publicar.',
    ],
  },
  {
    href: '/admin/n8n-workflow',
    label: '🤖 Automação n8n',
    tooltip: 'Configuração e status dos workflows de automação (n8n).',
    description: 'Integração com n8n: configuração do webhook e status dos workflows de automação (ex.: captação de leads, enriquecimento, e-mail). Quando configurado, novos leads podem disparar fluxos no n8n. Área técnica — consulte o supervisor.',
  },
  {
    href: '/admin/services',
    label: '⚡ Serviços',
    tooltip: 'Soluções/serviços exibidos na página O que fazemos (/what).',
    description: 'CRUD dos serviços (soluções) exibidos na página "O que fazemos" (/what) do site. Cada serviço tem título, descrição, ícone e slug. Use para manter a oferta de serviços atualizada.',
    howTo: [
      'Acesse Serviços no menu',
      'Clique em "Novo Serviço" para criar',
      'Preencha: Título, Slug, Descrição, Ícone',
      'Configure SEO',
      'Marque como publicado e salve',
    ],
    fields: [
      'Título (PT, EN, ES, FR) — nome do serviço',
      'Slug — URL do serviço',
      'Descrição — texto explicativo',
      'Ícone — emoji ou ícone visual',
      'Ordem — posição na listagem',
    ],
    tips: [
      'Mantenha descrições claras e objetivas',
      'Use ícones que representem bem o serviço',
    ],
  },
  {
    href: '/admin/markets',
    label: '🏢 Mercados',
    tooltip: 'Mercados/segmentos de atuação (B2B, setores, etc.).',
    description: 'Gestão de mercados ou segmentos de atuação (ex.: B2B, educação, entretenimento). Podem ser usados em filtros e na home. Use para refletir os mercados que a Azimut atende.',
    howTo: [
      'Acesse Mercados no menu',
      'Adicione novos mercados conforme necessário',
      'Vincule projetos aos mercados relevantes',
    ],
  },
  {
    href: '/admin/history',
    label: '📅 Timeline & Histórico',
    tooltip: 'Timeline da empresa: marcos, parcerias e datas exibidos no site.',
    description: 'Timeline da empresa (histórico institucional). Adicione marcos, parcerias, projetos e datas. O conteúdo aparece na timeline do site (ex.: Studio). Use para manter a história da empresa atualizada.',
    howTo: [
      'Acesse Timeline & Histórico',
      'Clique em "Novo Marco" para adicionar',
      'Preencha: Título, Data, Descrição',
      'Adicione imagem se houver',
      'Salve',
    ],
    fields: [
      'Título — nome do marco/evento',
      'Data — quando aconteceu',
      'Descrição — detalhes do evento',
      'Imagem — foto ou ilustração (opcional)',
      'Tipo — categoria (parceria, prêmio, projeto)',
    ],
    tips: [
      'Mantenha a timeline atualizada com conquistas recentes',
      'Use datas precisas quando possível',
    ],
  },
  {
    href: '/admin/team',
    label: '👥 Equipe',
    tooltip: 'Membros da equipe exibidos no site.',
    description: 'Cadastro dos membros da equipe exibidos no site. Inclui nome, cargo, foto e ordem de exibição. Use para manter a página "Equipe" ou "Sobre" atualizada.',
    howTo: [
      'Acesse Equipe no menu',
      'Clique em "Novo Membro" para adicionar',
      'Preencha: Nome, Cargo, Bio, Foto',
      'Defina a ordem de exibição',
      'Salve',
    ],
    fields: [
      'Nome — nome completo',
      'Cargo — função na empresa',
      'Bio — breve descrição (opcional)',
      'Foto — foto profissional',
      'LinkedIn — link do perfil (opcional)',
      'Ordem — posição na listagem',
    ],
    tips: [
      'Use fotos profissionais e padronizadas',
      'Mantenha bios curtas (2-3 frases)',
      'Atualize quando houver mudanças na equipe',
    ],
  },
  {
    href: '/admin/credentials',
    label: '🏆 Credenciais',
    tooltip: 'Credenciais, prêmios e certificações da empresa.',
    description: 'Credenciais, prêmios, certificações e parcerias (ex.: VFS, VanArts). São exibidas na página de credibilidade/Studio. Use para destacar reconhecimentos e parcerias.',
    howTo: [
      'Acesse Credenciais no menu',
      'Clique em "Nova Credencial" para adicionar',
      'Preencha: Nome, Tipo (prêmio, certificação, parceria), Descrição',
      'Adicione logo ou imagem',
      'Salve',
    ],
    tips: [
      'Adicione novas credenciais assim que conquistadas',
      'Use logos oficiais das certificações',
    ],
  },
  {
    href: '/admin/press',
    label: '📰 Imprensa',
    tooltip: 'Releases e notícias exibidos na página /press do site.',
    description: 'Releases e notas de imprensa exibidos na página /press do site. Crie itens com título, resumo, link e data. Use para divulgar comunicados e matérias na mídia.',
    howTo: [
      'Acesse Imprensa no menu',
      'Clique em "Novo Release" para criar',
      'Preencha: Título (PT obrigatório), Resumo, Link externo, Data',
      'Marque como publicado',
      'Salve',
    ],
    fields: [
      'Título (PT, EN, ES, FR) — título do release',
      'Resumo — breve descrição',
      'URL — link para a matéria completa (se externa)',
      'Data de publicação — quando foi publicado',
      'Publicado — se aparece no site',
    ],
    tips: [
      'Adicione matérias na mídia assim que publicadas',
      'Link externo leva o visitante para a fonte original',
      'Mantenha a data correta para ordenação cronológica',
    ],
  },
  {
    href: '/admin/publications',
    label: '📚 Publicações (Research)',
    tooltip: 'Artigos e publicações exibidos na página Research & Lab (/academy/research).',
    description: 'Publicações acadêmicas e de pesquisa (papers, apresentações) exibidas na página Research & Lab (/academy/research). Cadastre título, autores, ano e link. Use para mostrar produção da área de R&D.',
    howTo: [
      'Acesse Publicações no menu',
      'Clique em "Nova Publicação" para criar',
      'Preencha: Título, Autores, Ano, Link (PDF ou DOI)',
      'Marque como publicado',
      'Salve',
    ],
    fields: [
      'Título (PT, EN, ES, FR) — título da publicação',
      'Autores — nomes dos autores',
      'Ano — ano de publicação',
      'URL — link para o PDF ou DOI',
      'Publicado — se aparece no site',
    ],
    tips: [
      'Use links permanentes (DOI quando disponível)',
      'Mantenha a lista atualizada com novas publicações',
    ],
  },
  {
    href: '/admin/settings',
    label: '⚙️ Configurações',
    tooltip: 'Configurações gerais, usuários e segurança do backoffice.',
    description: 'Configurações do backoffice: alterar senha, gerenciar usuários e permissões. Restrito a administradores. Use para adicionar editores ou alterar sua senha.',
    howTo: [
      'Acesse Configurações no menu',
      'Para alterar sua senha: clique em "Alterar Senha"',
      'Para gerenciar usuários: clique em "Usuários" (admin only)',
      'Para adicionar novo usuário: clique em "Novo Usuário"',
    ],
    tips: [
      'Use senhas fortes (mín. 8 caracteres, letras e números)',
      'Não compartilhe sua senha',
      'Apenas admins podem criar novos usuários',
    ],
    commonErrors: [
      'Esquecer a senha: solicite reset ao admin',
    ],
  },
]
