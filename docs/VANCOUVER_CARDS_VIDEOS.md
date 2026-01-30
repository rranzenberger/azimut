# Vancouver Magazine – Avaliação dos Cards Lifestyle e Vídeos

**Data:** 29 jan 2026  
**Componente:** `VancouverMagazine.tsx` (tab **Lifestyle**)

---

## 1. Onde os cards “vão” (comportamento)

- Cada card é **clicável**.
- Ao clicar, abre o **vídeo no YouTube** em nova aba (`window.open(card.video, '_blank')`).
- Só há ação se `card.video` existir. Cards **Future** (Marvel, EA, Netflix, etc.) não têm `video` → não abrem nada.

**Resumo:** Os 6 cards **Lifestyle** (Epic Nature, Vibrant Culture, Food Paradise, Diversity, Active Life, Nightlife) levam aos vídeos listados abaixo.

---

## 2. Vídeos atuais × relevância

| Card | Vídeo atual (ID) | Relevância | Observação |
|------|------------------|------------|------------|
| **EPIC NATURE** | `bJMYoj4hHqU` | ❌ Nenhuma | Aula de física (Toronto 1960, reference frames). Não tem relação com Vancouver, natureza ou montanhas. |
| **VIBRANT CULTURE** | `m6W5YSp6Q-0` | ⚠️ Indefinida | Mesmo vídeo do Diversity. Conteúdo não verificado; link pode estar quebrado ou irrelevante. |
| **FOOD PARADISE** | `ljLWjkWaLHY` | ⚠️ Indefinida | Conteúdo não verificado; link pode estar quebrado ou irrelevante. |
| **DIVERSITY** | `m6W5YSp6Q-0` | ⚠️ Indefinida | Mesmo vídeo do Culture. Conteúdo não verificado; link pode estar quebrado ou irrelevante. |
| **ACTIVE LIFE** | `bJMYoj4hHqU` | ❌ Nenhuma | **Mesmo vídeo** da física (Toronto 1960). Nada a ver com ski, bike, surf ou vida ativa em Vancouver. |
| **NIGHTLIFE** | `3vZ3bZDrCkI` | ⚠️ Indefinida | Conteúdo não verificado; link pode estar quebrado ou irrelevante. |

**Problemas principais:**
- **EPIC NATURE** e **ACTIVE LIFE** usam o mesmo vídeo errado (aula de física).
- **VIBRANT CULTURE** e **DIVERSITY** usam o mesmo vídeo (não verificado).
- Vários links não levam a lugar nenhum confiável ou não batem com o tema do card.

---

## 3. Vídeos recomendados (curtos e específicos por card)

Todos são no YouTube, públicos e com tema alinhado ao card.

| Card | Novo ID | Título | Motivo |
|------|--------|--------|--------|
| **EPIC NATURE** | `aK81n1sF7ds` | Vancouver – The City of Nature \| Cinematic Video | Natureza, montanhas, Stanley Park, drone; tom “ocean + mountains”. |
| **VIBRANT CULTURE** | `OFOy_z2sJag` | Street Art of Vancouver (A Walking Tour) | Arte de rua, mural festival; “arte em cada esquina”. |
| **FOOD PARADISE** | `BXC9j4oauQo` | 10 ICONIC FOODS of Vancouver \| Vancouver Food Tour | Comida icônica de Vancouver; sushi a tacos, diversidade gastronômica. |
| **DIVERSITY** | `FWHN6qFf-tE` | Vancouver, how many languages do you speak? | Multiculturalismo, idiomas; “+100 nacionalidades”. |
| **ACTIVE LIFE** | `KuzwrKRacG8` | Snowboarding and Skiing at Grouse Mountain | Ski/snowboard em Vancouver; “ski no inverno”, vida ativa. |
| **NIGHTLIFE** | `1DR6AuPBMxU` | Vancouver Nightlife – Granville Street at Night | Granville à noite, vida noturna; “rooftops, clubs”. |

---

## 4. URLs completas (para uso no código)

```
EPIC NATURE:    https://www.youtube.com/watch?v=aK81n1sF7ds
VIBRANT CULTURE: https://www.youtube.com/watch?v=OFOy_z2sJag
FOOD PARADISE:  https://www.youtube.com/watch?v=BXC9j4oauQo
DIVERSITY:      https://www.youtube.com/watch?v=FWHN6qFf-tE
ACTIVE LIFE:    https://www.youtube.com/watch?v=KuzwrKRacG8
NIGHTLIFE:      https://www.youtube.com/watch?v=1DR6AuPBMxU
```

---

## 5. Alternativas (se precisar trocar no futuro)

| Card | Alternativa (ID) | Nota |
|------|-------------------|------|
| EPIC NATURE | `TpYrad_peEU` | The Hidden Wonders of Howe Sound, BC |
| EPIC NATURE | `41_9EXDT-H4` | Living Close to Nature in Vancouver |
| VIBRANT CULTURE | `MSorYsrocg8` | Vancouver Writers Fest |
| FOOD | `aR_RTAKTFKA` | 24h Food Tour Vancouver |
| ACTIVE LIFE | `UHRvQsREJwM` | Skiing The Lions, West Coast Ski Touring |
| NIGHTLIFE | `-E1Gif0qEfw` | 4K Downtown Vancouver at Night, Granville Clubs |

---

*Última atualização: alteração dos vídeos nos cards Lifestyle em `VancouverMagazine.tsx`.*
