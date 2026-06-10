# 🔧 CORRIGIR SERPAPI - Query Auth

## ⚠️ PROBLEMA:

Você está vendo o erro: `[ERROR: access to env vars denied]` para `{{ $env.SERPAPI_KEY }}`

Isso significa que o n8n não está conseguindo acessar a variável de ambiente.

---

## ✅ SOLUÇÃO 1: Criar Credencial Query Auth (RECOMENDADO)

### Passo a Passo:

1. **No campo "Query Auth"** (onde está o erro)
2. **Clique no dropdown** que diz "Select Credential"
3. **Clique em "Create New"** ou **"+"**

4. **Preencha a credencial:**
   - **Name:** `api_key`
   - **Value:** Cole aqui a sua **API Key do SerpAPI** diretamente
     - Exemplo: `abc123def456ghi789...` (sua chave real do SerpAPI)
   - **Não use** `{{ $env.SERPAPI_KEY }}` aqui, coloque a chave DIRETA

5. **Clique em "Save"**

6. **Volte para o nó SerpAPI**
7. **Selecione a credencial** que acabou de criar
8. **Clique em "Save"**

**✅ Erro deve desaparecer!**

---

## ✅ SOLUÇÃO 2: Usar Variável de Ambiente (Alternativa)

### Se preferir usar variável de ambiente:

1. **Verifique se a variável está no Railway:**
   - Acesse: https://railway.app
   - Vá em seu projeto n8n
   - Vá em "Variables"
   - Verifique se `SERPAPI_KEY` está lá

2. **Se não estiver:**
   - Clique em "+ New Variable"
   - Name: `SERPAPI_KEY`
   - Value: (sua API key do SerpAPI)
   - Salve
   - **Aguarde Railway reiniciar** (1-2 minutos)

3. **No n8n, use a sintaxe correta:**
   - **Value:** `{{ $env.SERPAPI_KEY }}`
   - Mas primeiro precisa criar a credencial Query Auth

---

## 🎯 CONFIGURAÇÃO COMPLETA DO NÓ SERPAPI:

### Query Parameters:

**Adicione 4 parâmetros:**

1. **Name:** `q`
   - **Value:** `{{ $json.name }} {{ $json.company }}`

2. **Name:** `engine`
   - **Value:** `google`

3. **Name:** `gl`
   - **Value:** `{{ $json.lang === 'en' ? 'ca' : $json.lang === 'pt' ? 'br' : $json.lang === 'es' ? 'es' : 'fr' }}`

4. **Name:** `api_key`
   - **Value:** 
     - **Opção A:** Use a credencial criada (recomendado)
     - **Opção B:** `{{ $env.SERPAPI_KEY }}` (se variável estiver no Railway)

### Authentication:

- **Authentication:** `Generic Credential Type`
- **Generic Auth Type:** `Query Auth`
- **Query Auth:** Selecione a credencial criada (ou crie nova)

---

## 💡 RECOMENDAÇÃO:

**Use a Solução 1 (Credencial direta)** porque:
- ✅ Mais simples
- ✅ Funciona imediatamente
- ✅ Não depende de variáveis de ambiente
- ✅ Mais fácil de debugar

---

## 🔑 ONDE PEGAR A API KEY DO SERPAPI:

1. **Acesse:** https://serpapi.com
2. **Faça login**
3. **Vá em "API Keys"** ou "Dashboard"
4. **Copie sua API Key**
5. **Cole na credencial do n8n**

---

## ✅ CHECKLIST:

- [ ] Credencial Query Auth criada com API Key direta
- [ ] Credencial selecionada no nó SerpAPI
- [ ] 4 parâmetros configurados (q, engine, gl, api_key)
- [ ] Nó salvo
- [ ] Erro desapareceu

---

**Crie a credencial com a API Key direta e me avise se funcionou!** 🚀
