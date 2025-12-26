# 🌱 Rodar Seed - Método Alternativo

## ⚠️ **Problema com Endpoint**

O endpoint `/api/admin/setup` está retornando erro 405/500. Pode ser que:
1. O deploy ainda não terminou
2. Há erro no build do Prisma
3. O endpoint precisa ser ajustado

---

## ✅ **Solução: Rodar Seed via Vercel CLI**

### **Passo 1: Baixar variáveis de ambiente**

```powershell
cd azimut-cms
vercel env pull .env.local
```

### **Passo 2: Criar tabelas no banco Neon**

```powershell
npm run prisma:push
```

### **Passo 3: Rodar seed**

```powershell
npm run prisma:seed
```

Você verá:
```
✅ Database seeded successfully!

📝 Credenciais do Admin:
   Email: admin@azimut.com.br
   Senha: Azimut2025!
```

---

## 🔍 **Ou Verificar Logs do Deploy**

Se quiser ver o que está acontecendo com o endpoint:

1. Vercel Dashboard → `azimut-backoffice` → Deployments
2. Clique no último deploy
3. Veja os logs para erros de Prisma ou build

---

## 🎯 **Depois de Rodar o Seed:**

Teste o login:
- URL: `https://azimut-backoffice.vercel.app/login`
- Email: `admin@azimut.com.br`
- Senha: `Azimut2025!`

---

**Vou tentar ajustar o endpoint também, mas usar o método CLI é mais confiável!**

