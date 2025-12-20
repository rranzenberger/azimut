# 🎯 Próximos Passos - Agora

## ✅ Status Atual

- ✅ **CMS (azimut-backoffice)** - Deployado há 17h
  - URL: `https://backoffice.azmt.com.br`
  - Status: Ready
  - Domínio configurado

- ✅ **Site Principal (azimut)** - Deployado há 34 minutos
  - Status: Ready
  - Commit mais recente aplicado

---

## 📋 PASSO 1: Verificar Variáveis do CMS

### No projeto `azimut-backoffice` na Vercel:

1. **Acesse:** Settings → Environment Variables
2. **Verifique se tem estas 6 variáveis:**
   - `DATABASE_URL` ✅ (já vi que tem)
   - `JWT_SECRET` ✅ (já vi que tem)
   - `NODE_ENV` ✅ (já vi que tem)
   - `NEXT_PUBLIC_SUPABASE_URL` ❓ (precisa verificar)
   - `SUPABASE_SERVICE_ROLE_KEY` ❓ (precisa verificar)
   - `SITE_URL` ❓ (precisa verificar)

3. **Se faltar alguma, adicione:**
   - Clique em "Add New"
   - Preencha Key e Value
   - Marque: Production, Preview, Development
   - Salve

---

## 📋 PASSO 2: Executar Seed (Criar Usuário Admin)

O CMS está no ar, mas precisa criar o usuário admin no banco:

```powershell
cd azimut-cms
npm run prisma:seed
```

Isso cria:
- ✅ Usuário: `admin@azimut.com.br`
- ✅ Senha: `Azimut2025!`

---

## 📋 PASSO 3: Testar o CMS

1. **Acesse:** `https://backoffice.azmt.com.br/login`
2. **Faça login:**
   - Email: `admin@azimut.com.br`
   - Senha: `Azimut2025!`
3. **Teste APIs:**
   - `https://backoffice.azmt.com.br/api/geo`
   - Deve retornar: `{"country":"BR","detected":true}`

---

## 📋 PASSO 4: Conectar Site Principal ao CMS

### No projeto `azimut` na Vercel:

1. **Acesse:** Settings → Environment Variables
2. **Adicione:**
   - **Key:** `VITE_CMS_API_URL`
   - **Value:** `https://backoffice.azmt.com.br/api`
   - **Environments:** ✅ Production ✅ Preview ✅ Development
3. **Salve**
4. **Faça redeploy:**
   - Deployments → Redeploy

---

## ✅ Checklist

### CMS (azimut-backoffice):
- [ ] Verificar se tem todas as 6 variáveis
- [ ] Adicionar variáveis faltantes (se houver)
- [ ] Executar seed localmente
- [ ] Testar login
- [ ] Testar APIs

### Site Principal (azimut):
- [ ] Adicionar `VITE_CMS_API_URL`
- [ ] Fazer redeploy
- [ ] Testar integração

---

## 🚀 Ordem de Execução

1. **Primeiro:** Verificar/Adicionar variáveis no CMS
2. **Segundo:** Executar seed (criar admin)
3. **Terceiro:** Testar CMS
4. **Quarto:** Conectar site principal

---

**Comece verificando as variáveis do CMS!** 🎯

