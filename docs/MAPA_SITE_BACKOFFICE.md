# Mapa: Site (público) ↔ Backoffice (onde editar)

Referência para saber **onde cada parte do site é editada** no backoffice. Organizado por área do site.

---

## 1. Home (página inicial)

| O que aparece no site | Onde editar no backoffice | Upload / detalhes |
|----------------------|---------------------------|-------------------|
| **URL no site** | `/pt/home`, `/en/home`, etc. | — |
| **Slogan do hero** (H1, ex.: "EXPERIÊNCIAS QUE CONECTAM OS MUNDOS") | **Páginas** → Editar **Home** → Hero Slogan (PT, EN, ES, FR) | Texto |
| **Subtítulo do hero** | **Páginas** → Editar **Home** → Hero Subtitle | Texto |
| **Descrição hero (mobile vs desktop)** | **Páginas** → Editar **Home** → Hero Description Mobile / Desktop | Texto |
| **Vídeo do topo (hero)** | **Páginas** → Editar **Home** → **Mídia da Página** → Vídeo da Página | Upload em **Mídias** ou URL |
| **Thumbnail/capa do vídeo do hero** | **Páginas** → Editar **Home** → **Mídia da Página** → Thumbnail do Vídeo | Upload em **Mídias** ou URL (1920×1080) |
| **Cards "Projetos em Destaque"** (1 grande + 3 pequenos) | **Projetos** → editar **cada projeto** → **Imagem de capa** | Imagem de capa por projeto (1920×1080). Ordem: campo **Prioridade Home** (maior = primeiro). |
| **Pilares da Home** (ex.: Museus & exposições, VR, etc.) | **Páginas** → Editar **Home** → Pilares (Pilar 1, 2, 3…) PT/EN/ES/FR | Texto (títulos) |
| **SEO da Home** (título e descrição para Google) | **Páginas** → Editar **Home** → SEO | Texto |

**Atalho no backoffice:** Menu lateral → **Guia rápido** → **✏️ Atualizar Home**.

---

## 2. Serviços (What We Do)

| O que aparece no site | Onde editar no backoffice | Upload / detalhes |
|----------------------|---------------------------|-------------------|
| **URL no site** | `/pt/what`, `/pt/what/:slug` (ex.: `/pt/what/cinema-audiovisual`) | — |
| **Listagem de serviços** (cards na página /what) | **Serviços** → lista; só os **publicados** e com slug na lista curada aparecem | — |
| **Texto e imagens de cada serviço** (página do serviço) | **Serviços** → editar o serviço (slug) → campos de conteúdo e **imagem** | Upload em **Mídias** ou no próprio formulário |
| **Conteúdo da subpágina** (descrição longa, entregas, processo, tecnologias) | **Serviços** → editar o serviço → abas/campos de subpágina | Texto e opcionalmente imagens |

---

## 3. Projetos (Work / Portfolio)

| O que aparece no site | Onde editar no backoffice | Upload / detalhes |
|----------------------|---------------------------|-------------------|
| **URL no site** | `/pt/work`, `/pt/work/:slug`, `/pt/project/:slug` | — |
| **Listagem de projetos** (cards na página /work) | **Projetos** → cada card usa **título, resumo, ano, tags, imagem de capa** do projeto | **Projetos** → editar projeto → **Imagem de capa** |
| **Página de detalhe do projeto** (título, descrição, galeria, vídeo) | **Projetos** → editar o projeto → todos os campos + **Galeria de Mídias** | Imagem de capa + galeria; vídeo opcional. Upload em **Mídias** ou no formulário. |
| **Quais projetos aparecem na Home** | **Projetos** → campo **Prioridade Home** (quanto maior, mais em destaque); os primeiros aparecem nos cards da Home | Número (ex.: 10, 9, 8…) |

**Atalho no backoffice:** **Guia rápido** → **🖼️ Projetos e imagens**.

---

## 4. Studio (Sobre nós)

| O que aparece no site | Onde editar no backoffice | Upload / detalhes |
|----------------------|---------------------------|-------------------|
| **URL no site** | `/pt/studio`, `/pt/studio/equipe`, `/pt/studio/credibilidade`, `/pt/studio/diferenciais` | — |
| **Conteúdo da página Studio** (textos, hero) | **Páginas** → Editar página com slug **studio** (e subpáginas se existirem no CMS) | Textos; mídia se houver seção de mídia |
| **Equipe** | **Equipe** → lista e edição de membros (nome, foto, cargo) | Upload de foto em **Mídias** ou no formulário |
| **Credenciais** | **Credenciais** → itens de credibilidade | Texto e eventual mídia |

---

## 5. Academy

| O que aparece no site | Onde editar no backoffice | Upload / detalhes |
|----------------------|---------------------------|-------------------|
| **URL no site** | `/pt/academy`, `/pt/academy/courses`, `/pt/academy/workshops`, etc. | — |
| **Conteúdo da página Academy** | **Páginas** → Editar página **academy** (e subpáginas se existirem) | Textos e mídia conforme seções |
| **Cursos, workshops, research** | Conteúdo pode estar em **Páginas** (seções) ou em módulos específicos do backoffice | Ver **Páginas** e **Publicações (Research)** |

---

## 6. Blog

| O que aparece no site | Onde editar no backoffice | Upload / detalhes |
|----------------------|---------------------------|-------------------|
| **URL no site** | `/pt/blog`, `/pt/blog/:slug` | — |
| **Listagem de posts** | **Blog** → posts **publicados** | — |
| **Cada post** (título, conteúdo, imagem de capa, autor, data) | **Blog** → editar o post | Imagem de capa: **Mídias** ou campo do post |
| **Sugestões de posts (IA)** | **Blog** → **Monitoramento** (aprovar/descartar) | — |

---

## 7. Imprensa (Press)

| O que aparece no site | Onde editar no backoffice | Upload / detalhes |
|----------------------|---------------------------|-------------------|
| **URL no site** | `/pt/press` | — |
| **Conteúdo e itens de imprensa** | **Imprensa** e/ou **Páginas** (slug **press** se existir) | Textos e mídia |

---

## 8. Contato e outros

| O que aparece no site | Onde editar no backoffice | Upload / detalhes |
|----------------------|---------------------------|-------------------|
| **Contato** (`/pt/contact`) | **Páginas** → Editar **contact** (textos, CTAs); formulário pode ter config em **Configurações** ou integração | Texto |
| **Privacy / Terms** | **Páginas** → slugs **privacy**, **terms** (se existirem) | Texto |
| **Thank you** | Página fixa ou **Páginas** | — |

---

## 9. Upload de mídia (central)

| Ação | Onde no backoffice |
|------|---------------------|
| **Enviar imagens e vídeos** (para usar em qualquer página ou projeto) | **Mídias** (menu) ou **Guia rápido** → **📤 Mídias (upload)** |
| **Usar mídia já enviada** | Ao editar **Páginas** ou **Projetos**, usar "Selecionar da Biblioteca" (lista de **Mídias**) |
| **Especificações sugeridas** | Imagens: 1920×1080 (16:9), ~5 MB. Vídeo Home: até 25 MB. Ver `docs/RELATORIO_FINAL_UPLOAD_E_BACKOFFICE.md` |

---

## 10. Resumo rápido (Guia rápido no menu)

- **Atualizar Home** → **Páginas** → Editar **Home** (textos + Mídia da Página para vídeo/capa do topo).
- **Projetos e imagens** → **Projetos** → editar cada projeto → **Imagem de capa** (cards da Home e da página Projetos).
- **Mídias (upload)** → **Mídias** → enviar arquivos; depois escolher em Páginas e Projetos.
- **Manual** → **Manual** (ajuda com todas as áreas).

Este mapa pode ser copiado para a página **Manual** do backoffice para o usuário sempre saber **onde colocar cada coisa** e **qual o relacionamento com o site**.
