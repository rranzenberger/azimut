# Backoffice: backoffice.azmt.com.br abrindo o site em vez do login

## O que está acontecendo

Ao acessar **https://backoffice.azmt.com.br/en/login** (ou só **backoffice.azmt.com.br**), aparece o **site** (HOME, SOLUTIONS, WORK, etc.) em vez da tela de **login do backoffice**.

O domínio **backoffice.azmt.com.br** já está no projeto certo na Vercel (**azimut-backoffice**). O problema é o aviso **"DNS Change Recommended"**: o DNS desse domínio **não está apontando para a Vercel**, então o navegador resolve para outro servidor (que entrega o site). Não é erro de compilação nem de código.

---

## Correção: ajustar o DNS do domínio

É preciso configurar o DNS de **backoffice.azmt.com.br** para apontar para a Vercel.

### 1. Ver o que a Vercel recomenda

1. No projeto **azimut-backoffice**, vá em **Settings** → **Domains**.
2. Clique em **Edit** (ou no nome) do domínio **backoffice.azmt.com.br**.
3. A Vercel vai mostrar o registro que você deve criar, por exemplo:
   - **Tipo:** CNAME  
   - **Nome:** `backoffice` (ou o subdomínio que você usa)  
   - **Valor:** algo como `cname.vercel-dns.com` (o valor exato aparece na tela).

Anote **Nome** e **Valor** (Target).

### 2. Configurar no provedor de DNS (onde está azmt.com.br)

No painel onde você gerencia o domínio **azmt.com.br** (Registro.br, Cloudflare, GoDaddy, etc.):

1. Abra a zona DNS de **azmt.com.br**.
2. Localize o registro **CNAME** do subdomínio **backoffice**.
3. **Edite** o registro e coloque exatamente o valor que a Vercel mostra em **Value** (ex.: `f5266a7ed9403442.vercel-dns-017.com` — o seu pode ser outro; use o que aparece em Edit do domínio na Vercel).
   - **Tipo:** CNAME  
   - **Nome/Host:** `backoffice`  
   - **Valor/Destino:** o valor atual que a Vercel recomenda (não use mais `cname.vercel-dns.com`; a Vercel mudou e recomenda um valor novo, ex. `xxx.vercel-dns-017.com`).  
   - **TTL:** 3600 ou padrão.
4. Salve.

**Se já tinha configurado no fim de semana:** a Vercel alterou o valor recomendado (“IP range expansion”). Atualize o CNAME para o **novo** Value que aparece em Settings → Domains → Edit no domínio backoffice.azmt.com.br.

### 3. Aguardar e conferir na Vercel

- A propagação do DNS pode levar de alguns minutos a 24 horas.
- Na Vercel, em **Domains**, clique em **Refresh** no domínio **backoffice.azmt.com.br**.
- Quando o DNS estiver correto, o aviso **"DNS Change Recommended"** some e aparece algo como **"Valid Configuration"**.

Depois disso, **https://backoffice.azmt.com.br** e **https://backoffice.azmt.com.br/login** passam a abrir o backoffice.

---

## O que foi ajustado no código (backoffice)

No backoffice (azimut-cms) foi configurado:

- **Middleware:** acesso a **/en/login**, **/pt/login**, **/es/login**, **/fr/login** passa a **redirecionar para /login**.

Assim, quando o domínio estiver correto, **https://backoffice.azmt.com.br/en/login** vai redirecionar para **https://backoffice.azmt.com.br/login** e mostrar a tela de login do backoffice.

---

## Resumo

| Problema | Causa | Solução |
|----------|--------|---------|
| backoffice.azmt.com.br mostra o site | DNS não aponta para a Vercel ("DNS Change Recommended") | No provedor de DNS do domínio, criar/editar o CNAME **backoffice** com o valor que a Vercel mostra em Edit no domínio. |
| /en/login não abre o login | Backoffice não tratava /:lang/login | Já ajustado no código: redirect para /login no middleware. |

**Não é erro de compilação.** O backoffice está no projeto certo; falta só o DNS apontar para a Vercel. Depois do DNS correto, teste **https://backoffice.azmt.com.br/login** e **https://backoffice.azmt.com.br/en/login**.
