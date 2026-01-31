# ⚡ EXECUTAR AGORA - POPULAR BACKOFFICE

**3 opções. Escolha a mais fácil para você!**

---

## 🎯 **OPÇÃO 1: SQL Direto (MAIS FÁCIL)** ⭐

### **Passo a passo:**

1. **Abra o arquivo:**
   ```
   sql/populate_company_history_complete.sql
   ```

2. **Copie TODO o conteúdo** (Ctrl+A, Ctrl+C)

3. **Acesse o Neon:**
   ```
   https://console.neon.tech
   ```

4. **No Neon:**
   - Clique em "SQL Editor"
   - Cole o conteúdo (Ctrl+V)
   - Clique em "Run" (ou Ctrl+Enter)

5. **✅ Pronto!**
   - ~30 eventos inseridos
   - 5 minutos de trabalho

---

## 🎯 **OPÇÃO 2: Script PowerShell (Windows)**

### **Passo a passo:**

1. **Abra PowerShell** na raiz do projeto

2. **Execute:**
   ```powershell
   .\scripts\populate-backoffice.ps1
   ```

3. **Siga as instruções** que aparecerem

4. **✅ Pronto!**

---

## 🎯 **OPÇÃO 3: Script Node.js (Programático)**

### **Passo a passo:**

1. **Entre na pasta do CMS:**
   ```bash
   cd azimut-cms
   ```

2. **Execute o script:**
   ```bash
   npx tsx ../scripts/populate-history.ts
   ```

3. **✅ Pronto!**

---

## 🔍 **VERIFICAR SE FUNCIONOU:**

### **Teste a API:**
```
https://cms.azimut.com.br/api/public/history?lang=pt
```

Deve retornar JSON com ~30 eventos

### **Teste o Frontend:**
```
http://localhost:5173/pt/studio/credibilidade
```

Deve exibir a timeline completa

---

## 📊 **O QUE SERÁ INSERIDO:**

- ✅ **30+ eventos** históricos (1980-2026)
- ✅ **4 idiomas** (PT/EN/ES/FR)
- ✅ **6 tipos** (milestone, partnership, project, award, location, other)
- ✅ **15 destaques** (featured)
- ✅ **Bullets** detalhados
- ✅ **Ícones** emojis

---

## 💡 **DICA:**

**Prefira a OPÇÃO 1 (SQL Direto)**

É a mais rápida e segura. Só copiar e colar!

---

## 🚀 **APÓS POPULAR:**

1. **Comitar mudanças:**
   ```bash
   git add .
   git commit -m "feat: adiciona história completa no backoffice"
   git push
   ```

2. **Deploy automático** (Vercel)

3. **✅ Pronto para produção!**

---

**Qualquer dúvida, veja:** `COMO_POPULAR_BACKOFFICE.md`

---

**✨ Escolha uma opção e execute agora! ✨**
