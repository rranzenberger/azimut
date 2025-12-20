'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export function AdminLogo() {
  const [logoError, setLogoError] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);

  useEffect(() => {
    // Verificar se a logo existe
    const img = new Image();
    img.onload = () => setLogoLoaded(true);
    img.onerror = () => setLogoError(true);
    img.src = '/logo-topo-site.svg';
  }, []);

  return (
    <Link
      href="/admin"
      style={{
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'inherit',
        minHeight: '40px',
      }}
    >
      {!logoError && logoLoaded ? (
        <img
          src="/logo-topo-site.svg"
          alt="Azimut CMS"
          style={{
            height: '88px',
            width: 'auto',
            display: 'block',
            maxWidth: '100%',
            objectFit: 'contain',
          }}
          onError={() => setLogoError(true)}
        />
      ) : (
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: '#d3cec3',
            lineHeight: 1.2,
            letterSpacing: '-0.5px',
          }}
        >
          Azimut CMS
        </div>
      )}
    </Link>
  );
}

