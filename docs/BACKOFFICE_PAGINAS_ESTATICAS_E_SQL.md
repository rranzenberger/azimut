# Backoffice: páginas estáticas → área Páginas e SQL

## 1. Backoffice está pronto para receber o SQL?

**Sim.** O backoffice já tem:

- **Modelos Prisma:** `Press` e `Publication` no schema.
- **APIs públicas:** `GET /api/public/press` e `GET /api/public/publications` (consumidas pelo site).
- **CRUD admin:** `/admin/press` e `/admin/publications` (listagem, novo, editar).
- **Menu lateral:** links "📰 Imprensa" e "📚 Publicações (Research)".

**O que falta:** criar as tabelas no banco. Duas opções:

1. **Prisma (recomendado):** no projeto do backoffice:
   ```bash
   cd azimut-cms && npx prisma migrate deploy
   ```
2. **SQL direto:** executar o conteúdo do arquivo **`sql/backoffice_press_publication.sql`** no PostgreSQL (Neon ou outro). O script usa `CREATE TABLE IF NOT EXISTS` e `CREATE INDEX IF NOT EXISTS`, então pode ser rodado mais de uma vez sem erro.

**No Neon SQL Editor:** use o botão **Run** (Executar). Não use **Explain** nem **Analyze**. O Explain adiciona `EXPLAIN (...)` na frente da query; `EXPLAIN` não pode ser usado com comandos DDL como `CREATE TABLE`, e o banco retorna erro de sintaxe. Executar com **Run** aplica o script diretamente.

---

## 2. Organização na área "Páginas"

Na área **📄 Páginas** do backoffice (`/admin/site-pages`):

- Foi adicionada a seção **"Áreas de conteúdo (Imprensa e Research)"**, com dois blocos:
  - **📰 Imprensa** → leva a `/admin/press` (conteúdo da página `/press` do site).
  - **📚 Publicações (Research)** → leva a `/admin/publications` (conteúdo da página `/academy/research`).

Assim, tudo que é “conteúdo por página” fica acessível a partir de **Páginas**, incluindo Imprensa e Publicações, que têm CRUD próprio (não usam o modelo `Page`).

---

## 3. Próximas partes estáticas para trazer ao backoffice

Candidatos para migrar de “código fixo” para “editável no backoffice” (e, se fizer sentido, aparecer na área Páginas):

| Parte estática | Onde no site | Sugestão no backoffice |
|----------------|--------------|------------------------|
| **Press** (releases) | `/press` | ✅ Já feito (tabela Press + CRUD). |
| **Publications** (research) | `/academy/research` | ✅ Já feito (tabela Publication + CRUD). |
| **Home** (hero, blocos, CTAs) | `/` | Já existe modelo `Page` (slug `home`). Editar em Páginas → Home. Revisar se todos os textos estão em seções/hero. |
| **Studio** (textos, credibilidade) | `/studio`, `/studio/credentials` | Páginas `studio`, `studio/about`, etc. no `Page`. Credenciais já têm CRUD em Equipe/Credenciais. |
| **Academy** (textos, cursos, workshops) | `/academy/*` | Páginas `academy`, `academy/courses`, `academy/research`, etc. Research já tem lista de publicações no backoffice. |
| **Contato** (mensagens, placeholders) | `/contact` | Página `contact` no Page; mensagens de formulário podem vir de Page ou de uma tabela “Textos do site”. |
| **Menu / Footer** (itens, rótulos) | Layout | Tabela `Setting` ou “Textos globais” (ex.: chaves menu_footer_*). |
| **Mensagens de formulário** (sucesso, erro) | Formulários | Mesmo que Contato ou Textos globais. |

Ordem sugerida para as próximas implementações:

1. Garantir que **Press** e **Publication** estão no banco (SQL acima) e que o site consome as APIs (já implementado).
2. Revisar **Home** e **Studio** no backoffice: criar/ajustar registros em `Page` e seções para que o máximo de textos saia do código.
3. **Menu/Footer** e **mensagens de formulário**: definir modelo (Settings vs. “Textos globais”) e depois implementar CRUD e consumo no site.

---

## 4. Resumo

- **SQL:** usar `sql/backoffice_press_publication.sql` (ou `prisma migrate deploy`) para criar tabelas Press e Publication.
- **Backoffice:** já pronto para Imprensa e Publicações; área **Páginas** inclui atalhos para essas duas áreas.
- **Próximos passos:** migrar mais textos estáticos (Home, Studio, Academy, menu, formulários) para o backoffice e organizá-los na área Páginas ou em seções específicas.
