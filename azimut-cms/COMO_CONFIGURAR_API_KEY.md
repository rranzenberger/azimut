# 🔑 Como Configurar ANTHROPIC_API_KEY

## ⚠️ ERRO: "invalid x-api-key"

Se você está vendo este erro, a chave da API do Anthropic não está configurada.

---

## ✅ SOLUÇÃO RÁPIDA

### **Opção 1: Arquivo .env (Local)**

1. Vá até a pasta: `azimut-cms`
2. Crie um arquivo chamado `.env` (se não existir)
3. Adicione esta linha:
   ```
   ANTHROPIC_API_KEY=sua-chave-aqui
   ```
4. Substitua `sua-chave-aqui` pela sua chave real do Anthropic

---

### **Opção 2: Vercel (Produção)**

1. Acesse: https://vercel.com/dashboard
2. Selecione o projeto **`azimut-cms`** (backoffice)
3. Vá em **Settings** → **Environment Variables**
4. Clique em **Add New**
5. **Nome:** `ANTHROPIC_API_KEY`
6. **Valor:** Sua chave do Anthropic
7. **Ambientes:** Production, Preview, Development
8. Clique em **Save**
9. **IMPORTANTE:** Faça um redeploy após adicionar

---

## 🔑 ONDE PEGAR A CHAVE

1. Acesse: https://console.anthropic.com/
2. Faça login
3. Vá em **API Keys**
4. Clique em **Create Key**
5. Copie a chave gerada
6. Cole no arquivo `.env` ou no Vercel

---

## ✅ VERIFICAR SE ESTÁ FUNCIONANDO

Execute o script novamente:

```bash
cd azimut-cms
npx tsx scripts/otimizar-projetos-seo.ts
```

Se aparecer:
- ✅ `API Key configurada: ✅ Sim` → Funcionando!
- ❌ `API Key configurada: ❌ Não` → Ainda não configurado

---

## 📋 RESUMO

**Local (desenvolvimento):**
- Arquivo: `azimut-cms/.env`
- Linha: `ANTHROPIC_API_KEY=sua-chave`

**Produção (Vercel):**
- Settings → Environment Variables
- Adicionar: `ANTHROPIC_API_KEY`
- Fazer redeploy

---

## ✅ PRONTO!

Depois de configurar, execute o script novamente! 🎉
