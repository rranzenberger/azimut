# 🎯 PRÓXIMOS PASSOS - Integração e Melhorias

**Status Atual:** ✅ Leads, Serviços e Configurações 100% implementados

---

## 🔍 O QUE FALTA INTEGRAR?

### 1. **Usar Settings na API de Leads** ⚠️
**Problema:** API de leads usa `process.env.NOTIFICATION_EMAIL` hardcoded  
**Solução:** Buscar `notificationEmail` do Settings  
**Prioridade:** Alta (melhora UX)

### 2. **Usar Settings nas APIs Públicas** ⚠️
**Problema:** URLs e configurações hardcoded  
**Solução:** Buscar do Settings quando necessário  
**Prioridade:** Média

### 3. **Implementar Envio Real de Email** ⚠️
**Problema:** Email só faz console.log  
**Solução:** Usar SMTP do Settings para enviar emails reais  
**Prioridade:** Alta (funcionalidade crítica)

### 4. **Integração com Kabbam** ⚠️
**Problema:** TODO na API de leads  
**Solução:** Implementar usando kabbamApiKey e kabbamApiUrl do Settings  
**Prioridade:** Média

---

## 📋 PLANO DE INTEGRAÇÃO

### STEP 1: Integrar Settings na API de Leads
- [ ] Criar helper para buscar Settings
- [ ] Substituir `process.env.NOTIFICATION_EMAIL` por Settings
- [ ] Testar

### STEP 2: Implementar Envio Real de Email
- [ ] Instalar Nodemailer
- [ ] Criar helper de email usando SMTP do Settings
- [ ] Integrar na API de leads
- [ ] Testar envio

### STEP 3: Integração com Kabbam (Opcional)
- [ ] Criar helper para Kabbam API
- [ ] Integrar na API de leads
- [ ] Testar

---

**Recomendação:** Começar por STEP 1 e STEP 2 (mais importantes)







