# Deploy do backoffice no projeto **azimut-backoffice**

**Importante:** Usamos o projeto Vercel **azimut-backoffice** (backoffice.azmt.com.br). Não existe projeto “azimut-cms” no Vercel — o código do backoffice fica na **pasta** `azimut-cms` do repo e é deployado no **projeto** **azimut-backoffice**.

O backoffice deve ser deployado no projeto Vercel **azimut-backoffice** (onde estão DATABASE_URL, Neon, variáveis, etc.).

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

## Deploy via CLI (pasta `azimut-cms`)

Se quiser deploy pela CLI a partir da pasta do backoffice:

1. **Root Directory** no projeto **azimut-backoffice** deve estar **vazio** (e Install/Build Command como acima).
2. Ou, se Root Directory = `azimut-cms`, limpe-o só para o deploy CLI; depois volte para `azimut-cms` se usar Git.

```powershell
cd azimut-cms
vercel link --yes --project azimut-backoffice
vercel --prod --yes
```

---

## Resumo dos projetos

| Projeto Vercel      | Uso                         | Config recomendada |
|---------------------|-----------------------------|----------------------|
| **azimut**          | Site + game (azmt.com.br)   | Root vazio, build padrão |
| **azimut-backoffice** | Backoffice (Neon, env vars) | Root vazio + Install/Build com `cd azimut-cms && ...` |
