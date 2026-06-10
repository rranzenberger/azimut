# 🎯 Estrutura de Leads Separados - CRM Azimut

## 📊 TIPOS DE LEADS

### 1. 🇨🇦 **LEAD VANCOUVER** (Estudar Fora)
**Origem:**
- Webinar "Estudar em Vancouver"
- Página "Estudar em Vancouver"
- Palestras em escolas
- Feiras educacionais
- Infosessions

**Pipeline específico:**
```
FUNIL VANCOUVER:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Novo Lead (New)
   ├── Origem: Webinar/Palestra/Site
   └── Score automático (interesse)

2. Consulta Agendada (Scheduled)
   ├── 1h orientação gratuita
   └── Análise de perfil

3. Em Preparação (Preparing)
   ├── Curso prep Azimut (opcional)
   ├── Construção de portfolio
   └── Melhoria inglês

4. Application (Applying)
   ├── Escolheu VFS ou VanArts
   ├── Documentos em andamento
   └── Application enviado

5. Aprovado (Approved)
   ├── Acceptance letter recebida
   └── Processo de visto iniciado

6. Visto Aprovado (Visa Approved)
   ├── Study Permit OK
   └── Preparando viagem

7. Em Vancouver (In Canada)
   ├── Começou curso
   └── Follow-up periódico

8. Graduado (Graduated)
   ├── Completou curso
   └── Alumni network

❌ Perdido/Cancelado
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Campos específicos:**
- `targetSchool`: VFS | VanArts
- `targetProgram`: Nome do programa
- `intakeYear`: 2026 | 2027 | 2028
- `intakeTerm`: March | June | September
- `englishLevel`: Beginner | Intermediate | Advanced | Fluent
- `hasPortfolio`: boolean
- `needsPreparation`: boolean
- `estimatedBudget`: string
- `fundingSource`: Family | Loan | Scholarship | Other

---

### 2. 🎓 **LEAD CURSO AZIMUT** (Cursos Brasil)
**Origem:**
- Página Academy
- Quiz "Descubra Seu Curso"
- Assistente IA
- Google Ads

**Pipeline específico:**
```
FUNIL CURSOS AZIMUT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Interessado (Interested)
   └── Fez quiz ou perguntou

2. Aula Experimental (Trial Class)
   └── Agendou/fez aula teste

3. Proposta Enviada (Proposal Sent)
   └── Orçamento + programa

4. Negociação (Negotiating)
   └── Discutindo valores/formato

5. Matriculado (Enrolled)
   └── Pagou matrícula

6. Em Curso (Active Student)
   └── Assistindo aulas

7. Concluído (Completed)
   └── Certificado emitido

❌ Não converteu
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Campos específicos:**
- `courseInterest`: VR | IA | Audiovisual | Games | 360
- `courseFormat`: Online | Presencial | Híbrido
- `courseDuration`: Workshop | Curto | Longo
- `experienceLevel`: Beginner | Intermediate | Advanced
- `availability`: Weekdays | Weekends | Flexible
- `preferredSchedule`: Morning | Afternoon | Evening

---

### 3. 🎪 **LEAD WORKSHOP/EVENTO**
**Origem:**
- Página Eventos
- Redes sociais
- Parcerias

**Pipeline específico:**
```
FUNIL WORKSHOPS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Interessado (Interested)
   └── Viu divulgação

2. Inscrito (Registered)
   └── Formulário preenchido

3. Confirmado (Confirmed)
   └── Pagamento recebido

4. Participou (Attended)
   └── Presença confirmada

5. Feedback Recebido (Feedback)
   └── Avaliação pós-evento

6. Lead Curso (Upsell)
   └── Interessado em curso completo

❌ Não compareceu
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Campos específicos:**
- `eventName`: string
- `eventDate`: date
- `eventType`: Workshop | Palestra | Feira
- `ticketType`: Free | Paid
- `howHeard`: Social | Email | Partner | Other

---

### 4. 💼 **LEAD CORPORATIVO**
**Origem:**
- Página Parcerias B2B
- LinkedIn
- Indicação

**Pipeline específico:**
```
FUNIL CORPORATIVO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Contato Inicial (First Contact)
   └── Preenche formulário B2B

2. Reunião Agendada (Meeting Scheduled)
   └── Call de discovery

3. Diagnóstico (Needs Assessment)
   └── Entendendo necessidade

4. Proposta Customizada (Proposal)
   └── Programa + orçamento

5. Negociação (Negotiating)
   └── Ajustes + aprovação

6. Contrato Assinado (Contract Signed)
   └── Fechado!

7. Em Execução (Active Project)
   └── Curso acontecendo

8. Concluído (Completed)
   └── NPS + case study

❌ Não avançou
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Campos específicos:**
- `companySize`: 1-10 | 11-50 | 51-200 | 200+
- `industry`: string
- `trainingGoal`: string
- `numberOfParticipants`: number
- `trainingFormat`: Presencial | Online | Híbrido
- `budget`: string
- `decisionMaker`: boolean
- `timeframe`: Urgent | 1-3m | 3-6m | 6m+

---

### 5. 📞 **LEAD PROJETO** (Formulário Contato Geral)
**Origem:**
- Formulário Contact
- Home page
- Projetos page

**Pipeline específico:**
```
FUNIL PROJETOS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Novo Lead (New)
   └── Preencheu formulário

2. Qualificação (Qualifying)
   └── Primeira conversa

3. Proposta (Proposal)
   └── Escopo + orçamento

4. Negociação (Negotiating)
   └── Ajustes

5. Aprovado (Approved)
   └── Cliente aprovou

6. Em Produção (In Production)
   └── Projeto rodando

7. Entregue (Delivered)
   └── Cliente recebeu

8. Concluído (Completed)
   └── Pagamento final

❌ Não fechou
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Campos específicos:**
- `projectType`: Museu | VR | AR | App | Filme360 | Evento
- `organizationType`: Governo | Cultural | Empresa | ONG
- `budget`: string
- `timeline`: string
- `description`: text
- `interestInGrants`: boolean

---

## 🗂️ ESTRUTURA NO CRM

### DASHBOARD PRINCIPAL

```
┌─────────────────────────────────────────────────┐
│  DASHBOARD - AZIMUT CRM                         │
├─────────────────────────────────────────────────┤
│                                                 │
│  VISÃO GERAL POR TIPO:                          │
│  ┌──────────────┬──────────────┬─────────────┐ │
│  │ 🇨🇦 VANCOUVER │ 🎓 CURSOS    │ 🎪 EVENTOS  │ │
│  │ 45 leads     │ 28 leads     │ 15 inscritos│ │
│  │ 12 em prep   │ 8 ativos     │ Próx: 20/Mar│ │
│  │ 5 aprovados  │ 3 concluídos │             │ │
│  └──────────────┴──────────────┴─────────────┘ │
│                                                 │
│  ┌──────────────┬──────────────┬─────────────┐ │
│  │ 💼 B2B       │ 📞 PROJETOS  │ 📊 TOTAL    │ │
│  │ 8 empresas   │ 22 leads     │ 118 LEADS   │ │
│  │ 2 em neg     │ 5 em prod    │ 32 ativos   │ │
│  │ R$ 280k pipe │ R$ 450k pipe │ R$ 730k     │ │
│  └──────────────┴──────────────┴─────────────┘ │
│                                                 │
│  HOT LEADS (Score 80+):                         │
│  • João Silva - Vancouver VFS - Score 95       │
│  • Empresa X - Treinamento VR - Score 88       │
│  • Maria Costa - Curso IA - Score 82           │
│                                                 │
│  [Ver Todos os Leads por Tipo →]               │
└─────────────────────────────────────────────────┘
```

### FILTROS NO CRM

```
FILTRAR LEADS POR:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 TIPO DE LEAD:
☐ Vancouver (Estudar Fora)
☐ Cursos Azimut
☐ Workshops/Eventos
☐ Corporativo (B2B)
☐ Projetos (Contato Geral)

📊 STATUS/PIPELINE:
[Varia conforme tipo selecionado]

🎯 SCORE:
○ 0-30 (Cold)
○ 30-60 (Warm)
● 60-80 (Hot)
● 80-100 (Very Hot)

📅 DATA:
[Últimos 7 dias]
[Últimos 30 dias]
[Últimos 90 dias]
[Custom]

👤 RESPONSÁVEL:
[Alberto]
[Outro membro]
[Não atribuído]

🔍 BUSCA:
[Nome, email, empresa...]

[APLICAR FILTROS]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 📝 FORMULÁRIOS ESPECÍFICOS

### 1. Formulário "ESTUDAR EM VANCOUVER"

**URL:** `/academy/vancouver/interest`

**Campos:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INFORMAÇÕES PESSOAIS
• Nome completo *
• Email *
• WhatsApp *
• Idade *
• Cidade/Estado *

EDUCAÇÃO ATUAL
• Situação atual *
  ○ Ensino Médio (cursando)
  ○ Ensino Médio (completo)
  ○ Graduação (cursando)
  ○ Graduação (completo)
  ○ Outro

INTERESSE EM VANCOUVER
• Qual escola interessa? *
  ○ VFS (Vancouver Film School)
  ○ VanArts
  ○ Ainda não sei

• Área de interesse *
  ○ 3D Animation & VFX
  ○ Game Design/Art
  ○ Film Production
  ○ Acting
  ○ Digital Design
  ○ Sound Design
  ○ Programming
  ○ Outro

• Quando pretende ir? *
  ○ 2026
  ○ 2027
  ○ 2028 ou depois
  ○ Ainda não sei

• Nível de inglês *
  ○ Iniciante
  ○ Intermediário
  ○ Avançado
  ○ Fluente

• Já tem portfolio? *
  ○ Sim, completo
  ○ Sim, mas precisa melhorar
  ○ Começando agora
  ○ Não tenho

FINANCEIRO
• Orçamento disponível (total) *
  ○ Até R$ 100k
  ○ R$ 100k - 200k
  ○ R$ 200k - 300k
  ○ Acima R$ 300k
  ○ Preciso de bolsa/financiamento

• Fonte de recursos *
  ○ Família
  ○ Economia própria
  ○ Financiamento
  ○ Bolsa
  ○ Combinação

COMO CONHECEU
• Como soube sobre Azimut? *
  ○ Webinar
  ○ Palestra na escola
  ○ Feira educacional
  ○ Redes sociais
  ○ Indicação
  ○ Google
  ○ Outro

• Comentários/Dúvidas
  [Área de texto]

[ENVIAR]

✅ Receber atualizações sobre Vancouver
✅ Quero participar dos próximos webinars
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### 2. Formulário "CURSOS AZIMUT"

**URL:** `/academy/courses/interest`

**Campos:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INFORMAÇÕES PESSOAIS
• Nome completo *
• Email *
• WhatsApp *

INTERESSE EM CURSO
• Área de interesse *
  ○ Produção VR/AR
  ○ IA para Marketing/Criação
  ○ Produção Audiovisual
  ○ Filmes 360°
  ○ Game Design
  ○ Outro

• Nível de experiência *
  ○ Iniciante (zero)
  ○ Básico (explorei sozinho)
  ○ Intermediário (já fiz projetos)
  ○ Avançado (trabalho com isso)

• Formato preferido *
  ○ Online ao vivo
  ○ Presencial (São Paulo)
  ○ Gravado (assíncrono)
  ○ Híbrido

• Duração desejada *
  ○ Workshop (1 dia)
  ○ Curso curto (4-8 semanas)
  ○ Curso completo (3-6 meses)
  ○ Flexível

• Disponibilidade *
  ○ Manhã
  ○ Tarde
  ○ Noite
  ○ Fins de semana
  ○ Flexível

OBJETIVO
• Por que quer fazer o curso? *
  [Área de texto]

COMO CONHECEU
• Como soube da Azimut? *
  [Dropdown]

[QUERO MAIS INFORMAÇÕES]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### 3. Formulário "WORKSHOP/EVENTO"

**URL:** `/events/[event-slug]/register`

**Campos:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INSCRIÇÃO: [Nome do Evento]
📅 Data: [Data]
⏱️ Horário: [Horário]
📍 Local: [Local/Online]

SEUS DADOS
• Nome completo *
• Email *
• WhatsApp *
• Profissão/Estudante *

EXPERIÊNCIA
• Nível em [área do workshop] *
  ○ Iniciante
  ○ Intermediário
  ○ Avançado

• Por que quer participar? *
  [Área de texto - 2 linhas]

COMO CONHECEU
• Como soube deste evento? *
  ○ Instagram
  ○ Email Azimut
  ○ Indicação
  ○ Site
  ○ Outro

[CONFIRMAR INSCRIÇÃO]

💰 Investimento: R$ [valor]
✅ Receberá confirmação por email
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### 4. Formulário "PARCERIA B2B"

**URL:** `/partnerships/b2b`

**Campos:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PARCERIAS CORPORATIVAS/INSTITUCIONAIS

EMPRESA/INSTITUIÇÃO
• Nome da organização *
• Tipo *
  ○ Empresa privada
  ○ Escola/Universidade
  ○ Escola de inglês
  ○ Órgão governamental
  ○ SESC/SENAC
  ○ ONG/Fundação
  ○ Outro

• Segmento/Área *
• Site

SEU CONTATO
• Nome completo *
• Cargo *
• Email corporativo *
• Telefone *

INTERESSE
• Tipo de parceria *
  ○ Treinamento corporativo
  ○ Parceria educacional (escola)
  ○ Palestras/Workshops
  ○ Projeto customizado
  ○ Agente educacional Vancouver
  ○ Outro

• Número de pessoas (se treinamento)
• Orçamento aproximado
• Prazo/Urgência

DETALHES
• Conte mais sobre seu interesse
  [Área de texto]

[SOLICITAR REUNIÃO]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### 5. Formulário "PROJETO" (Mantém atual)

**URL:** `/contact`

(Já existe - formulário SmartContactForm)

---

## 🎯 IMPLEMENTAÇÃO NO PRISMA

```prisma
// Adicionar ao schema.prisma

enum LeadType {
  VANCOUVER        // Estudar fora
  COURSE_AZIMUT    // Cursos Brasil
  WORKSHOP_EVENT   // Workshops/Eventos
  CORPORATE_B2B    // Parcerias B2B
  PROJECT          // Projetos (contato geral)
}

enum VancouverPipeline {
  NEW
  SCHEDULED
  PREPARING
  APPLYING
  APPROVED
  VISA_APPROVED
  IN_CANADA
  GRADUATED
  LOST
}

enum CoursePipeline {
  INTERESTED
  TRIAL_CLASS
  PROPOSAL_SENT
  NEGOTIATING
  ENROLLED
  ACTIVE_STUDENT
  COMPLETED
  LOST
}

enum WorkshopPipeline {
  INTERESTED
  REGISTERED
  CONFIRMED
  ATTENDED
  FEEDBACK
  UPSELL_COURSE
  NO_SHOW
}

enum CorporatePipeline {
  FIRST_CONTACT
  MEETING_SCHEDULED
  NEEDS_ASSESSMENT
  PROPOSAL
  NEGOTIATING
  CONTRACT_SIGNED
  ACTIVE_PROJECT
  COMPLETED
  LOST
}

model Lead {
  // ... campos existentes ...
  
  // NOVO: Tipo de lead
  leadType LeadType @default(PROJECT)
  
  // Pipelines específicos (nullable, só um ativo)
  vancouverPipeline   VancouverPipeline?
  coursePipeline      CoursePipeline?
  workshopPipeline    WorkshopPipeline?
  corporatePipeline   CorporatePipeline?
  
  // Campos Vancouver
  targetSchool        String?  // VFS | VanArts
  targetProgram       String?
  intakeYear          Int?
  intakeTerm          String?  // March | June | September
  englishLevel        String?
  hasPortfolio        Boolean?
  needsPreparation    Boolean?
  fundingSource       String?
  
  // Campos Curso Azimut
  courseInterest      String?
  courseFormat        String?
  courseDuration      String?
  experienceLevel     String?
  availability        String?
  preferredSchedule   String?
  
  // Campos Workshop/Evento
  eventName           String?
  eventDate           DateTime?
  eventType           String?
  ticketType          String?
  howHeard            String?
  
  // Campos Corporativo
  companySize         String?
  industry            String?
  trainingGoal        String?
  numberOfParticipants Int?
  trainingFormat      String?
  decisionMaker       Boolean?
  timeframe           String?
  
  // ... resto dos campos existentes ...
}
```

---

## 🚀 PRÓXIMOS PASSOS

### IMPLEMENTAR AGORA:

1. ✅ **Atualizar Prisma Schema**
   - Adicionar enum LeadType
   - Adicionar pipelines específicos
   - Adicionar campos por tipo
   - Migrar banco

2. ✅ **Criar 5 APIs de Formulário**
   - POST /api/leads/vancouver
   - POST /api/leads/course
   - POST /api/leads/workshop
   - POST /api/leads/corporate
   - POST /api/leads/project (já existe)

3. ✅ **Criar 5 Componentes de Formulário**
   - VancouverInterestForm.tsx
   - CourseInterestForm.tsx
   - WorkshopRegistrationForm.tsx
   - CorporatePartnershipForm.tsx
   - SmartContactForm.tsx (já existe)

4. ✅ **Atualizar CRM**
   - Dashboard com cards por tipo
   - Filtro por tipo de lead
   - Views específicas por pipeline
   - Kanban boards separados

**Bora implementar?** 🚀

Com isso, você terá um CRM COMPLETO que gerencia todos os tipos de leads da Azimut de forma organizada e eficiente!
