# 📊 Análise: Quantidade de Itens no Menu Superior

## 🎯 Problema

**Preocupação:** Muitos itens no menu superior podem:
- ❌ Sobrecarregar visualmente
- ❌ Dificultar navegação
- ❌ Confundir usuário
- ❌ Quebrar em mobile (hamburger)

---

## 📐 Padrões de UX para Menus

### **Best Practices:**

1. **Desktop:**
   - ✅ **Ideal:** 5-7 itens
   - ⚠️ **Aceitável:** 8 itens (se bem espaçados)
   - ❌ **Ruim:** 9+ itens

2. **Mobile:**
   - ✅ **Ideal:** 5-6 itens (antes do hamburger)
   - ⚠️ **Aceitável:** 7 itens
   - ❌ **Ruim:** 8+ itens (hamburger obrigatório)

3. **Regra dos 7±2:**
   - Psicologia cognitiva: humanos processam melhor 5-9 itens
   - **Ideal:** 5-7 itens

---

## 🔍 Situação Atual do Azimut

### **Menu Atual:**
```
Home | What | Work | Studio | Research | Academy | Contact
```
**Total: 7 itens** ✅ Dentro do ideal

### **Se Adicionar "Opportunities":**
```
Home | What | Work | Studio | Opportunities | Research | Academy | Contact
```
**Total: 8 itens** ⚠️ No limite aceitável

### **Problema:**
- 8 itens pode ser demais, especialmente em mobile
- Menu pode ficar apertado
- Usuário pode se perder

---

## 💡 Soluções Propostas

### **SOLUÇÃO 1: Agrupar Research & Academy** ⭐ **RECOMENDADA**

**Estratégia:** Juntar Research + Academy em "LAB"

**Menu:**
```
Home | What | Work | Studio | Lab | Contact
```
**Total: 6 itens** ✅ Ideal!

**Estrutura:**
- `/lab` → Página única com duas seções:
  - **Seção 1:** Research (P&D interno)
  - **Seção 2:** Academy (Educação externa)

**Vantagens:**
- ✅ Menu mais limpo (6 itens)
- ✅ Faz sentido conceitual (lab = pesquisa + educação)
- ✅ Não perde informação (tudo em um lugar)
- ✅ Melhor para mobile

**Desvantagens:**
- ⚠️ Pode precisar scroll na página (mas é aceitável)

---

### **SOLUÇÃO 2: Submenu "Services"**

**Estratégia:** Agrupar What + Opportunities em "Services" com submenu

**Menu:**
```
Home | Services ▼ | Work | Studio | Research | Academy | Contact
```

**Submenu Services:**
- What (Soluções)
- Opportunities (Editais)

**Total: 6 itens principais** ✅ Ideal!

**Vantagens:**
- ✅ Menu principal limpo
- ✅ Agrupa serviços logicamente
- ✅ Escalável (pode adicionar mais serviços)

**Desvantagens:**
- ⚠️ Requer hover/click (pode ser menos acessível)
- ⚠️ Mais complexo de implementar

---

### **SOLUÇÃO 3: Oportunidades em Work (SEM menu próprio)**

**Estratégia:** Oportunidades como seção dentro de Work, não menu próprio

**Menu:**
```
Home | What | Work | Studio | Research | Academy | Contact
```
**Total: 7 itens** ✅ Mantém atual

**Estrutura:**
- `/work` → Tem seção "Oportunidades" no final
- Link direto: `/work#opportunities`

**Vantagens:**
- ✅ Não adiciona item no menu
- ✅ Oportunidades acessíveis via Work
- ✅ Faz sentido: "veja projetos, veja oportunidades"

**Desvantagens:**
- ⚠️ Oportunidades menos visíveis (precisa scroll em Work)

---

### **SOLUÇÃO 4: Menu Compacto (Ícones + Texto)**

**Estratégia:** Usar ícones para alguns itens, reduzir texto

**Menu:**
```
🏠 | What | Work | Studio | 🔬 | 🎓 | Contact
```

**Vantagens:**
- ✅ Mais itens cabem
- ✅ Visual mais limpo

**Desvantagens:**
- ❌ Ícones podem ser ambíguos
- ❌ Menos acessível (screen readers)
- ❌ Não segue padrão do site atual

---

## 🏆 Recomendação Final

### **SOLUÇÃO 1 + SOLUÇÃO 3: Combinada** ⭐⭐⭐

**Estratégia:**
1. **Agrupar Research + Academy em "LAB"** (reduz 1 item)
2. **Oportunidades como seção em Work** (não adiciona item)

**Menu Final:**
```
Home | What | Work | Studio | Lab | Contact
```
**Total: 6 itens** ✅ Perfeito!

**Estrutura:**
- `/work` → Projetos + Seção "Oportunidades" no final
- `/lab` → Research (seção 1) + Academy (seção 2)
- `/studio` → Só sobre nós (limpo)

**Vantagens:**
- ✅ Menu ideal (6 itens)
- ✅ Não sobrecarrega
- ✅ Fácil navegação
- ✅ Mobile-friendly
- ✅ Mantém toda informação

---

## 📱 Análise Mobile

### **Menu Atual (7 itens):**
- Hamburger aparece cedo (telas pequenas)
- 7 itens no drawer = OK

### **Menu Proposto (6 itens):**
- Hamburger aparece mais tarde
- 6 itens no drawer = Excelente
- Mais espaço para cada item

---

## 🎨 Comparação Visual

### **Antes (7 itens):**
```
[Home] [What] [Work] [Studio] [Research] [Academy] [Contact]
```
**Largura estimada:** ~560px (PT) / ~520px (EN)

### **Depois (6 itens):**
```
[Home] [What] [Work] [Studio] [Lab] [Contact]
```
**Largura estimada:** ~480px (PT) / ~440px (EN)

**Ganho:** ~80px de espaço livre ✅

---

## 📋 Plano de Implementação

### **Fase 1: Criar página LAB**
- [ ] Criar `/lab` (Research + Academy)
- [ ] Seção 1: Research
- [ ] Seção 2: Academy
- [ ] Navegação interna (ancoras)

### **Fase 2: Reorganizar Work**
- [ ] Adicionar seção "Oportunidades" em Work
- [ ] Adicionar CTA "Queremos revisar seu projeto"
- [ ] Link âncora: `/work#opportunities`

### **Fase 3: Atualizar Menu**
- [ ] Remover "Research" e "Academy" do menu
- [ ] Adicionar "Lab" no menu
- [ ] Atualizar traduções

### **Fase 4: Limpar Studio**
- [ ] Remover OportunidadesAtivas
- [ ] Remover CTA de Studio

---

## ✅ Resumo Executivo

**Problema:** 8 itens no menu seria demais

**Solução:**
1. **Agrupar Research + Academy → "LAB"** (reduz 1 item)
2. **Oportunidades em Work** (não adiciona item)

**Resultado:**
- ✅ **6 itens no menu** (ideal para UX)
- ✅ Menu mais limpo e fácil de navegar
- ✅ Mobile-friendly
- ✅ Mantém toda informação

**Menu Final:**
```
Home | What | Work | Studio | Lab | Contact
```

