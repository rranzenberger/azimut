# 📝 Como Editar o Slogan no Backoffice

## 🎯 Onde Editar

### **Caminho Completo:**

1. **Acesse:** `backoffice.azmt.com.br/admin/pages`
2. **Clique no card** da página "Home"
3. **Você será redirecionado para:** `/admin/pages/home/edit`
4. **Role até a seção** "Slogan do Hero"
5. **Edite os 4 campos:**
   - `heroSloganPt` (Português) 🇧🇷
   - `heroSloganEn` (English) 🇺🇸
   - `heroSloganEs` (Español) 🇪🇸
   - `heroSloganFr` (Français) 🇫🇷
6. **Clique em "Salvar Alterações"**

---

## ⚠️ Problema: Sidebar Desaparece

Se a sidebar desaparece ao navegar, pode ser:

### **Solução 1: Limpar Cache**
- Pressione `Ctrl + F5` (Windows) ou `Cmd + Shift + R` (Mac)
- Ou limpe o cache do navegador manualmente

### **Solução 2: Verificar Deploy**
- Confirme se o deploy foi aplicado na Vercel
- Verifique se o link "Páginas" aparece no menu (não mais "em breve")

### **Solução 3: Verificar Console**
- Abra o Console do navegador (F12)
- Procure por erros JavaScript

---

## 🔍 Estrutura de Arquivos

```
azimut-cms/app/admin/
├── layout.tsx          # Layout com sidebar (sempre visível)
├── pages/
│   ├── page.tsx        # Listagem de páginas
│   └── [slug]/
│       └── edit/
│           └── page.tsx  # Página de edição (com campos heroSlogan)
```

---

## ✅ Verificação

Se você vê:
- ✅ Link "Páginas" no menu lateral (não "em breve")
- ✅ Página `/admin/pages` lista a página "Home"
- ✅ Ao clicar em "Home", vai para `/admin/pages/home/edit`
- ✅ Seção "Slogan do Hero" com 4 campos

**Então está funcionando corretamente!**

---

## 🐛 Se Não Funcionar

1. **Verifique o deploy:**
   - Acesse Vercel Dashboard
   - Confirme que o último deploy foi aplicado
   - Verifique se há erros no build

2. **Verifique o banco:**
   - As colunas `heroSloganPt/En/Es/Fr` existem na tabela `Page`?
   - Execute: `npx prisma migrate deploy` (se necessário)

3. **Verifique o código:**
   - O arquivo `app/admin/layout.tsx` tem o link "Páginas"?
   - O arquivo `app/admin/pages/page.tsx` existe?

---

## 📞 Suporte

Se o problema persistir, verifique:
- Console do navegador (F12)
- Logs do Vercel
- Status do banco de dados

