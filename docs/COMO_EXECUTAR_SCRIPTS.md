# 🚀 Como Executar os Scripts de SEO

## 📍 ONDE EXECUTAR

### **1. Abrir PowerShell**

**Opção A: Pelo Cursor/VS Code**
1. Pressione `Ctrl + '` (aspas simples) para abrir o terminal
2. Ou vá em: **Terminal** → **New Terminal**
3. Certifique-se de que está em PowerShell (não CMD)

**Opção B: Pelo Windows**
1. Pressione `Windows + X`
2. Escolha **"Windows PowerShell"** ou **"Terminal"**
3. Navegue até a pasta do projeto:
   ```powershell
   cd c:\Users\ranz\Documents\azimut-site-vite-tailwind
   ```

---

## 🎯 COMO EXECUTAR

### **Script Principal (Recomendado):**

```powershell
.\scripts\automatizar-seo.ps1 -All
```

### **Ou apenas testar redirects:**

```powershell
.\scripts\test-redirects.ps1
```

### **Ou apenas verificar URLs:**

```powershell
.\scripts\verificar-google-search-console.ps1
```

---

## ⚠️ SE DER ERRO DE PERMISSÃO

Se aparecer erro como:
```
execution of scripts is disabled on this system
```

**Solução:**

1. Abra PowerShell como **Administrador** (clique com botão direito → "Executar como administrador")

2. Execute este comando:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

3. Digite `S` (Sim) quando perguntar

4. Pronto! Agora pode executar os scripts normalmente.

---

## 📝 PASSO A PASSO COMPLETO

### **1. Abrir Terminal no Cursor:**
- Pressione `Ctrl + '` (aspas simples)
- Ou: **Terminal** → **New Terminal**

### **2. Navegar até a pasta (se necessário):**
```powershell
cd c:\Users\ranz\Documents\azimut-site-vite-tailwind
```

### **3. Executar o script:**
```powershell
.\scripts\automatizar-seo.ps1 -All
```

### **4. Ver o resultado:**
O script vai mostrar:
- ✅ Testes de redirects
- ✅ Verificação de URLs
- ✅ Relatório final
- ✅ Próximos passos

---

## 🎯 EXEMPLO PRÁTICO

```
PS C:\Users\ranz\Documents\azimut-site-vite-tailwind> .\scripts\automatizar-seo.ps1 -All

===========================================
AUTOMACAO SEO - AZIMUT
===========================================

1. TESTANDO REDIRECTS...

  OK Redirects: 12/12

2. VERIFICANDO URLs...

  OK - https://azmt.com.br/pt
  OK - https://azmt.com.br/pt/work
  OK - https://azmt.com.br/pt/academy
  OK - https://azmt.com.br/pt/contact

  OK URLs: 4/4

===========================================
RELATORIO FINAL
===========================================

Data/Hora: 2026-01-27 11:30:00

Redirects:
  OK: 12/12

URLs:
  OK: 4/4

===========================================
PROXIMOS PASSOS
===========================================

TUDO FUNCIONANDO!

1. Aguarde 24-48h para o Google re-rastrear
2. Acesse: https://search.google.com/search-console
3. Va em 'Inspecao de URL'
4. Teste: https://azmt.com.br/pt
5. Se nao houver erro, clique em 'Solicitar indexacao'
```

---

## 💡 DICAS

**Execute sempre:**
- ✅ Após deploy no Vercel
- ✅ Quando quiser verificar status
- ✅ Semanalmente para monitorar

**Localização dos scripts:**
```
azimut-site-vite-tailwind/
└── scripts/
    ├── automatizar-seo.ps1          ← Script principal
    ├── test-redirects.ps1            ← Testa redirects
    └── verificar-google-search-console.ps1  ← Verifica URLs
```

---

## 🚀 PRONTO!

Agora você sabe onde e como executar os scripts! 🎉

**Comando rápido:**
```powershell
.\scripts\automatizar-seo.ps1 -All
```
