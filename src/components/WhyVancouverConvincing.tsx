// ════════════════════════════════════════════════════════════
// WHY VANCOUVER - SEÇÃO ULTRA-CONVINCENTE
// ════════════════════════════════════════════════════════════
// Dados REAIS + Vídeos + Estatísticas
// Objetivo: CONVENCER que Vancouver é a MELHOR escolha
// ════════════════════════════════════════════════════════════

import React, { useState } from 'react'
import { type Lang } from '../i18n'
import CanadaMapleLeaf from './CanadaMapleLeaf'

interface WhyVancouverConvincingProps {
  lang: Lang
}

const WhyVancouverConvincing: React.FC<WhyVancouverConvincingProps> = ({ lang }) => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  const content: Record<Lang, any> = {
    pt: {
      hero: {
        title: 'Por Que Vancouver?',
        subtitle: 'A ÚNICA cidade do mundo com TUDO isso:',
        badge: '🏆 Top 5 Melhores Cidades do Mundo'
      },
      reasons: [
        {
          emoji: '🎬',
          title: 'Hollywood do Norte',
          stat: '400+',
          statLabel: 'produções/ano',
          facts: [
            'Mais de 400 filmes e séries filmados/ano',
            'Marvel, DC, Netflix filmam AQUI',
            'Deadpool, The Flash, Arrow = Vancouver',
            '$5 bilhões/ano em produção audiovisual'
          ],
          video: 'https://www.youtube.com/watch?v=Vm1s2cwHI-M',
          gradient: 'from-red-600 to-orange-600',
          proof: 'Fonte: Creative BC 2024'
        },
        {
          emoji: '💰',
          title: 'Salários Altíssimos',
          stat: '$85k',
          statLabel: 'salário médio',
          facts: [
            'Animador 3D: $75k-120k CAD/ano',
            'VFX Artist: $80k-140k CAD/ano',
            'Editor: $70k-110k CAD/ano',
            'Melhor custo-benefício do mundo'
          ],
          video: 'https://www.youtube.com/watch?v=y3uhoRpQPYY',
          gradient: 'from-green-600 to-emerald-600',
          proof: 'Fonte: Glassdoor Canada 2025'
        },
        {
          emoji: '🏆',
          title: '95% Empregabilidade',
          stat: '95%',
          statLabel: 'emprego em 6 meses',
          facts: [
            'VanArts: 95% empregados em 6 meses',
            'VFS: 90% empregados em 1 ano',
            'Co-op paid durante o curso',
            'Network: 500+ empresas parceiras'
          ],
          video: 'https://www.youtube.com/watch?v=Vm1s2cwHI-M',
          gradient: 'from-purple-600 to-pink-600',
          proof: 'Fonte: VanArts & VFS 2024'
        },
        {
          emoji: '🛡️',
          title: 'Cidade Segura',
          stat: '#3',
          statLabel: 'cidade + segura',
          facts: [
            '3ª cidade MAIS SEGURA da América do Norte',
            'Crime rate: 50% menor que LA/NY',
            'Pode andar de madrugada tranquilo',
            'Sistema de saúde público'
          ],
          video: 'https://www.estudarfora.org.br/video-intercambio-no-canada-ou-europa-saiba-como-e-estudar-em-vancouver-e-em-barcelona/',
          gradient: 'from-blue-600 to-cyan-600',
          proof: 'Fonte: Economist Safe Cities Index'
        },
        {
          emoji: '🌈',
          title: 'Qualidade de Vida',
          stat: '#5',
          statLabel: 'melhor do mundo',
          facts: [
            '5ª melhor qualidade de vida do MUNDO',
            'Praia, montanha, neve, floresta = tudo perto',
            'Sistema de transporte público top',
            'Cultura diversa: +100 etnias'
          ],
          video: 'https://hellostudy.com.br/a-vida-e-boa-em-vancouver/',
          gradient: 'from-yellow-600 to-orange-600',
          proof: 'Fonte: Economist Quality of Life 2024'
        },
        {
          emoji: '🎓',
          title: 'Educação Mundial',
          stat: 'Top 10',
          statLabel: 'escolas mundiais',
          facts: [
            'VanArts: Top 10 escolas de animação do mundo',
            'VFS: #1 em cinematografia no Canadá',
            'Emily Carr: Top design university',
            'UBC: Top 40 universidades mundiais'
          ],
          video: 'https://www.youtube.com/watch?v=Vm1s2cwHI-M',
          gradient: 'from-indigo-600 to-purple-600',
          proof: 'Fonte: QS World Rankings 2025'
        }
      ],
      comparison: {
        title: 'Vancouver vs Outras Cidades',
        cities: [
          { name: 'Vancouver 🇨🇦', safety: 95, quality: 98, jobs: 95, cost: 75, education: 98, total: 92 },
          { name: 'Los Angeles 🇺🇸', safety: 60, quality: 70, jobs: 90, cost: 40, education: 85, total: 69 },
          { name: 'Londres 🇬🇧', safety: 75, quality: 80, jobs: 85, cost: 35, education: 95, total: 74 },
          { name: 'São Paulo 🇧🇷', safety: 50, quality: 60, jobs: 70, cost: 80, education: 70, total: 66 }
        ],
        categories: ['Segurança', 'Qualidade', 'Empregos', 'Custo', 'Educação']
      },
      cta: {
        title: 'Convencido?',
        subtitle: 'Milhares de brasileiros já estão lá!',
        button: 'Quero Estudar em Vancouver! 🎬'
      }
    },
    en: {
      hero: {
        title: 'Why Vancouver?',
        subtitle: 'The ONLY city in the world with ALL of this:',
        badge: '🏆 Top 5 Best Cities in the World'
      },
      reasons: [
        {
          emoji: '🎬',
          title: 'Hollywood North',
          stat: '400+',
          statLabel: 'productions/year',
          facts: [
            'Over 400 movies and series filmed/year',
            'Marvel, DC, Netflix film HERE',
            'Deadpool, The Flash, Arrow = Vancouver',
            '$5 billion/year in audiovisual production'
          ],
          video: 'https://www.youtube.com/watch?v=Vm1s2cwHI-M',
          gradient: 'from-red-600 to-orange-600',
          proof: 'Source: Creative BC 2024'
        },
        {
          emoji: '💰',
          title: 'High Salaries',
          stat: '$85k',
          statLabel: 'average salary',
          facts: [
            '3D Animator: $75k-120k CAD/year',
            'VFX Artist: $80k-140k CAD/year',
            'Editor: $70k-110k CAD/year',
            'Best cost-benefit in the world'
          ],
          video: 'https://www.youtube.com/watch?v=y3uhoRpQPYY',
          gradient: 'from-green-600 to-emerald-600',
          proof: 'Source: Glassdoor Canada 2025'
        },
        {
          emoji: '🏆',
          title: '95% Employment',
          stat: '95%',
          statLabel: 'employed in 6 months',
          facts: [
            'VanArts: 95% employed in 6 months',
            'VFS: 90% employed in 1 year',
            'Paid co-op during course',
            'Network: 500+ partner companies'
          ],
          video: 'https://www.youtube.com/watch?v=Vm1s2cwHI-M',
          gradient: 'from-purple-600 to-pink-600',
          proof: 'Source: VanArts & VFS 2024'
        },
        {
          emoji: '🛡️',
          title: 'Safe City',
          stat: '#3',
          statLabel: 'safest city',
          facts: [
            '3rd SAFEST city in North America',
            'Crime rate: 50% lower than LA/NY',
            'Safe to walk at night',
            'Public healthcare system'
          ],
          video: 'https://www.estudarfora.org.br/video-intercambio-no-canada-ou-europa-saiba-como-e-estudar-em-vancouver-e-em-barcelona/',
          gradient: 'from-blue-600 to-cyan-600',
          proof: 'Source: Economist Safe Cities Index'
        },
        {
          emoji: '🌈',
          title: 'Quality of Life',
          stat: '#5',
          statLabel: 'best in the world',
          facts: [
            '5th best quality of life in the WORLD',
            'Beach, mountains, snow, forest = all close',
            'Top public transport system',
            'Diverse culture: +100 ethnicities'
          ],
          video: 'https://hellostudy.com.br/a-vida-e-boa-em-vancouver/',
          gradient: 'from-yellow-600 to-orange-600',
          proof: 'Source: Economist Quality of Life 2024'
        },
        {
          emoji: '🎓',
          title: 'World Education',
          stat: 'Top 10',
          statLabel: 'world schools',
          facts: [
            'VanArts: Top 10 animation schools worldwide',
            'VFS: #1 cinematography in Canada',
            'Emily Carr: Top design university',
            'UBC: Top 40 world universities'
          ],
          video: 'https://www.youtube.com/watch?v=Vm1s2cwHI-M',
          gradient: 'from-indigo-600 to-purple-600',
          proof: 'Source: QS World Rankings 2025'
        }
      ],
      comparison: {
        title: 'Vancouver vs Other Cities',
        cities: [
          { name: 'Vancouver 🇨🇦', safety: 95, quality: 98, jobs: 95, cost: 75, education: 98, total: 92 },
          { name: 'Los Angeles 🇺🇸', safety: 60, quality: 70, jobs: 90, cost: 40, education: 85, total: 69 },
          { name: 'London 🇬🇧', safety: 75, quality: 80, jobs: 85, cost: 35, education: 95, total: 74 },
          { name: 'São Paulo 🇧🇷', safety: 50, quality: 60, jobs: 70, cost: 80, education: 70, total: 66 }
        ],
        categories: ['Safety', 'Quality', 'Jobs', 'Cost', 'Education']
      },
      cta: {
        title: 'Convinced?',
        subtitle: 'Thousands of Brazilians are already there!',
        button: 'I Want to Study in Vancouver! 🎬'
      }
    },
    es: {
      hero: {
        title: '¿Por Qué Vancouver?',
        subtitle: 'La ÚNICA ciudad del mundo con TODO esto:',
        badge: '🏆 Top 5 Mejores Ciudades del Mundo'
      },
      reasons: [
        {
          emoji: '🎬',
          title: 'Hollywood del Norte',
          stat: '400+',
          statLabel: 'producciones/año',
          facts: [
            'Más de 400 películas y series filmadas/año',
            'Marvel, DC, Netflix filman AQUÍ',
            'Deadpool, The Flash, Arrow = Vancouver',
            '$5 mil millones/año en producción audiovisual'
          ],
          video: 'https://www.youtube.com/watch?v=Vm1s2cwHI-M',
          gradient: 'from-red-600 to-orange-600',
          proof: 'Fuente: Creative BC 2024'
        },
        {
          emoji: '💰',
          title: 'Salarios Altísimos',
          stat: '$85k',
          statLabel: 'salario promedio',
          facts: [
            'Animador 3D: $75k-120k CAD/año',
            'Artista VFX: $80k-140k CAD/año',
            'Editor: $70k-110k CAD/año',
            'Mejor costo-beneficio del mundo'
          ],
          video: 'https://www.youtube.com/watch?v=y3uhoRpQPYY',
          gradient: 'from-green-600 to-emerald-600',
          proof: 'Fuente: Glassdoor Canada 2025'
        },
        {
          emoji: '🏆',
          title: '95% Empleabilidad',
          stat: '95%',
          statLabel: 'empleo en 6 meses',
          facts: [
            'VanArts: 95% empleados en 6 meses',
            'VFS: 90% empleados en 1 año',
            'Co-op remunerado durante el curso',
            'Network: 500+ empresas asociadas'
          ],
          video: 'https://www.youtube.com/watch?v=Vm1s2cwHI-M',
          gradient: 'from-purple-600 to-pink-600',
          proof: 'Fuente: VanArts & VFS 2024'
        },
        {
          emoji: '🛡️',
          title: 'Ciudad Segura',
          stat: '#3',
          statLabel: 'ciudad + segura',
          facts: [
            '3ª ciudad MÁS SEGURA de América del Norte',
            'Tasa de criminalidad: 50% menor que LA/NY',
            'Puedes caminar de madrugada tranquilo',
            'Sistema de salud público'
          ],
          video: 'https://www.estudarfora.org.br/video-intercambio-no-canada-ou-europa-saiba-como-e-estudar-em-vancouver-e-em-barcelona/',
          gradient: 'from-blue-600 to-cyan-600',
          proof: 'Fuente: Economist Safe Cities Index'
        },
        {
          emoji: '🌈',
          title: 'Calidad de Vida',
          stat: '#5',
          statLabel: 'mejor del mundo',
          facts: [
            '5ª mejor calidad de vida del MUNDO',
            'Playa, montaña, nieve, bosque = todo cerca',
            'Sistema de transporte público top',
            'Cultura diversa: +100 etnias'
          ],
          video: 'https://hellostudy.com.br/a-vida-e-boa-em-vancouver/',
          gradient: 'from-yellow-600 to-orange-600',
          proof: 'Fuente: Economist Quality of Life 2024'
        },
        {
          emoji: '🎓',
          title: 'Educación Mundial',
          stat: 'Top 10',
          statLabel: 'escuelas mundiales',
          facts: [
            'VanArts: Top 10 escuelas de animación del mundo',
            'VFS: #1 en cinematografía en Canadá',
            'Emily Carr: Top design university',
            'UBC: Top 40 universidades mundiales'
          ],
          video: 'https://www.youtube.com/watch?v=Vm1s2cwHI-M',
          gradient: 'from-indigo-600 to-purple-600',
          proof: 'Fuente: QS World Rankings 2025'
        }
      ],
      comparison: {
        title: 'Vancouver vs Otras Ciudades',
        cities: [
          { name: 'Vancouver 🇨🇦', safety: 95, quality: 98, jobs: 95, cost: 75, education: 98, total: 92 },
          { name: 'Los Angeles 🇺🇸', safety: 60, quality: 70, jobs: 90, cost: 40, education: 85, total: 69 },
          { name: 'Londres 🇬🇧', safety: 75, quality: 80, jobs: 85, cost: 35, education: 95, total: 74 },
          { name: 'São Paulo 🇧🇷', safety: 50, quality: 60, jobs: 70, cost: 80, education: 70, total: 66 }
        ],
        categories: ['Seguridad', 'Calidad', 'Empleos', 'Costo', 'Educación']
      },
      cta: {
        title: '¿Convencido?',
        subtitle: '¡Miles de brasileños ya están allí!',
        button: '¡Quiero Estudiar en Vancouver! 🎬'
      }
    },
    fr: {
      hero: {
        title: 'Pourquoi Vancouver?',
        subtitle: 'La SEULE ville au monde avec TOUT cela:',
        badge: '🏆 Top 5 Meilleures Villes du Monde'
      },
      reasons: [
        {
          emoji: '🎬',
          title: 'Hollywood du Nord',
          stat: '400+',
          statLabel: 'productions/an',
          facts: [
            'Plus de 400 films et séries filmés/an',
            'Marvel, DC, Netflix tournent ICI',
            'Deadpool, The Flash, Arrow = Vancouver',
            '5 milliards $/an en production audiovisuelle'
          ],
          video: 'https://www.youtube.com/watch?v=Vm1s2cwHI-M',
          gradient: 'from-red-600 to-orange-600',
          proof: 'Source: Creative BC 2024'
        },
        {
          emoji: '💰',
          title: 'Salaires Très Élevés',
          stat: '$85k',
          statLabel: 'salaire moyen',
          facts: [
            'Animateur 3D: $75k-120k CAD/an',
            'Artiste VFX: $80k-140k CAD/an',
            'Monteur: $70k-110k CAD/an',
            'Meilleur rapport qualité-prix au monde'
          ],
          video: 'https://www.youtube.com/watch?v=y3uhoRpQPYY',
          gradient: 'from-green-600 to-emerald-600',
          proof: 'Source: Glassdoor Canada 2025'
        },
        {
          emoji: '🏆',
          title: '95% Employabilité',
          stat: '95%',
          statLabel: 'emploi en 6 mois',
          facts: [
            'VanArts: 95% employés en 6 mois',
            'VFS: 90% employés en 1 an',
            'Co-op rémunéré pendant le cours',
            'Réseau: 500+ entreprises partenaires'
          ],
          video: 'https://www.youtube.com/watch?v=Vm1s2cwHI-M',
          gradient: 'from-purple-600 to-pink-600',
          proof: 'Source: VanArts & VFS 2024'
        },
        {
          emoji: '🛡️',
          title: 'Ville Sûre',
          stat: '#3',
          statLabel: 'ville + sûre',
          facts: [
            '3ème ville PLUS SÛRE d\'Amérique du Nord',
            'Taux de criminalité: 50% inférieur à LA/NY',
            'On peut marcher la nuit tranquillement',
            'Système de santé public'
          ],
          video: 'https://www.estudarfora.org.br/video-intercambio-no-canada-ou-europa-saiba-como-e-estudar-em-vancouver-e-em-barcelona/',
          gradient: 'from-blue-600 to-cyan-600',
          proof: 'Source: Economist Safe Cities Index'
        },
        {
          emoji: '🌈',
          title: 'Qualité de Vie',
          stat: '#5',
          statLabel: 'meilleure au monde',
          facts: [
            '5ème meilleure qualité de vie au MONDE',
            'Plage, montagne, neige, forêt = tout proche',
            'Système de transport public top',
            'Culture diverse: +100 ethnies'
          ],
          video: 'https://hellostudy.com.br/a-vida-e-boa-em-vancouver/',
          gradient: 'from-yellow-600 to-orange-600',
          proof: 'Source: Economist Quality of Life 2024'
        },
        {
          emoji: '🎓',
          title: 'Éducation Mondiale',
          stat: 'Top 10',
          statLabel: 'écoles mondiales',
          facts: [
            'VanArts: Top 10 écoles d\'animation au monde',
            'VFS: #1 en cinématographie au Canada',
            'Emily Carr: Top design university',
            'UBC: Top 40 universités mondiales'
          ],
          video: 'https://www.youtube.com/watch?v=Vm1s2cwHI-M',
          gradient: 'from-indigo-600 to-purple-600',
          proof: 'Source: QS World Rankings 2025'
        }
      ],
      comparison: {
        title: 'Vancouver vs Autres Villes',
        cities: [
          { name: 'Vancouver 🇨🇦', safety: 95, quality: 98, jobs: 95, cost: 75, education: 98, total: 92 },
          { name: 'Los Angeles 🇺🇸', safety: 60, quality: 70, jobs: 90, cost: 40, education: 85, total: 69 },
          { name: 'Londres 🇬🇧', safety: 75, quality: 80, jobs: 85, cost: 35, education: 95, total: 74 },
          { name: 'São Paulo 🇧🇷', safety: 50, quality: 60, jobs: 70, cost: 80, education: 70, total: 66 }
        ],
        categories: ['Sécurité', 'Qualité', 'Emplois', 'Coût', 'Éducation']
      },
      cta: {
        title: 'Convaincu?',
        subtitle: 'Des milliers de Brésiliens sont déjà là-bas!',
        button: 'Je Veux Étudier à Vancouver! 🎬'
      }
    }
  }

  const t = content[lang] || content.pt

  return (
    <div className="py-16 md:py-24">
      {/* Hero */}
      <div className="text-center mb-16 px-4">
        <div className="inline-block px-6 py-2 rounded-full mb-6" style={{ background: 'var(--theme-card-bg)', border: '2px solid #c92337' }}>
          <span className="text-azimut-red font-bold text-sm uppercase">
            {t.hero.badge}
          </span>
        </div>
        <h2 className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-tight" style={{ color: 'var(--theme-text)' }}>
          {t.hero.title}
        </h2>
        <p className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--theme-text-secondary)' }}>
          {t.hero.subtitle}
        </p>
      </div>

      {/* Reasons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8 max-w-7xl mx-auto mb-20">
        {t.reasons.map((reason: any, i: number) => (
          <div
            key={i}
            className={`
              group relative overflow-hidden rounded-3xl p-8
              bg-gradient-to-br ${reason.gradient}
              transform hover:scale-105 transition-all duration-300
              shadow-2xl hover:shadow-3xl
              cursor-pointer
            `}
            onClick={() => setExpandedCard(expandedCard === i ? null : i)}
          >
            {/* Emoji + Stat */}
            <div className="text-center mb-6">
              <div className="text-7xl mb-4">{reason.emoji}</div>
              <div className="text-6xl font-black text-white mb-1">
                {reason.stat}
              </div>
              <div className="text-white/80 uppercase tracking-wider text-sm font-bold">
                {reason.statLabel}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-black text-white mb-4 text-center uppercase">
              {reason.title}
            </h3>

            {/* Facts */}
            <ul className="space-y-2 mb-4">
              {reason.facts.map((fact: string, j: number) => (
                <li key={j} className="text-white/90 text-sm flex items-start gap-2">
                  <span className="flex-shrink-0 text-lg">✓</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>

            {/* Proof */}
            <div className="text-white/60 text-xs text-center">
              {reason.proof}
            </div>

            {/* Play Button */}
            {reason.video && (
              <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-2xl">▶️</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Comparison Chart */}
      <div className="max-w-5xl mx-auto px-4 mb-20">
        <h3 className="text-4xl md:text-5xl font-black text-white text-center mb-12 uppercase">
          {t.comparison.title}
        </h3>
        
        <div className="space-y-6">
          {t.comparison.cities.map((city: any, i: number) => (
            <div 
              key={i} 
              className={`comparison-card rounded-2xl p-6 ${
                i === 0 ? 'comparison-card-first' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="comparison-card-title text-2xl font-black">{city.name}</h4>
                <div className="comparison-card-score text-3xl font-black">{city.total}%</div>
              </div>
              <div className="h-4 bg-white/10 rounded-full overflow-hidden comparison-card-bar-bg">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    i === 0 ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                  style={{ width: `${city.total}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center px-4">
        <h3 className="text-4xl md:text-5xl font-black text-white mb-3 uppercase">
          {t.cta.title}
        </h3>
        <p className="text-2xl text-white/70 mb-8">
          {t.cta.subtitle}
        </p>
        <button className="px-12 py-6 bg-azimut-red hover:bg-azimut-red/90 text-white text-2xl font-black uppercase rounded-full transform hover:scale-105 transition-all shadow-2xl shadow-azimut-red/50">
          {t.cta.button}
        </button>
      </div>
    </div>
  )
}

export default WhyVancouverConvincing
