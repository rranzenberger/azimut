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
      style={{ opacity: opacity, transition: 'opacity 2s ease-in-out' }}
    >
      {/* WebM Alpha (prioridade - melhor qualidade com transparência) */}
      <source src="/azimut-alpha-full.webm" type="video/webm; codecs=vp9" />
      {/* MP4 fallback (se WebM não funcionar) */}
      <source src="/azimut-3d-para-2d.mp4" type="video/mp4" />
      <source src="/azimut 3d para 2d.mp4" type="video/mp4" />
      {/* GIF ultimate fallback */}
      <img src="/logo_azimut_azimut_animago.gif" alt="Azimut Logo Animada" loading="eager" />
    </video>
  );
};

