# 🔧 Como Adicionar Código do Google Search Console no index.html

## 🎯 OBJETIVO

Adicionar a meta tag de verificação do Google Search Console no arquivo `index.html` para verificar que você é o dono do site.

---

## 📋 PASSO A PASSO COMPLETO

### **PASSO 1: Obter o Código no Google Search Console**

1. **Acesse:** https://search.google.com/search-console
2. **Faça login** (se necessário)
3. **Selecione sua propriedade:** `http://www.azmt.com.br/` ou `https://azmt.com.br`
4. **No menu lateral esquerdo**, clique em **"Configurações"** (ícone de engrenagem ⚙️)
5. **Ou**, se você ainda não verificou o site:
   - Clique em **"Adicionar propriedade"**
   - Digite: `https://azmt.com.br`
   - Escolha método: **"Tag HTML"**
6. **Copie o código** que aparece, exemplo:
   ```
   ABC123XYZ789def456ghi012jkl345mno678pqr901stu234vwx567yz
   ```
   ⚠️ **IMPORTANTE:** Copie apenas o código, sem as tags HTML!

---

### **PASSO 2: Abrir o Arquivo index.html**

1. **Abra o arquivo:** `index.html`
   - Está na raiz do projeto: `c:\Users\ranz\Documents\azimut-site-vite-tailwind\index.html`
2. **Use qualquer editor de texto:**
   - VS Code (recomendado)
   - Notepad++
   - Bloco de Notas

---

### **PASSO 3: Localizar a Meta Tag**

1. **Procure por:** `SEU_CODIGO_GOOGLE_AQUI`
   - Use Ctrl+F (buscar)
   - Deve estar na linha ~47
2. **Você verá algo assim:**
   ```html
   <meta name="google-site-verification" content="SEU_CODIGO_GOOGLE_AQUI" />
   ```

---

### **PASSO 4: Substituir o Código**

1. **Substitua** `SEU_CODIGO_GOOGLE_AQUI` pelo código que você copiou
2. **Exemplo:**
   
   **ANTES:**
   ```html
   <meta name="google-site-verification" content="SEU_CODIGO_GOOGLE_AQUI" />
   ```
   
   **DEPOIS:**
   ```html
   <meta name="google-site-verification" content="ABC123XYZ789def456ghi012jkl345mno678pqr901stu234vwx567yz" />
   ```
3. **Salve o arquivo** (Ctrl+S)

---

### **PASSO 5: Fazer Commit e Push**

1. **Abra o terminal** (PowerShell ou Git Bash)
2. **Navegue até o diretório do projeto:**
   ```powershell
   cd C:\Users\ranz\Documents\azimut-site-vite-tailwind
   ```
3. **Adicione o arquivo:**
   ```powershell
   git add index.html
   ```
4. **Faça commit:**
   ```powershell
   git commit -m "feat: adicionar código Google Search Console"
   ```
5. **Faça push:**
   ```powershell
   git push origin main
   ```

---

### **PASSO 6: Aguardar Deploy**

1. **Aguarde 2-3 minutos** para o Vercel fazer deploy
2. **Verifique o deploy:**
   - Acesse: https://vercel.com/dashboard
   - Veja se o deploy foi concluído

---

### **PASSO 7: Verificar no Google Search Console**

1. **Volte ao Google Search Console:**
   - https://search.google.com/search-console
2. **Clique em "Verificar"** (botão que apareceu quando você copiou o código)
3. **Aguarde alguns segundos**
4. **Você deve ver:** ✅ **"Propriedade verificada"** ou **"Verificação bem-sucedida"**

---

## ✅ CHECKLIST

- [ ] Obter código no Google Search Console
- [ ] Abrir arquivo `index.html`
- [ ] Localizar `SEU_CODIGO_GOOGLE_AQUI`
- [ ] Substituir pelo código real
- [ ] Salvar arquivo
- [ ] Fazer `git add index.html`
- [ ] Fazer `git commit`
- [ ] Fazer `git push`
- [ ] Aguardar deploy (2-3 min)
- [ ] Verificar no Google Search Console

---

## 🎯 EXEMPLO VISUAL

### **ANTES (no index.html):**
```html
<!-- GOOGLE SEARCH CONSOLE -->
<meta name="google-site-verification" content="SEU_CODIGO_GOOGLE_AQUI" />
```

### **DEPOIS (no index.html):**
```html
<!-- GOOGLE SEARCH CONSOLE -->
<meta name="google-site-verification" content="ABC123XYZ789def456ghi012jkl345mno678pqr901stu234vwx567yz" />
```

---

## 🚨 PROBLEMAS COMUNS

### **"Não encontro SEU_CODIGO_GOOGLE_AQUI"**
- **Solução:** Procure por `google-site-verification` no arquivo
- Deve estar na linha ~47

### **"Código não funciona"**
- **Verifique:** Copiou apenas o código, sem tags HTML?
- **Verifique:** Não há espaços extras antes/depois?
- **Verifique:** Deploy foi concluído?

### **"Verificação falhou"**
- **Aguarde:** Pode levar 5-10 minutos após deploy
- **Verifique:** URL está correta no Search Console?
- **Verifique:** Meta tag está dentro de `<head>`?

---

## 💡 DICA IMPORTANTE

**Se você já verificou o site antes:**
- O código pode já estar no arquivo
- Verifique se está correto
- Se estiver, não precisa fazer nada!

---

## 🎉 PRONTO!

Após seguir esses passos:
- ✅ Site verificado no Google Search Console
- ✅ Você pode submeter sitemap
- ✅ Você pode solicitar indexação
- ✅ Você pode monitorar desempenho

**Tempo total:** ~5 minutos

---

## 📚 PRÓXIMOS PASSOS

Depois de verificar:
1. **Submeter sitemap.xml** (veja: `docs/PASSO_A_PASSO_GOOGLE_CONSOLE_AGORA.md`)
2. **Solicitar indexação** das páginas principais
3. **Monitorar** progresso de indexação
