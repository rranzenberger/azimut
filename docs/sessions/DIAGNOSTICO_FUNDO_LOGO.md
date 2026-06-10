# 🔍 **DIAGNÓSTICO: FUNDO ESCURO NA LOGO**

## ❓ **O QUE ESTÁ ACONTECENDO:**

Você está vendo um **retângulo escuro** ao redor da logo no deploy, certo?

## 🎯 **POSSÍVEIS CAUSAS:**

### **1. O arquivo WebM tem fundo incluído** ⚠️
- `azimut-alpha-full.webm` pode ter fundo escuro no próprio vídeo
- Alpha channel pode não estar funcionando
- Precisa verificar o arquivo

### **2. Container tem background** 
- Pode ter um `background-color` no container
- Precisa remover background do div pai

### **3. Safari está usando MP4 fallback**
- Safari antigo não suporta WebM
- Carrega MP4 que tem fundo preto
- É o comportamento esperado para Safari < 14.1

---

## 🔧 **SOLUÇÃO:**

### **VERIFICAR 1: O WebM tem transparência?**

O arquivo `azimut-alpha-full.webm` foi criado com alpha channel?

**Para ter certeza:**
- Abrir o vídeo em editor (After Effects, Premiere)
- Verificar se o fundo é checkerboard (transparente)
- Ou testar em navegador local

### **VERIFICAR 2: Container Home.tsx**

Vou verificar se tem algum background no container da logo...

---

## 🎨 **COMO DEVE SER:**

**Com transparência (correto):**
```
Logo dourada/vermelha
↓
Fundo do hero visível através
↓
Sem retângulo escuro
```

**Sem transparência (atual):**
```
Logo dourada/vermelha
↓
Retângulo escuro ao redor
↓
Fundo do hero não visível
```

---

## ⚡ **AÇÃO IMEDIATA:**

Deixa eu verificar o código do Home.tsx para ver se tem algum background...





