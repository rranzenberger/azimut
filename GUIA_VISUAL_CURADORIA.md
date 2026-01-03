# 🎯 GUIA VISUAL: ONDE VER A CUADORIA NO SITE

## 📍 LOCALIZAÇÕES EXATAS

### **1. PÁGINA DO PROJETO: `/work/museu-olimpico-rio`**

#### **🏷️ TAGS (Badges Coloridos)**
```
┌─────────────────────────────────────────┐
│  Museu Olímpico do Rio                   │
│  [tag1] [tag2] [tag3] [tag4] [tag5]      │ ← AQUI!
│                                          │
│  Descrição do projeto...                 │
└─────────────────────────────────────────┘
```
- **Localização:** Logo abaixo do título do projeto
- **Visual:** Badges pequenos, coloridos, clicáveis
- **Função:** Filtram projetos relacionados quando clicados

#### **🎨 FILTROS DE CATEGORIA**
```
┌─────────────────────────────────────────┐
│  Galeria                                 │
│                                          │
│  [⭐ Destaques] [📰 Jornal] [🏗️ Instalações] │ ← AQUI!
│  [🤸 Ginástica] [🎉 Eventos] [🔧 Making-of]  │
│                                          │
│  ┌─────┐ ┌─────┐ ┌─────┐                │
│  │ IMG │ │ IMG │ │ IMG │                │
│  └─────┘ └─────┘ └─────┘                │
└─────────────────────────────────────────┘
```
- **Localização:** Acima da galeria de imagens
- **Visual:** Botões com ícones e texto
- **Função:** Filtram imagens por categoria

#### **⭐ TIER 1 (Destaques)**
```
┌─────────────────────────────────────────┐
│  ┌─────┐ ┌─────┐ ┌─────┐                │
│  │ IMG │ │ IMG │ │ IMG │                │
│  │ ⭐  │ │     │ │     │                │ ← AQUI!
│  └─────┘ └─────┘ └─────┘                │
│  ↑                                      │
│  Borda vermelha + Badge ⭐              │
└─────────────────────────────────────────┘
```
- **Localização:** Imagens na galeria
- **Visual:** 
  - Borda vermelha (`ring-2 ring-azimut-red/50`)
  - Sombra vermelha (`shadow-lg shadow-azimut-red/20`)
  - Badge ⭐ no canto superior direito
- **Função:** Destaca imagens de maior impacto

#### **📊 SEÇÕES TEMÁTICAS**
```
┌─────────────────────────────────────────┐
│  📰 Na Mídia                             │ ← AQUI!
│  ┌─────┐ ┌─────┐ ┌─────┐                │
│  │ IMG │ │ IMG │ │ IMG │                │
│  └─────┘ └─────┘ └─────┘                │
│                                          │
│  🏗️ Instalações Interativas              │ ← AQUI!
│  ┌─────┐ ┌─────┐ ┌─────┐                │
│  │ IMG │ │ IMG │ │ IMG │                │
│  └─────┘ └─────┘ └─────┘                │
│                                          │
│  🤸 Ginástica Artística                  │ ← AQUI!
│  ┌─────┐ ┌─────┐ ┌─────┐                │
│  │ IMG │ │ IMG │ │ IMG │                │
│  └─────┘ └─────┘ └─────┘                │
└─────────────────────────────────────────┘
```
- **Localização:** Galeria organizada por seções
- **Visual:** Títulos de seção com ícones
- **Função:** Agrupa imagens por categoria automaticamente

---

### **2. PÁGINA DE PORTFÓLIO: `/work`**

#### **🏷️ TAGS NOS CARDS**
```
┌─────────────────────┐ ┌─────────────────────┐
│  [Projeto 1]        │ │  [Projeto 2]        │
│  Descrição...        │ │  Descrição...        │
│  [tag1] [tag2] [tag3]│ │  [tag1] [tag2]      │ ← AQUI!
└─────────────────────┘ └─────────────────────┘
```
- **Localização:** Cada card de projeto
- **Visual:** Badges pequenos abaixo da descrição
- **Função:** Mostra tags do projeto, clicáveis para filtrar

#### **🔍 FILTRO POR TAG**
```
┌─────────────────────────────────────────┐
│  [Buscar projetos...] [Todas as tags ▼]  │ ← AQUI!
│                                          │
│  ┌─────┐ ┌─────┐ ┌─────┐                │
│  │Card │ │Card │ │Card │                │
│  └─────┘ └─────┘ └─────┘                │
└─────────────────────────────────────────┘
```
- **Localização:** Barra de filtros no topo
- **Visual:** Dropdown com lista de tags
- **Função:** Filtra todos os projetos por tag selecionada

---

### **3. PÁGINA HOME: `/`**

#### **🎯 PROJETOS RECOMENDADOS**
```
┌─────────────────────────────────────────┐
│  Projetos em Destaque                   │
│                                          │
│  ┌─────┐ ┌─────┐ ┌─────┐                │
│  │Card │ │Card │ │Card │                │ ← AQUI!
│  │⭐   │ │     │ │     │                │
│  └─────┘ └─────┘ └─────┘                │
│                                          │
│  (Personalizados por IA baseado em      │
│   tags e comportamento do visitante)    │
└─────────────────────────────────────────┘
```
- **Localização:** Seção "Projetos em Destaque"
- **Visual:** Cards de projetos, ordem personalizada
- **Função:** Mostra projetos relevantes ao interesse do visitante

#### **🏷️ TAGS NOS CARDS**
```
┌─────────────────────┐
│  [Projeto]           │
│  Descrição...        │
│  [tag1] [tag2]       │ ← AQUI!
└─────────────────────┘
```
- **Localização:** Cards de projetos na home
- **Visual:** Badges pequenos
- **Função:** Identificam tags do projeto

---

## 🎨 VISUAL DAS FUNCIONALIDADES

### **Tags (Badges):**
```
┌──────┐ ┌──────┐ ┌──────┐
│ tag1 │ │ tag2 │ │ tag3 │
└──────┘ └──────┘ └──────┘
```
- Cor: Branco/transparente
- Tamanho: Pequeno (text-xs)
- Hover: Borda vermelha

### **TIER 1 (Destaque):**
```
┌─────────────┐
│      ⭐     │ ← Badge
│             │
│   [IMAGEM]  │
│             │
└─────────────┘
  ↑
  Borda vermelha + Sombra
```
- Borda: `ring-2 ring-azimut-red/50`
- Sombra: `shadow-lg shadow-azimut-red/20`
- Badge: ⭐ no canto superior direito

### **Filtros de Categoria:**
```
┌──────────────┐ ┌──────────────┐
│ ⭐ Destaques │ │ 📰 Jornal    │
└──────────────┘ └──────────────┘
```
- Ativo: Fundo vermelho, texto branco
- Inativo: Fundo transparente, texto cinza
- Hover: Fundo levemente mais claro

---

## 🔍 COMO TESTAR

### **1. Ver Tags:**
1. Acesse: `https://azmt.com.br/work/museu-olimpico-rio`
2. Role até abaixo do título
3. Veja tags como badges coloridos
4. Clique em uma tag para filtrar

### **2. Ver Categorias:**
1. Acesse: `https://azmt.com.br/work/museu-olimpico-rio`
2. Role até a seção "Galeria"
3. Veja filtros: ⭐ Destaques, 📰 Jornal, 🏗️ Instalações, etc.
4. Clique em uma categoria para filtrar

### **3. Ver TIER 1:**
1. Acesse: `https://azmt.com.br/work/museu-olimpico-rio`
2. Role até a galeria
3. Veja imagens com:
   - Borda vermelha
   - Badge ⭐ no canto
   - Sombra especial
4. Clique em "⭐ Destaques" para ver apenas TIER 1

### **4. Ver Recomendações:**
1. Acesse: `https://azmt.com.br/`
2. Navegue por alguns projetos
3. Volte para Home
4. Veja projetos recomendados mudarem (baseado em tags)

---

## 📊 RESUMO VISUAL

| Funcionalidade | Onde | Visual |
|---------------|------|--------|
| **Tags** | Cards, abaixo do título | Badges coloridos pequenos |
| **Categorias** | Galeria, filtros | Botões com ícones |
| **TIER 1** | Galeria, imagens | Borda vermelha + ⭐ |
| **Recomendações** | Home, Work | Cards ordenados por interesse |
| **Filtros** | Work, ProjectDetail | Dropdowns e botões |

---

## ✅ APÓS EXECUTAR O SCRIPT

Você verá:

1. ✅ **Tags** em todos os projetos
2. ✅ **Categorias** na galeria do Museu Olímpico
3. ✅ **TIER 1** destacado com borda vermelha
4. ✅ **Filtros** funcionando
5. ✅ **Recomendações** personalizadas

**Tudo funcionando automaticamente!** 🎉

