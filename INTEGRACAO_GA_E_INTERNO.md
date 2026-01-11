# 🔗 INTEGRAÇÃO: GOOGLE ANALYTICS + SISTEMA INTERNO

**Data:** 11/01/2026  
**Status:** ✅ Implementado

---

## 📊 VISÃO GERAL

O site Azimut agora usa **DOIS sistemas de analytics em paralelo**:

| Sistema | Propósito |
|---------|-----------|
| **Google Analytics 4** | Métricas padrão, benchmarks, integrações |
| **Sistema Interno** | Dados custom, fingerprinting, lead scoring |

---

## ✅ ARQUIVOS CRIADOS

### 1. `src/utils/unifiedTracking.ts`
Funções de tracking que enviam para **AMBOS** os sistemas:

```typescript
import { 
  trackEventUnified,
  trackProjectUnified,
  trackCTAUnified,
  trackConversionUnified,
  submitLeadUnified,
  trackPWAUnified,
  trackLanguageUnified,
  trackVideoUnified,
  trackDownloadUnified,
  trackOutboundUnified,
} from '../utils/unifiedTracking'
```

### 2. `src/hooks/useUnifiedTracking.ts`
Hook React que combina tudo:

```typescript
import { useUnifiedTracking } from '../hooks/useUnifiedTracking'

function MyComponent() {
  const { 
    trackEvent,
    trackProject,
    trackCTA,
    trackConversion,
    trackVideo,
    trackDownload,
    trackOutbound,
  } = useUnifiedTracking()

  // Exemplo: Track CTA click
  const handleClick = () => {
    trackCTA('Start Project', 'hero')
  }
}
```

---

## 🎯 EVENTOS TRACKEADOS

| Evento | Google Analytics | Sistema Interno |
|--------|-----------------|-----------------|
| Page View | ✅ Automático | ✅ useUserTracking |
| Project View | ✅ project_interaction | ✅ trackProjectInteraction |
| CTA Click | ✅ user_interaction | ✅ trackCTA |
| Conversion | ✅ conversion_lead | ✅ trackBehavior |
| Video Play | ✅ video_interaction | ✅ trackBehavior |
| Download | ✅ file_download | ✅ trackBehavior |
| Outbound Link | ✅ outbound_link | ✅ trackBehavior |
| PWA Install | ✅ pwa_event | ✅ trackPWAEvent |
| Language Change | ✅ language_change | ✅ trackLanguageChange |
| Scroll Depth | ✅ scroll_depth | ✅ Automático |

---

## ⚙️ CONFIGURAÇÃO

### Google Analytics
Configure a variável de ambiente no Vercel:

```
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Sistema Interno
Já funciona automaticamente, enviando para:
```
https://backoffice.azmt.com.br/api/track
```

---

## 📈 COMO USAR

### 1. Track CTA Click
```typescript
const { trackCTA } = useUnifiedTracking()
trackCTA('Contact Us', 'footer')
```

### 2. Track Project View
```typescript
const { trackProject } = useUnifiedTracking()
trackProject('projeto-x', 'VIEW')
```

### 3. Track Conversion
```typescript
const { trackConversion } = useUnifiedTracking()
trackConversion('lead', 500, { source: 'quiz' })
```

### 4. Track Video
```typescript
const { trackVideo } = useUnifiedTracking()
trackVideo('play', 'video-home-hero')
trackVideo('complete', 'video-home-hero')
```

### 5. Track Download
```typescript
const { trackDownload } = useUnifiedTracking()
trackDownload('portfolio-2024.pdf', 'pdf')
```

### 6. Track Outbound Link
```typescript
const { trackOutbound } = useUnifiedTracking()
trackOutbound('https://instagram.com/azimut', 'Instagram')
```

---

## 🔮 BENEFÍCIOS

### Google Analytics:
- 📊 Relatórios prontos e dashboards
- 🎯 Audiências para remarketing
- 💰 Integração com Google Ads
- 📈 Benchmarks de mercado
- 🌍 Dados demográficos

### Sistema Interno:
- 🆔 Fingerprinting de visitantes anônimos
- 🧠 Lead scoring customizado
- 📊 Dashboard no backoffice
- ⚡ Dados em tempo real
- 🤖 Integração com IA (Claude)
- 📧 Alertas de hot leads

---

## 🚀 PRÓXIMOS PASSOS

1. **Configurar GA no Vercel** (se ainda não tiver)
2. **Implementar eventos custom** onde necessário
3. **Conectar Google Ads** para remarketing
4. **Usar audiências GA** para campanhas

---

## 📋 CHECKLIST

- [x] Google Analytics implementado
- [x] Sistema interno implementado
- [x] Tracking unificado criado
- [x] Hook useUnifiedTracking criado
- [ ] Configurar GA_MEASUREMENT_ID no Vercel
- [ ] Verificar eventos no GA Debug
- [ ] Criar audiências no GA
