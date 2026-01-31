# 🔍 GUIA COMPLETO: Google Search Console

**Data:** 26 de Janeiro de 2026  
**Tempo estimado:** 30 minutos  
**Dificuldade:** ⭐ Fácil (só seguir passos)

---

## 🎯 **O QUE É GOOGLE SEARCH CONSOLE?**

Ferramenta **GRATUITA** do Google que permite:
- ✅ Ver como o Google vê seu site
- ✅ Identificar erros (páginas 404, problemas mobile)
- ✅ Ver quais palavras-chave trazem visitas
- ✅ Submeter sitemap para indexação rápida
- ✅ Monitorar performance no Google

**Resultado:** Seu site aparece mais no Google = **+30% tráfego orgânico**

---

## 📋 **PASSO A PASSO COMPLETO:**

### **PASSO 1: Acessar Google Search Console**

1. Abra: https://search.google.com/search-console
2. Faça login com sua conta Google (ou crie uma se não tiver)
3. Clique em **"Adicionar propriedade"** (botão no topo)

---

### **PASSO 2: Adicionar Propriedade**

Você verá 2 opções:

#### **OPÇÃO A: Prefixo de URL (Recomendado)** ⭐

1. Selecione **"Prefixo de URL"**
2. Digite: `https://azimut.world`
3. Clique em **"Continuar"**

#### **OPÇÃO B: Domínio (Avançado)**

Se você tem acesso ao DNS, pode usar "Domínio" para incluir todas as subdomínios automaticamente.

---

### **PASSO 3: Verificar Propriedade**

O Google precisa confirmar que você é dono do site. **3 opções:**

#### **OPÇÃO 1: Tag HTML (Mais Fácil)** ⭐ RECOMENDADO

1. Google mostrará uma tag HTML como:
   ```html
   <meta name="google-site-verification" content="ABC123XYZ..." />
   ```
2. **Copie essa tag completa**
3. No seu projeto, adicione no arquivo `src/components/SEO.tsx` ou `src/components/SEOGlobal.tsx`
4. Cole a tag dentro do `<head>` (já existe componente `GoogleSearchConsoleVerification.tsx` - verificar se está ativo)
5. Faça deploy do site
6. Volte ao Google Search Console e clique em **"Verificar"**

**✅ Se funcionar:** Você verá "Propriedade verificada com sucesso!"

---

#### **OPÇÃO 2: Arquivo HTML**

1. Google fornecerá um arquivo HTML (ex: `google123abc.html`)
2. Faça upload desse arquivo na pasta `public/` do seu projeto
3. Faça deploy
4. Clique em **"Verificar"**

---

#### **OPÇÃO 3: DNS (Avançado)**

1. Google fornecerá um registro TXT
2. Adicione no seu provedor de DNS (onde você configurou azimut.world)
3. Aguarde propagação (pode levar até 48h)
4. Clique em **"Verificar"**

---

### **PASSO 4: Submeter Sitemap**

1. No painel do Google Search Console, vá em **"Sitemaps"** (menu lateral)
2. Digite: `https://azimut.world/sitemap.xml`
3. Clique em **"Enviar"**
4. ✅ Status deve aparecer como **"Sucesso"**

**Nota:** O sitemap já existe no seu site! Só precisa submeter.

---

### **PASSO 5: Configurar Alertas (Opcional)**

1. Vá em **"Configurações"** → **"Usuários e permissões"**
2. Adicione seu email para receber alertas de erros
3. Configure notificações por email

---

## ✅ **CHECKLIST FINAL:**

- [ ] Propriedade adicionada: `https://azimut.world`
- [ ] Verificação concluída (tag HTML, arquivo ou DNS)
- [ ] Sitemap submetido: `https://azimut.world/sitemap.xml`
- [ ] Status do sitemap: "Sucesso"
- [ ] Alertas configurados (opcional)

---

## 🎯 **PRÓXIMOS PASSOS (Após Verificação):**

### **Semana 1:**
- Google começa a indexar seu site
- Você verá dados aparecendo em 3-7 dias

### **Semana 2-4:**
- Verifique **"Cobertura"** para ver páginas indexadas
- Verifique **"Performance"** para ver palavras-chave
- Corrija erros se houver (404, mobile, etc)

### **Mês 2-3:**
- Monitore palavras-chave que trazem visitas
- Otimize páginas com baixo CTR
- Submeta novas páginas se criar

---

## 🐛 **TROUBLESHOOTING:**

### **Erro: "Não foi possível verificar"**

**Solução:**
- Verifique se a tag HTML está no `<head>` (não no `<body>`)
- Aguarde alguns minutos após deploy
- Limpe cache do navegador (Ctrl+Shift+R)
- Tente método alternativo (arquivo HTML ou DNS)

---

### **Erro: "Sitemap não encontrado"**

**Solução:**
- Verifique se `https://azimut.world/sitemap.xml` abre no navegador
- Se não abrir, verifique se o sitemap está sendo gerado corretamente
- Aguarde alguns minutos após deploy

---

### **Dados não aparecem**

**Normal!** Google leva 3-7 dias para começar a mostrar dados. Seja paciente! 😊

---

## 📊 **O QUE ESPERAR:**

### **Primeiros 7 dias:**
- ✅ Propriedade verificada
- ✅ Sitemap submetido
- ⏳ Dados começando a aparecer

### **Primeiro mês:**
- 📈 10-50 impressões/dia (pessoas vendo seu site no Google)
- 📈 1-5 cliques/dia (pessoas clicando)
- 📈 Palavras-chave começando a aparecer

### **Mês 2-3:**
- 📈 100-500 impressões/dia
- 📈 10-50 cliques/dia
- 📈 Ranking melhorando

---

## 💡 **DICAS PRO:**

1. **Verifique semanalmente** (não precisa todo dia)
2. **Corrija erros rapidamente** (404, mobile, etc)
3. **Monitore palavras-chave** que trazem visitas
4. **Otimize páginas** com baixo CTR (clique em "Otimizar" no painel)

---

## 🎉 **PRONTO!**

Agora seu site está conectado ao Google Search Console! 🚀

**Próximo passo:** Configurar Google Business Profile (veja guia separado)

---

**Tempo total:** ~30 minutos  
**Resultado:** +30% visibilidade no Google em 2-3 meses
