# Corrigir erro de deploy do Backoffice (path não existe)

## Erro
`The provided path ...\azimut-cms\azimut-cms does not exist`

## Causa
O projeto **azimut-backoffice** na Vercel está com **Root Directory** = `azimut-cms`.  
Quando o script roda com `--cwd azimut-cms`, a Vercel junta e procura `azimut-cms/azimut-cms`.

## Solução (uma vez só)

1. Abra: **https://vercel.com/azimuts-projects-6435f869/azimut-backoffice/settings**
2. Em **General** → **Root Directory**
3. Apague o valor `azimut-cms` e deixe **vazio** (ou ponha `.`)
4. Salve (**Save**)

Depois rode de novo o deploy (script ou .bat). O backoffice deve subir sem esse erro.
