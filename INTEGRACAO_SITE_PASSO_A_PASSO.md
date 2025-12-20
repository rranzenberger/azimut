# 🔌 INTEGRAÇÃO DO CMS NO SITE - GUIA PRÁTICO

## 📋 Checklist de Integração

- [ ] 1. Criar variável de ambiente
- [ ] 2. Atualizar Home.tsx com CMS
- [ ] 3. Adicionar tracking em todas páginas
- [ ] 4. Atualizar Contact.tsx com captura de leads
- [ ] 5. Testar localmente
- [ ] 6. Deploy

---

## 1️⃣ Criar Variável de Ambiente

**Criar arquivo:** `.env.local` na raiz do projeto

```bash
# CMS API URL
VITE_CMS_API_URL=http://localhost:3001/api

# Em produção, usar:
# VITE_CMS_API_URL=https://admin.azimut.com.br/api
```

**⚠️ Importante:** Adicione `.env.local` no `.gitignore` (já está)

---

## 2️⃣ Atualizar Home.tsx

**Arquivo:** `src/pages/Home.tsx`

### Mudanças:

1. **Importar hook e tracking:**

```typescript
// No topo do arquivo, adicionar:
import { useAzimutContent } from '../hooks/useAzimutContent'
import { trackPageView } from '../utils/analytics'
```

2. **Usar conteúdo do CMS:**

```typescript
const Home: React.FC<HomeProps> = ({ lang }) => {
  // ... código existente ...
  
  // ADICIONAR: Buscar conteúdo do CMS
  const { content, loading } = useAzimutContent({ 
    page: 'home',
    autoDetectGeo: true  // Detecta país automaticamente
  })
  
  // ADICIONAR: Tracking da página
  useEffect(() => {
    const cleanup = trackPageView('home')
    return cleanup
  }, [])
  
  // MODIFICAR: Usar projetos do CMS ao invés de contentModel
  useEffect(() => {
    if (content?.highlightProjects) {
      // Converter formato do CMS para formato local
      const cmsProjects = content.highlightProjects.map((p: any) => ({
        slug: p.slug,
        title: { pt: p.summary || p.title, en: p.title, es: p.title },
        shortDescription: { pt: p.summary, en: p.summary, es: p.summary },
        category: p.tags[0] || 'Projeto',
        status: 'active',
        services: p.tags,
        location: `${p.city}, ${p.country}`,
        mediaPoster: p.heroImage?.large,
      }))
      setRecommended(cmsProjects)
    }
  }, [content])
  
  // ... resto do código ...
}
```

### Código completo atualizado:

```typescript
import React, { useEffect, useState } from 'react'
import { t, type Lang } from '../i18n'
import SEO, { seoData } from '../components/SEO'
import contentModel from '../data/content'
import { useAzimutContent } from '../hooks/useAzimutContent'
import { trackPageView } from '../utils/analytics'

interface HomeProps {
  lang: Lang
}

const Home: React.FC<HomeProps> = ({ lang }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [recommended, setRecommended] = useState(() => contentModel.cases.slice(0, 3))
  
  // ✨ NOVO: Buscar conteúdo do CMS
  const { content, loading } = useAzimutContent({ 
    page: 'home',
    autoDetectGeo: true 
  })
  
  const locale = (entry: { pt: string; en: string; es: string }) => {
    if (lang === 'fr') return entry.en
    return entry[lang as 'pt' | 'en' | 'es'] || entry.en
  }
  
  // ✨ NOVO: Tracking da página
  useEffect(() => {
    const cleanup = trackPageView('home')
    return cleanup
  }, [])
  
  // Detectar tema (código existente)
  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme') as 'dark' | 'light' | null
    setTheme(currentTheme === 'light' ? 'light' : 'dark')
    
    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.getAttribute('data-theme') as 'dark' | 'light' | null
      setTheme(newTheme === 'light' ? 'light' : 'dark')
    })
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    })
    
    return () => observer.disconnect()
  }, [])
  
  const seo = seoData.home[lang]

  // ✨ MODIFICADO: Usar projetos do CMS
  useEffect(() => {
    if (content?.highlightProjects && content.highlightProjects.length > 0) {
      console.log('🎯 Projetos personalizados do CMS:', content.highlightProjects.length)
      
      // Converter formato do CMS para formato local
      const cmsProjects = content.highlightProjects.map((p: any) => ({
        slug: p.slug,
        title: { 
          pt: p.title, 
          en: p.title, 
          es: p.title 
        },
        shortDescription: { 
          pt: p.summary || p.title, 
          en: p.summary || p.title, 
          es: p.summary || p.title 
        },
        category: p.tags?.[0] || 'Projeto',
        status: 'active',
        services: p.tags || [],
        location: p.city ? `${p.city}, ${p.country}` : p.country,
        mediaPoster: p.heroImage?.large || p.heroImage?.medium,
        mediaLoop: null,
      }))
      
      setRecommended(cmsProjects)
    } else if (!loading) {
      // Fallback para dados estáticos se CMS não responder
      const geo = { country: 'BR', state: '', city: '' }
      const tagsRecentes: string[] = []
      const recs = getRecommendations({ 
        lang: lang === 'fr' ? 'en' : lang as 'pt' | 'en' | 'es', 
        geo, 
        tagsRecentes, 
        max: 3 
      })
      setRecommended(recs)
    }
  }, [content, loading, lang])

  // ... resto do código permanece igual ...
  
  return (
    <>
      <SEO 
        lang={lang}
        title={seo.title}
        description={seo.description}
        path="/"
      />
      
      {/* ✨ NOVO: Mensagem personalizada por mercado */}
      {content?.market?.heroMessage && (
        <div className="mx-auto max-w-5xl px-3 sm:px-4 md:px-6 pt-4">
          <p className="text-center text-sm text-azimut-red/80 animate-fade-in-up">
            {content.market.heroMessage}
          </p>
        </div>
      )}
      
      <main className="relative">
        {/* ... resto do código permanece igual ... */}
      </main>
    </>
  )
}

export default Home
```

---

## 3️⃣ Adicionar Tracking em Todas as Páginas

### Work.tsx

```typescript
import { useEffect } from 'react'
import { trackPageView, trackProjectInteraction } from '../utils/analytics'

const Work: React.FC<WorkProps> = ({ lang }) => {
  // Tracking da página
  useEffect(() => {
    const cleanup = trackPageView('portfolio')
    return cleanup
  }, [])
  
  // ... resto do código ...
  
  // Ao renderizar cards de projetos, adicionar tracking:
  const handleProjectClick = (slug: string) => {
    trackProjectInteraction(slug, 'CLICK')
  }
  
  const handleProjectHover = (slug: string) => {
    trackProjectInteraction(slug, 'HOVER')
  }
  
  return (
    <div>
      {projects.map(project => (
        <div 
          key={project.slug}
          onClick={() => handleProjectClick(project.slug)}
          onMouseEnter={() => handleProjectHover(project.slug)}
        >
          {/* conteúdo do card */}
        </div>
      ))}
    </div>
  )
}
```

### Studio.tsx, Research.tsx, Academy.tsx

```typescript
import { useEffect } from 'react'
import { trackPageView } from '../utils/analytics'

const Studio: React.FC<StudioProps> = ({ lang }) => {
  useEffect(() => {
    const cleanup = trackPageView('studio')
    return cleanup
  }, [])
  
  // ... resto do código ...
}
```

### Contact.tsx - IMPORTANTE!

```typescript
import { useState } from 'react'
import { submitLead } from '../utils/analytics'
import { trackPageView } from '../utils/analytics'

const Contact: React.FC<ContactProps> = ({ lang }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Tracking
  useEffect(() => {
    const cleanup = trackPageView('contact')
    return cleanup
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const result = await submitLead(formData)
      
      if (result.success) {
        setSubmitted(true)
        console.log('✅ Lead capturado:', result.leadId)
      } else {
        setError('Erro ao enviar. Tente novamente.')
      }
    } catch (err) {
      console.error('Lead submission failed:', err)
      setError('Erro ao enviar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-green-500 mb-4">
          ✅ {lang === 'pt' ? 'Mensagem enviada!' : 'Message sent!'}
        </h2>
        <p className="text-slate-300">
          {lang === 'pt' 
            ? 'Entraremos em contato em breve.' 
            : "We'll get back to you soon."}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6">
      <input
        type="text"
        placeholder={lang === 'pt' ? 'Nome' : 'Name'}
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        className="w-full p-3 mb-4 rounded border border-slate-600 bg-slate-800 text-white"
      />
      
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        className="w-full p-3 mb-4 rounded border border-slate-600 bg-slate-800 text-white"
      />
      
      <input
        type="tel"
        placeholder={lang === 'pt' ? 'Telefone (opcional)' : 'Phone (optional)'}
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        className="w-full p-3 mb-4 rounded border border-slate-600 bg-slate-800 text-white"
      />
      
      <input
        type="text"
        placeholder={lang === 'pt' ? 'Empresa (opcional)' : 'Company (optional)'}
        value={formData.company}
        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        className="w-full p-3 mb-4 rounded border border-slate-600 bg-slate-800 text-white"
      />
      
      <select
        value={formData.projectType}
        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
        className="w-full p-3 mb-4 rounded border border-slate-600 bg-slate-800 text-white"
      >
        <option value="">{lang === 'pt' ? 'Tipo de Projeto' : 'Project Type'}</option>
        <option value="museu">{lang === 'pt' ? 'Museu / Centro Cultural' : 'Museum / Cultural Center'}</option>
        <option value="cidade">{lang === 'pt' ? 'Cidade / Prefeitura' : 'City / Government'}</option>
        <option value="marca">{lang === 'pt' ? 'Marca / Ativação' : 'Brand / Activation'}</option>
        <option value="festival">{lang === 'pt' ? 'Festival / Evento' : 'Festival / Event'}</option>
        <option value="educacao">{lang === 'pt' ? 'Educação / Pesquisa' : 'Education / Research'}</option>
      </select>
      
      <select
        value={formData.budget}
        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
        className="w-full p-3 mb-4 rounded border border-slate-600 bg-slate-800 text-white"
      >
        <option value="">{lang === 'pt' ? 'Orçamento (opcional)' : 'Budget (optional)'}</option>
        <option value="< 50k">&lt; R$ 50k</option>
        <option value="50-100k">R$ 50-100k</option>
        <option value="100-500k">R$ 100-500k</option>
        <option value="> 500k">&gt; R$ 500k</option>
      </select>
      
      <textarea
        placeholder={lang === 'pt' ? 'Conte mais sobre seu projeto...' : 'Tell us about your project...'}
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        rows={5}
        className="w-full p-3 mb-4 rounded border border-slate-600 bg-slate-800 text-white"
      />
      
      {error && (
        <p className="text-red-500 mb-4">{error}</p>
      )}
      
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-azimut-red hover:bg-azimut-red/90 text-white font-bold py-3 px-6 rounded transition disabled:opacity-50"
      >
        {loading 
          ? (lang === 'pt' ? 'Enviando...' : 'Sending...') 
          : (lang === 'pt' ? 'Enviar' : 'Send')}
      </button>
    </form>
  )
}
```

---

## 4️⃣ Testar Localmente

### Terminal 1: Iniciar CMS

```bash
cd azimut-cms
npm run dev
# Rodando em http://localhost:3001
```

### Terminal 2: Iniciar Site

```bash
cd ..  # voltar para raiz
npm run dev
# Rodando em http://localhost:5173
```

### Testar Funcionalidades:

1. **Abra o site:** http://localhost:5173
2. **Abra o console do navegador** (F12)
3. **Você deve ver:**
   ```
   🌍 País detectado: BR
   🎯 Projetos personalizados do CMS: 3
   ```

4. **Navegue pelo site:**
   - Vá para Portfolio
   - Clique em alguns projetos
   - Volte para Home

5. **Verifique tracking no terminal do CMS:**
   ```
   POST /api/track 200 (sessão criada)
   GET /api/public/content?lang=pt&country=BR
   ```

6. **Preencha formulário de contato:**
   - Nome: João Silva
   - Email: joao@teste.com
   - Tipo: Museu
   - Enviar

7. **No terminal do CMS você verá:**
   ```
   🎯 Lead qualificado detectado: [sessionId]
   {
     type: 'MUSEUM_CURATOR',
     conversionScore: 65
   }
   📧 Notificação de lead: joao@teste.com
   ```

---

## 5️⃣ Verificar Dados no Banco

```bash
cd azimut-cms
npm run prisma:studio
```

Acesse: http://localhost:5555

**Tabelas para verificar:**
- `VisitorSession` - Ver sua sessão
- `PageView` - Páginas que você visitou
- `InterestScore` - Score calculado pela IA
- `Lead` - Lead que você criou

---

## 6️⃣ Deploy

### CMS (Vercel)

```bash
cd azimut-cms
vercel --prod

# Configure environment variables no dashboard:
# - DATABASE_URL
# - DEEPSEEK_API_KEY
# - SUPABASE_*
# - NEXTAUTH_SECRET
```

Anote a URL: `https://azimut-cms.vercel.app`

### Site (Vercel/Netlify)

1. **Atualizar variável de ambiente:**
   ```bash
   VITE_CMS_API_URL=https://azimut-cms.vercel.app/api
   ```

2. **Deploy:**
   ```bash
   npm run build
   vercel --prod
   ```

---

## ✅ Checklist Final

- [ ] `.env.local` criado
- [ ] Home.tsx atualizado
- [ ] Tracking adicionado em todas páginas
- [ ] Contact.tsx com submitLead
- [ ] CMS rodando (localhost:3001)
- [ ] Site rodando (localhost:5173)
- [ ] Console mostra "🌍 País detectado"
- [ ] Formulário envia lead
- [ ] Terminal CMS mostra notificação
- [ ] Prisma Studio mostra dados
- [ ] Deploy do CMS feito
- [ ] Deploy do site feito

---

## 🆘 Problemas Comuns

### "Failed to fetch content"

**Solução:** Verifique se o CMS está rodando em `localhost:3001`

### "🌍 País detectado: DEFAULT"

**Solução:** Normal em localhost. Em produção, detectará corretamente.

### IA não está funcionando

**Solução:** Normal! O sistema funciona sem IA (usa regras). Para ativar IA:
1. Configure `DEEPSEEK_API_KEY` no CMS
2. A IA rodará em segundo plano (assíncrono)

---

**🎉 Pronto! Site integrado com CMS + IA!**





















