# 🌐 Como Configurar Domínios na Vercel

## 📋 Passo a Passo Completo

### **1. Acesse o Projeto na Vercel**

1. Vá para: https://vercel.com
2. Faça login se necessário
3. Clique no projeto **"azimut"**

### **2. Vá para Settings → Domains**

1. No menu superior, clique em **"Settings"**
2. No menu lateral esquerdo, clique em **"Domains"**

### **3. Adicionar Domínio Principal**

1. Clique no botão **"Add Domain"** (geralmente no topo direito)
2. Digite: `azmt.com.br`
3. Clique em **"Add"** ou **"Continue"**
4. A Vercel vai verificar se o DNS está configurado corretamente

### **4. Adicionar Domínio www**

1. Clique em **"Add Domain"** novamente
2. Digite: `www.azmt.com.br`
3. Clique em **"Add"**

### **5. Verificar Status**

Depois de adicionar, você verá:
- **Valid Configuration** (✓ verde) = DNS configurado corretamente
- **Invalid Configuration** (⚠️ amarelo) = precisa configurar DNS

### **6. Marcar Domínio Primário**

1. Ao lado do domínio `azmt.com.br`, você verá opções
2. Marque como **"Primary Domain"** (domínio principal)

---

## ⚙️ Se DNS Não Estiver Configurado

Se aparecer "Invalid Configuration", você precisa verificar no painel da Locaweb:

### **Verificar DNS na Locaweb:**

1. Acesse o painel da Locaweb
2. Vá em **"Domínios"** → **"Zona de DNS"**
3. Verifique se está assim:
   - `@` (raiz) → Tipo **A** → Valor: `76.76.21.21`
   - `www` → Tipo **CNAME** → Valor: `cname.vercel-dns.com`

Se não estiver, corrija e aguarde alguns minutos para propagação.

---

## 🔄 Adicionar Outros Domínios (Opcional)

Se quiser adicionar os outros domínios também:

1. **azmt.ca**
2. **azimutimmersive.ca**
3. **azimutimmersive.com**
4. **discreet.com.br**
5. **animaparty.com**
6. **architecad.com**
6. **enberger.com**

Para cada um, repita o processo:
1. Clique em **"Add Domain"**
2. Digite o domínio
3. Clique em **"Add"**

---

## ✅ Depois de Configurar

1. Aguarde alguns minutos para propagação DNS
2. Acesse: `https://azmt.com.br`
3. Deve aparecer a tela de login do Basic Auth (ou o site, se já tiver desativado)

---

## 🔒 SSL Automático

A Vercel gera certificados SSL automaticamente para todos os domínios adicionados. Aguarde alguns minutos após adicionar o domínio para o SSL ser ativado.

---

**Pronto! Agora é só seguir os passos acima!** 🚀

