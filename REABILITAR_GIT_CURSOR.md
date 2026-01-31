# 🔄 REABILITAR GIT NO CURSOR

**IMPORTANTE:** Após fazer o deploy, reabilite o Git no Cursor!

---

## ✅ COMO REABILITAR

### **Opção 1: Via Interface**
1. No Cursor: `Ctrl+Shift+P`
2. Digite: "Preferences: Open Settings (JSON)"
3. Remova ou comente as linhas:
   ```json
   // "git.enabled": false,
   // "git.autoRefresh": false,
   // "git.autofetch": false,
   // "git.decorations.enabled": false,
   // "git.enableSmartCommit": false,
   // "git.confirmSync": false,
   // "scm.diffDecorations": "none"
   ```

### **Opção 2: Editar Arquivo Diretamente**
1. Abra: `.vscode/settings.json`
2. Remova as linhas de desabilitação do Git
3. Deixe apenas:
   ```json
   {
       "git.detectWorktrees": false
   }
   ```

---

## ⚠️ NOTA

Essas configurações foram adicionadas **temporariamente** para permitir que o script de deploy funcione sem conflitos com o Git do Cursor.

**Após o deploy bem-sucedido, reabilite o Git para ter todas as funcionalidades de volta!**
