# 🚨 ERRO DEPLOY BACKOFFICE - DIAGNÓSTICO

**Data:** 11/01/2026  
**Status:** Investigando

---

## ❓ QUAL FOI O ERRO EXATO?

**Por favor, copie e cole aqui:**

1. **Mensagem de erro do Vercel:**
```
[Cole aqui a mensagem de erro que apareceu no deploy]
```

2. **Tipo de erro:**
- [ ] Build failed (erro de compilação)
- [ ] Module not found (falta dependência)
- [ ] Type error (erro TypeScript)
- [ ] Prisma error (erro banco de dados)
- [ ] Runtime error (erro na execução)

---

## 🔍 POSSÍVEIS CAUSAS

### Causa #1: Falta dependência @anthropic-ai/sdk ⚠️ MAIS PROVÁVEL
**Sintoma:**
```
Module not found: Can't resolve '@anthropic-ai/sdk'
```

**Solução:**
```bash
cd azimut-cms
npm install @anthropic-ai/sdk
git add package.json package-lock.json
git commit -m "feat: adiciona anthropic SDK para analise IA"
git push origin main
```

---

### Causa #2: Erro no Prisma Schema
**Sintoma:**
```
Type error: Property 'mediaAnalysis' does not exist on type 'PrismaClient'
```

**Solução:**
```bash
cd azimut-cms
npx prisma generate
npx prisma migrate dev --name add-media-analysis
git add -A
git commit -m "fix: prisma schema atualizado"
git push origin main
```

---

### Causa #3: Erro TypeScript na API
**Sintoma:**
```
Type error: ... in app/api/media/analyze/route.ts
```

**Solução:** Preciso ver o erro exato para corrigir

---

### Causa #4: Import errado
**Sintoma:**
```
Module not found: Can't resolve '@/lib/...'
```

**Solução:** Corrigir path de imports

---

## 🔧 SOLUÇÃO RÁPIDA (PROVAVELMENTE É #1)

### Passo 1: Adicionar dependência
```bash
cd azimut-cms
npm install @anthropic-ai/sdk lru-cache
```

### Passo 2: Commit
```bash
git add package.json package-lock.json
git commit -m "feat: adiciona dependencias para sistema IA"
git push origin main
```

### Passo 3: Aguardar redeploy automático
- Vercel vai detectar o push
- Deploy deve completar em ~2 min

---

## 📸 COMO VER O ERRO EXATO

### No Vercel Dashboard:
1. Ir em **Deployments**
2. Clicar no deploy que falhou
3. Aba **Building** ou **Function Logs**
4. Copiar a mensagem de erro completa
5. Me mandar

### Screenshot:
- Print da tela do erro
- Me mandar no chat

---

## 🎯 PRÓXIMOS PASSOS

**Aguardando:**
1. Você me mandar o erro exato
2. Eu identifico a causa
3. Eu corrijo imediatamente
4. Redeploy e pronto!

**Tempo estimado:** 5 minutos

---

**ME MANDA O ERRO QUE EU RESOLVO RÁPIDO! ⚡**
