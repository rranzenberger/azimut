# ✅ SOLUÇÃO CORRETA - ROOT DIRECTORY

## ❌ ERRO ATUAL:

```
The 'vercel.json' schema validation failed with the following message: 
should NOT have additional property 'rootDirectory'
```

**Causa:** O `vercel.json` **NÃO aceita** a propriedade `rootDirectory`. Essa propriedade deve ser configurada **APENAS no Dashboard do Vercel**.

---

## ✅ SOLUÇÃO CORRETA:

### 1. Remover `rootDirectory` do vercel.json ✅
Já feito - o `vercel.json` agora está sem essa propriedade.

### 2. Configurar Root Directory no Vercel Dashboard ⚠️ **CRÍTICO!**

**PASSO A PASSO:**

1. **Acesse:** https://vercel.com/dashboard
2. **Entre no projeto:** azimut-backoffice
3. **Vá em:** Settings (ícone de engrenagem) → **General**
4. **Procure:** **Root Directory**
5. **Configure como:** `azimut-cms` (sem barras, sem ponto)
6. **Clique em:** Save
7. **Faça Redeploy:** Deployments → Último deploy → Redeploy

---

## 🔍 POR QUE É NECESSÁRIO:

- O Vercel procura `package.json` na **raiz** do repositório por padrão
- Nosso `package.json` está em `azimut-cms/package.json`
- Sem o Root Directory configurado, o Vercel não encontra o Next.js
- **Root Directory** diz ao Vercel: "use `azimut-cms/` como raiz do projeto"

---

## 📋 VERIFICAÇÃO FINAL:

Após configurar no Dashboard:
1. ✅ Root Directory = `azimut-cms`
2. ✅ vercel.json sem `rootDirectory`
3. ⏳ Fazer Redeploy
4. ⏳ Verificar se build passa

---

**STATUS:** ✅ vercel.json corrigido - **AGORA CONFIGURAR NO DASHBOARD DO VERCEL!**

