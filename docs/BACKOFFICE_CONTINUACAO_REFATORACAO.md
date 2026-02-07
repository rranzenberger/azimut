# Backoffice – Onde paramos e próximos passos

## O que já foi feito

1. **Relatório de upload** (`docs/RELATORIO_FINAL_UPLOAD_E_BACKOFFICE.md`)
   - Onde fazer upload: menu **Mídias**
   - Home (vídeo/capa do topo): **Páginas → Editar Home → Mídia da Página**
   - Cards "Projetos em Destaque": **Projetos → editar cada projeto → Imagem de capa**

2. **Textos no backoffice**
   - Em **Projetos → Editar projeto**: título "Imagem de capa (cards da Home e página Projetos)" e texto explicando que, se o card quebrar, definir a imagem ali.
   - Em **Páginas → Editar Home → Mídia da Página**: caixa verde com "Onde atualizar o material da Home" + **lista dinâmica** com nomes dos projetos (TMNT, Curadoria, VR Zen...) e links "→ Editar imagem de capa".

3. **Deploy**
   - Último commit: lista de projetos em destaque na Home com links para editar imagem de capa.

---

## O que o usuário pediu (reorganização)

- **Não “tripa”:** reorganizar por **áreas mais detalhadas**, fáceis de ler e de encontrar.
- **Curadoria e UI/UX:** melhor direção de arte e organização para usuários leigos.
- **Onde colocar o quê:** ficar claro **onde** atualizar Home e outras páginas; onde fazer upload de imagens, vídeos e textos.
- **Revisar toda a base** de uploads e conteúdos visuais e deixar “perfeito”.

---

## Próximos passos sugeridos (quando continuar)

1. **Sidebar do backoffice**
   - Agrupar itens por área (ex.: **Conteúdo do site** = Páginas, Projetos, Serviços, Blog; **Mídia** = Mídias; **Leads/IA** = Leads, Analytics IA; **Config** = Configurações).
   - Ou adicionar um **“Guia rápido”** no topo com: “Atualizar Home” | “Projetos e imagens” | “Mídias” | “Outros”.

2. **Página “Editar Home”**
   - Dividir em **abas** ou **blocos bem separados**: ex. “Textos (slogan, subtítulo)” | “Mídia do topo (vídeo/capa)” | “Projetos em destaque” | “SEO” | “Pilares”.
   - Reduzir a “tripa” de campos e dar hierarquia visual (títulos, espaçamento, ícones).

3. **Página de Mídias**
   - Deixar explícito: “Envie aqui imagens e vídeos; depois use em Páginas e Projetos.”
   - Opcional: atalhos “Usado em: Home”, “Usado em: Projeto X” para facilitar curadoria.

4. **Documentação**
   - Manter/atualizar `RELATORIO_FINAL_UPLOAD_E_BACKOFFICE.md` como referência de “onde fazer o quê”.
   - Opcional: criar um “Manual rápido backoffice” (1 página) com fluxos: atualizar Home, trocar imagem de projeto, enviar nova mídia.

5. **Revisão da base**
   - Conferir todas as telas que têm upload (Páginas, Projetos, Mídias) e garantir rótulos e textos de ajuda consistentes.
   - Garantir que não haja duplicação confusa (ex.: “Mídia da Página” vs “Imagem de capa do projeto”) e que cada lugar tenha um propósito claro.

---

## Arquivos principais do backoffice (azimut-cms)

- **Sidebar / layout:** `app/admin/` – layout ou componente de menu lateral.
- **Editar página (Home, etc.):** `app/admin/pages/edit/[[...slug]]/page.tsx`
- **Editar projeto:** `app/admin/projects/[id]/page.tsx`
- **Mídias:** `app/admin/media/page.tsx`
- **Lista de projetos:** `app/admin/projects/page.tsx`

Quando o Cursor estabilizar ou em nova sessão, usar este doc para “continuar de onde parou” e priorizar primeiro sidebar/guia rápido e depois abas ou blocos na edição da Home.
