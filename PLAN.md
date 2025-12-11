## Plan to fix backoffice deploy errors
1) Revisar erro atual no build
- Erro em `src/lib/image-optimizer.ts`: conversão de Record<string, string> para `OptimizedUrls` (faltam propriedades obrigatórias).

2) Ajustar tipos em image-optimizer
- Tipar `urls` como `OptimizedUrls` inicializando todas as chaves: original, thumbnail, small, medium, large, webp (strings vazias) e avif opcional.
- Remover cast forçado; retornar `urls` já tipado.

3) Garantir variáveis de ambiente
- Confirmar no projeto do backoffice (Vercel) se estão setadas: `DATABASE_URL`, `JWT_SECRET`, `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.

4) Redeploy
- Rodar redeploy após o ajuste e verificar se o build passa.

