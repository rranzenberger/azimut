# 📚 EXPLICAÇÃO DAS TABELAS DINÂMICAS

**Data:** 17 de Janeiro de 2026  
**Diretório:** ✅ `C:\Users\ranz\Documents\azimut-site-vite-tailwind`

---

## 🎯 O QUE SÃO ESSAS TABELAS?

### 1. **`Section` - Seções Dinâmicas de Páginas**

**O que faz:**
- Permite criar **seções editáveis** dentro de páginas (Home, Studio, Academy, etc.)
- Cada página pode ter múltiplas seções (Hero, Sobre, Serviços, etc.)
- Conteúdo editável pelo backoffice **sem mexer no código**

**Exemplo prático:**
```
Página: Home
├── Section 1: Hero (título, subtítulo, imagem)
├── Section 2: Sobre (texto longo, 4 idiomas)
├── Section 3: Serviços (grid de cards)
└── Section 4: Projetos (galeria)
```

**Status atual:**
- ❌ **Tabela NÃO existe** no banco
- ⚠️ **Código JÁ usa** (backoffice tenta buscar sections)
- ✅ **Site funciona SEM ela** (usa conteúdo estático como fallback)

**Precisa criar?**
- ✅ **SIM!** O backoffice já tem interface para editar sections
- ✅ Permite editar conteúdo sem deploy
- ✅ Melhora flexibilidade do CMS

---

### 2. **`FieldMetadata` - Metadados de Campos Editáveis**

**O que faz:**
- Define **regras e especificações** para cada campo editável
- Exemplo: "Este campo aceita imagem 1920x1080, máximo 5MB"
- Usado pelo backoffice para mostrar **validações e dicas** ao editor

**Exemplo prático:**
```
Campo: heroBackgroundImage
├── Tipo: IMAGE
├── Dimensões: 1920x1080 (recomendado)
├── Tamanho máximo: 5MB
├── Formatos: JPG, PNG, WebP
└── Onde aparece: Hero da Home
```

**Status atual:**
- ❌ **Tabela NÃO existe** no banco
- ⚠️ **Código JÁ usa** (APIs tentam buscar metadados)
- ✅ **Site funciona SEM ela** (validações ficam no código)

**Precisa criar?**
- ✅ **SIM!** Melhora UX do backoffice
- ✅ Permite configuração dinâmica de validações
- ✅ Facilita manutenção

---

### 3. **`BlogPost` - Posts do Blog**

**O que faz:**
- Armazena **artigos do blog**
- Sistema completo de blog com categorias, tags, etc.

**Status atual:**
- ✅ **Tabela EXISTE** (já criada)
- ✅ **4 posts publicados**
- ✅ **Funcionando perfeitamente**

**Precisa criar?**
- ❌ **NÃO!** Já existe e funciona

---

## 📊 RESUMO:

| Tabela | Existe? | Código usa? | Site funciona sem? | Precisa criar? |
|--------|---------|-------------|-------------------|----------------|
| **BlogPost** | ✅ SIM | ✅ SIM | ❌ NÃO | ❌ NÃO (já existe) |
| **Section** | ❌ NÃO | ✅ SIM | ✅ SIM (fallback) | ✅ **SIM!** |
| **FieldMetadata** | ❌ NÃO | ✅ SIM | ✅ SIM (validação no código) | ✅ **SIM!** |

---

## 🚀 COMO CRIAR:

### **OPÇÃO 1: Script SQL (RECOMENDADO - 2 minutos)**

Execute no Neon SQL Editor:
```sql
-- Arquivo: azimut-cms/scripts/CRIAR_TABELAS_FALTANTES.sql
```

**Vantagens:**
- ✅ Rápido (2 minutos)
- ✅ Cria tudo de uma vez
- ✅ Inclui índices necessários
- ✅ Não dá erro se já existir

---

### **OPÇÃO 2: Prisma Migrate (Alternativa)**

```bash
cd azimut-cms
npx prisma migrate dev --name add_section_fieldmetadata
```

**Vantagens:**
- ✅ Sincroniza schema com banco
- ✅ Cria migrations versionadas

**Desvantagens:**
- ⚠️ Mais complexo
- ⚠️ Pode precisar ajustar schema.prisma primeiro

---

## ✅ RECOMENDAÇÃO:

**Criar AMBAS as tabelas agora!**

**Por quê?**
1. ✅ Backoffice já tem interface pronta
2. ✅ Melhora flexibilidade do CMS
3. ✅ Permite editar conteúdo sem deploy
4. ✅ Script já está pronto (2 minutos)

---

## 📋 PRÓXIMO PASSO:

1. **Execute o script:** `azimut-cms/scripts/CRIAR_TABELAS_FALTANTES.sql`
2. **Verifique:** Execute `VERIFICAR_TUDO_SEM_ERRO.sql` para confirmar
3. **Teste:** Acesse backoffice e veja se sections aparecem

---

**Última atualização:** 17 de Janeiro de 2026, 20:30
