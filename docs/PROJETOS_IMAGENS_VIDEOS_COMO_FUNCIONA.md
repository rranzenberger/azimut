# Projetos: imagens e vídeos – como funciona

## Resumo: **não precisa de SQL** no dia a dia

A estrutura já está no banco (Prisma + migrations). Você usa o **backoffice** para:

- **Uma imagem ou vídeo principal (capa)** → campo na tela **Novo Projeto** ou aba **Imagem de capa** na edição.
- **Múltiplas imagens/vídeos (galeria)** → aba **Galeria** na edição do projeto (upload, biblioteca, ordem, legendas).

Nenhum SQL é necessário para isso.

---

## Como está no banco

| O quê | Onde | Uso |
|------|------|-----|
| **Capa (1 mídia)** | `Project.heroImageId` → uma linha em `Media` | Imagem ou vídeo principal (cards, subpágina). |
| **Galeria (N mídias)** | Tabela `ProjectMedia`: `projectId` + `mediaId` + `order` + legendas (PT/EN/ES/FR) | Várias imagens/vídeos na subpágina do projeto, em sequência. |
| **Arquivos de mídia** | Tabela `Media` | Imagens e vídeos (upload ou URL). |

Ou seja:

- **1 projeto** → **1 capa** (`heroImageId`) + **N itens de galeria** (tabela `ProjectMedia`).

---

## Fluxo no backoffice

1. **Capa**
   - **Novo Projeto:** já dá para escolher ou enviar imagem/vídeo principal; o sistema grava `heroImageId` ao criar o projeto.
   - **Edição:** aba **Imagem de capa** (escolher da biblioteca ou upload). Atualiza `Project.heroImageId`.

2. **Galeria**
   - Só na **edição** do projeto (precisa do `projectId`).
   - Aba **Galeria:** adicionar mídias (upload, URL ou biblioteca), reordenar, editar legendas em 4 idiomas.
   - Cada ação chama a API `POST/PATCH/DELETE /api/admin/projects/[id]/gallery`, que usa Prisma para criar/atualizar/remover linhas em `ProjectMedia`. **Nada de SQL manual.**

---

## Quando usar SQL (opcional)

Só em casos especiais, por exemplo:

- Migrar muitos projetos de outro sistema (inserir em `Media` e `ProjectMedia` em lote).
- Corrigir dados manualmente (ex.: ajustar `order` ou legendas direto no banco).
- Relatórios ou consultas que não existem no backoffice.

Para o dia a dia (criar projeto, capa e galeria), **não é necessário SQL**.

---

## Referência SQL (só se precisar fazer algo manual)

Arquivo de exemplo: `sql/referencia_project_media_galeria.sql` (como inserir um item na galeria e conferir a estrutura). Use apenas se for fazer inserção/consulta manual no banco.
