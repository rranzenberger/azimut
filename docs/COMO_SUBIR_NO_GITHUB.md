# 📤 Como Subir o Código no GitHub (Sem Git)

Como o Git não está instalado, vamos usar a interface web do GitHub para fazer upload direto.

## 🚀 Passo a Passo

### **1. No GitHub (já está lá):**

1. Acesse: https://github.com/rranzenberger/azimut
2. Clique no botão **"Add file"** (canto superior direito)
3. Escolha **"Upload files"**

### **2. Fazer Upload dos Arquivos:**

**Opção A - Upload de Pasta Completa (Recomendado):**
- Arraste TODA a pasta do projeto para a área de upload
- **EXCETO:** `node_modules`, `dist`, `.next` (não precisa subir)

**Opção B - Upload Manual:**
Se preferir, suba arquivo por arquivo, começando pelos mais importantes:
- `package.json`
- `vite.config.ts`
- `tsconfig.json`
- `vercel.json`
- `middleware.ts`
- Pasta `src/`
- Pasta `public/`
- Pasta `azimut-cms/` (exceto `node_modules` e `.next`)

### **3. Commit:**

1. Role até o final da página
2. No campo **"Commit message"**, escreva: `Initial commit - Site Azimut`
3. Clique em **"Commit changes"**

---

## ✅ Depois do Upload

Quando terminar, o código estará no GitHub e você poderá:
1. Voltar na Vercel
2. Conectar com o repositório GitHub
3. Fazer deploy automático!

---

## 💡 Alternativa: Instalar Git (Opcional)

Se quiser instalar Git para facilitar futuras atualizações:

1. Baixe: https://git-scm.com/download/win
2. Instale (deixe todas as opções padrão)
3. Depois pode usar comandos Git normalmente

---

**Pronto! Agora é só fazer o upload no GitHub!** 🎉


















