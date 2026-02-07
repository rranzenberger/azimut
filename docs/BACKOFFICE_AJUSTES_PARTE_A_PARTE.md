# Backoffice — ajustes parte a parte (evitar erros com Cursor instável)

Use este guia para fazer **uma alteração por vez**, testar e só então passar à próxima.

---

## ✅ Concluído (todos os passos)

- [x] **Tema** `azimut-cms/app/admin/theme.ts` (vermelho #c92337, fundo escuro)
- [x] **Layout** usa AZIMUT (bgDark, text, border, accent) — visual alinhado ao site
- [x] **Página Mídias:** bloco "Onde usar no site" com links (Home, Projetos, Páginas) e AZIMUT
- [x] **Menu** com Guia rápido e agrupado por áreas
- [x] **Manual** com mapa "Onde cada parte do site é editada"
- [x] **Editar Home:** lista de projetos em destaque + bloco "No site: topo da Home (vídeo e capa)"
- [x] **Editar Projeto:** bloco "No site: card da Home e listagem /work" na seção Imagem de capa
- [x] **Botão Salvar** em vermelho AZIMUT em Páginas e Projetos

---

## Já feito (referência)
- Tema, Mídias com referências, Menu por áreas, Manual com mapa, blocos "No site" em Home e Projeto, botões vermelhos.

---

## Regras para não dar erro
1. Alterar **só 1 arquivo** por vez.
2. Rodar `npm run build` no `azimut-cms` depois (ou abrir o backoffice no browser).
3. Se der erro, reverter só esse arquivo e anotar.
4. Commitar após cada passo que funcionar: `git add <arquivo>; git commit -m "Backoffice: passo X"`.

---

## Se o Cursor cair de novo
Abra este arquivo (`docs/BACKOFFICE_AJUSTES_PARTE_A_PARTE.md`) e continue pelo próximo item da lista "Próximos passos". Cada item é independente.
