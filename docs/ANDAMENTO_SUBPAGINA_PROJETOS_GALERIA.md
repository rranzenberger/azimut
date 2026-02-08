# Andamento: Subpágina de Projetos + Galeria + Backoffice

**Última atualização:** 2026-02-08  
**Objetivo:** Subpágina de projeto com imagem/vídeo principal, galeria sequencial com legendas, campos só quando preenchidos, backoffice para subir mais mídias. Página “arte premium” desktop claro/escuro e mobile.

---

## Como usar quando a conversa cair

1. **Abra este arquivo** e leia a seção “O que já foi feito” e “Próximos passos”.
2. **No Cursor**, diga por exemplo:
   - *“Lê o @docs/ANDAMENTO_SUBPAGINA_PROJETOS_GALERIA.md e continua de onde parou.”*
   - Ou: *“Continuar a partir do doc de andamento da subpágina de projetos.”*
3. **Salve o andamento** sempre que concluir algo: edite este `.md` e atualize “O que já foi feito” e “Próximos passos”.

---

## O que já foi feito

### 1. Hero na subpágina (imagem ou vídeo)
- **ProjectDetail.tsx:** Hero exibe **imagem principal ou vídeo**. Se for vídeo (YouTube, MP4, WebM), o vídeo aparece **só na subpágina**, não no card.
- Vídeo: iframe YouTube ou `<video>` para MP4/WebM.

### 2. Cards (Work e Home): vídeo = só thumbnail
- **Work.tsx:** `getProjectImageUrl` – quando `heroImage.type === 'VIDEO'` retorna só `thumbnail` (não URL de vídeo), para o card mostrar imagem.
- **Home.tsx:** `featuredImage` em fundo do hero – quando tipo é VIDEO usa `thumbnail`. Cards secundários já usam `VideoPlayer` com thumbnail quando há vídeo.

### 3. Galeria universal na subpágina
- **ProjectDetail.tsx:** Bloco **“Galeria”** para **todos** os projetos que têm `project.gallery`:
  - Itens na **ordem** retornada pela API (campo `order` no ProjectMedia).
  - Cada item: imagem ou vídeo (MP4/WebM ou YouTube embed).
  - **Legenda opcional:** se `media.caption` existir e não estiver vazio, mostra `<figcaption>`; se não tiver, não mostra nada.
- Layout: sequencial (um abaixo do outro), aspecto 21/9 em desktop, `rounded-2xl`, fundo `slate-900`.

### 4. Campos só quando preenchidos
- **ProjectDetail.tsx:** Ano, mês, cidade, país, tipo, cliente, parceria, coprodução são exibidos **só se tiverem valor** (já estava assim).

### 5. Backoffice – galeria e legendas (4 idiomas)
- **Schema Prisma:** `ProjectMedia` já tem `order`, `captionPt`, `captionEn`, `captionEs`, `captionFr`.
- **API:**  
  - `GET/POST/DELETE/PUT` galeria em `azimut-cms/app/api/admin/projects/[id]/gallery/route.ts`.  
  - **PATCH** para atualizar legendas: `projectMediaId`, `captionPt`, `captionEn`, `captionEs`, `captionFr`.
- **GalleryManager.tsx:**  
  - Adicionar mídia: upload, URL externa, biblioteca.  
  - Reordenar (Mover cima/baixo → PUT com `mediaIds`).  
  - **Legendas em 4 idiomas:** editar no card → 4 campos (PT, EN, ES, FR) → **PATCH** com todos; legenda salva no ProjectMedia e aparece na subpágina conforme o idioma do visitante.  
  - Resumo no card: "PT ✓ · EN — · ES ✓ · FR —" (quais idiomas têm legenda).

### 6. API pública do projeto
- **azimut-cms/app/api/public/project/[slug]/route.ts:**  
  - Retorna `gallery` com `order` e `caption` por idioma (`captionPt` etc. mapeado para `caption` no lang da request).

### 7. SQL relacionado ao projeto (galeria)
- **sql/referencia_project_media_galeria.sql:** Referência da estrutura `ProjectMedia` (ordem + legendas PT/EN/ES/FR). Tabela já existe via Prisma; o arquivo documenta o modelo e um exemplo de consulta.

### 8. Subpágina “arte premium” (tema + mobile)
- **ProjectDetail.tsx:** Meta usa `var(--theme-text-secondary)` para tema claro/escuro; container com `px-4 sm:px-6 lg:px-8` e espaçamentos responsivos; hero e galeria com `rounded-2xl`/`rounded-3xl`, sombra e ring suave; placeholder “Sem imagem” com `var(--theme-text-muted)`.

---

## Próximos passos (opcional)

1. ~~**Backoffice – legendas em 4 idiomas**~~ **Feito (2026-02-08):** GalleryManager com 4 campos PT/EN/ES/FR e PATCH com todos.

2. **Subpágina “arte premium” (refino)**  
   - Ajustes feitos: loading com cores tema claro/escuro, galeria com borda superior e mais espaçamento, legendas com margem. Mobile já responsivo.

3. **SQL**  
   - Não é obrigatório: `ProjectMedia` já tem `order` e captions. Se no futuro quiser campo extra (ex.: “saiu na mídia”, “referência”), aí sim criar migração.

4. **Deploy**  
   - Fazer commit das alterações (Work, Home, ProjectDetail, GalleryManager já ajustados) e deploy do site + backoffice.

---

## Arquivos principais

| O quê | Arquivo |
|------|--------|
| Subpágina projeto (hero + galeria + meta) | `src/pages/ProjectDetail.tsx` |
| Cards Work (thumbnail se vídeo) | `src/pages/Work.tsx` |
| Cards Home (thumbnail em fundo; cards com vídeo) | `src/pages/Home.tsx` |
| Hook projeto | `src/hooks/useProject.ts` |
| API pública projeto por slug | `azimut-cms/app/api/public/project/[slug]/route.ts` |
| API admin galeria (POST/DELETE/PUT/PATCH) | `azimut-cms/app/api/admin/projects/[id]/gallery/route.ts` |
| Backoffice galeria do projeto | `azimut-cms/app/admin/projects/components/GalleryManager.tsx` |
| Schema (Project, Media, ProjectMedia) | `azimut-cms/prisma/schema.prisma` |
| Referência SQL galeria (ordem + legendas) | `sql/referencia_project_media_galeria.sql` |

---

## Resumo em uma frase

Na subpágina do projeto já temos: hero com imagem ou vídeo (vídeo só aqui); galeria em sequência com legenda opcional; campos exibidos só quando preenchidos; backoffice com “adicionar mídia”, reordenar e salvar legenda no ProjectMedia. Para não perder progresso quando a conversa cair, use este doc com “ler os andamentos” e continuar a partir daqui.
