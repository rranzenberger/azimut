# 🌱 Rodar Seed no Banco Neon - AGORA

## ✅ **Tudo Pronto!**

Todas as variáveis de ambiente estão configuradas no Vercel:
- ✅ DATABASE_URL (Neon)
- ✅ NEXTAUTH_URL
- ✅ NEXTAUTH_SECRET
- ✅ SITE_URL

---

## 🚀 **Passo Final: Rodar Seed**

### **Opção 1: Via Endpoint (Mais Fácil)**

1. **Aguarde o deploy terminar** (verifique no Vercel Dashboard)

2. **Chame o endpoint de setup:**

**Via PowerShell:**
```powershell
curl -X POST https://azimut-backoffice.vercel.app/api/admin/setup `
  -H "Content-Type: application/json" `
  -d '{\"token\": \"azimut-seed-2025-setup-temp\"}'
```

**Ou via navegador (Postman/Insomnia):**
- **Método**: `POST`
- **URL**: `https://azimut-backoffice.vercel.app/api/admin/setup`
- **Headers**: `Content-Type: application/json`
- **Body (JSON)**:
```json
{
  "token": "azimut-seed-2025-setup-temp"
}
```

3. **Resposta esperada:**
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

---

### **Opção 2: Via Vercel CLI (Local)**

Se preferir rodar localmente:

```powershell
cd azimut-cms
vercel env pull .env.local
npm run prisma:push  # Criar tabelas no Neon
npm run prisma:seed  # Popular dados
```

---

## 🔑 **Depois do Seed:**

Teste o login:
- **URL**: `https://azimut-backoffice.vercel.app/login`
- **Email**: `admin@azimut.com.br`
- **Senha**: `Azimut2025!`

---

## ⚠️ **IMPORTANTE:**

Após rodar o seed e confirmar que funciona:

1. **DELETE o endpoint `/api/admin/setup`** (é temporário)
2. **Commit e push** a remoção

Ou me avise e eu removo!

---

**Agora é só rodar o seed! 🎉**

