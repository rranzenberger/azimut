# 🔗 Como Funciona a Conexão de Carteira no Frontend

## 📱 O QUE O USUÁRIO VÊ NA PÁGINA

### 1. **Página de Preview** (`/experience-preview`)

Quando o usuário acessa a página, ele vê:

```
┌─────────────────────────────────────────┐
│  🔗 Conectar Carteira Digital          │
│                                         │
│  Conecte sua carteira para receber     │
│  NFTs, tokens e recompensas.           │
│                                         │
│  Carteiras detectadas:                 │
│  [MetaMask] [Coinbase Wallet]         │
│                                         │
│  [🔗 Conectar Carteira]                │
└─────────────────────────────────────────┘
```

### 2. **Após Conectar**

Quando conectado, mostra:

```
┌─────────────────────────────────────────┐
│  ✅ Carteira Conectada                  │
│                                         │
│  0xd5B2...500e                          │
│  Polygon • 0.1234 MATIC                 │
│                                         │
│  [Desconectar]                          │
└─────────────────────────────────────────┘
```

---

## 🔄 COMO FUNCIONA O PROCESSO

### Passo 1: Usuário Clica em "Conectar Carteira"

```javascript
// Frontend: WalletConnect.tsx
async function connectWallet() {
  // 1. Verifica se MetaMask está instalado
  if (!window.ethereum) {
    // Abre link para instalar MetaMask
    window.open('https://metamask.io/download/', '_blank')
    return
  }

  // 2. Solicita conexão
  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts'
  })
}
```

### Passo 2: MetaMask Abre Popup

MetaMask mostra um popup pedindo permissão:
- "Azimut quer conectar à sua carteira"
- Usuário clica em "Conectar" ou "Cancelar"

### Passo 3: Validação no Frontend

```javascript
// Valida formato do endereço
const isValid = /^0x[a-fA-F0-9]{40}$/.test(address)

// Obtém informações da carteira
const chainId = await window.ethereum.request({ method: 'eth_chainId' })
const balance = await window.ethereum.request({
  method: 'eth_getBalance',
  params: [address, 'latest']
})
```

### Passo 4: Envio para Backend

```javascript
// Envia para API
await fetch('/api/web3/wallet/connect', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    address: wallet.address,
    chainId: wallet.chainId
  })
})
```

### Passo 5: Backend Valida e Salva

```typescript
// Backend: /api/web3/wallet/connect/route.ts

// 1. Valida formato
if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
  return error('Endereço inválido')
}

// 2. Salva no banco
await prisma.wallet.upsert({
  where: { address: address.toLowerCase() },
  update: { lastConnectedAt: new Date() },
  create: { address, chainId, lastConnectedAt: new Date() }
})
```

---

## ✅ VALIDAÇÕES ATUAIS

### 1. **Validação de Formato** ✅
- Endereço deve começar com `0x`
- Deve ter exatamente 42 caracteres
- Regex: `/^0x[a-fA-F0-9]{40}$/`

### 2. **Validação de Rede** ✅
- Verifica se está na rede correta (Polygon = Chain ID 137)
- Pode solicitar mudança de rede se necessário

### 3. **Validação de Saldo** ✅
- Mostra saldo da carteira
- Não bloqueia se saldo for zero

---

## 🔐 OUTRAS FORMAS DE VALIDAÇÃO (MELHORIAS)

### 1. **Assinatura de Mensagem (Recomendado)** 🔒

**Por que usar:**
- Prova que o usuário controla a carteira
- Mais seguro que apenas conectar
- Padrão da indústria

**Como funciona:**

```javascript
// 1. Gerar mensagem única
const message = `Azimut quer verificar que você controla esta carteira.\n\nEndereço: ${address}\nTimestamp: ${Date.now()}`

// 2. Solicitar assinatura
const signature = await window.ethereum.request({
  method: 'personal_sign',
  params: [message, address]
})

// 3. Enviar para backend
await fetch('/api/web3/wallet/connect', {
  method: 'POST',
  body: JSON.stringify({
    address,
    chainId,
    signature,
    message
  })
})

// 4. Backend verifica assinatura
import { ethers } from 'ethers'
const recoveredAddress = ethers.verifyMessage(message, signature)
if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
  return error('Assinatura inválida')
}
```

**Vantagens:**
- ✅ Prova propriedade da carteira
- ✅ Mais seguro
- ✅ Padrão Web3

**Desvantagens:**
- ⚠️ Requer interação extra (usuário precisa assinar)
- ⚠️ Pode assustar usuários iniciantes

---

### 2. **Validação via Smart Contract** 🔒

**Como funciona:**
- Contrato verifica se endereço tem certas características
- Pode verificar saldo mínimo, NFTs, etc.

**Exemplo:**
```solidity
function verifyWallet(address _wallet) public view returns (bool) {
  // Verifica se tem NFT específico
  return nftContract.balanceOf(_wallet) > 0;
}
```

---

### 3. **Validação via API Externa** 🌐

**Serviços disponíveis:**
- **Etherscan API** - Verifica transações, saldo
- **Moralis API** - Verifica NFTs, tokens
- **Alchemy API** - Verifica histórico

**Exemplo:**
```javascript
// Verificar se endereço tem NFTs
const response = await fetch(
  `https://polygon-mainnet.g.alchemy.com/nft/v2/${API_KEY}/getNFTs?owner=${address}`
)
const nfts = await response.json()
```

---

### 4. **Validação de Reputação** ⭐

**Como funciona:**
- Verifica histórico de transações
- Verifica se endereço é conhecido (whitelist)
- Verifica idade da carteira

**Exemplo:**
```javascript
// Verificar idade da carteira
const firstTx = await provider.getTransactionHistory(address)
const age = Date.now() - firstTx.timestamp
if (age < 30 * 24 * 60 * 60 * 1000) {
  // Carteira muito nova (< 30 dias)
  showWarning('Carteira nova detectada')
}
```

---

## 🎯 RECOMENDAÇÃO: Implementar Assinatura de Mensagem

### Por que implementar:

1. **Segurança:** Prova que usuário controla a carteira
2. **Padrão:** Usado por OpenSea, Uniswap, etc.
3. **Flexível:** Pode adicionar mais validações depois

### Como implementar:

1. **Frontend:** Solicitar assinatura após conexão
2. **Backend:** Verificar assinatura antes de salvar
3. **Opcional:** Permitir pular assinatura (modo simples)

---

## 📊 COMPARAÇÃO DE MÉTODOS

| Método | Segurança | UX | Complexidade | Recomendado |
|--------|-----------|----|--------------|-------------|
| **Apenas Conectar** | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐ | ✅ Básico |
| **Assinatura Mensagem** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ | ✅✅ Recomendado |
| **Smart Contract** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⚠️ Avançado |
| **API Externa** | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ | ✅ Opcional |

---

## 🚀 PRÓXIMOS PASSOS

### Implementação Recomendada:

1. **Fase 1 (Agora):** Manter conexão simples (já funciona)
2. **Fase 2 (Futuro):** Adicionar assinatura de mensagem opcional
3. **Fase 3 (Avançado):** Integrar validações adicionais

---

## 📝 CÓDIGO ATUAL

### Frontend: `src/components/WalletConnect.tsx`
- ✅ Detecta carteiras disponíveis
- ✅ Conecta via MetaMask
- ✅ Valida formato de endereço
- ✅ Mostra saldo e rede

### Backend: `azimut-cms/app/api/web3/wallet/connect/route.ts`
- ✅ Valida formato de endereço
- ✅ Salva no banco de dados
- ✅ Retorna status de conexão

---

## 🔍 PESQUISAS ÚTEIS

### Padrões Web3:
- **EIP-1193:** Padrão de conexão de carteira
- **EIP-191:** Padrão de assinatura de mensagem
- **WalletConnect:** Protocolo para conectar carteiras

### Bibliotecas:
- **ethers.js:** Biblioteca para interagir com blockchain
- **wagmi:** React hooks para Web3
- **web3modal:** UI para conectar carteiras

### Documentação:
- MetaMask Docs: https://docs.metamask.io
- Ethers.js Docs: https://docs.ethers.io
- WalletConnect Docs: https://docs.walletconnect.com

---

## ✅ RESUMO

**Como funciona agora:**
1. Usuário clica "Conectar Carteira"
2. MetaMask abre popup
3. Usuário aprova conexão
4. Sistema valida e salva endereço
5. Mostra status conectado

**Validações atuais:**
- ✅ Formato de endereço
- ✅ Rede conectada
- ✅ Saldo da carteira

**Melhorias futuras:**
- ⏳ Assinatura de mensagem (recomendado)
- ⏳ Validações adicionais (opcional)

**Pronto para usar!** 🎉
