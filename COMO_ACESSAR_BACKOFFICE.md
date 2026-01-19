# 🌐 COMO ACESSAR O BACKOFFICE NO VERCEL

**Data:** 08 Janeiro 2026  
**Objetivo:** Entender qual URL usar para acessar o CRM com IA

---

## 📍 **ONDE ACESSAR:**

### **OPÇÃO 1: URL do Vercel (Produção)**

Olhe no **Deployments do Vercel**:

1. **Acesse:** https://vercel.com/
2. **Selecione:** Projeto `azimut-cms`
3. **Vá em:** Deployments
4. **Clique** no deployment mais recente (que está "Ready")
5. **Veja** a URL no topo ou na seção "Domains"

**A URL vai ser algo como:**
- `https://azimut-cms-xxxxx.vercel.app/admin/leads`
- Ou: `https://azimut-backoffice.vercel.app/admin/leads`
- Ou: Seu domínio customizado (se configurado)

---

### **OPÇÃO 2: Domínios Configurados**

No Vercel, na seção **"Settings → Domains"**, você pode ver:
- Domínios de produção
- Domínios de preview

---

### **OPÇÃO 3: Dashboard do Vercel**

Na página do projeto `azimut-cms`, você verá:
- **Domains:** Lista de domínios disponíveis
- Clique em qualquer um para abrir

---

## 🎯 **PASSO A PASSO:**

### **1. Descobrir a URL:**

1. Vercel Dashboard → Projeto `azimut-cms`
2. Olhe na parte superior da página
3. Vai ter um botão **"Visit"** ou um link de domínio
4. **Clique** para abrir

---

### **2. Acessar o Backoffice:**

**URL completa:**
```
https://[seu-dominio-vercel].vercel.app/admin/leads
```

**Onde:**
- `[seu-dominio-vercel]` = URL que aparece no Vercel
- `/admin/leads` = rota do CRM

---

### **3. Fazer Login:**

1. **Acesse:** `https://[seu-dominio]/admin/login`
2. **Faça login** (seu usuário admin)
3. **Depois:** Vai para `/admin/dashboard`
4. **Clique em:** "Leads" no menu ou acesse `/admin/leads`

---

## 🔍 **COMO ENCONTRAR A URL EXATA:**

### **No Vercel Dashboard:**

1. **Página do Projeto:**
   - No topo, vai ter: "azimut-cms"
   - Abaixo, vai ter: "Domains: [lista de domínios]"
   - Clique em qualquer domínio

2. **Deployments:**
   - Clique em um deployment
   - Na seção "Domains", vai listar os domínios
   - Clique em qualquer um

3. **Settings → Domains:**
   - Lista todos os domínios
   - Copie o domínio de produção

---

## 💡 **DICA:**

**Se você não souber a URL, me mande um print da tela do Vercel Dashboard do projeto `azimut-cms` que eu te mostro exatamente onde está!**

---

## 📊 **ESTRUTURA DE URL:**

```
https://[DOMINIO-VERCEL]/admin/leads
                          │
                          └── Rota do CRM
```

**Exemplos:**
- `https://azimut-cms.vercel.app/admin/leads`
- `https://azimut-backoffice-xxxxx.vercel.app/admin/leads`
- `https://backoffice.azimut.com/admin/leads` (se tiver domínio customizado)

---

## ✅ **RESUMO:**

1. ✅ Vercel Dashboard → Projeto `azimut-cms`
2. ✅ Veja a URL/domínio no topo
3. ✅ Clique para abrir OU copie a URL
4. ✅ Adicione `/admin/leads` no final
5. ✅ Acesse e faça login

---

**Me mostre qual URL aparece no seu Vercel Dashboard do projeto `azimut-cms` que eu te ajudo a montar a URL correta!** 🚀
