# 🔍 Problema: Página Experience Preview Vazia

## ❌ PROBLEMA IDENTIFICADO

A página `/pt/experience-preview` está aparecendo **vazia** para o usuário.

**URL:** `https://azmt.com.br/pt/experience-preview`

---

## 🔍 POSSÍVEIS CAUSAS

### **1. Erro de JavaScript no Console**

O componente pode estar quebrando silenciosamente. Verifique:

1. Abra o DevTools (F12)
2. Vá na aba "Console"
3. Procure por erros em vermelho
4. Procure por erros relacionados a:
   - `WalletConnect`
   - `ExperiencePreview`
   - `window.ethereum`

### **2. Componente Não Renderizando**

O componente `ExperiencePreview` pode não estar renderizando devido a:
- Erro de importação
- Erro de sintaxe
- Dependência faltando

### **3. CSS Escondendo Conteúdo**

O conteúdo pode estar renderizando mas invisível devido a:
- `display: none`
- `opacity: 0`
- `height: 0`
- `z-index` incorreto

---

## ✅ SOLUÇÕES APLICADAS

### **1. Link Adicionado no Menu "PROJETOS"**

Adicionei um link no dropdown do menu **"PROJETOS"**:

```
Menu: PROJETOS
  ├── Todos os Projetos
  ├── Museus & Cultura
  ├── Festivais
  ├── Marcas & Eventos
  ├── VR & XR
  └── 🎁 Degustação Web3  ← NOVO!
```

**Onde aparece:**
- Menu superior (desktop)
- Menu mobile
- Dropdown ao passar o mouse em "PROJETOS"

---

## 🎯 COMO O USUÁRIO CHEGA NA PÁGINA

### **Opção 1: Via Menu Superior**

1. Usuário acessa: `https://azmt.com.br`
2. Passa o mouse em **"PROJETOS"** (menu superior)
3. Vê dropdown com opções
4. Clica em **"🎁 Degustação Web3"**
5. Vai para: `/pt/experience-preview`

### **Opção 2: Via URL Direta**

1. Usuário digita: `https://azmt.com.br/pt/experience-preview`
2. Acessa diretamente

### **Opção 3: Via Link na Home (Futuro)**

Pode adicionar um card/banner na home apontando para esta página.

---

## 🔧 VERIFICAÇÕES NECESSÁRIAS

### **1. Verificar Console do Navegador**

```javascript
// Abra DevTools (F12) → Console
// Procure por:
- "Error"
- "Failed to"
- "Cannot read"
- "undefined"
```

### **2. Verificar Network Tab**

```javascript
// Abra DevTools (F12) → Network
// Recarregue a página
// Verifique se há requisições falhando (vermelho)
```

### **3. Verificar se Componente Renderiza**

Adicione um `console.log` no componente:

```typescript
export function ExperiencePreview({ lang }: ExperiencePreviewProps) {
  console.log('ExperiencePreview renderizando', lang)
  // ... resto do código
}
```

---

## 🛠️ CORREÇÕES SUGERIDAS

### **1. Adicionar Error Boundary**

Envolver o componente em um Error Boundary para capturar erros:

```typescript
<ErrorBoundary>
  <ExperiencePreview lang={lang} />
</ErrorBoundary>
```

### **2. Adicionar Loading State**

Mostrar um loading enquanto carrega:

```typescript
if (loading) {
  return <LoadingSpinner />
}
```

### **3. Adicionar Fallback**

Se houver erro, mostrar mensagem amigável:

```typescript
if (error) {
  return <ErrorMessage message="Erro ao carregar página" />
}
```

---

## 📍 ONDE ADICIONAR LINK NA HOME

### **Opção 1: Hero Section**

Adicionar um botão secundário no hero:

```typescript
<Link to="/experience-preview">
  🎁 Experimente VR, NFT e Web3
</Link>
```

### **Opção 2: Seção Dedicada**

Criar uma seção específica na home:

```typescript
<section>
  <h2>🎁 Degustação: VR, NFT e Web3</h2>
  <p>Veja o que podemos fazer por você</p>
  <Link to="/experience-preview">
    Explorar Experiências →
  </Link>
</section>
```

### **Opção 3: Card nos Projetos**

Adicionar um card especial na seção de projetos:

```typescript
<ProjectCard
  title="🎁 Degustação Web3"
  description="VR, NFT, Web3 e Experiências Imersivas"
  link="/experience-preview"
/>
```

---

## 🚀 PRÓXIMOS PASSOS

1. ✅ **Link adicionado no menu "PROJETOS"**
2. ⏳ **Verificar console do navegador para erros**
3. ⏳ **Testar página localmente**
4. ⏳ **Adicionar link na home (opcional)**
5. ⏳ **Adicionar Error Boundary (recomendado)**

---

## 📝 CHECKLIST DE DEBUG

- [ ] Abrir DevTools (F12)
- [ ] Verificar Console (erros em vermelho)
- [ ] Verificar Network (requisições falhando)
- [ ] Verificar Elements (HTML renderizado)
- [ ] Testar em modo anônimo (limpar cache)
- [ ] Testar em outro navegador
- [ ] Verificar se JavaScript está habilitado

---

## 🔗 LINKS ÚTEIS

- **Página:** `https://azmt.com.br/pt/experience-preview`
- **Componente:** `src/components/ExperiencePreview.tsx`
- **Página Wrapper:** `src/pages/ExperiencePreview.tsx`
- **Rota:** `src/App.tsx` (linha 433, 609)

---

**Status:** Link adicionado no menu. Aguardando verificação de erros no console.
