# 🎨 MELHORIAS PADRONIZADAS - SUBPASTAS DE SERVIÇOS

## 📋 PADRÕES IDENTIFICADOS (Home, Soluções, Studio)

### **CLASSES PADRÃO:**
- `.section-eyebrow` - Label pequeno com emoji, linha vermelha antes
- `.section-title` - Handel uppercase, responsivo
- `.body-large` - Texto grande legível
- `.section-container` - Espaçamento generoso (mb-24)

### **ESTILOS PADRÃO:**
- Cards: `bg-gradient-to-br from-slate-900/50 to-slate-900/30`
- Bordas: `border border-azimut-red/20` → `border-azimut-red/50` (hover)
- Hover: `hover:shadow-[0_20px_60px_rgba(201,35,55,0.2)]`
- Espaçamentos: Seções com `mb-20` ou `.section-container`

---

## ✅ MELHORIAS A IMPLEMENTAR (ServiceDetail.tsx)

### **1. DESCRIÇÃO EXPANDIDA**
**ATUAL:** Texto simples com borda vermelha
**MELHORAR:** Cards premium em grid 2 colunas (como Studio)

### **2. SEÇÕES COM EYEBROW**
**ATUAL:** H2 direto
**MELHORAR:** Adicionar `.section-eyebrow` antes dos títulos

### **3. "O QUE ENTREGAMOS"**
**ATUAL:** Grid 2 colunas simples
**MELHORAR:** Grid 3 colunas, cards premium com números

### **4. CTAs FINAIS**
**ATUAL:** 2 botões simples
**MELHORAR:** Seção completa premium (como WhatWeDo CTA)

---

**MANTENDO:**
- ✅ Tema claro/escuro
- ✅ 4 idiomas
- ✅ Identidade Azimut
- ✅ Classes padrão do site
