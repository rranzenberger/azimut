# 🔍 GUIA DE TESTE NO LOCALHOST

## ✅ SERVIDOR INICIADO!

---

## 🌐 PÁGINAS PARA TESTAR

### 1. ACADEMY HUB (Principal)
```
URL: http://localhost:1756/pt/academy

O QUE TESTAR:
├─ Hero section (vídeo de fundo - placeholder)
├─ 4 Cards dos programas (Vancouver, Courses, Workshops, Corporate)
├─ Hover nos cards (efeito glow vermelho)
├─ Seção História Educacional (vídeo placeholder)
├─ Stats (30+ anos, 500+ alunos, etc)
├─ Professores (3 placeholders)
└─ CTA final

ESPERAR VER:
✅ Design premium escuro
✅ Ícones grandes nos placeholders (emoji)
✅ Gradientes e glassmorphism
✅ Mensagens "PLACEHOLDER" discretas
✅ Tudo responsivo
```

### 2. VANCOUVER (Já tem 3 vídeos!)
```
URL: http://localhost:1756/pt/academy/vancouver

O QUE TESTAR:
├─ Hero (imagem/vídeo de fundo)
├─ Comparação Brasil vs Vancouver (tabela)
├─ Card VFS (placeholder)
├─ Card VanArts (✅ VÍDEO INSTITUCIONAL)
├─ Student Work (✅ 2 VÍDEOS)
├─ Testimonials (✅ VÍDEO DEPOIMENTOS)
├─ Formulário de interesse
└─ Responsividade

ESPERAR VER:
✅ 3 vídeos funcionais (VanArts)
✅ Thumbnails dos vídeos
✅ Lightbox ao clicar (modal com vídeo)
✅ Play button animado
✅ Formulário funcional
```

### 3. COURSES (Cursos)
```
URL: http://localhost:1756/pt/academy/courses

O QUE TESTAR:
├─ Hero section
├─ Filtros por categoria (Todos, VR, IA, Motion, Interativo)
├─ Grid de 6 cursos com placeholders
├─ Hover nos cards (efeito vermelho)
├─ Badges "Destaque", "Intermediário", etc
├─ Seção Features (6 cards)
├─ Galeria Student Work (8 placeholders)
├─ Class Demos (4 placeholders)
└─ CTA final

ESPERAR VER:
✅ 6 cursos mockados com detalhes
✅ Filtros funcionais (clica, filtra!)
✅ Ícones grandes nos placeholders
✅ Tudo organizado e limpo
```

### 4. WORKSHOPS (Eventos)
```
URL: http://localhost:1756/pt/academy/workshops

O QUE TESTAR:
├─ Hero section
├─ 4 Formatos (Mini-cursos, Workshops, Palestras, In-Company)
├─ Lista de workshops com banners (placeholders)
├─ Seção "Onde já palestramos" (Rio2C, SESC, UFRJ, Festival)
├─ Galeria de fotos (8 placeholders)
├─ Depoimentos (2 cards)
└─ CTA final

ESPERAR VER:
✅ 4 workshops mockados
✅ 4 eventos passados
✅ Galeria placeholder
✅ Design consistente
```

### 5. CORPORATE (B2B)
```
URL: http://localhost:1756/pt/academy/corporate

O QUE TESTAR:
├─ Hero section
├─ 3 Formatos (In-Company, Consultoria, Capacitação)
├─ Logos clientes (8 placeholders: Globo, Petrobras, etc)
├─ 3 Cases de sucesso (placeholders)
├─ Stats (50+ empresas, 2000+ profissionais, etc)
├─ 8 Setores atendidos
├─ Depoimentos (2 cards)
└─ CTA final

ESPERAR VER:
✅ 3 cases detalhados
✅ 8 logos placeholder
✅ Stats impressionantes
✅ Design corporativo premium
```

---

## ✅ CHECKLIST DE TESTE

### VISUAL:
- [ ] Design escuro premium consistente
- [ ] Glassmorphism nos cards
- [ ] Efeito glow vermelho nos hovers
- [ ] Placeholders com ícones grandes
- [ ] Mensagens "BACKOFFICE" discretas
- [ ] Tipografia HandelGothic + Inter + Sora

### INTERATIVIDADE:
- [ ] Filtros funcionam (Courses)
- [ ] Hover effects (todos os cards)
- [ ] Links funcionam (internos)
- [ ] Scroll smooth
- [ ] Animações suaves

### RESPONSIVIDADE:
- [ ] Desktop (1920px)
- [ ] Tablet (768px)
- [ ] Mobile (375px)
- [ ] Grids se adaptam
- [ ] Textos legíveis

### VÍDEOS (Vancouver):
- [ ] 3 vídeos aparecem
- [ ] Thumbnails carregam
- [ ] Clicar abre lightbox
- [ ] Vídeo toca no lightbox
- [ ] Fechar lightbox (ESC ou X)

### NAVEGAÇÃO:
- [ ] Menu top (links Academy)
- [ ] Breadcrumbs
- [ ] Footer links
- [ ] Voltar funciona

---

## 🐛 POSSÍVEIS PROBLEMAS

### PROBLEMA 1: Página em branco
```
CAUSA: Import errado ou erro de sintaxe
SOLUÇÃO: Ver console do navegador (F12)
```

### PROBLEMA 2: Vídeos não aparecem
```
CAUSA: Hook useAcademyVideos não importado
SOLUÇÃO: Verificar console, recarregar página
```

### PROBLEMA 3: Layout quebrado
```
CAUSA: CSS não carregou ou conflito
SOLUÇÃO: Hard reload (Ctrl+Shift+R)
```

### PROBLEMA 4: Rota 404
```
CAUSA: App.tsx não atualizou ou erro na rota
SOLUÇÃO: Verificar URL, recarregar servidor
```

---

## 🎯 O QUE APROVAR

### ✅ SE ESTIVER BOM:
```
1. Design premium → ✅ Aprovado
2. Estrutura organizada → ✅ Aprovado
3. Placeholders claros → ✅ Aprovado
4. 3 vídeos Vancouver → ✅ Aprovado
5. Navegação funcional → ✅ Aprovado

DECISÃO: "Deploy agora!" 🚀
```

### ⚠️ SE TIVER AJUSTE PEQUENO:
```
Exemplo:
- "Mudar cor do botão"
- "Ajustar espaçamento"
- "Trocar texto"

EU AJUSTO: 5-10 minutos
DEPOIS: Deploy! 🚀
```

### ❌ SE TIVER PROBLEMA GRANDE:
```
Exemplo:
- Página não carrega
- Layout completamente quebrado
- Erro de compilação

EU CORRIJO: 10-30 minutos
TESTO: Novamente
DEPOIS: Deploy! 🚀
```

---

## 📸 SCREENSHOTS RECOMENDADOS

**Se quiser me mostrar algo, tire print de:**

1. **Academy Hub** - Hero + 4 cards
2. **Vancouver** - Vídeos funcionando
3. **Courses** - Grid de cursos
4. **Workshops** - Lista de workshops
5. **Corporate** - Cases
6. **Console** - Se tiver erro (F12 → Console)

---

## 💬 FEEDBACKS ÚTEIS

### BOM:
- "✅ Academy Hub ficou linda!"
- "✅ Vancouver com 3 vídeos perfeito!"
- "✅ Tudo responsivo!"
- "Deploy agora!" 🚀

### COM AJUSTE:
- "⚠️ Botão muito pequeno em Courses"
- "⚠️ Espaçamento grande demais em Corporate"
- "⚠️ Cor do texto meio escura"
- "Ajusta isso e deploy!" 🚀

### COM PROBLEMA:
- "❌ Courses não carrega (erro console)"
- "❌ Vídeos não aparecem em Vancouver"
- "❌ Menu quebrou"
- "Precisa corrigir antes do deploy" 🐛

---

## 🚀 PRÓXIMOS PASSOS

### SE APROVAR:
```bash
1. Você: "✅ Aprovado, deploy!"
2. Eu: Git commit + push (1 min)
3. Vercel: Deploy automático (3 min)
4. Você: Testa em produção
5. Busca vídeos aos poucos
```

### SE AJUSTAR:
```bash
1. Você: "⚠️ Ajusta X e Y"
2. Eu: Faço ajustes (5-10 min)
3. Você: Testa novamente localhost
4. Aprovado: Deploy! 🚀
```

### SE CORRIGIR:
```bash
1. Você: "❌ Erro em X (print console)"
2. Eu: Corrijo o erro (10-30 min)
3. Você: Testa novamente localhost
4. OK: Deploy! 🚀
```

---

## 🎉 LEMBRETES

### ✅ O QUE JÁ FUNCIONA:
- Academy Hub - Design 100%
- Vancouver - 3 vídeos funcionais
- Courses - 6 cursos mockados
- Workshops - Estrutura completa
- Corporate - Cases e logos

### ⏳ O QUE FALTA (Normal):
- Imagens reais (você sobe depois)
- Mais 5-8 vídeos (você busca depois)
- Fotos professores (você tem?)
- Logos clientes reais (você tem?)

### 💡 LEMBRE-SE:
- Placeholders são NORMAIS
- Site funciona perfeitamente assim
- Você troca depois facilmente
- Sem necessidade de redeploy

---

**ABRA SEU NAVEGADOR E TESTE! 🌐**

**URLs DIRETAS:**
```
http://localhost:1756/pt/academy
http://localhost:1756/pt/academy/vancouver
http://localhost:1756/pt/academy/courses
http://localhost:1756/pt/academy/workshops
http://localhost:1756/pt/academy/corporate
```

**ME DIGA O QUE ACHOU! 💬**
