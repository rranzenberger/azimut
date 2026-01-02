# 📌 INSTRUÇÕES DE CHECKPOINT

## 🎯 Como Usar os Pontos de Controle

### **1. ANTES DE CADA FASE IMPORTANTE:**
```bash
# Criar checkpoint
git add .
git commit -m "CHECKPOINT: [Nome da Fase] - [Descrição breve]"
git tag checkpoint-[nome-fase]
git push origin main --tags
```

### **2. SE PRECISAR VOLTAR:**
```bash
# Ver todos os checkpoints
git tag -l "checkpoint-*"

# Voltar para um checkpoint específico
git checkout checkpoint-[nome-fase]

# OU criar branch a partir do checkpoint
git checkout -b rollback-[nome-fase] checkpoint-[nome-fase]
```

### **3. CHECKPOINTS CRIADOS:**
- ✅ `checkpoint-kanban-fase1-2` - Kanban Status + Responsável (02/01/2026)

---

## 📋 CHECKLIST ANTES DE CADA FASE

Antes de começar uma nova fase importante, sempre:

- [ ] ✅ Testar funcionalidade atual
- [ ] ✅ Fazer commit do código
- [ ] ✅ Criar tag de checkpoint
- [ ] ✅ Documentar no CHECKPOINT_[NOME].md
- [ ] ✅ Criar script de rollback (se necessário)
- [ ] ✅ Push para repositório remoto

---

## 🔄 ROLLBACK RÁPIDO

### **Opção 1: Git (Código)**
```bash
git reset --hard checkpoint-kanban-fase1-2
```

### **Opção 2: Banco de Dados**
```bash
npm run rollback:kanban
```

### **Opção 3: Ambos**
```bash
# 1. Reverter código
git reset --hard checkpoint-kanban-fase1-2

# 2. Reverter banco
npm run rollback:kanban

# 3. Regenerar Prisma Client
cd azimut-cms
npx prisma generate
```

---

## 📝 TEMPLATE DE CHECKPOINT

Copie este template para cada novo checkpoint:

```markdown
# 🎯 CHECKPOINT - [NOME DA FASE]

**Data:** [DATA]  
**Status:** ✅/⚠️/❌  
**Risco:** 🟢/🟡/🔴

## O QUE FOI FEITO
- [ ] Item 1
- [ ] Item 2

## ARQUIVOS MODIFICADOS
- arquivo1.ts
- arquivo2.tsx

## COMO VOLTAR
1. git reset --hard checkpoint-[nome]
2. npm run rollback:[nome] (se houver)
```

