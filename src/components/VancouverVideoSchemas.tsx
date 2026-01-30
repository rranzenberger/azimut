// ════════════════════════════════════════════════════════════
// VANCOUVER VIDEO SCHEMAS - VideoObject para depoimentos VanArts/VFS
// ════════════════════════════════════════════════════════════
// Vídeos exibidos na página Vancouver (WhyVancouverConvincing)
// ════════════════════════════════════════════════════════════

import React from 'react'
import { VideoObjectSchema } from './StructuredData'
import { type Lang } from '../i18n'

const VANCOUVER_VIDEOS: Array<{
  id: string
  byLang: Record<Lang, { name: string; description: string }>
}> = [
  {
    id: 'Vm1s2cwHI-M',
    byLang: {
      pt: {
        name: 'VanArts Vancouver – Hollywood do Norte e 95% empregabilidade',
        description: 'Por que Vancouver é o hub global de mídia. VanArts e VFS: 95% dos graduados empregados em 6 meses. Depoimentos e dados oficiais.'
      },
      en: {
        name: 'VanArts Vancouver – Hollywood North and 95% employability',
        description: 'Why Vancouver is the global media hub. VanArts and VFS: 95% of graduates employed within 6 months. Testimonials and official data.'
      },
      es: {
        name: 'VanArts Vancouver – Hollywood del Norte y 95% empleabilidad',
        description: 'Por qué Vancouver es el hub global de medios. VanArts y VFS: 95% de graduados empleados en 6 meses. Testimonios y datos oficiales.'
      },
      fr: {
        name: 'VanArts Vancouver – Hollywood du Nord et 95% d’employabilité',
        description: 'Pourquoi Vancouver est le hub mondial des médias. VanArts et VFS : 95 % des diplômés employés en 6 mois. Témoignages et données officielles.'
      }
    }
  },
  {
    id: 'y3uhoRpQPYY',
    byLang: {
      pt: {
        name: 'Salários e carreira em Vancouver – VFX, animação e games',
        description: 'Salários em Vancouver para VFX, animação e game design. Dados de mercado e oportunidades de carreira no Canadá.'
      },
      en: {
        name: 'Salaries and career in Vancouver – VFX, animation and games',
        description: 'Vancouver salaries for VFX, animation and game design. Market data and career opportunities in Canada.'
      },
      es: {
        name: 'Salarios y carrera en Vancouver – VFX, animación y games',
        description: 'Salarios en Vancouver para VFX, animación y game design. Datos de mercado y oportunidades de carrera en Canadá.'
      },
      fr: {
        name: 'Salaires et carrière à Vancouver – VFX, animation et games',
        description: 'Salaires à Vancouver pour VFX, animation et game design. Données du marché et opportunités de carrière au Canada.'
      }
    }
  }
]

const BASE = 'https://www.youtube.com/embed/'
const THUMB = 'https://img.youtube.com/vi/'
const UPLOAD_PLACEHOLDER = '2024-06-01'

interface VancouverVideoSchemasProps {
  lang: Lang
}

const VancouverVideoSchemas: React.FC<VancouverVideoSchemasProps> = ({ lang }) => (
  <>
    {VANCOUVER_VIDEOS.map((v) => {
      const { name, description } = v.byLang[lang] ?? v.byLang.pt
      return (
        <VideoObjectSchema
          key={v.id}
          name={name}
          description={description}
          thumbnailUrl={`${THUMB}${v.id}/hqdefault.jpg`}
          uploadDate={UPLOAD_PLACEHOLDER}
          embedUrl={`${BASE}${v.id}`}
          lang={lang}
        />
      )
    })}
  </>
)

export default VancouverVideoSchemas
