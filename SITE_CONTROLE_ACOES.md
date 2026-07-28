# 🌐 AZIMUT SITE — Controle de Ações
**Última atualização:** 2026-06-05 (sessão completa)
**Branch:** claude/heuristic-pasteur-4910fd (4 commits · build validado · aguardando merge)
**PR:** https://github.com/rranzenberger/azimut/pull/new/claude/heuristic-pasteur-4910fd

---

## ✅ RESOLVIDO (no PR — mergear para ir a produção)

| Item | Como foi resolvido |
|------|-------------------|
| BUG 2 — Markdown bruto nos cases | `react-markdown` + `remark-gfm` em `ProjectDetail.tsx` |
| BUG 3 — `/work/review` 404 | Link removido do rodapé (`Layout.tsx`) |
| BUG 4 — Canonical + hreflang | www→azimutimmersive.com; hreflang deduplicado; home PT→/pt |
| BUG 5 — Contraste hero modo claro | Já estava OK no código atual |
| BUG 1 — /game em branco | Funciona em produção; wrapper React adicionado (`/play/`) |
| Host canônico | `azimutimmersive.com` em 213 lugares (SEO, sitemap, schema) |
| Página /partner | Nova rota criada (`src/pages/Partner.tsx`) — PT/EN/ES/FR + formulário |
| SEO home premium | Títulos e descriptions com keyword "experiência imersiva museu Brasil" |

---

## 🔴 PENDENTE — Você faz na Vercel (painel, não código)

- [ ] **Vercel → Domains:** `azmt.com.br` + `azmt.ca` → Redirect para `azimutimmersive.com`
- [ ] **Google Search Console:** adicionar `azimutimmersive.com` como propriedade
- [ ] **Bing Webmaster:** idem

---

## 🔴 PENDENTE — Você faz no Backoffice CMS

### Semana 1 — Crítico
- [ ] Trocar demoreel velho da home → campo **"Demoreel"** na página Home (cole URL do YouTube/MP4 novo)
- [ ] Deletar **"Marco Exemplo - Editar no Backoffice"** da timeline
- [ ] Deletar **"Hito Ejemplo"** da timeline ES
- [ ] Substituir `+55 (21) 99999-9999` em `/press`
- [ ] Adicionar foto real do Museu Olímpico como hero background

### Semana 2
- [ ] Colar copy do case Museu Olímpico → arquivo `CASE_MUSEU_OLIMPICO_COPY.md`
- [ ] Adicionar 3 números no hero: `30 anos · 99 projetos · Brasil ↔ Canadá`
- [ ] Subir logos (PNG/SVG fundo transparente): Prefeitura RJ, Museu Olímpico, Gramado, Autodesk, TV Globo, YDreams, Hoplon, XRBR, SENAC, Flamengo, VFS, VanArts
- [ ] Coletar 2-3 depoimentos reais de clientes (modelo em `CAPTACAO_PACK_AZIMUT.md`)
- [ ] Thumbnails reais nos artigos do blog

---

## 🟡 PENDENTE — Claude Code (quando tiver tempo)

- [ ] **Wall of logos no código** — quando você tiver os PNGs/SVGs, pedir ao Claude Code criar seção "Confiam na Azimut" na home (carrossel cinza→colorido)
- [ ] **Contador animado no hero** — `30 anos · 80+ experiências · +20k visitantes` (intersection observer)
- [ ] **Artigos de blog** — publicar os 4 de `BLOG_ARTIGOS_SEO.md` no CMS (falta só imagem de capa)
- [ ] **Geolocalização por IP** — middleware Next.js (prompt pronto abaixo)

---

## 📋 COPY PRONTO — Só colar no CMS

| Conteúdo | Arquivo |
|----------|---------|
| Case Museu Olímpico (4 idiomas, números verificados) | `CASE_MUSEU_OLIMPICO_COPY.md` |
| 4 artigos de blog SEO completos | `BLOG_ARTIGOS_SEO.md` |
| Página /partner (4 idiomas) | `PARTNER_PAGE_COPY.md` |
| E-mails de prospecção por segmento | `CAPTACAO_PACK_AZIMUT.md` |
| Posts LinkedIn de lançamento | `CAPTACAO_PACK_AZIMUT.md` |
| Follow-up Mila/n8n (3 e-mails) | `MILA_FOLLOWUP_EMAILS.md` |
| Posicionamento oficial de marca | `CAPTACAO_PACK_AZIMUT.md` |

---

## 🔗 LINKS RÁPIDOS

| Recurso | URL |
|---------|-----|
| Site (canônico) | https://azimutimmersive.com |
| Notion — Central | https://app.notion.com/p/36f10eecfef7812fb8d7d52d874af533 |
| Drive — Pack Premium | https://docs.google.com/document/d/1qJX7wp4SDdtzSst-RfGkAiCBSrYqWCLxpXkGbsZDO0k/edit |
| Drive — Case Final | https://docs.google.com/document/d/1jXpHGgW5sPslG3aCHR0be9Ya--deXKddComlAiIlLIw/edit |
| Drive — Blog Artigos | https://docs.google.com/document/d/1lvhExPtoc0lUkr8SapK_XkckhOMlVuWdC9Pwhdrpzl0/edit |
| WhatsApp | https://wa.me/5548999701301 |
| Email | contact@azimutimmersive.com |

---

## PROMPT PRONTO — Geolocalização (Claude Code)

```
Implemente middleware de geolocalização em Vite/React usando
o header CF-IPCountry do Cloudflare (disponível na Vercel).
Lógica: BR→/pt | AR/MX/CL/CO/PE/ES→/es | FR/BE→/fr | CA+QC→/fr | resto→/en
Regras: não redirecionar se URL já tem prefixo de idioma;
salvar preferência em cookie 'user-lang' 30 dias;
não sobrescrever cookie existente (respeitar escolha manual).
```

---

*Atualizar este arquivo a cada sessão de trabalho no site.*
