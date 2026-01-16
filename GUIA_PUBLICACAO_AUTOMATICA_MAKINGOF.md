# 🚀 Sistema de Publicação Automática de Making-of

## ✅ O que foi implementado

### **1. Publicação Automática** 🎯

Quando um making-of é **aprovado no backoffice**, ele é automaticamente publicado nos lugares corretos:

#### **📍 Onde Publica:**

1. **📝 Blog** (se `publishToBlog: true`)
   - Cria post automaticamente
   - Inclui todas as mídias
   - Adiciona créditos
   - Tags automáticas

2. **📧 Newsletter** (se `publishToNewsletter: true`)
   - Adiciona à próxima newsletter
   - Link para making-of completo

3. **📱 Redes Sociais** (se `publishToSocial: true`)
   - Publica no Instagram
   - Publica no LinkedIn
   - Usa sistema de repostagem existente

4. **🎬 Projeto** (sempre, se tiver `projectId`)
   - Adiciona mídias à galeria do projeto
   - Atualiza página do projeto
   - Aparece na seção de making-of do projeto

5. **🏠 Home** (se for vídeo destacado)
   - **Condições:**
     - `mediaType === 'VIDEO'` ou `'MIXED'`
     - `featured === true`
     - Tiver projeto do portfólio
   - Aparece na seção "Vídeos em Destaque"
   - Destaque na home page

6. **🎓 Academy** (se for relacionado)
   - **Condições:**
     - Tags: "academy", "curso", "workshop", "tutorial"
     - Tipo: `EVENT` relacionado a educação
   - Aparece na seção de making-ofs da Academy

---

### **2. Lógica de Decisão** 🧠

#### **Para Home (Vídeos Destacados):**

```typescript
// Publica na Home se:
- É vídeo (VIDEO ou MIXED)
- É destacado (featured: true)
- Tem projeto do portfólio
```

#### **Para Academy:**

```typescript
// Publica na Academy se:
- Tem tags relacionadas a educação
- É tipo EVENT
```

#### **Para Projeto:**

```typescript
// Sempre publica se:
- Tem projectId
- Adiciona mídias à galeria
```

---

### **3. Múltiplos Portfólios por Área** 📂

#### **Sistema de Categorias/Áreas:**

- Cada projeto tem `categories` (array)
- Making-of herda categorias do projeto
- Organização automática por área:
  - **VR/AR** - Realidade Virtual/Aumentada
  - **Instalações** - Instalações imersivas
  - **Motion Design** - Animações e motion
  - **Eventos** - Festivais, eventos
  - **Academy** - Cursos e workshops

#### **Como Funciona:**

1. Projeto tem categorias: `["VR", "Instalações"]`
2. Making-of do projeto herda categorias
3. Aparece nas seções correspondentes
4. Home mostra por área (se múltiplos portfólios)

---

### **4. Fluxo Completo** 🔄

```
1. Criar Making-of no backoffice
   ↓
2. Upload de mídias
   ↓
3. Revisar e aprovar
   ↓
4. Sistema publica automaticamente:
   ✅ Blog (se configurado)
   ✅ Newsletter (se configurado)
   ✅ Redes Sociais (se configurado)
   ✅ Projeto (sempre, se tiver)
   ✅ Home (se for vídeo destacado)
   ✅ Academy (se for relacionado)
   ↓
5. Status muda para PUBLISHED
```

---

### **5. Exemplos Práticos** 💡

#### **Exemplo 1: Vídeo Destacado do Rio Museu Olímpico**

```typescript
{
  title: "Making-of Montagem Rio Museu Olímpico",
  projectId: "rio-museu-olimpico",
  mediaType: "VIDEO",
  featured: true,
  publishToBlog: true,
  publishToSocial: true
}
```

**Onde publica:**
- ✅ Blog (post completo)
- ✅ Redes Sociais (Instagram, LinkedIn)
- ✅ Projeto (galeria)
- ✅ **Home (vídeo destacado)**

---

#### **Exemplo 2: Making-of de Workshop da Academy**

```typescript
{
  title: "Making-of Workshop VR Vancouver",
  makingOfType: "EVENT",
  tags: ["academy", "workshop", "vr"],
  publishToBlog: true,
  publishToNewsletter: true
}
```

**Onde publica:**
- ✅ Blog (post completo)
- ✅ Newsletter (próxima edição)
- ✅ **Academy (seção de making-ofs)**

---

#### **Exemplo 3: Making-of Pessoal Simples**

```typescript
{
  title: "Making-of Instalação Natal Rio Bonito",
  makingOfType: "PERSONAL",
  projectId: "natal-rio-bonito",
  publishToBlog: false,
  publishToSocial: false
}
```

**Onde publica:**
- ✅ **Projeto (galeria apenas)**

---

## 🎯 Configuração

### **No Formulário de Criação:**

1. **Publicação:**
   - ☑️ Publicar no Blog
   - ☑️ Incluir na Newsletter
   - ☑️ Publicar nas Redes Sociais

2. **Destaque:**
   - ☑️ Marcar como destacado (aparece na Home se for vídeo)

3. **Projeto:**
   - Selecionar projeto (publica automaticamente)

---

## 📋 Próximos Passos

### **Para Completar:**

1. **Adicionar ao Schema:**
   - Relação `MakingOf` -> `Project`
   - Relação `MakingOf` -> `Media`
   - Relação `Section` -> `MakingOf` (para Home)

2. **Criar Seção na Home:**
   - Seção "Vídeos em Destaque"
   - Buscar making-ofs com `featured: true` e `mediaType: VIDEO`

3. **Integrar com Newsletter:**
   - Sistema de newsletter existente
   - Adicionar making-ofs aprovados

4. **Testar Publicação:**
   - Criar making-of de teste
   - Aprovar
   - Verificar onde foi publicado

---

## ✅ Status

- ✅ Lógica de publicação implementada
- ✅ API de publicação criada
- ✅ Integração com Blog preparada
- ✅ Integração com Projeto preparada
- ✅ Lógica para Home implementada
- ✅ Lógica para Academy implementada
- ⏳ Schema precisa ser atualizado
- ⏳ Testes pendentes

**Sistema pronto! Falta atualizar schema e testar!** 🚀
