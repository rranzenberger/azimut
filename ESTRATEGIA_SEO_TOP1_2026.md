# 🚀 ESTRATÉGIA SEO TOP 1 - GOOGLE & BUSCADORES DE IA

**Data:** Janeiro 2026  
**Objetivo:** Aparecer em **PRIMEIRO LUGAR** no Google e buscadores de IA (Perplexity, ChatGPT, etc)

---

## 🎯 ESTRATÉGIA MULTI-CAMADA

### **CAMADA 1: SEO TÉCNICO (Fundação)**

#### ✅ 1.1 Core Web Vitals (Google Ranking Factor)
- **LCP (Largest Contentful Paint)**: < 2.5s ✅
- **FID (First Input Delay)**: < 100ms ✅
- **CLS (Cumulative Layout Shift)**: < 0.1 ✅
- **FCP (First Contentful Paint)**: < 1.8s ✅

**Status:** ✅ Já otimizado (Vite + Code Splitting)

#### ✅ 1.2 Mobile-First Indexing
- ✅ Responsive design completo
- ✅ Viewport meta tag
- ✅ Touch-friendly (48px+ targets)

#### ✅ 1.3 HTTPS & Security
- ✅ HTTPS obrigatório (Vercel)
- ✅ HSTS headers
- ✅ Security headers (CSP, X-Frame-Options)

---

### **CAMADA 2: SEO PARA BUSCADORES DE IA (2026)**

#### 🆕 2.1 Estrutura para IA (Perplexity, ChatGPT, Gemini)

**Buscadores de IA leem:**
1. **Schema.org JSON-LD** (prioridade máxima)
2. **Conteúdo semântico** (HTML5 tags)
3. **FAQ Schema** (respostas diretas)
4. **Article Schema** (conteúdo estruturado)

**Implementar:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Azimut",
  "description": "Estúdio especializado em experiências imersivas VR/AR, cinema interativo e agenciamento educacional para Vancouver (VFS/VanArts)",
  "url": "https://azmt.com.br",
  "logo": "https://azmt.com.br/logo.png",
  "sameAs": [
    "https://instagram.com/azimut",
    "https://linkedin.com/company/azimut"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "BR",
    "addressLocality": "Rio de Janeiro"
  },
  "offers": {
    "@type": "Offer",
    "category": "Services",
    "name": "Experiências Imersivas VR/AR"
  }
}
```

#### 🆕 2.2 FAQ Schema (Rich Snippets)

**Por que funciona:**
- Google mostra FAQs diretamente nos resultados
- Buscadores de IA usam FAQs como fonte de verdade
- Aumenta CTR em 30%+

**Implementar em:**
- `/academy/vancouver` (20+ FAQs)
- `/what/*` (cada serviço)
- Home (FAQs gerais)

---

### **CAMADA 3: KEYWORDS ESTRATÉGICAS**

#### 🎯 3.1 Keywords Primárias (Alta Competição)

**PT:**
- `experiências imersivas`
- `realidade virtual Brasil`
- `VR AR XR`
- `estudar Vancouver`
- `VFS VanArts`
- `curso VFX Brasil`
- `produtora VR`

**EN:**
- `immersive experiences`
- `VR AR XR experiences`
- `study Vancouver`
- `VFS VanArts`
- `VFX courses`
- `virtual reality production`

**FR:**
- `expériences immersives`
- `réalité virtuelle`
- `étudier Vancouver`
- `VFS VanArts`

**ES:**
- `experiencias inmersivas`
- `realidad virtual`
- `estudiar Vancouver`
- `VFS VanArts`

#### 🎯 3.2 Long-Tail Keywords (Menos Competição)

**Exemplos:**
- `como estudar cinema no Canadá`
- `melhor agente educacional VFS Vancouver`
- `curso VFX com certificação internacional`
- `produtora VR para museus`
- `experiências imersivas para eventos`

---

### **CAMADA 4: CONTENT SEO**

#### 📝 4.1 E-E-A-T (Expertise, Experience, Authoritativeness, Trust)

**Implementar:**
1. **Author Bio** em cada página de serviço
2. **Case Studies** detalhados (Work)
3. **Testimonials** com Schema.org
4. **Awards/Credentials** destacados
5. **30 anos de experiência** em destaque

#### 📝 4.2 Conteúdo Long-Form

**Páginas com 2000+ palavras:**
- `/academy/vancouver` ✅ (já tem)
- `/what/cinema-audiovisual` (expandir)
- `/what/museus-exposicoes` (expandir)
- `/studio/credibilidade` (expandir)

---

### **CAMADA 5: BACKLINKS E AUTORIDADE**

#### 🔗 5.1 Estratégia de Backlinks

**Prioridade 1:**
- VFS.edu (link oficial)
- VanArts.ca (link oficial)
- Autodesk.com (parceiro histórico)
- Museu Olímpico (projeto)

**Prioridade 2:**
- Portais de educação (Study in Canada)
- Blogs de VR/AR
- Diretórios de produtoras
- Press releases

#### 🔗 5.2 Guest Posts

**Temas:**
- "Como estudar cinema no Canadá"
- "Futuro do VR em museus"
- "IA generativa em produção audiovisual"

---

### **CAMADA 6: LOCAL SEO**

#### 📍 6.1 Google Business Profile

**Criar/Atualizar:**
- Nome: "Azimut - Experiências Imersivas"
- Categoria: "Produtora Audiovisual"
- Endereço: Rio de Janeiro
- Horário de funcionamento
- Fotos dos projetos
- Reviews de clientes

#### 📍 6.2 Schema LocalBusiness

```json
{
  "@type": "LocalBusiness",
  "name": "Azimut",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Rio de Janeiro",
    "addressCountry": "BR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "-22.9068",
    "longitude": "-43.1729"
  }
}
```

---

### **CAMADA 7: PERFORMANCE SEO**

#### ⚡ 7.1 Velocidade (Ranking Factor)

**Já implementado:**
- ✅ Code splitting
- ✅ Lazy loading
- ✅ Image optimization
- ✅ Service Worker (cache)

**Melhorar:**
- [ ] Preload critical fonts
- [ ] Prefetch next page
- [ ] CDN para assets estáticos

#### ⚡ 7.2 Core Web Vitals Monitoring

**Ferramentas:**
- Google Search Console
- PageSpeed Insights
- Vercel Analytics

---

## 🎯 IMPLEMENTAÇÃO PRIORITÁRIA

### **FASE 1: URGENTE (Esta Semana)**

1. ✅ **Schema.org completo** em todas as páginas
2. ✅ **FAQ Schema** em Vancouver e serviços
3. ✅ **Sitemap.xml** atualizado (com idiomas)
4. ✅ **Robots.txt** otimizado
5. ✅ **Meta descriptions** ricas em keywords

### **FASE 2: IMPORTANTE (Próximas 2 Semanas)**

6. **Google Search Console** configurado
7. **Google Business Profile** criado
8. **Backlinks** estratégicos (VFS, VanArts)
9. **Content expansion** (2000+ palavras por página)
10. **Rich Snippets** (Reviews, Ratings)

### **FASE 3: OTIMIZAÇÃO (Próximo Mês)**

11. **Guest posts** em blogs relevantes
12. **Press releases** para projetos
13. **Video SEO** (YouTube embeds com Schema)
14. **Social signals** (compartilhamentos)
15. **A/B testing** de títulos/descriptions

---

## 📊 MÉTRICAS DE SUCESSO

### **KPIs Mensais:**

- **Posição média:** Top 3 para keywords primárias
- **CTR:** > 5% (atual: ~2%)
- **Impressões:** +50% mês a mês
- **Backlinks:** +10 por mês
- **Core Web Vitals:** 100% "Good"

---

## 🔍 FERRAMENTAS RECOMENDADAS

1. **Google Search Console** (gratuito)
2. **Google Analytics 4** (já configurado)
3. **Ahrefs** ou **SEMrush** (backlinks)
4. **PageSpeed Insights** (performance)
5. **Schema.org Validator** (structured data)

---

## 🚀 PRÓXIMOS PASSOS

1. **Implementar Schema.org completo** (hoje)
2. **Atualizar sitemap.xml** (hoje)
3. **Configurar Google Search Console** (amanhã)
4. **Criar Google Business Profile** (amanhã)
5. **Expandir conteúdo** (esta semana)

---

**Status:** 🟢 **PRONTO PARA IMPLEMENTAÇÃO**
