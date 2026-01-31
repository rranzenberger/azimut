# 🚀 COMO EXECUTAR O SQL PARA POPULAR O BLOG

## ⚡ PASSO A PASSO RÁPIDO (5 minutos)

### **1. Acessar Neon PostgreSQL via Vercel:**

1. Vá em: **https://vercel.com**
2. Entre no projeto: **`azimut-backoffice`**
3. Clique em: **Settings** (Configurações)
4. No menu lateral, clique em: **Storage**
5. Clique em: **Neon Database**
6. Clique em: **Open SQL Editor** ou **SQL Editor**

### **2. Executar o SQL:**

1. Abra o arquivo: `azimut-cms/scripts/POPULAR_BLOG_AZIMUT.sql`
2. **Copie TODO o conteúdo** do arquivo
3. **Cole no SQL Editor** do Neon
4. Clique em **"Run"** ou pressione **F5**
5. ✅ Pronto! O blog estará populado com 4 posts

### **3. Verificar se Funcionou:**

1. Acesse: **`https://backoffice.azmt.com.br/admin/blog`**
2. Veja se aparecem **4 posts** na lista
3. Acesse: **`https://azmt.com.br/pt/blog`**
4. Veja se os posts aparecem no site público

---

## 🎯 O QUE O SQL FAZ:

- ✅ Cria **4 categorias** (Projetos, Tecnologia, Cultura, Por Trás das Cenas)
- ✅ Cria **4 posts publicados**:
  1. Rio Museu Olímpico: Montagem e Instalação
  2. Natal Rio Bonito: Instalação Imersiva
  3. VR e AR na Azimut: Experiências Imersivas
  4. Por Trás das Cenas: Brasil e Canadá

---

## ❌ SE DER ERRO:

### **Erro: "relation already exists"**
- ✅ **OK!** Significa que as categorias já existem
- O script usa `ON CONFLICT DO NOTHING`, então não duplica

### **Erro: "permission denied"**
- ⚠️ Verifique se você está logado no Vercel com permissões
- Ou execute via Prisma: `npx prisma db push`

### **Outros erros:**
- Verifique se o banco está acessível
- Verifique se o projeto `azimut-backoffice` está conectado ao Neon

---

## 📋 ALTERNATIVA: VIA PRISMA (se SQL não funcionar)

```bash
cd azimut-cms
npx prisma db push
```

Depois execute o SQL manualmente via ferramenta SQL do Neon.

---

## ✅ DEPOIS DE EXECUTAR:

1. ✅ Verificar blog no backoffice
2. ✅ Verificar blog no site público
3. ✅ Criar mais posts via backoffice (se quiser)
4. ✅ Começar a usar o sistema de monitoramento automático

---

**🚀 Pronto! Blog populado e funcionando!**
