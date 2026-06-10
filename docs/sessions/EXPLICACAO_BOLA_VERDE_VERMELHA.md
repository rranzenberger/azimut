# 💬 EXPLICAÇÃO: BOLA VERDE E VERMELHA NO SITE

**Data:** 11/01/2026  
**Pergunta:** "O que é estas bolas verde e vermelho são um em cima do outro ou só uma coisa só?"

---

## 🔍 O QUE É:

### **É um ÚNICO elemento: Botão do Assistente Virtual (Claude Assistant)**

**Não são duas bolas separadas - é um botão com um badge de notificação!**

---

## 📊 ESTRUTURA:

### **1. Botão Principal:**
- **Cor:** Vermelho (cor Azimut #c92337)
- **Posição:** Canto inferior direito
- **Formato:** Círculo redondo
- **Ícone:** 💬 (balão de conversa)
- **Função:** Abrir/fechar chat do assistente virtual

### **2. Badge Verde (Notificação):**
- **Cor:** Verde (#10b981 - green-500)
- **Posição:** Canto superior direito do botão (sobreposto)
- **Formato:** Pequeno círculo (16px × 16px)
- **Função:** Indicador de notificação (nova mensagem/disponível)
- **Animação:** Pulsa (animate-pulse)
- **Quando aparece:** Quando usuário ainda não foi cumprimentado (`!hasGreeted`)

---

## 🎯 COMO FUNCIONA:

### **Quando aparece:**
- ✅ Badge verde aparece quando assistente ainda não cumprimentou o usuário
- ✅ Badge verde desaparece após primeiro contato

### **Código:**
```tsx
{!hasGreeted && (
  <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
)}
```

**Tradução:**
- Se usuário NÃO foi cumprimentado → Mostra badge verde
- Badge verde = "Olá! Tenho algo para você"

---

## 💡 RESPOSTA DIRETA:

**É UMA COISA SÓ - um botão com badge de notificação!**

- ✅ **Botão vermelho** = Botão principal do assistente
- ✅ **Badge verde** = Indicador de notificação (sobreposto no canto)

**Não são duas bolas separadas - é um botão vermelho com um pequeno círculo verde no canto superior direito!**

---

## 🎨 VISUALMENTE:

```
     [Badge Verde]
         👆
    ┌─────────┐
    │  💬     │  ← Botão Vermelho (Claude Assistant)
    │         │
    └─────────┘
```

**Estrutura:**
- Botão vermelho (fundo)
- Badge verde pequeno no canto superior direito (sobreposto)
- Tudo junto = Um único elemento interativo

---

## ✅ CONCLUSÃO:

**É um ÚNICO elemento:**
- ✅ Botão do Assistente Virtual (Claude Assistant)
- ✅ Badge verde = Notificação de nova conversa
- ✅ Não são duas coisas separadas
- ✅ É um botão com indicador de notificação

**Função:** Abrir chat do assistente virtual da Azimut

---

**💡 Resposta:** É uma coisa só - um botão vermelho com um badge verde de notificação no canto! 🎯
