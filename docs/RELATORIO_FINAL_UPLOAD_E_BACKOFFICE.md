# Relatório final: onde fazer upload e onde atualizar no backoffice

> **Mapa completo site ↔ backoffice:** ver também `docs/MAPA_SITE_BACKOFFICE.md` e, no backoffice, **Manual** (menu) → seção "Mapa: Onde cada parte do site é editada".

## 0. Reorganização do backoffice (UX para leigos)

Na **edição de Páginas** (ex.: Home), no topo há um **Guia rápido — O que você quer atualizar?** com botões que levam direto a cada área, em vez de rolar a página inteira:

| Botão no Guia | O que edita |
|---------------|-------------|
| **Nome e status** | Nome da página e se está Publicado/Rascunho |
| **Textos do topo** | Slogan (H1), subtítulo, descrição mobile/desktop |
| **Vídeo e capa do topo** | Vídeo do hero e thumbnail (só nesta seção) |
| **Imagens dos cards (Projetos)** | Abre a lista de Projetos — as imagens dos cards vêm de cada projeto |
| **Pilares (categorias)** | Textos dos badges/pills na Home (ex.: Museus & exposições) |
| **SEO (Google)** | Título e descrição para busca |

**Fluxo recomendado:** 1) Enviar arquivos em **Mídias** (menu lateral). 2) Na página ou no projeto, usar "Selecionar da Biblioteca" ou "Fazer upload" no campo desejado.

---

## 1. Visão geral

| O que você quer atualizar | Onde no backoffice | Onde fazer upload primeiro |
|---------------------------|--------------------|----------------------------|
| **Vídeo e thumbnail do topo da Home** (hero) | Páginas → Editar Home → **Mídia da Página** | **Mídias** (menu lateral) ou upload direto no campo |
| **Cards "Projetos em Destaque"** (1 grande + 3 pequenos na Home) | **Projetos** → editar cada projeto → **Mídia Principal do Projeto** | **Mídias** (opcional) ou upload direto no formulário do projeto |
| **Listagem da página Projetos** (Work) | **Projetos** → editar cada projeto → **Mídia Principal do Projeto** | Idem acima |
| **Imagens de um projeto** (galeria na página do projeto) | **Projetos** → editar projeto → **Galeria de Mídias** | **Mídias** ou pela própria Galeria |

---

## 2. Upload de arquivos (onde e especificações)

### 2.1 Onde fazer upload

- **Menu do backoffice:** **Mídias** (ou "Media").
- URL: `backoffice.azmt.com.br/admin/media`
- Lá você envia imagens e vídeos. Depois pode escolher esses arquivos em:
  - **Páginas → Editar Home** (vídeo/thumbnail da home)
  - **Projetos → Editar [projeto]** (imagem principal e galeria)

**Dica:** Na tela de edição de qualquer página ou projeto, aparece o aviso: *"Não vê suas mídias aqui? Envie primeiro em 'Mídias' →"*. Use esse link para ir direto ao upload.

### 2.2 Especificações recomendadas (upload local)

| Tipo | Uso | Formato | Tamanho recomendado | Peso máx. (orientação) |
|------|-----|---------|----------------------|-------------------------|
| **Imagem principal do projeto** | Hero/thumbnail dos cards (Home e Projetos) | JPG, PNG, WebP | **1920×1080 px (16:9)** | ~5 MB |
| **Thumbnail do vídeo (capa)** | Capa antes do play (ex.: home) | JPG, PNG | **1920×1080 px (16:9)** | ~5 MB |
| **Vídeo da Home / demoreel** | Vídeo de destaque no topo | MP4 (H.264) | 1920×1080, 16:9 | **25 MB** (limite backoffice) |
| **Vídeo de projeto** | Vídeo na página do projeto | MP4 (H.264) | 1920×1080 | **50 MB** (limite no formulário do projeto) |
| **Imagens da galeria do projeto** | Fotos adicionais do projeto | JPG, PNG, WebP | Mín. 800 px na menor lado | ~8 MB por arquivo |

---

## 3. Onde atualizar cada coisa no backoffice

### 3.1 Home: vídeo e imagem do topo

- **Caminho:** **Páginas** → **Editar Home** (ou URL: `/admin/pages/edit/home`).
- **Seção:** **Mídia da Página**.
- **O que é:**
  - **Vídeo da página:** vídeo que aparece no topo da Home (hero).
  - **Thumbnail do vídeo (capa):** imagem que aparece antes de dar play.
- **Não é aqui:** os **cards "Projetos em Destaque"** (TMNT, Festival de Gramado, VR Zen, etc.) **não** vêm da Mídia da Página. Eles vêm dos **Projetos** (ver abaixo).

### 3.2 Cards "Projetos em Destaque" e listagem de Projetos

- **Caminho:** **Projetos** → clicar no projeto (ex.: TMNT, Festival de Gramado, VR Zen) → **Mídia Principal do Projeto**.
- **O que definir:** a **Imagem Principal (Hero/Thumbnail)** do projeto. Essa mesma imagem é usada:
  - nos cards da **Home** (Projetos em Destaque),
  - na **listagem da página Projetos** (Work),
  - na **página de detalhes** do projeto.
- **Se o card aparecer quebrado (ícone de imagem):** o projeto está sem Imagem Principal. Edite o projeto e preencha **Mídia Principal do Projeto** (upload ou escolher da biblioteca).

### 3.3 Galeria de um projeto

- **Caminho:** **Projetos** → editar o projeto → **Galeria de Mídias (Adicional)**.
- São as fotos/vídeos extras que aparecem na página de detalhes do projeto.

---

## 4. Resumo rápido

1. **Upload geral:** **Mídias** → enviar imagens/vídeos (respeitando tamanhos e pesos acima).
2. **Topo da Home (vídeo/capa):** **Páginas** → **Editar Home** → **Mídia da Página**.
3. **Cards da Home e da página Projetos:** **Projetos** → cada projeto → **Mídia Principal do Projeto** (Imagem Principal).
4. **Deixar o backoffice mais claro:** usar os textos de ajuda já existentes e este relatório; em cada tela, o aviso *"Envie primeiro em 'Mídias'"* indica onde fazer upload quando a biblioteca estiver vazia.

---

## 5. Checklist para imagens quebradas

- [ ] Entrar em **Projetos** e listar os que aparecem na Home (ex.: TMNT, Festival de Gramado, VR Zen).
- [ ] Para cada um, abrir **Editar** e rolar até **Mídia Principal do Projeto**.
- [ ] Definir **Imagem Principal** (upload ou **Selecionar da Biblioteca**).
- [ ] Clicar em **Salvar Alterações**.
- [ ] Conferir no site (Home e página Projetos) se os cards passaram a mostrar a imagem.

---

## 6. Resumo: O quê → Onde (textos, imagens, vídeos)

| Conteúdo | Onde no backoffice | Observação |
|----------|--------------------|------------|
| **Textos do topo da Home** (slogan, subtítulo) | Páginas → Home → **Textos do topo** (Guia rápido) | PT, EN, ES, FR |
| **Vídeo do topo da Home** | Páginas → Home → **Vídeo e capa do topo** | Upload ou Biblioteca; máx. 25 MB |
| **Capa (thumbnail) do vídeo** | Mesma seção acima | 1920×1080 recomendado |
| **Imagens dos cards da Home** | Projetos → editar projeto → **Imagem de capa** | Um projeto = um card |
| **Textos dos pilares** (badges Home) | Páginas → Home → **Pilares** | Ex.: Museus & exposições |
| **SEO** (título/descrição para Google) | Páginas → [página] → **SEO** | Por idioma |
| **Upload geral** (antes de usar em qualquer lugar) | **Mídias** (menu lateral) | Depois selecione na página/projeto |
