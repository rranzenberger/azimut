# Não consigo entrar no backoffice (Falha ao autenticar)

## Usuário e senha estão corretos

- **Email:** admin@azimut.com.br  
- **Senha:** Azimut2025!

O que falta é o **usuário existir no banco de dados** que o backoffice em produção usa (Neon/Vercel). Se o seed nunca foi rodado nesse banco, o login falha.

---

## O que fazer (em produção)

### 1. Pegar a DATABASE_URL do backoffice na Vercel

1. Abra [vercel.com](https://vercel.com) → seu time → projeto **azimut-backoffice**.
2. Vá em **Settings** → **Environment Variables**.
3. Encontre **DATABASE_URL** (ou **POSTGRES_URL**). Clique em **Edit** e copie o valor (a URL em formato `postgresql://usuario:senha@host.neon.tech/neondb?sslmode=require`).

### 2. Rodar o seed do admin na sua máquina

O script cria (ou atualiza) o usuário **admin@azimut.com.br** com a senha **Azimut2025!** no banco que você indicar.

**No PowerShell (Windows):**

```powershell
cd c:\Users\ranz\Documents\azimut-site-vite-tailwind\azimut-cms
$env:DATABASE_URL = "COLE_AQUI_A_URL_QUE_VOCE_COPIOU_DA_VERCEL"
npx tsx scripts/seed-admin-user.ts
```

Substitua `COLE_AQUI_A_URL_...` pela URL que você copiou. A URL costuma vir entre aspas na Vercel; pode colar com aspas:

```powershell
$env:DATABASE_URL = "postgresql://usuario:senha@ep-xxx.neon.tech/neondb?sslmode=require"
npx tsx scripts/seed-admin-user.ts
```

**Se preferir usar o .env:**

1. Abra `azimut-cms\.env` (ou crie a partir de `.env.example`).
2. Coloque uma linha:  
   `DATABASE_URL="postgresql://usuario:senha@host.neon.tech/neondb?sslmode=require"`  
   (use a mesma URL do projeto backoffice na Vercel).
3. No terminal, dentro de `azimut-cms`:
   ```powershell
   npx tsx scripts/seed-admin-user.ts
   ```

### 3. Conferir o resultado

- Se der certo, deve aparecer algo como: **Admin OK: admin@azimut.com.br** e **Senha redefinida para o padrão**.
- Acesse de novo o backoffice em produção (ex.: https://backoffice.azmt.com.br) e faça login com **admin@azimut.com.br** / **Azimut2025!**.

---

## Se ainda não entrar

- Confirme que a **DATABASE_URL** que você usou no script é **exatamente** a do projeto **azimut-backoffice** na Vercel (o mesmo que o deploy usa).
- Se o projeto usar **Neon**, você também pode abrir o painel do Neon → conexão do banco e conferir se a URL é a mesma.
- Depois de rodar o seed, tente login em **aba anônima** ou outro navegador, para evitar cache/cookie antigo.
