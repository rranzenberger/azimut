# REGRA: Todo Vídeo DEVE ter Thumbnail

## Padrão Obrigatório

**SEMPRE que houver upload ou gerenciamento de vídeo no backoffice, DEVE haver campo para thumbnail (capa do vídeo).**

---

## Checklist para Vídeos

- [ ] Campo de upload/seleção do vídeo (MP4, WebM, MOV)
- [ ] Campo de upload/seleção do thumbnail (PNG, JPG, WebP)
- [ ] Preview do vídeo com o thumbnail aplicado
- [ ] Alt text para ambos (vídeo e thumbnail)

---

## Especificações

### Vídeo
- Formatos: MP4, WebM, MOV
- Tamanho máximo: 25MB (backoffice) / sem limite via Git
- Resolução recomendada: 1920x1080 ou 1280x720
- Codec: H.264
- Áudio: AAC 128kbps (se necessário)

### Thumbnail
- Formatos: PNG, JPG, WebP
- Tamanho máximo: 2MB
- Resolução: 1920x1080 (16:9)
- Deve representar o conteúdo do vídeo
- Evitar usar logo como thumbnail (exceto se necessário)

---

## Páginas que usam vídeos

1. **Home** - Demoreel institucional
2. **Studio** - Vídeo Chris Milk (Filosofia)
3. **Studio/Diferenciais** - Vídeo Chris Milk (Filosofia)
4. **Projetos** - Vídeos de making-of e apresentação

---

## Banco de Dados (Media)

Ao cadastrar vídeo, criar DOIS registros:
1. `type: 'VIDEO'` - O vídeo em si
2. `type: 'IMAGE'` com `imageType: 'video-poster'` - O thumbnail

Campos relacionados:
- `pageSlug` - Página onde o vídeo aparece
- `sectionSlug` - Seção específica (ex: 'philosophy', 'hero')
- `imageType` - Usar 'video-poster' para thumbnails

---

## Implementação no Backoffice

Sempre que adicionar seção de vídeo em `/admin/pages/edit/[slug]`:

```tsx
{/* VÍDEO */}
<MediaUploadField
  label="Vídeo"
  mediaType="video"
  // ...
/>

{/* THUMBNAIL (OBRIGATÓRIO) */}
<MediaUploadField
  label="Thumbnail do Vídeo (Capa)"
  mediaType="image"
  specs={{
    width: 1920,
    height: 1080,
    maxSizeMB: 2,
    description: 'Imagem de capa do vídeo'
  }}
  // ...
/>
```

---

## Histórico

- 2026-01-26: Regra criada após implementação do vídeo Chris Milk
