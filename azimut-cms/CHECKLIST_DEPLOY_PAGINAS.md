# ✅ Checklist: Deploy Páginas - Passo a Passo

## 📋 Checklist Completo

### **FASE 1: Verificar Deploy na Vercel** (5 minutos)

- [ ] **1.1. Acessar Vercel Dashboard**
  - URL: https://vercel.com/dashboard
  - Login com sua conta

- [ ] **1.2. Selecionar Projeto**
  - Clicar em: `azimut-backoffice`
  - Ou procurar na lista de projetos

- [ ] **1.3. Verificar Aba "Deployments"**
  - Clicar na aba **"Deployments"** (já deve estar selecionada)
  - Verificar se há deploy recente (últimos 10 minutos)

- [ ] **1.4. Verificar Status do Deploy**
  - Status deve ser: 🟢 **"Ready"** (verde)
  - Se estiver 🟡 **"Building"**: aguardar conclusão
  - Se estiver 🔴 **"Error"**: ver Build Logs para erros

- [ ] **1.5. Verificar Commit Deployado**
  - Clicar no deploy mais recente
  - Aba **"Deployment"** → Seção **"Source"**
  - Commit deve ser: `333fff4` ou mais recente
  - ❌ **NÃO deve ser:** `62dcdb5` (antigo)

---

### **FASE 2: Verificar Build Logs** (3 minutos)

- [ ] **2.1. Acessar Build Logs**
  - No deploy selecionado → Aba **"Logs"**
  - Seção **"Build Logs"** (deve estar expandida)

- [ ] **2.2. Verificar Cache**
  - Procurar por: "Skipping build cache" ou "Removed build cache"
  - ✅ **Deve aparecer:** Indica que rebuild foi feito sem cache
  - ❌ **Se não aparecer:** Pode estar usando cache antigo

- [ ] **2.3. Verificar Rotas Geradas**
  - Procurar por: "Route (app)"
  - Deve aparecer lista de rotas
  - ✅ **Deve conter:** `/admin/pages`
  - ✅ **Deve conter:** `/admin/pages/[slug]/edit`
  - ❌ **Se não aparecer:** Problema no build

- [ ] **2.4. Verificar Fim do Build**
  - Procurar por: "Build Completed"
  - Procurar por: "Deployment completed"
  - ✅ **Deve aparecer:** Build concluído com sucesso
  - ❌ **Se aparecer "Error" ou "Failed":** Copiar mensagem de erro

- [ ] **2.5. Verificar Erros**
  - Procurar por: "Error" (linhas em vermelho)
  - Procurar por: "Failed" (linhas em vermelho)
  - ✅ **Não deve haver erros críticos**
  - ⚠️ **Warnings são OK** (não críticos)

---

### **FASE 3: Limpar Cache do Navegador** (1 minuto)

- [ ] **3.1. Limpar Cache**
  - Pressionar: `Ctrl + Shift + Delete` (Windows) ou `Cmd + Shift + Delete` (Mac)
  - Selecionar: **"Cache"** ou **"Imagens e arquivos em cache"**
  - Período: **"Última hora"** ou **"Todo o período"**
  - Clicar em **"Limpar dados"**

- [ ] **3.2. Fechar Todas as Abas do Backoffice**
  - Fechar todas as abas com `backoffice.azmt.com.br`
  - Isso garante que não há cache de sessão

---

### **FASE 4: Testar no Site** (2 minutos)

- [ ] **4.1. Acessar Backoffice**
  - Abrir nova aba (ou janela anônima)
  - URL: `backoffice.azmt.com.br/admin`
  - Fazer login se necessário

- [ ] **4.2. Verificar Menu Lateral**
  - Olhar para o menu lateral esquerdo
  - ✅ **Deve mostrar:** "Páginas" (sem "(em breve)")
  - ✅ **Deve estar clicável** (não cinza/desabilitado)
  - ❌ **NÃO deve mostrar:** "Páginas (em breve)"

- [ ] **4.3. Clicar em "Páginas"**
  - Clicar no link "Páginas" no menu
  - ✅ **Deve carregar:** Listagem de páginas
  - ✅ **URL deve ser:** `backoffice.azmt.com.br/admin/pages`
  - ❌ **NÃO deve dar:** Erro 404

- [ ] **4.4. Verificar Listagem**
  - Deve aparecer card com página "Home"
  - Deve mostrar informações da página
  - ✅ **Deve estar clicável**

- [ ] **4.5. Clicar em "Home"**
  - Clicar no card da página "Home"
  - ✅ **Deve ir para:** `/admin/pages/home/edit`
  - ✅ **Deve carregar:** Formulário de edição

- [ ] **4.6. Verificar Seção "Slogan do Hero"**
  - Rolar até a seção "Slogan do Hero"
  - ✅ **Deve aparecer:** 4 campos:
    - `heroSloganPt` (Português) 🇧🇷
    - `heroSloganEn` (English) 🇺🇸
    - `heroSloganEs` (Español) 🇪🇸
    - `heroSloganFr` (Français) 🇫🇷
  - ✅ **Campos devem estar editáveis**

---

### **FASE 5: Testar Edição** (2 minutos)

- [ ] **5.1. Editar Slogan**
  - Preencher campo `heroSloganPt` com: "Teste de Edição"
  - Clicar em **"Salvar Alterações"**

- [ ] **5.2. Verificar Sucesso**
  - ✅ **Deve mostrar:** Mensagem de sucesso ou redirecionar
  - ✅ **Deve voltar para:** `/admin/pages`

- [ ] **5.3. Verificar no Site Principal**
  - Acessar: `www.azmt.com.br` (site principal)
  - ✅ **Deve mostrar:** Slogan atualizado no hero
  - ⚠️ **Pode levar alguns segundos** para atualizar

---

## 🐛 Se Algo Der Errado

### **Problema: Deploy ainda mostra commit antigo**

**Solução:**
1. Vercel Dashboard → Deployments
2. Clique nos 3 pontos (⋯) do último deploy
3. Selecione "Redeploy"
4. **IMPORTANTE:** Desmarque "Use existing Build Cache"
5. Clique em "Redeploy"
6. Aguarde 2-5 minutos
7. Repetir checklist a partir da FASE 1

---

### **Problema: Menu ainda mostra "Páginas (em breve)"**

**Soluções:**
1. **Limpar cache novamente:** `Ctrl + Shift + Delete`
2. **Testar em janela anônima:** Abrir janela anônima/privada
3. **Verificar commit no deploy:** Deve ser `333fff4` ou mais recente
4. **Fazer redeploy manual:** Com cache desabilitado

---

### **Problema: Rota `/admin/pages` dá 404**

**Soluções:**
1. **Verificar Build Logs:** Deve aparecer `/admin/pages` nas rotas
2. **Verificar se arquivo existe:** `azimut-cms/app/admin/pages/page.tsx`
3. **Verificar se está commitado:** GitHub → Verificar arquivo
4. **Fazer redeploy:** Com cache desabilitado

---

### **Problema: Build falha com erro**

**Soluções:**
1. **Copiar mensagem de erro** dos Build Logs
2. **Verificar Runtime Logs** para erros em execução
3. **Verificar se há erros de TypeScript**
4. **Verificar se há erros de Prisma**
5. **Corrigir erro e fazer novo commit**

---

## ✅ Checklist Rápido (Resumo)

- [ ] Deploy status: "Ready" (verde)
- [ ] Commit: `333fff4` ou mais recente
- [ ] Build Logs: "Build Completed" sem erros
- [ ] Rotas: `/admin/pages` aparece na lista
- [ ] Cache navegador: Limpo
- [ ] Menu: Mostra "Páginas" (sem "em breve")
- [ ] Rota: `/admin/pages` carrega (não 404)
- [ ] Edição: Formulário carrega e salva

---

## 📞 Se Precisar de Ajuda

**Informações para compartilhar:**
1. Commit deployado na Vercel
2. Status do deploy (Ready/Building/Error)
3. Mensagem de erro (se houver)
4. Screenshot do menu lateral
5. Screenshot dos Build Logs (se houver erro)

---

**Última atualização:** Checklist completo passo a passo

