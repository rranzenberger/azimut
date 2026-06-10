# 🔐 COMO CONFIGURAR CARTEIRA WEB3 - PASSO A PASSO

## 🎯 O QUE VOCÊ PRECISA FAZER:

### **1. Instalar Dependência (Backend)**

```bash
cd azimut-cms
npm install ethers
```

---

### **2. Criar Carteira MetaMask para Empresa**

1. **Instalar MetaMask** (se não tiver):
   - https://metamask.io/download/

2. **Criar Nova Conta:**
   - Abra MetaMask
   - Clique nos 3 pontinhos (menu)
   - "Create Account"
   - Nome: "Azimut Empresa"
   - **ANOTE A SENHA!**

3. **Exportar Chave Privada:**
   - Settings > Security & Privacy
   - "Export Private Key"
   - Digite a senha
   - **COPIE A CHAVE PRIVADA** (começa com `0x...`)

4. **Adicionar Polygon Network:**
   - Settings > Networks > Add Network
   - Network Name: `Polygon Mainnet`
   - RPC URL: `https://polygon-rpc.com`
   - Chain ID: `137`
   - Currency Symbol: `MATIC`
   - Block Explorer: `https://polygonscan.com`

5. **Adicionar Fundos:**
   - Envie MATIC para a carteira (pode comprar em exchange)
   - Para começar: ~$10-20 é suficiente

---

### **3. Configurar .env**

Abra `azimut-cms/.env` e adicione:

```env
# Carteira da Empresa (para receber pagamentos e enviar recompensas)
COMPANY_WALLET_ADDRESS=0xCOLE_SEU_ENDERECO_AQUI
COMPANY_WALLET_PRIVATE_KEY=0xCOLE_SUA_CHAVE_PRIVADA_AQUI

# RPC URL (Polygon - recomendado para baixo custo)
RPC_URL=https://polygon-rpc.com

# Contrato NFT (opcional - se tiver smart contract)
NFT_CONTRACT_ADDRESS=
```

**⚠️ IMPORTANTE:**
- ✅ NUNCA compartilhe a chave privada
- ✅ NUNCA commite no Git
- ✅ Adicione `.env` no `.gitignore`

---

### **4. Executar Migração do Banco**

```bash
cd azimut-cms
npx prisma db execute --file prisma/migrations/add-web3-tables.sql
```

Ou execute o SQL diretamente no PostgreSQL.

---

### **5. Testar Conexão**

1. **Acesse a página:**
   ```
   https://azmt.com.br/pt/experience-preview
   ```

2. **Clique em "Conectar Carteira"**
   - MetaMask abrirá
   - Aprove a conexão
   - Endereço será salvo no banco

---

## ✅ PRONTO!

Agora você pode:
- ✅ Clientes conectarem carteiras
- ✅ Receber pagamentos em crypto
- ✅ Distribuir recompensas (NFTs, tokens) automaticamente

---

## 🔒 SEGURANÇA:

### **✅ FAÇA:**
- Use carteira separada para empresa
- Mantenha chave privada em `.env`
- Use Polygon (mais barato que Ethereum)
- Teste primeiro em testnet

### **❌ NÃO FAÇA:**
- Compartilhar chave privada
- Commitar `.env` no Git
- Usar mesma carteira para dev/prod
- Enviar grandes valores sem testar

---

## 📞 PRECISA DE AJUDA?

Se tiver dúvidas, me avise!
