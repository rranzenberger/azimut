# 🚀 Comandos Git - Execute Manualmente

Execute estes comandos **UM POR VEZ** no PowerShell (copie e cole):

## 📋 Passo a Passo

### **1. Verificar se está na pasta correta:**
```powershell
cd C:\Users\ranz\Documents\azimut-site-vite-tailwind
```

### **2. Adicionar todos os arquivos:**
```powershell
git add .
```

### **3. Fazer o primeiro commit:**
```powershell
git commit -m "Initial commit - Site Azimut"
```

### **4. Conectar com o GitHub:**
```powershell
git remote add origin https://github.com/rranzenberger/azimut.git
```

### **5. Renomear branch para main:**
```powershell
git branch -M main
```

### **6. Fazer push para o GitHub:**
```powershell
git push -u origin main
```

**⚠️ IMPORTANTE:** No passo 6, o GitHub vai pedir seu usuário e senha. Use:
- **Usuário:** `rranzenberger`
- **Senha:** Use um **Personal Access Token** (não a senha normal!)

---

## 🔑 Como Criar Personal Access Token (se pedir senha):

1. Acesse: https://github.com/settings/tokens
2. Clique em **"Generate new token"** → **"Generate new token (classic)"**
3. Dê um nome: `azimut-deploy`
4. Marque a opção **"repo"** (todas as permissões de repositório)
5. Clique em **"Generate token"**
6. **COPIE o token** (você só verá uma vez!)
7. Use esse token como senha no passo 6

---

## ✅ Depois do Push

Quando terminar, o código estará no GitHub e você pode:
1. Voltar na Vercel
2. Conectar com o repositório
3. Fazer deploy!

---

**Execute os comandos acima UM POR VEZ e me avise se der algum erro!** 🎯









