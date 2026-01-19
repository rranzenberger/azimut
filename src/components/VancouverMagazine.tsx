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
        subtitle: 'A cidade mais linda do mundo 🌊',
        cards: [
          {
            emoji: '🏔️',
            title: 'Natureza Épica',
            text: 'Praia de manhã, neve à tarde',
            video: 'https://www.youtube.com/watch?v=bJMYoj4hHqU',
            gradient: 'from-green-600 to-blue-600',
            image: '🌲🏔️⛷️🏖️'
          },
          {
            emoji: '🎭',
            title: 'Cultura Vibrante',
            text: 'Festivais, arte, música',
            video: 'https://www.youtube.com/watch?v=m6W5YSp6Q-0',
            gradient: 'from-purple-600 to-pink-600',
            image: '🎨🎭🎪🎸'
          },
          {
            emoji: '🍜',
            title: 'Food Scene',
            text: 'Comida do mundo todo',
            video: 'https://www.youtube.com/watch?v=ljLWjkWaLHY',
            gradient: 'from-orange-600 to-red-600',
            image: '🍣🍜🌮🍕'
          },
          {
            emoji: '🌈',
            title: 'Super Diversa',
            text: '+100 culturas numa cidade',
            video: 'https://www.youtube.com/watch?v=m6W5YSp6Q-0',
            gradient: 'from-yellow-600 to-pink-600',
            image: '🇨🇦🇧🇷🇮🇳🇨🇳'
          },
          {
            emoji: '🚴',
            title: 'Vida Ativa',
            text: 'Bike, ski, surf, tudo!',
            video: 'https://www.youtube.com/watch?v=bJMYoj4hHqU',
            gradient: 'from-cyan-600 to-blue-600',
            image: '🚴🏂🏄🧗'
          },
          {
            emoji: '🌙',
            title: 'Nightlife',
            text: 'Bares, clubs, rooftops',
            video: 'https://www.youtube.com/watch?v=3vZ3bZDrCkI',
            gradient: 'from-indigo-600 to-purple-600',
            image: '🍻🎵💃🌃'
          }
        ]
      },
      schools: {
        title: 'Melhores Escolas',
        subtitle: 'Hollywood está aqui 🎬',
        cards: [
          {
            emoji: '🎨',
            title: 'VanArts',
            text: '95% emprego | Pixar, Marvel',
            stats: ['$42k CAD', '1 ano', 'Co-op paid'],
            gradient: 'from-purple-600 to-pink-600',
            video: 'https://www.youtube.com/watch?v=Vm1s2cwHI-M'
          },
          {
            emoji: '🎬',
            title: 'VFS',
            text: 'Câmeras RED | Estúdios reais',
            stats: ['$50k CAD', '1 ano', 'Network Hollywood'],
            gradient: 'from-red-600 to-orange-600',
            video: 'https://www.youtube.com/watch?v=y3uhoRpQPYY'
          },
          {
            emoji: '🎮',
            title: 'Game Design',
            text: 'Fortnite, Last of Us',
            stats: ['Unreal Engine', 'Maya', 'Houdini'],
            gradient: 'from-blue-600 to-cyan-600',
            video: 'https://www.youtube.com/watch?v=Vm1s2cwHI-M'
          },
          {
            emoji: '📹',
            title: 'Cinematografia',
            text: 'Netflix, HBO, A24',
            stats: ['RED 8K', 'Arri Alexa', 'DaVinci'],
            gradient: 'from-yellow-600 to-red-600',
            video: 'https://www.youtube.com/watch?v=y3uhoRpQPYY'
          }
        ]
      },
      future: {
        title: 'Seu Futuro',
        subtitle: 'Onde você pode trabalhar ✨',
        cards: [
          {
            emoji: '🦸',
            title: 'Marvel Studios',
            text: 'Avengers, Spider-Man',
            salary: '$80k-120k/ano',
            gradient: 'from-red-600 to-purple-600'
          },
          {
            emoji: '🎮',
            title: 'EA Games',
            text: 'FIFA, Battlefield',
            salary: '$75k-110k/ano',
            gradient: 'from-blue-600 to-cyan-600'
          },
          {
            emoji: '📺',
            title: 'Netflix',
            text: 'Séries originais',
            salary: '$90k-150k/ano',
            gradient: 'from-red-600 to-orange-600'
          },
          {
            emoji: '🎬',
            title: 'Pixar',
            text: 'Toy Story, Soul',
            salary: '$95k-140k/ano',
            gradient: 'from-green-600 to-blue-600'
          },
          {
            emoji: '🎭',
            title: 'Indie Films',
            text: 'Sundance, A24',
            salary: '$60k-100k/ano',
            gradient: 'from-purple-600 to-pink-600'
          },
          {
            emoji: '🎨',
            title: 'Freelancer',
            text: 'Remote, worldwide',
            salary: '$50k-200k/ano',
            gradient: 'from-orange-600 to-yellow-600'
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
        subtitle: 'The most beautiful city in the world 🌊',
        cards: [
          {
            emoji: '🏔️',
            title: 'Epic Nature',
            text: 'Beach morning, snow afternoon',
            video: 'https://www.youtube.com/watch?v=bJMYoj4hHqU',
            gradient: 'from-green-600 to-blue-600',
            image: '🌲🏔️⛷️🏖️'
          },
          {
            emoji: '🎭',
            title: 'Vibrant Culture',
            text: 'Festivals, art, music',
            video: 'https://www.youtube.com/watch?v=m6W5YSp6Q-0',
            gradient: 'from-purple-600 to-pink-600',
            image: '🎨🎭🎪🎸'
          },
          {
            emoji: '🍜',
            title: 'Food Scene',
            text: 'World cuisine',
            video: 'https://www.youtube.com/watch?v=ljLWjkWaLHY',
            gradient: 'from-orange-600 to-red-600',
            image: '🍣🍜🌮🍕'
          },
          {
            emoji: '🌈',
            title: 'Super Diverse',
            text: '+100 cultures',
            video: 'https://www.youtube.com/watch?v=m6W5YSp6Q-0',
            gradient: 'from-yellow-600 to-pink-600',
            image: '🇨🇦🇧🇷🇮🇳🇨🇳'
          },
          {
            emoji: '🚴',
            title: 'Active Life',
            text: 'Bike, ski, surf, all!',
            video: 'https://www.youtube.com/watch?v=bJMYoj4hHqU',
            gradient: 'from-cyan-600 to-blue-600',
            image: '🚴🏂🏄🧗'
          },
          {
            emoji: '🌙',
            title: 'Nightlife',
            text: 'Bars, clubs, rooftops',
            video: 'https://www.youtube.com/watch?v=3vZ3bZDrCkI',
            gradient: 'from-indigo-600 to-purple-600',
            image: '🍻🎵💃🌃'
          }
        ]
      },
      schools: {
        title: 'Best Schools',
        subtitle: 'Hollywood is here 🎬',
        cards: [
          {
            emoji: '🎨',
            title: 'VanArts',
            text: '95% employment | Pixar, Marvel',
            stats: ['$42k CAD', '1 year', 'Co-op paid'],
            gradient: 'from-purple-600 to-pink-600',
            video: 'https://www.youtube.com/watch?v=Vm1s2cwHI-M'
          },
          {
            emoji: '🎬',
            title: 'VFS',
            text: 'RED cameras | Real studios',
            stats: ['$50k CAD', '1 year', 'Hollywood network'],
            gradient: 'from-red-600 to-orange-600',
            video: 'https://www.youtube.com/watch?v=y3uhoRpQPYY'
          },
          {
            emoji: '🎮',
            title: 'Game Design',
            text: 'Fortnite, Last of Us',
            stats: ['Unreal Engine', 'Maya', 'Houdini'],
            gradient: 'from-blue-600 to-cyan-600',
            video: 'https://www.youtube.com/watch?v=Vm1s2cwHI-M'
          },
          {
            emoji: '📹',
            title: 'Cinematography',
            text: 'Netflix, HBO, A24',
            stats: ['RED 8K', 'Arri Alexa', 'DaVinci'],
            gradient: 'from-yellow-600 to-red-600',
            video: 'https://www.youtube.com/watch?v=y3uhoRpQPYY'
          }
        ]
      },
      future: {
        title: 'Your Future',
        subtitle: 'Where you can work ✨',
        cards: [
          {
            emoji: '🦸',
            title: 'Marvel Studios',
            text: 'Avengers, Spider-Man',
            salary: '$80k-120k/year',
            gradient: 'from-red-600 to-purple-600'
          },
          {
            emoji: '🎮',
            title: 'EA Games',
            text: 'FIFA, Battlefield',
            salary: '$75k-110k/year',
            gradient: 'from-blue-600 to-cyan-600'
          },
          {
            emoji: '📺',
            title: 'Netflix',
            text: 'Original series',
            salary: '$90k-150k/year',
            gradient: 'from-red-600 to-orange-600'
          },
          {
            emoji: '🎬',
            title: 'Pixar',
            text: 'Toy Story, Soul',
            salary: '$95k-140k/year',
            gradient: 'from-green-600 to-blue-600'
          },
          {
            emoji: '🎭',
            title: 'Indie Films',
            text: 'Sundance, A24',
            salary: '$60k-100k/year',
            gradient: 'from-purple-600 to-pink-600'
          },
          {
            emoji: '🎨',
            title: 'Freelancer',
            text: 'Remote, worldwide',
            salary: '$50k-200k/year',
            gradient: 'from-orange-600 to-yellow-600'
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
        subtitle: 'La ciudad más linda del mundo 🌊',
        cards: [
          {
            emoji: '🏔️',
            title: 'Naturaleza Épica',
            text: 'Playa por la mañana, nieve por la tarde',
            video: 'https://www.youtube.com/watch?v=bJMYoj4hHqU',
            gradient: 'from-green-600 to-blue-600',
            image: '🌲🏔️⛷️🏖️'
          },
          {
            emoji: '🎭',
            title: 'Cultura Vibrante',
            text: 'Festivales, arte, música',
            video: 'https://www.youtube.com/watch?v=m6W5YSp6Q-0',
            gradient: 'from-purple-600 to-pink-600',
            image: '🎨🎭🎪🎸'
          },
          {
            emoji: '🍜',
            title: 'Escena Gastronómica',
            text: 'Comida de todo el mundo',
            video: 'https://www.youtube.com/watch?v=ljLWjkWaLHY',
            gradient: 'from-orange-600 to-red-600',
            image: '🍣🍜🌮🍕'
          },
          {
            emoji: '🌈',
            title: 'Súper Diversa',
            text: '+100 culturas en una ciudad',
            video: 'https://www.youtube.com/watch?v=m6W5YSp6Q-0',
            gradient: 'from-yellow-600 to-pink-600',
            image: '🇨🇦🇧🇷🇮🇳🇨🇳'
          },
          {
            emoji: '🚴',
            title: 'Vida Activa',
            text: 'Bici, ski, surf, ¡todo!',
            video: 'https://www.youtube.com/watch?v=bJMYoj4hHqU',
            gradient: 'from-cyan-600 to-blue-600',
            image: '🚴🏂🏄🧗'
          },
          {
            emoji: '🌙',
            title: 'Vida Nocturna',
            text: 'Bares, clubs, rooftops',
            video: 'https://www.youtube.com/watch?v=3vZ3bZDrCkI',
            gradient: 'from-indigo-600 to-purple-600',
            image: '🍻🎵💃🌃'
          }
        ]
      },
      schools: {
        title: 'Mejores Escuelas',
        subtitle: 'Hollywood está aquí 🎬',
        cards: [
          {
            emoji: '🎨',
            title: 'VanArts',
            text: '95% empleo | Pixar, Marvel',
            stats: ['$42k CAD', '1 año', 'Co-op remunerado'],
            gradient: 'from-purple-600 to-pink-600',
            video: 'https://www.youtube.com/watch?v=Vm1s2cwHI-M'
          },
          {
            emoji: '🎬',
            title: 'VFS',
            text: 'Cámaras RED | Estudios reales',
            stats: ['$50k CAD', '1 año', 'Network Hollywood'],
            gradient: 'from-red-600 to-orange-600',
            video: 'https://www.youtube.com/watch?v=y3uhoRpQPYY'
          },
          {
            emoji: '🎮',
            title: 'Diseño de Juegos',
            text: 'Fortnite, Last of Us',
            stats: ['Unreal Engine', 'Maya', 'Houdini'],
            gradient: 'from-blue-600 to-cyan-600',
            video: 'https://www.youtube.com/watch?v=Vm1s2cwHI-M'
          },
          {
            emoji: '📹',
            title: 'Cinematografía',
            text: 'Netflix, HBO, A24',
            stats: ['RED 8K', 'Arri Alexa', 'DaVinci'],
            gradient: 'from-yellow-600 to-red-600',
            video: 'https://www.youtube.com/watch?v=y3uhoRpQPYY'
          }
        ]
      },
      future: {
        title: 'Tu Futuro',
        subtitle: 'Dónde puedes trabajar ✨',
        cards: [
          {
            emoji: '🦸',
            title: 'Marvel Studios',
            text: 'Avengers, Spider-Man',
            salary: '$80k-120k/año',
            gradient: 'from-red-600 to-purple-600'
          },
          {
            emoji: '🎮',
            title: 'EA Games',
            text: 'FIFA, Battlefield',
            salary: '$75k-110k/año',
            gradient: 'from-blue-600 to-cyan-600'
          },
          {
            emoji: '📺',
            title: 'Netflix',
            text: 'Series originales',
            salary: '$90k-150k/año',
            gradient: 'from-red-600 to-orange-600'
          },
          {
            emoji: '🎬',
            title: 'Pixar',
            text: 'Toy Story, Soul',
            salary: '$95k-140k/año',
            gradient: 'from-green-600 to-blue-600'
          },
          {
            emoji: '🎭',
            title: 'Cine Indie',
            text: 'Sundance, A24',
            salary: '$60k-100k/año',
            gradient: 'from-purple-600 to-pink-600'
          },
          {
            emoji: '🎨',
            title: 'Freelancer',
            text: 'Remoto, mundial',
            salary: '$50k-200k/año',
            gradient: 'from-orange-600 to-yellow-600'
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
        subtitle: 'La plus belle ville du monde 🌊',
        cards: [
          {
            emoji: '🏔️',
            title: 'Nature Épique',
            text: 'Plage le matin, neige l\'après-midi',
            video: 'https://www.youtube.com/watch?v=bJMYoj4hHqU',
            gradient: 'from-green-600 to-blue-600',
            image: '🌲🏔️⛷️🏖️'
          },
          {
            emoji: '🎭',
            title: 'Culture Vibrante',
            text: 'Festivals, art, musique',
            video: 'https://www.youtube.com/watch?v=m6W5YSp6Q-0',
            gradient: 'from-purple-600 to-pink-600',
            image: '🎨🎭🎪🎸'
          },
          {
            emoji: '🍜',
            title: 'Scène Culinaire',
            text: 'Cuisine du monde entier',
            video: 'https://www.youtube.com/watch?v=ljLWjkWaLHY',
            gradient: 'from-orange-600 to-red-600',
            image: '🍣🍜🌮🍕'
          },
          {
            emoji: '🌈',
            title: 'Super Diverse',
            text: '+100 cultures dans une ville',
            video: 'https://www.youtube.com/watch?v=m6W5YSp6Q-0',
            gradient: 'from-yellow-600 to-pink-600',
            image: '🇨🇦🇧🇷🇮🇳🇨🇳'
          },
          {
            emoji: '🚴',
            title: 'Vie Active',
            text: 'Vélo, ski, surf, tout!',
            video: 'https://www.youtube.com/watch?v=bJMYoj4hHqU',
            gradient: 'from-cyan-600 to-blue-600',
            image: '🚴🏂🏄🧗'
          },
          {
            emoji: '🌙',
            title: 'Vie Nocturne',
            text: 'Bars, clubs, rooftops',
            video: 'https://www.youtube.com/watch?v=3vZ3bZDrCkI',
            gradient: 'from-indigo-600 to-purple-600',
            image: '🍻🎵💃🌃'
          }
        ]
      },
      schools: {
        title: 'Meilleures Écoles',
        subtitle: 'Hollywood est ici 🎬',
        cards: [
          {
            emoji: '🎨',
            title: 'VanArts',
            text: '95% emploi | Pixar, Marvel',
            stats: ['$42k CAD', '1 an', 'Co-op rémunéré'],
            gradient: 'from-purple-600 to-pink-600',
            video: 'https://www.youtube.com/watch?v=Vm1s2cwHI-M'
          },
          {
            emoji: '🎬',
            title: 'VFS',
            text: 'Caméras RED | Studios réels',
            stats: ['$50k CAD', '1 an', 'Network Hollywood'],
            gradient: 'from-red-600 to-orange-600',
            video: 'https://www.youtube.com/watch?v=y3uhoRpQPYY'
          },
          {
            emoji: '🎮',
            title: 'Game Design',
            text: 'Fortnite, Last of Us',
            stats: ['Unreal Engine', 'Maya', 'Houdini'],
            gradient: 'from-blue-600 to-cyan-600',
            video: 'https://www.youtube.com/watch?v=Vm1s2cwHI-M'
          },
          {
            emoji: '📹',
            title: 'Cinématographie',
            text: 'Netflix, HBO, A24',
            stats: ['RED 8K', 'Arri Alexa', 'DaVinci'],
            gradient: 'from-yellow-600 to-red-600',
            video: 'https://www.youtube.com/watch?v=y3uhoRpQPYY'
          }
        ]
      },
      future: {
        title: 'Votre Avenir',
        subtitle: 'Où vous pouvez travailler ✨',
        cards: [
          {
            emoji: '🦸',
            title: 'Marvel Studios',
            text: 'Avengers, Spider-Man',
            salary: '$80k-120k/an',
            gradient: 'from-red-600 to-purple-600'
          },
          {
            emoji: '🎮',
            title: 'EA Games',
            text: 'FIFA, Battlefield',
            salary: '$75k-110k/an',
            gradient: 'from-blue-600 to-cyan-600'
          },
          {
            emoji: '📺',
            title: 'Netflix',
            text: 'Séries originales',
            salary: '$90k-150k/an',
            gradient: 'from-red-600 to-orange-600'
          },
          {
            emoji: '🎬',
            title: 'Pixar',
            text: 'Toy Story, Soul',
            salary: '$95k-140k/an',
            gradient: 'from-green-600 to-blue-600'
          },
          {
            emoji: '🎭',
            title: 'Films Indé',
            text: 'Sundance, A24',
            salary: '$60k-100k/an',
            gradient: 'from-purple-600 to-pink-600'
          },
          {
            emoji: '🎨',
            title: 'Freelancer',
            text: 'À distance, mondial',
            salary: '$50k-200k/an',
            gradient: 'from-orange-600 to-yellow-600'
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
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
            
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-8">
              {/* Top: Emoji - MAIOR para mobile */}
              <div className="text-7xl sm:text-8xl animate-bounce-slow drop-shadow-lg">
                {card.emoji}
              </div>
              
              {/* Middle: Image emojis (if lifestyle) - MAIOR e MAIS CONTRASTE */}
              {card.image && (
                <div className="text-center text-5xl sm:text-6xl opacity-50 group-hover:opacity-70 transition-opacity drop-shadow-md">
                  {card.image}
                </div>
              )}
              
              {/* Bottom: Text - MAIS CONTRASTE */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 uppercase drop-shadow-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                  {card.title}
                </h3>
                <p className="text-base sm:text-lg text-white mb-3 font-medium" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}>
                  {card.text}
                </p>
                
                {/* Stats (for schools) */}
                {card.stats && (
                  <div className="flex gap-2 flex-wrap">
                    {card.stats.map((stat: string, j: number) => (
                      <span
                        key={j}
                        className="px-3 py-1 bg-white/20 backdrop-blur-xl rounded-full text-xs text-white font-bold"
                      >
                        {stat}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Salary (for future) */}
                {card.salary && (
                  <div className="mt-2 px-4 py-2 bg-white/20 backdrop-blur-xl rounded-full inline-block">
                    <span className="text-white font-black text-lg">
                      {card.salary}
                    </span>
                  </div>
                )}
              </div>

              {/* Play button overlay (if video) */}
              {card.video && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-20 h-20 rounded-full bg-white/30 backdrop-blur-xl flex items-center justify-center">
                    <span className="text-4xl">▶️</span>
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
