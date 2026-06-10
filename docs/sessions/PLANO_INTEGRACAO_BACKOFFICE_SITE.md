# 🔗 PLANO DE INTEGRAÇÃO BACKOFFICE ↔ SITE

**Data:** 11 Janeiro 2026

---

## 📊 ESTRUTURA DO BACKOFFICE (Prisma Schema)

### MODELOS PRINCIPAIS

| Modelo | Descrição | Usado no Site? |
|--------|-----------|----------------|
| **Project** | Projetos/Portfólio | ✅ Parcial (fallback estático) |
| **Page** | Páginas (Home, What, etc) | ✅ Parcial |
| **Section** | Seções das páginas | ❌ Não integrado |
| **Service** | Serviços oferecidos | ❌ Usa dados estáticos |
| **Media** | Imagens e vídeos | ❌ Não integrado |
| **Tag** | Tags dos projetos | ❌ Não integrado |
| **Market** | Mercados-alvo | ❌ Não integrado |
| **AcademyVideo** | Vídeos VFS/VanArts | ❌ Não integrado |
| **Webinar** | Webinars | ❌ Não integrado |

### MODELOS DE ANALYTICS (Funcionando)
| Modelo | Descrição | Status |
|--------|-----------|--------|
| VisitorSession | Sessões de visitantes | ✅ OK |
| PageView | Visualizações de página | ✅ OK |
| ProjectInteraction | Interações com projetos | ✅ OK |
| InterestScore | Score de interesse | ✅ OK |
| Lead | Leads capturados | ✅ OK |
| PWAInstall | Instalações PWA | ✅ OK |
| VisitorBehavior | Comportamento | ✅ OK |

---

## 🚨 PROBLEMAS IDENTIFICADOS

### 1. BACKOFFICE OFFLINE
```
URL: https://azimut-cms.vercel.app/admin
Status: 404 NOT_FOUND
```
**Ação:** Verificar deploy do backoffice

### 2. DADOS ESTÁTICOS NO SITE
O site usa dados estáticos em:
- `src/data/servicesData.ts` - 16 serviços hardcoded
- `src/pages/Home.tsx` - Projetos fallback
- `src/pages/Work.tsx` - Projetos fallback

### 3. PÁGINAS DE SERVIÇO VAZIAS
- `/what/:slug` → ServiceDetail.tsx
- Usa `getServiceBySlug()` que funciona
- **Problema:** Página renderiza mas pode estar vazia visualmente

---

## 📋 PLANO DE AÇÃO

### FASE 1: CORRIGIR BACKOFFICE (Urgente)
1. [ ] Verificar status do deploy no Vercel
2. [ ] Verificar variáveis de ambiente
3. [ ] Testar conexão com Neon DB
4. [ ] Fazer redeploy se necessário

### FASE 2: POPULAR DADOS NO BACKOFFICE
Criar dados de exemplo para:

#### Projetos (6-10 projetos)
```json
{
  "title": "Museu Olímpico do Rio",
  "slug": "museu-olimpico-rio",
  "summaryPt": "Direção geral e curadoria...",
  "city": "Rio de Janeiro",
  "country": "Brasil",
  "year": 2024,
  "type": "museum",
  "featured": true,
  "heroImage": "placeholder-museum.jpg"
}
```

#### Media (Placeholders)
Usar imagens de placeholder profissionais:
- Unsplash: https://source.unsplash.com/1920x1080/?museum
- Pexels: https://www.pexels.com/
- Ou gerar com IA (Midjourney/DALL-E)

#### Páginas
- Home: heroSlogan, heroSubtitle, demoreel
- What: título, descrição
- Work: título, descrição
- Academy: título, descrição

### FASE 3: INTEGRAR SITE ↔ BACKOFFICE

#### 3.1 Projetos
```typescript
// Atual: Fallback estático
const defaultProjects = useMemo(() => [...], [lang])

// Novo: Buscar do backoffice COM fallback
const { projects, loading } = useBackofficeProjects()
const displayProjects = projects.length > 0 ? projects : defaultProjects
```

#### 3.2 Serviços
```typescript
// Atual: servicesData.ts (estático)
import { servicesData } from '../data/servicesData'

// Novo: Buscar do backoffice COM fallback
const { services } = useBackofficeServices()
const displayServices = services.length > 0 ? services : servicesData
```

#### 3.3 Media
```typescript
// Novo: Componente para imagens do backoffice
<BackofficeImage 
  mediaId={project.heroImageId}
  fallback="/placeholder-project.jpg"
  alt={project.title}
/>
```

---

## 🎨 PLACEHOLDERS VISUAIS

### Imagens Placeholder (Estilo Azimut)

| Tipo | Dimensão | Placeholder |
|------|----------|-------------|
| Hero | 1920x1080 | Gradiente escuro + logo |
| Projeto | 800x600 | Imagem genérica + overlay |
| Serviço | 400x300 | Ícone + cor sólida |
| Thumbnail | 400x300 | Blur + título |

### Cores do Placeholder
```css
/* Gradiente Azimut */
background: linear-gradient(135deg, #0a0e18 0%, #1a1f2e 50%, #0a0e18 100%);

/* Overlay vermelho */
background: linear-gradient(45deg, rgba(201, 35, 55, 0.3), transparent);

/* Texto */
color: #d3cec3; /* Bege claro */
```

---

## 📁 ESTRUTURA DE ARQUIVOS A CRIAR

```
src/
├── components/
│   ├── BackofficeImage.tsx      # Imagem com fallback
│   ├── BackofficeVideo.tsx      # Vídeo com fallback
│   └── PlaceholderProject.tsx   # Card placeholder
│
├── hooks/
│   ├── useBackofficeProjects.ts # Buscar projetos
│   ├── useBackofficeServices.ts # Buscar serviços
│   └── useBackofficeMedia.ts    # Buscar mídia
│
└── data/
    └── placeholders.ts          # URLs de placeholder
```

---

## 🎯 PRIORIDADES

### URGENTE (Fazer Agora)
1. [ ] Verificar/corrigir backoffice
2. [ ] Corrigir páginas vazias (ServiceDetail)
3. [ ] Adicionar rota /academy/research

### ALTA (Esta Semana)
4. [ ] Popular backoffice com dados de exemplo
5. [ ] Criar componentes de placeholder
6. [ ] Integrar projetos do backoffice

### MÉDIA (Próxima Semana)
7. [ ] Integrar serviços do backoffice
8. [ ] Integrar mídia do backoffice
9. [ ] Melhorar visual das páginas

---

## 🔧 COMANDOS ÚTEIS

### Verificar Backoffice
```bash
# Logs do Vercel
vercel logs azimut-cms

# Status do banco
cd azimut-cms
npx prisma db pull
npx prisma studio
```

### Popular Dados
```bash
cd azimut-cms
npx tsx scripts/seed.ts
npx tsx scripts/populate-test-data.ts
```

---

*Documento criado em: 11 Janeiro 2026*
