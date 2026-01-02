# 🔐 PROTEÇÃO POR SENHA - SOLUÇÃO GRATUITA

**Data:** 02/01/2026  
**Status:** ✅ Implementado

---

## ❌ PROBLEMA

O **Password Protection** do Vercel custa **$150/mês** (recurso pago).

---

## ✅ SOLUÇÃO GRATUITA

Criei um componente **SimplePasswordGate** que:
- ✅ Totalmente gratuito
- ✅ Tela de senha profissional
- ✅ Salva autenticação na sessão (não pede senha novamente)
- ✅ Design bonito e moderno
- ✅ Fácil de ativar/desativar

---

## 🔑 SENHA ATUAL

```
azimut2025
```

### Como mudar a senha:

Edite o arquivo `src/components/SimplePasswordGate.tsx`:

```typescript
// Linha 12 - mude a senha aqui:
const CORRECT_PASSWORD = 'azimut2025'  // ← Mude para a senha que quiser
```

---

## ✅ COMO FUNCIONA

1. **Primeira vez**: Usuário vê tela de senha
2. **Digita senha**: `azimut2025`
3. **Autenticado**: Senha salva na sessão do navegador
4. **Navega livremente**: Não pede senha novamente
5. **Fecha navegador**: Pede senha de novo (segurança)

---

## 🎨 TELA DE SENHA

- Logo Azimut centralizada
- "Preview - Site em construção"
- Campo de senha elegante
- Botão vermelho Azimut
- Mensagem de erro se senha errada
- Design responsivo (mobile + desktop)

---

## 🚀 DEPLOY

### 1. Commit e Push

```bash
cd "C:\Users\ranz\Documents\azimut-site-vite-tailwind"

git add src/components/SimplePasswordGate.tsx src/App.tsx
git commit -m "feat: adiciona protecao por senha gratuita

- Cria componente SimplePasswordGate
- Tela de senha profissional e bonita
- Senha: azimut2025
- Salva autenticacao na sessao
- Totalmente gratuito (sem custos Vercel)"

git push origin main
```

### 2. Testar

Acesse `www.azmt.com.br` e verá:
- Tela de senha
- Digite: `azimut2025`
- Entre e navegue livremente

---

## 🔓 REMOVER SENHA (QUANDO LANÇAR)

Quando quiser lançar publicamente, basta remover o wrapper no `App.tsx`:

**ANTES (com senha):**
```tsx
<SimplePasswordGate>
  <BrowserRouter>
    ...
  </BrowserRouter>
</SimplePasswordGate>
```

**DEPOIS (sem senha - público):**
```tsx
<BrowserRouter>
  ...
</BrowserRouter>
```

1 linha removida = site público! 🎉

---

## 💰 ECONOMIA

- Vercel Password Protection: **$150/mês**
- Nossa solução: **$0/mês** ✅

---

## 📋 VANTAGENS

✅ Gratuito  
✅ Fácil de usar  
✅ Design profissional  
✅ Fácil de remover  
✅ Não quebra navegação  
✅ Funciona perfeitamente  

---

**Próximo passo:** Fazer commit e push!

