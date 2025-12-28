# 📝 PASSO A PASSO: Configurar Variável de Ambiente no Vercel

## 🎯 OBJETIVO

Adicionar a variável `VITE_CMS_API_URL` no projeto **azimut** (site principal) do Vercel.

---

## ✅ PASSO 1: Acessar o Vercel Dashboard

1. Abra o navegador
2. Acesse: **https://vercel.com/dashboard**
3. Faça login (se necessário)

---

## ✅ PASSO 2: Selecionar o Projeto Correto

⚠️ **IMPORTANTE:** Você precisa selecionar o projeto **`azimut`** (site principal), **NÃO** o projeto do backoffice.

**Como identificar:**
- ✅ Projeto **`azimut`** = Site principal (azmt.com.br)
- ❌ Projeto **`azimut-backoffice`** ou **`azimut-cms`** = Backoffice (não é este!)

**Se você não tiver certeza:**
- Procure pelo projeto que tem o domínio `azmt.com.br`
- Ou o projeto que tem o repositório `rranzenberger/azimut`

---

## ✅ PASSO 3: Abrir Configurações de Variáveis de Ambiente

1. No projeto selecionado, clique em **"Settings"** (no menu superior)
2. No menu lateral esquerdo, clique em **"Environment Variables"**

---

## ✅ PASSO 4: Adicionar a Nova Variável

1. Você verá uma tabela com variáveis existentes (ou vazia se não houver nenhuma)
2. Clique no botão **"+ Add New"** ou **"Add"** ou **"Create"**

3. Preencha os campos:

   **Key (Nome da variável):**
   ```
   VITE_CMS_API_URL
   ```
   ⚠️ **IMPORTANTE:** Copie exatamente assim, com letras maiúsculas e underscores.

   **Value (Valor):**
   ```
   https://backoffice.azmt.com.br/api
   ```
   ⚠️ **IMPORTANTE:** Sem barra no final! Deve terminar em `/api`

4. **Ambientes (Environments):**
   Marque as 3 opções:
   - ✅ **Production**
   - ✅ **Preview**
   - ✅ **Development**

5. Clique em **"Save"** ou **"Add"**

---

## ✅ PASSO 5: Verificar se Foi Adicionada

Você deve ver a variável na lista:
```
VITE_CMS_API_URL = https://backoffice.azmt.com.br/api
```

---

## ✅ PASSO 6: Fazer Redeploy (OBRIGATÓRIO!)

⚠️ **CRÍTICO:** Variáveis `VITE_*` só funcionam após redeploy!

### **Opção A: Via Dashboard (Mais Fácil)**

1. No menu superior, clique em **"Deployments"**
2. Você verá uma lista de deploys
3. No **último deploy** (primeiro da lista), clique nos **3 pontos** (⋯) no canto direito
4. Selecione **"Redeploy"**
5. Confirme clicando em **"Redeploy"** novamente
6. Aguarde o deploy concluir (pode levar 1-3 minutos)

### **Opção B: Via Git (Alternativa)**

Se você preferir, pode fazer um commit vazio para trigger um novo deploy:

```bash
cd azimut-site-vite-tailwind
git commit --allow-empty -m "chore: trigger redeploy para aplicar variável de ambiente"
git push
```

---

## ✅ PASSO 7: Verificar se Funcionou

1. Aguarde o deploy concluir (status "Ready")
2. Acesse: **https://azmt.com.br**
3. Abra o **Console do navegador** (pressione F12)
4. Procure por mensagens:
   - ✅ `[CMS] Conteúdo carregado` → **Funcionando!**
   - ❌ `[CMS] Erro ao buscar conteúdo` ou `localhost` → **Ainda com problema**

5. **Teste final:**
   - Acesse: https://backoffice.azmt.com.br/admin/site-pages
   - Edite o "Hero Subtitle" da página Home
   - Salve
   - Recarregue: https://azmt.com.br
   - O conteúdo deve aparecer atualizado!

---

## 🚨 PROBLEMAS COMUNS

### **"Não encontro o projeto azimut"**

- Verifique se você está logado na conta correta do Vercel
- Verifique se o projeto existe (pode ter outro nome)
- Procure pelo domínio `azmt.com.br` na lista de projetos

### **"A variável não aparece depois do deploy"**

- ⚠️ Você fez o **redeploy** após adicionar a variável?
- Variáveis `VITE_*` precisam de redeploy obrigatório
- Verifique se a variável está marcada para o ambiente correto (Production)

### **"Ainda aparece erro no console"**

- Aguarde alguns segundos (pode ter cache)
- Limpe o cache do navegador (Ctrl+Shift+R)
- Verifique se o backoffice está online: https://backoffice.azmt.com.br
- Verifique se a URL da variável está correta (sem barra no final!)

### **"Não sei qual projeto é o site principal"**

Verifique:
1. Acesse **Settings** → **Domains** de cada projeto
2. O projeto que tem o domínio `azmt.com.br` é o site principal
3. O projeto que tem `backoffice.azmt.com.br` é o backoffice (não é este!)

---

## ✅ CHECKLIST FINAL

- [ ] Acessei o Vercel Dashboard
- [ ] Selecionei o projeto **azimut** (site principal)
- [ ] Fui em Settings → Environment Variables
- [ ] Adicionei `VITE_CMS_API_URL` = `https://backoffice.azmt.com.br/api`
- [ ] Marquei os 3 ambientes (Production, Preview, Development)
- [ ] Salvei a variável
- [ ] Fiz o **redeploy** (obrigatório!)
- [ ] Testei no site (https://azmt.com.br)
- [ ] Verifiquei o console (F12) e não há erros
- [ ] Testei editar no backoffice e vi a mudança no site

---

## 🎉 PRONTO!

Se todos os itens acima estão ✅, o sistema está funcionando corretamente!

**Tempo estimado:** 5-10 minutos

