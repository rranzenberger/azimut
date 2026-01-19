# 🎨 Plano de Melhorias Visuais - Azimut
## Implementação Prática e Imediata

---

## 🚀 FASE 1: Quick Wins (Implementar Agora)

### 1. **Melhorar Cards de Projetos** ⚡

**Arquivo**: `src/pages/Work.tsx` (ou componente de card de projeto)

**Melhorias**:
- [ ] Hover effect mais suave com scale transform
- [ ] Overlay gradient ao hover (sutil)
- [ ] Transição de imagem mais fluida
- [ ] Shadow mais pronunciada no hover
- [ ] Tag badges mais visíveis

**Código sugerido**:
```tsx
// Adicionar classes Tailwind:
className="transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
```

---

### 2. **Scroll Animations Melhoradas** ✨

**Arquivo**: Todas as páginas principais

**Melhorias**:
- [ ] Fade-in mais suave em elementos ao scroll
- [ ] Stagger animation em listas (cards aparecem sequencialmente)
- [ ] Parallax sutil na estrela de fundo

**Biblioteca sugerida**: `framer-motion` ou CSS puro

---

### 3. **Tipografia Mais Impactante** 📝

**Arquivo**: `src/pages/Home.tsx`, seções principais

**Melhorias**:
- [ ] Headlines maiores em breakpoints maiores
- [ ] Line-height otimizado
- [ ] Letter-spacing ajustado para headlines

---

## 🎬 FASE 2: Enhancements Visuais (Próximas 2 semanas)

### 4. **Hero com Vídeo Background (Opcional)** 🎥

**Arquivo**: `src/pages/Home.tsx`

**Implementação**:
- [ ] Vídeo de fundo no hero (muted, autoplay, loop)
- [ ] Overlay escuro para legibilidade
- [ ] Fallback para imagem estática
- [ ] Botão toggle para desabilitar vídeo (preference)

**Performance**:
- Vídeo deve ser <5MB
- Usar formato WebM/MP4
- Lazy load se possível

---

### 5. **Elementos 3D Sutis** 🎨

**Arquivo**: Novo componente `src/components/WebGLBackground.tsx` (opcional)

**Implementação**:
- [ ] Background WebGL sutil (partículas, formas geométricas)
- [ ] Graceful degradation (fallback para CSS se WebGL não suportado)
- [ ] Performance-first (60fps garantido)
- [ ] Toggle para desabilitar (preference)

**Biblioteca**: `three.js` ou `react-three-fiber`

**Nota**: Isso é opcional e avançado. Pode ser adiado.

---

### 6. **Case Studies Interativos** 📚

**Arquivo**: Novo `src/pages/Project/[slug].tsx`

**Features**:
- [ ] Página dedicada para cada projeto grande
- [ ] Timeline visual do processo
- [ ] Galeria de imagens/vídeos
- [ ] Before/After comparisons
- [ ] Making-of videos

**Backoffice**:
- Criar modelo `ProjectDetail` no Prisma
- Campos: timeline, process, challenges, solutions

---

## 📊 FASE 3: Conteúdo Rico (4-8 semanas)

### 7. **Blog/News Section** 📰

**Arquivo**: Novo `src/pages/Blog/` ou `src/pages/News/`

**Features**:
- [ ] Lista de artigos
- [ ] Página de artigo individual
- [ ] Categorias (VR, AR, Imersão, Cases)
- [ ] Related articles

**Backoffice**:
- Criar modelo `BlogPost` no Prisma
- Campos: title, content, author, publishedAt, category

---

## 🔧 MELHORIAS TÉCNICAS (Ongoing)

### 8. **Performance** ⚡
- [ ] Image optimization review (já temos, revisar)
- [ ] Code splitting mais granular
- [ ] Preload de fontes críticas
- [ ] Service Worker para cache offline (já temos, melhorar)

### 9. **Acessibilidade** ♿
- [ ] Auditoria WCAG 2.1 AA
- [ ] Melhorar contraste onde necessário
- [ ] Navegação por teclado completa
- [ ] Screen reader optimization

---

## 🎯 PRIORIZAÇÃO RECOMENDADA

### **Implementar AGORA** (Esta Semana):
1. ✅ Melhorar hover effects em cards
2. ✅ Scroll animations mais fluidas
3. ✅ Tipografia mais impactante

### **Próximas 2 Semanas**:
4. ✅ Hero com vídeo (opcional)
5. ✅ Case studies interativos (estrutura básica)

### **Próximo Mês**:
6. ✅ Blog/News section
7. ✅ Elementos 3D (se decidir fazer)

---

## 💻 CÓDIGO DE EXEMPLO

### **Card de Projeto Melhorado**:

```tsx
<div 
  className="
    group
    relative
    overflow-hidden
    rounded-lg
    bg-slate-800
    transition-all
    duration-300
    hover:scale-[1.02]
    hover:shadow-2xl
    hover:shadow-azimut-red/20
  "
>
  {/* Imagem com overlay ao hover */}
  <div className="relative overflow-hidden">
    <img 
      src={project.heroImage?.medium || project.image}
      alt={project.title}
      className="
        w-full
        h-64
        object-cover
        transition-transform
        duration-500
        group-hover:scale-110
      "
    />
    {/* Overlay gradient ao hover */}
    <div 
      className="
        absolute
        inset-0
        bg-gradient-to-t
        from-black/60
        via-transparent
        to-transparent
        opacity-0
        group-hover:opacity-100
        transition-opacity
        duration-300
      "
    />
  </div>
  
  {/* Conteúdo */}
  <div className="p-4">
    {/* Tags */}
    <div className="flex flex-wrap gap-2 mb-2">
      {project.tags?.slice(0, 3).map(tag => (
        <span
          key={tag}
          className="
            px-2
            py-1
            text-xs
            font-medium
            bg-azimut-red/20
            text-azimut-red
            rounded
            border
            border-azimut-red/30
          "
        >
          {tag}
        </span>
      ))}
    </div>
    
    {/* Título */}
    <h3 className="text-lg font-bold mb-1 group-hover:text-azimut-red transition-colors">
      {project.title}
    </h3>
    
    {/* Descrição */}
    <p className="text-sm text-slate-400 line-clamp-2">
      {project.summary}
    </p>
  </div>
</div>
```

---

## 📝 NOTAS DE IMPLEMENTAÇÃO

1. **Performance First**: Todas as melhorias devem manter performance
2. **Graceful Degradation**: Funcionalidades extras devem ter fallbacks
3. **Acessibilidade**: Manter WCAG compliance
4. **Mobile-First**: Todas as melhorias devem funcionar em mobile
5. **Testes**: Testar em diferentes dispositivos e browsers

---

**Status**: Planejamento Completo
**Próximo Passo**: Implementar Fase 1 (Quick Wins)

