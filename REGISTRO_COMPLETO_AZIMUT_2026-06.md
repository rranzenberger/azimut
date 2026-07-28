# 📚 REGISTRO COMPLETO — Azimut Site & Captação
**Data:** 2026-06-05 · **Sessão:** Claude Code + Claude Chrome (auditoria) + Notion/Drive MCP
**Branch de trabalho:** `claude/heuristic-pasteur-4910fd`

> Documento mestre consolidando auditoria, correções, decisões e próximos passos.
> Espelhado em: Notion (Central de Captação), memória do projeto (Claude/Obsidian) e Google Drive.

---

## 1. CORREÇÕES JÁ FEITAS (no preview, aguardando merge)

Branch `claude/heuristic-pasteur-4910fd` — 3 commits, build validado ✓

### Commit 1 — `fix(seo+cms)` (1d47dde)
- **BUG 2 — Markdown nos cases:** `ProjectDetail.tsx` usava `dangerouslySetInnerHTML` → `##` e `**` apareciam crus. Agora usa `react-markdown` + `remark-gfm` com `prose` adaptado a tema claro/escuro. **Afeta o case do Museu Olímpico.**
- **BUG 3 — Link morto `/work/review`:** removido do rodapé (`Layout.tsx`, 2 lugares) — dava 404.
- **BUG 4 — Canonical/hreflang:**
  - Site faz 308 `azmt.com.br → www`; canonical apontava pra URL que redireciona.
  - Removido hreflang **duplicado** (estava no `index.html` E no `SEO.tsx`).
  - Canonical da home PT ia pra raiz `/`; agora `/pt` (bate com hreflang).
- `_redirects` alinhado.

### Commit 2 — `seo: host canônico azimutimmersive.com` (34559c7)
- Host canônico trocado para **`azimutimmersive.com`** em canonical, hreflang, og:image, sitemap, schema, twitter:domain (213 ocorrências).
- **Mantidos intactos:** e-mails `@azmt.com.br` (contatos reais) e subdomínio `backoffice.azmt.com.br` (API do CMS).

### Commit 3 — `fix(game)` (4a87f13)
- Jogo estático movido para `/{lang}/play/` (era `/{lang}/game/`) para não sombrear a rota React `/:lang/game`.
- Agora a rota `/pt/game` usa o **wrapper `Game.tsx`** (loading + fallback de erro + tratamento mobile) que carrega o jogo no iframe.
- Arquivos: `scripts/copy-game.cjs` + `Game.tsx`.

### Já estava resolvido no código
- **BUG 5 — Contraste do hero no modo claro:** o hero é sempre escuro e força cores claras com `!important` (`AzimutHero.tsx` linhas 259-266). A auditoria viu versão antiga.

### BUG 1 — `/game` em branco → na verdade FUNCIONA
- Verificado em produção: HTML/JS/CSS do jogo carregam 200. A tela branca era da versão antiga.
- O jogo tem botão próprio "Voltar ao Site" e ErrorBoundary anti-tela-roxa (mobile).
- A melhoria do commit 3 adiciona rede de segurança caso o JS do jogo falhe ao baixar.

---

## 2. DECISÃO DE DOMÍNIO (estratégica)

**Host canônico = `azimutimmersive.com`** (sem www) — escolhido por ser `.com` internacional/profissional para captação global (BR + Canadá + mundo).

Estado verificado ao vivo (jun/2026): vários domínios servem o MESMO site Azimut com status 200:
- `azimutimmersive.com` (canônico)
- `azmt.ca` (200, sem redirect)
- `azmt.com.br` (308 → www.azmt.com.br)
- ⚠️ `enberger.com` e `architecad.com` (servindo o site Azimut — marcas diferentes!)

### Ações pendentes (você)
1. **Vercel → Settings → Domains:** definir `azimutimmersive.com` como Primary; pôr `azmt.com.br`, `azmt.ca` para **Redirect** a ele.
2. **Avaliar `enberger.com` / `architecad.com`:** são marcas distintas (pessoal / arquitetura). Hoje servem o site Azimut e emitem canonical=azimutimmersive.com. OK como vitrine temporária, mas no futuro devem ter sites próprios (senão "queimam" SEO em favor da Azimut).
3. **SEO:** registrar `azimutimmersive.com` no Google Search Console + Bing.

---

## 3. VÍDEO DA HOME (demoreel velho)

O vídeo grande da home ("Watch Our Work") segue esta prioridade (`Home.tsx` ~linha 1016):
1. Campo **`Demoreel`** do backoffice (página Home) — se preenchido
2. Vídeo do projeto em destaque
3. Fallback local `/demo-azimut.mp4` ← **provavelmente o vídeo velho que aparece**

**Solução (sem código):** no backoffice, página Home, campo **"Demoreel / Watch Our Work"**, colar URL de vídeo novo (YouTube ou MP4). Também há `demoreelThumbnailUrl`.

**Recomendação:** demoreel deve ser **footage REAL** dos projetos editado (não IA). IA (Higgsfield/Flux) só para b-roll de redes e imagens de blog.

---

## 4. CASE MUSEU OLÍMPICO — COPY 4 IDIOMAS

Copy completo pronto pra colar no campo Description do projeto `museu-olimpico-rio`.
**Arquivo:** [CASE_MUSEU_OLIMPICO_COPY.md](CASE_MUSEU_OLIMPICO_COPY.md)
**Google Drive:** https://docs.google.com/document/d/1_kLj_KxETBcKMTx8nrn8l1sQaIfMeI_hzwvXfU6snV4/edit
**Notion:** https://app.notion.com/p/37610eecfef78177a2e5d7d76eeb008a

Dados usados (confirmados): **22 meses · 1.700 m² · 80 experiências · 13+ empresas · Velódromo/Parque Olímpico, Barra da Tijuca, RJ · destaque no O Globo.**
Equipe: Ranz Enberger (Direção Geral) · Anick (Arte) · Alberto (Audiovisual).

### [CONFIRMAR] — preencher quando tiver
- Número de visitantes (mês ou total)
- Prêmios/reconhecimentos além do O Globo

---

## 5. AUTOMAÇÃO — qual ferramenta para quê

| Conteúdo | Melhor solução |
|---|---|
| Textos/cases/copy (4 idiomas) | **Claude (chat)** — dá dados brutos, devolve pronto pra colar |
| Vídeo demoreel/portfólio | Footage real, editado |
| Imagens conceituais (blog) | Higgsfield / Flux |
| Fotos de projeto | Reais, sempre |
| Estrutura/campos CMS | Backoffice manual ou Claude Code (quando repetitivo) |

**Fluxo solo:** ao revisar no Claude Chrome + CMS, anotar os placeholders → trazer a lista pro Claude → gera textos em lote (PT/EN/ES/FR) → colar. Manual fica só pra subir mídia.

---

## 6. PRÓXIMOS PASSOS (ordem)

1. [ ] Abrir PR: https://github.com/rranzenberger/azimut/pull/new/claude/heuristic-pasteur-4910fd
2. [ ] Validar preview: case do Museu (markdown OK?) + `/pt/game` (carrega?)
3. [ ] Configurar redirects de domínio na Vercel
4. [ ] Merge na `main` → produção
5. [ ] Colar copy do case Museu no backoffice (4 idiomas)
6. [ ] Trocar demoreel da home no backoffice
7. [ ] Próximas peças de captação: wall of logos, depoimentos, e-mail de prospecção

---

## 7. ONDE ESTÁ TUDO

| Recurso | Local |
|---|---|
| Controle de ações/bugs | [SITE_CONTROLE_ACOES.md](SITE_CONTROLE_ACOES.md) |
| Copy do case Museu | [CASE_MUSEU_OLIMPICO_COPY.md](CASE_MUSEU_OLIMPICO_COPY.md) |
| Este registro mestre | REGISTRO_COMPLETO_AZIMUT_2026-06.md |
| Notion — Plano de Ação | https://app.notion.com/p/37610eecfef78149aaffd8e962612481 |
| Notion — Bugs / CMS / Blog / Leads | bancos dentro da página acima |
| Google Drive — Case | https://docs.google.com/document/d/1_kLj_KxETBcKMTx8nrn8l1sQaIfMeI_hzwvXfU6snV4/edit |
| Memória do projeto (Claude) | `azimut-site-plano-acao.md` |

---

*Atualizar este documento a cada sessão de trabalho no site.*
