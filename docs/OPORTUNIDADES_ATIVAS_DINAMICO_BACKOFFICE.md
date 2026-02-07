# Oportunidades Ativas: tornar dinâmico e não defasado

## Situação atual

- **No site:** A seção "Oportunidades Ativas" (Work e onde mais for usada) usa dados **estáticos** do arquivo `src/data/opportunities.ts`.
- **Atualizar hoje:** Só mudando esse arquivo e fazendo deploy — ou seja, **não é dinâmico** e tende a ficar defasado.
- **Backoffice:** Já existe **modelo e API** de editais no CMS:
  - Tabela `Edital` no Prisma (nome, sourceUrl, country, type, area, deadline, status ABERTO/FECHADO, etc.).
  - API admin: `GET/POST /api/admin/editais` e `GET/PUT/DELETE /api/admin/editais/[id]`.
  - **Não existe** tela no backoffice para listar/criar/editar editais (só referência em Leads). Ou seja, **não dá para manter “manual” pelo backoffice** ainda.
- **SQL:** A estrutura já existe (migration `add-editais-tables.sql`). **Não é preciso SQL novo** para o dia a dia; SQL só seria útil uma vez para popular dados iniciais (ex.: migrar os itens de `opportunities.ts` para o banco).

---

## Como não ficar defasado: duas formas

### Opção 1 – Manual pelo backoffice (recomendado para já usar)

1. **Backoffice – tela de Editais**
   - Criar página **Editais** no admin: listar editais, criar, editar, alterar status (Aberto/Fechado), prazo, link, país, etc.
   - Usar a API admin que já existe; a tela só precisa de formulário e tabela.

2. **API pública (site)**
   - Criar **GET /api/public/editais** (sem login):
     - Retornar apenas editais com status **ABERTO** (e talvez “em breve” se tiver).
     - Campos: nome, país, tipo/área, prazo, status, link (sourceUrl), etc., no formato que o componente do site espera.

3. **Site – componente dinâmico**
   - No componente **OportunidadesAtivas**:
     - Buscar de `GET /api/public/editais` (ex.: `${BACKOFFICE_URL}/api/public/editais`).
     - Se a API falhar ou retornar vazio, usar o array estático de `src/data/opportunities.ts` como **fallback**.

Assim, **não precisa ficar procurando disponibilidade em código**: alguém do time entra no backoffice, abre **Editais**, e cadastra/atualiza prazos, status e links. O site passa a refletir isso sozinho. **Não precisa de SQL** para isso; é tudo cadastro manual na tela.

### Opção 2 – Automatizar no futuro (opcional)

- Manter o fluxo da Opção 1.
- Depois, se quiserem:
  - Script ou job que consulta fontes externas (sites de fomento, etc.) e cria/atualiza registros na tabela `Edital` (o modelo já tem `scrapedAt`, `lastChecked`).
  - Ou integração com alguma API de editais, se existir.

Isso não substitui a revisão humana; só ajuda a **não ficar defasado** reduzindo trabalho manual.

---

## O que fazer no backoffice (quando a tela existir)

- **Editais** (lista):
  - Ver todos os editais, filtrar por país, status (Aberto/Fechado), tipo.
  - Botão “Novo edital” → formulário com: nome, link, país, tipo, área, prazo, status, etc.
- **Ao abrir um edital:**
  - Editar nome, URL, prazo (ex.: “31/12/2025”, “Rolling”, “Chamada contínua”), status (Aberto/Fechado), tags/categorias que aparecem no site.
- **Boas práticas:** Revisar periodicamente (ex.: mensal) os prazos e marcar como Fechado quando o edital encerrar, para o site não mostrar coisa defasada.

---

## Resumo direto

| Pergunta | Resposta |
|----------|----------|
| A parte de Oportunidades Ativas é dinâmica? | **Não.** Hoje é estática (arquivo `opportunities.ts`). |
| Como não ficar defasado? | Tornar dinâmico: **API pública de editais** + **componente do site consumindo essa API** + **tela no backoffice** para cadastro/edição manual. |
| Precisamos entrar manualmente? | **Sim.** A ideia é entrar no backoffice em **Editais** e manter nome, prazo, status e link atualizados. |
| Precisamos de SQL para isso? | **Não** para o dia a dia. A tabela já existe. SQL só serviria para uma **migração única** dos dados atuais de `opportunities.ts` para o banco, se quiserem. |
| Como fica no backoffice? | Com a tela de **Editais**: uma seção (menu) “Editais” ou “Oportunidades” onde se lista, cria e edita cada edital; o site lê esses dados via API pública. |

Se quiser, o próximo passo é implementar: (1) API pública GET editais, (2) tela admin Editais e (3) OportunidadesAtivas buscando da API com fallback no estático.
