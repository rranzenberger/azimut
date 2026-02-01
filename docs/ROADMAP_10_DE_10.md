# 🎯 ROADMAP: Site Azimut 10/10 - Padrão Premium 2026

> **Objetivo**: Transformar o site azimut.art em uma referência de excelência técnica e experiência imersiva, alinhado com o que a empresa vende (XR/VR/IA).

---

## 📊 AVALIAÇÃO ATUAL

### Nota Atual: 7.5/10

| Critério | Nota | Status |
|----------|------|--------|
| Tecnologia & Stack | 8/10 | ✅ React 18, Vite 5, Tailwind 4 |
| PWA & Offline | 9/10 | ✅ Manifest, SW, Install Prompt |
| Analytics & Tracking | 9/10 | ✅ GA4, Plausible, Web Vitals, Custom |
| IA & Chatbot | 8/10 | ✅ Claude, DeepSeek, AI Router |
| SEO & Schema.org | 8/10 | ✅ 16 arquivos com structured data |
| Performance | 7/10 | 🟡 Falta otimização de imagens |
| Acessibilidade | 6/10 | 🟡 SkipLink existe, falta WCAG completo |
| Animações | 6/10 | 🟡 GSAP básico, falta micro-interações |
| **WebGL/3D** | 2/10 | 🔴 Não implementado |
| **Experiência Imersiva** | 3/10 | 🔴 Não demonstra o que vende |

---

## 🚀 FASE 1: FUNDAÇÃO (Semana 1-2)
**Meta: 8.0/10**

### 1.1 Otimização de Imagens
- [ ] Converter todas imagens para WebP/AVIF
- [ ] Implementar srcset responsivo
- [ ] Configurar CDN (Vercel Image Optimization)
- [ ] Lazy loading nativo em todas as imagens

```bash
# Ferramentas sugeridas
npm install sharp
# ou usar Vercel Image Optimization (automático)
```

### 1.2 Performance Core Web Vitals
- [ ] Lighthouse 95+ em todas as páginas
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] INP < 200ms
- [ ] Implementar resource hints (preconnect, dns-prefetch)

### 1.3 Acessibilidade WCAG 2.1 AA
- [ ] Auditoria completa com axe-core
- [ ] ARIA labels em todos elementos interativos
- [ ] Focus visible em todos focusable
- [ ] Suporte a `prefers-reduced-motion`
- [ ] Alt text otimizado em todas imagens
- [ ] Contraste de cores validado
- [ ] Navegação por teclado completa

```typescript
// Exemplo: prefers-reduced-motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

### 1.4 Meta Tags & SEO Avançado
- [ ] Verificar todos os OG tags
- [ ] Implementar Twitter Cards
- [ ] Rich snippets para cursos e projetos
- [ ] FAQ schema em todas as páginas relevantes

---

## 🎨 FASE 2: EXPERIÊNCIA VISUAL (Semana 3-4)
**Meta: 8.5/10**

### 2.1 Micro-interações Premium
- [ ] Instalar Framer Motion
- [ ] Hover effects sofisticados em cards
- [ ] Transições de página suaves
- [ ] Loading states animados
- [ ] Feedback visual em formulários

```bash
npm install framer-motion
```

### 2.2 Animações Avançadas
- [ ] Scroll-triggered animations em seções
- [ ] Parallax sutil no hero
- [ ] Animação de entrada em elementos
- [ ] Logo animada otimizada (já existe, verificar)

### 2.3 View Transitions API
- [ ] Implementar transições entre páginas
- [ ] Animação de navegação suave
- [ ] Fallback para browsers antigos

```typescript
// Exemplo View Transitions
document.startViewTransition(() => {
  // navegação
});
```

### 2.4 Tema & Design System
- [ ] Documentar design tokens
- [ ] Variáveis CSS organizadas
- [ ] Componentes com estados claros
- [ ] Dark/Light mode polido

---

## 🌐 FASE 3: EXPERIÊNCIA IMERSIVA (Semana 5-8)
**Meta: 9.5/10**

### 3.1 WebGL na Homepage
- [ ] Instalar Three.js + React Three Fiber
- [ ] Background interativo com partículas/estrelas
- [ ] Reage ao movimento do mouse
- [ ] Fallback para dispositivos sem suporte
- [ ] Otimizado para mobile (simplificado)

```bash
npm install three @react-three/fiber @react-three/drei
```

```typescript
// Exemplo: Background com estrelas
import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'

const Background3D = () => (
  <Canvas>
    <Stars radius={100} depth={50} count={5000} factor={4} />
  </Canvas>
)
```

### 3.2 Logo 3D Interativa
- [ ] Logo Azimut em 3D (estrela)
- [ ] Rotação suave no hover
- [ ] Efeito glow/bloom
- [ ] Fallback para imagem estática

### 3.3 Portfolio 3D Preview
- [ ] Cards de projeto com preview 3D
- [ ] Modelo 3D do projeto no hover
- [ ] WebGL viewer para projetos VR/AR
- [ ] Lazy load de modelos 3D

### 3.4 WebAR Preview (Avançado)
- [ ] QR Code para ver projetos em AR
- [ ] Integração com 8th Wall ou AR.js
- [ ] Preview de projetos 3D no celular
- [ ] Marcador para experiência AR

---

## 🤖 FASE 4: IA & PERSONALIZAÇÃO (Semana 9-10)
**Meta: 10/10**

### 4.1 Chatbot Aprimorado
- [ ] Suporte a voz (Web Speech API)
- [ ] Reconhecimento de intenção avançado
- [ ] Respostas contextualizadas por página
- [ ] Lead scoring baseado em conversa

### 4.2 Personalização de Conteúdo
- [ ] Recomendações baseadas em comportamento
- [ ] Conteúdo adaptativo por interesse
- [ ] A/B testing automatizado
- [ ] Histórico de navegação (privacidade)

### 4.3 IA Generativa
- [ ] Preview de projetos com IA (text-to-image)
- [ ] Descrições dinâmicas de projetos
- [ ] Sugestões inteligentes de serviços

---

## 📱 FASE 5: PWA AVANÇADO (Semana 11-12)
**Meta: 10/10**

### 5.1 Background Sync
- [ ] Sincronização de formulários offline
- [ ] Retry automático de envios

### 5.2 Push Notifications (Opcional)
- [ ] Notificações de novos conteúdos
- [ ] Alertas de promoções/eventos
- [ ] Opt-in granular

### 5.3 Share Target
- [ ] Compartilhar conteúdo para o app
- [ ] Deep links funcionais

---

## 📋 CHECKLIST TÉCNICO COMPLETO

### Infraestrutura
- [x] HTTPS/HSTS (Vercel automático)
- [x] CDN (Vercel Edge Network)
- [x] Deploy automático (GitHub → Vercel)
- [ ] Staging environment
- [ ] Error tracking (Sentry)

### Performance
- [x] Code splitting (React.lazy)
- [x] Tree shaking (Vite)
- [x] Minificação (Terser)
- [ ] Critical CSS inline
- [ ] Bundle analyzer

### SEO
- [x] Sitemap.xml
- [x] Robots.txt
- [x] Schema.org (16 arquivos)
- [x] OG Image
- [ ] Sitemap dinâmico (se necessário)

### Acessibilidade
- [x] SkipLink
- [ ] ARIA completo
- [ ] Focus management
- [ ] Screen reader testing
- [ ] Keyboard-only navigation

### Analytics
- [x] Google Analytics 4
- [x] Plausible Analytics
- [x] Web Vitals
- [x] Custom tracking
- [ ] Heatmaps (Hotjar/Clarity)

### PWA
- [x] Manifest.json
- [x] Service Worker
- [x] Install Prompt
- [x] Offline page
- [ ] Background Sync

### IA/ML
- [x] Claude Assistant
- [x] AI Router
- [x] Intent Detection
- [ ] Voice input
- [ ] Predictive analytics

### 3D/WebGL
- [ ] Three.js
- [ ] React Three Fiber
- [ ] 3D Background
- [ ] 3D Logo
- [ ] WebAR

---

## 📅 CRONOGRAMA RESUMIDO

| Fase | Duração | Entrega | Nota Esperada |
|------|---------|---------|---------------|
| 1. Fundação | 2 semanas | Imagens, Performance, A11y | 8.0/10 |
| 2. Visual | 2 semanas | Animações, Micro-interações | 8.5/10 |
| 3. Imersivo | 4 semanas | WebGL, 3D, AR Preview | 9.5/10 |
| 4. IA | 2 semanas | Personalização, Voz | 10/10 |
| 5. PWA+ | 2 semanas | Sync, Push, Share | 10/10 |

**Total: ~12 semanas para 10/10**

---

## 💰 ESTIMATIVA DE RECURSOS

### Bibliotecas Necessárias
```bash
# Fase 2 - Animações
npm install framer-motion

# Fase 3 - WebGL
npm install three @react-three/fiber @react-three/drei
npm install postprocessing  # efeitos visuais

# Fase 4 - IA
# Já temos Claude API, pode precisar de upgrade de plano

# Fase 5 - PWA
# Nativo, sem dependências adicionais
```

### Serviços Externos (Opcional)
- **Sentry**: Error tracking ($26/mês)
- **Hotjar/Clarity**: Heatmaps (gratuito/pago)
- **8th Wall**: WebAR ($99/mês developer)

---

## 🎯 PRIORIDADES IMEDIATAS (Esta Semana)

1. **Otimização de Imagens** - Maior impacto em performance
2. **Acessibilidade Básica** - ARIA labels nos elementos principais
3. **Instalar Framer Motion** - Preparar para animações
4. **Lighthouse Audit** - Baseline de performance

---

## ✅ MÉTRICAS DE SUCESSO

| Métrica | Atual | Meta |
|---------|-------|------|
| Lighthouse Performance | ~70 | 95+ |
| Lighthouse Accessibility | ~80 | 100 |
| Lighthouse SEO | ~90 | 100 |
| Lighthouse PWA | ~90 | 100 |
| Core Web Vitals | Bom | Excelente |
| WCAG Compliance | Parcial | AA |
| 3D/WebGL | Não | Sim |
| Nota Geral | 7.5/10 | 10/10 |

---

## 📝 NOTAS FINAIS

O site atual já tem uma **base sólida** com:
- Stack moderna (React 18, Vite 5, Tailwind 4)
- PWA completo
- Analytics avançado
- IA/Chatbot integrado
- SEO bem estruturado

O que falta para **10/10** é principalmente:
1. **Experiência imersiva** (WebGL/3D) - demonstrar o que vendemos
2. **Acessibilidade completa** - WCAG 2.1 AA
3. **Otimização de imagens** - WebP/AVIF
4. **Animações premium** - micro-interações sofisticadas

A maior lacuna é a **dissonância** entre o que vendemos (XR/VR/IA) e o que o site demonstra. Implementar WebGL/3D resolverá isso.

---

*Documento criado em: 2026-02-01*
*Última atualização: 2026-02-01*
*Autor: Cursor AI + Equipe Azimut*
