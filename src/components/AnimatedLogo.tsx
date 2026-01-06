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
        {/* Ordem de preferência: WebM (menor) → MP4 (universal) → MOV (fallback) */}
        <source src="/logo_animada_glow.webm" type="video/webm" />
        <source src="/logo_animada_glow.mp4" type="video/mp4" />
        <source src="/logo_animada_glow.mov" type="video/quicktime" />
        {/* Fallback final: SVG estático */}
        <img src="/logo-azimut-star.svg" alt="Azimut Star" className="animated-logo-video" />
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
          
          /* LUMA KEY via CSS: preto vira transparente ✨ */
          mix-blend-mode: screen;
          
          /* Glow vermelho Azimut */
          filter: 
            drop-shadow(0 0 30px rgba(201, 35, 55, 0.6)) 
            drop-shadow(0 0 60px rgba(201, 35, 55, 0.3));
          
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

