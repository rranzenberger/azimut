# 🎬 IMPLEMENTAÇÃO: MUSEU OLÍMPICO NO BACKOFFICE

---

## ✅ SCRIPT CRIADO

Criei um script completo para adicionar o projeto do **Museu Olímpico do Rio** ao backoffice com o vídeo do YouTube integrado.

**Arquivo**: `azimut-cms/scripts/add-olympic-museum-project.ts`

---

## 🚀 COMO EXECUTAR

### **Opção 1: Via NPM (Recomendado)**

```bash
cd azimut-cms
npx tsx scripts/add-olympic-museum-project.ts
```

### **Opção 2: Adicionar ao package.json**

Adicione em `azimut-cms/package.json`:

```json
{
  "scripts": {
    "add:olympic": "tsx scripts/add-olympic-museum-project.ts"
  }
}
```

Depois execute:

```bash
cd azimut-cms
npm run add:olympic
```

---

## 📦 O QUE O SCRIPT FAZ

### **1. Cria/Atualiza Tags**
- ✅ `immersive` (Imersivo)
- ✅ `institutional` (Institucional)
- ✅ `museum` (Museu)
- ✅ `olympics` (Olímpico)

### **2. Cria Mídia (Vídeo)**
- **Tipo**: VIDEO
- **URL Original**: `https://www.youtube.com/watch?v=1Pcoi_E9SXI`
- **Thumbnail**: Gerado automaticamente do YouTube
- **Alt Text**: Em 4 idiomas (PT, EN, ES, FR)

### **3. Cria Projeto Completo**
- **Slug**: `museu-olimpico-rio`
- **Título**: Museu Olímpico do Rio
- **Resumo**: Em 4 idiomas
- **Descrição completa**: Em 4 idiomas
- **Localização**: Rio de Janeiro, RJ, Brasil
- **Ano**: 2016
- **Cliente**: Prefeitura do Rio de Janeiro
- **Status**: PUBLISHED
- **Featured**: true (aparece na Home)
- **Priority**: 10 (prioridade máxima)

### **4. Conecta com Serviços**
- Cinema & Audiovisual
- XR / Interatividade
- Animação 2D/3D

### **5. Conecta com Market Brasil**
- Aparece automaticamente para usuários do Brasil

---

## 🔄 INTEGRAÇÃO COM O SITE

### **Automática via API**

O site principal já está configurado para buscar projetos do backoffice:

```typescript
// src/hooks/useAzimutContent.ts
const { content: cmsContent } = useAzimutContent({ page: 'home' })

// Se backoffice retornar projetos, usa eles
// Se não retornar, usa fallback estático
```

### **Prioridade de Conteúdo**:

1. **Backoffice** (se disponível)
2. **Fallback estático** (código atual)

Isso significa que:
- ✅ Se o backoffice estiver funcionando → mostra projeto do banco
- ✅ Se o backoffice estiver offline → mostra fallback (não quebra)
- ✅ **ZERO risco** de quebrar o site!

---

## 📊 DADOS DO PROJETO

### **Conteúdo em PT**:
```
Título: Museu Olímpico do Rio
Resumo: Direção geral e curadoria de conteúdo para o Museu 
        Olímpico do Rio. Uma experiência imersiva que celebra 
        a história olímpica através de instalações audiovisuais 
        interativas e narrativas cinematográficas.

Descrição: O Museu Olímpico do Rio representa um marco na 
           preservação da memória olímpica brasileira...
           
Projeto incluiu:
- Direção geral de conteúdo e curadoria
- Instalações audiovisuais imersivas
- Sinalização digital interativa
- Narrativas cinematográficas
- Integração de múltiplas tecnologias (projeção, touchscreens, VR)
```

### **Vídeo**:
- **URL**: https://www.youtube.com/watch?v=1Pcoi_E9SXI
- **Player**: Responsivo (YouTube embed)
- **Thumbnail**: HD automático
- **Alt Text**: Multilíngue

---

## 🎯 TESTE LOCAL (Antes de Executar)

### **1. Verificar Database URL**

```bash
# azimut-cms/.env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DBNAME"
```

### **2. Testar Conexão**

```bash
cd azimut-cms
npx prisma db push
```

Se funcionar, está pronto!

---

## ⚠️ REQUISITOS

### **Banco de Dados**:
- ✅ PostgreSQL rodando
- ✅ Schema atualizado (`npx prisma db push`)
- ✅ Markets criados (BR, CA, DEFAULT)
- ✅ Pelo menos 1 usuário admin

### **Ambiente**:
- ✅ Node.js 18+
- ✅ Prisma instalado
- ✅ tsx instalado (`npm install -D tsx`)

---

## 🔧 RESOLUÇÃO DE PROBLEMAS

### **Erro: "Market not found"**

Execute o seed primeiro:

```bash
cd azimut-cms
npm run prisma:seed
```

### **Erro: "Service not found"**

Crie os serviços antes:

```bash
cd azimut-cms
npm run populate:all
```

### **Erro: "Database connection failed"**

Verifique o `.env`:

```bash
cd azimut-cms
cat .env | grep DATABASE_URL
```

---

## 📝 DEPOIS DE EXECUTAR

### **1. Verificar no Backoffice**

```
URL: https://backoffice.azmt.com.br/admin/projects
Login: admin@azimut.com.br
Senha: Azimut2025!
```

### **2. Verificar no Site**

```
URL: https://azmt.com.br
```

O projeto deve aparecer na Hero Section da Home!

### **3. Editar Projeto (Opcional)**

No backoffice, você pode:
- ✏️ Editar textos
- 🖼️ Adicionar mais imagens na galeria
- 🎬 Trocar o vídeo
- 📊 Ajustar prioridade
- 🌍 Mudar localização

---

## 🎉 RESULTADO ESPERADO

### **No Backoffice**:
- ✅ Projeto "Museu Olímpico do Rio" criado
- ✅ Status: PUBLISHED
- ✅ Featured: ativado
- ✅ Vídeo do YouTube configurado
- ✅ 4 idiomas completos
- ✅ Tags e serviços conectados

### **No Site**:
- ✅ Vídeo aparece na Home (Hero Section)
- ✅ Thumbnail HD visível
- ✅ Botão PLAY funcional
- ✅ Player responsivo
- ✅ Textos em 4 idiomas (PT, EN, FR, ES)

---

## 🚀 EXECUTAR AGORA?

**Quer que eu execute o script agora?**

1. ⚡ **SIM** - Execute e me mostre o resultado
2. 📝 **Esperar** - Revisar antes de executar
3. 🔧 **Ajustar** - Modificar algo antes

**Ou prefere executar manualmente?**

```bash
# Copie e cole no terminal:
cd azimut-cms
npx tsx scripts/add-olympic-museum-project.ts
```

---

## 📚 DOCUMENTAÇÃO COMPLETA

- **Schema**: `azimut-cms/prisma/schema.prisma`
- **Seed**: `azimut-cms/prisma/seed.ts`
- **Populate**: `azimut-cms/scripts/populate-all-content.ts`
- **Este script**: `azimut-cms/scripts/add-olympic-museum-project.ts`

---

**Pronto para executar!** 🎬✨

