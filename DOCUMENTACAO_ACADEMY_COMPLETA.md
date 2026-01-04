# 🎓 DOCUMENTAÇÃO COMPLETA - AZIMUT ACADEMY

**Data**: 03 de janeiro de 2025  
**Versão**: 2.0  
**Arquivo**: `src/pages/Academy.tsx`

---

## 📊 VISÃO GERAL

### **ACADEMY: 4 PÁGINAS INDEPENDENTES**

A Academy agora tem uma estrutura de **4 páginas separadas**, cada uma com conteúdo específico e navegação dedicada.

---

## 🏗️ ESTRUTURA DE ROTAS

### **1. PÁGINA PRINCIPAL: `/academy`**
**Propósito**: Apresentação geral da Academia Azimut  
**Conteúdo**: Visão geral, pilares, abordagem educacional

**Rota multilíngue:**
- `/pt/academy` (Português)
- `/en/academy` (Inglês)
- `/fr/academy` (Francês)
- `/es/academy` (Espanhol)

**Comportamento**: 
- Quando usuário clica apenas em "Academy" no menu (sem dropdown)
- Página padrão quando não há subseção especificada

---

### **2. RESEARCH: `/academy/research`**
**Propósito**: Laboratório de P&D e pesquisa experimental  
**Conteúdo**: Protótipos, experimentos, publicações

**Rota multilíngue:**
- `/pt/academy/research`
- `/en/academy/research`
- `/fr/academy/research`
- `/es/academy/research`

**O que inclui:**
- Protótipos IA + XR
- Experimentos com IA generativa
- Publicações e artigos
- Parcerias acadêmicas

---

### **3. COURSES: `/academy/courses`**
**Propósito**: Workshops e formações presenciais/online  
**Conteúdo**: Cursos, workshops, cronograma

**Rota multilíngue:**
- `/pt/academy/courses`
- `/en/academy/courses`
- `/fr/academy/courses`
- `/es/academy/courses`

**O que inclui:**
- Workshops IA / VR / VFX / 3D
- Cursos de narrativas imersivas
- Formação prática para equipes
- Cronograma de cursos

---

### **4. CORPORATE: `/academy/corporate`**
**Propósito**: Treinamentos corporativos customizados  
**Conteúdo**: Mentorias, consultoria educacional, in-company

**Rota multilíngue:**
- `/pt/academy/corporate`
- `/en/academy/corporate`
- `/fr/academy/corporate`
- `/es/academy/corporate`

**O que inclui:**
- Mentorias VR/IA
- Treinamentos in-company
- Consultoria educacional
- Programas customizados

---

## 🎯 NAVEGAÇÃO INTERNA

### **DROPDOWN NO MENU:**

```
ACADEMY ▼
├── 🏠 Academy (página principal)
├── 🔬 Research
├── 📚 Courses
└── 🏢 Corporate
```

**Funcionamento:**
1. **Hover em "Academy"** → Dropdown aparece
2. **Clicar em "Academy"** → Vai para `/academy` (página principal)
3. **Clicar em "Research"** → Vai para `/academy/research`
4. **Clicar em "Courses"** → Vai para `/academy/courses`
5. **Clicar em "Corporate"** → Vai para `/academy/corporate`

---

## 💻 IMPLEMENTAÇÃO TÉCNICA

### **1. ROTAS EM `App.tsx`:**

```tsx
// Página principal (padrão)
<Route 
  path="/:lang/academy" 
  element={
    <LangRouteWrapper setLang={setLang}>
      {(routeLang) => <Academy lang={routeLang} />}
    </LangRouteWrapper>
  } 
/>

// Sub-páginas
<Route 
  path="/:lang/academy/research" 
  element={
    <LangRouteWrapper setLang={setLang}>
      {(routeLang) => <Academy lang={routeLang} section="research" />}
    </LangRouteWrapper>
  } 
/>

<Route 
  path="/:lang/academy/courses" 
  element={
    <LangRouteWrapper setLang={setLang}>
      {(routeLang) => <Academy lang={routeLang} section="courses" />}
    </LangRouteWrapper>
  } 
/>

<Route 
  path="/:lang/academy/corporate" 
  element={
    <LangRouteWrapper setLang={setLang}>
      {(routeLang) => <Academy lang={routeLang} section="corporate" />}
    </LangRouteWrapper>
  } 
/>
```

---

### **2. COMPONENTE `Academy.tsx`:**

```tsx
interface AcademyProps {
  lang: Lang
  section?: 'research' | 'courses' | 'corporate' // Nova prop
}

const Academy: React.FC<AcademyProps> = ({ lang, section }) => {
  // Determina qual seção exibir
  const currentSection = section || 'research' // Default
  
  // Renderiza conteúdo baseado na seção
  return (
    <>
      <SEO lang={lang} title={seo.title} description={seo.description} path="/academy" />
      <main>
        {/* Navegação interna */}
        <InternalNavigation items={[...]} />
        
        {/* Conteúdo condicional */}
        {currentSection === 'research' && <ResearchSection />}
        {currentSection === 'courses' && <CoursesSection />}
        {currentSection === 'corporate' && <CorporateSection />}
      </main>
    </>
  )
}
```

---

## 📱 NAVEGAÇÃO INTERNA (DENTRO DA PÁGINA)

### **FILTROS/TABS NO TOPO:**

```
🏠 Academy | 🔬 Research | 📚 Courses | 🏢 Corporate
```

**Comportamento:**
- Clica em "Research" → Navega para `/academy/research`
- Clica em "Courses" → Navega para `/academy/courses`
- Item ativo destacado em vermelho (`text-azimut-red`)
- Barra vermelha abaixo do item ativo

---

## 🎨 DESIGN E UX

### **PÁGINA PRINCIPAL (`/academy`)**

**Estrutura:**
1. **Hero**: Título "Academy" + Descrição geral
2. **Pilares da Academia**: 3 cards (Research, Courses, Corporate)
3. **Abordagem**: Como ensinamos (hands-on, prático, etc.)
4. **CTA**: "Fale conosco" / "Start a Project"

**Objetivo**: Apresentar a academia e direcionar para sub-páginas

---

### **SUB-PÁGINAS**

**Layout padrão:**
1. **Hero**: Título da seção + Descrição
2. **Navegação interna**: Tabs para alternar entre seções
3. **Conteúdo específico**: Cards, listas, cronogramas
4. **CTA**: Formulário de contato ou link para iniciar projeto

---

## 🔍 SEO POR PÁGINA

### **SEO DATA EM `src/components/SEO.tsx`:**

```typescript
academy: {
  en: {
    title: 'Academy',
    description: 'Workshops, courses and mentorship programs on immersive design, interactive storytelling and creative technology.'
  },
  fr: {
    title: 'Académie',
    description: 'Ateliers, cours et programmes de mentorat sur le design immersif, la narration interactive et la technologie créative.'
  },
  pt: {
    title: 'Academia',
    description: 'Workshops, cursos e programas de mentoria sobre design imersivo, storytelling interativo e tecnologia criativa.'
  },
  es: {
    title: 'Academia',
    description: 'Talleres, cursos y programas de mentoría sobre diseño inmersivo, narrativa interactiva y tecnología creativa.'
  }
}
```

**URLs canônicos:**
- `/pt/academy` → Meta PT
- `/en/academy` → Meta EN
- `/pt/academy/research` → Meta PT específico
- `/en/academy/research` → Meta EN específico

---

## 🌍 TRADUÇÕES

### **TÍTULOS DAS SEÇÕES:**

| Seção | PT | EN | FR | ES |
|-------|----|----|----|----|
| **Academy** | Academia | Academy | Académie | Academia |
| **Research** | Pesquisa | Research | Recherche | Investigación |
| **Courses** | Cursos | Courses | Cours | Cursos |
| **Corporate** | Corporativo | Corporate | Entreprise | Corporativo |

---

## 📊 CONTEÚDO POR SEÇÃO

### **1. ACADEMY (Principal)**

**PT:**
```
Título: Academia Azimut
Descrição: Compartilhamos conhecimento acumulado em 30 anos através de workshops, cursos e mentorias sobre tecnologias imersivas, storytelling interativo e IA criativa.

Pilares:
- 🔬 Pesquisa: P&D em IA, XR e audiovisual
- 📚 Cursos: Workshops práticos e formações
- 🏢 Corporativo: Treinamentos customizados
```

---

### **2. RESEARCH**

**PT:**
```
Título: Laboratório de P&D
Descrição: Exploramos tecnologias emergentes: IA generativa, sistemas XR, computação espacial e pipelines híbridos.

Projetos:
- Protótipos IA + XR para museus e marcas
- Experimentos com IA generativa (texto, imagem, vídeo)
- Publicações e artigos científicos
- Parcerias com universidades e labs
```

**Público-alvo:**
- Pesquisadores
- Universidades
- Laboratórios de inovação
- Startups tech

---

### **3. COURSES**

**PT:**
```
Título: Workshops e Cursos
Descrição: Formação prática em tecnologias imersivas, narrativas interativas e pipelines criativos com IA.

Cursos oferecidos:
- Workshop IA para Narrativas
- VR/XR: Do conceito à produção
- VFX e Motion Design Avançado
- Animação 3D para experiências imersivas
- Unity para instalações interativas

Formato:
- Presencial (Rio, São Paulo, Vancouver)
- Online (ao vivo)
- In-company (customizado)
```

**Público-alvo:**
- Criativos
- Designers
- Desenvolvedores
- Estudantes
- Profissionais de audiovisual

---

### **4. CORPORATE**

**PT:**
```
Título: Treinamentos Corporativos
Descrição: Programas customizados para equipes de museus, marcas, agências e produtoras.

Serviços:
- Mentorias VR/IA para equipes criativas
- Treinamentos in-company
- Consultoria educacional
- Onboarding em ferramentas imersivas
- Workshops customizados

Clientes típicos:
- Museus e instituições culturais
- Agências de publicidade
- Produtoras audiovisuais
- Marcas e eventos
- Secretarias de cultura
```

**Público-alvo:**
- Empresas
- Instituições
- Agências
- Produtoras
- Governos

---

## 🚀 FUNCIONALIDADES IMPLEMENTADAS

### ✅ **JÁ FUNCIONA:**
1. Rotas separadas para cada seção
2. Navegação via dropdown no menu
3. Navegação interna via tabs
4. SEO único por página
5. Traduções PT/EN/FR/ES
6. Destacamento do item ativo
7. URLs amigáveis (`/academy/research`)

### 🔄 **EM DESENVOLVIMENTO:**
1. Conteúdo dinâmico do backoffice
2. Cronograma de cursos
3. Formulário de inscrição
4. Galeria de projetos de alunos
5. Testemunhos de participantes

---

## 📈 MÉTRICAS E KPIs

### **O QUE MEDIR:**

**Geral:**
- Pageviews por seção
- Tempo de permanência
- Taxa de rejeição
- Conversão para contato

**Por seção:**
- **Research**: Downloads de publicações, cliques em projetos
- **Courses**: Inscrições, visualizações de cronograma
- **Corporate**: Leads gerados, contatos diretos

---

## 🔧 BACKOFFICE (FUTURO)

### **CAMPOS NECESSÁRIOS NO CMS:**

**Academy (Página principal):**
- Título (multilíngue)
- Descrição (multilíngue)
- Cards de pilares (Research, Courses, Corporate)
- CTA customizável

**Research:**
- Lista de projetos
- Publicações (PDF, link externo)
- Galeria de experimentos
- Parcerias acadêmicas

**Courses:**
- Lista de cursos
- Cronograma (data, local, formato)
- Preços (se aplicável)
- Formulário de inscrição

**Corporate:**
- Cases de clientes
- Testemunhos
- Pacotes de treinamento
- Formulário de orçamento

---

## 📁 ARQUIVOS RELACIONADOS

```
src/pages/Academy.tsx           → Componente principal (multi-seção)
src/App.tsx                     → Definição de rotas
src/components/NavDropdown.tsx  → Dropdown do menu
src/components/InternalNavigation.tsx → Navegação interna (tabs)
src/components/SEO.tsx          → Metadados por página
```

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

- [x] Rotas separadas criadas
- [x] Componente Academy adaptado para multi-seção
- [x] Dropdown no menu funcionando
- [x] Navegação interna (tabs) funcionando
- [x] SEO único por página
- [x] Traduções completas PT/EN/FR/ES
- [x] Destacamento de item ativo
- [x] Build sem erros
- [x] Deploy em produção
- [ ] Conteúdo completo por seção
- [ ] Backoffice CMS integrado
- [ ] Cronograma de cursos
- [ ] Formulários de inscrição/contato
- [ ] Galeria de projetos de alunos

---

## 🎯 PRÓXIMOS PASSOS

### **CURTO PRAZO (1-2 semanas):**
1. ✅ Preencher conteúdo de cada seção
2. ✅ Criar cases para Research
3. ✅ Listar cursos disponíveis
4. ✅ Adicionar testemunhos de alunos

### **MÉDIO PRAZO (1 mês):**
1. Integrar com backoffice CMS
2. Criar formulários de inscrição
3. Adicionar cronograma dinâmico de cursos
4. Galeria de projetos de alunos

### **LONGO PRAZO (3 meses):**
1. Portal de alunos (área restrita)
2. Sistema de pagamento integrado
3. Certificados digitais
4. Plataforma de cursos online

---

**Documentação criada por**: Cursor AI + Ranz  
**Última atualização**: 03 de janeiro de 2025  
**Versão**: 2.0 - Multi-página Academy

