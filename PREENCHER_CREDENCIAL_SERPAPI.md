# 🔑 PREENCHER CREDENCIAL SERPAPI - Passo a Passo

## 📋 O QUE COLOCAR EM CADA CAMPO:

Você está na tela de criar credencial "Query Auth". Veja o que preencher:

---

## 🎯 CAMPOS PARA PREENCHER:

### 1. **Name** (Nome da Credencial)

**O que colocar:**
```
SerpAPI Key
```

**OU:**
```
SerpAPI Query Auth
```

**OU qualquer nome que você quiser** (ex: "Minha API SerpAPI")

---

### 2. **Value** (Valor - API Key)

**O que colocar:**
Cole aqui sua **API Key do SerpAPI** diretamente.

**Exemplo:**
```
abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
```

**⚠️ IMPORTANTE:**
- **NÃO use** `{{ $env.SERPAPI_KEY }}`
- **NÃO use** variáveis
- **Cole a chave DIRETA** que você pegou do site SerpAPI

---

### 3. **Allowed HTTP Request Domains** (Opcional)

**Deixe como está:**
- **"All"** (padrão)

**OU se quiser restringir:**
- Selecione e adicione: `serpapi.com`

**Mas geralmente "All" funciona bem!**

---

## 🔑 ONDE PEGAR A API KEY DO SERPAPI:

### Se você já tem conta:

1. **Acesse:** https://serpapi.com
2. **Faça login**
3. **Vá em "Dashboard"** ou **"API Keys"**
4. **Copie sua API Key**
5. **Cole no campo "Value"**

### Se você não tem conta:

1. **Acesse:** https://serpapi.com/users/sign_up
2. **Crie uma conta** (tem free tier com 100 buscas/mês)
3. **Vá em "Dashboard"**
4. **Copie sua API Key**
5. **Cole no campo "Value"**

---

## ✅ EXEMPLO COMPLETO:

```
┌─────────────────────────────────────┐
│ Query Auth account                │
│ Query Auth                         │
├─────────────────────────────────────┤
│ Name:                              │
│ [SerpAPI Key                    ]  │ ← Digite aqui
│                                     │
│ Value:                              │
│ [••••••••••••••••••••••••••••••]  │ ← Cole API Key aqui
│                                     │
│ Allowed HTTP Request Domains:      │
│ [All                          ▼]   │ ← Deixe "All"
│                                     │
│              [Save]  [X]           │
└─────────────────────────────────────┘
```

---

## 📋 CHECKLIST:

- [ ] Campo "Name" preenchido (ex: "SerpAPI Key")
- [ ] Campo "Value" preenchido com API Key direta do SerpAPI
- [ ] "Allowed HTTP Request Domains" deixado como "All"
- [ ] Clicou em "Save"

---

## 💡 DICAS:

- **API Key direta:** Cole a chave real, não use variáveis
- **Se não tiver API Key:** Crie conta no SerpAPI primeiro
- **Free tier:** SerpAPI tem 100 buscas grátis por mês
- **Salvar:** Depois de preencher, clique em "Save"

---

## 🆘 SE NÃO TIVER API KEY DO SERPAPI:

### Criar Conta (5 minutos):

1. **Acesse:** https://serpapi.com/users/sign_up
2. **Preencha:**
   - Email
   - Senha
   - Confirme senha
3. **Confirme email** (verifique sua caixa de entrada)
4. **Faça login**
5. **Vá em "Dashboard"**
6. **Copie sua API Key**
7. **Cole no campo "Value"**

---

**Preencha os campos e clique em "Save"! Depois me avise se funcionou!** 🚀
