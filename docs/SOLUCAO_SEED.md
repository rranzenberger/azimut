# 🎯 Solução para Rodar Seed no Banco Neon

## 📋 **Opções Disponíveis:**

### **Opção 1: Via Vercel CLI (Recomendado)**

**Pré-requisito:** Fazer login no Vercel CLI primeiro

```powershell
# 1. Login no Vercel
vercel login

# 2. Ir para pasta do backoffice
cd azimut-cms

# 3. Baixar variáveis de ambiente
vercel env pull .env.local

# 4. Instalar dependências (se necessário)
npm install

# 5. Criar tabelas
npm run prisma:push

# 6. Rodar seed
npm run prisma:seed
```

---

### **Opção 2: Via Painel Neon (SQL Direto)**

1. Acesse: https://console.neon.tech
2. Seu projeto → SQL Editor
3. Execute o SQL do seed manualmente (copiar de `prisma/seed.ts`)

---

### **Opção 3: Corrigir Endpoint `/api/admin/setup`**

O endpoint pode estar com problema. Possíveis causas:
- Prisma Client não está sendo gerado no build
- Erro de conexão com banco
- Deploy não atualizado

**Verificar:**
1. Vercel Dashboard → Deployments → Ver logs
2. Procurar erros relacionados a Prisma
3. Verificar se `prisma generate` está rodando no build

---

## 🔑 **Credenciais que serão criadas:**

- **Email**: `admin@azimut.com.br`
- **Senha**: `Azimut2025!`

---

## ✅ **Qual método você prefere?**

1. Fazer login no Vercel CLI e rodar via terminal?
2. Usar SQL direto no painel Neon?
3. Verificar e corrigir o endpoint primeiro?

**Me avise qual você prefere que eu ajude!** 😊

