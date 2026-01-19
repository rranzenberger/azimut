// ════════════════════════════════════════════════════════════
// VANCOUVER MAGAZINE - SEÇÃO ULTRA-VISUAL TIPO INSTAGRAM
// ════════════════════════════════════════════════════════════
// Mostra o MELHOR de Vancouver de forma atrativa
// Target: 16-25 anos que querem se apaixonar pela cidade
// ════════════════════════════════════════════════════════════

import React, { useState } from 'react'
import { type Lang } from '../i18n'
import CanadaMapleLeaf from './CanadaMapleLeaf'

interface VancouverMagazineProps {
  lang: Lang
}

const VancouverMagazine: React.FC<VancouverMagazineProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'lifestyle' | 'schools' | 'future'>('lifestyle')

  const content: Record<Lang, any> = {
    pt: {
      tabs: {
        lifestyle: '🏔️ Lifestyle',
        schools: '🎬 Escolas',
        future: '✨ Seu Futuro'
      },
      lifestyle: {
        title: 'Vancouver',
        subtitle: 'Onde seus sonhos ganham endereço 🌊',
        cards: [
          {
            emoji: '🏔️',
            title: 'NATUREZA ÉPICA',
            text: 'Acorde no oceano, durma nas montanhas. Tudo no mesmo dia.',
            video: 'https://www.youtube.com/watch?v=bJMYoj4hHqU',
            gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
            image: '🌲  🏔️  ⛷️  🏖️'
          },
          {
            emoji: '🎭',
            title: 'CULTURA VIVA',
            text: 'Cada semana um festival diferente. Arte em cada esquina.',
            video: 'https://www.youtube.com/watch?v=m6W5YSp6Q-0',
            gradient: 'from-fuchsia-500 via-purple-500 to-violet-600',
            image: '🎨  🎭  🎪  🎸'
          },
          {
            emoji: '🍜',
            title: 'GASTRONOMIA',
            text: 'Do sushi ao taco. Seu paladar vai viajar o mundo sem sair daqui.',
            video: 'https://www.youtube.com/watch?v=ljLWjkWaLHY',
            gradient: 'from-orange-500 via-amber-500 to-red-600',
            image: '🍣  🍜  🌮  🍕'
          },
          {
            emoji: '🌈',
            title: 'DIVERSIDADE',
            text: '+100 nacionalidades. Você vai se sentir em casa, venha de onde vier.',
            video: 'https://www.youtube.com/watch?v=m6W5YSp6Q-0',
            gradient: 'from-rose-500 via-pink-500 to-fuchsia-600',
            image: '🇨🇦  🇧🇷  🇮🇳  🇨🇳'
          },
          {
            emoji: '🚴',
            title: 'VIDA ATIVA',
            text: 'Ski no inverno, surf no verão. Bike o ano inteiro. Escolha a aventura.',
            video: 'https://www.youtube.com/watch?v=bJMYoj4hHqU',
            gradient: 'from-sky-500 via-blue-500 to-indigo-600',
            image: '🚴  🏂  🏄  🧗'
          },
          {
            emoji: '🌙',
            title: 'VIDA NOTURNA',
            text: 'Rooftops com vista, clubs premiados. A noite só acaba quando você quiser.',
            video: 'https://www.youtube.com/watch?v=3vZ3bZDrCkI',
            gradient: 'from-violet-500 via-purple-600 to-indigo-700',
            image: '🍻  🎵  💃  🌃'
          }
        ]
      },
      schools: {
        title: 'Escolas de Elite',
        subtitle: 'Onde nasce o próximo Oscar 🎬',
        cards: [
          {
            emoji: '🎨',
            title: 'VANARTS',
            text: '95% dos alunos empregados. Seus próximos colegas? Pixar e Marvel.',
            stats: ['$42k CAD', '1 ano', 'Estágio remunerado'],
            gradient: 'from-fuchsia-500 via-purple-500 to-violet-600',
            video: 'https://www.youtube.com/watch?v=Vm1s2cwHI-M'
          },
          {
            emoji: '🎬',
            title: 'VFS',
            text: 'Câmeras RED, estúdios reais. Treine como profissional desde o dia 1.',
            stats: ['$50k CAD', '1 ano', 'Rede Hollywood'],
            gradient: 'from-red-500 via-orange-500 to-amber-600',
            video: 'https://www.youtube.com/watch?v=y3uhoRpQPYY'
          },
          {
            emoji: '🎮',
            title: 'GAME DESIGN',
            text: 'Fortnite, Last of Us nasceram aqui. O próximo hit pode ser seu.',
            stats: ['Unreal Engine', 'Maya', 'Houdini'],
            gradient: 'from-blue-500 via-cyan-500 to-teal-600',
            video: 'https://www.youtube.com/watch?v=Vm1s2cwHI-M'
          },
          {
            emoji: '📹',
            title: 'CINEMA PRO',
            text: 'Mesmas câmeras de Netflix e HBO. Saia pronto para os sets.',
            stats: ['RED 8K', 'Arri Alexa', 'DaVinci'],
            gradient: 'from-amber-500 via-orange-500 to-red-600',
            video: 'https://www.youtube.com/watch?v=y3uhoRpQPYY'
          }
        ]
      },
      future: {
        title: 'Seu Futuro',
        subtitle: 'Onde você vai trabalhar ✨',
        cards: [
          {
            emoji: '🦸',
            title: 'MARVEL STUDIOS',
            text: 'Imagine seus efeitos em Avengers. Ex-alunos já estão lá.',
            salary: '$80k-120k/ano',
            gradient: 'from-red-500 via-rose-500 to-purple-600'
          },
          {
            emoji: '🎮',
            title: 'EA GAMES',
            text: 'FIFA, Battlefield, UFC. O mundo dos games te espera.',
            salary: '$75k-110k/ano',
            gradient: 'from-blue-500 via-indigo-500 to-cyan-600'
          },
          {
            emoji: '📺',
            title: 'NETFLIX',
            text: 'Séries que o mundo assiste. Seu nome nos créditos.',
            salary: '$90k-150k/ano',
            gradient: 'from-red-600 via-rose-500 to-orange-500'
          },
          {
            emoji: '🎬',
            title: 'PIXAR',
            text: 'Toy Story, Soul, Inside Out. Arte que emociona milhões.',
            salary: '$95k-140k/ano',
            gradient: 'from-emerald-500 via-teal-500 to-blue-600'
          },
          {
            emoji: '🎭',
            title: 'CINEMA INDIE',
            text: 'Sundance, A24, Cannes. Sua arte, seu caminho.',
            salary: '$60k-100k/ano',
            gradient: 'from-violet-500 via-purple-500 to-fuchsia-600'
          },
          {
            emoji: '🌍',
            title: 'FREELANCER',
            text: 'Trabalhe de qualquer lugar. Clientes do mundo inteiro.',
            salary: '$50k-200k/ano',
            gradient: 'from-amber-500 via-orange-500 to-yellow-500'
          }
        ]
      }
    },
    en: {
      tabs: {
        lifestyle: '🏔️ Lifestyle',
        schools: '🎬 Schools',
        future: '✨ Your Future'
      },
      lifestyle: {
        title: 'Vancouver',
        subtitle: 'Where your dreams find a home 🌊',
        cards: [
          {
            emoji: '🏔️',
            title: 'EPIC NATURE',
            text: 'Wake up by the ocean, sleep in the mountains. Same day.',
            video: 'https://www.youtube.com/watch?v=bJMYoj4hHqU',
            gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
            image: '🌲  🏔️  ⛷️  🏖️'
          },
          {
            emoji: '🎭',
            title: 'VIBRANT CULTURE',
            text: 'A new festival every week. Art on every corner.',
            video: 'https://www.youtube.com/watch?v=m6W5YSp6Q-0',
            gradient: 'from-fuchsia-500 via-purple-500 to-violet-600',
            image: '🎨  🎭  🎪  🎸'
          },
          {
            emoji: '🍜',
            title: 'FOOD PARADISE',
            text: 'From sushi to tacos. Your taste buds will travel the world.',
            video: 'https://www.youtube.com/watch?v=ljLWjkWaLHY',
            gradient: 'from-orange-500 via-amber-500 to-red-600',
            image: '🍣  🍜  🌮  🍕'
          },
          {
            emoji: '🌈',
            title: 'DIVERSITY',
            text: '+100 nationalities. You\'ll feel at home, wherever you\'re from.',
            video: 'https://www.youtube.com/watch?v=m6W5YSp6Q-0',
            gradient: 'from-rose-500 via-pink-500 to-fuchsia-600',
            image: '🇨🇦  🇧🇷  🇮🇳  🇨🇳'
          },
          {
            emoji: '🚴',
            title: 'ACTIVE LIFE',
            text: 'Ski in winter, surf in summer, bike all year. Pick your adventure.',
            video: 'https://www.youtube.com/watch?v=bJMYoj4hHqU',
            gradient: 'from-sky-500 via-blue-500 to-indigo-600',
            image: '🚴  🏂  🏄  🧗'
          },
          {
            emoji: '🌙',
            title: 'NIGHTLIFE',
            text: 'Rooftops with views, award-winning clubs. The night ends when you say.',
            video: 'https://www.youtube.com/watch?v=3vZ3bZDrCkI',
            gradient: 'from-violet-500 via-purple-600 to-indigo-700',
            image: '🍻  🎵  💃  🌃'
          }
        ]
      },
      schools: {
        title: 'Elite Schools',
        subtitle: 'Where the next Oscar is born 🎬',
        cards: [
          {
            emoji: '🎨',
            title: 'VANARTS',
            text: '95% of grads employed. Your future colleagues? Pixar and Marvel.',
            stats: ['$42k CAD', '1 year', 'Paid Co-op'],
            gradient: 'from-fuchsia-500 via-purple-500 to-violet-600',
            video: 'https://www.youtube.com/watch?v=Vm1s2cwHI-M'
          },
          {
            emoji: '🎬',
            title: 'VFS',
            text: 'RED cameras, real studios. Train like a pro from day one.',
            stats: ['$50k CAD', '1 year', 'Hollywood Network'],
            gradient: 'from-red-500 via-orange-500 to-amber-600',
            video: 'https://www.youtube.com/watch?v=y3uhoRpQPYY'
          },
          {
            emoji: '🎮',
            title: 'GAME DESIGN',
            text: 'Fortnite, Last of Us were born here. Your hit could be next.',
            stats: ['Unreal Engine', 'Maya', 'Houdini'],
            gradient: 'from-blue-500 via-cyan-500 to-teal-600',
            video: 'https://www.youtube.com/watch?v=Vm1s2cwHI-M'
          },
          {
            emoji: '📹',
            title: 'CINEMA PRO',
            text: 'Same cameras as Netflix and HBO. Graduate set-ready.',
            stats: ['RED 8K', 'Arri Alexa', 'DaVinci'],
            gradient: 'from-amber-500 via-orange-500 to-red-600',
            video: 'https://www.youtube.com/watch?v=y3uhoRpQPYY'
          }
        ]
      },
      future: {
        title: 'Your Future',
        subtitle: 'Where you\'ll work ✨',
        cards: [
          {
            emoji: '🦸',
            title: 'MARVEL STUDIOS',
            text: 'Imagine your VFX in Avengers. Alumni are already there.',
            salary: '$80k-120k/year',
            gradient: 'from-red-500 via-rose-500 to-purple-600'
          },
          {
            emoji: '🎮',
            title: 'EA GAMES',
            text: 'FIFA, Battlefield, UFC. The gaming world awaits.',
            salary: '$75k-110k/year',
            gradient: 'from-blue-500 via-indigo-500 to-cyan-600'
          },
          {
            emoji: '📺',
            title: 'NETFLIX',
            text: 'Shows the world watches. Your name in the credits.',
            salary: '$90k-150k/year',
            gradient: 'from-red-600 via-rose-500 to-orange-500'
          },
          {
            emoji: '🎬',
            title: 'PIXAR',
            text: 'Toy Story, Soul, Inside Out. Art that moves millions.',
            salary: '$95k-140k/year',
            gradient: 'from-emerald-500 via-teal-500 to-blue-600'
          },
          {
            emoji: '🎭',
            title: 'INDIE CINEMA',
            text: 'Sundance, A24, Cannes. Your art, your path.',
            salary: '$60k-100k/year',
            gradient: 'from-violet-500 via-purple-500 to-fuchsia-600'
          },
          {
            emoji: '🌍',
            title: 'FREELANCER',
            text: 'Work from anywhere. Clients from around the globe.',
            salary: '$50k-200k/year',
            gradient: 'from-amber-500 via-orange-500 to-yellow-500'
          }
        ]
      }
    },
    es: {
      tabs: {
        lifestyle: '🏔️ Lifestyle',
        schools: '🎬 Escuelas',
        future: '✨ Tu Futuro'
      },
      lifestyle: {
        title: 'Vancouver',
        subtitle: 'Donde tus sueños tienen dirección 🌊',
        cards: [
          {
            emoji: '🏔️',
            title: 'NATURALEZA ÉPICA',
            text: 'Despierta en el océano, duerme en las montañas. Todo en un día.',
            video: 'https://www.youtube.com/watch?v=bJMYoj4hHqU',
            gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
            image: '🌲  🏔️  ⛷️  🏖️'
          },
          {
            emoji: '🎭',
            title: 'CULTURA VIVA',
            text: 'Cada semana un festival diferente. Arte en cada esquina.',
            video: 'https://www.youtube.com/watch?v=m6W5YSp6Q-0',
            gradient: 'from-fuchsia-500 via-purple-500 to-violet-600',
            image: '🎨  🎭  🎪  🎸'
          },
          {
            emoji: '🍜',
            title: 'GASTRONOMÍA',
            text: 'Del sushi al taco. Tu paladar viajará el mundo sin salir.',
            video: 'https://www.youtube.com/watch?v=ljLWjkWaLHY',
            gradient: 'from-orange-500 via-amber-500 to-red-600',
            image: '🍣  🍜  🌮  🍕'
          },
          {
            emoji: '🌈',
            title: 'DIVERSIDAD',
            text: '+100 nacionalidades. Te sentirás en casa, vengas de donde vengas.',
            video: 'https://www.youtube.com/watch?v=m6W5YSp6Q-0',
            gradient: 'from-rose-500 via-pink-500 to-fuchsia-600',
            image: '🇨🇦  🇧🇷  🇮🇳  🇨🇳'
          },
          {
            emoji: '🚴',
            title: 'VIDA ACTIVA',
            text: 'Ski en invierno, surf en verano. Bici todo el año. Elige tu aventura.',
            video: 'https://www.youtube.com/watch?v=bJMYoj4hHqU',
            gradient: 'from-sky-500 via-blue-500 to-indigo-600',
            image: '🚴  🏂  🏄  🧗'
          },
          {
            emoji: '🌙',
            title: 'VIDA NOCTURNA',
            text: 'Rooftops con vistas, clubs premiados. La noche termina cuando quieras.',
            video: 'https://www.youtube.com/watch?v=3vZ3bZDrCkI',
            gradient: 'from-violet-500 via-purple-600 to-indigo-700',
            image: '🍻  🎵  💃  🌃'
          }
        ]
      },
      schools: {
        title: 'Escuelas de Élite',
        subtitle: 'Donde nace el próximo Oscar 🎬',
        cards: [
          {
            emoji: '🎨',
            title: 'VANARTS',
            text: '95% de graduados empleados. ¿Tus futuros colegas? Pixar y Marvel.',
            stats: ['$42k CAD', '1 año', 'Práctica remunerada'],
            gradient: 'from-fuchsia-500 via-purple-500 to-violet-600',
            video: 'https://www.youtube.com/watch?v=Vm1s2cwHI-M'
          },
          {
            emoji: '🎬',
            title: 'VFS',
            text: 'Cámaras RED, estudios reales. Entrena como profesional desde el día 1.',
            stats: ['$50k CAD', '1 año', 'Red Hollywood'],
            gradient: 'from-red-500 via-orange-500 to-amber-600',
            video: 'https://www.youtube.com/watch?v=y3uhoRpQPYY'
          },
          {
            emoji: '🎮',
            title: 'GAME DESIGN',
            text: 'Fortnite, Last of Us nacieron aquí. Tu próximo hit puede ser el siguiente.',
            stats: ['Unreal Engine', 'Maya', 'Houdini'],
            gradient: 'from-blue-500 via-cyan-500 to-teal-600',
            video: 'https://www.youtube.com/watch?v=Vm1s2cwHI-M'
          },
          {
            emoji: '📹',
            title: 'CINEMA PRO',
            text: 'Mismas cámaras de Netflix y HBO. Sal listo para los sets.',
            stats: ['RED 8K', 'Arri Alexa', 'DaVinci'],
            gradient: 'from-amber-500 via-orange-500 to-red-600',
            video: 'https://www.youtube.com/watch?v=y3uhoRpQPYY'
          }
        ]
      },
      future: {
        title: 'Tu Futuro',
        subtitle: 'Donde vas a trabajar ✨',
        cards: [
          {
            emoji: '🦸',
            title: 'MARVEL STUDIOS',
            text: 'Imagina tus efectos en Avengers. Ex-alumnos ya están ahí.',
            salary: '$80k-120k/año',
            gradient: 'from-red-500 via-rose-500 to-purple-600'
          },
          {
            emoji: '🎮',
            title: 'EA GAMES',
            text: 'FIFA, Battlefield, UFC. El mundo de los videojuegos te espera.',
            salary: '$75k-110k/año',
            gradient: 'from-blue-500 via-indigo-500 to-cyan-600'
          },
          {
            emoji: '📺',
            title: 'NETFLIX',
            text: 'Series que el mundo ve. Tu nombre en los créditos.',
            salary: '$90k-150k/año',
            gradient: 'from-red-600 via-rose-500 to-orange-500'
          },
          {
            emoji: '🎬',
            title: 'PIXAR',
            text: 'Toy Story, Soul, Inside Out. Arte que emociona millones.',
            salary: '$95k-140k/año',
            gradient: 'from-emerald-500 via-teal-500 to-blue-600'
          },
          {
            emoji: '🎭',
            title: 'CINE INDIE',
            text: 'Sundance, A24, Cannes. Tu arte, tu camino.',
            salary: '$60k-100k/año',
            gradient: 'from-violet-500 via-purple-500 to-fuchsia-600'
          },
          {
            emoji: '🌍',
            title: 'FREELANCER',
            text: 'Trabaja desde cualquier lugar. Clientes de todo el mundo.',
            salary: '$50k-200k/año',
            gradient: 'from-amber-500 via-orange-500 to-yellow-500'
          }
        ]
      }
    },
    fr: {
      tabs: {
        lifestyle: '🏔️ Mode de vie',
        schools: '🎬 Écoles',
        future: '✨ Votre Avenir'
      },
      lifestyle: {
        title: 'Vancouver',
        subtitle: 'Où vos rêves trouvent une adresse 🌊',
        cards: [
          {
            emoji: '🏔️',
            title: 'NATURE ÉPIQUE',
            text: 'Réveillez-vous à l\'océan, dormez en montagne. Même journée.',
            video: 'https://www.youtube.com/watch?v=bJMYoj4hHqU',
            gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
            image: '🌲  🏔️  ⛷️  🏖️'
          },
          {
            emoji: '🎭',
            title: 'CULTURE VIVANTE',
            text: 'Un nouveau festival chaque semaine. L\'art à chaque coin de rue.',
            video: 'https://www.youtube.com/watch?v=m6W5YSp6Q-0',
            gradient: 'from-fuchsia-500 via-purple-500 to-violet-600',
            image: '🎨  🎭  🎪  🎸'
          },
          {
            emoji: '🍜',
            title: 'GASTRONOMIE',
            text: 'Du sushi au taco. Vos papilles voyageront sans partir.',
            video: 'https://www.youtube.com/watch?v=ljLWjkWaLHY',
            gradient: 'from-orange-500 via-amber-500 to-red-600',
            image: '🍣  🍜  🌮  🍕'
          },
          {
            emoji: '🌈',
            title: 'DIVERSITÉ',
            text: '+100 nationalités. Vous serez chez vous, d\'où que vous veniez.',
            video: 'https://www.youtube.com/watch?v=m6W5YSp6Q-0',
            gradient: 'from-rose-500 via-pink-500 to-fuchsia-600',
            image: '🇨🇦  🇧🇷  🇮🇳  🇨🇳'
          },
          {
            emoji: '🚴',
            title: 'VIE ACTIVE',
            text: 'Ski en hiver, surf en été. Vélo toute l\'année. Choisissez l\'aventure.',
            video: 'https://www.youtube.com/watch?v=bJMYoj4hHqU',
            gradient: 'from-sky-500 via-blue-500 to-indigo-600',
            image: '🚴  🏂  🏄  🧗'
          },
          {
            emoji: '🌙',
            title: 'VIE NOCTURNE',
            text: 'Rooftops avec vue, clubs primés. La nuit ne finit que quand vous le décidez.',
            video: 'https://www.youtube.com/watch?v=3vZ3bZDrCkI',
            gradient: 'from-violet-500 via-purple-600 to-indigo-700',
            image: '🍻  🎵  💃  🌃'
          }
        ]
      },
      schools: {
        title: 'Écoles d\'Élite',
        subtitle: 'Où naît le prochain Oscar 🎬',
        cards: [
          {
            emoji: '🎨',
            title: 'VANARTS',
            text: '95% des diplômés embauchés. Vos futurs collègues ? Pixar et Marvel.',
            stats: ['$42k CAD', '1 an', 'Stage rémunéré'],
            gradient: 'from-fuchsia-500 via-purple-500 to-violet-600',
            video: 'https://www.youtube.com/watch?v=Vm1s2cwHI-M'
          },
          {
            emoji: '🎬',
            title: 'VFS',
            text: 'Caméras RED, vrais studios. Formez-vous comme un pro dès le jour 1.',
            stats: ['$50k CAD', '1 an', 'Réseau Hollywood'],
            gradient: 'from-red-500 via-orange-500 to-amber-600',
            video: 'https://www.youtube.com/watch?v=y3uhoRpQPYY'
          },
          {
            emoji: '🎮',
            title: 'GAME DESIGN',
            text: 'Fortnite, Last of Us sont nés ici. Votre hit pourrait être le prochain.',
            stats: ['Unreal Engine', 'Maya', 'Houdini'],
            gradient: 'from-blue-500 via-cyan-500 to-teal-600',
            video: 'https://www.youtube.com/watch?v=Vm1s2cwHI-M'
          },
          {
            emoji: '📹',
            title: 'CINÉMA PRO',
            text: 'Mêmes caméras que Netflix et HBO. Sortez prêt pour les plateaux.',
            stats: ['RED 8K', 'Arri Alexa', 'DaVinci'],
            gradient: 'from-amber-500 via-orange-500 to-red-600',
            video: 'https://www.youtube.com/watch?v=y3uhoRpQPYY'
          }
        ]
      },
      future: {
        title: 'Votre Avenir',
        subtitle: 'Où vous allez travailler ✨',
        cards: [
          {
            emoji: '🦸',
            title: 'MARVEL STUDIOS',
            text: 'Imaginez vos effets dans Avengers. Des anciens élèves y sont déjà.',
            salary: '$80k-120k/an',
            gradient: 'from-red-500 via-rose-500 to-purple-600'
          },
          {
            emoji: '🎮',
            title: 'EA GAMES',
            text: 'FIFA, Battlefield, UFC. Le monde du jeu vidéo vous attend.',
            salary: '$75k-110k/an',
            gradient: 'from-blue-500 via-indigo-500 to-cyan-600'
          },
          {
            emoji: '📺',
            title: 'NETFLIX',
            text: 'Des séries que le monde regarde. Votre nom au générique.',
            salary: '$90k-150k/an',
            gradient: 'from-red-600 via-rose-500 to-orange-500'
          },
          {
            emoji: '🎬',
            title: 'PIXAR',
            text: 'Toy Story, Soul, Inside Out. L\'art qui émeut des millions.',
            salary: '$95k-140k/an',
            gradient: 'from-emerald-500 via-teal-500 to-blue-600'
          },
          {
            emoji: '🎭',
            title: 'CINÉMA INDÉ',
            text: 'Sundance, A24, Cannes. Votre art, votre chemin.',
            salary: '$60k-100k/an',
            gradient: 'from-violet-500 via-purple-500 to-fuchsia-600'
          },
          {
            emoji: '🌍',
            title: 'FREELANCER',
            text: 'Travaillez de n\'importe où. Clients du monde entier.',
            salary: '$50k-200k/an',
            gradient: 'from-amber-500 via-orange-500 to-yellow-500'
          }
        ]
      }
    }
  }

  const t = content[lang] || content.pt
  const currentSection = activeTab === 'lifestyle' ? t.lifestyle : activeTab === 'schools' ? t.schools : t.future

  return (
    <div className="py-16 md:py-24">
      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-12 px-4 flex-wrap">
        {Object.entries(t.tabs).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as any)}
            className={`
              magazine-tab px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-bold uppercase tracking-wider
              transition-all duration-300 transform hover:scale-105
              ${activeTab === key ? 'magazine-tab-active' : ''}
            `}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Title */}
      <div className="text-center mb-12 md:mb-16 px-4">
        <h2 className="section-title-vancouver text-5xl md:text-7xl font-black mb-4 uppercase tracking-tight">
          {currentSection.title}
        </h2>
        <p className="section-subtitle-vancouver text-xl md:text-2xl">
          {currentSection.subtitle}
        </p>
      </div>

      {/* Grid - MAGAZINE STYLE */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8 max-w-7xl mx-auto">
        {currentSection.cards.map((card: any, i: number) => (
          <div
            key={i}
            className={`
              group relative overflow-hidden rounded-3xl aspect-square
              bg-gradient-to-br ${card.gradient}
              transform hover:scale-105 transition-all duration-500
              shadow-2xl hover:shadow-3xl
              cursor-pointer
            `}
            onClick={() => card.video && window.open(card.video, '_blank')}
          >
            {/* Glow Effect - Mais intenso */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/15 transition-all duration-500" />
            
            {/* Content - Layout Premium */}
            <div className="relative z-10 h-full flex flex-col justify-between p-5 sm:p-7 md:p-8">
              
              {/* ═══ TOP: EMOJI GIGANTE com GLOW ═══ */}
              <div 
                className="text-[4.5rem] sm:text-[5.5rem] md:text-[6rem] leading-none"
                style={{ 
                  filter: 'drop-shadow(0 4px 20px rgba(255,255,255,0.3))',
                  animation: 'pulse 3s ease-in-out infinite'
                }}
              >
                {card.emoji}
              </div>
              
              {/* ═══ MIDDLE: Emojis secundários - ESPAÇADOS ═══ */}
              {card.image && (
                <div 
                  className="text-center py-3"
                  style={{ 
                    fontSize: 'clamp(2rem, 6vw, 3rem)',
                    letterSpacing: '0.3em',
                    opacity: 0.65,
                    filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))'
                  }}
                >
                  {card.image}
                </div>
              )}
              
              {/* ═══ BOTTOM: Textos Premium ═══ */}
              <div>
                {/* Título - BOLD e Legível */}
                <h3 
                  className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-2 uppercase tracking-wide"
                  style={{ 
                    textShadow: '0 2px 8px rgba(0,0,0,0.6), 0 4px 20px rgba(0,0,0,0.4)',
                    letterSpacing: '0.05em'
                  }}
                >
                  {card.title}
                </h3>
                
                {/* Texto - Sedutor e Legível */}
                <p 
                  className="text-sm sm:text-base md:text-lg text-white/95 mb-3 font-medium leading-relaxed"
                  style={{ 
                    textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                    lineHeight: '1.4'
                  }}
                >
                  {card.text}
                </p>
                
                {/* Stats (for schools) - Pills Premium */}
                {card.stats && (
                  <div className="flex gap-1.5 sm:gap-2 flex-wrap mt-2">
                    {card.stats.map((stat: string, j: number) => (
                      <span
                        key={j}
                        className="px-2.5 sm:px-3 py-1 bg-white/25 backdrop-blur-xl rounded-full text-[10px] sm:text-xs text-white font-bold border border-white/20"
                        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
                      >
                        {stat}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Salary (for future) - Badge Premium */}
                {card.salary && (
                  <div className="mt-3 px-4 py-2.5 bg-white/25 backdrop-blur-xl rounded-full inline-block border border-white/20">
                    <span 
                      className="text-white font-black text-base sm:text-lg"
                      style={{ textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}
                    >
                      💰 {card.salary}
                    </span>
                  </div>
                )}
              </div>

              {/* Play button overlay (if video) - Mais sutil */}
              {card.video && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/40 backdrop-blur-xl flex items-center justify-center border-2 border-white/50 shadow-2xl">
                    <span className="text-3xl sm:text-4xl ml-1">▶️</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default VancouverMagazine
