# 🔍 Verificar se Deploy é Automático

## ❓ O Deploy Já Sobe Automaticamente?

**Depende!** Precisa verificar se o projeto está conectado ao GitHub.

---

## ✅ Como Verificar

### Passo 1: Acessar Vercel
1. Acesse: https://vercel.com
2. Faça login

### Passo 2: Verificar Projeto
1. Vá em: **Projeto `azimut-backoffice`**
2. Clique em: **Settings** (Configurações)
3. Clique em: **Git** (no menu lateral)

### Passo 3: Verificar Conexão

**Se aparecer:**
- ✅ **Repository:** `rranzenberger/azimut-backoffice` (ou similar)
- ✅ **Production Branch:** `main` (ou `master`)
- ✅ **Auto-deploy:** Enabled

**Então SIM, o deploy é automático!** 🎉

**Se aparecer:**
- ❌ **No Git Repository connected**
- ❌ Ou não aparecer nada

**Então NÃO, precisa fazer deploy manual ou conectar o repositório.**

---

## 🚀 Se Estiver Conectado (Deploy Automático)

### Como Funciona:
1. Você faz commit e push no GitHub
2. Vercel detecta automaticamente
3. Faz build e deploy automaticamente
4. Pronto! 🎉

### O Que Fazer:
```powershell
# Commit as mudanças
git add azimut-cms/
git commit -m "feat: Adicionar menu lateral e logo"
git push

# A Vercel faz o resto automaticamente!
```

### Verificar Deploy:
1. Acesse: Vercel → Deployments
2. Você verá um novo deploy aparecendo
3. Aguarde completar (2-3 minutos)

---

## 🔧 Se NÃO Estiver Conectado (Deploy Manual)

### Opção 1: Conectar Repositório (Recomendado)
1. Vercel → Settings → Git
2. Clique em: **Connect Git Repository**
3. Escolha o repositório do GitHub
4. Configure branch (geralmente `main`)
5. Pronto! Agora é automático

### Opção 2: Deploy Manual
```powershell
cd azimut-cms
npx vercel --prod
```

---

## 📋 Checklist

- [ ] Verificar se projeto está conectado ao GitHub
- [ ] Se SIM: Fazer commit e push
- [ ] Se NÃO: Conectar repositório ou fazer deploy manual
- [ ] Aguardar deploy completar
- [ ] Testar em produção

---

**Verifique na Vercel se o projeto está conectado ao GitHub!** 🔍

