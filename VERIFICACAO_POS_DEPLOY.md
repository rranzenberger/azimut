# ✅ VERIFICAÇÃO PÓS-DEPLOY - CHECKLIST COMPLETO

**Data:** 05/01/2026 - 20:00 BRT  
**Status:** ⏳ **AGUARDANDO DEPLOY FINALIZAR**

---

## ⏳ AGUARDANDO VERCEL (2-5 MINUTOS)

### **Enquanto aguarda:**
- ☕ Respire fundo - está quase lá!
- 📱 Prepare dispositivos para teste (mobile, tablet)
- 🌐 Abra navegadores (Chrome, Firefox, Safari)

---

## 🔍 VERIFICAÇÃO IMEDIATA (ASSIM QUE DEPLOY FINALIZAR)

### **1. SITE FRONTEND (azimut.com) - 5 MINUTOS:**

#### **A) Site no Ar:**
```
✅ URL: https://azimut.com
- [ ] Página carrega (sem erro 500/404)
- [ ] SSL ativo (cadeado verde 🔒)
- [ ] Logo aparece
- [ ] Menu visível
```

#### **B) Navegação Principal:**
```
Testar todos os links do menu:
- [ ] Home: https://azimut.com/
- [ ] What We Do: https://azimut.com/what
- [ ] Work: https://azimut.com/work
- [ ] Studio: https://azimut.com/studio
- [ ] Academy: https://azimut.com/academy
- [ ] Contact: https://azimut.com/contact
```

#### **C) Funcionalidades:**
```
- [ ] Dropdown "Solutions" abre e fecha
- [ ] Dropdown "Work" abre e fecha
- [ ] Dropdown "Academy" abre e fecha
- [ ] Clicar em item do dropdown navega
- [ ] Menu mobile (hamburger) funciona
- [ ] Seletor de idiomas funciona (PT/EN/FR/ES)
- [ ] Tema claro/escuro alterna
```

#### **D) Página Work (filtros):**
```
- [ ] Ir para: https://azimut.com/work
- [ ] Submenu interno aparece
- [ ] Clicar em "Museums & Culture" 
- [ ] URL muda para: ?type=museum
- [ ] Página rola para resultados
- [ ] Projetos filtrados aparecem
```

#### **E) Responsividade:**
```
- [ ] Desktop (1920px): Layout OK
- [ ] Tablet (768px): Menu adapta
- [ ] Mobile (390px): Hamburger aparece
- [ ] Textos legíveis em todas as telas
```

---

### **2. BACKOFFICE (admin.azimut.com) - 5 MINUTOS:**

#### **A) Site no Ar:**
```
✅ URL: https://admin.azimut.com (ou seu domínio)
- [ ] Página de login carrega
- [ ] Sem erro 500
- [ ] SSL ativo (cadeado verde 🔒)
```

#### **B) Login:**
```
- [ ] Inserir credenciais
- [ ] Botão "Login" funciona
- [ ] Redireciona para dashboard
- [ ] Sem erro "JWT secret missing"
```

#### **C) Dashboard:**
```
- [ ] Estatísticas aparecem (Total Leads, etc)
- [ ] Cards com números carregam
- [ ] Gráficos aparecem (se houver)
- [ ] Sem erro "Database connection failed"
```

#### **D) Navegação:**
```
- [ ] Menu lateral funciona
- [ ] Leads: Lista carrega
- [ ] Projects: Lista carrega
- [ ] Settings: Página abre
- [ ] Logout funciona
```

#### **E) API Routes:**
```
- [ ] /api/admin/leads retorna dados
- [ ] /api/admin/projects retorna dados
- [ ] Sem erros 500 no console
```

---

## 🚨 SE DER ERRO - SOLUÇÃO RÁPIDA

### **SITE FRONTEND:**

#### **Erro: "404 Page Not Found"**
```
Causa: Redirect não configurado
Solução Vercel:
1. Settings → Rewrites
2. Adicionar: /* → /index.html
3. Redeploy
```

#### **Erro: CSS não carrega (site em branco)**
```
Causa: Assets não gerados
Solução:
1. Verificar logs de build
2. Executar localmente: npm run build
3. Se OK local, redeploy
```

#### **Erro: azimut.art não redireciona**
```
Causa: Domínio não configurado
Solução Vercel:
1. Settings → Domains
2. Adicionar: azimut.art
3. Configurar redirect para azimut.com
```

---

### **BACKOFFICE:**

#### **Erro: "500 Internal Server Error"**
```
Causa provável: Variável de ambiente faltando
Solução:
1. Vercel → Settings → Environment Variables
2. Verificar:
   - DATABASE_URL
   - JWT_SECRET
   - NEXTAUTH_SECRET
3. Adicionar as que faltam
4. Redeploy
```

#### **Erro: "Database connection failed"**
```
Causa: DATABASE_URL incorreto ou banco offline
Solução:
1. Verificar DATABASE_URL na Vercel
2. Testar conexão no Supabase/Postgres
3. Verificar IP whitelist (Vercel IPs)
```

#### **Erro: "Prisma generate failed"**
```
Causa: Prisma não rodou no build
Solução:
1. Verificar package.json: "postinstall": "prisma generate"
2. Verificar schema.prisma existe
3. Redeploy
```

#### **Erro: Login não funciona (401)**
```
Causa: JWT_SECRET ou NEXTAUTH_SECRET faltando
Solução:
1. Vercel → Settings → Environment Variables
2. Adicionar:
   JWT_SECRET="seu-secret-aqui"
   NEXTAUTH_SECRET="outro-secret"
3. Redeploy
```

---

## 📊 PERFORMANCE CHECK (DEPOIS)

### **Site Frontend (30 minutos depois):**

#### **PageSpeed Insights:**
```
1. Acessar: https://pagespeed.web.dev/
2. Testar: https://azimut.com
3. Verificar scores:
   - Performance: > 90 (desktop)
   - Performance: > 80 (mobile)
   - Accessibility: 100
   - Best Practices: 100
   - SEO: 100
```

#### **Google Rich Results Test:**
```
1. Acessar: https://search.google.com/test/rich-results
2. Testar: https://azimut.com
3. Verificar Schema.org detectado
```

#### **Mobile-Friendly Test:**
```
1. Acessar: https://search.google.com/test/mobile-friendly
2. Testar: https://azimut.com
3. Verificar: "Page is mobile friendly"
```

---

### **Files Acessíveis:**

```
- [ ] https://azimut.com/robots.txt
- [ ] https://azimut.com/sitemap.xml
- [ ] https://azimut.com/manifest.json
- [ ] https://azimut.com/logo-azimut-star.svg
```

---

## 🎯 CONFIGURAÇÃO PÓS-DEPLOY (1 HORA)

### **1. Google Search Console:**

```
1. Acessar: https://search.google.com/search-console
2. Adicionar propriedade: azimut.com
3. Verificar propriedade (método: DNS ou HTML)
4. Submeter sitemap: https://azimut.com/sitemap.xml
5. Aguardar indexação (24-48h)
```

### **2. Bing Webmaster Tools:**

```
1. Acessar: https://www.bing.com/webmasters
2. Adicionar site: azimut.com
3. Verificar (importar do Google Search Console)
4. Submeter sitemap: https://azimut.com/sitemap.xml
```

### **3. Plausible Analytics (opcional):**

```
1. Criar conta: https://plausible.io
2. Adicionar site: azimut.com
3. Verificar tracking (aguardar primeiras visitas)
4. Configurar goals (se desejar)
```

### **4. Uptime Monitor (opcional):**

```
1. Criar conta: https://uptimerobot.com (grátis)
2. Adicionar monitor:
   - URL: https://azimut.com
   - Tipo: HTTP(s)
   - Intervalo: 5 minutos
3. Adicionar email para alertas
```

---

## 📱 TESTE EM DEVICES REAIS (SE POSSÍVEL)

### **Desktop:**
```
- [ ] Chrome (Windows/Mac)
- [ ] Firefox
- [ ] Safari (Mac)
- [ ] Edge
```

### **Mobile:**
```
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] Tablet iPad (Safari)
- [ ] Tablet Android
```

---

## ✅ CHECKLIST FINAL

### **IMEDIATO (5 minutos):**
- [ ] Site carrega: azimut.com
- [ ] Backoffice carrega: admin.azimut.com
- [ ] SSL ativo em ambos
- [ ] Login backoffice funciona
- [ ] Navegação site funciona
- [ ] Mobile responsivo

### **30 MINUTOS:**
- [ ] PageSpeed Insights: Score > 90
- [ ] robots.txt acessível
- [ ] sitemap.xml acessível
- [ ] Testar em 2-3 navegadores

### **1 HORA:**
- [ ] Google Search Console configurado
- [ ] Sitemap submetido
- [ ] Analytics verificado (se habilitado)
- [ ] Uptime monitor configurado (opcional)

### **24 HORAS:**
- [ ] Monitorar erros (Vercel logs)
- [ ] Verificar primeiras visitas (Analytics)
- [ ] Testar em devices reais
- [ ] Pedir feedback de stakeholders

---

## 🎉 SE TUDO FUNCIONOU:

# **PARABÉNS! 🚀 SITE NO AR!**

**Próximos passos:**
1. Compartilhar com time/clientes
2. Monitorar analytics
3. Ajustar meta descriptions (se necessário)
4. Criar backlinks de qualidade
5. Adicionar mais conteúdo (blog, cases)

---

## 📊 EXPECTATIVAS (PRIMEIROS 30 DIAS)

### **Tráfego:**
- Semana 1: 100-500 visitas (orgânico + direto)
- Semana 2-3: 500-1000 visitas (começar a indexar)
- Semana 4: 1000-2000 visitas (SEO ganhando força)

### **SEO:**
- Semana 1: Indexação inicial (homepage)
- Semana 2-3: Indexação completa (todas as páginas)
- Semana 4: Primeiras posições (keywords long-tail)

### **Leads:**
- Semana 1-2: 5-10 leads (curiosidade inicial)
- Semana 3-4: 10-20 leads (tráfego orgânico)
- Mês 2-3: 50+ leads/mês (SEO maduro)

---

**Status:** ⏳ **AGUARDANDO DEPLOY FINALIZAR**  
**Próxima ação:** Verificar assim que Vercel concluir! ✅

🌍 **AZIMUT VAI CONQUISTAR O MUNDO!** ✨

