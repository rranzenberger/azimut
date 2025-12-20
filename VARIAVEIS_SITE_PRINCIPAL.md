# 🔑 Variáveis de Ambiente - Site Principal

## ✅ Variáveis Necessárias

### 1. **VITE_CMS_API_URL** (OBRIGATÓRIA)

**Descrição:** URL da API do CMS para o site se conectar

**Valor para Produção:**
```
https://backoffice.azmt.com.br/api
```

**Valor para Desenvolvimento (local):**
```
http://localhost:3001/api
```

**Onde usar:**
- Conectar ao CMS para buscar conteúdo
- Enviar tracking comportamental
- Enviar leads do formulário

---

## ⚠️ Variáveis Opcionais

### 2. **VITE_PREVIEW_USER** (Opcional)

**Descrição:** Usuário para área de preview/proteção

**Valor padrão:** `azimut`

**Valor customizado (se quiser mudar):**
```
VITE_PREVIEW_USER=seu-usuario
```

---

### 3. **VITE_PREVIEW_PASS** (Opcional)

**Descrição:** Senha para área de preview/proteção

**Valor padrão:** `Azimut2025!Preview`

**Valor customizado (se quiser mudar):**
```
VITE_PREVIEW_PASS=sua-senha-segura
```

---

## 📋 Resumo para Vercel

### Variáveis Obrigatórias (1):

| Key | Value | Environments |
|-----|-------|--------------|
| `VITE_CMS_API_URL` | `https://backoffice.azmt.com.br/api` | All Environments |

### Variáveis Opcionais (2):

| Key | Value | Environments |
|-----|-------|--------------|
| `VITE_PREVIEW_USER` | `azimut` | All Environments (opcional) |
| `VITE_PREVIEW_PASS` | `Azimut2025!Preview` | All Environments (opcional) |

---

## 🔧 Como Adicionar na Vercel

### Passo a Passo:

1. **Acesse:** https://vercel.com
2. **Projeto:** `azimut` (site principal)
3. **Vá em:** Settings → Environment Variables
4. **Adicione:**

   **Variável 1 (OBRIGATÓRIA):**
   - **Key:** `VITE_CMS_API_URL`
   - **Value:** `https://backoffice.azmt.com.br/api`
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development
   - Clique em **Save**

   **Variável 2 (Opcional - se usar preview):**
   - **Key:** `VITE_PREVIEW_USER`
   - **Value:** `azimut`
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development
   - Clique em **Save**

   **Variável 3 (Opcional - se usar preview):**
   - **Key:** `VITE_PREVIEW_PASS`
   - **Value:** `Azimut2025!Preview`
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development
   - Clique em **Save**

5. **Depois:** Faça redeploy para aplicar as variáveis

---

## ✅ Checklist

- [ ] `VITE_CMS_API_URL` adicionada na Vercel
- [ ] Valor: `https://backoffice.azmt.com.br/api`
- [ ] Environments: All Environments
- [ ] Redeploy feito após adicionar variáveis
- [ ] Testado em produção

---

## 🎯 Resumo Rápido

**Variável OBRIGATÓRIA:**
- `VITE_CMS_API_URL` = `https://backoffice.azmt.com.br/api`

**Variáveis Opcionais (só se usar preview):**
- `VITE_PREVIEW_USER` = `azimut`
- `VITE_PREVIEW_PASS` = `Azimut2025!Preview`

---

**A variável mais importante é `VITE_CMS_API_URL`!** 🚀

