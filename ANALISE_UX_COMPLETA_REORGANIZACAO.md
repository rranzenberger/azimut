# 🎯 Análise UX Completa: Reorganização do Site Azimut

## 📊 Situação Atual

### **Estrutura de Navegação:**
```
Home → Landing page
What → Soluções/Serviços
Work → Projetos (portfólio)
Studio → Sobre nós + Editais (PROBLEMA)
Research → P&D (pesquisa interna)
Academy → Educação (workshops/cursos)
Contact → Contato + Editais (duplicado)
```

### **Problemas Identificados:**

#### **1. Editais/Oportunidades - Onde Colocar?**

**Situação Atual:**
- `CredibilidadeEditais` (histórico/credenciais) → Studio ✅ OK
- `OportunidadesAtivas` (editais abertos) → Studio ❌ PROBLEMA
- CTA "Queremos revisar seu projeto/edital" → Studio ❌ PROBLEMA

**Análise:**
- **CredibilidadeEditais**: Mostra **o que já fizemos** (histórico, credenciais) → ✅ Pode ficar em Studio
- **OportunidadesAtivas**: Mostra **oportunidades futuras** (editais abertos) → ❌ Não é "sobre nós"
- **CTA**: "Queremos revisar seu projeto" → ❌ Estranho em "sobre nós"

**Solução Proposta:**
- **CredibilidadeEditais** → ✅ **Manter em Studio** (mostra credenciais/histórico)
- **OportunidadesAtivas** → ✅ **Mover para Work** (mostra projetos + oferece oportunidade)
- **CTA** → ✅ **Mover para Work** (faz sentido: "veja nossos projetos, quer trabalhar conosco?")

---

#### **2. P&D vs Academy - Diferença e Validade**

**Research (P&D):**
- **Foco:** Pesquisa e desenvolvimento **interno**
- **Conteúdo:** 
  - Lab & Experiments (experimentos próprios)
  - Áreas de pesquisa (IA, VR, Sistemas Interativos)
  - Metodologias experimentais
- **Público:** Interno + parceiros de pesquisa
- **Objetivo:** Mostrar inovação e capacitação técnica

**Academy:**
- **Foco:** Educação e treinamento **externo**
- **Conteúdo:**
  - Workshops (VR Cinematográfico, IA para AV, etc.)
  - Cursos in-company
  - Treinamentos
- **Público:** Clientes, estudantes, profissionais
- **Objetivo:** Oferecer educação como serviço

**Conclusão:**
- ✅ **São diferentes e válidos separados**
- ✅ **Research** = Pesquisa interna (mostra capacidade)
- ✅ **Academy** = Educação externa (serviço comercial)
- ⚠️ **Mas podem ser confusos** para usuário comum

**Sugestão:**
- **Opção A:** Manter separados (mais claro tecnicamente)
- **Opção B:** Juntar em "LAB & ACADEMY" (mais simples para usuário)

---

## 🎨 Propostas de Reorganização

### **PROPOSTA 1: Reorganização Conservadora** ⭐ **RECOMENDADA**

**Mudanças:**
1. **Studio**: Limpar (só sobre nós)
   - ✅ Manter: Equipe, credenciais, histórico
   - ✅ Manter: `CredibilidadeEditais` (mostra o que fizemos)
   - ❌ Remover: `OportunidadesAtivas` (editais abertos)
   - ❌ Remover: CTA "Queremos revisar seu projeto"

2. **Work**: Adicionar seção de oportunidades
   - ✅ Mostrar projetos (portfólio)
   - ✅ Adicionar: `OportunidadesAtivas` (editais abertos)
   - ✅ Adicionar: CTA "Queremos revisar seu projeto/edital"
   - ✅ Mensagem: "Veja nossos projetos. Quer trabalhar conosco?"

3. **Research & Academy**: Manter separados
   - ✅ Research = Pesquisa interna
   - ✅ Academy = Educação externa

**Nova Estrutura:**
```
Home → Landing
What → Soluções/Serviços
Work → Projetos + Oportunidades (editais abertos) + CTA
Studio → Sobre nós (equipe, credenciais, histórico)
Research → P&D (pesquisa interna)
Academy → Educação (workshops/cursos)
Contact → Contato (formulário)
```

**Menu:**
- PT: `INÍCIO | SOLUÇÕES | PROJETOS | ESTÚDIO | P&D | ACADEMIA | CONTATO`
- EN: `HOME | SERVICES | WORK | STUDIO | R&D | ACADEMY | CONTACT`

**Vantagens:**
- ✅ Studio fica limpo (só sobre nós)
- ✅ Work oferece oportunidade (faz sentido)
- ✅ Não precisa criar nova página
- ✅ Mudança mínima

---

### **PROPOSTA 2: Reorganização com Página Dedicada**

**Mudanças:**
1. **Studio**: Limpar completamente
   - ✅ Só: Equipe, credenciais, histórico
   - ❌ Remover: Tudo relacionado a editais

2. **Work**: Focar em portfólio
   - ✅ Só projetos realizados
   - ✅ Link para "Oportunidades"

3. **Nova página "OPORTUNIDADES"**:
   - ✅ `CredibilidadeEditais` (histórico)
   - ✅ `OportunidadesAtivas` (editais abertos)
   - ✅ CTA "Queremos revisar seu projeto/edital"

**Nova Estrutura:**
```
Home → Landing
What → Soluções/Serviços
Work → Projetos (portfólio)
Studio → Sobre nós (equipe, credenciais)
Opportunities → Editais + Coprodução + CTA ← NOVA
Research → P&D
Academy → Educação
Contact → Contato
```

**Menu:**
- PT: `INÍCIO | SOLUÇÕES | PROJETOS | ESTÚDIO | OPORTUNIDADES | P&D | ACADEMIA`
- EN: `HOME | SERVICES | WORK | STUDIO | OPPORTUNITIES | R&D | ACADEMY`

**Vantagens:**
- ✅ Separação clara de propósitos
- ✅ Melhor SEO (página dedicada)
- ✅ Escalável (pode crescer)

**Desvantagens:**
- ⚠️ Mais uma página no menu (pode ficar longo)

---

### **PROPOSTA 3: Juntar Research & Academy**

**Mudanças:**
1. **Nova página "LAB & ACADEMY"**:
   - ✅ Seção Research (pesquisa interna)
   - ✅ Seção Academy (educação externa)
   - ✅ Mostra: "Pesquisamos e ensinamos"

2. **Remover páginas separadas**

**Nova Estrutura:**
```
Home → Landing
What → Soluções/Serviços
Work → Projetos + Oportunidades
Studio → Sobre nós
Lab & Academy → Pesquisa + Educação ← NOVA
Contact → Contato
```

**Vantagens:**
- ✅ Menu mais curto (6 itens vs 7)
- ✅ Simplifica para usuário comum
- ✅ Mostra conexão pesquisa/educação

**Desvantagens:**
- ⚠️ Pode confundir (pesquisa vs educação)
- ⚠️ Perde especificidade

---

## 🏆 Recomendação Final

### **PROPOSTA 1: Reorganização Conservadora** ⭐

**Por quê:**
1. **Mudança mínima, máximo impacto**
   - Não precisa criar nova página
   - Apenas reorganizar conteúdo existente

2. **Faz sentido UX:**
   - **Work** = "Veja nossos projetos. Quer trabalhar conosco?"
   - **Studio** = "Conheça nossa equipe e credenciais"

3. **Research & Academy separados:**
   - São diferentes (pesquisa vs educação)
   - Usuários diferentes (pesquisadores vs estudantes)
   - Mantém clareza

4. **Menu não fica longo:**
   - 6 itens (ideal para UX)
   - Não sobrecarrega navegação

---

## 📋 Plano de Implementação

### **Fase 1: Limpar Studio**
- [ ] Remover `OportunidadesAtivas` de Studio
- [ ] Remover CTA "Queremos revisar seu projeto" de Studio
- [ ] Manter `CredibilidadeEditais` (histórico/credenciais)

### **Fase 2: Adicionar em Work**
- [ ] Adicionar seção `OportunidadesAtivas` em Work
- [ ] Adicionar CTA "Queremos revisar seu projeto/edital" em Work
- [ ] Mensagem: "Veja nossos projetos. Quer trabalhar conosco?"

### **Fase 3: Limpar Contact**
- [ ] Remover `CredibilidadeEditais` de Contact (já está em Studio)
- [ ] Remover `OportunidadesAtivas` de Contact (vai para Work)
- [ ] Contact fica só com formulário

### **Fase 4: Testar**
- [ ] Testar navegação
- [ ] Verificar fluxo: Work → Oportunidades → Contact
- [ ] Validar com usuários

---

## 🎯 Estrutura Final Proposta

### **Work (/work)**
```
1. Hero: "Projetos que unem narrativa, tecnologia e design"
2. Projetos em destaque (portfólio)
3. Grid de projetos
4. [NOVA] Seção: "Oportunidades Ativas"
   - Editais abertos (OportunidadesAtivas)
   - CTA: "Queremos revisar seu projeto/edital?" → Contact
5. CTA final: "Tem um projeto? Vamos conversar" → Contact
```

### **Studio (/studio)**
```
1. Hero: "Studio & Team"
2. Equipe (fotos, bios, credenciais)
3. Histórico e credenciais
4. [MANTER] CredibilidadeEditais (histórico/credenciais)
5. Valores, missão, visão
6. Timeline
```

### **Research (/research)**
```
1. Hero: "P&D - Pesquisa e Desenvolvimento"
2. Lab & Experiments
3. Áreas de pesquisa
4. Metodologias experimentais
```

### **Academy (/academy)**
```
1. Hero: "Academy - Educação e Treinamento"
2. Workshops disponíveis
3. Cursos in-company
4. Treinamentos
```

---

## 💡 Insights de UX

### **Princípio: "O que o usuário busca?"**

1. **"Quem são vocês?"** → Studio
2. **"O que vocês fazem?"** → What
3. **"O que vocês já fizeram?"** → Work
4. **"Quero trabalhar com vocês"** → Work (oportunidades) → Contact
5. **"Vocês pesquisam?"** → Research
6. **"Vocês ensinam?"** → Academy

### **Fluxo de Conversão:**
```
Home → Work → (vê projetos) → (vê oportunidades) → Contact
```

---

## ✅ Resumo Executivo

**Problema:** Editais em Studio confunde (usuário espera "sobre nós")

**Solução:** Mover oportunidades para Work (faz sentido: "veja projetos, quer trabalhar conosco?")

**Research vs Academy:** Manter separados (são diferentes e válidos)

**Resultado:** 
- Studio limpo (só sobre nós)
- Work oferece oportunidade (faz sentido)
- Menu não fica longo (6 itens)
- Mudança mínima, máximo impacto

