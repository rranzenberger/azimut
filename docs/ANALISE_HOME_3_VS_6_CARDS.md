# Análise: Home — 3 ou 6 cards secundários de projetos

## 1. Situação atual (implementação)

| Camada | Comportamento |
|--------|----------------|
| **API** (`/api/public/content`, page=home) | `take: 6` — retorna até **6** projetos (featured + priorityHome 1–4, ordenados). |
| **Backoffice** (Editar Home) | Lista até **6** projetos; exibe **1 destaque principal** + **3 cards** na prévia (slots P1, P2, P3, P4). Projetos 5 e 6 aparecem em “Outros em destaque (não exibidos na Home padrão)”. |
| **Site (Home.tsx)** | `minRequired = 4` → usa **4** projetos: **1 card grande** (principal) + **3 cards** em grid `md:grid-cols-3`. |
| **CTA** | Botão “VIEW ALL PROJECTS” leva para `/work`. |

Resumo: hoje a Home mostra **1 + 3 = 4** projetos; a API e o backoffice já têm margem para até 6 (com 2 “reservas” não exibidas no site).

---

## 2. Opção A: Manter 3 cards secundários (1 + 3 = 4 total)

### Vantagens
- **Foco e curadoria**: poucos itens = destaque claro para cada projeto; sensação de “seleção”, não de listagem.
- **Above the fold**: em desktop, 1 grande + 3 em linha cabem bem na primeira dobra; menos scroll para ver o bloco completo.
- **Performance**: menos imagens/thumbnails (4), melhor LCP e tempo de interação.
- **Mobile**: 1 coluna + 3 cards em coluna = scroll previsível; 6 cards gerariam scroll longo só na seção de projetos.
- **Alinhamento com o backoffice**: 4 slots (P1–P4) = exatamente o que o site mostra; sem “projetos configurados mas não exibidos”.
- **Decisão**: menos opções costumam reduzir paralisia e favorecer clique em “Ver projeto” ou “Ver todos”.

### Desvantagens
- Só 3 projetos em evidência além do principal; se o portfólio for grande e quiserem dar visibilidade a mais trabalhos na Home, fica limitado.

### Quando faz mais sentido
- Site focado em **conversão** (contato, orçamento) e em **qualidade da curadoria**.
- Público que você quer levar rápido ao projeto principal ou ao CTA “Ver todos”.

---

## 3. Opção B: Aumentar para 6 cards secundários (1 + 6 = 7 total)

### Vantagens
- **Mais visibilidade**: até 7 projetos na Home; melhor se a estratégia for “mostrar mais trabalhos” sem obrigar a ir em /work.
- **Mais flexibilidade** para datas, campanhas ou tipos de projeto (ex.: 1 principal + 6 variados).

### Desvantagens
- **Backoffice**: hoje há apenas **4 slots** (P1–P4). Para 7 itens seria preciso criar **7 slots** (ex.: P1 principal + P2–P7 para os 6 cards) e ajustar a API (ex.: `take: 7` e lógica de “destaque”).
- **UX**: grid com 6 cards (ex.: 2 linhas de 3 ou 3 linhas de 2) aumenta scroll e pode diluir a importância de cada card.
- **Performance**: mais 3 imagens/vídeos (7 no total); impacto em LCP e peso da página.
- **Mobile**: seção bem mais longa; risco de a seção “Projetos em destaque” ficar pesada e menos escaneável.

### Quando faz mais sentido
- Prioridade é **volume de exposição** na Home e não importa tanto o scroll ou a complexidade no backoffice.

---

## 4. Opção intermediária: 1 + 5 = 6 total (5 cards secundários)

- **API**: já retorna 6; basta o site usar `recommended.slice(1, 6)` (5 secundários).
- **Backoffice**: continuaria com 4 slots; os projetos 5 e 6 da lista seriam exibidos no site como 4º e 5º card secundários (sem slot P5/P6 editável individualmente — ordem viria da lista).
- **Layout**: por exemplo grid `md:grid-cols-3` com 2 linhas (3 + 2) ou ajuste para 5 colunas em desktop (menos comum).
- Meio-termo entre “mostrar mais” e não alterar slots/API; porém 5 cards em grid 3+2 pode parecer assimétrico.

---

## 5. Comparativo rápido

| Critério | 3 secundários (1+3) | 6 secundários (1+6) |
|----------|----------------------|----------------------|
| Total na Home | 4 | 7 |
| Alinhamento backoffice | ✅ 4 slots (P1–P4) | ❌ exige 7 slots e mudança na API |
| Above the fold / scroll | ✅ Melhor | ❌ pior |
| Performance (imagens) | ✅ 4 | ❌ 7 |
| Curadoria / foco | ✅ Alta | ❌ Menor |
| Visibilidade de projetos | Menor | ✅ Maior |

---

## 6. Recomendação

- **Manter 3 cards secundários (1 + 3 = 4 total)** é a opção mais adequada na maioria dos casos:
  - Mantém a Home enxuta, rápida e alinhada ao backoffice (4 slots).
  - Reforça curadoria e direciona para “Ver projeto” / “Ver todos”.
  - Evita mudanças de API, slots e layout.

Se no futuro a prioridade for “mostrar mais projetos na Home” sem ir a /work, aí sim vale:
- **Opção intermediária**: usar os 6 da API e exibir **5 secundários** (1+5), aceitando que os 2 últimos não tenham slot próprio no backoffice; ou
- **Opção 6 secundários**: definir 7 slots no backoffice, `take: 7` na API e layout em grid para 6 cards (ex.: 3+3).

---

## 7. Referência no código

- **Quantidade usada na Home (site):**  
  `src/pages/Home.tsx` — `minRequired = 4` e `recommended.slice(1, 4)` (3 secundários).
- **API:**  
  `azimut-cms/app/api/public/content/route.ts` — `take: 6` para page `home`.
- **Backoffice (prévia e lista):**  
  `azimut-cms/app/admin/pages/edit/[[...slug]]/page.tsx` — `homeFeaturedProjects.slice(1, 4)` para os 3 cards; lista até 6; “Outros” = `slice(4)`.

Para alterar apenas o número de cards no site (ex.: 5 secundários usando os 6 da API), basta ajustar `minRequired` e os `slice` em `Home.tsx` e o grid (ex.: número de colunas / linhas).
