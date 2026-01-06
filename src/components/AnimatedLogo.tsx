import React from 'react'

export const AnimatedLogo: React.FC = () => {
  return (
    <div className="animated-logo-container">
      <div className="animated-logo">
        <img 
          src="/logo-azimut-star.svg" 
          alt="Azimut Star" 
          className="w-full h-full object-contain"
        />
      </div>
      
      <style>{`
        .animated-logo-container {
          perspective: 1500px;
          pointer-events: none;
        }
        
        .animated-logo {
          width: 280px;
          height: 280px;
          animation: 
            floatSmooth 8s ease-in-out infinite,
            rotateGentle 20s linear infinite,
            pulse 4s ease-in-out infinite;
          filter: 
            drop-shadow(0 0 40px rgba(201, 35, 55, 0.5)) 
            drop-shadow(0 0 80px rgba(201, 35, 55, 0.25))
            drop-shadow(0 0 120px rgba(201, 35, 55, 0.15));
          transition: all 0.5s ease;
          opacity: 0.85;
        }
        
        @keyframes floatSmooth {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-15px) translateX(10px);
          }
          66% {
            transform: translateY(-25px) translateX(-8px);
          }
        }
        
        @keyframes rotateGentle {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.75;
            filter: 
              drop-shadow(0 0 35px rgba(201, 35, 55, 0.4)) 
              drop-shadow(0 0 70px rgba(201, 35, 55, 0.2));
          }
          50% {
            opacity: 0.95;
            filter: 
              drop-shadow(0 0 50px rgba(201, 35, 55, 0.6)) 
              drop-shadow(0 0 100px rgba(201, 35, 55, 0.35))
              drop-shadow(0 0 150px rgba(201, 35, 55, 0.2));
          }
        }
        
        @media (max-width: 1024px) {
          .animated-logo {
            width: 200px;
            height: 200px;
          }
        }
        
        @media (max-width: 768px) {
          .animated-logo {
            width: 140px;
            height: 140px;
          }
        }
      `}</style>
    </div>
  )
}

