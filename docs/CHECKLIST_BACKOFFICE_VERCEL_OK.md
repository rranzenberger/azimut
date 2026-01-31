# Checklist: backoffice (azimut-backoffice) no Vercel

**Objetivo:** Garantir que **backoffice.azmt.com.br** use o projeto **azimut-backoffice** e que o build passe.

---

## ✅ O que já está certo no código (verificado)

| Item | Status | Onde |
|------|--------|------|
| Pasta `app/` existe | ✅ | `azimut-cms/app/` |
| Script `vercel-build` | ✅ | `azimut-cms/package.json`: `prisma generate && next build` |
| Framework Next.js no vercel.json | ✅ | `azimut-cms/vercel.json`: `"framework": "nextjs"` |
| Crons (email-sequences) | ✅ | `azimut-cms/vercel.json` |

O erro "Couldn't find any 'pages' or 'app' directory" no Vercel acontecia porque o build rodava na **raiz do repo** em vez de dentro de `azimut-cms`. A correção é feita nas **configurações do projeto no Vercel**, não no código.

---

## ✅ O que você precisa no Vercel (projeto azimut-backoffice)

### Build and Deployment (Settings → Build and Deployment)

| Campo | Valor correto |
|-------|----------------|
| **Root Directory** | *(vazio)* |
| **Install Command** (Override ON) | `cd azimut-cms && npm install` |
| **Build Command** (Override ON) | `cd azimut-cms && npm run vercel-build` |

### Depois de salvar

1. **Deployments** → no deploy com status **Error** → **⋯** → **Redeploy**.
2. Opcional: desmarque **Use existing Build Cache**.
3. Espere o build terminar (status **Ready**).

---

## ⚠️ Se o próximo build falhar com erro do Prisma

Se aparecer algo como **"Invalid client engine type"** ou erro relacionado ao Prisma no build do Vercel:

1. No Vercel: **Settings** → **Environment Variables**.
2. Confira se existe **PRISMA_CLIENT_ENGINE_TYPE**.
3. Se não existir, crie: nome `PRISMA_CLIENT_ENGINE_TYPE`, valor `library` (para serverless).
4. Se existir com valor `binary` e o build falhar, mude para `library` e faça **Redeploy** de novo.

---

## Resumo

- **Código:** pasta `app/`, `vercel-build` e `vercel.json` estão corretos.
- **Vercel:** Root vazio + Install/Build com `cd azimut-cms && ...` (já configurado por você).
- **Próximo passo:** **Redeploy** no Vercel (só você pode clicar; o assistente não acessa o painel).
- **Se der erro de Prisma:** usar `PRISMA_CLIENT_ENGINE_TYPE=library` nas variáveis de ambiente.

Depois do Redeploy com sucesso, **backoffice.azmt.com.br** deve abrir a tela de login.
