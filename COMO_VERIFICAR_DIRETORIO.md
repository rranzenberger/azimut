# 📁 COMO VERIFICAR E CORRIGIR O DIRETÓRIO

**Sempre verifique se estamos no diretório correto antes de trabalhar!**

---

## ✅ **VERIFICAÇÃO RÁPIDA**

### **Opção 1: Script PowerShell (Recomendado)**
```powershell
powershell -ExecutionPolicy Bypass -File "VERIFICAR_DIRETORIO.ps1"
```

### **Opção 2: Script Batch**
```cmd
VERIFICAR_DIRETORIO.bat
```

### **Opção 3: Manual (Terminal)**
```powershell
# Verificar diretório atual
Get-Location

# Se não estiver correto, navegar:
cd "C:\Users\ranz\Documents\azimut-site-vite-tailwind"

# Verificar arquivos essenciais
Test-Path "package.json"
Test-Path "src"
Test-Path "azimut-cms"
```

---

## 📋 **DIRETÓRIO CORRETO**

```
C:\Users\ranz\Documents\azimut-site-vite-tailwind
```

---

## ✅ **ARQUIVOS ESSENCIAIS QUE DEVEM EXISTIR**

- ✅ `package.json`
- ✅ `src/`
- ✅ `azimut-cms/`
- ✅ `public/`
- ✅ `.cursorrules`

---

## 🔄 **SE O DIRETÓRIO ESTIVER ERRADO**

O script **automaticamente** navega para o diretório correto!

Se precisar fazer manualmente:
```powershell
Set-Location "C:\Users\ranz\Documents\azimut-site-vite-tailwind"
```

---

## 📝 **NOTAS**

- ✅ O script verifica automaticamente
- ✅ Se estiver errado, corrige automaticamente
- ✅ Verifica todos os arquivos essenciais
- ✅ Mostra status claro (OK/ERRO)

---

**Status:** ✅ **FUNCIONANDO**  
**Última verificação:** ✅ **TUDO OK!**
