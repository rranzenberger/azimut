# 🔐 Variáveis de Ambiente - Backoffice

## ✅ **Já Configurado:**
- [x] `DATABASE_URL` - Configurada com Neon

## ⚠️ **Variáveis que Precisam ser Adicionadas:**

### **1. NEXTAUTH_SECRET (OBRIGATÓRIO)**
```
Nome: NEXTAUTH_SECRET
Valor: (gerar com: openssl rand -base64 32)
Ambientes: Production, Preview, Development
```

**Como gerar:**
- Opção 1: https://generate-secret.vercel.app/32
- Opção 2: Terminal: `openssl rand -base64 32`

### **2. JWT_SECRET (OBRIGATÓRIO - se usar JWT separado)**
```
Nome: JWT_SECRET
Valor: (gerar com: openssl rand -base64 32)
Ambientes: Production, Preview, Development
```

### **3. NEXTAUTH_URL (OBRIGATÓRIO)**
```
Nome: NEXTAUTH_URL
Valor: https://backoffice.azmt.com.br
Ambientes: Production

Nome: NEXTAUTH_URL
Valor: https://azimut-backoffice.vercel.app
Ambientes: Preview
```

### **4. SITE_URL (OPCIONAL mas recomendado)**
```
Nome: SITE_URL
Valor: https://azmt.com.br
Ambientes: Production, Preview, Development
```

### **5. NODE_ENV (OPCIONAL)**
```
Nome: NODE_ENV
Valor: production
Ambientes: Production
```

---

## 🚀 **Como Adicionar:**

1. No Vercel, clique em **"Add New"** ou **"Create"**
2. Adicione cada variável:
   - **Name**: Nome da variável
   - **Value**: Valor
   - **Environments**: Marque Production, Preview, Development conforme necessário
3. Clique em **"Save"**
4. Faça um novo deploy após adicionar

---

## ⚠️ **IMPORTANTE:**

Após adicionar as variáveis, você também precisa **rodar o seed** no banco para criar o usuário admin:

```
Email: admin@azimut.com.br
Senha: Azimut2025!
```

**Como rodar seed:**
- Via Vercel CLI (recomendado)
- Ou criar endpoint temporário de setup

---

## 📋 **Checklist:**

- [ ] `DATABASE_URL` ✅ (já configurada)
- [ ] `NEXTAUTH_SECRET` (adicionar)
- [ ] `NEXTAUTH_URL` (adicionar)
- [ ] `JWT_SECRET` (adicionar - se necessário)
- [ ] `SITE_URL` (adicionar - opcional)
- [ ] Rodar seed no banco (criar usuário admin)
- [ ] Fazer novo deploy após adicionar variáveis

