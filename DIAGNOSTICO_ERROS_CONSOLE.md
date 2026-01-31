# 🔍 DIAGNÓSTICO - ERROS NO CONSOLE

**Data:** 2025-01-28  
**Status:** ✅ CORREÇÕES APLICADAS

---

## 🚨 ERROS IDENTIFICADOS NO CONSOLE

### **1. CORS Policy Error** ✅ CORRIGIDO
```
Access to fetch at 'https://backoffice.azmt.com.br/api/geo' from origin 'https://azmt.com.br' 
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present
```

**CAUSA:** API `/api/geo` não tinha headers CORS configurados.

**CORREÇÃO APLICADA:**
- ✅ Adicionado `Access-Control-Allow-Origin: *` na resposta
- ✅ Adicionado handler `OPTIONS` para preflight requests
- ✅ Arquivo: `azimut-cms/app/api/geo/route.ts`

---

### **2. Mixed Content Error** ✅ CORRIGIDO
```
Mixed Content: The page at 'https://azmt.com.br/' was loaded over HTTPS, 
but requested an insecure resource 'http://ip-api.com/json/'
```

**CAUSA:** Código estava usando `http://` em vez de `https://` para API de geolocalização.

**CORREÇÃO APLICADA:**
- ✅ Alterado `http://ip-api.com` para `https://ip-api.com`
- ✅ Substituído `AbortSignal.timeout()` por `createTimeoutSignal()` (compatibilidade)
- ✅ Arquivo: `src/utils/geoDetection.ts`

---

### **3. 503 Service Unavailable** ⚠️ VERIFICAR
```
Failed to load resource: the server responded with a status of 503 (Service Unavailable)
```

**CAUSA:** Backoffice pode estar:
- Em deploy/atualização
- Com problemas de conexão ao banco
- Com timeout/excesso de requisições

**AÇÃO NECESSÁRIA:**
- Verificar status do deploy no Vercel
- Verificar logs do backoffice
- Verificar se banco de dados está acessível

---

### **4. 500 Internal Server Error** ⚠️ VERIFICAR
```
Failed to load resource: the server responded with a status of 500
```

**CAUSA:** Erro interno no servidor do backoffice.

**POSSÍVEIS CAUSAS:**
- Erro no código da API
- Problema com Prisma/database
- Erro de runtime

**AÇÃO NECESSÁRIA:**
- Verificar logs do Vercel
- Verificar se migration foi aplicada (pillars)
- Verificar se banco está acessível

---

## ✅ CORREÇÕES APLICADAS

### **1. CORS na API `/api/geo`**
```typescript
// azimut-cms/app/api/geo/route.ts
return NextResponse.json({...}, {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  },
});

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
```

### **2. HTTPS no geoDetection**
```typescript
// src/utils/geoDetection.ts
// ANTES: 'http://ip-api.com/json/'
// DEPOIS: 'https://ip-api.com/json/'
```

---

## 🔍 PRÓXIMOS PASSOS

### **1. Verificar Status do Backoffice**
- Acessar Vercel Dashboard
- Verificar se há deploys em andamento
- Verificar logs de erro

### **2. Verificar Banco de Dados**
- Verificar se `DATABASE_URL` está configurada
- Verificar se migrations foram aplicadas
- Verificar se banco está acessível

### **3. Testar Após Deploy**
- Aguardar deploy do backoffice com correções CORS
- Limpar cache do navegador
- Testar novamente

---

## 📊 STATUS DAS CORREÇÕES

- ✅ **CORS `/api/geo`:** Corrigido
- ✅ **Mixed Content (HTTP → HTTPS):** Corrigido
- ⚠️ **503 Service Unavailable:** Verificar servidor
- ⚠️ **500 Internal Server Error:** Verificar logs

**As correções de CORS e HTTPS foram aplicadas. Os erros 503/500 precisam ser investigados no servidor.**














