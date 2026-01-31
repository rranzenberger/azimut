# 🎨 AZIMUT DEPLOY APP - GUIA DE INSTALAÇÃO

## ✅ O QUE FOI CRIADO

Criei um **aplicativo visual com botões** para você fazer deploy com um clique!

### 📦 Arquivos criados:

1. **`AzimutDeployApp.ps1`** - Aplicativo principal (GUI)
2. **`AzimutDeployApp.vbs`** - Launcher (abre sem janela do PowerShell)

---

## 🚀 COMO INSTALAR

### OPÇÃO 1: Atalho na Área de Trabalho (Recomendado)

**1. Clique com botão direito no arquivo:**
```
AzimutDeployApp.vbs
```

**2. Escolha:** "Criar atalho"

**3. Arraste o atalho para a Área de Trabalho**

**4. Renomeie o atalho para:**
```
Azimut Deploy
```

**5. (Opcional) Adicionar ícone personalizado:**
- Clique direito no atalho → Propriedades
- Aba "Atalho" → Botão "Alterar Ícone"
- Escolha um ícone bonito

**✅ PRONTO! Agora você tem um atalho na área de trabalho!**

### OPÇÃO 2: Fixar na Barra de Tarefas

**1. Crie um arquivo .bat:**

Crie o arquivo `AzimutDeploy.bat` com este conteúdo:
```batch
@echo off
cd /d "C:\Users\ranz\Documents\azimut-site-vite-tailwind"
wscript "AzimutDeployApp.vbs"
```

**2. Crie um atalho do .bat**

**3. Clique direito no atalho → "Fixar na barra de tarefas"**

**✅ PRONTO! Ícone fixo na barra de tarefas!**

### OPÇÃO 3: Menu Iniciar

**1. Pressione Win + R**

**2. Digite:**
```
shell:programs
```

**3. Cole o atalho do `AzimutDeployApp.vbs` nesta pasta**

**✅ PRONTO! App aparece no Menu Iniciar!**

---

## 🎯 COMO USAR O APP

### 1. Abrir o App

**Clique duplo no atalho** que você criou

### 2. Janela Visual Aparece

```
╔══════════════════════════════════════════╗
║   AZIMUT DEPLOY MANAGER                  ║
║   Escolha uma opcao de deploy:           ║
║                                          ║
║  ┌────────────────────────────────────┐ ║
║  │     SITE PRINCIPAL                 │ ║ ← Botão vermelho
║  └────────────────────────────────────┘ ║
║                                          ║
║  ┌────────────────────────────────────┐ ║
║  │     BACKOFFICE / CMS               │ ║ ← Botão azul
║  └────────────────────────────────────┘ ║
║                                          ║
║  ┌────────────────────────────────────┐ ║
║  │  AMBOS (Site + Backoffice)         │ ║ ← Botão verde
║  └────────────────────────────────────┘ ║
║                                          ║
║  Status: Pronto para deploy              ║
╚══════════════════════════════════════════╝
```

### 3. Clicar no Botão Desejado

- **SITE PRINCIPAL** (vermelho) → Faz deploy do site
- **BACKOFFICE / CMS** (azul) → Faz deploy do backoffice
- **AMBOS** (verde) → Faz deploy dos dois

### 4. Confirmar

Vai aparecer uma janela de confirmação:
```
┌────────────────────────────────┐
│ Confirma o deploy do Site?     │
│                                │
│        [ Sim ]    [ Não ]      │
└────────────────────────────────┘
```

### 5. Deploy Iniciado!

Uma janela do PowerShell vai abrir mostrando o progresso do deploy.

**✅ Pronto! Deploy em andamento!**

---

## 🎨 RECURSOS DO APP

### ✅ Interface Visual
- 3 botões grandes e coloridos
- Efeito hover (muda cor ao passar mouse)
- Status em tempo real
- Confirmação antes de fazer deploy

### ✅ Segurança
- Sempre pede confirmação
- Mostra status do que está acontecendo
- Abre janela separada para ver progresso

### ✅ Fácil de Usar
- Apenas 1 clique no atalho
- Depois 1 clique no botão
- Confirma e pronto!

---

## 🔧 TESTE AGORA

### Teste 1: Abrir o App

**Execute:**
```powershell
.\AzimutDeployApp.vbs
```

Ou clique duplo no arquivo `AzimutDeployApp.vbs`

**Deve aparecer a janela visual com 3 botões!**

### Teste 2: Testar um Botão

1. Clique no botão "SITE PRINCIPAL" (vermelho)
2. Vai aparecer confirmação
3. Clique "Não" (só para testar)
4. Status muda para "Deploy cancelado"

**✅ Se funcionou, o app está pronto!**

---

## 📋 OPÇÕES EXTRAS

### OPÇÃO A: Atalho de Teclado

Você pode configurar um atalho de teclado (ex: Ctrl+Alt+D):

1. Clique direito no atalho da área de trabalho
2. Propriedades
3. Campo "Tecla de atalho"
4. Pressione: Ctrl + Alt + D
5. OK

**Agora aperte Ctrl+Alt+D para abrir o app!**

### OPÇÃO B: Abrir ao Ligar o PC

Se quiser que o app abra automaticamente:

1. Pressione Win + R
2. Digite: `shell:startup`
3. Cole o atalho do `AzimutDeployApp.vbs` nesta pasta

**App vai abrir toda vez que ligar o PC!**

### OPÇÃO C: Widget na Área de Trabalho

Crie um atalho para cada botão:

1. **AzimutDeploySite.bat:**
```batch
@echo off
cd /d "C:\Users\ranz\Documents\azimut-site-vite-tailwind"
powershell -ExecutionPolicy Bypass -Command "vercel --prod"
pause
```

2. **AzimutDeployBackoffice.bat:**
```batch
@echo off
cd /d "C:\Users\ranz\Documents\azimut-site-vite-tailwind\azimut-cms"
powershell -ExecutionPolicy Bypass -Command "vercel --prod"
pause
```

Cole na área de trabalho e renomeie!

---

## 🎯 RESUMO DE INSTALAÇÃO RÁPIDA

### Jeito mais simples (30 segundos):

1. Clique direito em `AzimutDeployApp.vbs`
2. "Criar atalho"
3. Arraste atalho para Área de Trabalho
4. Renomeie para "Azimut Deploy"
5. ✅ PRONTO!

**Agora sempre que quiser fazer deploy:**
- Clique duplo no atalho
- Escolhe o botão
- Confirma
- Deploy iniciado!

---

## 📊 COMPARAÇÃO

### ANTES (Linha de Comando):
```
1. Abrir PowerShell
2. cd C:\Users\ranz\Documents\azimut...
3. .\deploy.ps1
4. Digitar número da opção
5. Enter
```

### AGORA (App Visual):
```
1. Clique duplo no atalho
2. Clique no botão desejado
3. ✅ PRONTO!
```

**3x mais rápido e visual! 🚀**

---

## ❓ PRECISA DE AJUDA?

**Quer que eu:**
- ✅ Crie o atalho para você?
- ✅ Configure atalho de teclado?
- ✅ Crie ícone personalizado?
- ✅ Instale no Menu Iniciar?

**É só me pedir!** 😊

---

**Arquivos criados:**
- ✅ `AzimutDeployApp.ps1` (app principal)
- ✅ `AzimutDeployApp.vbs` (launcher)
- ✅ `GUIA_INSTALACAO_APP.md` (este guia)

**Próximo passo:** Testar o app executando `.\AzimutDeployApp.vbs` 🚀
