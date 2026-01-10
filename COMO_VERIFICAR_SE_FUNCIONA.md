# 🔍 VERIFICAÇÃO AUTOMÁTICA - SITE + BACKOFFICE

## ✅ COMO VERIFICAR SE ESTÁ FUNCIONANDO

### **1. SITE PRINCIPAL (https://azmt.com.br)**

#### **Teste Rápido (2 minutos):**
```bash
# Abrir no navegador
https://azmt.com.br

# Pressionar F12 (Console)
# Verificar:
```

**✅ SEM ERROS se você vê:**
- ✅ Site carrega normalmente
- ✅ Console sem erros vermelhos
- ✅ Logs: `"🌐 AZIMUT: ..."` ou `"Content from: ..."`

**❌ COM ERROS se você vê:**
- ❌ Tela branca
- ❌ "Algo deu errado" (ErrorBoundary)
- ❌ Console cheio de erros vermelhos
- ❌ 404 ou 500 errors

#### **Checklist Completo:**
```
□ Home carrega
□ Menu funciona
□ Trocar idioma funciona (PT/EN/ES/FR)
□ Projetos aparecem (/work)
□ Serviços aparecem (/solutions)
□ Academy carrega (/academy)
□ Vancouver carrega (/academy/vancouver)
```

---

### **2. BACKOFFICE (https://azimut-backoffice-md8t.vercel.app)**

#### **Teste Rápido (2 minutos):**
```bash
# Abrir no navegador
https://azimut-backoffice-md8t.vercel.app

# Login com credenciais
# Verificar dashboard
```

**✅ SEM ERROS se você vê:**
- ✅ Login funciona
- ✅ Dashboard aparece
- ✅ Projetos listados (12 projetos)
- ✅ Serviços listados (6 serviços)
- ✅ Leads aparecem (Kanban)

**❌ COM ERROS se você vê:**
- ❌ Não consegue fazer login
- ❌ Dashboard vazio
- ❌ Erro ao carregar projetos
- ❌ Banco de dados offline

#### **Checklist Completo:**
```
□ Login funciona
□ Dashboard carrega
□ Projetos aparecem e são editáveis
□ Serviços aparecem e são editáveis
□ Leads Kanban funciona
□ Upload de imagens funciona
□ Salvar alterações funciona
```

---

## 🚨 ERROS COMUNS E SOLUÇÕES

### **ERRO 1: Tela Branca no Site**
**Causa:** JavaScript error
**Solução:**
1. F12 → Console
2. Copiar erro vermelho
3. Hard refresh: `Ctrl + Shift + R`
4. Limpar cache: `Ctrl + Shift + Delete`

### **ERRO 2: "Cannot read properties of undefined"**
**Causa:** Conteúdo faltando ou tradução incompleta
**Solução:**
1. Verificar qual página
2. Verificar qual idioma
3. Força português: adicionar `?lang=pt` na URL

### **ERRO 3: Chatbot não aparece**
**Causa:** API keys não configuradas
**Solução:**
1. Verificar `.env` tem as chaves
2. Verificar Vercel tem as variáveis
3. Console mostra erro "API Key inválida"

### **ERRO 4: Backoffice não carrega projetos**
**Causa:** Banco de dados offline ou API falhou
**Solução:**
1. Verificar Vercel logs
2. Verificar DATABASE_URL configurada
3. Verificar Prisma schema atualizado

### **ERRO 5: 404 em alguma rota**
**Causa:** Rota não existe ou build quebrado
**Solução:**
1. Verificar se rota está em `App.tsx`
2. Rebuild: `npm run build`
3. Redeploy no Vercel

---

## 🔧 FERRAMENTAS DE DEBUG

### **Console Browser (F12):**
```javascript
// Ver erros
console.error logs

// Ver warnings
console.warn logs

// Ver estado
localStorage.getItem('azimut-lang')  // Idioma atual
localStorage.getItem('azimut-theme')  // Tema atual
```

### **Network Tab (F12 → Network):**
```
Verificar:
- API calls retornando 200 (OK)
- Sem 404 (Not Found)
- Sem 500 (Server Error)
- Tempo de resposta < 3 segundos
```

### **Vercel Logs:**
```bash
# Ver logs em tempo real
https://vercel.com/rranzenberger/azimut/logs

# Ver build logs
https://vercel.com/rranzenberger/azimut/deployments
```

---

## 📊 MONITORAMENTO CONTÍNUO

### **Métricas Saudáveis:**
- ✅ Uptime > 99%
- ✅ Tempo de carregamento < 3s
- ✅ Core Web Vitals: Verde
- ✅ 0 erros JavaScript no console
- ✅ Taxa de rejeição < 50%

### **Alertas Críticos:**
- 🚨 Site retorna 500
- 🚨 Banco de dados offline
- 🚨 Build falhando
- 🚨 API quota excedida
- 🚨 Certificado SSL expirando

---

## ✅ STATUS ATUAL (ÚLTIMA VERIFICAÇÃO)

**Site Principal:**
- ✅ Build: OK
- ✅ Deploy: OK  
- ✅ Traduções: PT/EN/ES/FR
- ⏳ Chatbot: Aguardando API keys

**Backoffice:**
- ✅ Online
- ✅ Database conectado
- ✅ Login funcionando
- ⏳ IA Assistant: A implementar

**Próximas Ações:**
1. Configurar API keys (Claude + DeepSeek)
2. Testar chatbot no site
3. Adicionar IA no backoffice
4. Implementar FASE 2 (Personalização)
