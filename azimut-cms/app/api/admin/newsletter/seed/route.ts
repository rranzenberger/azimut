import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { cookies } from 'next/headers';
import { verifyAuthToken } from '@/src/lib/auth';

// Dados de teste realistas
const nomesBrasileiros = [
  'Ana Silva', 'Carlos Santos', 'Maria Oliveira', 'João Pereira', 'Beatriz Costa',
  'Pedro Almeida', 'Juliana Fernandes', 'Lucas Rodrigues', 'Camila Souza', 'Rafael Lima',
  'Fernanda Gomes', 'Bruno Martins', 'Patricia Ribeiro', 'Gustavo Carvalho', 'Mariana Rocha',
  'Felipe Barbosa', 'Amanda Dias', 'Rodrigo Monteiro', 'Larissa Cardoso', 'Thiago Araujo'
];

const nomesCanadenses = [
  'Sarah Johnson', 'Michael Smith', 'Emily Brown', 'David Wilson', 'Jessica Martinez',
  'James Taylor', 'Jennifer Anderson', 'Robert Thomas', 'Michelle Lee', 'Christopher White',
  'Ashley Garcia', 'Matthew Robinson', 'Samantha Clark', 'Daniel Lewis', 'Lauren Walker'
];

const empresasInstitucionais = [
  'SEBRAE Nacional', 'SESC SP', 'SENAI', 'Governo do Estado de SP', 'Prefeitura de São Paulo',
  'Ministério da Cultura', 'ANCINE', 'Petrobras Cultural', 'Itaú Cultural', 'Fundação Bienal',
  'MAM - Museu de Arte Moderna', 'MASP', 'Cinemateca Brasileira', 'CCBB', 'Instituto Tomie Ohtake',
  'NFB - National Film Board', 'Creative BC', 'Canada Council for the Arts', 'Telefilm Canada',
  'Vancouver Film School', 'VanArts', 'Emily Carr University', 'SFU - Simon Fraser University'
];

const empresasProdutoras = [
  'O2 Filmes', 'Conspiração Filmes', 'Mixer', 'Prodigo Films', 'Boutique Filmes',
  'Paranoid', 'Hungry Man', 'Sentimental Filmes', 'Primo Filmes', 'Piloto',
  'Africa Creative', 'Saigon Filmes', 'Cine Group', 'Rebolucion', 'Bossa Nova Films',
  'NFB Studios', 'Luminous Motion', 'Juice Worldwide', 'Impossible Dream', 'Secret Location'
];

const origens = ['footer', 'contact_form', 'vancouver_form', 'manual', 'blog'];
const status = ['ACTIVE', 'ACTIVE', 'ACTIVE', 'UNSUBSCRIBED', 'BOUNCED']; // Mais ativos
const linguas = ['pt', 'en', 'es', 'fr'];

const objetivos = [
  'Interessado em produção de VR/AR',
  'Quer estudar cinema no Canadá',
  'Busca parceria para projeto cultural',
  'Diretor de produtora procurando fornecedores',
  'Gestor cultural avaliando experiências imersivas',
  'Estudante querendo aplicar para VFS',
  'Produtor buscando co-produção Brasil-Canadá',
  'Interessado em workshop de realidade virtual',
  'Secretaria de cultura avaliando projetos',
  'Professor buscando conteúdo educacional imersivo',
  'Empresa querendo criar experiência de marca',
  'Curador de exposição cultural',
  'Investidor em tecnologia criativa',
  'Desenvolvedor de jogos interessado em VR'
];

function gerarEmail(nome: string, empresa: string): string {
  const nomeNormalizado = nome
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '.');
  
  const empresaNormalizada = empresa
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '')
    .substring(0, 15);
  
  return `teste_${nomeNormalizado}@${empresaNormalizada}.com.br`;
}

function randomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { count = 100 } = await request.json();

    const subscribers = [];
    const todosNomes = [...nomesBrasileiros, ...nomesCanadenses];
    const todasEmpresas = [...empresasInstitucionais, ...empresasProdutoras];

    for (let i = 0; i < count; i++) {
      const nome = randomItem(todosNomes);
      const empresa = randomItem(todasEmpresas);
      const email = gerarEmail(nome, empresa);
      const origem = randomItem(origens);
      const statusItem = randomItem(status);
      const lingua = randomItem(linguas);
      const objetivo = randomItem(objetivos);
      
      const agora = new Date();
      const seisMesesAtras = new Date(agora.getTime() - 6 * 30 * 24 * 60 * 60 * 1000);
      const subscribedAt = randomDate(seisMesesAtras, agora);

      // Classificação baseada na empresa
      const ehInstitucional = empresasInstitucionais.includes(empresa);
      const classificacao = ehInstitucional ? 'QUENTE' : (Math.random() > 0.5 ? 'MORNO' : 'FRIO');

      subscribers.push({
        email,
        name: nome,
        preferredLanguage: lingua,
        source: origem,
        status: statusItem as any,
        subscribedAt,
        emailCount: Math.floor(Math.random() * 10),
        lastEmailSentAt: statusItem === 'ACTIVE' ? randomDate(subscribedAt, agora) : null,
        unsubscribedAt: statusItem === 'UNSUBSCRIBED' ? randomDate(subscribedAt, agora) : null,
      });
    }

    // Inserir em lote
    await prisma.newsletterSubscriber.createMany({
      data: subscribers,
      skipDuplicates: true,
    });

    return NextResponse.json({
      success: true,
      message: `${count} inscritos de teste criados com sucesso!`,
      count,
    });
  } catch (error: any) {
    console.error('Error seeding newsletter:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Deletar todos os emails que começam com "teste_"
    const result = await prisma.newsletterSubscriber.deleteMany({
      where: {
        email: {
          startsWith: 'teste_',
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: `${result.count} inscritos de teste deletados com sucesso!`,
      count: result.count,
    });
  } catch (error: any) {
    console.error('Error deleting test subscribers:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
