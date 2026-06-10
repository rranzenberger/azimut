# 🔑 CRIAR CREDENCIAL SERPAPI - Passo a Passo Visual

## 📋 O QUE FAZER NO CAMPO "Query Auth":

Você está vendo o campo **"Query Auth"** com **"Select Credential"** e um **triângulo vermelho de aviso**.

---

## 🎯 PASSO A PASSO:

### PASSO 1: Clicar no Campo

1. **Clique no campo** que diz **"Select Credential"** (o campo com borda vermelha)

2. **Uma lista aparecerá** (provavelmente vazia ou com opções)

3. **Procure por um botão** que diz:
   - **"Create New"** ou
   - **"New Credential"** ou
   - **"+"** ou
   - **"Add Credential"**

4. **Clique nele**

---

### PASSO 2: Preencher a Credencial

**Uma janela/modal aparecerá para criar a credencial:**

1. **Name (Nome):**
   - Digite: `SerpAPI Key` ou `SerpAPI Query Auth`
   - Ou deixe o nome padrão

2. **Query Parameter Name:**
   - Digite: `api_key`
   - (Este é o nome do parâmetro que a API espera)

3. **Value (Valor):**
   - **Cole aqui sua API Key do SerpAPI**
   - **NÃO use** `{{ $env.SERPAPI_KEY }}`
   - **Cole a chave DIRETA** (ex: `abc123def456ghi789...`)

4. **Clique em "Save"** ou **"Create"**

---

### PASSO 3: Selecionar a Credencial

1. **Volte para o campo "Query Auth"**

2. **Clique novamente em "Select Credential"**

3. **A credencial que você criou aparecerá na lista**

4. **Clique nela para selecionar**

5. **O campo deve ficar preenchido** e o **triângulo vermelho deve desaparecer**

6. **Clique em "Save"** no nó SerpAPI

---

## 🔑 ONDE PEGAR A API KEY DO SERPAPI:

### Se você já tem a conta:

1. **Acesse:** https://serpapi.com
2. **Faça login**
3. **Vá em "Dashboard"** ou **"API Keys"**
4. **Copie sua API Key**
5. **Cole na credencial**

### Se você não tem a conta:

1. **Acesse:** https://serpapi.com/users/sign_up
2. **Crie uma conta** (tem free tier)
3. **Vá em "Dashboard"**
4. **Copie sua API Key**
5. **Cole na credencial**

---

## ✅ EXEMPLO VISUAL:

```
Query Auth
┌─────────────────────────────────────┐
│ Select Credential ▼ [⚠️]            │ ← Clique aqui
└─────────────────────────────────────┘
         ↓
    [Create New] ← Clique aqui
         ↓
┌─────────────────────────────────────┐
│ Name: SerpAPI Key                   │
│ Query Parameter Name: api_key       │
│ Value: abc123def456ghi789...        │ ← Cole sua API Key aqui
│                                     │
│         [Save]                      │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│ Select Credential ▼                 │
│   ✓ SerpAPI Key                     │ ← Selecione esta
└─────────────────────────────────────┘
```

---

## 💡 DICAS:

- **API Key direta:** Cole a chave real, não use variáveis
- **Nome do parâmetro:** Deve ser `api_key` (exatamente assim)
- **Salve sempre:** Depois de criar, salve o nó SerpAPI
- **Teste:** Depois de salvar, clique em "Execute step" para testar

---

## 🆘 SE NÃO APARECER "Create New":

### Opção 1: Procurar em outro lugar

1. **Clique no ícone de três pontinhos (⋯)** ao lado do campo
2. **Ou procure um botão "+"** em algum lugar da tela
3. **Ou vá em "Settings"** → **"Credentials"** → **"New"**

### Opção 2: Usar Query Parameters diretamente

**Se não conseguir criar credencial, use Query Parameters:**

1. **Vá em "Query Parameters"**
2. **Adicione parâmetro:**
   - **Name:** `api_key`
   - **Value:** Cole sua API Key diretamente aqui
3. **Não precisa de credencial** se fizer assim

---

## ✅ CHECKLIST:

- [ ] Clicou em "Select Credential"
- [ ] Clicou em "Create New"
- [ ] Preencheu Name: `SerpAPI Key`
- [ ] Preencheu Query Parameter Name: `api_key`
- [ ] Colou API Key do SerpAPI no Value
- [ ] Clicou em "Save"
- [ ] Selecionou a credencial criada
- [ ] Salvou o nó SerpAPI
- [ ] Triângulo vermelho desapareceu

---

**Siga os passos acima e me avise se conseguiu criar a credencial!** 🚀
