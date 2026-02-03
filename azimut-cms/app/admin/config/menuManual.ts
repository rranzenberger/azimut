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
}

export const MENU_MANUAL_ITEMS: MenuItemManual[] = [
  {
    href: '/admin/help',
    label: '📖 Manual',
    tooltip: 'Manual do backoffice: descrição de cada área e como usar.',
    description: 'Esta página. Lista todas as áreas do backoffice com link e explicação: o que é, que dados contém e como usar. Consulte quando tiver dúvida sobre uma aba ou função.',
  },
  {
    href: '/admin',
    label: '🏠 Dashboard',
    tooltip: 'Visão geral do backoffice: resumo de conteúdo e acessos rápidos.',
    description: 'Página inicial do painel. Mostra visão geral do sistema, atalhos e resumo de projetos, leads e conteúdo. Use para ter uma visão rápida do estado do site e acessar outras áreas.',
  },
  {
    href: '/admin/analytics',
    label: '📊 Analytics IA',
    tooltip: 'Métricas e gráficos de visitantes, leads e comportamento no site.',
    description: 'Métricas e análises do site: visitantes, países, funil de conversão, distribuição de score dos leads, timeline. Os dados vêm do rastreamento no site (GA/backend). Use para acompanhar tráfego e eficácia de campanhas.',
  },
  {
    href: '/admin/projects',
    label: '🎥 Projetos',
    tooltip: 'Portfólio: criar e editar projetos exibidos na página /work do site.',
    description: 'CRUD do portfólio de projetos (página /work do site). Cada projeto tem título, descrição, imagens, galeria, tags, slug e SEO. Use para publicar novos trabalhos e manter o portfólio atualizado.',
  },
  {
    href: '/admin/blog',
    label: '📝 Blog',
    tooltip: 'Artigos do blog: criar, editar e publicar posts do site.',
    description: 'Gestão dos artigos do blog do site. Crie posts, defina categorias, imagens e SEO. Os artigos publicados aparecem na listagem do blog no site. Use para conteúdo de blog e SEO.',
  },
  {
    href: '/admin/blog/monitor',
    label: '🤖 Monitoramento',
    tooltip: 'Sugestões de posts geradas por IA para aprovar ou descartar.',
    description: 'Monitor de sugestões de conteúdo para o blog geradas por IA. Lista itens pendentes de aprovação; você pode aprovar, editar ou descartar. O badge mostra a quantidade de pendências.',
  },
  {
    href: '/admin/making-of',
    label: '🎬 Making-of',
    tooltip: 'Conteúdo making-of: vídeos e materiais de bastidores dos projetos.',
    description: 'Gestão de conteúdos "making-of" (bastidores) vinculados a projetos. Crie e publique making-ofs; podem ser exibidos no site ou em materiais de divulgação. Use para enriquecer a página de cada projeto.',
  },
  {
    href: '/admin/making-of/curation',
    label: '🎨 Curadoria',
    tooltip: 'Curadoria e organização dos conteúdos making-of.',
    description: 'Curadoria dos making-ofs: organizar, destacar ou ocultar itens. Use para decidir quais making-ofs aparecem em destaque no site.',
  },
  {
    href: '/admin/site-pages',
    label: '📄 Páginas',
    tooltip: 'Conteúdo das páginas do site (Home, Studio, Academy, etc.) e áreas Imprensa/Research.',
    description: 'Central das páginas do site. Lista páginas editáveis (Home, Projetos, Soluções, Estúdio, Academy, Blog, Contato, etc.) e as áreas Imprensa e Publicações (Research). Clique em uma página para editar textos, hero e SEO. Cada página pode ter seções e múltiplos idiomas.',
  },
  {
    href: '/admin/media',
    label: '🖼️ Mídias',
    tooltip: 'Biblioteca de imagens e arquivos enviados para o site.',
    description: 'Biblioteca de mídia: upload e gestão de imagens e arquivos usados no site. As mídias podem ser vinculadas a projetos, páginas e seções. Use para centralizar imagens e evitar duplicação.',
  },
  {
    href: '/admin/leads',
    label: '👥 Leads',
    tooltip: 'Leads captados pelo site: contato, Vancouver, formulários e scoring.',
    description: 'Lista de leads captados pelo site (formulário de contato, Vancouver, quiz, etc.). Visualize dados, score de qualidade e status. O Kanban permite organizar por estágio. Use para acompanhar e qualificar oportunidades.',
  },
  {
    href: '/admin/leads/game',
    label: '🎮 Leads do Jogo',
    tooltip: 'Leads gerados pelo game neurolinguístico no site.',
    description: 'Leads que vieram do game neurolinguístico (jogo no site). Lista separada para analisar e nutrir esse público específico.',
  },
  {
    href: '/admin/leads/dashboard',
    label: '🎯 Dashboard Leads IA',
    tooltip: 'Visão consolidada de leads com insights e priorização por IA.',
    description: 'Dashboard focado em leads: KPIs, insights gerados por IA e priorização. Use para decisões rápidas sobre quais leads abordar primeiro.',
  },
  {
    href: '/admin/tools',
    label: '🛠️ Ferramentas',
    tooltip: 'Ferramentas auxiliares: tradução, SEO, limpeza de dados, etc.',
    description: 'Ferramentas utilitárias do backoffice: tradução em massa, otimização de SEO, limpeza de dados de teste e outras ações em lote. Use com cuidado em produção.',
  },
  {
    href: '/admin/roadmap',
    label: '🗺️ Roadmap',
    tooltip: 'Planejamento e roadmap de funcionalidades do produto.',
    description: 'Roadmap e planejamento de funcionalidades. Consulte prioridades e próximos passos do produto e do backoffice.',
  },
  {
    href: '/admin/marketing/preview',
    label: '🎁 Marketing Preview',
    tooltip: 'Preview de materiais e campanhas de marketing.',
    description: 'Visualização de materiais de marketing (landing pages, e-mails, etc.) antes de publicar. Use para validar campanhas.',
  },
  {
    href: '/admin/web3/setup-wallet',
    label: '🔐 Configurar Carteira',
    tooltip: 'Configuração da carteira Web3 para recompensas e pagamentos.',
    description: 'Configuração da carteira cripto (Web3) usada para receber pagamentos e distribuir recompensas a estudantes. Necessário para o fluxo de recompensas.',
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
    description: 'Gestão de recompensas para estudantes (ex.: certificados, NFTs). Registre e distribua recompensas vinculadas ao programa Academy.',
  },
  {
    href: '/admin/newsletter',
    label: '📨 Inscritos',
    tooltip: 'Lista de inscritos na newsletter e gestão de envios.',
    description: 'Lista de e-mails inscritos na newsletter. Você pode adicionar, remover, exportar e enviar campanhas. Use para comunicação em massa com quem se inscreveu no site.',
  },
  {
    href: '/admin/n8n-workflow',
    label: '🤖 Automação n8n',
    tooltip: 'Configuração e status dos workflows de automação (n8n).',
    description: 'Integração com n8n: configuração do webhook e status dos workflows de automação (ex.: captação de leads, enriquecimento, e-mail). Quando configurado, novos leads podem disparar fluxos no n8n.',
  },
  {
    href: '/admin/services',
    label: '⚡ Serviços',
    tooltip: 'Soluções/serviços exibidos na página O que fazemos (/what).',
    description: 'CRUD dos serviços (soluções) exibidos na página "O que fazemos" (/what) do site. Cada serviço tem título, descrição, ícone e slug. Use para manter a oferta de serviços atualizada.',
  },
  {
    href: '/admin/markets',
    label: '🏢 Mercados',
    tooltip: 'Mercados/segmentos de atuação (B2B, setores, etc.).',
    description: 'Gestão de mercados ou segmentos de atuação (ex.: B2B, educação, entretenimento). Podem ser usados em filtros e na home. Use para refletir os mercados que a Azimut atende.',
  },
  {
    href: '/admin/history',
    label: '📅 Timeline & Histórico',
    tooltip: 'Timeline da empresa: marcos, parcerias e datas exibidos no site.',
    description: 'Timeline da empresa (histórico institucional). Adicione marcos, parcerias, projetos e datas. O conteúdo aparece na timeline do site (ex.: Studio). Use para manter a história da empresa atualizada.',
  },
  {
    href: '/admin/team',
    label: '👥 Equipe',
    tooltip: 'Membros da equipe exibidos no site.',
    description: 'Cadastro dos membros da equipe exibidos no site. Inclui nome, cargo, foto e ordem de exibição. Use para manter a página "Equipe" ou "Sobre" atualizada.',
  },
  {
    href: '/admin/credentials',
    label: '🏆 Credenciais',
    tooltip: 'Credenciais, prêmios e certificações da empresa.',
    description: 'Credenciais, prêmios, certificações e parcerias (ex.: VFS, VanArts). São exibidas na página de credibilidade/Studio. Use para destacar reconhecimentos e parcerias.',
  },
  {
    href: '/admin/press',
    label: '📰 Imprensa',
    tooltip: 'Releases e notícias exibidos na página /press do site.',
    description: 'Releases e notas de imprensa exibidos na página /press do site. Crie itens com título, resumo, link e data. Use para divulgar comunicados e matérias.',
  },
  {
    href: '/admin/publications',
    label: '📚 Publicações (Research)',
    tooltip: 'Artigos e publicações exibidos na página Research & Lab (/academy/research).',
    description: 'Publicações acadêmicas e de pesquisa (papers, apresentações) exibidas na página Research & Lab (/academy/research). Cadastre título, autores, ano e link. Use para mostrar produção da área de R&D.',
  },
  {
    href: '/admin/settings',
    label: '⚙️ Configurações',
    tooltip: 'Configurações gerais, usuários e segurança do backoffice.',
    description: 'Configurações do backoffice: alterar senha, gerenciar usuários e permissões. Restrito a administradores. Use para adicionar editores ou alterar sua senha.',
  },
]
