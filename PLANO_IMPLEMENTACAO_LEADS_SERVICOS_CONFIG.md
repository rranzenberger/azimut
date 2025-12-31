# 📋 PLANO DE IMPLEMENTAÇÃO - Leads, Serviços e Configurações

**Data:** 2025-01-27  
**Prioridade:** Alta  
**Método:** Análise profunda → Implementação sistemática

---

## 🔍 ANÁLISE COMPLETA DO ESTADO ATUAL

### 1. Leads ✅
**Schema Prisma:**
- ✅ Modelo completo com todos os campos
- ✅ Enums: `LeadType`, `LeadPriority`, `LeadStatus`
- ✅ Relações: `sessions`, `editalLeads`

**APIs:**
- ✅ `POST /api/leads` - Criar lead
- ❌ `GET /api/admin/leads` - Listar leads (FALTA)
- ❌ `GET /api/admin/leads/[id]` - Detalhes (FALTA)
- ❌ `PUT /api/admin/leads/[id]` - Atualizar (FALTA)

**Frontend:**
- ✅ Dashboard mostra leads recentes
- ❌ Página `/admin/leads` (FALTA)
- ❌ Página `/admin/leads/[id]` (FALTA)

### 2. Serviços ✅
**Schema Prisma:**
- ✅ Modelo completo com multilíngue
- ✅ Enums: `ServiceStatus` (DRAFT, PUBLISHED, ARCHIVED)
- ✅ Campos: titlePt/En/Es/Fr, descriptionPt/En/Es/Fr, icon, segments

**APIs:**
- ❌ `GET /api/admin/services` - Listar (FALTA)
- ❌ `POST /api/admin/services` - Criar (FALTA)
- ❌ `GET /api/admin/services/[id]` - Detalhes (FALTA)
- ❌ `PUT /api/admin/services/[id]` - Atualizar (FALTA)
- ❌ `DELETE /api/admin/services/[id]` - Deletar (FALTA)

**Frontend:**
- ❌ Página `/admin/services` (FALTA)
- ❌ Página `/admin/services/new` (FALTA)
- ❌ Página `/admin/services/[id]/edit` (FALTA)

### 3. Configurações ❌
**Schema Prisma:**
- ❌ Modelo `Settings` NÃO EXISTE (PRECISA CRIAR)

**APIs:**
- ❌ Tudo falta

**Frontend:**
- ❌ Tudo falta

---

## 🎯 ESTRATÉGIA DE IMPLEMENTAÇÃO

### Fase 1: Leads (Prioridade Alta)
1. ✅ Validar schema do Prisma
2. ✅ Criar API `GET /api/admin/leads` com filtros
3. ✅ Criar API `GET /api/admin/leads/[id]`
4. ✅ Criar API `PUT /api/admin/leads/[id]`
5. ✅ Criar página `/admin/leads`
6. ✅ Criar página `/admin/leads/[id]`
7. ✅ Atualizar layout para habilitar link

### Fase 2: Serviços (Prioridade Alta)
1. ✅ Validar schema do Prisma
2. ✅ Criar APIs CRUD completas
3. ✅ Criar páginas de gerenciamento
4. ✅ Implementar upload de ícones

### Fase 3: Configurações (Prioridade Média)
1. ✅ Criar modelo `Settings` no Prisma
2. ✅ Criar migration
3. ✅ Criar APIs
4. ✅ Criar página de configurações

---

## 🛡️ VALIDAÇÕES ANTES DE IMPLEMENTAR

### Para Leads:
- [x] Schema verificado - Modelo completo
- [x] Enums verificados - LeadType, LeadPriority, LeadStatus
- [x] Campos nullable identificados - phone, company, position, etc.
- [x] Relações verificadas - sessions, editalLeads
- [x] API existente analisada - POST /api/leads

### Para Serviços:
- [x] Schema verificado - Modelo completo
- [x] Enums verificados - ServiceStatus
- [x] Campos multilíngues identificados
- [x] Relações verificadas - projects

### Para Configurações:
- [ ] Modelo precisa ser criado
- [ ] Campos a definir: site, SEO, social, integrações

---

## 📝 DECISÕES DE DESIGN

### Leads:
- **Filtros:** status, priority, leadType, data (createdAt)
- **Ordenação:** createdAt desc (padrão), mas permitir mudar
- **Ações:** Editar status/priority, Ver detalhes, Exportar

### Serviços:
- **CRUD completo:** Criar, Editar, Deletar, Listar
- **Upload de ícones:** Usar mesmo sistema de Media
- **Ordenação:** Por priority (desc)

### Configurações:
- **Seções:** Geral, SEO, Social, Integrações
- **Campos:** siteName, siteUrl, email, etc.

---

## 🚀 ORDEM DE IMPLEMENTAÇÃO

1. **Leads** (mais urgente, já tem dados)
2. **Serviços** (importante para conteúdo)
3. **Configurações** (menos urgente)

---

**Status:** Pronto para implementar ✅

