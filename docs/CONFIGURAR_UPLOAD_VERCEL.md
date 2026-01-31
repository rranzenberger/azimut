# 📸 Como Configurar Upload de Mídia na Vercel

## ✅ O que foi feito:

1. **Código atualizado** para usar Vercel Blob Storage
2. **Fallback para desenvolvimento local** (salva em `public/uploads/`)
3. **Processamento automático** de imagens (thumbnail, medium, large, webp)

## 🔧 Configuração Necessária na Vercel:

### Passo 1: Obter Token do Vercel Blob

1. Acesse: https://vercel.com/dashboard
2. Vá em **Settings** → **Storage** → **Blob**
3. Clique em **Create Database** (se ainda não criou)
4. Depois de criar, vá em **Settings** do Blob
5. Copie o **BLOB_READ_WRITE_TOKEN**

### Passo 2: Adicionar Variável de Ambiente

1. No projeto **azimut-backoffice** na Vercel:
   - Vá em **Settings** → **Environment Variables**
   - Clique em **Add New**
   - Nome: `BLOB_READ_WRITE_TOKEN`
   - Valor: Cole o token copiado
   - Ambiente: **Production, Preview, Development** (marque todos)
   - Clique em **Save**

### Passo 3: Redeploy

1. Vá em **Deployments**
2. Clique nos **3 pontinhos** do último deploy
3. Selecione **Redeploy**
4. Aguarde o deploy completar

## 🎯 Como Usar:

### No Backoffice:

1. Acesse: https://backoffice.azmt.com.br/admin/login
2. Login: `admin@azimut.com.br` / `Azimut2025!`
3. Vá em **Projetos** → Clique em um projeto
4. Role até **"Mídia Principal"**
5. **Upload de Imagem**:
   - Clique em **"Escolher arquivo"**
   - Selecione uma imagem (máx 8MB)
   - Aguarde o upload (aparece "✅ Imagem enviada com sucesso!")
   - A imagem será processada automaticamente
6. **Upload de Vídeo**:
   - Clique em **"Escolher arquivo"** (vídeo)
   - Selecione um vídeo (máx 25MB)
   - Aguarde o upload
7. **URL Externa**:
   - Cole URL de imagem/vídeo (YouTube, Vimeo, etc.)
   - Clique em **"Adicionar URL"**
8. **Salvar**: Clique em **"Salvar Projeto"** no final da página

## 📋 Formatos Suportados:

- **Imagens**: JPEG, PNG, WebP, GIF
- **Vídeos**: MP4, WebM, MOV

## ⚡ Otimizações Automáticas:

- **Thumbnail**: 200px (para listagens)
- **Medium**: 800px (para cards)
- **Large**: 1600px (para páginas de detalhes)
- **WebP**: Versão otimizada gerada automaticamente

## 🐛 Troubleshooting:

### Erro: "BLOB_READ_WRITE_TOKEN não encontrado"
- **Solução**: Configure a variável de ambiente na Vercel (veja Passo 2)

### Upload funciona local mas não em produção
- **Solução**: Verifique se fez redeploy após adicionar a variável

### Imagem não aparece após upload
- **Solução**: Verifique se clicou em "Salvar Projeto" após o upload

## 💡 Dica:

As mídias são salvas automaticamente na **biblioteca de mídia** e podem ser reutilizadas em outros projetos!
