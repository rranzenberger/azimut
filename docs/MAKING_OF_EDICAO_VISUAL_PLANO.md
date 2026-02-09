# Making-of — Plano de edição visual por item

## Situação atual

- **Listagem:** `/admin/making-of` — lista itens com thumb da primeira mídia (`mediaFiles[0]`).
- **Curadoria:** `/admin/making-of/curation` — aprovar/publicar em lote.
- **Novo:** `/admin/making-of/new` — cria item e redireciona para `/admin/making-of/{id}`.
- **Problema:** Não existe tela `/admin/making-of/[id]` para editar um item (trocar título, descrição, **mídias**, etc.). O redirect após criar leva a um 404.

## API

- `POST /api/admin/making-of` — criar (existe).
- `GET /api/admin/making-of?status=...` — listar (existe).
- `POST /api/admin/making-of/[id]/publish` — publicar (existe).
- **Faltam:** `GET /api/admin/making-of/[id]` e `PUT /api/admin/making-of/[id]` para buscar e atualizar um item.

## Padrão visual desejado (quando [id] existir)

Seguir o mesmo padrão de **Projetos** e **Blog**:

1. **Preview no topo** — bloco “Como aparece no site”:
   - Card principal com a primeira mídia (imagem ou vídeo).
   - Faixa de miniaturas das demais `mediaFiles` (galeria).
   - Título do making-of.

2. **Seção de mídia em primeiro:**
   - **UnifiedMediaUpload** para a “capa” (primeira mídia) ou equivalente.
   - **Galeria** para as demais mídias: adicionar, reordenar, legendas, trocar, remover (similar ao `GalleryManager` de projetos, adaptado para `MakingOfMedia` ou estrutura atual).

3. **Depois:** dados básicos (título, descrição, tipo, cliente, datas, flags de publicação).

4. **Navegação por ícones** no topo (opcional): 🖼️ Mídia, 📋 Dados, 📝 Textos, etc., com scroll para a seção.

## Passos para implementar

1. **Backend**
   - Criar `GET /api/admin/making-of/[id]/route.ts` — buscar um making-of por id com `mediaFiles` (e relação com Media).
   - Criar `PUT /api/admin/making-of/[id]/route.ts` — atualizar título, descrição, e associação de mídias (se o modelo permitir reordenar/alterar `mediaFiles`).

2. **Frontend**
   - Criar `app/admin/making-of/[id]/page.tsx`:
     - Fetch do item por id.
     - **MediaPreviewBlock** no topo (mainImageUrl = primeira mídia, galleryItems = demais).
     - Seção “Mídia” com upload/capa + galeria (componente reutilizável ou adaptação do GalleryManager para making-of).
     - Formulário com os campos atuais do making-of (título, descrição, tipo, etc.).
   - Ajustar redirect em `making-of/new` para seguir para `/admin/making-of/[id]` após criar (já faz; só falta a página [id]).

3. **Modelo de dados**
   - Verificar no Prisma como `MakingOf` se relaciona com mídias (`mediaFiles` / `MakingOfMedia`). Garantir que a API de update permita atualizar essa relação (connect/disconnect ou ordem).

Quando a API GET/PUT por [id] estiver disponível, usar este plano para implementar a tela de edição com o mesmo padrão visual do restante do backoffice.
