import React from 'react'

export const AnimatedLogo: React.FC = () => {
  return (
    <div className="animated-logo-container">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="animated-logo-video"
      >
        <source src="/logo_animada_glow.mov" type="video/quicktime" />
        {/* Fallback para navegadores que não suportam .mov */}
        Seu navegador não suporta vídeos.
      </video>
      
      <style>{`
        .animated-logo-container {
          pointer-events: none;
          width: 280px;
          height: 280px;
        }
        
        .animated-logo-video {
          width: 100%;
          height: 100%;
          object-fit: contain;
          
          /* LUMA KEY via CSS: preto vira transparente */
          mix-blend-mode: screen;
          
          /* Glow vermelho suave */
          filter: 
            drop-shadow(0 0 30px rgba(201, 35, 55, 0.6)) 
            drop-shadow(0 0 60px rgba(201, 35, 55, 0.3));
          
          /* Leve opacidade para suavizar */
          opacity: 0.9;
        }
        
        /* Responsivo */
        @media (max-width: 1024px) {
          .animated-logo-container {
            width: 200px;
            height: 200px;
          }
        }
        
        @media (max-width: 768px) {
          .animated-logo-container {
            width: 140px;
            height: 140px;
          }
        }
      `}</style>
    </div>
  )
}

