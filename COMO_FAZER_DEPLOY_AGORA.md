# 🚀 Como Fazer Deploy dos Ajustes de Hoje

## 📋 O Que Precisa Ser Deployado

- ✅ Menu lateral sempre visível
- ✅ Logo no topo do backoffice
- ✅ UI melhorada (tamanhos, espaçamentos)

---

## 🔧 Opção 1: Deploy via GitHub (Recomendado)

Se o projeto `azimut-backoffice` na Vercel está conectado ao GitHub:

### Passo 1: Verificar se está no repositório correto

O CMS pode estar em um repositório GitHub separado chamado `azimut-backoffice`.

**Verifique:**
1. Acesse: https://github.com
2. Procure pelo repositório: `azimut-backoffice` ou `rranzenberger/azimut-backoffice`
3. Se encontrar, esse é o repositório do CMS

### Passo 2: Commit e Push

**Se o CMS está em repositório separado:**

```powershell
# Navegar para o diretório do CMS (se tiver repositório git próprio)
cd azimut-cms

# Adicionar mudanças
git add .

# Commit
git commit -m "feat: Adicionar menu lateral e logo no backoffice"

# Push
git push origin main
```

**Se o CMS está no mesmo repositório:**

```powershell
# Na raiz do projeto
git add azimut-cms/app/admin/ azimut-cms/public/logo-topo-site.svg

# Commit
git commit -m "feat: Adicionar menu lateral e logo no backoffice"

# Push
git push origin main
```

### Passo 3: Vercel faz deploy automático

Após o push, a Vercel detecta as mudanças e faz deploy automaticamente!

**Verificar:**
1. Acesse: https://vercel.com
2. Projeto: `azimut-backoffice`
3. Vá em: Deployments
4. Aguarde o novo deploy aparecer

---

## 🔧 Opção 2: Deploy Manual via Vercel CLI

Se preferir fazer deploy manual:

### Passo 1: Instalar Vercel CLI (se não tiver)

```powershell
npm i -g vercel
```

### Passo 2: Fazer login

```powershell
vercel login
```

### Passo 3: Deploy

```powershell
cd azimut-cms
vercel --prod
```

---

## 🔧 Opção 3: Deploy via Interface da Vercel

1. Acesse: https://vercel.com
2. Vá em: Projeto `azimut-backoffice`
3. Vá em: Deployments
4. Clique em: **"Redeploy"** no último deploy
5. Ou: Conecte o repositório GitHub e faça push

---

## ✅ Verificar Após Deploy

Após o deploy completar:

1. **Acesse:** `https://backoffice.azmt.com.br/admin`
2. **Verifique:**
   - ✅ Menu lateral aparece à esquerda
   - ✅ Logo aparece no topo (ou texto "Azimut CMS")
   - ✅ Navegação funciona
   - ✅ UI está melhorada

---

## 🐛 Problemas Comuns

### Logo não aparece:
- Verifique se `logo-topo-site.svg` está em `azimut-cms/public/`
- Verifique se o arquivo foi commitado e está no repositório

### Menu não aparece:
- Verifique se `layout.tsx` foi commitado
- Verifique os logs do build na Vercel

### Erro no build:
- Acesse: Vercel → Deployments → Build Logs
- Procure por erros de importação ou sintaxe

---

## 📝 Checklist

- [ ] Mudanças commitadas
- [ ] Push para GitHub (se usar auto-deploy)
- [ ] Deploy iniciado na Vercel
- [ ] Build completado com sucesso
- [ ] Testado em produção
- [ ] Logo aparece
- [ ] Menu lateral aparece
- [ ] Navegação funciona

---

**Qual opção você prefere usar?** 🤔

