# 🔍 DIAGNÓSTICO: FORMULÁRIO BRANCO

**Data:** 09 Janeiro 2026  
**Problema:** Campos do formulário aparecem brancos no tema claro  
**Esperado:** Campos com fundo levemente cinza (rgba(0,0,0,0.06))

---

## 🎯 COMMITS APLICADOS:

✅ `d6874b1` - "fix: restaurar design premium do formulario com input-adaptive"  
✅ `92509aa` - "fix: corrigir 3 campos restantes para usar input-adaptive"

---

## ✅ VERIFICAÇÕES JÁ FEITAS:

### **1. Classes CSS no SmartContactForm.tsx:**
```tsx
// TODOS os campos agora têm:
className="input-adaptive w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-azimut-red transition-all"
```

**Status:** ✅ CORRETO

### **2. Estilos CSS no index.css:**
```css
/* Tema escuro */
.input-adaptive {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(201, 35, 55, 0.3);
  color: #ffffff;
}

/* Tema claro */
[data-theme="light"] .input-adaptive {
  background: rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.2);
  color: #1a1a1a;
}
```

**Status:** ✅ CORRETO

---

## 🔍 POSSÍVEIS CAUSAS:

### **CAUSA 1: Autocomplete do Chrome**
O Chrome força `background-color: rgb(232, 240, 254)` (azul claro) em campos com autocomplete.

**Solução:** Adicionar `-webkit-autofill` override.

### **CAUSA 2: Tailwind CSS sobrescrevendo**
Classes Tailwind podem ter especificidade maior que `.input-adaptive`.

**Solução:** Usar `!important` ou aumentar especificidade.

### **CAUSA 3: Tema não detectado**
O atributo `data-theme="light"` pode não estar sendo aplicado no `<html>` ou `<body>`.

**Solução:** Verificar `ThemeProvider` e garantir que aplica o atributo.

### **CAUSA 4: Cache do navegador**
CSS antigo ainda em cache.

**Solução:** Hard reload (Ctrl+F5) ou aba anônima.

---

## 🔧 PRÓXIMAS AÇÕES:

1. ✅ Adicionar override para `-webkit-autofill`
2. ✅ Verificar `data-theme` no HTML
3. ✅ Testar em aba anônima
4. ✅ Fazer redeploy na Vercel
5. ✅ Limpar cache do navegador

---

## 📋 TESTES:

### **Teste 1: Inspecionar elemento**
1. Clicar com botão direito no campo
2. "Inspecionar elemento"
3. Verificar CSS aplicado
4. Procurar por:
   - `.input-adaptive` está presente?
   - `data-theme="light"` no `<html>`?
   - `-webkit-autofill` sobrescrevendo?

### **Teste 2: Console do navegador**
```javascript
// Verificar tema
document.documentElement.getAttribute('data-theme')
// Deve retornar "light" ou "dark"

// Verificar classes
document.querySelector('input[name="name"]').classList
// Deve conter "input-adaptive"
```

### **Teste 3: Computado**
1. Inspecionar campo
2. Aba "Computed"
3. Procurar `background-color`
4. Ver qual regra está vencendo

---

## 🎯 PRÓXIMO PASSO:

Criar CSS de override definitivo para forçar os estilos corretos!
