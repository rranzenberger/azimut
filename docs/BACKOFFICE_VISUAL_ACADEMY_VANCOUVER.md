# Backoffice visual: Academy, Vancouver, Events e Blog

**Objetivo:** Ter no backoffice páginas de edição **visuais e premium**, semelhantes às partes do site e ao padrão da **Home** (cards com preview, Trocar imagem, EDITAR).

---

## Padrão de referência: Home backoffice

Na edição da **Home** (`/admin/pages/edit/home`):
- Os **Projetos em Destaque** aparecem em **cards visuais** como no site.
- Em cada card: **imagem**, **Trocar imagem** / **Upload**, **EDITAR ESTE PROJETO** (edição rápida inline ou link para edição completa).
- Preview ao vivo — "exatamente como aparece no site".

Esse mesmo padrão deve ser aplicado a:
- **Academy** (Cursos, Workshops, Corporate, CA Vancouver)
- **Events** (galeria Past Events)
- **Vancouver** (VFS, VanArts: hero, logo, stats, programas, quick facts, vídeo)
- **Blog/Insights** (cards com imagem, destaque, categoria, título)

---

## O que foi implementado

### 1. Hub Academy (`/admin/academy`)
- Lista as **páginas** da Academy (academy, academy/courses, academy/workshops, academy/corporate, academy/research, etc.) em **cards visuais**.
- Cada card: thumbnail (hero da página), nome, slug, **Trocar imagem** (hero), **EDITAR ESTE CONTEÚDO** → abre o editor de página (`/admin/pages/edit/[slug]`).
- Visual alinhado ao tema escuro e ao estilo dos cards da Home/Projetos.

### 2. Galeria Past Events (`/admin/academy/events/gallery`)
- Página para gerenciar as **imagens da seção "Past Events"** do site (Workshops).
- Placeholder inicial: explicação e link para mídias; quando houver modelo/API específica, passa a listar e permitir trocar/ordenar imagens como na galeria de projetos.

### 3. Menu do backoffice
- **Academy** no menu "Conteúdo do site": leva ao hub visual (`/admin/academy`).
- **Academy → Events (galeria)** disponível no hub ou em submenu.

### 4. Hub Vancouver (`/admin/academy/vancouver`)
- Página dedicada **CA Vancouver — VFS & VanArts**: link para **EDITAR PÁGINA** (hero, textos, vídeo de capa) e blocos para **Vídeos VFS/VanArts** e **Galeria / Student Work** (por agora com link para Mídias; depois pode ser expandível como Cursos/Past Events).
- No hub Academy, na lista "Expandível como Projetos", foi adicionado o link **CA Vancouver** → `/admin/academy/vancouver`.

---

## Próximos passos (revisão premium)

- **Vancouver (VFS / VanArts) — aprofundar:** Vídeos e galeria expandíveis (como Cursos/Past Events): listagem visual, adicionar item, Trocar mídia por card. Hoje: edição da página + Mídias gerais.
- **Blog:** Listagem em **cards visuais** (imagem, tag Destaque, categoria, título, excerpt) com **Trocar** e **EDITAR** em cada card.
- **Consistência:** Todas as páginas de edição do backoffice seguem o mesmo padrão visual (tema escuro, bordas Azimut, botões Trocar/EDITAR, preview quando possível).
