# 🔧 Solução: Deploy Mantém Código Antigo (Cache)

## 🐛 Problema

Após redeploy, o backoffice ainda mostra:
- ❌ "Páginas (em breve)" no menu
- ❌ Menu não atualizado

Mas o código local está correto:
- ✅ `layout.tsx` linha 99: `<AdminLink href="/admin/pages" label="Páginas" />`
- ✅ Sem `disabled` e sem "(em breve)"
- ✅ Commits estão no GitHub

## 🔍 Causa Provável

**Cache do Next.js Build:**
- Vercel pode estar usando cache de build anterior
- Next.js pode estar servindo versão antiga do layout
- Build pode não estar invalidando cache corretamente

## ✅ Soluções Aplicadas

### **1. Commit Forçado para Rebuild**

Foi criado um commit que modifica o `layout.tsx` para forçar rebuild completo:
```bash
git commit -m "fix: Force rebuild to update pages menu (remove cache)"
git push origin main
```

### **2. Verificar na Vercel**

Após o novo deploy:

1. **Verificar commit:**
   - Deve mostrar commit mais recente (não `62dcdb5`)
   - Deve mostrar commit com "Force rebuild"

2. **Verificar Build Logs:**
   - Procurar: "Skipping build cache" ou "Removed build cache"
   - Deve fazer rebuild completo (não usar cache)

3. **Verificar se rotas foram geradas:**
   - Build Logs → Procurar "Route (app)"
   - Deve aparecer `/admin/pages`

## 🔧 Soluções Manuais (Se Necessário)

### **Opção 1: Limpar Cache na Vercel**

1. Vercel Dashboard → Projeto `azimut-backoffice`
2. Settings → General
3. Scroll até "Build & Development Settings"
4. Clique em "Clear Build Cache"
5. Faça novo deploy

### **Opção 2: Redeploy com Cache Desabilitado**

1. Vercel Dashboard → Deployments
2. Clique nos 3 pontos do último deploy
3. Selecione "Redeploy"
4. **IMPORTANTE:** Marque "Use existing Build Cache" como **DESMARCADO**
5. Clique em "Redeploy"

### **Opção 3: Verificar Configuração do Projeto**

1. Vercel Dashboard → Settings → General
2. Verificar "Build Command":
   - Deve ser: `npm run build` ou `next build`
   - Não deve ter flags de cache

3. Verificar "Output Directory":
   - Deve ser: `.next` (padrão do Next.js)

## 📊 Como Verificar se Funcionou

### **1. Verificar Commit no Deploy**

Vercel Dashboard → Deployments → Deploy mais recente → Aba "Deployment" → Source

Deve mostrar:
- ✅ Commit com "Force rebuild" ou mais recente
- ❌ Não deve ser `62dcdb5`

### **2. Verificar Build Logs**

Vercel Dashboard → Deployments → Deploy → Aba "Logs" → Build Logs

Procurar:
- ✅ "Skipping build cache" ou "Removed build cache"
- ✅ "Route (app)" → Deve listar `/admin/pages`
- ✅ "Build Completed" sem erros

### **3. Testar no Site**

1. Limpar cache do navegador: `Ctrl + Shift + Delete`
2. Acessar: `backoffice.azmt.com.br/admin`
3. Verificar menu lateral:
   - ✅ Deve mostrar "Páginas" (sem "em breve")
   - ✅ Deve ser clicável
   - ❌ Não deve mostrar "Páginas (em breve)"

4. Testar rota:
   - Acessar: `backoffice.azmt.com.br/admin/pages`
   - ✅ Deve carregar listagem (não 404)

## 🐛 Se Ainda Não Funcionar

### **Verificar se Arquivo Está no Repositório**

```bash
git log --oneline --all -- azimut-cms/app/admin/layout.tsx
```

Deve mostrar commit `67ec448` ou mais recente.

### **Verificar Conteúdo do Arquivo no GitHub**

1. Acesse: https://github.com/rranzenberger/azimut
2. Navegue: `azimut-cms/app/admin/layout.tsx`
3. Verifique linha 99:
   - Deve ser: `<AdminLink href="/admin/pages" label="Páginas" />`
   - Não deve ter `disabled` ou "(em breve)"

### **Forçar Rebuild Completo**

Se nada funcionar:

1. Vercel Dashboard → Settings → General
2. "Clear Build Cache"
3. Criar commit vazio:
   ```bash
   git commit --allow-empty -m "chore: Force complete rebuild"
   git push origin main
   ```
4. Aguardar deploy completo

## ✅ Status

- ✅ Código local correto
- ✅ Commits no GitHub
- ✅ Commit forçado para rebuild criado
- ⏳ Aguardando deploy na Vercel

---

**Última atualização:** Commit forçado para rebuild completo

