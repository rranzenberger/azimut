# ✅ Deploy Concluído! Próximos Passos

## 🎯 Passo 1: Adicionar Variáveis de Ambiente (Basic Auth)

1. Na página do projeto Vercel, clique em **"Settings"** (menu lateral)
2. Clique em **"Environment Variables"**
3. Adicione as seguintes variáveis:

```
BASIC_AUTH_ENABLED = true
BASIC_AUTH_USER = azimut
BASIC_AUTH_PASS = Azimut2025!Preview
```

4. Para cada variável, marque **Production**, **Preview** e **Development**
5. Clique em **"Save"**
6. **Importante:** Faça um novo deploy clicando em **"Deployments"** → clique nos 3 pontinhos → **"Redeploy"**

---

## 🌐 Passo 2: Adicionar Domínios

1. Na página do projeto, clique em **"Settings"** → **"Domains"**
2. Clique em **"Add Domain"**
3. Adicione os domínios um por um:
   - `azmt.com.br`
   - `www.azmt.com.br`
   - `azmt.ca`
   - `azimutimmersive.ca`
   - `azimutimmersive.com`
   - `discreet.com.br`
   - `animaparty.com`
   - `architecad.com`
   - `enberger.com`
   - (todos os outros)

4. Marque `azmt.com.br` como **Primary Domain**

---

## 🔄 Passo 3: Configurar Redirects (Opcional - Depois)

Quando quiser configurar os redirects dos domínios extras para o principal:

1. Crie arquivo `vercel.json` na raiz (se não tiver) com:
```json
{
  "redirects": [
    {
      "source": "https://azmt.ca/:path*",
      "destination": "https://azmt.com.br/:path*",
      "permanent": true
    }
  ]
}
```

2. Repita para cada domínio extra
3. Faça commit e push no GitHub
4. A Vercel fará deploy automático

---

## ✅ Pronto!

Agora o site está:
- ✅ Deployado na Vercel
- ✅ Com Basic Auth (protegido)
- ✅ Domínios configurados

**Aguarde a propagação DNS (alguns minutos) e teste!** 🚀










