# ⚠️ ERRO: CONEXÃO COM BANCO DE DADOS

**Data:** 11/01/2026  
**Problema:** Script não consegue conectar ao banco Neon

---

## ❌ ERRO ENCONTRADO:

```
Can't reach database server at `ep-crimson-firefly-ac8akobs-pooler.sa-east-1.aws.neon.tech:5432`
```

**Causa:** O script não consegue conectar ao banco de dados Neon.

---

## 🔍 POSSÍVEIS CAUSAS:

### **1. Banco Neon em modo Sleep**
- ✅ Neon coloca bancos em modo sleep após inatividade
- ✅ Precisa "acordar" o banco primeiro
- ✅ Acessar o dashboard do Neon ou fazer uma query

### **2. Variável DATABASE_URL não configurada**
- ✅ Script precisa da variável `DATABASE_URL` no `.env`
- ✅ Verificar se `.env` existe e tem a variável correta

### **3. Firewall/Rede**
- ✅ Conexão bloqueada por firewall
- ✅ Rede não permite conexão com Neon

---

## ✅ SOLUÇÕES:

### **Opção 1: Verificar .env (RECOMENDADO)**

**Verificar se `.env` existe:**
```bash
cd azimut-cms
ls .env
```

**Se não existir, criar:**
1. Copiar `.env.example` para `.env` (se existir)
2. Ou criar `.env` com:
   ```
   DATABASE_URL="sua-url-do-neon-aqui"
   ```

**Obter DATABASE_URL:**
1. Acessar dashboard Neon
2. Projeto → Connection String
3. Copiar a URL
4. Colar no `.env`

---

### **Opção 2: "Acordar" o banco Neon**

**Métodos:**
1. **Via Dashboard Neon:**
   - Acessar https://console.neon.tech
   - Projeto → qualquer query simples
   - Banco "acorda" automaticamente

2. **Via Prisma Studio:**
   ```bash
   cd azimut-cms
   npx prisma studio
   ```
   - Abre interface gráfica
   - Banco "acorda" quando conecta

3. **Via Query simples:**
   ```bash
   cd azimut-cms
   npx prisma db execute --stdin
   ```
   - Digitar: `SELECT 1;`
   - Banco "acorda"

---

### **Opção 3: Executar no Vercel (FUTURO)**

**Criar API endpoint no Vercel:**
- `/api/admin/populate-test-data`
- Executar script via API
- Banco já está conectado no Vercel

---

## 🎯 RECOMENDAÇÃO:

**1. Verificar .env primeiro:**
```bash
cd azimut-cms
cat .env  # ou type .env no Windows
```

**2. Se .env existe, "acordar" banco:**
```bash
npx prisma studio
# Deixar aberto enquanto executa o script
```

**3. Executar script novamente:**
```bash
npx tsx scripts/populate-test-data.ts
```

---

## 📝 NOTA:

**Se o banco Neon está em modo sleep:**
- ✅ Primeira conexão pode demorar 1-2 segundos
- ✅ Banco "acorda" automaticamente
- ✅ Próximas conexões são rápidas

---

**🔍 Verificar .env e "acordar" banco Neon primeiro!**
