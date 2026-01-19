# 🚀 COMO IMPORTAR WORKFLOW AUTOMÁTICO NO N8N

## ✅ ARQUIVO CRIADO!

Criei um arquivo JSON completo do workflow que você pode **importar diretamente no n8n**!

**Arquivo:** `n8n-workflow-import.json`

---

## 📋 COMO IMPORTAR (SUPER FÁCIL):

### Opção 1: Importar do Arquivo (RECOMENDADO)

1. **Abra seu n8n:**
   ```
   https://n8n-production-dce3.up.railway.app/workflow/of7Eei71oSXKZCQQCpb8R
   ```

2. **No canto superior direito**, clique nos **três pontinhos (⋯)** ou no menu

3. **Procure por:**
   - **"Import"** ou
   - **"Import from File"** ou
   - **"Import Workflow"**

4. **Clique em "Choose File"** ou "Selecionar Arquivo"

5. **Navegue até a pasta do projeto:**
   ```
   C:\Users\ranz\Documents\azimut-site-vite-tailwind
   ```

6. **Selecione o arquivo:** `n8n-workflow-import.json`

7. **Clique em "Import"** ou "Importar"

8. **✅ Workflow importado!**

---

### Opção 2: Copiar e Colar JSON

1. **Abra o arquivo:** `n8n-workflow-import.json`
2. **Selecione TODO o conteúdo** (Ctrl+A)
3. **Copie** (Ctrl+C)
4. **No n8n**, clique nos **três pontinhos (⋯)**
5. **Procure por "Import"** ou "Paste Workflow"
6. **Cole o JSON** (Ctrl+V)
7. **Clique em "Import"**

---

## ⚙️ DEPOIS DE IMPORTAR - CONFIGURAR:

### 1. Configurar Credenciais SerpAPI

1. **Clique no nó "SerpAPI"**
2. **Clique em "Credential"** → **"Create New"**
3. **Tipo:** `Query Auth`
4. **Name:** `api_key`
5. **Value:** `{{ $env.SERPAPI_KEY }}`
6. **Salve**

**OU** simplesmente verifique se a variável `SERPAPI_KEY` está configurada no Railway (já está!)

---

### 2. Configurar Credenciais PostgreSQL

1. **Clique no nó "PostgreSQL"**
2. **Clique em "Credential"** → **"Create New"**
3. **Preencha:**
   - **Host:** (do seu Neon - ex: `ep-xxx.us-east-2.aws.neon.tech`)
   - **Database:** (nome do banco)
   - **User:** (usuário do Neon)
   - **Password:** (senha do Neon)
   - **Port:** `5432`
   - **SSL:** `require`
4. **Teste a conexão**
5. **Salve**

---

### 3. Verificar Variáveis de Ambiente

**As variáveis já devem estar configuradas no Railway:**
- ✅ `SERPAPI_KEY`
- ✅ `CLAUDE_API_KEY`
- ✅ `RESEND_API_KEY`

**Se não estiverem, adicione no Railway:**
1. Vá em **Variables**
2. Adicione as 3 variáveis
3. Railway reiniciará automaticamente

---

## ✅ ATIVAR WORKFLOW:

1. **No canto superior direito**, procure o toggle **"Inactive"**
2. **Clique nele** para mudar para **"Active"**
3. **✅ Workflow ativo!**

---

## 🧪 TESTAR WORKFLOW:

### 1. Pegar URL do Webhook

1. **Clique no nó "Webhook"**
2. **Veja a URL** que aparece (ex: `https://n8n-production-dce3.up.railway.app/webhook/lead-enrichment`)
3. **Copie esta URL**

### 2. Testar com Dados

**Use Postman, curl, ou qualquer ferramenta:**

**POST para a URL do webhook:**

```json
{
  "id": "test-123",
  "email": "joao.silva@exemplo.com",
  "name": "João Silva",
  "company": "Tech Solutions",
  "phone": "+5511999999999",
  "lang": "pt"
}
```

**Ou teste direto no n8n:**
1. **Clique no nó Webhook**
2. **Clique em "Test"** ou "Execute Node"
3. **Cole os dados acima**
4. **Execute o workflow**

---

## 📋 CHECKLIST FINAL:

- [ ] Arquivo `n8n-workflow-import.json` baixado/aberto
- [ ] Workflow importado no n8n
- [ ] Credenciais SerpAPI configuradas (ou variável de ambiente)
- [ ] Credenciais PostgreSQL configuradas
- [ ] Variáveis de ambiente verificadas no Railway
- [ ] Workflow ativado
- [ ] URL do webhook copiada
- [ ] Workflow testado

---

## 💡 DICAS:

- **Se der erro ao importar:** Verifique se o JSON está válido
- **Se faltar credenciais:** Configure conforme instruções acima
- **Se o workflow não funcionar:** Verifique os logs de cada nó
- **Salve sempre:** Use Ctrl+S ou clique em "Save"

---

## 🆘 PROBLEMAS COMUNS:

### Erro: "Credential not found"
**Solução:** Configure as credenciais conforme instruções acima

### Erro: "Environment variable not found"
**Solução:** Verifique se as variáveis estão no Railway → Variables

### Erro: "PostgreSQL connection failed"
**Solução:** Verifique host, usuário, senha e SSL

---

## 🎯 PRÓXIMOS PASSOS:

Depois de importar e testar:

1. ✅ Integrar com o site (enviar leads para o webhook)
2. ✅ Ajustar prompts do Claude (se necessário)
3. ✅ Criar workflow de email (Resend)
4. ✅ Monitorar execuções

---

**Importe o arquivo e me avise se funcionou ou se teve algum problema!** 🚀
