# 🎯 PLANO B: FUNCIONAL - Backoffice + Formulários

**Data:** 07 Jan 2026  
**Prioridade:** OPÇÃO B escolhida pelo usuário

---

## ✅ **O QUE JÁ EXISTE:**

### **Backoffice (azimut-cms/)**
- ✅ Estrutura completa
- ✅ Dashboard admin
- ✅ CRUD Projects
- ✅ CRUD Services  
- ✅ CRUD Pages (SEO)
- ✅ Media library
- ✅ Leads system
- ✅ Analytics
- ✅ Settings

### **Frontend (src/)**
- ✅ Hook `useAzimutContent` (busca do backoffice)
- ✅ Fallbacks estáticos
- ✅ Home já integrada

---

## 🚀 **ETAPAS A FAZER:**

### **ETAPA 1: Popular Backoffice com Dados Reais** (30 min)

#### **1.1 Projetos**
```bash
cd azimut-cms
npx tsx scripts/popular-projetos.js
```

**O que faz:**
- Adiciona projetos reais ao banco
- Com imagens placeholder
- Todas as informações (título, desc, tags, local, ano)

#### **1.2 Serviços/Soluções**
```bash
npx tsx scripts/popular-servicos.js
```

**O que faz:**
- 6 soluções principais
- Cinema & AV, Animação, XR, IA, Educação, Consultoria
- Ícones e descrições

#### **1.3 Conteúdo Páginas (SEO)**
```bash
npx tsx scripts/populate-content.ts
```

**O que faz:**
- Hero slogans (4 idiomas)
- SEO meta tags (4 idiomas)
- 11 páginas completas

---

### **ETAPA 2: Verificar Integração Frontend ↔ Backoffice** (15 min)

#### **2.1 Testar Hook**
```tsx
// src/pages/Home.tsx já usa:
const { content, loading, error } = useAzimutContent({ 
  page: 'home',
  lang 
})
```

✅ **Já implementado!**

#### **2.2 Verificar Fallbacks**
- Se backoffice não responder → usa dados locais
- Site **nunca quebra**

---

### **ETAPA 3: Formulário de Contato Funcional** (45 min)

#### **3.1 Backend já existe:**
```
azimut-cms/app/api/leads/route.ts ✅
```

#### **3.2 Frontend precisa integrar:**

**Criar:** `src/components/ContactForm.tsx`

```tsx
- [ ] Formulário com validação
- [ ] Submit para /api/leads
- [ ] Loading states
- [ ] Success/Error messages
- [ ] reCAPTCHA (opcional)
```

**Atualizar:** `src/pages/Contact.tsx`
- Substituir form estático por `<ContactForm />`

#### **3.3 Email Notifications**
```
azimut-cms/lib/email.ts ✅ (já existe)
```

Configurar:
- [ ] SMTP settings (Gmail/SendGrid)
- [ ] Email templates
- [ ] Auto-responder

---

### **ETAPA 4: Analytics e Tracking** (30 min)

#### **4.1 Sistema já existe:**
```
azimut-cms/app/api/track/route.ts ✅
azimut-cms/app/api/visitor/route.ts ✅
```

#### **4.2 Frontend já usa:**
```tsx
src/hooks/useUserTracking.ts ✅
src/utils/analytics.ts ✅
```

**Verificar se está ativo:**
- [ ] Tracking de páginas
- [ ] Tracking de eventos
- [ ] Dados chegando no dashboard

#### **4.3 Dashboard Analytics**
```
azimut-cms/app/admin/analytics/page.tsx ✅
```

**Testar:**
- [ ] Abrir /admin/analytics
- [ ] Ver dados de visitantes
- [ ] Gráficos funcionando

---

### **ETAPA 5: Media Library** (20 min)

#### **5.1 Upload de Imagens**
```
azimut-cms/app/api/upload/route.ts ✅
```

**Testar:**
- [ ] Fazer upload de imagem de projeto
- [ ] Ver na media library
- [ ] Usar em projeto

#### **5.2 Organizar Imagens**
- [ ] Criar pastas (projects, services, team)
- [ ] Upload imagens reais
- [ ] Substituir placeholders

---

### **ETAPA 6: Configurações Gerais** (15 min)

#### **6.1 Settings do Site**
```
azimut-cms/app/admin/settings/page.tsx ✅
```

**Configurar:**
- [ ] Site name: "Azimut"
- [ ] Email contato
- [ ] Redes sociais (URLs)
- [ ] Google Analytics ID
- [ ] reCAPTCHA keys

#### **6.2 Deploy Settings**
- [ ] Variáveis de ambiente no Vercel
- [ ] DATABASE_URL
- [ ] SMTP credentials
- [ ] API keys

---

## 📋 **CHECKLIST COMPLETO:**

### **Backoffice (azimut-cms/)**
- [ ] **1.1** Popular projetos (5 min)
- [ ] **1.2** Popular serviços (5 min)
- [ ] **1.3** Popular conteúdo páginas (5 min)
- [ ] **5.1** Upload imagens reais (10 min)
- [ ] **5.2** Organizar media library (10 min)
- [ ] **6.1** Configurar settings (10 min)
- [ ] **6.2** Variáveis ambiente Vercel (5 min)

### **Frontend (src/)**
- [ ] **2.1** Testar hook integração (5 min)
- [ ] **2.2** Verificar fallbacks (5 min)
- [ ] **3.1** Criar ContactForm component (20 min)
- [ ] **3.2** Integrar no Contact page (10 min)
- [ ] **3.3** Configurar emails (15 min)
- [ ] **4.1** Verificar tracking ativo (10 min)
- [ ] **4.2** Testar dashboard analytics (10 min)

**Total:** ~2h30min de trabalho

---

## 🎯 **ORDEM DE EXECUÇÃO:**

### **FASE 1: Backoffice (1h)**
1. Popular dados (scripts)
2. Upload imagens
3. Configurar settings
4. Deploy

### **FASE 2: Formulários (45 min)**
5. Criar ContactForm
6. Integrar no site
7. Configurar emails
8. Testar

### **FASE 3: Verificação (30 min)**
9. Testar integração
10. Verificar analytics
11. QA completo

---

## 💡 **COMEÇAMOS POR:**

### **OPÇÃO RECOMENDADA:**

**A) Popular Backoffice primeiro:**
```bash
cd azimut-cms
npx tsx scripts/popular-projetos.js
npx tsx scripts/popular-servicos.js
npx tsx scripts/populate-content.ts
```

**Depois:** Verificar no admin se apareceu

**B) Formulário de contato primeiro:**
- Criar componente
- Integrar API
- Testar submissão

**C) Ver o que já está funcionando:**
- Abrir /admin
- Ver dashboard
- Verificar integrações

---

## 🤔 **O QUE VOCÊ PREFERE COMEÇAR?**

**A** = Popular backoffice (dados reais)  
**B** = Formulário contato (funcional)  
**C** = Ver estado atual (audit)

**Me diga por onde começamos!** 🚀

