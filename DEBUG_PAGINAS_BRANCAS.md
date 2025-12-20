# 🔍 Debug: Páginas em Branco

## 🎯 Problema
Ao clicar em qualquer aba, a página fica completamente em branco/preto.

## 🔧 Correções Aplicadas

### 1. **ProtectedRoute com Debug**
- ✅ Adicionado logs no console
- ✅ Evita múltiplas verificações
- ✅ Evita loop de redirecionamento
- ✅ Verifica se já está em /login

### 2. **Como Verificar**

#### **Passo 1: Abrir Console**
1. Acesse: `https://azmt.com.br`
2. Pressione **F12** (ou Ctrl+Shift+I)
3. Vá para aba **"Console"**

#### **Passo 2: Verificar Logs**
Procure por mensagens como:
```
[ProtectedRoute] Verificando autenticação para: /what
[ProtectedRoute] Auth token: presente/ausente
[ProtectedRoute] Autenticado: true/false
[ProtectedRoute] Não autenticado, redirecionando para /login de: /what
[ProtectedRoute] Autenticado, mostrando conteúdo para: /what
```

#### **Passo 3: Verificar Erros**
Procure por erros em vermelho no console:
- `Error: ...`
- `TypeError: ...`
- `Cannot read property ...`

---

## 🧪 Testes

### **Teste 1: Verificar Autenticação**
```javascript
// No console do navegador
sessionStorage.getItem('azimut_preview_auth')
// Deve retornar: "authenticated" ou null
```

### **Teste 2: Forçar Autenticação**
```javascript
// No console do navegador
sessionStorage.setItem('azimut_preview_auth', 'authenticated')
location.reload()
```

### **Teste 3: Limpar e Testar**
```javascript
// No console do navegador
sessionStorage.removeItem('azimut_preview_auth')
location.reload()
// Deve redirecionar para /login
```

---

## 🚨 Possíveis Causas

### **1. ProtectedRoute sempre redirecionando**
- **Sintoma:** Console mostra `[ProtectedRoute] Não autenticado` mesmo após login
- **Solução:** Verificar se `sessionStorage` está funcionando

### **2. Erro JavaScript quebrando renderização**
- **Sintoma:** Erros vermelhos no console
- **Solução:** Verificar stack trace do erro

### **3. Lazy loading travando**
- **Sintoma:** Console mostra `Loading...` mas nunca carrega
- **Solução:** Verificar se arquivos estão sendo carregados (aba Network)

### **4. Suspense não renderizando**
- **Sintoma:** Página fica em branco sem mensagens
- **Solução:** Verificar se componentes estão sendo importados corretamente

---

## 📋 Checklist de Debug

- [ ] Console aberto (F12)
- [ ] Verificar logs `[ProtectedRoute]`
- [ ] Verificar erros em vermelho
- [ ] Verificar `sessionStorage.getItem('azimut_preview_auth')`
- [ ] Verificar aba Network (requisições falhando?)
- [ ] Testar em modo anônimo/incógnito
- [ ] Limpar cache do navegador
- [ ] Verificar se problema acontece em todas as páginas ou apenas algumas

---

## 🔄 Próximos Passos

1. **Aguardar deploy** (2-3 minutos)
2. **Abrir console** e verificar logs
3. **Enviar screenshots** do console se possível
4. **Informar** o que aparece no console quando clica em uma aba

---

## 💡 Solução Temporária (Se Urgente)

Se precisar acessar o site urgentemente, pode temporariamente desabilitar o ProtectedRoute:

```typescript
// Em src/App.tsx, comentar ProtectedRoute:
<Route 
  path="/what" 
  element={<WhatWeDo lang={lang} />} // Sem <ProtectedRoute>
/>
```

**⚠️ ATENÇÃO:** Isso remove a proteção de login. Use apenas para debug!

