# Deploy não inicia na Vercel após push

Se o .bat rodou (commit + push) mas o Vercel não mostra um **novo** deploy, faça o seguinte.

---

## 1. Conferir na Vercel (projeto do site)

1. Abra o projeto no Vercel: **azimut** (ou o nome do projeto do site).
2. Vá em **Settings** → **Git**.
3. Confirme:
   - **Repository:** `rranzenberger/azimut`
   - **Production Branch:** `main`
4. Se "Production Branch" estiver diferente (ex.: `master`), mude para **main** e salve.

---

## 2. Ver se apareceu um deploy novo (mesmo falhado)

1. Aba **Deployments**.
2. Veja se existe um deploy **novo** (minutos atrás) com commit `4cd509e` ou "chore: Forcar redeploy Vercel".
3. Se existir e estiver **Failed**, clique nele e veja o **Build Logs** para o erro.
4. Se **não** existir nenhum deploy novo, o push não está disparando o deploy (veja passo 3).

---

## 3. Disparar deploy manualmente (sempre funciona)

Na Vercel, na aba **Deployments**:

1. Clique nos **três pontinhos** (⋮) do deploy que está como **Production / Current**.
2. Escolha **Redeploy**.
3. Marque **Use existing Build Cache** se quiser mais rápido, ou desmarque para build do zero.
4. Clique em **Redeploy**.

Isso gera um **novo** deploy a partir do código atual do Git (último commit da branch de produção).

---

## 4. Conferir integração GitHub → Vercel

Se nunca aparece deploy novo ao dar push:

1. No **GitHub**: repositório `rranzenberger/azimut` → **Settings** → **Webhooks**.
2. Veja se existe um webhook para a Vercel (URL contém `vercel.com`).
3. Se não existir, na **Vercel**: projeto → **Settings** → **Git** → **Disconnect** e depois **Connect Git Repository** de novo para recriar o webhook.

---

## 5. Resumo

| Situação | Ação |
|----------|------|
| Deploy novo existe mas **falhou** | Ver Build Logs do deploy e corrigir o erro. |
| **Nenhum** deploy novo após push | Conferir Production Branch = `main` e webhook GitHub; ou usar **Redeploy** manual. |
| Quer atualizar **agora** | Deployments → ⋮ no deploy atual → **Redeploy**. |
