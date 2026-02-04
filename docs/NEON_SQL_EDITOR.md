# Neon SQL Editor: como executar scripts corretamente

## Regra importante

No **Neon SQL Editor** existem três botões:

| Botão    | O que faz | Quando usar |
|----------|-----------|-------------|
| **Run**  | Executa o SQL diretamente | ✅ **Sempre** para criar/alterar tabelas (DDL) |
| **Explain** | Coloca `EXPLAIN (...)` na frente da query | Só para SELECT/INSERT/UPDATE/DELETE (analisar plano de execução) |
| **Analyze** | Coloca `EXPLAIN (ANALYZE, ...)` na frente | Idem, não use com DDL |

## Por que dá erro com Explain/Analyze?

O PostgreSQL **não permite** usar `EXPLAIN` com comandos DDL, por exemplo:

- `CREATE TABLE`
- `ALTER TABLE`
- `CREATE INDEX`
- `DROP TABLE`

Se você clicar em **Explain** ou **Analyze** com um script desse tipo, o Neon monta algo como:

```sql
EXPLAIN (ANALYZE, FORMAT JSON, ...) ALTER TABLE "Service" ADD COLUMN ...
```

O PostgreSQL retorna: **syntax error at or near "ALTER"**.

## Fluxo correto para scripts do projeto

1. Abra o **Neon SQL Editor** (branch `main` ou o branch do seu ambiente).
2. Cole o conteúdo do arquivo SQL (ex.: `sql/backoffice_press_publication.sql`, `sql/service_faqs_columns.sql`).
3. Clique **apenas** no botão **Run** (Executar).
4. Confira a mensagem de sucesso na parte inferior.

Não use **Explain** nem **Analyze** para esses scripts.

## Scripts que exigem "Run"

- `sql/backoffice_press_publication.sql` — cria tabelas Press e Publication
- `sql/backoffice_press_only.sql` — só tabela Press
- `sql/service_faqs_columns.sql` — adiciona colunas de FAQ na tabela Service

Todos têm um comentário no topo lembrando de usar **Run**. Este doc é a referência única para quem for rodar SQL no Neon.
