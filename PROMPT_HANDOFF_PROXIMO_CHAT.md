# 🔄 PROMPT DE HANDOFF — Colar no início do próximo chat

```
Olá! Sou Ranz Enberger, fundador da Azimut (azimutimmersive.com) —
estúdio imersivo binacional Brasil↔Canadá.

Leia a memória do projeto antes de começar.
Os arquivos estão na pasta do projeto em:
C:\Users\ranz\Documents\azimut-site-vite-tailwind\

Arquivos-chave:
- REGISTRO_COMPLETO_AZIMUT_2026-06.md   (tudo que foi feito nesta sessão)
- SITE_CONTROLE_ACOES.md                (bugs, status, prompts prontos)
- CAPTACAO_PACK_AZIMUT.md               (copy premium, e-mails, LinkedIn)
- CASE_MUSEU_OLIMPICO_COPY.md           (case 4 idiomas, números reais)
- BLOG_ARTIGOS_SEO.md                   (4 artigos prontos para publicar)
- PARTNER_PAGE_COPY.md                  (página /partner, 4 idiomas)
- PROMPT_HANDOFF_PROXIMO_CHAT.md        (este arquivo)

Notion Central: https://app.notion.com/p/36f10eecfef7812fb8d7d52d874af533
Google Drive Pack: https://docs.google.com/document/d/1qJX7wp4SDdtzSst-RfGkAiCBSrYqWCLxpXkGbsZDO0k/edit

--- ESTADO ATUAL ---

BRANCH: claude/heuristic-pasteur-4910fd (3 commits, build validado)
PR aberto: https://github.com/rranzenberger/azimut/pull/new/claude/heuristic-pasteur-4910fd
FALTA: mergear PR após validar o preview da Vercel.

BUGS RESOLVIDOS NO PR (aguardando merge):
[✅] BUG 2 — Markdown nos cases (react-markdown)
[✅] BUG 3 — Link morto /work/review removido
[✅] BUG 4 — Canonical/hreflang corrigidos; host canônico = azimutimmersive.com
[✅] BUG 5 — Contraste hero (já estava OK)
[✅] BUG 1 — Game: funciona em produção; melhorado (wrapper React + /play/)

PENDÊNCIAS TÉCNICAS:
[ ] Vercel → Domains: azmt.com.br + azmt.ca → redirect para azimutimmersive.com
[ ] Registrar azimutimmersive.com no Google Search Console + Bing
[ ] Implementar wall of logos no código (precisa dos PNGs/SVGs dos logos)
[ ] Criar rota /[lang]/partner (código pronto em PARTNER_PAGE_COPY.md)
[ ] Implementar contador animado no hero: 30 anos · 80+ exp · +20k visitantes

PENDÊNCIAS DE CONTEÚDO (no backoffice):
[ ] Trocar demoreel velho da home (campo "Demoreel" na página Home)
[ ] Colar copy do case Museu Olímpico (4 idiomas — arquivo CASE_MUSEU_OLIMPICO_COPY.md)
[ ] Deletar "Marco Exemplo" da timeline
[ ] Deletar "Hito Ejemplo" da timeline ES
[ ] Substituir telefone +55 (21) 99999-9999 em /press
[ ] Adicionar foto real do Museu Olímpico como hero background
[ ] Subir logos para wall of logos (12 logos listados em CAPTACAO_PACK_AZIMUT.md)
[ ] Adicionar depoimentos reais (modelo de pedido em CAPTACAO_PACK_AZIMUT.md)

COPY PRONTO PARA PUBLICAR:
[✅] Case Museu Olímpico (4 idiomas, números verificados)
[✅] 4 artigos de blog SEO (prontos, falta só imagem de capa)
[✅] Página /partner (4 idiomas, falta implementar a rota)
[✅] E-mails de prospecção por segmento (4 templates)
[✅] Posts de LinkedIn de lançamento
[✅] Posicionamento oficial de marca (4 idiomas)

DOMÍNIO CANÔNICO: azimutimmersive.com (sem www)
Shortlinks: azmt.com.br (308→www), azmt.ca (serve direto, falta redirect)
⚠️ enberger.com e architecad.com servem o site Azimut (marcas distintas — avaliar)

MUSEU OLÍMPICO — métricas verificadas:
Inaugurado ago/2025 · 1.700 m² · 80 exp · 13 núcleos · ~1.000 peças · +20 mil visitantes · O Globo

--- QUERO CONTINUAR COM: ---
[descreva aqui o que quer fazer]
```

---

## Resumo do que já existe (para referência rápida)

### Arquivos na pasta do projeto
| Arquivo | Conteúdo |
|---------|----------|
| REGISTRO_COMPLETO_AZIMUT_2026-06.md | Tudo feito nesta sessão |
| SITE_CONTROLE_ACOES.md | Bugs + roadmap + prompts |
| CAPTACAO_PACK_AZIMUT.md | Copy premium completo |
| CASE_MUSEU_OLIMPICO_COPY.md | Case 4 idiomas (FINAL) |
| BLOG_ARTIGOS_SEO.md | 4 artigos prontos |
| PARTNER_PAGE_COPY.md | Página /partner 4 idiomas |

### Notion
| Página | Link |
|--------|------|
| Central de Captação | https://app.notion.com/p/36f10eecfef7812fb8d7d52d874af533 |
| Site — Plano de Ação | https://app.notion.com/p/37610eecfef78149aaffd8e962612481 |
| Bugs Críticos (kanban) | https://app.notion.com/p/33a6427a6aac413d872717ac5d92b598 |
| Conteúdo CMS (tabela) | https://app.notion.com/p/f80e6ceaefe245ae9446e2b391aefae0 |
| Blog & Conteúdo | https://app.notion.com/p/a5d56bba24b34975858d9dba32398d46 |
| Pipeline de Leads | https://app.notion.com/p/850cd23bfe5943bda2b4deeaaaae7fb7 |
| Case Museu Olímpico | https://app.notion.com/p/37610eecfef78177a2e5d7d76eeb008a |
| Pack de Captação | https://app.notion.com/p/37610eecfef7819caca9cca582fe88d5 |

### Google Drive
| Doc | Link |
|-----|------|
| Case Museu FINAL | https://docs.google.com/document/d/1jXpHGgW5sPslG3aCHR0be9Ya--deXKddComlAiIlLIw/edit |
| Pack de Captação Premium | https://docs.google.com/document/d/1qJX7wp4SDdtzSst-RfGkAiCBSrYqWCLxpXkGbsZDO0k/edit |
| Blog 4 artigos SEO | https://docs.google.com/document/d/1lvhExPtoc0lUkr8SapK_XkckhOMlVuWdC9Pwhdrpzl0/edit |
