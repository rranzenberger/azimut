# 🎬 **GUIA: CRIAR ALPHA CHANNEL NO VÍDEO (Remover Fundo Preto)**

**Problema:** Vídeo MP4 com fundo preto sem alpha channel  
**Solução:** Usar IA para remover fundo preto AUTOMATICAMENTE!  
**Tempo:** 5-10 minutos  
**Custo:** GRATUITO!

---

## 🏆 **OPÇÃO 1: UNSCREEN.COM (Recomendado!)**

### **Melhor ferramenta para remover fundo de vídeos com IA!**

**Link:** https://www.unscreen.com/

### **PASSO A PASSO:**

#### **1. Acesse o site:**
```
https://www.unscreen.com/
```

#### **2. Upload do vídeo:**
- Clique em **"Upload Clip"**
- Selecione: `azimut 3d para 2d.mp4`
- Aguarde o upload (pode demorar 1-2 min)

#### **3. IA processa automaticamente:**
- **Não precisa fazer nada!**
- A IA detecta o fundo preto
- Remove automaticamente
- Gera vídeo com alpha channel

#### **4. Ajustar qualidade (opcional):**
- Se tiver áreas cinzas/problemas
- Clique em **"Refine"**
- Ajuste threshold do preto

#### **5. Download:**
- Formato: **WebM** (com alpha) ✅
- OU **MOV** (ProRes com alpha)
- OU **GIF** (com transparência)

**RECOMENDADO:** WebM (melhor para web!)

#### **6. Renomear arquivo:**
```
logo-azimut-alpha.webm
```

#### **7. Colocar no projeto:**
```
Copiar para: public/logo-azimut-alpha.webm
```

---

## ⚡ **OPÇÃO 2: REMOVE.BG VIDEO**

### **Alternativa ao Unscreen:**

**Link:** https://www.remove.bg/pt-br/upload

**Passos:**
1. Upload do vídeo MP4
2. IA remove fundo preto automaticamente
3. Download WebM com alpha
4. **Limitação:** 5 segundos grátis (pode precisar conta Pro)

---

## 🎨 **OPÇÃO 3: RUNWAY ML (Profissional)**

### **Se as outras não funcionarem bem:**

**Link:** https://runwayml.com/

**Recursos:**
- IA mais poderosa
- Remove fundo com precisão
- 3 vídeos grátis por mês
- Exporta MOV/WebM com alpha

**Passos:**
1. Criar conta grátis
2. Upload vídeo
3. Selecionar ferramenta: **"Remove Background"**
4. Processar
5. Download com alpha channel

---

## 💻 **OPÇÃO 4: DAVINCI RESOLVE (Grátis, Local)**

### **Se preferir software desktop gratuito:**

**Link:** https://www.blackmagicdesign.com/products/davinciresolve

**Passos:**

1. **Baixar e instalar DaVinci Resolve (grátis)**

2. **Importar vídeo:**
   - File → Import → `azimut 3d para 2d.mp4`

3. **Aplicar Chroma Key:**
   - Color tab
   - Selecionar clip
   - Effects → **"3D Keyer"**
   - Selecionar cor preta para remover
   - Ajustar threshold

4. **Exportar com Alpha:**
   ```
   Deliver Tab:
   ├─ Format: QuickTime
   ├─ Codec: ProRes 4444
   ├─ Video: Include Alpha ✅
   └─ Export
   ```

5. **Converter para WebM:**
   - Usar CloudConvert (já explicado antes)
   - MOV → WebM com alpha

**Tempo:** 20-30 min (mais complexo)

---

## 🌐 **OPÇÃO 5: ONLINE VIDEO CONVERTER**

### **Capcut Online - Remove Fundo:**

**Link:** https://www.capcut.com/

**Recursos:**
- Editor online grátis
- Remove fundo automaticamente
- Exporta MP4/WebM

**Passos:**
1. Criar conta grátis
2. Upload vídeo
3. Tools → **"Remove Background"**
4. Export → WebM

---

## 📋 **COMPARAÇÃO:**

| Ferramenta | Facilidade | Qualidade IA | Tempo | Custo | Recomendação |
|------------|-----------|--------------|-------|-------|--------------|
| **Unscreen** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 5 min | Grátis | 🏆 **MELHOR!** |
| Remove.bg | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 5 min | Grátis (limite) | ✅ Boa |
| Runway ML | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 10 min | Grátis (3/mês) | ✅ Profissional |
| DaVinci | ⭐⭐ | ⭐⭐⭐ | 30 min | Grátis | ⚠️ Complexo |
| CapCut | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 10 min | Grátis | ✅ Simples |

---

## 🚀 **MINHA RECOMENDAÇÃO:**

### **USE UNSCREEN.COM! (Mais fácil e rápido)**

**Por quê:**
1. ✅ **100% automático** (IA remove fundo sozinha)
2. ✅ **5 minutos** (muito rápido!)
3. ✅ **Grátis** (sem limite para 1 vídeo)
4. ✅ **WebM direto** (formato perfeito!)
5. ✅ **Qualidade excelente** (IA profissional)

---

## 📝 **DEPOIS DE GERAR O VÍDEO COM ALPHA:**

### **Vou atualizar o código assim:**

```tsx
// src/components/AnimatedLogo.tsx

export const AnimatedLogo = () => {
  return (
    <video 
      autoPlay 
      loop 
      muted 
      playsInline 
      className="w-full h-full object-contain"
    >
      {/* NOVO: WebM com alpha (SEM preto!) */}
      <source src="/logo-azimut-alpha.webm" type="video/webm" />
      
      {/* Fallback: MP4 original (com preto) */}
      <source src="/azimut 3d para 2d.mp4" type="video/mp4" />
    </video>
  )
}
```

### **Remover todos os filtros pesados:**

```tsx
// src/pages/Home.tsx

<div className="w-[550px] h-[550px]">
  {/* SIMPLES! Sem blend mode, sem filtros! */}
  <AnimatedLogo />
  
  {/* Apenas glow vermelho */}
  <div style={{
    filter: 'drop-shadow(0 0 80px rgba(201, 35, 55, 0.6))'
  }} />
</div>
```

**Resultado:** Logo 100% TRANSPARENTE! ✨

---

## 🎯 **RESUMO DO PROCESSO:**

### **Fluxo Completo:**

```
1. Unscreen.com
   ↓
2. Upload: azimut 3d para 2d.mp4
   ↓
3. IA remove fundo preto (automático!)
   ↓
4. Download: logo-azimut-alpha.webm
   ↓
5. Copiar para: public/logo-azimut-alpha.webm
   ↓
6. Eu atualizo código (1 minuto)
   ↓
7. PRONTO! Logo 100% transparente! ✅
```

**Tempo total:** 10 minutos

---

## ⚠️ **SE UNSCREEN NÃO FUNCIONAR:**

### **Plano B - Ajustar blend mode enquanto isso:**

Posso aplicar blend modes ainda mais agressivos:

```tsx
// Temporário até você criar alpha

<div style={{
  mixBlendMode: 'screen',
  filter: 'brightness(2.5) contrast(2)',  // MUITO agressivo
  WebkitMaskImage: 'radial-gradient(...)', // Fade bordas
}}>
  <AnimatedLogo />
</div>
```

**OU voltar para SVG estático** (solução anterior - sem preto!)

---

## 🎬 **ENQUANTO ISSO:**

### **Quer que eu:**

**A)** 🔥 **Aplicar blend mode ULTRA agressivo** (temporário)?
- brightness(2.5) + contrast(2)
- Pode ficar artificial mas remove preto

**B)** ⏪ **Voltar para SVG estático** (sem vídeo)?
- 100% transparente
- Rotação suave
- Sem preto (garantido!)

**C)** ⏳ **Esperar você gerar alpha** no Unscreen?
- Melhor solução!
- 100% profissional
- 10 minutos

---

## 📦 **RECURSOS:**

**Links úteis:**
- 🏆 Unscreen: https://www.unscreen.com/
- Remove.bg: https://www.remove.bg/pt-br/upload
- Runway ML: https://runwayml.com/
- CapCut: https://www.capcut.com/
- DaVinci: https://www.blackmagicdesign.com/products/davinciresolve

---

## 💬 **AGUARDANDO SUA DECISÃO:**

**Me diga:**

1. ❓ **Vai tentar Unscreen agora?** (recomendo!)
2. ❓ **Quer blend mode ultra agressivo temporário?**
3. ❓ **Prefere voltar para SVG?** (sem vídeo)

**Estou aqui para ajudar!** 🚀


