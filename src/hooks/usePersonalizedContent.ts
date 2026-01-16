/**
 * Hook para Personalização de Conteúdo
 * VERSÃO ROBUSTA - NUNCA causa erro #310
 * 
 * Estratégia: Hooks são SEMPRE chamados na mesma ordem
 * Se backoffice falhar, retorna valores padrão
 */

import { useState, useEffect, useRef, useMemo } from 'react';

// ⚠️ PERSONALIZAÇÃO DESABILITADA TEMPORARIAMENTE
// Quando o backoffice estiver pronto, mudar para true
const PERSONALIZATION_ENABLED = false;

export interface VisitorProfile {
  sessionId: string;
  visitorType: 'CURIOUS' | 'INTERESTED' | 'HIGH_POTENTIAL' | 'HOT_LEAD' | 'GOVERNMENT' | 'CURATOR' | 'BRAND' | 'FESTIVAL' | 'EDUCATION' | 'TECH';
  visitorTypeLabel: string;
  confidence: number;
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
  conversionScore: number;
  isQualifiedLead: boolean;
  isHotLead: boolean;
  recommendedProjects: Array<{
    id: string;
    slug: string;
    title: string;
    summary: string;
    type: string;
    tags: string[];
    heroImage?: {
      original: string;
      thumbnail: string | null;
      medium: string | null;
      large: string | null;
      webp: string | null;
      avif: string | null;
    } | null;
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
  suggestedAction: string;
  suggestedPage: string;
  behavior: {
    pagesVisited: number;
    projectsViewed: number;
    timeOnSite: number;
    country: string | null;
    language: string | null;
  };
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
  recommendedProjects: VisitorProfile['recommendedProjects'];
  recommendedServices: VisitorProfile['recommendedServices'];
  recommendedEditais: VisitorProfile['recommendedEditais'];
  heroMessage: string;
  heroSubtitle: string;
  ctaText: string;
  ctaLink: string;
  shouldShowChatbot: boolean;
  shouldShowEditais: boolean;
  shouldShowAdvancedContent: boolean;
}

export function usePersonalizedContent(): UsePersonalizedContentReturn {
  // ⚠️ TODOS os hooks SEMPRE no topo, SEMPRE chamados (mesmo que não usados)
  const [profile, setProfile] = useState<VisitorProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(true);

  // Cleanup
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Fetch effect - SEMPRE executa, mas é no-op se desabilitado
  useEffect(() => {
    // Se personalização desabilitada, não faz nada
    if (!PERSONALIZATION_ENABLED) {
      setProfile(null);
      setLoading(false);
      setError(null);
      return;
    }

    // Personalização habilitada - buscar perfil
    // ... código de fetch aqui quando reativar ...
  }, []);

  // Memos SEMPRE chamados (valores padrão se profile null)
  const heroMessage = useMemo(() => {
    return 'Experiências que Conectam Mundos';
  }, []);

  const heroSubtitle = useMemo(() => {
    return 'Criamos experiências imersivas entre Brasil e Canadá.';
  }, []);

  const ctaText = useMemo(() => {
    return 'Iniciar um Projeto';
  }, []);

  const ctaLink = useMemo(() => {
    return '/contact';
  }, []);

  const shouldShowChatbot = useMemo(() => false, []);
  const shouldShowEditais = useMemo(() => false, []);
  const shouldShowAdvancedContent = useMemo(() => false, []);

  return {
    profile,
    loading,
    error,
    recommendedProjects: [],
    recommendedServices: [],
    recommendedEditais: [],
    heroMessage,
    heroSubtitle,
    ctaText,
    ctaLink,
    shouldShowChatbot,
    shouldShowEditais,
    shouldShowAdvancedContent,
  };
}
