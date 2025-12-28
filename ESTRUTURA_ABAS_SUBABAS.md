# 📋 ESTRUTURA COMPLETA: ABAS E SUBABAS DO SITE AZIMUT

**Data:** Janeiro 2025  
**Última atualização:** Baseado no código atual

---

## 🎯 MENU PRINCIPAL (Header)

### **Abas Principais:**

1. **HOME** (`/` ou `/home`)
   - Página inicial
   - Slug: `home`

2. **O QUE FAZEMOS** (`/what`)
   - Página de soluções/serviços
   - Slug: `what`

3. **PROJETOS** (`/work`)
   - Portfólio de projetos
   - Slug: `work`

4. **ESTÚDIO** (`/studio`)
   - Página sobre o estúdio
   - Slug: `studio`
   - ⚠️ **TEM MÚLTIPLAS SUBSEÇÕES** (listadas abaixo)

5. **ACADEMY** (`/academy`)
   - Página de educação
   - Slug: `academy`
   - ⚠️ **TEM 3 SUBABAS** (Research, Courses, Corporate)

---

## 📑 RODAPÉ (Footer)

### **NAVEGAÇÃO:**
- Início (`/home`)
- Soluções (`/what`)
- Projetos (`/work`)
- Estúdio (`/studio`)

### **ACADEMY & MAIS:**
- **Academy** (`/academy`)
  - └─ **Pesquisa** (`/academy/research`) - ⚠️ **SUBMENU**
  - └─ **Cursos** (`/academy/courses`) - ⚠️ **SUBMENU**
  - └─ **Corporate** (`/academy/corporate`) - ⚠️ **SUBMENU**

### **COMEÇAR:**
- Iniciar Conversa
- Revisar Projeto
- Botão: "INICIAR UM PROJETO"

### **CONTATO:**
- Email: contato@azimutimmersive.com
- WhatsApp
- Redes sociais: YouTube, Instagram, LinkedIn, Vimeo, Behance

### **NEWSLETTER:**
- Formulário de inscrição

---

## 🎨 PÁGINA STUDIO (`/studio`) - SUBSEÇÕES INTERNAS

**⚠️ IMPORTANTE:** A página Studio NÃO tem abas clicáveis, mas tem múltiplas **SEÇÕES INTERNAS** organizadas na mesma página:

### **1. Hero Section**
- Título principal
- Descrição do estúdio

### **2. Heritage (Desde 1996 | Brasil-Canadá)**
- Texto histórico
- Estatísticas:
  - Desde: 1996
  - Autodesk: 1996-2018
  - Rio Museum: Atual
  - Gramado: 2017
  - Binacional: BR-CA
- Badges de credibilidade: Rio Museum, Gramado VR, Autodesk, XRBR

### **3. Credibilidade Editais**
- Componente específico mostrando histórico de editais

### **4. O que nos torna únicos (Unique)**
- Lista de 6 itens únicos do estúdio

### **5. Visão, Missão e Valores**
- **Visão:** Texto sobre visão da empresa
- **Missão:** Texto sobre missão da empresa
- **Valores:** Lista de 4 valores:
  - Inovação Contínua
  - Excelência Técnica
  - Colaboração
  - Impacto Cultural

### **6. Pilares da Azimut (Pillars)**
- 6 pilares com ícones:
  1. 🎨 Arte e Estética Imersiva
  2. 🧠 Tecnologia Criativa
  3. 🎥 Narrativa Cinematográfica
  4. 🌍 Impacto Cultural e Social
  5. 🌐 Atuação Binacional (Brasil–Canadá)
  6. 🤝 Modelo de Cocriação

### **7. Estratégia & Posicionamento (Strategy)**
- 3 itens estratégicos:
  - Produtora Criativa Binacional
  - Tecnologias de Ponta
  - Parcerias Estratégicas

### **8. Cocriação (Cocreation)**
- Texto sobre modelo de cocriação

### **9. Nossa Jornada (Timeline)**
- Timeline expansível com períodos históricos
- Botão "Ver timeline completa" / "Ocultar"

### **10. Equipe (Team)**
- Cards da equipe (3 pessoas):
  - Ranz Enberger - CREATIVE & TECHNOLOGY DIRECTOR
  - Anick - ART DIRECTOR
  - Alberto Moura - AUDIOVISUAL & OPERATIONS DIRECTOR

### **11. CTA Final**
- Botão "INICIAR UM PROJETO"

---

## 🎓 PÁGINA ACADEMY (`/academy`) - ABAS INTERNAS

**⚠️ IMPORTANTE:** A página Academy tem **3 ABAS CLICÁVEIS** que alternam conteúdo:

### **Aba 1: RESEARCH (Pesquisa)**
- Conteúdo sobre pesquisa
- Lista de itens de lab/experimentos

### **Aba 2: COURSES (Cursos)**
- Lista de workshops/cursos:
  - VR Cinematográfico: Do Conceito à Tela
  - IA Generativa para Produção Audiovisual
  - (outros cursos)

### **Aba 3: CORPORATE (Corporate)**
- Conteúdo sobre programas corporativos

**Nota:** Essas abas são controladas por estado (`activeSection`) e não são rotas separadas. Mas no rodapé há links para `/academy/research`, `/academy/courses` e `/academy/corporate` que podem não estar implementadas como rotas separadas.

---

## 📊 RESUMO: ESTRUTURA COMPLETA

### **Páginas Principais (Rotas):**
```
/ (ou /home)          → Home
/what                 → O Que Fazemos / Soluções
/work                 → Projetos
/studio               → Estúdio (com 11 subseções internas)
/academy              → Academy (com 3 abas internas)
/contact              → Contato
/login                → Login (protegido)
```

### **Páginas com Subopções:**

#### **1. STUDIO** (subseções na mesma página):
1. Hero
2. Heritage (Desde 1996)
3. Credibilidade Editais
4. O que nos torna únicos
5. Visão, Missão e Valores
6. Pilares da Azimut (6 pilares)
7. Estratégia & Posicionamento
8. Cocriação
9. Timeline (Nossa Jornada)
10. Equipe
11. CTA Final

#### **2. ACADEMY** (abas internas):
1. **Research** (Pesquisa)
2. **Courses** (Cursos)
3. **Corporate**

---

## 🗂️ MAPA PARA CMS/BACKOFFICE

### **Estrutura Recomendada para Banco de Dados:**

```
Page (slug: 'home')
  ├── Hero Slogan ✅ (já tem)
  ├── Hero Subtitle ⏳ (faltando)
  ├── Pillars ⏳ (faltando)
  └── Why ⏳ (faltando)

Page (slug: 'what')
  └── (conteúdo ainda no código)

Page (slug: 'work')
  └── (conteúdo ainda no código)

Page (slug: 'studio')
  └── Sections:
      ├── Section (type: 'heritage')
      ├── Section (type: 'unique')
      ├── Section (type: 'vision-mission-values')
      ├── Section (type: 'pillars')
      ├── Section (type: 'strategy')
      ├── Section (type: 'cocreation')
      ├── Section (type: 'timeline')
      └── Section (type: 'team')

Page (slug: 'academy')
  └── Sections:
      ├── Section (type: 'research', order: 1)
      ├── Section (type: 'courses', order: 2)
      └── Section (type: 'corporate', order: 3)

Page (slug: 'contact')
  └── (conteúdo ainda no código)
```

---

## ✅ STATUS ATUAL

- ✅ **Home:** Hero Slogan já no banco
- ⏳ **Home:** Subtitle, Pillars, Why - faltando migrar
- ❌ **Studio:** Todas as seções ainda no código (`studioContent.ts`)
- ❌ **Academy:** Conteúdo ainda no código, abas internas funcionam mas não estão no banco
- ❌ **What/Work/Contact:** Ainda no código

---

**💡 PRÓXIMOS PASSOS:**
1. Migrar subseções do Studio para Sections no banco
2. Migrar abas do Academy para Sections no banco
3. Criar interface de edição de Sections no CMS
4. Migrar conteúdo das outras páginas


