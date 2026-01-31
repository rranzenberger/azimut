# 🔄 COMANDOS PARA REESTABELECER O SERVIDOR LOCALHOST

## Sequência de Comandos (Execute um por vez):

### 1. **Encerrar processos Node existentes:**
```powershell
Get-Process | Where-Object {$_.ProcessName -eq "node"} | Stop-Process -Force
```

### 2. **Limpar cache do esbuild:**
```powershell
Remove-Item -Path "$env:TEMP\esbuild-*" -Recurse -Force -ErrorAction SilentlyContinue
```

### 3. **Limpar cache do npm:**
```powershell
npm cache clean --force
```

### 4. **Navegar até a pasta do projeto:**
```powershell
cd c:\Users\ranz\Documents\azimut-site-vite-tailwind
```

**⚠️ IMPORTANTE:** Certifique-se de que o prompt mostra o diretório correto antes de continuar!

### 5. **Verificar se está no diretório correto:**
```powershell
Get-Location
```
Deve mostrar: `C:\Users\ranz\Documents\azimut-site-vite-tailwind`

### 6. **Iniciar o servidor:**
```powershell
npm run dev
```

---

## ⚠️ SE AINDA DER ERRO EPERM:

### **Solução: Executar como Administrador**

1. Feche o terminal atual
2. Clique com botão direito no **PowerShell** ou **CMD**
3. Selecione **"Executar como administrador"**
4. Execute os comandos acima novamente

---

## 📝 COMANDOS EM UMA ÚNICA LINHA (Copie e cole tudo):

```powershell
Get-Process | Where-Object {$_.ProcessName -eq "node"} | Stop-Process -Force; Remove-Item -Path "$env:TEMP\esbuild-*" -Recurse -Force -ErrorAction SilentlyContinue; npm cache clean --force; cd c:\Users\ranz\Documents\azimut-site-vite-tailwind; Get-Location; npm run dev
```

**OU use o script automático:**
- Clique com botão direito em `INICIAR_SERVIDOR.ps1`
- Selecione "Executar com PowerShell"

---

## 🌐 URL DO SERVIDOR:

Após iniciar, acesse: **http://localhost:5173**

---

## ✅ VERIFICAR SE ESTÁ RODANDO:

Abra outro terminal e execute:
```powershell
netstat -ano | findstr :5173
```

Se aparecer algo, o servidor está rodando! 🎉
