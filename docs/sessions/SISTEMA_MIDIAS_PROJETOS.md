# 🖼️ Sistema de Mídias para Projetos

## Visão Geral

O sistema de projetos agora suporta múltiplas formas de adicionar imagens e vídeos:

### 1. Formas de Adicionar Mídia

| Método | Onde | Descrição |
|--------|------|-----------|
| **URL do Thumbnail** | Campo direto no formulário | Cole uma URL de imagem (Unsplash, Pexels, etc.) |
| **Galeria de Mídias** | Seção "Galeria de Mídias" | Upload de arquivo OU adicionar por URL |
| **Hero Image** | Seção de mídia | Upload de imagem principal (cria variantes otimizadas) |

### 2. Prioridade de Exibição

O frontend exibe imagens nesta ordem de prioridade:

1. **heroImage** (se tiver upload no CMS)
2. **thumbnailUrl** (se tiver URL preenchida)
3. **Placeholder visual** (ícone baseado na categoria)

### 3. Como Adicionar Imagens aos Projetos

#### Opção A: URL Rápida (Recomendado para começar)
1. Vá em **Projetos** → Clique no projeto
2. Na seção **"Configurações de Exibição"**
3. Preencha o campo **"URL do Thumbnail (alternativo)"**
4. Cole uma URL de imagem (ex: Unsplash)
5. Clique em **"Salvar Alterações"**

#### Opção B: Upload de Arquivo
1. Vá em **Projetos** → Clique no projeto
2. Role até **"Galeria de Mídias"**
3. Clique em **"📤 Enviar Novo"**
4. Escolha um arquivo do seu computador
5. A mídia será automaticamente adicionada à galeria

#### Opção C: Adicionar por URL na Galeria
1. Vá em **Projetos** → Clique no projeto
2. Role até **"Galeria de Mídias"**
3. Clique em **"📤 Enviar Novo"**
4. Na seção "Adicionar por URL":
   - Selecione o tipo (Imagem ou Vídeo)
   - Cole a URL
   - Clique em "Adicionar"

### 4. Fontes de Imagens Gratuitas

| Site | Uso |
|------|-----|
| [Unsplash](https://unsplash.com) | Fotos de alta qualidade, gratuitas |
| [Pexels](https://pexels.com) | Fotos e vídeos gratuitos |
| [Pixabay](https://pixabay.com) | Imagens, vetores e vídeos |

**Exemplo de URL Unsplash:**
```
https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80
```

### 5. SQL para Popular Thumbnails

Se você quer popular todos os projetos de uma vez com imagens placeholder, execute:

```sql
-- Executar no Neon Console
-- Ver arquivo: sql/POPULAR_TODOS_THUMBNAILS.sql
```

### 6. Campos do Projeto Relacionados a Mídia

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `heroImageId` | UUID | ID da mídia principal (do CMS) |
| `thumbnailUrl` | String | URL alternativa para thumbnail |
| `videoUrl` | String | URL do vídeo principal (YouTube/Vimeo) |
| `videoShowreel` | String | URL do showreel |
| `hasDetailPage` | Boolean | Se true, projeto tem subpágina própria |

### 7. Estrutura da Galeria

Cada projeto pode ter **múltiplas mídias** na galeria:

- **Imagens**: JPG, PNG, WebP (até 8MB cada)
- **Vídeos**: MP4, WebM (até 25MB) ou URLs do YouTube/Vimeo
- **Ordem**: Arraste para reordenar

### 8. Exibição no Frontend

| Local | O que mostra |
|-------|--------------|
| Lista de Projetos (`/work`) | `heroImage.large` → `thumbnailUrl` → placeholder |
| Card Featured | Imagem grande com overlay gradient |
| Card Grid | Imagem média com hover effects |
| Página de Detalhes | Galeria completa + hero image |

---

## 🎯 Checklist Rápido

- [ ] Executar `sql/POPULAR_TODOS_THUMBNAILS.sql` no Neon
- [ ] Verificar projetos sem imagem no backoffice
- [ ] Preencher `thumbnailUrl` ou fazer upload para galeria
- [ ] Ativar `hasDetailPage` para projetos com subpágina

---

## 📞 Suporte

Se encontrar problemas:
1. Verifique se o CMS está rodando (`localhost:3001`)
2. Verifique se o Prisma foi regenerado (`npx prisma generate`)
3. Reinicie o servidor do CMS
