# 🔍 GUIA: TESTAR META TAGS COM FACEBOOK DEBUGGER E TWITTER CARD VALIDATOR

**Data:** 19 Janeiro 2026  
**Status:** ✅ Schema.org já implementado no Layout.tsx

---

## ✅ **VERIFICAÇÃO: Schema.org Components**

### **Status Atual:**
- ✅ `SchemaOrganization` - **JÁ IMPLEMENTADO** no Layout.tsx
- ✅ `SchemaBreadcrumbList` - **JÁ IMPLEMENTADO** no Layout.tsx
- ✅ Ambos renderizados no final do Layout (linhas 1504-1505)

**Não precisa fazer nada!** Os componentes já estão adicionados e funcionando.

---

## 🎯 **TESTAR META TAGS**

### **1. FACEBOOK DEBUGGER (Open Graph)**

#### **Como testar:**

1. **Acesse:** https://developers.facebook.com/tools/debug/

2. **Digite a URL:**
   ```
   https://azmt.com.br/pt
   ```
   (ou qualquer outra página: `/pt/academy/vancouver`, `/pt/work`, etc.)

3. **Clique em "Depurar"** (ou "Debug")

4. **O que verificar:**
   - ✅ **og:title** - Título aparece corretamente?
   - ✅ **og:description** - Descrição aparece corretamente?
   - ✅ **og:image** - Imagem aparece? (deve ser 1200x630px)
   - ✅ **og:url** - URL está correta?
   - ✅ **og:type** - Tipo está correto? (website ou article)
   - ✅ **og:locale** - Idioma está correto?

5. **Se houver erros:**
   - Clique em "Buscar Novas Informações" para atualizar cache
   - Verifique se a imagem está acessível (deve abrir no navegador)
   - Verifique se a URL está correta

#### **URLs para testar:**
- `https://azmt.com.br/pt`
- `https://azmt.com.br/pt/academy/vancouver`
- `https://azmt.com.br/pt/work`
- `https://azmt.com.br/pt/what`

---

### **2. TWITTER CARD VALIDATOR**

#### **Como testar:**

1. **Acesse:** https://cards-dev.twitter.com/validator
   (ou use: https://twitter.com/i/cards/validator)

2. **Digite a URL:**
   ```
   https://azmt.com.br/pt
   ```
   (ou qualquer outra página)

3. **Clique em "Preview card"** ou "Validar"

4. **O que verificar:**
   - ✅ **twitter:card** - Tipo de card (deve ser `summary_large_image`)
   - ✅ **twitter:title** - Título aparece corretamente?
   - ✅ **twitter:description** - Descrição aparece corretamente?
   - ✅ **twitter:image** - Imagem aparece? (deve ser 1200x630px)
   - ✅ **twitter:image:alt** - Alt text está presente?
   - ✅ **Preview** - O preview visual está correto?

5. **Se houver erros:**
   - Verifique se a imagem está acessível
   - Verifique se todas as meta tags estão presentes
   - Verifique se a URL está correta

#### **URLs para testar:**
- `https://azmt.com.br/pt`
- `https://azmt.com.br/pt/academy/vancouver`
- `https://azmt.com.br/pt/work`
- `https://azmt.com.br/pt/what`

---

### **3. GOOGLE RICH RESULTS TEST**

#### **Como testar:**

1. **Acesse:** https://search.google.com/test/rich-results

2. **Digite a URL:**
   ```
   https://azmt.com.br/pt
   ```
   (ou qualquer outra página)

3. **Clique em "Testar URL"**

4. **O que verificar:**
   - ✅ **Organization Schema** - Aparece corretamente?
   - ✅ **BreadcrumbList Schema** - Aparece corretamente?
   - ✅ **Sem erros** - Nenhum erro de validação?

5. **Se houver erros:**
   - Clique no erro para ver detalhes
   - Corrija o problema no código
   - Teste novamente

#### **URLs para testar:**
- `https://azmt.com.br/pt`
- `https://azmt.com.br/pt/academy/vancouver`
- `https://azmt.com.br/pt/work`

---

## 📋 **CHECKLIST DE TESTES**

### **Facebook Debugger:**
- [ ] Testar `https://azmt.com.br/pt`
- [ ] Testar `https://azmt.com.br/pt/academy/vancouver`
- [ ] Testar `https://azmt.com.br/pt/work`
- [ ] Verificar se todas as meta tags Open Graph aparecem
- [ ] Verificar se a imagem aparece (1200x630px)
- [ ] Verificar se o preview está correto

### **Twitter Card Validator:**
- [ ] Testar `https://azmt.com.br/pt`
- [ ] Testar `https://azmt.com.br/pt/academy/vancouver`
- [ ] Testar `https://azmt.com.br/pt/work`
- [ ] Verificar se todas as meta tags Twitter aparecem
- [ ] Verificar se a imagem aparece (1200x630px)
- [ ] Verificar se o preview está correto

### **Google Rich Results Test:**
- [ ] Testar `https://azmt.com.br/pt`
- [ ] Testar `https://azmt.com.br/pt/academy/vancouver`
- [ ] Verificar se Organization Schema aparece
- [ ] Verificar se BreadcrumbList Schema aparece
- [ ] Verificar se não há erros

---

## 🚨 **PROBLEMAS COMUNS E SOLUÇÕES**

### **Problema 1: "Imagem não encontrada"**
**Solução:**
- Verifique se a imagem existe: `https://azmt.com.br/og-image.jpg`
- Verifique se a URL está correta (HTTPS)
- Verifique se a imagem está acessível publicamente

### **Problema 2: "Cache antigo"**
**Solução:**
- Facebook: Clique em "Buscar Novas Informações"
- Twitter: Aguarde alguns minutos e teste novamente
- Google: Aguarde alguns minutos e teste novamente

### **Problema 3: "Meta tags não aparecem"**
**Solução:**
- Verifique se o componente `<SEO>` está sendo usado na página
- Verifique se o `usePageSEO` está retornando dados corretos
- Verifique o código-fonte da página (Ctrl+U) e procure por `og:title`

### **Problema 4: "Schema.org não aparece"**
**Solução:**
- Verifique se `SchemaOrganization` e `SchemaBreadcrumbList` estão no Layout.tsx
- Verifique o código-fonte da página e procure por `application/ld+json`
- Verifique se não há erros de sintaxe JSON

---

## ✅ **VERIFICAÇÃO RÁPIDA NO CÓDIGO-FONTE**

### **Como verificar manualmente:**

1. **Acesse qualquer página do site:**
   ```
   https://azmt.com.br/pt
   ```

2. **Veja o código-fonte:**
   - Pressione **Ctrl+U** (ou Cmd+U no Mac)
   - Ou clique com botão direito → "Ver código-fonte"

3. **Procure por:**

#### **Open Graph:**
```html
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="..." />
```

#### **Twitter Cards:**
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="..." />
```

#### **Schema.org:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  ...
}
</script>
```

---

## 📊 **RESULTADO ESPERADO**

### **Facebook Debugger:**
- ✅ Preview mostra título, descrição e imagem
- ✅ Todas as meta tags Open Graph presentes
- ✅ Imagem 1200x630px carrega corretamente
- ✅ URL canônica correta

### **Twitter Card Validator:**
- ✅ Preview mostra card grande com imagem
- ✅ Todas as meta tags Twitter presentes
- ✅ Imagem 1200x630px carrega corretamente
- ✅ Alt text presente

### **Google Rich Results Test:**
- ✅ Organization Schema detectado
- ✅ BreadcrumbList Schema detectado
- ✅ Nenhum erro de validação
- ✅ Rich snippets disponíveis

---

## 🔗 **LINKS ÚTEIS**

- **Facebook Debugger:** https://developers.facebook.com/tools/debug/
- **LinkedIn Post Inspector:** https://www.linkedin.com/post-inspector/
- **Twitter Card Validator:** https://cards-dev.twitter.com/validator
- **Google Rich Results Test:** https://search.google.com/test/rich-results
- **Schema.org Validator:** https://validator.schema.org/

---

## 💡 **DICAS IMPORTANTES**

1. **Cache:** Facebook e Twitter fazem cache. Use "Buscar Novas Informações" se necessário
2. **Imagens:** Certifique-se de que as imagens OG existem e estão acessíveis
3. **HTTPS:** Todas as URLs devem usar HTTPS
4. **Tamanho:** Imagens OG devem ser 1200x630px para melhor visualização

---

## ✅ **CHECKLIST FINAL**

- [x] Schema.org components já implementados no Layout.tsx
- [ ] Testar com Facebook Debugger
- [ ] Testar com Twitter Card Validator
- [ ] Testar com Google Rich Results Test
- [ ] Verificar código-fonte manualmente
- [ ] Corrigir erros (se houver)

---

**Status:** ✅ **Schema.org implementado**  
**Próxima ação:** Testar meta tags com as ferramentas acima
