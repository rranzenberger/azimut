# 🚀 Como Executar os Scripts de SEO

## 📍 ONDE RODAR OS SCRIPTS

### **Opção 1: Duplo Clique (Mais Fácil)** ⭐

1. Abra o **Explorador de Arquivos** (Windows + E)
2. Navegue até: `C:\Users\ranz\Documents\azimut-site-vite-tailwind`
3. **Duplo clique** no arquivo: `EXECUTAR_SCRIPTS_SEO.ps1`
4. Se aparecer aviso de segurança, clique em "Executar" ou "Permitir"

**Pronto!** O script vai executar automaticamente.

---

### **Opção 2: PowerShell (Mais Controle)**

1. Pressione **Windows + X**
2. Escolha **"Windows PowerShell"** ou **"Terminal"**
3. Digite os comandos abaixo:

```powershell
# Ir para a pasta do projeto
cd C:\Users\ranz\Documents\azimut-site-vite-tailwind

# Executar script completo
.\scripts\automatizar-seo.ps1 -All
```

---

### **Opção 3: Terminal do Cursor/VS Code**

1. No Cursor, pressione **Ctrl + `** (backtick) para abrir o terminal
2. Digite:

```powershell
.\scripts\automatizar-seo.ps1 -All
```

---

## 📋 SCRIPTS DISPONÍVEIS

### **1. Script Completo (Recomendado)**
```powershell
.\scripts\automatizar-seo.ps1 -All
```
**Faz tudo:** Testa redirects + Verifica URLs + Gera relatório

---

### **2. Apenas Redirects**
```powershell
.\scripts\test-redirects.ps1
```
**Faz:** Testa apenas os redirects

---

### **3. Apenas URLs**
```powershell
.\scripts\verificar-google-search-console.ps1
```
**Faz:** Lista URLs e instruções para Google Search Console

---

## ⚠️ SE DER ERRO DE PERMISSÃO

Se aparecer erro de "execução de scripts está desabilitada":

1. Abra PowerShell como **Administrador** (clique direito → "Executar como administrador")
2. Digite:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
3. Pressione **Y** para confirmar
4. Tente executar o script novamente

---

## ✅ EXEMPLO DE SAÍDA

Quando executar, você verá algo assim:

```
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

## 🎯 RESUMO RÁPIDO

**Mais fácil:**
- Duplo clique em `EXECUTAR_SCRIPTS_SEO.ps1`

**Mais controle:**
- PowerShell → `cd C:\Users\ranz\Documents\azimut-site-vite-tailwind`
- PowerShell → `.\scripts\automatizar-seo.ps1 -All`

---

## 💡 DICA

Execute sempre após:
- ✅ Deploy no Vercel
- ✅ Mudanças em redirects
- ✅ Antes de solicitar indexação no Google

---

## 🚀 PRONTO!

Agora você sabe como executar os scripts! 🎉
