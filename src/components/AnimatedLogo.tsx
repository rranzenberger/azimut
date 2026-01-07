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
      video.pause(); // Pause the video on the last frame
      setOpacity(1); // Ensure it's fully visible when paused

      pauseTimeout = setTimeout(() => {
        setOpacity(0); // Start fade out
        fadeOutTimeout = setTimeout(() => {
          video.currentTime = 0; // Reset video to start
          setOpacity(1); // Fade back in
          video.play(); // Restart video
        }, 2000); // Fade out duration (2 seconds)
      }, 10000); // Pause duration (10 seconds)
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
        transition: 'opacity 2s ease-in-out',
        mixBlendMode: 'screen', // Luma key: preto vira transparente
        filter: 'drop-shadow(0 0 30px rgba(201, 35, 55, 0.5)) drop-shadow(0 0 60px rgba(201, 35, 55, 0.25))'
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

