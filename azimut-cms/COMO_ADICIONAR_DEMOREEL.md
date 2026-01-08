# 🎬 Como Adicionar Vídeo Demoreel no Backoffice

## ✅ Campos Adicionados

Foram adicionados 3 novos campos na tabela `Page`:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `demoreelVideo` | TEXT | URL do vídeo demoreel (YouTube/Vimeo) |
| `demoreelThumbnail` | TEXT | URL da thumbnail (opcional) |
| `heroBackgroundImage` | TEXT | URL da imagem de fundo do hero |

---

## 📋 Passo a Passo

### 1. Aplicar a Migration

```bash
cd azimut-cms
npx prisma migrate deploy
```

ou

```bash
cd azimut-cms
npx prisma db push
```

### 2. Gerar o Prisma Client

```bash
npx prisma generate
```

### 3. Adicionar no Backoffice (Interface)

No arquivo de edição de páginas, adicionar os campos:

```tsx
// azimut-cms/src/app/admin/pages/[id]/edit/page.tsx (ou similar)

<div className="form-group">
  <label>Vídeo Demoreel (YouTube/Vimeo)</label>
  <input
    type="url"
    name="demoreelVideo"
    placeholder="https://www.youtube.com/watch?v=..."
    defaultValue={page.demoreelVideo || ''}
  />
  <small>Vídeo institucional fullscreen que aparece após o hero</small>
</div>

<div className="form-group">
  <label>Thumbnail Demoreel (opcional)</label>
  <input
    type="url"
    name="demoreelThumbnail"
    placeholder="https://..."
    defaultValue={page.demoreelThumbnail || ''}
  />
</div>

<div className="form-group">
  <label>Imagem de Fundo do Hero</label>
  <input
    type="url"
    name="heroBackgroundImage"
    placeholder="https://..."
    defaultValue={page.heroBackgroundImage || ''}
  />
</div>
```

### 4. Atualizar a API

```typescript
// No handler de UPDATE da página
await prisma.page.update({
  where: { id: pageId },
  data: {
    ...existingData,
    demoreelVideo: body.demoreelVideo,
    demoreelThumbnail: body.demoreelThumbnail,
    heroBackgroundImage: body.heroBackgroundImage,
  },
});
```

---

## 🎯 Como Usar

### No Backoffice:

1. Vá em **Páginas** > **Home**
2. Role até os novos campos
3. Cole a URL do vídeo do YouTube/Vimeo:
   - Exemplo: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
4. (Opcional) Cole a URL da thumbnail
5. Salve

### Resultado no Site:

```
┌─────────────────────────────────┐
│ HERO (com background image)     │
│ heroBackgroundImage ✅          │
└─────────────────────────────────┘
         ↓
┌─────────────────────────────────┐
│ DEMOREEL FULLSCREEN             │
│ demoreelVideo ✅                │
│ (vídeo institucional separado)  │
└─────────────────────────────────┘
         ↓
┌─────────────────────────────────┐
│ PROJETO FEATURED                │
│ (Museu Olímpico - outro vídeo)  │
└─────────────────────────────────┘
```

---

## 📝 Notas

- **Não precisa fazer upload** de vídeo! Só colar a URL do YouTube/Vimeo
- O site já está pronto para usar esses campos
- Se não preencher, usa fallback automático (projeto featured)
- Formato aceito:
  - ✅ `https://www.youtube.com/watch?v=XXXXX`
  - ✅ `https://youtu.be/XXXXX`
  - ✅ `https://vimeo.com/XXXXX`

---

## 🚀 Pronto!

Após aplicar a migration, é só preencher os campos no backoffice!
