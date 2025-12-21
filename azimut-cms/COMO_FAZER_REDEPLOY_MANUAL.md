# 🚀 Como Fazer Redeploy Manual - Passo a Passo

## 📋 Passo a Passo Completo

### **PASSO 1: Acessar Vercel Dashboard** (30 segundos)

1. **Abra seu navegador**
2. **Acesse:** https://vercel.com/dashboard
3. **Faça login** (se necessário)

---

### **PASSO 2: Selecionar o Projeto Correto** (30 segundos)

⚠️ **IMPORTANTE:** Você precisa selecionar o projeto **`azimut-backoffice`**, NÃO o projeto `azimut`!

1. **Na lista de projetos**, procure por: **`azimut-backoffice`**
2. **Clique no projeto** `azimut-backoffice`
3. Você será redirecionado para a página do projeto

**Como identificar:**
- ✅ **Correto:** `azimut-backoffice` (CMS/Backoffice)
- ❌ **Errado:** `azimut` (site principal)

---

### **PASSO 3: Ir para Deployments** (10 segundos)

1. **Na barra de navegação superior**, clique na aba **"Deployments"**
2. Você verá uma lista de todos os deploys

---

### **PASSO 4: Selecionar o Deploy Mais Recente** (30 segundos)

1. **Procure o deploy mais recente** (primeiro da lista)
2. **Identifique pelo:**
   - Status: "Ready" (verde)
   - Tempo: "X minutos/horas atrás"
   - ID: Um código como `3h9kFfzSA` ou similar

3. **Clique nos 3 pontos** (⋯) no final da linha desse deploy
   - Os 3 pontos ficam no lado direito da linha do deploy

---

### **PASSO 5: Iniciar Redeploy** (1 minuto)

1. **No menu que aparecer**, clique em **"Redeploy"**
2. **Uma janela/modal aparecerá** com opções

3. **IMPORTANTE - DESMARCAR CACHE:**
   - Procure por: **"Use existing Build Cache"** ou **"Use Build Cache"**
   - **DESMARQUE essa opção** (deve estar desmarcada)
   - Isso força um rebuild completo sem usar cache antigo

4. **Clique em "Redeploy"** ou **"Confirm"**

---

### **PASSO 6: Aguardar Deploy** (2-5 minutos)

1. **Você será redirecionado** para a página do deploy
2. **Status mudará para:**
   - 🟡 **"Building"** (em andamento)
   - Depois: 🟢 **"Ready"** (concluído)

3. **Aguarde até o status ficar "Ready"** (verde)
   - Pode levar 2-5 minutos
   - Você pode acompanhar os logs em tempo real

---

### **PASSO 7: Verificar Commit Deployado** (1 minuto)

1. **Na página do deploy**, vá para a aba **"Deployment"**
2. **Role até a seção "Source"**
3. **Verifique o commit:**
   - ✅ **Deve mostrar:** `333fff4` ou mais recente
   - ✅ **Mensagem:** "fix: Force rebuild to update pages menu..."
   - ❌ **NÃO deve ser:** `62dcdb5` (antigo)

---

### **PASSO 8: Limpar Cache do Navegador** (1 minuto)

1. **Pressione:** `Ctrl + Shift + Delete` (Windows) ou `Cmd + Shift + Delete` (Mac)
2. **Selecione:**
   - ✅ **"Cache"** ou **"Imagens e arquivos em cache"**
   - Período: **"Última hora"** ou **"Todo o período"**
3. **Clique em "Limpar dados"**
4. **Feche todas as abas** com `backoffice.azmt.com.br`

---

### **PASSO 9: Testar no Site** (2 minutos)

1. **Abra nova aba** (ou janela anônima)
2. **Acesse:** `backoffice.azmt.com.br/admin`
3. **Faça login** (se necessário)

4. **Verifique o menu lateral:**
   - ✅ **Deve mostrar:** "Páginas" (sem "(em breve)")
   - ✅ **Deve estar clicável** (não cinza)
   - ❌ **NÃO deve mostrar:** "Páginas (em breve)"

5. **Clique em "Páginas"**
   - ✅ **Deve carregar:** Listagem de páginas
   - ✅ **URL deve ser:** `backoffice.azmt.com.br/admin/pages`
   - ❌ **NÃO deve dar:** Erro 404

---

## 🎯 Checklist Rápido

- [ ] Acessei: https://vercel.com/dashboard
- [ ] Selecionei projeto: **`azimut-backoffice`** (não `azimut`)
- [ ] Fui em: Aba "Deployments"
- [ ] Cliquei nos 3 pontos (⋯) do deploy mais recente
- [ ] Selecionei: "Redeploy"
- [ ] **DESMARQUEI:** "Use existing Build Cache"
- [ ] Cliquei em "Redeploy"
- [ ] Aguardei status: "Ready" (verde)
- [ ] Verifiquei commit: `333fff4` ou mais recente
- [ ] Limpei cache do navegador
- [ ] Testei: Menu mostra "Páginas" (sem "em breve")
- [ ] Testei: `/admin/pages` carrega (não 404)

---

## 🐛 Se Algo Der Errado

### **Problema: Não encontro o projeto `azimut-backoffice`**

**Solução:**
1. Verifique se você está na conta correta da Vercel
2. Procure na lista completa de projetos
3. Verifique se o projeto não foi deletado ou renomeado

---

### **Problema: Não vejo opção "Redeploy"**

**Solução:**
1. Certifique-se de que clicou nos **3 pontos** (⋯), não no deploy em si
2. O menu deve aparecer com opções: "Redeploy", "Cancel", "Delete", etc.
3. Se não aparecer, tente clicar no deploy e procurar botão "Redeploy" na página

---

### **Problema: Não vejo opção "Use existing Build Cache"**

**Solução:**
1. Algumas versões da Vercel não mostram essa opção
2. Faça o redeploy mesmo assim
3. Se não funcionar, vá em Settings → General → "Clear Build Cache"

---

### **Problema: Deploy ainda mostra commit antigo**

**Solução:**
1. Verifique se o commit `333fff4` está no GitHub:
   - https://github.com/rranzenberger/azimut
   - Verificar se está no branch `main`
2. Verifique configuração do projeto:
   - Settings → Git → Production Branch: deve ser `main`
3. Tente fazer redeploy novamente
4. Se persistir, desconecte e reconecte o repositório

---

### **Problema: Menu ainda mostra "Páginas (em breve)"**

**Soluções:**
1. **Limpar cache novamente:** `Ctrl + Shift + Delete`
2. **Testar em janela anônima:** Abrir janela anônima/privada
3. **Aguardar mais alguns minutos:** Pode levar tempo para propagar
4. **Verificar commit no deploy:** Deve ser `333fff4` ou mais recente

---

## 📸 Onde Clicar (Referência Visual)

```
Vercel Dashboard
└── azimut-backoffice (CLIQUE AQUI)
    └── Deployments (CLIQUE AQUI)
        └── [Deploy mais recente]
            └── ⋯ (3 pontos - CLIQUE AQUI)
                └── Redeploy (CLIQUE AQUI)
                    └── [Modal]
                        └── ☐ Use existing Build Cache (DESMARCAR)
                        └── Redeploy (CLIQUE AQUI)
```

---

## ⏱️ Tempo Total Estimado

- **Passos 1-5:** ~3 minutos
- **Aguardar deploy:** 2-5 minutos
- **Passos 6-9:** ~4 minutos
- **Total:** ~10-12 minutos

---

## ✅ Quando Estiver Funcionando

Você saberá que funcionou quando:

1. ✅ Deploy mostra commit `333fff4` ou mais recente
2. ✅ Menu mostra "Páginas" (sem "em breve")
3. ✅ `/admin/pages` carrega a listagem
4. ✅ Ao clicar em "Home", vai para `/admin/pages/home/edit`
5. ✅ Seção "Slogan do Hero" aparece com 4 campos

---

**Última atualização:** Guia passo a passo completo para redeploy manual

