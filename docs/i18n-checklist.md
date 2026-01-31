# Checklist i18n – Teste de idiomas e hardcoded restante

## Concluído nesta sessão

- **AcademyQuickForm**: Todas as labels, placeholders, validações e opções usam `t(lang, key)` e chaves `formAcademy*` em `i18n.ts`.
- **VancouverInterestForm**: Todas as labels, dropdowns e mensagens usam `t(lang, key)` e chaves `formVan*` em `i18n.ts`.
- **Layout (menu/dropdown e footer)**: Itens do menu (Soluções, Projetos, Studio, Academy), busca, rodapé, newsletter e links usam `t(lang, key)` com chaves `nav*` em `i18n.ts`.
- **Performance**: Code-splitting já existente no `App.tsx` (páginas secundárias com `React.lazy`).

## Arquivos que ainda usam ternários `lang === 'pt' ? ... : ...`

Para migração futura, os arquivos com mais ocorrências:

| Arquivo | Uso sugerido |
|---------|---------------|
| `src/pages/Home.tsx` | Hero, CTAs, textos da home |
| `src/pages/Work.tsx` | Filtros, labels do portfólio |
| `src/pages/Studio.tsx` | Textos do Studio |
| `src/pages/WhatWeDo.tsx` | Serviços e descrições |
| `src/pages/ServiceDetail.tsx` | Detalhes de serviço |
| `src/pages/ProjectDetail.tsx` | Detalhes de projeto |
| `src/hooks/useProject.ts` | Dados de projetos |
| `src/hooks/useSearch.ts` / `useSearch.tsx` | Sugestões de busca |
| `src/components/ProjectCard.tsx` | Cards de projeto |
| `src/components/CompanyTimeline.tsx` | Timeline |
| `src/components/PageSchemas.tsx` | Schema/SEO por página |
| `src/components/SEOGlobal.tsx` | Metadados globais |
| Outros (Breadcrumbs, Chatbot, BudgetWizard, etc.) | Migrar quando houver tempo |

## Como testar idiomas

1. Rodar o site: `npm run dev`.
2. Trocar idioma pelo header (EN, FR, PT, ES).
3. Percorrer: Home, Soluções, Projetos, Studio, Academy, Vancouver, Contato, formulários (Academy Quick, Vancouver Interest, Contact).
4. Anotar qualquer texto que permaneça em um único idioma (hardcoded).
5. Para migrar: adicionar chave em `src/i18n.ts` (en, fr, pt, es) e substituir o ternário por `t(lang, 'chave')`.
