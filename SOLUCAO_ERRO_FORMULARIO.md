# 🔧 SOLUÇÃO: Erro "Failed to fetch" no Formulário

## 🎯 PROBLEMA IDENTIFICADO

O formulário está dando erro "Failed to fetch" porque:
1. **Localhost**: Tentando conectar em `http://localhost:3001` mas o backoffice não está rodando
2. **Produção**: Pode estar com URL errada ou backoffice não acessível

---

## ✅ SOLUÇÕES

### **OPÇÃO 1: Configurar .env para Produção (RECOMENDADO)**

Edite o arquivo `.env` na raiz do projeto:

```env
# Para PRODUÇÃO (site deployado)
VITE_API_URL=https://backoffice.azmt.com.br
VITE_API_KEY=

# Para DESENVOLVIMENTO (backoffice local rodando)
# VITE_API_URL=http://localhost:3001
```

**Após mudar:**
- Reiniciar servidor: `npm run dev`
- Fazer hard refresh: `Ctrl + Shift + R`

---

### **OPÇÃO 2: Rodar Backoffice Localmente**

Se quiser testar localmente:

1. **Abra outro terminal**
2. **Entre no diretório do backoffice:**
   ```bash
   cd azimut-cms
   npm install
   npm run dev
   ```

3. **Backoffice rodará em:** `http://localhost:3001`

4. **No site principal, mantenha:**
   ```env
   VITE_API_URL=http://localhost:3001
   ```

---

### **OPÇÃO 3: Usar Email Direto (Temporário)**

Se a API não estiver funcionando, o formulário agora mostra:
- 📧 Email: contact@azmt.com.br
- 📱 WhatsApp: +55 (48) 99970-1301

O usuário pode clicar nesses links para entrar em contato diretamente.

---

## 🔍 VERIFICAÇÃO

Para verificar se está funcionando:

1. **Abra o Console do navegador** (F12)
2. **Procure por:**
   - ✅ `📤 Enviando lead para: https://backoffice.azmt.com.br/api/leads`
   - ❌ Erros vermelhos de CORS ou Network

---

## 🚀 PARA PRODUÇÃO (Vercel)

Configure as variáveis de ambiente na Vercel:

1. **Vercel Dashboard** → Seu Projeto → Settings → Environment Variables
2. **Adicione:**
   ```
   VITE_API_URL=https://backoffice.azmt.com.br
   VITE_API_KEY=<sua-chave-secreta>
   ```
3. **Redeploy** o projeto

---

## 📝 NOTA IMPORTANTE

O formulário **não quebra o site** se a API falhar. Ele mostra uma mensagem útil com opções de contato direto, então o usuário sempre tem uma forma de entrar em contato.
