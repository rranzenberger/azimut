# 📍 ONDE VOCÊ ESTÁ AGORA?

## ✅ STATUS ATUAL:

Você acabou de:
- ✅ Conectar PostgreSQL no n8n
- ✅ Testar conexão com sucesso
- ✅ Credencial PostgreSQL salva

---

## 🎯 PRÓXIMO PASSO: IMPORTAR WORKFLOW

### **Onde você está no n8n:**

Você está na tela de **"Credentials"** (Credenciais).

Agora precisa ir para **"Workflows"** para importar o workflow completo!

---

## 📋 PASSO A PASSO VISUAL:

### **1. Ir para Workflows**

1. **No menu lateral esquerdo**, procure por:
   - **"Workflows"** (ícone de fluxograma ou lista)
   - Ou clique no **logo n8n** no topo (volta para home)

2. **Você verá uma lista de workflows** (provavelmente vazia ou com workflows padrão)

---

### **2. Importar Workflow**

**Opção A - Botão "Add workflow":**
1. Clique no botão **"Add workflow"** (canto superior direito)
2. Um workflow vazio será criado
3. Clique nos **3 pontinhos (⋮)** no workflow
4. Selecione **"Import from File"**
5. Escolha o arquivo: `n8n-workflow-import.json`
6. Aguarde importar

**Opção B - Menu Import:**
1. No menu superior, procure por **"Import"** ou **"⋮"** (3 pontinhos)
2. Selecione **"Import from File"**
3. Escolha o arquivo: `n8n-workflow-import.json`

---

### **3. Localizar o Arquivo**

O arquivo está em:
```
C:\Users\ranz\Documents\azimut-site-vite-tailwind\n8n-workflow-import.json
```

**Ou navegue até:**
- Abra o Explorer do Windows
- Vá para: `C:\Users\ranz\Documents\azimut-site-vite-tailwind\`
- Procure por: `n8n-workflow-import.json`

---

## 🎨 O QUE VOCÊ VERÁ DEPOIS DE IMPORTAR:

Um workflow com **7 nodes** conectados:

1. **🔗 Webhook** (recebe lead do site)
2. **📝 Set** (organiza dados)
3. **🌐 SerpAPI** (busca informações)
4. **{} Processar SerpAPI** (processa resultados)
5. **🌐 Claude AI** (analisa perfil)
6. **{} Processar Claude** (extrai JSON)
7. **🐘 PostgreSQL** (salva no banco)

---

## ⚙️ DEPOIS DE IMPORTAR - CONFIGURAR:

### **1. Selecionar Credencial PostgreSQL**

1. Clique no node **"PostgreSQL"**
2. Em **"Credential"**, selecione a credencial que você acabou de criar
3. ✅ Pronto!

### **2. Criar Credencial SerpAPI**

1. Clique no node **"SerpAPI"**
2. Clique em **"Create New Credential"**
3. **Tipo:** Query Auth
4. **Name:** `api_key`
5. **Value:** Cole sua chave SerpAPI
6. **Salve**

### **3. Criar Credencial Claude**

1. Clique no node **"Claude AI"**
2. Clique em **"Create New Credential"**
3. **Tipo:** Header Auth
4. **Header Name:** `x-api-key`
5. **Header Value:** Cole sua chave Claude
6. **Salve**

---

## 🚀 ATIVAR WORKFLOW:

1. No canto superior direito, procure o **toggle "Active"**
2. Clique para **ativar** (ficará verde/azul)
3. ✅ Workflow está rodando!

---

## 📍 RESUMO - ONDE ESTÁ:

- **Agora:** Tela de Credentials ✅
- **Próximo:** Ir para Workflows
- **Ação:** Importar `n8n-workflow-import.json`
- **Depois:** Configurar credenciais e ativar

---

**Vá para "Workflows" no menu lateral e importe o arquivo!** 🚀
