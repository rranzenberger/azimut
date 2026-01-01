# 🚀 Como Fazer Deploy Manual no Vercel

## ⚠️ Problema:
O deploy automático não está funcionando. O último deploy foi há 1 dia atrás, mesmo após o push.

## ✅ Solução: Deploy Manual

### Opção 1: Deploy Manual via Dashboard (MAIS FÁCIL)

1. **Vercel Dashboard** → Projeto `azimut-backoffice-md8t`
2. **Deployments** (aba superior)
3. Clique no botão **"Deploy"** (geralmente no canto superior direito)
   - Ou clique nos **3 pontos (⋯)** do último deployment
   - Selecione **"Redeploy"**
4. **IMPORTANTE**: Desmarque **"Use existing Build Cache"**
5. Selecione:
   - **Branch**: `main`
   - **Framework Preset**: Next.js (deve detectar automaticamente)
6. Clique em **"Deploy"**

### Opção 2: Verificar Integração Git

Se o deploy automático não está funcionando, pode ser problema na integração:

1. **Settings** → **Git**
2. Verificar:
   - ✅ Repositório conectado: `rranzenberger/azimut-backoffice`
   - ✅ Branch de produção: `main`
   - ✅ Deploy automático: Habilitado
3. Se não estiver conectado:
   - Clique em **"Connect Git Repository"**
   - Selecione o repositório correto
   - Configure a branch `main`

### Opção 3: Forçar Push Novamente

Às vezes o Vercel não detecta o push. Tente:

```bash
cd azimut-cms
git push origin main --force-with-lease
```

**⚠️ CUIDADO**: `--force-with-lease` é mais seguro que `--force`, mas só use se necessário.

### Opção 4: Usar Vercel CLI

Se tiver Vercel CLI instalado:

```bash
cd azimut-cms
vercel --prod
```

## 🔍 Verificar o Problema:

### 1. Verificar se o push foi feito:
```bash
cd azimut-cms
git log --oneline -5
git status
```

### 2. Verificar repositório remoto:
```bash
git remote -v
```

Deve mostrar:
```
origin  https://github.com/rranzenberger/azimut-backoffice.git
```

### 3. Verificar no GitHub:
- Acesse: https://github.com/rranzenberger/azimut-backoffice
- Verifique se o último commit está lá
- Verifique se a branch `main` está atualizada

## ✅ Passo a Passo Recomendado:

1. **Fazer deploy manual AGORA:**
   - Deployments → Botão "Deploy" ou "Redeploy"
   - **Desmarcar**: "Use existing Build Cache"
   - Deploy

2. **Verificar integração Git:**
   - Settings → Git
   - Confirmar que está conectado corretamente

3. **Testar após deploy:**
   - Aguardar build completar (2-5 minutos)
   - Testar URLs que estavam dando 404

## 🎯 Solução Imediata:

**Faça um deploy manual AGORA:**
1. Deployments → **"Redeploy"** (último deployment)
2. **Desmarcar**: "Use existing Build Cache"
3. Confirmar

Isso vai fazer o deploy com as mudanças mais recentes!









