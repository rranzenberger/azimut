# Como fazer o melhor — Backoffice e SQL

Guia rápido de boas práticas: ordem recomendada, o que evitar e como usar cada parte.

---

## 1. SQL no Neon

| O quê | Melhor forma |
|-------|----------------|
| **Executar script** | Use o botão **Run** (Executar) para aplicar o script. |
| **Qual arquivo** | Tabelas novas: `sql/backoffice_press_publication.sql`. Só Press: `sql/backoffice_press_only.sql`. |
| **Já existe tabela?** | Pode rodar de novo: os scripts usam `IF NOT EXISTS`, não dão erro. |
| **Alternativa** | No projeto: `cd azimut-cms && npx prisma migrate deploy` (aplica migrations do Prisma). |

---

## 2. Primeira vez no backoffice

1. **Rodar o SQL** (Press e Publication) no banco do backoffice, se ainda não rodou.
2. Abrir **📖 Manual** (`/admin/help`) e dar uma lida nas áreas que você vai usar.
3. Passar o mouse nos itens do menu para ver o tooltip antes de clicar.
4. Começar por **📄 Páginas** para ver onde está cada tipo de conteúdo (incluindo Imprensa e Publicações).

---

## 3. Ordem recomendada para conteúdo

| Ordem | O quê | Por quê |
|-------|--------|---------|
| 1 | **Páginas** (Home, Studio, Academy) | Define o que aparece nas páginas principais do site. |
| 2 | **Projetos** e **Serviços** | Portfólio e oferta; o site depende disso. |
| 3 | **Imprensa** e **Publicações** | Conteúdo das páginas /press e /academy/research. |
| 4 | **Equipe**, **Credenciais**, **Timeline** | Credibilidade e “sobre nós”. |
| 5 | **Blog** e **Leads** | Conteúdo contínuo e captação. |
| 6 | **Configurações** e **Ferramentas** | Ajustes e manutenção. |

---

## 4. Boas práticas no dia a dia

- **Manual:** em dúvida sobre uma aba, consulte **📖 Manual** ou passe o mouse no item do menu.
- **Imagens:** use **🖼️ Mídias** para subir uma vez e reutilizar em projetos e páginas.
- **SEO:** preencha título e descrição (SEO) em Projetos, Blog e Páginas.
- **Idiomas:** onde houver campos PT/EN/ES/FR, preencha pelo menos PT e EN.
- **Publicar:** confira “Publicado” / “Rascunho” antes de salvar; só itens publicados vão para o site.
- **Leads:** use o **Dashboard Leads IA** para priorizar e o Kanban em **👥 Leads** para estágios.

---

## 5. O que evitar

- Não deixe projetos ou serviços em rascunho se já estiverem no ar (ou ajuste o site).
- Em **Ferramentas**, cuidado com “limpar dados” ou ações em lote em produção.

---

## 6. Resumo em uma frase

**Use Run no SQL; comece pelo Manual e por Páginas; preencha SEO e idiomas; publique só quando estiver pronto.**
