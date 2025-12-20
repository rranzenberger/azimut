# 🚀 GUIA DE INTEGRAÇÃO - Site Azimut + CMS

## Como integrar o CMS no site principal (Vite + React)

### 1. Instalar dependências no site principal

```bash
cd ../  # Voltar para azimut-site-vite-tailwind
npm install uuid
```

### 2. Criar arquivo de tracking comportamental

Criar: `src/utils/analytics.ts`

```typescript
/**
 * Sistema de tracking comportamental silencioso
 * Envia dados para o CMS analisar com IA
 */

import { v4 as uuidv4 } from 'uuid';

const API_URL = import.meta.env.VITE_CMS_API_URL || 'http://localhost:3001/api';

// Gerar ou recuperar sessionId
function getSessionId(): string {
  let sessionId = sessionStorage.getItem('azimut_session_id');
  if (!sessionId) {
    sessionId = uuidv4();
    sessionStorage.setItem('azimut_session_id', sessionId);
  }
  return sessionId;
}

// Track page view
export async function trackPageView(pageSlug: string) {
  const sessionId = getSessionId();
  const startTime = Date.now();

  // Quando o usuário sair da página, enviar tempo gasto
  const sendData = () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const scrollDepth = Math.floor(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );

    fetch(`${API_URL}/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        event: 'page_view',
        data: {
          pageSlug,
          timeSpent,
          scrollDepth,
        },
      }),
    }).catch(console.error);
  };

  // Enviar dados ao sair da página
  window.addEventListener('beforeunload', sendData);
  
  // Enviar dados também ao trocar de rota (SPA)
  return () => {
    sendData();
    window.removeEventListener('beforeunload', sendData);
  };
}

// Track project interaction
export async function trackProjectInteraction(
  projectSlug: string,
  type: 'VIEW' | 'CLICK' | 'HOVER'
) {
  const sessionId = getSessionId();

  fetch(`${API_URL}/track`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId,
      event: 'project_interaction',
      data: {
        projectSlug,
        type,
      },
    }),
  }).catch(console.error);
}

// Submit lead
export async function submitLead(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  description?: string;
}) {
  const sessionId = getSessionId();

  const response = await fetch(`${API_URL}/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId,
      ...data,
      source: {
        url: window.location.href,
        referrer: document.referrer,
      },
    }),
  });

  return response.json();
}

export { getSessionId };
```

### 3. Criar hook para consumir conteúdo do CMS

Criar: `src/hooks/useAzimutContent.ts`

```typescript
import { useState, useEffect } from 'react';
import { getSessionId } from '../utils/analytics';

const API_URL = import.meta.env.VITE_CMS_API_URL || 'http://localhost:3001/api';

interface ContentOptions {
  page?: string;
  autoDetectGeo?: boolean;
}

export function useAzimutContent(options: ContentOptions = {}) {
  const { page = 'home', autoDetectGeo = true } = options;
  
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    async function fetchContent() {
      try {
        setLoading(true);
        
        // 1. Detectar idioma do navegador
        const browserLang = navigator.language.startsWith('pt') ? 'pt' :
                           navigator.language.startsWith('fr') ? 'fr' :
                           navigator.language.startsWith('es') ? 'es' : 'en';
        
        // Verificar se usuário já escolheu idioma manualmente
        const savedLang = localStorage.getItem('azimut-lang');
        const lang = savedLang || browserLang;
        
        // 2. Detectar país (se habilitado)
        let country = 'DEFAULT';
        
        if (autoDetectGeo) {
          try {
            const geoRes = await fetch(`${API_URL}/geo`);
            const geoData = await geoRes.json();
            if (geoData.detected) {
              country = geoData.country;
            }
          } catch (err) {
            console.warn('Geo detection failed, using default');
          }
        }
        
        // 3. Buscar conteúdo (com sessionId para personalização)
        const sessionId = getSessionId();
        const contentRes = await fetch(
          `${API_URL}/public/content?lang=${lang}&country=${country}&page=${page}&sessionId=${sessionId}`
        );
        
        if (!contentRes.ok) {
          throw new Error('Failed to fetch content');
        }
        
        const data = await contentRes.json();
        setContent(data);
        
      } catch (err) {
        setError(err as Error);
        console.error('Content fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchContent();
  }, [page, autoDetectGeo]);
  
  return { content, loading, error };
}
```

### 4. Atualizar componentes do site

#### `src/pages/Home.tsx`

```typescript
import { useEffect } from 'react';
import { useAzimutContent } from '../hooks/useAzimutContent';
import { trackPageView } from '../utils/analytics';

export default function Home() {
  const { content, loading } = useAzimutContent({ page: 'home' });

  useEffect(() => {
    const cleanup = trackPageView('home');
    return cleanup;
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      {/* Hero personalizado por mercado */}
      {content?.market?.heroMessage && (
        <p className="market-message">{content.market.heroMessage}</p>
      )}

      {/* Projetos personalizados por geo + comportamento */}
      <div className="projects-grid">
        {content?.highlightProjects?.map((project: any) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
```

#### `src/components/ProjectCard.tsx`

```typescript
import { trackProjectInteraction } from '../utils/analytics';

export function ProjectCard({ project }: { project: any }) {
  const handleClick = () => {
    trackProjectInteraction(project.slug, 'CLICK');
  };

  const handleHover = () => {
    trackProjectInteraction(project.slug, 'HOVER');
  };

  return (
    <div 
      className="project-card" 
      onClick={handleClick}
      onMouseEnter={handleHover}
    >
      {/* Imagem otimizada */}
      <picture>
        {project.heroImage?.avif && (
          <source srcSet={project.heroImage.avif} type="image/avif" />
        )}
        {project.heroImage?.webp && (
          <source srcSet={project.heroImage.webp} type="image/webp" />
        )}
        <img 
          src={project.heroImage?.large}
          alt={project.heroImage?.alt}
          loading="lazy"
        />
      </picture>

      <h3>{project.title}</h3>
      <p>{project.summary}</p>

      <div className="tags">
        {project.tags.map((tag: string) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </div>
  );
}
```

#### `src/pages/Contact.tsx`

```typescript
import { useState } from 'react';
import { submitLead } from '../utils/analytics';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    description: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await submitLead(formData);
      if (result.success) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Lead submission failed:', error);
    }
  };

  if (submitted) {
    return <div>✅ Obrigado! Entraremos em contato em breve.</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <select
        value={formData.projectType}
        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
      >
        <option value="">Tipo de Projeto</option>
        <option value="museu">Museu / Centro Cultural</option>
        <option value="cidade">Cidade / Prefeitura</option>
        <option value="marca">Marca / Ativação</option>
        <option value="festival">Festival / Evento</option>
        <option value="educacao">Educação / Pesquisa</option>
      </select>
      <select
        value={formData.budget}
        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
      >
        <option value="">Orçamento</option>
        <option value="< 50k">&lt; R$ 50k</option>
        <option value="50-100k">R$ 50-100k</option>
        <option value="100-500k">R$ 100-500k</option>
        <option value="> 500k">&gt; R$ 500k</option>
      </select>
      <textarea
        placeholder="Conte mais sobre seu projeto..."
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />
      <button type="submit">Enviar</button>
    </form>
  );
}
```

### 5. Configurar variáveis de ambiente

Criar: `.env.local` no site principal

```bash
VITE_CMS_API_URL=http://localhost:3001/api
# Em produção: https://admin.azimut.com.br/api
```

### 6. O que acontece nos bastidores

1. **Usuário entra no site** →
   - Sistema detecta país via IP
   - Sistema detecta idioma do navegador
   - Gera sessionId único

2. **Site carrega conteúdo** →
   - Chama API `/public/content` com lang + country + sessionId
   - CMS retorna conteúdo personalizado por geo
   - Se já tem comportamento gravado, retorna recomendações da IA

3. **Usuário navega** →
   - Cada página visitada é rastreada (tempo, scroll)
   - Cada projeto visualizado é rastreado
   - IA vai calculando scores de interesse

4. **IA identifica perfil** →
   - "Esse visitante é um curador de museu" (70% confiança)
   - "Recomendo mostrar projetos X, Y, Z"
   - "Sugiro direcionar para página de Portfolio"

5. **Usuário preenche formulário** →
   - Lead é criado com TODO o contexto comportamental
   - Email é enviado para equipe com análise da IA
   - Lead é priorizado automaticamente (LOW/MEDIUM/HIGH/URGENT)

## ✅ Checklist de Implementação

- [ ] Instalar dependências no site
- [ ] Criar `src/utils/analytics.ts`
- [ ] Criar `src/hooks/useAzimutContent.ts`
- [ ] Atualizar componente Home
- [ ] Atualizar componente Contact
- [ ] Adicionar tracking em todas as páginas
- [ ] Configurar `.env.local`
- [ ] Testar fluxo completo
- [ ] Deploy do CMS
- [ ] Deploy do site atualizado

## 🎯 Resultado

**Sem o usuário perceber**, você vai:
- Identificar se é curador, secretário de cultura, organizador de festival, etc.
- Mostrar os projetos mais relevantes para ele
- Capturar leads com contexto completo
- Priorizar automaticamente os melhores leads
- Ter analytics poderosos sem cookies invasivos

**Tudo com IA, tudo open source com DeepSeek!** 🚀




















