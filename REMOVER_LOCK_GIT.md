# 🔓 COMO REMOVER LOCK DO GIT

**Problema:** `fatal: Unable to create '.git/index.lock': Permission denied`

---

## 🎯 SOLUÇÃO RÁPIDA

### **MÉTODO 1: Fechar Cursor e Remover Lock (Recomendado)**

1. **Fechar o Cursor completamente**
   - Salvar todos os arquivos
   - Fechar todas as janelas do Cursor
   - Verificar no Gerenciador de Tarefas se não há processos do Cursor rodando

2. **Abrir PowerShell no diretório do projeto:**
   ```powershell
   cd C:\Users\ranz\Documents\azimut-site-vite-tailwind
   ```

3. **Remover o lock:**
   ```powershell
   Remove-Item -Force ".git\index.lock" -ErrorAction SilentlyContinue
   ```

4. **Verificar se foi removido:**
   ```powershell
   if (Test-Path ".git\index.lock") {
       Write-Host "Lock ainda existe!" -ForegroundColor Red
   } else {
       Write-Host "Lock removido com sucesso!" -ForegroundColor Green
   }
   ```

5. **Testar Git:**
   ```powershell
   git status
   ```

---

### **MÉTODO 2: Script Automático**

Execute este script PowerShell:

```powershell
# Remover lock do Git
$lockPath = ".git\index.lock"

if (Test-Path $lockPath) {
    Write-Host "Removendo lock do Git..." -ForegroundColor Yellow
    
    # Tentar remover
    Remove-Item -Force $lockPath -ErrorAction SilentlyContinue
    
    Start-Sleep -Seconds 1
    
    # Verificar se foi removido
    if (Test-Path $lockPath) {
        Write-Host "ERRO: Não foi possível remover o lock." -ForegroundColor Red
        Write-Host "Solução:" -ForegroundColor Yellow
        Write-Host "1. Feche o Cursor completamente" -ForegroundColor White
        Write-Host "2. Verifique no Gerenciador de Tarefas se há processos do Cursor" -ForegroundColor White
        Write-Host "3. Execute este script novamente" -ForegroundColor White
    } else {
        Write-Host "SUCESSO: Lock removido!" -ForegroundColor Green
        Write-Host "Agora você pode usar git normalmente." -ForegroundColor Cyan
    }
} else {
    Write-Host "Nenhum lock encontrado. Git está livre!" -ForegroundColor Green
}
```

---

### **MÉTODO 3: Via Gerenciador de Tarefas (Se não funcionar)**

1. **Abrir Gerenciador de Tarefas:**
   - Pressionar `Ctrl + Shift + Esc`

2. **Procurar processos do Cursor:**
   - Procurar por "Cursor" ou "Code"
   - Finalizar todos os processos relacionados

3. **Remover lock:**
   ```powershell
   Remove-Item -Force ".git\index.lock"
   ```

---

## 🔍 VERIFICAR SE FUNCIONOU

Após remover o lock, teste:

```powershell
# Deve funcionar sem erros
git status
git add .
git commit -m "test"
```

---

## ⚠️ PREVENÇÃO

Para evitar locks no futuro:

1. **Sempre feche o Cursor antes de fazer git operations via terminal**
2. **Use o terminal integrado do Cursor** para operações Git (mais seguro)
3. **Evite múltiplas operações Git simultâneas**

---

## 🚀 DEPOIS DE REMOVER O LOCK

Agora você pode executar o script de deploy:

```powershell
.\DEPLOY_OPCOES_PREMIUM.ps1
```

Ou fazer manualmente:

```powershell
git add .
git commit -m "feat: Deploy opcoes premium"
git push origin main
```

---

**PRONTO! Agora o Git deve funcionar normalmente! 🎉**
