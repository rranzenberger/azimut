# 🔧 ALTERNATIVA - SEM CONTA NEON
**Data:** 15/01/2026  
**Situação:** Banco na Vercel, sem acesso direto ao Neon

---

## 🎯 3 OPÇÕES PARA EXECUTAR SQL

### **OPÇÃO 1: Via Vercel (Tentativa)**

1. **Clicar no card** "azimut-backoffice"
2. **Procurar** "SQL Editor" ou botão "Open in Neon"
3. **Clicar** quando encontrar

**Se não encontrar:** Próxima opção ↓

---

### **OPÇÃO 2: Criar Conta Neon Grátis (5 min)**

1. **Acessar:** https://console.neon.tech
2. **Clicar em "Sign Up"** ou **"Get Started"**
3. **Escolher:**
   - **"Sign up with Google"** (recomendado - usa mesma conta)
   - Ou **"Sign up with GitHub"** (se usar GitHub)
   - Ou criar conta com email
4. **Depois de criar:**
   - Procurar projeto "azimut-backoffice" (pode estar no mesmo workspace)
   - Ou pedir acesso ao dono da conta Vercel
5. **Abrir SQL Editor**

**Vantagem:** Acesso direto e permanente

---

### **OPÇÃO 3: Via Prisma (Terminal)** ⭐ MAIS FÁCIL

**Sem precisar de SQL Editor visual!**

#### **PASSO 1: Preparar Arquivo SQL**

1. **Abrir:** `azimut-cms/scripts/populate-field-metadata.sql`
2. **Copiar TODO** o conteúdo
3. **Criar arquivo temporário:**
   ```bash
   # No terminal, na raiz do projeto
   cd azimut-cms
   # Colar SQL em um arquivo temporário
   ```

#### **PASSO 2: Executar via Prisma**

```bash
# No terminal
cd azimut-cms

# Executar SQL via Prisma
npx prisma db execute --file scripts/populate-field-metadata.sql --schema prisma/schema.prisma
```

**Ou:**

```bash
# Se tiver DATABASE_URL no .env
npx prisma db execute --stdin < scripts/populate-field-metadata.sql
```

#### **PASSO 3: Verificar**

```bash
# Verificar via Prisma Studio
npx prisma studio

# Isso abre interface visual no navegador
# Pode ver tabelas e dados
```

---

### **OPÇÃO 4: Via API Endpoint (Temporário)**

Criar endpoint temporário no backoffice para executar SQL:

**Arquivo:** `azimut-cms/app/api/admin/setup-metadata/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    // Ler arquivo SQL
    const sqlPath = path.join(process.cwd(), 'scripts', 'populate-field-metadata.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    // Executar SQL (prisma.$executeRawUnsafe)
    await prisma.$executeRawUnsafe(sql);
    
    return NextResponse.json({ success: true, message: 'SQL executado com sucesso' });
  } catch (error) {
    console.error('Error executing SQL:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
```

**Depois:**
```bash
curl -X POST https://backoffice.azmt.com.br/api/admin/setup-metadata
```

**⚠️ CUIDADO:** Remover endpoint após usar (segurança)

---

## ✅ RECOMENDAÇÃO

### **Método Mais Fácil:**

**OPÇÃO 3: Via Prisma Studio**

1. **Instalar Prisma Studio:**
   ```bash
   cd azimut-cms
   npx prisma studio
   ```

2. **Isso abre:** http://localhost:5555
3. **Ver tabelas** criadas visualmente
4. **Executar SQL** via interface (se necessário)

**Mas primeiro precisa executar SQL para criar tabelas...**

---

## 🎯 SOLUÇÃO DEFINITIVA

### **Tentar Primeiro:**

1. **Clicar no card** "azimut-backoffice" na Vercel
2. **Procurar** "SQL Editor" ou "Open in Neon"
3. **Se não encontrar:** Criar conta Neon grátis (5 min)

**Depois:**
- Ter acesso permanente
- Executar SQL direto
- Gerenciar banco facilmente

---

**✅ TENTE PRIMEIRO: CLICAR NO CARD "azimut-backoffice"**

**SE NÃO FUNCIONAR: Criar conta Neon grátis (https://console.neon.tech) - só precisa email!**
