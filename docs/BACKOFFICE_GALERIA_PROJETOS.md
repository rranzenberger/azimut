# Backoffice: Galeria das subpáginas de projetos

**Objetivo:** Como acessar e usar o backoffice para adicionar imagens/vídeos (e descrições) a cada projeto. Onde isso é guardado no SQL e como aparece na subpágina do site.

---

## 1. Como entrar nas “subpáginas” dos projetos no backoffice

As “subpáginas” dos projetos **no site** são as páginas de detalhe (ex.: `/pt/work/slug-do-projeto`).  
**No backoffice** você não entra em “subpáginas” separadas: você edita **um projeto** e, dentro dele, gerencia a **galeria** desse projeto (imagens/vídeos que aparecem na subpágina do site).

### Passo a passo

1. **Login no backoffice**  
   Acesse a URL do CMS (ex.: `https://backoffice.azmt.com.br/login`) e faça login.

2. **Lista de projetos**  
   No menu, vá em **Projetos** (ou `/admin/projects`).  
   Aparece a lista de todos os projetos (título, slug, status, etc.).

3. **Abrir um projeto**  
   Clique no projeto que deseja editar.  
   Você vai para a página de edição: `/admin/projects/[id]` (o `id` é o UUID do projeto).

4. **Abrir a seção Galeria**  
   No topo da página de edição há abas: **Dados básicos**, **Resumo e descrição**, **Imagem de capa**, **Localização**, **SEO**, **Filtros avançados**, **Galeria**, **Configurações**.  
   Clique em **Galeria** para abrir a seção **“Galeria de Mídias (subpágina do projeto)”**.

5. **Gerenciar a galeria**  
   Nessa seção você pode:
   - **Adicionar mídia:** upload de arquivo, URL externa ou mídia da biblioteca.
   - **Reordenar:** botões “Mover” (cima/baixo) para definir a ordem em que aparecem na subpágina.
   - **Legendas em 4 idiomas:** em cada item, clicar na área de legenda e preencher PT, EN, ES, FR (são as descrições que aparecem na subpágina conforme o idioma do visitante).

Tudo que você adiciona e ordena aqui é guardado no banco (tabela `ProjectMedia`) e exibido na subpágina do projeto no site.

---

## 2. Onde fica guardado no SQL (referências)

Cada projeto tem uma **galeria** = várias mídias ligadas a ele, com **ordem** e **descrição (legenda)** por idioma.

### Tabelas envolvidas

- **`Project`** – projeto (título, slug, ano, cliente, etc.).
- **`Media`** – arquivos de mídia (imagem ou vídeo): URLs, thumbnail, alt em vários idiomas.
- **`ProjectMedia`** – **relação** entre um projeto e uma mídia, com:
  - `projectId` → qual projeto
  - `mediaId` → qual mídia
  - `order` → ordem de exibição na subpágina (0, 1, 2, …)
  - `captionPt`, `captionEn`, `captionEs`, `captionFr` → descrição/legenda por idioma (opcional)

Ou seja: as imagens e vídeos da subpágina do projeto são guardados em **`Media`**; o vínculo “esta mídia pertence a este projeto, nesta ordem, com esta legenda” é guardado em **`ProjectMedia`**.

### Referência SQL

O arquivo **`sql/referencia_project_media_galeria.sql`** descreve a estrutura e tem um exemplo de consulta para listar a galeria de um projeto (por slug). O modelo no código está em **`azimut-cms/prisma/schema.prisma`** (modelo `ProjectMedia`).

---

## 3. Adicionar mais e mais material para cada projeto com descrição – já está feito?

**Sim.** Está tudo implementado:

| O quê | Onde |
|-------|------|
| Adicionar imagens e vídeos ao projeto | Seção **Galeria** na edição do projeto: upload, URL ou biblioteca. |
| Ordem na subpágina | Reordenar no GalleryManager (Mover cima/baixo); valor salvo em `ProjectMedia.order`. |
| Descrição/legenda por mídia | Em cada item da galeria: clicar na legenda e preencher os 4 idiomas (PT, EN, ES, FR). Salvo em `ProjectMedia.captionPt/En/Es/Fr`. |
| Aparecer na subpágina do site | A API pública do projeto (`/api/public/project/[slug]`) devolve a galeria ordenada e a legenda no idioma pedido; a página de detalhe do projeto exibe hero + galeria em sequência com legenda quando existir. |

Resumo: no backoffice você entra em **Projetos → [projeto] → aba Galeria** e aí adiciona quantas mídias quiser, na ordem desejada, com descrição em 4 idiomas. O SQL e as APIs já estão prontos para guardar e exibir tudo isso nas subpáginas dos projetos.
