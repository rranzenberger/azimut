# Relatório — Escaneamento final do backoffice (visual, UI/UX, APIs)

**Data:** 2026-02-08  
**Objetivo:** Varredura completa do backoffice para edição e páginas/subpáginas no padrão visual (preview “como no site”, trocar/adicionar/remover), conformidade de APIs e melhorias de UI/UX e desempenho.

---

## 1. Padrão visual de referência (estilo “Projetos”)

- **Listagem:** Cards em grid com imagem grande, título, metadados (local, ano, tags), botão **Trocar** (trocar capa), ícones de galeria/adicionar, botão **EDITAR ESTE PROJETO** e link “Edição completa →”.
- **Edição [id]:** No topo um bloco **“Como aparece no site”** (MediaPreviewBlock): card principal + faixa de miniaturas da galeria; depois seção **Capa e Galeria** (UnifiedMediaUpload + GalleryManager) para trocar/adicionar/remover/reordenar; navegação por ícones (🖼️ 📋 📍 📝).

---

## 2. Escaneamento por área

### 2.1 Projetos

| Tela | Caminho | Visual (preview + trocar/adicionar) | Observação |
|------|---------|-------------------------------------|------------|
| Listagem | `/admin/projects` | ✅ Cards com thumb, link para edição | Sem botão “Trocar” inline no card (abre [id] para trocar). |
| Edição | `/admin/projects/[id]` | ✅ MediaPreviewBlock + Capa e Galeria + GalleryManager | Padrão de referência. |
| Novo | `/admin/projects/new` | ✅ UnifiedMediaUpload para capa | Sem preview “como no site” no topo (opcional). |
| Home (destaques) | Páginas → Editar Home | ✅ Cards com Trocar, galeria, EDITAR ESTE PROJETO | Dentro da edição da página Home. |

**APIs:** `GET/POST /api/admin/projects`, `GET/PUT /api/admin/projects/[id]`, `GET/POST/PUT/DELETE /api/admin/projects/[id]/gallery` — **conforme**.

---

### 2.2 Páginas (site)

| Tela | Caminho | Visual | Observação |
|------|---------|--------|------------|
| Edição por slug | `/admin/pages/edit/[[...slug]]` | ✅ | Hero: MediaPreviewBlock + UnifiedMediaUpload/VideoWithThumbnailField. Home: cards destaque com Trocar/EDITAR. Academy e Newsletter: preview hero. Seção “Vídeo e capa” para todos exceto Studio. |

**APIs:** `GET/PUT /api/admin/pages/[...slug]`, `GET /api/admin/pages` — **conforme**.

---

### 2.3 Blog

| Tela | Caminho | Visual | Observação |
|------|---------|--------|------------|
| Listagem | `/admin/blog` | ✅ Cards com thumb da capa, link editar | Sem “Trocar” inline. |
| Edição | `/admin/blog/[id]` | ✅ MediaPreviewBlock + UnifiedMediaUpload + URL | Capa: upload, biblioteca e URL. |
| Novo | `/admin/blog/new` | ✅ MediaPreviewBlock + UnifiedMediaUpload + URL | Idem. |

**APIs:** `GET/POST /api/admin/blog/posts`, `GET/PUT/DELETE /api/admin/blog/posts/[id]`, `GET /api/admin/blog/categories` — **conforme**.

---

### 2.4 Equipe (Team)

| Tela | Caminho | Visual | Observação |
|------|---------|--------|------------|
| Listagem | `/admin/team` | ✅ Cards com photoUrl | Link para edição. |
| Edição | `/admin/team/[id]` | ✅ MediaPreviewBlock + UnifiedMediaUpload + URL | Foto: upload, biblioteca e URL. |
| Novo | `/admin/team/new` | ✅ Mesmo formulário (TeamEditForm) | Idem. |

**APIs:** `GET/POST /api/admin/team`, `GET/PUT/DELETE /api/admin/team/[id]` — **conforme**.

---

### 2.5 Making-of

| Tela | Caminho | Visual | Observação |
|------|---------|--------|------------|
| Listagem | `/admin/making-of` | ✅ Lista com thumb (mediaFiles[0]) | Sem “Trocar” inline; sem tela [id]. |
| Curadoria | `/admin/making-of/curation` | ✅ Grid com thumb, aprovar/publicar | Depende de GET making-of e approve. |
| Novo | `/admin/making-of/new` | Formulário texto | Cria e redireciona para `/admin/making-of/[id]` — **página [id] não existe** (404). |

**APIs:**
- **Correção feita:** Criado **GET e POST `/api/admin/making-of`** (listagem e criação). Antes a listagem e o “Novo” retornavam 404.
- **Correção feita:** Criado **POST `/api/admin/making-of/[id]/approve`** (curadoria usava e não existia).
- **Existentes:** `POST /api/admin/making-of/[id]/publish` — conforme.
- **Faltando para edição visual:** `GET /api/admin/making-of/[id]` e `PUT /api/admin/making-of/[id]` para ter tela de edição por item (ver `docs/MAKING_OF_EDICAO_VISUAL_PLANO.md`).

---

### 2.6 Demais áreas (sem mídia imagem ou já adequadas)

| Área | Listagem | Edição [id] | Mídia | Observação |
|------|----------|-------------|-------|------------|
| **Serviços** | Cards/lista | Formulário (ServiceEditForm) | Só `icon` (texto) | Sem imagem; UI consistente. |
| **Press** | Lista, link editar | PressEditForm | Sem campo imagem no form atual | — |
| **Publications** | Lista, link editar | PublicationEditForm | Idem | — |
| **History** | Cards | HistoryEditForm | logoUrl (texto) | Opcional: preview + upload. |
| **Credentials** | Lista | CredentialEditForm | Só ícone texto | — |
| **Editais** | Tabela | EditalEditForm | — | — |
| **Markets** | Cards | MarketEditForm | — | — |
| **Mídias** | `/admin/media` | — | Lista com thumb, upload | OK. |
| **Newsletter** | Inscritos, stats, enviar | — | N/A | Não edita conteúdo com imagem. |
| **Leads** | Lista/Kanban | LeadDetails | N/A | — |
| **Analytics, Dashboard, Settings, Help, etc.** | — | — | N/A | Funcionais. |

**APIs** usadas por essas áreas (editais, press, publications, services, history, credentials, markets, footer, newsletter, leads, analytics, users, settings, translate, media): **existem e estão conforme** (rotas listadas em `app/api/admin/`).

---

## 3. Resumo de APIs

| API | Status antes | Ação |
|-----|----------------|------|
| `GET /api/admin/making-of` | **Faltando** | ✅ **Criada** — listagem com filtros type/status e mediaFiles. |
| `POST /api/admin/making-of` | **Faltando** | ✅ **Criada** — criação com uploadedBy = session.userId. |
| `POST /api/admin/making-of/[id]/approve` | **Faltando** | ✅ **Criada** — atualiza status para APPROVED. |
| Demais rotas usadas pelo admin | Existentes | Nenhuma quebrada identificada. |

---

## 4. Conformidade visual (trocar / adicionar / remover)

- **No padrão completo (preview + trocar/adicionar/remover):**  
  Projetos [id], Páginas (Home, Academy, Newsletter), Blog [id] e new, Team [id] e new.
- **Listagens com card visual e link para edição (trocar na tela [id]):**  
  Projetos, Blog, Team, Making-of.
- **Ainda sem tela de edição visual por item:**  
  Making-of [id] (depende de GET/PUT por id — ver plano no doc).

---

## 5. Melhorias recomendadas (UI/UX e desempenho)

1. **Projetos — listagem**  
   Opcional: botão **“Trocar”** em cada card que abra um modal rápido para trocar apenas a capa (upload/biblioteca) sem sair da lista. Hoje o fluxo é “clique no card → edição completa”.

2. **Making-of — tela [id]**  
   Quando existir `GET/PUT /api/admin/making-of/[id]`, implementar página de edição com MediaPreviewBlock + seção mídia (upload/galeria), conforme `docs/MAKING_OF_EDICAO_VISUAL_PLANO.md`.

3. **History [id]**  
   Opcional: preview do `logoUrl` + UnifiedMediaUpload para logo.

4. **Performance**  
   - Listagens que carregam muitas mídias (ex.: projetos com `heroImage`) já usam include enxuto onde possível.  
   - Manter `limit` nas listagens (ex.: media?limit=100) para não sobrecarregar.

5. **Direção de arte / consistência**  
   - Tema escuro, bordas e botões (verde “EDITAR”, roxo “Trocar”, azul links) já alinhados em Projetos, Páginas e Blog.  
   - Reutilizar MediaPreviewBlock e UnifiedMediaUpload em qualquer nova tela com mídia.

---

## 6. Conclusão

- **APIs:** As únicas rotas faltantes eram Making-of (GET/POST e approve). Foram criadas; as demais estão conformes.
- **Visual:** Projetos, Páginas (Home, Academy, Newsletter), Blog e Team estão no padrão visual com preview, trocar/adicionar (e remover/reordenar em Projetos). Making-of listagem/criação/curadoria funcionam; falta apenas a tela [id] quando a API por id existir.
- **Relatório e plano:** Este documento e `docs/BACKOFFICE_VISUAL_MIDIA_ESCANEAMENTO.md` + `docs/MAKING_OF_EDICAO_VISUAL_PLANO.md` servem como referência para manter o backoffice visual, consistente e com APIs íntegras.
