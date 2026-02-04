import React, { useRef, useEffect, useState } from 'react';

/** Logo animada em vídeo: mobile e desktop (como no ponto de controle – chama atenção). */
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
      video.pause();
      setOpacity(1);
      pauseTimeout = setTimeout(() => {
        setOpacity(0);
        fadeOutTimeout = setTimeout(() => {
          video.currentTime = 0;
          setOpacity(1);
          video.play();
        }, 2000);
      }, 10000);
    };

    video.addEventListener('ended', handleEnded);
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
      poster="/logo-azimut-star.svg"
      width={1280}
      height={720}
      aria-hidden="true"
      aria-label="Azimut logo animation"
      className="w-full h-full object-contain pointer-events-none"
      style={{
        opacity: opacity,
        transition: 'opacity 2s ease-in-out',
        mixBlendMode: 'normal',
        filter: 'drop-shadow(0 0 20px rgba(201, 35, 55, 0.6)) drop-shadow(0 0 40px rgba(201, 35, 55, 0.4)) drop-shadow(0 0 80px rgba(201, 35, 55, 0.2))',
        zIndex: 10,
        position: 'relative',
        isolation: 'isolate',
        willChange: 'opacity',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        imageRendering: 'auto',
        WebkitBackfaceVisibility: 'hidden',
        // Impedir que linhas da animação vazem para fora do container
        clipPath: 'inset(0)',
        overflow: 'hidden',
      }}
    >
      <source src="/logo_animada_glow_720p.webm" type="video/webm; codecs=vp9" />
      <source src="/logo_animada_glow.mp4" type="video/mp4" />
      <source src="/logo_animada_glow.mov" type="video/quicktime" />
      <track kind="captions" src="data:text/vtt;base64,V0VCVFRUCg==" srclang="pt" label="Legendas" default />
      <img src="/logo-azimut-star.svg" alt="Azimut Logo Animada" width={720} height={720} loading="eager" />
    </video>
  );
};

