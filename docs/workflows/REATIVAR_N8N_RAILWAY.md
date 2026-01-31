# 🚀 REATIVAR N8N NO RAILWAY

## **✅ O QUE JÁ ESTÁ CONFIGURADO:**

1. ✅ Railway account: **observant-learning**
2. ✅ N8N URL: `https://n8n-production-dce3.up.railway.app`
3. ✅ Workflow ID: `of7Eei71oSXKZCQQCpb8R`
4. ✅ Webhook: `/webhook/lead-enrichment`
5. ✅ Backoffice integrado

---

## **📋 PASSO A PASSO:**

### **1. Assinar Railway ($5/mês):**

**Link direto:** https://railway.app/account/billing

**Passos:**
1. Fazer login no Railway
2. Clicar em **"Subscribe to Hobby"**
3. Adicionar cartão (aceita cartão brasileiro)
4. Confirmar

**Custo:** $5/mês + uso (normalmente fica em $8-12/mês total)

---

### **2. Aguardar reativação (2-5 minutos):**

Depois de assinar, Railway vai:
- ✅ Reativar o projeto `observant-learning`
- ✅ Subir o container N8N
- ✅ Restaurar todas as configurações

---

### **3. Testar se N8N voltou:**

**Abrir no navegador:**
```
https://n8n-production-dce3.up.railway.app
```

Se pedir login:
```
Usuário: (verificar nas variáveis do Railway)
Senha: (verificar nas variáveis do Railway)
```

---

### **4. Testar o webhook:**

```bash
# No PowerShell:
Invoke-WebRequest -Uri "https://n8n-production-dce3.up.railway.app/webhook/lead-enrichment" -Method POST -ContentType "application/json" -Body '{"name":"Teste","email":"teste@exemplo.com"}'
```

Se retornar **200 OK**, está funcionando! ✅

---

### **5. Verificar no backoffice:**

1. Ir em: https://backoffice.azmt.com.br/admin/n8n-workflow
2. Clicar em **"Testar Workflow"** (botão verde)
3. Ver se retorna sucesso

---

## **🔧 ALTERNATIVA: Se Railway estiver caro**

### **Migrar para Vultr ($2.50/mês):**

**Passos:**
1. Criar conta em https://www.vultr.com/
2. Criar VPS ($2.50/mês - 512MB RAM)
3. Instalar Docker
4. Rodar N8N

**Comandos:**
```bash
# SSH no VPS
ssh root@seu-vps-ip

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Baixar docker-compose.yml
wget https://raw.githubusercontent.com/seu-repo/n8n/docker-compose.yml

# Iniciar N8N
docker-compose up -d
```

**Custo total:** $2.50/mês (fixo)

---

## **💡 RECOMENDAÇÃO FINAL:**

### **Por enquanto:**
✅ **Assinar Railway Hobby ($5/mês)**

**Por quê:**
- Tudo já está configurado
- Leva 5 minutos para reativar
- Suporte a múltiplos workflows
- Você já conhece a plataforma

### **Depois (se quiser economizar):**
Migrar para Vultr VPS ($2.50/mês) ou Contabo (€4/mês)

---

## **🎯 PRÓXIMOS PASSOS:**

1. **Você:** Assinar Railway Hobby ($5/mês)
2. **Eu:** Verifico se reativou
3. **Eu:** Testo o webhook
4. **Eu:** Atualizo o workflow com as 5 camadas anti-scam
5. **Você:** Testa com lead fake

---

**Me avisa quando assinar o Railway que eu verifico se voltou!** 😊

Ou quer que eu te ajude a migrar para outra plataforma mais barata agora?
