# 🔍 GUIA COMPLETO: CONFIGURAR GOOGLE SEARCH CONSOLE

**Data:** 19 Janeiro 2026  
**Tempo estimado:** 15-20 minutos  
**Dificuldade:** Fácil

---

## 🎯 **O QUE É GOOGLE SEARCH CONSOLE?**

Ferramenta gratuita do Google que permite:
- Ver como o Google vê seu site
- Monitorar posições nos resultados de busca
- Submeter sitemap.xml
- Ver erros de indexação
- Acompanhar Core Web Vitals
- Ver quais keywords trazem tráfego

**Impacto:** Visibilidade completa do SEO do site

---

## 📋 **PASSO A PASSO COMPLETO**

### **PASSO 1: Acessar Google Search Console**

1. Acesse: https://search.google.com/search-console
2. Faça login com sua conta Google
3. Clique em **"Adicionar propriedade"** (ou "Add property")

---

### **PASSO 2: Adicionar Propriedade do Site**

**Opção A: Prefixo de URL (Recomendado)**
1. Selecione **"Prefixo de URL"**
2. Digite: `https://azmt.com.br`
3. Clique em **"Continuar"**

**Opção B: Domínio (Alternativa)**
1. Selecione **"Domínio"**
2. Digite: `azmt.com.br`
3. Clique em **"Continuar"**

**Recomendação:** Use **Prefixo de URL** (mais simples)

---

### **PASSO 3: Verificar Propriedade do Site**

O Google precisa verificar que você é dono do site. **3 métodos disponíveis:**

#### **MÉTODO 1: Tag HTML (Mais Fácil) ⭐ RECOMENDADO**

1. Google mostrará uma tag HTML como esta:
   ```html
   <meta name="google-site-verification" content="ABC123XYZ..." />
   ```

2. **Copie o conteúdo** (a parte `ABC123XYZ...`)

3. **Adicione no arquivo `index.html`** do site:
   - Abra: `index.html` na raiz do projeto
   - Adicione a tag dentro de `<head>`
   - Salve e faça deploy

4. **Ou adicione via backoffice:**
   - Se o backoffice tiver campo para meta tags, adicione lá

5. Volte ao Google Search Console e clique em **"Verificar"**

**Tempo:** 5 minutos (após deploy)

---

#### **MÉTODO 2: Arquivo HTML (Alternativa)**

1. Google oferecerá baixar um arquivo HTML
2. Baixe o arquivo (ex: `google1234567890.html`)
3. Faça upload para a raiz do site (`public/` ou raiz do Vercel)
4. Acesse: `https://azmt.com.br/google1234567890.html` (deve aparecer)
5. Volte ao Google Search Console e clique em **"Verificar"**

**Tempo:** 5 minutos (após upload)

---

#### **MÉTODO 3: DNS (Mais Complexo)**

1. Google fornecerá um registro TXT para adicionar no DNS
2. Acesse seu provedor de DNS (Vercel, Cloudflare, etc.)
3. Adicione o registro TXT fornecido
4. Aguarde propagação (pode levar até 48h)
5. Volte ao Google Search Console e clique em **"Verificar"**

**Tempo:** 5 minutos + propagação DNS

---

### **PASSO 4: Submeter Sitemap.xml**

Após verificação bem-sucedida:

1. No menu lateral, clique em **"Sitemaps"**
2. Em **"Adicionar um novo sitemap"**, digite:
   ```
   sitemap.xml
   ```
3. Clique em **"Enviar"**

**URLs do sitemap:**
- `https://azmt.com.br/sitemap.xml`
- `https://azmt.com.br/sitemap-pt.xml` (se houver)
- `https://azmt.com.br/sitemap-en.xml` (se houver)

**Nota:** Se o sitemap não existir ainda, podemos criar depois.

---

### **PASSO 5: Configurar Configurações**

1. **Ajustes Internacionais:**
   - Menu lateral → **"Configurações"** → **"Ajustes Internacionais"**
   - Adicione idiomas: Português (Brasil), Inglês (EUA), Espanhol, Francês
   - Configure país-alvo se aplicável

2. **Usuários e Permissões:**
   - Menu lateral → **"Configurações"** → **"Usuários e Permissões"**
   - Adicione outros usuários se necessário

---

### **PASSO 6: Solicitar Indexação (Opcional mas Recomendado)**

Para acelerar a indexação:

1. Menu lateral → **"Inspeção de URL"**
2. Digite uma URL importante (ex: `https://azmt.com.br/pt`)
3. Clique em **"Testar URL publicada"**
4. Se tudo OK, clique em **"Solicitar indexação"**
5. Repita para páginas principais:
   - `https://azmt.com.br/pt`
   - `https://azmt.com.br/pt/academy/vancouver`
   - `https://azmt.com.br/pt/work`

**Tempo:** 2-3 minutos por URL

---

## ✅ **CHECKLIST DE CONFIGURAÇÃO**

- [ ] Conta Google Search Console criada
- [ ] Propriedade `https://azmt.com.br` adicionada
- [ ] Verificação de propriedade concluída
- [ ] Sitemap.xml submetido
- [ ] Configurações internacionais ajustadas
- [ ] URLs principais solicitadas para indexação

---

## 📊 **O QUE MONITORAR (Após 1-2 Semanas)**

### **1. Performance (Menu Lateral → Performance)**
- **Impressões:** Quantas vezes apareceu nos resultados
- **Cliques:** Quantos cliques recebeu
- **CTR:** Taxa de cliques (cliques/impressões)
- **Posição média:** Posição média nos resultados

### **2. Cobertura (Menu Lateral → Cobertura)**
- **Páginas válidas:** Páginas indexadas com sucesso
- **Erros:** Páginas com problemas
- **Avisos:** Páginas com avisos menores

### **3. Core Web Vitals (Menu Lateral → Core Web Vitals)**
- **LCP:** Largest Contentful Paint
- **FID:** First Input Delay
- **CLS:** Cumulative Layout Shift

### **4. Melhorias (Menu Lateral → Melhorias)**
- **Mobile Usability:** Problemas de usabilidade mobile
- **HTTPS:** Certificado SSL
- **Structured Data:** Schema.org implementado

---

## 🚨 **PROBLEMAS COMUNS E SOLUÇÕES**

### **Problema 1: "Não foi possível verificar"**
**Solução:**
- Verifique se a tag HTML está no `<head>` do site
- Aguarde alguns minutos após deploy
- Use método alternativo (arquivo HTML ou DNS)

### **Problema 2: "Sitemap não encontrado"**
**Solução:**
- Verifique se `sitemap.xml` existe em `public/sitemap.xml`
- Acesse `https://azmt.com.br/sitemap.xml` no navegador
- Se não existir, podemos criar (próximo passo)

### **Problema 3: "Páginas não indexadas"**
**Solução:**
- Use "Solicitar indexação" para URLs importantes
- Aguarde 1-2 semanas (Google indexa gradualmente)
- Verifique se `robots.txt` não está bloqueando

---

## 🎯 **PRÓXIMOS PASSOS APÓS CONFIGURAÇÃO**

### **Esta Semana:**
1. ✅ Configurar Google Search Console (você está fazendo agora)
2. [ ] Criar/Atualizar sitemap.xml (se não existir)
3. [ ] Solicitar indexação de páginas principais

### **Próxima Semana:**
4. [ ] Monitorar primeiros dados (impressões, cliques)
5. [ ] Verificar erros de indexação
6. [ ] Acompanhar Core Web Vitals

### **Próximo Mês:**
7. [ ] Analisar keywords que trazem tráfego
8. [ ] Otimizar páginas com baixo CTR
9. [ ] Acompanhar evolução de posições

---

## 📈 **MÉTRICAS A ACOMPANHAR**

### **Semanal:**
- Impressões (quantas vezes apareceu)
- Cliques (quantos cliques recebeu)
- CTR (taxa de cliques)
- Posição média

### **Mensal:**
- Tráfego orgânico total
- Top 10 keywords
- Páginas mais visitadas
- Erros de indexação

---

## 💡 **DICAS IMPORTANTES**

1. **Paciência:** Dados aparecem após 1-2 semanas
2. **Monitoramento:** Verifique semanalmente
3. **Ações:** Corrija erros imediatamente
4. **Otimização:** Use dados para melhorar SEO

---

## 🔗 **LINKS ÚTEIS**

- **Google Search Console:** https://search.google.com/search-console
- **Facebook Debugger:** https://developers.facebook.com/tools/debug/
- **Twitter Card Validator:** https://cards-dev.twitter.com/validator
- **Google Rich Results Test:** https://search.google.com/test/rich-results
- **PageSpeed Insights:** https://pagespeed.web.dev/

---

**Status:** ⏳ **AGUARDANDO CONFIGURAÇÃO**  
**Próxima ação:** Seguir passo a passo acima para configurar
