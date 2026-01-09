# 🔧 Configuração API - Localhost

## ✅ PROBLEMA RESOLVIDO

**Erro anterior em localhost:**
```
Erro ao enviar
Não foi possível conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde.
```

**Causa:** O formulário tentava conectar ao backoffice local (`http://localhost:3001`) que não estava rodando.

**Solução:** Agora o formulário **sempre usa o backoffice de produção** (`https://backoffice.azmt.com.br`), mesmo em localhost.

---

## 🚀 Como funciona agora

### Em Localhost (Desenvolvimento)
- ✅ Formulário envia leads para: `https://backoffice.azmt.com.br/api/leads`
- ✅ Leads são salvos no banco de produção (Neon)
- ✅ Você pode testar o formulário sem rodar o backoffice local
- ✅ Leads enviados em localhost aparecem no CRM de produção

### Em Produção (Vercel)
- ✅ Formulário envia leads para: `https://backoffice.azmt.com.br/api/leads`
- ✅ Mesma configuração de localhost
- ✅ Tudo funciona de forma consistente

---

## 🧪 Para testar agora em localhost

1. **Pare o servidor Vite** (se estiver rodando):
   ```bash
   Ctrl + C
   ```

2. **Inicie novamente:**
   ```bash
   npm run dev
   ```

3. **Acesse o formulário:**
   ```
   http://localhost:1753/pt/contact
   ```

4. **Preencha todos os campos obrigatórios:**
   - Nome completo *
   - Email *
   - Nome da Organização *
   - Você representa * (dropdown)
   - Tipo de Projeto * (dropdown)
   - Budget Disponível * (dropdown)
   - Quando precisa estar pronto * (dropdown)
   - ☑️ Aceito receber contato da Azimut sobre meu projeto *

5. **Clique em "ENVIAR SOLICITAÇÃO"**

6. **Deve aparecer:**
   ```
   ✅ Solicitação Enviada!
   Recebemos sua solicitação. Responderemos em até 24 horas úteis.
   ```

---

## 📊 Verificar no CRM

Após enviar o formulário, verifique se o lead apareceu:

1. Acesse: https://backoffice.azmt.com.br/login
2. Faça login
3. Vá em: **CRM → Leads**
4. O lead deve aparecer na lista

---

## 🔒 Configuração Opcional (`.env`)

Se quiser customizar, crie um arquivo `.env` na raiz do projeto:

```env
# URL do Backoffice (opcional - já usa produção por padrão)
VITE_API_URL=https://backoffice.azmt.com.br

# Features opcionais (desabilitados por padrão)
VITE_ENABLE_AI_SUGGESTIONS=false
VITE_ENABLE_TRACKING=false
```

---

## ⚠️ IMPORTANTE

- **Leads de teste:** Como agora usa produção, leads enviados em localhost vão para o banco real
- **Solução:** Delete leads de teste manualmente no CRM se necessário
- **Alternativa:** Identifique leads de teste pelo nome (ex: "Teste Localhost")

---

## 🚀 Deploy na Vercel

O código já está pronto e commitado. Quando fizer deploy na Vercel:

1. ✅ O formulário continuará funcionando normalmente
2. ✅ Não precisa configurar nada na Vercel (já usa produção por padrão)
3. ✅ Tudo está automático

---

**Teste agora em localhost e confirme se funciona!** 🎉
