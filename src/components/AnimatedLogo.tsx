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
          perspective: 1000px;
        }
        
        .animated-logo {
          width: 200px;
          height: 200px;
          animation: float 6s ease-in-out infinite, rotate3d 12s linear infinite;
          filter: drop-shadow(0 0 30px rgba(201, 35, 55, 0.6)) 
                  drop-shadow(0 0 60px rgba(201, 35, 55, 0.4));
          transition: all 0.3s ease;
        }
        
        .animated-logo:hover {
          filter: drop-shadow(0 0 40px rgba(201, 35, 55, 0.9)) 
                  drop-shadow(0 0 80px rgba(201, 35, 55, 0.6));
          animation: float 3s ease-in-out infinite, rotate3d 6s linear infinite;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateZ(0);
          }
          50% {
            transform: translateY(-20px) translateZ(20px);
          }
        }
        
        @keyframes rotate3d {
          0% {
            transform: rotateY(0deg) rotateZ(0deg);
          }
          50% {
            transform: rotateY(180deg) rotateZ(180deg);
          }
          100% {
            transform: rotateY(360deg) rotateZ(360deg);
          }
        }
        
        @media (max-width: 768px) {
          .animated-logo {
            width: 120px;
            height: 120px;
          }
        }
      `}</style>
    </div>
  )
}

