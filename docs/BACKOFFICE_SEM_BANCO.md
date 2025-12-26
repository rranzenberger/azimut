# 🗄️ Backoffice COM Banco de Dados Neon

## 🎯 **Configuração Simplificada**

O backoffice agora funciona **sem banco de dados** - usando credenciais fixas.

---

## 🔑 **Credenciais de Login:**

- **Email**: `admin@azimut.com.br`
- **Senha**: `Azimut2025!`

---

## 🚀 **Deploy Simplificado:**

### **Variáveis de Ambiente (Vercel):**

Você só precisa de:

1. **NEXTAUTH_SECRET** (OBRIGATÓRIO)
   - Name: `NEXTAUTH_SECRET`
   - Value: `azimut-nextauth-secret-2025-production-secure-key`
   - Environments: Production, Preview, Development

2. **NEXTAUTH_URL** (OBRIGATÓRIO)
   - Name: `NEXTAUTH_URL`
   - Value: `https://azimut-backoffice.vercel.app`
   - Environments: Production, Preview

3. **SITE_URL** (OPCIONAL)
   - Name: `SITE_URL`
   - Value: `https://azmt.com.br`
   - Environments: Production, Preview, Development

### **NÃO precisa mais de:**
- ❌ `DATABASE_URL` (remover se tiver)
- ❌ Seed do banco
- ❌ Configuração Prisma

---

## 📋 **Checklist de Deploy:**

- [ ] Adicionar `NEXTAUTH_SECRET` no Vercel
- [ ] Adicionar `NEXTAUTH_URL` no Vercel
- [ ] Adicionar `SITE_URL` no Vercel (opcional)
- [ ] Remover `DATABASE_URL` se existir (não é mais necessário)
- [ ] Fazer deploy
- [ ] Testar login: `admin@azimut.com.br` / `Azimut2025!`

---

## ⚠️ **Limitações:**

Como não usa banco de dados:

- ❌ Não salva projetos, páginas, mídia no banco
- ❌ Não tem sistema de CMS completo
- ✅ Apenas autenticação simples
- ✅ Pode usar arquivos estáticos/JSON para conteúdo

---

## 🔄 **Para Adicionar Banco Depois:**

Se no futuro quiser usar banco de dados:

1. Configurar `DATABASE_URL` no Vercel
2. Rodar `npm run prisma:push` e `npm run prisma:seed`
3. Reverter o arquivo `app/api/admin/login/route.ts` para usar Prisma

---

**✅ Agora o backoffice funciona sem banco de dados!**

