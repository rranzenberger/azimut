# ✅ COMO ADICIONAR VERIFICAÇÃO DO GOOGLE SEARCH CONSOLE

**Método mais fácil:** Via variável de ambiente (recomendado)

---

## 🎯 **MÉTODO 1: Variável de Ambiente (Recomendado)**

### **Passo 1: Obter Código de Verificação**

1. Acesse: https://search.google.com/search-console
2. Adicione propriedade: `https://azmt.com.br`
3. Escolha método: **"Tag HTML"**
4. Google mostrará uma tag como:
   ```html
   <meta name="google-site-verification" content="ABC123XYZ..." />
   ```
5. **Copie apenas o conteúdo** (a parte `ABC123XYZ...`)

### **Passo 2: Adicionar no Vercel**

1. Acesse: https://vercel.com/dashboard
2. Selecione projeto: `azimut` (ou nome do projeto)
3. Vá em **Settings** → **Environment Variables**
4. Clique em **"Add New"**
5. Preencha:
   - **Name:** `VITE_GOOGLE_SEARCH_CONSOLE_VERIFICATION`
   - **Value:** `ABC123XYZ...` (cole o código copiado)
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development
6. Clique em **"Save"**
7. **Redeploy** o projeto (ou aguarde próximo deploy automático)

### **Passo 3: Verificar**

1. Após deploy, acesse: `https://azmt.com.br`
2. Veja o código-fonte (Ctrl+U)
3. Procure por: `<meta name="google-site-verification"`
4. Se aparecer, está funcionando!
5. Volte ao Google Search Console e clique em **"Verificar"**

**Tempo total:** 5 minutos + tempo de deploy

---

## 🎯 **MÉTODO 2: Adicionar Direto no index.html**

### **Passo 1: Obter Código de Verificação**

(Same as Método 1, Passo 1)

### **Passo 2: Editar index.html**

1. Abra: `index.html` na raiz do projeto
2. Adicione a tag dentro de `<head>`, após linha 9:
   ```html
   <!-- Google Search Console Verification -->
   <meta name="google-site-verification" content="ABC123XYZ..." />
   ```
3. Salve o arquivo
4. Faça commit e push
5. Aguarde deploy automático

### **Passo 3: Verificar**

(Same as Método 1, Passo 3)

**Tempo total:** 3 minutos + tempo de deploy

---

## 🎯 **MÉTODO 3: Via Backoffice (Futuro)**

Se o backoffice tiver campo para meta tags customizadas, você pode adicionar lá também.

---

## ✅ **VERIFICAÇÃO RÁPIDA**

Após adicionar a tag, verifique:

1. **No navegador:**
   - Acesse: `https://azmt.com.br`
   - Veja código-fonte (Ctrl+U ou Cmd+U)
   - Procure: `google-site-verification`
   - Se encontrar, está OK!

2. **No Google Search Console:**
   - Clique em **"Verificar"**
   - Se aparecer ✅ "Propriedade verificada", sucesso!

---

## 🚨 **PROBLEMAS COMUNS**

### **"Não foi possível verificar"**
- Verifique se a tag está no `<head>` do site
- Aguarde alguns minutos após deploy
- Use método alternativo (arquivo HTML ou DNS)

### **"Tag não encontrada"**
- Verifique se fez deploy após adicionar
- Verifique se a tag está correta (sem espaços extras)
- Tente método alternativo

---

## 📋 **CHECKLIST**

- [ ] Código de verificação obtido do Google Search Console
- [ ] Tag adicionada (via variável de ambiente ou index.html)
- [ ] Deploy realizado
- [ ] Tag verificada no código-fonte do site
- [ ] Verificação concluída no Google Search Console

---

**Status:** ⏳ **AGUARDANDO CÓDIGO DE VERIFICAÇÃO**  
**Próxima ação:** Seguir um dos métodos acima para adicionar a tag
