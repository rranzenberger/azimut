# 🔧 CONFIGURAR POSTGRESQL NO N8N - Passo a Passo

## ⚠️ PROBLEMA:

Você está vendo o campo **"Credential to connect with"** com:
- Dropdown vazio: "Select Credential"
- **Triângulo vermelho de aviso** ⚠️

---

## ✅ SOLUÇÃO: Criar Credencial PostgreSQL

### PASSO 1: Clicar no Campo

1. **Clique no dropdown** que diz **"Select Credential"** (campo com borda vermelha)

2. **Uma lista aparecerá** (provavelmente vazia)

3. **Procure por:**
   - **"Create New"** ou
   - **"New Credential"** ou
   - **"+"** ou
   - **"Add Credential"**

4. **Clique nele**

---

### PASSO 2: Preencher Credencial PostgreSQL

**Uma janela/modal aparecerá. Preencha:**

#### 1. **Name (Nome):**
```
Neon PostgreSQL
```
Ou qualquer nome que você quiser (ex: "Banco Azimut")

#### 2. **Host:**
Cole o **host do seu banco Neon**

**Onde encontrar:**
- Acesse: https://console.neon.tech
- Vá em seu projeto
- Veja "Connection Details"
- Copie o **host** (ex: `ep-xxx.us-east-2.aws.neon.tech`)

**Cole aqui:** `ep-xxx.us-east-2.aws.neon.tech`

#### 3. **Database:**
Nome do banco de dados

**Geralmente:** `neondb` ou o nome que você configurou

#### 4. **User:**
Usuário do banco Neon

**Exemplo:** `neondb_owner` ou o usuário que você configurou

#### 5. **Password:**
Senha do banco Neon

**Cole a senha** que você configurou no Neon

#### 6. **Port:**
```
5432
```

#### 7. **SSL:**
Selecione: **`require`** (importante!)

#### 8. **Clique em "Test"** (se houver)
- Se funcionar: aparecerá "Connection successful"
- Se der erro: verifique os dados

#### 9. **Clique em "Save"**

---

### PASSO 3: Selecionar a Credencial

1. **Volte para o nó PostgreSQL**

2. **Clique novamente em "Select Credential"**

3. **A credencial que você criou aparecerá na lista**

4. **Clique nela para selecionar**

5. **O campo deve ficar preenchido** e o **triângulo vermelho deve desaparecer**

---

### PASSO 4: Configurar Query Parameters

**Agora você precisa adicionar os 10 parâmetros da query:**

1. **Role até a seção "Options"** (ou procure por "Query Parameters")

2. **Clique em "Add option"** ou **"Add Parameter"**

3. **Adicione 10 parâmetros, um por um:**

   **Parâmetro 1:**
   - **Name:** `$1`
   - **Value:** `{{ JSON.stringify($json.enrichedProfile) }}`

   **Parâmetro 2:**
   - **Name:** `$2`
   - **Value:** `{{ $json.conversationContext }}`

   **Parâmetro 3:**
   - **Name:** `$3`
   - **Value:** `{{ $json.recommendedApproach }}`

   **Parâmetro 4:**
   - **Name:** `$4`
   - **Value:** `completed`

   **Parâmetro 5:**
   - **Name:** `$5`
   - **Value:** `{{ $json.leadScore }}`

   **Parâmetro 6:**
   - **Name:** `$6`
   - **Value:** `{{ $json.decisionPower }}`

   **Parâmetro 7:**
   - **Name:** `$7`
   - **Value:** `{{ $json.detectedCity || null }}`

   **Parâmetro 8:**
   - **Name:** `$8`
   - **Value:** `{{ $json.detectedCompany || null }}`

   **Parâmetro 9:**
   - **Name:** `$9`
   - **Value:** `{{ $json.linkedinUrl || null }}`

   **Parâmetro 10:**
   - **Name:** `$10`
   - **Value:** `{{ $json.leadId }}`

4. **Clique em "Save"** no nó PostgreSQL

---

## 🔑 ONDE PEGAR DADOS DO NEON:

### Acessar Neon Console:

1. **Acesse:** https://console.neon.tech
2. **Faça login**
3. **Vá em seu projeto**
4. **Clique em "Connection Details"** ou **"Connection String"**

### Você verá algo como:

```
Host: ep-xxx.us-east-2.aws.neon.tech
Database: neondb
User: neondb_owner
Password: xxxxxx
Port: 5432
```

**Copie cada valor e cole na credencial do n8n!**

---

## ✅ CHECKLIST:

- [ ] Clicou em "Select Credential"
- [ ] Clicou em "Create New"
- [ ] Preencheu Name: `Neon PostgreSQL`
- [ ] Preencheu Host (do Neon)
- [ ] Preencheu Database (do Neon)
- [ ] Preencheu User (do Neon)
- [ ] Preencheu Password (do Neon)
- [ ] Preencheu Port: `5432`
- [ ] Selecionou SSL: `require`
- [ ] Testou conexão
- [ ] Salvou credencial
- [ ] Selecionou credencial no nó
- [ ] Adicionou 10 parâmetros da query
- [ ] Salvou nó PostgreSQL
- [ ] Triângulo vermelho desapareceu

---

## 💡 DICAS:

- **SSL obrigatório:** Neon requer SSL, sempre selecione "require"
- **Teste sempre:** Use o botão "Test" antes de salvar
- **Senha correta:** Verifique se copiou a senha completa
- **Host correto:** Deve ser algo como `ep-xxx.aws.neon.tech`

---

## 🆘 SE DER ERRO NO TESTE:

### Erro: "Connection refused"
- Verifique se o host está correto
- Verifique se a porta é 5432

### Erro: "Authentication failed"
- Verifique usuário e senha
- Verifique se copiou corretamente

### Erro: "SSL required"
- Certifique-se de selecionar SSL: `require`

---

**Configure a credencial PostgreSQL e me avise quando terminar!** 🚀
