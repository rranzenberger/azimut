# 🔧 SOLUÇÃO: ERRO DE CONEXÃO COM BANCO

**Erro:** Script não consegue conectar ao banco Neon

---

## ⚠️ PROBLEMA:

O banco Neon está em **modo sleep** (dormindo). Bancos Neon gratuitos entram em modo sleep após inatividade.

---

## ✅ SOLUÇÃO RÁPIDA:

### **1. "Acordar" o banco Neon:**

**Opção A: Via Prisma Studio (RECOMENDADO)**
```bash
cd azimut-cms
npx prisma studio
```
- Abre interface gráfica
- Banco "acorda" automaticamente
- **Manter aberto** e executar script em outro terminal

**Opção B: Via query simples**
```bash
cd azimut-cms
npx prisma db execute --stdin
```
- Digitar: `SELECT 1;`
- Banco "acorda"

**Opção C: Acessar dashboard Neon**
- Acessar: https://console.neon.tech
- Projeto → SQL Editor
- Executar: `SELECT 1;`
- Banco "acorda"

---

### **2. Executar script novamente:**

**Em outro terminal (com Prisma Studio aberto):**
```bash
cd azimut-cms
npx tsx scripts/populate-test-data.ts
```

---

## 📝 NOTA:

**Banco Neon em modo sleep:**
- ✅ Primeira conexão demora 1-2 segundos
- ✅ Banco "acorda" automaticamente
- ✅ Próximas conexões são rápidas
- ✅ Pode dormir novamente após 5 minutos de inatividade

---

## 🎯 ORDEM RECOMENDADA:

1. **Abrir Prisma Studio:**
   ```bash
   cd azimut-cms
   npx prisma studio
   ```

2. **Em outro terminal, executar script:**
   ```bash
   cd azimut-cms
   npx tsx scripts/populate-test-data.ts
   ```

3. **Aguardar conclusão (~2-3 minutos)**

4. **Fechar Prisma Studio quando terminar**

---

**✅ Prisma Studio mantém banco "acordado"!**
