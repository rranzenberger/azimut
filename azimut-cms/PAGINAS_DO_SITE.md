# 📄 PÁGINAS DO SITE - BANCO DE DADOS

## ✅ Páginas Criadas no Banco de Dados

Todas as páginas do site foram mapeadas e adicionadas ao banco de dados. Agora você pode editá-las pelo backoffice!

---

## 🏠 PÁGINAS PRINCIPAIS

### 1. **Home** (`/home` ou `/`)
- **Nome**: Home
- **Slug**: `home`
- **Status**: Publicado
- **SEO**: Configurado (PT/EN)
- **Hero Slogan**: Configurado (PT/EN/ES/FR)

### 2. **Soluções** (`/what`)
- **Nome**: Soluções
- **Slug**: `what`
- **Status**: Publicado
- **SEO**: Configurado (PT/EN)
- **Descrição**: Página de serviços e soluções oferecidas

### 3. **Projetos** (`/work`)
- **Nome**: Projetos
- **Slug**: `work`
- **Status**: Publicado
- **SEO**: Configurado (PT/EN)
- **Descrição**: Portfólio de projetos e cases

### 4. **Estúdio** (`/studio`)
- **Nome**: Estúdio
- **Slug**: `studio`
- **Status**: Publicado
- **SEO**: Configurado (PT/EN)
- **Descrição**: Sobre o estúdio e equipe

### 5. **Academia** (`/academy`)
- **Nome**: Academia
- **Slug**: `academy`
- **Status**: Publicado
- **SEO**: Configurado (PT/EN)
- **Descrição**: Workshops, cursos e programas de mentoria

### 6. **Iniciar um Projeto** (`/contact`)
- **Nome**: Iniciar um Projeto
- **Slug**: `contact`
- **Status**: Publicado
- **SEO**: Configurado (PT/EN)
- **Descrição**: Formulário para iniciar um projeto (brief rápido)

---

## 📁 SUBPÁGINAS

### **Academia** (`/academy`)

#### 1. **Pesquisa** (`/academy/research`)
- **Nome**: Pesquisa
- **Slug**: `academy/research`
- **Status**: Publicado
- **SEO**: Configurado (PT/EN)
- **Descrição**: Laboratório de P&D e tecnologias emergentes

#### 2. **Cursos** (`/academy/courses`)
- **Nome**: Cursos
- **Slug**: `academy/courses`
- **Status**: Publicado
- **SEO**: Configurado (PT/EN)
- **Descrição**: Workshops e cursos disponíveis

#### 3. **Corporate** (`/academy/corporate`)
- **Nome**: Corporate
- **Slug**: `academy/corporate`
- **Status**: Publicado
- **SEO**: Configurado (PT/EN)
- **Descrição**: Treinamento corporativo

### **Estúdio** (`/studio`)

#### 1. **Equipe** (`/studio/team`)
- **Nome**: Equipe
- **Slug**: `studio/team`
- **Status**: Publicado
- **SEO**: Configurado (PT/EN)
- **Descrição**: Membros da equipe

#### 2. **Sobre** (`/studio/about`)
- **Nome**: Sobre
- **Slug**: `studio/about`
- **Status**: Publicado
- **SEO**: Configurado (PT/EN)
- **Descrição**: História e informações do estúdio

---

## 📊 RESUMO

- **Total de Páginas**: 11
  - **Páginas Principais**: 6
  - **Subpáginas**: 5

### Estrutura Hierárquica:
```
Home
Soluções
Projetos
Estúdio
  └─ Equipe
  └─ Sobre
Academia
  └─ Pesquisa
  └─ Cursos
  └─ Corporate
Iniciar um Projeto
```

---

## 🎯 COMO EDITAR

1. Acesse: `http://localhost:3001/admin/pages`
2. Clique na página que quer editar
3. OU use o dropdown "Ir para:" no topo da página de edição
4. Edite SEO, slogans e informações
5. Salve as alterações

---

## 🔄 ATUALIZAR BANCO

Se precisar recriar todas as páginas:

```bash
cd azimut-cms
npm run prisma:seed
```

**⚠️ ATENÇÃO**: Isso vai atualizar as páginas existentes (não duplicar).

---

## ➕ ADICIONAR NOVAS PÁGINAS

Para adicionar novas páginas, você pode:

1. **Pelo Backoffice** (futuro): Interface visual para criar páginas
2. **Pelo Seed** (atual): Adicionar no arquivo `prisma/seed.ts`
3. **Direto no Banco**: Via Prisma Studio (`npm run prisma:studio`)

---

**✅ Todas as páginas estão no banco e prontas para edição!**

