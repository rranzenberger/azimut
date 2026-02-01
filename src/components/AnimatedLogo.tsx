import React, { useRef, useEffect, useState } from 'react';

/** No mobile: mostra só poster (sem vídeo) para LCP rápido. No desktop: vídeo completo. */
function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)').matches : true
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const fn = () => setIsMobile(mq.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);
  return isMobile;
}

export const AnimatedLogo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [opacity, setOpacity] = useState(1);
  const [key, setKey] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;
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
  }, [key, isMobile]);

  // Mobile: só poster (melhor LCP, evita ~2MB de vídeo)
  if (isMobile) {
    return (
      <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
        <img
          src="/logo-azimut-star.svg"
          alt="Azimut"
          width={720}
          height={720}
          loading="eager"
          fetchPriority="high"
          className="w-full h-full object-contain pointer-events-none"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(201, 35, 55, 0.6)) drop-shadow(0 0 40px rgba(201, 35, 55, 0.4))',
          }}
        />
      </div>
    );
  }

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
      className="w-full h-full object-contain pointer-events-none"
      style={{ 
        opacity: opacity, 
        transition: 'opacity 2s ease-in-out', // Fade de 2s (igual desktop)
        mixBlendMode: 'normal', // Removido blend mode para evitar artefatos
        filter: 'drop-shadow(0 0 20px rgba(201, 35, 55, 0.6)) drop-shadow(0 0 40px rgba(201, 35, 55, 0.4)) drop-shadow(0 0 80px rgba(201, 35, 55, 0.2))',
        zIndex: 10,
        position: 'relative',
        isolation: 'isolate',
        willChange: 'opacity',
        transform: 'translateZ(0)', // Force GPU acceleration
        backfaceVisibility: 'hidden', // Previne flickering
        imageRendering: 'auto', // Renderização suave
        WebkitBackfaceVisibility: 'hidden' // Safari
      }}
    >
      {/* WebM VP9 720p com chroma key (otimizado para 720px uso real) */}
      <source src="/logo_animada_glow_720p.webm" type="video/webm; codecs=vp9" />
      {/* MP4 H.264 com chroma key (Safari/iOS compatível) */}
      <source src="/logo_animada_glow.mp4" type="video/mp4" />
      {/* MOV original (fallback final) */}
      <source src="/logo_animada_glow.mov" type="video/quicktime" />
      {/* Legendas (vazio = vídeo decorativo/mudo; Lighthouse/ a11y) */}
      <track kind="captions" src="data:text/vtt;base64,V0VCVFRUCg==" srclang="pt" label="Legendas" default />
      {/* SVG ultimate fallback */}
      <img src="/logo-azimut-star.svg" alt="Azimut Logo Animada" width={720} height={720} loading="eager" />
    </video>
  );
};

