# 🔍 COMO VERIFICAR SCHEMA.ORG NO DOM (F12)

**Guia rápido para verificar meta tags e Schema.org no DevTools**

---

## 📋 **PASSO A PASSO:**

### **1. Abra o DevTools (F12)**
- Pressione **F12** no navegador
- Ou clique com botão direito → "Inspecionar"

### **2. Vá na aba "Elements"**
- Já está aberta na sua imagem ✅

### **3. Expanda o `<head>`**
- Clique na **setinha (►)** ao lado de `<head>`
- Ou clique duas vezes em `<head>`

### **4. Procure por:**
- `<script type="application/ld+json">` - Schema.org JSON-LD
- `<meta property="og:...">` - Open Graph tags
- `<meta name="twitter:...">` - Twitter Cards

---

## 🎯 **O QUE VOCÊ DEVE VER:**

### **Schema.org Organization:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Azimut",
  "address": [
    {
      "@type": "PostalAddress",
      "streetAddress": "Rio de Janeiro, RJ",  ✅
      "addressLocality": "Rio de Janeiro",
      "addressRegion": "RJ",                  ✅
      "postalCode": "22041-080",              ✅
      "addressCountry": "BR"
    },
    {
      "@type": "PostalAddress",
      "streetAddress": "Vancouver, BC",       ✅
      "addressLocality": "Vancouver",
      "addressRegion": "BC",                  ✅
      "postalCode": "V6B 1A1",                ✅
      "addressCountry": "CA"
    }
  ]
}
</script>
```

### **Open Graph Tags:**
```html
<meta property="og:type" content="website" />
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="..." />
```

### **Twitter Cards:**
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
```

---

## 🔍 **DICA: BUSCAR RÁPIDO**

No DevTools Elements:
1. Pressione **Ctrl+F** (ou Cmd+F no Mac)
2. Digite: `application/ld+json`
3. ✅ Deve encontrar o Schema.org

Ou busque por:
- `og:title` - Para Open Graph
- `twitter:card` - Para Twitter Cards
- `SchemaOrganization` - Para o componente

---

## ✅ **VERIFICAÇÃO RÁPIDA:**

**Se você ver:**
- ✅ `<script type="application/ld+json">` com `streetAddress`, `addressRegion`, `postalCode`
- ✅ Meta tags `og:*` (Open Graph)
- ✅ Meta tags `twitter:*` (Twitter Cards)

**Então está tudo funcionando!** 🎉

---

## 🚨 **SE NÃO APARECER:**

1. **Aguarde o deploy** (2-5 minutos após o push)
2. **Recarregue a página** (Ctrl+Shift+R ou Ctrl+F5)
3. **Limpe o cache** do navegador
4. **Verifique se o deploy foi concluído** no Vercel

---

**Próximo passo:** Expanda o `<head>` e me diga o que você vê! 🚀
