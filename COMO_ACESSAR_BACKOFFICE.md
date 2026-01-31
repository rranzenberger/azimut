# 🚀 Como Acessar o Backoffice

## 📍 URL DO BACKOFFICE

### **Produção (Online):**
```
https://backoffice.azmt.com.br/admin
```

### **Desenvolvimento (Local):**
```
http://localhost:3001/admin
```

---

## 🔐 PASSO A PASSO

### **1. Acessar o Backoffice**

1. Abra seu navegador (Chrome, Edge, Firefox)
2. Digite na barra de endereço:
   ```
   https://backoffice.azmt.com.br/admin
   ```
3. Pressione **Enter**

---

### **2. Fazer Login**

1. Se não estiver logado, você será redirecionado para `/login`
2. Digite seu **email** e **senha**
3. Clique em **"Entrar"**

---

### **3. Acessar Página de Projetos**

Depois de logado:

1. No menu lateral, clique em **"📁 Projetos"**
2. Ou acesse diretamente:
   ```
   https://backoffice.azmt.com.br/admin/projects
   ```

---

### **4. Editar um Projeto**

1. Na lista de projetos, clique em um projeto
2. Ou acesse diretamente:
   ```
   https://backoffice.azmt.com.br/admin/projects/[id-do-projeto]
   ```

---

## 🤖 OTIMIZAR SEO COM IA

### **Opção 1: Via API (Atual)**

Por enquanto, a otimização funciona via API:

**Endpoint:**
```
POST https://backoffice.azmt.com.br/api/admin/projects/optimize-seo
```

**Body:**
```json
{
  "projectId": "id-do-projeto",
  "lang": "pt"
}
```

---

### **Opção 2: Via Script (Recomendado)**

Execute o script:

1. Duplo clique em: `EXECUTAR_OTIMIZAR_SEO.ps1`
2. Ou no PowerShell:
   ```powershell
   cd C:\Users\ranz\Documents\azimut-site-vite-tailwind\azimut-cms
   npx tsx scripts/otimizar-projetos-seo.ts
   ```

---

## 🎯 FUTURO: Botão no Backoffice

**Em breve:** Vamos adicionar um botão "Otimizar SEO com IA" na página de edição de cada projeto.

Quando estiver pronto:
1. Acesse: `https://backoffice.azmt.com.br/admin/projects/[id]`
2. Clique no botão **"Otimizar SEO com IA"**
3. Veja as sugestões
4. Salve as melhorias

---

## 📋 RESUMO RÁPIDO

**Acessar Backoffice:**
```
https://backoffice.azmt.com.br/admin
```

**Página de Projetos:**
```
https://backoffice.azmt.com.br/admin/projects
```

**Otimizar SEO:**
- Agora: Execute o script `EXECUTAR_OTIMIZAR_SEO.ps1`
- Futuro: Botão no backoffice

---

## ✅ PRONTO!

Agora você sabe como acessar! 🎉
