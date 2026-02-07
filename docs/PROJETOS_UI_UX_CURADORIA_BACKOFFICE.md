# Projetos: UI/UX, Curadoria e Backoffice

Análise de onde o cliente acessa **todos os projetos**, **filtros por categoria** e **curadoria**, e como revisar no backoffice.

---

## 1. Onde está “Ver todos os projetos” e os filtros

### 1.1 Menu principal (header)
- **Projetos** (ou Work) no topo → dropdown.
- **Primeira opção:** **“Todos os Projetos”** (`navWorkAll`) → leva para `/{lang}/work`.
- Outras opções: Museus, Festivais, Marcas, VR & XR, Web3 → cada uma leva para `/work?type=...` ou página específica.

**Arquivo:** `src/components/Layout.tsx` (NavDropdown para work, ~linhas 746–754).

### 1.2 Página Work (`/work`) – submenu fixo
- Logo abaixo do header há uma **barra de filtros fixa** (submenu).
- **Primeiro item:** **“+ TODOS”** (ou “Todos”/“All”) → limpa filtros e mostra **todos os projetos**.
- **Demais itens:** Vídeo, VR & XR, Museus, Festivais, Design, Educação → ao clicar, aplicam filtro por categoria e atualizam a lista.

Fluxo:
1. Clicar em **“+ TODOS”** → `clearFilters()` + `navigate(/${lang}/work)` → lista completa.
2. Clicar em **Vídeo, Museus, etc.** → aplica `projectCategory`/`type` e opcionalmente `?type=...` na URL.

**Arquivos:**
- `src/pages/Work.tsx` (~621–696): submenu com “Todos” e `MAIN_CATEGORIES`.
- `src/utils/categoryMapping.ts`: definição das 6 categorias (Vídeo, VR & XR, Museus, Festivais, Design, Educação).

### 1.3 Barra de ações (contador + limpar)
- **Contador:** “X projetos” (ou “X projetos (filtrado)” quando há filtro).
- **Botão “✕ Limpar filtros”:** aparece só quando há filtro ativo; ao clicar, volta a mostrar todos.

**Arquivo:** `src/pages/Work.tsx` (~728–744).

---

## 2. Onde a curadoria entra (UI/UX)

### 2.1 Card “Curadoria” em destaque (só quando não há filtro)
- **Posição:** Logo abaixo da barra “contador + limpar filtros”, antes da lista de projetos.
- **Conteúdo:** Título (ex.: “Curadoria Gramado”), descrição curta, botão “Ver Curadoria”.
- **Ação do botão:** Aplica o filtro de curadoria (ex.: `projectCategory = ['curadoria']`) na lista, sem sair da página.
- **Visibilidade:** Só é exibido quando **não há filtro ativo** (`!hasActiveFilters`). Com “+ TODOS” ou “Limpar filtros”, o card volta a aparecer.

**Arquivo:** `src/pages/Work.tsx` (~750–781).

### 2.2 Seção “Curadoria & Festivais” (final da página)
- **Posição:** Abaixo da grade de projetos, antes de “Quer Trabalhar Conosco?”.
- **Conteúdo:** Texto institucional + cards de festivais/eventos (Gramado, RIO2C, FAM etc.).
- **Componente:** `CuradoriaFestivais` (conteúdo fixo/componente).

**Arquivo:** `src/pages/Work.tsx` (~1065–1067), `src/components/CuradoriaFestivais.tsx`.

### 2.3 Resumo para o cliente
- **Melhor acesso a “todos os projetos”:** Menu **Projetos → Todos os Projetos** ou, já na página Work, o primeiro item do submenu **“+ TODOS”**.
- **Melhor acesso com filtros:** Na própria página Work, usar os pills do submenu (Vídeo, VR & XR, Museus, Festivais, Design, Educação).
- **Curadoria:** Entra como (1) **card clicável** que filtra projetos de curadoria e (2) **seção de texto/cards** “Curadoria & Festivais” no final da página.

---

## 3. Backoffice – o que revisar (visual e dados)

### 3.1 Página Work (curadoria do momento)
- **Onde:** **Backoffice → Páginas → Projetos (work)** → abas/seção **“Curadoria do momento”**.
- **Campos editáveis:**
  - Título (PT, EN, ES, FR)
  - Descrição (PT, EN, ES, FR)
  - Texto do botão (PT, EN, ES, FR)
  - **Filtro ao clicar:** valor de categoria (ex.: `curadoria`) aplicado ao clicar em “Ver Curadoria”.
- **Efeito no site:** O card em destaque na `/work` usa esses textos; o botão aplica o filtro definido aqui.

**Arquivo:** `azimut-cms/app/admin/pages/edit/[[...slug]]/page.tsx` (slug === 'work', seção “Curadoria do momento”).

### 3.2 Projetos (categorias e filtros)
- **Onde:** **Backoffice → Projetos** → abrir cada projeto (editar).
- **Campos que afetam filtros na página Work:**
  - **Categoria Principal (projectCategory):** multi-select. Valores usados no submenu: ex. `video`, `vr-360`, `museum`, `festival`, `curadoria`, `education`, `design`, `animation`, etc.
  - **Tipo de Trabalho (workType):** multi-select (filme, exposição, curso, etc.).
  - **Tecnologias:** VR, 360, IA, 3D, etc.
  - **Tags:** relação com modelo Tag (labels por idioma); aparecem nos cards e podem ser usadas em filtros adicionais.
- **Importante:** Para um projeto aparecer em “Vídeo”, “Museus”, “Festivais”, etc., ele precisa ter pelo menos uma **projectCategory** que bata com o mapeamento em `categoryMapping.ts` (ex.: Museus → `museum`, `exhibition`; Festivais → `curadoria`, `festival`).

**Arquivos:**
- `azimut-cms/app/admin/projects/[id]/page.tsx` (edição)
- `azimut-cms/app/admin/projects/new/page.tsx` (novo projeto)
- `src/utils/categoryMapping.ts` (mapeamento categoria → filtro)

### 3.3 API e SQL
- **API de conteúdo:** `GET /api/public/content?page=work&lang=...` retorna todos os projetos publicados para a página work (`status: 'PUBLISHED'`, sem limite).
- **Formato do projeto:** A API inclui `projectCategory`, `workType`, `technologies`, `tags` (via `formatProject` em `azimut-cms/app/api/public/content/route.ts`).
- **Banco:** Tabela `Project` com colunas `projectCategory` (array), `workType` (array), `tags` (relação Tag). Não é necessário SQL novo para filtros; o que importa é **preencher no backoffice** as categorias de cada projeto para os pills do submenu funcionarem corretamente.

**Checklist backoffice (visual):**
- [ ] Em **Páginas → Projetos (work)** verificar título/descrição/botão e “Filtro ao clicar” da curadoria.
- [ ] Em **Projetos** listar alguns projetos e conferir se têm **Categoria Principal** e **Tipo de Trabalho** preenchidos.
- [ ] Conferir se projetos de “curadoria” têm `curadoria` ou `festival` em Categoria Principal.
- [ ] Conferir imagens (hero/thumbnail) dos projetos para não aparecer placeholder no site.

---

## 4. Mapeamento rápido: submenu → backoffice

| Submenu (site) | projectCategory (backoffice) | type (legado) |
|----------------|-----------------------------|---------------|
| + TODOS        | (nenhum – todos)             | —             |
| Vídeo          | video, cinema, audiovisual   | FILM          |
| VR & XR        | vr-360, vr, ar, xr           | VR_FILM       |
| Museus         | museum, exhibition           | MUSEUM        |
| Festivais      | curadoria, festival          | FESTIVAL      |
| Design         | design, animation, vfx       | ANIMATION     |
| Educação       | education, training          | EDUCATION     |

Garantir que cada projeto publicado tenha pelo menos uma dessas categorias marcadas para ser encontrado ao clicar no filtro correspondente.

---

## 5. Melhorias opcionais de UI/UX

- **Rótulo “+ TODOS”:** Já possível no submenu (primeiro pill) para deixar explícito “ver todos os projetos”.
- **Placeholders de imagem:** Se no site aparecer ícone de “imagem não carregada”, revisar no backoffice o campo de imagem principal (hero/thumbnail) do projeto.
- **URL com filtro:** Ao escolher “Museus”, a URL pode ficar `?type=museum`; assim o usuário pode compartilhar ou voltar direto para a vista filtrada.

Este doc pode ser usado para revisar no backoffice como está e garantir que a experiência visual (projetos, filtros e curadoria) esteja alinhada aos dados.
