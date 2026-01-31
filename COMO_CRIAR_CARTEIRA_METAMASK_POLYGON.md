# 🔐 Como Criar Carteira MetaMask Polygon - Guia Completo

## 📋 Resumo Rápido

Você precisa criar uma **carteira separada** para a empresa Azimut na rede **Polygon** (não Solana). Este guia mostra passo a passo.

---

## 🎯 Passo 1: Instalar MetaMask

1. Acesse: **https://metamask.io/download/**
2. Escolha seu navegador (Chrome, Firefox, Edge, Brave)
3. Clique em "Download" e instale a extensão
4. ⚠️ **IMPORTANTE:** Instale apenas do site oficial!

---

## 🔐 Passo 2: Criar Nova Conta

1. Abra MetaMask (clique no ícone da extensão)
2. Clique nos **3 pontinhos** (menu) no canto superior direito
3. Selecione **"Create Account"** ou **"Criar Conta"**
4. Nome da conta: **"Azimut Empresa"**
5. MetaMask vai gerar uma **frase de recuperação** (12 palavras)
   - ⚠️ **ANOTE E GUARDE EM LUGAR SEGURO!**
   - Nunca compartilhe com ninguém
   - Nunca tire screenshot
   - Anote em papel e guarde em cofre físico
6. Confirme a frase de recuperação

---

## 🔗 Passo 3: Adicionar Rede Polygon

1. No MetaMask, clique em **"Networks"** (no topo, ao lado do nome da rede)
2. Clique em **"Add Network"** ou **"Adicionar Rede"**
3. Clique em **"Add a network manually"** (Adicionar rede manualmente)
4. Preencha os campos:

```
Network Name: Polygon Mainnet
RPC URL: https://polygon-rpc.com
Chain ID: 137
Currency Symbol: MATIC
Block Explorer: https://polygonscan.com
```

5. Clique em **"Save"**

---

## 🔑 Passo 4: Exportar Chave Privada

1. No MetaMask, clique nos **3 pontinhos** (menu)
2. Vá em **"Settings"** (Configurações)
3. Clique em **"Security & Privacy"** (Segurança e Privacidade)
4. Role até encontrar **"Export Private Key"** (Exportar Chave Privada)
5. Digite sua senha do MetaMask
6. Copie a chave privada (começa com `0x...` e tem 66 caracteres)
   - ⚠️ **NUNCA compartilhe esta chave!**
   - ⚠️ Ela dá acesso TOTAL à sua carteira

---

## 📍 Passo 5: Obter Endereço da Carteira

1. No MetaMask, clique no nome da conta (**"Azimut Empresa"**)
2. O endereço aparece abaixo do nome (começa com `0x...` e tem 42 caracteres)
3. Clique no endereço para copiar automaticamente

**Diferença:**
- **Endereço público:** Pode ser compartilhado (para receber pagamentos)
- **Chave privada:** NUNCA compartilhe (controla a carteira)

---

## 💰 Passo 6: Adicionar Fundos (MATIC)

### Opção 1: Exchange (Recomendado)

1. Use Binance, Coinbase, Kraken ou outras exchanges
2. Compre **MATIC** com cartão de crédito ou transferência
3. Envie MATIC para seu endereço da carteira MetaMask
   - Certifique-se de estar na rede **Polygon** (não Ethereum)
   - Verifique o endereço antes de enviar

### Opção 2: Direto no MetaMask

1. Clique em **"Buy"** no MetaMask
2. Use serviços como Wyre ou Transak
3. Mais caro, mas mais rápido

### 💵 Quanto Comprar?

- **Mínimo recomendado:** $10-20 USD em MATIC
- **Para começar:** $50-100 USD é suficiente
- **Taxa por transação:** ~$0.01 (muito barato!)
- Com $50 você pode fazer ~5000 transações

---

## ⚙️ Passo 7: Configurar no Sistema

1. Abra o arquivo: `azimut-cms/.env`
2. Adicione as seguintes linhas:

```env
# Carteira da Empresa
COMPANY_WALLET_ADDRESS=0xSEU_ENDERECO_AQUI
COMPANY_WALLET_PRIVATE_KEY=0xSUA_CHAVE_PRIVADA_AQUI
RPC_URL=https://polygon-rpc.com
```

3. Substitua:
   - `0xSEU_ENDERECO_AQUI` pelo endereço da sua carteira
   - `0xSUA_CHAVE_PRIVADA_AQUI` pela sua chave privada

4. Salve o arquivo
5. Reinicie o servidor do backoffice

---

## ✅ Verificar Configuração

1. Acesse no backoffice: **💰 Carteira Web3**
2. Você deve ver:
   - Endereço da carteira
   - Saldo em MATIC
   - Rede: Polygon Mainnet

---

## 🆘 Problemas Comuns

### "Network not found"
- Certifique-se de ter adicionado a rede Polygon manualmente
- Verifique se o Chain ID está correto: **137**

### "Insufficient funds"
- Você precisa ter MATIC na carteira para pagar taxas
- Compre pelo menos $10-20 em MATIC

### "Invalid address"
- O endereço deve começar com `0x` e ter 42 caracteres
- A chave privada deve começar com `0x` e ter 66 caracteres

---

## 🔒 Segurança

### ✅ FAÇA:
- Use carteira separada para empresa
- Mantenha chave privada em `.env` (nunca no Git)
- Use Polygon (mais barato que Ethereum)
- Teste primeiro com valores pequenos

### ❌ NÃO FAÇA:
- Compartilhar chave privada
- Commitar `.env` no Git
- Usar mesma carteira para dev/prod
- Enviar grandes valores sem testar

---

## 📞 Precisa de Ajuda?

Se tiver dúvidas, acesse no backoffice:
- **🔐 Configurar Carteira** - Guia visual passo a passo
- **💰 Carteira Web3** - Status e monitoramento

---

## 🎯 Por que Polygon?

- ✅ Taxas ~1000x mais baratas que Ethereum
- ✅ Transações rápidas (~2 segundos)
- ✅ Compatível com todas as carteiras Ethereum (MetaMask, Ledger, etc.)
- ✅ Usado por grandes projetos (OpenSea, Aave, etc.)

---

**Pronto!** Agora você tem uma carteira MetaMask configurada na Polygon para usar no sistema Web3 da Azimut! 🚀
