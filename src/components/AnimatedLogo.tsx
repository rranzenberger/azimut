import React, { useRef, useEffect, useState } from 'react';

export const AnimatedLogo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [opacity, setOpacity] = useState(1);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let pauseTimeout: NodeJS.Timeout | undefined;
    let fadeOutTimeout: NodeJS.Timeout | undefined;
    let fadeInTimeout: NodeJS.Timeout | undefined;

    const handleEnded = () => {
      // Comportamento igual ao desktop:
      // 1. Pausa no último frame
      video.pause();
      setOpacity(1); // Garante visibilidade no último frame
      
      // 2. Espera 10 segundos (pausa)
      pauseTimeout = setTimeout(() => {
        // 3. Fade out por 2 segundos
        setOpacity(0);
        
        fadeOutTimeout = setTimeout(() => {
          // 4. Reset e fade in por 2 segundos
          video.currentTime = 0; // Reset para início
          setOpacity(1); // Fade in
          video.play(); // Reinicia animação
        }, 2000); // Fade out: 2s
      }, 10000); // Pausa: 10s
    };

    video.addEventListener('ended', handleEnded);

    // Cleanup function
    return () => {
      video.removeEventListener('ended', handleEnded);
      if (pauseTimeout) clearTimeout(pauseTimeout);
      if (fadeOutTimeout) clearTimeout(fadeOutTimeout);
      if (fadeInTimeout) clearTimeout(fadeInTimeout);
    };
  }, [key]);

  return (
    <video
      key={key}
      ref={videoRef}
      autoPlay
      muted
      playsInline
      preload="auto"
      className="w-full h-full object-contain pointer-events-none"
      style={{ 
        opacity: opacity, 
        transition: 'opacity 2s ease-in-out', // Fade de 2s (igual desktop)
        mixBlendMode: 'lighten', // Preto vira transparente, cores ficam visíveis (melhor que screen)
        filter: 'drop-shadow(0 0 20px rgba(201, 35, 55, 0.6)) drop-shadow(0 0 40px rgba(201, 35, 55, 0.4)) drop-shadow(0 0 80px rgba(201, 35, 55, 0.2))',
        zIndex: 10,
        position: 'relative',
        isolation: 'isolate',
        willChange: 'opacity'
      }}
    >
      {/* WebM VP9 720p com chroma key (otimizado para 720px uso real) */}
      <source src="/logo_animada_glow_720p.webm" type="video/webm; codecs=vp9" />
      {/* MP4 H.264 com chroma key (Safari/iOS compatível) */}
      <source src="/logo_animada_glow.mp4" type="video/mp4" />
      {/* MOV original (fallback final) */}
      <source src="/logo_animada_glow.mov" type="video/quicktime" />
      {/* SVG ultimate fallback */}
      <img src="/logo-azimut-star.svg" alt="Azimut Logo Animada" loading="eager" />
    </video>
  );
};

