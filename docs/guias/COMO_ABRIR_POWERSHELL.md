# 💻 COMO ABRIR POWERSHELL E IR PARA A PASTA

**Guia passo a passo**

---

## ✅ MÉTODO 1: PowerShell Direto na Pasta (MAIS FÁCIL)

### **Passo 1: Abrir Windows Explorer**
1. Pressione `Windows + E` (abre o Explorer)
2. OU clique no ícone de pasta na barra de tarefas

### **Passo 2: Ir para a pasta do projeto**
1. Navegue até: `C:\Users\ranz\Documents\azimut-site-vite-tailwind`
2. OU cole este caminho na barra de endereço do Explorer

### **Passo 3: Abrir PowerShell aqui**
1. **Clique com botão direito** em qualquer espaço vazio da pasta
2. Selecione: **"Abrir no Terminal"** ou **"Open in Terminal"**
3. OU segure `Shift` e clique com botão direito → **"Abrir janela do PowerShell aqui"**

✅ **Pronto!** O PowerShell já estará na pasta correta!

---

## ✅ MÉTODO 2: PowerShell e Navegar Manualmente

### **Passo 1: Abrir PowerShell**
1. Pressione `Windows + X`
2. Selecione: **"Windows PowerShell"** ou **"Terminal"**
3. OU pressione `Windows + R`, digite `powershell` e Enter

### **Passo 2: Navegar até a pasta**
No PowerShell que abriu, digite:

```powershell
cd C:\Users\ranz\Documents\azimut-site-vite-tailwind
```

Pressione **Enter**

### **Passo 3: Verificar se está na pasta certa**
Digite:

```powershell
pwd
```

Deve mostrar: `C:\Users\ranz\Documents\azimut-site-vite-tailwind`

✅ **Pronto!** Agora você está na pasta correta!

---

## 🚀 DEPOIS DE ESTAR NA PASTA

### **Opção A: Executar Script .bat**
```powershell
.\DEPLOY_SIMPLES.bat
```

### **Opção B: Executar Script PowerShell**
```powershell
.\DEPLOY_PASSO_A_PASSO.ps1
```

### **Opção C: Comandos Git Diretos**
```powershell
git add src/components/SearchModal.tsx
git add src/components/Breadcrumbs.tsx
git add src/components/LoadingSkeleton.tsx
git add src/components/SmartContactForm.tsx
git add src/hooks/useLoadingSkeleton.ts
git add src/hooks/useSearch.ts
git add src/utils/formValidation.ts
git add azimut-cms/app/admin/team/
git add azimut-cms/app/admin/credentials/
git add azimut-cms/app/api/admin/team/
git add azimut-cms/app/api/admin/credentials/
git add azimut-cms/prisma/schema.prisma
git add azimut-cms/prisma/migrations/
git commit -m "feat: UX Premium (validacao, skeletons, busca) + Backoffice Team/Credentials completo"
git push
```

---

## 💡 DICA RÁPIDA

**Atalho mais rápido:**
1. Abra o Windows Explorer
2. Vá até a pasta: `C:\Users\ranz\Documents\azimut-site-vite-tailwind`
3. Na barra de endereço, **delete tudo** e digite: `powershell`
4. Pressione **Enter**
5. ✅ PowerShell abre direto na pasta!

---

## 🎯 RESUMO VISUAL

```
Windows Explorer
    ↓
C:\Users\ranz\Documents\azimut-site-vite-tailwind
    ↓
Botão Direito → "Abrir no Terminal"
    ↓
PowerShell aberto na pasta correta!
    ↓
Executar: .\DEPLOY_SIMPLES.bat
```

---

**Status:** 🟢 Pronto para usar!
