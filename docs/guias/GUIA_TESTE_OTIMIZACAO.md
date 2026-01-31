# 🧪 GUIA DE TESTE - OTIMIZAÇÕES VERCEL

## ✅ O SCRIPT ESTÁ FUNCIONANDO!

O script `deploy.ps1` foi testado e está operacional.

---

## 🎯 COMO TESTAR AGORA (3 TESTES)

### TESTE 1: Script de Deploy Manual (Interativo)

**1. Abra o PowerShell**

**2. Execute:**
```powershell
.\deploy.ps1
```

**3. Vai aparecer o menu:**
```
========================================
   DEPLOY AZIMUT - MENU INTERATIVO
========================================

1) Site Principal (azimut-site-vite-tailwind)
2) Backoffice/CMS (azimut-cms)
3) Ambos (Site + Backoffice)
4) Cancelar

Escolha uma opcao (1-4):
```

**4. Digite:**
- `4` (Cancelar) - só para testar o menu
- OU `1` (Site) - se quiser fazer deploy real

✅ **Se o menu apareceu, o script está funcionando!**

---

### TESTE 2: Commit com [skip ci] (NÃO faz deploy)

**1. Crie um arquivo de teste:**
```powershell
echo "teste" > teste-skip-ci.txt
```

**2. Faça commit com [skip ci]:**
```powershell
git add teste-skip-ci.txt
git commit -m "test: testando skip ci [skip ci]"
git push
```

**3. Verifique no Vercel Dashboard:**
- Acesse: https://vercel.com/dashboard
- Vá em seu projeto
- **NÃO deve aparecer um novo deploy** (ou deve aparecer "Skipped")

✅ **Se não fez deploy, o filtro está funcionando!**

---

### TESTE 3: Commit sem [skip ci] (FAZ deploy)

**1. Faça uma pequena mudança em src/:**
```powershell
# Adiciona um comentário em qualquer arquivo src/
echo "// teste" >> src/App.tsx
```

**2. Faça commit sem [skip ci]:**
```powershell
git add src/App.tsx
git commit -m "test: testando deploy automatico"
git push
```

**3. Verifique no Vercel Dashboard:**
- **DEVE aparecer um novo deploy iniciando**

✅ **Se iniciou deploy, a automação está funcionando!**

---

## 🔍 TESTE RÁPIDO AGORA

Vou te dar os comandos prontos para copiar e colar:

### Opção A: Testar APENAS o menu (sem fazer deploy)

```powershell
.\deploy.ps1
```
Quando aparecer o menu, digite `4` e Enter (cancela)

### Opção B: Testar o filtro [skip ci]

```powershell
# Cria arquivo de teste
echo "teste filtro skip ci" > teste-vercel.txt

# Commit com [skip ci] (não faz deploy)
git add teste-vercel.txt
git commit -m "test: verificando filtro skip ci [skip ci]"
git push

# Depois limpa o arquivo de teste
git rm teste-vercel.txt
git commit -m "test: limpando arquivo de teste [skip ci]"
git push
```

### Opção C: Ver deploys no Vercel

```powershell
# Abrir Vercel Dashboard no navegador
start https://vercel.com/dashboard
```

---

## 📊 RESULTADOS ESPERADOS

### ✅ Menu Interativo
```
Se executar .\deploy.ps1
→ Deve aparecer menu com 4 opções
→ Pode escolher e pressionar Enter
```

### ✅ Filtro [skip ci]
```
Commit com [skip ci]
→ Push é feito normalmente
→ Vercel NÃO inicia deploy
→ Economia: $1 por deploy evitado
```

### ✅ Deploy Automático
```
Commit sem [skip ci] mudando src/
→ Push é feito normalmente
→ Vercel inicia deploy automático
→ Site atualizado em ~2min
```

---

## 🎯 QUAL TESTE VOCÊ QUER FAZER?

### TESTE MAIS SIMPLES (5 segundos):
```powershell
.\deploy.ps1
```
Digite `4` quando aparecer o menu (só para ver se funciona)

### TESTE MAIS COMPLETO (1 minuto):
```powershell
# 1. Testar skip ci
echo "teste" > teste.txt
git add teste.txt
git commit -m "test: skip ci [skip ci]"
git push

# 2. Ver no Vercel (não deve fazer deploy)
start https://vercel.com/dashboard

# 3. Limpar
git rm teste.txt
git commit -m "test: limpando [skip ci]"
git push
```

---

## ❓ QUAL TESTE QUER FAZER AGORA?

Me diga:
1. **"menu"** - Testo só o menu interativo
2. **"skip ci"** - Testo o filtro [skip ci]
3. **"completo"** - Testo tudo (menu + skip ci + deploy)
4. **"depois"** - Quero testar depois sozinho

E eu executo os comandos para você! 🚀

---

**Status do Script:** ✅ Funcionando  
**Pronto para usar:** ✅ Sim  
**Aguardando:** Sua escolha de teste
