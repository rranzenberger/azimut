# 🎯 Proposta: Slogan Complementar (Header vs Hero)

## 📍 Situação Atual

### **Header (Logo):**
```
azimut
IMMERSIVE • INTERACTIVE CINEMATIC EXPERIENCES
```

### **Hero (Página Home):**
```
IMMERSIVE • INTERACTIVE
CINEMATIC EXPERIENCES
```

**Problema:** Repetição! O mesmo slogan aparece duas vezes.

---

## ✅ Solução Proposta

### **Estrutura Ideal:**

**Header (mantém):**
```
azimut
IMMERSIVE • INTERACTIVE CINEMATIC EXPERIENCES
```
*→ Slogan institucional, sempre visível*

**Hero (complementa):**
```
IMMERSIVE • INTERACTIVE • CINEMATIC
EXPERIENCES THAT CONNECT WORLDS
```
*→ Slogan dinâmico, mais poético, complementa o header*

---

## 🎯 Melhor Escolha: "EXPERIENCES THAT CONNECT WORLDS"

### **Por quê esta é a melhor opção:**

1. ✅ **Não conflita com header**
   - Header: "IMMERSIVE • INTERACTIVE CINEMATIC EXPERIENCES" (o quê)
   - Hero: "EXPERIENCES THAT CONNECT WORLDS" (por quê/benefício)

2. ✅ **Complementa perfeitamente**
   - Header = identidade (o que fazemos)
   - Hero = propósito (por que fazemos)

3. ✅ **Tom humilde mas impactante**
   - "Connect worlds" = poético, não arrogante
   - Reflete binacional (BR ↔ CA)
   - Reflete conexão (cultura ↔ tecnologia)

4. ✅ **Compreensível**
   - Linguagem simples
   - Funciona em todos os idiomas
   - Memorable

5. ✅ **Diferencia de outros estúdios**
   - "Connect worlds" é único
   - Não é genérico como "experiences"

---

## 📝 Implementação

### **Estrutura Final:**

**Header (Layout.tsx):**
```tsx
// Mantém como está
alt="Azimut – Immersive • Interactive • Cinematic Experiences"
```

**Hero (Home.tsx):**
```tsx
<span className="block">IMMERSIVE • INTERACTIVE • CINEMATIC</span>
<span className="block">EXPERIENCES THAT CONNECT WORLDS</span>
```

**Subtitle (já implementado):**
```tsx
"Após 30 anos explorando diferentes caminhos, descobrimos que nossa 
combinação de curadoria de festivais, produção comercial, educação 
e pesquisa é única. Transformamos espaços culturais, marcas e 
experiências imersivas entre Brasil e Canadá."
```

---

## 🌍 Traduções

### **Versões Multilíngue:**

**PT:**
```
IMMERSIVE • INTERACTIVE • CINEMATIC
EXPERIÊNCIAS QUE CONECTAM MUNDOS
```

**EN:**
```
IMMERSIVE • INTERACTIVE • CINEMATIC
EXPERIENCES THAT CONNECT WORLDS
```

**ES:**
```
IMMERSIVE • INTERACTIVE • CINEMATIC
EXPERIENCIAS QUE CONECTAN MUNDOS
```

**FR:**
```
IMMERSIVE • INTERACTIVE • CINEMATIC
EXPÉRIENCES QUI CONNECTENT LES MONDES
```

---

## 🎨 Hierarquia Visual

### **Header (sempre visível):**
- Tamanho: pequeno (text-[0.7rem])
- Função: Identidade institucional
- Texto: "IMMERSIVE • INTERACTIVE CINEMATIC EXPERIENCES"

### **Hero (destaque principal):**
- Tamanho: grande (text-[2.5rem] md:text-[2.8rem])
- Função: Impacto e propósito
- Texto: "EXPERIENCES THAT CONNECT WORLDS"

### **Subtitle (contexto):**
- Tamanho: médio (text-[0.95rem])
- Função: Explicação detalhada
- Texto: "Após 30 anos explorando..."

---

## ✅ Vantagens desta Abordagem

1. **Não conflita:** Header e Hero têm funções diferentes
2. **Complementa:** Um explica "o quê", outro explica "por quê"
3. **Hierarquia clara:** Header institucional, Hero impactante
4. **Tom consistente:** Ambos humildes mas impactantes
5. **Diferenciação:** "Connect worlds" é único

---

## 🚀 Próximos Passos

1. Atualizar `src/pages/Home.tsx` (hero)
2. Atualizar `src/data/content.ts` (hero.title)
3. Adicionar traduções (PT, ES, FR)
4. Manter header como está (não conflita)

---

**Status:** Proposta pronta para implementação.

