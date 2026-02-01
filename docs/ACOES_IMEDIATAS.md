# 🚀 AÇÕES IMEDIATAS - Site Azimut 10/10

> Ações práticas para executar agora, ordenadas por impacto.

---

## 🔥 PRIORIDADE 1: Alto Impacto, Baixo Esforço (Hoje)

### 1.1 Instalar Framer Motion
```bash
cd azimut-site-vite-tailwind
npm install framer-motion
```

### 1.2 Verificar Lighthouse
```bash
# No Chrome DevTools → Lighthouse
# Gerar relatório de Performance, A11y, SEO, PWA
# Anotar baseline atual
```

### 1.3 ARIA Labels Básicos
Adicionar `aria-label` em:
- [ ] Botões do header
- [ ] Links de navegação
- [ ] Formulários de contato
- [ ] Botão do chatbot

---

## 🎯 PRIORIDADE 2: Alto Impacto, Médio Esforço (Esta Semana)

### 2.1 Otimização de Imagens
```bash
# Opção 1: Vercel Image Optimization (mais fácil)
# Já incluído no Vercel, basta usar next/image ou configurar

# Opção 2: Build-time com Sharp
npm install sharp --save-dev
```

### 2.2 Prefers-reduced-motion Global
```css
/* Adicionar ao CSS global */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 2.3 Resource Hints
```html
<!-- Adicionar ao index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="dns-prefetch" href="https://www.google-analytics.com" />
<link rel="preconnect" href="https://api.anthropic.com" />
```

---

## 🌐 PRIORIDADE 3: Experiência Imersiva (Próximas 2 Semanas)

### 3.1 Instalar Three.js
```bash
npm install three @react-three/fiber @react-three/drei
```

### 3.2 Criar Background 3D Simples
```typescript
// src/components/StarBackground3D.tsx
import { Canvas } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'

const StarBackground3D = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas>
        <Suspense fallback={null}>
          <Stars 
            radius={100} 
            depth={50} 
            count={3000} 
            factor={4} 
            saturation={0} 
            fade 
            speed={0.5}
          />
          <ambientLight intensity={0.5} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default StarBackground3D
```

### 3.3 Adicionar ao Layout
```typescript
// src/components/Layout.tsx
import StarBackground3D from './StarBackground3D'

// No return, antes do conteúdo:
<StarBackground3D />
```

---

## 📊 CHECKLIST DE EXECUÇÃO

### Semana 1
- [ ] Instalar Framer Motion
- [ ] Instalar Three.js + R3F
- [ ] Auditoria Lighthouse (baseline)
- [ ] ARIA labels em navegação principal
- [ ] Resource hints no index.html

### Semana 2
- [ ] Background 3D com estrelas
- [ ] Prefers-reduced-motion global
- [ ] Otimização de imagens críticas
- [ ] Focus visible em todos botões

### Semana 3
- [ ] Micro-interações com Framer Motion
- [ ] Transições de página
- [ ] Logo 3D (opcional)
- [ ] Teste de acessibilidade completo

### Semana 4
- [ ] WebAR preview (avançado)
- [ ] Auditoria final
- [ ] Documentação atualizada
- [ ] Deploy final

---

## 🛠️ COMANDOS ÚTEIS

```bash
# Instalar dependências principais
npm install framer-motion three @react-three/fiber @react-three/drei

# Verificar bundle size
npx vite-bundle-visualizer

# Auditoria de acessibilidade
npx axe-cli https://azimut.art

# Lighthouse CI
npx lighthouse https://azimut.art --output html --output-path ./lighthouse-report.html
```

---

## 📈 RESULTADOS ESPERADOS

| Antes | Depois |
|-------|--------|
| Site institucional estático | Experiência imersiva interativa |
| Sem demonstração de XR | WebGL/3D mostrando capacidades |
| Acessibilidade parcial | WCAG 2.1 AA completo |
| Performance ~70 | Performance 95+ |
| Nota 7.5/10 | Nota 10/10 |

---

## 🎯 PRÓXIMO PASSO IMEDIATO

**Executar agora:**
```bash
cd C:\Users\ranz\Documents\azimut-site-vite-tailwind
npm install framer-motion three @react-three/fiber @react-three/drei
```

Quer que eu execute isso e comece a implementar o background 3D?

---

*Documento criado em: 2026-02-01*
