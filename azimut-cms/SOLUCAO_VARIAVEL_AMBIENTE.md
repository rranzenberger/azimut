# 🔧 SOLUÇÃO: Variável de Ambiente no Vercel

## ⚠️ PROBLEMA IDENTIFICADO

O site principal (azmt.com.br) **NÃO está recebendo conteúdo do backoffice** porque falta a variável de ambiente `VITE_CMS_API_URL` no projeto Vercel.

Atualmente, o código usa o fallback `http://localhost:3001/api`, que não funciona em produção.

---

## ✅ SOLUÇÃO RÁPIDA

### **Passo 1: Acessar Configurações do Vercel**

1. Acesse: https://vercel.com/dashboard
2. Selecione o projeto **`azimut`** (site principal, não o backoffice)
3. Vá em **Settings** → **Environment Variables**

### **Passo 2: Adicionar Variável de Ambiente**

**Nome da variável:**
```
VITE_CMS_API_URL
```

**Valor:**
```
https://backoffice.azmt.com.br/api
```

**Ambientes:**
- ✅ Production
- ✅ Preview
- ✅ Development

### **Passo 3: Fazer Redeploy**

⚠️ **IMPORTANTE:** Após adicionar a variável, você **DEVE fazer um redeploy**:

**Opção A: Via Dashboard**
1. Vá em **Deployments**
2. Clique nos 3 pontos do último deploy
3. Selecione **Redeploy**

**Opção B: Via CLI**
```bash
cd azimut-site-vite-tailwind
vercel --prod
```

---

## 🔍 COMO VERIFICAR SE ESTÁ FUNCIONANDO

### **1. Verificar no Console do Navegador**

1. Acesse: https://azmt.com.br
2. Abra o Console (F12)
3. Procure por mensagens como:
   - ✅ `[CMS] Conteúdo carregado` → **Funcionando!**
   - ❌ `[CMS] Erro ao buscar conteúdo` → **Problema!**

### **2. Verificar Network Tab**

1. Abra o DevTools → **Network**
2. Filtre por "content"
3. Deve aparecer uma requisição para:
   ```
   https://backoffice.azmt.com.br/api/public/content?lang=pt&country=DEFAULT&page=home&sessionId=...
   ```
4. Status deve ser **200 OK**

### **3. Testar Alteração no Backoffice**

1. Acesse: https://backoffice.azmt.com.br/admin/site-pages
2. Edite o "Hero Subtitle" da Home
3. Salve
4. Recarregue: https://azmt.com.br
5. O conteúdo deve atualizar (pode levar alguns segundos devido ao cache)

---

## 📋 CHECKLIST COMPLETO

### **Site Principal (azmt.com.br) no Vercel:**

- [ ] Variável `VITE_CMS_API_URL` configurada
- [ ] Valor: `https://backoffice.azmt.com.br/api`
- [ ] Aplicada em Production, Preview e Development
- [ ] Redeploy realizado após adicionar variável

### **Backoffice (backoffice.azmt.com.br) no Vercel:**

- [ ] Variável `DATABASE_URL` configurada
- [ ] Variável `SITE_URL` configurada (`https://azmt.com.br`)
- [ ] Deploy funcionando corretamente

---

## 🚨 PROBLEMAS COMUNS

### **"Erro de CORS"**

Se aparecer erro de CORS, verifique:

1. **Backoffice (`azimut-cms/next.config.js`):**
   - Deve ter configuração de CORS permitindo `https://azmt.com.br`

2. **Verificar headers da API:**
   - A rota `/api/public/content` deve permitir requisições do site principal

### **"Timeout" ou "Network Error"**

1. Verifique se o backoffice está online: https://backoffice.azmt.com.br
2. Teste a API diretamente: https://backoffice.azmt.com.br/api/public/content?lang=pt&page=home
3. Verifique se o domínio está correto na variável

### **"Variável não está sendo usada"**

1. ⚠️ **IMPORTANTE:** Variáveis `VITE_*` precisam de **redeploy** após adicionar
2. Limpe o cache do navegador (Ctrl+Shift+R)
3. Verifique se o build está usando a variável: `vercel logs`

---

## 📝 DOCUMENTAÇÃO ADICIONAL

- **Como fazer deploy:** `COMO_FAZER_DEPLOY.md`
- **Como fazer redeploy:** `COMO_FAZER_REDEPLOY.md`
- **Guia completo do sistema:** `GUIA_COMPLETO_SISTEMA.md`

---

## ✅ APÓS CONFIGURAR

Após seguir todos os passos, o site deve:

1. ✅ Carregar conteúdo do backoffice automaticamente
2. ✅ Atualizar quando você editar no backoffice
3. ✅ Funcionar em todos os ambientes (prod, preview, dev)

**Tempo estimado:** 5 minutos




















