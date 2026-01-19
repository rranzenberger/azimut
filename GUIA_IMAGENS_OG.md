# 🎨 GUIA DE IMAGENS OG (Open Graph)

## 📸 O QUE SÃO?

Imagens Open Graph são os "cards" que aparecem quando você compartilha um link no:
- WhatsApp
- Facebook
- LinkedIn
- Twitter
- Slack

**Tamanho recomendado:** 1200x630px (proporção 1.91:1)

---

## 🎯 IMAGENS NECESSÁRIAS

### 1. Homepage (azmt.com.br)
**Arquivo:** `public/images/og-home.jpg`
**Conteúdo:** Logo Azimut + tagline "30 anos criando o impossível"
**Usado em:** Home page

### 2. Academy (azmt.com.br/academy)
**Arquivo:** `public/images/og-academy.jpg`
**Conteúdo:** Logo + "Azimut Academy" + ícones VR/IA
**Usado em:** Todas páginas academy

### 3. Vancouver (azmt.com.br/academy/vancouver)
**Arquivo:** `public/images/og-vancouver.jpg`
**Conteúdo:** Logo + bandeira Canadá + "Study in Vancouver"
**Usado em:** Página Vancouver

### 4. Projects (azmt.com.br/work)
**Arquivo:** `public/images/og-projects.jpg`
**Conteúdo:** Logo + "VR • 360° • IA" + montagem de projetos
**Usado em:** Página de projetos

### 5. Studio (azmt.com.br/studio)
**Arquivo:** `public/images/og-studio.jpg`
**Conteúdo:** Logo + "Studio Azimut" + equipamentos
**Usado em:** Página studio

---

## 🛠️ COMO CRIAR

### Opção 1: Canva (recomendado - grátis)
1. Acessar https://canva.com
2. Criar design customizado 1200x630px
3. Adicionar:
   - Logo Azimut
   - Texto (título + subtítulo)
   - Background gradiente escuro
   - Cor vermelha Azimut (#c92337)
4. Download como JPG

### Opção 2: Figma (profissional)
1. Criar frame 1200x630px
2. Usar identidade visual Azimut
3. Exportar como JPG/PNG

### Opção 3: Photoshop/GIMP
1. Novo documento 1200x630px
2. Design livre
3. Salvar como JPG (qualidade 80-90%)

---

## 📁 ONDE COLOCAR

Criar pasta `public/images/` e adicionar:

```
public/
  images/
    og-home.jpg         (homepage)
    og-academy.jpg      (academy geral)
    og-vancouver.jpg    (vancouver)
    og-projects.jpg     (work/projetos)
    og-studio.jpg       (studio)
    og-default.jpg      (fallback genérico)
```

---

## 💻 COMO USAR NO CÓDIGO

### Já implementado no componente SEO!

**Exemplo (já funciona):**
```typescript
<SEO
  title="Study in Vancouver"
  description="VanArts & VFS programs"
  ogImage="https://azmt.com.br/images/og-vancouver.jpg"
  ogUrl="https://azmt.com.br/en/academy/vancouver"
  lang="en"
/>
```

---

## ✅ STATUS

- [x] Componente SEO pronto
- [x] Código implementado
- [ ] **FALTA:** Criar imagens JPG
- [ ] **FALTA:** Upload para `public/images/`

---

## 🎨 TEMPLATE BÁSICO

**Estrutura visual recomendada:**

```
┌─────────────────────────────────────┐
│                                     │
│   [LOGO AZIMUT]                     │
│                                     │
│   TÍTULO PRINCIPAL                  │
│   Subtítulo ou tagline              │
│                                     │
│   [Ícones/Imagens relevantes]       │
│                                     │
│   azmt.com.br                       │
│                                     │
└─────────────────────────────────────┘
```

**Cores:**
- Background: Gradiente escuro (#0a0e18 → #060a12)
- Texto: Branco (#ffffff)
- Destaque: Vermelho Azimut (#c92337)

---

## 📊 TESTE

Depois de criar as imagens, testar com:

1. **Facebook Debugger:**
   https://developers.facebook.com/tools/debug/

2. **LinkedIn Post Inspector:**
   https://www.linkedin.com/post-inspector/

3. **Twitter Card Validator:**
   https://cards-dev.twitter.com/validator

---

## 💡 DICA

Se não tiver tempo agora, o site vai funcionar com a imagem padrão.
Mas criar imagens customizadas aumenta **muito** os clicks ao compartilhar!

**Prioridade:** MÉDIA (pode fazer depois)
