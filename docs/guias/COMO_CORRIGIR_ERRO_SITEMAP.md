# 🔧 COMO CORRIGIR ERRO NO SITEMAP

## 🚨 PROBLEMA IDENTIFICADO

Você está vendo:
- **Status:** "1 erro" (vermelho)
- **Tipo:** "Desconhecido"
- **Páginas encontradas:** 0

## 📋 PASSO A PASSO PARA CORRIGIR

### **1. Verificar Qual é o Erro**

1. Na tabela "Sitemaps enviados", clique nos **3 pontinhos** (⋮) à direita do sitemap
2. Ou clique diretamente no sitemap `/sitemap.xml`
3. Você verá detalhes do erro

**Erros Comuns:**
- "Não foi possível buscar o sitemap"
- "Formato inválido"
- "URLs bloqueadas no robots.txt"
- "Sitemap muito grande"

---

### **2. Verificar se Sitemap Está Acessível**

1. Abra uma nova aba no navegador
2. Acesse: `https://azmt.com.br/sitemap.xml`
3. Deve abrir o XML com todas as URLs

**Se NÃO abrir:**
- Problema: Sitemap não está acessível publicamente
- Solução: Verificar se arquivo está na pasta `public/` do projeto

**Se abrir:**
- Sitemap está OK, problema pode ser outro

---

### **3. Verificar Formato do XML**

O sitemap deve começar com:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
```

**Se estiver diferente:**
- Problema: Formato inválido
- Solução: Corrigir XML

---

### **4. Verificar robots.txt**

1. Acesse: `https://azmt.com.br/robots.txt`
2. Verifique se há:
   ```
   Sitemap: https://azmt.com.br/sitemap.xml
   ```

**Se não tiver:**
- Problema: Google não encontra sitemap
- Solução: Adicionar linha no robots.txt (já está adicionado ✅)

---

### **5. Verificar URLs no Sitemap**

O sitemap deve ter URLs válidas:
- ✅ `https://azmt.com.br/pt`
- ✅ `https://azmt.com.br/en`
- ❌ `http://azmt.com.br/pt` (sem HTTPS)
- ❌ URLs quebradas

---

## 🔧 SOLUÇÕES ESPECÍFICAS

### **Solução 1: Reenviar Sitemap**

1. No Google Search Console, vá em "Sitemaps"
2. Clique nos **3 pontinhos** (⋮) ao lado do sitemap
3. Clique em **"Remover"** ou **"Excluir"**
4. Aguarde alguns segundos
5. Adicione novamente:
   - Digite: `sitemap.xml`
   - Clique em **"ENVIAR"**

### **Solução 2: Verificar Erro Específico**

1. Clique no sitemap `/sitemap.xml` na tabela
2. Veja detalhes do erro
3. Anote a mensagem de erro exata
4. Me envie a mensagem para eu ajudar a corrigir

### **Solução 3: Verificar se Site Está Acessível**

1. Acesse: `https://azmt.com.br`
2. Site deve abrir normalmente
3. Se não abrir, problema é no servidor (não no sitemap)

---

## ✅ VERIFICAÇÃO RÁPIDA

### **Teste 1: Sitemap Acessível?**
```
Acesse: https://azmt.com.br/sitemap.xml
Resultado esperado: XML com todas as URLs
```

### **Teste 2: robots.txt OK?**
```
Acesse: https://azmt.com.br/robots.txt
Resultado esperado: Deve ter "Sitemap: https://azmt.com.br/sitemap.xml"
```

### **Teste 3: Site Funciona?**
```
Acesse: https://azmt.com.br
Resultado esperado: Site abre normalmente
```

---

## 🎯 PRÓXIMOS PASSOS

### **Se Erro Persistir:**

1. **Clique no sitemap** na tabela para ver detalhes
2. **Anote a mensagem de erro exata**
3. **Me envie a mensagem** que eu ajudo a corrigir

### **Se Funcionar:**

1. Aguarde 24-48h
2. Status mudará para "Sucesso" ✅
3. Páginas encontradas aparecerão (~100+)

---

**Última atualização:** 15/01/2026
**Status:** Diagnosticando erro
