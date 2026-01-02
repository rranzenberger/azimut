/**
 * Script de Seed - Leads Kanban de Teste
 * Popula o banco com leads genéricos para testar o sistema Kanban
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const testLeads = [
  // 🆕 NOVOS LEADS (Status: NEW)
  {
    name: 'Maria Silva',
    email: 'maria.silva@mam.org.br',
    phone: '(21) 99999-1111',
    company: 'Museu de Arte Moderna - Rio',
    position: 'Curadora de Exposições',
    leadType: 'BUDGET_INQUIRY',
    projectType: 'Exposição Imersiva - História da Cidade',
    budget: 'R$ 150.000 - R$ 250.000',
    timeline: '6 meses',
    description: 'Interessados em criar uma exposição imersiva sobre a história do Rio de Janeiro. Queremos usar VR/AR e projeções mapeadas. Público alvo: estudantes e turistas.',
    status: 'NEW',
    priority: 'HIGH',
    sourceUrl: 'https://azmt.com.br/work/museus',
    utmSource: 'google',
    utmMedium: 'cpc',
    utmCampaign: 'museus-2026',
  },
  {
    name: 'João Santos',
    email: 'joao.santos@festivalcine.com',
    phone: '(11) 98888-2222',
    company: 'Festival Internacional de Cinema',
    position: 'Diretor de Programação',
    leadType: 'CONTACT_FORM',
    projectType: 'Instalação Interativa para Festival',
    budget: 'R$ 80.000 - R$ 120.000',
    timeline: '4 meses',
    description: 'Buscamos uma instalação interativa para o lobby do festival. Algo que envolva o público e crie experiência única. Referências: instalações do Sundance.',
    status: 'NEW',
    priority: 'MEDIUM',
    sourceUrl: 'https://azmt.com.br/work/festivais',
    utmSource: 'linkedin',
    utmMedium: 'social',
    utmCampaign: 'festival-2026',
  },
  {
    name: 'Ana Costa',
    email: 'ana.costa@prefeitura.sp.gov.br',
    phone: '(11) 97777-3333',
    company: 'Prefeitura de São Paulo - Secretaria de Cultura',
    position: 'Coordenadora de Projetos Culturais',
    leadType: 'BUDGET_INQUIRY',
    projectType: 'Centro Cultural Digital',
    budget: 'R$ 500.000 - R$ 800.000',
    timeline: '12 meses',
    description: 'Projeto de centro cultural digital com múltiplas salas imersivas. Inclui VR, AR, projeções e interatividade. Público: comunidade local e escolas.',
    status: 'NEW',
    priority: 'URGENT',
    sourceUrl: 'https://azmt.com.br/solutions',
    utmSource: 'direct',
    utmMedium: 'email',
    utmCampaign: 'centro-cultural',
  },
  {
    name: 'Carlos Mendes',
    email: 'carlos.mendes@brandagency.com',
    phone: '(21) 96666-4444',
    company: 'Brand Agency',
    position: 'Diretor Criativo',
    leadType: 'CONTACT_FORM',
    projectType: 'Experiência de Marca - Lançamento',
    budget: 'R$ 200.000 - R$ 300.000',
    timeline: '3 meses',
    description: 'Cliente quer lançar novo produto com experiência imersiva em shopping. Precisa de algo impactante que gere buzz nas redes sociais.',
    status: 'NEW',
    priority: 'MEDIUM',
    sourceUrl: 'https://azmt.com.br/work',
    utmSource: 'instagram',
    utmMedium: 'social',
    utmCampaign: 'brand-launch',
  },

  // 📞 CONTATO FEITO (Status: CONTACTED)
  {
    name: 'Patricia Lima',
    email: 'patricia.lima@museuhistoria.br',
    phone: '(11) 95555-5555',
    company: 'Museu de História Natural',
    position: 'Diretora de Educação',
    leadType: 'BUDGET_INQUIRY',
    projectType: 'Exposição Educacional Interativa',
    budget: 'R$ 100.000 - R$ 180.000',
    timeline: '5 meses',
    description: 'Exposição sobre evolução das espécies com elementos interativos. Foco em público escolar. Já tivemos call inicial, muito interessados.',
    status: 'CONTACTED',
    priority: 'HIGH',
    sourceUrl: 'https://azmt.com.br/work/museus',
    utmSource: 'referral',
    utmMedium: 'word-of-mouth',
    utmCampaign: 'museu-historia',
    notes: 'Call realizada em 28/12. Cliente muito entusiasmado. Precisam de proposta até 15/01. Anick vai preparar moodboard.',
    lastContactAt: new Date('2025-12-28T14:30:00Z'),
  },
  {
    name: 'Roberto Alves',
    email: 'roberto.alves@institutoarte.org',
    phone: '(21) 94444-6666',
    company: 'Instituto de Arte Contemporânea',
    position: 'Curador',
    leadType: 'CONTACT_FORM',
    projectType: 'Instalação Artística - Bienal',
    budget: 'R$ 300.000 - R$ 500.000',
    timeline: '8 meses',
    description: 'Instalação para próxima Bienal de Arte. Conceito: realidade aumentada + esculturas físicas. Artista renomado envolvido.',
    status: 'CONTACTED',
    priority: 'HIGH',
    sourceUrl: 'https://azmt.com.br/work',
    utmSource: 'direct',
    utmMedium: 'email',
    utmCampaign: 'bienal-2026',
    notes: 'Reunião presencial agendada para 10/01. Alberto vai participar. Projeto de grande visibilidade.',
    lastContactAt: new Date('2025-12-30T10:00:00Z'),
  },

  // 💼 PROPOSTA ENVIADA (Status: PROPOSAL_SENT)
  {
    name: 'Fernanda Rocha',
    email: 'fernanda.rocha@cidadecriativa.gov.br',
    phone: '(11) 93333-7777',
    company: 'Prefeitura - Cidade Criativa UNESCO',
    position: 'Secretária de Cultura',
    leadType: 'BUDGET_INQUIRY',
    projectType: 'Hub de Inovação Cultural',
    budget: 'R$ 1.000.000 - R$ 1.500.000',
    timeline: '18 meses',
    description: 'Projeto ambicioso: hub cultural com múltiplas salas, estúdio de produção, espaço de coworking. Fase 1: 3 salas imersivas.',
    status: 'PROPOSAL_SENT',
    priority: 'URGENT',
    sourceUrl: 'https://azmt.com.br/solutions',
    utmSource: 'google',
    utmMedium: 'organic',
    utmCampaign: 'cidade-criativa',
    notes: 'Proposta enviada em 20/12. Orçamento detalhado com 3 fases. Aguardando resposta do comitê de aprovação. Prazo: 20/01.',
    lastContactAt: new Date('2025-12-20T16:00:00Z'),
  },
  {
    name: 'Lucas Ferreira',
    email: 'lucas.ferreira@techstartup.com',
    phone: '(21) 92222-8888',
    company: 'Tech Startup - EdTech',
    position: 'CEO',
    leadType: 'CONTACT_FORM',
    projectType: 'Plataforma Educacional VR',
    budget: 'R$ 400.000 - R$ 600.000',
    timeline: '10 meses',
    description: 'Plataforma educacional com conteúdo VR para escolas. Parceria com secretarias de educação. Potencial de escala nacional.',
    status: 'PROPOSAL_SENT',
    priority: 'HIGH',
    sourceUrl: 'https://azmt.com.br/solutions',
    utmSource: 'linkedin',
    utmMedium: 'social',
    utmCampaign: 'edtech-vr',
    notes: 'Proposta técnica enviada. Cliente revisando com investidores. Follow-up agendado para 12/01.',
    lastContactAt: new Date('2025-12-27T11:00:00Z'),
  },

  // 🤝 EM NEGOCIAÇÃO (Status: NEGOTIATION)
  {
    name: 'Juliana Martins',
    email: 'juliana.martins@museuarte.br',
    phone: '(11) 91111-9999',
    company: 'Museu de Arte de São Paulo',
    position: 'Diretora Executiva',
    leadType: 'BUDGET_INQUIRY',
    projectType: 'Exposição Permanente - Arte Digital',
    budget: 'R$ 250.000 - R$ 350.000',
    timeline: '6 meses',
    description: 'Exposição permanente sobre arte digital brasileira. Sala dedicada com instalações interativas e obras em VR/AR.',
    status: 'NEGOTIATION',
    priority: 'HIGH',
    sourceUrl: 'https://azmt.com.br/work/museus',
    utmSource: 'direct',
    utmMedium: 'email',
    utmCampaign: 'masp-arte-digital',
    notes: 'Negociando escopo e timeline. Cliente quer reduzir orçamento em 20% mas manter escopo. Propondo fases. Reunião final: 08/01.',
    lastContactAt: new Date('2025-12-29T15:30:00Z'),
  },

  // ✅ GANHOS (Status: WON)
  {
    name: 'Ricardo Souza',
    email: 'ricardo.souza@festivalmusic.com',
    phone: '(21) 90000-0000',
    company: 'Festival de Música Eletrônica',
    position: 'Produtor Executivo',
    leadType: 'BUDGET_INQUIRY',
    projectType: 'Instalação Visual - Palco Principal',
    budget: 'R$ 120.000 - R$ 180.000',
    timeline: '4 meses',
    description: 'Instalação visual para palco principal do festival. Mapping 3D, lasers, LED. Evento em março/2026.',
    status: 'WON',
    priority: 'HIGH',
    sourceUrl: 'https://azmt.com.br/work/festivais',
    utmSource: 'instagram',
    utmMedium: 'social',
    utmCampaign: 'festival-music',
    notes: '✅ PROJETO GANHO! Contrato assinado em 15/12. Início: 10/01. Equipe alocada: Anick (direção de arte), Alberto (produção).',
    lastContactAt: new Date('2025-12-15T17:00:00Z'),
  },
  {
    name: 'Sandra Oliveira',
    email: 'sandra.oliveira@marca.com.br',
    phone: '(11) 88888-1111',
    company: 'Marca de Luxo',
    position: 'Diretora de Marketing',
    leadType: 'CONTACT_FORM',
    projectType: 'Pop-up Experience - Shopping',
    budget: 'R$ 180.000 - R$ 250.000',
    timeline: '3 meses',
    description: 'Pop-up experience em shopping premium. Experiência imersiva de marca com elementos interativos e fotografia social.',
    status: 'WON',
    priority: 'MEDIUM',
    sourceUrl: 'https://azmt.com.br/work',
    utmSource: 'google',
    utmMedium: 'cpc',
    utmCampaign: 'marca-luxo',
    notes: '✅ PROJETO GANHO! Contrato assinado. Evento em fevereiro. Cliente muito satisfeito com proposta.',
    lastContactAt: new Date('2025-12-22T14:00:00Z'),
  },

  // ❌ PERDIDOS (Status: LOST)
  {
    name: 'Marcos Silva',
    email: 'marcos.silva@empresa.com',
    phone: '(21) 87777-2222',
    company: 'Empresa de Eventos',
    position: 'Diretor',
    leadType: 'CONTACT_FORM',
    projectType: 'Evento Corporativo',
    budget: 'R$ 50.000 - R$ 80.000',
    timeline: '2 meses',
    description: 'Evento corporativo com elementos interativos. Orçamento muito apertado, não conseguimos atender.',
    status: 'LOST',
    priority: 'LOW',
    sourceUrl: 'https://azmt.com.br/work',
    utmSource: 'google',
    utmMedium: 'organic',
    utmCampaign: 'evento-corporativo',
    notes: '❌ Perdido por orçamento. Cliente queria muito mais pelo valor oferecido. Não era fit para nosso perfil.',
    lastContactAt: new Date('2025-12-10T10:00:00Z'),
  },
];

async function seedKanbanLeads() {
  console.log('🌱 Populando leads de teste para Kanban...\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  try {
    // Buscar usuários existentes para atribuir leads
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true },
      take: 3,
    });

    if (users.length === 0) {
      console.log('⚠️  Nenhum usuário encontrado. Criando leads sem atribuição.');
    } else {
      console.log(`✅ ${users.length} usuário(s) encontrado(s) para atribuição:\n`);
      users.forEach((u, i) => {
        console.log(`   ${i + 1}. ${u.name || u.email} (${u.id.substring(0, 8)}...)`);
      });
      console.log('');
    }

    let created = 0;
    let skipped = 0;

    for (let i = 0; i < testLeads.length; i++) {
      const leadData = testLeads[i];

      // Verificar se lead já existe (por email)
      const existing = await prisma.lead.findFirst({
        where: { email: leadData.email },
      });

      if (existing) {
        console.log(`⏭️  Lead já existe: ${leadData.name} (${leadData.email})`);
        skipped++;
        continue;
      }

      // Atribuir responsável baseado no status e índice
      let assignedToId: string | null = null;
      if (users.length > 0) {
        if (leadData.status === 'NEGOTIATION' || leadData.status === 'WON') {
          // Negociação e ganhos: atribuir ao primeiro usuário (você)
          assignedToId = users[0].id;
        } else if (leadData.status === 'PROPOSAL_SENT') {
          // Propostas: atribuir ao segundo usuário (Alberto, se existir)
          assignedToId = users[1]?.id || users[0].id;
        } else if (leadData.status === 'CONTACTED' && i % 2 === 0) {
          // Alguns contatos: atribuir ao terceiro usuário (Anick, se existir)
          assignedToId = users[2]?.id || users[0].id;
        }
      }

      // Criar lead
      const lead = await prisma.lead.create({
        data: {
          ...leadData,
          assignedToId,
          assignedAt: assignedToId ? new Date() : null,
          createdAt: new Date(Date.now() - (testLeads.length - i) * 24 * 60 * 60 * 1000), // Distribuir ao longo dos dias
        },
      });

      const assignedTo = assignedToId ? users.find(u => u.id === assignedToId) : null;
      const assignedInfo = assignedTo ? ` → ${assignedTo.name || assignedTo.email}` : '';

      console.log(`✅ Criado: ${leadData.name} (${leadData.status})${assignedInfo}`);
      created++;
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`✅ ${created} lead(s) criado(s)`);
    console.log(`⏭️  ${skipped} lead(s) já existia(m)`);
    console.log('\n🎉 Seed concluído!');

    // Estatísticas
    const stats = await prisma.lead.groupBy({
      by: ['status'],
      _count: true,
    });

    console.log('\n📊 Distribuição por Status:');
    stats.forEach((stat) => {
      const emoji = {
        NEW: '🆕',
        CONTACTED: '📞',
        PROPOSAL_SENT: '💼',
        NEGOTIATION: '🤝',
        WON: '✅',
        LOST: '❌',
      }[stat.status] || '📋';
      console.log(`   ${emoji} ${stat.status}: ${stat._count}`);
    });

  } catch (error: any) {
    console.error('\n❌ Erro ao popular leads:', error.message);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedKanbanLeads();

