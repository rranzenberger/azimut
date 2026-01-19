# 🎯 Estratégia IA Invisível - Navegação Premium 2026

## 💡 Conceito

**IA trabalha nos bastidores, guiando usuário SEM que ele perceba.**

### Princípio:
- ❌ Não mostrar "Powered by AI"
- ❌ Não mostrar loading de IA
- ❌ Não pedir "Fale com nosso bot"
- ✅ Conteúdo muda naturalmente
- ✅ Sugestões aparecem organicamente
- ✅ Usuário sente que o site "entende ele"
- ✅ Conversão acontece naturalmente

---

## 🧠 Como Funciona (Arquitetura)

```
┌─────────────────────────────────────────────────────────────┐
│ Usuário navega normalmente no site                          │
│ - Visita Home                                                │
│ - Clica em "Projetos"                                        │
│ - Vê "Museu Olímpico" por 2 minutos                         │
│ - Volta para Home                                            │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   │ IA rastreia tudo (invisível)
                   ▼
┌─────────────────────────────────────────────────────────────┐
│ Backoffice IA (nos bastidores)                              │
│                                                               │
│ ✅ Detecta: "Interesse em museus + cultura"                 │
│ ✅ Calcula: Score de interesse = 75/100                     │
│ ✅ Identifica: Provável cliente institucional               │
│ ✅ Decide: Mostrar casos similares + CTA suave              │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   │ Retorna instruções
                   ▼
┌─────────────────────────────────────────────────────────────┐
│ Site ajusta automaticamente (SEM avisar)                     │
│                                                               │
│ ✅ Home agora mostra: "Museu Nacional" no topo              │
│ ✅ Aparece: "Veja projetos similares ao Museu Olímpico"     │
│ ✅ CTA muda: "Solicite proposta para museu" (específico)    │
│ ✅ Menu destaca: "Projetos Culturais"                       │
│                                                               │
│ 👤 Usuário pensa: "Uau, este site tem exatamente o que      │
│    procuro!" (não percebe que é IA)                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 Componentes Invisíveis

### 1. **Tracker Silencioso** 👁️

```typescript
// src/hooks/useInvisibleAI.ts

export const useInvisibleAI = () => {
  const [userProfile, setUserProfile] = useState(null)
  
  useEffect(() => {
    const trackBehavior = async () => {
      // Coleta dados de navegação (silenciosamente)
      const behavior = {
        visitedPages: getVisitedPages(),
        timeOnPage: getTimeOnPage(),
        scrollDepth: getScrollDepth(),
        clickedElements: getClickedElements(),
        deviceType: getDeviceType(),
        referrer: document.referrer
      }
      
      // Envia para IA no backoffice (em background)
      const profile = await fetch('https://backoffice.azmt.com.br/api/ai/analyze-behavior', {
        method: 'POST',
        body: JSON.stringify(behavior)
      }).then(r => r.json())
      
      // Salva perfil do usuário (sem mostrar)
      setUserProfile(profile)
      
      // Guarda no sessionStorage para usar em toda navegação
      sessionStorage.setItem('aiProfile', JSON.stringify(profile))
    }
    
    // Roda em background (não bloqueia UI)
    setTimeout(trackBehavior, 2000) // Após 2s de navegação
  }, [])
  
  return userProfile
}
```

**O que rastreia:**
- ✅ Páginas visitadas
- ✅ Tempo em cada página
- ✅ Profundidade de scroll
- ✅ Elementos clicados
- ✅ Origem (Google, direct, etc)
- ✅ Tipo de dispositivo
- ✅ Padrão de navegação

**Usuário não vê nada!** Tudo em background.

---

### 2. **Conteúdo Dinâmico Adaptativo** 🎭

```typescript
// src/components/AdaptiveHero.tsx

const AdaptiveHero = () => {
  const [heroContent, setHeroContent] = useState(defaultContent)
  const userProfile = useInvisibleAI()
  
  useEffect(() => {
    if (userProfile) {
      // IA já analisou usuário
      // Ajusta conteúdo automaticamente
      
      if (userProfile.interest === 'museums') {
        setHeroContent({
          title: 'Museus Interativos que Transformam',
          subtitle: 'Criamos experiências culturais memoráveis',
          cta: 'Ver Museus Criados',
          image: 'museu-olimpico-hero.jpg'
        })
      }
      
      else if (userProfile.interest === 'education') {
        setHeroContent({
          title: 'Educação com Tecnologia Imersiva',
          subtitle: 'Transformamos aprendizado em experiência',
          cta: 'Projetos Educacionais',
          image: 'education-hero.jpg'
        })
      }
      
      else if (userProfile.interest === 'corporate') {
        setHeroContent({
          title: 'Treinamento Corporativo Imersivo',
          subtitle: 'VR e AR para empresas de alto impacto',
          cta: 'Soluções Corporativas',
          image: 'corporate-hero.jpg'
        })
      }
      
      // IA também sugere próximo passo
      if (userProfile.readyToConvert) {
        setHeroContent(prev => ({
          ...prev,
          extraCta: 'Agende uma consultoria gratuita' // ← Aparece sutilmente
        }))
      }
    }
  }, [userProfile])
  
  return (
    <div className="hero">
      <h1>{heroContent.title}</h1>
      <p>{heroContent.subtitle}</p>
      <Button>{heroContent.cta}</Button>
      
      {heroContent.extraCta && (
        <div className="mt-4 text-sm animate-fade-in">
          <a href="/contact" className="text-azimut-red">
            {heroContent.extraCta} →
          </a>
        </div>
      )}
    </div>
  )
}
```

**O que acontece:**
- 👤 Usuário visita Home
- 🔄 IA analisa em background
- ✨ Conteúdo muda sutilmente
- 👁️ Usuário vê conteúdo relevante
- 🤔 Usuário não percebe que mudou

---

### 3. **Recomendações Contextuais** 🎯

```typescript
// src/components/SmartRecommendations.tsx

const SmartRecommendations = ({ currentPage }) => {
  const [recommendations, setRecommendations] = useState([])
  const userProfile = useInvisibleAI()
  
  useEffect(() => {
    const getRecommendations = async () => {
      // IA decide o que mostrar baseado em comportamento
      const recs = await fetch('https://backoffice.azmt.com.br/api/ai/recommend', {
        method: 'POST',
        body: JSON.stringify({
          currentPage,
          userProfile,
          context: 'navigation'
        })
      }).then(r => r.json())
      
      setRecommendations(recs)
    }
    
    if (userProfile) {
      getRecommendations()
    }
  }, [currentPage, userProfile])
  
  return (
    <div className="mt-12">
      <h3 className="text-2xl mb-6">
        {/* Título muda baseado em IA */}
        {userProfile?.interest === 'museums' 
          ? 'Outros Museus que Criamos'
          : userProfile?.interest === 'education'
          ? 'Projetos Educacionais Similares'
          : 'Você Também Pode Gostar'}
      </h3>
      
      <div className="grid grid-cols-3 gap-6">
        {recommendations.map(project => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
      
      {/* CTA aparece se IA detectar alta intenção */}
      {userProfile?.intentScore > 70 && (
        <div className="mt-8 text-center animate-fade-in">
          <p className="text-lg mb-4">
            Interessado em algo similar?
          </p>
          <Button variant="primary" href="/contact">
            Solicitar Proposta Personalizada
          </Button>
        </div>
      )}
    </div>
  )
}
```

**O que IA decide:**
- ✅ Quais projetos mostrar
- ✅ Qual ordem mostrar
- ✅ Se mostrar CTA ou não
- ✅ Qual texto do CTA usar
- ✅ Quando mostrar proposta

---

### 4. **Navegação Sugerida Sutilmente** 🧭

```typescript
// src/components/IntelligentBreadcrumb.tsx

const IntelligentBreadcrumb = () => {
  const [nextStep, setNextStep] = useState(null)
  const userProfile = useInvisibleAI()
  
  useEffect(() => {
    if (userProfile) {
      // IA sugere próximo passo baseado em jornada
      const suggestion = analyzeJourney(userProfile)
      setNextStep(suggestion)
    }
  }, [userProfile])
  
  return (
    <div className="flex items-center gap-2 text-sm">
      {/* Breadcrumb normal */}
      <span>Home</span>
      <span>/</span>
      <span>Projetos</span>
      <span>/</span>
      <span className="font-semibold">Museu Olímpico</span>
      
      {/* Sugestão aparece sutilmente */}
      {nextStep && (
        <div className="ml-4 text-azimut-red animate-fade-in">
          <span className="opacity-50">•</span>
          <a href={nextStep.url} className="ml-2 hover:underline">
            {nextStep.text} →
          </a>
        </div>
      )}
    </div>
  )
}

function analyzeJourney(profile) {
  // IA decide baseado em comportamento
  
  if (profile.visitedPages.length === 1) {
    return { text: 'Ver mais projetos', url: '/projetos' }
  }
  
  if (profile.timeOnPage > 60 && !profile.visitedContact) {
    return { text: 'Solicitar proposta', url: '/contact' }
  }
  
  if (profile.scrollDepth > 80) {
    return { text: 'Casos similares', url: '/projetos?similar=true' }
  }
  
  return null
}
```

**O que aparece:**
```
Home / Projetos / Museu Olímpico  •  Solicitar proposta →
                                      ↑ Aparece sutilmente
```

---

### 5. **Formulário Pré-preenchido Inteligente** 📝

```typescript
// src/components/SmartContactForm.tsx

const SmartContactForm = () => {
  const [formData, setFormData] = useState({})
  const userProfile = useInvisibleAI()
  
  useEffect(() => {
    if (userProfile) {
      // IA pré-preenche baseado em comportamento
      
      const smartDefaults = {
        // Se visitou muito museus, sugere automaticamente
        projectType: userProfile.interest === 'museums' ? 'museu' : '',
        
        // Se passou muito tempo, sugere orçamento maior
        budget: userProfile.timeOnSite > 300 ? '100k-300k' : '',
        
        // Se viu múltiplos projetos, sugere "não urgente"
        timeline: userProfile.visitedPages.length > 5 ? '12m' : '',
        
        // Se viu página de grants, marca checkbox
        interestInGrants: userProfile.visitedPages.includes('/grants')
      }
      
      setFormData(smartDefaults)
    }
  }, [userProfile])
  
  return (
    <form>
      <Select 
        name="projectType" 
        value={formData.projectType} // ← Já vem preenchido!
      >
        <option value="">Selecione...</option>
        <option value="museu">Museu/Exposição</option>
        {/* ... */}
      </Select>
      
      {/* Usuário não percebe que IA preencheu */}
      {/* Parece que o site "lembra" dele */}
    </form>
  )
}
```

**Usuário vê:**
```
Tipo de Projeto: [Museu/Exposição ✓] ← Já selecionado!
```

**Usuário pensa:** "Uau, o site já sabe o que eu quero!"

---

### 6. **CTA Dinâmico Personalizado** 🎯

```typescript
// src/components/AdaptiveCTA.tsx

const AdaptiveCTA = () => {
  const [cta, setCta] = useState(defaultCTA)
  const userProfile = useInvisibleAI()
  
  useEffect(() => {
    if (userProfile) {
      // IA decide qual CTA mostrar
      
      if (userProfile.intentScore > 80) {
        // Alta intenção = CTA direto
        setCta({
          text: 'Solicitar Proposta Agora',
          style: 'urgent',
          color: 'red'
        })
      }
      
      else if (userProfile.intentScore > 50) {
        // Média intenção = CTA suave
        setCta({
          text: 'Ver Casos Similares',
          style: 'soft',
          color: 'blue'
        })
      }
      
      else {
        // Baixa intenção = Educar
        setCta({
          text: 'Explorar Nosso Trabalho',
          style: 'exploratory',
          color: 'gray'
        })
      }
      
      // Personaliza mensagem
      if (userProfile.interest === 'museums') {
        setCta(prev => ({
          ...prev,
          text: `${prev.text} para Museus`
        }))
      }
    }
  }, [userProfile])
  
  return (
    <Button 
      variant={cta.style} 
      color={cta.color}
      className="animate-fade-in"
    >
      {cta.text}
    </Button>
  )
}
```

**O que muda:**
- 🔴 Alta intenção: "Solicitar Proposta Agora"
- 🔵 Média intenção: "Ver Casos Similares"
- ⚪ Baixa intenção: "Explorar Nosso Trabalho"

---

### 7. **Tooltips Contextuais Inteligentes** 💭

```typescript
// src/components/SmartTooltips.tsx

const SmartTooltips = () => {
  const [activeTooltip, setActiveTooltip] = useState(null)
  const userProfile = useInvisibleAI()
  
  useEffect(() => {
    if (userProfile) {
      // IA decide se deve mostrar tooltip
      
      // Se usuário hesita (mouse parado 3s), ajuda
      if (userProfile.mouseHoverTime > 3000) {
        setActiveTooltip({
          position: userProfile.mousePosition,
          text: 'Posso ajudar? Clique aqui para ver casos similares',
          action: '/projetos'
        })
      }
      
      // Se volta 3x para mesma página, sugere contato
      if (userProfile.returnVisits > 3) {
        setActiveTooltip({
          text: 'Já visitou 3 vezes! Que tal agendar uma conversa?',
          action: '/contact'
        })
      }
    }
  }, [userProfile])
  
  return activeTooltip && (
    <div 
      className="fixed bottom-4 right-4 p-4 bg-white shadow-xl rounded-lg animate-slide-up"
      style={{ maxWidth: '300px' }}
    >
      <p className="text-sm mb-2">{activeTooltip.text}</p>
      <Button size="sm" href={activeTooltip.action}>
        Ver Agora
      </Button>
      <button 
        onClick={() => setActiveTooltip(null)}
        className="absolute top-2 right-2 text-gray-400"
      >
        ×
      </button>
    </div>
  )
}
```

**Aparece sutilmente quando:**
- 🖱️ Usuário hesita
- 🔄 Volta múltiplas vezes
- ⏱️ Passa muito tempo sem ação
- 📱 Está saindo do site

---

### 8. **Menu Adaptativo** 🍔

```typescript
// src/components/AdaptiveMenu.tsx

const AdaptiveMenu = () => {
  const [menuItems, setMenuItems] = useState(defaultMenu)
  const userProfile = useInvisibleAI()
  
  useEffect(() => {
    if (userProfile) {
      // IA reordena menu baseado em interesse
      
      const adaptedMenu = [...defaultMenu].sort((a, b) => {
        // Destaca items relacionados ao interesse
        if (userProfile.interest === 'museums') {
          if (a.id === 'projetos-culturais') return -1
          if (b.id === 'projetos-culturais') return 1
        }
        return 0
      })
      
      // Adiciona badge em item relevante
      adaptedMenu.forEach(item => {
        if (item.category === userProfile.interest) {
          item.badge = '🔥' // Destaca sutilmente
        }
      })
      
      setMenuItems(adaptedMenu)
    }
  }, [userProfile])
  
  return (
    <nav>
      {menuItems.map(item => (
        <a key={item.id} href={item.url}>
          {item.label}
          {item.badge && (
            <span className="ml-1 animate-pulse">{item.badge}</span>
          )}
        </a>
      ))}
    </nav>
  )
}
```

**Usuário vê:**
```
Início
Soluções
Projetos Culturais 🔥 ← Destaque sutil
Estúdio
Academy
```

---

## 🎯 Resultado Final

### Jornada do Usuário (com IA invisível):

```
1. Usuário entra no site
   → IA: Rastreia em background

2. Visita "Museu Olímpico"
   → IA: Detecta interesse em museus

3. Volta para Home
   → IA: Ajusta hero para mostrar museus
   → Usuário: "Uau, tem exatamente o que procuro!"

4. Navega para Projetos
   → IA: Mostra só projetos culturais no topo
   → Usuário: "Que organizado, tudo que preciso aqui!"

5. Volta para página do projeto
   → IA: Aparece sutil: "Solicitar proposta →"
   → Usuário: "Faz sentido, vou pedir proposta"

6. Vai para formulário
   → IA: Pré-preenche "Museu/Exposição"
   → Usuário: "Que inteligente, já sabe!"

7. Envia formulário
   → IA: Score alto = Lead quente
   → Equipe: Recebe notificação prioritária

8. Recebe proposta personalizada
   → IA: Analisa histórico e sugere solução ideal
   → Usuário: Fecha projeto! 🎉
```

**Usuário NUNCA viu:**
- ❌ "Carregando IA..."
- ❌ "Chatbot"
- ❌ "Powered by AI"
- ❌ Nenhuma menção à IA

**Usuário SENTIU:**
- ✅ Site intuitivo
- ✅ Conteúdo relevante
- ✅ Experiência personalizada
- ✅ "Parece que me entende!"

---

## 🚀 Implementação

Quer implementar isso? Posso criar:

1. ✅ **Sistema de tracking invisível**
2. ✅ **Análise de comportamento com IA**
3. ✅ **Conteúdo dinâmico adaptativo**
4. ✅ **CTAs personalizados**
5. ✅ **Recomendações contextuais**
6. ✅ **Formulário inteligente**
7. ✅ **Menu adaptativo**
8. ✅ **Tooltips contextuais**

**Tudo invisível, tudo natural, tudo premium.** 🎯

Vamos implementar?
