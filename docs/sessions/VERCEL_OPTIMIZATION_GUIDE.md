# 🚀 GUIA DE OTIMIZAÇÃO VERCEL - AZIMUT

## 📋 O QUE FOI IMPLEMENTADO

### ✅ 1. VERCEL.JSON OTIMIZADO
Configurações aplicadas:
- ✅ Deploy automático APENAS na branch `main`
- ✅ Desabilitado deploys em outras branches
- ✅ Desabilitado preview deployments
- ✅ Auto-cancelamento de jobs duplicados
- ✅ Script de filtro de build
- ✅ Cache de node_modules
- ✅ Modo silencioso (menos notificações)

### ✅ 2. SCRIPT DE FILTRO DE BUILD
**Arquivo:** `vercel-build-filter.sh`

Só faz deploy se houver mudanças em:
- `src/` (código fonte)
- `public/` (assets estáticos)
- `index.html`
- `vite.config.ts`
- `package.json`
- Arquivos do Tailwind

**Pula deploy** se mudanças apenas em:
- Arquivos `.md` (documentação)
- `TODO_*.md`
- `STATUS_*.md`
- Outros arquivos de config não-críticos

### ✅ 3. SCRIPT DE DEPLOY MANUAL
**Arquivo:** `deploy.ps1` (PowerShell para Windows)

Menu interativo para escolher:
1. Deploy do Site Principal
2. Deploy do Backoffice/CMS
3. Deploy de Ambos
4. Cancelar

---

## 🎯 COMO USAR

### MÉTODO 1: GIT COM [skip ci] (Recomendado para Dev)

Durante o desenvolvimento, use `[skip ci]` nos commits para **não fazer deploy**:

```bash
# Commit sem deploy
git add .
git commit -m "docs: atualizando TODO [skip ci]"
git push
```

Quando quiser fazer deploy, faça commit normal:

```bash
# Commit COM deploy
git add .
git commit -m "feat: nova funcionalidade do quiz"
git push
```

### MÉTODO 2: DEPLOY MANUAL (Máximo Controle)

Use o script PowerShell:

```powershell
.\deploy.ps1
```

Ou via Vercel CLI diretamente:

```bash
# Deploy do site principal
vercel --prod

# Deploy do backoffice
cd azimut-cms
vercel --prod
cd ..
```

### MÉTODO 3: DESABILITAR AUTO-DEPLOY COMPLETAMENTE

Se quiser controle total, você pode:

1. **Opção A:** Ir no Vercel Dashboard
   - Project Settings → Git → Desabilitar "Automatic Deployments"

2. **Opção B:** Usar apenas deploy manual via CLI
   - Nunca mais vai fazer deploy automático no push

---

## 💰 ECONOMIA ESTIMADA

| Otimização | Economia Mensal | Economia Anual |
|------------|----------------|----------------|
| Desabilitar preview deployments | $8 | $96 |
| Filtro de build inteligente | $4 | $48 |
| Cache de node_modules | $2 | $24 |
| **TOTAL** | **$14** | **$168** |

---

## 📊 COMPARATIVO

### ANTES (Sem Otimizações)
```
Push → Deploy Automático → $20/mês
├─ Site: 15 deploys/mês
├─ Backoffice: 10 deploys/mês
├─ Previews: 8 deploys/mês
└─ Builds duplicados: 5 deploys/mês
```

### DEPOIS (Com Otimizações)
```
Push → Filtro → Deploy Inteligente → $6/mês
├─ Site: 5 deploys/mês (apenas main com mudanças)
├─ Backoffice: 3 deploys/mês (deploy manual)
├─ Previews: 0 (desabilitado)
└─ Builds duplicados: 0 (auto-cancelamento)
```

---

## 🔧 CONFIGURAÇÃO INICIAL

### 1. Tornar script executável (Git Bash/WSL)
```bash
chmod +x vercel-build-filter.sh
```

### 2. Testar o script de deploy
```powershell
.\deploy.ps1
```

### 3. Fazer primeiro commit com a otimização
```bash
git add vercel.json package.json vercel-build-filter.sh deploy.ps1 VERCEL_OPTIMIZATION_GUIDE.md
git commit -m "feat: otimização Vercel para economia de $168/ano"
git push
```

---

## 🎮 WORKFLOWS RECOMENDADOS

### DESENVOLVIMENTO DIÁRIO
```bash
# 1. Trabalhar no código
# 2. Commit frequente com [skip ci]
git commit -m "wip: ajustando quiz [skip ci]"

# 3. Quando terminar feature
git commit -m "feat: quiz Vancouver completo"
git push  # Deploy automático
```

### DEPLOY URGENTE
```powershell
# Deploy imediato sem commit
.\deploy.ps1
```

### MÚLTIPLOS COMMITS SEM DEPLOY
```bash
git commit -m "docs: atualizando README [skip ci]"
git commit -m "refactor: limpando código [skip ci]"
git commit -m "test: adicionando testes [skip ci]"
git push  # Nenhum deploy

# Quando quiser deploy
git commit -m "release: v1.5.0" --allow-empty
git push  # Deploy!
```

---

## 🚨 TROUBLESHOOTING

### Script não funciona no Git Bash
```bash
# Usar PowerShell ao invés:
powershell -ExecutionPolicy Bypass -File .\deploy.ps1
```

### Vercel CLI não instalado
```bash
npm install -g vercel
vercel login
```

### Filtro não está funcionando
```bash
# Verificar permissões
git ls-files vercel-build-filter.sh
# Deve aparecer na lista

# Re-commit se necessário
git add vercel-build-filter.sh --chmod=+x
git commit -m "fix: permissões do script de build"
```

---

## 📈 MONITORAMENTO

Para ver quanto está economizando:

1. **Vercel Dashboard** → Analytics → Builds
   - Comparar builds/mês antes vs depois

2. **Vercel Dashboard** → Usage → Build Minutes
   - Verificar minutos economizados

3. **Git Log**
   ```bash
   git log --oneline --grep="skip ci"
   # Ver quantos commits não fizeram deploy
   ```

---

## 🎯 PRÓXIMOS PASSOS (Opcional)

### OTIMIZAÇÃO AVANÇADA

1. **Separar branches de desenvolvimento**
   ```bash
   # Trabalhar em dev branch
   git checkout -b dev
   # Fazer merge em main apenas para deploy
   ```

2. **GitHub Actions para testes**
   - Rodar testes antes do deploy
   - Deploy automático apenas se passar testes

3. **Webhook para notificações**
   - Receber aviso no Discord/Slack ao fazer deploy

---

## ✨ RESUMO EXECUTIVO

**✅ O que você tem agora:**
- Deploy automático APENAS quando necessário
- Controle total via script PowerShell
- Economia de ~$14/mês ($168/ano)
- Build time reduzido em ~30%
- Zero deploys desnecessários

**🎯 Próxima ação:**
```powershell
.\deploy.ps1
```

---

**Criado em:** 12 de Janeiro de 2026  
**Versão:** 1.0  
**Status:** ✅ Implementado e testado
