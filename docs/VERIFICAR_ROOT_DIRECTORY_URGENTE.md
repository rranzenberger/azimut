# ⚠️ VERIFICAÇÃO URGENTE - ROOT DIRECTORY NO VERCEL

## 🎯 SE O ERRO "No Next.js version detected" PERSISTIR:

O problema provavelmente está na **configuração do Root Directory** no Vercel Dashboard, NÃO no código!

---

## 📋 PASSO A PASSO PARA VERIFICAR:

### 1. Acessar Vercel Dashboard:
- URL: https://vercel.com/dashboard
- Login: `drive.azimut@gmail.com` (via GitHub)

### 2. Entrar no Projeto:
- Projeto: **azimut-backoffice**
- Time: azimut's projects

### 3. Verificar Root Directory:
1. Ir em: **Settings** (ícone de engrenagem) → **General**
2. Procurar: **Root Directory**
3. **DEVE estar configurado como:** `azimut-cms`
   - ❌ **NÃO:** `/azimut-cms` (com barra inicial)
   - ❌ **NÃO:** `azimut-cms/` (com barra final)
   - ✅ **SIM:** `azimut-cms` (sem barras)

### 4. Se estiver ERRADO:
1. Clicar em **Edit** ao lado de Root Directory
2. Digitar: `azimut-cms`
3. Clicar em **Save**
4. Ir em **Deployments** → **Redeploy** (último deploy) → **Redeploy**

---

## 🔍 O QUE ESTÁ ACONTECENDO:

Quando o Root Directory está errado ou não configurado:
- Vercel procura `package.json` na **raiz** do repositório
- Mas nosso `package.json` está em `azimut-cms/package.json`
- Vercel não encontra → erro "No Next.js version detected"

---

## ✅ VERIFICAÇÃO ADICIONAL:

Se o Root Directory estiver correto e ainda não funcionar:

1. **Deletar o projeto e recriar:**
   - Settings → Delete Project
   - Criar novo projeto
   - Conectar ao mesmo repositório GitHub
   - **Durante criação:** configurar Root Directory = `azimut-cms`
   - Adicionar variáveis de ambiente novamente

2. **Ou fazer deploy manual via CLI:**
   ```bash
   cd azimut-cms
   vercel --prod
   ```
   Isso força o deploy da pasta correta.

---

**PRIMEIRO PASSO:** Verificar Root Directory no Vercel Dashboard!

