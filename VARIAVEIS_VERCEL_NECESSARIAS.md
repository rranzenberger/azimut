# 🔐 Variáveis de Ambiente - Vercel

## 📋 Resumo Rápido

| Projeto | Precisa Variáveis? | Quais? |
|---------|-------------------|--------|
| **Site Principal** (azimut-site-vite-tailwind) | ❌ **NÃO** | Nenhuma - funciona sem configuração |
| **Backoffice** (azimut-cms) | ✅ **SIM** | DATABASE_URL, ANTHROPIC_API_KEY, etc. |

---

## 🌐 1. Site Principal (`azimut-site-vite-tailwind`)

### ❌ NÃO PRECISA CONFIGURAR NADA NA VERCEL

**Por quê?**
- O código já usa `https://backoffice.azmt.com.br` por padrão
- Não precisa de chaves de IA (quem usa IA é o backoffice)
- Não precisa de banco de dados (usa o backoffice)
- Funciona automaticamente após o deploy

### 📝 Variáveis Disponíveis (OPCIONAIS):

Se você quiser customizar alguma coisa, pode adicionar estas variáveis na Vercel, mas **não é necessário**:

```env
# OPCIONAL - URL do backoffice (já usa produção por padrão)
VITE_API_URL=https://backoffice.azmt.com.br

# OPCIONAL - Features extras (desabilitadas por padrão)
VITE_ENABLE_AI_SUGGESTIONS=false
VITE_ENABLE_TRACKING=false
```

**Onde adicionar (se quiser):**
1. Vercel Dashboard → Projeto `azimut-site-vite-tailwind`
2. Settings → Environment Variables
3. Adicionar as variáveis acima (OPCIONAL)

---

## 🏢 2. Backoffice (`azimut-cms`)

### ✅ JÁ CONFIGURADO - NÃO PRECISA FAZER NADA

Você já configurou estas variáveis no backoffice:

#### ✅ Variáveis Obrigatórias (JÁ CONFIGURADAS):
```env
# Banco de Dados (Neon.tech)
DATABASE_URL=postgresql://...

# IA Principal (Claude - Anthropic)
ANTHROPIC_API_KEY=sk-ant-...

# Configuração IA
AI_PROVIDER=claude
AI_MODE=auto
```

#### ✅ Variáveis Opcionais (JÁ CONFIGURADAS):
```env
# IA Backup (DeepSeek)
DEEPSEEK_API_KEY=sk-...

# Site Principal (para CORS)
SITE_URL=https://azmt.com.br

# JWT para autenticação
JWT_SECRET=...

# Supabase (se usar)
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
```

**Onde ver:**
1. Vercel Dashboard → Projeto `azimut-cms` (backoffice)
2. Settings → Environment Variables
3. Você já configurou tudo aqui! ✅

---

## 🎯 Resposta Direta para sua Pergunta

### Para o SITE PRINCIPAL na Vercel:

#### ❌ **NÃO precisa adicionar:**
- ❌ Chaves de IA (ANTHROPIC_API_KEY, DEEPSEEK_API_KEY)
- ❌ DATABASE_URL
- ❌ JWT_SECRET
- ❌ VITE_API_URL (já usa produção por padrão)
- ❌ Nenhuma outra variável

#### ✅ **O que acontece:**
- O site usa o backoffice de produção automaticamente
- Não precisa de configuração
- Funciona imediatamente após deploy
- Leads são enviados para `https://backoffice.azmt.com.br`

---

## 📊 Fluxo de Dados

```
┌─────────────────────────────────────┐
│ Site Principal (azmt.com.br)        │
│ - Formulário de contato             │
│ - NÃO tem chaves de IA              │
│ - NÃO tem banco de dados            │
└─────────────┬───────────────────────┘
              │
              │ Envia lead para:
              │ https://backoffice.azmt.com.br/api/leads
              │
              ▼
┌─────────────────────────────────────┐
│ Backoffice (backoffice.azmt.com.br)│
│ ✅ TEM chaves de IA                 │
│ ✅ TEM banco de dados (Neon)        │
│ ✅ Processa leads com IA            │
│ ✅ Armazena no banco                │
└─────────────────────────────────────┘
```

---

## 🚀 Para Deploy do Site Principal

### Passo 1: Fazer push para GitHub
```bash
git push
```

### Passo 2: Vercel detecta e faz deploy automático
- ✅ Não precisa configurar nada
- ✅ Não precisa adicionar variáveis
- ✅ Funciona automaticamente

### Passo 3: Testar
1. Acesse: https://azmt.com.br/pt/contact
2. Preencha o formulário
3. Envie
4. Verifique no CRM: https://backoffice.azmt.com.br/admin/leads

---

## ⚠️ IMPORTANTE

### Site Principal (azimut-site-vite-tailwind):
- **Não armazena dados sensíveis**
- **Não tem chaves de API**
- **Não precisa de variáveis de ambiente**
- **Tudo já está configurado no código**

### Backoffice (azimut-cms):
- **Tem todas as chaves de IA**
- **Tem acesso ao banco de dados**
- **Já está configurado**
- **Não precisa fazer nada**

---

## 🎉 Conclusão

**Para fazer deploy do site principal agora:**
1. ✅ Faça `git push`
2. ✅ Aguarde o deploy automático da Vercel
3. ✅ Pronto! Não precisa configurar nada

**Tudo já está funcionando!** 🚀

---

## 📞 Contato de Suporte

Se algo não funcionar após o deploy:
1. Verifique os logs do deploy na Vercel
2. Teste o formulário em: https://azmt.com.br/pt/contact
3. Verifique se os leads aparecem no CRM: https://backoffice.azmt.com.br/admin/leads
