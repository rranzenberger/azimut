# Curadoria de conteúdo – Página Serviços (O que fazemos) – 2026

## Problema
- Muitos cards (16+ quando backoffice retorna extras), com duplicações e ambiguidades.
- Duplicações: "EDUCAÇÃO & FORMAÇÃO" repetido, "CONSULTORIA & ESTRATÉGIA" vs card genérico "CONSULTORIA", "IA CRIATIVA" vs "INTELIGÊNCIA ARTIFICIAL", "XR/VR/INTERATIVIDADE" em 3 variantes.
- Cards genéricos com descrição vazia ou igual ao título (CONSULTORIA, DESENVOLVIMENTO, TREINAMENTO, SUPORTE).
- Mesmo ícone (ex.: cubo 3D) em vários cards diferentes.
- Sobrecarga visual: usuário vê muita coisa e não age.

## Objetivo
Ser cirúrgicos: **12 cards únicos** (múltiplo de 4 = 3 linhas × 4), sem duplicatas, para não quebrar o grid visual. Filtros (Cultura, Marcas, Produção, Tecnologia, Educação) continuam organizando a mesma lista.

---

## Conclusão final – grid e cores
- **Total de cards na grid: 12** (não 40). Antes da curadoria havia 16+ (com duplicatas); reduzimos e fixamos em **12** para múltiplo de 4.
- **Layout:** 4 cards por linha → 3 linhas completas (12 = 3 × 4), sem linha “quebrada”.
- **Cores mantidas:** palavras-chave primárias em **vermelho** (#c92337), secundárias em **bege** (#d4a574), texto base em **branco**/slate.

---

## Proposta: 12 cards na grid

| # | Slug | Título (PT) | Agrupamento lógico | Filtro |
|---|------|-------------|-------------------|--------|
| 1 | `cinema-audiovisual` | Cinema & Audiovisual | Produção de conteúdo | Produção |
| 2 | `pos-producao-vfx` | Pós-Produção & VFX | Produção de conteúdo | Produção |
| 3 | `animacao-2d-3d` | Animação 2D/3D | Produção de conteúdo | Produção |
| 4 | `xr-interatividade-web3` | XR, VR & Experiências Imersivas | VR, XR, Web3, metaverso (incorpora o antigo card "Realidade Virtual") | Marcas / Tecnologia |
| 5 | `cenografia-design-espacial` | Cenografia & Design Espacial | Espaços, museus, sinalética, cenografia virtual | Cultura / Marcas |
| 6 | `games-interativos` | Games & Interativos | Jogos, experiências interativas, museus/marcas/educação | Produção |
| 7 | `ia-criativa` | IA Criativa | IA generativa, pipelines, narrativas (único card de IA) | Tecnologia |
| 8 | `direcao-arte-criativa` | Direção de Arte & Branding | Identidade visual, direção criativa, branding | Tecnologia |
| 9 | `teatro-espetaculos-imersivos` | Teatro & Espetáculos Imersivos | Cenografia virtual, LED, espetáculos ao vivo | Cultura |
| 10 | `branded-experiences-ativacoes` | Branded Experiences & Ativações | Ativações de marca, experiências imersivas para marcas | Marcas |
| 11 | `consultoria-estrategia` | Consultoria & Estratégia | Editais, estratégia, treinamento corporativo | Educação |
| 12 | `educacao-treinamento` | Educação & Treinamento | Workshops, cursos, capacitação imersiva/IA/audiovisual | Educação |

---

## O que sai da grid (não aparece como card)

- **realidade-virtual-vr** – Conteúdo coberto por "XR, VR & Experiências Imersivas". Redirect para `/what/xr-interatividade-web3`.
- **museus-exposicoes** – Fora da grid (12 cards = múltiplo de 4). Página de detalhe pode ser mantida.
- **festivais-curadoria-eventos** – Fora da grid. Página de detalhe pode ser mantida.
- **arquitetura-virtual-bim** – Fora da grid. Pode voltar depois se desejado.
- **inteligencia-artificial** (se existir no backoffice) – Duplicata de "IA Criativa"; não exibir.
- Cards genéricos do backoffice (ex.: slug "consultoria", "desenvolvimento", "treinamento", "suporte") com descrição vazia ou igual ao título – **nunca exibir**.

---

## Implementação

1. **Lista curada (`CURATED_SERVICE_SLUGS`)**  
   Constante com os 12 slugs acima. A grid de Serviços exibe **somente** serviços cujo `slug` está nessa lista (12 = 3×4, múltiplo de 4).

2. **Fonte de dados**  
   - Se o backoffice retornar serviços: filtrar por `CURATED_SERVICE_SLUGS` e excluir itens com `description` vazia ou igual a `title`.  
   - Se usar fallback local (`servicesData.ts`): filtrar por `CURATED_SERVICE_SLUGS`.

3. **Título do card XR**  
   Em `servicesData.ts`, o serviço `xr-interatividade-web3` passa a ter título PT: "XR, VR & Experiências Imersivas" (e equivalentes EN/ES/FR) para deixar claro que VR está incluído.

4. **Redirecionamento (opcional)**  
   Em `ServiceDetail` ou roteador: `/what/realidade-virtual-vr` → redirect para `/what/xr-interatividade-web3` (302) para manter links antigos e SEO.

5. **Ícones**  
   Cada um dos 10 cards deve ter ícone distinto no backoffice/dados locais (evitar mesmo ícone para serviços diferentes).

---

## Resumo

- **Antes:** 16+ cards, duplicados e genéricos.  
- **Depois:** **12 cards únicos** (múltiplo de 4 → 3 linhas × 4), claros, sem duplicata.  
- **Cores:** palavras-chave primárias em vermelho (#c92337), secundárias em bege (#d4a574), texto em branco.  
- Filtros (Cultura, Marcas, Produção, Tecnologia, Educação) continuam aplicados sobre esses 12.  
- Páginas de detalhe dos slugs removidos da grid podem ser mantidas ou redirecionadas conforme decisão de conteúdo/SEO.
