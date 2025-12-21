# 📊 Análise UX: Onde Colocar Editais/Oportunidades

## 🎯 Problema Identificado

**Situação Atual:**
- Conteúdo de "Editais, Coprodução e Curadoria VR" está na página **Studio**
- Quando usuário clica em "Studio", espera saber sobre **"nós"** (equipe, credenciais, quem somos)
- Editais são um **serviço/produto**, não informação sobre a empresa

**Expectativa do Usuário:**
- **Studio** = "Sobre nós" (quem somos, equipe, história, credenciais)
- **Editais** = Serviço/produto (o que oferecemos, oportunidades ativas)

---

## 🔍 Análise da Navegação Atual

### **Estrutura Atual:**
```
Home → Landing page
What → Soluções/Serviços (o que fazemos)
Work → Projetos (portfólio)
Studio → Sobre nós (quem somos) ⚠️ MAS TEM EDITAIS AQUI
Research → P&D (pesquisa e desenvolvimento)
Academy → Academia (educação)
Contact → Contato
```

### **Onde Editais Aparece Atualmente:**
1. **Studio.tsx** (linhas 373-380) - ❌ **PROBLEMA**
2. **Contact.tsx** (linhas 280-287) - ✅ Faz sentido (CTA para contato)

---

## 💡 Opções de Solução

### **OPÇÃO 1: Nova Aba "OPORTUNIDADES" ou "EDITAIS"** ⭐ **RECOMENDADA**

**Vantagens:**
- ✅ Separação clara: Studio = sobre nós, Oportunidades = serviço
- ✅ Fácil de encontrar para quem busca editais
- ✅ Não polui outras páginas
- ✅ Pode ter SEO próprio
- ✅ Segue padrão de outras empresas (ver referências abaixo)

**Estrutura:**
```
Home
What (Soluções)
Work (Projetos)
Studio (Sobre nós) ← LIMPO, só sobre a empresa
Opportunities (Editais) ← NOVA PÁGINA
Research
Academy
Contact
```

**Menu:**
- PT: "OPORTUNIDADES"
- EN: "OPPORTUNITIES" 
- FR: "OPPORTUNITÉS"
- ES: "OPORTUNIDADES"

**Conteúdo da nova página:**
- CredibilidadeEditais (badges, credenciais, histórico)
- OportunidadesAtivas (tabela de editais abertos)
- CTA para contato

---

### **OPÇÃO 2: Mover para "WHAT" (Soluções)**

**Vantagens:**
- ✅ Editais são um serviço, faz sentido em "Soluções"
- ✅ Não precisa criar nova página
- ✅ Usuário já espera ver serviços aqui

**Desvantagens:**
- ⚠️ "What" pode ficar muito longo
- ⚠️ Editais são mais específicos que serviços gerais

**Estrutura:**
```
What (Soluções)
  ├─ Serviços gerais
  ├─ Editais e Coprodução ← ADICIONAR AQUI
  └─ Outros serviços
```

---

### **OPÇÃO 3: Mover para "WORK" (Projetos)**

**Vantagens:**
- ✅ Editais podem ser vistos como "projetos em potencial"
- ✅ Conecta com portfólio

**Desvantagens:**
- ❌ "Work" é para projetos **realizados**, não oportunidades
- ❌ Pode confundir (projetos vs oportunidades)

---

### **OPÇÃO 4: Seção em "CONTACT"**

**Vantagens:**
- ✅ Já tem CTA para contato
- ✅ Faz sentido como "pré-contato"

**Desvantagens:**
- ❌ Contact deve ser simples (formulário)
- ❌ Editais merecem destaque próprio

---

## 🏢 Como Outras Empresas Fazem

### **Padrões de Mercado:**

1. **Estúdios Criativos (ex: R/GA, Pentagram):**
   - "Work" = Portfólio
   - "About" = Sobre nós (equipe, história)
   - "Services" = Serviços (separado)
   - **Editais/oportunidades** = Geralmente em "Services" ou página dedicada

2. **Agências Culturais (ex: IDEO, Frog):**
   - "Projects" = Portfólio
   - "Team" = Equipe
   - "Opportunities" = Página dedicada para vagas/editais

3. **Estúdios de XR/VR (ex: Within, Baobab):**
   - "Work" = Projetos
   - "About" = Sobre
   - "Partners" ou "Opportunities" = Página separada

**Conclusão:** Empresas sérias **separam** oportunidades/editais em página própria ou em "Services"

---

## ✅ Recomendação Final

### **OPÇÃO 1: Nova Página "OPORTUNIDADES"** ⭐

**Por quê:**
1. **Clareza de propósito:** Studio = sobre nós, Oportunidades = serviço
2. **Melhor UX:** Usuário encontra facilmente o que busca
3. **SEO:** Página dedicada = melhor indexação
4. **Escalabilidade:** Pode crescer (mais editais, filtros, etc.)
5. **Padrão de mercado:** Empresas sérias fazem assim

**Implementação:**
- Criar `/opportunities` ou `/oportunidades`
- Mover `CredibilidadeEditais` e `OportunidadesAtivas` para lá
- Adicionar ao menu de navegação
- Manter link em Contact (pré-contato)

**Menu Final:**
```
PT: INÍCIO | SOLUÇÕES | PROJETOS | ESTÚDIO | OPORTUNIDADES | P&D | ACADEMIA
EN: HOME | SERVICES | WORK | STUDIO | OPPORTUNITIES | R&D | ACADEMY
FR: ACCUEIL | SERVICES | PROJETS | STUDIO | OPPORTUNITÉS | RECHERCHE | ACADÉMIE
ES: INICIO | SERVICIOS | PROYECTOS | ESTUDIO | OPORTUNIDADES | I+D | ACADEMIA
```

---

## 📋 Próximos Passos

1. **Criar página `Opportunities.tsx`**
2. **Mover componentes de Studio para Opportunities**
3. **Adicionar rota em `App.tsx`**
4. **Adicionar item no menu `Layout.tsx`**
5. **Atualizar traduções em `i18n.ts`**
6. **Testar navegação**

---

## 🎨 Estrutura da Nova Página

```
/opportunities
├─ Hero: "Editais, Coprodução e Curadoria VR"
├─ CredibilidadeEditais (badges, histórico)
├─ OportunidadesAtivas (tabela completa)
└─ CTA: "Queremos revisar seu edital/projeto?"
```

---

## 💬 Feedback do Sócio

**"Quando clica em studio quer saber sobre nós certo"** → ✅ Correto!

**"Achou meio estranho estar aí"** → ✅ Tem razão! Editais não são "sobre nós"

**Solução:** Separar claramente = melhor UX + mais profissional

