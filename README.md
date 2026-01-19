# 🌟 Azimut - Immersive • Interactive • Cinematic

> Experiências imersivas, interativas e cinematográficas para cultura, marcas e espaços híbridos

[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://azmt.com.br)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)

---

## 🎯 Sobre o Projeto

Site institucional premium da **Azimut**, estúdio especializado em:
- 🎬 **Cinema & Audiovisual** - Filmes 360°, VR, documentários imersivos
- 🏛️ **Museus & Exposições** - Instalações interativas e experiências imersivas
- 🎮 **Games & Interatividade** - Aplicações de realidade virtual e aumentada
- 🎓 **Academy** - Agenciamento educacional para VFS & VanArts (Vancouver)
- 🤖 **IA Criativa** - Soluções com inteligência artificial generativa

---

## 🚀 Stack Tecnológica

### Frontend
- **React 18** - Biblioteca UI com Concurrent Features
- **TypeScript 5** - Tipagem estática
- **Vite 5** - Build tool ultrarrápido
- **TailwindCSS v4** - Framework CSS utility-first
- **React Router DOM** - Navegação SPA

### Features Premium
- 🌐 **Internacionalização** - PT, EN, FR, ES (detecção automática)
- 🌙 **Tema Dark/Light** - Troca suave com persistência
- 📱 **PWA** - Instalável, offline-first
- 📊 **Analytics** - Tracking comportamental silencioso
- 🔍 **SEO** - Meta tags, Open Graph, Structured Data
- ♿ **Acessibilidade** - WCAG 2.1 AA (Skip links, ARIA, focus)
- ⚡ **Performance** - Lazy loading, code splitting, optimized images

---

## 📁 Estrutura do Projeto

```
src/
├── api/              # Funções de API (leads, chat)
├── components/       # Componentes React reutilizáveis
├── data/             # Dados estáticos (serviços, projetos)
├── hooks/            # Custom hooks (tema, tracking, backoffice)
├── pages/            # Páginas da aplicação
├── services/         # Serviços externos (AI, API)
├── utils/            # Utilitários (analytics, geo, performance)
└── i18n.ts           # Traduções (PT, EN, FR, ES)

public/
├── fonts/            # Fontes customizadas (Handel Gothic, Sora)
├── manifest.json     # PWA manifest
├── sw.js             # Service Worker
└── offline.html      # Página offline
```

---

## 🛠️ Instalação

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Passos

```bash
# Clonar repositório
git clone https://github.com/azimut/site.git
cd azimut-site-vite-tailwind

# Instalar dependências
npm install

# Variáveis de ambiente (criar .env)
cp .env.example .env

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

---

## 🔧 Variáveis de Ambiente

```env
# API do Backoffice
VITE_API_URL=https://backoffice.azmt.com.br
VITE_BACKOFFICE_URL=https://backoffice.azmt.com.br

# Analytics
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# AI (opcional)
VITE_CLAUDE_API_KEY=sk-xxx
VITE_DEEPSEEK_API_KEY=sk-xxx
```

---

## 📱 PWA Features

- ✅ Instalável em desktop e mobile
- ✅ Funciona offline com Service Worker
- ✅ Atalhos para seções principais
- ✅ Push notifications (preparado)
- ✅ Background sync (preparado)

---

## 🎨 Design System

### Cores
- **Azimut Red**: `#c92337`
- **Dark BG**: `#050814` → `#0a0f1a`
- **Light BG**: `#d3cec3` (cream)
- **Text**: `#ffffff` (dark) / `#0f172a` (light)

### Tipografia
- **Títulos**: Handel Gothic
- **Corpo**: Inter
- **Labels**: Sora

### Animações
- fadeInUp, fadeInScale
- glow-pulse, shine
- kenBurns (hero carousel)
- 22+ @keyframes disponíveis

---

## 🔒 Seções Protegidas

⚠️ Não modificar sem autorização:
1. Menu de navegação (Layout.tsx)
2. Seletor de idiomas
3. Estrela de fundo (background)
4. Rodapé
5. Cores e temas

Ver `PROTECTED_SECTIONS.md` para detalhes.

---

## 📊 Performance

- Lighthouse Score: 90+
- FCP: < 1.5s
- LCP: < 2.5s
- CLS: < 0.1
- Lazy loading para todas as páginas secundárias
- Code splitting otimizado

---

## 🚢 Deploy

O deploy é automático via Vercel quando há push na branch `main`.

```bash
# Deploy manual
vercel --prod
```

---

## 📝 Changelog

### v2.0.0 (Janeiro 2026)
- ✅ Redesign World-Class 2026
- ✅ Página Vancouver com hero dinâmico
- ✅ Maple Leaf oficial do Canadá
- ✅ Limpeza de 159 console.logs
- ✅ Acessibilidade WCAG 2.1 AA
- ✅ 22 micro-interações premium

### v1.0.0 (2025)
- Release inicial

---

## 👥 Time

- **Direção Criativa**: Azimut Studio
- **Desenvolvimento**: Azimut Tech

---

## 📄 Licença

Proprietário © 2026 Azimut. Todos os direitos reservados.

---

<p align="center">
  <strong>🌟 Azimut - Experiências que transformam</strong>
</p>
