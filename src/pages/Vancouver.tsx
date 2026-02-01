import React from 'react'
import { Link } from 'react-router-dom'
import { t as translate, type Lang } from '../i18n'
import SEO from '../components/SEO'
import { VancouverPageSchema, VancouverFAQSchema } from '../components/StructuredData'
import { useUserTracking } from '../hooks/useUserTracking'
import VancouverInterestForm from '../components/VancouverInterestForm'
import { VideoPlayerEnhanced } from '../components/VideoPlayerEnhanced'
import { VideoCard } from '../components/VideoCard'
import QuizVancouver from '../components/QuizVancouver'
import AdvancedVancouverCalculator from '../components/AdvancedVancouverCalculator'
import AcademyQuickForm from '../components/AcademyQuickForm'
import WhyVancouverConvincing from '../components/WhyVancouverConvincing'
import VancouverMagazine from '../components/VancouverMagazine'
import VisualSchoolQuiz from '../components/VisualSchoolQuiz'
import CanadaMapleLeaf from '../components/CanadaMapleLeaf'
import HeroImage from '../components/HeroImageCarousel'
import { useTimeBasedImage } from '../hooks/useTimeBasedImage'
import { useBackofficeContent } from '../hooks/useBackofficeContent'
import { usePageSEO } from '../hooks/usePageSEO'
import { useTheme } from '../contexts/ThemeContext'
import AcademySubNav from '../components/AcademySubNav'
import VancouverContentExpanded from '../components/VancouverContentExpanded'
import VancouverVideoSchemas from '../components/VancouverVideoSchemas'

interface VancouverProps {
  lang: Lang
}

const Vancouver: React.FC<VancouverProps> = ({ lang }) => {
  // REMOVIDO: useUserTracking já é chamado no Layout.tsx
  // useUserTracking();
  const { theme } = useTheme()
  
  // Sistema inteligente de imagens baseado na hora LOCAL do usuário
  const { image, vancouverTime } = useTimeBasedImage()
  
  // Buscar conteúdo do backoffice (mobile/desktop)
  const { page: backofficePage } = useBackofficeContent('vancouver', lang)
  
  // Função para scroll suave até a calculadora com efeito de destaque
  const scrollToCalculator = () => {
    const calculatorSection = document.getElementById('calculator')
    if (calculatorSection) {
      // Scroll suave
      calculatorSection.scrollIntoView({ behavior: 'smooth', block: 'center' })
      
      // Adicionar efeito de destaque
      setTimeout(() => {
        calculatorSection.classList.add('highlight-pulse')
        
        // Remover efeito após 3 segundos
        setTimeout(() => {
          calculatorSection.classList.remove('highlight-pulse')
        }, 3000)
      }, 800) // Aguarda o scroll terminar
    }
  }

  const content = {
    pt: {
      title: 'Estudar em Vancouver',
      subtitle: 'Sua carreira internacional começa aqui',
      heroDescription: '1 ano. 90%+ empregabilidade. Residência permanente possível.',
      heroDescriptionFull: 'Forme-se em 1 ano nas melhores escolas de mídia do Canadá, com 90%+ de empregabilidade e possibilidade de residência permanente. Agente oficial VFS/VanArts para alunos de todo o mundo.',
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
          icon: '🇨🇦',
          title: 'Possibilidade de Residência Permanente',
          description: 'Após estudar, você pode trabalhar legalmente no Canadá e aplicar para residência permanente (sujeito a requisitos do governo canadense).'
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
          answer: 'Você recebe PGWP (Post-Graduation Work Permit) para trabalhar legalmente no Canadá. Após 1 ano de experiência, pode aplicar para residência permanente (sujeito aos requisitos e critérios de elegibilidade do governo canadense).'
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
      subtitle: 'Your international career starts here',
      heroDescription: '1 year. 90%+ employability. Permanent residence possible.',
      heroDescriptionFull: 'Graduate in 1 year at Canada\'s best media schools, with 90%+ employability and possibility of permanent residence. Official VFS/VanArts agent for students worldwide.',
      ctaHero: 'Calculate your investment',
      whyTitle: 'Why Vancouver?',
      whyItems: [
        { icon: '🎬', title: 'Global Media Hub', description: 'Vancouver is known as "Hollywood North". Studios like Disney, Sony, ILM, EA and Ubisoft have bases here.' },
        { icon: '🏆', title: 'Top 3 World Quality of Life', description: 'Vancouver is constantly ranked among the 3 best cities in the world to live. Safe, multicultural and with stunning nature.' },
        { icon: '🇨🇦', title: 'Permanent Residence Possibility', description: 'After studying, you can work legally in Canada and apply for permanent residence (subject to Canadian government requirements).' },
        { icon: '💼', title: '40,000+ Digital Media Vacancies', description: 'Hot market with high demand for qualified professionals in VFX, Animation, Games and Design.' }
      ],
      compareTitle: 'Traditional University vs Vancouver',
      compareDescription: 'Compare studying at a traditional university (4 years) versus Vancouver\'s specialized schools (1 intensive year).',
      schoolsTitle: 'VFS and VanArts: The Best Schools',
      vfsTab: 'Vancouver Film School',
      vfsDescription: 'Rank #1 in Canada in media arts. 1-year intensive programs focused on employability.',
      vfsPrograms: ['3D Animation & Visual Effects', 'Game Design', 'Film Production', 'Acting for Film & TV', 'Sound Design for Visual Media', 'Programming for Games, Web & Mobile', 'Digital Design', 'Writing for Film, TV & Games'],
      vfsStats: [{ label: 'Employability', value: '92%' }, { label: 'Graduates', value: '40,000+' }, { label: 'Industry Partners', value: '500+' }],
      vanartsTab: 'VanArts',
      vanartsDescription: 'School focused on Animation, VFX and Game Art. More financially accessible, maintaining high quality.',
      vanartsPrograms: ['2D/3D Character Animation', 'Game Art & Design', 'Visual Effects for Film & TV', 'Acting for Film & Television', 'Professional Photography', 'Web Development & Digital Design'],
      vanartsStats: [{ label: 'Employability', value: '90%+' }, { label: 'Years of Operation', value: '29+' }, { label: 'Student Networking', value: 'Global' }],
      testimonialsTitle: 'Brazilians in Vancouver',
      testimonials: [
        { name: 'Carina Lotecki', role: 'CFX Artist', company: 'Walt Disney Animation Studios', photo: '/testimonials/carina.jpg', quote: 'Just 1 month after graduating from VFS, I got my first job at Cinesite, then Digital Domain. Today I work at Disney Vancouver on Moana 2!' },
        { name: 'Samuel Rico', role: 'Crowds Supervising Animator', company: 'Sony Pictures Imageworks', photo: '/testimonials/samuel.jpg', quote: 'The year at VanArts was a dream come true. A lot of work, but totally worth it. Today I work at Sony Pictures in Vancouver!' },
        { name: 'Raja Ghosh', role: 'Sr. Environment Artist', company: 'Remedy Entertainment', photo: '/testimonials/raja.jpg', quote: 'I chose VanArts for the detailed curriculum and professional pipeline. Today I work at Remedy in Finland, delivered Control and Alan Wake 2!' }
      ],
      azimutHelpTitle: 'How Azimut Helps',
      azimutHelpDescription: 'Complete guidance from start to finish. You don\'t do anything alone.',
      azimutSteps: [
        { number: '1', title: 'Free Guidance', description: '1 hour consultation to understand your profile, goals and recommend the best path.' },
        { number: '2', title: 'Pre-VFS/VanArts Preparation', description: 'Preparatory course in Brazil (optional) to build portfolio and improve English. Approval rate: 85%.' },
        { number: '3', title: 'Complete Application', description: 'Portfolio review, cover letter, application and interview preparation.' },
        { number: '4', title: 'Visa & Logistics', description: 'Partnership with visa company. Complete documentation, checklist and support throughout the process.' },
        { number: '5', title: 'Support in Vancouver', description: 'Housing referral, Brazilian group, local networking and support in the first months.' }
      ],
      azimutCost: 'Our service: FREE*',
      azimutCostNote: '*We are official VFS/VanArts agents. We earn commission from schools, you pay nothing extra!',
      calculatorTitle: 'Investment Calculator',
      calculatorDescription: 'Simulate how much it will cost to study in Vancouver (including tuition, housing, food and life).',
      faqTitle: 'Frequently Asked Questions',
      faqs: [
        { question: 'Do I need to know fluent English?', answer: 'Intermediate to advanced is enough. VFS and VanArts require TOEFL or IELTS. Azimut can help you prepare.' },
        { question: 'Do I need to have a portfolio?', answer: 'Yes, but it doesn\'t need to be complete. Azimut offers preparatory course to build a strong portfolio.' },
        { question: 'How long does the process take?', answer: 'From 6 to 12 months from decision to starting classes. Preparation (2-4 months) + Application (2-3 months) + Visa (3-4 months).' },
        { question: 'Can I work while studying?', answer: 'Yes! Study permit allows working 20h/week during classes and 40h/week on vacation. Minimum wage: CAD $17/h.' },
        { question: 'And after graduation?', answer: 'You receive PGWP (Post-Graduation Work Permit) to work legally in Canada. After 1 year of experience, you may be eligible to apply for permanent residence (subject to government requirements and eligibility criteria).' },
        { question: 'Which school is better: VFS or VanArts?', answer: 'It depends on your profile! VFS is more intensive and expensive, VanArts is more accessible. In the free consultation, we analyze which is better for you.' },
        { question: 'Does Azimut charge anything?', answer: 'NO! We earn commission directly from VFS/VanArts. You pay nothing extra. Our interest is that you are accepted and succeed.' },
        { question: 'Is there an age limit?', answer: 'No! We have students from 18 to 40+ years. The important thing is to have the desire to learn and dedicate yourself.' }
      ],
      formTitle: 'I Want to Know More',
      formDescription: 'Fill out the form and schedule a free 1-hour consultation. We will analyze your profile and create a personalized plan.',
      ctaFinal: 'Start My Journey'
    },
    es: {
      title: 'Estudiar en Vancouver',
      subtitle: 'Tu carrera internacional comienza aquí',
      heroDescription: '1 año. 90%+ empleabilidad. Residencia permanente posible.',
      heroDescriptionFull: 'Graduarse en 1 año en las mejores escuelas de medios de Canadá, con más del 90% de empleabilidad y posibilidad de residencia permanente. Agente oficial VFS/VanArts para estudiantes de todo el mundo.',
      ctaHero: 'Calcular mi inversión',
      whyTitle: '¿Por qué Vancouver?',
      whyItems: [
        { icon: '🎬', title: 'Hub Global de Medios', description: 'Vancouver es conocida como "Hollywood del Norte". Estudios como Disney, Sony, ILM, EA y Ubisoft tienen bases aquí.' },
        { icon: '🏆', title: 'Calidad de Vida Top 3 Mundial', description: 'Vancouver está constantemente clasificada entre las 3 mejores ciudades del mundo para vivir. Segura, multicultural y con naturaleza impresionante.' },
        { icon: '🇨🇦', title: 'Camino a Residencia Permanente', description: 'Después de estudiar, puedes trabajar legalmente en Canadá y solicitar residencia permanente.' },
        { icon: '💼', title: '40.000+ Vacantes en Medios Digitales', description: 'Mercado activo con alta demanda de profesionales calificados en VFX, Animación, Juegos y Diseño.' }
      ],
      compareTitle: 'Universidad Tradicional vs Vancouver',
      compareDescription: 'Compara estudiar en una universidad tradicional (4 años) versus las escuelas especializadas de Vancouver (1 año intensivo).',
      schoolsTitle: 'VFS y VanArts: Las Mejores Escuelas',
      vfsTab: 'Vancouver Film School',
      vfsDescription: 'Rank #1 en Canadá en artes mediáticas. Programas intensivos de 1 año con enfoque en empleabilidad.',
      vfsPrograms: ['Animación 3D y Efectos Visuales', 'Diseño de Juegos', 'Producción Cinematográfica', 'Actuación para Cine y TV', 'Diseño de Sonido para Medios Visuales', 'Programación para Juegos, Web y Móvil', 'Diseño Digital', 'Escritura para Cine, TV y Juegos'],
      vfsStats: [{ label: 'Empleabilidad', value: '92%' }, { label: 'Graduados', value: '40.000+' }, { label: 'Socios de Industria', value: '500+' }],
      vanartsTab: 'VanArts',
      vanartsDescription: 'Escuela enfocada en Animación, VFX y Arte de Juegos. Más accesible financieramente, manteniendo alta calidad.',
      vanartsPrograms: ['Animación de Personajes 2D/3D', 'Arte y Diseño de Juegos', 'Efectos Visuales para Cine y TV', 'Actuación para Cine y Televisión', 'Fotografía Profesional', 'Desarrollo Web y Diseño Digital'],
      vanartsStats: [{ label: 'Empleabilidad', value: '90%+' }, { label: 'Años de Operación', value: '29+' }, { label: 'Networking Estudiantes', value: 'Global' }],
      testimonialsTitle: 'Brasileños en Vancouver',
      testimonials: [
        { name: 'Carina Lotecki', role: 'CFX Artist', company: 'Walt Disney Animation Studios', photo: '/testimonials/carina.jpg', quote: 'Solo 1 mes después de graduarme de VFS, conseguí mi primer trabajo en Cinesite, luego Digital Domain. ¡Hoy trabajo en Disney Vancouver en Moana 2!' },
        { name: 'Samuel Rico', role: 'Crowds Supervising Animator', company: 'Sony Pictures Imageworks', photo: '/testimonials/samuel.jpg', quote: 'El año en VanArts fue un sueño hecho realidad. Mucho trabajo, pero totalmente valió la pena. ¡Hoy trabajo en Sony Pictures en Vancouver!' },
        { name: 'Raja Ghosh', role: 'Sr. Environment Artist', company: 'Remedy Entertainment', photo: '/testimonials/raja.jpg', quote: 'Elegí VanArts por el currículo detallado y pipeline profesional. Hoy trabajo en Remedy en Finlandia, ¡entregué Control y Alan Wake 2!' }
      ],
      azimutHelpTitle: 'Cómo Ayuda Azimut',
      azimutHelpDescription: 'Orientación completa de principio a fin. No haces nada solo.',
      azimutSteps: [
        { number: '1', title: 'Orientación Gratuita', description: '1 hora de consulta para entender tu perfil, objetivos y recomendar el mejor camino.' },
        { number: '2', title: 'Preparación Pre-VFS/VanArts', description: 'Curso preparatorio en Brasil (opcional) para construir portafolio y mejorar inglés. Tasa de aprobación: 85%.' },
        { number: '3', title: 'Application Completo', description: 'Revisión de portafolio, carta de presentación, solicitud y preparación para entrevista.' },
        { number: '4', title: 'Visa y Logística', description: 'Asociación con empresa de visas. Documentación completa, checklist y soporte durante todo el proceso.' },
        { number: '5', title: 'Apoyo en Vancouver', description: 'Indicación de vivienda, grupo de brasileños, networking local y soporte en los primeros meses.' }
      ],
      azimutCost: 'Nuestro servicio: GRATUITO*',
      azimutCostNote: '*Somos agentes oficiales de VFS/VanArts. Ganamos comisión de las escuelas, ¡tú no pagas nada extra!',
      calculatorTitle: 'Calculadora de Inversión',
      calculatorDescription: 'Simula cuánto costará estudiar en Vancouver (incluyendo matrícula, vivienda, alimentación y vida).',
      faqTitle: 'Preguntas Frecuentes',
      faqs: [
        { question: '¿Necesito saber inglés fluido?', answer: 'Intermedio a avanzado es suficiente. VFS y VanArts requieren TOEFL o IELTS. Azimut puede ayudarte a prepararte.' },
        { question: '¿Necesito tener portafolio?', answer: 'Sí, pero no necesita estar completo. Azimut ofrece curso preparatorio para construir un portafolio sólido.' },
        { question: '¿Cuánto tiempo tarda el proceso?', answer: 'De 6 a 12 meses desde la decisión hasta comenzar las clases. Preparación (2-4 meses) + Solicitud (2-3 meses) + Visa (3-4 meses).' },
        { question: '¿Puedo trabajar mientras estudio?', answer: 'Sí! El permiso de estudio permite trabajar 20h/semana durante clases y 40h/semana en vacaciones. Salario mínimo: CAD $17/h.' },
        { question: '¿Y después de graduarme?', answer: 'Recibes PGWP (Post-Graduation Work Permit) para trabajar legalmente en Canadá. Después de 1 año de experiencia, puedes solicitar residencia permanente (sujeto a requisitos y criterios de elegibilidad del gobierno canadiense).' },
        { question: '¿Qué escuela es mejor: VFS o VanArts?', answer: '¡Depende de tu perfil! VFS es más intensivo y caro, VanArts es más accesible. En la consulta gratuita, analizamos cuál es mejor para ti.' },
        { question: '¿Azimut cobra algo?', answer: '¡NO! Ganamos comisión directamente de VFS/VanArts. No pagas nada extra. Nuestro interés es que seas aceptado y tengas éxito.' },
        { question: '¿Hay límite de edad?', answer: '¡No! Tenemos estudiantes de 18 a 40+ años. Lo importante es tener ganas de aprender y dedicarse.' }
      ],
      formTitle: 'Quiero Saber Más',
      formDescription: 'Completa el formulario y agenda una consulta gratuita de 1 hora. Analizaremos tu perfil y crearemos un plan personalizado.',
      ctaFinal: 'Comenzar Mi Viaje'
    },
    fr: {
      title: 'Étudier à Vancouver',
      subtitle: 'Votre carrière internationale commence ici',
      heroDescription: '1 an. 90%+ employabilité. Résidence permanente possible.',
      heroDescriptionFull: 'Diplômez-vous en 1 an dans les meilleures écoles de médias du Canada, avec plus de 90% d\'employabilité et possibilité de résidence permanente. Agent officiel VFS/VanArts pour étudiants du monde entier.',
      ctaHero: 'Calculer mon investissement',
      whyTitle: 'Pourquoi Vancouver?',
      whyItems: [
        { icon: '🎬', title: 'Hub Mondial des Médias', description: 'Vancouver est connue comme "Hollywood du Nord". Des studios comme Disney, Sony, ILM, EA et Ubisoft ont des bases ici.' },
        { icon: '🏆', title: 'Qualité de Vie Top 3 Mondial', description: 'Vancouver est constamment classée parmi les 3 meilleures villes du monde pour vivre. Sûre, multiculturelle et avec une nature époustouflante.' },
        { icon: '🇨🇦', title: 'Chemin vers Résidence Permanente', description: 'Après vos études, vous pouvez travailler légalement au Canada et demander la résidence permanente.' },
        { icon: '💼', title: '40.000+ Postes en Médias Numériques', description: 'Marché actif avec forte demande de professionnels qualifiés en VFX, Animation, Jeux et Design.' }
      ],
      compareTitle: 'Université Traditionnelle vs Vancouver',
      compareDescription: 'Comparez étudier dans une université traditionnelle (4 ans) versus les écoles spécialisées de Vancouver (1 an intensif).',
      schoolsTitle: 'VFS et VanArts: Les Meilleures Écoles',
      vfsTab: 'Vancouver Film School',
      vfsDescription: 'Rang #1 au Canada en arts médiatiques. Programmes intensifs d\'1 an axés sur l\'employabilité.',
      vfsPrograms: ['Animation 3D et Effets Visuels', 'Conception de Jeux', 'Production Cinématographique', 'Acting pour Film et TV', 'Conception Sonore pour Médias Visuels', 'Programmation pour Jeux, Web et Mobile', 'Design Numérique', 'Écriture pour Film, TV et Jeux'],
      vfsStats: [{ label: 'Employabilité', value: '92%' }, { label: 'Diplômés', value: '40.000+' }, { label: 'Partenaires Industrie', value: '500+' }],
      vanartsTab: 'VanArts',
      vanartsDescription: 'École axée sur Animation, VFX et Art de Jeux. Plus accessible financièrement, maintenant haute qualité.',
      vanartsPrograms: ['Animation de Personnages 2D/3D', 'Art et Conception de Jeux', 'Effets Visuels pour Film et TV', 'Acting pour Film et Télévision', 'Photographie Professionnelle', 'Développement Web et Design Numérique'],
      vanartsStats: [{ label: 'Employabilité', value: '90%+' }, { label: 'Années d\'Opération', value: '29+' }, { label: 'Networking Étudiants', value: 'Global' }],
      testimonialsTitle: 'Brésiliens à Vancouver',
      testimonials: [
        { name: 'Carina Lotecki', role: 'CFX Artist', company: 'Walt Disney Animation Studios', photo: '/testimonials/carina.jpg', quote: 'Seulement 1 mois après avoir obtenu mon diplôme de VFS, j\'ai décroché mon premier emploi chez Cinesite, puis Digital Domain. Aujourd\'hui je travaille chez Disney Vancouver sur Moana 2!' },
        { name: 'Samuel Rico', role: 'Crowds Supervising Animator', company: 'Sony Pictures Imageworks', photo: '/testimonials/samuel.jpg', quote: 'L\'année à VanArts était un rêve devenu réalité. Beaucoup de travail, mais totalement valable. Aujourd\'hui je travaille chez Sony Pictures à Vancouver!' },
        { name: 'Raja Ghosh', role: 'Sr. Environment Artist', company: 'Remedy Entertainment', photo: '/testimonials/raja.jpg', quote: 'J\'ai choisi VanArts pour le programme détaillé et pipeline professionnel. Aujourd\'hui je travaille chez Remedy en Finlande, j\'ai livré Control et Alan Wake 2!' }
      ],
      azimutHelpTitle: 'Comment Azimut Aide',
      azimutHelpDescription: 'Orientation complète du début à la fin. Vous ne faites rien seul.',
      azimutSteps: [
        { number: '1', title: 'Orientation Gratuite', description: '1 heure de consultation pour comprendre votre profil, objectifs et recommander le meilleur chemin.' },
        { number: '2', title: 'Préparation Pré-VFS/VanArts', description: 'Cours préparatoire au Brésil (optionnel) pour construire portfolio et améliorer anglais. Taux d\'approbation: 85%.' },
        { number: '3', title: 'Application Complet', description: 'Révision de portfolio, lettre de présentation, application et préparation pour entretien.' },
        { number: '4', title: 'Visa et Logistique', description: 'Partenariat avec entreprise de visas. Documentation complète, checklist et support pendant tout le processus.' },
        { number: '5', title: 'Support à Vancouver', description: 'Indication de logement, groupe de brésiliens, networking local et support pendant les premiers mois.' }
      ],
      azimutCost: 'Notre service: GRATUIT*',
      azimutCostNote: '*Nous sommes agents officiels de VFS/VanArts. Nous gagnons une commission des écoles, vous ne payez rien de plus!',
      calculatorTitle: 'Calculateur d\'Investissement',
      calculatorDescription: 'Simulez combien coûtera étudier à Vancouver (incluant frais de scolarité, logement, alimentation et vie).',
      faqTitle: 'Questions Fréquentes',
      faqs: [
        { question: 'Ai-je besoin de parler anglais couramment?', answer: 'Intermédiaire à avancé est suffisant. VFS et VanArts exigent TOEFL ou IELTS. Azimut peut vous aider à vous préparer.' },
        { question: 'Ai-je besoin d\'avoir un portfolio?', answer: 'Oui, mais il n\'a pas besoin d\'être complet. Azimut offre un cours préparatoire pour construire un portfolio solide.' },
        { question: 'Combien de temps prend le processus?', answer: 'De 6 à 12 mois depuis la décision jusqu\'au début des cours. Préparation (2-4 mois) + Application (2-3 mois) + Visa (3-4 mois).' },
        { question: 'Puis-je travailler pendant mes études?', answer: 'Oui! Le permis d\'étude permet de travailler 20h/semaine pendant les cours et 40h/semaine pendant les vacances. Salaire minimum: CAD $17/h.' },
        { question: 'Et après la graduation?', answer: 'Vous recevez PGWP (Post-Graduation Work Permit) pour travailler légalement au Canada. Après 1 an d\'expérience, vous pouvez demander la résidence permanente (sous réserve des exigences et critères d\'éligibilité du gouvernement canadien).' },
        { question: 'Quelle école est meilleure: VFS ou VanArts?', answer: 'Ça dépend de votre profil! VFS est plus intensif et cher, VanArts est plus accessible. Dans la consultation gratuite, nous analysons laquelle est meilleure pour vous.' },
        { question: 'Azimut facture quelque chose?', answer: 'NON! Nous gagnons une commission directement de VFS/VanArts. Vous ne payez rien de plus. Notre intérêt est que vous soyez accepté et ayez du succès.' },
        { question: 'Y a-t-il une limite d\'âge?', answer: 'Non! Nous avons des étudiants de 18 à 40+ ans. L\'important est d\'avoir envie d\'apprendre et de se consacrer.' }
      ],
      formTitle: 'Je Veux En Savoir Plus',
      formDescription: 'Remplissez le formulaire et programmez une consultation gratuite d\'1 heure. Nous analyserons votre profil et créerons un plan personnalisé.',
      ctaFinal: 'Commencer Mon Voyage'
    }
  }

  const t = content[lang] || content.pt

  // SEO otimizado com backoffice e keywords
  const seo = usePageSEO('vancouver', lang)

  return (
    <>
      <SEO 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        url={seo.url}
        image={seo.image}
        type="website"
        locale={lang === 'pt' ? 'pt_BR' : lang === 'en' ? 'en_US' : lang === 'es' ? 'es_ES' : 'fr_FR'}
      />
      <VancouverPageSchema lang={lang} />
      <VancouverFAQSchema lang={lang} faqs={t.faqs} />
      <VancouverVideoSchemas lang={lang} />

      {/* Menu Secundário Academy */}
      <AcademySubNav lang={lang} currentPage="vancouver" />

      <div className="min-h-screen vancouver-page">
        {/* Hero Section - FALLBACK: cor de fundo caso imagem não carregue */}
        <section 
          className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20"
          style={{ backgroundColor: '#0a1628' }}
        >
          {/* Background Image Carousel - Inteligente por hora do dia */}
          <HeroImage image={image} />

          {/* Overlay escuro para melhorar legibilidade do texto - MAIS ESCURO no mobile */}
          <div 
            className="absolute inset-0 z-[5]"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.7) 100%)'
            }}
          />
          <div 
            className="absolute inset-0 z-[5] sm:hidden"
            style={{
              background: 'rgba(0,0,0,0.5)' // Overlay extra escuro APENAS no mobile
            }}
          />

          {/* Content */}
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Badges - azul navy no dark / vermelho no claro */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
              <div 
                className="inline-block px-4 py-2 rounded-full backdrop-blur-md" 
                style={{ 
                  background: theme === 'dark' ? 'rgba(30, 41, 59, 0.88)' : 'rgba(201, 35, 55, 0.85)', 
                  border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.18)' : '1px solid rgba(201, 35, 55, 0.9)' 
                }}
              >
                <span className="text-sm font-semibold uppercase tracking-wider inline-flex items-center gap-1.5" style={{ color: '#ffffff', textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)' }}>
                  <CanadaMapleLeaf size="md" /> {translate(lang, 'vancouverEducationalAgency')}
                </span>
              </div>
              
              {/* Badge hora de Vancouver - MOBILE: 2 linhas, DESKTOP: 1 linha */}
              <div className="inline-block px-4 sm:px-5 py-2 sm:py-3 rounded-2xl backdrop-blur-md max-w-[90vw] sm:max-w-none" style={{ background: 'rgba(10, 15, 30, 0.9)', border: '1px solid rgba(255, 255, 255, 0.3)' }}>
                <span className="text-xs sm:text-sm font-semibold flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-center sm:text-left" style={{ color: '#ffffff', textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)' }}>
                  <span className="inline-flex items-center gap-1">
                    <CanadaMapleLeaf size="match-text" /> 
                    Vancouver <span className="font-bold">{vancouverTime}</span>
                  </span>
                  <span className="hidden sm:inline">-</span>
                  <span className="text-[0.65rem] sm:text-sm opacity-90">
                    {translate(lang, 'vancouverOneOfMostBeautiful')}
                  </span>
                </span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-handel uppercase tracking-wider text-white dark:text-white mb-6 leading-tight flex flex-col items-center gap-2" style={{ color: '#ffffff', textShadow: '0 2px 8px rgba(0, 0, 0, 0.6), 0 1px 3px rgba(0, 0, 0, 0.4)' }}>
              <span>{t.title}</span>
              <span className="inline-flex items-center gap-2" style={{ alignItems: 'center', lineHeight: '1' }}>
                {translate(lang, 'vancouverCanada')} <CanadaMapleLeaf size="match-text" />
              </span>
            </h1>

            <p className="text-xl sm:text-2xl md:text-3xl text-white/95 mb-4 font-light" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}>
              {t.subtitle}
            </p>

            {/* MOBILE: Texto curto e direto | DESKTOP: Texto completo */}
            <p 
              className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
              style={{ 
                textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.6)',
                fontWeight: 500
              }}
            >
              <span className="block sm:hidden">
                {backofficePage?.hero.descriptionMobile || t.heroDescription}
              </span>
              <span className="hidden sm:block">
                {backofficePage?.hero.descriptionDesktop || backofficePage?.hero.descriptionMobile || t.heroDescriptionFull || t.heroDescription}
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToCalculator}
                className="px-8 py-4 bg-azimut-red hover:bg-azimut-red/90 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-azimut-red/50"
              >
                {t.ctaHero} →
              </button>
              
              <a
                href="#form"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg transition-all duration-300 border border-white/20"
              >
                {translate(lang, 'vancouverConsultationFree')}
              </a>
            </div>

            {/* Stats */}
            <div className="mt-10 mb-16 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: '90%+', label: translate(lang, 'vancouverEmployability') },
                { value: translate(lang, 'vancouverOneYear'), label: translate(lang, 'vancouverDuration') },
                { value: '40k+', label: translate(lang, 'vancouverMediaJobs') },
                { value: '🇨🇦', label: translate(lang, 'vancouverPRPossibility') }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-azimut-red mb-1">
                    {i === 3 ? <CanadaMapleLeaf size="lg" /> : stat.value}
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

        {/* Escolas Parceiras + BCIT Pathway Visual */}
        <section
          className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
          style={{
            background: 'linear-gradient(180deg, rgba(139, 92, 246, 0.12) 0%, rgba(59, 130, 246, 0.08) 30%, rgba(201, 35, 55, 0.1) 70%, rgba(139, 92, 246, 0.08) 100%)',
          }}
        >
          <div className="max-w-5xl mx-auto">
            {/* Título Principal */}
            <div className="text-center mb-14">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-handel uppercase tracking-wider mb-4" style={{ color: '#ffffff' }}>
                {lang === 'pt' ? 'Escolas Parceiras + BCIT Pathway' : lang === 'es' ? 'Escuelas Asociadas + BCIT Pathway' : lang === 'fr' ? 'Écoles Partenaires + BCIT Pathway' : 'Partner Schools + BCIT Pathway'}
              </h2>
              <p className="text-base sm:text-lg leading-relaxed max-w-3xl mx-auto" style={{ color: 'rgba(255,255,255,0.75)' }}>
                {lang === 'pt' ? 'Diplomas intensivos de 1 ano com pathway para Bachelor\'s Degree no BCIT' : 
                 lang === 'es' ? 'Diplomas intensivos de 1 año con pathway para Bachelor\'s Degree en BCIT' :
                 lang === 'fr' ? 'Diplômes intensifs d\'1 an avec pathway vers Bachelor\'s Degree au BCIT' :
                 'Intensive 1-year diplomas with pathway to Bachelor\'s Degree at BCIT'}
              </p>
            </div>

            {/* ========== VFS SECTION ========== */}
            <div 
              className="mb-10 p-6 sm:p-8 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 22, 37, 0.25) 0%, rgba(139, 22, 37, 0.1) 100%)',
                border: '1px solid rgba(201, 35, 55, 0.3)',
              }}
            >
              {/* VFS Header - Logo vfs2.png com fundo vermelho */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <img 
                  src="/vfs2.png" 
                  alt="Vancouver Film School" 
                  className="rounded-xl"
                  style={{ width: '56px', height: '56px', objectFit: 'cover' }}
                />
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm px-4 py-1.5 rounded-full font-bold" style={{ background: '#c92337', color: '#fff' }}>#1 Canada</span>
                  <span className="text-sm px-4 py-1.5 rounded-full font-medium" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>92%+ employability</span>
                  <span className="text-sm px-4 py-1.5 rounded-full font-medium" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>Since 1987</span>
                </div>
              </div>

              {/* VFS Cursos - Grid 4 por linha */}
              <div className="mb-6">
                <p className="text-sm uppercase tracking-wider mb-4 font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {lang === 'pt' ? 'Programas (11)' : 'Programs (11)'}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['3D Animation & VFX', 'Game Design', 'Film Production', 'Programming', 'Sound Design', 'Digital Design', 'Acting', 'Concept Art', 'Classical Animation', 'Makeup Design', 'Writing', 'Short-Track'].map((course, i) => (
                    <div key={i} className="text-sm px-3 py-2.5 rounded-lg text-center font-medium" style={{ background: 'rgba(201, 35, 55, 0.25)', color: '#ffffff', border: '1px solid rgba(201, 35, 55, 0.35)' }}>
                      {course}
                    </div>
                  ))}
                </div>
              </div>

              {/* VFS Pathway Arrow Diagram */}
              <div className="mb-4">
                <p className="text-xs uppercase tracking-wider mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>BCIT Pathway</p>
                
                {/* Desktop: Horizontal Chevrons */}
                <div className="hidden md:flex items-stretch">
                  <div 
                    className="flex-1 py-3 px-4 flex flex-col justify-center"
                    style={{ 
                      background: 'linear-gradient(90deg, #8b1625 0%, #a91d2e 100%)',
                      clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%)',
                      borderRadius: '8px 0 0 8px'
                    }}
                  >
                    <div className="text-white font-bold text-sm">1 {lang === 'pt' ? 'ANO' : 'YEAR'}</div>
                    <div className="text-white/80 text-xs">VFS Diploma</div>
                  </div>
                  <div 
                    className="flex-1 py-3 px-5 flex flex-col justify-center -ml-px"
                    style={{ 
                      background: 'linear-gradient(90deg, #a91d2e 0%, #c92337 100%)',
                      clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%, 16px 50%)'
                    }}
                  >
                    <div className="text-white font-bold text-sm">+ 1 {lang === 'pt' ? 'ANO' : 'YEAR'}</div>
                    <div className="text-white/80 text-xs">BCIT Advanced Diploma</div>
                  </div>
                  <div 
                    className="flex-1 py-3 px-5 flex flex-col justify-center -ml-px"
                    style={{ 
                      background: 'linear-gradient(90deg, #c92337 0%, #e02d42 100%)',
                      clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%, 16px 50%)'
                    }}
                  >
                    <div className="text-white font-bold text-sm">+ 1 {lang === 'pt' ? 'ANO' : 'YEAR'}</div>
                    <div className="text-white/80 text-xs">BCIT Bachelor (BBA)</div>
                  </div>
                  <div 
                    className="py-4 px-5 flex items-center gap-3 -ml-px min-w-[220px]"
                    style={{ 
                      background: 'linear-gradient(90deg, #e02d42 0%, #ff4757 100%)',
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 16px 50%)',
                      borderRadius: '0 8px 8px 0'
                    }}
                  >
                    <span className="text-white font-bold text-xl">=</span>
                    <div className="text-white text-sm leading-snug font-semibold">
                      <div>Triple Credentials</div>
                      <div>Work Permit</div>
                    </div>
                  </div>
                </div>

                {/* Mobile: Vertical */}
                <div className="md:hidden space-y-2">
                  <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: '#8b1625' }}>
                    <span className="text-white font-bold text-base w-20">1 {lang === 'pt' ? 'ANO' : 'YEAR'}</span>
                    <span className="text-white/90 text-base">VFS Diploma</span>
                  </div>
                  <div className="text-center text-white/40">↓</div>
                  <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: '#a91d2e' }}>
                    <span className="text-white font-bold text-base w-20">+ 1 {lang === 'pt' ? 'ANO' : 'YEAR'}</span>
                    <span className="text-white/90 text-base">BCIT Advanced Diploma</span>
                  </div>
                  <div className="text-center text-white/40">↓</div>
                  <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: '#c92337' }}>
                    <span className="text-white font-bold text-base w-20">+ 1 {lang === 'pt' ? 'ANO' : 'YEAR'}</span>
                    <span className="text-white/90 text-base">BCIT Bachelor (BBA)</span>
                  </div>
                  <div className="text-center text-white/40">↓</div>
                  <div className="p-4 rounded-lg flex items-center justify-center gap-3" style={{ background: '#e02d42' }}>
                    <span className="text-white font-bold text-xl">=</span>
                    <span className="text-white font-bold text-base">Triple Credentials + Work Permit</span>
                  </div>
                </div>
              </div>

              <a href="https://vfs.edu/pathway/bcit" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-base font-semibold text-azimut-red hover:underline">
                {lang === 'pt' ? 'Ver detalhes VFS-BCIT Pathway' : 'View VFS-BCIT Pathway details'} →
              </a>
            </div>

            {/* ========== VANARTS SECTION ========== */}
            <div 
              className="mb-10 p-6 sm:p-8 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(180, 50, 50, 0.15) 0%, rgba(180, 50, 50, 0.05) 100%)',
                border: '1px solid rgba(180, 50, 50, 0.25)',
              }}
            >
              {/* VanArts Header - Logo pequena */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div 
                  className="flex items-center justify-center rounded-xl overflow-hidden"
                  style={{ background: '#ffffff', width: '56px', height: '56px' }}
                >
                  <img 
                    src="/vanarts2.png" 
                    alt="VanArts" 
                    style={{ height: '44px', width: 'auto', objectFit: 'contain' }}
                  />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm px-4 py-1.5 rounded-full font-bold" style={{ background: '#b43232', color: '#fff' }}>Best Value</span>
                  <span className="text-sm px-4 py-1.5 rounded-full font-medium" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>90%+ employability</span>
                  <span className="text-sm px-4 py-1.5 rounded-full font-medium" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>Since 1995</span>
                </div>
              </div>

              {/* VanArts Cursos - Grid 4 por linha */}
              <div className="mb-6">
                <p className="text-sm uppercase tracking-wider mb-4 font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {lang === 'pt' ? 'Programas (8)' : 'Programs (8)'}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['2D/3D Animation', 'Acting for Film & TV', 'Acting Foundations', 'Art Foundation', 'Game Art & Design', 'Photography', 'Web & Digital Design', 'Visual Effects'].map((course, i) => (
                    <div key={i} className="text-sm px-3 py-2.5 rounded-lg text-center font-medium" style={{ background: 'rgba(180, 50, 50, 0.2)', color: '#ffffff', border: '1px solid rgba(180, 50, 50, 0.3)' }}>
                      {course}
                    </div>
                  ))}
                </div>
              </div>

              {/* VanArts Pathway - Mesmo estilo do VFS */}
              <div className="mb-4">
                <p className="text-xs uppercase tracking-wider mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>BCIT Pathway</p>
                
                {/* Desktop: Horizontal Chevrons */}
                <div className="hidden md:flex items-stretch">
                  <div 
                    className="flex-1 py-3 px-4 flex flex-col justify-center"
                    style={{ 
                      background: 'linear-gradient(90deg, #8b1625 0%, #a91d2e 100%)',
                      clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%)',
                      borderRadius: '8px 0 0 8px'
                    }}
                  >
                    <div className="text-white font-bold text-sm">1 {lang === 'pt' ? 'ANO' : 'YEAR'}</div>
                    <div className="text-white/80 text-xs">VanArts Diploma</div>
                  </div>
                  <div 
                    className="flex-1 py-3 px-5 flex flex-col justify-center -ml-px"
                    style={{ 
                      background: 'linear-gradient(90deg, #a91d2e 0%, #c92337 100%)',
                      clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%, 16px 50%)'
                    }}
                  >
                    <div className="text-white font-bold text-sm">+ 1 {lang === 'pt' ? 'ANO' : 'YEAR'}</div>
                    <div className="text-white/80 text-xs">BCIT Advanced Diploma</div>
                  </div>
                  <div 
                    className="flex-1 py-3 px-5 flex flex-col justify-center -ml-px"
                    style={{ 
                      background: 'linear-gradient(90deg, #c92337 0%, #e02d42 100%)',
                      clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%, 16px 50%)'
                    }}
                  >
                    <div className="text-white font-bold text-sm">+ 1 {lang === 'pt' ? 'ANO' : 'YEAR'}</div>
                    <div className="text-white/80 text-xs">BCIT Bachelor (BBA)</div>
                  </div>
                  <div 
                    className="py-4 px-5 flex items-center gap-3 -ml-px min-w-[220px]"
                    style={{ 
                      background: 'linear-gradient(90deg, #e02d42 0%, #ff4757 100%)',
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 16px 50%)',
                      borderRadius: '0 8px 8px 0'
                    }}
                  >
                    <span className="text-white font-bold text-xl">=</span>
                    <div className="text-white text-sm leading-snug font-semibold">
                      <div>Triple Credentials</div>
                      <div>Work Permit</div>
                    </div>
                  </div>
                </div>

                {/* Mobile: Vertical */}
                <div className="md:hidden space-y-2">
                  <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: '#8b1625' }}>
                    <span className="text-white font-bold text-base w-20">1 {lang === 'pt' ? 'ANO' : 'YEAR'}</span>
                    <span className="text-white/90 text-base">VanArts Diploma</span>
                  </div>
                  <div className="text-center text-white/40">↓</div>
                  <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: '#a91d2e' }}>
                    <span className="text-white font-bold text-base w-20">+ 1 {lang === 'pt' ? 'ANO' : 'YEAR'}</span>
                    <span className="text-white/90 text-base">BCIT Advanced Diploma</span>
                  </div>
                  <div className="text-center text-white/40">↓</div>
                  <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: '#c92337' }}>
                    <span className="text-white font-bold text-base w-20">+ 1 {lang === 'pt' ? 'ANO' : 'YEAR'}</span>
                    <span className="text-white/90 text-base">BCIT Bachelor (BBA)</span>
                  </div>
                  <div className="text-center text-white/40">↓</div>
                  <div className="p-4 rounded-lg flex items-center justify-center gap-3" style={{ background: '#e02d42' }}>
                    <span className="text-white font-bold text-xl">=</span>
                    <span className="text-white font-bold text-base">Triple Credentials + Work Permit</span>
                  </div>
                </div>
              </div>

              <a href="https://www.vanarts.com/pathways" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-base font-semibold hover:underline" style={{ color: '#e57373' }}>
                {lang === 'pt' ? 'Ver detalhes VanArts-BCIT Pathway' : 'View VanArts-BCIT Pathway details'} →
              </a>
            </div>

            {/* Key Advantages */}
            <div 
              className="p-5 sm:p-6 rounded-xl mb-10"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <h4 className="text-base font-bold mb-4" style={{ color: '#c92337' }}>Key Advantages</h4>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="flex items-start gap-2">
                  <span style={{ color: '#c92337' }}>●</span>
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>
                    {lang === 'pt' ? 'Credenciais de 2 instituições de BC, Canadá' : 'Dual credentials from two BC institutions'}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span style={{ color: '#c92337' }}>●</span>
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>
                    {lang === 'pt' ? 'Elegível para Post-Graduate Work Permit' : 'Eligible for Post-Graduate Work Permit'}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span style={{ color: '#c92337' }}>●</span>
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>
                    {lang === 'pt' ? 'Vancouver: Hub #1 mundial de VFX & Games' : 'Vancouver: World\'s #1 hub for VFX & Games'}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Jogo */}
            <div className="text-center">
              <Link
                to={`/${lang}/game`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  boxShadow: '0 4px 20px rgba(16, 185, 129, 0.4)',
                }}
              >
                <span aria-hidden className="text-xl">🎮</span>
                {translate(lang, 'vancouverLearnHookGameCta')} →
              </Link>
            </div>
          </div>
        </section>

        {/* Alumni Work At - Logos Visuais */}
        <section 
          className="py-12 border-y company-logos" 
          style={{ 
            background: theme === 'dark' ? 'var(--theme-bg-secondary)' : '#1a1815',
            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.1)'
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm uppercase tracking-[0.3em] mb-8" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {translate(lang, 'vancouverOurStudentsWorkAt')}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {/* Logos estilizados com texto */}
              {[
                { name: 'Disney', emoji: '🏰' },
                { name: 'Sony Pictures', emoji: '🎬' },
                { name: 'EA Games', emoji: '🎮' },
                { name: 'Netflix', emoji: '📺' },
                { name: 'ILM', emoji: '⭐' },
                { name: 'Ubisoft', emoji: '🕹️' },
                { name: 'Marvel', emoji: '🦸' },
                { name: 'DNEG', emoji: '🎥' }
              ].map((company, i) => (
                <div 
                  key={i} 
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 group"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    borderColor: 'rgba(255,255,255,0.15)'
                  }}
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">{company.emoji}</span>
                  <span className="font-semibold group-hover:text-azimut-red transition-colors" style={{ color: 'rgba(255,255,255,0.85)' }}>{company.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* International Students Premium Card */}
        <section className="py-12" style={{ background: theme === 'dark' ? 'var(--theme-bg)' : '#1a1815' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              className="rounded-2xl p-8 md:p-12 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(201,35,55,0.15) 0%, rgba(201,35,55,0.05) 100%)',
                border: '1px solid rgba(201,35,55,0.3)'
              }}
            >
              <div className="flex flex-col items-center gap-6">
                <div className="flex items-center gap-4">
                  <span className="text-5xl md:text-6xl">🌍</span>
                  <h3 className="text-2xl md:text-3xl font-bold" style={{ color: '#ffffff' }}>
                    {translate(lang, 'vancouverStudentsFromAroundWorld')}
                  </h3>
                </div>
                <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-3xl md:text-4xl">
                  <span className="international-flag" title="Brasil">🇧🇷</span>
                  <span className="international-flag" title="México">🇲🇽</span>
                  <span className="international-flag" title="Argentina">🇦🇷</span>
                  <span className="international-flag" title="Colômbia">🇨🇴</span>
                  <span className="international-flag" title="Chile">🇨🇱</span>
                  <span className="international-flag" title="Portugal">🇵🇹</span>
                  <span className="international-flag" title="Espanha">🇪🇸</span>
                  <span className="international-flag" title="França">🇫🇷</span>
                  <span className="international-flag" title="Alemanha">🇩🇪</span>
                  <span className="international-flag" title="Itália">🇮🇹</span>
                  <span className="international-flag" title="Índia">🇮🇳</span>
                  <span className="international-flag" title="Japão">🇯🇵</span>
                </div>
                <p className="text-base md:text-lg max-w-2xl" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  {translate(lang, 'vancouverOfficialAgent')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Vancouver - Ultra Convincente */}
        <section style={{ background: 'var(--theme-bg)' }}>
          <WhyVancouverConvincing lang={lang} />
        </section>

        {/* Vancouver Magazine - Lifestyle + Escolas + Futuro */}
        <section style={{ background: 'var(--theme-bg-secondary)' }}>
          <VancouverMagazine lang={lang} />
        </section>

        {/* Comparative Table */}
        <section className="py-20" style={{ background: 'var(--theme-bg)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="section-title-vancouver text-4xl md:text-5xl font-handel uppercase tracking-wider mb-4">
                {t.compareTitle}
              </h2>
              <p className="text-lg max-w-3xl mx-auto" style={{ color: 'var(--theme-text-secondary)' }}>
                {t.compareDescription}
              </p>
            </div>

            {/* TABELA OTIMIZADA PARA MOBILE - Fontes menores, scroll suave */}
            <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0 rounded-xl" style={{ scrollbarWidth: 'thin' }}>
              <table className="comparison-table w-full border-collapse min-w-[500px] rounded-xl overflow-hidden" style={{ background: 'var(--theme-card-bg)' }}>
                <thead>
                  <tr style={{ background: 'rgba(201, 35, 55, 0.15)' }}>
                    <th className="text-left p-2 sm:p-4 font-semibold uppercase text-[10px] sm:text-sm whitespace-nowrap" style={{ color: 'var(--theme-text-secondary)' }}></th>
                    <th className="p-2 sm:p-4 font-semibold text-xs sm:text-lg whitespace-nowrap" style={{ color: 'var(--theme-text)' }}>
                      <span className="hidden sm:inline">{translate(lang, 'vancouverTraditionalUniv')}</span>
                      <span className="sm:hidden">Univ.<br/><span className="text-[9px] opacity-70">{translate(lang, 'vancouverTraditionalShort')}</span></span>
                    </th>
                    <th className="p-2 sm:p-4 text-azimut-red font-semibold text-xs sm:text-lg whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 sm:gap-1.5" style={{ alignItems: 'center', lineHeight: '1' }}>
                        VanArts <CanadaMapleLeaf size="match-text" />
                      </span>
                    </th>
                    <th className="p-2 sm:p-4 font-semibold text-xs sm:text-lg whitespace-nowrap" style={{ color: 'var(--theme-text)' }}>
                      <span className="inline-flex items-center gap-1 sm:gap-1.5" style={{ alignItems: 'center', lineHeight: '1' }}>
                        VFS <CanadaMapleLeaf size="match-text" />
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  <tr style={{ borderBottom: '1px solid var(--theme-border)' }}>
                    <td className="text-left p-2 sm:p-4 font-medium text-[10px] sm:text-base whitespace-nowrap" style={{ color: 'var(--theme-text-secondary)' }}>
                      <span className="hidden sm:inline">{translate(lang, 'vancouverTotalCost')}</span>
                      <span className="sm:hidden">{translate(lang, 'vancouverTotalCostShort')}<br/><span className="text-[8px] opacity-70">{translate(lang, 'vancouverAprox')}</span></span>
                    </td>
                    <td className="p-2 sm:p-4 text-[11px] sm:text-base" style={{ color: 'var(--theme-text)' }}>US$ 40-80k</td>
                    <td className="p-2 sm:p-4 text-emerald-600 font-bold text-sm sm:text-xl">US$ 35k ✅</td>
                    <td className="p-2 sm:p-4 text-[11px] sm:text-base" style={{ color: 'var(--theme-text)' }}>US$ 55k</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--theme-border)' }}>
                    <td className="text-left p-2 sm:p-4 font-medium text-[10px] sm:text-base" style={{ color: 'var(--theme-text-secondary)' }}>{translate(lang, 'vancouverDuration')}</td>
                    <td className="p-2 sm:p-4 text-[11px] sm:text-base" style={{ color: 'var(--theme-text)' }}>{translate(lang, 'vancouverFourYears')}</td>
                    <td className="p-2 sm:p-4 text-emerald-600 font-bold text-xs sm:text-base">{translate(lang, 'vancouverOneYear')} ✅</td>
                    <td className="p-2 sm:p-4 text-emerald-600 text-[11px] sm:text-base">{translate(lang, 'vancouverOneYear')} ✅</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--theme-border)' }}>
                    <td className="text-left p-2 sm:p-4 font-medium text-[10px] sm:text-base" style={{ color: 'var(--theme-text-secondary)' }}>{translate(lang, 'vancouverEmployability')}</td>
                    <td className="p-2 sm:p-4 text-[11px] sm:text-base" style={{ color: 'var(--theme-text)' }}>50-60%</td>
                    <td className="p-2 sm:p-4 text-emerald-600 font-bold text-xs sm:text-base">90%+ ✅</td>
                    <td className="p-2 sm:p-4 text-emerald-600 text-[11px] sm:text-base">92% ✅</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--theme-border)' }}>
                    <td className="text-left p-2 sm:p-4 font-medium text-[10px] sm:text-base" style={{ color: 'var(--theme-text-secondary)' }}>
                      <span className="hidden sm:inline">{translate(lang, 'vancouverStartingSalary')}</span>
                      <span className="sm:hidden">{translate(lang, 'vancouverSalary')}</span>
                    </td>
                    <td className="p-2 sm:p-4 text-[10px] sm:text-base" style={{ color: 'var(--theme-text)' }}>{translate(lang, 'vancouverUsd2_4k')}</td>
                    <td className="p-2 sm:p-4 text-emerald-600 font-bold text-[10px] sm:text-base">
                      <span className="hidden sm:inline">{translate(lang, 'vancouverCad35_5k')}</span>
                      <span className="sm:hidden">$3.5-5k/m</span> ✅
                    </td>
                    <td className="p-2 sm:p-4 text-emerald-600 text-[10px] sm:text-base">
                      <span className="hidden sm:inline">{translate(lang, 'vancouverCad4_6k')}</span>
                      <span className="sm:hidden">$4-6k/m</span> ✅
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--theme-border)' }}>
                    <td className="text-left p-2 sm:p-4 font-medium text-[10px] sm:text-base" style={{ color: 'var(--theme-text-secondary)' }}>{translate(lang, 'vancouverMarket')}</td>
                    <td className="p-2 sm:p-4 text-[11px] sm:text-base" style={{ color: 'var(--theme-text)' }}>{translate(lang, 'vancouverRegional')}</td>
                    <td className="p-2 sm:p-4 text-emerald-600 font-bold text-xs sm:text-base">Global ✅</td>
                    <td className="p-2 sm:p-4 text-emerald-600 text-[11px] sm:text-base">Global ✅</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--theme-border)' }}>
                    <td className="text-left p-2 sm:p-4 font-medium text-[10px] sm:text-base" style={{ color: 'var(--theme-text-secondary)' }}>Idioma</td>
                    <td className="p-2 sm:p-4 text-[11px] sm:text-base" style={{ color: 'var(--theme-text)' }}>Local</td>
                    <td className="p-2 sm:p-4 text-emerald-600 font-bold text-xs sm:text-base">English ✅</td>
                    <td className="p-2 sm:p-4 text-emerald-600 text-[11px] sm:text-base">English ✅</td>
                  </tr>
                  <tr>
                    <td className="text-left p-2 sm:p-4 font-medium text-[10px] sm:text-base" style={{ color: 'var(--theme-text-secondary)' }}>
                      <span className="hidden sm:inline">{translate(lang, 'vancouverPRPossibility')}</span>
                      <span className="sm:hidden">PR</span>
                    </td>
                    <td className="p-2 sm:p-4 text-[11px] sm:text-base" style={{ color: 'var(--theme-text)' }}>{translate(lang, 'vancouverNo')}</td>
                    <td className="p-2 sm:p-4 text-emerald-600 font-bold text-xs sm:text-base">
                      <span className="inline-flex items-center gap-1" style={{ alignItems: 'center', lineHeight: '1' }}>
                        {translate(lang, 'vancouverYes')} <CanadaMapleLeaf size="match-text" /> ✅
                      </span>
                    </td>
                    <td className="p-2 sm:p-4 text-emerald-600 text-[11px] sm:text-base">
                      <span className="inline-flex items-center gap-1" style={{ alignItems: 'center', lineHeight: '1' }}>
                        {translate(lang, 'vancouverYes')} <CanadaMapleLeaf size="match-text" /> ✅
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 p-6 rounded-xl" style={{ background: 'var(--theme-card-bg)', border: '2px solid #c92337' }}>
              <p className="text-center text-lg" style={{ color: 'var(--theme-text)' }}>
                <strong className="text-azimut-red">VEREDITO:</strong> VanArts/VFS são <strong className="text-emerald-600">MAIS FOCADAS</strong>, <strong className="text-emerald-600">4x MAIS RÁPIDAS</strong>, <strong className="text-emerald-600">2x MAIOR EMPREGABILIDADE</strong> e com <strong className="text-emerald-600">MERCADO GLOBAL</strong> + <strong className="text-emerald-600">POSSIBILIDADE DE PR <span className="inline-flex items-center gap-1" style={{ alignItems: 'center', lineHeight: '1' }}><CanadaMapleLeaf size="match-text" /></span></strong>! 🚀
              </p>
            </div>
          </div>
        </section>

        {/* Why Vancouver */}
        <section className="py-20" style={{ background: theme === 'dark' ? 'var(--theme-bg)' : '#1a1815' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider mb-4" style={{ color: '#ffffff' }}>
                {t.whyTitle}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {t.whyItems.map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl hover:border-azimut-red/50 transition-all duration-300 overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <div className="text-5xl mb-4 flex-shrink-0">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 line-clamp-2" style={{ color: '#ffffff' }}>
                    {item.title}
                  </h3>
                  <p className="leading-relaxed line-clamp-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Schools Section - VFS & VanArts */}
        <section className="py-20" style={{ background: 'var(--theme-bg-secondary)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-block px-6 py-2 bg-azimut-red/20 border border-azimut-red/40 rounded-full mb-6">
                <span className="text-azimut-red text-sm font-semibold uppercase tracking-wider">
                  🏫 {translate(lang, 'vancouverOfficialPartnerSchools')}
                </span>
              </div>
              <h2 className="section-title-vancouver text-4xl md:text-5xl font-handel uppercase tracking-wider mb-4">
                {t.schoolsTitle}
              </h2>
              <p className="section-subtitle-vancouver max-w-2xl mx-auto">
                {translate(lang, 'vancouverBestSchoolsNorthAmerica')}
              </p>
            </div>

            {/* VFS */}
            <div className="school-card school-card-vfs mb-16 rounded-2xl overflow-hidden border border-white/10 hover:border-azimut-red/30 transition-all duration-500 group">
              {/* VFS Hero Image */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-azimut-red flex items-center justify-center text-3xl shadow-lg">
                      🎬
                    </div>
                    <div>
                      <h3 className="text-3xl md:text-4xl font-handel uppercase text-white drop-shadow-lg">
                        Vancouver Film School
                      </h3>
                      <div className="flex gap-2 mt-2">
                        <span className="px-3 py-1 bg-azimut-red/80 text-white text-xs font-bold rounded-full uppercase">#1 Canada</span>
                        <span className="px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full uppercase">Since 1987</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* VFS Content */}
              <div className="school-card-content p-8" style={{ background: 'linear-gradient(135deg, #0a0f1a 0%, #1a1f2e 100%)' }}>
                <p className="text-white/70 mb-6">{t.vfsDescription}</p>

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

              {/* Quick Facts VFS */}
              <div className="mt-6 p-4 bg-azimut-red/10 border border-azimut-red/30 rounded-lg">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">📋 {translate(lang, 'vancouverQuickFacts')}</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-white/60">{translate(lang, 'vancouverNextIntakes')}:</span>
                    <div className="text-white font-medium">Jan, Mai, Set 2026</div>
                  </div>
                  <div>
                    <span className="text-white/60">{translate(lang, 'vancouverTuitionAvg')}:</span>
                    <div className="text-white font-medium">CAD $49,000 - $55,000</div>
                  </div>
                  <div>
                    <span className="text-white/60">{translate(lang, 'vancouverEnglishReq')}:</span>
                    <div className="text-white font-medium">IELTS 6.5 / TOEFL 80</div>
                  </div>
                </div>
              </div>

              <a
                href="https://vfs.edu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-azimut-red hover:text-azimut-red/80 transition-colors mt-4"
              >
                {translate(lang, 'vancouverVisitVFS')} →
              </a>
              </div>
            </div>

            {/* VanArts */}
            <div className="school-card school-card-vanarts rounded-2xl overflow-hidden border border-white/10 hover:border-azimut-red/30 transition-all duration-500 group">
              {/* VanArts Hero Image */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1200)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-3xl shadow-lg">
                      🎨
                    </div>
                    <div>
                      <h3 className="text-3xl md:text-4xl font-handel uppercase text-white drop-shadow-lg">
                        VanArts
                      </h3>
                      <div className="flex gap-2 mt-2">
                        <span className="px-3 py-1 bg-purple-600/80 text-white text-xs font-bold rounded-full uppercase">{translate(lang, 'vancouverBestValue')}</span>
                        <span className="px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full uppercase">Since 1995</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* VanArts Content */}
              <div className="school-card-content p-8" style={{ background: 'linear-gradient(135deg, #0a0f1a 0%, #1a1f2e 100%)' }}>
                <p className="text-white/70 mb-6">{t.vanartsDescription}</p>

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

              {/* Quick Facts VanArts */}
              <div className="mt-6 p-4 bg-azimut-red/10 border border-azimut-red/30 rounded-lg">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">📋 {translate(lang, 'vancouverQuickFacts')}</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-white/60">{translate(lang, 'vancouverNextIntakes')}:</span>
                    <div className="text-white font-medium">Fev, Mai, Set 2026</div>
                  </div>
                  <div>
                    <span className="text-white/60">{translate(lang, 'vancouverTuitionAvg')}:</span>
                    <div className="text-white font-medium">CAD $24,000 - $30,000</div>
                  </div>
                  <div>
                    <span className="text-white/60">{translate(lang, 'vancouverEnglishReq')}:</span>
                    <div className="text-white font-medium">IELTS 6.0 / TOEFL 68</div>
                  </div>
                </div>
                <p className="mt-3 text-xs text-white/50">
                  💡 {translate(lang, 'vancouverVanArtsAccessible')}
                </p>
              </div>

              <a
                href="https://www.vanarts.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-azimut-red hover:text-azimut-red/80 transition-colors mt-4"
              >
                {translate(lang, 'vancouverVisitVanArts')} →
              </a>

              {/* VanArts Video */}
              <div className="mt-8">
                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                    <span className="text-2xl">🎬</span>
                    {translate(lang, 'vancouverDiscoverVanArtsInside')}
                  </h4>
                  <p className="text-white/70 text-sm">
                    {translate(lang, 'vancouverVideoVanArts')}
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

            {/* Vancouver City Gallery */}
            <div className="mt-16">
              <h3 className="text-2xl font-handel uppercase text-white text-center mb-8">
                📍 {translate(lang, 'vancouverLiveInVancouver')}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { img: 'https://images.unsplash.com/photo-1559511260-66a654ae982a?w=600', label: 'Downtown' },
                  { img: 'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=600', label: 'Stanley Park' },
                  { img: 'https://images.unsplash.com/photo-1560813962-ff3d8fcf59ba?w=600', label: 'Mountains' },
                  { img: 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=600', label: 'Waterfront' }
                ].map((item, i) => (
                  <div key={i} className="relative h-40 md:h-56 rounded-xl overflow-hidden group">
                    <div 
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                      style={{ backgroundImage: `url(${item.img})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="px-3 py-1 bg-azimut-red/80 text-white text-xs font-bold rounded-full">{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20" style={{ background: theme === 'dark' ? 'var(--theme-bg)' : '#1a1815' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div 
                className="inline-block px-6 py-2 rounded-full mb-6"
                style={{
                  background: 'rgba(34, 197, 94, 0.25)',
                  border: '1px solid rgba(34, 197, 94, 0.5)'
                }}
              >
                <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#4ade80' }}>
                  ✅ {translate(lang, 'vancouverRealSuccessStories')}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider mb-4" style={{ color: '#ffffff' }}>
                {t.testimonialsTitle}
              </h2>
              <p className="text-lg max-w-3xl mx-auto mb-8" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {translate(lang, 'vancouverMeetProfessionals')}
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
                  className="p-6 rounded-xl"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-azimut-red/20 flex items-center justify-center text-2xl" style={{ color: '#ffffff' }}>
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold" style={{ color: '#ffffff' }}>{testimonial.name}</div>
                      <div className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>{testimonial.role}</div>
                      <div className="text-sm text-azimut-red">{testimonial.company}</div>
                    </div>
                  </div>
                  <p className="italic leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
                    "{testimonial.quote}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How Azimut Helps */}
        <section className="py-20" style={{ background: theme === 'dark' ? 'var(--theme-bg-secondary)' : '#0f0d0b' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider mb-4" style={{ color: '#ffffff' }}>
                {t.azimutHelpTitle}
              </h2>
              <p className="text-lg max-w-3xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {t.azimutHelpDescription}
              </p>
            </div>

            {/* Azimut Stats - Prova Social */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="p-6 rounded-xl text-center" style={{ background: 'linear-gradient(135deg, rgba(201,35,55,0.2) 0%, rgba(201,35,55,0.05) 100%)', border: '1px solid rgba(201,35,55,0.3)' }}>
                <div className="text-4xl font-bold text-azimut-red mb-1">30+</div>
                <div className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>{translate(lang, 'vancouverYearsInIndustry')}</div>
              </div>
              <div className="p-6 rounded-xl text-center" style={{ background: 'linear-gradient(135deg, rgba(201,35,55,0.2) 0%, rgba(201,35,55,0.05) 100%)', border: '1px solid rgba(201,35,55,0.3)' }}>
                <div className="text-4xl font-bold text-azimut-red mb-1">85%</div>
                <div className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>{translate(lang, 'vancouverApprovalRate')}</div>
              </div>
              <div className="p-6 rounded-xl text-center" style={{ background: 'linear-gradient(135deg, rgba(201,35,55,0.2) 0%, rgba(201,35,55,0.05) 100%)', border: '1px solid rgba(201,35,55,0.3)' }}>
                <div className="text-4xl font-bold text-azimut-red mb-1">100%</div>
                <div className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>{translate(lang, 'vancouverFree')}</div>
              </div>
              <div className="p-6 rounded-xl text-center" style={{ background: 'linear-gradient(135deg, rgba(201,35,55,0.2) 0%, rgba(201,35,55,0.05) 100%)', border: '1px solid rgba(201,35,55,0.3)' }}>
                <div className="text-4xl font-bold text-azimut-red mb-1">🎯</div>
                <div className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>{translate(lang, 'vancouverPortfolioPrep')}</div>
              </div>
            </div>

            <div className="grid md:grid-cols-5 gap-6">
              {t.azimutSteps.map((step, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl hover:border-azimut-red/50 transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <div className="w-12 h-12 rounded-full bg-azimut-red/20 flex items-center justify-center text-2xl font-bold text-azimut-red mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: '#ffffff' }}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            <div 
              className="mt-12 p-6 rounded-lg text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(201,35,55,0.25) 0%, rgba(201,35,55,0.15) 100%)',
                border: '1px solid rgba(201,35,55,0.4)'
              }}
            >
              <p className="text-xl font-semibold mb-2" style={{ color: '#ffffff' }}>
                {t.azimutCost}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.8)' }}>
                {t.azimutCostNote}
              </p>
            </div>
          </div>
        </section>

        {/* AI Tools */}
        <section className="py-20" style={{ background: theme === 'dark' ? 'var(--theme-bg)' : '#1a1815' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div 
                className="inline-block px-6 py-2 rounded-full mb-6"
                style={{
                  background: 'rgba(201,35,55,0.25)',
                  border: '1px solid rgba(201,35,55,0.5)'
                }}
              >
                <span className="text-azimut-red text-sm font-semibold uppercase">
                  🤖 IA Interativa
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider mb-4" style={{ color: '#ffffff' }}>
                {lang === 'pt' ? 'Ferramentas Inteligentes' : 'Smart Tools'}
              </h2>
              <p className="text-xl max-w-3xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {translate(lang, 'vancouverUseOurAI')}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 mb-12">
              {/* Quiz */}
              <div>
                <div className="mb-6 text-center">
                  <h3 className="text-2xl font-bold mb-2" style={{ color: '#ffffff' }}>
                    {translate(lang, 'vancouverAreYouReady')}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {translate(lang, 'vancouverTakeQuiz')}
                  </p>
                </div>
                <QuizVancouver lang={lang} />
              </div>

              {/* Calculator */}
              <div id="calculator">
                <div className="mb-6 text-center">
                  <h3 className="text-2xl font-bold mb-2" style={{ color: '#ffffff' }}>
                    {translate(lang, 'vancouverCalculateInvestment')}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {translate(lang, 'vancouverSeeHowMuch')}
                  </p>
                </div>
                <AdvancedVancouverCalculator lang={lang} />
              </div>
            </div>
          </div>
        </section>

        {/* Visual School Quiz - Ultra Interativo - MOVIDO PARA CIMA */}
        <section className="py-20" style={{ background: theme === 'dark' ? 'var(--theme-bg-secondary)' : '#0f0d0b' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider mb-4" style={{ color: '#ffffff' }}>
                {translate(lang, 'vancouverWhichSchool')}
              </h2>
              <p className="text-xl" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {translate(lang, 'vancouverFindOut30sec')}
              </p>
            </div>
            <VisualSchoolQuiz lang={lang} />
          </div>
        </section>

        {/* 🆕 FASE 3: Conteúdo Long-Form Expandido para SEO */}
        <section className="py-20" style={{ background: theme === 'dark' ? 'var(--theme-bg-secondary)' : '#0f0d0b' }}>
          <VancouverContentExpanded lang={lang} />
        </section>

        {/* FAQ - PERMANECE */}
        <section className="py-20" style={{ background: theme === 'dark' ? 'var(--theme-bg)' : '#1a1815' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider mb-4" style={{ color: '#ffffff' }}>
                {t.faqTitle}
              </h2>
            </div>

            <div className="space-y-4">
              {t.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group p-6 rounded-lg hover:border-azimut-red/50 transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <summary className="cursor-pointer font-semibold flex justify-between items-center" style={{ color: '#ffffff' }}>
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
                  <p className="mt-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section id="form" className="py-20" style={{ background: theme === 'dark' ? 'var(--theme-bg-secondary)' : '#0f0d0b' }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <AcademyQuickForm 
              lang={lang} 
              type="vancouver"
            />
          </div>
        </section>
      </div>
    </>
  )
}

export default Vancouver
