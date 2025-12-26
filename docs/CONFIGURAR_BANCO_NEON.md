# 🗄️ Configurar Banco Neon - Backoffice

## ✅ **Banco de Dados Neon já configurado!**

A `DATABASE_URL` já está configurada no Vercel:
```
postgresql://neondb_owner:npg_W8VkhFvGTHj2@ep-crimson-firefly-ac8akobs-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require
```

---

## 🌱 **PASSO IMPORTANTE: Rodar Seed no Banco Neon**

O banco precisa ter o usuário admin criado. Você tem 2 opções:

### **Opção 1: Via Endpoint Temporário (Mais Fácil)**

1. Aguarde o deploy terminar
2. Chame o endpoint de setup:

**Via PowerShell:**
```powershell
curl -X POST https://azimut-backoffice.vercel.app/api/admin/setup `
  -H "Content-Type: application/json" `
  -d '{\"token\": \"azimut-seed-2025-setup-temp\"}'
```

**Via Postman/Insomnia:**
- Método: `POST`
- URL: `https://azimut-backoffice.vercel.app/api/admin/setup`
- Body (JSON): `{"token": "azimut-seed-2025-setup-temp"}`

3. Se der sucesso, você verá:
```json
{
  "success": true,
  "message": "Seed executado com sucesso no banco Neon!",
  "admin": {
    "email": "admin@azimut.com.br",
    "senha": "Azimut2025!"
  }
}
```

### **Opção 2: Via Vercel CLI (Local)**

```powershell
cd azimut-cms
vercel env pull .env.local
npm run prisma:push  # Criar tabelas
npm run prisma:seed  # Popular dados
```

---

## 🔐 **Variáveis de Ambiente Necessárias no Vercel:**

1. ✅ **DATABASE_URL** - Já configurada (Neon)
2. **NEXTAUTH_SECRET** - Adicionar
3. **NEXTAUTH_URL** - Adicionar
4. **SITE_URL** - Adicionar (opcional)

---

## 🔑 **Credenciais de Login:**

Após rodar o seed:
- **Email**: `admin@azimut.com.br`
- **Senha**: `Azimut2025!`

---

## 📋 **Checklist:**

- [x] DATABASE_URL configurada no Vercel (Neon)
- [ ] Adicionar `NEXTAUTH_SECRET` no Vercel
- [ ] Adicionar `NEXTAUTH_URL` no Vercel
- [ ] Adicionar `SITE_URL` no Vercel (opcional)
- [ ] Rodar seed no banco Neon (via endpoint ou CLI)
- [ ] Testar login: `admin@azimut.com.br` / `Azimut2025!`
- [ ] **REMOVER endpoint `/api/admin/setup` após usar**

---

## ⚠️ **Importante:**

- O endpoint `/api/admin/setup` é temporário - **remova após usar!**
- O banco Neon está na região `sa-east-1` (São Paulo)
- SSL é obrigatório (`sslmode=require`)

---

**Agora o backoffice usa banco de dados Neon! 🚀**

