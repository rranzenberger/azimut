# ⚡ GUIA RÁPIDO: VERCEL EM 5 PASSOS

## 📍 VOCÊ PRECISA FAZER MANUALMENTE!

As variáveis do `.env` local **NÃO vão automaticamente** para o Vercel.

---

## 🚀 PASSO A PASSO:

### **1. Obter API Keys**

**Claude:**
- https://console.anthropic.com/
- Criar conta → API Keys → Create Key
- Copiar: `sk-ant-api03-...`

**DeepSeek (opcional):**
- https://platform.deepseek.com/
- Criar conta → API Keys → Create
- Copiar: `sk-...`

---

### **2. Acessar Vercel**

1. https://vercel.com/
2. Login
3. Selecionar projeto `azimut-cms`
4. Clicar em **"Settings"**

---

### **3. Adicionar Variáveis**

**Settings → Environment Variables → Add New**

**Adicionar 4 variáveis:**

| Name | Value | Environments |
|------|-------|--------------|
| `ANTHROPIC_API_KEY` | `sk-ant-api03-...` | ✅ Todos |
| `DEEPSEEK_API_KEY` | `sk-...` | ✅ Todos |
| `AI_PROVIDER` | `claude` | ✅ Todos |
| `AI_MODE` | `auto` | ✅ Todos |

**IMPORTANTE:** Marcar **Production**, **Preview** e **Development**

---

### **4. Redeploy**

**Variáveis só aplicam após redeploy!**

**Opção A (Vercel Dashboard):**
1. Deployments (menu superior)
2. Último deployment → ⋮ (3 pontos)
3. Redeploy
4. Confirmar

**Opção B (Git):**
```bash
git commit --allow-empty -m "Update env vars"
git push
```

---

### **5. Testar**

1. Aguardar deploy finalizar (2-3 min)
2. Acessar: https://seu-site.vercel.app/admin/leads
3. Clicar em um lead
4. Ver painel de IA funcionando

---

## ✅ CHECKLIST:

- [ ] Obter Claude key
- [ ] Obter DeepSeek key (opcional)
- [ ] Adicionar no Vercel (4 variáveis)
- [ ] Redeploy
- [ ] Testar

---

## ⚠️ ERROS COMUNS:

**"Adicionei mas não funciona"**
→ Fez redeploy? Só aplica após redeploy!

**"Não encontro Environment Variables"**
→ Settings → Environment Variables (menu lateral)

---

## 💡 DICA:

**Comece com mínimo:**
- `ANTHROPIC_API_KEY`
- `AI_PROVIDER=claude`

Teste. Se funcionar, adicione DeepSeek depois.

---

## 📊 CUSTO:

- Claude Sonnet: ~$2.70/mês
- DeepSeek (backup): ~$0.30/mês
- **Total: ~$3/mês**

---

**PRONTO! 5 passos e está no ar! 🚀**
