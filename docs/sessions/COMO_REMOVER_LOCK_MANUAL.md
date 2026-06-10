# 🔓 Como Remover Lock do Git Manualmente

## Método 1: PowerShell (Recomendado)

1. **Feche o Cursor completamente** (todos os processos)

2. **Abra PowerShell** no diretório do projeto:
   ```powershell
   cd "C:\Users\ranz\Documents\azimut-site-vite-tailwind"
   ```

3. **Execute o comando:**
   ```powershell
   Remove-Item .git/index.lock -Force
   ```

4. **Verifique se funcionou:**
   ```powershell
   git status
   ```
   Se não der erro, o lock foi removido!

---

## Método 2: Explorador do Windows

1. **Feche o Cursor completamente**

2. **Abra o Explorador** e navegue até:
   ```
   C:\Users\ranz\Documents\azimut-site-vite-tailwind\.git\
   ```

3. **Procure pelo arquivo:** `index.lock`

4. **Delete o arquivo** (Shift + Delete para deletar permanentemente)

---

## Método 3: Usando o Script

1. **Feche o Cursor**

2. **Execute no PowerShell:**
   ```powershell
   cd "C:\Users\ranz\Documents\azimut-site-vite-tailwind"
   .\REMOVER_LOCK_SIMPLES.ps1
   ```

---

## ⚠️ IMPORTANTE

- **SEMPRE feche o Cursor antes** de remover o lock
- O lock existe para evitar que duas operações Git rodem ao mesmo tempo
- Se o Cursor estiver aberto, ele vai recriar o lock imediatamente

---

## Depois de Remover o Lock

Execute o script de commit:
```powershell
.\COMMIT_CORRECOES_MENU.ps1
```

Ou manualmente:
```powershell
git add src/pages/AcademyNew.tsx src/components/AcademySubNav.tsx src/pages/Studio.tsx src/pages/WhatWeDo.tsx src/pages/Work.tsx
git commit -m "fix: Remove tarja vermelha submenu + centraliza menus secundarios"
git push origin main
```
