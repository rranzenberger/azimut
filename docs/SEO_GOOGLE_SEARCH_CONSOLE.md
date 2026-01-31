# 🔍 Google Search Console - Guia de Configuração

**Data:** 26 de Janeiro de 2026  
**Tempo estimado:** 30 minutos  
**Prioridade:** 🔥 ALTA

---

## 📋 O QUE É O GOOGLE SEARCH CONSOLE?

Ferramenta gratuita do Google que permite:
- ✅ Ver quais páginas aparecem no Google
- ✅ Identificar erros de indexação
- ✅ Submeter sitemap.xml
- ✅ Verificar performance de busca
- ✅ Monitorar cliques e impressões

**Impacto:** +50% visibilidade no Google em 3 meses

---

## 🚀 PASSO A PASSO

### **1. Criar Conta Google Search Console** (5 min)

1. Acessar: https://search.google.com/search-console
2. Fazer login com conta Google (mesma do Analytics se tiver)
3. Clicar em **"Adicionar propriedade"**

### **2. Verificar Propriedade do Site** (10 min)

#### **OPÇÃO A: Verificação por HTML (Recomendado)**

1. Escolher método: **"Tag HTML"**
2. Copiar o código fornecido (exemplo):
   ```html
   <meta name="google-site-verification" content="ABC123XYZ..." />
   ```
3. Adicionar no arquivo `index.html` dentro de `<head>`:
   ```html
   <head>
     <!-- ... outros meta tags ... -->
     <meta name="google-site-verification" content="ABC123XYZ..." />
   </head>
   ```
4. Fazer commit e deploy
5. Voltar no Search Console e clicar em **"Verificar"**

#### **OPÇÃO B: Verificação por DNS (Alternativa)**

1. Escolher método: **"Registro DNS"**
2. Adicionar registro TXT no DNS do domínio
3. Aguardar propagação (pode levar até 48h)
4. Clicar em **"Verificar"**

### **3. Submeter Sitemap.xml** (5 min)

1. No Search Console, ir em **"Sitemaps"** (menu lateral)
2. Adicionar URL do sitemap:
   ```
   https://azmt.com.br/sitemap.xml
   ```
3. Clicar em **"Enviar"**
4. Aguardar processamento (pode levar alguns dias)

**Nota:** O sitemap já está configurado e inclui:
- ✅ Todas as páginas em 4 idiomas (PT, EN, ES, FR)
- ✅ Hreflang tags para SEO internacional
- ✅ Prioridades e frequências de atualização

### **4. Configurar Alertas** (5 min)

1. Ir em **"Configurações"** → **"Usuários e permissões"**
2. Adicionar emails para receber alertas:
   - Alertas de cobertura (erros de indexação)
   - Alertas de segurança
   - Alertas de desempenho

### **5. Verificar Indexação** (5 min)

1. Ir em **"Cobertura"** (menu lateral)
2. Verificar se há erros:
   - ❌ Páginas com erro 404
   - ❌ Páginas bloqueadas por robots.txt
   - ❌ Páginas com erro de servidor
3. Se houver erros, corrigir e solicitar nova indexação

---

## ✅ CHECKLIST

- [ ] Conta Google Search Console criada
- [ ] Propriedade do site verificada
- [ ] Meta tag de verificação adicionada no `index.html`
- [ ] Sitemap.xml submetido
- [ ] Alertas configurados
- [ ] Cobertura verificada (sem erros críticos)

---

## 📊 PRÓXIMOS PASSOS (Após Configuração)

### **Semana 1:**
- Monitorar cobertura diariamente
- Verificar se sitemap foi processado
- Corrigir erros se houver

### **Semana 2-4:**
- Analisar relatório de desempenho
- Identificar páginas com mais cliques
- Otimizar páginas com baixo CTR

### **Mês 2-3:**
- Comparar performance antes/depois
- Ajustar estratégia baseado em dados
- Expandir conteúdo nas páginas mais visitadas

---

## 🔗 LINKS ÚTEIS

- Google Search Console: https://search.google.com/search-console
- Documentação: https://support.google.com/webmasters
- Sitemap do site: https://azmt.com.br/sitemap.xml

---

## 💡 DICAS

1. **Verificação rápida:** Use método HTML (mais rápido que DNS)
2. **Sitemap:** Pode levar até 1 semana para processar completamente
3. **Alertas:** Configure para receber emails importantes
4. **Monitoramento:** Verifique semanalmente nas primeiras semanas

---

**Status:** 🟢 **PRONTO PARA CONFIGURAR**  
**Tempo total:** 30 minutos  
**ROI:** +50% visibilidade Google em 3 meses
