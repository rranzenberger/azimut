# ✅ CHECKLIST DE TESTES - SISTEMA PREMIUM DE IDIOMAS

**Data**: 3 de Janeiro de 2026  
**Status**: Pronto para testar

---

## 🎯 **O QUE FOI IMPLEMENTADO:**

### ✅ **1. Sistema Premium de Rotas**
- URLs com prefixo de idioma: `/pt/studio`, `/en/work`
- Backwards compatibility: `/studio` redireciona para `/:lang/studio`

### ✅ **2. Correções de Bugs**
- Duplicação de URLs corrigida (`/fr/fr/...` → `/fr/`)
- Dropdown não fecha mais ao mover mouse (delay 200ms)
- Links com `#` fazem scroll suave

### ✅ **3. Academy com 4 Páginas**
- `/academy` → Página principal
- `/academy/research` → Research & Innovation
- `/academy/courses` → Courses & Workshops
- `/academy/corporate` → Corporate Training

---

## 🧪 **TESTES OBRIGATÓRIOS:**

### **TESTE 1: Redirecionamento Inicial** ⏳
1. Acesse `http://localhost:1753/`
2. ✅ Deve redirecionar para `/pt` ou `/en` (idioma detectado)

### **TESTE 2: Troca de Idiomas** ⏳
1. Na home, clique na bandeira 🇨🇦 **EN**
2. ✅ URL deve mudar para `/en`
3. Clique na bandeira 🇧🇷 **PT**
4. ✅ URL deve mudar para `/pt`
5. Clique em **FR** e depois **EN** novamente
6. ✅ **NÃO DEVE DUPLICAR** (`/en/fr/en` ❌) → deve ficar `/en` ✅

### **TESTE 3: Dropdown "SOLUTIONS"** ⏳
1. Passe o mouse em **"SOLUTIONS"**
2. ✅ Dropdown abre
3. Mova o mouse para **"Cinema & Audiovisual"**
4. ✅ Dropdown **permanece aberto** (não fecha)
5. Clique em **"Cinema & Audiovisual"**
6. ✅ Vai para `/en/what` e faz **scroll** para a seção Cinema
7. ✅ Item fica **destacado em vermelho**

### **TESTE 4: Dropdown "WORK"** ⏳
1. Passe o mouse em **"WORK"**
2. ✅ Dropdown abre
3. Clique em **"Museums & Culture"**
4. ✅ Vai para `/en/work?type=museum`
5. ✅ Mostra apenas projetos de museus

### **TESTE 5: Dropdown "STUDIO"** ⏳
1. Passe o mouse em **"STUDIO"**
2. ✅ Dropdown abre
3. Clique em **"What Makes Us Unique"**
4. ✅ Vai para `/en/studio` e faz **scroll** para a seção
5. ✅ Item fica **destacado em vermelho**

### **TESTE 6: Dropdown "ACADEMY"** ⏳
1. Passe o mouse em **"ACADEMY"**
2. ✅ Dropdown abre e mostra 4 opções
3. Clique em **"RESEARCH & INNOVATION"**
4. ✅ Vai para `/en/academy/research`
5. Clique em **"COURSES & WORKSHOPS"**
6. ✅ Vai para `/en/academy/courses`
7. Clique em **"CORPORATE TRAINING"**
8. ✅ Vai para `/en/academy/corporate`
9. Clique no botão **"ACADEMY"** (sem dropdown)
10. ✅ Vai para `/en/academy` (página principal)

### **TESTE 7: Navegação Interna (Academy)** ⏳
1. Dentro de `/en/academy`, veja os botões no topo
2. Clique em **"Research"**
3. ✅ Vai para `/en/academy/research`
4. Clique em **"Courses"**
5. ✅ Vai para `/en/academy/courses`
6. ✅ Botão ativo fica **destacado em vermelho**

### **TESTE 8: Troca de Idioma em Página Interna** ⏳
1. Vá para `/en/studio`
2. Clique na bandeira 🇧🇷 **PT**
3. ✅ Deve ir para `/pt/studio` (mantém a página, muda idioma)
4. Vá para `/pt/academy/courses`
5. Clique em **FR**
6. ✅ Deve ir para `/fr/academy/courses`

### **TESTE 9: Backwards Compatibility** ⏳
1. Digite manualmente na URL: `localhost:1753/studio`
2. ✅ Deve redirecionar para `/:lang/studio`
3. Digite: `localhost:1753/academy/research`
4. ✅ Deve redirecionar para `/:lang/academy/research`

### **TESTE 10: Projetos** ⏳
1. Vá para `/en/work`
2. Clique em um projeto
3. ✅ Vai para `/en/project/nome-do-projeto`
4. Troque para PT
5. ✅ Vai para `/pt/project/nome-do-projeto`

---

## 🐛 **PROBLEMAS CONHECIDOS (Pendentes):**

### ⚠️ **1. Texto em Português na Home**
- Hero text aparece em português mesmo em outros idiomas
- **Causa**: Backoffice não tem conteúdo em EN/FR/ES
- **Solução**: Popular backoffice ou criar fallback em `i18n.ts`

---

## 📊 **STATUS ATUAL:**

| Funcionalidade | Status | Build |
|----------------|--------|-------|
| Rotas com idioma | ✅ Implementado | ✅ Passou |
| Duplicação de URLs | ✅ Corrigido | ✅ Passou |
| Dropdown hover | ✅ Corrigido | ✅ Passou |
| Scroll em âncoras | ✅ Corrigido | ✅ Passou |
| Academy 4 páginas | ✅ Implementado | ✅ Passou |
| Texto backoffice | ⏳ Pendente | - |

---

## 🚀 **COMO TESTAR:**

### **1. Iniciar dev server:**
```bash
cd C:\Users\ranz\Documents\azimut-site-vite-tailwind
npm run dev
```

### **2. Abrir navegador:**
```
http://localhost:1753/
```

### **3. Seguir os testes acima** ☝️

---

## ✅ **QUANDO TUDO PASSAR:**

### **Deploy:**
```bash
git add .
git commit -m "feat: sistema premium de rotas com idioma (/pt, /en, /fr, /es) + Academy 4 páginas + correções dropdown"
git push origin main
```

---

**QUER QUE EU INICIE O DEV SERVER PARA TESTAR?** 🚀

