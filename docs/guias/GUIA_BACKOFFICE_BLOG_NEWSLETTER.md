# 📚 GUIA COMPLETO: BLOG E NEWSLETTER NO BACKOFFICE

## 🎯 RESUMO DO QUE FOI IMPLEMENTADO

### ✅ **BLOG** - 100% Funcional
- ✅ CRUD completo (Criar, Ler, Atualizar, Deletar posts)
- ✅ Categorias e Tags
- ✅ Editor Markdown/HTML
- ✅ Upload de imagens de capa
- ✅ Multilíngue (PT, EN, ES, FR)
- ✅ Status: Rascunho, Publicado, Agendado, Arquivado
- ✅ SEO (títulos e descrições para cada idioma)
- ✅ Contagem de visualizações

### ✅ **NEWSLETTER** - 100% Funcional
- ✅ Formulário no rodapé do site
- ✅ API de inscrição (`/api/public/newsletter`)
- ✅ Salva emails no banco (tabela `Lead`)
- ✅ Campos: `wantsNewsletter`, `preferredLanguage`, `newsletterSource`
- ✅ Verificação de email duplicado
- ✅ Suporte a 4 idiomas

---

## 📝 COMO USAR O BLOG NO BACKOFFICE

### **Acesso:**
🔗 **URL:** `https://backoffice.azmt.com.br/admin/blog`

### **1. Ver Lista de Posts:**
- Vá em **Admin → Blog** no menu lateral
- Veja todos os posts criados
- Filtre por status (Publicado, Rascunho, etc.)
- Clique em um post para editar

### **2. Criar Novo Post:**
1. Clique em **"✨ Novo Post"** (canto superior direito)
2. Preencha os campos:
   
   **Obrigatórios:**
   - **Slug** (URL do post, ex: `meu-post-incrivel`)
   - **Título PT** (português)
   - **Título EN** (inglês)
   
   **Opcionais mas recomendados:**
   - **Título ES/FR** (espanhol e francês)
   - **Resumo (Excerpt)** - aparece na listagem do blog
   - **Conteúdo** - use Markdown ou HTML
   - **Imagem de Capa** - upload ou URL
   - **Categoria** - escolha uma categoria
   - **Tags** - palavras-chave relevantes
   - **Status** - `PUBLISHED` para publicar agora
   - **Publicado em** - data de publicação (ou deixe em branco para agora)

3. Clique em **"Salvar"** ou **"Publicar"**

### **3. Editar Post Existente:**
1. Na lista de posts, clique no título do post
2. Edite os campos desejados
3. Clique em **"Salvar Alterações"**

### **4. Publicar/Despublicar:**
- Na página de edição, mude o **Status**:
  - `DRAFT` = Rascunho (não aparece no site público)
  - `PUBLISHED` = Publicado (aparece no site)
  - `SCHEDULED` = Agendado (publica na data escolhida)
  - `ARCHIVED` = Arquivado (oculto)

### **5. Criar/Editar Categorias:**
- Vá em **Admin → Blog → Categorias** (se disponível)
- Ou crie via SQL (use o script `POPULAR_BLOG_AZIMUT.sql`)

---

## 📧 COMO O NEWSLETTER FUNCIONA

### **1. Inscrição no Site:**
- Visitante preenche email no **rodapé do site** (`azmt.com.br`)
- Formulário envia para `/api/public/newsletter`
- Email é salvo na tabela `Lead` com:
  - `wantsNewsletter = true`
  - `preferredLanguage` = idioma do site
  - `newsletterSource` = origem (ex: "footer")

### **2. Ver Inscritos (Backoffice):**
- Vá em **Admin → Leads**
- Filtre por `wantsNewsletter = true`
- Veja todos os inscritos na newsletter

### **3. Como Enviar Newsletter (Futuro):**
**Opção A: Integração com Serviço Externo**
- Mailchimp
- SendGrid
- HubSpot
- Exportar emails e enviar via serviço externo

**Opção B: Sistema Próprio (Próximos Passos)**
- API para enviar emails em massa
- Templates de email com posts do blog
- Agendamento de envios

---

## 🚀 POPULAR O BLOG COM CONTEÚDO

### **Opção 1: Via SQL (Rápido - 5 minutos)**
✅ **JÁ CRIADO:** Script `azimut-cms/scripts/POPULAR_BLOG_AZIMUT.sql`

**Como executar:**
1. Acesse o Neon PostgreSQL via Vercel:
   - Vercel Dashboard → Project `azimut-backoffice` → Settings → Storage → Neon
   - Clique em **"SQL Editor"**
2. Copie e cole o conteúdo de `POPULAR_BLOG_AZIMUT.sql`
3. Execute (botão **"Run"** ou F5)
4. ✅ Pronto! 4 posts já estarão no blog

**O que o script cria:**
- ✅ 4 categorias (Projetos, Tecnologia, Cultura, Por Trás das Cenas)
- ✅ 4 posts publicados:
  1. Rio Museu Olímpico: Montagem e Instalação
  2. Natal Rio Bonito: Instalação Imersiva
  3. VR e AR na Azimut: Experiências Imersivas
  4. Por Trás das Cenas: Brasil e Canadá

### **Opção 2: Via Backoffice (Manual)**
1. Acesse `https://backoffice.azmt.com.br/admin/blog/new`
2. Preencha os campos do post
3. Clique em **"Salvar"**

### **Opção 3: Pesquisar e Adicionar Conteúdo Real**

**Sugestões de fontes:**
- 📰 Sites de notícias sobre projetos da Azimut
- 📸 Instagram/Facebook da Azimut (fotos, stories)
- 🎬 Vídeos do YouTube sobre projetos
- 🏛️ Site oficial do Rio Museu Olímpico
- 📝 Materiais de imprensa

**Temas para posts:**
- Rio Museu Olímpico (montagem, tecnologia, impacto)
- Natal Rio Bonito (instalação, comunidade)
- Projetos VR/AR
- Parcerias Brasil-Canadá
- Equipe e processo criativo
- Tecnologias utilizadas (projeção mapeada, som espacializado, etc.)
- Cases de sucesso

---

## 📊 ESTRUTURA DO BANCO DE DADOS

### **Tabela `BlogPost`:**
```sql
- id (UUID)
- slug (único, URL do post)
- titlePt, titleEn, titleEs, titleFr
- excerptPt, excerptEn, excerptEs, excerptFr
- contentPt, contentEn, contentEs, contentFr (Markdown/HTML)
- seoTitlePt, seoTitleEn, seoTitleEs, seoTitleFr
- seoDescPt, seoDescEn, seoDescEs, seoDescFr
- coverImageId, coverImageUrl, coverImageAlt
- authorName, authorImageUrl
- readingTimeMinutes
- status (DRAFT, PUBLISHED, SCHEDULED, ARCHIVED)
- featured (boolean)
- publishedAt (DateTime)
- categoryId (FK para BlogCategory)
- viewCount
- createdAt, updatedAt
```

### **Tabela `BlogCategory`:**
```sql
- id (UUID)
- slug (único)
- namePt, nameEn, nameEs, nameFr
- color (hex, ex: #c92337)
- icon (emoji ou nome)
- priority
```

### **Tabela `Lead` (Newsletter):**
```sql
- id (UUID)
- email (único)
- name
- wantsNewsletter (boolean)
- preferredLanguage (pt, en, es, fr)
- newsletterSource (footer, popup, etc.)
- status, leadScore, etc.
```

---

## 🎨 DICAS PARA BONS POSTS

### **1. Títulos Atrativos:**
- ✅ "Rio Museu Olímpico: A Montagem de Uma Experiência Imersiva"
- ❌ "Projeto 1"

### **2. Resumos (Excerpt):**
- 1-2 frases que despertem curiosidade
- Aparecem na listagem do blog
- Inclua palavras-chave relevantes

### **3. Conteúdo:**
- Use **Markdown** para formatação:
  ```markdown
  # Título Principal
  ## Subtítulo
  **Negrito**, *itálico*
  - Lista
  [Link](https://...)
  ```
- Inclua **imagens** (upload no backoffice)
- Seja **específico** e **informativo**

### **4. SEO:**
- **Título SEO:** 50-60 caracteres
- **Descrição SEO:** 150-160 caracteres
- Inclua **palavras-chave** naturalmente

### **5. Imagem de Capa:**
- Resolução recomendada: **1200x630px**
- Formato: **JPG ou PNG**
- Tamanho: < 500KB

---

## 🔍 VERIFICAR SE ESTÁ FUNCIONANDO

### **1. Blog Público:**
🔗 **URL:** `https://azmt.com.br/pt/blog` (ou `/en/blog`, `/fr/blog`, `/es/blog`)

**Verifique:**
- ✅ Lista de posts aparece
- ✅ Posts estão publicados (`status = PUBLISHED`)
- ✅ Categorias aparecem
- ✅ Imagens de capa carregam
- ✅ Links para posts individuais funcionam

### **2. Newsletter:**
- ✅ Formulário no rodapé aparece
- ✅ Inscrição funciona (teste com email seu)
- ✅ Mensagem de sucesso aparece
- ✅ Email aparece em **Admin → Leads**

---

## 📞 PRÓXIMOS PASSOS SUGERIDOS

### **Curto Prazo:**
1. ✅ Popular blog com SQL (já criado)
2. ✅ Verificar se posts aparecem no site
3. 📝 Adicionar mais 2-3 posts via backoffice
4. 📧 Testar newsletter

### **Médio Prazo:**
1. 📧 Implementar sistema de envio de newsletter
2. 📸 Adicionar mais imagens aos posts
3. 🏷️ Criar mais tags/categorias
4. 📊 Analytics de visualizações de posts

### **Longo Prazo:**
1. 🤖 Automação: posts sugeridos baseados em projetos
2. 📱 Compartilhamento social automático
3. 📧 Newsletter automático com posts recentes
4. 🔍 SEO avançado e otimização

---

## ✅ CHECKLIST FINAL

- [ ] Executar SQL para popular blog (`POPULAR_BLOG_AZIMUT.sql`)
- [ ] Verificar blog público: `azmt.com.br/pt/blog`
- [ ] Criar 1-2 posts adicionais via backoffice
- [ ] Testar newsletter (inscrever email de teste)
- [ ] Verificar inscritos em **Admin → Leads**
- [ ] Adicionar imagens aos posts criados
- [ ] Compartilhar posts nas redes sociais

---

**🎉 Pronto! Blog e Newsletter estão funcionais e prontos para uso!**

Para dúvidas ou problemas, consulte a documentação ou entre em contato.
