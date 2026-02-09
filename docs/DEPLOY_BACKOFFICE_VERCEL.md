# Deploy do backoffice no projeto **azimut-backoffice**

**Importante:** Usamos o projeto Vercel **azimut-backoffice** (backoffice.azmt.com.br). Não existe projeto “azimut-cms” no Vercel — o código do backoffice fica na **pasta** `azimut-cms` do repo e é deployado no **projeto** **azimut-backoffice**.

O backoffice deve ser deployado no projeto Vercel **azimut-backoffice** (onde estão DATABASE_URL, Neon, variáveis, etc.).

---

## Redeploy após correções (fix build + UI premium)

**O deploy que falhou (~1h atrás)** foi do commit **b3aa7b9** (“use Prisma enums”), que quebra o build na Vercel (`Prisma.MakingOfType` não exportado). A correção já está no commit **c8bcde3** (string literals / `as const`). Para o próximo deploy passar:

1. **Enviar o código para o GitHub** (se ainda não enviou):
   ```bash
   git push origin main
   ```
2. **Na Vercel:** como os deploys automáticos podem estar atrasados, **force um novo deploy**:
   - Aba **Deployments** → botão **“Create Deployment”** (ou no deploy com erro → **⋯** → **Redeploy**).
   - Escolha o branch **main** e o **último commit** (c8bcde3 ou mais recente).
   - Opcional: desmarque **Use existing Build Cache**.
   - Confirme e aguarde o build.
3. Se fizer **push** e os automáticos estiverem ok, o deploy sobe sozinho; senão use o passo 2.

---

## Corrigir erro "Couldn't find any 'pages' or 'app' directory"

Esse erro acontece quando o build roda na **raiz do repo** em vez de dentro da pasta do backoffice (`azimut-cms`). O Next.js precisa rodar com essa pasta como raiz.

**Situação:** o que você usa é o **projeto azimut-backoffice** no Vercel (com Neon, variáveis). A correção abaixo faz o **azimut-backoffice** buildar certo.

### Passo a passo no Vercel (azimut-backoffice)

1. Abra: **https://vercel.com/azimuts-projects-6435f869/azimut-backoffice/settings**
2. Vá em **General** (Build & Development).
3. Ajuste:
   - **Root Directory:** apague o valor e deixe **vazio** (não preencha `azimut-cms`).
   - **Install Command:**  
     `cd azimut-cms && npm install`
   - **Build Command:**  
     `cd azimut-cms && npm run vercel-build`
4. Clique em **Save**.
5. Vá em **Deployments** → no último deploy (o que deu Error) → **⋯** (três pontos) → **Redeploy**.
6. Opcional: desmarque **Use existing Build Cache** para um build limpo.
7. Confirme **Redeploy** e espere terminar.

Assim o install e o build rodam **dentro de azimut-cms** e o Next.js encontra a pasta `app/`. O próximo deploy do **azimut-backoffice** deve passar e **backoffice.azmt.com.br** deve responder.

---

## Deploy via CLI (pasta `azimut-cms`) — forçar deploy com pasta correta

Para **forçar** o deploy usando a pasta correta (evitar build na raiz):

1. Abra o terminal na **raiz do repositório** (ou use o script abaixo).
2. Entre na pasta do backoffice e rode os comandos.

**Opção A – Script (recomendado)**  
- Se aparecer *"The specified token is not valid"*, execute antes no terminal: **`vercel login`**.
- Depois: dê dois cliques em **`docs/deploy/FORCAR_DEPLOY_BACKOFFICE.bat`**  
  ou no PowerShell (na raiz do repo): `.\docs\deploy\FORCAR_DEPLOY_BACKOFFICE.ps1`

**Opção B – Comandos manuais**
```powershell
cd azimut-cms
vercel link --yes --project azimut-backoffice
vercel --prod --yes
```

Assim o deploy sobe a partir de **`azimut-cms`** (onde está o `app/` e o Next.js).  
**Root Directory** no projeto **azimut-backoffice** na Vercel pode ficar vazio; para deploys via Git, use Install/Build com `cd azimut-cms && ...` como na seção acima.

---

## Resumo dos projetos

| Projeto Vercel      | Uso                         | Config recomendada |
|---------------------|-----------------------------|----------------------|
| **azimut**          | Site + game (azmt.com.br)   | Root vazio, build padrão |
| **azimut-backoffice** | Backoffice (Neon, env vars) | Root vazio + Install/Build com `cd azimut-cms && ...` |
