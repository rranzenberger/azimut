// ════════════════════════════════════════════════════════════
// DYNAMIC SUGGESTION BANNER - Banner de Sugestões Dinâmicas
// ════════════════════════════════════════════════════════════
// Aparece quando IA detecta interesse claro (confidence > 0.7)
// ════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { type Lang } from '../i18n'
import { useIntentionDetection } from '../hooks/useIntentionDetection'

interface DynamicSuggestionBannerProps {
  lang: Lang
  theme?: 'dark' | 'light'
  minConfidence?: number // Confiança mínima para aparecer (padrão: 0.7)
  autoHideDelay?: number // Tempo para auto-hide em ms (padrão: 8000)
}

// Tempo que o card fica visível antes de trocar/ocultar (bem maior para não parecer pisca-pisca)
const DEFAULT_AUTO_HIDE_MS = 28000

const DynamicSuggestionBanner: React.FC<DynamicSuggestionBannerProps> = ({
  lang,
  theme = 'dark',
  minConfidence = 0.7,
  autoHideDelay = DEFAULT_AUTO_HIDE_MS
}) => {
  const { intention, loading } = useIntentionDetection(lang)
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  // Texto fixo por “sessão” do card: só troca quando a intenção muda, evita pisca-pisca
  const [contextualTexts, setContextualTexts] = useState<{ title: string; cta: string; secondary: string } | null>(null)
  
  // Mostrar banner quando intenção detectada
  useEffect(() => {
    if (intention && intention.confidence >= minConfidence && !isDismissed) {
      setIsVisible(true)
      
      // Auto-hide após delay (bem maior para sensação de apoio, não de distração)
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, autoHideDelay)
      
      return () => clearTimeout(timer)
    } else {
      setIsVisible(false)
    }
  }, [intention, minConfidence, autoHideDelay, isDismissed])
  
  // Reset dismissed quando intenção muda
  useEffect(() => {
    setIsDismissed(false)
  }, [intention?.intention])
  
  // Definir texto do card UMA VEZ por exibição/intenção (evita pisca-pisca ao re-renderizar)
  useEffect(() => {
    if (isVisible && intention) {
      setContextualTexts(getContextualTexts())
    } else {
      setContextualTexts(null)
    }
  }, [isVisible, intention?.intention, lang])
  
  if (!intention || loading || !isVisible || intention.confidence < minConfidence || !contextualTexts) {
    return null
  }
  
  const handleClick = () => {
    // Rotas específicas por tipo de intenção
    const routes: Record<string, string> = {
      'interested_in_museums': `/${lang}/work`,
      'interested_in_vr': `/${lang}/work`,
      'interested_in_education': `/${lang}/academy`,
      'hot_lead': `/${lang}/work`,
      'general_interest': `/${lang}/work`
    }
    
    const targetRoute = routes[intention.intention] || `/${lang}/work`
    navigate(targetRoute)
    setIsVisible(false)
  }
  
  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
  }
  
  // Seleciona texto aleatório do array
  const pickRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]
  
  // Textos variados e humanizados - como um amigo de verdade
  const getContextualTexts = () => {
    const intentionType = intention?.intention || ''
    
    // MUSEUS - EMPATIA: Sentir DENTRO da experiência dele
    const museumTexts = {
      pt: {
        titles: [
          'Aquele frio na barriga de criar algo que vai tocar milhares de pessoas...',
          'A pressão de fazer justiça a uma história que merece ser contada...',
          'Aquela vontade de criar algo que as pessoas vão lembrar pra sempre...',
          'O peso de transformar um espaço vazio em algo que emociona...',
          'Esse desejo de fazer as pessoas sentirem algo que nunca sentiram...',
          'A responsabilidade de dar voz a memórias que não podem ser esquecidas...',
          'Aquela inquietação criativa que não te deixa dormir...',
          'O sonho de criar uma experiência que mude a forma como as pessoas veem o mundo...'
        ],
        ctas: ['Sinto isso também', 'Conheço esse sentimento', 'Já vivi isso', 'Entendo profundamente', 'Passo por isso', 'Vivo isso'],
        secondaries: ['Conta pra mim', 'Tô dentro', 'Sinto contigo', 'Junto nessa', 'Do teu lado', 'Contigo']
      },
      en: {
        titles: [
          'That knot in your stomach when creating something that will touch thousands...',
          'The pressure of doing justice to a story that deserves to be told...',
          'That urge to create something people will remember forever...',
          'The weight of transforming an empty space into something that moves people...',
          'That desire to make people feel something they\'ve never felt...',
          'The responsibility of giving voice to memories that can\'t be forgotten...',
          'That creative restlessness that keeps you up at night...',
          'The dream of creating an experience that changes how people see the world...'
        ],
        ctas: ['I feel it too', 'I know that feeling', 'Been there', 'I deeply understand', 'I go through this', 'I live this'],
        secondaries: ['Tell me', 'I\'m in', 'Feel with you', 'In this together', 'By your side', 'With you']
      },
      es: {
        titles: [
          'Ese nudo en el estómago al crear algo que tocará a miles...',
          'La presión de hacer justicia a una historia que merece ser contada...',
          'Esas ganas de crear algo que las personas recordarán para siempre...',
          'El peso de transformar un espacio vacío en algo que emociona...',
          'Ese deseo de hacer que las personas sientan algo que nunca sintieron...',
          'La responsabilidad de dar voz a memorias que no pueden ser olvidadas...',
          'Esa inquietud creativa que no te deja dormir...',
          'El sueño de crear una experiencia que cambie cómo las personas ven el mundo...'
        ],
        ctas: ['Lo siento también', 'Conozco ese sentimiento', 'Ya viví eso', 'Entiendo profundamente', 'Paso por esto', 'Vivo esto'],
        secondaries: ['Cuéntame', 'Estoy dentro', 'Siento contigo', 'Juntos en esto', 'A tu lado', 'Contigo']
      },
      fr: {
        titles: [
          'Ce nœud au ventre quand tu crées quelque chose qui touchera des milliers...',
          'La pression de rendre justice à une histoire qui mérite d\'être racontée...',
          'Cette envie de créer quelque chose dont les gens se souviendront toujours...',
          'Le poids de transformer un espace vide en quelque chose qui émeut...',
          'Ce désir de faire ressentir aux gens quelque chose qu\'ils n\'ont jamais ressenti...',
          'La responsabilité de donner voix à des mémoires qui ne peuvent être oubliées...',
          'Cette agitation créative qui t\'empêche de dormir...',
          'Le rêve de créer une expérience qui change la façon dont les gens voient le monde...'
        ],
        ctas: ['Je le ressens aussi', 'Je connais ce sentiment', 'J\'ai vécu ça', 'Je comprends profondément', 'Je vis ça', 'Je traverse ça'],
        secondaries: ['Raconte-moi', 'J\'y suis', 'Je ressens avec toi', 'Ensemble là-dedans', 'À tes côtés', 'Avec toi']
      }
    }
    
    // VR - EMPATIA: Sentir DENTRO do fascínio e do medo dele
    const vrTexts = {
      pt: {
        titles: [
          'Aquela sensação de que VR pode mudar tudo, mas e se não funcionar...',
          'A empolgação misturada com medo de investir em algo tão novo...',
          'Esse desejo de criar algo que ninguém nunca viu antes...',
          'A vontade de transportar pessoas pra outro mundo, mas como começar...',
          'Aquele fascínio por tecnologia que parece mágica...',
          'O sonho de criar experiências impossíveis no mundo real...',
          'Essa inquietação de querer inovar mas não saber por onde...',
          'A visão de algo incrível, mas a dúvida se é possível...'
        ],
        ctas: ['Sinto isso também', 'Conheço essa sensação', 'Já passei por isso', 'Entendo esse mix', 'Vivo isso', 'Sinto igual'],
        secondaries: ['Conta mais', 'Tô dentro', 'Sinto contigo', 'Junto', 'Do teu lado', 'Nessa contigo']
      },
      en: {
        titles: [
          'That feeling that VR could change everything, but what if it doesn\'t work...',
          'The excitement mixed with fear of investing in something so new...',
          'That desire to create something no one has ever seen...',
          'The urge to transport people to another world, but where to start...',
          'That fascination with technology that feels like magic...',
          'The dream of creating experiences impossible in the real world...',
          'That restlessness of wanting to innovate but not knowing how...',
          'The vision of something incredible, but doubt if it\'s possible...'
        ],
        ctas: ['I feel it too', 'I know that feeling', 'Been through this', 'I get that mix', 'I live this', 'Feel the same'],
        secondaries: ['Tell me more', 'I\'m in', 'Feel with you', 'Together', 'By your side', 'In this with you']
      },
      es: {
        titles: [
          'Esa sensación de que VR puede cambiarlo todo, pero ¿y si no funciona...',
          'La emoción mezclada con miedo de invertir en algo tan nuevo...',
          'Ese deseo de crear algo que nadie ha visto jamás...',
          'Las ganas de transportar personas a otro mundo, pero ¿cómo empezar...',
          'Esa fascinación por tecnología que parece magia...',
          'El sueño de crear experiencias imposibles en el mundo real...',
          'Esa inquietud de querer innovar pero no saber por dónde...',
          'La visión de algo increíble, pero la duda de si es posible...'
        ],
        ctas: ['Lo siento también', 'Conozco esa sensación', 'Ya pasé por esto', 'Entiendo ese mix', 'Vivo esto', 'Siento igual'],
        secondaries: ['Cuéntame más', 'Estoy dentro', 'Siento contigo', 'Juntos', 'A tu lado', 'En esto contigo']
      },
      fr: {
        titles: [
          'Ce sentiment que la VR peut tout changer, mais si ça ne marche pas...',
          'L\'excitation mêlée à la peur d\'investir dans quelque chose de si nouveau...',
          'Ce désir de créer quelque chose que personne n\'a jamais vu...',
          'L\'envie de transporter les gens dans un autre monde, mais par où commencer...',
          'Cette fascination pour une technologie qui ressemble à de la magie...',
          'Le rêve de créer des expériences impossibles dans le monde réel...',
          'Cette agitation de vouloir innover sans savoir comment...',
          'La vision de quelque chose d\'incroyable, mais le doute si c\'est possible...'
        ],
        ctas: ['Je le ressens aussi', 'Je connais ce sentiment', 'J\'ai vécu ça', 'Je comprends ce mix', 'Je vis ça', 'Je ressens pareil'],
        secondaries: ['Raconte-moi plus', 'J\'y suis', 'Je ressens avec toi', 'Ensemble', 'À tes côtés', 'Là-dedans avec toi']
      }
    }
    
    // VANCOUVER - EMPATIA: Sentir DENTRO do sonho e do medo dele
    const educationTexts = {
      pt: {
        titles: [
          'Aquele sonho que não sai da cabeça, mas o medo de dar errado...',
          'A vontade de mudar de vida misturada com o receio do desconhecido...',
          'Esse desejo de se reinventar num lugar completamente novo...',
          'O frio na barriga de largar tudo e recomeçar do outro lado do mundo...',
          'Aquela sensação de que a vida pode ser diferente, mas será que eu consigo...',
          'O sonho acordado de uma vida nova, mas as dúvidas que não param...',
          'Essa inquietação de querer mais da vida, mas não saber se é o momento...',
          'A coragem que você precisa reunir todo dia pra acreditar nesse sonho...'
        ],
        ctas: ['Sinto isso também', 'Conheço esse sentimento', 'Já vivi isso', 'Entendo profundamente', 'Passo por isso', 'Sinto na pele'],
        secondaries: ['Conta pra mim', 'Tô contigo', 'Sinto junto', 'Do teu lado', 'Nessa contigo', 'Presente']
      },
      en: {
        titles: [
          'That dream that won\'t leave your head, but the fear of it going wrong...',
          'The desire to change your life mixed with fear of the unknown...',
          'That wish to reinvent yourself in a completely new place...',
          'The butterflies of leaving everything and starting over across the world...',
          'That feeling that life could be different, but can I really do it...',
          'The daydream of a new life, but the doubts that won\'t stop...',
          'That restlessness of wanting more from life, but unsure if it\'s the time...',
          'The courage you need to gather every day to believe in this dream...'
        ],
        ctas: ['I feel it too', 'I know that feeling', 'Been there', 'I deeply understand', 'Going through this', 'Feel it in my bones'],
        secondaries: ['Tell me', 'I\'m with you', 'Feel it together', 'By your side', 'In this with you', 'Present']
      },
      es: {
        titles: [
          'Ese sueño que no sale de tu cabeza, pero el miedo a que salga mal...',
          'Las ganas de cambiar de vida mezcladas con el temor a lo desconocido...',
          'Ese deseo de reinventarte en un lugar completamente nuevo...',
          'El nudo en el estómago de dejarlo todo y empezar del otro lado del mundo...',
          'Esa sensación de que la vida puede ser diferente, pero ¿podré lograrlo...',
          'El sueño despierto de una vida nueva, pero las dudas que no paran...',
          'Esa inquietud de querer más de la vida, pero sin saber si es el momento...',
          'El coraje que necesitas reunir cada día para creer en ese sueño...'
        ],
        ctas: ['Lo siento también', 'Conozco ese sentimiento', 'Ya viví eso', 'Entiendo profundamente', 'Paso por esto', 'Lo siento en la piel'],
        secondaries: ['Cuéntame', 'Estoy contigo', 'Siento junto', 'A tu lado', 'En esto contigo', 'Presente']
      },
      fr: {
        titles: [
          'Ce rêve qui ne quitte pas ta tête, mais la peur que ça tourne mal...',
          'L\'envie de changer de vie mêlée à la peur de l\'inconnu...',
          'Ce désir de te réinventer dans un endroit complètement nouveau...',
          'Les papillons dans le ventre de tout quitter et recommencer de l\'autre côté du monde...',
          'Ce sentiment que la vie pourrait être différente, mais est-ce que j\'y arriverai...',
          'Le rêve éveillé d\'une nouvelle vie, mais les doutes qui n\'arrêtent pas...',
          'Cette agitation de vouloir plus de la vie, mais sans savoir si c\'est le moment...',
          'Le courage qu\'il te faut rassembler chaque jour pour croire en ce rêve...'
        ],
        ctas: ['Je le ressens aussi', 'Je connais ce sentiment', 'J\'ai vécu ça', 'Je comprends profondément', 'Je traverse ça', 'Je le sens dans mes os'],
        secondaries: ['Raconte-moi', 'Je suis avec toi', 'Je ressens ensemble', 'À tes côtés', 'Là-dedans avec toi', 'Présent']
      }
    }
    
    // HOT LEAD - EMPATIA: Sentir DENTRO da busca e da incerteza dele
    const hotLeadTexts = {
      pt: {
        titles: [
          'Aquela sensação de ter algo especial nas mãos, mas não saber por onde começar...',
          'A frustração de ter uma visão clara, mas não encontrar quem entenda...',
          'Esse desejo de fazer acontecer, mas o medo de confiar na pessoa errada...',
          'A inquietação de saber que precisa de ajuda, mas não saber em quem confiar...',
          'Aquela ideia que não te deixa em paz, pedindo pra virar realidade...',
          'O peso de uma decisão importante que vai definir o rumo do projeto...',
          'Essa busca por alguém que realmente entenda o que você quer criar...',
          'A vontade de encontrar parceiros que sintam o mesmo que você sente...'
        ],
        ctas: ['Sinto isso também', 'Conheço essa busca', 'Já vivi isso', 'Entendo essa pressão', 'Passo por isso', 'Sinto na pele'],
        secondaries: ['Me conta', 'Tô aqui', 'Sinto contigo', 'Junto', 'Do teu lado', 'Presente']
      },
      en: {
        titles: [
          'That feeling of having something special, but not knowing where to start...',
          'The frustration of having a clear vision, but not finding someone who gets it...',
          'That desire to make it happen, but fear of trusting the wrong person...',
          'The restlessness of knowing you need help, but not knowing who to trust...',
          'That idea that won\'t leave you alone, begging to become reality...',
          'The weight of an important decision that will define the project\'s direction...',
          'That search for someone who truly understands what you want to create...',
          'The desire to find partners who feel the same way you do...'
        ],
        ctas: ['I feel it too', 'I know that search', 'Been there', 'I get that pressure', 'Going through this', 'Feel it deeply'],
        secondaries: ['Tell me', 'I\'m here', 'Feel with you', 'Together', 'By your side', 'Present']
      },
      es: {
        titles: [
          'Esa sensación de tener algo especial, pero no saber por dónde empezar...',
          'La frustración de tener una visión clara, pero no encontrar quien la entienda...',
          'Ese deseo de hacerlo realidad, pero el miedo de confiar en la persona equivocada...',
          'La inquietud de saber que necesitas ayuda, pero no saber en quién confiar...',
          'Esa idea que no te deja en paz, pidiendo volverse realidad...',
          'El peso de una decisión importante que definirá el rumbo del proyecto...',
          'Esa búsqueda por alguien que realmente entienda lo que quieres crear...',
          'Las ganas de encontrar socios que sientan lo mismo que tú...'
        ],
        ctas: ['Lo siento también', 'Conozco esa búsqueda', 'Ya viví eso', 'Entiendo esa presión', 'Paso por esto', 'Lo siento profundamente'],
        secondaries: ['Cuéntame', 'Estoy aquí', 'Siento contigo', 'Juntos', 'A tu lado', 'Presente']
      },
      fr: {
        titles: [
          'Ce sentiment d\'avoir quelque chose de spécial, mais ne pas savoir par où commencer...',
          'La frustration d\'avoir une vision claire, mais ne pas trouver quelqu\'un qui comprend...',
          'Ce désir de faire en sorte que ça arrive, mais la peur de faire confiance à la mauvaise personne...',
          'L\'agitation de savoir que tu as besoin d\'aide, mais ne pas savoir à qui faire confiance...',
          'Cette idée qui ne te laisse pas tranquille, qui demande à devenir réalité...',
          'Le poids d\'une décision importante qui définira la direction du projet...',
          'Cette recherche de quelqu\'un qui comprend vraiment ce que tu veux créer...',
          'L\'envie de trouver des partenaires qui ressentent la même chose que toi...'
        ],
        ctas: ['Je le ressens aussi', 'Je connais cette recherche', 'J\'ai vécu ça', 'Je comprends cette pression', 'Je traverse ça', 'Je le ressens profondément'],
        secondaries: ['Raconte-moi', 'Je suis là', 'Je ressens avec toi', 'Ensemble', 'À tes côtés', 'Présent']
      }
    }
    
    // FALLBACK - EMPATIA: Sentir DENTRO do momento dele
    const fallbackTexts = {
      pt: {
        titles: [
          'Às vezes a gente só precisa de um tempo pra processar tudo...',
          'Aquela fase de explorar sem saber exatamente o que tá buscando...',
          'A sensação de que tem algo por aí, mas ainda não sabe o quê...',
          'Esse momento de só absorver, sem pressão de decidir nada...',
          'A curiosidade que te trouxe até aqui, sem saber onde vai dar...',
          'Aquela vontade de descobrir algo novo, sem compromisso...',
          'O prazer de explorar possibilidades sem pressa...',
          'Esse espaço entre o que você conhece e o que ainda vai descobrir...'
        ],
        ctas: ['Entendo', 'Faz sentido', 'Já senti isso', 'Conheço', 'Normal', 'Tá tudo bem'],
        secondaries: ['Sem pressa', 'Tô aqui', 'Quando quiser', 'Tranquilo', 'No teu tempo', 'Presente']
      },
      en: {
        titles: [
          'Sometimes we just need time to process everything...',
          'That phase of exploring without knowing exactly what you\'re looking for...',
          'The feeling that there\'s something out there, but you don\'t know what yet...',
          'That moment of just absorbing, no pressure to decide anything...',
          'The curiosity that brought you here, not knowing where it leads...',
          'That desire to discover something new, no strings attached...',
          'The pleasure of exploring possibilities without rush...',
          'That space between what you know and what you\'ll still discover...'
        ],
        ctas: ['I understand', 'Makes sense', 'Felt that', 'I know', 'Normal', 'It\'s okay'],
        secondaries: ['No rush', 'I\'m here', 'Whenever', 'Take your time', 'At your pace', 'Present']
      },
      es: {
        titles: [
          'A veces solo necesitamos tiempo para procesar todo...',
          'Esa fase de explorar sin saber exactamente qué estás buscando...',
          'La sensación de que hay algo por ahí, pero aún no sabes qué...',
          'Ese momento de solo absorber, sin presión de decidir nada...',
          'La curiosidad que te trajo aquí, sin saber a dónde lleva...',
          'Esas ganas de descubrir algo nuevo, sin compromiso...',
          'El placer de explorar posibilidades sin prisa...',
          'Ese espacio entre lo que conoces y lo que aún descubrirás...'
        ],
        ctas: ['Entiendo', 'Tiene sentido', 'Ya sentí eso', 'Conozco', 'Normal', 'Está bien'],
        secondaries: ['Sin prisa', 'Estoy aquí', 'Cuando quieras', 'Tranquilo', 'A tu ritmo', 'Presente']
      },
      fr: {
        titles: [
          'Parfois on a juste besoin de temps pour tout digérer...',
          'Cette phase d\'exploration sans savoir exactement ce qu\'on cherche...',
          'Le sentiment qu\'il y a quelque chose, mais tu ne sais pas encore quoi...',
          'Ce moment de juste absorber, sans pression de décider quoi que ce soit...',
          'La curiosité qui t\'a amené ici, sans savoir où ça mène...',
          'Cette envie de découvrir quelque chose de nouveau, sans engagement...',
          'Le plaisir d\'explorer les possibilités sans se presser...',
          'Cet espace entre ce que tu connais et ce que tu vas encore découvrir...'
        ],
        ctas: ['Je comprends', 'Ça a du sens', 'J\'ai ressenti ça', 'Je connais', 'Normal', 'C\'est okay'],
        secondaries: ['Pas de pression', 'Je suis là', 'Quand tu veux', 'Tranquille', 'À ton rythme', 'Présent']
      }
    }
    
    // Selecionar textos baseado no tipo de intenção
    const textSets: Record<string, any> = {
      'interested_in_museums': museumTexts,
      'interested_in_vr': vrTexts,
      'interested_in_education': educationTexts,
      'hot_lead': hotLeadTexts
    }
    
    const selectedSet = textSets[intentionType] || fallbackTexts
    const langTexts = selectedSet[lang] || selectedSet['en']
    
    return {
      title: pickRandom(langTexts.titles),
      cta: pickRandom(langTexts.ctas),
      secondary: pickRandom(langTexts.secondaries)
    }
  }
  
  // Ícone contextual por tipo de interesse
  const getContextualIcon = () => {
    const icons: Record<string, string> = {
      'interested_in_museums': '🏛️',
      'interested_in_vr': '🥽',
      'interested_in_education': '🎓',
      'hot_lead': '💡',
      'general_interest': '👋'
    }
    return icons[intention.intention] || '👋'
  }
  
  const handleSecondaryClick = () => {
    navigate(`/${lang}/contact`)
    setIsVisible(false)
  }
  
  return (
    <div
      className="fixed top-24 right-6 z-[9999] w-80"
      style={{
        animation: 'slideInRight 0.5s ease-out',
        pointerEvents: 'auto'
      }}
    >
      <div
        className="rounded-2xl p-4 shadow-xl backdrop-blur-lg"
        style={{
          backgroundColor: theme === 'dark' 
            ? 'rgba(15, 23, 42, 0.95)' 
            : 'rgba(255, 255, 255, 0.95)',
          borderLeft: '3px solid #c92337',
          boxShadow: theme === 'dark'
            ? '0 8px 32px rgba(0, 0, 0, 0.4)'
            : '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Header com botão fechar */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">{getContextualIcon()}</span>
            <p
              className="text-sm font-medium leading-tight"
              style={{
                color: theme === 'dark' ? '#e2e8f0' : '#1e293b'
              }}
            >
              {contextualTexts.title}
            </p>
          </div>
          
          {/* Botão fechar */}
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors hover:bg-white/20"
            aria-label="Fechar"
            style={{
              color: theme === 'dark' ? '#64748b' : '#94a3b8'
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Botões de ação */}
        <div className="flex gap-2">
          {/* Botão principal */}
          <button
            onClick={handleClick}
            className="flex-1 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] px-3 py-2 rounded-lg"
            style={{
              color: '#fff',
              backgroundColor: '#c92337'
            }}
          >
            {contextualTexts.cta}
          </button>
          
          {/* Botão secundário */}
          <button
            onClick={handleSecondaryClick}
            className="flex-1 text-sm font-medium transition-all duration-200 hover:scale-[1.02] px-3 py-2 rounded-lg"
            style={{
              color: theme === 'dark' ? '#e2e8f0' : '#334155',
              backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
              border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
            }}
          >
            {contextualTexts.secondary}
          </button>
        </div>
      </div>
      
      {/* Animação CSS */}
      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}

export default DynamicSuggestionBanner
