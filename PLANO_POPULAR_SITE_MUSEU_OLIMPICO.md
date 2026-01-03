# 📋 PLANO PARA POPULAR O SITE COM MATERIAL DO MUSEU OLÍMPICO

## 🎯 COMO ESTÁ APRESENTADO ATUALMENTE

### **1. Página de Imprensa (`/press`)**
- **Card destacado** com informações do Museu Olímpico
- **2 botões lado a lado:**
  - Botão vermelho: "Ver Mais" → vai para `/work/museu-olimpico-rio`
  - Botão secundário (borda branca): "Site Oficial do Museu" → abre `https://museuolimpico.rio/` em nova aba
- **Texto contextual** abaixo explicando o papel da Azimut
- **NÃO é um submenu** - é um card destacado na seção "Projetos em Destaque"

### **2. Página de Detalhes do Projeto (`/work/museu-olimpico-rio`)**
- **Card especial** aparecendo apenas para o Museu Olímpico
- **Título:** "Site Oficial do Projeto"
- **Descrição:** Explica que é projeto oficial da Prefeitura
- **Botão:** "Visitar Site" com ícone de link externo
- **Posicionamento:** Aparece após a descrição, antes da galeria

---

## 📸 MATERIAL DISPONÍVEL PARA POPULAR O SITE

### **1. Imagens do Jornal (O Globo)**
- ✅ **Capa do jornal** com matéria sobre o Museu Olímpico
- ✅ **Manchete:** "Museu para o alto do pódio"
- ✅ **Crédito explícito:** "Tive a honra de atuar na criação e montagem do projeto Museu Rio Olímpico como diretor de Tecnologia-Audiovisual"
- ✅ **Data:** 2 de agosto de 2025
- **Uso sugerido:**
  - Adicionar na galeria do projeto
  - Usar como imagem de destaque na página de imprensa
  - Incluir na seção "Reconhecimento" ou "Na Mídia"

### **2. Fotos do Museu (Instagram Prefeitura)**
- ✅ **Vista do velódromo** com instalações
- ✅ **Semi-esfera e estruturas verdes** (túnel interativo)
- ✅ **Bicicleta interativa** ("Pedale pela Cidade")
- ✅ **Tela interativa** com mapa do Rio
- ✅ **Estruturas arquitetônicas** coloridas
- **Uso sugerido:**
  - Galeria principal do projeto
  - Hero image alternativo
  - Seção "Experiências Interativas"

### **3. Fotos das Instalações**
- ✅ **Ginástica Artística** (barras, argolas, cavalo, salto, trave)
- ✅ **Equipamentos físicos** com "Rio 2016" branding
- ✅ **Telas de vídeo** mostrando atletas
- ✅ **Instalações interativas** com gráficos de atletas
- **Uso sugerido:**
  - Galeria temática por área
  - Seção "13 Núcleos Temáticos"
  - Mostrar integração cenografia + tecnologia

### **4. Fotos de Eventos**
- ✅ **Inauguração** com autoridades
- ✅ **Crowd** no espaço verde
- ✅ **Estruturas arquitetônicas** em destaque
- **Uso sugerido:**
  - Seção "Inauguração"
  - Timeline do projeto
  - Depoimentos e reconhecimento

### **5. Material de Construção/Making-of**
- ✅ **Processo de montagem** (mencionado pelo usuário)
- ✅ **Timelapse** (se disponível)
- ✅ **Backstage** das instalações
- **Uso sugerido:**
  - Seção "Making-of" ou "Bastidores"
  - Vídeo timelapse na galeria
  - Mostrar o trabalho por trás das câmeras

---

## 🚀 PLANO DE IMPLEMENTAÇÃO

### **FASE 1: Organizar Material**
1. **Criar estrutura de pastas:**
   ```
   public/museu-olimpico/
   ├── jornal/
   │   ├── capa-o-globo.jpg
   │   └── materia-completa.jpg
   ├── instalacoes/
   │   ├── velodromo-exterior.jpg
   │   ├── semi-esfera-verde.jpg
   │   ├── bicicleta-interativa.jpg
   │   └── tela-interativa.jpg
   ├── ginastica/
   │   ├── barras-assimetricas.jpg
   │   ├── argolas.jpg
   │   ├── cavalo-alca.jpg
   │   ├── salto.jpg
   │   └── trave-equilibrio.jpg
   ├── eventos/
   │   ├── inauguracao-1.jpg
   │   └── crowd-verde.jpg
   └── making-of/
       ├── construcao-1.jpg
       └── timelapse.mp4 (se disponível)
   ```

### **FASE 2: Adicionar ao Backoffice**
1. **Criar script para adicionar mídia:**
   - Upload de todas as imagens
   - Associar ao projeto "museu-olimpico-rio"
   - Adicionar alt text em PT, EN, ES, FR
   - Organizar por categorias (jornal, instalações, ginástica, eventos, making-of)

2. **Atualizar projeto no backoffice:**
   - Adicionar todas as imagens à galeria
   - Criar seções temáticas
   - Adicionar descrições detalhadas

### **FASE 3: Melhorar Página do Projeto**
1. **Adicionar seções:**
   - "Na Mídia" (com imagem do jornal)
   - "13 Núcleos Temáticos" (com fotos de cada área)
   - "Experiências Interativas" (com fotos das instalações)
   - "Making-of" (com fotos de construção)
   - "Inauguração" (com fotos do evento)

2. **Criar galeria organizada:**
   - Filtros por categoria
   - Lightbox para visualização
   - Descrições em cada imagem

### **FASE 4: Página de Imprensa**
1. **Adicionar seção "Na Mídia":**
   - Card com imagem do jornal
   - Link para matéria completa
   - Destaque para o crédito da Azimut

2. **Kit de Imprensa:**
   - Incluir todas as imagens em alta resolução
   - Organizar por categoria
   - Adicionar descrições e créditos

---

## 📝 PRÓXIMOS PASSOS IMEDIATOS

### **Opção 1: Upload Manual (Rápido)**
1. Você envia todas as imagens organizadas
2. Eu crio o script para adicionar ao backoffice
3. Atualizamos a página do projeto

### **Opção 2: Estrutura Completa (Recomendado)**
1. Criar estrutura de pastas
2. Organizar todas as imagens
3. Criar script de upload em lote
4. Adicionar ao backoffice
5. Atualizar página com seções temáticas

---

## 🎨 SUGESTÕES DE MELHORIAS

### **1. Seção "Na Mídia"**
- Card destacado com imagem do jornal
- Citação: "Tive a honra de atuar na criação e montagem do projeto Museu Rio Olímpico como diretor de Tecnologia-Audiovisual"
- Link para matéria completa

### **2. Galeria Interativa**
- Filtros por categoria
- Lightbox com descrições
- Navegação por teclado

### **3. Timeline do Projeto**
- 2014-2016: Desenvolvimento
- 2016: Inauguração
- 2016-2018: Produção audiovisual
- 2025: Reabertura (conforme site oficial)

### **4. Seção "13 Núcleos Temáticos"**
- Grid com fotos de cada área
- Descrição de cada núcleo
- Destaque para interatividade

---

## ✅ O QUE JÁ ESTÁ FUNCIONANDO

- ✅ Link para site oficial na página de imprensa
- ✅ Link para site oficial na página de detalhes
- ✅ Card destacado do Museu Olímpico
- ✅ Estrutura básica do projeto no backoffice
- ✅ Página de imprensa criada

---

## 🎯 RECOMENDAÇÃO FINAL

**SIM, vale muito a pena popular o site com TODO o material!**

**Por quê?**
1. **Credibilidade:** Mostra trabalho real e documentado
2. **Visibilidade:** Mais conteúdo = melhor SEO
3. **Profissionalismo:** Demonstra expertise e experiência
4. **Proteção:** Documenta o trabalho da Azimut
5. **Marketing:** Material rico para compartilhar

**Como fazer:**
1. Organizar todas as imagens por categoria
2. Criar script de upload em lote
3. Adicionar ao backoffice
4. Atualizar página com seções temáticas
5. Criar galeria interativa

---

**Próximo passo:** Você quer que eu crie o script de upload e a estrutura, ou prefere organizar as imagens primeiro?

