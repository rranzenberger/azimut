import React from 'react'
import { type Lang } from '../i18n'

interface ServiceHeroProps {
  icon: string
  title: string
  shortDescription: string
  heroImage?: string
  lang: Lang
}

const ServiceHero: React.FC<ServiceHeroProps> = ({
  icon,
  title,
  shortDescription,
  heroImage,
  lang
}) => {
  // Placeholder premium - gradiente com ícone do serviço
  const placeholderStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #0a0f1a 0%, #1a1f2e 50%, #0a0f1a 100%)',
    position: 'relative',
    overflow: 'hidden'
  }

  return (
    <div 
      className="relative mb-16 overflow-hidden rounded-2xl group" 
      style={{ 
        minHeight: '50vh',
        border: '1px solid rgba(201, 35, 55, 0.4)', /* Borda mais visível - opacity 40% */
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 24px rgba(201, 35, 55, 0.1)' /* Sombra premium + glow vermelho sutil */
      }}
    >
      {/* Background Image ou Placeholder */}
      <div className="absolute inset-0">
        {heroImage ? (
          <>
            <img
              src={heroImage}
              alt={title}
              className="h-full w-full object-cover"
              style={{ opacity: 0.25 }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/80 to-slate-950/95" />
          </>
        ) : (
          <div style={placeholderStyle}>
            {/* Padrão de fundo sutil */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `radial-gradient(circle, rgba(201,35,55,0.3) 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
              }}
            />
            {/* Ícone grande no fundo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[200px] md:text-[300px] opacity-10" style={{ filter: 'blur(20px)' }}>
                {icon}
              </span>
            </div>
            {/* Gradiente overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/95 via-slate-900/90 to-slate-950/95" />
          </div>
        )}
        
        {/* Gradiente direcional para texto legível */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950/90" />
      </div>

      {/* Conteúdo sobreposto */}
      <div className="relative z-10 flex min-h-[50vh] flex-col justify-end p-8 md:p-12 lg:p-16">
        <div className="max-w-4xl">
          {/* Ícone e Título */}
          <div className="mb-6 flex items-center gap-6">
            <span className="text-6xl md:text-7xl lg:text-8xl">{icon}</span>
            <h1 className="font-handel text-4xl font-bold uppercase tracking-tight text-white md:text-5xl lg:text-6xl xl:text-7xl">
              {title}
            </h1>
          </div>
          
          {/* Descrição curta */}
          <p className="mb-4 max-w-3xl text-lg leading-relaxed text-white/90 md:text-xl lg:text-2xl">
            {shortDescription}
          </p>
          
          {/* Linha vermelha elegante - segue largura do texto acima com fade nas extremidades */}
          <div 
            className="mt-6"
            style={{ 
              width: '100%', /* Segue a largura do container do texto (max-w-3xl) */
              height: '3px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(201, 35, 55, 0.3) 15%, #c92337 30%, #e84858 50%, #c92337 70%, rgba(201, 35, 55, 0.3) 85%, transparent 100%)',
              boxShadow: '0 0 12px rgba(201, 35, 55, 0.5), 0 0 20px rgba(232, 72, 88, 0.25)',
              borderRadius: '2px'
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ServiceHero
