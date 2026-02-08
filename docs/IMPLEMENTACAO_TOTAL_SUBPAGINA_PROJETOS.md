# Implementação total: Subpágina de Projetos

**Projeto:** azimut-site-vite-tailwind (site Vite + backoffice azimut-cms Next.js)  
**Data:** 2026-02-01  
**Uso:** Levar este documento para outro chat. Abrir no Cursor e pedir: *"Lê o @docs/IMPLEMENTACAO_TOTAL_SUBPAGINA_PROJETOS.md e continua / revisa / faz o que faltar."*

---

## 1. Objetivo (o que foi pedido)

- **Subpágina do projeto:** ao clicar num projeto, abrir sua subpágina.
- **Hero:** mostrar **imagem principal ou vídeo**. Se for vídeo, ele deve aparecer **só na subpágina**, não no card de projeto.
- **Galeria:** todas as imagens e vídeos que forem subindo, **uma sequencial à outra**, com **ordem no SQL** e **informação/legenda** por mídia; se não tiver informação, deixar sem.
- **Detalhes:** na subpágina, mostrar **todos os campos** (nome, ano, coprodução, parceria, cliente, etc.). **Se o campo estiver vazio, não exibir.**
- **Backoffice:** poder **subir mais e mais** imagens, vídeos e texto (legenda) relacionados ao projeto.
- **SQL:** modelo relacionado ao item projeto (galeria com ordem e informação por mídia).
- **Visual:** subpágina como **página arte premium** para **desktop (tema claro e escuro)** e **web/mobile** bem organizada.

---

## 2. O que já está implementado (checklist)

| # | Item | Onde está | Observação |
|---|------|------------|------------|
| 1 | Hero: imagem ou vídeo na subpágina | `src/pages/ProjectDetail.tsx` | `hasVideo`, iframe YouTube ou `<video>` MP4/WebM |
| 2 | Vídeo só na subpágina, não no card | `src/pages/Work.tsx`, `src/pages/Home.tsx` | Work: `getProjectImageUrl` retorna `thumbnail` quando `heroImage.type === 'VIDEO'`. Home: idem para fundo e fallback |
| 3 | Galeria em sequência (ordem do backoffice) | `src/pages/ProjectDetail.tsx` | Bloco "Galeria" com `project.gallery.map`; API retorna por `order` ASC |
| 4 | Legenda por mídia em 4 idiomas (PT/EN/ES/FR; se vazia não mostra) | `src/pages/ProjectDetail.tsx` + API + GalleryManager | `media.caption` → `<figcaption>` por idioma. Backoffice: 4 campos no GalleryManager; API: `caption` por lang |
| 5 | Campos: nome, ano, coprodução, parceria, cliente, etc. | `src/pages/ProjectDetail.tsx` | Meta com ano, mês, cidade, estado, país, tipo, cliente, parceria, coprodução |
| 6 | Campo vazio = não aparecer | `src/pages/ProjectDetail.tsx` | Condicionais `project.year != null`, `project.client &&`, `.trim()`, etc. |
| 7 | Backoffice: subir mais mídias + texto | `azimut-cms/.../GalleryManager.tsx` + API gallery | Upload, URL, biblioteca; reordenar (PUT `mediaIds`); legenda (PATCH `captionPt` etc.) |
| 8 | SQL: ordem e informação por mídia | Prisma `ProjectMedia` + `sql/referencia_project_media_galeria.sql` | `order`, `captionPt`, `captionEn`, `captionEs`, `captionFr`; tabela já existe |
| 9 | Página arte premium (claro/escuro + mobile) | `src/pages/ProjectDetail.tsx` | `var(--theme-text)`, `--theme-text-secondary`, `--theme-text-muted`; layout responsivo; rounded, spacing |

---

## 3. Arquivos principais (caminhos exatos)

**Site (Vite)**  
- `src/pages/ProjectDetail.tsx` — subpágina do projeto (hero, meta, galeria, tema)  
- `src/pages/Work.tsx` — lista/cards de projetos (thumbnail quando vídeo)  
- `src/pages/Home.tsx` — destaque de projetos (thumbnail quando vídeo)  
- `src/hooks/useProject.ts` — busca projeto por slug e lang  

**Backoffice (Next.js – pasta azimut-cms)**  
- `azimut-cms/app/api/public/project/[slug]/route.ts` — API pública projeto (hero, gallery com order + caption)  
- `azimut-cms/app/api/public/content/route.ts` — conteúdo (projetos em destaque etc.; hero com `type`)  
- `azimut-cms/app/api/admin/projects/[id]/gallery/route.ts` — POST/DELETE/PUT/PATCH galeria  
- `azimut-cms/app/admin/projects/[id]/page.tsx` — edição do projeto (usa GalleryManager)  
- `azimut-cms/app/admin/projects/components/GalleryManager.tsx` — UI: adicionar mídia, reordenar, editar legenda  

**Schema e SQL**  
- `azimut-cms/prisma/schema.prisma` — modelos `Project`, `Media`, `ProjectMedia`  
- `sql/referencia_project_media_galeria.sql` — referência da estrutura ProjectMedia (ordem + legendas)  

**Documentação de andamento**  
- `docs/ANDAMENTO_SUBPAGINA_PROJETOS_GALERIA.md` — resumo do que foi feito e próximos passos opcionais  

---

## 4. O que pode ser feito no outro chat (opcional)

1. **Revisar** se tudo acima está consistente (testar um projeto com vídeo no hero e outro com galeria).  
2. ~~**Backoffice – legendas em 4 idiomas**~~ **Feito:** GalleryManager com 4 campos PT/EN/ES/FR; PATCH envia todos; API já retorna `caption` por lang.  
3. ~~**Refino visual**~~ **Feito:** loading tema claro/escuro, galeria com borda e espaçamento, legendas com margem.  
4. **Deploy:** commit + deploy do site e do backoffice (Vercel).  

---

## 5. Frase para colar no outro chat

Copie e cole no novo chat:

```
Lê o documento @docs/IMPLEMENTACAO_TOTAL_SUBPAGINA_PROJETOS.md. 
É a implementação total da subpágina de projetos (hero imagem/vídeo, galeria em sequência com ordem e legenda, campos só quando preenchidos, backoffice para subir mídias, SQL/ProjectMedia, página arte premium). 
Quero [revisar tudo / fazer legendas em 4 idiomas no backoffice / refinar o visual / fazer deploy].
```

Substitua o colchete pelo que quiser fazer.

---

## 6. Estrutura rápida do fluxo

- **Lista (Work/Home):** cards usam `heroImage.thumbnail` quando `heroImage.type === 'VIDEO'`; caso contrário usam imagem normal.  
- **Subpágina:** `useProject(slug, lang)` → API `GET /api/public/project/[slug]?lang=pt` → hero (imagem ou vídeo) + meta (só campos preenchidos) + `gallery` ordenada com `caption` por idioma.  
- **Backoffice:** em Projetos → [projeto] → Galeria: adicionar mídia (upload/URL/biblioteca), reordenar, editar legenda (salva em `ProjectMedia` via PATCH).  

Fim do documento. Use-o no outro chat para continuar sem perder contexto.
