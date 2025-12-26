# ⚙️ VARIÁVEIS MÍNIMAS PARA LOGIN FUNCIONAR

## 📋 Copie estas variáveis para `.env.local`:

```env
# Banco de dados Neon
DATABASE_URL="postgresql://neondb_owner:SUA_SENHA_AQUI@ep-something.us-east-2.aws.neon.tech/neondb?sslmode=require"

# JWT Secret (para autenticação)
JWT_SECRET="sua-chave-secreta-aqui-pode-ser-qualquer-string-longa"
```

---

## 🎯 O QUE CADA UMA FAZ:

### **DATABASE_URL:**
- Conecta com o banco Neon
- **Onde pegar:** Console Neon → Connection String

### **JWT_SECRET:**
- Cria tokens de login seguros
- Pode ser qualquer string longa (ex: `azimut-super-secret-key-2025`)

---

## 📝 PASSO A PASSO:

### **1. Abrir arquivo .env.local:**
```bash
# No VSCode, abra:
azimut-cms\.env.local
```

### **2. Colar as variáveis acima**

### **3. Substituir valores:**
- `DATABASE_URL`: Pegar do Neon Console
- `JWT_SECRET`: Criar uma string qualquer longa

### **4. Salvar arquivo**

### **5. Reiniciar backoffice:**
```bash
Ctrl+C no terminal
npm run dev
```

---

## ⚠️ IMPORTANTE:

- **Arquivo `.env.local` NÃO vai para GitHub** (está no .gitignore)
- **É seguro colocar senhas aqui** (só você tem acesso)


