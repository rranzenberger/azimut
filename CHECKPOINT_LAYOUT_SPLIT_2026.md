# 🔒 **CHECKPOINT: ANTES DO LAYOUT LADO DIREITO (Split Screen)**

**Data:** 06 Jan 2025 - 21:45  
**Branch:** main  
**Status:** ✅ Checkpoint criado com sucesso

---

## 📸 **ESTADO ATUAL (ANTES):**

### **HERO - Logo Watermark:**
- Logo animada ATRÁS do texto (opacity 0.20)
- Size: 65vh × 65vh
- z-index: 0 (atrás)
- Texto na frente (z-index: 10)
- Problema: Logo pouco visível + interfere na legibilidade

### **Estrutura:**
```tsx
<section className="relative h-screen">
  {/* Logo watermark gigante (z-0) */}
  <div className="absolute inset-0 opacity-20 z-0">
    <AnimatedLogo />
  </div>
  
  {/* Texto na frente (z-10) */}
  <div className="relative z-10">
    <h1>EXPERIÊNCIAS QUE CONECTAM MUNDOS</h1>
    <div>Pills</div>
    <div>Stats</div>
    <button>CTA</button>
  </div>
</section>
```

---

## 🎯 **PRÓXIMA IMPLEMENTAÇÃO:**

### **LAYOUT LADO DIREITO (Split Screen 55/45):**

```
┌──────────────┬──────────────────────┐
│ ESQUERDA 55% │    DIREITA 45%      │
├──────────────┼──────────────────────┤
│              │                      │
│ EXPERIÊNCIAS │                      │
│ QUE CONECTAM │   [LOGO ANIMADA]     │
│ MUNDOS       │   [400px VISÍVEL]    │
│              │   [PROTAGONISTA]     │
│ Cinema • VR  │                      │
│              │                      │
│ [Explorar →] │                      │
│              │                      │
└──────────────┴──────────────────────┘
```

**Vantagens esperadas:**
1. ✅ Logo TEM PALCO (protagonista!)
2. ✅ Texto LIMPO (sem logo atrás)
3. ✅ Animação VALORIZADA (todos veem!)
4. ✅ Padrão Apple/Cartier (produtos premium)

---

## 🔙 **COMO REVERTER:**

### **Opção 1: Restaurar arquivo:**
```bash
Copy-Item "src\pages\Home.CHECKPOINT-antes-layout-split.tsx" "src\pages\Home.tsx"
```

### **Opção 2: Git (se commitado):**
```bash
git checkout -- src/pages/Home.tsx
```

---

## 📦 **ARQUIVOS BACKUP:**

- `Home.CHECKPOINT-antes-layout-split.tsx` → Estado atual (watermark)
- `Home.CHECKPOINT-antes-watermark.tsx` → Tipografia monumental
- `Home.alternativa-B-tipografia.tsx` → Alternativa B pura
- `Home.backup-tipografia.tsx` → Versão original antes tipografia

---

## 🧪 **PRÓXIMOS TESTES:**

1. Layout lado direito (implementar agora)
2. Ver visualmente (npm run dev)
3. Avaliar: Borda preta? Tamanho? Posição?
4. Decidir: Aprovar OU reverter

---

**Documento:** `CHECKPOINT_LAYOUT_SPLIT_2026.md`  
**Backup:** `Home.CHECKPOINT-antes-layout-split.tsx`  
**Status:** ✅ Pronto para implementar!


