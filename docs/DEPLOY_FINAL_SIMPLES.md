# 🚀 Deploy Final - Site e Backoffice

## ✅ Checklist Pré-Deploy

- [x] Build do site funcionando sem erros
- [x] Vercel.json configurado
- [ ] Deploy do site principal
- [ ] Deploy do backoffice
- [ ] Configurar variáveis de ambiente

---

## 📦 **1. Deploy do Site Principal (Vite)**

### Opção A: Via Vercel CLI (Recomendado)

```powershell
# 1. Instalar Vercel CLI (se não tiver)
npm i -g vercel

# 2. Login na Vercel
vercel login

# 3. Deploy (na pasta raiz do projeto)
vercel

# 4. Deploy para produção
vercel --prod
```

### Opção B: Via Dashboard da Vercel

1. Acesse: https://vercel.com/new
2. Conecte seu repositório GitHub OU faça upload direto
3. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `/` (raiz)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Clique em **"Deploy"**

**Variáveis de Ambiente (se necessário):**
- `VITE_CMS_API_URL` (se o backoffice estiver integrado)

---

## 🔧 **2. Deploy do Backoffice (azimut-cms)**

### Via Vercel CLI

```powershell
# 1. Ir para pasta do CMS
cd azimut-cms

# 2. Deploy
vercel

# 3. Deploy para produção
vercel --prod
```

### Configurações no Dashboard Vercel:

- **Framework Preset:** Next.js
- **Root Directory:** `azimut-cms`
- **Build Command:** `npm run build` (já inclui `prisma generate`)
- **Output Directory:** `.next`

### Variáveis de Ambiente Necessárias:

Configure no dashboard da Vercel (Settings → Environment Variables):

```
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://seu-backoffice.vercel.app
NEXTAUTH_SECRET=seu-secret-aqui
DEEPSEEK_API_KEY=sk-... (opcional)
```

---

## 🔗 **3. Conectar Site ao Backoffice**

Após deploy do backoffice, anote a URL: `https://azimut-cms.vercel.app`

No site principal, adicione variável de ambiente:

```
VITE_CMS_API_URL=https://azimut-cms.vercel.app/api
```

---

## ✅ **4. Verificação Pós-Deploy**

### Site Principal:
- [ ] Site carrega corretamente
- [ ] Todas as páginas funcionam
- [ ] Imagens carregam
- [ ] Responsivo funciona
- [ ] SEO/metadados OK

### Backoffice:
- [ ] Login funciona
- [ ] Dashboard carrega
- [ ] Consegue editar conteúdo
- [ ] API responde (`/api/public/content`)

---

## 📝 **Comandos Úteis**

```powershell
# Ver logs do deploy
vercel logs

# Ver deployments
vercel ls

# Remover deploy antigo
vercel rm <deployment-url>

# Re-deploy
vercel --prod --force
```

---

## 🆘 **Problemas Comuns**

### Build falha:
- Verificar erros no console
- Limpar cache: `rm -rf node_modules dist && npm install`

### Variáveis de ambiente não funcionam:
- Verificar se começam com `VITE_` no site principal
- No backoffice Next.js, pode usar qualquer nome

### Deploy do CMS falha:
- Verificar se `DATABASE_URL` está configurada
- Verificar se `prisma generate` roda no build

---

**🎉 Pronto! Site e Backoffice no ar!**

