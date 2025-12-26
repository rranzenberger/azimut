# 🧠 SISTEMA DE UX INTELIGENTE - Azimut 2025-2030

## 🎯 Objetivo: Conduzir o Usuário ao que Ele Precisa

### **Problema Identificado:**
- Clientes não sabem o que querem
- Clientes não sabem quanto custa
- Múltiplas demandas (museus, prefeituras, marcas, editais)
- Precisa entender perfil antes do contato

---

## 🗺️ **FLUXO DE CONDUÇÃO INTELIGENTE**

### **Fase 1: Entrada no Site**
```
Usuário chega → IA detecta:
  - Geolocalização (IP/GPS)
  - Idioma do navegador
  - Dispositivo (mobile/desktop)
  - Origem (Google, LinkedIn, direto)
  
→ Personalização inicial:
  - Idioma automático
  - Projetos relevantes para região
  - Conteúdo adaptado
```

### **Fase 2: Exploração (Tracking Inteligente)**
```
Usuário navega → IA rastreia:
  - Tempo em cada página
  - Cliques em projetos específicos
  - Scroll depth (quanto rolou)
  - Projetos visualizados
  - Tags/categorias de interesse
  
→ Construção de perfil:
  - Interesse em VR? → Tag: "vr"
  - Viu projetos de museus? → Tag: "museum"
  - Ficou muito tempo em "Academy"? → Tag: "education"
```

### **Fase 3: Brief Inteligente (Orçamento em Etapas)**
```
Usuário clica "Start a Project" → Wizard em etapas:

ETAPA 1: "O que você precisa?"
  [ ] Experiência imersiva para museu
  [ ] Ativação de marca/evento
  [ ] Filme/documentário VR/IA
  [ ] Workshop/formação
  [ ] Consultoria para edital
  [ ] Outro (especificar)

ETAPA 2: "Qual seu orçamento?"
  [ ] R$ 10k - R$ 50k
  [ ] R$ 50k - R$ 200k
  [ ] R$ 200k - R$ 1M
  [ ] Acima de R$ 1M
  [ ] Preciso de ajuda com financiamento/edital

ETAPA 3: "Contexto do projeto"
  - Localização (cidade/país)
  - Prazo (quando precisa?)
  - Público-alvo
  - Objetivo principal

ETAPA 4: "Como podemos ajudar?"
  - Baseado nas respostas, IA sugere:
    * Projetos similares
    * Serviços recomendados
    * Editais disponíveis
    * Linhas de financiamento

ETAPA 5: "Contato"
  - Nome, email, telefone
  - Mensagem opcional
  - Já temos perfil completo!
```

### **Fase 4: Matching com Editais/Financiamento**
```
IA analisa perfil → Sugere:

Se orçamento < R$ 50k:
  → Editais municipais
  → Leis de incentivo locais
  → Fundos de cultura

Se orçamento R$ 50k-200k:
  → Lei Rouanet
  → PROAC (SP)
  → FAPERJ (RJ)
  → Editais estaduais

Se orçamento > R$ 200k:
  → Lei Rouanet (grande porte)
  → Coproduções internacionais
  → Fundos privados

Se perfil = "Prefeitura":
  → Editais de infraestrutura
  → Secretarias de Cultura
  → Fundos de turismo

Se perfil = "Museu":
  → Editais de museologia
  → Fundos de preservação
  → Parcerias institucionais
```

---

## 🤖 **IA DE PERFILAMENTO**

### **Algoritmo de Detecção de Perfil:**

```typescript
type UserProfile = {
  role: 'museum' | 'prefecture' | 'brand' | 'education' | 'unknown'
  budget_range: 'low' | 'medium' | 'high' | 'enterprise' | 'unknown'
  interest_tags: string[]
  location: { country: string, city: string }
  needs_funding: boolean
  urgency: 'low' | 'medium' | 'high'
}

function detectProfile(userBehavior: UserBehavior): UserProfile {
  let profile: UserProfile = {
    role: 'unknown',
    budget_range: 'unknown',
    interest_tags: [],
    location: detectGeo(),
    needs_funding: false,
    urgency: 'low'
  }
  
  // Análise de comportamento
  if (userBehavior.viewedProjects.includes('museu-rio-olimpico')) {
    profile.role = 'museum'
    profile.interest_tags.push('museum', 'immersive', 'interactive')
  }
  
  if (userBehavior.viewedProjects.includes('natal-cultural')) {
    profile.role = 'prefecture'
    profile.interest_tags.push('city', 'tourism', 'events')
  }
  
  if (userBehavior.timeOnAcademy > 60) {
    profile.role = 'education'
    profile.interest_tags.push('workshop', 'training')
  }
  
  // Análise de orçamento (via wizard)
  if (userBehavior.budgetSelection === '10k-50k') {
    profile.budget_range = 'low'
    profile.needs_funding = true
  }
  
  // Análise de urgência
  if (userBehavior.deadlineSelection === 'asap' || userBehavior.deadlineSelection === '<3months') {
    profile.urgency = 'high'
  }
  
  return profile
}
```

---

## 📊 **SISTEMA DE ORÇAMENTO EM ETAPAS**

### **Componente: BudgetWizard**

```tsx
// src/components/BudgetWizard.tsx

interface BudgetWizardProps {
  onComplete: (profile: UserProfile) => void
}

const BudgetWizard: React.FC<BudgetWizardProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState({
    need: [] as string[],
    budget: '' as string,
    location: '',
    deadline: '',
    audience: '',
    objective: ''
  })
  
  // Etapa 1: Necessidade
  if (step === 1) {
    return (
      <div>
        <h2>O que você precisa?</h2>
        <CheckboxGroup
          options={[
            'Experiência imersiva para museu',
            'Ativação de marca/evento',
            'Filme/documentário VR/IA',
            'Workshop/formação',
            'Consultoria para edital',
            'Outro'
          ]}
          onChange={(selected) => setAnswers({...answers, need: selected})}
        />
        <Button onClick={() => setStep(2)}>Próximo</Button>
      </div>
    )
  }
  
  // Etapa 2: Orçamento
  if (step === 2) {
    return (
      <div>
        <h2>Qual seu orçamento?</h2>
        <RadioGroup
          options={[
            { value: '10k-50k', label: 'R$ 10k - R$ 50k', icon: '💰' },
            { value: '50k-200k', label: 'R$ 50k - R$ 200k', icon: '💎' },
            { value: '200k-1M', label: 'R$ 200k - R$ 1M', icon: '🏆' },
            { value: '1M+', label: 'Acima de R$ 1M', icon: '👑' },
            { value: 'funding', label: 'Preciso de ajuda com financiamento/edital', icon: '📋' }
          ]}
          onChange={(value) => setAnswers({...answers, budget: value})}
        />
        <Button onClick={() => setStep(3)}>Próximo</Button>
      </div>
    )
  }
  
  // ... outras etapas
  
  // Etapa final: Recomendações baseadas em IA
  if (step === 5) {
    const recommendations = getRecommendations(answers)
    return (
      <div>
        <h2>Recomendações para você:</h2>
        {recommendations.projects.map(project => <ProjectCard {...project} />)}
        {recommendations.funding.map(fund => <FundingCard {...fund} />)}
        <ContactForm profile={answers} />
      </div>
    )
  }
}
```

---

## 🎯 **MATCHING COM EDITALS/FINANCIAMENTO**

### **Base de Dados de Editais:**

```typescript
interface Edital {
  id: string
  name: { pt: string, en: string }
  type: 'public' | 'private' | 'municipal' | 'state' | 'federal'
  budget_range: { min: number, max: number }
  eligible_profiles: ('museum' | 'prefecture' | 'brand' | 'education')[]
  location: string[] // estados/cidades elegíveis
  deadline: date
  link: string
  requirements: string[]
}

const editais: Edital[] = [
  {
    id: 'rouanet',
    name: { pt: 'Lei Rouanet', en: 'Rouanet Law' },
    type: 'federal',
    budget_range: { min: 50000, max: 10000000 },
    eligible_profiles: ['museum', 'prefecture', 'education'],
    location: ['BR'], // todo Brasil
    deadline: null, // sempre aberto
    link: 'https://...',
    requirements: ['CNPJ', 'projeto cultural']
  },
  {
    id: 'proac-sp',
    name: { pt: 'PROAC - SP', en: 'PROAC - São Paulo' },
    type: 'state',
    budget_range: { min: 10000, max: 500000 },
    eligible_profiles: ['museum', 'prefecture', 'brand'],
    location: ['SP'],
    deadline: '2025-03-31',
    link: 'https://...',
    requirements: ['CNPJ', 'projeto em SP']
  },
  // ... mais editais
]

function matchEditais(profile: UserProfile): Edital[] {
  return editais.filter(edital => {
    // Verifica perfil elegível
    if (!edital.eligible_profiles.includes(profile.role)) return false
    
    // Verifica orçamento
    const budgetMatch = checkBudgetMatch(profile.budget_range, edital.budget_range)
    if (!budgetMatch) return false
    
    // Verifica localização
    const locationMatch = checkLocation(profile.location, edital.location)
    if (!locationMatch) return false
    
    // Verifica prazo
    if (edital.deadline && isPast(edital.deadline)) return false
    
    return true
  })
}
```

---

## 📈 **ANALYTICS E CONDUÇÃO**

### **Métricas Importantes:**

```typescript
interface UserJourney {
  entry_point: string // de onde veio
  pages_visited: Array<{
    path: string
    time_spent: number // segundos
    scroll_depth: number // 0-100%
    interactions: number // cliques, hovers
  }>
  projects_viewed: string[] // slugs
  tags_interest: string[] // tags dos projetos vistos
  time_to_contact: number // tempo até clicar "Start a Project"
  completed_wizard: boolean
  profile_detected: UserProfile
}

// Análise de condução
function analyzeJourney(journey: UserJourney): {
  engagement: 'low' | 'medium' | 'high'
  intent: 'browsing' | 'researching' | 'ready_to_contact'
  recommendations: string[]
} {
  let engagement = 'low'
  let intent = 'browsing'
  
  // Alta engajamento = muito tempo + muitas páginas
  if (journey.pages_visited.length > 5 && 
      journey.pages_visited.reduce((sum, p) => sum + p.time_spent, 0) > 120) {
    engagement = 'high'
  }
  
  // Pronto para contato = viu projetos + completou wizard
  if (journey.projects_viewed.length > 2 && journey.completed_wizard) {
    intent = 'ready_to_contact'
  }
  
  // Recomendações baseadas em comportamento
  const recommendations = generateRecommendations(journey)
  
  return { engagement, intent, recommendations }
}
```

---

## 🚀 **IMPLEMENTAÇÃO SUGERIDA**

### **Fase 1: Tracking Básico (1-2 dias)**
- [ ] Implementar tracking de páginas visitadas
- [ ] Tracking de tempo em cada página
- [ ] Tracking de projetos visualizados
- [ ] Cookies de interesse (tags)

### **Fase 2: Budget Wizard (3-5 dias)**
- [ ] Criar componente BudgetWizard
- [ ] 5 etapas de questionário
- [ ] Validação de respostas
- [ ] Armazenamento de perfil

### **Fase 3: Matching de Editais (2-3 dias)**
- [ ] Base de dados de editais
- [ ] Algoritmo de matching
- [ ] Exibição de recomendações
- [ ] Links para editais

### **Fase 4: IA de Perfilamento (5-7 dias)**
- [ ] Algoritmo de detecção de perfil
- [ ] Análise de comportamento
- [ ] Recomendações personalizadas
- [ ] Dashboard de analytics

---

**Última atualização:** Dezembro 2025




























