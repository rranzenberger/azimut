# 🎬 GUIA: Vídeos para Hero Section (Museu Olímpico)

---

## ✅ IMPLEMENTAÇÃO CONCLUÍDA

Acabei de adicionar o **Museu Olímpico do Rio** como projeto destaque na Home, com suporte a vídeo!

---

## 🎥 OPÇÕES DE VÍDEO

### **OPÇÃO 1: Vídeo de Teste (JÁ IMPLEMENTADO)** ⭐ RECOMENDADO PARA TESTE

Usei um vídeo público do **Museu do Amanhã** do YouTube como placeholder:
- **URL**: `https://www.youtube.com/watch?v=1EiC9bvVGnk`
- **Vantagens**: 
  - ✅ Funciona imediatamente
  - ✅ Grátis
  - ✅ Alta qualidade
  - ✅ Tema relacionado (museu no Rio)
- **Desvantagem**: 
  - ⚠️ Não é o vídeo real do Museu Olímpico

---

### **OPÇÃO 2: Vídeos Gratuitos (Stock)** 🆓

Sites com vídeos gratuitos de alta qualidade:

#### **Pexels Videos** (Recomendado)
- https://www.pexels.com/videos/
- Buscar: "olympic", "museum", "sports", "rio de janeiro"
- **Exemplo sugerido**: https://www.pexels.com/video/olympic-stadium-857064/
- **Licença**: Gratuito para uso comercial

#### **Pixabay Videos**
- https://pixabay.com/videos/
- Buscar: "olympic games", "sports museum"
- **Licença**: Gratuito para uso comercial

#### **Coverr**
- https://coverr.co/
- Vídeos de introdução/hero perfeitos
- **Licença**: Gratuito para uso comercial

---

### **OPÇÃO 3: Vídeo Real do Projeto** 🏆 MELHOR OPÇÃO

Se você tem o vídeo real do Museu Olímpico:

#### **Hospedagem Recomendada:**

**A) YouTube (Melhor para performance)**
1. Criar conta YouTube da Azimut
2. Upload do vídeo (pode ser privado ou unlisted)
3. Copiar URL
4. Atualizar no código ou backoffice

**Vantagens:**
- ✅ Streaming otimizado
- ✅ CDN global (rápido em qualquer lugar)
- ✅ Thumbnails automáticos
- ✅ Player responsivo
- ✅ Grátis

**B) Vimeo (Melhor para qualidade premium)**
1. Criar conta Vimeo Plus ($7/mês)
2. Upload do vídeo
3. Configurar privacidade
4. Copiar URL

**Vantagens:**
- ✅ Qualidade superior
- ✅ Sem anúncios
- ✅ Mais controle de privacidade
- ✅ Branding customizado

---

## 🔧 COMO ATUALIZAR O VÍDEO

### **Método 1: Direto no Código (Rápido)**

Edite `src/pages/Home.tsx`, linha ~52:

```typescript
heroImage: {
  type: 'VIDEO',
  original: 'SUA_URL_AQUI',  // YouTube ou Vimeo
  thumbnail: 'URL_DA_THUMBNAIL',  // Opcional
  alt: 'Museu Olímpico Rio'
},
```

**Exemplos de URLs válidas:**
```typescript
// YouTube
original: 'https://www.youtube.com/watch?v=ABC123'
original: 'https://youtu.be/ABC123'

// Vimeo
original: 'https://vimeo.com/123456789'
```

---

### **Método 2: Via Backoffice (Profissional)** ⭐ RECOMENDADO

1. Acesse: `https://backoffice.azmt.com.br`
2. Login com suas credenciais
3. Vá em **Projetos** → **Adicionar Projeto**
4. Preencha:
   - **Título**: Museu Olímpico do Rio
   - **Slug**: `museu-olimpico-rio`
   - **Tipo de Mídia**: `VIDEO`
   - **URL do Vídeo**: Cole a URL do YouTube/Vimeo
   - **Tags**: Imersivo, Institucional, Museu
   - **Featured**: ✅ Marcar como destaque

5. Salvar → O vídeo aparece automaticamente na Home!

---

## 📊 COMPARAÇÃO: YOUTUBE vs VIMEO vs SELF-HOSTED

| Recurso | YouTube | Vimeo | Self-Hosted |
|---------|---------|-------|-------------|
| **Custo** | Grátis | $7/mês | $10-50/mês |
| **Performance** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| **Qualidade** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Sem anúncios** | ❌ | ✅ | ✅ |
| **Privacidade** | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Setup** | 2 min | 5 min | 30 min |
| **Bandwidth** | Ilimitado | 5GB/semana | Limitado |

**Recomendação**: **YouTube** para começar, **Vimeo** quando tiver budget.

---

## 🎯 AÇÃO IMEDIATA

### **Para testar AGORA:**

1. ✅ **JÁ ESTÁ PRONTO!** O vídeo de teste já está no ar
2. Acesse: `https://azmt.com.br` após o deploy
3. Veja o vídeo do Museu do Amanhã na capa
4. Clique no play para assistir

### **Para usar vídeo REAL:**

**Opção A - Rápida (5 minutos):**
1. Escolha um vídeo grátis no Pexels
2. Copie a URL do vídeo no YouTube
3. Edite `src/pages/Home.tsx` linha 52
4. Commit e push

**Opção B - Profissional (10 minutos):**
1. Faça upload do vídeo no YouTube
2. Configure como "Unlisted" (não listado)
3. Adicione no backoffice
4. Pronto!

---

## 📝 EXEMPLO COMPLETO

### **1. Vídeo no YouTube**
```typescript
{
  slug: 'museu-olimpico-rio',
  title: 'Museu Olímpico do Rio',
  heroImage: {
    type: 'VIDEO',
    original: 'https://www.youtube.com/watch?v=ABC123',
    thumbnail: 'https://img.youtube.com/vi/ABC123/maxresdefault.jpg',
    alt: 'Vídeo Museu Olímpico Rio'
  }
}
```

### **2. Vídeo no Vimeo**
```typescript
{
  slug: 'museu-olimpico-rio',
  title: 'Museu Olímpico do Rio',
  heroImage: {
    type: 'VIDEO',
    original: 'https://vimeo.com/123456789',
    thumbnail: 'https://vumbnail.com/123456789.jpg',
    alt: 'Vídeo Museu Olímpico Rio'
  }
}
```

---

## 🔗 LINKS ÚTEIS

### **Vídeos Gratuitos:**
- Pexels: https://www.pexels.com/videos/
- Pixabay: https://pixabay.com/videos/
- Coverr: https://coverr.co/

### **Hospedagem de Vídeo:**
- YouTube: https://youtube.com
- Vimeo: https://vimeo.com

### **Backoffice:**
- URL: https://backoffice.azmt.com.br
- Docs: Ver `azimut-cms/README.md`

---

## ❓ FAQ

**P: O vídeo pode ser privado?**
R: Sim! Use "Unlisted" no YouTube ou privado no Vimeo. O player ainda funciona.

**P: Qual resolução recomendam?**
R: Mínimo 1080p (Full HD), ideal 4K para hero section.

**P: O vídeo tem autoplay?**
R: Não por padrão. O usuário clica no botão play (melhor UX e performance).

**P: Posso usar múltiplos vídeos?**
R: Sim! Adicione mais projetos no backoffice. O sistema rotaciona automaticamente.

**P: E se o vídeo do YouTube for removido?**
R: O sistema mostra um placeholder automático. Sempre tenha backup!

---

## 🎉 PRÓXIMOS PASSOS

1. ✅ Testar o vídeo atual (já no ar)
2. 📹 Gravar/encontrar vídeo real do Museu Olímpico
3. ⬆️ Fazer upload no YouTube/Vimeo
4. 🔄 Atualizar URL no código ou backoffice
5. 🚀 Deploy e testar novamente

---

**Quer que eu ajude com alguma dessas etapas?** 🤔

