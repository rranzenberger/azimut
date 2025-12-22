# 🌱 Rodar Seed em Produção (Criar Usuário Admin)

## 🎯 **Método Mais Fácil: Via Endpoint Temporário**

Criei um endpoint temporário que você pode chamar **UMA VEZ** para criar o usuário admin.

### **Passo 1: Adicionar Variáveis no Vercel** (se ainda não fez)

Veja `CONFIGURAR_BANCO_PRODUCAO.md` - precisa adicionar:
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `SITE_URL`

### **Passo 2: Aguardar Deploy**

Aguarde o deploy do backoffice terminar (ou faça um redeploy manual).

### **Passo 3: Chamar Endpoint de Setup**

**Opção A: Via Browser (fácil)**
1. Acesse: `https://azimut-backoffice.vercel.app/api/admin/setup`
2. Vai dar erro 405 (método não permitido) - é normal!
3. Use o método abaixo (curl ou Postman)

**Opção B: Via cURL (terminal)**

```powershell
curl -X POST https://azimut-backoffice.vercel.app/api/admin/setup `
  -H "Content-Type: application/json" `
  -d "{\"token\": \"azimut-seed-2025-setup-temp\"}"
```

**Opção C: Via Postman ou Insomnia**

1. Método: `POST`
2. URL: `https://azimut-backoffice.vercel.app/api/admin/setup`
3. Headers: `Content-Type: application/json`
4. Body (JSON):
```json
{
  "token": "azimut-seed-2025-setup-temp"
}
```

### **Resposta Esperada:**

```json
{
  "success": true,
  "message": "Seed executado com sucesso!",
  "admin": {
    "email": "admin@azimut.com.br",
    "senha": "Azimut2025!"
  },
  "warning": "⚠️ LEMBRE-SE: Remover este endpoint após usar!"
}
```

### **Passo 4: Testar Login**

1. Acesse: `https://azimut-backoffice.vercel.app/login`
2. Email: `admin@azimut.com.br`
3. Senha: `Azimut2025!`

### **Passo 5: REMOVER Endpoint (Importante!)**

Após confirmar que o login funciona:

1. Delete o arquivo: `azimut-cms/app/api/admin/setup/route.ts`
2. Commit e push:
```powershell
git add .
git commit -m "remove: Endpoint temporário de setup"
git push origin main
```

---

## 🔄 **Método Alternativo: Via Vercel CLI**

Se preferir rodar localmente:

```powershell
cd azimut-cms
vercel env pull .env.local
npm run prisma:seed
```

---

## ✅ **Checklist:**

- [ ] Adicionar variáveis de ambiente no Vercel
- [ ] Aguardar deploy completar
- [ ] Chamar endpoint `/api/admin/setup` com token
- [ ] Confirmar resposta de sucesso
- [ ] Testar login com `admin@azimut.com.br` / `Azimut2025!`
- [ ] **REMOVER endpoint `/api/admin/setup` após confirmar funcionamento**

---

**⚠️ IMPORTANTE:** 
- Este endpoint é temporário e deve ser removido após usar!
- O token é simples - apenas para evitar chamadas acidentais
- Não deixe este endpoint em produção por muito tempo

