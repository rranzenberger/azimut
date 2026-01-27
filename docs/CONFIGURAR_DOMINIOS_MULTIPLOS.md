# 🌍 Configurar Múltiplos Domínios: azimutimmersive.com + azimut.com.br

## 🎯 ESTRATÉGIA DE DOMÍNIOS

Você tem **dois domínios**:
- 🌎 **azimutimmersive.com** - Para fora do Brasil (internacional)
- 🇧🇷 **azimut.com.br** - Para Brasil

---

## 📋 CONFIGURAÇÃO NOS BUSCADORES

### **1. GOOGLE SEARCH CONSOLE**

Você precisa adicionar **AMBOS** os domínios:

#### **Domínio 1: azimutimmersive.com**
1. Acesse: https://search.google.com/search-console
2. Adicione propriedade: `https://azimutimmersive.com`
3. Verifique (meta tag ou DNS)
4. Submeta sitemap: `sitemap.xml`

#### **Domínio 2: azimut.com.br**
1. No mesmo Google Search Console
2. Adicione propriedade: `https://azimut.com.br`
3. Verifique (meta tag ou DNS)
4. Submeta sitemap: `sitemap.xml`

**Nota:** Cada domínio precisa de sua própria verificação!

---

### **2. BING WEBMASTER TOOLS**

Você precisa adicionar **AMBOS** os domínios:

#### **Domínio 1: azimutimmersive.com**
1. Acesse: https://www.bing.com/webmasters
2. Adicione site: `https://azimutimmersive.com`
3. Escolha método: **"HTML Meta Tag"**
4. **Me envie o código** - eu adiciono no index.html
5. Verifique
6. Submeta sitemap: `sitemap.xml`

#### **Domínio 2: azimut.com.br**
1. No mesmo Bing Webmaster Tools
2. Adicione site: `https://azimut.com.br`
3. Escolha método: **"HTML Meta Tag"**
4. **Me envie o código** - eu adiciono no index.html
5. Verifique
6. Submeta sitemap: `sitemap.xml`

**Nota:** Cada domínio precisa de sua própria meta tag!

---

### **3. YANDEX WEBMASTER (Opcional)**

Mesmo processo - adicione ambos os domínios separadamente.

---

## 🔧 CONFIGURAÇÃO NO CÓDIGO

### **Sitemap Dinâmico**

O sitemap precisa gerar URLs para **ambos** os domínios ou apenas um?

**Opções:**

1. **Sitemap único** (recomendado):
   - Gera URLs para o domínio principal
   - Funciona para ambos via redirects

2. **Sitemaps separados**:
   - `/sitemap-pt.xml` para azimut.com.br
   - `/sitemap-en.xml` para azimutimmersive.com

**Qual você prefere?**

---

## 📝 META TAGS NO index.html

### **Google Search Console**

Você precisará de **2 meta tags** (uma para cada domínio):

```html
<!-- Google Search Console - azimutimmersive.com -->
<meta name="google-site-verification" content="CODIGO_AZIMUTIMMERSIVE" />

<!-- Google Search Console - azimut.com.br -->
<meta name="google-site-verification" content="CODIGO_AZIMUT_COM_BR" />
```

### **Bing Webmaster Tools**

Você precisará de **2 meta tags** (uma para cada domínio):

```html
<!-- Bing - azimutimmersive.com -->
<meta name="msvalidate.01" content="CODIGO_BING_AZIMUTIMMERSIVE" />

<!-- Bing - azimut.com.br -->
<meta name="msvalidate.01" content="CODIGO_BING_AZIMUT_COM_BR" />
```

**⚠️ PROBLEMA:** Bing só permite UMA meta tag `msvalidate.01` por página!

**Solução:** Usar variáveis de ambiente ou configurar separadamente.

---

## 🎯 PRÓXIMOS PASSOS

### **AGORA (Bing):**

1. **Para azimutimmersive.com:**
   - No Bing, adicione: `https://azimutimmersive.com`
   - Escolha: "HTML Meta Tag"
   - **Me envie o código**

2. **Para azimut.com.br:**
   - No Bing, adicione: `https://azimut.com.br`
   - Escolha: "HTML Meta Tag"
   - **Me envie o código**

### **DEPOIS (Google):**

1. Adicione ambos no Google Search Console
2. Verifique cada um
3. Submeta sitemap para cada um

---

## ✅ CHECKLIST

### **Bing Webmaster Tools:**
- [ ] Adicionar azimutimmersive.com
- [ ] Obter código HTML Meta Tag
- [ ] Me enviar código
- [ ] Adicionar azimut.com.br
- [ ] Obter código HTML Meta Tag
- [ ] Me enviar código
- [ ] Eu adiciono ambos no index.html
- [ ] Verificar ambos
- [ ] Submeter sitemap para ambos

### **Google Search Console:**
- [ ] Adicionar azimutimmersive.com
- [ ] Verificar
- [ ] Submeter sitemap
- [ ] Adicionar azimut.com.br
- [ ] Verificar
- [ ] Submeter sitemap

---

## 🚀 COMEÇAR AGORA

**Para o Bing (azimutimmersive.com):**
1. No Bing, adicione: `https://azimutimmersive.com`
2. Escolha: "HTML Meta Tag"
3. **Me envie o código!**

Depois fazemos o mesmo para `azimut.com.br`!

---

## 💡 DICA IMPORTANTE

**Bing e múltiplos domínios:**
- Bing permite apenas UMA meta tag `msvalidate.01` por página
- **Solução:** Vamos usar a meta tag do domínio principal (azimutimmersive.com)
- Para azimut.com.br, podemos usar método DNS ou arquivo XML

**Ou:** Configurar cada domínio em seu próprio arquivo HTML (se tiverem sites separados).

---

## 🎯 ME ENVIE OS CÓDIGOS

Quando tiver os códigos do Bing:
1. Código para `azimutimmersive.com`
2. Código para `azimut.com.br`

Eu configuro tudo automaticamente! 🚀
