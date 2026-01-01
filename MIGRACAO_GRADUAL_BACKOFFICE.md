# 🔄 MIGRAÇÃO GRADUAL DO BACKOFFICE
**Data:** 01/01/2026  
**Status:** ✅ **HÍBRIDO - Backoffice + Fallbacks Fortes**

---

## 🎯 ESTRATÉGIA

Site agora funciona em **modo híbrido inteligente**:

```
1º Tenta → BACKOFFICE (se disponível)
2º Fallback → CONTEÚDO ESTÁTICO (sempre funciona)
3º Cache → ÚLTIMA VERSÃO VÁLIDA (futuro)
```

**NUNCA QUEBRA!** ✅

---

## ✅ O QUE FOI IMPLEMENTADO

### **1. Home.tsx**
- ✅ Tenta buscar hero/projetos/serviços do backoffice
- ✅ Se falhar → usa conteúdo estático
- ✅ Console logs mostram de onde vem o conteúdo

**Prioridade:**
1. Personalização IA (se disponível)
2. Backoffice (se disponível)  
3. Estático (sempre funciona)

### **2. WhatWeDo.tsx**
- ✅ Tenta buscar serviços do backoffice
- ✅ Se falhar → usa 6 serviços padrão
- ✅ Console logs mostram origem

### **3. Work.tsx**
- ✅ Tenta buscar projetos do backoffice
- ✅ Se falhar → usa 3 projetos exemplo
- ✅ Console logs mostram origem

---

## 📊 COMO FUNCIONA

### **Cenário 1: Backoffice FUNCIONANDO**
```javascript
console.log('✅ Usando projetos do backoffice');
// Mostra: Rio Olympic Museum, Gramado VR/AI, etc.
```

### **Cenário 2: Backoffice VAZIO ou OFFLINE**
```javascript
console.log('⚠️ Usando projetos estáticos (fallback) - Preencher no backoffice!');
// Mostra: Instalação Imersiva, Exposição Digital, etc.
```

### **Cenário 3: Backoffice COM ERRO**
```javascript
console.warn('[CMS] Erro ao buscar conteúdo do CMS, usando conteúdo local');
// Usa fallback automaticamente
```

---

## 🔍 COMO VERIFICAR O QUE ESTÁ SENDO USADO

### **1. Abrir Console do Navegador (F12)**

### **2. Recarregar a página**

### **3. Procurar por:**
- ✅ `"✅ Usando ... do backoffice"` → **Backoffice funcionando!**
- ⚠️ `"⚠️ Usando ... estáticos (fallback)"` → **Usando fallback**
- ❌ `"[CMS] Erro ao buscar conteúdo"` → **Backoffice offline**

---

## 📝 PRÓXIMOS PASSOS: POPULAR O BACKOFFICE

### **FASE 1: Projetos (Work)**

1. **Acessar:** https://backoffice.azmt.com.br/admin/projects

2. **Adicionar projeto exemplo:**
   - Título: "Rio Olympic Museum"
   - Short Title: "Tech & AV direction"
   - Summary: "Tech, AV and art direction; immersive content and digital wayfinding."
   - Tags: Cinema & AV, XR, Animation
   - City: Rio de Janeiro
   - Country: Brasil
   - **Upload imagem/vídeo hero**

3. **Salvar e publicar**

4. **Testar:** Recarregar https://azmt.com.br
   - Se aparecer no console: `✅ Usando projetos do backoffice` → **SUCESSO!**

---

### **FASE 2: Serviços (What We Do)**

1. **Acessar:** https://backoffice.azmt.com.br/admin/services

2. **Adicionar serviço exemplo:**
   - Título: "Cinema & Audiovisual"
   - Descrição: "Criamos narrativas cinematográficas que conectam audiências..."
   - Icon: 🎬
   - Slug: cinema-audiovisual

3. **Repetir para os 6 serviços**

4. **Testar:** Recarregar https://azmt.com.br/what
   - Se aparecer no console: `✅ Usando serviços do backoffice` → **SUCESSO!**

---

### **FASE 3: Conteúdo da Home**

1. **Acessar:** https://backoffice.azmt.com.br/admin/pages/home/edit

2. **Preencher:**
   - Hero Slogan: "Experiências que Conectam Mundos"
   - Hero Subtitle: "Criamos experiências imersivas entre Brasil e Canadá."
   - Pillars: Museus & Cultura, Marcas & Eventos, Educação & Pesquisa

3. **Salvar**

4. **Testar:** Verificar se o texto mudou no site

---

## 🚨 IMPORTANTE: MENSAGENS DE AVISO

Quando você ver no console:

```
⚠️ Usando projetos estáticos (fallback) - Preencher no backoffice!
```

**Significa:**
- O backoffice está vazio ou não tem conteúdo para aquela seção
- O site está funcionando com fallback (conteúdo padrão)
- **AÇÃO:** Preencher conteúdo no backoffice

**NÃO é um erro!** É apenas um aviso de que pode melhorar.

---

## 🎯 ESTRATÉGIA DE MIGRAÇÃO AOS POUCOS

### **Semana 1: Projetos**
- ✅ Adicionar 1-2 projetos reais no backoffice
- ✅ Verificar se aparecem no site
- ✅ Testar imagens/vídeos

### **Semana 2: Serviços**
- ✅ Adicionar os 6 serviços no backoffice
- ✅ Verificar se aparecem no site
- ✅ Ajustar descrições

### **Semana 3: Conteúdo da Home**
- ✅ Adicionar hero slogan/subtitle
- ✅ Adicionar pillars
- ✅ Verificar personalização IA

### **Sem Pressa!**
Cada vez que você adiciona conteúdo no backoffice:
1. Site automaticamente pega do backoffice
2. Se backoffice falhar → volta pro fallback
3. **NUNCA QUEBRA!**

---

## 📊 MONITORAMENTO

### **Como saber se backoffice está sendo usado:**

1. **Abrir F12 → Console**
2. **Recarregar página**
3. **Verificar mensagens:**
   - `✅ Usando ... do backoffice` → **ÓTIMO!**
   - `⚠️ Usando ... estáticos` → **OK, preencher backoffice**
   - `❌ Erro ao buscar` → **Backoffice offline**

---

## 🔧 SE BACKOFFICE FALHAR

**O site continua funcionando normalmente!**

- Home mostra: Instalação Imersiva + 6 serviços padrão
- Soluções mostra: 6 serviços padrão  
- Projetos mostra: 3 projetos exemplo

**Sem pânico!** É exatamente para isso que existem os fallbacks! ✅

---

## 📝 CHECKLIST DE MIGRAÇÃO

- [ ] Deploy feito (backoffice reativado)
- [ ] Console mostra mensagens corretas
- [ ] Site funciona com e sem backoffice
- [ ] Adicionar primeiro projeto no backoffice
- [ ] Verificar se projeto aparece no site
- [ ] Adicionar primeiro serviço no backoffice
- [ ] Verificar se serviço aparece no site
- [ ] Migrar conteúdo aos poucos (sem pressa!)

---

## 🎯 OBJETIVO ALCANÇADO

✅ **Site nunca quebra** (fallbacks fortes)  
✅ **Backoffice opcional** (não obrigatório)  
✅ **Migração gradual** (sem stress)  
✅ **Monitoramento fácil** (console logs)

---

**Agora você pode popular o backoffice aos poucos, sem medo de quebrar o site!** 🚀

