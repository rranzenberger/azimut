# 🎯 **GUIA RÁPIDO: UNSCREEN.COM (5 Minutos)**

**Ferramenta:** Unscreen.com - Remove fundo de vídeo com IA  
**Tempo:** 5 minutos  
**Custo:** GRATUITO  
**Resultado:** Vídeo com transparência 100%!

---

## 📸 **PASSO A PASSO COM PRINTS:**

### **1️⃣ Acesse:**
```
https://www.unscreen.com/
```

### **2️⃣ Clique "Upload Clip":**
```
┌─────────────────────────────────┐
│                                 │
│    🎬 Upload Clip               │
│                                 │
│  Drag & drop your video here   │
│      or click to browse         │
│                                 │
└─────────────────────────────────┘
```

### **3️⃣ Selecione o arquivo:**
```
azimut 3d para 2d.mp4
```

### **4️⃣ Aguarde processamento (1-2 min):**
```
┌─────────────────────────────────┐
│ Processing... 🔄                │
│ ████████████░░░░░░░ 75%        │
│                                 │
│ Removing background with AI... │
└─────────────────────────────────┘
```

### **5️⃣ Preview do resultado:**
```
┌─────────────────────────────────┐
│ ANTES          │      DEPOIS    │
├────────────────┼────────────────┤
│ [Logo + Preto] │ [Logo + ✨]    │
│                │  (transparente)│
└─────────────────────────────────┘
```

### **6️⃣ Download:**
```
┌─────────────────────────────────┐
│ Choose format:                  │
│                                 │
│ ○ MP4 (no alpha)               │
│ ● WebM (with alpha) ✅         │
│ ○ GIF (animated)               │
│                                 │
│   [Download HD] [Download Pro] │
└─────────────────────────────────┘
```

**ESCOLHA:** WebM (with alpha) ✅

### **7️⃣ Salvar arquivo:**
```
Salvar como:
logo-azimut-alpha.webm
```

### **8️⃣ Copiar para projeto:**
```powershell
# No seu projeto:
Copy-Item "C:\Downloads\logo-azimut-alpha.webm" "C:\Users\ranz\Documents\azimut-site-vite-tailwind\public\"
```

---

## ✅ **PRONTO! Agora me avise que vou atualizar o código!**

---

## 🔧 **O QUE VOU FAZER DEPOIS:**

### **Atualizar AnimatedLogo.tsx:**
```tsx
<video autoPlay loop muted playsInline>
  {/* NOVO: WebM com alpha - SEM PRETO! */}
  <source src="/logo-azimut-alpha.webm" type="video/webm" />
  
  {/* Fallback antigo */}
  <source src="/azimut 3d para 2d.mp4" type="video/mp4" />
</video>
```

### **Simplificar Home.tsx:**
```tsx
<div className="w-[550px] h-[550px]">
  {/* SIMPLES! Sem blend mode agressivo! */}
  <AnimatedLogo />
</div>
```

**Resultado:**
- ✅ Logo 100% transparente
- ✅ SEM preto
- ✅ SEM filtros pesados
- ✅ Performance perfeita
- ✅ Visual profissional

---

## ⏱️ **LINHA DO TEMPO:**

```
AGORA: Você acessa Unscreen.com
  ↓
+2min: Upload + processamento
  ↓
+3min: Download WebM
  ↓
+1min: Copiar para public/
  ↓
+1min: Eu atualizo código
  ↓
TOTAL: 7 minutos

RESULTADO: Logo perfeita 100% transparente! ✨
```

---

## 💡 **DICA PRO:**

Se o Unscreen pedir para criar conta:
- Use Google login (1 clique)
- OU use email temporário: https://temp-mail.org/

---

## 🚀 **COMECE AGORA:**

**Link direto:** https://www.unscreen.com/

**Me avise quando terminar de baixar o WebM!** 🎯


