# ✅ CORRIGIR AVISOS NO WORKFLOW

## 🎉 PARABÉNS!

O workflow foi importado com sucesso! Vejo todos os 7 nós na tela.

**Mas há 2 avisos (triângulos vermelhos) que precisamos corrigir:**
- ⚠️ **SerpAPI** (nó 3)
- ⚠️ **PostgreSQL** (nó 7)

---

## 🔧 CORRIGIR NÓ SERPAPI (Nó 3)

### O Problema:
O nó SerpAPI precisa usar a variável de ambiente `SERPAPI_KEY`.

### Solução:

1. **Clique no nó "SerpAPI"** (nó 3, com o globo azul)

2. **Na seção "Query Parameters":**
   - Verifique se o parâmetro `api_key` está usando: `{{ $env.SERPAPI_KEY }}`
   - Se não estiver, edite e coloque: `{{ $env.SERPAPI_KEY }}`

3. **OU, se aparecer erro de credencial:**
   - Clique em "Credential" → "Create New"
   - Tipo: `Query Auth`
   - Name: `api_key`
   - Value: `{{ $env.SERPAPI_KEY }}`
   - Salve

4. **Clique em "Save"** (botão vermelho no canto superior direito)

**✅ Aviso do SerpAPI deve desaparecer!**

---

## 🔧 CORRIGIR NÓ POSTGRESQL (Nó 7)

### O Problema:
O nó PostgreSQL precisa de credenciais do banco Neon.

### Solução:

1. **Clique no nó "PostgreSQL"** (nó 7, com o elefante azul)

2. **Clique em "Credential"** → **"Create New"**

3. **Preencha os dados do seu banco Neon:**

   **Onde encontrar os dados:**
   - Acesse: https://console.neon.tech
   - Vá em seu projeto
   - Veja as informações de conexão

   **Campos para preencher:**
   - **Host:** (ex: `ep-xxx.us-east-2.aws.neon.tech`)
   - **Database:** (nome do banco, geralmente `neondb` ou similar)
   - **User:** (usuário do Neon)
   - **Password:** (senha do Neon)
   - **Port:** `5432`
   - **SSL:** Selecione `require`

4. **Clique em "Test"** para testar a conexão
   - Se der erro, verifique os dados
   - Se funcionar, aparecerá "Connection successful"

5. **Clique em "Save"**

6. **Volte para o nó PostgreSQL e clique em "Save"** novamente

**✅ Aviso do PostgreSQL deve desaparecer!**

---

## ✅ VERIFICAR VARIÁVEIS DE AMBIENTE

**As variáveis já devem estar no Railway, mas vamos verificar:**

1. **Acesse Railway:** https://railway.app
2. **Vá em seu projeto n8n**
3. **Clique em "Variables"**
4. **Verifique se existem:**
   - ✅ `SERPAPI_KEY`
   - ✅ `CLAUDE_API_KEY`
   - ✅ `RESEND_API_KEY`

**Se não estiverem, adicione:**
- Clique em "+ New Variable"
- Adicione cada uma
- Railway reiniciará automaticamente

---

## 🧪 TESTAR WORKFLOW

### Depois de corrigir os avisos:

1. **Clique no botão "Save"** (vermelho, canto superior direito)

2. **Ative o workflow:**
   - No canto superior direito, procure o toggle "Inactive"
   - Clique nele para mudar para "Active"

3. **Teste o workflow:**
   - Clique no nó "Webhook"
   - Clique em "Test" ou "Execute Node"
   - Cole estes dados de teste:

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

4. **Execute o workflow** e veja os resultados em cada nó

---

## 📋 CHECKLIST:

- [ ] Nó SerpAPI corrigido (variável de ambiente)
- [ ] Nó PostgreSQL corrigido (credenciais configuradas)
- [ ] Variáveis de ambiente verificadas no Railway
- [ ] Workflow salvo
- [ ] Workflow ativado
- [ ] Workflow testado

---

## 💡 DICAS:

- **Se o aviso não desaparecer:** Tente salvar o workflow novamente
- **Se der erro no PostgreSQL:** Verifique se o banco está acessível e se as credenciais estão corretas
- **Se der erro no SerpAPI:** Verifique se a variável `SERPAPI_KEY` está no Railway

---

## 🆘 PROBLEMAS COMUNS:

### Erro: "Environment variable SERPAPI_KEY not found"
**Solução:** Adicione a variável no Railway → Variables

### Erro: "PostgreSQL connection failed"
**Solução:** 
- Verifique host, usuário, senha
- Certifique-se de que SSL está como "require"
- Teste a conexão no Neon console primeiro

### Aviso não desaparece
**Solução:** 
- Salve o workflow
- Recarregue a página
- Verifique se as credenciais foram salvas corretamente

---

**Corrija os 2 avisos e me avise quando estiver tudo funcionando!** 🚀
