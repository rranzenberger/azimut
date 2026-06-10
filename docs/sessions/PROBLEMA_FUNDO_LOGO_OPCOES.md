# 🚨 **PROBLEMA: FUNDO ESCURO NA LOGO**

## ✅ **CONFIRMADO:**

SIM, substitui o GIF pelo WebM alpha:
```tsx
<source src="/azimut-alpha-full.webm" type="video/webm; codecs=vp9" />
```

MAS há um **retângulo escuro** ao redor da logo!

---

## 🔍 **CAUSAS POSSÍVEIS:**

### **1. O arquivo WebM NÃO tem alpha real** ⚠️

O arquivo `azimut-alpha-full.webm` pode:
- Ter fundo preto embutido no vídeo
- Não ter alpha channel funcionando
- Ter sido exportado incorretamente

**Para verificar:**
- Testar o vídeo em fundo branco/colorido
- Ver se aparece retângulo preto
- Se sim = arquivo não tem transparência real

---

### **2. Container tem background** ⚠️

Vejo no código:
```tsx
<div className="w-full max-w-[500px] aspect-square">
  <AnimatedLogo />
</div>
```

O `aspect-square` pode estar criando um fundo!

---

## 🎯 **SOLUÇÕES:**

### **SOLUÇÃO 1: Verificar o arquivo WebM**

O `azimut-alpha-full.webm` foi exportado com:
- ✅ Alpha channel habilitado?
- ✅ Fundo transparente (checkerboard)?
- ✅ Codec VP9 com alpha?

**Se NÃO:** Precisa re-exportar o vídeo!

---

### **SOLUÇÃO 2: Testar com o GIF**

Vamos voltar temporariamente para o GIF para comparar:

```tsx
// Testar se GIF também tem fundo escuro
<source src="/logo_azimut_azimut_animago.gif" ... />
```

Se GIF também tem fundo = problema no container  
Se GIF não tem fundo = problema no WebM

---

### **SOLUÇÃO 3: Remover background do container**

Adicionar explicitamente `background: transparent`:

```tsx
<div className="w-full max-w-[500px] aspect-square" style={{ background: 'transparent' }}>
  <AnimatedLogo />
</div>
```

---

## 🎬 **O QUE VOCÊ QUER FAZER?**

**A)** Verificar se `azimut-alpha-full.webm` tem transparência real  
**B)** Voltar para GIF temporariamente para testar  
**C)** Adicionar `background: transparent` no container  
**D)** Re-exportar o WebM com alpha correto  

**Qual opção?** 🔧





