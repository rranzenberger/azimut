# 🔍 DEBUG: Timeline em Loading Infinito

**Data:** 2026-01-20  
**Problema:** Timeline fica em "loading..." e não carrega  
**Solução:** Logs de debug adicionados + remoção automática de duplicatas

---

## ✅ **O QUE FOI FEITO:**

### **1. Logs de Debug Adicionados** 🔍

O componente `CompanyTimeline.tsx` agora tem logs detalhados no console:

**Logs que aparecem:**
- ✅ Variáveis de ambiente (`VITE_BACKOFFICE_URL`, `VITE_CMS_API_URL`)
- ✅ URL construída
- ✅ Status da resposta HTTP
- ✅ Dados recebidos da API
- ✅ Remoção de duplicatas (antes/depois)

### **2. Remoção Automática de Duplicatas** 🧹

O componente agora remove duplicatas automaticamente baseado em:
- `year` + `title` + `type`

**Resultado:**
- Se a API retornar 93 eventos com duplicatas
- O componente mostrará apenas eventos únicos (~30-35)

---

## 🔍 **COMO VERIFICAR OS LOGS:**

### **Passo 1: Abrir Console do Navegador**

1. Acesse: `https://azmt.com.br/pt/studio/credibilidade`
2. Abra DevTools (F12)
3. Vá na aba **Console**

### **Passo 2: Procurar por Logs**

Procure por mensagens que começam com `[CompanyTimeline]`:

```
[CompanyTimeline] DEBUG: { envBackofficeUrl, envCmsApiUrl, apiUrl, url, ... }
[CompanyTimeline] Response: { status, statusText, ok, url }
[CompanyTimeline] Data received: { success, dataLength, stats, hasData }
[CompanyTimeline] After deduplication: { original, unique, removed }
```

---

## 🔍 **O QUE VERIFICAR NOS LOGS:**

### **1. Verificar Variáveis de Ambiente:**

```javascript
[CompanyTimeline] DEBUG: {
  envBackofficeUrl: "https://backoffice.azmt.com.br" // ✅ Deve aparecer
  envCmsApiUrl: undefined // ou URL se configurada
  apiUrl: "https://backoffice.azmt.com.br" // ✅ URL final usada
  url: "https://backoffice.azmt.com.br/api/public/history?lang=pt" // ✅ URL completa
}
```

**Se `envBackofficeUrl` for `undefined`:**
- A variável não está sendo lida
- Fazer redeploy após adicionar variável no Vercel

---

### **2. Verificar Resposta HTTP:**

```javascript
[CompanyTimeline] Response: {
  status: 200, // ✅ Deve ser 200
  statusText: "OK", // ✅ Deve ser OK
  ok: true, // ✅ Deve ser true
  url: "https://backoffice.azmt.com.br/api/public/history?lang=pt"
}
```

**Se `status` for `404`:**
- API não está acessível
- Verificar se backoffice está deployado

**Se `status` for `500`:**
- Erro no backend
- Verificar logs do backoffice

---

### **3. Verificar Dados Recebidos:**

```javascript
[CompanyTimeline] Data received: {
  success: true, // ✅ Deve ser true
  dataLength: 93, // Quantidade de eventos
  stats: { total: 93, ... }, // Estatísticas
  hasData: true // ✅ Deve ser true
}
```

**Se `success` for `false`:**
- API retornou erro
- Verificar `data.error` para detalhes

**Se `hasData` for `false`:**
- API não retornou array
- Verificar formato da resposta

---

### **4. Verificar Remoção de Duplicatas:**

```javascript
[CompanyTimeline] After deduplication: {
  original: 93, // Total recebido
  unique: 30, // Após remover duplicatas
  removed: 63 // Duplicatas removidas
}
```

---

## 🚨 **PROBLEMAS COMUNS E SOLUÇÕES:**

### **Problema 1: `envBackofficeUrl` é `undefined`**

**Causa:** Variável não está sendo lida após deploy

**Solução:**
1. Verificar no Vercel: Settings → Environment Variables
2. Confirmar que `VITE_BACKOFFICE_URL` existe
3. **Fazer redeploy** (obrigatório!)

---

### **Problema 2: Status 404**

**Causa:** API não está acessível

**Solução:**
1. Testar diretamente: `https://backoffice.azmt.com.br/api/public/history?lang=pt`
2. Se retornar 404, verificar se backoffice está deployado
3. Verificar se arquivo `azimut-cms/app/api/public/history/route.ts` existe

---

### **Problema 3: Status 200 mas `success: false`**

**Causa:** Erro no backend

**Solução:**
1. Verificar logs do backoffice no Vercel
2. Verificar se banco de dados está acessível
3. Verificar se tabela `CompanyHistory` existe

---

### **Problema 4: Loading infinito**

**Causa:** Resposta não está no formato esperado

**Solução:**
1. Verificar logs `[CompanyTimeline] Data received`
2. Verificar se `data.success` é `true`
3. Verificar se `data.data` é um array

---

## 📋 **CHECKLIST DE DEBUG:**

- [ ] ✅ Console do navegador aberto (F12)
- [ ] ✅ Logs `[CompanyTimeline]` aparecem?
- [ ] ✅ `envBackofficeUrl` não é `undefined`?
- [ ] ✅ Status HTTP é 200?
- [ ] ✅ `data.success` é `true`?
- [ ] ✅ `data.data` é um array?
- [ ] ✅ Timeline aparece após logs?

---

## 🎯 **PRÓXIMOS PASSOS:**

1. **Acessar a página** com console aberto
2. **Verificar logs** no console
3. **Copiar logs** se houver erro
4. **Compartilhar logs** para análise

---

**Status:** 🔍 **Debug ativado**  
**Arquivo modificado:** `src/components/CompanyTimeline.tsx`  
**Próximo:** Verificar logs no console do navegador
