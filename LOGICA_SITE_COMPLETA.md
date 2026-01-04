# 📐 LÓGICA DO SITE AZIMUT - EXPLICAÇÃO COMPLETA

**Data**: 3 de Janeiro de 2026

---

## 🏠 **HOME** (`/`)

### **O que tem:**
- ✅ Conteúdo **estático** (título, subtítulo)
- ✅ **Pills** (MUSEUMS & CULTURE, BRANDS & EVENTS, etc) → Apenas **visual**, não clicável
- ✅ **Projeto em destaque** (do backoffice)
- ✅ **Sugestões de projetos** (do backoffice)
- ✅ **Cards de "Nossas Soluções"** → Links para `/what#secao`

### **O que NÃO tem:**
- ❌ Sub-pastas (é página única)
- ❌ Navegação interna

### **Pills são apenas visuais:**
```tsx
// Em Home.tsx - Pills NÃO são links!
<span className="pill-adaptive">
  {t(lang, 'pillMuseums')}
</span>
```

---

## 🎬 **SOLUTIONS** (`/what`)

### **O que tem:**
- ✅ Página **única** com seções por âncora (`#`)
- ✅ **Navegação interna** (botões no topo da página)
- ✅ **Cards de soluções** (Cinema, Animation, XR, AI, Education)

### **Estrutura:**
```
/what                    → Topo da página
/what#cinema-av          → Seção Cinema & Audiovisual
/what#animation          → Seção 2D/3D Animation
/what#xr                 → Seção XR / Interactive
/what#creative-ai        → Seção Creative AI
/what#education          → Seção Education & Training
```

### **O que NÃO tem:**
- ❌ Sub-pastas (ex: `/what/cinema` NÃO existe)
- ❌ Páginas separadas

### **Navegação:**
- **No dropdown do header**: Links `/what#cinema-av` (devem fazer scroll)
- **Dentro da página**: Botões que fazem scroll suave

**PROBLEMA ATUAL**: 
- ✅ Dropdown funciona (abre/fecha)
- ❌ Links com `#` não fazem scroll (já corrigido no LangLink)
- ❌ Botões internos **não estão usando LangLink**

---

## 💼 **WORK** (`/work`)

### **O que tem:**
- ✅ Página **única** com filtros
- ✅ **Grid de projetos** (do backoffice)
- ✅ **Filtros por tipo** (`?type=museum`, `?type=festival`, etc)

### **Estrutura:**
```
/work                    → Todos os projetos
/work?type=museum        → Filtrar por museus
/work?type=festival      → Filtrar por festivais
/work?type=brand         → Filtrar por marcas
```

### **O que NÃO tem:**
- ❌ Sub-pastas (ex: `/work/museums` NÃO existe)
- ❌ Navegação interna por seções

### **Navegação:**
- **No dropdown do header**: Links `/work?type=museum` (filtros)
- **Dentro da página**: Não tem navegação interna

**PROBLEMA ATUAL**: 
- ✅ Filtros funcionam (query params)
- ⚠️ Dropdown do header não passa o idioma nos filtros

---

## 🎨 **STUDIO** (`/studio`)

### **O que tem:**
- ✅ Página **única** com seções por âncora
- ✅ **Navegação interna** (botões no topo)
- ✅ Seções: Vision, Mission, Values, Pillars, Strategy, Timeline

### **Estrutura:**
```
/studio                  → Topo (Visão)
/studio#unique           → Seção "What Makes Us Unique"
/studio#team             → Seção "Meet The Team"
/studio#credentials      → Seção "Credentials & Timeline"
```

### **O que NÃO tem:**
- ❌ Sub-pastas (ex: `/studio/team` NÃO existe)

### **Navegação:**
- **No dropdown do header**: Links `/studio#team` (devem fazer scroll)
- **Dentro da página**: Botões que fazem scroll

**PROBLEMA ATUAL**: 
- ❌ Dropdown não faz scroll para seções
- ❌ Botões internos não funcionam com idioma

---

## 🎓 **ACADEMY** (`/academy`)

### **O que DEVERIA ter:**
- ✅ Página **principal** em `/academy`
- ✅ **Sub-rotas** (páginas separadas):
  - `/academy/research` → Página de pesquisa
  - `/academy/courses` → Página de cursos
  - `/academy/corporate` → Página de treinamento corporativo

### **O que ESTÁ ERRADO:**
- ❌ As rotas `/academy/research`, `/academy/courses`, `/academy/corporate` **NÃO EXISTEM!**
- ❌ No `App.tsx` só tem `Route path="/:lang/academy"`
- ❌ Dropdown mostra links que não funcionam

### **PROBLEMA ATUAL**: 
```tsx
// Layout.tsx (dropdown footer)
<LangLink to="/academy/research">Research</LangLink>
<LangLink to="/academy/courses">Courses</LangLink>
<LangLink to="/academy/corporate">Corporate</LangLink>

// App.tsx - FALTAM ESTAS ROTAS:
<Route path="/:lang/academy/research" element={...} />
<Route path="/:lang/academy/courses" element={...} />
<Route path="/:lang/academy/corporate" element={...} />
```

---

## 📊 **RESUMO DO PROBLEMA:**

| Página | Tipo | Navegação Atual | Status |
|--------|------|-----------------|--------|
| **Home** | Única | Pills (visual) | ✅ OK |
| **Solutions** | Única + âncoras | Dropdown → `#secao` | ⚠️ Scroll não funciona |
| **Work** | Única + filtros | Dropdown → `?type=` | ✅ OK |
| **Studio** | Única + âncoras | Dropdown → `#secao` | ⚠️ Scroll não funciona |
| **Academy** | Deveria ter sub-rotas | Dropdown → `/academy/courses` | ❌ **ROTAS NÃO EXISTEM** |

---

## 🔧 **SOLUÇÕES NECESSÁRIAS:**

### **1. Scroll em âncoras** (Solutions, Studio)
- ✅ **JÁ CORRIGIDO** no `LangLink`
- ⏳ Testar se funciona

### **2. Criar rotas Academy** (PRIORIDADE!)
```tsx
// OPÇÃO A: Criar 3 componentes separados
<Route path="/:lang/academy/research" element={<AcademyResearch />} />
<Route path="/:lang/academy/courses" element={<AcademyCourses />} />
<Route path="/:lang/academy/corporate" element={<AcademyCorporate />} />

// OPÇÃO B: Usar seções com âncoras (como Solutions)
/academy#research
/academy#courses
/academy#corporate
```

### **3. Navegação interna** (Solutions, Studio)
- ⏳ Converter botões internos para `LangLink`
- ⏳ Garantir scroll suave

---

## ❓ **DECISÃO NECESSÁRIA:**

### **Para ACADEMY:**

**OPÇÃO A: Sub-rotas (páginas separadas)** ⭐ Recomendado
- ✅ Melhor para SEO (`/academy/research`)
- ✅ Cada seção pode ter muito conteúdo
- ✅ Padrão enterprise
- ❌ Precisa criar 3 componentes novos

**OPÇÃO B: Âncoras (seções na mesma página)**
- ✅ Rápido de implementar
- ✅ Menos código
- ⚠️ SEO médio
- ❌ Tudo numa página só

---

**QUAL PREFERE PARA ACADEMY?**
1. Sub-rotas (criar páginas separadas)?
2. Âncoras (seções na mesma página)?

