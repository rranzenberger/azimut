# 🔗 Como Funciona a Conexão de Carteira Web3 no Site

## 📍 ONDE APARECE NO SITE

### 1. **Página Experience Preview** (`/pt/experience-preview`)

A conexão de carteira aparece na página de **"Degustação"** que mostra as opções de VR, NFT e Web3.

**URL:** `https://azmt.com.br/pt/experience-preview`

---

## 🎨 COMO APARECE VISUALMENTE

### **Estado 1: Carteira NÃO Conectada**

Quando o usuário acessa a página, vê um **card bonito** com:

```
┌─────────────────────────────────────────┐
│  🔗 Conectar Carteira Digital          │
│                                         │
│  Conecte sua carteira para receber     │
│  NFTs, tokens e recompensas exclusivas. │
│  Suportamos MetaMask, Ledger,          │
│  Coinbase Wallet e mais.               │
│                                         │
│  Carteiras detectadas:                 │
│  [MetaMask] [WalletConnect]            │
│                                         │
│  ┌─────────────────────────────────┐  │
│  │  🔗 Conectar Carteira           │  │
│  └─────────────────────────────────┘  │
│                                         │
│  📥 Instale uma Carteira                │
│  Para conectar, instale MetaMask...    │
│  [📥 Instalar MetaMask →]              │
└─────────────────────────────────────────┘
```

**Características visuais:**
- Fundo com gradiente roxo/azul
- Borda arredondada com sombra
- Botão grande e chamativo
- Efeitos de animação suaves

---

### **Estado 2: Carteira CONECTADA**

Quando conectada, aparecem **2 elementos visuais**:

#### **A) Indicador Fixo no Topo da Página** (Sempre visível)

```
┌─────────────────────────────────────────────────────────┐
│ ✅ Carteira Conectada  [0x1234...5678]  Polygon  0.5 MATIC │
│                                    [Ver no explorer →]  │
└─────────────────────────────────────────────────────────┘
```

- **Posição:** Fixo no topo (z-index: 1000)
- **Cor:** Verde com gradiente
- **Mostra:** Status, endereço (abreviado), rede, saldo
- **Link:** Abre Polygonscan/Etherscan

#### **B) Card Principal Atualizado** (Na seção de carteira)

```
┌─────────────────────────────────────────┐
│  ✅ Carteira Conectada                  │
│                                         │
│  0x1234...5678                          │
│                                         │
│  ⛓️ Polygon  💰 0.5 MATIC              │
│                                         │
│  [Desconectar]                          │
│                                         │
│  Ver no explorer:                      │
│  [Abrir →]                              │
└─────────────────────────────────────────┘
```

- **Cor:** Verde com gradiente
- **Efeito:** Animação de "pulse" (brilho pulsante)
- **Botão:** "Desconectar" em vermelho

---

## 🔄 COMO O USUÁRIO CONECTA

### **Passo a Passo:**

1. **Usuário acessa:** `https://azmt.com.br/pt/experience-preview`

2. **Vê o card:** "Conectar Carteira Digital"

3. **Clica no botão:** "🔗 Conectar Carteira"

4. **MetaMask abre automaticamente:**
   - Se não tiver MetaMask instalado → Abre página de download
   - Se tiver instalado → Abre popup do MetaMask

5. **Usuário aprova no MetaMask:**
   - Clica em "Conectar" ou "Aprovar"
   - Seleciona a conta (se tiver múltiplas)

6. **Conexão estabelecida:**
   - Card muda para verde
   - Indicador fixo aparece no topo
   - Endereço, rede e saldo são exibidos

---

## ⚙️ O QUE ACONTECE TECNICAMENTE

### **1. Detecção de Carteira**

```javascript
// O código verifica se existe window.ethereum
if (window.ethereum) {
  // MetaMask ou outra carteira detectada
  wallets.push('MetaMask')
}
```

### **2. Solicitação de Conexão**

```javascript
// Solicita permissão ao usuário
const accounts = await window.ethereum.request({
  method: 'eth_requestAccounts'
})
```

### **3. Obtenção de Dados**

```javascript
// Pega informações da carteira
- Endereço (address)
- ID da rede (chainId)
- Saldo (balance)
```

### **4. Envio para Backend**

```javascript
// Salva conexão no backoffice
await fetch('/api/web3/wallet/connect', {
  method: 'POST',
  body: JSON.stringify({
    address: walletInfo.address,
    chainId: walletInfo.chainId,
  })
})
```

### **5. Escuta de Mudanças**

```javascript
// Monitora mudanças na carteira
window.ethereum.on('accountsChanged', handleAccountsChanged)
window.ethereum.on('chainChanged', handleChainChanged)
```

---

## 🎯 FUNCIONALIDADES DISPONÍVEIS

### **Quando Conectado:**

✅ **Visualização:**
- Endereço da carteira (formatado)
- Rede conectada (Polygon, Ethereum, etc.)
- Saldo em MATIC/ETH

✅ **Links:**
- Abrir no Polygonscan/Etherscan
- Ver transações e histórico

✅ **Persistência:**
- Conexão salva no backend
- Associação com lead/usuário (futuro)

✅ **Monitoramento:**
- Detecta mudança de conta
- Detecta mudança de rede
- Atualiza automaticamente

---

## 🔐 SEGURANÇA E PRIVACIDADE

### **O que NÃO fazemos:**
- ❌ Não pedimos chave privada
- ❌ Não acessamos fundos
- ❌ Não fazemos transações sem aprovação

### **O que fazemos:**
- ✅ Apenas leitura de endereço público
- ✅ Leitura de saldo (público)
- ✅ Leitura de rede conectada
- ✅ Salva conexão para analytics/lead tracking

---

## 📱 SUPORTE A CARTEIRAS

### **Carteiras Suportadas:**

1. **MetaMask** (Principal)
   - Extensão de navegador
   - App mobile

2. **Ledger** (Hardware Wallet)
   - Via WalletConnect
   - Máxima segurança

3. **Coinbase Wallet**
   - Extensão e app

4. **Brave Wallet**
   - Integrado no navegador Brave

5. **Trust Wallet**
   - App mobile

6. **WalletConnect**
   - Protocolo universal
   - Conecta várias carteiras

---

## 🌐 REDES SUPORTADAS

### **Redes Principais:**

- **Polygon** (Chain ID: 137) - Recomendado (taxas baixas)
- **Ethereum** (Chain ID: 1) - Rede principal
- **BSC** (Chain ID: 56) - Binance Smart Chain
- **Arbitrum** (Chain ID: 42161) - Layer 2
- **Optimism** (Chain ID: 10) - Layer 2

### **Testnets:**

- **Mumbai** (Chain ID: 80001) - Polygon Testnet
- **Goerli** (Chain ID: 5) - Ethereum Testnet

---

## 🎨 DESIGN E UX

### **Cores e Estilo:**

**Desconectado:**
- Gradiente: Roxo → Azul
- Borda: Roxa translúcida
- Sombra: Roxa suave

**Conectado:**
- Gradiente: Verde → Verde claro
- Borda: Verde translúcida
- Sombra: Verde brilhante
- Animação: Pulse (pulsação)

### **Responsividade:**

- ✅ Mobile: Card adaptado
- ✅ Tablet: Layout otimizado
- ✅ Desktop: Visual completo

---

## 🔗 LINKS ÚTEIS

### **Para Usuários:**

- **Instalar MetaMask:** https://metamask.io/download/
- **Ver no Polygonscan:** Abre automaticamente quando conectado
- **Ver no Etherscan:** Abre automaticamente (se Ethereum)

### **Para Desenvolvedores:**

- **Componente:** `src/components/WalletConnect.tsx`
- **Página:** `src/pages/ExperiencePreview.tsx`
- **API Backend:** `azimut-cms/app/api/web3/wallet/connect/route.ts`

---

## 📊 FLUXO COMPLETO

```
1. Usuário acessa /pt/experience-preview
   ↓
2. Vê card "Conectar Carteira"
   ↓
3. Clica em "Conectar Carteira"
   ↓
4. MetaMask abre popup
   ↓
5. Usuário aprova conexão
   ↓
6. Frontend recebe endereço + chainId + saldo
   ↓
7. Envia para backend (/api/web3/wallet/connect)
   ↓
8. Backend salva conexão (opcional - tabela Wallet)
   ↓
9. Frontend atualiza UI:
   - Card fica verde
   - Indicador fixo aparece no topo
   - Mostra endereço, rede, saldo
   ↓
10. Usuário pode:
    - Ver no explorer
    - Desconectar
    - Receber NFTs/tokens (futuro)
```

---

## ✅ RESUMO

**Onde aparece:** Página `/pt/experience-preview`

**Como conectar:** 
1. Clicar em "Conectar Carteira"
2. Aprovar no MetaMask
3. Pronto! ✅

**O que aparece:**
- Card verde quando conectado
- Indicador fixo no topo
- Endereço, rede e saldo

**Segurança:** 
- Apenas leitura pública
- Não acessa fundos
- Não pede chave privada

**Pronto para usar!** 🚀
