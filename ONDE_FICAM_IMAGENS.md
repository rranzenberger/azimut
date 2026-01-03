# 📍 ONDE FICAM AS IMAGENS DO PROJETO

## 🔍 LOCALIZAÇÃO DAS IMAGENS

### **1. Armazenamento Físico (Backoffice)**

As imagens são armazenadas em:
```
azimut-cms/public/uploads/museu-olimpico/
```

**Estrutura esperada:**
```
azimut-cms/
  public/
    uploads/
      museu-olimpico/
        original.jpg (ou .png)
        thumbnail.jpg
        medium.jpg
        large.jpg
        large.webp
        large.avif
```

### **2. Banco de Dados**

As URLs das imagens são armazenadas na tabela `Media`:
- `originalUrl`: `/uploads/museu-olimpico/original.jpg`
- `thumbnailUrl`: `/uploads/museu-olimpico/thumbnail.jpg`
- `mediumUrl`: `/uploads/museu-olimpico/medium.jpg`
- `largeUrl`: `/uploads/museu-olimpico/large.jpg`
- `webpUrl`: `/uploads/museu-olimpico/large.webp`
- `avifUrl`: `/uploads/museu-olimpico/large.avif`

### **3. API que Retorna as Imagens**

**Endpoint:** `/api/public/project/[slug]`

**Exemplo:** `https://backoffice.azmt.com.br/api/public/project/museu-olimpico-rio?lang=pt`

**Resposta inclui:**
```json
{
  "gallery": [
    {
      "id": "...",
      "type": "IMAGE",
      "original": "/uploads/museu-olimpico/original.jpg",
      "thumbnail": "/uploads/museu-olimpico/thumbnail.jpg",
      "medium": "/uploads/museu-olimpico/medium.jpg",
      "large": "/uploads/museu-olimpico/large.jpg",
      "alt": "Descrição da imagem",
      "order": 0
    }
  ]
}
```

---

## ❌ POR QUE AS IMAGENS NÃO APARECEM?

### **Possíveis Problemas:**

1. **Pasta não existe:**
   - Verificar se `azimut-cms/public/uploads/museu-olimpico/` existe
   - Se não existir, criar a pasta

2. **Imagens não foram enviadas:**
   - As imagens precisam ser enviadas via backoffice
   - Ou via script (ex: `add-olympic-media-curated.ts`)

3. **URLs incorretas:**
   - URLs no banco devem começar com `/uploads/`
   - Não devem ser URLs absolutas (http://...)

4. **API não retorna galeria:**
   - Verificar se a API `/api/public/project/[slug]` inclui `gallery` na resposta
   - Verificar se `ProjectMedia` está sendo incluído na query

5. **Frontend não renderiza:**
   - Verificar se `project.gallery` existe no componente
   - Verificar se as URLs estão sendo construídas corretamente

---

## ✅ COMO VERIFICAR

### **1. Verificar se pasta existe:**
```bash
cd azimut-cms
ls public/uploads/museu-olimpico/
```

### **2. Verificar no banco de dados:**
```sql
SELECT 
  m.id,
  m."originalUrl",
  m."thumbnailUrl",
  m."mediumUrl",
  pm."order"
FROM "Media" m
JOIN "ProjectMedia" pm ON pm."mediaId" = m.id
JOIN "Project" p ON p.id = pm."projectId"
WHERE p.slug = 'museu-olimpico-rio'
ORDER BY pm."order";
```

### **3. Verificar API:**
```bash
curl https://backoffice.azmt.com.br/api/public/project/museu-olimpico-rio?lang=pt
```

### **4. Verificar no frontend:**
- Abrir DevTools (F12)
- Ir para Network
- Verificar se requisições de imagens estão sendo feitas
- Verificar se URLs estão corretas

---

## 🔧 SOLUÇÃO

### **Se as imagens não estão aparecendo:**

1. **Verificar se pasta existe:**
   ```bash
   mkdir -p azimut-cms/public/uploads/museu-olimpico
   ```

2. **Adicionar imagens via script:**
   ```bash
   cd azimut-cms
   npx tsx scripts/add-olympic-media-curated.ts
   ```

3. **Verificar API:**
   - Acessar: `https://backoffice.azmt.com.br/api/public/project/museu-olimpico-rio?lang=pt`
   - Verificar se `gallery` está na resposta

4. **Verificar frontend:**
   - Acessar: `https://azmt.com.br/work/museu-olimpico-rio`
   - Abrir DevTools → Console
   - Verificar erros de carregamento de imagens

---

## 📝 PRÓXIMOS PASSOS

1. Verificar se pasta `public/uploads/museu-olimpico/` existe
2. Verificar se imagens foram adicionadas ao banco
3. Verificar se API retorna `gallery`
4. Verificar se frontend renderiza corretamente

