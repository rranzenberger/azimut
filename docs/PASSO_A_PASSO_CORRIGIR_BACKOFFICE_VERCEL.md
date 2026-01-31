# Passo a passo: corrigir deploy do backoffice (azimut-backoffice)

Para **backoffice.azmt.com.br** funcionar, o projeto Vercel **azimut-backoffice** precisa buildar corretamente. Siga os passos abaixo.

---

## Passo 1 – Abrir o projeto no Vercel

1. Acesse: **https://vercel.com**
2. Faça login se precisar.
3. Na lista de projetos, clique em **azimut-backoffice** (não clique em azimut-cms).

---

## Passo 2 – Ir em Build and Deployment

1. No topo da página do projeto **azimut-backoffice**, clique na aba **Settings**.
2. No menu lateral esquerdo, clique em **Build and Deployment** (segundo item no menu lateral, abaixo de General — é nessa tela que aparecem Root Directory, Install Command e Build Command; não fique só em **General** (em “Build & Development” ou “Project Settings”).

---

## Passo 3 – Ajustar Root Directory

1. Procure o campo **Root Directory**.
2. Se tiver algum valor (por exemplo `azimut-cms`), **apague tudo** e deixe o campo **vazio**.
3. Não salve ainda; vá para o passo 4.

---

## Passo 4 – Ajustar Install Command

1. Procure o campo **Install Command** (pode estar em “Override” ou “Build Command”).
2. Se estiver vazio ou com outro valor, **digite exatamente**:
   ```bash
   cd azimut-cms && npm install
   ```
3. Não salve ainda; vá para o passo 5.

---

## Passo 5 – Ajustar Build Command

1. Procure o campo **Build Command**.
2. Se estiver vazio ou com outro valor, **digite exatamente**:
   ```bash
   cd azimut-cms && npm run vercel-build
   ```
3. Vá para o passo 6.

---

## Passo 6 – Salvar

1. Role até o final da página (se precisar).
2. Clique no botão **Save**.
3. Espere a mensagem de que as configurações foram salvas.

---

## Passo 7 – Fazer o Redeploy

1. Clique na aba **Deployments** (no topo).
2. Na lista, localize o deploy mais recente que está com status **Error** (vermelho).
3. À direita desse deploy, clique nos **três pontinhos (⋯)**.
4. No menu que abrir, clique em **Redeploy**.
5. Na janela de confirmação:
   - Opcional: desmarque **Use existing Build Cache** (para um build limpo).
   - Clique em **Redeploy** para confirmar.
6. Espere o build terminar (pode levar 1–2 minutos). O status deve mudar para **Ready** (verde).

---

## Passo 8 – Testar o backoffice

1. Abra no navegador: **https://backoffice.azmt.com.br**
2. Ou use o domínio do Vercel: **https://azimut-backoffice-xxxxx.vercel.app** (o que aparecer nos Deployments).
3. Você deve ver a tela de **login** do backoffice (não mais 404 ou erro de deploy).

---

## Resumo do que foi alterado

| Campo            | Valor |
|------------------|--------|
| Root Directory   | *(vazio)* |
| Install Command  | `cd azimut-cms && npm install` |
| Build Command    | `cd azimut-cms && npm run vercel-build` |

---

## Se ainda der erro

- Confira se você está editando o projeto **azimut-backoffice** (e não azimut-cms).
- Confira se os comandos foram copiados **exatamente** (com `cd azimut-cms &&` no início).
- Em **Deployments** → clique no deploy que falhou → aba **Logs** e veja a mensagem de erro; se for outra, envie a mensagem para ajustar o próximo passo.

---

## Link direto para as configurações

**https://vercel.com/azimuts-projects-6435f869/azimut-backoffice/settings**

(Abra esse link já logado no Vercel para ir direto ao projeto azimut-backoffice → Settings.)
