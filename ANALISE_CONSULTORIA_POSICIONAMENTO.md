# 💼 Análise: Onde Consultoria Entraria Melhor?

## 📍 Onde Consultoria Aparece Atualmente

### **1. What/Solutions** (`src/data/content.ts`)
- ✅ Já existe: "Educação & Consultoria" (serviço combinado)
- ✅ Mencionado em: "IA Criativa" → "consultoria IA"

### **2. Academy** (`src/pages/Academy.tsx`)
- ✅ "Consultoria Especializada" dentro de "Treinamento Corporativo"

### **3. Contact** (`src/pages/Contact.tsx`)
- ✅ Opção: "Consultoria / Captação"

### **4. CredibilidadeEditais**
- ✅ Mencionado: "Consultoria e execução para editais"

---

## 🎯 Análise: Onde Faz Mais Sentido?

### **Opção 1: What/Solutions (RECOMENDADO)**
**Vantagens:**
- ✅ Consultoria é um **serviço principal**, não apenas treinamento
- ✅ Clientes procuram consultoria em "Soluções/Serviços"
- ✅ Pode ser separada de "Educação" (são coisas diferentes)
- ✅ Mais visível para quem busca serviços

**Estrutura:**
```
What/Solutions
├── Cinema & Audiovisual
├── Animação 2D/3D
├── XR / Interatividade
├── Arte Técnica / CAD / Revit
├── IA Criativa
├── Consultoria (NOVO - separado)
│   ├── Consultoria em Projetos
│   ├── Consultoria em Editais
│   ├── Consultoria em IA
│   └── Consultoria em Tecnologia
└── Educação (separado)
```

---

### **Opção 2: Academy (ATUAL)**
**Vantagens:**
- ✅ Faz sentido para "Treinamento Corporativo"
- ✅ Consultoria como parte de capacitação

**Desvantagens:**
- ❌ Consultoria não é só corporativa
- ❌ Pessoas podem não procurar consultoria em "Academia"
- ❌ Menos visível

---

### **Opção 3: Work**
**Vantagens:**
- ✅ Mostra projetos de consultoria realizados

**Desvantagens:**
- ❌ Consultoria é serviço, não projeto finalizado
- ❌ Pode confundir com portfólio

---

### **Opção 4: Studio**
**Vantagens:**
- ✅ Mostra expertise e credenciais

**Desvantagens:**
- ❌ Studio é "Sobre Nós", não "O que fazemos"
- ❌ Menos direto para quem busca serviços

---

## ✅ RECOMENDAÇÃO FINAL

### **Estrutura Ideal:**

1. **What/Solutions** → **Consultoria como serviço principal**
   - Separar de "Educação"
   - Criar card próprio: "Consultoria & Estratégia"
   - Subitens: Projetos, Editais, IA, Tecnologia

2. **Academy** → **Manter consultoria corporativa**
   - Como parte de "Treinamento Corporativo"
   - Focar em capacitação e in-company

3. **Work** → **Mencionar em projetos**
   - Quando consultoria foi parte do projeto

---

## 🎨 Proposta de Implementação

### **What/Solutions - Novo Card:**

```typescript
{
  slug: 'consulting',
  title: {
    pt: 'Consultoria & Estratégia',
    en: 'Consulting & Strategy',
    es: 'Consultoría & Estrategia',
    fr: 'Conseil & Stratégie'
  },
  shortDescription: {
    pt: 'Consultoria especializada em projetos imersivos, captação de recursos (editais), estratégia de IA e tecnologia criativa. Acompanhamento completo desde concepção até execução.',
    en: 'Specialized consulting in immersive projects, funding (grants), AI strategy and creative technology. Complete support from conception to execution.',
    es: 'Consultoría especializada en proyectos inmersivos, captación de recursos (editais), estrategia de IA y tecnología creativa. Acompañamiento completo desde concepción hasta ejecución.',
    fr: 'Conseil spécialisé en projets immersifs, financement (subventions), stratégie IA et technologie créative. Accompagnement complet de la conception à l\'exécution.'
  }
}
```

---

## 📊 Comparação de Visibilidade

| Localização | Visibilidade | Público-Alvo | Recomendação |
|-------------|--------------|--------------|--------------|
| **What/Solutions** | ⭐⭐⭐⭐⭐ | Todos | ✅ **MELHOR** |
| Academy | ⭐⭐⭐ | Corporações | ✅ Manter |
| Work | ⭐⭐ | Clientes | ⚠️ Mencionar |
| Studio | ⭐⭐ | Curiosos | ❌ Não |

---

## 🚀 Próximos Passos

1. Separar "Consultoria" de "Educação" em What/Solutions
2. Criar card próprio para Consultoria
3. Manter consultoria corporativa na Academy
4. Atualizar descrições para diferentes públicos

