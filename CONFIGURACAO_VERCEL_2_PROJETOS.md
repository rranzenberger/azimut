# 🚀 Configuração dos 2 Projetos no Vercel

## 📋 ESTRUTURA DO REPOSITÓRIO

```
azimut-backoffice/
├── src/                    ← Site Vite (React)
├── public/
├── vite.config.ts
├── package.json           ← Projeto 1: Site Principal
├── vercel.json            ← Config Site Vite
├── .vercelignore          ← Ignora pasta azimut-cms
└── azimut-cms/            ← Backoffice Next.js
    ├── app/
    ├── prisma/
    ├── package.json       ← Projeto 2: Backoffice
    ├── vercel.json        ← Config Next.js
    └── .vercelignore
```

---

## 🎯 PROJETO 1: SITE PRINCIPAL (VITE)

### Configuração no Vercel Dashboard:

1. **Acesse**: https://vercel.com/dashboard
2. **Selecione o projeto**: `azimut` (ou nome atual do site)
3. **Settings** → **General**

#### ⚙️ Configurações Obrigatórias:

- **Framework Preset**: `Other` (ou `Vite`)
- **Root Directory**: `.` (deixar vazio ou ponto)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### 🌐 Domínios:
- `azmt.com.br` ✅
- `www.azmt.com.br` (opcional)

#### 📂 Arquivo .vercelignore (RAIZ):
```
# Ignorar pasta do backoffice (projeto separado)
azimut-cms/
```

#### 📄 Arquivo vercel.json (RAIZ):
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "handle": "filesystem"
    },
    {
      "src": "/.*",
      "dest": "/index.html"
    }
  ]
}
```

---

## 🎯 PROJETO 2: BACKOFFICE (NEXT.JS)

### Configuração no Vercel Dashboard:

1. **Acesse**: https://vercel.com/dashboard
2. **Selecione o projeto**: `azimut-cms` (ou nome do backoffice)
3. **Settings** → **General**

#### ⚙️ Configurações Obrigatórias:

- **Framework Preset**: `Next.js`
- **Root Directory**: `azimut-cms` ⚠️ **IMPORTANTE!**
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

#### 🌐 Domínios:
- `enberger.com` ✅ (ou outro domínio)
- `admin.azmt.com.br` (sugestão)

#### 📄 Arquivo vercel.json (azimut-cms/):
```json
{
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "framework": "nextjs",
  "outputDirectory": ".next"
}
```

---

## 🔧 PASSO A PASSO PARA CORRIGIR AGORA:

### 1️⃣ **Verificar qual projeto está em `azmt.com.br`**

No Vercel Dashboard:
- Vá em **Projects**
- Clique no projeto que tem `azmt.com.br`
- Vá em **Settings** → **General**
- **Root Directory** deve estar em `.` (vazio/raiz)

### 2️⃣ **Se estiver errado:**

Se o **Root Directory** estiver em `azimut-cms`:

1. Mude para `.` (vazio ou ponto)
2. Mude **Framework** para `Other` ou `Vite`
3. Clique em **Save**
4. Vá em **Deployments**
5. Clique em **Redeploy** (sem usar cache)

### 3️⃣ **Verificar projeto do Backoffice**

No outro projeto:
- **Root Directory** = `azimut-cms` ⚠️
- **Framework** = `Next.js`

---

## ✅ TESTE APÓS CONFIGURAR:

### Site Principal (Vite):
```
https://azmt.com.br/login
```
✅ Deve mostrar página de login com olhinho 👁️

### Backoffice (Next.js):
```
https://enberger.com/login
```
✅ Deve mostrar login do backoffice

---

## 🚨 PROBLEMAS COMUNS:

### Problema: "404 em /login"
**Causa**: Root Directory errado
**Solução**: Verificar se está apontando para a pasta correta

### Problema: "Build falha"
**Causa**: Dependências erradas (instalando do projeto errado)
**Solução**: Root Directory deve isolar cada projeto

### Problema: "Deploy demora muito"
**Causa**: Fazendo build de ambos os projetos
**Solução**: .vercelignore correto em cada projeto

---

## 📞 PRÓXIMOS PASSOS:

1. Verifique a configuração do projeto em `azmt.com.br`
2. Se **Root Directory** estiver errado, corrija
3. Faça **Redeploy** sem cache
4. Aguarde 1-2 minutos
5. Teste: https://azmt.com.br/login

**O olhinho deve aparecer! 👁️**

