# 🔗 Adicionar Variável no Site Principal

## 📋 O Que Fazer Agora

Você está na tela de **Environment Variables** do projeto **`azimut`** (site principal).

### ✅ Adicionar Variável:

1. **No campo "Key":**
   ```
   VITE_CMS_API_URL
   ```

2. **No campo "Value":**
   ```
   https://backoffice.azmt.com.br/api
   ```

3. **Environments:**
   - Selecione "All Environments" (ou marque Production, Preview e Development)

4. **Clique em "Save"**

5. **Após salvar:**
   - Vá em **Deployments**
   - Clique em **Redeploy** (último deploy)
   - Aguarde build completar

---

## ⚠️ Importante

**Antes de adicionar no site principal, preciso verificar o CMS!**

Envie também um print de:
- **Projeto: `azimut-backoffice`**
- **Settings → Environment Variables**

Isso mostra se o CMS está configurado corretamente.

---

## 📝 Resumo

**Site Principal (`azimut`):**
- ✅ Adicionar: `VITE_CMS_API_URL` = `https://backoffice.azmt.com.br/api`

**CMS (`azimut-backoffice`):**
- ⏳ Preciso ver as variáveis para verificar

---

**Adicione a variável e depois envie o print do CMS!** 🚀


