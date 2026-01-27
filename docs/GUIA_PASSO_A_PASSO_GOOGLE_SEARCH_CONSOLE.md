# 🔍 Guia Passo a Passo: Configurar Google Search Console

## 🎯 Objetivo

Configurar Google Search Console para monitorar o site no Google e melhorar o SEO.

**Tempo total:** 15-20 minutos

---

## 📋 PASSO 1: Acessar Google Search Console

### 1.1 Abrir o Site
1. Abra seu navegador (Chrome, Firefox, etc)
2. Acesse: **https://search.google.com/search-console**
3. Faça login com sua conta Google (a mesma do Gmail)

### 1.2 Primeira Vez?
- Se for a primeira vez, você verá uma tela de boas-vindas
- Clique em **"Começar"** ou **"Get Started"**

---

## 📋 PASSO 2: Adicionar Propriedade (Site)

### 2.1 Adicionar Nova Propriedade
1. No canto superior esquerdo, clique em **"Adicionar propriedade"** ou **"Add property"**
2. Você verá 3 opções:
   - **Prefixo de URL** (recomendado) ⭐
   - **Domínio** (avançado)
   - **App Android** (não usar)

### 2.2 Escolher "Prefixo de URL"
1. Clique em **"Prefixo de URL"**
2. Digite: `https://azmt.com.br`
3. Clique em **"Continuar"** ou **"Continue"**

---

## 📋 PASSO 3: Verificar Propriedade (Método HTML)

### 3.1 Escolher Método de Verificação
Você verá várias opções de verificação:
- ✅ **Tag HTML** (recomendado - mais fácil) ⭐
- Arquivo HTML
- Google Analytics
- Google Tag Manager
- etc.

### 3.2 Escolher "Tag HTML"
1. Clique em **"Tag HTML"**
2. Você verá uma tela com:
   - **Nome da tag:** `google-site-verification`
   - **Conteúdo:** Um código longo (ex: `ABC123XYZ789...`)

### 3.3 Copiar o Código
1. **Copie apenas o código** (a parte depois de `content="` e antes de `"`)
   - Exemplo: Se aparecer `content="ABC123XYZ789"`, copie: `ABC123XYZ789`
2. **IMPORTANTE:** Guarde esse código, você vai precisar dele!

---

## 📋 PASSO 4: Adicionar Código no index.html

### 4.1 Abrir o Arquivo
1. Abra o arquivo: `index.html` (na raiz do projeto)
2. Procure pela seção que diz:
   ```html
   <!-- ═══════════════════════════════════════════════════════════
        GOOGLE SEARCH CONSOLE VERIFICATION
        ═══════════════════════════════════════════════════════════ -->
   ```

### 4.2 Adicionar o Código
1. Você verá uma linha assim:
   ```html
   <meta name="google-site-verification" content="SEU_CODIGO_AQUI" />
   ```
2. **Substitua** `SEU_CODIGO_AQUI` pelo código que você copiou
3. Exemplo:
   ```html
   <meta name="google-site-verification" content="ABC123XYZ789" />
   ```

### 4.3 Salvar e Fazer Commit
1. **Salve o arquivo** (`Ctrl+S` ou `Cmd+S`)
2. **Commit e Push:**
   ```bash
   git add index.html
   git commit -m "feat: adicionar verificação Google Search Console"
   git push origin main
   ```
3. **Aguarde o deploy** no Vercel (2-3 minutos)

---

## 📋 PASSO 5: Verificar no Google Search Console

### 5.1 Voltar ao Google Search Console
1. Volte para: https://search.google.com/search-console
2. Você ainda estará na tela de verificação

### 5.2 Clicar em "Verificar"
1. Após o deploy (aguarde 2-3 minutos), clique em **"Verificar"** ou **"Verify"**
2. Se funcionou, você verá: ✅ **"Propriedade verificada"** ou **"Property verified"**
3. Clique em **"Continuar"** ou **"Continue"**

### 5.3 Se Não Funcionou
**Possíveis problemas:**
- ⚠️ Deploy ainda não terminou → Aguarde mais 2-3 minutos
- ⚠️ Código errado → Verifique se copiou corretamente
- ⚠️ Site não está no ar → Verifique se `https://azmt.com.br` está funcionando

**Solução:**
- Aguarde mais um pouco e tente novamente
- Verifique se o código está correto no `index.html`
- Verifique se o site está online: acesse `https://azmt.com.br` no navegador

---

## 📋 PASSO 6: Submeter Sitemap

### 6.1 Acessar Seção de Sitemaps
1. No menu lateral esquerdo, procure por **"Sitemaps"** ou **"Sitemaps"**
2. Clique nele

### 6.2 Adicionar Sitemap
1. Você verá um campo: **"Adicionar um novo sitemap"** ou **"Add a new sitemap"**
2. Digite apenas: `sitemap.xml`
   - **NÃO** digite: `https://azmt.com.br/sitemap.xml`
   - **DIGITE APENAS:** `sitemap.xml`
3. Clique em **"Enviar"** ou **"Submit"**

### 6.3 Verificar Status
1. Após alguns segundos, você verá o status do sitemap
2. Se funcionou: ✅ **"Sucesso"** ou **"Success"**
3. Se deu erro: ⚠️ Verifique se `https://azmt.com.br/sitemap.xml` está acessível

**Como verificar se sitemap está acessível:**
- Abra uma nova aba
- Acesse: `https://azmt.com.br/sitemap.xml`
- Deve abrir um arquivo XML (não uma página de erro)

---

## 📋 PASSO 7: Solicitar Indexação das Páginas Principais

### 7.1 Acessar Inspeção de URL
1. No menu lateral, procure por **"Inspeção de URL"** ou **"URL Inspection"**
2. Clique nele

### 7.2 Inspecionar Primeira URL
1. No campo de busca, digite: `https://azmt.com.br/pt`
2. Pressione **Enter** ou clique na lupa
3. Aguarde alguns segundos (Google vai analisar a URL)

### 7.3 Solicitar Indexação
1. Após a análise, você verá um botão: **"Solicitar indexação"** ou **"Request Indexing"**
2. Clique nele
3. Aguarde alguns segundos
4. Você verá: ✅ **"Solicitação de indexação enviada"** ou **"Indexing request submitted"**

### 7.4 Repetir para Outras URLs
Repita o processo para estas URLs principais:

1. `https://azmt.com.br/pt`
2. `https://azmt.com.br/pt/work`
3. `https://azmt.com.br/pt/academy`
4. `https://azmt.com.br/pt/contact`
5. `https://azmt.com.br/pt/what`
6. `https://azmt.com.br/pt/studio`

**Para cada uma:**
- Digite a URL no campo
- Pressione Enter
- Clique em "Solicitar indexação"
- Aguarde confirmação

---

## ✅ CHECKLIST COMPLETO

Marque conforme for fazendo:

- [ ] **Passo 1:** Acessei Google Search Console
- [ ] **Passo 2:** Adicionei propriedade `https://azmt.com.br`
- [ ] **Passo 3:** Escolhi método "Tag HTML" e copiei o código
- [ ] **Passo 4:** Adicionei código no `index.html` e fiz commit/push
- [ ] **Passo 5:** Verifiquei propriedade (✅ sucesso)
- [ ] **Passo 6:** Submeti sitemap.xml (✅ sucesso)
- [ ] **Passo 7:** Solicitei indexação de 6 URLs principais

---

## 🎯 PRÓXIMOS PASSOS (Depois de Configurar)

### Monitoramento Diário (5 minutos):
- [ ] Verificar impressões no Search Console
- [ ] Verificar cliques
- [ ] Verificar erros

### Monitoramento Semanal (15 minutos):
- [ ] Analisar queries principais
- [ ] Verificar novos backlinks
- [ ] Analisar tráfego orgânico

**Guia completo:** `docs/GUIA_MONITORAMENTO_SEO.md`

---

## 🚨 PROBLEMAS COMUNS E SOLUÇÕES

### Problema 1: "Não foi possível verificar"
**Causa:** Código não está no site ainda

**Solução:**
1. Verifique se fez commit e push
2. Aguarde deploy no Vercel (2-3 minutos)
3. Verifique se o código está correto no `index.html`
4. Acesse `https://azmt.com.br` e veja o código-fonte (Ctrl+U) → procure por `google-site-verification`

---

### Problema 2: "Sitemap não encontrado"
**Causa:** Sitemap não está acessível

**Solução:**
1. Acesse: `https://azmt.com.br/sitemap.xml` no navegador
2. Se não abrir, verifique se o arquivo existe em `public/sitemap.xml`
3. Se existir mas não abrir, pode ser problema de deploy

---

### Problema 3: "URL não está no Google"
**Causa:** Página ainda não foi indexada

**Solução:**
1. Isso é normal! Pode levar alguns dias
2. Continue solicitando indexação
3. Verifique se a página está acessível publicamente
4. Aguarde alguns dias e verifique novamente

---

## 📞 PRECISA DE AJUDA?

- Guia de monitoramento: `docs/GUIA_MONITORAMENTO_SEO.md`
- Guia completo de SEO: `docs/GUIA_SEO_PRIMEIRO_LUGAR.md`
- Documentação oficial: https://support.google.com/webmasters

---

## 💡 DICAS IMPORTANTES

1. **Paciência:** Indexação pode levar alguns dias
2. **Verifique regularmente:** Acesse Search Console semanalmente
3. **Não se preocupe com erros menores:** Alguns erros são normais
4. **Foque no que importa:** Impressões, cliques e posições

---

## ✅ PRONTO!

Após completar todos os passos, seu site estará configurado no Google Search Console e começará a ser monitorado!

**Tempo para ver primeiros dados:** 1-3 dias

**Tempo para ver resultados significativos:** 1-3 meses
