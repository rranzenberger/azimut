# 🎯 ESTRATÉGIA COMPLETA: GESTÃO DE LEADS MULTICANAL + MERCADO EXPANDIDO

## 📊 PARTE 1: LEAD SOURCES (ORIGENS)

### Sistema de Categorização de Leads

#### **Estrutura no Backoffice:**
```typescript
enum LeadSource {
  // DIGITAL
  SITE_ORGANIC = 'Site - Orgânico',
  SITE_PAID = 'Site - Google Ads',
  SITE_SOCIAL = 'Site - Redes Sociais',
  SITE_IA_HOT = 'Site - IA Hot Lead',
  
  // EVENTOS
  EVENT_FILE = 'Evento - FILE',
  EVENT_MUTEK = 'Evento - MUTEK',
  EVENT_ANIMA_MUNDI = 'Evento - Anima Mundi',
  EVENT_SXSW = 'Evento - SXSW SP',
  EVENT_LAAD = 'Evento - LAAD Defense',
  EVENT_BIENAL = 'Evento - Bienal',
  EVENT_FESTURIS = 'Evento - Festuris',
  EVENT_CORPORATIVO = 'Evento - Corporativo',
  EVENT_STAND_PROPRIO = 'Evento - Stand Próprio',
  
  // RELACIONAMENTO
  INDICACAO_CLIENTE = 'Indicação - Cliente',
  INDICACAO_PARCEIRO = 'Indicação - Parceiro',
  INDICACAO_AMIGO = 'Indicação - Pessoal',
  NETWORKING = 'Networking',
  
  // PROSPECÇÃO ATIVA
  OUTBOUND_EMAIL = 'Outbound - Email',
  OUTBOUND_LINKEDIN = 'Outbound - LinkedIn',
  OUTBOUND_CALL = 'Outbound - Cold Call',
  
  // EDITAIS E CHAMADAS
  EDITAL_ROUANET = 'Edital - Rouanet',
  EDITAL_PROAC = 'Edital - ProAC',
  EDITAL_NFB = 'Edital - NFB',
  EDITAL_SODEC = 'Edital - SODEC',
  EDITAL_CUSTOM = 'Edital - Outro',
  
  // PARCERIAS
  PARCEIRO_AGENCIA = 'Parceiro - Agência',
  PARCEIRO_PRODUTORA = 'Parceiro - Produtora',
  PARCEIRO_FORNECEDOR = 'Parceiro - Fornecedor',
  
  // OUTROS
  REENGAJAMENTO = 'Reengajamento',
  OUTRO = 'Outro'
}
```

#### **Departamento/Área de Interesse:**
```typescript
enum LeadDepartment {
  // CULTURA
  CULTURA_GERAL = 'Cultura',
  CULTURA_MUSEU = 'Museu/Curadoria',
  CULTURA_FESTIVAL = 'Festival/Evento',
  
  // MARKETING/COMERCIAL
  MARKETING = 'Marketing',
  BRANDING = 'Branding',
  EVENTOS_CORPORATIVOS = 'Eventos Corporativos',
  TRADE_MARKETING = 'Trade Marketing',
  EXPERIENCIA_CLIENTE = 'Experiência do Cliente',
  
  // INOVAÇÃO/TECNOLOGIA
  INOVACAO = 'Inovação',
  TRANSFORMACAO_DIGITAL = 'Transformação Digital',
  RH_TREINAMENTO = 'RH/Treinamento',
  
  // COMUNICAÇÃO
  COMUNICACAO = 'Comunicação Corporativa',
  RELACOES_PUBLICAS = 'Relações Públicas',
  ESG = 'ESG/Sustentabilidade',
  
  // PRODUÇÃO
  PRODUCAO_AUDIOVISUAL = 'Produção Audiovisual',
  PRODUCAO_EVENTOS = 'Produção de Eventos',
  
  // EDUCAÇÃO
  EDUCACAO = 'Educação',
  PESQUISA = 'Pesquisa/Academia'
}
```

---

## 🏢 PARTE 2: MAPEAMENTO COMPLETO DE MERCADO

### **TIER 1: GRANDES CORPORAÇÕES (R$ 500k - R$ 5M+)**

#### **1. BANCOS E INSTITUIÇÕES FINANCEIRAS**

##### **Itaú Unibanco**
- **Departamentos-chave:**
  - **Itaú Cultural** (itaucultural.org.br)
    - Contato: Curadoria, Programação
    - Orçamento: R$ 100M+ anual
    - Projetos: Exposições, arte digital, editais
  - **Marketing Corporativo Itaú**
    - Contato: Gerência de Marca, Eventos
    - Projetos: Ativações de marca, stands, experiências em agências
  - **Itaú Espaços** (eventos corporativos)
    - Projetos: Eventos internos, convenções

##### **Banco do Brasil**
- **Departamentos-chave:**
  - **CCBB (Centro Cultural Banco do Brasil)**
    - 4 unidades: RJ, SP, BSB, BH
    - Contato: BB Cultura, Curadoria
    - Orçamento: R$ 500k - R$ 3M por exposição
  - **Marketing BB**
    - Projetos: Ativações, olimpíadas, copa
  - **BB Seguros / BB Investimentos**
    - Projetos: Eventos corporativos, convenções

##### **Bradesco**
- **Fundação Bradesco** (educação)
- **Marketing Corporativo**
- **Bradesco Seguros** (eventos)

##### **Santander**
- **Santander Cultural** (Porto Alegre)
- **Marketing de Marca**

##### **Caixa Econômica Federal**
- **Caixa Cultural** (RJ, SP, BSB)
- **Marketing Caixa**

**Detecção:** Domínios `@itau.com.br`, `@bb.com.br`, `@bradesco.com.br`, `@santander.com.br`, `@caixa.gov.br`

---

#### **2. PETRÓLEO, MINERAÇÃO, ENERGIA**

##### **Petrobras**
- **Departamentos-chave:**
  - **Patrocínios e Cultura** (Lei Rouanet)
    - Orçamento: R$ 50M+ anual em cultura
  - **Marketing Corporativo**
  - **Comunicação Interna**
    - Projetos: Treinamento VR, segurança
  - **Centros de Visitantes**
    - Museus do Petróleo, Centros de Memória

##### **Vale**
- **Instituto Vale** (cultura)
- **Marketing e Marca**
- **Memorial Vale** (museu corporativo)
- **Treinamento e Segurança** (VR mineração)

##### **Shell Brasil**
- **Marketing**
- **Shell Eco-marathon** (eventos)

##### **Equinor (ex-Statoil)**
- **Projetos no Rio de Janeiro**

**Detecção:** `@petrobras.com.br`, `@vale.com`, `@shell.com`, `@equinor.com`

---

#### **3. TELECOMUNICAÇÕES**

##### **Oi (Oi Futuro)**
- **Oi Futuro** (oifuturo.org.br)
  - Museus: RJ, BH
  - Orçamento: R$ 20M+ anual
  - Projetos: Arte digital, inovação

##### **Vivo (Fundação Telefônica)**
- **Fundação Telefônica Vivo**
- **Marketing Vivo**

##### **Claro**
- **Instituto Claro**
- **Marketing de Marca**

##### **TIM**
- **Instituto TIM**
- **Marketing**

**Detecção:** `@oi.com.br`, `@telefonica.com`, `@claro.com.br`, `@tim.com.br`

---

#### **4. VAREJO E CONSUMO**

##### **Grupo Pão de Açúcar (GPA)**
- **Instituto GPA**
- **Marketing**

##### **Ambev**
- **Marketing de Marcas** (Skol, Brahma, etc.)
- **Eventos e Ativações**

##### **Natura**
- **Instituto Natura**
- **Marketing de Experiência**

##### **Magazine Luiza**
- **Instituto Luiza**
- **Marketing Digital**

**Detecção:** `@gpabr.com`, `@ambev.com.br`, `@natura.net`, `@magazineluiza.com.br`

---

### **TIER 2: ASSOCIAÇÕES, FEDERAÇÕES, SEBRAE (R$ 100k - R$ 500k)**

#### **SEBRAE (Serviço Brasileiro de Apoio às Micro e Pequenas Empresas)**
- **Website:** sebrae.com.br
- **Orçamento:** R$ 3+ bilhões (nacional)
- **Departamentos:**
  - **SEBRAE Nacional** (Brasília)
  - **SEBRAE SP** (maior do Brasil)
  - **SEBRAE RJ**
  - **SEBRAE Labs** (inovação)
- **Projetos:**
  - Stands em feiras (Francal, Couromoda, etc.)
  - Centros de inovação
  - Capacitação VR/AR
  - Eventos de empreendedorismo
- **Detecção:** `@sebrae.com.br`

#### **SENAI CIMATEC (Bahia)**
- Maior centro de inovação SENAI
- Realidade virtual para indústria

#### **CDL (Câmara de Dirigentes Lojistas)**
- Eventos de varejo
- Stands em feiras

#### **ABIT (Associação Brasileira da Indústria Têxtil)**
- Feiras de moda
- Stands, experiências

#### **ABAV (Associação Brasileira de Agências de Viagens)**
- Festuris, WTM Latin America
- Stands de destinos turísticos

---

### **TIER 3: PRODUTORAS, AGÊNCIAS, TV (R$ 50k - R$ 300k)**

#### **PRODUTORAS DE AUDIOVISUAL**

##### **TV Globo / Globosat**
- **Departamentos:**
  - Globo Lab (inovação)
  - Marketing de programas
  - Eventos corporativos
- **Projetos:** Experiências para programas, BBB VR, etc.

##### **Conspiração Filmes**
- Maior produtora independente do Brasil
- Documentários, séries

##### **O2 Filmes**
- Publicidade, branded content

##### **Mixer**
- Documentários, séries

##### **Produtoras Canadenses:**
- **Dpt. (Montreal)** - Docs interativos
- **Felix & Paul Studios** - VR
- **National Film Board (NFB)** - Coprodução

**Detecção:** `@redeglobo.com.br`, `@conspiracao.tv`, `@o2filmes.com`

---

#### **AGÊNCIAS DE PUBLICIDADE**

##### **Top Agências Brasil:**
- **AlmapBBDO**
- **Africa Creative**
- **Wieden+Kennedy SP**
- **Ogilvy Brasil**
- **DM9**
- **Sunset**

**Projetos:** Campanhas com experiências imersivas, ativações de marca

---

#### **AGÊNCIAS DE EVENTOS**

##### **LiveCom**
- Eventos corporativos de grande porte

##### **Unimark**
- Montagem de stands

##### **GL events**
- Gestão de pavilhões (Expo Center Norte, etc.)

---

### **TIER 4: EMPRESAS QUE MONTAM STANDS EM EVENTOS**

#### **GRANDES EVENTOS BRASIL:**

##### **Couromoda (Calçados - São Paulo)**
- 1.000+ expositores
- Potencial: Stands interativos, VR para produtos

##### **Francal (Calçados - São Paulo)**
- Similar ao Couromoda

##### **Feiplastic (Plásticos - São Paulo)**
- Indústria, inovação tecnológica

##### **Hospitalar (Saúde - São Paulo)**
- Equipamentos médicos
- Potencial: VR para treinamento médico

##### **Fispal Food Service**
- Alimentação, gastronomia
- Experiências sensoriais

##### **LAAD Defence & Security**
- Defesa, segurança
- VR para simulação militar

##### **Rio Oil & Gas**
- Petróleo, energia
- VR para segurança offshore

##### **Smart City Expo Curitiba**
- Cidades inteligentes
- Soluções para prefeituras

##### **Campus Party**
- Tecnologia, games
- Stand da Azimut!

---

#### **GRANDES EVENTOS CANADÁ:**

##### **SIGGRAPH Vancouver**
- Computação gráfica, VR/AR

##### **MIPIM Cannes (Imobiliário)**
- Construtoras canadenses expõem

##### **Collision Toronto**
- Startups, tecnologia

---

### **TIER 5: OUTROS MERCADOS**

#### **CONSTRUTORAS E IMOBILIÁRIAS**
- **MRV, Cyrela, Gafisa** (Brasil)
- **Projetos:** VR para venda de imóveis na planta

#### **SHOPPING CENTERS**
- **Iguatemi, Multiplan**
- **Projetos:** Experiências para datas comemorativas (Natal, Páscoa)

#### **TURISMO**
- **Embratur**
- **Secretarias Estaduais de Turismo**
- **Projetos:** Destinos turísticos VR 360°

#### **AUTOMOTIVO**
- **Montadoras:** VW, Fiat, GM, Ford
- **Projetos:** Lançamentos de carros, experiências VR

---

## 🎯 PARTE 3: ESTRUTURA DO BACKOFFICE

### **Modelo de Dados Expandido:**

```typescript
// azimut-cms/prisma/schema.prisma

model Lead {
  id              String    @id @default(uuid())
  
  // IDENTIFICAÇÃO
  name            String
  email           String
  phone           String?
  company         String?
  position        String?
  department      LeadDepartment?
  
  // ORIGEM
  source          LeadSource
  sourceDetails   String?  // Ex: "FILE 2026", "Indicação João Silva"
  referredBy      String?  // Nome de quem indicou
  
  // TIPO DE CLIENTE
  clientType      ClientType  // INSTITUCIONAL, CORPORATIVO, AGENCIA, PRODUTORA, etc.
  tier            ClientTier  // 1, 2, 3, 4, 5
  
  // PROJETO
  projectType     String?
  budget          String?
  timeline        String?
  description     String?
  
  // QUALIFICAÇÃO
  status          LeadStatus
  priority        LeadPriority
  conversionScore Int        @default(0)
  
  // RELACIONAMENTO
  firstContact    DateTime   @default(now())
  lastContact     DateTime?
  nextFollowUp    DateTime?
  assignedTo      String?    // Nome do responsável comercial
  
  // RASTREAMENTO
  sessionId       String?    // Se veio do site
  utmSource       String?
  utmMedium       String?
  utmCampaign     String?
  
  createdAt       DateTime   @default(now())
  updatedAt       DateTime   @updatedAt
  
  // RELACIONAMENTOS
  session         VisitorSession?  @relation(fields: [sessionId], references: [sessionId])
  interactions    Interaction[]
  proposals       Proposal[]
}

enum LeadSource {
  // (toda a lista acima)
}

enum ClientType {
  INSTITUCIONAL_SISTEMA_S    // SESC, SENAC, SENAI
  INSTITUCIONAL_MUSEU        // Museus, centros culturais
  INSTITUCIONAL_GOVERNO      // Secretarias, prefeituras
  
  CORPORATIVO_BANCO          // Bancos e institutos culturais
  CORPORATIVO_ENERGIA        // Petrobras, Vale, etc.
  CORPORATIVO_TELECOM        // Oi Futuro, Vivo, etc.
  CORPORATIVO_VAREJO         // Magazine Luiza, GPA, etc.
  CORPORATIVO_OUTROS         // Outros grandes corporativos
  
  AGENCIA_PUBLICIDADE        // Agências de pub
  AGENCIA_EVENTOS            // Agências de eventos
  
  PRODUTORA_AUDIOVISUAL      // Produtoras de filme/TV
  PRODUTORA_EVENTOS          // Produtoras de eventos
  
  SEBRAE_ASSOCIACAO          // SEBRAE, CDL, ABIT, etc.
  
  STAND_FEIRA                // Empresas que expõem em feiras
  
  EDITAIS                    // Projetos via edital
  
  PARCEIRO                   // Outros parceiros
  
  PME                        // Pequena/média empresa
  
  INDIVIDUAL                 // Pessoa física
}

enum ClientTier {
  TIER_1_PREMIUM    // R$ 500k+
  TIER_2_HIGH       // R$ 100k - R$ 500k
  TIER_3_MEDIUM     // R$ 50k - R$ 100k
  TIER_4_LOW        // R$ 20k - R$ 50k
  TIER_5_MICRO      // < R$ 20k
}

enum LeadStatus {
  NEW              // Novo
  CONTACTED        // Primeiro contato feito
  QUALIFIED        // Qualificado
  PROPOSAL_SENT    // Proposta enviada
  NEGOTIATING      // Em negociação
  WON              // Ganho
  LOST             // Perdido
  NURTURING        // Nutrição (lead frio)
}

enum LeadPriority {
  URGENT           // Institucional premium, hot lead
  HIGH             // Cliente tier 1-2
  MEDIUM           // Cliente tier 3
  LOW              // Cliente tier 4-5
}

// INTERAÇÕES (Histórico de contatos)
model Interaction {
  id          String   @id @default(uuid())
  leadId      String
  lead        Lead     @relation(fields: [leadId], references: [id])
  
  type        InteractionType
  notes       String
  contactedBy String   // Nome de quem fez o contato
  createdAt   DateTime @default(now())
}

enum InteractionType {
  EMAIL
  CALL
  MEETING
  WHATSAPP
  EVENT
  PROPOSAL
  FOLLOWUP
  OTHER
}
```

---

### **Telas do Backoffice:**

#### **1. Dashboard Principal**
```
┌─────────────────────────────────────────────────────────┐
│ 📊 LEADS POR ORIGEM (Este Mês)                         │
├─────────────────────────────────────────────────────────┤
│ Site (IA Hot): 12     [████████░░] 45%                 │
│ Eventos: 8            [█████░░░░░] 30%                 │
│ Indicações: 4         [██░░░░░░░░] 15%                 │
│ Outbound: 3           [█░░░░░░░░░] 10%                 │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 🏢 LEADS POR TIPO DE CLIENTE                           │
├─────────────────────────────────────────────────────────┤
│ Institucional: 15     Corporativo: 8                    │
│ Agências: 5           Produtoras: 3                     │
│ SEBRAE/Assoc: 2       Stands: 4                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 🔥 LEADS URGENTES (HOT)                                │
├─────────────────────────────────────────────────────────┤
│ • João Silva - SESC SP                                  │
│   Origem: Site (IA Score: 92)                          │
│   Projeto: Exposição imersiva - R$ 500k                │
│   Próximo: Follow-up amanhã                             │
│   [ENVIAR EMAIL] [LIGAR] [VER PERFIL]                  │
│                                                         │
│ • Maria Santos - Petrobras Cultura                      │
│   Origem: Indicação (Paulo Mendes)                     │
│   Projeto: Museu do Petróleo - R$ 2M                   │
│   Próximo: Reunião 15/01                                │
│   [AGENDAR] [PROPOSTA] [VER HISTÓRICO]                 │
└─────────────────────────────────────────────────────────┘
```

#### **2. Tela de Lead Individual**
```
┌─────────────────────────────────────────────────────────┐
│ 👤 JOÃO SILVA                                          │
│ Gerente de Cultura - SESC São Paulo                    │
│ joao.silva@sescsp.org.br | (11) 99999-9999            │
├─────────────────────────────────────────────────────────┤
│ ORIGEM: Site (IA Hot Lead)                             │
│ TIPO: Institucional Sistema S                          │
│ TIER: 1 (Premium)                                       │
│ SCORE: 92/100                                           │
│ STATUS: Qualified                                       │
│ PRIORIDADE: 🔴 URGENT                                   │
├─────────────────────────────────────────────────────────┤
│ COMPORTAMENTO NO SITE:                                  │
│ • Visitou 12 páginas                                    │
│ • Tempo total: 18min                                    │
│ • Projetos vistos: Museu Olímpico, CCBB, MIS          │
│ • Filtrou: "Museums & Culture"                         │
│ • Download: Portfolio Museus PDF                        │
├─────────────────────────────────────────────────────────┤
│ PROJETO SOLICITADO:                                     │
│ Tipo: Exposição Imersiva                               │
│ Orçamento: R$ 500.000 - R$ 1.000.000                  │
│ Prazo: 8-12 meses                                       │
│ Descrição: Exposição sobre história do trabalho...     │
├─────────────────────────────────────────────────────────┤
│ HISTÓRICO DE INTERAÇÕES:                               │
│ 05/01 14:30 - Preencheu formulário no site (auto)     │
│ 05/01 15:00 - Email de boas-vindas enviado (auto)     │
│ 05/01 16:00 - Ligação realizada por Carlos (manual)   │
│              Notas: Interessado, pediu portfolio       │
│ 06/01 10:00 - Portfolio enviado por email (manual)    │
│                                                         │
│ [ADICIONAR INTERAÇÃO] [ENVIAR PROPOSTA] [AGENDAR]     │
└─────────────────────────────────────────────────────────┘
```

#### **3. Filtros Avançados**
```
Filtrar por:
☐ Origem: [Todas] ▼
☐ Tipo de Cliente: [Todos] ▼
☐ Tier: [Todos] ▼
☐ Status: [Todos] ▼
☐ Prioridade: [Todas] ▼
☐ Responsável: [Todos] ▼
☐ Data: [Último mês] ▼

[FILTRAR] [LIMPAR] [EXPORTAR CSV]
```

---

## 🎯 PARTE 4: ESTRATÉGIA DE AÇÃO

### **QUICK WINS (Esta Semana):**

1. ✅ **Implementar campos novos no Prisma:**
   - `source`, `clientType`, `tier`, `department`
   - Migration do banco

2. ✅ **Criar tela de Lead no backoffice:**
   - Formulário para adicionar lead manual
   - Campo "Origem" com dropdown
   - Campo "Como conheceu" (indicação, evento, etc.)

3. ✅ **Integrar detecção institucional:**
   - Detectar `@sescsp.org.br`, `@petrobras.com.br`, etc.
   - Auto-classificar como TIER 1
   - Enviar alerta "LEAD PREMIUM!"

### **MÉDIO PRAZO (2-4 Semanas):**

4. ✅ **Prospecção ativa:**
   - Lista de contatos (Marketing de bancos, Cultura de empresas)
   - Sequência de emails
   - LinkedIn outreach

5. ✅ **Presença em eventos:**
   - Stand no FILE 2026
   - Patrocínio MUTEK
   - Networking em eventos corporativos

### **LONGO PRAZO (1-3 Meses):**

6. ✅ **Parcerias estratégicas:**
   - Agências de publicidade (co-venda)
   - Produtoras (coprodução)
   - Agências de eventos (fornecedor preferencial)

---

## 💡 DECISÃO: PRÓXIMOS PASSOS

**O que você quer que eu faça AGORA?**

### **OPÇÃO 1: IMPLEMENTAR ESTRUTURA DE LEADS NO BACKOFFICE** ⭐⭐⭐⭐⭐
**Tempo:** 1 dia
**Impacto:** ALTÍSSIMO

- Criar migration Prisma (novos campos)
- Criar tela "Adicionar Lead Manual"
- Criar tela "Todos os Leads" com filtros
- Implementar detecção institucional

**Benefício:** Organização TOTAL, visibilidade de onde vem cada lead

---

### **OPÇÃO 2: CRIAR DOCUMENTO COM LISTA COMPLETA DE CONTATOS**
**Tempo:** 2-3 horas
**Impacto:** ALTO

- Expandir lista com TODOS os clientes potenciais
- Adicionar departamentos específicos
- Incluir emails/telefones (pesquisa)
- Priorizar por tier

**Benefício:** Base de prospecção completa para outbound

---

### **OPÇÃO 3: FAZER AS DUAS!** 🚀
**Tempo:** 1.5 dias
**Impacto:** MÁXIMO

1. Implementar código (backoffice)
2. Criar documento de prospecção

**Benefício:** Sistema completo + lista para ação

---

**Qual você prefere? Me diga e eu começo!** 💪

