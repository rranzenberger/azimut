# ✅ RESUMO: CONFIGURAR GOOGLE SEARCH CONSOLE

**Tempo:** 15-20 minutos  
**Dificuldade:** Fácil

---

## 🎯 **PASSO A PASSO RÁPIDO**

### **1. Acessar Google Search Console**
👉 https://search.google.com/search-console

### **2. Adicionar Propriedade**
- Clique em **"Adicionar propriedade"**
- Selecione **"Prefixo de URL"**
- Digite: `https://azmt.com.br`
- Clique em **"Continuar"**

### **3. Verificar Propriedade (Método Mais Fácil)**

**Opção A: Variável de Ambiente (Recomendado) ⭐**

1. Google mostrará uma tag:
   ```html
   <meta name="google-site-verification" content="ABC123XYZ..." />
   ```
2. **Copie apenas o código** (`ABC123XYZ...`)
3. **Adicione no Vercel:**
   - Acesse: https://vercel.com/dashboard
   - Projeto → Settings → Environment Variables
   - **Name:** `VITE_GOOGLE_SEARCH_CONSOLE_VERIFICATION`
   - **Value:** `ABC123XYZ...` (cole o código)
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development
   - **Save** → **Redeploy**
4. Após deploy, volte ao Google Search Console e clique em **"Verificar"**

**Opção B: Adicionar no index.html**

1. Obtenha o código (mesmo processo acima)
2. Abra: `index.html`
3. Adicione dentro de `<head>`, após linha 9:
   ```html
   <!-- Google Search Console Verification -->
   <meta name="google-site-verification" content="ABC123XYZ..." />
   ```
4. Salve, commit, push, aguarde deploy
5. Volte ao Google Search Console e clique em **"Verificar"**

---

### **4. Submeter Sitemap**

Após verificação bem-sucedida:

1. Menu lateral → **"Sitemaps"**
2. Em **"Adicionar um novo sitemap"**, digite:
   ```
   sitemap.xml
   ```
3. Clique em **"Enviar"**

**URL do sitemap:** `https://azmt.com.br/sitemap.xml` ✅ (já existe!)

---

### **5. Solicitar Indexação (Opcional mas Recomendado)**

Para acelerar indexação de páginas importantes:

1. Menu lateral → **"Inspeção de URL"**
2. Digite: `https://azmt.com.br/pt`
3. Clique em **"Testar URL publicada"**
4. Se OK, clique em **"Solicitar indexação"**
5. Repita para:
   - `https://azmt.com.br/pt/academy/vancouver`
   - `https://azmt.com.br/pt/work`
   - `https://azmt.com.br/pt/what`

---

## ✅ **CHECKLIST**

- [ ] Google Search Console acessado
- [ ] Propriedade `https://azmt.com.br` adicionada
- [ ] Código de verificação obtido
- [ ] Tag adicionada (via variável de ambiente ou index.html)
- [ ] Deploy realizado
- [ ] Verificação concluída no Google Search Console
- [ ] Sitemap.xml submetido
- [ ] URLs principais solicitadas para indexação

---

## 📊 **O QUE MONITORAR (Após 1-2 Semanas)**

### **Performance:**
- Impressões (quantas vezes apareceu)
- Cliques (quantos cliques recebeu)
- CTR (taxa de cliques)
- Posição média

### **Cobertura:**
- Páginas válidas (indexadas)
- Erros de indexação
- Avisos

### **Core Web Vitals:**
- LCP, FID, CLS

---

## 🚨 **PROBLEMAS COMUNS**

**"Não foi possível verificar":**
- Aguarde alguns minutos após deploy
- Verifique se tag está no `<head>`
- Use método alternativo

**"Sitemap não encontrado":**
- Verifique: `https://azmt.com.br/sitemap.xml`
- Se não abrir, verifique se arquivo existe em `public/sitemap.xml`

---

## 📄 **DOCUMENTOS CRIADOS**

1. ✅ `GUIA_GOOGLE_SEARCH_CONSOLE_PASSO_A_PASSO.md` - Guia completo detalhado
2. ✅ `COMO_ADICIONAR_VERIFICACAO_GOOGLE.md` - Como adicionar tag de verificação
3. ✅ `RESUMO_CONFIGURACAO_GOOGLE_SEARCH_CONSOLE.md` - Este resumo

---

## 🎯 **PRÓXIMOS PASSOS**

1. **Agora:** Seguir passo a passo acima
2. **Esta semana:** Monitorar primeiros dados
3. **Próxima semana:** Analisar keywords e otimizar

---

**Status:** ⏳ **AGUARDANDO CONFIGURAÇÃO**  
**Tempo estimado:** 15-20 minutos
