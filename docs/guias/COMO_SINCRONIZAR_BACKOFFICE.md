# 🔄 COMO SINCRONIZAR SITE ↔ BACKOFFICE

**Data:** 2026-01-20  
**Status:** ✅ Script SQL pronto para executar

---

## 🎯 **O PROBLEMA**

Fizemos várias atualizações de SEO e textos no site, mas o **backoffice está desatualizado** com dados antigos.

---

## ✅ **A SOLUÇÃO**

Script SQL completo que atualiza **todas as 11 páginas** do backoffice com os dados do site.

**Arquivo gerado:**
```
azimut-cms/scripts/SYNC_SITE_BACKOFFICE_2026-01-20.sql
```

---

## 🚀 **PASSO A PASSO (5 minutos)**

### **1. Abrir SQL Editor do Neon**

**Opção A: Via Vercel (RECOMENDADO)**
1. Acesse: https://vercel.com/ranz/azimut-cms
2. Clique na aba **"Storage"**
3. Clique no banco **"Neon Postgres"**
4. Clique em **"Open in Neon"** (botão verde superior direito)
5. Na interface do Neon, clique em **"SQL Editor"** (menu lateral esquerdo)

**Opção B: Direto no Neon**
1. Acesse: https://console.neon.tech
2. Selecione o projeto **azimut-cms**
3. Clique em **"SQL Editor"** (menu lateral esquerdo)

---

### **2. Copiar o Script SQL**

1. Abra o arquivo:
   ```
   azimut-cms/scripts/SYNC_SITE_BACKOFFICE_2026-01-20.sql
   ```

2. **Selecione TODO o conteúdo** (Ctrl+A)

3. **Copie** (Ctrl+C)

---

### **3. Colar e Executar**

1. No **SQL Editor** do Neon, cole o script (Ctrl+V)

2. Clique em **"Run"** ou pressione **Ctrl+Enter**

3. Aguarde a execução (5-10 segundos)

---

### **4. Verificar Resultado ✅**

Ao final da execução, você verá uma **tabela com as páginas atualizadas**:

```
slug            | seoTitlePt                        | seoTitleEn                     | updatedAt
----------------|-----------------------------------|--------------------------------|------------------
home            | Azimut - Produtora Audiovisual... | Azimut - Audiovisual Prod...   | 2026-01-20 ...
what            | Serviços - O Que Fazemos...       | Services - What We Do...       | 2026-01-20 ...
work            | Trabalhos - Portfolio Azimut      | Work - Azimut Portfolio        | 2026-01-20 ...
...
```

**✅ Se você vê a data de hoje (`2026-01-20`) = Sucesso!**

---

### **5. Conferir no Backoffice (Opcional)**

1. Acesse: https://backoffice.azmt.com.br/admin/site-pages

2. Clique em qualquer página (ex: **Home**)

3. Role até **🔍 SEO**

4. Verifique se os textos estão corretos nos **4 idiomas**:
   - ✅ Português
   - ✅ English
   - ✅ Español
   - ✅ Français

---

## 📊 **O QUE O SCRIPT ATUALIZA**

Para **cada uma das 11 páginas**:

### **SEO Meta Tags (4 idiomas)**
- `seoTitlePt`, `seoTitleEn`, `seoTitleEs`, `seoTitleFr`
- `seoDescPt`, `seoDescEn`, `seoDescEs`, `seoDescFr`

### **Hero Section (4 idiomas)**
- `heroSloganPt`, `heroSloganEn`, `heroSloganEs`, `heroSloganFr`
- `heroSubtitlePt`, `heroSubtitleEn`, `heroSubtitleEs`, `heroSubtitleFr`

### **Páginas Atualizadas:**
1. 🏠 **Home** - `home`
2. 🎨 **Soluções** - `what`
3. 💼 **Projetos** - `work`
4. 🎬 **Estúdio** - `studio`
5. 📧 **Contato** - `contact`
6. 🎓 **Academy** - `academy`
7. 📰 **Imprensa** - `press`
8. 🔬 **Pesquisa** - `research` ou `academy/research`
9. 🇨🇦 **Vancouver** - `vancouver` ou `academy/vancouver`
10. ℹ️ **Sobre** - `about` ou `studio/about`
11. 👥 **Equipe** - `team` ou `studio/team`

---

## 🛠️ **TROUBLESHOOTING**

### **Erro: "permission denied"**
- **Causa:** Usuário sem permissão de escrita
- **Solução:** Verificar se está logado como owner do projeto

### **Erro: "column does not exist"**
- **Causa:** Campos ES/FR não existem no schema
- **Solução:** Executar migration primeiro:
  ```bash
  cd azimut-cms
  npx prisma db push
  ```

### **Erro: "relation Page does not exist"**
- **Causa:** Tabela `Page` não existe
- **Solução:** Verificar se está conectado no banco correto (azimut-cms)

### **Query executou mas não aparece nada**
- **Causa:** As páginas com esses slugs não existem no banco
- **Solução:** Criar as páginas manualmente no backoffice primeiro

---

## ✅ **CONFIRMAÇÃO DE SUCESSO**

Você saberá que funcionou quando:

1. ✅ O script executou sem erros
2. ✅ Apareceu a tabela de verificação com as 11 páginas
3. ✅ O campo `updatedAt` mostra a data de hoje
4. ✅ No backoffice, os textos aparecem em 4 idiomas

---

## 📝 **PRÓXIMOS PASSOS (OPCIONAL)**

Agora que site e backoffice estão sincronizados, você pode:

1. **Testar edição no backoffice:**
   - Edite um texto qualquer
   - Salve
   - Verifique se não dá erro

2. **Criar API pública** (próxima fase):
   - Para o site consumir dados do backoffice
   - Fallback para textos locais se API falhar

3. **Continuar finalização do site:**
   - OG Images (Vancouver, Home, Work)
   - Revisão de conteúdo final

---

## 📞 **DÚVIDAS?**

Se algo der errado:

1. **Copie a mensagem de erro completa**
2. **Me envie** para diagnosticar
3. **Não se preocupe** - o script usa `BEGIN/COMMIT`, então se der erro, não quebra nada

---

**Criado em:** 2026-01-20  
**Última atualização:** 2026-01-20
