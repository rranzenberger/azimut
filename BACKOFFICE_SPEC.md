# Backoffice / CMS Specification (Azimut)

Este documento define o modelo de dados, permissões e endpoints sugeridos para um backoffice (headless CMS + API) que alimenta o site. Mantém suporte a múltiplos idiomas (pt, en, es), gestão de assets (imagens/vídeos) e autenticação com usuários/senha.

## 1. Entidades

- **Project (case)**
  - `slug` (string, único)
  - `title_pt`, `title_en`, `title_es` (string)
  - `short_desc_pt`, `short_desc_en`, `short_desc_es` (string)
  - `category` (enum: museums | brands | films | installations | education)
  - `status` (enum: active | in-development)
  - `year` (string opcional)
  - `location` (string opcional)
  - `services` (array de string, ex: ["Cinema & AV", "XR", "Animation", "CAD/Revit", "Creative AI", "Education"])
  - `tags` (array de string, ex: ["museum", "immersive", "interactive", "ai"])
  - `mediaPoster` (file/image URL - WebP/AVIF recomendado)
  - `mediaLoop` (file/video URL - webm/mp4, muted, loop)
  - `links` (obj opcional: `{ video?: string; press?: string }`)

- **Service**
  - `slug` (string, único)
  - `title_pt/en/es`
  - `short_desc_pt/en/es`
  - `icon` (opcional, URL de SVG/Lottie)

- **LabItem**
  - `slug` (string, único)
  - `type` (enum: experiment | workshop | mentoring)
  - `title_pt/en/es`
  - `description_pt/en/es`
  - `media` (opcional, imagem/vídeo curto)

- **HomeSettings (opcional)**
  - `hero_title` (string)
  - `hero_sub_pt/en/es` (string)
  - `pillars` (array de strings por idioma)
  - `why` (array de strings por idioma)
  - `cta_primary_pt/en/es`, `cta_secondary_pt/en/es`

- **ContactSettings**
  - `dest_email` (para recebimento de leads)
  - `whatsapp_link` (opcional)
  - `calendly_link` (opcional)

## 2. Campos de upload (imagens/vídeos)

Recomendado armazenar em bucket (S3/Cloudflare R2/Uploadcare):
- Poster: WebP/AVIF, proporção 16:9 ou 4:5, nomes sugeridos:
  - `poster-museu-rio-olimpico.webp`
  - `poster-gramado-vr-ia.webp`
  - `poster-natal-cultural.webp`
  - `poster-amazonias-possiveis.webp`
  - `poster-van-gogh-la-fontaine.webp`
  - `poster-senna-ativacoes.webp`
  - `poster-vr-amazonia.webp`
  - `poster-first-nation.webp`
- Loop: webm/mp4, 5–8s, muted, loop:
  - `loop-museu-rio-olimpico.webm`
  - `loop-gramado-vr-ia.webm`
  - `loop-natal-cultural.webm`
  - `loop-van-gogh-la-fontaine.webm`
  - `loop-senna-ativacoes.webm`
  - `loop-vr-amazonia.webm`
  - (Amazônias Possíveis: apenas poster/teaser frame)

## 3. Permissões / Usuários

- **Admin**: CRUD em todas as coleções, gestão de usuários.
- **Editor**: CRUD em projects/services/lab; não gerencia usuários.
- **Viewer**: somente leitura (opcional).

Autenticação: username + senha (mínimo 2FA ou pelo menos senha forte). Se usar um CMS headless (Strapi/Directus/Sanity), habilitar roles equivalentes.

## 4. API Sugerida (REST ou GraphQL)

- `GET /api/projects?lang=pt&category=museums&status=active&tags=ai,immersive`
- `GET /api/services?lang=en`
- `GET /api/lab?lang=es`
- `GET /api/home?lang=pt`
- `GET /api/contact`

Filtros:
- `lang`: pt|en|es (fallback en)
- `category`: museums|brands|films|installations|education
- `status`: active|in-development
- `tags`: lista separada por vírgula

## 5. Integração com o front (Vite/React)

- Substituir o uso de `contentModel` por fetch da API. Manter `contentModel` como fallback local.
- Exemplo:
  ```ts
  useEffect(() => {
    fetch(`/api/projects?lang=${lang}`)
      .then(res => res.json())
      .then(setProjects)
      .catch(() => setProjects(contentModel.cases))
  }, [lang])
  ```
- Idem para serviços, lab, home.

## 6. Geo/IP e personalização (leve)

- Usar um serviço de geolocalização (ex.: ipapi.co ou ipgeolocation.io) no backend ou via edge function para resolver país/estado/cidade. Não armazenar IP bruto; apenas país/UF/cidade para ranking de relevância.
- Aplicar apenas ordenação: ex. se `country=BR` e `state=RS`, priorizar Gramado; se `city="Rio Bonito"` priorizar Natal Cultural; se `country=CA` → idioma EN (ou FR se Quebec).
- Cookies de interesse: armazenar tags vistas (`case.tags`) para reordenar destaques; exigir consentimento.

## 7. IA para recomendação (opcional)

- Simples: reordenar por frequência de tags acessadas + geo.
- Avançado: endpoint `/api/reco` que recebe `tagsRecentes`, `geo`, `lang` e retorna uma lista ordenada de projects. Implementar no backend para não expor lógica/chaves.

## 8. Upload e validação

- Validar tamanho: imagens <= 1MB quando possível; vídeos curtos <= 6–8MB.
- Converter/otimizar no upload (ex.: hooks de CMS para gerar WebP e mp4/webm).
- Campos obrigatórios: slug, title_pt/en/es, short_desc_pt/en/es, category, status.

## 9. Deploy e segurança

- HTTPS obrigatório.
- CORS restrito ao domínio do site.
- Rate limit básico em /api.
- Sem chaves de geolocalização/IA expostas no front; usar proxy/backend.

## 10. Estrutura mínima de coleções (exemplo em JSON)

```json
{
  "projects": [
    {
      "slug": "museu-rio-olimpico",
      "title_pt": "Museu Rio Olímpico",
      "title_en": "Rio Olympic Museum",
      "title_es": "Museo Olímpico de Río",
      "short_desc_pt": "Direção de tecnologia, audiovisual e arte; conteúdos imersivos e sinalização digital.",
      "short_desc_en": "Tech, AV and art direction; immersive content and digital wayfinding.",
      "short_desc_es": "Dirección de tecnología, audiovisual y arte; contenidos inmersivos y señalización digital.",
      "category": "museums",
      "status": "active",
      "year": "2024–2025",
      "location": "Rio de Janeiro, BR",
      "services": ["Cinema & AV", "XR", "Animation", "CAD/Revit"],
      "tags": ["museum", "immersive", "interactive", "ux"],
      "mediaPoster": "https://cdn.example.com/poster-museu-rio-olimpico.webp",
      "mediaLoop": "https://cdn.example.com/loop-museu-rio-olimpico.webm",
      "links": {
        "video": "https://vimeo.com/...",
        "press": "https://oglobo.com/..."
      }
    }
  ]
}
```

## 11. Usuários e senha

- Criar usuários via painel do CMS; exigir senha forte e 2FA se disponível.
- Manter logs de auditoria para alterações de conteúdo.












