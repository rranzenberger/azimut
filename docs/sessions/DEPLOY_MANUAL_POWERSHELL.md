# Manual de Deploy no PowerShell

Siga um dos fluxos abaixo. Abra o PowerShell na pasta do projeto:

```powershell
cd C:\Users\ranz\Documents\azimut-site-vite-tailwind
```

---

## Opção 1: Deploy só do site (Vercel CLI)

Se você já tem o Vercel CLI instalado e o projeto linkado:

```powershell
# 1. Garantir que está na pasta do projeto
Set-Location C:\Users\ranz\Documents\azimut-site-vite-tailwind

# 2. Build (site + game)
npm run vercel-build

# 3. Deploy em produção
vercel --prod --yes
```

Se der erro "vercel não encontrado", instale:

```powershell
npm install -g vercel
```

Depois rode de novo os passos 2 e 3.

---

## Opção 2: Deploy via Git (Vercel faz deploy automático)

Se o projeto está conectado ao Vercel pelo Git, basta enviar para `main`:

```powershell
Set-Location C:\Users\ranz\Documents\azimut-site-vite-tailwind

Remove-Item .git\index.lock -Force -ErrorAction SilentlyContinue
git add .
git status
git commit -m "chore: deploy melhorias lighthouse e acessibilidade"
git push origin main
```

O Vercel detecta o push e faz o deploy sozinho.

---

## Opção 3: Script completo (site + backoffice)

Para rodar o script que já existe no projeto (site + backoffice):

```powershell
Set-Location C:\Users\ranz\Documents\azimut-site-vite-tailwind
.\DEPLOY_TUDO.ps1 -Force
```

Com `-Force` não pergunta se quer fazer commit/push; executa direto.

Só site (sem backoffice), sem Git:

```powershell
Set-Location C:\Users\ranz\Documents\azimut-site-vite-tailwind
.\DEPLOY_TUDO.ps1 -SkipGit
# Quando perguntar "Fazer commit e push? (S/N)", digite N
# Depois ele roda vercel --prod para o site e para o backoffice
```

---

## Resumo rápido (copiar e colar)

**Só build local (testar antes de deploy):**

```powershell
cd C:\Users\ranz\Documents\azimut-site-vite-tailwind
npm run vercel-build
```

**Deploy em produção (Vercel CLI):**

```powershell
cd C:\Users\ranz\Documents\azimut-site-vite-tailwind
npm run vercel-build
vercel --prod --yes
```

**Deploy via Git:**

```powershell
cd C:\Users\ranz\Documents\azimut-site-vite-tailwind
git add .
git commit -m "chore: deploy"
git push origin main
```
