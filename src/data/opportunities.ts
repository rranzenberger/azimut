export type OpportunityStatus = 'open' | 'upcoming' | 'closed'

export interface Opportunity {
  id: string
  name: string
  country: 'BR' | 'CA' | 'EU' | 'US' | 'INTL'
  type: 'cultural' | 'film' | 'xr' | 'innovation' | 'education' | 'brand'
  area: string
  eligibility: 'individual' | 'micro' | 'company' | 'coproduction'
  fundingType: 'grant' | 'matching' | 'tax_incentive'
  deadline?: string
  status: OpportunityStatus
  sourceUrl: string
}

// Mock inicial (pode ser trocado pelo backoffice/API)
export const opportunities: Opportunity[] = [
  {
    id: 'rouanet-2025',
    name: 'Lei Rouanet - Projetos Culturais',
    country: 'BR',
    type: 'cultural',
    area: 'Cultura / Exposições / Museus',
    eligibility: 'company',
    fundingType: 'tax_incentive',
    deadline: '31/12/2025',
    status: 'open',
    sourceUrl: 'https://rouanet.cultura.gov.br/'
  },
  {
    id: 'proac-2025',
    name: 'PROAC - Produção Cultural SP',
    country: 'BR',
    type: 'cultural',
    area: 'Cultura / Exposições / Música / Teatro',
    eligibility: 'company',
    fundingType: 'grant',
    deadline: 'Rolling',
    status: 'open',
    sourceUrl: 'https://www.proac.sp.gov.br/'
  },
  {
    id: 'creative-bc-2025',
    name: 'Creative BC - Interactive Fund',
    country: 'CA',
    type: 'xr',
    area: 'XR / Jogos / Narrativas imersivas',
    eligibility: 'company',
    fundingType: 'grant',
    deadline: 'Q3 2025 (estimado)',
    status: 'upcoming',
    sourceUrl: 'https://www.creativebc.com/'
  },
  {
    id: 'cmf-2025',
    name: 'Canada Media Fund - Experimental',
    country: 'CA',
    type: 'film',
    area: 'Digital / VR / Conteúdo interativo',
    eligibility: 'company',
    fundingType: 'grant',
    deadline: 'TBA 2025',
    status: 'upcoming',
    sourceUrl: 'https://cmf-fmc.ca/'
  },
  {
    id: 'telefilm-dev-2025',
    name: 'Telefilm - Desenvolvimento',
    country: 'CA',
    type: 'film',
    area: 'Cinema / Documentário / VR',
    eligibility: 'company',
    fundingType: 'grant',
    deadline: 'Q2 2025 (estimado)',
    status: 'upcoming',
    sourceUrl: 'https://telefilm.ca/'
  },
  {
    id: 'creative-europe-2025',
    name: 'Creative Europe - Culture & Media',
    country: 'EU',
    type: 'cultural',
    area: 'Cooperação cultural / Media / XR',
    eligibility: 'company',
    fundingType: 'grant',
    deadline: 'TBA 2025',
    status: 'upcoming',
    sourceUrl: 'https://culture.ec.europa.eu/creative-europe'
  },
  {
    id: 'oi-futuro-2025',
    name: 'Oi Futuro - Edital de Arte e Tecnologia',
    country: 'BR',
    type: 'innovation',
    area: 'Arte + Tecnologia / Instalações / XR',
    eligibility: 'company',
    fundingType: 'grant',
    deadline: 'TBA 2025',
    status: 'upcoming',
    sourceUrl: 'https://www.oifuturo.org.br/'
  },
  {
    id: 'bb-cultural-2025',
    name: 'Centro Cultural Banco do Brasil',
    country: 'BR',
    type: 'cultural',
    area: 'Exposições / Interativas / XR',
    eligibility: 'company',
    fundingType: 'grant',
    deadline: 'Chamada contínua',
    status: 'open',
    sourceUrl: 'https://cultural.bb.com.br/'
  }
]

