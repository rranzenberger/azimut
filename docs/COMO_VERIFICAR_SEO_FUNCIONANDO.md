# ✅ Como Verificar se o SEO está Funcionando

## 🎯 Status: **JÁ IMPLEMENTADO E FUNCIONANDO!**

O frontend já está configurado para usar automaticamente os campos SEO otimizados pela IA.

## 📍 Onde está implementado:

### 1. **Código do Frontend** (`src/pages/ProjectDetail.tsx`)
```typescript
// Linhas 133-135: Usa campos SEO se disponíveis, senão usa fallback
const seoTitle = project.seo?.title || `${project.title} | ${seoData.work[lang].title}`
const seoDescription = project.seo?.description || project.description || project.summary || seoData.work[lang].description
const seoKeywords = project.seo?.keywords?.join(', ') || seoData.work[lang].keywords
```

### 2. **API** (`azimut-cms/app/api/public/project/[slug]/route.ts`)
- Retorna campos SEO por idioma
- Formato: `{ seo: { title, description, keywords } }`

### 3. **Hook** (`src/hooks/useProject.ts`)
- Interface atualizada com campo `seo?`

## 🧪 Como Testar:

### Método 1: Verificar no Navegador (Mais Fácil)

1. **Primeiro, liste os projetos disponíveis:**
   - Execute: `LISTAR_PROJETOS.bat`
   - Ou acesse: `https://backoffice.azmt.com.br/admin/projects`
   - Copie o **slug** de um projeto (ex: `museu-olimpico-rio`)

2. **Acesse um projeto otimizado usando o slug real:**
   ```
   https://azmt.com.br/pt/work/museu-olimpico-rio
   ```
   ⚠️ **IMPORTANTE:** Substitua `museu-olimpico-rio` pelo slug real do projeto!

2. **Visualize o código-fonte:**
   - Pressione `Ctrl+U` (Windows) ou `Cmd+Option+U` (Mac)
   - Ou clique com botão direito → "Ver código-fonte"

3. **Procure por estas tags no `<head>`:**
   ```html
   <title>Meta Title Otimizado pela IA | Portfolio de Projetos...</title>
   <meta name="description" content="Meta Description otimizada pela IA...">
   <meta name="keywords" content="keyword1, keyword2, keyword3...">
   ```

4. **Se você ver:**
   - ✅ Título otimizado (não apenas "Nome do Projeto | Portfolio...")
   - ✅ Descrição otimizada (não apenas a descrição padrão)
   - ✅ Keywords otimizadas
   
   **Então está funcionando!** 🎉

### Método 2: Verificar via DevTools (Mais Técnico)

1. **Abra o DevTools:**
   - Pressione `F12` ou `Ctrl+Shift+I`

2. **Vá para a aba "Console"**

3. **Execute este código:**
   ```javascript
   // Verificar título
   console.log('Título:', document.title)
   
   // Verificar meta description
   const metaDesc = document.querySelector('meta[name="description"]')
   console.log('Description:', metaDesc?.content)
   
   // Verificar keywords
   const metaKeywords = document.querySelector('meta[name="keywords"]')
   console.log('Keywords:', metaKeywords?.content)
   ```

4. **Se os valores forem os otimizados pela IA, está funcionando!**

### Método 3: Verificar via API (Mais Direto)

1. **Primeiro, obtenha o slug de um projeto:**
   - Execute: `LISTAR_PROJETOS.bat`
   - Ou veja no backoffice: `https://backoffice.azmt.com.br/admin/projects`

2. **Abra o navegador e acesse (substitua pelo slug real):**
   ```
   https://backoffice.azmt.com.br/api/public/project/museu-olimpico-rio?lang=pt
   ```
   ⚠️ **IMPORTANTE:** Substitua `museu-olimpico-rio` pelo slug real do projeto!

2. **Procure pelo objeto `seo`:**
   ```json
   {
     "seo": {
       "title": "Título otimizado...",
       "description": "Descrição otimizada...",
       "keywords": ["keyword1", "keyword2", ...]
     }
   }
   ```

3. **Se o objeto `seo` existir e tiver valores, a API está funcionando!**

## 🔍 Como Saber se um Projeto foi Otimizado:

### No Backoffice:
1. Acesse: `https://backoffice.azmt.com.br/admin/projects`
2. Abra um projeto
3. Verifique se os campos estão preenchidos:
   - `seoTitlePt` ✅
   - `seoDescPt` ✅
   - `seoKeywords` ✅

### Lista de Projetos Otimizados:
Execute o script `EXECUTAR_OTIMIZAR_SEO.bat` novamente para ver quais projetos foram processados.

## 🚨 Troubleshooting:

### Problema: "Não vejo os campos SEO no código-fonte"
**Solução:**
1. Limpe o cache do navegador (`Ctrl+Shift+Delete`)
2. Verifique se o projeto foi otimizado no backoffice
3. Verifique se a API está retornando os campos: `https://backoffice.azmt.com.br/api/public/project/[slug]?lang=pt`

### Problema: "Vejo valores padrão, não os otimizados"
**Solução:**
1. O projeto pode não ter sido otimizado ainda
2. Execute `EXECUTAR_OTIMIZAR_SEO.bat` novamente
3. Aguarde alguns segundos e recarregue a página

### Problema: "API retorna `seo: null`"
**Solução:**
1. Verifique se o projeto tem os campos preenchidos no banco
2. Execute o script de otimização novamente
3. Verifique se o Prisma client foi regenerado: `npx prisma generate`

## ✅ Checklist de Verificação:

- [ ] Script de otimização executado com sucesso
- [ ] Campos SEO preenchidos no backoffice
- [ ] API retorna campos SEO (`/api/public/project/[slug]`)
- [ ] Frontend mostra título otimizado no código-fonte
- [ ] Frontend mostra description otimizada no código-fonte
- [ ] Frontend mostra keywords otimizadas no código-fonte

## 🎯 Resultado Esperado:

Quando tudo estiver funcionando, você verá no código-fonte da página:

```html
<head>
  <title>Projeto Exemplo - Título Otimizado pela IA | Portfolio...</title>
  <meta name="description" content="Descrição otimizada pela IA com palavras-chave relevantes...">
  <meta name="keywords" content="keyword1, keyword2, keyword3, keyword4...">
  <!-- ... outras meta tags ... -->
</head>
```

**Em vez de:**
```html
<head>
  <title>Nome do Projeto | Portfolio de Projetos...</title>
  <meta name="description" content="Descrição padrão do projeto...">
  <meta name="keywords" content="keywords padrão...">
</head>
```
