import React from 'react'

export const AnimatedLogo: React.FC = () => {
  return (
    <div className="animated-logo-container">
      {/* TEMPORÁRIO: Usando SVG até termos os vídeos convertidos */}
      <img 
        src="/logo-azimut-star.svg" 
        alt="Azimut Star" 
        className="animated-logo-static"
      />
      
      <style>{`
        .animated-logo-container {
          pointer-events: none;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .animated-logo-static {
          width: 100%;
          height: 100%;
          object-fit: contain;
          
          /* Glow vermelho Azimut */
          filter: 
            drop-shadow(0 0 30px rgba(201, 35, 55, 0.6)) 
            drop-shadow(0 0 60px rgba(201, 35, 55, 0.3));
          
          opacity: 0.95;
          
          /* Animação sutil de pulse */
          animation: pulse-glow 4s ease-in-out infinite;
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            filter: 
              drop-shadow(0 0 30px rgba(201, 35, 55, 0.6)) 
              drop-shadow(0 0 60px rgba(201, 35, 55, 0.3));
            transform: scale(1);
          }
          50% {
            filter: 
              drop-shadow(0 0 40px rgba(201, 35, 55, 0.8)) 
              drop-shadow(0 0 80px rgba(201, 35, 55, 0.4));
            transform: scale(1.02);
          }
        }
      `}</style>
    </div>
  )
}

