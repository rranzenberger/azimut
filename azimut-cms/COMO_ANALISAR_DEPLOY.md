# 🔍 Como Analisar o Deploy na Vercel

## 📍 Onde Verificar

### **1. Dashboard Principal**

**URL:** https://vercel.com/dashboard

**O que verificar:**
- Lista de projetos
- Status do último deploy (verde = Ready, amarelo = Building, vermelho = Error)
- Tempo do último deploy

---

### **2. Página de Deployments**

**Caminho:** Dashboard → Projeto `azimut-backoffice` → Aba **"Deployments"**

**O que verificar:**
- **Commit Hash:** Deve mostrar `ccc1c69` ou mais recente (não `62dcdb5`)
- **Status:** 
  - 🟢 **Ready** = Deploy concluído com sucesso
  - 🟡 **Building** = Ainda em processo
  - 🔴 **Error** = Erro no build
- **Environment:** Production
- **Duration:** Tempo que levou para fazer o build

**Como acessar:**
1. Vercel Dashboard
2. Clique em `azimut-backoffice`
3. Aba **"Deployments"** (já deve estar selecionada)

---

### **3. Detalhes do Deploy Específico**

**Caminho:** Deployments → Clique no deploy mais recente

**O que verificar:**

#### **Aba "Deployment"**
- **Status:** Ready / Building / Error
- **Commit:** Hash do commit (deve ser `ccc1c69` ou mais recente)
- **Branch:** `main`
- **Domains:** `backoffice.azmt.com.br`
- **Created:** Quando foi criado
- **Duration:** Tempo de build

#### **Aba "Logs"** (MUITO IMPORTANTE)
- **Build Logs:** Todo o processo de build
- **Runtime Logs:** Logs em tempo de execução
- **Erros:** Procurar por linhas em vermelho ou com "Error"
- **Warnings:** Linhas em amarelo (geralmente não críticos)

**O que procurar nos logs:**
```
✅ "Build Completed" = Sucesso
✅ "Deployment completed" = Deploy concluído
❌ "Error" = Erro no build
❌ "Failed" = Falha no processo
⚠️ "Warning" = Aviso (pode não ser crítico)
```

#### **Aba "Resources"**
- Recursos utilizados
- Funções serverless criadas
- Arquivos estáticos

---

### **4. Build Logs (Detalhado)**

**Caminho:** Deployments → Deploy específico → Aba "Logs" → Seção "Build Logs"

**O que analisar:**

1. **Início do Build:**
   ```
   Running build in [location]
   Cloning github.com/rranzenberger/azimut-backoffice
   ```

2. **Instalação de Dependências:**
   ```
   Installing dependencies...
   npm install
   ```

3. **Prisma Generate:**
   ```
   > prisma generate
   ✔ Generated Prisma Client
   ```

4. **Build do Next.js:**
   ```
   Running "vercel build"
   Creating an optimized production build
   ```

5. **Rotas Geradas:**
   ```
   Route (app)                              Size     First Load JS
   ┌ ○ /admin                              8.87 kB        96.1 kB
   ┌ ○ /admin/pages                        [deve aparecer aqui]
   ┌ ○ /admin/pages/[slug]/edit            [deve aparecer aqui]
   ```

6. **Fim do Build:**
   ```
   Build Completed in /vercel/output
   Deployment completed
   ```

**⚠️ Se não aparecer `/admin/pages` nas rotas:**
- O arquivo `app/admin/pages/page.tsx` não foi encontrado
- Pode haver erro de sintaxe
- Pode estar faltando export default

---

### **5. Runtime Logs**

**Caminho:** Deployments → Deploy específico → Aba "Logs" → Seção "Runtime Logs"

**O que verificar:**
- Erros em tempo de execução
- Requisições que falharam
- Erros de banco de dados
- Erros de API

---

### **6. Verificar Erros Específicos**

**No Build Logs, procurar por:**

#### **Erro de TypeScript:**
```
Type error: ...
```

#### **Erro de Prisma:**
```
Prisma schema validation error
```

#### **Erro de Next.js:**
```
Error: ...
```

#### **Erro de Build:**
```
Build failed
```

---

## 🔍 Checklist de Verificação

### **Após Redeploy:**

- [ ] **Commit correto:** Deploy mostra `ccc1c69` ou mais recente
- [ ] **Status Ready:** Deploy está "Ready" (verde)
- [ ] **Build Logs:** Sem erros (apenas warnings são OK)
- [ ] **Rotas geradas:** `/admin/pages` aparece nas rotas
- [ ] **Teste no site:** `backoffice.azmt.com.br/admin/pages` funciona

---

## 🐛 Problemas Comuns e Soluções

### **1. Deploy ainda mostra commit antigo**

**Solução:**
- Aguardar mais alguns minutos
- Verificar se o push foi feito corretamente: `git log origin/main`
- Forçar redeploy manual novamente

### **2. Build falha com erro**

**Solução:**
- Ver Build Logs para identificar o erro
- Verificar se há erros de TypeScript
- Verificar se há erros de Prisma
- Verificar se há erros de sintaxe

### **3. Deploy concluído mas rota não funciona**

**Solução:**
- Verificar se `/admin/pages` aparece nas rotas geradas
- Verificar Runtime Logs para erros em tempo de execução
- Limpar cache do navegador
- Testar em modo anônimo

### **4. Rotas não aparecem no build**

**Solução:**
- Verificar se `app/admin/pages/page.tsx` existe
- Verificar se exporta `export default`
- Verificar se não há erros de sintaxe
- Verificar se o arquivo está commitado

---

## 📊 Onde Está Cada Informação

| Informação | Onde Encontrar |
|------------|----------------|
| Status do deploy | Dashboard → Projeto → Deployments → Status |
| Commit deployado | Deployments → Deploy → Aba "Deployment" → Source |
| Logs de build | Deployments → Deploy → Aba "Logs" → Build Logs |
| Erros | Deployments → Deploy → Aba "Logs" → Procurar "Error" |
| Rotas geradas | Deployments → Deploy → Aba "Logs" → Build Logs → "Route (app)" |
| Tempo de build | Deployments → Deploy → Aba "Deployment" → Duration |

---

## 🚀 Próximos Passos Após Verificar

1. **Se deploy está "Ready" com commit correto:**
   - Testar: `backoffice.azmt.com.br/admin/pages`
   - Verificar menu lateral (deve mostrar "Páginas" sem "em breve")

2. **Se deploy está "Building":**
   - Aguardar conclusão
   - Monitorar Build Logs

3. **Se deploy tem erro:**
   - Copiar mensagem de erro
   - Verificar Build Logs
   - Corrigir erro e fazer novo commit

---

**Última atualização:** Guia completo de análise de deploy

