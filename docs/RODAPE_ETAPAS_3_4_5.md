# Rodapé – Etapas 3, 4 e 5 (registro)

Use este arquivo para não nos perdermos. Marque conforme for fazendo.

---

## Checklist rápido (onde estamos)

| Etapa | O quê | Onde | Status |
|-------|--------|------|--------|
| **3** | Criar colunas (ALTER) no Neon | `sql/rodape_footer_settings.sql` – só os 3 ALTER → **Run** | [x] Feito |
| **4** | Popular rodapé (INSERT + UPDATE) no Neon | Mesmo arquivo – INSERT + UPDATE → **Run** | [x] Feito |
| **5** | Deploy (git push) | Terminal: commit + push | [x] Feito |

**Ordem:** 3 → 4 → 5. Não use **Explain** no Neon (só **Run**).

---

## Aviso: botão Run (não Explain)

No Neon SQL Editor, use **Run** para executar o script. Se usar **Explain**, dá erro de sintaxe em `ALTER TABLE` (Explain não suporta ALTER). O script está em `sql/rodape_footer_settings.sql`.

---

## Etapa 3 – Criar colunas no banco

**O quê:** Rodar no Neon só os 3 `ALTER TABLE` (whatsappNumber, vimeoUrl, behanceUrl).

**Como:** Abrir `sql/rodape_footer_settings.sql`, selecionar da linha do primeiro `ALTER` até o último `ALTER`, clicar em **Run**.

**Registro:**
- [x] Executado em: 07/02/2026 (~15:10)

---

## Etapa 4 – Popular rodapé (WhatsApp, email, redes)

**O quê:** Rodar no Neon o `INSERT` e o `UPDATE` (singleton + contactEmail, whatsappNumber, instagramUrl, etc.).

**Como:** No mesmo arquivo, selecionar do `INSERT INTO "Settings"` até o fim do `UPDATE` (antes do comentário da Etapa 5), clicar em **Run**.

**Registro:**
- [x] Executado em: 07/02/2026 (~15:10)

---

## Etapa 5 – Deploy

**O quê:** Enviar alterações do projeto (site + backoffice) para o repositório para a Vercel fazer o deploy.

**Como:** No terminal, na pasta do projeto:
```bash
git add .
git commit -m "rodape: settings WhatsApp email redes e doc etapas"
git push origin main
```

**Registro:**
- [x] Deploy em: 07/02/2026 (commit d60e696, push main – API pública settings, hook useFooterSettings, Layout rodapé)

---

## Valores atuais (podem ser alterados no backoffice depois)

| Campo           | Valor |
|-----------------|--------|
| WhatsApp        | +55 48 999701301 |
| Email contato   | contact@azimutimmersive.com |
| Instagram       | https://www.instagram.com/azimut_vr/ |
| YouTube         | https://youtube.com/@azimutart |
| LinkedIn        | https://linkedin.com/company/azimut-art |
| Vimeo           | https://vimeo.com/azimutart |
| Behance         | https://behance.net/azimutart |

O site já usa esses campos: o rodapé busca dados em **Configurações** (API pública `/api/public/settings`). Para alterar WhatsApp, email ou redes, edite em **Backoffice → Configurações → Rodapé (contato e redes no site)** e salve.
