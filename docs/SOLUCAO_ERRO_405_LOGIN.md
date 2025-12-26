# 🔧 Solução: Erro 405 no Login

## 🐛 **Problema:**

Erro 405 (Method Not Allowed) ao tentar fazer login:
- `/api/admin/login` retorna 405
- Mensagem: "Falha ao autenticar"

## 🔍 **Possíveis Causas:**

### **1. Usuário não existe no banco (MAIS PROVÁVEL)**
O banco Neon precisa ter o usuário admin criado. Se o seed não foi rodado, não há usuário para autenticar.

### **2. Deploy não atualizado**
O código mais recente pode não ter sido deployado ainda.

### **3. Problema de roteamento Next.js**
O Next.js pode não estar reconhecendo a rota corretamente.

---

## ✅ **Soluções (em ordem de prioridade):**

### **Solução 1: Rodar Seed no Banco Neon (PRIMEIRO PASSO)**

O banco precisa ter o usuário admin. Você tem 2 opções:

#### **Opção A: Via Endpoint Temporário (se deployado)**

Se o endpoint `/api/admin/setup` estiver funcionando:

```powershell
curl -X POST "https://backoffice.azmt.com.br/api/admin/setup" `
  -H "Content-Type: application/json" `
  -d '{\"token\": \"azimut-seed-2025-setup-temp\"}'
```

#### **Opção B: Via Vercel CLI (RECOMENDADO)**

```powershell
# 1. Login no Vercel (se necessário)
vercel login

# 2. Ir para pasta do backoffice
cd azimut-cms

# 3. Baixar variáveis de ambiente
vercel env pull .env.local

# 4. Rodar seed
npm run prisma:push  # Criar tabelas
npm run prisma:seed  # Criar usuário admin
```

---

### **Solução 2: Verificar se Deploy Está Atualizado**

1. Vercel Dashboard → `azimut-backoffice` → Deployments
2. Verifique se o último deploy está com status "Ready"
3. Se não estiver, aguarde ou faça um redeploy manual

---

### **Solução 3: Verificar Logs do Runtime**

1. Vercel Dashboard → `azimut-backoffice` → Logs
2. Tente fazer login novamente
3. Veja os logs para identificar o erro exato

---

## 🎯 **Depois de Rodar o Seed:**

Teste o login novamente:
- **Email**: `admin@azimut.com.br`
- **Senha**: `Azimut2025!`

Se ainda não funcionar, verifique:
- Se `DATABASE_URL` está correta no Vercel
- Se o banco Neon está ativo
- Logs do runtime no Vercel

---

## 📋 **Checklist:**

- [ ] Rodar seed no banco Neon (criar usuário admin)
- [ ] Verificar se deploy está atualizado
- [ ] Verificar `DATABASE_URL` no Vercel
- [ ] Testar login novamente
- [ ] Verificar logs do runtime se ainda falhar

---

**O mais provável é que o seed não foi rodado ainda. Rode o seed primeiro!** 🌱

