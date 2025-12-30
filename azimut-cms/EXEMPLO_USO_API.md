# 📘 EXEMPLO DE USO - API PÚBLICA DO BACKOFFICE

## 🎯 **RESUMO**

A API pública permite que o **site principal** (azmt.com.br) consuma conteúdo do **backoffice** (backoffice.azmt.com.br) em **4 idiomas** (PT, EN, ES, FR).

---

## 🔗 **ENDPOINT**

```
GET https://backoffice.azmt.com.br/api/public/page/{slug}
```

### **Exemplos de URLs:**
- `https://backoffice.azmt.com.br/api/public/page/home`
- `https://backoffice.azmt.com.br/api/public/page/studio/about`
- `https://backoffice.azmt.com.br/api/public/page/academy/courses`

---

## 📦 **RESPOSTA (JSON)**

```json
{
  "slug": "home",
  "name": "Home",
  "seo": {
    "pt": {
      "title": "Azimut - Experiências Imersivas | Cinema, XR, IA",
      "description": "Criamos experiências imersivas que conectam mundos..."
    },
    "en": {
      "title": "Azimut - Immersive Experiences | Cinema, XR, AI",
      "description": "We create immersive experiences that connect worlds..."
    },
    "es": {
      "title": "Azimut - Experiencias Inmersivas | Cine, XR, IA",
      "description": "Creamos experiencias inmersivas que conectan mundos..."
    },
    "fr": {
      "title": "Azimut - Expériences Immersives | Cinéma, XR, IA",
      "description": "Nous créons des expériences immersives..."
    }
  },
  "hero": {
    "pt": {
      "slogan": "Experiências que Conectam Mundos",
      "subtitle": "Após 30 anos explorando diferentes caminhos..."
    },
    "en": {
      "slogan": "Experiences that Connect Worlds",
      "subtitle": "After 30 years exploring different paths..."
    },
    "es": {
      "slogan": "Experiencias que Conectan Mundos",
      "subtitle": "Tras 30 años explorando diferentes caminos..."
    },
    "fr": {
      "slogan": "Expériences qui Connectent les Mondes",
      "subtitle": "Après 30 ans à explorer différents chemins..."
    }
  },
  "updatedAt": "2025-12-30T22:15:00.000Z"
}
```

---

## 💻 **USO NO SITE PRINCIPAL (React/Vite)**

### **1. Hook Simples (`useBackofficeContent`)**

```typescript
import { useBackofficeContent } from '@/hooks/useBackofficeContent'

function HomePage({ lang }: { lang: 'pt' | 'en' | 'es' | 'fr' }) {
  const { page, loading } = useBackofficeContent('home', lang)

  // Fallback para conteúdo local se API falhar
  const heroSlogan = page?.hero.slogan || 'Experiências que Conectam Mundos'
  const heroSubtitle = page?.hero.subtitle || 'Após 30 anos...'

  return (
    <div>
      <h1>{heroSlogan}</h1>
      <p>{heroSubtitle}</p>
    </div>
  )
}
```

---

### **2. Hook Helper (`useBackofficeText`)**

Uso ainda mais simples com fallback integrado:

```typescript
import { useBackofficeText } from '@/hooks/useBackofficeContent'

function HomePage({ lang }: { lang: 'pt' | 'en' | 'es' | 'fr' }) {
  const heroSlogan = useBackofficeText(
    'home',
    lang,
    'heroSlogan',
    'Experiências que Conectam Mundos' // Fallback
  )

  const heroSubtitle = useBackofficeText(
    'home',
    lang,
    'heroSubtitle',
    'Após 30 anos explorando...' // Fallback
  )

  return (
    <div>
      <h1>{heroSlogan}</h1>
      <p>{heroSubtitle}</p>
    </div>
  )
}
```

---

### **3. Fetch Direto (sem hook)**

Se preferir usar fetch direto:

```typescript
async function fetchPageContent(slug: string, lang: string) {
  try {
    const res = await fetch(
      `https://backoffice.azmt.com.br/api/public/page/${slug}`
    )
    
    if (!res.ok) throw new Error('Page not found')
    
    const data = await res.json()
    
    return {
      heroSlogan: data.hero[lang]?.slogan,
      heroSubtitle: data.hero[lang]?.subtitle,
      seoTitle: data.seo[lang]?.title,
      seoDescription: data.seo[lang]?.description,
    }
  } catch (err) {
    console.warn('Backoffice API failed, using fallback')
    return null
  }
}
```

---

## 🔄 **FLUXO DE FALLBACK**

```
┌────────────────────┐
│  Site tenta buscar │
│  do Backoffice     │
└──────┬─────────────┘
       │
       ├─ ✅ Sucesso?
       │   └─> Usa conteúdo do Backoffice
       │
       └─ ❌ Falha?
           └─> Usa conteúdo local (content.ts)
```

**Vantagens:**
- ✅ Site **nunca quebra** se API falhar
- ✅ Conteúdo atualizado **sem deploy**
- ✅ SEO mantido (fallback sempre disponível)

---

## 🚀 **PÁGINAS DISPONÍVEIS**

Todas as 11 páginas do site:

| Slug | Nome | Descrição |
|------|------|-----------|
| `home` | Home | Página principal |
| `what` | Soluções | O que fazemos |
| `work` | Projetos | Portfolio |
| `studio` | Estúdio | Sobre o estúdio |
| `studio/about` | Sobre | História |
| `studio/team` | Equipe | Time |
| `academy` | Academy | Academy home |
| `academy/research` | Pesquisa | Pesquisa & Inovação |
| `academy/courses` | Cursos | Cursos & Workshops |
| `academy/corporate` | Corporate | Treinamento Corporativo |
| `contact` | Contato | Formulário de contato |

---

## 🔒 **SEGURANÇA E PERFORMANCE**

### **CORS Habilitado**
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET
```

### **Cache HTTP**
```
Cache-Control: public, s-maxage=300, stale-while-revalidate=600
```
- Cache de **5 minutos** (300s)
- Stale-while-revalidate de **10 minutos** (600s)

### **Apenas Páginas Publicadas**
A API só retorna páginas com `status: PUBLISHED`.

---

## ✅ **TESTES**

### **Teste Manual (Browser/Postman)**

```bash
curl https://backoffice.azmt.com.br/api/public/page/home
```

Resposta esperada: JSON com 4 idiomas.

### **Teste no Site**

1. Abra o console do navegador (F12)
2. Acesse: https://azmt.com.br
3. Verifique logs:
   ```
   ✅ [Backoffice] Conteúdo carregado: home (pt)
   ```

---

## 📝 **PRÓXIMAS MELHORIAS**

- [ ] Cache local (localStorage) para reduzir requests
- [ ] Retry automático se API falhar
- [ ] Prefetch de páginas no hover dos links
- [ ] Analytics de uso da API

---

## 🆘 **SUPORTE**

Se a API não funcionar:
1. Verifique se Vercel está online: https://backoffice.azmt.com.br
2. Teste o endpoint diretamente no navegador
3. Verifique logs do console (F12)
4. Site sempre tem fallback local ✅

