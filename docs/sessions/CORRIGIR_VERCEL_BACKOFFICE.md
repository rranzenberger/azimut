# Corrigir erro de deploy do Backoffice (path não existe)

## Erro
`The provided path ...\azimut-cms\azimut-cms does not exist`

## Causa
O projeto **azimut-backoffice** na Vercel está com **Root Directory** = `azimut-cms`.  
O script já roda *dentro* da pasta `azimut-cms`; a Vercel soma o Root Directory e procura `azimut-cms/azimut-cms` (que não existe).

## Solução (uma vez só)

1. Abra as configurações do projeto backoffice:  
   **https://vercel.com/azimuts-projects-6435f869/azimut-backoffice/settings**
2. Em **General** → **Root Directory**
3. Apague o valor `azimut-cms` e deixe o campo **vazio** (ou use `.`)
4. Clique em **Save**

Depois rode de novo **RODAR_DEPLOY_TUDO.bat** (ou `.\DEPLOY_TUDO.ps1`). O backoffice deve subir sem esse erro.
