# 📍 ONDE VER A CUADORIA AUTOMÁTICA NO SITE

## 🎯 ONDE AS FUNCIONALIDADES APARECEM

### **1. PÁGINA DO PROJETO: `/work/museu-olimpico-rio`**

#### **📍 Tags (Filtros e Badges)**
- **Onde:** Logo abaixo do título do projeto
- **O que aparece:** Tags criadas automaticamente pela IA
- **Como funciona:** 
  - Tags são mostradas como badges coloridos
  - Visitante pode clicar para filtrar projetos relacionados
  - Sistema usa tags para recomendar projetos similares

#### **📍 Categorias (Filtros da Galeria)**
- **Onde:** Seção de galeria de imagens
- **O que aparece:** Filtros por categoria:
  - 📰 Jornal
  - 🏗️ Instalações
  - 🤸 Ginástica
  - 🎉 Eventos
  - 🔧 Making-of
  - 💻 Tecnologia
- **Como funciona:**
  - Visitante clica em uma categoria
  - Galeria filtra apenas imagens dessa categoria
  - Mostra apenas conteúdo relevante

#### **📍 TIER 1 (Destaques)**
- **Onde:** Galeria de imagens
- **O que aparece:**
  - ⭐ Badge "Destaques" no filtro
  - Borda vermelha nas imagens TIER 1
  - Sombra especial (glow vermelho)
  - Aparecem primeiro na ordem
- **Como funciona:**
  - Botão "⭐ Destaques" filtra apenas TIER 1
  - Imagens TIER 1 têm visual destacado
  - Ordem: TIER 1 primeiro, depois TIER 2, depois TIER 3

#### **📍 Seções Temáticas**
- **Onde:** Galeria organizada por seções
- **O que aparece:**
  - 📰 "Na Mídia" (categoria: jornal)
  - 🏗️ "Instalações Interativas" (categoria: instalacoes)
  - 🤸 "Ginástica Artística" (categoria: ginastica)
- **Como funciona:**
  - Imagens são agrupadas automaticamente por categoria
  - Cada seção mostra apenas imagens relevantes
  - Visitante navega por interesse

---

### **2. PÁGINA DE PORTFÓLIO: `/work`**

#### **📍 Tags nos Cards de Projetos**
- **Onde:** Cada card de projeto
- **O que aparece:** Tags do projeto como badges pequenos
- **Como funciona:**
  - Visitante vê tags de cada projeto
  - Pode clicar em tags para filtrar
  - Sistema mostra projetos com tags similares

#### **📍 Filtros por Tags**
- **Onde:** Barra de filtros no topo
- **O que aparece:** Lista de todas as tags disponíveis
- **Como funciona:**
  - Visitante seleciona uma tag
  - Página mostra apenas projetos com essa tag
  - Sistema de recomendação usa essas tags

---

### **3. PÁGINA HOME: `/`**

#### **📍 Projetos Recomendados (Personalizados)**
- **Onde:** Seção "Projetos em Destaque"
- **O que aparece:** Projetos recomendados baseados em:
  - Tags que visitante visualizou
  - Comportamento de navegação
  - Geolocalização
  - Tipo de visitante (governante, curador, etc.)
- **Como funciona:**
  - Sistema rastreia comportamento
  - DeepSeek analisa interesse
  - Mostra projetos relevantes automaticamente

#### **📍 Tags nos Cards**
- **Onde:** Cards de projetos na home
- **O que aparece:** Tags de cada projeto
- **Como funciona:**
  - Visitante vê tags ao passar mouse
  - Tags ajudam a identificar interesse
  - Sistema usa para recomendar

---

### **4. SISTEMA DE RECOMENDAÇÃO (Invisível mas Ativo)**

#### **📍 Como Funciona:**
1. **Visitante navega** → Sistema rastreia comportamento
2. **DeepSeek analisa** → Identifica interesse por tags
3. **Sistema recomenda** → Mostra projetos relevantes
4. **Conteúdo personalizado** → Adapta mensagens e CTAs

#### **📍 Onde Aparece:**
- **Home:** Projetos em destaque personalizados
- **Work:** Ordem de projetos ajustada por interesse
- **ProjectDetail:** Projetos relacionados baseados em tags
- **CTAs:** Mensagens personalizadas por tipo de visitante

---

## 🎨 VISUAL DAS FUNCIONALIDADES

### **Tags:**
```
[tag1] [tag2] [tag3]  ← Badges coloridos
```

### **TIER 1 (Destaques):**
```
⭐ Destaques  ← Botão de filtro
┌─────────────────┐
│  [Imagem]       │  ← Borda vermelha
│  ⭐ TIER 1      │  ← Badge
└─────────────────┘
```

### **Categorias:**
```
[📰 Jornal] [🏗️ Instalações] [🤸 Ginástica]  ← Filtros
```

---

## 🔍 COMO TESTAR

### **1. Ver Tags:**
- Acesse: `/work/museu-olimpico-rio`
- Veja tags abaixo do título
- Clique em uma tag para filtrar

### **2. Ver Categorias:**
- Acesse: `/work/museu-olimpico-rio`
- Role até a galeria
- Veja filtros de categoria
- Clique em uma categoria

### **3. Ver TIER 1:**
- Acesse: `/work/museu-olimpico-rio`
- Role até a galeria
- Clique em "⭐ Destaques"
- Veja imagens com borda vermelha

### **4. Ver Recomendações:**
- Acesse: `/` (Home)
- Navegue por alguns projetos
- Volte para Home
- Veja projetos recomendados mudarem

---

## 📊 RESUMO

| Funcionalidade | Onde Aparece | Como Funciona |
|---------------|--------------|---------------|
| **Tags** | Cards de projetos, filtros | Badges coloridos, clicáveis para filtrar |
| **Categorias** | Galeria do projeto | Filtros por tipo de conteúdo |
| **TIER 1** | Galeria do projeto | Destaques com borda vermelha |
| **Recomendações** | Home, Work, ProjectDetail | Projetos personalizados por interesse |
| **Personalização** | Todo o site | Conteúdo adaptado ao visitante |

---

## ✅ PRÓXIMOS PASSOS

1. **Execute o script de curadoria:**
   ```bash
   cd azimut-cms
   npx tsx scripts/curate-olympic-images-complete.ts
   ```

2. **Verifique no site:**
   - Acesse `/work/museu-olimpico-rio`
   - Veja tags, categorias e TIER 1
   - Teste filtros e recomendações

3. **Teste personalização:**
   - Navegue pelo site
   - Veja como conteúdo se adapta
   - Observe recomendações mudando

---

## 🎉 RESULTADO

Após executar o script, você verá:

- ✅ **Tags** em todos os projetos
- ✅ **Categorias** na galeria do Museu Olímpico
- ✅ **TIER 1** destacado com borda vermelha
- ✅ **Recomendações** personalizadas na Home
- ✅ **Filtros** funcionando em todas as páginas

**Tudo funcionando automaticamente!** 🚀

