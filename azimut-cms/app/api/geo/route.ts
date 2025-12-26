/**
 * API de Geolocalização
 * Detecta país do visitante via IP
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Opção 1: Usando Cloudflare (se o site estiver lá)
  const cfCountry = request.headers.get('cf-ipcountry');
  
  // Opção 2: Usando Vercel (se hospedar na Vercel)
  const vercelGeo = request.geo;
  
  // Opção 3: Fallback via IP público
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
              request.headers.get('x-real-ip') ||
              'unknown';
  
  let countryCode = cfCountry || vercelGeo?.country || 'DEFAULT';
  
  // Se não detectou e temos IP, tenta via ipapi.co (gratuito até 30k req/mês)
  if (countryCode === 'DEFAULT' && ip !== 'unknown') {
    try {
      const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`, {
        headers: { 'User-Agent': 'azimut-cms/1.0' },
      });
      
      if (geoResponse.ok) {
        const geoData = await geoResponse.json();
        countryCode = geoData.country_code || 'DEFAULT';
      }
    } catch (error) {
      console.error('Geo detection failed:', error);
    }
  }
  
  return NextResponse.json({
    country: countryCode,
    region: vercelGeo?.region,
    city: vercelGeo?.city,
    ip: ip !== 'unknown' ? ip.substring(0, 7) + '***' : 'unknown', // Privacy
    detected: countryCode !== 'DEFAULT',
  });
}
























