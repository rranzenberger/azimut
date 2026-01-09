import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { type Lang } from '../i18n'
import VancouverInterestForm from '../components/VancouverInterestForm'
import { VideoPlayerEnhanced } from '../components/VideoPlayerEnhanced'
import { VideoCard } from '../components/VideoCard'

interface VancouverProps {
  lang: Lang
}

const Vancouver: React.FC<VancouverProps> = ({ lang }) => {
  const [showCalculator, setShowCalculator] = useState(false)

  const content = {
    pt: {
      title: 'Estudar em Vancouver',
      subtitle: 'Sua carreira internacional começa aqui',
      heroDescription: 'Forme-se em 1 ano nas melhores escolas de mídia do Canadá, com 90%+ de empregabilidade e possibilidade de residência permanente. Agente oficial VFS/VanArts para alunos de todo o mundo.',
      ctaHero: 'Calcule seu investimento',
      
      whyTitle: 'Por que Vancouver?',
      whyItems: [
        {
          icon: '🎬',
          title: 'Hub Global de Mídia',
          description: 'Vancouver é conhecida como "Hollywood do Norte". Estúdios como Disney, Sony, ILM, EA e Ubisoft têm bases aqui.'
        },
        {
          icon: '🏆',
          title: 'Qualidade de Vida Top 3 Mundial',
          description: 'Vancouver é constantemente ranqueada entre as 3 melhores cidades do mundo para se viver. Segura, multicultural e com natureza deslumbrante.'
        },
        {
          icon: '🍁',
          title: 'Pathway Residência Permanente',
          description: 'Após estudar, você pode trabalhar legalmente no Canadá e aplicar para residência permanente.'
        },
        {
          icon: '💼',
          title: '40.000+ Vagas em Mídia Digital',
          description: 'Mercado aquecido com alta demanda por profissionais qualificados em VFX, Animation, Games e Design.'
        }
      ],

      compareTitle: 'Universidade Tradicional vs Vancouver',
      compareDescription: 'Compare estudar em uma universidade tradicional (4 anos) versus as escolas especializadas de Vancouver (1 ano intensivo).',
      
      schoolsTitle: 'VFS e VanArts: As Melhores Escolas',
      
      vfsTab: 'Vancouver Film School',
      vfsDescription: 'Rank #1 no Canadá em media arts. Programas intensivos de 1 ano com foco em empregabilidade.',
      vfsPrograms: [
        '3D Animation & Visual Effects',
        'Game Design',
        'Film Production',
        'Acting for Film & TV',
        'Sound Design for Visual Media',
        'Programming for Games, Web & Mobile',
        'Digital Design',
        'Writing for Film, TV & Games'
      ],
      vfsStats: [
        { label: 'Empregabilidade', value: '92%' },
        { label: 'Graduados', value: '40.000+' },
        { label: 'Parceiros Indústria', value: '500+' }
      ],

      vanartsTab: 'VanArts',
      vanartsDescription: 'Escola focada em Animation, VFX e Game Art. Mais acessível financeiramente, mantendo alta qualidade.',
      vanartsPrograms: [
        '2D/3D Character Animation',
        'Game Art & Design',
        'Visual Effects for Film & TV',
        'Acting for Film & Television',
        'Professional Photography',
        'Web Development & Digital Design'
      ],
      vanartsStats: [
        { label: 'Empregabilidade', value: '90%+' },
        { label: 'Anos de Operação', value: '29+' },
        { label: 'Networking Alunos', value: 'Global' }
      ],

      testimonialsTitle: 'Brasileiros em Vancouver',
      testimonials: [
        {
          name: 'Carina Lotecki',
          role: 'CFX Artist',
          company: 'Walt Disney Animation Studios',
          photo: '/testimonials/carina.jpg',
          quote: 'Apenas 1 mês após me formar na VFS, consegui meu primeiro emprego na Cinesite, depois Digital Domain. Hoje trabalho na Disney Vancouver no Moana 2!'
        },
        {
          name: 'Samuel Rico',
          role: 'Crowds Supervising Animator',
          company: 'Sony Pictures Imageworks',
          photo: '/testimonials/samuel.jpg',
          quote: 'O ano na VanArts foi um sonho realizado. Muito trabalho, mas totalmente valeu. Hoje trabalho na Sony Pictures em Vancouver!'
        },
        {
          name: 'Raja Ghosh',
          role: 'Sr. Environment Artist',
          company: 'Remedy Entertainment',
          photo: '/testimonials/raja.jpg',
          quote: 'Escolhi VanArts pelo currículo detalhado e pipeline profissional. Hoje trabalho na Remedy na Finlândia, entreguei Control e Alan Wake 2!'
        }
      ],

      azimutHelpTitle: 'Como a Azimut Ajuda',
      azimutHelpDescription: 'Orientação completa do início ao fim. Você não faz nada sozinho.',
      azimutSteps: [
        {
          number: '1',
          title: 'Orientação Gratuita',
          description: '1 hora de consulta para entender seu perfil, objetivos e recomendar o melhor caminho.'
        },
        {
          number: '2',
          title: 'Preparação Pré-VFS/VanArts',
          description: 'Curso preparatório no Brasil (opcional) para construir portfolio e melhorar inglês. Taxa de aprovação: 85%.'
        },
        {
          number: '3',
          title: 'Application Completo',
          description: 'Revisão de portfolio, carta de apresentação, application e preparação para entrevista.'
        },
        {
          number: '4',
          title: 'Visto & Logística',
          description: 'Parceria com empresa de vistos. Documentação completa, checklist e suporte durante todo processo.'
        },
        {
          number: '5',
          title: 'Apoio em Vancouver',
          description: 'Indicação de moradia, grupo de brasileiros, networking local e suporte nos primeiros meses.'
        }
      ],
      azimutCost: 'Nosso serviço: GRATUITO*',
      azimutCostNote: '*Somos agentes oficiais da VFS/VanArts. Ganhamos comissão das escolas, você não paga nada extra!',

      calculatorTitle: 'Calculadora de Investimento',
      calculatorDescription: 'Simule quanto custará estudar em Vancouver (incluindo tuition, moradia, alimentação e vida).',

      faqTitle: 'Perguntas Frequentes',
      faqs: [
        {
          question: 'Preciso saber inglês fluente?',
          answer: 'Intermediário a avançado é suficiente. VFS e VanArts exigem TOEFL ou IELTS. A Azimut pode te ajudar a se preparar.'
        },
        {
          question: 'Preciso ter portfolio?',
          answer: 'Sim, mas não precisa ser completo. A Azimut oferece curso preparatório para construir um portfolio forte.'
        },
        {
          question: 'Quanto tempo leva o processo?',
          answer: 'De 6 a 12 meses desde a decisão até começar as aulas. Preparação (2-4 meses) + Application (2-3 meses) + Visto (3-4 meses).'
        },
        {
          question: 'Posso trabalhar enquanto estudo?',
          answer: 'Sim! Study permit permite trabalhar 20h/semana durante aulas e 40h/semana nas férias. Salário mínimo: CAD $17/h.'
        },
        {
          question: 'E depois da formatura?',
          answer: 'Você recebe PGWP (Post-Graduation Work Permit) para trabalhar legalmente no Canadá. Após 1 ano de experiência, pode aplicar para residência permanente.'
        },
        {
          question: 'Qual escola é melhor: VFS ou VanArts?',
          answer: 'Depende do seu perfil! VFS é mais intensivo e caro, VanArts é mais acessível. Na consulta gratuita, analisamos qual é melhor para você.'
        },
        {
          question: 'A Azimut cobra algo?',
          answer: 'NÃO! Ganhamos comissão diretamente da VFS/VanArts. Você não paga nada a mais. Nosso interesse é que você seja aceito e tenha sucesso.'
        },
        {
          question: 'Tem limite de idade?',
          answer: 'Não! Temos alunos de 18 a 40+ anos. O importante é ter vontade de aprender e se dedicar.'
        }
      ],

      formTitle: 'Quero Saber Mais',
      formDescription: 'Preencha o formulário e agende uma consulta gratuita de 1 hora. Vamos analisar seu perfil e criar um plano personalizado.',

      ctaFinal: 'Começar Minha Jornada'
    },
    en: {
      title: 'Study in Vancouver',
      subtitle: 'A smart alternative to traditional university',
      // ... (adicionar traduções EN, ES, FR depois)
    },
    es: {
      title: 'Estudiar en Vancouver',
      subtitle: 'Una alternativa inteligente a la universidad tradicional',
      // ...
    },
    fr: {
      title: 'Étudier à Vancouver',
      subtitle: 'Une alternative intelligente à l\'université traditionnelle',
      // ...
    }
  }

  const t = content[lang] || content.pt

  return (
    <>
      <Helmet>
        <title>{t.title} | Azimut Academy</title>
        <meta name="description" content={t.subtitle} />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1559511260-66a654ae982a?w=1600)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-block px-4 py-2 bg-azimut-red/20 border border-azimut-red/40 rounded-full mb-6">
              <span className="text-azimut-red text-sm font-semibold uppercase tracking-wider">
                🇨🇦 Agente Educacional Oficial
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-handel uppercase tracking-wider text-white mb-6 leading-tight">
              {t.title}
            </h1>

            <p className="text-2xl md:text-3xl text-white/90 mb-4 font-light">
              {t.subtitle}
            </p>

            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-3xl mx-auto leading-relaxed">
              {t.heroDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowCalculator(true)}
                className="px-8 py-4 bg-azimut-red hover:bg-azimut-red/90 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-azimut-red/50"
              >
                {t.ctaHero} →
              </button>
              
              <a
                href="#form"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg transition-all duration-300 border border-white/20"
              >
                Consulta Gratuita
              </a>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: '90%+', label: 'Empregabilidade' },
                { value: '1 ano', label: 'Duração' },
                { value: '40k+', label: 'Vagas em Mídia' },
                { value: '🍁', label: 'Residência PR' }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-azimut-red mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/60 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
            <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* Comparative Table */}
        <section className="py-20 bg-gradient-to-b from-black via-[#0a0e18] to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider text-white mb-4">
                {t.compareTitle}
              </h2>
              <p className="text-lg text-white/70 max-w-3xl mx-auto">
                {t.compareDescription}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-azimut-red">
                    <th className="text-left p-4 text-white/70 font-semibold uppercase text-sm"></th>
                    <th className="p-4 text-white font-semibold text-lg">Univ. Tradicional</th>
                    <th className="p-4 text-azimut-red font-semibold text-lg">VanArts 🍁</th>
                    <th className="p-4 text-white font-semibold text-lg">VFS 🍁</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  <tr className="border-b border-white/10">
                    <td className="text-left p-4 text-white/70 font-medium">Custo Total (aprox.)</td>
                    <td className="p-4 text-white">US$ 40-80k</td>
                    <td className="p-4 text-azimut-red font-bold text-xl">US$ 35k ✅</td>
                    <td className="p-4 text-white">US$ 55k</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="text-left p-4 text-white/70 font-medium">Duração</td>
                    <td className="p-4 text-white">4 anos</td>
                    <td className="p-4 text-azimut-red font-bold">1 ano ✅</td>
                    <td className="p-4 text-white">1 ano ✅</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="text-left p-4 text-white/70 font-medium">Empregabilidade</td>
                    <td className="p-4 text-white">50-60%</td>
                    <td className="p-4 text-azimut-red font-bold">90%+ ✅</td>
                    <td className="p-4 text-white">92% ✅</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="text-left p-4 text-white/70 font-medium">Salário Inicial</td>
                    <td className="p-4 text-white">US$ 2-4k/mês</td>
                    <td className="p-4 text-azimut-red font-bold">CAD $3.5-5k/mês ✅</td>
                    <td className="p-4 text-white">CAD $4-6k/mês ✅</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="text-left p-4 text-white/70 font-medium">Mercado</td>
                    <td className="p-4 text-white">Regional</td>
                    <td className="p-4 text-azimut-red font-bold">Global ✅</td>
                    <td className="p-4 text-white">Global ✅</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="text-left p-4 text-white/70 font-medium">Idioma</td>
                    <td className="p-4 text-white">Local</td>
                    <td className="p-4 text-azimut-red font-bold">English ✅</td>
                    <td className="p-4 text-white">English ✅</td>
                  </tr>
                  <tr>
                    <td className="text-left p-4 text-white/70 font-medium">Residência PR</td>
                    <td className="p-4 text-white">Não</td>
                    <td className="p-4 text-azimut-red font-bold">Sim 🍁 ✅</td>
                    <td className="p-4 text-white">Sim 🍁 ✅</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 p-6 bg-azimut-red/10 border border-azimut-red/30 rounded-lg">
              <p className="text-white/90 text-center text-lg">
                <strong className="text-azimut-red">VEREDITO:</strong> VanArts/VFS são <strong>MAIS FOCADAS</strong>, <strong>4x MAIS RÁPIDAS</strong>, <strong>2x MAIOR EMPREGABILIDADE</strong> e com <strong>MERCADO GLOBAL</strong> + <strong>PATHWAY PR 🍁</strong>! 🚀
              </p>
            </div>
          </div>
        </section>

        {/* Why Vancouver */}
        <section className="py-20 bg-gradient-to-b from-black to-[#0a0e18]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider text-white mb-4">
                {t.whyTitle}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {t.whyItems.map((item, i) => (
                <div
                  key={i}
                  className="p-6 card-adaptive rounded-xl border border-white/10 hover:border-azimut-red/50 transition-all duration-300"
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Schools Section - VFS & VanArts */}
        <section className="py-20 bg-gradient-to-b from-[#0a0e18] to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider text-white mb-4">
                {t.schoolsTitle}
              </h2>
            </div>

            {/* VFS */}
            <div className="mb-16 p-8 card-adaptive rounded-2xl border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl">🎬</div>
                <div>
                  <h3 className="text-3xl font-handel uppercase text-azimut-red">
                    Vancouver Film School (VFS)
                  </h3>
                  <p className="text-white/70">{t.vfsDescription}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                {t.vfsStats.map((stat, i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-lg text-center">
                    <div className="text-3xl font-bold text-azimut-red mb-1">{stat.value}</div>
                    <div className="text-sm text-white/60">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-3 mb-6">
                {t.vfsPrograms.map((program, i) => (
                  <div key={i} className="flex items-center gap-2 text-white/80">
                    <span className="text-azimut-red">•</span>
                    {program}
                  </div>
                ))}
              </div>

              <a
                href="https://vfs.edu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-azimut-red hover:text-azimut-red/80 transition-colors"
              >
                Ver site oficial da VFS →
              </a>
            </div>

            {/* VanArts */}
            <div className="p-8 card-adaptive rounded-2xl border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl">🎨</div>
                <div>
                  <h3 className="text-3xl font-handel uppercase text-azimut-red">
                    VanArts
                  </h3>
                  <p className="text-white/70">{t.vanartsDescription}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                {t.vanartsStats.map((stat, i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-lg text-center">
                    <div className="text-3xl font-bold text-azimut-red mb-1">{stat.value}</div>
                    <div className="text-sm text-white/60">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-3 mb-6">
                {t.vanartsPrograms.map((program, i) => (
                  <div key={i} className="flex items-center gap-2 text-white/80">
                    <span className="text-azimut-red">•</span>
                    {program}
                  </div>
                ))}
              </div>

              <a
                href="https://www.vanarts.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-azimut-red hover:text-azimut-red/80 transition-colors"
              >
                Ver site oficial da VanArts →
              </a>

              {/* VanArts Video */}
              <div className="mt-8">
                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                    <span className="text-2xl">🎬</span>
                    Conheça a VanArts por dentro
                  </h4>
                  <p className="text-white/70 text-sm">
                    Vídeo oficial da Vancouver Institute of Media Arts
                  </p>
                </div>
                <VideoPlayerEnhanced
                  sources="https://www.youtube.com/watch?v=Vm1s2cwHI-M"
                  mode="default"
                  className="w-full rounded-xl overflow-hidden shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gradient-to-b from-black to-[#0a0e18]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider text-white mb-4">
                {t.testimonialsTitle}
              </h2>
              <p className="text-lg text-white/70 max-w-3xl mx-auto mb-8">
                Conheça a história de brasileiros que transformaram suas carreiras estudando em Vancouver
              </p>
            </div>

            {/* Video Depoimentos Brasileiros */}
            <div className="mb-16 max-w-4xl mx-auto">
              <VideoCard
                videoUrl="https://www.youtube.com/watch?v=y3uhoRpQPYY"
                title="Depoimentos de Brasileiros na VanArts"
                description="Histórias reais de alunos brasileiros que estudaram na VanArts e conquistaram suas carreiras internacionais"
                category="Depoimentos"
                featured
                badge="🇧🇷 Brasileiros"
                badgeColor="azimut-red"
              />
            </div>

            {/* Depoimentos em texto */}
            <div className="grid md:grid-cols-3 gap-8">
              {t.testimonials.map((testimonial, i) => (
                <div
                  key={i}
                  className="p-6 card-adaptive rounded-xl border border-white/10"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-azimut-red/20 flex items-center justify-center text-2xl">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-white/70">{testimonial.role}</div>
                      <div className="text-sm text-azimut-red">{testimonial.company}</div>
                    </div>
                  </div>
                  <p className="text-white/80 italic leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How Azimut Helps */}
        <section className="py-20 bg-gradient-to-b from-[#0a0e18] to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider text-white mb-4">
                {t.azimutHelpTitle}
              </h2>
              <p className="text-lg text-white/70 max-w-3xl mx-auto">
                {t.azimutHelpDescription}
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-6">
              {t.azimutSteps.map((step, i) => (
                <div
                  key={i}
                  className="p-6 card-adaptive rounded-xl border border-white/10 hover:border-azimut-red/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-azimut-red/20 flex items-center justify-center text-2xl font-bold text-azimut-red mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-azimut-red/10 border border-azimut-red/30 rounded-lg text-center">
              <p className="text-xl font-semibold text-white mb-2">
                {t.azimutCost}
              </p>
              <p className="text-white/70">
                {t.azimutCostNote}
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-gradient-to-b from-black to-[#0a0e18]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider text-white mb-4">
                {t.faqTitle}
              </h2>
            </div>

            <div className="space-y-4">
              {t.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group p-6 card-adaptive rounded-lg border border-white/10 hover:border-azimut-red/50 transition-all duration-300"
                >
                  <summary className="cursor-pointer font-semibold text-white flex justify-between items-center">
                    {faq.question}
                    <svg
                      className="w-5 h-5 transform group-open:rotate-180 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-4 text-white/70 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section id="form" className="py-20 bg-gradient-to-b from-[#0a0e18] to-black">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider text-white mb-4">
                {t.formTitle}
              </h2>
              <p className="text-lg text-white/70">
                {t.formDescription}
              </p>
            </div>

            <VancouverInterestForm lang={lang} />
          </div>
        </section>
      </div>
    </>
  )
}

export default Vancouver
