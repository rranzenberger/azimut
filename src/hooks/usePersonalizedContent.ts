/**
 * Hook para Personalização de Conteúdo
 * Busca perfil do visitante e personaliza experiência baseado em IA
 */

import { useState, useEffect, useMemo } from 'react';

export interface VisitorProfile {
  // Identificação
  sessionId: string;
  visitorType: 'CURIOUS' | 'INTERESTED' | 'HIGH_POTENTIAL' | 'HOT_LEAD' | 'GOVERNMENT' | 'CURATOR' | 'BRAND' | 'FESTIVAL' | 'EDUCATION' | 'TECH';
  visitorTypeLabel: string;
  confidence: number;

  // Scores de interesse (0-100)
  interestScores: {
    museums: number;
    brands: number;
    festivals: number;
    cities: number;
    education: number;
    research: number;
    vr: number;
    ai: number;
    installations: number;
  };

  // Score de conversão
  conversionScore: number;
  isQualifiedLead: boolean;
  isHotLead: boolean;

  // Recomendações
  recommendedProjects: Array<{
    id: string;
    slug: string;
    title: string;
    summary: string;
    type: string;
    tags: string[];
    heroImage?: string;
  }>;
  recommendedServices: Array<{
    id: string;
    slug: string;
    title: string;
    summary: string;
    icon?: string;
  }>;
  recommendedEditais: Array<{
    id: string;
    name: string;
    country: string;
    deadline: Date | null;
  }>;

  // Sugestões
  suggestedAction: string;
  suggestedPage: string;

  // Comportamento
  behavior: {
    pagesVisited: number;
    projectsViewed: number;
    timeOnSite: number;
    country: string | null;
    language: string | null;
  };

  // Lead info
  lead: {
    id: string;
    name: string;
    email: string;
    status: string;
  } | null;
}

interface UsePersonalizedContentReturn {
  profile: VisitorProfile | null;
  loading: boolean;
  error: string | null;
  
  // Helpers
  recommendedProjects: VisitorProfile['recommendedProjects'];
  recommendedServices: VisitorProfile['recommendedServices'];
  recommendedEditais: VisitorProfile['recommendedEditais'];
  
  // Personalização de conteúdo
  heroMessage: string;
  heroSubtitle: string;
  ctaText: string;
  ctaLink: string;
  
  // Flags úteis
  shouldShowChatbot: boolean;
  shouldShowEditais: boolean;
  shouldShowAdvancedContent: boolean;
}

const API_URL = import.meta.env.VITE_BACKOFFICE_URL || 'https://backoffice.azmt.com.br';

// Helper para obter sessionId (compatível com useUserTracking)
function getSessionId(): string | null {
  if (typeof window === 'undefined') return null;
  
  const stored = localStorage.getItem('azimut_user_session');
  if (stored) {
    try {
      const session = JSON.parse(stored);
      return session.sessionId || null;
    } catch {
      return null;
    }
  }
  return null;
}

export function usePersonalizedContent(): UsePersonalizedContentReturn {
  const [profile, setProfile] = useState<VisitorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sessionId = getSessionId();
    
    if (!sessionId) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    // Buscar perfil do visitante
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${API_URL}/api/visitor/profile?sessionId=${sessionId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            // Timeout de 5s
            signal: AbortSignal.timeout(5000),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (!cancelled && data.profile) {
          setProfile(data.profile);
        } else if (!cancelled) {
          // Perfil não encontrado ainda (sessão nova)
          setProfile(null);
        }
      } catch (err: any) {
        if (!cancelled) {
          // Não mostrar erro se for timeout ou cancelamento
          if (err.name !== 'AbortError' && err.name !== 'TimeoutError') {
            console.warn('Erro ao buscar perfil personalizado:', err);
            setError(err.message);
          }
          setProfile(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    // Aguardar um pouco antes de buscar (para ter dados de tracking)
    const timer = setTimeout(fetchProfile, 2000);

    // Re-buscar a cada 30s para atualizar perfil
    const interval = setInterval(fetchProfile, 30000);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [sessionId]);

  // Helpers para personalização
  const heroMessage = useMemo(() => {
    if (!profile) return 'Experiências que Conectam Mundos';

    switch (profile.visitorType) {
      case 'GOVERNMENT':
        return 'Projetos Imersivos para Espaços Culturais Públicos';
      case 'CURATOR':
        return 'Curadoria Digital e Experiências Museológicas';
      case 'BRAND':
        return 'Experiências Imersivas que Conectam Marcas e Audiências';
      case 'FESTIVAL':
        return 'Instalações Interativas para Festivais e Eventos';
      case 'EDUCATION':
        return 'Educação Imersiva e Workshops';
      case 'HIGH_POTENTIAL':
      case 'HOT_LEAD':
        return 'Projetos Personalizados para Sua Necessidade';
      default:
        return 'Experiências que Conectam Mundos';
    }
  }, [profile]);

  const heroSubtitle = useMemo(() => {
    if (!profile) return 'Criamos experiências imersivas entre Brasil e Canadá.';

    switch (profile.visitorType) {
      case 'GOVERNMENT':
        return 'Museus digitais, exposições imersivas e projetos culturais com suporte a editais (Rouanet, CMF, NFB).';
      case 'CURATOR':
        return 'Tecnologias de curadoria digital, VR para cultura e acervos digitais interativos.';
      case 'BRAND':
        return 'Ativações de marca, experiências VR/AR e projetos que engajam audiências.';
      case 'FESTIVAL':
        return 'Instalações interativas, mapeamento de projeção e experiências imersivas para eventos.';
      case 'EDUCATION':
        return 'Workshops, cursos e projetos educacionais com tecnologias imersivas.';
      default:
        return 'Criamos experiências imersivas entre Brasil e Canadá.';
    }
  }, [profile]);

  const ctaText = useMemo(() => {
    if (!profile) return 'Iniciar um Projeto';

    switch (profile.visitorType) {
      case 'GOVERNMENT':
        return 'Falar sobre Editais Culturais';
      case 'CURATOR':
        return 'Conhecer Projetos de Museus';
      case 'HIGH_POTENTIAL':
      case 'HOT_LEAD':
        return 'Agendar Reunião';
      default:
        return 'Iniciar um Projeto';
    }
  }, [profile]);

  const ctaLink = useMemo(() => {
    if (!profile) return '/contact';

    switch (profile.visitorType) {
      case 'GOVERNMENT':
        return '/contact?interest=editais';
      case 'CURATOR':
        return '/work?filter=museums';
      case 'HIGH_POTENTIAL':
      case 'HOT_LEAD':
        return '/contact?priority=high';
      default:
        return '/contact';
    }
  }, [profile]);

  // Flags para mostrar/ocultar elementos
  const shouldShowChatbot = useMemo(() => {
    return profile?.conversionScore ? profile.conversionScore > 75 : false;
  }, [profile]);

  const shouldShowEditais = useMemo(() => {
    return profile?.visitorType === 'GOVERNMENT' || 
           profile?.visitorType === 'CURATOR' ||
           (profile?.interestScores.museums || 0) > 50 ||
           (profile?.interestScores.cities || 0) > 50;
  }, [profile]);

  const shouldShowAdvancedContent = useMemo(() => {
    return profile?.conversionScore ? profile.conversionScore > 60 : false;
  }, [profile]);

  return {
    profile,
    loading,
    error,
    
    // Recomendações diretas
    recommendedProjects: profile?.recommendedProjects || [],
    recommendedServices: profile?.recommendedServices || [],
    recommendedEditais: profile?.recommendedEditais || [],
    
    // Conteúdo personalizado
    heroMessage,
    heroSubtitle,
    ctaText,
    ctaLink,
    
    // Flags
    shouldShowChatbot,
    shouldShowEditais,
    shouldShowAdvancedContent,
  };
}

