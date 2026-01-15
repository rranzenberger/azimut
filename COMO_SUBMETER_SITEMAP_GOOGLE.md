# 📋 COMO SUBMETER SITEMAP NO GOOGLE SEARCH CONSOLE

## 🎯 Passo a Passo Completo

### 1. Acesse o Google Search Console
- URL: https://search.google.com/search-console
- Faça login com sua conta Google

### 2. Selecione a Propriedade
- No menu lateral esquerdo, clique no dropdown no topo
- Selecione: `http://www.azmt.com.br/` ou `https://azmt.com.br/`
- (Se ainda não adicionou, veja instruções abaixo)

### 3. Vá para Sitemaps
- No menu lateral esquerdo, clique em **"Indexação"** (expande)
- Clique em **"Sitemaps"**

### 4. Submeta o Sitemap
- No campo **"Adicionar um novo sitemap"**, digite:
  ```
  sitemap.xml
  ```
- **NÃO** coloque a URL completa, apenas: `sitemap.xml`
- Clique em **"ENVIAR"**

### 5. Aguarde Processamento
- Google processa em 24-48 horas
- Você verá status: "Sucesso" ou "Erro"
- Se houver erro, clique para ver detalhes

---

## ✅ VERIFICAÇÃO

### Como Verificar se Funcionou:
1. Volte para **"Sitemaps"**
2. Você verá:
   - **Tipo:** `sitemap.xml`
   - **Enviado:** Data de hoje
   - **Status:** "Sucesso" (verde) ou "Tem erros" (amarelo)
   - **Páginas descobertas:** Número de URLs encontradas

### O que Esperar:
- **Páginas descobertas:** ~100+ URLs (todas as páginas em 4 idiomas)
- **Status:** "Sucesso" após 24-48h
- **Última leitura:** Data/hora da última indexação

---

## 🔧 SE AINDA NÃO ADICIONOU A PROPRIEDADE

### Método 1: Verificação por DNS (Recomendado)
1. No Search Console, clique em **"Adicionar propriedade"**
2. Escolha: **"Domínio"** (não URL)
3. Digite: `azmt.com.br`
4. Siga instruções para adicionar registro DNS
5. Aguarde verificação (pode levar até 48h)

### Método 2: Verificação por HTML Tag (Mais Rápido)
1. No Search Console, clique em **"Adicionar propriedade"**
2. Escolha: **"Prefixo de URL"**
3. Digite: `https://azmt.com.br`
4. Escolha método: **"Tag HTML"**
5. Copie a tag `<meta>` fornecida
6. Adicione no `<head>` do site (preciso fazer isso)
7. Clique em **"Verificar"**

---

## 📊 DEPOIS DE SUBMETER

### O que Acontece:
1. **24-48h:** Google começa a processar sitemap
2. **1 semana:** Primeiras páginas indexadas
3. **2-4 semanas:** Maioria das páginas indexadas
4. **1-3 meses:** Ranking começa a melhorar

### Monitoramento:
- Volte ao Search Console semanalmente
- Veja quantas páginas foram indexadas
- Verifique erros de indexação
- Acompanhe performance (cliques, impressões)

---

## 🚨 PROBLEMAS COMUNS

### Erro: "Não foi possível buscar o sitemap"
- **Causa:** Sitemap não acessível publicamente
- **Solução:** Verifique se `https://azmt.com.br/sitemap.xml` abre no navegador

### Erro: "Sitemap contém URLs bloqueadas"
- **Causa:** URLs no robots.txt estão bloqueadas
- **Solução:** Verifique `robots.txt` (já está OK ✅)

### Erro: "Formato inválido"
- **Causa:** XML malformado
- **Solução:** Verifique se XML está válido (já está OK ✅)

---

## ✅ CHECKLIST FINAL

- [ ] Google Search Console criado
- [ ] Propriedade `azmt.com.br` adicionada e verificada
- [ ] Sitemap `sitemap.xml` submetido
- [ ] Status: "Sucesso" (aguardar 24-48h)
- [ ] Páginas descobertas: ~100+ URLs
- [ ] Monitoramento semanal ativado

---

**Última atualização:** 15/01/2026
**Status do Sitemap:** ✅ Pronto para submissão
**URL do Sitemap:** https://azmt.com.br/sitemap.xml
