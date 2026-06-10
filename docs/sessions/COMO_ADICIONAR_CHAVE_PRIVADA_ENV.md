# 🔐 Como Adicionar Chave Privada no .env

## 📝 Passo a Passo Simples

### 1. Abrir o arquivo `.env`

Localização: `azimut-cms/.env`

**Como abrir:**
- No VS Code/Cursor: Clique com botão direito no arquivo → "Open"
- Ou navegue até: `c:\Users\ranz\Documents\azimut-site-vite-tailwind\azimut-cms\.env`

---

### 2. Encontrar a linha 44

Procure por esta linha:
```env
COMPANY_WALLET_PRIVATE_KEY=
```

---

### 3. Adicionar a chave privada

**Após o `=`, cole sua chave privada:**

```env
COMPANY_WALLET_PRIVATE_KEY=0xSUA_CHAVE_PRIVADA_AQUI
```

**Exemplo:**
```env
COMPANY_WALLET_PRIVATE_KEY=0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

⚠️ **IMPORTANTE:**
- A chave deve começar com `0x`
- Deve ter 66 caracteres no total
- Não deixe espaços antes ou depois

---

### 4. Salvar o arquivo

- Pressione `Ctrl + S` (ou `Cmd + S` no Mac)
- Ou File → Save

---

## ❓ Por que preciso da chave privada?

### ✅ FUNCIONALIDADES QUE PRECISAM DA CHAVE PRIVADA:

1. **Enviar recompensas automaticamente**
   - Quando um estudante contrata um projeto, o sistema envia crypto automaticamente
   - Precisa assinar a transação (requer chave privada)

2. **Distribuir NFTs**
   - Mint e envio automático de NFTs para estudantes
   - Precisa assinar a transação

3. **Interagir com Smart Contracts**
   - Registrar projetos no blockchain
   - Executar funções dos contratos
   - Precisa assinar transações

4. **Receber e gerenciar pagamentos**
   - Processar pagamentos em crypto
   - Gerenciar saldo da carteira

---

### ❌ O QUE NÃO FUNCIONA SEM A CHAVE PRIVADA:

- ❌ Enviar recompensas automaticamente
- ❌ Distribuir NFTs
- ❌ Registrar projetos no smart contract
- ❌ Qualquer transação que envie crypto

---

### ✅ O QUE FUNCIONA SEM A CHAVE PRIVADA:

- ✅ Ver saldo da carteira (apenas leitura)
- ✅ Verificar status da carteira
- ✅ Clientes conectarem suas carteiras
- ✅ Receber pagamentos (clientes enviam para você)

---

## 🔒 Segurança

### ✅ FAÇA:
- ✅ Adicione apenas no arquivo `.env` local
- ✅ Certifique-se que `.env` está no `.gitignore`
- ✅ Use uma carteira separada para empresa
- ✅ Mantenha backup seguro da frase de recuperação

### ❌ NÃO FAÇA:
- ❌ Compartilhar chave privada publicamente
- ❌ Commitar `.env` no Git
- ❌ Enviar por email/chat
- ❌ Usar mesma carteira pessoal

---

## 🧪 Como Verificar se Funcionou

Após adicionar a chave privada, execute:

```bash
VERIFICAR_CARTEIRA_WEB3.bat
```

O script vai verificar:
- ✅ Se a chave foi adicionada
- ✅ Se o formato está correto
- ✅ Se corresponde ao endereço
- ✅ Se a conexão funciona

---

## 📍 Onde Obter a Chave Privada?

1. Abra **MetaMask**
2. Clique nos **3 pontinhos** (menu)
3. **Settings** → **Security & Privacy**
4. **Export Private Key**
5. Digite sua senha
6. Copie a chave (começa com `0x...`)

---

## ⚠️ Alternativa (NÃO RECOMENDADO)

Se você **NÃO quiser** usar chave privada no servidor:

### Opção 1: Apenas Receber Pagamentos
- Clientes podem enviar crypto para seu endereço
- Mas você não pode enviar recompensas automaticamente
- Precisa fazer manualmente pelo MetaMask

### Opção 2: Usar Wallet Connect
- Mais complexo
- Requer interação manual para cada transação
- Não permite automação

**Recomendação:** Use a chave privada no `.env` para automação completa.

---

## ✅ Resumo

1. **Abra:** `azimut-cms/.env`
2. **Encontre:** Linha 44 (`COMPANY_WALLET_PRIVATE_KEY=`)
3. **Cole:** Sua chave privada após o `=`
4. **Salve:** `Ctrl + S`
5. **Teste:** Execute `VERIFICAR_CARTEIRA_WEB3.bat`

**Pronto!** 🎉
