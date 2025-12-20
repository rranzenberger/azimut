# 📍 Como Ver o Último Deploy na Vercel

## 🔍 Verificar Deploy Atual

### **1. Acesse o Dashboard da Vercel:**
- URL: https://vercel.com
- Faça login na sua conta
- Vá em: **"Projects"** ou **"Dashboard"**

### **2. Selecione o Projeto:**
- Clique no projeto: **`azimut`**
- (Não confundir com `azimut-backoffice`)

### **3. Vá na Aba "Deployments":**
- No menu lateral, clique em **"Deployments"**
- Você verá uma lista de todos os deploys

---

## 📋 O Que Verificar

### **Commit Hash:**
- O deploy mais recente deve mostrar: **`35af3e9`**
- Mensagem: `fix: Adicionar fallback de deteccao de local via timezone quando API falha (503)`

### **Status:**
- ✅ **Ready** = Deploy concluído e funcionando
- ⏳ **Building** = Ainda compilando
- ❌ **Error** = Erro no build

### **Tempo:**
- Deve mostrar há quantos minutos/horas foi feito

---

## 🔄 Forçar Novo Deploy

### **Opção 1: Redeploy Manual**
1. Na página do projeto, clique em **"Deployments"**
2. Encontre o deploy mais recente
3. Clique nos **3 pontos** (⋯) ao lado do deploy
4. Selecione: **"Redeploy"**
5. Confirme: **"Redeploy"**

### **Opção 2: Push Vazio (Trigger Deploy)**
```bash
git commit --allow-empty -m "trigger: Forcar redeploy"
git push
```

### **Opção 3: Via Dashboard**
1. Vá em: **Settings** → **Git**
2. Clique em: **"Redeploy"** ou **"Trigger Deployment"**

---

## ✅ Verificar se Deploy Subiu

### **1. Verificar Commit:**
- No deploy, deve mostrar: **`35af3e9`** ou mais recente
- Se mostrar `1a1315c`, o deploy está desatualizado

### **2. Verificar Build Logs:**
- Clique no deploy
- Vá em: **"Build Logs"**
- Deve mostrar: `Cloning github.com/rranzenberger/azimut (Branch: main, Commit: 35af3e9)`

### **3. Testar no Site:**
- Acesse: `https://azmt.com.br`
- Abra Console (F12)
- Deve mostrar: `🌍 País detectado via timezone: US` (com VPN)
- Site deve estar em inglês

---

## 🚨 Se Deploy Não Atualizou

### **Possíveis Causas:**
1. **Vercel não está conectado ao GitHub:**
   - Vá em: Settings → Git
   - Verifique se o repositório está conectado

2. **Branch errada:**
   - Verifique se está deployando da branch `main`
   - Settings → Git → Production Branch

3. **Build falhou:**
   - Veja os logs do build
   - Corrija erros se houver

4. **Cache:**
   - Tente limpar cache: Settings → General → Clear Build Cache

---

## 📊 Status Esperado

### **Deploy Mais Recente:**
- **Commit:** `35af3e9` ou mais recente
- **Status:** ✅ Ready
- **Branch:** `main`
- **Tempo:** Há poucos minutos

### **Se Estiver Desatualizado:**
- **Commit:** `1a1315c` ou mais antigo
- **Ação:** Forçar redeploy manual

---

## 🎯 Resumo

1. **Acesse:** https://vercel.com → Projeto `azimut` → Deployments
2. **Verifique:** Commit hash deve ser `35af3e9` ou mais recente
3. **Se desatualizado:** Clique em "Redeploy" no deploy mais recente
4. **Teste:** Acesse o site e verifique console (F12)

---

**Agora você sabe como verificar e forçar um novo deploy!** 🚀


