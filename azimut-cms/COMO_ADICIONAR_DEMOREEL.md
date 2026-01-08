# 🎬 Como Adicionar Vídeo Demoreel no Backoffice

## ✅ Sistema Implementado: Upload via Mídias + Seletor

Agora o sistema usa **upload real de arquivos** na seção "Mídias" e depois você seleciona no dropdown da página!

---

## 📋 Passo a Passo Completo

### 1. Aplicar Migrations no Banco

```bash
cd azimut-cms
npx prisma migrate deploy
npx prisma generate
```

### 2. Fazer Upload das Mídias

#### A) Enviar Imagem de Fundo do Hero

1. Ir em: **Backoffice** → **Mídias**
2. Selecionar **"Tipo: Imagem"**
3. Fazer upload da imagem (ex: 1920x1080, até 8MB)
4. Preencher **Alt (PT)**: "Fundo Hero - Tecnologia Criativa"
5. Clicar em **"Enviar mídia"**
6. ✅ Anotar o **ID** ou **título** da imagem

#### B) Enviar Vídeo Demoreel

1. Ir em: **Backoffice** → **Mídias**
2. Selecionar **"Tipo: Vídeo"**
3. Fazer upload do vídeo (MP4, até 25MB, ideal 10-20s)
4. Preencher **Alt (PT)**: "Demoreel Azimut 2026"
5. Clicar em **"Enviar mídia"**
6. ✅ Vídeo enviado e disponível no sistema!

---

### 3. Configurar na Página Home

1. Ir em: **Backoffice** → **Páginas do Site** → **Home**
2. Rolar até a seção **"🎬 Hero Media (Imagem & Demoreel)"**
3. No dropdown **"Imagem de Fundo do Hero"**:
   - Selecionar a imagem enviada (ex: "Fundo Hero - Tecnologia Criativa")
   - Ver preview automático abaixo
4. No dropdown **"Vídeo Demoreel Institucional"**:
   - Selecionar o vídeo enviado (ex: "🎥 Demoreel Azimut 2026")
   - Ver preview/link abaixo
5. Clicar em **"Salvar Alterações"**

---

## 🎯 Como Funciona no Site

```
┌─────────────────────────────────────────┐
│ HERO (85vh)                             │
│ ✅ Background: da seção Mídias          │
│ Texto + Logo + Cards                    │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ DEMOREEL FULLSCREEN (100vh)             │
│ ✅ Vídeo: enviado na seção Mídias       │
│ (Vídeo institucional do portfólio)      │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ PROJETO FEATURED                         │
│ (Museu Olímpico - outro vídeo)          │
└─────────────────────────────────────────┘
```

---

## 🔧 Estrutura no Banco de Dados

### Tabela `Page`:

| Campo | Tipo | Relação |
|-------|------|---------|
| `heroBackgroundImageId` | TEXT | → `Media.id` |
| `demoreelVideoId` | TEXT | → `Media.id` |

### Tabela `Media`:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | UUID | ID único da mídia |
| `type` | ENUM | IMAGE ou VIDEO |
| `originalUrl` | TEXT | URL do arquivo original |
| `thumbnailUrl` | TEXT | URL da thumbnail (opcional) |
| `altPt` | TEXT | Texto alternativo em PT |

---

## 📝 Exemplo de Uso Real

### Cenário: Adicionar novo demoreel 2026

1. **Enviar novo vídeo:**
   ```
   Backoffice → Mídias
   Tipo: Vídeo
   Arquivo: demoreel-azimut-2026.mp4
   Alt (PT): "Demoreel Azimut 2026 - Museus e Cultura"
   ```

2. **Selecionar na Home:**
   ```
   Backoffice → Páginas → Home → Hero Media
   Vídeo Demoreel: [Demoreel Azimut 2026 - Museus e Cultura]
   Salvar
   ```

3. **Resultado:**
   - Site atualizado automaticamente
   - Vídeo fullscreen logo após o hero
   - Preview disponível no backoffice

---

## 💡 Vantagens deste Sistema

| Recurso | Benefício |
|---------|-----------|
| ✅ **Upload real** | Não precisa hospedar externamente |
| ✅ **Preview visual** | Vê a mídia antes de publicar |
| ✅ **Reutilizável** | Mesma mídia em vários lugares |
| ✅ **Organizado** | Todas as mídias em um só lugar |
| ✅ **Fallback automático** | Se não selecionar, usa padrão |

---

## 🚀 Pronto para Produção!

Após aplicar as migrations, o sistema está **100% funcional**!

**Próximos passos:**
1. Aplicar migrations (comando acima)
2. Fazer upload das mídias
3. Selecionar na página Home
4. Publicar! 🎉
