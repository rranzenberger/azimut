# 🎨 Guia Visual: Como Funciona a Carteira Web3 no Site

## 📍 ONDE APARECE

### **URL da Página:**
```
https://azmt.com.br/pt/experience-preview
```

Esta é a página de **"Degustação"** que mostra as opções de VR, NFT e Web3.

---

## 🎯 VISUAL: ANTES E DEPOIS

### **ANTES (Carteira NÃO Conectada)**

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  🔗 Conectar Carteira Digital                      │
│                                                     │
│  Conecte sua carteira para receber NFTs, tokens    │
│  e recompensas exclusivas. Suportamos MetaMask,    │
│  Ledger, Coinbase Wallet e mais.                   │
│                                                     │
│  Carteiras detectadas:                             │
│  [MetaMask] [WalletConnect]                        │
│                                                     │
│  ┌─────────────────────────────────────────────┐  │
│  │  🔗 Conectar Carteira                      │  │
│  └─────────────────────────────────────────────┘  │
│                                                     │
│  📥 Instale uma Carteira                           │
│  Para conectar, você precisa instalar MetaMask... │
│  [📥 Instalar MetaMask →]                         │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Características:**
- **Cor:** Gradiente roxo/azul
- **Posição:** Sticky (fixo ao rolar)
- **Botão:** Grande e chamativo
- **Efeito:** Hover com elevação

---

### **DEPOIS (Carteira CONECTADA)**

#### **1. Indicador Fixo no Topo** (Sempre visível)

```
┌──────────────────────────────────────────────────────────────┐
│ ✅ Carteira Conectada  [0x1234...5678]  Polygon  0.5 MATIC   │
│                                          [Ver no explorer →] │
└──────────────────────────────────────────────────────────────┘
```

- **Cor:** Verde brilhante
- **Posição:** Fixo no topo (z-index: 1000)
- **Mostra:** Status, endereço, rede, saldo
- **Link:** Abre Polygonscan

#### **2. Card Principal Atualizado**

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  ✅ Carteira Conectada                              │
│                                                     │
│  0x1234...5678                                      │
│                                                     │
│  ⛓️ Polygon  💰 0.5 MATIC                          │
│                                                     │
│  ┌─────────────────────────────────────────────┐  │
│  │  Desconectar                               │  │
│  └─────────────────────────────────────────────┘  │
│                                                     │
│  Ver no explorer:                                   │
│  [Abrir →]                                         │
│                                                     │
└─────────────────────────────────────────────────────┘
```

- **Cor:** Verde com gradiente
- **Efeito:** Animação "pulse" (pulsação)
- **Botão:** "Desconectar" em vermelho

---

## 🔄 PROCESSO DE CONEXÃO

### **Passo 1: Usuário Acessa a Página**

```
Usuário → https://azmt.com.br/pt/experience-preview
         ↓
    Vê card "Conectar Carteira"
```

### **Passo 2: Clica no Botão**

```
Usuário clica: "🔗 Conectar Carteira"
         ↓
    Sistema verifica se MetaMask existe
```

### **Passo 3: MetaMask Abre**

```
Se MetaMask NÃO instalado:
  → Abre: https://metamask.io/download/
  
Se MetaMask instalado:
  → Abre popup do MetaMask
  → Mostra: "Conectar com Azimut?"
```

### **Passo 4: Usuário Aprova**

```
Usuário clica "Conectar" no MetaMask
         ↓
    MetaMask retorna:
    - Endereço da carteira
    - ID da rede (chainId)
    - Saldo (balance)
```

### **Passo 5: Sistema Atualiza**

```
Frontend recebe dados
         ↓
    Envia para backend: /api/web3/wallet/connect
         ↓
    Backend salva conexão (opcional)
         ↓
    Frontend atualiza UI:
    - Card fica verde
    - Indicador fixo aparece
    - Mostra endereço, rede, saldo
```

---

## 🎨 DETALHES VISUAIS

### **Cores e Estilos**

**Desconectado:**
- Background: `linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.1) 100%)`
- Border: `2px solid rgba(139, 92, 246, 0.3)`
- Shadow: `0 8px 32px rgba(139, 92, 246, 0.15)`
- Botão: Gradiente roxo → azul

**Conectado:**
- Background: `linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(16, 185, 129, 0.1) 100%)`
- Border: `2px solid rgba(34, 197, 94, 0.4)`
- Shadow: `0 8px 32px rgba(34, 197, 94, 0.2)`
- Animação: Pulse (pulsação verde)

### **Animações**

1. **Pulse (Pulsação):**
   ```css
   @keyframes pulse {
     0%, 100% { opacity: 0.6; transform: scale(1); }
     50% { opacity: 1; transform: scale(1.1); }
   }
   ```

2. **Hover no Botão:**
   - Eleva 2px
   - Aumenta sombra
   - Transição suave

---

## 📱 RESPONSIVIDADE

### **Mobile (< 768px):**
- Card ocupa largura total
- Botão grande para toque fácil
- Indicador fixo compacto

### **Tablet (768px - 1024px):**
- Card centralizado
- Layout otimizado

### **Desktop (> 1024px):**
- Card com largura máxima
- Visual completo
- Efeitos avançados

---

## 🔗 INTEGRAÇÃO COM BACKEND

### **API Chamada:**

```javascript
POST /api/web3/wallet/connect
{
  "address": "0x1234...5678",
  "chainId": 137
}
```

### **Resposta:**

```javascript
{
  "success": true,
  "wallet": {
    "address": "0x1234...5678",
    "chainId": 137,
    "connected": true
  },
  "message": "Carteira conectada com sucesso"
}
```

### **O que o Backend Faz:**

1. Recebe endereço e chainId
2. Valida formato do endereço
3. (Opcional) Salva no banco (tabela Wallet)
4. Retorna sucesso

---

## 🎯 CASOS DE USO

### **1. Usuário Novo (Sem MetaMask)**

```
1. Acessa página
2. Vê card "Conectar Carteira"
3. Clica no botão
4. Sistema detecta: MetaMask não instalado
5. Abre: https://metamask.io/download/
6. Usuário instala MetaMask
7. Volta ao site
8. Conecta carteira
```

### **2. Usuário com MetaMask**

```
1. Acessa página
2. Vê card "Conectar Carteira"
3. Clica no botão
4. MetaMask abre popup
5. Usuário aprova
6. Carteira conectada ✅
```

### **3. Usuário Já Conectado**

```
1. Acessa página
2. Sistema detecta: Já conectado
3. Mostra card verde automaticamente
4. Indicador fixo aparece
```

---

## 🔄 MUDANÇAS AUTOMÁTICAS

### **Mudança de Conta:**

```
Usuário muda conta no MetaMask
         ↓
    Sistema detecta (event: accountsChanged)
         ↓
    Atualiza endereço automaticamente
```

### **Mudança de Rede:**

```
Usuário muda rede (Ethereum → Polygon)
         ↓
    Sistema detecta (event: chainChanged)
         ↓
    Atualiza chainId e saldo
```

### **Desconexão:**

```
Usuário desconecta no MetaMask
         ↓
    Sistema detecta
         ↓
    Card volta ao estado inicial
    Indicador fixo desaparece
```

---

## 📊 DADOS COLETADOS

### **O que Salvamos:**

- ✅ Endereço da carteira (público)
- ✅ ID da rede (chainId)
- ✅ Timestamp da conexão
- ✅ (Futuro) Associação com lead/usuário

### **O que NÃO Salvamos:**

- ❌ Chave privada (nunca acessível)
- ❌ Seed phrase (nunca acessível)
- ❌ Histórico de transações (pode ver no explorer)

---

## 🚀 PRÓXIMOS PASSOS (Futuro)

### **Funcionalidades Planejadas:**

1. **Receber NFTs:**
   - Mint automático quando completar ações
   - NFT personalizado por projeto

2. **Receber Tokens:**
   - Recompensas em MATIC/ETH
   - Tokens personalizados

3. **Gamificação:**
   - Pontos por ações no site
   - NFTs como badges
   - Ranking de usuários

4. **Marketplace:**
   - Trocar NFTs
   - Vender tokens
   - Economia digital

---

## ✅ RESUMO RÁPIDO

**📍 Onde:** `/pt/experience-preview`

**🔗 Como Conectar:**
1. Clicar em "Conectar Carteira"
2. Aprovar no MetaMask
3. Pronto! ✅

**👁️ O que Aparece:**
- Card verde quando conectado
- Indicador fixo no topo
- Endereço, rede e saldo

**🔐 Segurança:**
- Apenas leitura pública
- Não acessa fundos
- Não pede chave privada

**🎨 Visual:**
- Design moderno
- Animações suaves
- Responsivo

---

## 🎬 DEMONSTRAÇÃO VISUAL

### **Fluxo Completo:**

```
┌─────────────────────────────────────────┐
│  PÁGINA: /pt/experience-preview          │
│                                         │
│  ┌─────────────────────────────────┐  │
│  │  🔗 Conectar Carteira Digital   │  │
│  │  [Botão: Conectar Carteira]     │  │
│  └─────────────────────────────────┘  │
│           ↓ (clique)                   │
│  ┌─────────────────────────────────┐  │
│  │  MetaMask Popup                 │  │
│  │  "Conectar com Azimut?"         │  │
│  │  [Conectar] [Cancelar]          │
│  └─────────────────────────────────┘  │
│           ↓ (aprova)                    │
│  ┌─────────────────────────────────┐  │
│  │  ✅ Carteira Conectada          │  │
│  │  0x1234...5678                  │  │
│  │  ⛓️ Polygon  💰 0.5 MATIC      │  │
│  └─────────────────────────────────┘  │
│                                         │
│  + Indicador Fixo no Topo:            │
│  ✅ Carteira Conectada [0x1234...]    │
└─────────────────────────────────────────┘
```

---

**Pronto para usar!** 🚀
