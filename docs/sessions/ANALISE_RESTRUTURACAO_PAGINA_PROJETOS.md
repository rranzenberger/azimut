# 🔍 ANÁLISE E REESTRUTURAÇÃO - PÁGINA DE PROJETOS

**Data:** 2026-01-20  
**Problema:** Navegação quebrada + estrutura incompleta + categorias faltando

---

## 🔴 **PROBLEMAS IDENTIFICADOS**

### **1. Navegação Quebrada**
- ❌ Clicar em "Todos os Projetos" → vai para início (OK, mas poderia melhorar)
- ❌ Clicar em "Festivais", "VR & XR", etc. → **não scrolla para lugar algum**
- ❌ Filtros aplicados via URL (`?type=museum`) mas página não reage visualmente
- ❌ Não há seções visuais para cada categoria

### **2. Categorias Faltando no Submenu**
**Atual (5 itens):**
- ✅ Todos os Projetos
- ✅ Museus & Cultura
- ✅ Festivais
- ✅ Marcas & Eventos
- ✅ VR & XR

**Faltando:**
- ❌ Motion Design
- ❌ Animação
- ❌ Color Grading
- ❌ Edit (Edição)
- ❌ FX Video (Efeitos Visuais)
- ❌ Produção Visual

### **3. Estrutura Atual (Problemas)**
- ❌ Não há seções visuais separadas por categoria
- ❌ Tudo misturado em uma única grid
- ❌ Card "Curadoria Gramado" sempre no topo (confunde)
- ❌ Filtros avançados (pills) não correspondem ao submenu
- ❌ Não há hierarquia visual clara

---

## 💡 **PROPOSTA DE REESTRUTURAÇÃO**

### **Filosofia:**
> "Página de projetos deve ter **seções visuais claras** para cada categoria, mesmo com poucos projetos. Cada seção deve ser scrollável e navegável."

### **Estrutura Proposta:**

```
┌─────────────────────────────────────────┐
│  SUBMENU (Fixo no topo)                 │
│  [Todos] [Museus] [Festivais] [Marcas]  │
│  [VR&XR] [Motion] [Animação] [Color]   │
│  [Edit] [FX Video] [Produção Visual]    │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│  HERO / INTRO                            │
│  "Projetos que transformam..."          │
└─────────────────────────────────────────┐
         ↓
┌─────────────────────────────────────────┐
│  BUSCA + FILTROS RÁPIDOS                 │
│  [Buscar] [Filtros Avançados]           │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│  SEÇÃO: MUSEUS & CULTURA                │
│  ┌─────┐ ┌─────┐ ┌─────┐                │
│  │Proj1│ │Proj2│ │Proj3│                │
│  └─────┘ └─────┘ └─────┘                │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│  SEÇÃO: FESTIVAIS                        │
│  [Card Curadoria Gramado]                │
│  ┌─────┐ ┌─────┐                        │
│  │Proj1│ │Proj2│                        │
│  └─────┘ └─────┘                        │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│  SEÇÃO: VR & XR                          │
│  ┌─────┐ ┌─────┐ ┌─────┐                │
│  │Proj1│ │Proj2│ │Proj3│                │
│  └─────┘ └─────┘ └─────┘                │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│  SEÇÃO: MOTION DESIGN                    │
│  ┌─────┐ ┌─────┐                        │
│  │Proj1│ │Proj2│                        │
│  └─────┘ └─────┘                        │
└─────────────────────────────────────────┘
         ↓
... (outras seções)
```

---

## 🎯 **SOLUÇÃO PROPOSTA**

### **1. Expandir Submenu (11 categorias)**

```tsx
const submenuItems = [
  { id: 'all', label: 'Todos os Projetos', href: '/work', icon: '✦', sectionId: 'all-projects' },
  { id: 'museum', label: 'Museus & Cultura', href: '/work?category=museum', icon: '🏛️', sectionId: 'section-museum' },
  { id: 'festival', label: 'Festivais', href: '/work?category=festival', icon: '🎪', sectionId: 'section-festival' },
  { id: 'brand', label: 'Marcas & Eventos', href: '/work?category=brand', icon: '🎯', sectionId: 'section-brand' },
  { id: 'vr-xr', label: 'VR & XR', href: '/work?category=vr-xr', icon: '🥽', sectionId: 'section-vr-xr' },
  { id: 'motion', label: 'Motion Design', href: '/work?category=motion', icon: '🎬', sectionId: 'section-motion' },
  { id: 'animacao', label: 'Animação', href: '/work?category=animacao', icon: '🎨', sectionId: 'section-animacao' },
  { id: 'color', label: 'Color Grading', href: '/work?category=color', icon: '🎨', sectionId: 'section-color' },
  { id: 'edit', label: 'Edição', href: '/work?category=edit', icon: '✂️', sectionId: 'section-edit' },
  { id: 'fx-video', label: 'FX Video', href: '/work?category=fx-video', icon: '✨', sectionId: 'section-fx-video' },
  { id: 'producao-visual', label: 'Produção Visual', href: '/work?category=producao-visual', icon: '🎥', sectionId: 'section-producao-visual' },
]
```

### **2. Criar Seções Visuais por Categoria**

Cada categoria terá sua própria seção com:
- Título da seção
- Descrição breve
- Grid de projetos filtrados
- Link "Ver todos" (se houver mais projetos)

### **3. Scroll Inteligente**

Quando clica no submenu:
1. Aplica filtro via URL (`?category=museum`)
2. Scrolla para a seção correspondente (`#section-museum`)
3. Destaque visual na seção (animação, highlight)

### **4. Mapeamento de Categorias**

**Submenu → projectCategory:**
- `museum` → `['museum', 'museus', 'cultura']`
- `festival` → `['festival', 'curadoria', 'festivais']`
- `brand` → `['brand', 'corporate', 'marcas', 'eventos']`
- `vr-xr` → `['vr-360', 'vr', 'xr', 'ar', '360']`
- `motion` → `['motion', 'motion-graphics']`
- `animacao` → `['animacao', 'animation', '3d-animation']`
- `color` → `['color', 'color-grading', 'grading']`
- `edit` → `['edit', 'edicao', 'editing', 'pos-producao']`
- `fx-video` → `['vfx', 'fx', 'efeitos-visuais', 'cgi']`
- `producao-visual` → `['producao', 'producao-visual', 'visual-production']`

---

## 📋 **IMPLEMENTAÇÃO PROPOSTA**

### **Fase 1: Expandir Submenu** (30 min)
- Adicionar 6 novas categorias
- Atualizar navegação
- Adicionar IDs de seção

### **Fase 2: Criar Seções Visuais** (2-3h)
- Criar componente `ProjectSection` reutilizável
- Renderizar seção para cada categoria
- Adicionar scroll automático

### **Fase 3: Melhorar Navegação** (1h)
- Scroll para seção quando filtro aplicado
- Highlight visual na seção ativa
- Animações de transição

### **Fase 4: Organizar Projetos** (1h)
- Mapear projetos existentes para categorias
- Garantir que cada projeto aparece na seção correta
- Adicionar projetos placeholder se necessário

---

## 🎨 **ESTRUTURA DE SEÇÃO PROPOSTA**

```tsx
<section id="section-museum" className="py-16 scroll-mt-32">
  <div className="mb-8">
    <h2 className="text-3xl font-handel uppercase tracking-wide mb-3">
      🏛️ Museus & Cultura
    </h2>
    <p className="text-slate-400 max-w-2xl">
      Projetos imersivos para museus, exposições e instituições culturais...
    </p>
  </div>
  
  {museumProjects.length > 0 ? (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {museumProjects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  ) : (
    <div className="text-center py-12 text-slate-400">
      Em breve: novos projetos nesta categoria
    </div>
  )}
</section>
```

---

## ✅ **VANTAGENS DA REESTRUTURAÇÃO**

1. **Navegação Clara:** Cada categoria tem sua seção visível
2. **Scroll Funcional:** Clicar no submenu scrolla para a seção correta
3. **Organização:** Projetos agrupados por categoria
4. **Escalável:** Fácil adicionar novos projetos e categorias
5. **UX Melhor:** Usuário entende onde está e o que está vendo

---

## 🚀 **PRÓXIMOS PASSOS**

**Antes de implementar, confirme:**
1. ✅ Estrutura de seções está OK?
2. ✅ Categorias propostas estão corretas?
3. ✅ Scroll para seções está OK?
4. ✅ Começar pela reestruturação completa?

**Posso implementar agora ou prefere ajustar algo primeiro?** 🎨
